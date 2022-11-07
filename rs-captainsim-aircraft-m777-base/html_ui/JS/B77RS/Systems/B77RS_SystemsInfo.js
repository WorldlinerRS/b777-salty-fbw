class B77RS_SystemsInfo {
	static get SYSTEM() {
		return {'APU': 'B77RS_APU', 'IRS': 'B77RS_IRS'};
	}

	constructor() {
		this.systems = {};
		this.systems[B77RS_SystemsInfo.SYSTEM.APU] = new B77RS_APUInfo();
	}

	getAPU() {
		return (this.systems[B77RS_SystemsInfo.SYSTEM.APU] ? this.systems[B77RS_SystemsInfo.SYSTEM.APU] : new B77RS_APUInfo());
	}

	getSystem(name) {
		if (this.systems.hasOwnProperty(name)) {
			return this.systems[name];
		}
		return null;
	}
}
