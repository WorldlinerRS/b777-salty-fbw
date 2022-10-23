import {B777_FMC} from './B777_FMC';
import {B777_FMC_InitRefIndexPage} from './B777_FMC_InitRefIndexPage';
import {B777_FMC_ThrustLimPage} from './B777_FMC_ThrustLimPage';
import * as HDSDK from './../hdsdk/index';

export class B777_FMC_PerfInitPage {

	static _timer = 0;

	static ShowPage1(fmc: B777_FMC) {
		fmc.updateFuelVars().then(() => {
			fmc.cleanUpPage();
			const useImperial = HDSDK.HeavyDivision.Configuration.useImperial();
			B777_FMC_PerfInitPage._timer = 0;
			fmc.pageUpdate = () => {
				B777_FMC_PerfInitPage._timer++;
				if (B777_FMC_PerfInitPage._timer >= 15) {
					B777_FMC_PerfInitPage.ShowPage1(fmc);
				}
			};

			let grWtCell = '□□□.□';
			if (isFinite(fmc.getFuelVarsUpdatedGrossWeight(useImperial))) {
				grWtCell = fmc.getFuelVarsUpdatedGrossWeight(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
			}
			let crzAltCell = '□□□□□';
			if (fmc.cruiseFlightLevel) {
				crzAltCell = 'FL' + fmc.cruiseFlightLevel;
			}
			fmc._renderer.rsk(1).event = () => {
				let value = fmc.inOut;
				fmc.clearUserInput();
				if (fmc.setCruiseFlightLevelAndTemperature(value)) {
					B777_FMC_PerfInitPage.ShowPage1(fmc);
				}
			};
			let fuelCell = '□□□.□';
			if (fmc.getBlockFuel(useImperial)) {
				fuelCell = fmc.getBlockFuel(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
			}
			let zfwCell = '□□□.□';
			if (fmc.getZeroFuelWeight(useImperial)) {
				zfwCell = fmc.getZeroFuelWeight(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
			}
			fmc._renderer.lsk(3).event = () => {
				let value = fmc.inOut;
				fmc.clearUserInput();
				fmc.setZeroFuelWeight(Number(value), (result) => {
					if (result) {
						B777_FMC_PerfInitPage.ShowPage1(fmc);
					}
				}, useImperial);
			};
			let crzCGCell = '21.00%';
			if (fmc.zeroFuelWeightMassCenter) {
				crzCGCell = fmc.zeroFuelWeightMassCenter.toFixed(1) + '%';
			}
			fmc._renderer.rsk(4).event = () => {
				let value = fmc.inOut;
				fmc.clearUserInput();
				fmc.setZeroFuelCG(value, (result) => {
					if (result) {
						B777_FMC_PerfInitPage.ShowPage1(fmc);
					}
				});
			};
			let costIndexCell = '□□□□';
			if (isFinite(fmc.costIndex)) {
				costIndexCell = fmc.costIndex.toFixed(0);
			}
			fmc._renderer.rsk(2).event = () => {
				let value = fmc.inOut;
				fmc.clearUserInput();
				if (fmc.tryUpdateCostIndex(Number(value), 10000)) {
					B777_FMC_PerfInitPage.ShowPage1(fmc);
				}
			};
			let reservesCell = '□□□.□';
			let reserves = fmc.getFuelReserves(useImperial);
			if (isFinite(reserves)) {
				reservesCell = reserves.toFixed(1) + (useImperial ? ' lb' : ' kg');
			}
			fmc._renderer.lsk(4).event = () => {
				let value = fmc.inOut;
				fmc.clearUserInput();
				if (fmc.setFuelReserves(Number(value), useImperial)) {
					B777_FMC_PerfInitPage.ShowPage1(fmc);
				}
			};
			let stepSizeCell = 'RVSM';

			let separator = '__FMCSEPARATOR';

			if (!fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished && !fmc.dataHolder.preFlightDataHolder.perfInit.completed) {
				separator = '--------------------------------------PRE-FLT';
			}

			fmc._renderer.renderTitle('PERF INIT');

			fmc._renderer.render([
				['GR WT', 'CRZ ALT'],
				[grWtCell, fmc.makeSettable(crzAltCell)],
				['FUEL', 'COST INDEX'],
				[fuelCell, fmc.makeSettable(costIndexCell)],
				['ZFW', 'MIN FUEL TEMP'],
				[fmc.makeSettable(zfwCell), '-37°c'],
				['RESERVES', 'CRZ CG'],
				[fmc.makeSettable(reservesCell), fmc.makeSettable(crzCGCell)],
				['DATA LINK', 'STEP SIZE'],
				['NO COMM', stepSizeCell],
				['', separator, ''],
				['<INDEX', 'THRUST LIM>']
			]);

			if (fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished) {
				let fmsPreFlightElementGroup = document.querySelector('#fms-preflight');
				fmsPreFlightElementGroup.setAttribute('visibility', 'visible');
			}

			fmc._renderer.lsk(6).event = () => {
				B777_FMC_InitRefIndexPage.ShowPage1(fmc);
			};
			fmc._renderer.rsk(6).event = () => {
				B777_FMC_ThrustLimPage.ShowPage1(fmc);
			};
		});
	}
}
