extern crate systems;

mod air_conditioning;
mod electrical;
mod fuel;
pub mod hydraulic;
mod navigation;
mod pneumatic;
mod power_consumption;

use self::{
    air_conditioning::B777AirConditioning,
    fuel::B777Fuel,
    pneumatic::{B777Pneumatic, B777PneumaticOverheadPanel},
};
use electrical::{
    B777Electrical, B777ElectricalOverheadPanel, B777EmergencyElectricalOverheadPanel,
    APU_START_MOTOR_BUS_TYPE,
};
use hydraulic::{B777Hydraulic, B777HydraulicOverheadPanel};
use navigation::B777RadioAltimeters;
use power_consumption::B777PowerConsumption;
use systems::simulation::InitContext;

use systems::{
    apu::{
        Aps3200ApuGenerator, Aps3200StartMotor, AuxiliaryPowerUnit, AuxiliaryPowerUnitFactory,
        AuxiliaryPowerUnitFireOverheadPanel, AuxiliaryPowerUnitOverheadPanel,
    },
    electrical::{Electricity, ElectricitySource, ExternalPowerSource},
    engine::{ge90_engine::GE90Engine, EngineFireOverheadPanel},
    hydraulic::brake_circuit::AutobrakePanel,
    landing_gear::{LandingGear, LandingGearControlInterfaceUnitSet},
    navigation::adirs::{
        AirDataInertialReferenceSystem, AirDataInertialReferenceSystemOverheadPanel,
    },
    pressurization::{Pressurization, PressurizationOverheadPanel},
    shared::ElectricalBusType,
    simulation::{Aircraft, SimulationElement, SimulationElementVisitor, UpdateContext},
};

pub struct B777 {
    adirs: AirDataInertialReferenceSystem,
    adirs_overhead: AirDataInertialReferenceSystemOverheadPanel,
    air_conditioning: B777AirConditioning,
    apu: AuxiliaryPowerUnit<Aps3200ApuGenerator, Aps3200StartMotor>,
    apu_fire_overhead: AuxiliaryPowerUnitFireOverheadPanel,
    apu_overhead: AuxiliaryPowerUnitOverheadPanel,
    pneumatic_overhead: B777PneumaticOverheadPanel,
    electrical_overhead: B777ElectricalOverheadPanel,
    emergency_electrical_overhead: B777EmergencyElectricalOverheadPanel,
    fuel: B777Fuel,
    engine_1: GE90Engine,
    engine_2: GE90Engine,
    engine_fire_overhead: EngineFireOverheadPanel<2>,
    electrical: B777Electrical,
    power_consumption: B777PowerConsumption,
    ext_pwr: ExternalPowerSource,
    lgcius: LandingGearControlInterfaceUnitSet,
    hydraulic: B777Hydraulic,
    hydraulic_overhead: B777HydraulicOverheadPanel,
    autobrake_panel: AutobrakePanel,
    landing_gear: LandingGear,
    pressurization: Pressurization,
    pressurization_overhead: PressurizationOverheadPanel,
    pneumatic: B777Pneumatic,
    radio_altimeters: B777RadioAltimeters,
}
impl B777 {
    pub fn new(context: &mut InitContext) -> B777 {
        B777 {
            adirs: AirDataInertialReferenceSystem::new(context),
            adirs_overhead: AirDataInertialReferenceSystemOverheadPanel::new(context),
            air_conditioning: B777AirConditioning::new(context),
            apu: AuxiliaryPowerUnitFactory::new_aps3200(
                context,
                1,
                APU_START_MOTOR_BUS_TYPE,
                ElectricalBusType::DirectCurrentBattery,
                ElectricalBusType::DirectCurrentBattery,
            ),
            apu_fire_overhead: AuxiliaryPowerUnitFireOverheadPanel::new(context),
            apu_overhead: AuxiliaryPowerUnitOverheadPanel::new(context),
            pneumatic_overhead: B777PneumaticOverheadPanel::new(context),
            electrical_overhead: B777ElectricalOverheadPanel::new(context),
            emergency_electrical_overhead: B777EmergencyElectricalOverheadPanel::new(context),
            fuel: B777Fuel::new(context),
            engine_1: GE90Engine::new(context, 1),
            engine_2: GE90Engine::new(context, 2),
            engine_fire_overhead: EngineFireOverheadPanel::new(context),
            electrical: B777Electrical::new(context),
            power_consumption: B777PowerConsumption::new(context),
            ext_pwr: ExternalPowerSource::new(context),
            lgcius: LandingGearControlInterfaceUnitSet::new(
                context,
                ElectricalBusType::DirectCurrentEssential,
                ElectricalBusType::DirectCurrentGndFltService,
            ),
            hydraulic: B777Hydraulic::new(context),
            hydraulic_overhead: B777HydraulicOverheadPanel::new(context),
            autobrake_panel: AutobrakePanel::new(context),
            landing_gear: LandingGear::new(context),
            pressurization: Pressurization::new(context),
            pressurization_overhead: PressurizationOverheadPanel::new(context),
            pneumatic: B777Pneumatic::new(context),
            radio_altimeters: B777RadioAltimeters::new(context),
        }
    }
}
impl Aircraft for B777 {
    fn update_before_power_distribution(
        &mut self,
        context: &UpdateContext,
        electricity: &mut Electricity,
    ) {
        self.apu.update_before_electrical(
            context,
            &self.apu_overhead,
            &self.apu_fire_overhead,
            self.pneumatic_overhead.apu_bleed_is_on(),
            // This will be replaced when integrating the whole electrical system.
            // For now we use the same logic as found in the JavaScript code; ignoring whether or not
            // the engine generators are supplying electricity.
            self.electrical_overhead.apu_generator_is_on()
                && !(self.electrical_overhead.external_power_is_on()
                    && self.electrical_overhead.external_power_is_available()),
            self.pneumatic.apu_bleed_air_valve(),
            self.fuel.left_inner_tank_has_fuel_remaining(),
        );

        self.electrical.update(
            context,
            electricity,
            &self.ext_pwr,
            &self.electrical_overhead,
            &self.emergency_electrical_overhead,
            &mut self.apu,
            &self.apu_overhead,
            &self.engine_fire_overhead,
            [&self.engine_1, &self.engine_2],
            &self.hydraulic,
            self.lgcius.lgciu1(),
        );

        self.electrical_overhead
            .update_after_electrical(&self.electrical, electricity);
        self.emergency_electrical_overhead
            .update_after_electrical(context, &self.electrical);
    }

