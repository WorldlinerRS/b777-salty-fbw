Include.addScript('/JS/B77RS/DataHolders/FMC/FMCDataHolder.js');
Include.addScript('/JS/B77RS/DataHolders/MFD/MFDDataHolder.js');
Include.addScript('/JS/B77RS/DataHolders/PFD/PFDDataHolder.js');

/**
 * This class should not be used. Use FMCDataHolder/MFDDataHolder/PFDDataHolder directly
 */

class HeavyDataHolder {
	/**
	 *
	 * @returns {MFDDataHolder}
	 */
	get mfd() {
		return this._mfd;
	}

	/**
	 *
	 * @returns {PFDDataHolder}
	 */
	get pfd() {
		return this._pfd;
	}

	/**
	 *
	 * @returns {FMCDataHolder}
	 */
	get fmc() {
		return this._fmc;
	}

	constructor() {
		this._fmc = new FMCDataHolder();
		this._mfd = new MFDDataHolder();
		this._pfd = new PFDDataHolder();
	}
}
