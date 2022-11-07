import {B777_FMC} from './B777_FMC';
import {B777_FMC_RobPage} from './B777_FMC_RobPage';
import * as HDSDK from './../hdsdk/index';

// Payload Manager for B777-200F
export class B777_FMC_PayloadManagerPage {
	private readonly fmc: B777_FMC;
	private tankPriorityValues: any[];
	private payloadValues: any[];
	private _internalPayloadValuesCache: any[];

	static get tankCapacity() {
		return {
            "CENTER": 27290,
            "LEFT_MAIN": 10300,
            "RIGHT_MAIN": 10300
		};
	}

	static get tankPriority() {
		return [['LEFT_MAIN', 'RIGHT_MAIN'], ['CENTER']];
	}

	static get tankVariables() {
		return {
			'CENTER': 'FUEL TANK CENTER QUANTITY',
			'LEFT_MAIN': 'FUEL TANK LEFT MAIN QUANTITY',
			'RIGHT_MAIN': 'FUEL TANK RIGHT MAIN QUANTITY'
		};
	}

    static get payloadIndex() {
        return {
            "PILOT": 1,
            "COPILOT": 2,
            "CREW": 3,
            "CARGO_FRONT_TOP": 4,
            "CARGO_FRONT_BOTTOM": 5,
            "CARGO_REAR_TOP": 6,
            "CARGO_REAR_BOTTOM": 7
        };
    }

	static isPayloadManagerExecuted: boolean = undefined;
	static centerOfGravity: number = undefined;
	static requestedCenterOfGravity: number = null;
	static requestedFuel: number = null;
	static requestedPayload: number = null;
	static remainingPayload: number = null;

	static get getMaxFuel() {
		return 47890;
	}

	static get getMinFuel() {
		return 0;
	}

	static get getMaxPayload() {
		return 766800;
	}

	static get getMinPayload() {
		return 0;
	}

	static get getMaxCenterOfGravity() {
		return 44.0;
	}

	static get getMinCenterOfGravity() {
		return 14.0;
	}

	constructor(fmc: B777_FMC) {
		this.fmc = fmc;
		this.tankPriorityValues = [];
		this.payloadValues = [];
		this.init();
	}

	init() {
		this.tankPriorityValues = [
			{
				'LEFT_MAIN': this.getTankValue(B777_FMC_PayloadManagerPage.tankVariables.LEFT_MAIN),
				'RIGHT_MAIN': this.getTankValue(B777_FMC_PayloadManagerPage.tankVariables.RIGHT_MAIN)
			},
			{'CENTER': this.getTankValue(B777_FMC_PayloadManagerPage.tankVariables.CENTER)}
		];

		this._internalPayloadValuesCache = [];
		this.payloadValues = this.getPayloadValues();

		B777_FMC_PayloadManagerPage.centerOfGravity = this.getCenterOfGravity();
	}