    fn update_after_power_distribution(&mut self, context: &UpdateContext) {
        self.apu.update_after_power_distribution();
        self.apu_overhead.update_after_apu(&self.apu);

        self.lgcius.update(
            context,
            &self.landing_gear,
            self.hydraulic.gear_system(),
            self.ext_pwr.output_potential().is_powered(),
        );

        self.radio_altimeters.update(context);

        self.pressurization.update(
            context,
            &self.pressurization_overhead,
            [&self.engine_1, &self.engine_2],
            [self.lgcius.lgciu1(), self.lgcius.lgciu2()],
        );

        self.hydraulic.update(
            context,
            &self.engine_1,
            &self.engine_2,
            &self.hydraulic_overhead,
            &self.autobrake_panel,
            &self.engine_fire_overhead,
            &self.lgcius,
            &self.emergency_electrical_overhead,
            &self.electrical,
            &self.pneumatic,
            &self.adirs,
        );

        self.pneumatic.update_hydraulic_reservoir_spatial_volumes(
            self.hydraulic.green_reservoir(),
            self.hydraulic.blue_reservoir(),
            self.hydraulic.yellow_reservoir(),
        );

        self.hydraulic_overhead.update(&self.hydraulic);

        self.adirs.update(context, &self.adirs_overhead);
        self.adirs_overhead.update(context, &self.adirs);

        self.power_consumption.update(context);

        self.pneumatic.update(
            context,
            [&self.engine_1, &self.engine_2],
            &self.pneumatic_overhead,
            &self.engine_fire_overhead,
            &self.apu,
            &self.air_conditioning,
            [self.lgcius.lgciu1(), self.lgcius.lgciu2()],
        );
        self.air_conditioning.update(
            context,
            &self.adirs,
            [&self.engine_1, &self.engine_2],
            &self.engine_fire_overhead,
            &self.pneumatic,
            &self.pneumatic_overhead,
            &self.pressurization,
            &self.pressurization_overhead,
            [self.lgcius.lgciu1(), self.lgcius.lgciu2()],
        );
    }
}
impl SimulationElement for B777 {
    fn accept<T: SimulationElementVisitor>(&mut self, visitor: &mut T) {
        self.adirs.accept(visitor);
        self.adirs_overhead.accept(visitor);
        self.air_conditioning.accept(visitor);
        self.apu.accept(visitor);
        self.apu_fire_overhead.accept(visitor);
        self.apu_overhead.accept(visitor);
        self.electrical_overhead.accept(visitor);
        self.emergency_electrical_overhead.accept(visitor);
        self.fuel.accept(visitor);
        self.pneumatic_overhead.accept(visitor);
        self.engine_1.accept(visitor);
        self.engine_2.accept(visitor);
        self.engine_fire_overhead.accept(visitor);
        self.electrical.accept(visitor);
        self.power_consumption.accept(visitor);
        self.ext_pwr.accept(visitor);
        self.lgcius.accept(visitor);
        self.radio_altimeters.accept(visitor);
        self.autobrake_panel.accept(visitor);
        self.hydraulic.accept(visitor);
        self.hydraulic_overhead.accept(visitor);
        self.landing_gear.accept(visitor);
        self.pressurization.accept(visitor);
        self.pressurization_overhead.accept(visitor);
        self.pneumatic.accept(visitor);

        visitor.visit(self);
    }
}
