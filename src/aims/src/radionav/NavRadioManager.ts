export enum TuningMode {
    Auto = 0,
    Manual,
    Remote
}

/**
 * This is a placeholder for the new radio nav tuning logic... coming soon to an B77RS near you
 */
export class NavRadioManager {
    tuningMode1: TuningMode = TuningMode.Auto;

    tuningMode2: TuningMode = TuningMode.Auto;

    tuningMode3: TuningMode = TuningMode.Auto;

    constructor(public _parentInstrument: BaseInstrument) {
        SimVar.SetSimVarValue('L:B77RS_AIMS_RADIONAV_1_TUNING_MODE', 'Enum', TuningMode.Manual);
        SimVar.SetSimVarValue('L:B77RS_AIMS_RADIONAV_2_TUNING_MODE', 'Enum', TuningMode.Manual);
        SimVar.SetSimVarValue('L:B77RS_AIMS_RADIONAV_3_TUNING_MODE', 'Enum', TuningMode.Manual);
    }

    update(_: number): void {
        // Do nothing
    }
}
