import {B777_FMC} from './B777_FMC';
import {B777_FMC_RobPage} from './B777_FMC_RobPage';
import * as HDSDK from './../hdsdk/index';

export class B777_FMC_RobIRSPage {
	private readonly fmc: B777_FMC;

	constructor(fmc: B777_FMC) {
		this.fmc = fmc;
	}

	showPage() {
		this.fmc.cleanUpPage();
		let irsState = SimVar.GetSimVarValue('L:B77RS_ADIRU_STATE', 'Number');
		let irsStateString = '';
		switch (irsState) {
			case 0:
				irsStateString = '[color=red]OFF[/color]';
				break;
			case 1:
				irsStateString = '[color=blue]ALIGNING[/color]';
				break;
			case 2:
				irsStateString = '[color=green]ALIGNED[/color]';
				break;
		}

		let irsAlignSpeed;

		switch (HDSDK.HeavyDataStorage.get('ADIRU_ALIGN_SPEED', 'REAL')) {
			case 'INSTANT':
				irsAlignSpeed = 'INSTANT';
				break;
			case 'FAST':
				irsAlignSpeed = 'FAST';
				break;
			case 'NORMAL':
				irsAlignSpeed = 'NORMAL';
				break;
			case 'REAL':
				irsAlignSpeed = 'REAL';
				break;
		}

		this.fmc.refreshPageCallback = () => {
			this.showPage();
		};

		this.fmc._renderer.renderTitle('ADIRU');
		this.fmc._renderer.render([
			['ADIRU STATUS', 'ALIGN TIME'],
			[irsStateString, irsAlignSpeed + '>'],
			['', ''],
			['', ''],
			['', ''],
			['', ''],
			['', ''],
			['', ''],
			['', ''],
			['', 'FORCE ALIGN>'],
			['', ''],
			['<BACK']
		]);

		this.fmc._renderer.rsk(5).event = () => {
			SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 2);
			SimVar.SetSimVarValue('L:B77RS_ADIRU_BUTTON_STATE', 'Number', 1);
			SimVar.SetSimVarValue('L:B77RS_IS_IRS_INITED', 'String', '2');
			this.showPage();
		};

		this.fmc._renderer.rsk(1).event = () => {
			this.showAlignSpeedConfigurationPage();
		};

		this.fmc._renderer.lsk(6).event = () => {
			B777_FMC_RobPage.ShowPage1(this.fmc);
		};


		this.fmc.registerPeriodicPageRefresh(() => {
			this.showPage();
			return true;
		}, 1000, false);
	}

	showAlignSpeedConfigurationPage() {
		this.fmc.cleanUpPage();

		let irsState = SimVar.GetSimVarValue('L:B77RS_ADIRU_STATE', 'Number');
		let irsStateString = '';
		switch (irsState) {
			case 0:
				irsStateString = '[color=red]OFF[/color]';
				break;
			case 1:
				irsStateString = '[color=blue]ALIGNING[/color]';
				break;
			case 2:
				irsStateString = '[color=green]ALIGNED[/color]';
				break;
		}

		let irsAlignSpeed;

		switch (HDSDK.HeavyDataStorage.get('ADIRU_ALIGN_SPEED', 'REAL')) {
			case 'INSTANT':
				irsAlignSpeed = 'INSTANT';
				break;
			case 'FAST':
				irsAlignSpeed = 'FAST';
				break;
			case 'NORMAL':
				irsAlignSpeed = 'NORMAL';
				break;
			case 'REAL':
				irsAlignSpeed = 'REAL';
				break;
		}


		this.fmc._renderer.renderTitle('ADIRU');
		this.fmc._renderer.render([
			['ADIRU STATUS', 'ALIGN TIME'],
			[irsStateString, irsAlignSpeed],
			['', ''],
			['', '[size=small]<INSTANT[/size]'],
			['', ''],
			['', '[size=small]<FAST[/size]'],
			['', ''],
			['', '[size=small]<NORMAL[/size]'],
			['', ''],
			['', '[size=small]<REAL[/size]'],
			['', ''],
			['<BACK']
		]);


		this.fmc._renderer.rsk(2).event = () => {
			HDSDK.HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'INSTANT');
			this.showPage();
		};

		this.fmc._renderer.rsk(3).event = () => {
			HDSDK.HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'FAST');
			this.showPage();
		};

		this.fmc._renderer.rsk(4).event = () => {
			HDSDK.HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'NORMAL');
			this.showPage();
		};

		this.fmc._renderer.rsk(5).event = () => {
			HDSDK.HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'REAL');
			this.showPage();
		};

	}
}
