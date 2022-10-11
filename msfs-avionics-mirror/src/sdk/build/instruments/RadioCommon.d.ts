/** The basic radio types. */
export declare enum RadioType {
    Com = "COM",
    Nav = "NAV",
    Adf = "ADF"
}
/** Encapsulates a single radio's state. */
export declare type Radio = {
    /** Index number of the radio. */
    index: number;
    /** The current active frequency. */
    activeFrequency: number;
    /** The ident of the active station */
    ident: string | null;
    /** Signal strength of the active station. */
    signal: number;
    /** The current standby frequency. */
    standbyFrequency: number;
    /** The appropriate RadioType for this radio. */
    radioType: RadioType;
    /** Whether this radio is selected for changes. */
    selected: boolean;
};
/** The two frequency "banks", active and standby. */
export declare enum FrequencyBank {
    Active = 0,
    Standby = 1
}
/** Events relating to changes in a radio's state. */
export interface RadioEvents {
    /** Set the state of a radio. */
    set_radio_state: Radio;
    /** Change the stanby frequency in a radio. */
    set_frequency: FrequencyChangeEvent;
    /** Publish the ident of a tuned station. */
    set_ident: IdentChangeEvent;
    /** Publish the signal strength of the active station. */
    set_signal_strength: number;
    /** ADF1 Standby Frequency */
    adf_standby_frequency_1: number;
    /** ADF1 Active Frequency */
    adf_active_frequency_1: number;
}
/** Encapsuation of a frequency change event. */
export declare type FrequencyChangeEvent = {
    /** The type of radio to change. */
    radio: Radio;
    /** The frequency bank to update. */
    bank: FrequencyBank;
    /** The new frequency in MHz. */
    frequency: number;
};
/** Encapsulation of a new ident event */
export declare type IdentChangeEvent = {
    /** The radio currently tuned. */
    index: number;
    /** The new ident. */
    ident: string;
};
/** COM frequency spacing on COM radios. */
export declare enum ComSpacing {
    /** 25Khz spacing */
    Spacing25Khz = 0,
    /** 8.33Khz spacing */
    Spacing833Khz = 1
}
/** Encapsulation of a COM spacing change event. */
export declare type ComSpacingChangeEvent = {
    /** The index of the COM radio to update. */
    index: number;
    /** The spacing of the COM radio. */
    spacing: ComSpacing;
};
//# sourceMappingURL=RadioCommon.d.ts.map