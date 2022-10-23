import {B777_FMC} from './B777_FMC';
import {B777_FMC_RobIRSPage} from './B777_FMC_RobIRSPage';
import {B777_FMC_PayloadManagerPage} from './B777_FMC_PayloadManagerPage';
import {B777_FMC_RobConfigurationPage} from './B777_FMC_RobConfigurationPage';

export class B777_FMC_RobPage {

	static WITHOUT_MANAGERS: boolean = false;

	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();
		let rows = [
			[''],
			['', ''],
			[''],
			['', ''],
			[''],
			['', ''],
			[''],
			[''],
			[''],
			[''],
			[''],
			['', 'CONFIGURATION>']
		];

		if (!B777_FMC_RobPage.WITHOUT_MANAGERS) {
			rows[1] = ['', 'IRS Menu>'];
			rows[3] = ['', 'Payload Manager>'];
			//rows[5] = ['', 'SimRate Manager>'];

			fmc._renderer.rsk(1).event = () => {
				new B777_FMC_RobIRSPage(fmc).showPage();
			};

			fmc._renderer.rsk(2).event = () => {
				new B777_FMC_PayloadManagerPage(fmc).showPage();
			};
			/*
			 fmc._renderer.rsk(3).event = () => {
			 new B777_FMC_SimRateManagerPage(fmc).showPage();
			 };
			 */
		}

		fmc._renderer.rsk(6).event = () => {
			B777_FMC_RobConfigurationPage.ShowPage1(fmc);
		};

		fmc._renderer.renderTitle('ROB MENU');
		fmc._renderer.render(rows);

	}
}
