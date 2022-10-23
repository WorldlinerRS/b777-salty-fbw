import { B777_FMC } from "./B777_FMC";
export declare class B777_FMC_RouteDataPage {
    static _updateCounter: number;
    private readonly fmc;
    constructor(fmc: B777_FMC);
    static computeEtaToWaypoint(distance: any, groundSpeed: any): number;
    showPage(currentPage?: number): void;
}
