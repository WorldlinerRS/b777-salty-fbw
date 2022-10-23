import {B777_FMC} from './B777_FMC';
import {B777_FMC_IdentPage} from './B777_FMC_IdentPage';
import {B777_FMC_ApproachPage} from './B777_FMC_ApproachPage';
import {B777_FMC_PosInitPage} from './B777_FMC_PosInitPage';
import {B777_FMC_MaintPage} from './B777_FMC_MaintPage';
import {B777_FMC_ThrustLimPage} from './B777_FMC_ThrustLimPage';
import {B777_FMC_TakeOffRefPage} from './B777_FMC_TakeOffRefPage';
import {B777_FMC_PerfInitPage} from './B777_FMC_PerfInitPage';

export class B777_FMC_InitRefIndexPage {
	static ShowPage1(fmc: B777_FMC) {
		fmc.cleanUpPage();
		fmc._renderer.renderTitle('INIT/REF INDEX');
		fmc._renderer.render([
			[''],
			['<IDENT', 'NAV DATA>'],
			[''],
			['<POS', 'ALTN>'],
			[''],
			['<PERF', 'FMC COMM>'],
			[''],
			['<THRUST LIM'],
			[''],
			['<TAKEOFF'],
			[''],
			['<APPROACH', 'MAINT>']
		]);
		fmc._renderer.lsk(1).event = () => {
			B777_FMC_IdentPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(2).event = () => {
			B777_FMC_PosInitPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(3).event = () => {
			B777_FMC_PerfInitPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(4).event = () => {
			B777_FMC_ThrustLimPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(5).event = () => {
			B777_FMC_TakeOffRefPage.ShowPage1(fmc);
		};
		fmc._renderer.lsk(6).event = () => {
			B777_FMC_ApproachPage.ShowPage1(fmc);
		};
		fmc._renderer.rsk(6).event = () => {
			B777_FMC_MaintPage.ShowPage1(fmc);
		};
	}
}
