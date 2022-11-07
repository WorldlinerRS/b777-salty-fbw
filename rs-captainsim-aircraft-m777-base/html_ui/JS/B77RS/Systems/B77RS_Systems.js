/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Be aware. This class should never be used outside ISFD (SAI).
 * This class is used for updating aircraft systems like IRS, APU etc... The class should not be used for getting
 * data about the aircraft systems. "Update" method should never be called from other system than ISFD (SAI) [MFD for example].
 * Systems in aircraft (FMC, MFDs, etc) are independent and it is not possible to get same instance of B77RS_Systems.
 * Even with singleton pattern or static class you will always get different instance (or static class) in each system.
 *
 * Calling "update" method in more than one aircraft system can cause systems instability or performance issues.
 *
 * Use Systems info classes or direct SimVar calls for getting info about B77RS systems.
 *
 * Why ISFD (SAI) is used for updating B77RS systems:
 * 1) ISFD is practically everytime online
 * 2) Airplane has only one ISFD
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

/**
 * NOTICE: Class B77RS_Systems should be independent on B78X version. Both versions use own systems classes.
 */

class B77RS_Systems {

	static get SYSTEM() {
		return {'APU': 'B77RS_APU', 'ADIRU': 'B77RS_ADIRU'};
	}

	constructor() {
		this.initializer = new B77RS_Initializer();
		this.systems = {};
		this.init();
	}

	init() {
		this.initializer.init();
		this.systems[B77RS_Systems.SYSTEM.APU] = {'instance': new B77RS_APU(), delay: 0};
		this.systems[B77RS_Systems.SYSTEM.ADIRU] = {'instance': new B77RS_ADIRU(), delay: 500};
	}

	update(_deltaTime) {
		Object.values(this.systems).forEach((system) => {
				if (typeof system.instance.update === 'function') {
					if (system.instance.update.length === 2) {
						system.instance.update(_deltaTime, system.delay);
					} else if (system.instance.update.length === 1) {
						system.instance.update(_deltaTime);
					}
				}
			}
		);
	}

	getSystem(name) {
		if (this.systems.hasOwnProperty(name)) {
			return this.systems[name].instance;
		}
		return null;
	}
}
