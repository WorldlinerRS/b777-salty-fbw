import { B777_FMC } from "./B777_FMC";
export declare class B777_FMC_SimBriefConfigurationPage {
    private readonly fmc;
    constructor(fmc: B777_FMC);
    showPage(): void;
    setupInputHandlers(): void;
    getSimBriefUsernameCell(): string;
    getSimBriefUserIdCell(): string;
}
