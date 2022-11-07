Include.addScript('/JS/B77RS/Utils/HeavyUpdateDelayer.js');

/**
 * Important NOTE!!!!!!!!
 *
 * LocalVars B77RS_IRS_X_INIT_ALIGN_TIME are stored as string and contains timestamp in seconds.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!                                                   !!
 * !!   DO NOT USE "Number" UNIT FOR STORING THE VARS   !!
 * !!                                                   !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * (You can use "Number" for deiniting (-1), but not for storing timestamp. You can use "Number" unit for retrieving values)
 *
 */


class B77RS_ADIRU {
	static get ALIGN_SPEED() {
		return {'INSTANT': 'INSTANT', 'FAST': 'FAST', 'NORMAL': 'NORMAL', 'REAL': 'REAL'};
	}

	constructor() {
		this.initAdiruAlignTime = null;

		this.adiruTimeForAligning = this.generateTimeForAligning();

		/**
		 * IRS States:
		 * 0 - off
		 * 1 - aligning
		 * 2 - aligned
		 */

		this.adiruState = 0;

		this.adiruSwitchState = 0;

		this.isAdiruInited = 0;
		this.isAdiruPositionSet = false;
		this.init();
	}

	init() {
		this.adiruState = SimVar.GetSimVarValue('L:B77RS_ADIRU_STATE', 'Number');
		this.adiruSwitchState = SimVar.GetSimVarValue('L:B77RS_ADIRU_SWITCH_STATE', 'Number');
		this.isAdiruInited = SimVar.GetSimVarValue('L:B77RS_IS_ADIRU_INITED', 'Number');
	}

