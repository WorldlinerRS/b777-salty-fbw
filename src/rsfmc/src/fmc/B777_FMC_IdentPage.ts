import {B777_FMC} from './B777_FMC';
import {B777_FMC_InitRefIndexPage} from './B777_FMC_InitRefIndexPage';
import {B777_FMC_PosInitPage} from './B777_FMC_PosInitPage';

export class B777_FMC_IdentPage {

	static _updateCounter = 0;

	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();

		B777_FMC_IdentPage._updateCounter = 0;
		fmc.pageUpdate = () => {
			if (B777_FMC_IdentPage._updateCounter >= 50) {
				B777_FMC_IdentPage.ShowPage1(fmc);
			} else {
				B777_FMC_IdentPage._updateCounter++;
			}
		};

		let date = fmc.getNavDataDateRange();

		fmc._renderer.renderTitle('IDENT');

		fmc._renderer.render([
			['MODEL', 'ENG RATING'],
			['777-200.1', 'GE90-90B'],
			['NAV DATA', 'ACTIVE'],
			['AIRAC', date.toString()],
			['OP PROGRAM', 'CO DATA'],
			[fmc.fmcManVersion, 'VS1001'],
			['OPC'],
			[fmc.fmcBakVersion, ''],
            ['', 'DRAG/FF'],
			['', '+0.0/+0.0'],
			['', '__FMCSEPARATOR', ''],
			['<INDEX', 'POS INIT>']
		]);

		if (fmc.urlConfig.index == 1) {
			fmc._renderer.lsk(6).event = () => {
				B777_FMC_InitRefIndexPage.ShowPage1(fmc);
			};

			fmc._renderer.rsk(6).event = () => {
				B777_FMC_PosInitPage.ShowPage1(fmc);
			};
		}

		/**
		 * Set periodic page refresh if version of HD mode is not loaded from misc file
		 */
		if (fmc.fmcManVersion.includes('XXXX-X-X') || fmc.fmcBakVersion.includes('XXXX-X-X')) {
			fmc.registerPeriodicPageRefresh(() => {
				B777_FMC_IdentPage.ShowPage1(fmc);
				return true;
			}, 100, false);
		}
	}
}
