import {B777_FMC} from './B777_FMC';

export class B777_FMC_FMCCommPage {
	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();
		fmc._renderer.renderTitle('FMC COMM');
		fmc._renderer.renderPages(1, 2);
		fmc._renderer.render([
			[''],
			['<RTE 1', 'POS REPORT>'],
			['UPLINK'],
			['<DES FORECAST'],
			[''],
			['<RTE DATA'],
			[''],
			[''],
			[''],
			[''],
			['DATA LINK'],
			['READY']
		]);
	}
}
