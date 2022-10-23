import {B777_FMC} from './B777_FMC';
import {B777_FMC_RobPage} from './B777_FMC_RobPage';
import {B777_FMC_SimBriefConfigurationPage} from './B777_FMC_SimBriefConfigurationPage';
import * as HDSDK from './../hdsdk/index';

export class B777_FMC_RobConfigurationPage {
	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();

		let fpSyncCell = '';

		switch (HDSDK.HeavyDivision.Configuration.activeFlightPlanSynchronizationStrategy()) {
			case 0:
				fpSyncCell = '[color=green]None[/color]/[size=small]OneWay[/size]>';
				break;
			case 1:
				fpSyncCell = '[size=small]None[/size]/[color=green]OneWay[/color]>';
				break;
			case 2:
				fpSyncCell = '[color=green]None[/color]/[size=small]OneWay[/size]>';
				break;
			case 3:
				fpSyncCell = '[color=green]None[/color]/[size=small]OneWay[/size]>';
				break;
		}

		let simBriefCell = (this.isSimBriefFilled() ? '[color=green]FILLED[/color]>' : '[color=red]NOT FILLED[/color]>');
		let unitsCell = (HDSDK.HeavyDivision.Configuration.useImperial() ? '[color=green]IMPERIAL[/color]←→[size=small]METRIC[/size]>' : '[size=small]IMPERIAL[/size]←→[color=green]METRIC[/color]>');
		let focusableScratchpadCell = (HDSDK.HeavyDivision.Configuration.isFocusableScratchpadEnabled() ? '[color=green]ENABLED[/color]←→[size=small]DISABLED[/size]>' : '[size=small]ENABLED[/size]←→[color=green]DISABLED[/color]>');

		fmc._renderer.renderTitle('HEAVY CONFIGURATION');
		fmc._renderer.render([
			['', 'SimBrief'],
			['', simBriefCell],
			['', 'FP SYNC STRATEGY'],
			['', fpSyncCell],
			['', 'UNITS'],
			['', unitsCell],
			['', 'FOCUSABLE SCRATCHPAD'],
			['', focusableScratchpadCell],
			[''],
			[''],
			[''],
			['<BACK']
		]);

		this.setupInputHandlers(fmc);

	}

	static setupInputHandlers(fmc: B777_FMC) {
		fmc._renderer.lsk(6).event = () => {
			B777_FMC_RobPage.ShowPage1(fmc);
		};

		fmc._renderer.rsk(1).event = () => {
			new B777_FMC_SimBriefConfigurationPage(fmc).showPage();
		};


		fmc._renderer.rsk(2).event = () => {
			switch (HDSDK.HeavyDivision.Configuration.activeFlightPlanSynchronizationStrategy()) {
				case 0:
					HDSDK.HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '1');
					break;
				case 1:
					HDSDK.HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '0');
					break;
				case 2:
					HDSDK.HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '0');
					break;
				case 3:
					HDSDK.HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '0');
					break;
			}
			B777_FMC_RobConfigurationPage.ShowPage1(fmc);
		};


		fmc._renderer.rsk(3).event = () => {
			if (HDSDK.HeavyDivision.Configuration.useImperial()) {
				HDSDK.HeavyDataStorage.set('USE_IMPERIAL', '0');
			} else {
				HDSDK.HeavyDataStorage.set('USE_IMPERIAL', '1');
			}
			B777_FMC_RobConfigurationPage.ShowPage1(fmc);
		};

		fmc._renderer.rsk(4).event = () => {
			if (HDSDK.HeavyDivision.Configuration.isFocusableScratchpadEnabled()) {
				HDSDK.HeavyDataStorage.set('IS_FOCUSABLE_SCRATCHPAD_ENABLED', '0');
				fmc.disableFocusableScratchpad();
			} else {
				fmc.enableFocusableScratchpad();
				HDSDK.HeavyDataStorage.set('IS_FOCUSABLE_SCRATCHPAD_ENABLED', '1');
			}
			B777_FMC_RobConfigurationPage.ShowPage1(fmc);
		};
	}

	static isSimBriefFilled() {
		let username = HDSDK.HeavyDataStorage.get('SIMBRIEF_USERNAME', '');
		let userid = HDSDK.HeavyDataStorage.get('SIMBRIEF_USERID', '');

		return (username !== '' || userid !== '');
	}
}
