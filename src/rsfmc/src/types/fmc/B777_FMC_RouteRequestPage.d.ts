import { B777_FMC } from "./B777_FMC";
export declare class B777_FMC_RouteRequestPage {
    private readonly fmc;
    private eventProtector;
    private readonly progress;
    private flightPlan;
    private waypoints;
    constructor(fmc: B777_FMC);
    showPage(): void;
    parseAirways(navlog: any): any[];
    setupInputHandlers(): void;
    updateProgress(iterator: any): void;
    insertWaypointsAlongAirway(lastWaypointIdent: any, index: any, airwayName: any, callback?: (arg0: boolean) => void): Promise<void>;
    insertWaypointsAlongAirway2(lastWaypointIdent: any, index: any, airwayName: any, callback?: (arg0: boolean) => void): Promise<void>;
    insertWaypoint(newWaypointTo: any, index: any, iterator: any, callback?: (arg0: boolean) => void): void;
    getOrSelectWaypointByIdent(ident: any, iterator: any, callback: any): void;
}