	checkAlignStates() {
		if (this.adiruSwitchState === 0) {
			SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 0);
			SimVar.SetSimVarValue('L:B77RS_ADIRU_INIT_ALIGN_TIME', 'Number', -1);
			this.adiruAlignTime = null;
			this.adiruState = 0;
		}
	}

	update(_deltaTime, delayInMilliseconds) {
		this.updateVariables();
		this.checkAlignStates();

		if (this.shouldBeADIRUDeInited()) {
			this.executeADIRUDeinit()
		} else {
			this.executeInit();
		}

		if (this.shouldADIRUStartAlign()) {
			this.executeADIRUAlign();
		}
	}

	executeInit() {
		if (this.adiruSwitchState > 0 && this.adiruState < 1) {
			SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 1);
			this.adiruState = 1;
			if(!this.isAdiruInited){
				this.isAdiruInited = Math.floor(new Date().getTime() / 1000);
				SimVar.SetSimVarValue('L:B77RS_IS_ADIRU_INITED', 'String', this.isIrsInited.toString());
			}
		}
	}

	executeADIRUDeinit() {
		this.isAdiruInited = 0;
		this.adiruAlignTime = null;
		this.adiruState = 0;
		this.adiruTimeForAligning = this.generateTimeForAligning();
		SimVar.SetSimVarValue('L:B77RS_ADIRU_INIT_ALIGN_TIME', 'Number', -1);
		SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 0);
		SimVar.SetSimVarValue('L:B77RS_IS_ADIRU_INITED', 'Number', 0);
	}

	shouldBeADIRUInited() {
		return this.adiruSwitchState > 0;
	}

	shouldBeADIRUDeInited() {
		return this.adiruSwitchState === 0;
	}

	isADIRUAligning() {
		return this.shouldBeADIRUInited();
	}

	shouldADIRUStartAlign() {
		return (this.shouldBeADIRUInited()) && (this.adiruState !== 2);
	}

	isADIRUAligned() {
		return (this.adiruState === 2);
	}

	executeADIRUAlign() {

		let nowSeconds = Math.floor(new Date().getTime() / 1000);

		if (this.adiruSwitchState > 0) {
			if (this.adiruState !== 2) {
				if (!this.adiruAlignTime) {
					this.adiruAlignTime = Math.floor(new Date().getTime() / 1000);
					SimVar.SetSimVarValue('L:B77RS_ADIRU_INIT_ALIGN_TIME', 'String', nowSeconds.toString());
					SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 1);
				} else {
					if (this.adiruAlignTime + this.adiruTimeForAligning < this.adiruAlignTime) {
						SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 2);
					}
				}
			}
		} else {
			SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 0);
			SimVar.SetSimVarValue('L:B77RS_ADIRU_INIT_ALIGN_TIME', 'Number', -1);
			this.adiruAlignTime = null;
		}
	}

	updateVariables() {
		this.adiruState = SimVar.GetSimVarValue('L:B77RS_ADIRU_STATE', 'Number');
		this.adiruSwitchState = SimVar.GetSimVarValue('L:B77RS_ADIRU_SWITCH_STATE', 'Number');

		this.isAdiruPositionSet = SimVar.GetSimVarValue('L:B77RS_IS_ADIRU_POSITION_SET', 'Boolean');
	}

	generateTimeForAligning(minimal, maximal) {

		/**
		 * TODO: Rework!!!
		 * requires from six to fifteen minutes depending on latitude
		 * six minutes at the equator
		 * ten minutes average
		 *
		 * Airports:
		 * Near equator (lat near 0): Makoua, Republic of Congo, Coordinates: 00°1'9.0"S  015°34'55.0"E
		 * Far from the equator: Alert, Canada, Coordinates: 82°31'4.0"N  062°16'50.0"W
		 */

		if (!minimal && !maximal) {
			switch (HeavyDataStorage.get('ADIRU_ALIGN_SPEED', B77RS_ADIRU.ALIGN_SPEED.REAL)) {
				case B77RS_ADIRU.ALIGN_SPEED.INSTANT:
					minimal = 0;
					maximal = 0;
					break;
				case B77RS_ADIRU.ALIGN_SPEED.FAST:
					minimal = 70;
					maximal = 110;
					break;
				case B77RS_ADIRU.ALIGN_SPEED.NORMAL:
					minimal = 230;
					maximal = 270;
					break;
				case B77RS_ADIRU.ALIGN_SPEED.REAL:
					let sqr = 0;
					let timeToAlign = 0;
					let timeSec = 0;
					let planeLatitudeAbsolute = Math.abs(SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude'));
					if (planeLatitudeAbsolute <= 60) {
						let fix = 1.07415;
						sqr = Math.pow(fix, planeLatitudeAbsolute - 37.5);
						timeToAlign = (sqr + 5);
						timeSec = Math.floor(timeToAlign * 60);
					} else if (planeLatitudeAbsolute > 60 && planeLatitudeAbsolute <=70) {
						timeToAlign = 10;
						timeSec = Math.floor(timeToAlign * 60);
					} else if (planeLatitudeAbsolute > 70 && planeLatitudeAbsolute <=78) {
						timeToAlign = 17;
						timeSec = Math.floor(timeToAlign * 60);
					} else if (planeLatitudeAbsolute > 78) {
						timeToAlign = 17;
						timeSec = Math.floor(timeToAlign * 60);
					}
					minimal = timeSec;
					maximal = timeSec;
					break;
				default:
					minimal = 230;
					maximal = 270;
			}
		}
		let ret = 0;
		if (maximal > 0) {
			switch (HeavyDataStorage.get('ADIRU_ALIGN_SPEED', B77RS_ADIRU.ALIGN_SPEED.REAL)) {
				case B77RS_ADIRU.ALIGN_SPEED.FAST:
					ret = Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
					break;
				case B77RS_ADIRU.ALIGN_SPEED.NORMAL:
					ret = Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
					break;
				case B77RS_ADIRU.ALIGN_SPEED.REAL:
					ret = maximal;
					break;
			}
		}
		SimVar.SetSimVarValue('L:B77RS_ADIRU_TIME_FOR_ALIGN', 'Number', ret);
		return ret;
	}
}
