import { FlightPlanManager } from '@aims/wtsdk';

export interface FmgcComponent {
    init(baseInstrument: BaseInstrument, flightPlanManager: FlightPlanManager): void;
    update(deltaTime: number): void;
}
