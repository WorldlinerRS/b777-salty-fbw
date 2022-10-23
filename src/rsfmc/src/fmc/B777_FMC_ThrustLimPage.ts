import {B777_FMC} from './B777_FMC';
import {B777_FMC_InitRefIndexPage} from './B777_FMC_InitRefIndexPage';
import {B777_FMC_TakeOffRefPage} from './B777_FMC_TakeOffRefPage';

export class B777_FMC_ThrustLimPage {
	static _updateCounter = 0;

	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();

		B777_FMC_ThrustLimPage._updateCounter = 0;
		fmc.pageUpdate = () => {
			if (B777_FMC_ThrustLimPage._updateCounter >= 50) {
				B777_FMC_ThrustLimPage.ShowPage1(fmc);
			} else {
				B777_FMC_ThrustLimPage._updateCounter++;
			}
		};

		fmc.refreshPageCallback = () => {
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};

		let selectedTempCell;
		let selectedTemp = fmc.getThrustTakeOffTemp();
		if (selectedTemp) {
			selectedTempCell = fmc.makeSettable(String(selectedTemp));
		} else {
			selectedTempCell = fmc.makeSettable('--');
		}

		selectedTempCell = selectedTempCell + '°';


		fmc._renderer.lsk(1).event = () => {
			let value = fmc.inOut;
			fmc.clearUserInput();

			/**
			 * TODO: USE DELETE const instead???
			 */
			if (value === 'DELETE') {
				SimVar.SetSimVarValue('L:B77RS_THRUST_ASSUMED_TEMPERATURE', 'Number', -1000);
				SimVar.SetSimVarValue('H:B777_MFD_1_TAKEOFF_MODES_UPDATED', 'Number', 1);
				SimVar.SetSimVarValue('H:B777_MFD_2_TAKEOFF_MODES_UPDATED', 'Number', 1);
				fmc._thrustTakeOffTemp = NaN;
				B777_FMC_ThrustLimPage.ShowPage1(fmc);
			} else if (value === '') {
				let origin = fmc.flightPlanManager.getOrigin();
				if (origin) {
					let oatValue = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
					let elevation = Math.round(parseFloat(origin.infos.oneWayRunways[0].elevation) * 3.28);
					let assumendTemp = Math.round(((((15 - (elevation / 1000 * 1.98)) + oatValue) * 1.25) - 1));
					if (fmc.setThrustTakeOffTemp(assumendTemp)) {
						B777_FMC_ThrustLimPage.ShowPage1(fmc);
					}
				}
			} else {
				if (fmc.setThrustTakeOffTemp(value)) {
					B777_FMC_ThrustLimPage.ShowPage1(fmc);
				}
			}
		};

		let toN1Cell = fastToFixed(fmc.getThrustTakeOffLimit(), 1) + '%';
		let oatValue = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
		let oatCell = fastToFixed(oatValue, 1) + '°';
		let thrustTOMode = fmc.getThrustTakeOffMode();
		let thrustClimbMode = fmc.getThrustCLBMode();
		fmc._renderer.lsk(2).event = () => {
			fmc.setThrustTakeOffMode(0);
			fmc.setThrustCLBMode(0);
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(3).event = () => {
			fmc.setThrustTakeOffMode(1);
			fmc.setThrustCLBMode(1);
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(4).event = () => {
			fmc.setThrustTakeOffMode(2);
			fmc.setThrustCLBMode(2);
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};
		fmc._renderer.rsk(2).event = () => {
			fmc.setThrustCLBMode(0);
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};
		fmc._renderer.rsk(3).event = () => {
			fmc.setThrustCLBMode(1);
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};
		fmc._renderer.rsk(4).event = () => {
			fmc.setThrustCLBMode(2);
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};

		let toN1CellTitle;
		switch (thrustTOMode) {
			case 0:
				toN1CellTitle = 'TO N1';
				break;
			case 1:
				toN1CellTitle = 'TO 1 N1';
				break;
			case 2:
				toN1CellTitle = 'TO 2 N1';
				break;
			default:
				toN1CellTitle = 'TO N1';
		}

		let thrustClimbModeCell0 = '';
		let thrustClimbModeCell1 = '';
		let thrustClimbModeCell2 = '';
		switch (thrustClimbMode) {
			case 0:
				thrustClimbModeCell0 = (fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB ? '<SEL>' : '<ARM>');
				break;
			case 1:
				thrustClimbModeCell1 = (fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB ? '<SEL>' : '<ARM>');
				break;
			case 2:
				thrustClimbModeCell2 = (fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB ? '<SEL>' : '<ARM>');
				break;
			default:
				toN1CellTitle = 'TO N1';
		}

		let separator = '__FMCSEPARATOR';
		if (!fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished && !fmc.dataHolder.preFlightDataHolder.thrustLim.completed) {
			separator = '--------------------------------------PRE-FLT';
		}


		fmc._renderer.renderTitle('THRUST LIM');
		fmc._renderer.render([
			['SEL/OAT', toN1CellTitle],
			[selectedTempCell + '[size=medium-size]C[/size]/' + oatCell + '[size=medium-size]C[/size]', toN1Cell],
			[''],
			['<TO', (thrustTOMode === 0 ? '<SEL>' : ''), thrustClimbModeCell0, 'CLB>'],
			['TO 1'],
			['<-10%', (thrustTOMode === 1 ? '<SEL>' : ''), thrustClimbModeCell1, 'CLB 1>'],
			['TO 2'],
			['<-20%', (thrustTOMode === 2 ? '<SEL>' : ''), thrustClimbModeCell2, 'CLB 2>'],
			[''],
			[''], //['<TO-B'],
			['', separator, ''],
			['<INDEX', 'TAKEOFF>']
		]);

		/**
		 * TODO: Really want to have these low level things here??
		 */
		if (fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished) {
			let fmsPreFlightElementGroup = document.querySelector('#fms-preflight');
			fmsPreFlightElementGroup.setAttribute('visibility', 'visible');
		}

		fmc._renderer.lsk(6).event = () => {
			B777_FMC_InitRefIndexPage.ShowPage1(fmc);
		};
		fmc._renderer.rsk(6).event = () => {
			B777_FMC_TakeOffRefPage.ShowPage1(fmc);
		};
	}
}