	getPayloadValues() {
		return [
            {
                "PILOT": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.PILOT),
                "COPILOT": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.COPILOT),
                "CREW": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.CREW),
            },
            {
                "CARGO_FRONT_TOP": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.CARGO_FRONT_TOP),
                "CARGO_FRONT_BOTTOM": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.CARGO_FRONT_BOTTOM),
            },
            {
                "CARGO_REAR_TOP": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.CARGO_REAR_TOP),
                "CARGO_REAR_BOTTOM": this.getPayloadValue(B777_FMC_PayloadManager.payloadIndex.CARGO_REAR_BOTTOM)
            }
        ];
	}

	getPayloadValue(index) {
		return SimVar.GetSimVarValue('PAYLOAD STATION WEIGHT:' + index, 'Pounds');
	}

	getPayloadValueFromCache(index) {
		return this._internalPayloadValuesCache[index];
	}

	async setPayloadValue(index, value) {
		this._internalPayloadValuesCache[index] = value;
		return SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:' + index, 'Pounds', value);
	}

	getTankValue(variable) {
		return SimVar.GetSimVarValue(variable, 'Gallons');
	}

	getCenterOfGravity() {
		return SimVar.GetSimVarValue('CG PERCENT', 'Percent');
	}

	getTotalPayload(useLbs = false) {
		let payload = 0;
		this.payloadValues.forEach((group) => {
			Object.values(group).forEach((sectionValue) => {
				payload = payload + Number(sectionValue);
			});
		});
		return (useLbs ? payload : payload * 0.45359237);
	}

	getTotalFuel(useLbs = false) {
		let fuel = 0;
		this.tankPriorityValues.forEach((group) => {
			Object.values(group).forEach((sectionValue) => {
				fuel = fuel + Number(sectionValue);
			});
		});
		return (useLbs ? fuel * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'Pounds') : fuel);
	}

	async flushFuelAndPayload(): Promise<void> {
		return new Promise(resolve => {
			this.flushFuel().then(() => {
				return this.resetPayload();
			}).then(() => {
				return this.fmc.getCurrentWeight(true);
			}).then(weight => {
				return this.fmc.setZeroFuelWeight((318300 + B777_FMC_PayloadManagerPage.requestedPayload) / 1000, EmptyCallback.Void, true);
			}).then(() => {
				return this.resetPayload();
			}).then(() => {
				resolve();
			});
		});
	}

	async flushFuel(): Promise<void> {
		return new Promise(resolve => {
			let setTankFuel = async (variable, gallons) => {
				SimVar.SetSimVarValue(variable, 'Gallons', gallons);
			};

			B777_FMC_PayloadManagerPage.tankPriority.forEach((tanks, index) => {
				tanks.forEach((tank) => {
					setTankFuel(B777_FMC_PayloadManagerPage.tankVariables[tank], 0).then(() => {
						console.log(B777_FMC_PayloadManagerPage.tankVariables[tank] + ' flushed');
					});
				});
			});
			this.fmc.trySetBlockFuel(0, true);
			resolve();
		});
	}


	calculateTanks(fuel) {
		this.tankPriorityValues[0].LEFT_MAIN = 0;
		this.tankPriorityValues[1].CENTER = 0;
		this.tankPriorityValues[0].RIGHT_MAIN = 0;

		fuel = this.calculateMainTanks(fuel);
		fuel = this.calculateCenterTank(fuel);

		let fuelBlock = 0;

		let setTankFuel = async (variable, gallons) => {
			fuelBlock += gallons;
			SimVar.SetSimVarValue(variable, 'Gallons', gallons);
		};

		B777_FMC_PayloadManagerPage.tankPriority.forEach((tanks, index) => {
			tanks.forEach((tank) => {
				setTankFuel(B777_FMC_PayloadManagerPage.tankVariables[tank], this.tankPriorityValues[index][tank]).then(() => {
					console.log(B777_FMC_PayloadManagerPage.tankVariables[tank] + ' set to ' + this.tankPriorityValues[index][tank]);
				});
			});
		});

		this.fmc.trySetBlockFuel(fuelBlock * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'Pounds') / 1000, true);
	}

	calculateMainTanks(fuel) {
		let remainingFuel = 0;
		let tanksCapacity = (B777_FMC_PayloadManagerPage.tankCapacity.LEFT_MAIN * 2);

		if (fuel > tanksCapacity) {
			remainingFuel = fuel - tanksCapacity;
			fuel = tanksCapacity;
		}

		let reminder = fuel % 2;
		let quotient = (fuel - reminder) / 2;

		this.tankPriorityValues[0].LEFT_MAIN = quotient;
		this.tankPriorityValues[0].RIGHT_MAIN = quotient;

		if (reminder) {
			this.tankPriorityValues[0].LEFT_MAIN++;
			reminder--;
		}
		if (reminder) {
			this.tankPriorityValues[0].RIGHT_MAIN++;
			reminder--;
		}

		return remainingFuel;
	}

	calculateCenterTank(fuel) {
		let remainingFuel = 0;
		let tankCapacity = B777_FMC_PayloadManagerPage.tankCapacity.CENTER;

		if (fuel > tankCapacity) {
			remainingFuel = fuel - tankCapacity;
			fuel = tankCapacity;
		}

		this.tankPriorityValues[1].CENTER = fuel;

		return remainingFuel;
	}

	showPage() {
		this.fmc.cleanUpPage();

		this.payloadValues = this.getPayloadValues();

		if (!B777_FMC_PayloadManagerPage.requestedPayload) {
			B777_FMC_PayloadManagerPage.requestedPayload = this.getTotalPayload(true);
		}

		if (!B777_FMC_PayloadManagerPage.requestedCenterOfGravity) {
			B777_FMC_PayloadManagerPage.requestedCenterOfGravity = this.getCenterOfGravity();
		}

		if (!B777_FMC_PayloadManagerPage.requestedFuel) {
			B777_FMC_PayloadManagerPage.requestedFuel = this.getTotalFuel();
		}

		if (B777_FMC_PayloadManagerPage.isPayloadManagerExecuted) {
			this.fmc.pageUpdate = () => {
				this.showPage();
			};
		}
		let rows = [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']];

		let weightPerGallon;
		let units;
		let payloadModifier;
		let useImperial = HDSDK.HeavyDivision.Configuration.useImperial();
		if (useImperial) {
			weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'pounds');
			units = 'Pounds';
			payloadModifier = 1.0;
		} else {
			weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms');
			units = 'Kg';
			payloadModifier = 0.45359237;
		}

		const totalFuel = this.getTotalFuel() * weightPerGallon;
		const fobToRender = totalFuel.toFixed(2);
		const fobReqToRender = (B777_FMC_PayloadManagerPage.requestedFuel ? (B777_FMC_PayloadManagerPage.requestedFuel * weightPerGallon).toFixed(2) : fobToRender);

		const totalPayload = this.getTotalPayload(useImperial);

		const payloadToRender = totalPayload.toFixed(0);
		const payloadReqToRender = (B777_FMC_PayloadManagerPage.requestedPayload ? (B777_FMC_PayloadManagerPage.requestedPayload * payloadModifier).toFixed(0) : payloadToRender);


		(B777_FMC_PayloadManagerPage.requestedFuel ? B777_FMC_PayloadManagerPage.requestedFuel.toFixed(2) : this.getTotalFuel().toFixed(2));

		rows[0][0] = 'REQ VALUES';
		rows[0][1] = 'ACT VALUES';
		rows[2][0] = 'CG';
		rows[2][1] = 'CG';
		rows[3][0] = (B777_FMC_PayloadManagerPage.requestedCenterOfGravity ? B777_FMC_PayloadManagerPage.requestedCenterOfGravity.toFixed(2) + '%' : B777_FMC_PayloadManagerPage.centerOfGravity.toFixed(2) + '%');
		rows[3][1] = this.getCenterOfGravity().toFixed(2) + '%';
		rows[4][0] = 'FOB (' + units + ')';
		rows[4][1] = 'FOB (' + units + ')';
		rows[5][0] = fobReqToRender;
		rows[5][1] = fobToRender;
		rows[6][0] = 'PAYLOAD (' + units + ')';
		rows[6][1] = 'PAYLOAD (' + units + ')';
		rows[7][0] = payloadReqToRender;
		rows[7][1] = payloadToRender;
		rows[8][0] = (B777_FMC_PayloadManagerPage.remainingPayload ? 'REMAINING PAYLOAD' : '');
		rows[9][0] = (B777_FMC_PayloadManagerPage.remainingPayload ? B777_FMC_PayloadManagerPage.remainingPayload + ' lb' : '');


		rows[11][0] = '<BACK';


		this.fmc._renderer.lsk(2).event = () => {
			if (isFinite(parseFloat(this.fmc.inOut))) {
				if (parseFloat(this.fmc.inOut) > B777_FMC_PayloadManagerPage.getMinCenterOfGravity && parseFloat(this.fmc.inOut) < B777_FMC_PayloadManagerPage.getMaxCenterOfGravity) {
					B777_FMC_PayloadManagerPage.requestedCenterOfGravity = parseFloat(this.fmc.inOut);
					this.fmc.clearUserInput();
					this.showPage();
				} else {
					this.fmc.showErrorMessage('OUT OF RANGE');
					return false;
				}
			} else {
				this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
				return false;
			}
		};

		this.fmc._renderer.lsk(3).event = () => {
			if (isFinite(parseFloat(this.fmc.inOut))) {
				let useImperial = HDSDK.HeavyDivision.Configuration.useImperial();
				let requestedInGallons;
				let weightPerGallon;
				if (useImperial) {
					weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'pounds');
				} else {
					weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms');
				}

				requestedInGallons = parseFloat(this.fmc.inOut) / weightPerGallon;
				if (parseFloat(requestedInGallons) > B777_FMC_PayloadManagerPage.getMinFuel && parseFloat(requestedInGallons) < B777_FMC_PayloadManagerPage.getMaxFuel) {
					B777_FMC_PayloadManagerPage.requestedFuel = parseFloat(requestedInGallons);
					this.fmc.clearUserInput();
					this.showPage();
				} else {
					this.fmc.showErrorMessage('OUT OF RANGE');
					return false;
				}
			} else {
				this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
				return false;
			}
		};

		this.fmc._renderer.lsk(4).event = () => {
			if (isFinite(parseFloat(this.fmc.inOut))) {
				let useImperial = HDSDK.HeavyDivision.Configuration.useImperial();
				let requestedInPounds;
				let payloadModifier;
				if (useImperial) {
					payloadModifier = 1.0;
				} else {
					payloadModifier = 2.20462262;
				}

				requestedInPounds = parseFloat(this.fmc.inOut) * payloadModifier;

				if (parseFloat(requestedInPounds) > B777_FMC_PayloadManagerPage.getMinPayload && parseFloat(requestedInPounds) < B777_FMC_PayloadManagerPage.getMaxPayload) {
					B777_FMC_PayloadManagerPage.requestedPayload = parseFloat(requestedInPounds);
					this.fmc.clearUserInput();
					this.showPage();
				} else {
					this.fmc.showErrorMessage('OUT OF RANGE');
					return false;
				}
			} else {
				this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
				return false;
			}
		};

		this.fmc._renderer.lsk(6).event = () => {
			B777_FMC_RobPage.ShowPage1(this.fmc);
		};

		if (B777_FMC_PayloadManagerPage.isPayloadManagerExecuted) {
			rows[11][1] = 'RUNNING...';
		} else {
			rows[11][1] = 'EXECUTE>';
			this.fmc._renderer.rsk(6).event = () => {
				B777_FMC_PayloadManagerPage.isPayloadManagerExecuted = true;
				this.flushFuelAndPayload().then(() => {
					if (B777_FMC_PayloadManagerPage.requestedFuel) {
						this.calculateTanks(B777_FMC_PayloadManagerPage.requestedFuel);
					} else {
						this.calculateTanks(this.getTotalFuel());
					}

					if (B777_FMC_PayloadManagerPage.requestedPayload) {
						this.calculatePayload(B777_FMC_PayloadManagerPage.requestedPayload).then(() => {
							B777_FMC_PayloadManagerPage.isPayloadManagerExecuted = false;
						});
					} else {
						this.calculatePayload(this.getTotalPayload(true)).then(() => {
							B777_FMC_PayloadManagerPage.isPayloadManagerExecuted = false;
						});
					}
					this.showPage();
				});
			};
		}

		this.fmc._renderer.renderTitle('PAYLOAD MANAGER');
		this.fmc._renderer.render(rows);
	}

	async resetPayload() {
		await this.setPayloadValue(1, 0);
		await this.setPayloadValue(2, 0);
		await this.setPayloadValue(3, 0);
		await this.setPayloadValue(4, 0);
		await this.setPayloadValue(5, 0);
		await this.setPayloadValue(6, 0);
		await this.setPayloadValue(7, 0);
		await this.setPayloadValue(8, 0);
		await this.setPayloadValue(9, 0);
	}

	async calculatePayload(requestedPayload) {
		await this.resetPayload();
		B777_FMC_PayloadManagerPage.remainingPayload = requestedPayload;
		let amount = 0;
		let requestedCenterOfGravity = (B777_FMC_PayloadManagerPage.requestedCenterOfGravity ? B777_FMC_PayloadManagerPage.requestedCenterOfGravity : this.getCenterOfGravity());

		while (B777_FMC_PayloadManagerPage.remainingPayload > 0) {
			B777_FMC_PayloadManagerPage.centerOfGravity = this.getCenterOfGravity();
			if (B777_FMC_PayloadManagerPage.remainingPayload > 30000) {
				amount = 1000;
			} else if (B777_FMC_PayloadManagerPage.remainingPayload > 10000) {
				amount = 200;
			} else if (B777_FMC_PayloadManagerPage.remainingPayload > 5000) {
				amount = 100;
			} else if (B777_FMC_PayloadManagerPage.remainingPayload > 50) {
				amount = 50;
			} else {
				amount = B777_FMC_PayloadManagerPage.remainingPayload;
			}

			if (B777_FMC_PayloadManagerPage.centerOfGravity > requestedCenterOfGravity) {
				await this.increaseFrontPayload(amount, requestedCenterOfGravity);
				B777_FMC_PayloadManagerPage.remainingPayload = B777_FMC_PayloadManagerPage.remainingPayload - amount;
			} else {
				await this.increaseRearPayload(amount, requestedCenterOfGravity);
				B777_FMC_PayloadManagerPage.remainingPayload = B777_FMC_PayloadManagerPage.remainingPayload - amount;
			}

		}
	}

	async increaseFrontPayload(amount, requestedCenterOfGravity) {
		let keys = Object.keys(this.payloadValues[1]);
		let randomFront;
		let actualValue;
		if (B777_FMC_PayloadManagerPage.centerOfGravity > (requestedCenterOfGravity + 0.05)) {
			actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.BUSINESS_CLASS);
			await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.BUSINESS_CLASS, amount + actualValue);
		} else if (B777_FMC_PayloadManagerPage.centerOfGravity > (requestedCenterOfGravity + 0.01)) {
			randomFront = keys[Math.floor(Math.random() * keys.length)];
			actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex[randomFront]);
			await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex[randomFront], amount + actualValue);
		} else {
			actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.PREMIUM_ECONOMY);
			await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.PREMIUM_ECONOMY, amount + actualValue);
		}
	}

	async increaseRearPayload(amount, requestedCenterOfGravity) {
		let keys = Object.keys(this.payloadValues[2]);
		let randomRear;
		let actualValue;
		if (B777_FMC_PayloadManagerPage.centerOfGravity < (requestedCenterOfGravity - 0.05)) {
			actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.REAR_ECONOMY);
			await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.REAR_ECONOMY, amount + actualValue);
		} else if (B777_FMC_PayloadManagerPage.centerOfGravity < (requestedCenterOfGravity - 0.01)) {
			randomRear = keys[Math.floor(Math.random() * keys.length)];
			actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex[randomRear]);
			await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex[randomRear], amount + actualValue);
		} else {
			actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.FORWARD_ECONOMY);
			await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.FORWARD_ECONOMY, amount + actualValue);
		}
	}
}
