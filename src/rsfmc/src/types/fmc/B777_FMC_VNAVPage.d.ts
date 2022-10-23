import { B777_FMC } from "./B777_FMC";
export declare class B777_FMC_VNAVPage {
    private fmc;
    private enforcedPage;
    constructor(fmc: B777_FMC);
    showPage(): void;
    getClimbPageTitle(): string;
    getClimbCruiseAltitudeCell(): string;
    getClimbSpeedRestrictionCell(): string;
    getClimbSpeedTransitionCell(): string;
    getClimbTransitionAltitudeCell(): string;
    getSelectedClimbSpeedCell(): string;
    getEconClimbPromptCell(): "" | "<ECON";
    getEconClimbSpeedCell(): string;
    setupClimbPageEvents(): void;
    checkExecHandlers(): void;
    showPage1(): void;
    getCruisePageTitle(): string;
    getCruiseAltitudeCell(): string;
    getSelectedCruiseSpeedCell(): string;
    getEconCruisePromptCell(): "" | "<ECON";
    getEconCruiseSpeedCell(): string;
    getN1Cell(): string;
    setupCruisePageEvents(): void;
    showPage2(): void;
    showPage3(): void;
}
