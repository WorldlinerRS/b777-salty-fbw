Include.addScript("/JS/B77RS/DataHolders/FMC/PreFlightDataHolder.js");

class FMCDataHolder {
	get preFlightDataHolder() {
		return this._preFlightDataHolder;
	}
	constructor() {
		this._preFlightDataHolder = new PreFlightDataHolder();
	}
}
