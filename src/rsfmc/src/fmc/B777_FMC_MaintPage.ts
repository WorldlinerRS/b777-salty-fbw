import {B777_FMC} from './B777_FMC';
import {B777_FMC_InitRefIndexPage} from './B777_FMC_InitRefIndexPage';

export class B777_FMC_MaintPage {
	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();
		fmc._renderer.renderTitle('MAINT');
		fmc._renderer.render([
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			['<INDEX']
		]);

		fmc._renderer.lsk(6).event = () => {
			B777_FMC_InitRefIndexPage.ShowPage1(fmc);
		};
	}
}
