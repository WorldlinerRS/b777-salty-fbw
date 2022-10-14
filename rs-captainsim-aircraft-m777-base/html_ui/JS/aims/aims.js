(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@shared/flightplan'), require('@shared/persistence'), require('@aims/types/fstypes/FSEnums'), require('@aims/flightplanning/data/flightplan'), require('msfs-geo'), require('@fmgc/types/fstypes/FSEnums'), require('@aims/flightplanning/FlightPlanManager'), require('@aims/guidance/LnavConfig'), require('@aims/wtsdk'), require('@fmgc/flightphase/Phase'), require('@shared/autopilot'), require('@shared/flightphase'), require('@shared/logic'), require('@aims/guidance/lnav/legs/HX'), require('@aims/guidance/lnav/legs/PI'), require('@aims/guidance/lnav/legs/RF'), require('@aims/guidance/lnav/legs/TF'), require('@aims/guidance/lnav/legs/VM'), require('@aims/guidance/lnav/legs/CA'), require('@aims/guidance/lnav/TransitionPicker'), require('@aims/guidance/lnav/legs/IF'), require('@aims/guidance/lnav/legs/DF'), require('@aims/guidance/lnav/legs/CF'), require('@aims/guidance/lnav/legs/CR'), require('@aims/guidance/lnav/legs/CI'), require('@aims/guidance/lnav/legs/XF'), require('@aims/guidance/lnav/legs/AF'), require('@aims/guidance/lnav/legs'), require('@aims/guidance/lnav/Transition'), require('@aims/guidance/lnav/transitions/FixedRadiusTransition'), require('@aims/guidance/lnav/transitions/CourseCaptureTransition'), require('@aims/guidance/lnav/transitions/DirectToFixTransition'), require('@aims/guidance/lnav/CommonGeometry'), require('@aims/guidance/lnav/PseudoWaypoints'), require('@aims/efis/EfisVectors'), require('@shared/NavigationDisplay'), require('@aims/guidance/TaskQueue'), require('@shared/simvar'), require('@aims/flightphase'), require('@shared/MathUtils'), require('@aims/guidance/Geometry'), require('@aims/guidance/lnav/transitions/PathCaptureTransition'), require('@aims/guidance/GuidanceConstants'), require('@aims/guidance/vnav/descent/DecelPathBuilder'), require('@aims/guidance/vnav/descent/DescentBuilder'), require('@aims/guidance/vnav/VnavConfig'), require('@aims/guidance/ControlLaws'), require('@aims/guidance/vnav/AtmosphericConditions'), require('@aims/guidance/vnav/CoarsePredictions'), require('@fmgc/flightplanning/FlightPlanManager'), require('@fmgc/guidance/lnav/PathVector'), require('@fmgc/wtsdk'), require('@shared/FlowEventSync'), require('@fmgc/guidance/LnavConfig'), require('@aims/guidance/vnav/Predictions'), require('@aims/guidance/vnav/common'), require('@aims/flightplanning/FlightPlanSegment'), require('@aims/components/ReadySignal'), require('@aims/components/fms-messages/TurnAreaExceedance'), require('@shared/FmMessages'), require('@aims/navigation/RequiredPerformance')) :
  typeof define === 'function' && define.amd ? define(['exports', '@shared/flightplan', '@shared/persistence', '@aims/types/fstypes/FSEnums', '@aims/flightplanning/data/flightplan', 'msfs-geo', '@fmgc/types/fstypes/FSEnums', '@aims/flightplanning/FlightPlanManager', '@aims/guidance/LnavConfig', '@aims/wtsdk', '@fmgc/flightphase/Phase', '@shared/autopilot', '@shared/flightphase', '@shared/logic', '@aims/guidance/lnav/legs/HX', '@aims/guidance/lnav/legs/PI', '@aims/guidance/lnav/legs/RF', '@aims/guidance/lnav/legs/TF', '@aims/guidance/lnav/legs/VM', '@aims/guidance/lnav/legs/CA', '@aims/guidance/lnav/TransitionPicker', '@aims/guidance/lnav/legs/IF', '@aims/guidance/lnav/legs/DF', '@aims/guidance/lnav/legs/CF', '@aims/guidance/lnav/legs/CR', '@aims/guidance/lnav/legs/CI', '@aims/guidance/lnav/legs/XF', '@aims/guidance/lnav/legs/AF', '@aims/guidance/lnav/legs', '@aims/guidance/lnav/Transition', '@aims/guidance/lnav/transitions/FixedRadiusTransition', '@aims/guidance/lnav/transitions/CourseCaptureTransition', '@aims/guidance/lnav/transitions/DirectToFixTransition', '@aims/guidance/lnav/CommonGeometry', '@aims/guidance/lnav/PseudoWaypoints', '@aims/efis/EfisVectors', '@shared/NavigationDisplay', '@aims/guidance/TaskQueue', '@shared/simvar', '@aims/flightphase', '@shared/MathUtils', '@aims/guidance/Geometry', '@aims/guidance/lnav/transitions/PathCaptureTransition', '@aims/guidance/GuidanceConstants', '@aims/guidance/vnav/descent/DecelPathBuilder', '@aims/guidance/vnav/descent/DescentBuilder', '@aims/guidance/vnav/VnavConfig', '@aims/guidance/ControlLaws', '@aims/guidance/vnav/AtmosphericConditions', '@aims/guidance/vnav/CoarsePredictions', '@fmgc/flightplanning/FlightPlanManager', '@fmgc/guidance/lnav/PathVector', '@fmgc/wtsdk', '@shared/FlowEventSync', '@fmgc/guidance/LnavConfig', '@aims/guidance/vnav/Predictions', '@aims/guidance/vnav/common', '@aims/flightplanning/FlightPlanSegment', '@aims/components/ReadySignal', '@aims/components/fms-messages/TurnAreaExceedance', '@shared/FmMessages', '@aims/navigation/RequiredPerformance'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Aims = {}, global.flightplan, global.persistence, global.FSEnums$1, global.flightplan$1, global.msfsGeo, global.FSEnums, global.FlightPlanManager$1, global.LnavConfig, global.wtsdk, global.Phase, global.autopilot, global.flightphase, global.logic, global.HX, global.PI, global.RF, global.TF, global.VM, global.CA, global.TransitionPicker, global.IF, global.DF, global.CF, global.CR, global.CI, global.XF, global.AF, global.legs, global.Transition, global.FixedRadiusTransition, global.CourseCaptureTransition, global.DirectToFixTransition, global.CommonGeometry, global.PseudoWaypoints, global.EfisVectors, global.NavigationDisplay, global.TaskQueue, global.simvar, global.flightphase$1, global.MathUtils, global.Geometry$1, global.PathCaptureTransition, global.GuidanceConstants, global.DecelPathBuilder$1, global.DescentBuilder$1, global.VnavConfig, global.ControlLaws, global.AtmosphericConditions, global.CoarsePredictions, global.FlightPlanManager$2, global.PathVector, global.wtsdk$1, global.FlowEventSync, global.LnavConfig$1, global.Predictions$1, global.common, global.FlightPlanSegment$1, global.ReadySignal, global.TurnAreaExceedance, global.FmMessages, global.RequiredPerformance));
})(this, (function (exports, flightplan, persistence, FSEnums$1, flightplan$1, msfsGeo, FSEnums, FlightPlanManager$1, LnavConfig, wtsdk, Phase, autopilot, flightphase, logic, HX, PI, RF, TF, VM, CA, TransitionPicker, IF, DF, CF, CR, CI, XF, AF, legs, Transition, FixedRadiusTransition, CourseCaptureTransition, DirectToFixTransition, CommonGeometry, PseudoWaypoints, EfisVectors, NavigationDisplay, TaskQueue, simvar, flightphase$1, MathUtils, Geometry$1, PathCaptureTransition, GuidanceConstants, DecelPathBuilder$1, DescentBuilder$1, VnavConfig, ControlLaws, AtmosphericConditions, CoarsePredictions, FlightPlanManager$2, PathVector, wtsdk$1, FlowEventSync, LnavConfig$1, Predictions$1, common, FlightPlanSegment$1, ReadySignal, TurnAreaExceedance, FmMessages, RequiredPerformance) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  // Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
  // SPDX-License-Identifier: MIT

  let AirportClass;
  (function (AirportClass) {
    AirportClass[AirportClass["Unknown"] = 0] = "Unknown";
    AirportClass[AirportClass["Normal"] = 1] = "Normal";
    AirportClass[AirportClass["SoftUnknown"] = 2] = "SoftUnknown";
    AirportClass[AirportClass["Seaplane"] = 3] = "Seaplane";
    AirportClass[AirportClass["Heliport"] = 4] = "Heliport";
    AirportClass[AirportClass["Private"] = 5] = "Private";
  })(AirportClass || (AirportClass = {}));
  let AirportPrivateType;
  (function (AirportPrivateType) {
    AirportPrivateType[AirportPrivateType["Unknown"] = 0] = "Unknown";
    AirportPrivateType[AirportPrivateType["Public"] = 1] = "Public";
    AirportPrivateType[AirportPrivateType["Military"] = 2] = "Military";
    AirportPrivateType[AirportPrivateType["Private"] = 3] = "Private";
  })(AirportPrivateType || (AirportPrivateType = {}));
  let AirspaceType;
  (function (AirspaceType) {
    AirspaceType[AirspaceType["None"] = 0] = "None";
    AirspaceType[AirspaceType["Center"] = 1] = "Center";
    AirspaceType[AirspaceType["ClassA"] = 2] = "ClassA";
    AirspaceType[AirspaceType["ClassB"] = 3] = "ClassB";
    AirspaceType[AirspaceType["ClassC"] = 4] = "ClassC";
    AirspaceType[AirspaceType["ClassD"] = 5] = "ClassD";
    AirspaceType[AirspaceType["ClassE"] = 6] = "ClassE";
    AirspaceType[AirspaceType["ClassF"] = 7] = "ClassF";
    AirspaceType[AirspaceType["ClassG"] = 8] = "ClassG";
    AirspaceType[AirspaceType["Tower"] = 9] = "Tower";
    AirspaceType[AirspaceType["Clearance"] = 10] = "Clearance";
    AirspaceType[AirspaceType["Ground"] = 11] = "Ground";
    AirspaceType[AirspaceType["Departure"] = 12] = "Departure";
    AirspaceType[AirspaceType["Approach"] = 13] = "Approach";
    AirspaceType[AirspaceType["MOA"] = 14] = "MOA";
    AirspaceType[AirspaceType["Restricted"] = 15] = "Restricted";
    AirspaceType[AirspaceType["Prohibited"] = 16] = "Prohibited";
    AirspaceType[AirspaceType["Warning"] = 17] = "Warning";
    AirspaceType[AirspaceType["Alert"] = 18] = "Alert";
    AirspaceType[AirspaceType["Danger"] = 19] = "Danger";
    AirspaceType[AirspaceType["NationalPark"] = 20] = "NationalPark";
    AirspaceType[AirspaceType["ModeC"] = 21] = "ModeC";
    AirspaceType[AirspaceType["Radar"] = 22] = "Radar";
    AirspaceType[AirspaceType["Training"] = 23] = "Training";
  })(AirspaceType || (AirspaceType = {}));
  let AltitudeDescriptor;
  (function (AltitudeDescriptor) {
    AltitudeDescriptor[AltitudeDescriptor["Empty"] = 0] = "Empty";
    AltitudeDescriptor[AltitudeDescriptor["At"] = 1] = "At";
    AltitudeDescriptor[AltitudeDescriptor["AtOrAbove"] = 2] = "AtOrAbove";
    AltitudeDescriptor[AltitudeDescriptor["AtOrBelow"] = 3] = "AtOrBelow";
    AltitudeDescriptor[AltitudeDescriptor["Between"] = 4] = "Between";
    AltitudeDescriptor[AltitudeDescriptor["C"] = 5] = "C";
    AltitudeDescriptor[AltitudeDescriptor["G"] = 6] = "G";
    AltitudeDescriptor[AltitudeDescriptor["H"] = 7] = "H";
    AltitudeDescriptor[AltitudeDescriptor["I"] = 8] = "I";
    AltitudeDescriptor[AltitudeDescriptor["J"] = 9] = "J";
    AltitudeDescriptor[AltitudeDescriptor["V"] = 10] = "V";
  })(AltitudeDescriptor || (AltitudeDescriptor = {}));
  let FixTypeFlags;
  (function (FixTypeFlags) {
    FixTypeFlags[FixTypeFlags["None"] = 0] = "None";
    FixTypeFlags[FixTypeFlags["IAF"] = 1] = "IAF";
    FixTypeFlags[FixTypeFlags["IF"] = 2] = "IF";
    FixTypeFlags[FixTypeFlags["MAP"] = 4] = "MAP";
    FixTypeFlags[FixTypeFlags["FAF"] = 8] = "FAF";
  })(FixTypeFlags || (FixTypeFlags = {}));
  let FrequencyType;

  // ARINC424 names
  (function (FrequencyType) {
    FrequencyType[FrequencyType["None"] = 0] = "None";
    FrequencyType[FrequencyType["ATIS"] = 1] = "ATIS";
    FrequencyType[FrequencyType["Multicom"] = 2] = "Multicom";
    FrequencyType[FrequencyType["Unicom"] = 3] = "Unicom";
    FrequencyType[FrequencyType["CTAF"] = 4] = "CTAF";
    FrequencyType[FrequencyType["Ground"] = 5] = "Ground";
    FrequencyType[FrequencyType["Tower"] = 6] = "Tower";
    FrequencyType[FrequencyType["Clearance"] = 7] = "Clearance";
    FrequencyType[FrequencyType["Approach"] = 8] = "Approach";
    FrequencyType[FrequencyType["Departure"] = 9] = "Departure";
    FrequencyType[FrequencyType["Center"] = 10] = "Center";
    FrequencyType[FrequencyType["FSS"] = 11] = "FSS";
    FrequencyType[FrequencyType["AWOS"] = 12] = "AWOS";
    FrequencyType[FrequencyType["ASOS"] = 13] = "ASOS";
    FrequencyType[FrequencyType["ClearancePreTaxi"] = 14] = "ClearancePreTaxi";
    FrequencyType[FrequencyType["RemoteDeliveryClearance"] = 15] = "RemoteDeliveryClearance";
  })(FrequencyType || (FrequencyType = {}));
  let LegType;
  (function (LegType) {
    LegType[LegType["Unknown"] = 0] = "Unknown";
    LegType[LegType["AF"] = 1] = "AF";
    LegType[LegType["CA"] = 2] = "CA";
    LegType[LegType["CD"] = 3] = "CD";
    LegType[LegType["CF"] = 4] = "CF";
    LegType[LegType["CI"] = 5] = "CI";
    LegType[LegType["CR"] = 6] = "CR";
    LegType[LegType["DF"] = 7] = "DF";
    LegType[LegType["FA"] = 8] = "FA";
    LegType[LegType["FC"] = 9] = "FC";
    LegType[LegType["FD"] = 10] = "FD";
    LegType[LegType["FM"] = 11] = "FM";
    LegType[LegType["HA"] = 12] = "HA";
    LegType[LegType["HF"] = 13] = "HF";
    LegType[LegType["HM"] = 14] = "HM";
    LegType[LegType["IF"] = 15] = "IF";
    LegType[LegType["PI"] = 16] = "PI";
    LegType[LegType["RF"] = 17] = "RF";
    LegType[LegType["TF"] = 18] = "TF";
    LegType[LegType["VA"] = 19] = "VA";
    LegType[LegType["VD"] = 20] = "VD";
    LegType[LegType["VI"] = 21] = "VI";
    LegType[LegType["VM"] = 22] = "VM";
    LegType[LegType["VR"] = 23] = "VR";
  })(LegType || (LegType = {}));
  let NdbType;
  (function (NdbType) {
    NdbType[NdbType["CompassLocator"] = 0] = "CompassLocator";
    NdbType[NdbType["MH"] = 1] = "MH";
    NdbType[NdbType["H"] = 2] = "H";
    NdbType[NdbType["HH"] = 3] = "HH";
  })(NdbType || (NdbType = {}));
  let NearestSearchType;
  (function (NearestSearchType) {
    NearestSearchType[NearestSearchType["None"] = 0] = "None";
    NearestSearchType[NearestSearchType["Airport"] = 1] = "Airport";
    NearestSearchType[NearestSearchType["Intersection"] = 2] = "Intersection";
    NearestSearchType[NearestSearchType["Vor"] = 3] = "Vor";
    NearestSearchType[NearestSearchType["Ndb"] = 4] = "Ndb";
    NearestSearchType[NearestSearchType["Boundary"] = 5] = "Boundary";
  })(NearestSearchType || (NearestSearchType = {}));
  let RnavTypeFlags;
  (function (RnavTypeFlags) {
    RnavTypeFlags[RnavTypeFlags["None"] = 0] = "None";
    RnavTypeFlags[RnavTypeFlags["Lnav"] = 1] = "Lnav";
    RnavTypeFlags[RnavTypeFlags["LnavVnav"] = 2] = "LnavVnav";
    RnavTypeFlags[RnavTypeFlags["Lp"] = 4] = "Lp";
    RnavTypeFlags[RnavTypeFlags["Lpv"] = 8] = "Lpv";
  })(RnavTypeFlags || (RnavTypeFlags = {}));
  let RouteType;
  (function (RouteType) {
    RouteType[RouteType["None"] = 0] = "None";
    RouteType[RouteType["LowLevel"] = 1] = "LowLevel";
    RouteType[RouteType["HighLevel"] = 2] = "HighLevel";
    RouteType[RouteType["All"] = 3] = "All";
  })(RouteType || (RouteType = {}));
  let RunwayDesignatorChar;
  (function (RunwayDesignatorChar) {
    RunwayDesignatorChar[RunwayDesignatorChar["L"] = 1] = "L";
    RunwayDesignatorChar[RunwayDesignatorChar["R"] = 2] = "R";
    RunwayDesignatorChar[RunwayDesignatorChar["C"] = 3] = "C";
    RunwayDesignatorChar[RunwayDesignatorChar["W"] = 4] = "W";
    RunwayDesignatorChar[RunwayDesignatorChar["A"] = 5] = "A";
    RunwayDesignatorChar[RunwayDesignatorChar["B"] = 6] = "B";
  })(RunwayDesignatorChar || (RunwayDesignatorChar = {}));
  let RunwayLighting;
  (function (RunwayLighting) {
    RunwayLighting[RunwayLighting["Unknown"] = 0] = "Unknown";
    RunwayLighting[RunwayLighting["None"] = 1] = "None";
    RunwayLighting[RunwayLighting["PartTime"] = 2] = "PartTime";
    RunwayLighting[RunwayLighting["FullTime"] = 3] = "FullTime";
    RunwayLighting[RunwayLighting["Frequency"] = 4] = "Frequency";
  })(RunwayLighting || (RunwayLighting = {}));
  let RunwaySurface;
  (function (RunwaySurface) {
    RunwaySurface[RunwaySurface["Concrete"] = 0] = "Concrete";
    RunwaySurface[RunwaySurface["Grass"] = 1] = "Grass";
    RunwaySurface[RunwaySurface["WaterFsx"] = 2] = "WaterFsx";
    RunwaySurface[RunwaySurface["GrassBumpy"] = 3] = "GrassBumpy";
    RunwaySurface[RunwaySurface["Asphalt"] = 4] = "Asphalt";
    RunwaySurface[RunwaySurface["ShortGrass"] = 5] = "ShortGrass";
    RunwaySurface[RunwaySurface["LongGrass"] = 6] = "LongGrass";
    RunwaySurface[RunwaySurface["HardTurf"] = 7] = "HardTurf";
    RunwaySurface[RunwaySurface["Snow"] = 8] = "Snow";
    RunwaySurface[RunwaySurface["Ice"] = 9] = "Ice";
    RunwaySurface[RunwaySurface["Urban"] = 10] = "Urban";
    RunwaySurface[RunwaySurface["Forest"] = 11] = "Forest";
    RunwaySurface[RunwaySurface["Dirt"] = 12] = "Dirt";
    RunwaySurface[RunwaySurface["Coral"] = 13] = "Coral";
    RunwaySurface[RunwaySurface["Gravel"] = 14] = "Gravel";
    RunwaySurface[RunwaySurface["OilTreated"] = 15] = "OilTreated";
    RunwaySurface[RunwaySurface["SteelMats"] = 16] = "SteelMats";
    RunwaySurface[RunwaySurface["Bituminous"] = 17] = "Bituminous";
    RunwaySurface[RunwaySurface["Brick"] = 18] = "Brick";
    RunwaySurface[RunwaySurface["Macadam"] = 19] = "Macadam";
    RunwaySurface[RunwaySurface["Planks"] = 20] = "Planks";
    RunwaySurface[RunwaySurface["Sand"] = 21] = "Sand";
    RunwaySurface[RunwaySurface["Shale"] = 22] = "Shale";
    RunwaySurface[RunwaySurface["Tarmac"] = 23] = "Tarmac";
    RunwaySurface[RunwaySurface["WrightFlyerTrack"] = 24] = "WrightFlyerTrack";
    RunwaySurface[RunwaySurface["Ocean"] = 26] = "Ocean";
    RunwaySurface[RunwaySurface["Water"] = 27] = "Water";
    RunwaySurface[RunwaySurface["Pond"] = 28] = "Pond";
    RunwaySurface[RunwaySurface["Lake"] = 29] = "Lake";
    RunwaySurface[RunwaySurface["River"] = 30] = "River";
    RunwaySurface[RunwaySurface["WasterWater"] = 31] = "WasterWater";
    RunwaySurface[RunwaySurface["Paint"] = 32] = "Paint";
  })(RunwaySurface || (RunwaySurface = {}));
  let TurnDirection;
  (function (TurnDirection) {
    TurnDirection[TurnDirection["Unknown"] = 0] = "Unknown";
    TurnDirection[TurnDirection["Left"] = 1] = "Left";
    TurnDirection[TurnDirection["Right"] = 2] = "Right";
    TurnDirection[TurnDirection["Either"] = 3] = "Either";
  })(TurnDirection || (TurnDirection = {}));
  let VorClass;
  (function (VorClass) {
    VorClass[VorClass["Unknown"] = 0] = "Unknown";
    VorClass[VorClass["Terminal"] = 1] = "Terminal";
    VorClass[VorClass["LowAltitude"] = 2] = "LowAltitude";
    VorClass[VorClass["HighAlttitude"] = 3] = "HighAlttitude";
    VorClass[VorClass["ILS"] = 4] = "ILS";
    VorClass[VorClass["VOT"] = 5] = "VOT";
  })(VorClass || (VorClass = {}));
  let VorType;
  (function (VorType) {
    VorType[VorType["Unknown"] = 0] = "Unknown";
    VorType[VorType["VOR"] = 1] = "VOR";
    VorType[VorType["VORDME"] = 2] = "VORDME";
    VorType[VorType["DME"] = 3] = "DME";
    VorType[VorType["TACAN"] = 4] = "TACAN";
    VorType[VorType["VORTAC"] = 5] = "VORTAC";
    VorType[VorType["ILS"] = 6] = "ILS";
    VorType[VorType["VOT"] = 7] = "VOT";
  })(VorType || (VorType = {}));

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  /**
   * A segment of a flight plan.
   */
  class FlightPlanSegment {
    /**
    * Creates a new FlightPlanSegment.
    * @param type The type of the flight plan segment.
    * @param offset The offset within the original flight plan that
    * the segment starts at.
    * @param waypoints The waypoints in the flight plan segment.
    */
    constructor(type, offset, waypoints) {
      this.type = type;
      this.offset = offset;
      this.waypoints = waypoints;
      this.type = type;
      this.offset = offset;
      this.waypoints = waypoints;
    }

    /** An empty flight plan segment. */
  }

  /** Types of flight plan segments. */
  _defineProperty(FlightPlanSegment, "Empty", new FlightPlanSegment(-1, -1, []));
  let SegmentType;
  (function (SegmentType) {
    SegmentType[SegmentType["Origin"] = 0] = "Origin";
    SegmentType[SegmentType["Departure"] = 1] = "Departure";
    SegmentType[SegmentType["Enroute"] = 2] = "Enroute";
    SegmentType[SegmentType["Arrival"] = 3] = "Arrival";
    SegmentType[SegmentType["Approach"] = 4] = "Approach";
    SegmentType[SegmentType["Missed"] = 5] = "Missed";
    SegmentType[SegmentType["Destination"] = 6] = "Destination";
  })(SegmentType || (SegmentType = {}));

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /** Generates fix names based on the ARINC default naming scheme. */
  class FixNamingScheme {
    /**
       * Generates a fix name for a vector type fix.
       *
       * @returns The generated fix name.
       */
    static vector() {
      return 'MANUAL';
    }

    /**
       * Generates a fix name for a heading to altitude type fix.
       *
       * @param altitudeFeet The altitude that will be flown to.
       *
       * @returns The generated fix name.
       */
    static headingUntilAltitude(altitudeFeet) {
      return Math.round(altitudeFeet).toString();
    }

    /**
     * Generates a fix name for a course to distance type fix.
     *
     * @param course The course that will be flown.
     * @param distance The distance along the course or from the reference fix.
     *
     * @returns The generated fix name.
     */
    static courseToDistance(course, distance) {
      const roundedDistance = Math.round(distance);
      const distanceAlpha = distance > 26 ? 'Z' : this.alphabet[roundedDistance];
      return "D".concat(course.toFixed(0).padStart(3, '0')).concat(distanceAlpha);
    }

    /**
     * Generates a fix name for a course turn to intercept type fix.
     *
     * @param course The course that will be turned to.
     *
     * @returns The generated fix name.
     */
    static courseToIntercept(course) {
      return 'INTCPT';
    }
  }
  _defineProperty(FixNamingScheme, "alphabet", ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  function WorldMagneticModel() {
    this.coff = ['  1,  0,  -29404.5  ,     0.0    ,    6.7  ,      0.0', '  1,  1,   -1450.7  ,  4652.9    ,    7.7  ,    -25.1', '  2,  0,   -2500.0  ,     0.0    ,  -11.5  ,      0.0', '  2,  1,    2982.0  , -2991.6    ,   -7.1  ,    -30.2', '  2,  2,    1676.8  ,  -734.8    ,   -2.2  ,    -23.9', '  3,  0,    1363.9  ,     0.0    ,    2.8  ,      0.0', '  3,  1,   -2381.0  ,   -82.2    ,   -6.2  ,      5.7', '  3,  2,    1236.2  ,   241.8    ,    3.4  ,     -1.0', '  3,  3,     525.7  ,  -542.9    ,  -12.2  ,      1.1', '  4,  0,     903.1  ,     0.0    ,   -1.1  ,      0.0', '  4,  1,     809.4  ,   282.0    ,   -1.6  ,      0.2', '  4,  2,      86.2  ,  -158.4    ,   -6.0  ,      6.9', '  4,  3,    -309.4  ,   199.8    ,    5.4  ,      3.7', '  4,  4,      47.9  ,  -350.1    ,   -5.5  ,     -5.6', '  5,  0,    -234.4  ,     0.0    ,   -0.3  ,      0.0', '  5,  1,     363.1  ,    47.7    ,    0.6  ,      0.1', '  5,  2,     187.8  ,   208.4    ,   -0.7  ,      2.5', '  5,  3,    -140.7  ,  -121.3    ,    0.1  ,     -0.9', '  5,  4,    -151.2  ,    32.2    ,    1.2  ,      3.0', '  5,  5,      13.7  ,    99.1    ,    1.0  ,      0.5', '  6,  0,      65.9  ,     0.0    ,   -0.6  ,      0.0', '  6,  1,      65.6  ,   -19.1    ,   -0.4  ,      0.1', '  6,  2,      73.0  ,    25.0    ,    0.5  ,     -1.8', '  6,  3,    -121.5  ,    52.7    ,    1.4  ,     -1.4', '  6,  4,     -36.2  ,   -64.4    ,   -1.4  ,      0.9', '  6,  5,      13.5  ,     9.0    ,   -0.0  ,      0.1', '  6,  6,     -64.7  ,    68.1    ,    0.8  ,      1.0', '  7,  0,      80.6  ,     0.0    ,   -0.1  ,      0.0', '  7,  1,     -76.8  ,   -51.4    ,   -0.3  ,      0.5', '  7,  2,      -8.3  ,   -16.8    ,   -0.1  ,      0.6', '  7,  3,      56.5  ,     2.3    ,    0.7  ,     -0.7', '  7,  4,      15.8  ,    23.5    ,    0.2  ,     -0.2', '  7,  5,       6.4  ,    -2.2    ,   -0.5  ,     -1.2', '  7,  6,      -7.2  ,   -27.2    ,   -0.8  ,      0.2', '  7,  7,       9.8  ,    -1.9    ,    1.0  ,      0.3', '  8,  0,      23.6  ,     0.0    ,   -0.1  ,      0.0', '  8,  1,       9.8  ,     8.4    ,    0.1  ,     -0.3', '  8,  2,     -17.5  ,   -15.3    ,   -0.1  ,      0.7', '  8,  3,      -0.4  ,    12.8    ,    0.5  ,     -0.2', '  8,  4,     -21.1  ,   -11.8    ,   -0.1  ,      0.5', '  8,  5,      15.3  ,    14.9    ,    0.4  ,     -0.3', '  8,  6,      13.7  ,     3.6    ,    0.5  ,     -0.5', '  8,  7,     -16.5  ,    -6.9    ,    0.0  ,      0.4', '  8,  8,      -0.3  ,     2.8    ,    0.4  ,      0.1', '  9,  0,       5.0  ,     0.0    ,   -0.1  ,      0.0', '  9,  1,       8.2  ,   -23.3    ,   -0.2  ,     -0.3', '  9,  2,       2.9  ,    11.1    ,   -0.0  ,      0.2', '  9,  3,      -1.4  ,     9.8    ,    0.4  ,     -0.4', '  9,  4,      -1.1  ,    -5.1    ,   -0.3  ,      0.4', '  9,  5,     -13.3  ,    -6.2    ,   -0.0  ,      0.1', '  9,  6,       1.1  ,     7.8    ,    0.3  ,     -0.0', '  9,  7,       8.9  ,     0.4    ,   -0.0  ,     -0.2', '  9,  8,      -9.3  ,    -1.5    ,   -0.0  ,      0.5', '  9,  9,     -11.9  ,     9.7    ,   -0.4  ,      0.2', ' 10,  0,      -1.9  ,     0.0    ,    0.0  ,      0.0', ' 10,  1,      -6.2  ,     3.4    ,   -0.0  ,     -0.0', ' 10,  2,      -0.1  ,    -0.2    ,   -0.0  ,      0.1', ' 10,  3,       1.7  ,     3.5    ,    0.2  ,     -0.3', ' 10,  4,      -0.9  ,     4.8    ,   -0.1  ,      0.1', ' 10,  5,       0.6  ,    -8.6    ,   -0.2  ,     -0.2', ' 10,  6,      -0.9  ,    -0.1    ,   -0.0  ,      0.1', ' 10,  7,       1.9  ,    -4.2    ,   -0.1  ,     -0.0', ' 10,  8,       1.4  ,    -3.4    ,   -0.2  ,     -0.1', ' 10,  9,      -2.4  ,    -0.1    ,   -0.1  ,      0.2', ' 10, 10,      -3.9  ,    -8.8    ,   -0.0  ,     -0.0', ' 11,  0,       3.0  ,     0.0    ,   -0.0  ,      0.0', ' 11,  1,      -1.4  ,    -0.0    ,   -0.1  ,     -0.0', ' 11,  2,      -2.5  ,     2.6    ,   -0.0  ,      0.1', ' 11,  3,       2.4  ,    -0.5    ,    0.0  ,      0.0', ' 11,  4,      -0.9  ,    -0.4    ,   -0.0  ,      0.2', ' 11,  5,       0.3  ,     0.6    ,   -0.1  ,     -0.0', ' 11,  6,      -0.7  ,    -0.2    ,    0.0  ,      0.0', ' 11,  7,      -0.1  ,    -1.7    ,   -0.0  ,      0.1', ' 11,  8,       1.4  ,    -1.6    ,   -0.1  ,     -0.0', ' 11,  9,      -0.6  ,    -3.0    ,   -0.1  ,     -0.1', ' 11, 10,       0.2  ,    -2.0    ,   -0.1  ,      0.0', ' 11, 11,       3.1  ,    -2.6    ,   -0.1  ,     -0.0', ' 12,  0,      -2.0  ,     0.0    ,    0.0  ,      0.0', ' 12,  1,      -0.1  ,    -1.2    ,   -0.0  ,     -0.0', ' 12,  2,       0.5  ,     0.5    ,   -0.0  ,      0.0', ' 12,  3,       1.3  ,     1.3    ,    0.0  ,     -0.1', ' 12,  4,      -1.2  ,    -1.8    ,   -0.0  ,      0.1', ' 12,  5,       0.7  ,     0.1    ,   -0.0  ,     -0.0', ' 12,  6,       0.3  ,     0.7    ,    0.0  ,      0.0', ' 12,  7,       0.5  ,    -0.1    ,   -0.0  ,     -0.0', ' 12,  8,      -0.2  ,     0.6    ,    0.0  ,      0.1', ' 12,  9,      -0.5  ,     0.2    ,   -0.0  ,     -0.0', ' 12, 10,       0.1  ,    -0.9    ,   -0.0  ,     -0.0', ' 12, 11,      -1.1  ,    -0.0    ,   -0.0  ,      0.0', ' 12, 12,      -0.3  ,     0.5    ,   -0.1  ,     -0.1'];

    /* static variables */

    /* some 13x13 2D arrays */
    this.c = new Array(13);
    this.cd = new Array(13);
    this.tc = new Array(13);
    this.dp = new Array(13);
    this.k = new Array(13);
    for (var i = 0; i < 13; i++) {
      this.c[i] = new Array(13);
      this.cd[i] = new Array(13);
      this.tc[i] = new Array(13);
      this.dp[i] = new Array(13);
      this.k[i] = new Array(13);
    }

    /* some 1D arrays */
    this.snorm = new Array(169);
    this.sp = new Array(13);
    this.cp = new Array(13);
    this.fn = new Array(13);
    this.fm = new Array(13);
    this.pp = new Array(13);

    /* locals */

    const maxdeg = 12;
    let maxord;
    var i;
    let j;
    let D1;
    let D2;
    let n;
    let m;
    let gnm;
    let hnm;
    let dgnm;
    let dhnm;
    let flnmj;
    let c_str;
    let c_flds;

    /* INITIALIZE CONSTANTS */

    maxord = maxdeg;
    this.sp[0] = 0.0;
    this.cp[0] = this.snorm[0] = this.pp[0] = 1.0;
    this.dp[0][0] = 0.0;

    /* READ WORLD MAGNETIC MODEL SPHERICAL HARMONIC COEFFICIENTS */
    this.c[0][0] = 0.0;
    this.cd[0][0] = 0.0;
    for (i = 0; i < this.coff.length; i++) {
      c_str = this.coff[i];
      c_flds = c_str.split(',');
      n = parseInt(c_flds[0], 10);
      m = parseInt(c_flds[1], 10);
      gnm = parseFloat(c_flds[2]);
      hnm = parseFloat(c_flds[3]);
      dgnm = parseFloat(c_flds[4]);
      dhnm = parseFloat(c_flds[5]);
      if (m <= n) {
        this.c[m][n] = gnm;
        this.cd[m][n] = dgnm;
        if (m != 0) {
          this.c[n][m - 1] = hnm;
          this.cd[n][m - 1] = dhnm;
        }
      }
    }

    /* CONVERT SCHMIDT NORMALIZED GAUSS COEFFICIENTS TO UNNORMALIZED */

    this.snorm[0] = 1.0;
    for (n = 1; n <= maxord; n++) {
      this.snorm[n] = this.snorm[n - 1] * (2 * n - 1) / n;
      j = 2;
      for (m = 0, D1 = 1, D2 = (n - m + D1) / D1; D2 > 0; D2--, m += D1) {
        this.k[m][n] = ((n - 1) * (n - 1) - m * m) / ((2 * n - 1) * (2 * n - 3));
        if (m > 0) {
          flnmj = (n - m + 1) * j / (n + m);
          this.snorm[n + m * 13] = this.snorm[n + (m - 1) * 13] * Math.sqrt(flnmj);
          j = 1;
          this.c[n][m - 1] = this.snorm[n + m * 13] * this.c[n][m - 1];
          this.cd[n][m - 1] = this.snorm[n + m * 13] * this.cd[n][m - 1];
        }
        this.c[m][n] = this.snorm[n + m * 13] * this.c[m][n];
        this.cd[m][n] = this.snorm[n + m * 13] * this.cd[m][n];
      }
      this.fn[n] = n + 1;
      this.fm[n] = n;
    }
    this.k[1][1] = 0.0;
    this.fm[0] = 0.0; // !!!!!! WMM C and Fortran both have a bug in that fm[0] is not initialised
  }

  WorldMagneticModel.prototype.declination = function (altitudeKm, latitudeDegrees, longitudeDegrees, yearFloat) {
    /* locals */

    const a = 6378.137;
    const b = 6356.7523142;
    const re = 6371.2;
    const a2 = a * a;
    const b2 = b * b;
    const c2 = a2 - b2;
    const a4 = a2 * a2;
    const b4 = b2 * b2;
    const c4 = a4 - b4;
    let D3;
    let D4;
    let dec;
    let n;
    let m;
    let pi;
    let dt;
    let rlon;
    let rlat;
    let srlon;
    let srlat;
    let crlon;
    let crlat;
    let srlat2;
    let crlat2;
    let q;
    let q1;
    let q2;
    let ct;
    let d;
    let aor;
    let ar;
    let br;
    let r;
    let r2;
    let bpp;
    let par;
    let temp1;
    let parp;
    let temp2;
    let bx;
    let by;
    let dtr;
    let bp;
    let bt;
    let st;
    let ca;
    let sa;
    const maxord = 12;
    const alt = altitudeKm;
    const glon = longitudeDegrees;
    const glat = latitudeDegrees;

    /** ********************************************************************** */

    dt = yearFloat - 2020.0;
    // if more then 5 years has passed since last epoch update then return invalid
    if (dt < 0.0 || dt > 5.0) return -999;
    pi = 3.14159265359;
    dtr = pi / 180.0;
    rlon = glon * dtr;
    rlat = glat * dtr;
    srlon = Math.sin(rlon);
    srlat = Math.sin(rlat);
    crlon = Math.cos(rlon);
    crlat = Math.cos(rlat);
    srlat2 = srlat * srlat;
    crlat2 = crlat * crlat;
    this.sp[1] = srlon;
    this.cp[1] = crlon;

    /* CONVERT FROM GEODETIC COORDS. TO SPHERICAL COORDS. */

    q = Math.sqrt(a2 - c2 * srlat2);
    q1 = alt * q;
    q2 = (q1 + a2) / (q1 + b2) * ((q1 + a2) / (q1 + b2));
    ct = srlat / Math.sqrt(q2 * crlat2 + srlat2);
    st = Math.sqrt(1.0 - ct * ct);
    r2 = alt * alt + 2.0 * q1 + (a4 - c4 * srlat2) / (q * q);
    r = Math.sqrt(r2);
    d = Math.sqrt(a2 * crlat2 + b2 * srlat2);
    ca = (alt + d) / r;
    sa = c2 * crlat * srlat / (r * d);
    for (m = 2; m <= maxord; m++) {
      this.sp[m] = this.sp[1] * this.cp[m - 1] + this.cp[1] * this.sp[m - 1];
      this.cp[m] = this.cp[1] * this.cp[m - 1] - this.sp[1] * this.sp[m - 1];
    }
    aor = re / r;
    ar = aor * aor;
    br = bt = bp = bpp = 0.0;
    for (n = 1; n <= maxord; n++) {
      ar *= aor;
      for (m = 0, D3 = 1, D4 = (n + m + D3) / D3; D4 > 0; D4--, m += D3) {
        /*
         COMPUTE UNNORMALIZED ASSOCIATED LEGENDRE POLYNOMIALS
         AND DERIVATIVES VIA RECURSION RELATIONS
        */

        if (n == m) {
          this.snorm[n + m * 13] = st * this.snorm[n - 1 + (m - 1) * 13];
          this.dp[m][n] = st * this.dp[m - 1][n - 1] + ct * this.snorm[n - 1 + (m - 1) * 13];
        } else if (n == 1 && m == 0) {
          this.snorm[n + m * 13] = ct * this.snorm[n - 1 + m * 13];
          this.dp[m][n] = ct * this.dp[m][n - 1] - st * this.snorm[n - 1 + m * 13];
        } else if (n > 1 && n != m) {
          if (m > n - 2) this.snorm[n - 2 + m * 13] = 0.0;
          if (m > n - 2) this.dp[m][n - 2] = 0.0;
          this.snorm[n + m * 13] = ct * this.snorm[n - 1 + m * 13] - this.k[m][n] * this.snorm[n - 2 + m * 13];
          this.dp[m][n] = ct * this.dp[m][n - 1] - st * this.snorm[n - 1 + m * 13] - this.k[m][n] * this.dp[m][n - 2];
        }

        /*
        TIME ADJUST THE GAUSS COEFFICIENTS
        */
        this.tc[m][n] = this.c[m][n] + dt * this.cd[m][n];
        if (m != 0) this.tc[n][m - 1] = this.c[n][m - 1] + dt * this.cd[n][m - 1];

        /*
        ACCUMULATE TERMS OF THE SPHERICAL HARMONIC EXPANSIONS
        */
        par = ar * this.snorm[n + m * 13];
        if (m == 0) {
          temp1 = this.tc[m][n] * this.cp[m];
          temp2 = this.tc[m][n] * this.sp[m];
        } else {
          temp1 = this.tc[m][n] * this.cp[m] + this.tc[n][m - 1] * this.sp[m];
          temp2 = this.tc[m][n] * this.sp[m] - this.tc[n][m - 1] * this.cp[m];
        }
        bt -= ar * temp1 * this.dp[m][n];
        bp += this.fm[m] * temp2 * par;
        br += this.fn[n] * temp1 * par;
        /*
        SPECIAL CASE:  NORTH/SOUTH GEOGRAPHIC POLES
        */
        if (st == 0.0 && m == 1) {
          if (n == 1) this.pp[n] = this.pp[n - 1];else this.pp[n] = this.ct * this.pp[n - 1] - this.k[m][n] * this.pp[n - 2];
          parp = ar * this.pp[n];
          bpp += this.fm[m] * temp2 * parp;
        }
      }
    }
    if (st == 0.0) bp = bpp;else bp /= st;

    /*
      ROTATE MAGNETIC VECTOR COMPONENTS FROM SPHERICAL TO
      GEODETIC COORDINATES
    */
    bx = -bt * ca - br * sa;
    by = bp;
    dec = Math.atan2(by, bx) / dtr;
    return dec;
  };
  WorldMagneticModel.prototype.knownAnswerTest = function () {
    /* http://www.ngdc.noaa.gov/geomag/WMM WMM2010testvalues.pdf */

    /* Lat	Lon Dec	    */
    /* Lon 240 = 120W, Lon 300 = 60W */

    /* Alt 0 km */
    const kat2010 = ['80.00	,0.00	 ,-6.13	    ', '0.00	,120.00	 ,0.97	    ', '-80.00	,240.00	 ,70.21	    '];
    const kat2012p5 = ['80.00	,0.00	 ,-5.21	    ', '0.00	,120.00	 ,0.88	    ', '-80.00	,240.00	 ,70.04	    '];
    let maxErr = 0.0;
    for (var i = 0; i < kat2010.length; i++) {
      var c_str = kat2010[i];
      var c_flds = c_str.split(',');
      var lat = parseFloat(c_flds[0]);
      var lon = parseFloat(c_flds[1]);
      var exp = parseFloat(c_flds[2]);
      var maxExp;
      var dec = this.declination(0, lat, lon, 2010.0);
      if (Math.abs(dec - exp) > maxErr) {
        maxErr = Math.abs(dec - exp);
        maxExp = exp;
      }
    }
    for (var i = 0; i < kat2012p5.length; i++) {
      var c_str = kat2012p5[i];
      var c_flds = c_str.split(',');
      var lat = parseFloat(c_flds[0]);
      var lon = parseFloat(c_flds[1]);
      var exp = parseFloat(c_flds[2]);
      var maxExp;
      var dec = this.declination(0, lat, lon, 2012.5);
      if (Math.abs(dec - exp) > maxErr) {
        maxErr = Math.abs(dec - exp);
        maxExp = exp;
      }
    }
    return maxErr * 100 / maxExp; // max % error
  };

  /*

    C***********************************************************************
    C
    C
    C     SUBROUTINE GEOMAG (GEOMAGNETIC FIELD COMPUTATION)
    C
    C
    C***********************************************************************
    C
    C     GEOMAG IS A NATIONAL GEOSPATIAL INTELLIGENCE AGENCY (NGA) STANDARD
    C     PRODUCT.  IT IS COVERED UNDER NGA MILITARY SPECIFICATION:
    C     MIL-W-89500 (1993).
    C
    C***********************************************************************
    C     Contact Information
    C
    C     Software and Model Support
    C     	National Geophysical Data Center
    C     	NOAA EGC/2
    C     	325 Broadway
    C     	Boulder, CO 80303 USA
    C     	Attn: Susan McLean or Stefan Maus
    C     	Phone:  (303) 497-6478 or -6522
    C     	Email:  Susan.McLean@noaa.gov or Stefan.Maus@noaa.gov
    C		Web: http://www.ngdc.noaa.gov/seg/WMM/
    C
    C     Sponsoring Government Agency
    C	   National Geospatial-Intelligence Agency
    C    	   PRG / CSAT, M.S. L-41
    C    	   3838 Vogel Road
    C    	   Arnold, MO 63010
    C    	   Attn: Craig Rollins
    C    	   Phone:  (314) 263-4186
    C    	   Email:  Craig.M.Rollins@Nga.Mil
    C
    C      Original Program By:
    C        Dr. John Quinn
    C        FLEET PRODUCTS DIVISION, CODE N342
    C        NAVAL OCEANOGRAPHIC OFFICE (NAVOCEANO)
    C        STENNIS SPACE CENTER (SSC), MS 39522-5001
    C
    C***********************************************************************
    C
    C     PURPOSE:  THIS ROUTINE COMPUTES THE DECLINATION (DEC),
    C               INCLINATION (DIP), TOTAL INTENSITY (TI) AND
    C               GRID VARIATION (GV - POLAR REGIONS ONLY, REFERENCED
    C               TO GRID NORTH OF A STEREOGRAPHIC PROJECTION) OF THE
    C               EARTH'S MAGNETIC FIELD IN GEODETIC COORDINATES
    C               FROM THE COEFFICIENTS OF THE CURRENT OFFICIAL
    C               DEPARTMENT OF DEFENSE (DOD) SPHERICAL HARMONIC WORLD
    C               MAGNETIC MODEL (WMM.COF).  THE WMM SERIES OF MODELS IS
    C               UPDATED EVERY 5 YEARS ON JANUARY 1ST OF THOSE YEARS
    C               WHICH ARE DIVISIBLE BY 5 (I.E. 2000, 2005, 2010 ETC.)
    C               BY NOAA'S NATIONAL GEOPHYSICAL DATA CENTER IN
    C               COOPERATION WITH THE BRITISH GEOLOGICAL SURVEY (BGS).
    C               THE MODEL IS BASED ON GEOMAGNETIC FIELD MEASUREMENTS
    C               FROM SATELLITE AND GROUND OBSERVATORIES.
    C
    C***********************************************************************
    C
    C     MODEL:  THE WMM SERIES GEOMAGNETIC MODELS ARE COMPOSED
    C             OF TWO PARTS:  THE MAIN FIELD MODEL, WHICH IS
    C             VALID AT THE BASE EPOCH OF THE CURRENT MODEL AND
    C             A SECULAR VARIATION MODEL, WHICH ACCOUNTS FOR SLOW
    C             TEMPORAL VARIATIONS IN THE MAIN GEOMAGNETIC FIELD
    C             FROM THE BASE EPOCH TO A MAXIMUM OF 5 YEARS BEYOND
    C             THE BASE EPOCH.  FOR EXAMPLE, THE BASE EPOCH OF
    C             THE WMM-2005 MODEL IS 2005.0.  THIS MODEL IS THEREFORE
    C             CONSIDERED VALID BETWEEN 2005.0 AND 2010.0. THE
    C             COMPUTED MAGNETIC PARAMETERS ARE REFERENCED TO THE
    C             WGS-84 ELLIPSOID.
    C
    C***********************************************************************
    C
    C     ACCURACY:  IN OCEAN AREAS AT THE EARTH'S SURFACE OVER THE
    C                ENTIRE 5 YEAR LIFE OF THE DEGREE AND ORDER 12
    C                SPHERICAL HARMONIC MODEL WMM-2005, THE ESTIMATED
    C                MAXIMUM RMS ERRORS FOR THE VARIOUS MAGNETIC COMPONENTS
    C                ARE:
    C
    C                DEC  -   0.5 Degrees
    C                DIP  -   0.5 Degrees
    C                TI   - 280.0 nanoTeslas (nT)
    C                GV   -   0.5 Degrees
    C
    C                OTHER MAGNETIC COMPONENTS THAT CAN BE DERIVED FROM
    C                THESE FOUR BY SIMPLE TRIGONOMETRIC RELATIONS WILL
    C                HAVE THE FOLLOWING APPROXIMATE ERRORS OVER OCEAN AREAS:
    C
    C                X    - 140 nT (North)
    C                Y    - 140 nT (East)
    C                Z    - 200 nT (Vertical) Positive is down
    C                H    - 200 nT (Horizontal)
    C
    C                OVER LAND THE MAXIMUM RMS ERRORS ARE EXPECTED TO BE
    C                HIGHER, ALTHOUGH THE RMS ERRORS FOR DEC, DIP, AND GV
    C                ARE STILL ESTIMATED TO BE LESS THAN 1.0 DEGREE, FOR
    C                THE ENTIRE 5-YEAR LIFE OF THE MODEL AT THE EARTH's
    C                SURFACE.  THE OTHER COMPONENT ERRORS OVER LAND ARE
    C                MORE DIFFICULT TO ESTIMATE AND SO ARE NOT GIVEN.
    C
    C                THE ACCURACY AT ANY GIVEN TIME FOR ALL OF THESE
    C                GEOMAGNETIC PARAMETERS DEPENDS ON THE GEOMAGNETIC
    C                LATITUDE.  THE ERRORS ARE LEAST FROM THE EQUATOR TO
    C                MID-LATITUDES AND GREATEST NEAR THE MAGNETIC POLES.
    C
    C                IT IS VERY IMPORTANT TO NOTE THAT A DEGREE AND
    C                ORDER 12 MODEL, SUCH AS WMM-2005, DESCRIBES ONLY
    C                THE LONG WAVELENGTH SPATIAL MAGNETIC FLUCTUATIONS
    C                DUE TO EARTH'S CORE.  NOT INCLUDED IN THE WMM SERIES
    C                MODELS ARE INTERMEDIATE AND SHORT WAVELENGTH
    C                SPATIAL FLUCTUATIONS OF THE GEOMAGNETIC FIELD
    C                WHICH ORIGINATE IN THE EARTH'S MANTLE AND CRUST.
    C                CONSEQUENTLY, ISOLATED ANGULAR ERRORS AT VARIOUS
    C                POSITIONS ON THE SURFACE (PRIMARILY OVER LAND, IN
    C                CONTINENTAL MARGINS AND OVER OCEANIC SEAMOUNTS,
    C                RIDGES AND TRENCHES) OF SEVERAL DEGREES MAY BE
    C                EXPECTED. ALSO NOT INCLUDED IN THE MODEL ARE
    C                NONSECULAR TEMPORAL FLUCTUATIONS OF THE GEOMAGNETIC
    C                FIELD OF MAGNETOSPHERIC AND IONOSPHERIC ORIGIN.
    C                DURING MAGNETIC STORMS, TEMPORAL FLUCTUATIONS CAN
    C                CAUSE SUBSTANTIAL DEVIATIONS OF THE GEOMAGNETIC
    C                FIELD FROM MODEL VALUES.  IN ARCTIC AND ANTARCTIC
    C                REGIONS, AS WELL AS IN EQUATORIAL REGIONS, DEVIATIONS
    C                FROM MODEL VALUES ARE BOTH FREQUENT AND PERSISTENT.
    C
    C                IF THE REQUIRED DECLINATION ACCURACY IS MORE
    C                STRINGENT THAN THE WMM SERIES OF MODELS PROVIDE, THEN
    C                THE USER IS ADVISED TO REQUEST SPECIAL (REGIONAL OR
    C                LOCAL) SURVEYS BE PERFORMED AND MODELS PREPARED.
    C                REQUESTS OF THIS NATURE SHOULD BE MADE TO NIMA
    C                AT THE ADDRESS ABOVE.
    C
    C***********************************************************************
    C
    C     USAGE:  THIS ROUTINE IS BROKEN UP INTO TWO PARTS:
    C
    C             A) AN INITIALIZATION MODULE, WHICH IS CALLED ONLY
    C                ONCE AT THE BEGINNING OF THE MAIN (CALLING)
    C                PROGRAM
    C             B) A PROCESSING MODULE, WHICH COMPUTES THE MAGNETIC
    C                FIELD PARAMETERS FOR EACH SPECIFIED GEODETIC
    C                POSITION (ALTITUDE, LATITUDE, LONGITUDE) AND TIME
    C
    C             INITIALIZATION IS MADE VIA A SINGLE CALL TO THE MAIN
    C             ENTRY POINT (GEOMAG), WHILE SUBSEQUENT PROCESSING
    C             CALLS ARE MADE THROUGH THE SECOND ENTRY POINT (GEOMG1).
    C             ONE CALL TO THE PROCESSING MODULE IS REQUIRED FOR EACH
    C             POSITION AND TIME.
    C
    C             THE VARIABLE MAXDEG IN THE INITIALIZATION CALL IS THE
    C             MAXIMUM DEGREE TO WHICH THE SPHERICAL HARMONIC MODEL
    C             IS TO BE COMPUTED.  IT MUST BE SPECIFIED BY THE USER
    C             IN THE CALLING ROUTINE.  NORMALLY IT IS 12 BUT IT MAY
    C             BE SET LESS THAN 12 TO INCREASE COMPUTATIONAL SPEED AT
    C             THE EXPENSE OF REDUCED ACCURACY.
    C
    C             THE PC VERSION OF THIS SUBROUTINE MUST BE COMPILED
    C             WITH A FORTRAN 77 COMPATIBLE COMPILER SUCH AS THE
    C             MICROSOFT OPTIMIZING FORTRAN COMPILER VERSION 4.1
    C             OR LATER.
    C
    C**********************************************************************
    C
    C     REFERENCES:
    C
    C       JOHN M. QUINN, DAVID J. KERRIDGE AND DAVID R. BARRACLOUGH,
    C            WORLD MAGNETIC CHARTS FOR 1985 - SPHERICAL HARMONIC
    C            MODELS OF THE GEOMAGNETIC FIELD AND ITS SECULAR
    C            VARIATION, GEOPHYS. J. R. ASTR. SOC. (1986) 87,
    C            PP 1143-1157
    C
    C       DEFENSE MAPPING AGENCY TECHNICAL REPORT, TR 8350.2:
    C            DEPARTMENT OF DEFENSE WORLD GEODETIC SYSTEM 1984,
    C            SEPT. 30 (1987)
    C
    C       JOHN M. QUINN, RACHEL J. COLEMAN, MICHAEL R. PECK, AND
    C            STEPHEN E. LAUBER; THE JOINT US/UK 1990 EPOCH
    C            WORLD MAGNETIC MODEL, TECHNICAL REPORT NO. 304,
    C            NAVAL OCEANOGRAPHIC OFFICE (1991)
    C
    C       JOHN M. QUINN, RACHEL J. COLEMAN, DONALD L. SHIEL, AND
    C            JOHN M. NIGRO; THE JOINT US/UK 1995 EPOCH WORLD
    C            MAGNETIC MODEL, TECHNICAL REPORT NO. 314, NAVAL
    C            OCEANOGRAPHIC OFFICE (1995)
    C
    C            SUSAN AMCMILLAN, DAVID R. BARRACLOUGH, JOHN M. QUINN, AND
    C            RACHEL J. COLEMAN;  THE 1995 REVISION OF THE JOINT US/UK
    C            GEOMAGNETIC FIELD MODELS - I. SECULAR VARIATION, JOURNAL OF
    C            GEOMAGNETISM AND GEOELECTRICITY, VOL. 49, PP. 229-243
    C            (1997)
    C
    C            JOHN M. QUINN, RACHEL J. COELMAN, SUSAM MACMILLAN, AND
    C            DAVID R. BARRACLOUGH;  THE 1995 REVISION OF THE JOINT
    C            US/UK GEOMAGNETIC FIELD MODELS: II. MAIN FIELD,JOURNAL OF
    C            GEOMAGNETISM AND GEOELECTRICITY, VOL. 49, PP. 245 - 261
    C            (1997)
    C
    C***********************************************************************
    C
    C     PARAMETER DESCRIPTIONS:
    C
    C       A      - SEMIMAJOR AXIS OF WGS-84 ELLIPSOID (KM)
    C       B      - SEMIMINOR AXIS OF WGS-84 ELLIPSOID (KM)
    C       RE     - MEAN RADIUS OF IAU-66 ELLIPSOID (KM)
    C       SNORM  - SCHMIDT NORMALIZATION FACTORS
    C       C      - GAUSS COEFFICIENTS OF MAIN GEOMAGNETIC MODEL (NT)
    C       CD     - GAUSS COEFFICIENTS OF SECULAR GEOMAGNETIC MODEL (NT/YR)
    C       TC     - TIME ADJUSTED GEOMAGNETIC GAUSS COEFFICIENTS (NT)
    C       OTIME  - TIME ON PREVIOUS CALL TO GEOMAG (YRS)
    C       OALT   - GEODETIC ALTITUDE ON PREVIOUS CALL TO GEOMAG (YRS)
    C       OLAT   - GEODETIC LATITUDE ON PREVIOUS CALL TO GEOMAG (DEG.)
    C       TIME   - COMPUTATION TIME (YRS)                        (INPUT)
    C                (EG. 1 JULY 1995 = 1995.500)
    C       ALT    - GEODETIC ALTITUDE (KM)                        (INPUT)
    C       GLAT   - GEODETIC LATITUDE (DEG.)                      (INPUT)
    C       GLON   - GEODETIC LONGITUDE (DEG.)                     (INPUT)
    C       EPOCH  - BASE TIME OF GEOMAGNETIC MODEL (YRS)
    C       DTR    - DEGREE TO RADIAN CONVERSION
    C       SP(M)  - SINE OF (M*SPHERICAL COORD. LONGITUDE)
    C       CP(M)  - COSINE OF (M*SPHERICAL COORD. LONGITUDE)
    C       ST     - SINE OF (SPHERICAL COORD. LATITUDE)
    C       CT     - COSINE OF (SPHERICAL COORD. LATITUDE)
    C       R      - SPHERICAL COORDINATE RADIAL POSITION (KM)
    C       CA     - COSINE OF SPHERICAL TO GEODETIC VECTOR ROTATION ANGLE
    C       SA     - SINE OF SPHERICAL TO GEODETIC VECTOR ROTATION ANGLE
    C       BR     - RADIAL COMPONENT OF GEOMAGNETIC FIELD (NT)
    C       BT     - THETA COMPONENT OF GEOMAGNETIC FIELD (NT)
    C       BP     - PHI COMPONENT OF GEOMAGNETIC FIELD (NT)
    C       P(N,M) - ASSOCIATED LEGENDRE POLYNOMIALS (UNNORMALIZED)
    C       PP(N)  - ASSOCIATED LEGENDRE POLYNOMIALS FOR M=1 (UNNORMALIZED)
    C       DP(N,M)- THETA DERIVATIVE OF P(N,M) (UNNORMALIZED)
    C       BX     - NORTH GEOMAGNETIC COMPONENT (NT)
    C       BY     - EAST GEOMAGNETIC COMPONENT (NT)
    C       BZ     - VERTICALLY DOWN GEOMAGNETIC COMPONENT (NT)
    C       BH     - HORIZONTAL GEOMAGNETIC COMPONENT (NT)
    C       DEC    - GEOMAGNETIC DECLINATION (DEG.)                (OUTPUT)
    C                  EAST=POSITIVE ANGLES
    C                  WEST=NEGATIVE ANGLES
    C       DIP    - GEOMAGNETIC INCLINATION (DEG.)                (OUTPUT)
    C                  DOWN=POSITIVE ANGLES
    C                    UP=NEGATIVE ANGLES
    C       TI     - GEOMAGNETIC TOTAL INTENSITY (NT)              (OUTPUT)
    C       GV     - GEOMAGNETIC GRID VARIATION (DEG.)             (OUTPUT)
    C                REFERENCED TO GRID NORTH
    C                GRID NORTH REFERENCED TO 0 MERIDIAN
    C                OF A POLAR STEREOGRAPHIC PROJECTION
    C                (ARCTIC/ANTARCTIC ONLY)
    C       MAXDEG - MAXIMUM DEGREE OF SPHERICAL HARMONIC MODEL    (INPUT)
    C       MOXORD - MAXIMUM ORDER OF SPHERICAL HARMONIC MODEL
    C
    C***********************************************************************
    C
    C     NOTE:  THIS VERSION OF GEOMAG USES A WMM SERIES GEOMAGNETIC
    C            FIELS MODEL REFERENCED TO THE WGS-84 GRAVITY MODEL
    C            ELLIPSOID
    C

    */

  /** A class for geographical mathematics. */
  class GeoMath {
    /**
     * Gets coordinates at a relative bearing and distance from a set of coordinates.
     * @param course The course, in degrees, from the reference coordinates.
     * @param distanceInNM The distance, in nautical miles, from the reference coordinates.
     * @param referenceCoordinates The reference coordinates to calculate from.
     * @returns The calculated coordinates.
     */
    static relativeBearingDistanceToCoords(course, distanceInNM, referenceCoordinates) {
      const courseRadians = course * Avionics.Utils.DEG2RAD;
      const distanceRadians = Math.PI / (180 * 60) * distanceInNM;
      const refLat = referenceCoordinates.lat * Avionics.Utils.DEG2RAD;
      const refLon = -(referenceCoordinates.long * Avionics.Utils.DEG2RAD);
      const lat = Math.asin(Math.sin(refLat) * Math.cos(distanceRadians) + Math.cos(refLat) * Math.sin(distanceRadians) * Math.cos(courseRadians));
      const dlon = Math.atan2(Math.sin(courseRadians) * Math.sin(distanceRadians) * Math.cos(refLat), Math.cos(distanceRadians) - Math.sin(refLat) * Math.sin(lat));
      const lon = Avionics.Utils.fmod(refLon - dlon + Math.PI, 2 * Math.PI) - Math.PI;
      return new LatLongAlt(lat * Avionics.Utils.RAD2DEG, -(lon * Avionics.Utils.RAD2DEG));
    }

    /**
     * Gets a magnetic heading given a true course and a magnetic variation.
     * @param trueCourse The true course to correct.
     * @param magneticVariation The measured magnetic variation.
     * @returns The magnetic heading, corrected for magnetic variation.
     */
    static correctMagvar(trueCourse, magneticVariation) {
      return trueCourse - GeoMath.normalizeMagVar(magneticVariation);
    }

    /**
     * Gets a true course given a magnetic heading and a magnetic variation.
     * @param headingMagnetic The magnetic heading to correct.
     * @param magneticVariation The measured magnetic variation.
     * @returns The true course, corrected for magnetic variation.
     */
    static removeMagvar(headingMagnetic, magneticVariation) {
      return headingMagnetic + GeoMath.normalizeMagVar(magneticVariation);
    }

    /**
     * Gets a magnetic variation difference in 0-360 degrees.
     * @param magneticVariation The magnetic variation to normalize.
     * @returns A normalized magnetic variation.
     */
    static normalizeMagVar(magneticVariation) {
      let normalizedMagVar;
      if (magneticVariation <= 180) {
        normalizedMagVar = magneticVariation;
      } else {
        normalizedMagVar = magneticVariation - 360;
      }
      return normalizedMagVar;
    }

    /**
     * Gets the magnetic variation for a given latitude and longitude.
     * @param lat The latitude to get a magvar for.
     * @param lon The longitude to get a magvar for.
     * @returns The magnetic variation at the specific latitude and longitude.
     */
    static getMagvar(lat, lon) {
      return GeoMath.magneticModel.declination(0, lat, lon, 2020);
    }
    static directedDistanceToGo(from, to, acDirectedLineBearing) {
      const absDtg = Avionics.Utils.computeGreatCircleDistance(from, to);

      // @todo should be abeam distance
      if (acDirectedLineBearing >= 90 && acDirectedLineBearing <= 270) {
        // Since a line perpendicular to the leg is formed by two 90 degree angles, an aircraftLegBearing outside
        // (North - 90) and (North + 90) is in the lower quadrants of a plane centered at the TO fix. This means
        // the aircraft is NOT past the TO fix, and DTG must be positive.

        return absDtg;
      }
      return -absDtg;
    }
  }
  _defineProperty(GeoMath, "magneticModel", new WorldMagneticModel());

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A class for mapping raw facility data to WayPoints.
   */
  class RawDataMapper {
    /**
     * Maps a raw facility record to a WayPoint.
     * @param facility The facility record to map.
     * @param instrument The instrument to attach to the WayPoint.
     * @returns The mapped waypoint.
     */
    static toWaypoint(facility, instrument) {
      const waypoint = new WayPoint(instrument);
      waypoint.ident = WayPoint.formatIdentFromIcao(facility.icao);
      waypoint.icao = facility.icao;
      waypoint.type = facility.icao[0];
      let alt = 0;
      switch (waypoint.type) {
        case 'A':
          {
            const info = new AirportInfo(instrument);
            info.CopyBaseInfosFrom(waypoint);
            info.UpdateNamedFrequencies();
            alt = 3.28084 * facility.runways.reduce((sum, r) => sum + r.elevation, 0) / facility.runways.length;
            info.approaches = facility.approaches;
            info.approaches.forEach(approach => approach.name = flightplan.normaliseApproachName(approach.name));
            info.approaches.forEach(approach => approach.transitions.forEach(trans => trans.name = trans.legs[0].fixIcao.substring(7, 12).trim()));
            info.approaches.forEach(approach => approach.runway = approach.runway.trim());
            info.departures = facility.departures;
            info.departures.forEach(departure => departure.runwayTransitions.forEach(trans => trans.name = RawDataMapper.generateRunwayTransitionName(trans)));
            info.departures.forEach(departure => departure.enRouteTransitions.forEach(trans => trans.name = RawDataMapper.generateDepartureEnRouteTransitionName(trans)));
            info.arrivals = facility.arrivals;
            info.arrivals.forEach(arrival => arrival.runwayTransitions.forEach(trans => trans.name = RawDataMapper.generateRunwayTransitionName(trans)));
            info.arrivals.forEach(arrival => arrival.enRouteTransitions.forEach(trans => trans.name = RawDataMapper.generateArrivalTransitionName(trans)));
            info.runways = facility.runways;
            info.oneWayRunways = [];
            facility.runways.forEach(runway => info.oneWayRunways.push(...Object.assign(new Runway(), runway).splitIfTwoWays()));
            info.oneWayRunways.sort(RawDataMapper.sortRunways);
            waypoint.infos = info;
          }
          break;
        case 'V':
          waypoint.infos = new VORInfo(instrument);
          break;
        case 'N':
          waypoint.infos = new NDBInfo(instrument);
          break;
        case 'W':
          waypoint.infos = new IntersectionInfo(instrument);
          break;
        default:
          waypoint.infos = new WayPointInfo(instrument);
          break;
      }
      if (waypoint.type !== 'A') {
        waypoint.infos.CopyBaseInfosFrom(waypoint);
        waypoint.infos.routes = facility.routes;
      }
      waypoint.infos.coordinates = new LatLongAlt(facility.lat, facility.lon, alt);
      waypoint.additionalData = {};
      return waypoint;
    }

    /**
     * A comparer for sorting runways by number, and then by L, C, and R.
     * @param r1 The first runway to compare.
     * @param r2 The second runway to compare.
     * @returns -1 if the first is before, 0 if equal, 1 if the first is after.
     */
    static sortRunways(r1, r2) {
      if (parseInt(r1.designation) === parseInt(r2.designation)) {
        let v1 = 0;
        if (r1.designation.indexOf('L') !== -1) {
          v1 = 1;
        } else if (r1.designation.indexOf('C') !== -1) {
          v1 = 2;
        } else if (r1.designation.indexOf('R') !== -1) {
          v1 = 3;
        }
        let v2 = 0;
        if (r2.designation.indexOf('L') !== -1) {
          v2 = 1;
        } else if (r2.designation.indexOf('C') !== -1) {
          v2 = 2;
        } else if (r2.designation.indexOf('R') !== -1) {
          v2 = 3;
        }
        return v1 - v2;
      }
      return parseInt(r1.designation) - parseInt(r2.designation);
    }

    /**
     * Generates a runway transition name from the designated runway in the transition data.
     * @param runwayTransition The runway transition to generate the name for.
     * @returns The runway transition name.
     */
    static generateRunwayTransitionName(runwayTransition) {
      let name = "RW".concat(runwayTransition.runwayNumber);
      switch (runwayTransition.runwayDesignation) {
        case 1:
          name += 'L';
          break;
        case 2:
          name += 'R';
          break;
        case 3:
          name += 'C';
          break;
      }
      return name;
    }

    /**
     * Generates an arrival transition name from a provided arrival enroute transition.
     * @param enrouteTransition The enroute transition to generate a name for.
     * @returns The generated transition name.
     */
    static generateArrivalTransitionName(enrouteTransition) {
      return enrouteTransition.legs[0].fixIcao.substring(7, 12).trim();
    }

    /**
     * Generates a departure transition name from a provided departure enroute transition.
     * @param enrouteTransition The enroute transition to generate a name for.
     * @returns The generated transition name.
     */
    static generateDepartureEnRouteTransitionName(enrouteTransition) {
      return enrouteTransition.legs[enrouteTransition.legs.length - 1].fixIcao.substring(7, 12).trim();
    }
  }

  /**
   * Creates a collection of waypoints from a legs procedure.
   */
  class LegsProcedure {
    /** The current index in the procedure. */

    /** Whether or not there is a discontinuity pending to be mapped. */

    /** A collection of the loaded facilities needed for this procedure. */

    /** Whether or not the facilities have completed loading. */

    /** The collection of facility promises to await on first load. */

    /** Whether or not a non initial-fix procedure start has been added to the procedure. */

    /** A normalization factor for calculating distances from triangular ratios. */

    /** A collection of filtering rules for filtering ICAO data to pre-load for the procedure. */

    /**
     * Creates an instance of a LegsProcedure.
     * @param legs The legs that are part of the procedure.
     * @param startingPoint The starting point for the procedure.
     * @param instrument The instrument that is attached to the flight plan.
     * @param approachType The approach type if this is an approach procedure
     */
    constructor(_legs, _previousFix, _instrument, airportMagVar, approachType, legAnnotations) {
      this._legs = _legs;
      this._previousFix = _previousFix;
      this._instrument = _instrument;
      this.airportMagVar = airportMagVar;
      this.approachType = approachType;
      this.legAnnotations = legAnnotations;
      _defineProperty(this, "_currentIndex", 0);
      _defineProperty(this, "_isDiscontinuityPending", false);
      _defineProperty(this, "_facilities", new Map());
      _defineProperty(this, "_facilitiesLoaded", false);
      _defineProperty(this, "_facilitiesToLoad", new Map());
      _defineProperty(this, "_addedProcedureStart", false);
      _defineProperty(this, "legFilteringRules", [icao => icao.trim() !== '',
      // Icao is not empty
      icao => icao[0] !== 'R',
      // Icao is not runway icao, which is not searchable
      icao => icao[0] !== 'A',
      // Icao is not airport icao, which can be skipped
      icao => icao.substr(1, 2) !== '  ',
      // Icao is not missing a region code
      icao => !this._facilitiesToLoad.has(icao) // Icao is not already being loaded
      ]);

      for (const leg of this._legs) {
        if (this.isIcaoValid(leg.fixIcao)) {
          this._facilitiesToLoad.set(leg.fixIcao, this._instrument.facilityLoader.getFacilityRaw(leg.fixIcao, 2000, true));
        }
        if (this.isIcaoValid(leg.originIcao)) {
          this._facilitiesToLoad.set(leg.originIcao, this._instrument.facilityLoader.getFacilityRaw(leg.originIcao, 2000, true));
        }
        if (this.isIcaoValid(leg.arcCenterFixIcao)) {
          this._facilitiesToLoad.set(leg.arcCenterFixIcao, this._instrument.facilityLoader.getFacilityRaw(leg.arcCenterFixIcao, 2000, true));
        }
      }
    }

    /**
     * Checks whether or not there are any legs remaining in the procedure.
     * @returns True if there is a next leg, false otherwise.
     */
    hasNext() {
      return this._currentIndex < this._legs.length || this._isDiscontinuityPending;
    }
    async ensureFacilitiesLoaded() {
      if (!this._facilitiesLoaded) {
        const facilityResults = await Promise.all(this._facilitiesToLoad.values());
        for (const facility of facilityResults.filter(f => f !== undefined)) {
          this._facilities.set(facility.icao, facility);
        }
        this._facilitiesLoaded = true;
      }
    }

    /**
     * Gets the next mapped leg from the procedure.
     * @returns The mapped waypoint from the leg of the procedure.
     */
    async getNext() {
      let isLegMappable = false;
      let mappedLeg;
      await this.ensureFacilitiesLoaded();
      while (!isLegMappable && this._currentIndex < this._legs.length) {
        const currentLeg = this._legs[this._currentIndex];
        const currentAnnotation = this.legAnnotations[this._currentIndex];
        isLegMappable = true;

        // Some procedures don't start with 15 (initial fix) but instead start with a heading and distance from
        // a fix: the procedure then starts with the fix exactly
        if (this._currentIndex === 0 && currentLeg.type === 10 && !this._addedProcedureStart) {
          mappedLeg = this.mapExactFix(currentLeg);
          this._addedProcedureStart = true;
        } else {
          try {
            switch (currentLeg.type) {
              case LegType.AF:
              case LegType.PI:
                mappedLeg = this.mapExactFix(currentLeg);
                break;
              case LegType.CD:
              case LegType.VD:
                mappedLeg = this.mapHeadingUntilDistanceFromOrigin(currentLeg, this._previousFix);
                break;
              case LegType.CF:
                // Only map if the fix is itself not a runway fix to avoid double
                // adding runway fixes
                if (currentLeg.fixIcao === '' || currentLeg.fixIcao[0] !== 'R') {
                  mappedLeg = this.mapOriginRadialForDistance(currentLeg, this._previousFix);
                } else {
                  isLegMappable = false;
                }
                break;
              case LegType.CI:
              case LegType.VI:
                mappedLeg = this.mapHeadingToInterceptNextLeg(currentLeg, this._previousFix, this._legs[this._currentIndex + 1]);
                break;
              case LegType.CR:
              case LegType.VR:
                mappedLeg = this.mapHeadingUntilRadialCrossing(currentLeg, this._previousFix);
                break;
              case LegType.FC:
              case LegType.FD:
                mappedLeg = this.mapBearingAndDistanceFromOrigin(currentLeg);
                break;
              case LegType.FM:
              case LegType.VM:
                mappedLeg = this.mapVectors(currentLeg, this._previousFix);
                break;
              case LegType.IF:
                if (currentLeg.fixIcao[0] !== 'A') {
                  const leg = this.mapExactFix(currentLeg);
                  const prevLeg = this._previousFix;

                  // If a type 15 (initial fix) comes up in the middle of a plan
                  if (leg.icao === prevLeg.icao && leg.infos.coordinates.lat === prevLeg.infos.coordinates.lat && leg.infos.coordinates.long === prevLeg.infos.coordinates.long) {
                    isLegMappable = false;
                  } else {
                    mappedLeg = leg;
                  }
                } else {
                  // If type 15 is an airport itself, we don't need to map it (and the data is generally wrong)
                  isLegMappable = false;
                }
                break;
              case LegType.DF:
              case LegType.TF:
                // Only map if the fix is itself not a runway fix to avoid double
                // adding runway fixes
                if (currentLeg.fixIcao === '' || currentLeg.fixIcao[0] !== 'R') {
                  mappedLeg = this.mapExactFix(currentLeg);
                } else {
                  isLegMappable = false;
                }
                break;
              case LegType.RF:
                mappedLeg = this.mapRadiusToFix(currentLeg);
                break;
              case LegType.CA:
              case LegType.VA:
                mappedLeg = this.mapHeadingUntilAltitude(currentLeg, this._previousFix);
                break;
              case LegType.HA:
              case LegType.HF:
              case LegType.HM:
                mappedLeg = this.mapHold(currentLeg);
                break;
              default:
                isLegMappable = false;
                break;
            }
          } catch (err) {
            console.log("LegsProcedure: Unexpected unmappable leg: ".concat(err));
          }
          if (mappedLeg !== undefined) {
            const magCorrection = this.getMagCorrection(currentLeg);
            if (this.approachType === ApproachType.APPROACH_TYPE_ILS && (currentLeg.fixTypeFlags & FixTypeFlags.FAF) > 0) {
              if (currentLeg.altDesc === AltitudeDescriptor.At) {
                mappedLeg.legAltitudeDescription = AltitudeDescriptor.G;
              } else {
                mappedLeg.legAltitudeDescription = AltitudeDescriptor.H;
              }
            } else {
              mappedLeg.legAltitudeDescription = currentLeg.altDesc;
            }
            mappedLeg.legAltitude1 = currentLeg.altitude1 * 3.28084;
            mappedLeg.legAltitude2 = currentLeg.altitude2 * 3.28084;
            mappedLeg.speedConstraint = currentLeg.speedRestriction;
            mappedLeg.turnDirection = currentLeg.turnDirection;
            const recNavaid = this._facilities.get(currentLeg.originIcao);
            mappedLeg.additionalData.legType = currentLeg.type;
            mappedLeg.additionalData.overfly = currentLeg.flyOver;
            mappedLeg.additionalData.fixTypeFlags = currentLeg.fixTypeFlags;
            mappedLeg.additionalData.distance = currentLeg.distanceMinutes ? undefined : currentLeg.distance / 1852;
            mappedLeg.additionalData.distanceInMinutes = currentLeg.distanceMinutes ? currentLeg.distance : undefined;
            mappedLeg.additionalData.course = currentLeg.trueDegrees ? currentLeg.course : A32NX_Util.magneticToTrue(currentLeg.course, magCorrection);
            mappedLeg.additionalData.recommendedIcao = currentLeg.originIcao.trim().length > 0 ? currentLeg.originIcao : undefined;
            mappedLeg.additionalData.recommendedFrequency = recNavaid ? recNavaid.freqMHz : undefined;
            mappedLeg.additionalData.recommendedLocation = recNavaid ? {
              lat: recNavaid.lat,
              long: recNavaid.lon
            } : undefined;
            mappedLeg.additionalData.rho = currentLeg.rho / 1852;
            mappedLeg.additionalData.theta = currentLeg.theta;
            mappedLeg.additionalData.thetaTrue = A32NX_Util.magneticToTrue(currentLeg.theta, magCorrection);
            mappedLeg.additionalData.annotation = currentAnnotation;
          }
          this._currentIndex++;
        }
      }
      if (mappedLeg !== undefined) {
        this._previousFix = mappedLeg;
        return mappedLeg;
      }
      return undefined;
    }
    getMagCorrection(currentLeg) {
      // we try to interpret PANS OPs as accurately as possible within the limits of available data

      // magnetic tracks to/from a VOR always use VOR station declination
      if (currentLeg.fixIcao.charAt(0) === 'V') {
        const vor = this._facilities.get(currentLeg.fixIcao);
        if (!vor || vor.magneticVariation === undefined) {
          console.warn('Leg coded incorrectly (missing vor fix or station declination)', currentLeg, vor);
          return this.airportMagVar;
        }
        return 360 - vor.magneticVariation;
      }

      // we use station declination for VOR/DME approaches
      if (this.approachType === ApproachType.APPROACH_TYPE_VORDME) {
        // find a leg with the reference navaid for the procedure
        for (let i = this._legs.length - 1; i >= 0; i--) {
          if (this._legs[i].originIcao.trim().length > 0) {
            const recNavaid = this._facilities.get(currentLeg.originIcao);
            if (recNavaid && recNavaid.magneticVariation !== undefined) {
              return 360 - recNavaid.magneticVariation;
            }
          }
        }
        console.warn('VOR/DME approach coded incorrectly (missing recommended navaid or station declination)', currentLeg);
        return this.airportMagVar;
      }

      // for RNAV procedures use recommended navaid station declination for these leg types
      let useStationDeclination = currentLeg.type === LegType.CF || currentLeg.type === LegType.FA || currentLeg.type === LegType.FM;

      // for localiser bearings (i.e. at or beyond FACF), always use airport value
      if (this.approachType === ApproachType.APPROACH_TYPE_ILS || this.approachType === ApproachType.APPROACH_TYPE_LOCALIZER) {
        useStationDeclination = useStationDeclination && this._legs.indexOf(currentLeg) < this.getFacfIndex();
      }
      if (useStationDeclination) {
        const recNavaid = this._facilities.get(currentLeg.originIcao);
        if (!recNavaid || recNavaid.magneticVariation === undefined) {
          console.warn('Leg coded incorrectly (missing recommended navaid or station declination)', currentLeg, recNavaid);
          return this.airportMagVar;
        }
        return 360 - recNavaid.magneticVariation;
      }

      // for all other terminal procedure legs we use airport magnetic variation
      return this.airportMagVar;
    }
    getFacfIndex() {
      if (this.approachType !== undefined) {
        for (let i = this._legs.length - 1; i >= 0; i--) {
          if (this._legs[i].fixTypeFlags & FixTypeFlags.IF) {
            return i;
          }
        }
      }
      return undefined;
    }

    /**
     * Maps a heading until distance from origin leg.
     * @param leg The procedure leg to map.
     * @param prevLeg The previously mapped waypoint in the procedure.
     * @returns The mapped leg.
     */
    mapHeadingUntilDistanceFromOrigin(leg, prevLeg) {
      const origin = this._facilities.get(leg.originIcao);
      const originIdent = origin.icao.substring(7, 12).trim();
      const bearingToOrigin = Avionics.Utils.computeGreatCircleHeading(prevLeg.infos.coordinates, new LatLongAlt(origin.lat, origin.lon));
      const distanceToOrigin = Avionics.Utils.computeGreatCircleDistance(prevLeg.infos.coordinates, new LatLongAlt(origin.lat, origin.lon)) / LegsProcedure.distanceNormalFactorNM;
      const deltaAngle = this.deltaAngleRadians(bearingToOrigin, leg.course);
      const targetDistance = leg.distance / 1852 / LegsProcedure.distanceNormalFactorNM;
      const distanceAngle = Math.asin(Math.sin(distanceToOrigin) * Math.sin(deltaAngle) / Math.sin(targetDistance));
      const inverseDistanceAngle = Math.PI - distanceAngle;
      const legDistance1 = 2 * Math.atan(Math.tan(0.5 * (targetDistance - distanceToOrigin)) * (Math.sin(0.5 * (deltaAngle + distanceAngle)) / Math.sin(0.5 * (deltaAngle - distanceAngle))));
      const legDistance2 = 2 * Math.atan(Math.tan(0.5 * (targetDistance - distanceToOrigin)) * (Math.sin(0.5 * (deltaAngle + inverseDistanceAngle)) / Math.sin(0.5 * (deltaAngle - inverseDistanceAngle))));
      const legDistance = targetDistance > distanceToOrigin ? legDistance1 : Math.min(legDistance1, legDistance2);
      const course = leg.course + GeoMath.getMagvar(prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const coordinates = Avionics.Utils.bearingDistanceToCoordinates(course, legDistance * LegsProcedure.distanceNormalFactorNM, prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const waypoint = this.buildWaypoint("".concat(originIdent.substring(0, 3), "/").concat(Math.round(leg.distance / 1852).toString().padStart(2, '0')), coordinates);
      return waypoint;
    }

    /**
     * Maps an FC or FD leg in the procedure.
     * @note FC and FD legs are mapped to CF legs in the real FMS
     * @todo move the code into the CF leg (maybe static functions fromFc and fromFd to construct the leg)
     * @todo FD should overfly the termination... needs a messy refactor to do that
     * @param leg The procedure leg to map.
     * @returns The mapped leg.
     */
    mapBearingAndDistanceFromOrigin(leg) {
      const origin = this._facilities.get(leg.fixIcao);
      const originIdent = origin.icao.substring(7, 12).trim();
      const course = leg.trueDegrees ? leg.course : A32NX_Util.magneticToTrue(leg.course, Facilities.getMagVar(origin.lat, origin.lon));
      // this is the leg length for FC, and the DME distance for FD
      const refDistance = leg.distance / 1852;
      let termPoint;
      let legLength;
      if (leg.type === LegType.FD) {
        const recNavaid = this._facilities.get(leg.originIcao);
        termPoint = msfsGeo.firstSmallCircleIntersection({
          lat: recNavaid.lat,
          long: recNavaid.lon
        }, refDistance, {
          lat: origin.lat,
          long: origin.lon
        }, course);
        legLength = Avionics.Utils.computeGreatCircleDistance({
          lat: origin.lat,
          long: origin.lon
        }, termPoint);
      } else {
        // FC
        termPoint = Avionics.Utils.bearingDistanceToCoordinates(course, refDistance, origin.lat, origin.lon);
        legLength = refDistance;
      }
      return this.buildWaypoint("".concat(originIdent.substring(0, 3), "/").concat(Math.round(legLength).toString().padStart(2, '0')), termPoint);
    }

    /**
     * Maps a radial on the origin for a specified distance leg in the procedure.
     * @param leg The procedure leg to map.
     * @param prevLeg The previously mapped leg.
     * @returns The mapped leg.
     */
    mapOriginRadialForDistance(leg, prevLeg) {
      if (leg.fixIcao.trim() !== '') {
        return this.mapExactFix(leg);
      }
      const origin = this._facilities.get(leg.originIcao);
      const originIdent = origin.icao.substring(7, 12).trim();
      const course = leg.course + GeoMath.getMagvar(prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const coordinates = Avionics.Utils.bearingDistanceToCoordinates(course, leg.distance / 1852, prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const distanceFromOrigin = Avionics.Utils.computeGreatCircleDistance(new LatLongAlt(origin.lat, origin.lon), coordinates);
      return this.buildWaypoint("".concat(originIdent).concat(Math.trunc(distanceFromOrigin / 1852)), coordinates);
    }

    /**
     * Maps a heading turn to intercept the next leg in the procedure.
     * @param leg The procedure leg to map.
     * @param prevLeg The previously mapped leg.
     * @param nextLeg The next leg in the procedure to intercept.
     * @returns The mapped leg.
     */
    mapHeadingToInterceptNextLeg(leg, prevLeg, nextLeg) {
      const magVar = Facilities.getMagVar(prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const course = leg.trueDegrees ? leg.course : A32NX_Util.magneticToTrue(leg.course, magVar);
      const coordinates = GeoMath.relativeBearingDistanceToCoords(course, 1, prevLeg.infos.coordinates);
      const waypoint = this.buildWaypoint(FixNamingScheme.courseToIntercept(course), coordinates, prevLeg.infos.magneticVariation);
      return waypoint;
    }

    /**
     * Maps flying a heading until crossing a radial of a reference fix.
     * @param leg The procedure leg to map.
     * @param prevLeg The previously mapped leg.
     * @returns The mapped leg.
     */
    mapHeadingUntilRadialCrossing(leg, prevLeg) {
      const origin = this._facilities.get(leg.originIcao);
      const originCoordinates = new LatLongAlt(origin.lat, origin.lon);
      const originToCoordinates = Avionics.Utils.computeGreatCircleHeading(originCoordinates, prevLeg.infos.coordinates);
      const coordinatesToOrigin = Avionics.Utils.computeGreatCircleHeading(prevLeg.infos.coordinates, new LatLongAlt(origin.lat, origin.lon));
      const distanceToOrigin = Avionics.Utils.computeGreatCircleDistance(prevLeg.infos.coordinates, originCoordinates) / LegsProcedure.distanceNormalFactorNM;
      const alpha = this.deltaAngleRadians(coordinatesToOrigin, leg.course);
      const beta = this.deltaAngleRadians(originToCoordinates, leg.theta);
      const gamma = Math.acos(Math.sin(alpha) * Math.sin(beta) * Math.cos(distanceToOrigin) - Math.cos(alpha) * Math.cos(beta));
      const legDistance = Math.acos((Math.cos(beta) + Math.cos(alpha) * Math.cos(gamma)) / (Math.sin(alpha) * Math.sin(gamma)));
      const magVar = Facilities.getMagVar(prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const course = leg.trueDegrees ? leg.course : A32NX_Util.magneticToTrue(leg.course, magVar);
      const coordinates = Avionics.Utils.bearingDistanceToCoordinates(course, legDistance * LegsProcedure.distanceNormalFactorNM, prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const waypoint = this.buildWaypoint("".concat(this.getIdent(origin.icao)).concat(leg.theta), coordinates);
      return waypoint;
    }

    /**
     * Maps flying a heading until a proscribed altitude.
     * @param leg The procedure leg to map.
     * @param prevLeg The previous leg in the procedure.
     * @returns The mapped leg.
     */
    mapHeadingUntilAltitude(leg, prevLeg) {
      const magVar = Facilities.getMagVar(prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const course = leg.trueDegrees ? leg.course : A32NX_Util.magneticToTrue(leg.course, magVar);
      leg.trueDegrees ? A32NX_Util.trueToMagnetic(leg.course, magVar) : leg.course;
      const altitudeFeet = leg.altitude1 * 3.2808399;
      const distanceInNM = altitudeFeet / 500.0;
      const coordinates = GeoMath.relativeBearingDistanceToCoords(course, distanceInNM, prevLeg.infos.coordinates);
      const waypoint = this.buildWaypoint(FixNamingScheme.headingUntilAltitude(altitudeFeet), coordinates, prevLeg.infos.magneticVariation);
      waypoint.additionalData.vectorsAltitude = altitudeFeet;
      return waypoint;
    }

    /**
     * Maps a vectors instruction.
     * @param leg The procedure leg to map.
     * @param prevLeg The previous leg in the procedure.
     * @returns The mapped leg.
     */
    mapVectors(leg, prevLeg) {
      const magVar = Facilities.getMagVar(prevLeg.infos.coordinates.lat, prevLeg.infos.coordinates.long);
      const course = leg.trueDegrees ? leg.course : A32NX_Util.magneticToTrue(leg.course, magVar);
      leg.trueDegrees ? A32NX_Util.trueToMagnetic(leg.course, magVar) : leg.course;
      const coordinates = GeoMath.relativeBearingDistanceToCoords(course, 1, prevLeg.infos.coordinates);
      const waypoint = this.buildWaypoint(FixNamingScheme.vector(), coordinates);
      waypoint.isVectors = true;
      waypoint.endsInDiscontinuity = true;
      waypoint.discontinuityCanBeCleared = false;
      return waypoint;
    }

    /**
     * Maps an exact fix leg in the procedure.
     * @param leg The procedure leg to map.
     * @returns The mapped leg.
     */
    mapExactFix(leg) {
      const facility = this._facilities.get(leg.fixIcao);
      return RawDataMapper.toWaypoint(facility, this._instrument);
    }
    mapArcToFix(leg, prevLeg) {
      const toFix = this._facilities.get(leg.fixIcao);
      const waypoint = RawDataMapper.toWaypoint(toFix, this._instrument);
      return waypoint;
    }
    mapRadiusToFix(leg) {
      const arcCentreFix = this._facilities.get(leg.arcCenterFixIcao);
      const arcCenterCoordinates = new LatLongAlt(arcCentreFix.lat, arcCentreFix.lon, 0);
      const toFix = this._facilities.get(leg.fixIcao);
      const toCoordinates = new LatLongAlt(toFix.lat, toFix.lon, 0);
      const radius = Avionics.Utils.computeGreatCircleDistance(arcCenterCoordinates, toCoordinates);
      const waypoint = RawDataMapper.toWaypoint(toFix, this._instrument);
      waypoint.additionalData.radius = radius;
      waypoint.additionalData.center = arcCenterCoordinates;
      return waypoint;
    }
    mapHold(leg) {
      const facility = this._facilities.get(leg.fixIcao);
      const waypoint = RawDataMapper.toWaypoint(facility, this._instrument);
      const magVar = Facilities.getMagVar(facility.lat, facility.lon);
      waypoint.additionalData.defaultHold = {
        inboundMagneticCourse: leg.trueDegrees ? A32NX_Util.trueToMagnetic(leg.course, magVar) : leg.course,
        turnDirection: leg.turnDirection,
        distance: leg.distanceMinutes ? undefined : leg.distance / 1852,
        time: leg.distanceMinutes ? leg.distance : undefined,
        type: flightplan$1.HoldType.Database
      };
      waypoint.additionalData.modifiedHold = {};
      return waypoint;
    }

    /**
     * Gets the difference between two headings in zero north normalized radians.
     * @param a The degrees of heading a.
     * @param b The degrees of heading b.
     * @returns The difference between the two headings in zero north normalized radians.
     */
    deltaAngleRadians(a, b) {
      return Math.abs((Avionics.Utils.fmod(a - b + 180, 360) - 180) * Avionics.Utils.DEG2RAD);
    }

    /**
     * Gets an ident from an ICAO.
     * @param icao The icao to pull the ident from.
     * @returns The parsed ident.
     */
    getIdent(icao) {
      return icao.substring(7, 12).trim();
    }

    /**
     * Checks if an ICAO is valid to load.
     * @param icao The icao to check.
     * @returns Whether or not the ICAO is valid.
     */
    isIcaoValid(icao) {
      for (const rule of this.legFilteringRules) {
        if (!rule(icao)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Builds a WayPoint from basic data.
     * @param ident The ident of the waypoint.
     * @param coordinates The coordinates of the waypoint.
     * @param magneticVariation The magnetic variation of the waypoint, if any.
     * @returns The built waypoint.
     */
    buildWaypoint(ident, coordinates, magneticVariation) {
      const waypoint = new WayPoint(this._instrument);
      waypoint.type = 'W';
      waypoint.infos = new IntersectionInfo(this._instrument);
      waypoint.infos.coordinates = coordinates;
      waypoint.infos.magneticVariation = magneticVariation;
      waypoint.ident = ident;
      waypoint.infos.ident = ident;
      waypoint.additionalData = {};
      return waypoint;
    }
    async calculateApproachData(runway) {
      await this.ensureFacilitiesLoaded();

      // our fallback for threshold crossing altitude is threshold + 50 feet
      let threshCrossAlt = runway.thresholdElevation + 15.24;

      // see if we have a runway fix, to give us coded TCH
      // it can either be the MAP, or be before the MAP (MAP must be last leg of final approach)
      // TCH altitude must be coded in altitude1 according to ARINC
      for (let i = this._legs.length - 1; i > 0; i--) {
        const leg = this._legs[i];
        // TODO check it's the same runway for robustness?
        if (leg.fixIcao.charAt(0) === 'R') {
          threshCrossAlt = leg.altitude1;
          break;
        }
      }

      // MSFS does not give the coded descent angle
      // we do our best to calculate one...
      let fafAlt;
      let fafIndex;
      let fafToTcaDist = 0;
      let lastLegPoint;
      for (let i = 0; i < this._legs.length; i++) {
        const leg = this._legs[i];
        let termPoint;
        if (leg.fixIcao.charAt(0) === 'R') {
          termPoint = runway.thresholdCoordinates;
        } else {
          const fix = this._facilities.get(leg.fixIcao);
          termPoint = new LatLongAlt(fix.lat, fix.lon);
        }
        if (leg.fixTypeFlags & FixTypeFlags.FAF) {
          if (leg.altDesc === AltitudeDescriptor.Empty) {
            // this is illegal by ARINC
            break;
          }
          fafIndex = i;
          // MSFS codes the wrong altDesc... but the right data...
          fafAlt = leg.altitude2 > 0 ? leg.altitude2 : leg.altitude1;
        } else if (fafIndex !== undefined) {
          if (leg.distance > 0) {
            fafToTcaDist += leg.distance;
          } else {
            // assume a straight leg
            fafToTcaDist += 1852 * Avionics.Utils.computeGreatCircleDistance(lastLegPoint, termPoint);
          }
        }
        if (leg.fixIcao.charAt(0) === 'R') {
          break;
        }
        lastLegPoint = termPoint;
      }
      if (fafIndex !== undefined && fafAlt > 0 && fafToTcaDist > 0) {
        let glideAngle = Math.atan((fafAlt - threshCrossAlt) / fafToTcaDist) * 180 / Math.PI;
        // arinc specifics < 3 degrees is rounded up to 3 degrees when calculating glide angle from alt sources
        // we do the same if we have invalid data..
        if (!Number.isFinite(glideAngle) || glideAngle < 3 || glideAngle > 10) {
          glideAngle = 3;
        }
        for (let i = fafIndex + 1; i < this._legs.length; i++) {
          this._legs[i].verticalAngle = glideAngle;
        }
      }
    }
  }
  _defineProperty(LegsProcedure, "distanceNormalFactorNM", 21639 / 2 * Math.PI);

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * Methods for interacting with the FS9GPS subsystem.
   */
  class GPS {
    /**
    * Clears the FS9GPS flight plan.
    */
    static async clearPlan() {
      const totalGpsWaypoints = SimVar.GetSimVarValue('C:fs9gps:FlightPlanWaypointsNumber', 'number');
      for (let i = 0; i < totalGpsWaypoints; i++) {
        // Always remove waypoint 0 here, which shifts the rest of the waypoints down one
        GPS.deleteWaypoint(0).catch(console.error);
      }
    }

    /**
    * Adds a waypoint to the FS9GPS flight plan by ICAO designation.
    * @param icao The MSFS ICAO to add to the flight plan.
    * @param index The index of the waypoint to add in the flight plan.
    */
    static async addIcaoWaypoint(icao, index) {
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanNewWaypointICAO', 'string', icao).catch(console.error);
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanAddWaypoint', 'number', index).catch(console.error);
    }

    /**
    * Adds a user waypoint to the FS9GPS flight plan.
    * @param lat The latitude of the user waypoint.
    * @param lon The longitude of the user waypoint.
    * @param index The index of the waypoint to add in the flight plan.
    * @param ident The ident of the waypoint.
    */
    static async addUserWaypoint(lat, lon, index, ident) {
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanNewWaypointLatitude', 'degrees', lat).catch(console.error);
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanNewWaypointLongitude', 'degrees', lon).catch(console.error);
      if (ident) {
        await SimVar.SetSimVarValue('C:fs9gps:FlightPlanNewWaypointIdent', 'string', ident).catch(console.error);
      }
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanAddWaypoint', 'number', index).catch(console.error);
    }

    /**
    * Deletes a waypoint from the FS9GPS flight plan.
    * @param index The index of the waypoint in the flight plan to delete.
    */
    static async deleteWaypoint(index) {
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanDeleteWaypoint', 'number', index).catch(console.error);
    }

    /**
    * Sets the active FS9GPS waypoint.
    * @param {Number} index The index of the waypoint to set active.
    */
    static async setActiveWaypoint(index) {
      await SimVar.SetSimVarValue('C:fs9gps:FlightPlanActiveWaypoint', 'number', index).catch(console.error);
    }

    /**
    * Gets the active FS9GPS waypoint.
    */
    static getActiveWaypoint() {
      return SimVar.GetSimVarValue('C:fs9gps:FlightPlanActiveWaypoint', 'number');
    }

    /**
    * Logs the current FS9GPS flight plan.
    */
    static async logCurrentPlan() {
      const waypointIdents = [];
      const totalGpsWaypoints = SimVar.GetSimVarValue('C:fs9gps:FlightPlanWaypointsNumber', 'number');
      for (let i = 0; i < totalGpsWaypoints; i++) {
        SimVar.SetSimVarValue('C:fs9gps:FlightPlanWaypointIndex', 'number', i);
        waypointIdents.push(SimVar.GetSimVarValue('C:fs9gps:FlightPlanWaypointIdent', 'string'));
      }
      console.log("GPS Plan: ".concat(waypointIdents.join(' ')));
    }
  }

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * The details of procedures selected in the flight plan.
   */
  class ProcedureDetails {
    constructor() {
      _defineProperty(this, "originRunwayIndex", -1);
      _defineProperty(this, "departureIndex", -1);
      _defineProperty(this, "departureTransitionIndex", -1);
      _defineProperty(this, "departureRunwayIndex", -1);
      _defineProperty(this, "arrivalIndex", -1);
      _defineProperty(this, "arrivalTransitionIndex", -1);
      _defineProperty(this, "arrivalRunwayIndex", -1);
      _defineProperty(this, "approachIndex", -1);
      _defineProperty(this, "approachTransitionIndex", -1);
      _defineProperty(this, "destinationRunwayIndex", -1);
      _defineProperty(this, "destinationRunwayExtension", -1);
      _defineProperty(this, "approachType", void 0);
    }
  }

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * Information about the current direct-to procedures in the flight plan.
   */
  class DirectTo {
    constructor() {
      _defineProperty(this, "waypointIsInFlightPlan", false);
      _defineProperty(this, "isActive", false);
      _defineProperty(this, "waypoint", void 0);
      _defineProperty(this, "planWaypointIndex", 0);
      _defineProperty(this, "interceptPoints", void 0);
      _defineProperty(this, "currentWaypointIndex", 0);
      _defineProperty(this, "segments", void 0);
    }
  }

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * Creating a new waypoint to be added to a flight plan.
   */
  class WaypointBuilder {
    /**
    * Builds a WayPoint from basic data.
    * @param ident The ident of the waypoint to be created.
    * @param coordinates The coordinates of the waypoint.
    * @param instrument The base instrument instance.
    * @returns The built waypoint.
    */
    static fromCoordinates(ident, coordinates, instrument, additionalData, icao) {
      const waypoint = new WayPoint(instrument);
      waypoint.type = 'W';
      waypoint.infos = new IntersectionInfo(instrument);
      waypoint.infos.coordinates = coordinates;
      waypoint.ident = ident;
      waypoint.infos.ident = ident;
      waypoint.icao = icao !== null && icao !== void 0 ? icao : "W      ".concat(ident);
      waypoint.infos.icao = waypoint.icao;
      waypoint.additionalData = additionalData !== null && additionalData !== void 0 ? additionalData : {};
      return waypoint;
    }

    /**
    * Builds a WayPoint from a refrence waypoint.
    * @param ident The ident of the waypoint to be created.
    * @param placeCoordinates The coordinates of the reference waypoint.
    * @param bearing The bearing from the reference waypoint.
    * @param distance The distance from the reference waypoint.
    * @param instrument The base instrument instance.
    * @returns The built waypoint.
    */
    static fromPlaceBearingDistance(ident, placeCoordinates, bearing, distance, instrument) {
      let magneticBearing = bearing + GeoMath.getMagvar(placeCoordinates.lat, placeCoordinates.long);
      magneticBearing = magneticBearing < 0 ? 360 + magneticBearing : magneticBearing;
      const coordinates = Avionics.Utils.bearingDistanceToCoordinates(magneticBearing, distance, placeCoordinates.lat, placeCoordinates.long);
      return WaypointBuilder.fromCoordinates(ident, coordinates, instrument);
    }

    /**
    * Builds a WayPoint at a distance from an existing waypoint along the flight plan.
    * @param ident The ident of the waypoint to be created.
    * @param placeIndex The index of the reference waypoint in the flight plan.
    * @param distance The distance from the reference waypoint.
    * @param instrument The base instrument instance.
    * @param fpm The flightplanmanager instance.
    * @returns The built waypoint.
    */
    static fromPlaceAlongFlightPlan(ident, placeIndex, distance, instrument, fpm) {
      console.log('running fromPlaceAlongFlightPlan');
      console.log("destination? ".concat(fpm.getDestination()) ? 'True' : 'False');
      const destinationDistanceInFlightplan = fpm.getDestination().cumulativeDistanceInFP;
      console.log("destinationDistanceInFlightplan ".concat(destinationDistanceInFlightplan));
      const placeDistanceFromDestination = fpm.getWaypoint(placeIndex, 0, true).cumulativeDistanceInFP;
      console.log("placeDistanceFromDestination ".concat(placeDistanceFromDestination));
      const distanceFromDestination = destinationDistanceInFlightplan - placeDistanceFromDestination - distance;
      console.log("distanceFromDestination ".concat(distanceFromDestination));
      const coordinates = fpm.getCoordinatesAtNMFromDestinationAlongFlightPlan(distanceFromDestination);
      return WaypointBuilder.fromCoordinates(ident, coordinates, instrument);
    }
    static fromWaypointManualHold(waypoint, holdDirection, inboundCourse, holdLength, holdTime, instrument) {
      const newWaypoint = WaypointBuilder.fromCoordinates(waypoint.ident, waypoint.infos.coordinates, instrument);
      newWaypoint.icao = waypoint.icao;
      newWaypoint.infos = waypoint.infos;
      newWaypoint.additionalData.legType = FSEnums.LegType.HM;
      newWaypoint.turnDirection = holdDirection;
      newWaypoint.additionalData.course = inboundCourse;
      newWaypoint.additionalData.distance = holdLength;
      newWaypoint.additionalData.distanceInMinutes = holdTime;
      newWaypoint.speedConstraint = waypoint.speedConstraint;
      newWaypoint.legAltitudeDescription = waypoint.legAltitudeDescription;
      newWaypoint.legAltitude1 = waypoint.legAltitude1;
      newWaypoint.legAltitude2 = waypoint.legAltitude2;
      newWaypoint.additionalData.constraintType = waypoint.additionalData.constraintType;
      return newWaypoint;
    }
  }

  /**
   * A flight plan managed by the FlightPlanManager.
   */
  class ManagedFlightPlan {
    constructor() {
      _defineProperty(this, "originAirfield", void 0);
      _defineProperty(this, "persistentOriginAirfield", void 0);
      _defineProperty(this, "originTransitionAltitudeDb", void 0);
      _defineProperty(this, "originTransitionAltitudePilot", void 0);
      _defineProperty(this, "destinationAirfield", void 0);
      _defineProperty(this, "destinationTransitionLevelDb", void 0);
      _defineProperty(this, "destinationTransitionLevelPilot", void 0);
      _defineProperty(this, "cruiseAltitude", 0);
      _defineProperty(this, "activeWaypointIndex", 0);
      _defineProperty(this, "procedureDetails", new ProcedureDetails());
      _defineProperty(this, "directTo", new DirectTo());
      _defineProperty(this, "turningPointIndex", 0);
      _defineProperty(this, "_parentInstrument", void 0);
      _defineProperty(this, "_segments", [new FlightPlanSegment(SegmentType.Enroute, 0, [])]);
    }
    /** The departure segment of the flight plan. */
    get departure() {
      return this.getSegment(SegmentType.Departure);
    }

    /** The enroute segment of the flight plan. */
    get enroute() {
      return this.getSegment(SegmentType.Enroute);
    }

    /** The arrival segment of the flight plan. */
    get arrival() {
      return this.getSegment(SegmentType.Arrival);
    }

    /** The approach segment of the flight plan. */
    get approach() {
      return this.getSegment(SegmentType.Approach);
    }

    /** The approach segment of the flight plan. */
    get missed() {
      return this.getSegment(SegmentType.Missed);
    }

    /** Whether the flight plan has an origin airfield. */
    get hasOrigin() {
      return this.originAirfield;
    }

    /** Whether the flight plan has a persistent origin airfield. */
    get hasPersistentOrigin() {
      return this.persistentOriginAirfield;
    }

    /** Whether the flight plan has a destination airfield. */
    get hasDestination() {
      return this.destinationAirfield;
    }

    /** The currently active waypoint. */
    get activeWaypoint() {
      return this.waypoints[this.activeWaypointIndex];
    }

    /**
     * Returns a list of {@link WaypointStats} for the waypoints in the flight plan
     *
     * @return {WaypointStats[]} array of statistics for the waypoints in the flight plan, with matching indices to
     *                           flight plan waypoints
     */
    computeWaypointStatistics(ppos) {
      // TODO this should be moved into its own dedicated module

      const stats = new Map();
      const firstData = this.computeActiveWaypointStatistics(ppos);
      stats.set(this.activeWaypointIndex, firstData);
      this.waypoints.slice(0).forEach((waypoint, index) => {
        var _firstData$distanceFr, _this$activeWaypoint$, _this$activeWaypoint;
        // TODO redo when we have a better solution for vector legs
        const firstDistFromPpos = (_firstData$distanceFr = firstData === null || firstData === void 0 ? void 0 : firstData.distanceFromPpos) !== null && _firstData$distanceFr !== void 0 ? _firstData$distanceFr : 0;
        const activeWpCumulativeDist = (_this$activeWaypoint$ = (_this$activeWaypoint = this.activeWaypoint) === null || _this$activeWaypoint === void 0 ? void 0 : _this$activeWaypoint.cumulativeDistanceInFP) !== null && _this$activeWaypoint$ !== void 0 ? _this$activeWaypoint$ : 0;
        const distPpos = waypoint.isVectors ? 1 : waypoint.cumulativeDistanceInFP - activeWpCumulativeDist + firstDistFromPpos;
        const data = {
          ident: waypoint.ident,
          bearingInFp: waypoint.bearingInFP,
          distanceInFP: waypoint.distanceInFP,
          distanceFromPpos: distPpos,
          timeFromPpos: this.computeWaypointTime(waypoint.cumulativeDistanceInFP - activeWpCumulativeDist + firstDistFromPpos),
          etaFromPpos: this.computeWaypointEta(waypoint.cumulativeDistanceInFP - activeWpCumulativeDist + firstDistFromPpos)
        };
        stats.set(index, data);
      });
      return stats;
    }

    /**
     * Returns info for the currently active waypoint, to be displayed by the Navigation Display
     */
    computeActiveWaypointStatistics(ppos) {
      // TODO this should be moved into its own dedicated module

      if (!this.activeWaypoint) {
        return undefined;
      }
      const bearingInFp = Avionics.Utils.computeGreatCircleHeading(ppos, this.activeWaypoint.infos.coordinates);
      let distanceFromPpos;
      if (Number.isNaN(ppos.lat) || Number.isNaN(ppos.long)) {
        distanceFromPpos = this.activeWaypoint.distanceInFP;
      } else if (this.activeWaypoint.isVectors) {
        // TODO redo when we have a better solution for vector legs
        distanceFromPpos = 1;
      } else {
        distanceFromPpos = Avionics.Utils.computeGreatCircleDistance(ppos, this.activeWaypoint.infos.coordinates);
      }
      const timeFromPpos = this.computeWaypointTime(distanceFromPpos);
      const etaFromPpos = this.computeWaypointEta(distanceFromPpos, timeFromPpos);
      return {
        ident: this.activeWaypoint.ident,
        bearingInFp,
        distanceInFP: this.activeWaypoint.distanceInFP,
        distanceFromPpos,
        timeFromPpos,
        etaFromPpos,
        magneticVariation: GeoMath.getMagvar(this.activeWaypoint.infos.coordinates.lat, this.activeWaypoint.infos.coordinates.long)
      };
    }

    // TODO is this accurate? Logic is same like in the old FPM
    computeWaypointTime(distance) {
      const groundSpeed = Simplane.getGroundSpeed();
      if (groundSpeed < 100) {
        return distance / 400 * 3600;
      }
      return distance / groundSpeed * 3600;
    }
    computeWaypointEta(distance, preComputedTime) {
      const eta = preComputedTime !== null && preComputedTime !== void 0 ? preComputedTime : this.computeWaypointTime(distance);
      const utcTime = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');

      // // console.log(`BRUHEGG: ${utcTime}, BRUHHH #2: ${eta}`);

      return eta + utcTime;
    }

    /** The parent instrument this flight plan is attached to locally. */

    /** The waypoints of the flight plan. */
    get waypoints() {
      const waypoints = [];
      if (this.originAirfield) {
        waypoints.push(this.originAirfield);
      }
      for (const segment of this._segments) {
        waypoints.push(...segment.waypoints);
      }
      if (this.destinationAirfield) {
        waypoints.push(this.destinationAirfield);
      }
      return waypoints;
    }

    /**
     * Gets all the waypoints that are currently visible and part of the routing.
     *
     * This is used to obtain the list of waypoints to display after a DIRECT TO.
     */
    get visibleWaypoints() {
      const allWaypoints = this.waypoints;
      if (this.directTo.isActive) {
        const directToWaypointIndex = this.directTo.planWaypointIndex;
        return allWaypoints.slice(Math.max(this.activeWaypointIndex - 1, directToWaypointIndex), allWaypoints.length - 1);
      }
      return allWaypoints.slice(this.activeWaypointIndex - 1, allWaypoints.length);
    }
    get activeVisibleWaypointIndex() {
      if (this.directTo.isActive) {
        const directToWaypointIndex = this.directTo.planWaypointIndex;
        return this.activeWaypointIndex - 1 > directToWaypointIndex ? 1 : 0;
      }
      return 1;
    }
    get segments() {
      return this._segments;
    }

    /** The length of the flight plan. */
    get length() {
      const lastSeg = this._segments[this._segments.length - 1];
      return lastSeg.offset + lastSeg.waypoints.length + (this.hasDestination ? 1 : 0);
    }
    get checksum() {
      let checksum = 0;
      const {
        waypoints
      } = this;
      for (let i = 0; i < waypoints.length; i++) checksum += waypoints[i].infos.coordinates.lat;
      return checksum;
    }

    /** The non-approach waypoints of the flight plan. */
    get nonApproachWaypoints() {
      const waypoints = [];
      if (this.originAirfield) {
        waypoints.push(this.originAirfield);
      }
      for (const segment of this._segments.filter(s => s.type < SegmentType.Approach)) {
        waypoints.push(...segment.waypoints);
      }
      if (this.destinationAirfield) {
        waypoints.push(this.destinationAirfield);
      }
      return waypoints;
    }

    /**
     * Sets the parent instrument that the flight plan is attached to locally.
     * @param instrument The instrument that the flight plan is attached to.
     */
    setParentInstrument(instrument) {
      this._parentInstrument = instrument;
    }

    /**
     * Clears the flight plan.
     */
    async clearPlan() {
      this.originAirfield = undefined;
      this.originTransitionAltitudeDb = undefined;
      this.originTransitionAltitudePilot = undefined;
      this.persistentOriginAirfield = undefined;
      this.destinationAirfield = undefined;
      this.destinationTransitionLevelDb = undefined;
      this.destinationTransitionLevelPilot = undefined;
      this.cruiseAltitude = 0;
      this.activeWaypointIndex = 0;
      this.procedureDetails = new ProcedureDetails();
      this.directTo = new DirectTo();
      await GPS.clearPlan().catch(console.error);
      this._segments = [new FlightPlanSegment(SegmentType.Enroute, 0, [])];
    }

    /**
     * Syncs the flight plan to FS9GPS.
     */
    async syncToGPS() {
      await GPS.clearPlan().catch(console.error);
      for (let i = 0; i < this.waypoints.length; i++) {
        const waypoint = this.waypoints[i];
        if (waypoint.icao && waypoint.icao.trim() !== '') {
          GPS.addIcaoWaypoint(waypoint.icao, i).catch(console.error);
        } else {
          GPS.addUserWaypoint(waypoint.infos.coordinates.lat, waypoint.infos.coordinates.long, i, waypoint.ident).catch(console.error);
        }
        if (waypoint.endsInDiscontinuity) {
          break;
        }
      }
      await GPS.setActiveWaypoint(this.activeWaypointIndex).catch(console.error);
      await GPS.logCurrentPlan().catch(console.error);
    }

    /**
     * Adds a waypoint to the flight plan.
     *
     * @param waypoint    The waypoint to add
     *
     * @param index       The index to add the waypoint at. If omitted the waypoint will
     *                    be appended to the end of the flight plan.
     *
     * @param segmentType The type of segment to add the waypoint to
     * @returns The index the waypoint was actually inserted at
     */
    addWaypoint(waypoint, index, segmentType) {
      console.log('addWaypoint', waypoint, index, SegmentType[segmentType]);
      const mappedWaypoint = waypoint instanceof WayPoint ? waypoint : RawDataMapper.toWaypoint(waypoint, this._parentInstrument);
      if (mappedWaypoint.type === 'A' && index === 0) {
        mappedWaypoint.endsInDiscontinuity = true;
        mappedWaypoint.discontinuityCanBeCleared = true;
        this.originAirfield = mappedWaypoint;
        this.persistentOriginAirfield = mappedWaypoint;
        this.procedureDetails.departureIndex = -1;
        this.procedureDetails.departureRunwayIndex = -1;
        this.procedureDetails.departureTransitionIndex = -1;
        this.procedureDetails.originRunwayIndex = -1;
        this.reflowSegments();
        this.reflowDistances();
      } else if (mappedWaypoint.type === 'A' && index === undefined) {
        this.destinationAirfield = mappedWaypoint;
        this.procedureDetails.arrivalIndex = -1;
        this.procedureDetails.arrivalRunwayIndex = -1;
        this.procedureDetails.arrivalTransitionIndex = -1;
        this.procedureDetails.approachIndex = -1;
        this.procedureDetails.approachTransitionIndex = -1;
        this.reflowSegments();
        this.reflowDistances();
      } else {
        let segment;
        if (segmentType !== undefined) {
          segment = this.getSegment(segmentType);
          if (segment === FlightPlanSegment.Empty) {
            segment = this.addSegment(segmentType);
          }
        } else {
          segment = this.findSegmentByWaypointIndex(index);
          if (segment === FlightPlanSegment.Empty) {
            throw new Error('ManagedFlightPlan::addWaypoint: no segment found!');
          }
        }

        // hitting first waypoint in segment > enroute
        if (segment.type > SegmentType.Enroute && index === segment.offset) {
          const segIdx = this._segments.findIndex(seg => seg.type === segment.type);
          // is prev segment enroute?
          const prevSeg = this._segments[segIdx - 1];
          if (prevSeg.type === SegmentType.Enroute) {
            segment = prevSeg;
          }
        }
        if (segment) {
          if (index > this.length) {
            index = undefined;
          }
          if (mappedWaypoint.additionalData.legType === undefined) {
            if (segment.waypoints.length < 1) {
              mappedWaypoint.additionalData.legType = LegType.IF;
            } else {
              mappedWaypoint.additionalData.legType = LegType.TF;
            }
          }
          if (index !== undefined) {
            const segmentIndex = index - segment.offset;
            if (segmentIndex < segment.waypoints.length) {
              segment.waypoints.splice(segmentIndex, 0, mappedWaypoint);
            } else {
              segment.waypoints.push(mappedWaypoint);
            }
          } else {
            segment.waypoints.push(mappedWaypoint);
          }
          this.reflowSegments();
          this.reflowDistances();
          const finalIndex = this.waypoints.indexOf(mappedWaypoint);
          const previousWp = finalIndex > 0 ? this.waypoints[finalIndex - 1] : undefined;

          // Transfer discontinuity forwards if previous waypoint has one and it can be cleared,
          // AND the new waypoint isn't the T-P of a direct to
          if (previousWp && previousWp.endsInDiscontinuity && !mappedWaypoint.isTurningPoint) {
            if (previousWp.discontinuityCanBeCleared === undefined || previousWp.discontinuityCanBeCleared) {
              previousWp.endsInDiscontinuity = false;
              previousWp.discontinuityCanBeCleared = undefined;

              // Don't mark the mapped waypoint's discontinuity as clearable if this is a MANUAL
              // TODO maybe extract this logic since we also use it when building a LegsProcedure
              mappedWaypoint.endsInDiscontinuity = true;
              if (!mappedWaypoint.isVectors) {
                mappedWaypoint.discontinuityCanBeCleared = true;
              }
            }
          }
          if (this.activeWaypointIndex === 0 && this.length > 1) {
            this.activeWaypointIndex = 1;
          } else if (this.activeWaypointIndex === 1 && waypoint.isRunway && segment.type === SegmentType.Departure) {
            this.activeWaypointIndex = 2;
          }
          return finalIndex;
        }
      }
      return -1;
    }

    /**
     * Removes a waypoint from the flight plan.
     * @param index The index of the waypoint to remove.
     */
    removeWaypoint(index) {
      let noDiscontinuity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.originAirfield && index === 0) {
        this.originAirfield;
        this.originAirfield = undefined;
        this.reflowSegments();
        this.reflowDistances();
      } else if (this.destinationAirfield && index === this.length - 1) {
        this.destinationAirfield;
        this.destinationAirfield = undefined;
      } else {
        const segment = this.findSegmentByWaypointIndex(index);
        if (segment) {
          // console.log("--> REMOVING WAYPOINT ", this.getWaypoint(index), ", FROM SEGMENT ", segment);
          const spliced = segment.waypoints.splice(index - segment.offset, 1);
          spliced[0];
          if (segment.waypoints.length === 0 && segment.type !== SegmentType.Enroute) {
            // console.log("SEGMENT LENGTH is 0, REMOVING...");
            this.removeSegment(segment.type);
          }
          this.reflowSegments();
          this.reflowDistances();
        }
      }

      // transfer a potential discontinuity backward
      const beforeRemoved = this.waypoints[index - 1];
      if (!noDiscontinuity && beforeRemoved && !beforeRemoved.endsInDiscontinuity) {
        beforeRemoved.endsInDiscontinuity = true;
        beforeRemoved.discontinuityCanBeCleared = true;
      }
      if (index < this.activeWaypointIndex || this.activeWaypointIndex === this.waypoints.length) {
        this.activeWaypointIndex--;
      }
    }

    /**
     * Gets a waypoint by index from the flight plan.
     * @param index The index of the waypoint to get.
     */
    getWaypoint(index) {
      if (this.originAirfield && index === 0) {
        return this.originAirfield;
      }
      if (this.destinationAirfield && index === this.length - 1) {
        return this.destinationAirfield;
      }
      const segment = this.findSegmentByWaypointIndex(index);
      if (segment) {
        return segment.waypoints[index - segment.offset];
      }
      return null;
    }
    setWaypointOverfly(index, value) {
      // FIXME origin airfield isn't necessarily index 0
      if (this.originAirfield && index === 0) {
        return;
      }

      // FIXME origin airfield isn't necessarily last index (never will be with missed approach)
      if (this.destinationAirfield && index === this.length - 1) {
        return;
      }
      const segment = this.findSegmentByWaypointIndex(index);
      if (segment) {
        segment.waypoints[index - segment.offset].additionalData.overfly = value;
      }
    }
    addOrEditManualHold(index, desiredHold, modifiedHold, defaultHold) {
      const atWaypoint = this.getWaypoint(index);
      if (!atWaypoint) {
        return;
      }
      const magVar = Facilities.getMagVar(atWaypoint.infos.coordinates.lat, atWaypoint.infos.coordinates.long);
      const trueCourse = A32NX_Util.magneticToTrue(desiredHold.inboundMagneticCourse, magVar);
      if (atWaypoint.additionalData.legType === LegType.HA || atWaypoint.additionalData.legType === LegType.HF || atWaypoint.additionalData.legType === LegType.HM) {
        atWaypoint.additionalData.legType = LegType.HM;
        atWaypoint.turnDirection = desiredHold.turnDirection;
        atWaypoint.additionalData.course = trueCourse;
        atWaypoint.additionalData.distance = desiredHold.distance;
        atWaypoint.additionalData.distanceInMinutes = desiredHold.time;
        atWaypoint.additionalData.modifiedHold = modifiedHold;
        if (atWaypoint.additionalData.defaultHold === undefined) {
          atWaypoint.additionalData.defaultHold = defaultHold;
        }
        return index;
      } else {
        const manualHoldWaypoint = WaypointBuilder.fromWaypointManualHold(atWaypoint, desiredHold.turnDirection, trueCourse, desiredHold.distance, desiredHold.time, this._parentInstrument);
        manualHoldWaypoint.additionalData.modifiedHold = modifiedHold;
        manualHoldWaypoint.additionalData.defaultHold = defaultHold;
        this.addWaypoint(manualHoldWaypoint, index + 1);
        return index + 1;
      }
    }

    /**
     * Adds a plan segment to the flight plan.
     * @param type The type of the segment to add.
     */
    addSegment(type) {
      const segment = new FlightPlanSegment(type, 0, []);
      this._segments.push(segment);
      this._segments.sort((a, b) => a.type - b.type);
      this.reflowSegments();
      return segment;
    }

    /**
     * Removes a plan segment from the flight plan.
     * @param type The type of plan segment to remove.
     */
    removeSegment(type) {
      const segmentIndex = this._segments.findIndex(s => s.type === type);
      if (segmentIndex > -1) {
        this._segments.splice(segmentIndex, 1);
      }
    }

    /**
     * Reflows waypoint index offsets accross plans segments.
     */
    reflowSegments() {
      let index = 0;
      if (this.originAirfield) {
        index = 1;
      }
      for (const segment of this._segments) {
        segment.offset = index;
        index += segment.waypoints.length;
      }
    }

    /**
     * Gets a flight plan segment of the specified type.
     * @param type The type of flight plan segment to get.
     * @returns The found segment, or FlightPlanSegment.Empty if not found.
     */
    getSegment(type) {
      const segment = this._segments.find(s => s.type === type);
      return segment !== undefined ? segment : FlightPlanSegment.Empty;
    }

    /**
     * Finds a flight plan segment by waypoint index.
     * @param index The index of the waypoint to find the segment for.
     * @returns The located segment, if any.
     */
    findSegmentByWaypointIndex(index) {
      for (let i = 0; i < this._segments.length; i++) {
        const segMaxIdx = this._segments[i].offset + this._segments[i].waypoints.length;
        if (segMaxIdx > index) {
          return this._segments[i];
        }
      }
      return this._segments[this._segments.length - 1];
    }
    isLastWaypointInSegment(fpIndex) {
      const segment = this.findSegmentByWaypointIndex(fpIndex);
      if (fpIndex >= this.waypoints.length) {
        return false;
      }
      if (fpIndex === segment.offset + segment.waypoints.length - 1) {
        return true;
      }
      return false;
    }

    /**
     * Recalculates all waypoint bearings and distances in the flight plan.
     */
    reflowDistances() {
      let cumulativeDistance = 0;
      const {
        waypoints
      } = this;
      for (let i = 0; i < waypoints.length; i++) {
        if (i > 0) {
          // If there's an approach selected and this is the last approach waypoint, use the destination waypoint for coordinates
          // Runway waypoints do not have coordinates
          const referenceWaypoint = waypoints[i];
          const prevWaypoint = waypoints[i - 1];
          const trueCourseToWaypoint = Avionics.Utils.computeGreatCircleHeading(prevWaypoint.infos.coordinates, referenceWaypoint.infos.coordinates);
          referenceWaypoint.bearingInFP = trueCourseToWaypoint - GeoMath.getMagvar(prevWaypoint.infos.coordinates.lat, prevWaypoint.infos.coordinates.long);
          referenceWaypoint.bearingInFP = referenceWaypoint.bearingInFP < 0 ? 360 + referenceWaypoint.bearingInFP : referenceWaypoint.bearingInFP;
          if (prevWaypoint.endsInDiscontinuity && !prevWaypoint.discontinuityCanBeCleared) {
            referenceWaypoint.distanceInFP = 0;
          } else if (referenceWaypoint.additionalData) {
            switch (referenceWaypoint.additionalData.legType) {
              case 11:
              case 22:
                referenceWaypoint.distanceInFP = 1;
                break;
              default:
                referenceWaypoint.distanceInFP = Avionics.Utils.computeGreatCircleDistance(prevWaypoint.infos.coordinates, referenceWaypoint.infos.coordinates);
                break;
            }
          } else {
            referenceWaypoint.distanceInFP = Avionics.Utils.computeGreatCircleDistance(prevWaypoint.infos.coordinates, referenceWaypoint.infos.coordinates);
          }
          cumulativeDistance += referenceWaypoint.distanceInFP;
          referenceWaypoint.cumulativeDistanceInFP = cumulativeDistance;
        }
      }
    }

    /**
     * Copies a sanitized version of the flight plan for shared data storage.
     * @returns The sanitized flight plan.
     */
    serialize() {
      var _planCopy$directTo$in;
      const planCopy = new ManagedFlightPlan();
      const copyWaypoint = waypoint => ({
        icao: waypoint.icao,
        ident: waypoint.ident,
        type: waypoint.type,
        legAltitudeDescription: waypoint.legAltitudeDescription,
        legAltitude1: waypoint.legAltitude1,
        legAltitude2: waypoint.legAltitude2,
        speedConstraint: waypoint.speedConstraint,
        turnDirection: waypoint.turnDirection,
        isVectors: waypoint.isVectors,
        endsInDiscontinuity: waypoint.endsInDiscontinuity,
        discontinuityCanBeCleared: waypoint.discontinuityCanBeCleared,
        distanceInFP: waypoint.distanceInFP,
        cumulativeDistanceInFP: waypoint.cumulativeDistanceInFP,
        isRunway: waypoint.isRunway,
        additionalData: waypoint.additionalData,
        infos: {
          icao: waypoint.infos.icao,
          ident: waypoint.infos.ident,
          airwayIn: waypoint.infos.airwayIn,
          airwayOut: waypoint.infos.airwayOut,
          routes: waypoint.infos.routes,
          coordinates: {
            lat: waypoint.infos.coordinates.lat,
            long: waypoint.infos.coordinates.long,
            alt: waypoint.infos.coordinates.alt
          }
        }
      });
      const copyAirfield = airfield => {
        const copy = Object.assign(new WayPoint(undefined), airfield);
        copy.infos = Object.assign(new AirportInfo(undefined), copy.infos);
        delete copy.instrument;
        delete copy.infos.instrument;
        delete copy._svgElements;
        delete copy.infos._svgElements;
        return copy;
      };
      planCopy.activeWaypointIndex = this.activeWaypointIndex;
      planCopy.destinationAirfield = this.destinationAirfield && copyAirfield(this.destinationAirfield);
      planCopy.originAirfield = this.originAirfield && copyAirfield(this.originAirfield);
      planCopy.persistentOriginAirfield = this.persistentOriginAirfield && copyAirfield(this.persistentOriginAirfield);
      planCopy.procedureDetails = _objectSpread2({}, this.procedureDetails);
      planCopy.directTo = _objectSpread2({}, this.directTo);
      planCopy.directTo.interceptPoints = (_planCopy$directTo$in = planCopy.directTo.interceptPoints) === null || _planCopy$directTo$in === void 0 ? void 0 : _planCopy$directTo$in.map(w => copyWaypoint(w));
      const copySegments = [];
      for (const segment of this._segments) {
        const copySegment = new FlightPlanSegment(segment.type, segment.offset, []);
        for (const waypoint of segment.waypoints) {
          copySegment.waypoints.push(copyWaypoint(waypoint));
        }
        copySegments.push(copySegment);
      }
      planCopy._segments = copySegments;
      return planCopy;
    }

    /**
     * Copies the flight plan.
     * @returns The copied flight plan.
     */
    copy() {
      const newFlightPlan = Object.assign(new ManagedFlightPlan(), this);
      newFlightPlan.setParentInstrument(this._parentInstrument);
      newFlightPlan._segments = [];
      for (let i = 0; i < this._segments.length; i++) {
        const seg = this._segments[i];
        newFlightPlan._segments[i] = Object.assign(new FlightPlanSegment(seg.type, seg.offset, []), seg);
        newFlightPlan._segments[i].waypoints = [...seg.waypoints.map(wp => {
          const clone = new wp.constructor();
          Object.assign(clone, wp);
          clone.additionalData = Object.assign({}, wp.additionalData);
          return clone;
        })];
      }
      newFlightPlan.procedureDetails = Object.assign(new ProcedureDetails(), this.procedureDetails);
      newFlightPlan.directTo = Object.assign(new DirectTo(), this.directTo);
      newFlightPlan.directTo.interceptPoints = this.directTo.interceptPoints !== undefined ? [...this.directTo.interceptPoints] : undefined;
      return newFlightPlan;
    }

    /**
     * Reverses the flight plan.
     */
    reverse() {
      // TODO: Fix flight plan indexes after reversal
      // this._waypoints.reverse();
    }

    /**
     * Goes direct to the specified waypoint index in the flight plan.
     *
     * @param waypoint The waypoint to go direct to
     */
    async addDirectTo(waypoint) {
      // TODO Replace with FMGC pos
      const lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      const long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      const trueTrack = SimVar.GetSimVarValue('GPS GROUND TRUE TRACK', 'degree');
      const oldToWp = this.waypoints[this.activeWaypointIndex];
      const turningPoint = WaypointBuilder.fromCoordinates('T-P', new LatLongAlt(lat, long), this._parentInstrument, {
        legType: LegType.CF,
        course: trueTrack,
        dynamicPpos: true
      }, this.getTurningPointIcao());
      turningPoint.isTurningPoint = true;
      let waypointIndex = this.waypoints.findIndex((w, idx) => idx >= this.activeWaypointIndex && w.icao === waypoint.icao);
      if (waypointIndex === -1) {
        // in this case the waypoint is not already in the flight plan
        // we string it to the start of the flight plan, add a discontinuity after, and then the existing flight plan
        waypoint.endsInDiscontinuity = true;
        waypoint.discontinuityCanBeCleared = true;
        waypoint.additionalData.legType = LegType.DF;
        this.addWaypoint(waypoint, this.activeWaypointIndex);
        this.activeWaypointIndex = this.addWaypoint(turningPoint, this.activeWaypointIndex) + 1;

        // fix up the old leg that's now after the discont
        if (ManagedFlightPlan.isXfLeg(oldToWp)) {
          oldToWp.additionalData.legType = LegType.IF;
        }
      } else {
        // in this case the waypoint is already in the flight plan...
        // we can skip all the legs before it, and add our dir to
        const toWp = this.waypoints[waypointIndex];
        toWp.additionalData.legType = LegType.DF;
        toWp.turnDirection = 0;
        this.addWaypoint(turningPoint, waypointIndex);
        this.activeWaypointIndex = waypointIndex + 1;
      }
    }

    /**
     *
     * @param force force updating a turning point even if it's not marked dynamic
     */
    updateTurningPoint() {
      var _wp$additionalData;
      let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      const wp = this.getWaypoint(this.activeWaypointIndex - 1);
      if (wp !== null && wp !== void 0 && (_wp$additionalData = wp.additionalData) !== null && _wp$additionalData !== void 0 && _wp$additionalData.dynamicPpos || force && wp !== null && wp !== void 0 && wp.isTurningPoint) {
        wp.infos.coordinates.lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
        wp.infos.coordinates.long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
        wp.additionalData.course = SimVar.GetSimVarValue('GPS GROUND TRUE TRACK', 'degree');
        wp.icao = this.getTurningPointIcao();
        wp.infos.icao = wp.icao;
        console.log('updated T-P:', force, wp.additionalData, wp.infos.coordinates);
        return true;
      }
      return false;
    }
    getTurningPointIcao() {
      this.turningPointIndex = (this.turningPointIndex + 1) % 1000;
      return "WXX    TP".concat(this.turningPointIndex.toFixed(0).padStart(3, '0'));
    }

    /**
     * Builds a departure into the flight plan from indexes in the departure airport information.
     */
    async buildDeparture() {
      const legs = [];
      const legAnnotations = [];
      const origin = this.originAirfield;
      const {
        departureIndex
      } = this.procedureDetails;
      const runwayIndex = this.procedureDetails.departureRunwayIndex;
      const transitionIndex = this.procedureDetails.departureTransitionIndex;
      const selectedOriginRunwayIndex = this.procedureDetails.originRunwayIndex;
      const airportInfo = origin.infos;
      const airportMagVar = Facilities.getMagVar(airportInfo.coordinates.lat, airportInfo.coordinates.long);

      // Make origin fix an IF leg
      if (origin) {
        origin.additionalData.legType = LegType.IF;
        origin.endsInDiscontinuity = true;
        origin.discontinuityCanBeCleared = true;
        const departure = airportInfo.departures[departureIndex];
        if (departure) {
          origin.additionalData.annotation = departure.name;
        } else {
          origin.additionalData.annotation = '';
        }
      }

      // Set origin fix coordinates to runway beginning coordinates
      if (origin && selectedOriginRunwayIndex !== -1) {
        origin.infos.coordinates = airportInfo.oneWayRunways[selectedOriginRunwayIndex].beginningCoordinates;
        origin.additionalData.runwayElevation = airportInfo.oneWayRunways[selectedOriginRunwayIndex].elevation * 3.2808399;
        origin.additionalData.runwayLength = airportInfo.oneWayRunways[selectedOriginRunwayIndex].length;
      }
      if (departureIndex !== -1 && runwayIndex !== -1) {
        const runwayTransition = airportInfo.departures[departureIndex].runwayTransitions[runwayIndex];
        const departure = airportInfo.departures[departureIndex];
        if (runwayTransition) {
          legs.push(...runwayTransition.legs);
          legAnnotations.push(...runwayTransition.legs.map(_ => departure.name));
          origin.endsInDiscontinuity = false;
          origin.discontinuityCanBeCleared = undefined;
        }
      }
      if (departureIndex !== -1) {
        const departure = airportInfo.departures[departureIndex];
        legs.push(...departure.commonLegs);
        legAnnotations.push(...departure.commonLegs.map(_ => departure.name));
      }
      if (transitionIndex !== -1 && departureIndex !== -1) {
        if (airportInfo.departures[departureIndex].enRouteTransitions.length > 0) {
          const transition = airportInfo.departures[departureIndex].enRouteTransitions[transitionIndex];
          legs.push(...transition.legs);
          legAnnotations.push(...transition.legs.map(_ => transition.name));
        }
      }
      let segment = this.departure;
      if (segment !== FlightPlanSegment.Empty) {
        for (let i = 0; i < segment.waypoints.length; i++) {
          this.removeWaypoint(segment.offset);
        }
        this.removeSegment(segment.type);
      }
      if (legs.length > 0 || selectedOriginRunwayIndex !== -1 || departureIndex !== -1 && runwayIndex !== -1) {
        segment = this.addSegment(SegmentType.Departure);
        let procedure = new LegsProcedure(legs, origin, this._parentInstrument, airportMagVar, undefined, legAnnotations);
        const runway = this.getOriginRunway();
        if (runway) {
          // console.error('bruh');
          // Reference : AMM - 22-71-00 PB001, Page 4
          if (departureIndex === -1 && transitionIndex === -1) {
            const TEMPORARY_VERTICAL_SPEED = 2000.0; // ft/min
            const TEMPORARY_GROUND_SPEED = 160; // knots

            const altitudeFeet = runway.elevation * 3.2808399 + 1500;
            const distanceInNM = altitudeFeet / TEMPORARY_VERTICAL_SPEED * (TEMPORARY_GROUND_SPEED / 60);
            const coordinates = GeoMath.relativeBearingDistanceToCoords(runway.direction, distanceInNM, runway.endCoordinates);
            const faLeg = procedure.buildWaypoint("".concat(Math.round(altitudeFeet)), coordinates);
            // TODO should this check for unclr discont? (probs not)
            faLeg.endsInDiscontinuity = true;
            faLeg.discontinuityCanBeCleared = true;
            this.addWaypoint(faLeg, undefined, segment.type);
          }
        }
        let waypointIndex = segment.offset;
        while (procedure.hasNext()) {
          const waypoint = await procedure.getNext();
          if (waypoint !== undefined) {
            waypoint.additionalData.constraintType = FlightPlanManager$1.WaypointConstraintType.CLB;
            this.addWaypointAvoidingDuplicates(waypoint, ++waypointIndex, segment);
          }
        }
      }
      this.restringSegmentBoundaries(SegmentType.Departure, SegmentType.Enroute);
    }

    /**
     * Rebuilds the arrival and approach segment after a change of procedure
     */
    async rebuildArrivalApproach() {
      // remove all legs from these segments to prevent weird stuff
      this.truncateSegment(SegmentType.Arrival);
      this.truncateSegment(SegmentType.Approach);
      this.truncateSegment(SegmentType.Missed);
      await this.buildArrival().catch(console.error);
      await this.buildApproach().catch(console.error);
    }

    /**
     * Builds an arrival into the flight plan from indexes in the arrival airport information.
     */
    async buildArrival() {
      const legs = [];
      const legAnnotations = [];
      const destination = this.destinationAirfield;
      const {
        arrivalIndex
      } = this.procedureDetails;
      this.procedureDetails;
      const {
        arrivalRunwayIndex
      } = this.procedureDetails;
      const {
        arrivalTransitionIndex
      } = this.procedureDetails;
      const destinationInfo = destination.infos;
      const airportMagVar = Facilities.getMagVar(destinationInfo.coordinates.lat, destinationInfo.coordinates.long);
      if (arrivalIndex !== -1 && arrivalTransitionIndex !== -1) {
        const transition = destinationInfo.arrivals[arrivalIndex].enRouteTransitions[arrivalTransitionIndex];
        if (transition !== undefined) {
          legs.push(...transition.legs);
          legAnnotations.push(...transition.legs.map(_ => transition.name));
          // console.log('MFP: buildArrival - pushing transition legs ->', legs);
        }
      }

      if (arrivalIndex !== -1) {
        // string the common legs in the middle of the STAR
        const arrival = destinationInfo.arrivals[arrivalIndex];
        legs.push(...arrival.commonLegs);
        legAnnotations.push(...arrival.commonLegs.map(_ => arrival.name));
        // console.log('MFP: buildArrival - pushing STAR legs ->', legs);

        // if no runway is selected at all (non-runway-specific approach)
        // and the selected STAR only has runway transition legs... string them
        // TODO research IRL behaviour
        const starHasOneRunwayTrans = arrival.commonLegs.length === 0 && arrival.runwayTransitions.length === 1;
        const approachIsRunwaySpecific = this.procedureDetails.destinationRunwayIndex >= 0;
        const runwayTransIndex = arrivalRunwayIndex < 0 && starHasOneRunwayTrans && !approachIsRunwaySpecific ? 0 : arrivalRunwayIndex;
        const runwayTransition = arrival.runwayTransitions[runwayTransIndex];
        if (runwayTransition) {
          legs.push(...runwayTransition.legs);
          legAnnotations.push(...runwayTransition.legs.map(_ => arrival.name));
        }
      }
      let {
        _startIndex,
        segment
      } = this.truncateSegment(SegmentType.Arrival);
      if (legs.length > 0) {
        if (segment === FlightPlanSegment.Empty) {
          segment = this.addSegment(SegmentType.Arrival);
          _startIndex = segment.offset;
        }
        const procedure = new LegsProcedure(legs, this.getWaypoint(segment.offset - 1), this._parentInstrument, airportMagVar, undefined, legAnnotations);
        let waypointIndex = segment.offset;
        // console.log('MFP: buildArrival - ADDING WAYPOINTS ------------------------');
        while (procedure.hasNext()) {
          const waypoint = await procedure.getNext();
          if (waypoint) {
            waypoint.additionalData.constraintType = FlightPlanManager$1.WaypointConstraintType.DES;

            // console.log('  ---- MFP: buildArrival: added waypoint ', waypoint.ident, ' to segment ', segment);
            this.addWaypointAvoidingDuplicates(waypoint, ++waypointIndex, segment);
          }
        }
      }
      this.restringSegmentBoundaries(SegmentType.Enroute, SegmentType.Arrival);
      this.restringSegmentBoundaries(SegmentType.Arrival, SegmentType.Approach);
    }

    /**
     * Builds an approach into the flight plan from indexes in the arrival airport information.
     */
    async buildApproach() {
      const legs = [];
      const legAnnotations = [];
      const missedLegs = [];
      const destination = this.destinationAirfield;
      this.procedureDetails.approachType = undefined;
      const {
        approachIndex
      } = this.procedureDetails;
      const {
        approachTransitionIndex
      } = this.procedureDetails;
      const {
        destinationRunwayIndex
      } = this.procedureDetails;
      const destinationInfo = destination.infos;
      const airportMagVar = Facilities.getMagVar(destinationInfo.coordinates.lat, destinationInfo.coordinates.long);
      const approach = destinationInfo.approaches[approachIndex];
      const approachName = approach && approach.approachType !== ApproachType.APPROACH_TYPE_UNKNOWN ? approach.name : '';
      if (approachIndex !== -1 && approachTransitionIndex !== -1) {
        const transition = destinationInfo.approaches[approachIndex].transitions[approachTransitionIndex];
        legs.push(...transition.legs);
        legAnnotations.push(...transition.legs.map(_ => transition.name));
        // console.log('MFP: buildApproach - pushing approachTransition legs ->', legs);
      }

      if (approachIndex !== -1) {
        var _legs, _finalLegs$;
        const finalLegs = [...approach.finalLegs];
        // PI legs can only occur in approach vias
        // if the via ends in one, we must omit the IF leg at the start of the approach
        const viaLastLegType = (_legs = legs[legs.length - 1]) === null || _legs === void 0 ? void 0 : _legs.type;
        if (viaLastLegType === LegType.PI && ((_finalLegs$ = finalLegs[0]) === null || _finalLegs$ === void 0 ? void 0 : _finalLegs$.type) === LegType.IF) {
          var _finalLegs$2;
          finalLegs.splice(0, 1);
          // @ts-expect-error (ts compiler doesn't see that splice mutates finalLegs)
          if (((_finalLegs$2 = finalLegs[0]) === null || _finalLegs$2 === void 0 ? void 0 : _finalLegs$2.type) !== LegType.CF) {
            console.error('PI must be followed by CF!');
          }
        }
        this.procedureDetails.approachType = approach.approachType;
        legs.push(...finalLegs);
        legAnnotations.push(...finalLegs.map(_ => approachName));
        missedLegs.push(...approach.missedLegs);
      }
      let {
        _startIndex,
        segment
      } = this.truncateSegment(SegmentType.Approach);
      if (legs.length > 0 || approachIndex !== -1 || destinationRunwayIndex !== -1) {
        if (segment === FlightPlanSegment.Empty) {
          segment = this.addSegment(SegmentType.Approach);
          _startIndex = segment.offset;
          const prevWaypointIndex = segment.offset - 1;
          if (prevWaypointIndex > 0) {
            const prevWaypoint = this.getWaypoint(segment.offset - 1);
            if (!prevWaypoint.endsInDiscontinuity) {
              prevWaypoint.endsInDiscontinuity = true;
              prevWaypoint.discontinuityCanBeCleared = true;
            }
          }
        }
        const runway = this.getDestinationRunway();
        const procedure = new LegsProcedure(legs, this.getWaypoint(_startIndex - 1), this._parentInstrument, airportMagVar, this.procedureDetails.approachType, legAnnotations);
        if (runway) {
          procedure.calculateApproachData(runway);
        }
        let waypointIndex = _startIndex;
        // console.log('MFP: buildApproach - ADDING WAYPOINTS ------------------------');
        while (procedure.hasNext()) {
          const waypoint = await procedure.getNext();
          if (waypoint !== undefined) {
            waypoint.additionalData.constraintType = FlightPlanManager$1.WaypointConstraintType.DES;

            // console.log('  ---- MFP: buildApproach: added waypoint', waypoint.ident, ' to segment ', segment);
            this.addWaypointAvoidingDuplicates(waypoint, ++waypointIndex, segment);
          }
        }
        if (runway) {
          const selectedRunwayMod = runway.designation.slice(-1);
          let selectedRunwayOutput;
          if (selectedRunwayMod === 'L' || selectedRunwayMod === 'C' || selectedRunwayMod === 'R') {
            if (runway.designation.length === 2) {
              selectedRunwayOutput = "0".concat(runway.designation);
            } else {
              selectedRunwayOutput = runway.designation;
            }
          } else if (runway.designation.length === 2) {
            selectedRunwayOutput = runway.designation;
          } else {
            selectedRunwayOutput = "0".concat(runway.designation);
          }
          if (approachIndex === -1 && destinationRunwayIndex !== -1 && destinationRunwayExtension !== -1) {
            const runwayExtensionWaypoint = procedure.buildWaypoint("RX".concat(selectedRunwayOutput), Avionics.Utils.bearingDistanceToCoordinates(runway.direction + 180, destinationRunwayExtension, runway.beginningCoordinates.lat, runway.beginningCoordinates.long));
            this.addWaypoint(runwayExtensionWaypoint);
          }

          // When adding approach, edit destination waypoint
          this.destinationAirfield.infos.coordinates = runway.beginningCoordinates;
          this.destinationAirfield.legAltitudeDescription = 1;
          this.destinationAirfield.legAltitude1 = Math.round((runway.elevation * 3.28084 + 50) / 10) * 10;
          this.destinationAirfield.isRunway = true;
          if (approachIndex !== -1) {
            const lastLeg = approach.finalLegs[approach.finalLegs.length - 1];
            if (lastLeg.type === LegType.CF) {
              const magCourse = lastLeg.trueDegrees ? A32NX_Util.trueToMagnetic(lastLeg.course, Facilities.getMagVar(runway.beginningCoordinates.lat, runway.beginningCoordinates.long)) : lastLeg.course;
              this.destinationAirfield.additionalData.annotation = "C".concat(magCourse.toFixed(0).padStart(3, '0'), "\xB0");
            } else {
              this.destinationAirfield.additionalData.annotation = approachName;
            }
          }

          // Clear discontinuity before destination, if any
          const wpBeforeDestIdx = this.waypoints.indexOf(this.destinationAirfield) - 1;
          if (wpBeforeDestIdx >= 0) {
            const wpBeforeDest = this.getWaypoint(wpBeforeDestIdx);
            if (wpBeforeDest.endsInDiscontinuity && wpBeforeDest.discontinuityCanBeCleared) {
              wpBeforeDest.endsInDiscontinuity = false;
            }
          }
        }
      }
      this.restringSegmentBoundaries(SegmentType.Arrival, SegmentType.Approach);

      /* if (missedLegs.length > 0) {
          let { _startIndex, segment } = this.truncateSegment(SegmentType.Missed);
            if (segment === FlightPlanSegment.Empty) {
              segment = this.addSegment(SegmentType.Missed);
              _startIndex = segment.offset;
          }
            let waypointIndex = _startIndex;
            const missedProcedure = new LegsProcedure(missedLegs, this.getWaypoint(_startIndex - 1), this._parentInstrument, airportMagVar);
          while (missedProcedure.hasNext()) {
              // eslint-disable-next-line no-await-in-loop
              const waypoint = await missedProcedure.getNext().catch(console.error);
                if (waypoint !== undefined) {
                  // console.log('  ---- MFP: buildApproach: added waypoint', waypoint.ident, ' to segment ', segment);
                  this.addWaypoint(waypoint, ++waypointIndex, segment.type);
              }
          }
      } */
    }

    static isXfLeg(leg) {
      var _leg$additionalData;
      switch (leg === null || leg === void 0 ? void 0 : (_leg$additionalData = leg.additionalData) === null || _leg$additionalData === void 0 ? void 0 : _leg$additionalData.legType) {
        case LegType.CF:
        case LegType.DF:
        case LegType.IF:
        case LegType.RF:
        case LegType.TF:
          return true;
        default:
          return false;
      }
    }
    static isFxLeg(leg) {
      var _leg$additionalData2;
      switch (leg === null || leg === void 0 ? void 0 : (_leg$additionalData2 = leg.additionalData) === null || _leg$additionalData2 === void 0 ? void 0 : _leg$additionalData2.legType) {
        case LegType.FA:
        case LegType.FC:
        case LegType.FD:
        case LegType.FM:
          return true;
        default:
          return false;
      }
    }
    static legsStartOrEndAtSameFix(legA, legB) {
      return legA.icao === legB.icao && (ManagedFlightPlan.isXfLeg(legA) && ManagedFlightPlan.isXfLeg(legB) || ManagedFlightPlan.isFxLeg(legA) && ManagedFlightPlan.isFxLeg(legB));
    }
    static climbConstraint(leg) {
      switch (leg.legAltitudeDescription) {
        case AltitudeDescriptor.At:
        case AltitudeDescriptor.AtOrBelow:
          return leg.legAltitude1;
        case AltitudeDescriptor.Between:
          return leg.legAltitude2;
      }
      return Infinity;
    }
    static descentConstraint(leg) {
      switch (leg.legAltitudeDescription) {
        case AltitudeDescriptor.At:
        case AltitudeDescriptor.AtOrAbove:
        case AltitudeDescriptor.Between:
          return leg.legAltitude1;
      }
      return -Infinity;
    }
    static mergeConstraints(legA, legB) {
      let legAltitudeDescription = AltitudeDescriptor.Empty;
      let legAltitude1 = 0;
      let legAltitude2 = 0;
      if (legA.legAltitudeDescription === AltitudeDescriptor.At) {
        legAltitudeDescription = AltitudeDescriptor.At;
        if (legB.legAltitudeDescription === AltitudeDescriptor.At) {
          legAltitude1 = Math.min(legA.legAltitude1, legB.legAltitude1);
        } else {
          legAltitude1 = legA.legAltitude1;
        }
      } else if (legB.legAltitudeDescription === AltitudeDescriptor.At) {
        legAltitudeDescription = AltitudeDescriptor.At;
        legAltitude1 = legB.legAltitude1;
      } else if (legA.legAltitudeDescription > 0 || legB.legAltitudeDescription > 0) {
        const maxAlt = Math.min(ManagedFlightPlan.climbConstraint(legA), ManagedFlightPlan.climbConstraint(legB));
        const minAlt = Math.max(ManagedFlightPlan.descentConstraint(legA), ManagedFlightPlan.descentConstraint(legB));
        if (Number.isFinite(maxAlt)) {
          if (Number.isFinite(minAlt)) {
            if (Math.abs(minAlt - maxAlt) < 1) {
              legAltitudeDescription = AltitudeDescriptor.At;
              legAltitude1 = minAlt;
            } else {
              legAltitudeDescription = AltitudeDescriptor.Between;
              legAltitude1 = minAlt;
              legAltitude2 = maxAlt;
            }
          } else {
            legAltitudeDescription = AltitudeDescriptor.AtOrBelow;
            legAltitude1 = maxAlt;
          }
        } else if (Number.isFinite(minAlt)) {
          legAltitudeDescription = AltitudeDescriptor.AtOrAbove;
          legAltitude1 = minAlt;
        }
      }
      const speed = Math.min(legA.speedConstraint > 0 ? legA.speedConstraint : Infinity, legB.speedConstraint > 0 ? legB.speedConstraint : Infinity);
      return {
        legAltitudeDescription,
        legAltitude1,
        legAltitude2,
        speedConstraint: Number.isFinite(speed) ? speed : 0
      };
    }

    /**
     * Check for common waypoints at the boundaries of segments, and merge them if found
     * segmentA must be before segmentB in the plan!
     */
    restringSegmentBoundaries(segmentTypeA, segmentTypeB) {
      if (segmentTypeB < segmentTypeA) {
        throw new Error('restringSegmentBoundaries: segmentTypeA must be before segmentTypeB');
      }
      const segmentA = this.getSegment(segmentTypeA);
      const segmentB = this.getSegment(segmentTypeB);
      if ((segmentA === null || segmentA === void 0 ? void 0 : segmentA.waypoints.length) < 1 || (segmentB === null || segmentB === void 0 ? void 0 : segmentB.waypoints.length) < 1) {
        return;
      }
      const lastLegIndexA = segmentA.offset + segmentA.waypoints.length - 1;
      const lastLegA = segmentA.waypoints[segmentA.waypoints.length - 1];
      const firstLegIndexB = segmentB.offset;
      const firstLegB = segmentB.waypoints[0];
      if (ManagedFlightPlan.legsStartOrEndAtSameFix(lastLegA, firstLegB)) {
        const constraints = ManagedFlightPlan.mergeConstraints(lastLegA, firstLegB);
        if (segmentA.type === SegmentType.Departure) {
          this.removeWaypoint(firstLegIndexB, true);
          Object.assign(lastLegA, constraints);
          lastLegA.endsInDiscontinuity = false;
          lastLegA.discontinuityCanBeCleared = undefined;
        } else {
          this.removeWaypoint(lastLegIndexA, true);
          Object.assign(firstLegB, constraints);
          firstLegB.endsInDiscontinuity = false;
          firstLegB.discontinuityCanBeCleared = undefined;
        }
      } else if (segmentTypeA === SegmentType.Arrival && segmentTypeB === SegmentType.Approach) {
        let toDeleteFromB = 0;
        for (let i = 0; i < segmentB.waypoints.length; i++) {
          if (ManagedFlightPlan.legsStartOrEndAtSameFix(lastLegA, segmentB.waypoints[i])) {
            const constraints = ManagedFlightPlan.mergeConstraints(lastLegA, firstLegB);
            Object.assign(lastLegA, constraints);
            toDeleteFromB = i + 1;
            break;
          }
        }
        for (let i = 0; i < toDeleteFromB; i++) {
          this.removeWaypoint(segmentB.offset, true);
        }
        if (toDeleteFromB === 0 && firstLegB.additionalData.legType === LegType.IF) {
          lastLegA.endsInDiscontinuity = true;
          lastLegA.discontinuityCanBeCleared = true;
        }
      }
    }

    /**
     * Truncates a flight plan segment. If the active waypoint index is current in the segment,
     * a discontinuity will be added at the end of the active waypoint and the startIndex will
     * point to the next waypoint in the segment after the active.
     * @param type The type of segment to truncate.
     * @returns A segment to add to and a starting waypoint index.
     */
    truncateSegment(type) {
      let segment = this.getSegment(type);
      // const startIndex = this.findSegmentByWaypointIndex(this.activeWaypointIndex) === segment
      //     ? this.activeWaypointIndex + 1
      //     : segment.offset;
      const startIndex = segment.offset;
      if (segment !== FlightPlanSegment.Empty) {
        const finalIndex = segment.offset + segment.waypoints.length;
        if (startIndex < finalIndex) {
          for (let i = startIndex; i < finalIndex; i++) {
            // console.log(' MFP ---> truncateSegment: removing waypoint ', this.getWaypoint(startIndex).ident);
            this.removeWaypoint(startIndex);
          }
        }
      }
      if (segment.waypoints.length === 0) {
        this.removeSegment(segment.type);
        segment = FlightPlanSegment.Empty;
      } else {
        const waypoint = segment.waypoints[Math.max(startIndex - 1 - segment.offset, 0)];
        waypoint.endsInDiscontinuity = true;
        waypoint.discontinuityCanBeCleared = true;
      }
      return {
        _startIndex: startIndex,
        segment
      };
    }

    /**
     * Converts a plain object into a ManagedFlightPlan.
     * @param flightPlanObject The object to convert.
     * @param parentInstrument The parent instrument attached to this flight plan.
     * @returns The converted ManagedFlightPlan.
     */
    static fromObject(flightPlanObject, parentInstrument) {
      const plan = Object.assign(new ManagedFlightPlan(), flightPlanObject);
      plan.setParentInstrument(parentInstrument);
      plan.directTo = Object.assign(new DirectTo(), plan.directTo);
      const mapObject = (obj, parentType) => {
        if (obj && obj.infos) {
          obj = Object.assign(new WayPoint(parentInstrument), obj);
        }
        if (obj && obj.coordinates) {
          switch (parentType) {
            case 'A':
              obj = Object.assign(new AirportInfo(parentInstrument), obj);
              break;
            case 'W':
              obj = Object.assign(new IntersectionInfo(parentInstrument), obj);
              break;
            case 'V':
              obj = Object.assign(new VORInfo(parentInstrument), obj);
              break;
            case 'N':
              obj = Object.assign(new NDBInfo(parentInstrument), obj);
              break;
            default:
              obj = Object.assign(new WayPointInfo(parentInstrument), obj);
          }
          obj.coordinates = Object.assign(new LatLongAlt(), obj.coordinates);
        }
        return obj;
      };
      const visitObject = obj => {
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] && obj[key].scroll === undefined) {
            if (Array.isArray(obj[key])) {
              visitArray(obj[key]);
            } else {
              visitObject(obj[key]);
            }
            obj[key] = mapObject(obj[key], obj.type);
          }
        }
      };
      const visitArray = array => {
        array.forEach((item, index) => {
          if (Array.isArray(item)) {
            visitArray(item);
          } else if (typeof item === 'object') {
            visitObject(item);
          }
          array[index] = mapObject(item);
        });
      };
      visitObject(plan);
      return plan;
    }
    legDataMatches(a, b, fields) {
      return fields.every(field => a.additionalData[field] === b.additionalData[field]);
    }
    isLegDuplicate(a, b) {
      if (a.additionalData.legType === b.additionalData.legType) {
        switch (a.additionalData.legType) {
          case LegType.AF:
          case LegType.CR:
          case LegType.VR:
            return this.legDataMatches(a, b, ['course', 'theta', 'recommendedIcao']);
          case LegType.CA:
          case LegType.VA:
            return this.legDataMatches(a, b, ['course']) && a.legAltitude1 === b.legAltitude1;
          case LegType.CD:
          case LegType.VD:
            return this.legDataMatches(a, b, ['course', 'distance', 'recommendedIcao']);
          case LegType.CF:
            return this.legDataMatches(a, b, ['course']) && a.icao === b.icao;
          case LegType.CI:
          case LegType.VI:
          case LegType.VM:
            return this.legDataMatches(a, b, ['course']);
          case LegType.DF:
          case LegType.IF:
          case LegType.TF:
            return a.icao === b.icao;
          case LegType.FA:
            return a.icao === b.icao && a.legAltitude1 === b.legAltitude1;
          case LegType.FC:
            return this.legDataMatches(a, b, ['course', 'distance']) && a.icao === b.icao;
          case LegType.FD:
            return this.legDataMatches(a, b, ['course', 'distance', 'recommendedIcao']) && a.icao === b.icao;
          case LegType.FM:
            return this.legDataMatches(a, b, ['course']) && a.icao === b.icao;
          case LegType.HA:
            return this.legDataMatches(a, b, ['course', 'distance', 'distanceInMinutes']) && a.icao === b.icao && a.legAltitude1 === b.legAltitude1;
          case LegType.HF:
          case LegType.HM:
          case LegType.PI:
            return this.legDataMatches(a, b, ['course', 'distance', 'distanceInMinutes']) && a.icao === b.icao;
          case LegType.RF:
            return this.legDataMatches(a, b, ['center', 'radius']) && a.icao === b.icao;
        }
      } else if (ManagedFlightPlan.isXfLeg(a) && ManagedFlightPlan.isXfLeg(b) || ManagedFlightPlan.isFxLeg(a) && ManagedFlightPlan.isFxLeg(b)) {
        return a.icao === b.icao;
      }
      return false;
    }
    addWaypointAvoidingDuplicates(waypoint, waypointIndex, segment) {
      const index = this.waypoints.findIndex(wp => this.isLegDuplicate(waypoint, wp));

      // FIXME this should collapse any legs between the old position and the newly inserted position
      const wptDist = Math.abs(index - waypointIndex);
      if (index !== -1 && wptDist <= 2) {
        // console.log('  -------> MFP: addWaypointAvoidingDuplicates: removing duplicate waypoint ', this.getWaypoint(index).ident);
        const removedWp = this.getWaypoint(index);
        if (waypoint.legAltitudeDescription === AltitudeDescriptor.Empty && removedWp.legAltitudeDescription !== AltitudeDescriptor.Empty) {
          waypoint.legAltitudeDescription = removedWp.legAltitudeDescription;
          waypoint.legAltitude1 = removedWp.legAltitude1;
          waypoint.legAltitude2 = removedWp.legAltitude2;
        }
        if (waypoint.speedConstraint <= 0 && removedWp.speedConstraint > 0) {
          waypoint.speedConstraint = removedWp.speedConstraint;
        }
        this.removeWaypoint(index);
      }
      this.addWaypoint(waypoint, waypointIndex, segment.type);
    }
    getOriginRunway() {
      if (this.originAirfield) {
        if (this.procedureDetails.originRunwayIndex !== -1) {
          return this.originAirfield.infos.oneWayRunways[this.procedureDetails.originRunwayIndex];
        }
      }
      return null;
    }
    getDestinationRunway() {
      if (this.destinationAirfield) {
        if (this.procedureDetails.destinationRunwayIndex !== -1) {
          return this.destinationAirfield.infos.oneWayRunways[this.procedureDetails.destinationRunwayIndex];
        }
      }
      return null;
    }
    get manualHoldActive() {
      var _this$waypoints$this$, _this$waypoints$this$2;
      return ((_this$waypoints$this$ = this.waypoints[this.activeWaypointIndex]) === null || _this$waypoints$this$ === void 0 ? void 0 : (_this$waypoints$this$2 = _this$waypoints$this$.additionalData) === null || _this$waypoints$this$2 === void 0 ? void 0 : _this$waypoints$this$2.legType) === LegType.HM;
    }
    get glideslopeIntercept() {
      const appr = this.getSegment(SegmentType.Approach);
      for (const wp of appr.waypoints) {
        if (wp.additionalData.fixTypeFlags & FixTypeFlags.FAF && (wp.legAltitudeDescription === AltitudeDescriptor.G || wp.legAltitudeDescription === AltitudeDescriptor.H)) {
          return wp.legAltitude1;
        }
      }
    }
    get destinationIndex() {
      const appr = this.getSegment(SegmentType.Approach);
      const index = appr.offset + appr.waypoints.length;
      if (this.destinationAirfield) {
        return index + 1;
      }
      return -1;
    }
    get finalApproachActive() {
      const appr = this.getSegment(SegmentType.Approach);
      if (appr === FlightPlanSegment.Empty) {
        return false;
      }
      const offset = this.activeWaypointIndex - appr.offset;
      if (offset >= 0 && offset < appr.waypoints.length) {
        for (const [index, wp] of appr.waypoints.entries()) {
          if (wp.additionalData.fixTypeFlags & FixTypeFlags.FAF) {
            return offset >= index;
          }
        }
      }
      return false;
    }
  }

  /*
   * MIT License
   *
   * Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /** A class for syncing a flight plan with the game */
  class FlightPlanAsoboSync {
    static init() {
      if (!this.fpListenerInitialized) {
        RegisterViewListener('JS_LISTENER_FLIGHTPLAN');
        this.fpListenerInitialized = true;
      }
    }
    static async LoadFromGame(fpln) {
      return new Promise(resolve => {
        this.init();
        setTimeout(() => {
          Coherent.call('LOAD_CURRENT_GAME_FLIGHT').catch(console.error);
          Coherent.call('LOAD_CURRENT_ATC_FLIGHTPLAN').catch(console.error);
          setTimeout(() => {
            Coherent.call('GET_FLIGHTPLAN').then(async data => {
              console.log('COHERENT GET_FLIGHTPLAN received');
              const {
                isDirectTo
              } = data;

              // TODO: talk to matt about dirto
              if (!isDirectTo) {
                // TODO FIXME: better handling of mid-air spawning and syncing fpln
                if (data.waypoints.length === 0 || data.waypoints[0].icao[0] !== 'A') {
                  fpln.resumeSync();
                  resolve();
                  return;
                }
                await fpln._parentInstrument.facilityLoader.getFacilityRaw(data.waypoints[0].icao, 10000).catch(e => {
                  console.error('[FP LOAD] Error getting first wp data');
                  console.error(e);
                });

                // set origin
                await fpln.setOrigin(data.waypoints[0].icao).catch(e => {
                  console.error('[FP LOAD] Error setting origin');
                  console.error(e);
                });

                // set dest
                await fpln.setDestination(data.waypoints[data.waypoints.length - 1].icao).catch(e => {
                  console.error('[FP LOAD] Error setting Destination');
                  console.error(e);
                });

                // set route

                const enrouteStart = data.departureWaypointsSize === -1 ? 1 : data.departureWaypointsSize;
                // Find out first approach waypoint, - 1 to skip destination
                const enrouteEnd = data.waypoints.length - (data.arrivalWaypointsSize === -1 ? 1 : data.arrivalWaypointsSize) - 1;
                const enroute = data.waypoints.slice(enrouteStart, enrouteEnd - 1);
                for (let i = 0; i < enroute.length - 1; i++) {
                  const wpt = enroute[i];
                  if (wpt.icao.trim() !== '') {
                    fpln.addWaypoint(wpt.icao, Infinity, () => console.log("[FP LOAD] Adding [".concat(wpt.icao, "]... SUCCESS"))).catch(console.error);
                  }
                }

                // set departure
                //  rwy index
                await fpln.setDepartureRunwayIndex(data.departureRunwayIndex)
                // .then(() => console.log(`[FP LOAD] Setting Departure Runway ${data.departureRunwayIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Departure Runway ".concat(data.departureRunwayIndex, " ... FAILED"));
                  console.error(e);
                });
                // proc index
                await fpln.setDepartureProcIndex(data.departureProcIndex)
                // .then(() => console.log(`[FP LOAD] Setting Departure Procedure  ${data.departureProcIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Departure Procedure ".concat(data.departureProcIndex, " ... FAILED"));
                  console.error(e);
                });
                // origin runway
                if (data.originRunwayIndex !== -1) {
                  await fpln.setOriginRunwayIndex(data.originRunwayIndex)
                  // .then(() => console.log(`[FP LOAD] Setting Origin  ${data.originRunwayIndex} ... SUCCESS`))
                  .catch(e => {
                    console.error("[FP LOAD] Setting Origin ".concat(data.originRunwayIndex, " ... FAILED"));
                    console.error(e);
                  });
                } else if (data.departureRunwayIndex !== -1 && data.departureProcIndex !== -1) {
                  await fpln.setOriginRunwayIndexFromDeparture()
                  // .then(() => console.log(`[FP LOAD] Setting Origin using ${data.departureProcIndex}/${data.departureRunwayIndex}... SUCCESS`))
                  .catch(e => {
                    console.error("[FP LOAD] Setting Origin using ".concat(data.departureProcIndex, "/").concat(data.departureRunwayIndex, " ... FAILED"));
                    console.error(e);
                  });
                }
                //  enroutetrans index
                await fpln.setDepartureEnRouteTransitionIndex(data.departureEnRouteTransitionIndex)
                // .then(() => console.log(`[FP LOAD] Setting Departure En Route Transition ${data.departureEnRouteTransitionIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Departure En Route Transition ".concat(data.departureEnRouteTransitionIndex, " ... FAILED"));
                  console.error(e);
                });
                // set approach
                //  rwy index
                await fpln.setArrivalRunwayIndex(data.arrivalRunwayIndex)
                // .then(() => console.log(`[FP LOAD] Setting Arrival Runway ${data.arrivalRunwayIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Arrival Runway ".concat(data.arrivalRunwayIndex, " ... FAILED"));
                  console.error(e);
                });
                //  approach index
                await fpln.setApproachIndex(data.approachIndex)
                // .then(() => console.log(`[FP LOAD] Setting Approach ${data.approachIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Approach ".concat(data.approachIndex, " ... FAILED"));
                  console.error(e);
                });
                //  approachtrans index
                await fpln.setApproachTransitionIndex(data.approachTransitionIndex)
                // .then(() => console.log(`[FP LOAD] Setting Approach Transition ${data.approachTransitionIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Approach Transition ".concat(data.approachTransitionIndex, " ... FAILED"));
                  console.error(e);
                });

                // set arrival
                //  arrivalproc index
                await fpln.setArrivalProcIndex(data.arrivalProcIndex)
                // .then(() => console.log(`[FP LOAD] Setting Arrival Procedure ${data.arrivalProcIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Arrival Procedure ".concat(data.arrivalProcIndex, " ... FAILED"));
                  console.error(e);
                });
                //  arrivaltrans index
                await fpln.setArrivalEnRouteTransitionIndex(data.arrivalEnRouteTransitionIndex)
                // .then(() => console.log(`[FP LOAD] Setting En Route Transition ${data.arrivalEnRouteTransitionIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting En Route Transition ".concat(data.arrivalEnRouteTransitionIndex, " ... FAILED"));
                  console.error(e);
                });
                await fpln.setDestinationRunwayIndexFromApproach()
                // .then(() => console.log(`[FP LOAD] Setting Destination Runway using ${data.approachIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP LOAD] Setting Destination Runway using ".concat(data.approachIndex, " ... FAILED"));
                  console.error(e);
                });
                fpln.resumeSync();
                this.fpChecksum = fpln.getCurrentFlightPlan().checksum;
                // Potential CTD source?
                Coherent.call('SET_ACTIVE_WAYPOINT_INDEX', 0).catch(e => console.error('[FP LOAD] Error when setting Active WP'));
                Coherent.call('RECOMPUTE_ACTIVE_WAYPOINT_INDEX').catch(e => console.error('[FP LOAD] Error when recomputing Active WP'));
                resolve();
              }
            }).catch(console.error);
          }, 500);
        }, 200);
      });
    }
    static async SaveToGame(fpln) {
      return __awaiter(this, 0, 0, function* () {
        return new Promise(() => __awaiter(this, 0, 0, function* () {
          FlightPlanAsoboSync.init();
          const plan = fpln.getCurrentFlightPlan();
          if (plan.checksum !== this.fpChecksum) {
            // await Coherent.call("CREATE_NEW_FLIGHTPLAN").catch(console.error);
            yield Coherent.call('SET_CURRENT_FLIGHTPLAN_INDEX', 0, false).catch(console.error);
            yield Coherent.call('CLEAR_CURRENT_FLIGHT_PLAN').catch(console.error);
            if (plan.hasPersistentOrigin && plan.hasDestination) {
              yield Coherent.call('SET_ORIGIN', plan.persistentOriginAirfield.icao, false).catch(console.error);
              // .then(() => console.log('[FP SAVE] Setting Origin Airfield... SUCCESS'));
              yield Coherent.call('SET_DESTINATION', plan.destinationAirfield.icao, false).catch(console.error);
              // .then(() => console.log('[FP SAVE] Setting Destination Airfield... SUCCESS'));
              let coIndex = 1;
              for (let i = 0; i < plan.enroute.waypoints.length; i++) {
                const wpt = plan.enroute.waypoints[i];
                if (wpt.icao.trim() !== '') {
                  yield Coherent.call('ADD_WAYPOINT', wpt.icao, coIndex, false).catch(console.error);
                  // .then(() => console.log(`[FP SAVE] Adding Waypoint [${wpt.icao}]... SUCCESS`));
                  coIndex++;
                }
              }
              yield Coherent.call('SET_ORIGIN_RUNWAY_INDEX', plan.procedureDetails.originRunwayIndex)
              // .then(() => console.log(`[FP SAVE] Setting Origin Runway ${plan.procedureDetails.originRunwayIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting Origin Runway ".concat(plan.procedureDetails.originRunwayIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_DEPARTURE_RUNWAY_INDEX', plan.procedureDetails.departureRunwayIndex)
              // .then(() => console.log(`[FP SAVE] Setting Departure Runway ${plan.procedureDetails.departureRunwayIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting Departure Runway ".concat(plan.procedureDetails.departureRunwayIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_DEPARTURE_PROC_INDEX', plan.procedureDetails.departureIndex)
              // .then(() => console.log(`[FP SAVE] Setting Departure Procedure ${plan.procedureDetails.departureIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting Departure Procedure ".concat(plan.procedureDetails.departureIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_DEPARTURE_ENROUTE_TRANSITION_INDEX', plan.procedureDetails.departureTransitionIndex)
              // .then(() => console.log(`[FP SAVE] Setting Departure Transition ${plan.procedureDetails.departureTransitionIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting Departure Transition ".concat(plan.procedureDetails.departureTransitionIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_ARRIVAL_RUNWAY_INDEX', plan.procedureDetails.arrivalRunwayIndex)
              // .then(() => console.log(`[FP SAVE] Setting Arrival Runway ${plan.procedureDetails.arrivalRunwayIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting  Arrival Runway ".concat(plan.procedureDetails.arrivalRunwayIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_ARRIVAL_PROC_INDEX', plan.procedureDetails.arrivalIndex)
              // .then(() => console.log(`[FP SAVE] Setting Arrival Procedure ${plan.procedureDetails.arrivalIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting Arrival Procedure ".concat(plan.procedureDetails.arrivalIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_ARRIVAL_ENROUTE_TRANSITION_INDEX', plan.procedureDetails.arrivalTransitionIndex)
              // .then(() => console.log(`[FP SAVE] Setting Arrival En Route Transition ${plan.procedureDetails.arrivalTransitionIndex} ... SUCCESS`))
              .catch(e => {
                console.error("[FP SAVE] Setting Arrival En Route Transition ".concat(plan.procedureDetails.arrivalTransitionIndex, " ... FAILED"));
                console.error(e);
              });
              yield Coherent.call('SET_APPROACH_INDEX', plan.procedureDetails.approachIndex).then(() => {
                // console.log(`[FP SAVE] Setting Approach ${plan.procedureDetails.approachIndex} ... SUCCESS`);
                Coherent.call('SET_APPROACH_TRANSITION_INDEX', plan.procedureDetails.approachTransitionIndex)
                // .then(() => console.log(`[FP SAVE] Setting Approach Transition ${plan.procedureDetails.approachTransitionIndex} ... SUCCESS`))
                .catch(e => {
                  console.error("[FP SAVE] Setting Approach Transition ".concat(plan.procedureDetails.approachTransitionIndex, " ... FAILED"));
                  console.error(e);
                });
              }).catch(e => {
                console.error("[FP SAVE] Setting Approach ".concat(plan.procedureDetails.approachIndex, " ... FAILED"));
                console.error(e);
              });
            }
            this.fpChecksum = plan.checksum;
          }
          Coherent.call('RECOMPUTE_ACTIVE_WAYPOINT_INDEX').catch(e => console.log('[FP SAVE] Setting Active Waypoint... FAILED')).then(() => console.log('[FP SAVE] Setting Active Waypoint... SUCCESS'));
        }));
      });
    }
  }
  _defineProperty(FlightPlanAsoboSync, "fpChecksum", 0);
  _defineProperty(FlightPlanAsoboSync, "fpListenerInitialized", false);
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(resolve => {
        resolve(value);
      });
    }
    return new (P || (P = Promise))((resolve, reject) => {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  // Copyright (c) 2021 FlyByWire Simulations
  // SPDX-License-Identifier: GPL-3.0

  class FixInfo {
    constructor(flightPlanManager) {
      _defineProperty(this, "flightPlanManager", void 0);
      _defineProperty(this, "refFix", void 0);
      _defineProperty(this, "radials", []);
      _defineProperty(this, "radius", void 0);
      _defineProperty(this, "abeam", false);
      this.flightPlanManager = flightPlanManager;
    }
    setRefFix(fix) {
      this.radials.length = 0;
      this.radius = undefined;
      this.abeam = false;
      this.refFix = fix;
      this.flightPlanManager.updateFlightPlanVersion();
    }
    getRefFix() {
      return this.refFix;
    }
    getRefFixIdent() {
      var _this$refFix;
      return (_this$refFix = this.refFix) === null || _this$refFix === void 0 ? void 0 : _this$refFix.ident;
    }
    setRadial(index, magneticBearing) {
      if (magneticBearing !== undefined) {
        const trueBearing = Avionics.Utils.clampAngle(magneticBearing + Facilities.getMagVar(this.refFix.infos.coordinates.lat, this.refFix.infos.coordinates.long));
        this.radials[index] = {
          magneticBearing,
          trueBearing
        };
      } else {
        this.radials.splice(index, 1);
      }
      // TODO calculate flight plan intercepts
      this.flightPlanManager.updateFlightPlanVersion();
    }
    getRadial(index) {
      return this.radials[index];
    }
    getRadialTrueBearings() {
      return this.radials.map(r => r.trueBearing);
    }
    setRadius(radius) {
      if (radius !== undefined) {
        this.radius = {
          radius
        };
      } else {
        this.radius = undefined;
      }
      // TODO calculate flight plan intercepts
      this.flightPlanManager.updateFlightPlanVersion();
    }
    getRadius() {
      return this.radius;
    }
    getRadiusValue() {
      var _this$radius;
      return (_this$radius = this.radius) === null || _this$radius === void 0 ? void 0 : _this$radius.radius;
    }
  }

  let WaypointConstraintType;
  (function (WaypointConstraintType) {
    WaypointConstraintType[WaypointConstraintType["CLB"] = 1] = "CLB";
    WaypointConstraintType[WaypointConstraintType["DES"] = 2] = "DES";
  })(WaypointConstraintType || (WaypointConstraintType = {}));
  let FlightPlans;

  /**
   * Navigation flight areas defined in the OPC database
   */
  (function (FlightPlans) {
    FlightPlans[FlightPlans["Active"] = 0] = "Active";
    FlightPlans[FlightPlans["Temporary"] = 1] = "Temporary";
  })(FlightPlans || (FlightPlans = {}));
  let FlightArea;

  /**
   * A system for managing flight plan data used by various instruments.
   */
  (function (FlightArea) {
    FlightArea[FlightArea["Terminal"] = 0] = "Terminal";
    FlightArea[FlightArea["Takeoff"] = 1] = "Takeoff";
    FlightArea[FlightArea["Enroute"] = 2] = "Enroute";
    FlightArea[FlightArea["Oceanic"] = 3] = "Oceanic";
    FlightArea[FlightArea["VorApproach"] = 4] = "VorApproach";
    FlightArea[FlightArea["GpsApproach"] = 5] = "GpsApproach";
    FlightArea[FlightArea["PrecisionApproach"] = 6] = "PrecisionApproach";
    FlightArea[FlightArea["NonPrecisionApproach"] = 7] = "NonPrecisionApproach";
  })(FlightArea || (FlightArea = {}));
  class FlightPlanManager {
    /**
     * The current stored flight plan data.
     * @type ManagedFlightPlan[]
     */

    /**
     * Constructs an instance of the FlightPlanManager with the provided
     * parent instrument attached.
     * @param parentInstrument The parent instrument attached to this FlightPlanManager.
     */
    constructor(_parentInstrument) {
      this._parentInstrument = _parentInstrument;
      _defineProperty(this, "_isRegistered", false);
      _defineProperty(this, "_isMaster", false);
      _defineProperty(this, "_isSyncPaused", false);
      _defineProperty(this, "_currentFlightPlanVersion", 0);
      _defineProperty(this, "__currentFlightPlanIndex", 0);
      _defineProperty(this, "activeArea", FlightArea.Terminal);
      _defineProperty(this, "_flightPlans", []);
      _defineProperty(this, "_fixInfos", []);
      _defineProperty(this, "updateThrottler", new A32NX_Util.UpdateThrottler(2000));
      this._currentFlightPlanVersion = SimVar.GetSimVarValue(FlightPlanManager.FlightPlanVersionKey, 'number');
      this._loadFlightPlans();
      if (_parentInstrument.instrumentIdentifier === 'A320_Neo_CDU') {
        this._isMaster = true;
        _parentInstrument.addEventListener('FlightStart', async () => {
          const plan = new ManagedFlightPlan();
          plan.setParentInstrument(_parentInstrument);
          this._flightPlans = [];
          this._flightPlans.push(plan);
          if (persistence.NXDataStore.get('FP_SYNC', 'LOAD') !== 'NONE') {
            this.pauseSync();
            await FlightPlanAsoboSync.LoadFromGame(this).catch(console.error);
          }
          this.resumeSync();
        });
        for (let i = 0; i < 4; i++) {
          this._fixInfos.push(new FixInfo(this));
        }
      }
      FlightPlanManager.DEBUG_INSTANCE = this;
    }
    get _currentFlightPlanIndex() {
      return this.__currentFlightPlanIndex;
    }
    set _currentFlightPlanIndex(value) {
      this.__currentFlightPlanIndex = value;
    }
    update(deltaTime) {
      if (this.updateThrottler.canUpdate(deltaTime) !== -1) {
        const tmpy = this._flightPlans[FlightPlans.Temporary];
        if (tmpy && this.__currentFlightPlanIndex === FlightPlans.Temporary) {
          if (tmpy.updateTurningPoint()) {
            this.updateFlightPlanVersion();
          }
        }
      }
      this.updateActiveArea();
    }
    onCurrentGameFlightLoaded(_callback) {
      _callback();
    }
    registerListener() {}
    addHardCodedConstraints(wp) {}

    /**
     * Loads sim flight plan data into WayPoint objects for consumption.
     * @param data The flight plan data to load.
     * @param currentWaypoints The waypoints array to modify with the data loaded.
     * @param callback A callback to call when the data has completed loading.
     */
    _loadWaypoints(data, currentWaypoints, callback) {}

    /**
     * Updates the current active waypoint index from the sim.
     */
    async updateWaypointIndex() {
      // const waypointIndex = await Coherent.call("GET_ACTIVE_WAYPOINT_INDEX");
      // this._activeWaypointIndex = waypointIndex;
    }

    /**
     * Scans for updates to the synchronized flight plan and loads them into the flight plan
     * manager if the flight plan is out of date.
     * @param {() => void} callback A callback to call when the update has completed.
     * @param {Boolean} log Whether or not to log the loaded flight plan value.
     */
    updateFlightPlan() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      let force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      const flightPlanVersion = SimVar.GetSimVarValue(FlightPlanManager.FlightPlanVersionKey, 'number');
      if (flightPlanVersion !== this._currentFlightPlanVersion || force) {
        this._loadFlightPlans();
        this._currentFlightPlanVersion = flightPlanVersion;
      }
      callback();
    }

    /**
     * Loads the flight plans from data storage.
     */
    _loadFlightPlans() {
      this._getFlightPlan();
      if (this._flightPlans.length === 0) {
        const newFpln = new ManagedFlightPlan();
        newFpln.setParentInstrument(this._parentInstrument);
        this._flightPlans.push(new ManagedFlightPlan());
      } else {
        this._flightPlans = this._flightPlans.map(fp => ManagedFlightPlan.fromObject(fp, this._parentInstrument));
      }
    }
    updateCurrentApproach() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      callback();
    }
    get cruisingAltitude() {
      return 0;
    }
    isCurrentFlightPlanTemporary() {
      return this.getCurrentFlightPlanIndex() === 1;
    }

    /**
     * Gets the index of the currently active flight plan.
     */
    getCurrentFlightPlanIndex() {
      return this._currentFlightPlanIndex;
    }

    /**
     * Switches the active flight plan index to the supplied index.
     * @param index The index to now use for the active flight plan.
     * @param callback A callback to call when the operation has completed.
     */
    setCurrentFlightPlanIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      if (index >= 0 && index < this._flightPlans.length) {
        this._currentFlightPlanIndex = index;
        callback(true);
      } else {
        callback(false);
      }
    }

    /**
     * Creates a new flight plan.
     * @param callback A callback to call when the operation has completed.
     */
    createNewFlightPlan() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      const newFlightPlan = new ManagedFlightPlan();
      newFlightPlan.setParentInstrument(this._parentInstrument);
      this._flightPlans.push(newFlightPlan);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Copies the currently active flight plan into the specified flight plan index.
     * @param index The index to copy the currently active flight plan into.
     * @param callback A callback to call when the operation has completed.
     */
    async copyCurrentFlightPlanInto(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      const copiedFlightPlan = this._flightPlans[this._currentFlightPlanIndex].copy();
      const {
        activeWaypointIndex
      } = copiedFlightPlan;
      if (this._currentFlightPlanIndex === FlightPlans.Temporary && index === FlightPlans.Active) {
        copiedFlightPlan.waypoints.forEach(wp => delete wp.additionalData.dynamicPpos);
      }
      this._flightPlans[index] = copiedFlightPlan;
      if (index === 0) {
        await GPS.setActiveWaypoint(activeWaypointIndex).catch(console.error);
      }
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Copies the flight plan at the specified index to the currently active flight plan index.
     * @param index The index to copy into the currently active flight plan.
     * @param callback A callback to call when the operation has completed.
     */
    async copyFlightPlanIntoCurrent(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      const copiedFlightPlan = this._flightPlans[index].copy();
      const {
        activeWaypointIndex
      } = copiedFlightPlan;
      this._flightPlans[this._currentFlightPlanIndex] = copiedFlightPlan;
      if (this._currentFlightPlanIndex === 0) {
        await GPS.setActiveWaypoint(activeWaypointIndex).catch(console.error);
      }
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Clears the currently active flight plan.
     * @param callback A callback to call when the operation has completed.
     */
    async clearFlightPlan() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      await this._flightPlans[this._currentFlightPlanIndex].clearPlan().catch(console.error);
      for (const fixInfo of this._fixInfos) {
        fixInfo.setRefFix();
      }
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }
    async deleteFlightPlan(flightPlanIndex) {
      if (this._flightPlans[flightPlanIndex]) {
        delete this._flightPlans[flightPlanIndex];
      }
    }

    /**
     * Gets the origin of the currently active flight plan.
     */
    getOrigin() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      return this._flightPlans[flightPlanIndex].originAirfield;
    }

    /**
     * Gets the origin of the currently active flight plan, even after it has been cleared for a direct-to.
     */
    getPersistentOrigin() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      return this._flightPlans[flightPlanIndex].persistentOriginAirfield;
    }

    /**
     * Sets the origin in the currently active flight plan.
     * @param icao The ICAO designation of the origin airport.
     * @param callback A callback to call when the operation has completed.
     */
    async setOrigin(icao) {
      var _this$getOrigin;
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const sameAirport = ((_this$getOrigin = this.getOrigin()) === null || _this$getOrigin === void 0 ? void 0 : _this$getOrigin.ident) === icao;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const airport = await this._parentInstrument.facilityLoader.getFacilityRaw(icao).catch(console.error);
      if (airport) {
        airport.additionalData = {};
        airport.additionalData.legType = FSEnums$1.LegType.IF;
        await currentFlightPlan.clearPlan().catch(console.error);
        await currentFlightPlan.addWaypoint(airport, 0);
        // clear pilot trans alt
        this.setOriginTransitionAltitude(undefined, false);
        // TODO get origin trans alt from database
        // until then, don't erase the database value from ATSU if same airport as before
        if (!sameAirport) {
          this.setOriginTransitionAltitude(undefined, true);
        }
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Gets the index of the active waypoint in the flight plan.
     * @param forceSimVarCall Unused
     * @param useCorrection Unused
     */
    getActiveWaypointIndex() {
      var _this$_flightPlans$fl, _this$_flightPlans$fl2;
      let flightPlanIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      if (isNaN(flightPlanIndex)) {
        return this._flightPlans[this._currentFlightPlanIndex].activeWaypointIndex;
      }
      return (_this$_flightPlans$fl = (_this$_flightPlans$fl2 = this._flightPlans[flightPlanIndex]) === null || _this$_flightPlans$fl2 === void 0 ? void 0 : _this$_flightPlans$fl2.activeWaypointIndex) !== null && _this$_flightPlans$fl !== void 0 ? _this$_flightPlans$fl : -1;
    }
    isActiveWaypointAtEnd() {
      let flightPlanIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      if (isNaN(flightPlanIndex)) {
        return this._flightPlans[this._currentFlightPlanIndex].activeWaypointIndex + 1 === this.getWaypointsCount(this._currentFlightPlanIndex) - 1;
      }
      return this._flightPlans[flightPlanIndex].activeWaypointIndex === this.getWaypointsCount(flightPlanIndex) - 1;
    }

    /**
     * Sets the index of the active waypoint in the flight plan.
     * @param index The index to make active in the flight plan.
     * @param callback A callback to call when the operation has completed.
     * @param fplnIndex The index of the flight plan
     */
    setActiveWaypointIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      let fplnIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[fplnIndex];
      // we allow the last leg to be sequenced therefore the index can be 1 past the end of the plan length
      if (index >= 0 && index <= currentFlightPlan.length) {
        currentFlightPlan.activeWaypointIndex = index;
        Coherent.call('SET_ACTIVE_WAYPOINT_INDEX', index + 1).catch(console.error);
        if (currentFlightPlan.directTo.isActive && currentFlightPlan.directTo.waypointIsInFlightPlan && currentFlightPlan.activeWaypointIndex > currentFlightPlan.directTo.planWaypointIndex) {
          currentFlightPlan.directTo.isActive = false;
        }
      }
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /** Unknown */
    recomputeActiveWaypointIndex() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      callback();
    }

    /**
     * Gets the index of the waypoint prior to the currently active waypoint.
     * @param forceSimVarCall Unused
     */
    getPreviousActiveWaypoint() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const previousWaypointIndex = currentFlightPlan.activeWaypointIndex - 1;
      return currentFlightPlan.getWaypoint(previousWaypointIndex);
    }

    /**
     * Gets the ident of the active waypoint.
     * @param forceSimVarCall Unused
     */
    getActiveWaypointIdent() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.activeWaypoint) {
        return currentFlightPlan.activeWaypoint.ident;
      }
      return '';
    }

    /**
     * Gets the active waypoint index from fs9gps. Currently unimplemented.
     * @param forceSimVarCall Unused
     */
    getGPSActiveWaypointIndex() {
      return this.getActiveWaypointIndex();
    }

    /**
     * Gets the active waypoint.
     * @param forceSimVarCall Unused
     * @param useCorrection Unused
     */
    getActiveWaypoint() {
      let flightPlanIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      if (isNaN(flightPlanIndex)) {
        flightPlanIndex = this._currentFlightPlanIndex;
      }
      return this._flightPlans[flightPlanIndex].activeWaypoint;
    }

    /**
     * Gets the next waypoint following the active waypoint.
     * @param forceSimVarCall Unused
     */
    getNextActiveWaypoint() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const nextWaypointIndex = currentFlightPlan.activeWaypointIndex + 1;
      return currentFlightPlan.getWaypoint(nextWaypointIndex);
    }

    /**
     * Gets the distance, in NM, to the active waypoint.
     */
    getDistanceToActiveWaypoint() {
      // TODO Replace with ADIRS getLatitude() getLongitude()
      const lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      const long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      const ll = new LatLongAlt(lat, long);
      const waypoint = this.getActiveWaypoint();
      if (waypoint && waypoint.infos) {
        return Avionics.Utils.computeDistance(ll, waypoint.infos.coordinates);
      }
      return 0;
    }

    /**
     *
     * @param fplnIndex index of the flight plan of interest, default active fp
     * @returns distance in NM, or -1 on error
     */
    getDistanceToDestination() {
      var _stats$get$distanceFr, _stats$get;
      let fplnIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      if (fplnIndex < 0) {
        fplnIndex = this._currentFlightPlanIndex;
      }
      const destIndex = this.getDestinationIndex();
      if (destIndex < 0) {
        return -1;
      }

      // TODO get proper pos from FMGC
      const fmPos = {
        lat: SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude'),
        long: SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude')
      };
      const fpln = this._flightPlans[fplnIndex];
      const stats = fpln.computeWaypointStatistics(fmPos);
      return (_stats$get$distanceFr = (_stats$get = stats.get(destIndex)) === null || _stats$get === void 0 ? void 0 : _stats$get.distanceFromPpos) !== null && _stats$get$distanceFr !== void 0 ? _stats$get$distanceFr : -1;
    }
    getApproachStats() {
      var _this$getApproach;
      const name = (_this$getApproach = this.getApproach(FlightPlans.Active)) === null || _this$getApproach === void 0 ? void 0 : _this$getApproach.name;
      if (!name) {
        return undefined;
      }
      const distanceFromPpos = this.getDistanceToDestination(FlightPlans.Active);
      return {
        name,
        distanceFromPpos
      };
    }

    /**
     * Gets the bearing, in degrees, to the active waypoint.
     */
    getBearingToActiveWaypoint() {
      // TODO Replace with ADIRS getLatitude() getLongitude()
      const lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      const long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      const ll = new LatLongAlt(lat, long);
      const waypoint = this.getActiveWaypoint();
      if (waypoint && waypoint.infos) {
        return Avionics.Utils.computeGreatCircleHeading(ll, waypoint.infos.coordinates);
      }
      return 0;
    }

    /**
     * Gets the estimated time enroute to the active waypoint.
     */
    getETEToActiveWaypoint() {
      // TODO Replace with ADIRS getLatitude() getLongitude()
      const lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      const long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      const ll = new LatLongAlt(lat, long);
      const waypoint = this.getActiveWaypoint();
      if (waypoint && waypoint.infos) {
        const dist = Avionics.Utils.computeDistance(ll, waypoint.infos.coordinates);
        let groundSpeed = SimVar.GetSimVarValue('GPS GROUND SPEED', 'knots');
        if (groundSpeed < 50) {
          groundSpeed = 50;
        }
        if (groundSpeed > 0.1) {
          return dist / groundSpeed * 3600;
        }
      }
      return 0;
    }

    /**
     * Gets the destination airfield of the current flight plan, if any.
     */
    getDestination() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      return this._flightPlans[flightPlanIndex].destinationAirfield;
    }

    /**
     * Gets the index of the destination airfield in the current flight plan, if any
     * @param flightPlanIndex flight plan index
     * @returns Index of destination
     */
    getDestinationIndex() {
      if (this.getDestination()) {
        return this.getWaypointsCount() - 1;
      }
      return -1;
    }

    /**
     * Gets the currently selected departure information for the current flight plan.
     */
    getDeparture() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
      const origin = this.getOrigin();
      if (isNaN(flightPlanIndex)) {
        flightPlanIndex = this._currentFlightPlanIndex;
      }
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      if (origin) {
        const originInfos = origin.infos;
        if (originInfos.departures !== undefined && currentFlightPlan.procedureDetails.departureIndex !== -1) {
          return originInfos.departures[currentFlightPlan.procedureDetails.departureIndex];
        }
      }
      return undefined;
    }

    /**
     * Gets the currently selected departure information for the current flight plan, even after a direct-to.
     */
    getDepartureName() {
      const origin = this.getPersistentOrigin();
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (origin) {
        const originInfos = origin.infos;
        if (originInfos.departures !== undefined && currentFlightPlan.procedureDetails.departureIndex !== -1) {
          return originInfos.departures[currentFlightPlan.procedureDetails.departureIndex].name;
        }
      }
      return undefined;
    }

    /**
     * Gets the currently selected arrival information for the current flight plan.
     */
    getArrival() {
      const destination = this.getDestination();
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (destination) {
        const originInfos = destination.infos;
        if (originInfos.arrivals !== undefined && currentFlightPlan.procedureDetails.arrivalIndex !== -1) {
          return originInfos.arrivals[currentFlightPlan.procedureDetails.arrivalIndex];
        }
      }
      return undefined;
    }

    /**
     * Gets the currently selected approach information for the current flight plan.
     */
    getAirportApproach() {
      const destination = this.getDestination();
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (destination) {
        const originInfos = destination.infos;
        if (originInfos.approaches !== undefined && currentFlightPlan.procedureDetails.approachIndex !== -1) {
          return originInfos.approaches[currentFlightPlan.procedureDetails.approachIndex];
        }
      }
      return undefined;
    }

    /**
     * Gets the departure waypoints for the current flight plan.
     */
    getDepartureWaypoints() {
      return this._flightPlans[this._currentFlightPlanIndex].departure.waypoints;
    }

    /**
     * Gets a map of the departure waypoints (?)
     */
    getDepartureWaypointsMap() {
      return this._flightPlans[this._currentFlightPlanIndex].departure.waypoints;
    }

    /**
     * Gets the enroute waypoints for the current flight plan.
     * @param outFPIndex An array of waypoint indexes to be pushed to.
     */
    getEnRouteWaypoints(outFPIndex) {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const enrouteSegment = currentFlightPlan.enroute;
      if (enrouteSegment !== FlightPlanSegment.Empty) {
        for (let i = 0; i < enrouteSegment.waypoints.length; i++) {
          outFPIndex.push(enrouteSegment.offset + i);
        }
      }
      return enrouteSegment.waypoints;
    }

    /**
     * Gets the index of the last waypoint in the enroute segment of the current flight plan.
     */
    getEnRouteWaypointsFirstIndex() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      const enrouteSegment = currentFlightPlan === null || currentFlightPlan === void 0 ? void 0 : currentFlightPlan.enroute;
      return enrouteSegment === null || enrouteSegment === void 0 ? void 0 : enrouteSegment.offset;
    }

    /**
     * Gets the index of the last waypoint in the enroute segment of the current flight plan.
     */
    getEnRouteWaypointsLastIndex() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      const enrouteSegment = currentFlightPlan === null || currentFlightPlan === void 0 ? void 0 : currentFlightPlan.enroute;
      return enrouteSegment ? enrouteSegment.offset + (enrouteSegment.waypoints.length - 1) : null;
    }

    /**
     * Gets the arrival waypoints for the current flight plan.
     */
    getArrivalWaypoints() {
      return this._flightPlans[this._currentFlightPlanIndex].arrival.waypoints;
    }

    /**
     * Gets the arrival waypoints for the current flight plan as a map. (?)
     */
    getArrivalWaypointsMap() {
      return this._flightPlans[this._currentFlightPlanIndex].arrival.waypoints;
    }

    /**
     * Gets the waypoints for the current flight plan with altitude constraints.
     */
    getWaypointsWithAltitudeConstraints() {
      return this._flightPlans[this._currentFlightPlanIndex].waypoints;
    }

    /**
     * Gets the flight plan segment for a flight plan waypoint.
     * @param waypoint The waypoint we want to find the segment for.
     */
    getSegmentFromWaypoint(waypoint) {
      let flightPlanIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      if (isNaN(flightPlanIndex)) {
        flightPlanIndex = this._currentFlightPlanIndex;
      }
      const index = waypoint === undefined ? this.getActiveWaypointIndex() : this.indexOfWaypoint(waypoint);
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      return currentFlightPlan.findSegmentByWaypointIndex(index);
    }

    /**
     * Sets the destination for the current flight plan.
     * @param icao The ICAO designation for the destination airfield.
     * @param callback A callback to call once the operation completes.
     */
    async setDestination(icao) {
      var _this$getDestination;
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const sameAirport = ((_this$getDestination = this.getDestination()) === null || _this$getDestination === void 0 ? void 0 : _this$getDestination.ident) === icao;
      const waypoint = await this._parentInstrument.facilityLoader.getFacilityRaw(icao);
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const destinationIndex = currentFlightPlan.length - 1;
      if (currentFlightPlan.hasDestination) {
        currentFlightPlan.removeWaypoint(destinationIndex);
      }
      currentFlightPlan.addWaypoint(waypoint);

      // make the waypoint before a discontinuity
      /*
      const { waypoints } = currentFlightPlan;
      if (waypoints.length > 0 && destinationIndex > 0) {
          const previous = currentFlightPlan.waypoints[destinationIndex - 1];
          // ensure we do not overwrite a possible discontinuityCanBeCleared
          if (!previous.endsInDiscontinuity) {
              previous.endsInDiscontinuity = true;
              previous.discontinuityCanBeCleared = true;
          }
      }
      */

      // clear pilot trans level
      this.setDestinationTransitionLevel(undefined, false);
      // TODO get destination trans level from database
      // until then, don't erase the database value from ATSU if same airport as before
      if (!sameAirport) {
        this.setDestinationTransitionLevel(undefined, true);
      }
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Adds a waypoint to the current flight plan.
     * @param icao The ICAO designation for the waypoint.
     * @param index The index of the waypoint to add.
     * @param callback A callback to call once the operation completes.
     * @param setActive Whether or not to set the added waypoint as active immediately.
     */
    async addWaypoint(icao) {
      let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const waypoint = await this._parentInstrument.facilityLoader.getFacilityRaw(icao).catch(e => {
        console.log("addWaypoint: [".concat(icao, "] Error"));
        console.error(e);
      });
      if (waypoint) {
        currentFlightPlan.addWaypoint(waypoint, index);
        this.updateFlightPlanVersion().catch(console.error);
        callback();
      }
    }

    /**
     * Adds a user waypoint to the current flight plan.
     * @param waypoint The user waypoint to add.
     * @param index The index to add the waypoint at in the flight plan.
     * @param callback A callback to call once the operation completes.
     */
    async addUserWaypoint(waypoint) {
      let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      currentFlightPlan.addWaypoint(waypoint, index);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }
    setLegAltitudeDescription(waypoint, code) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      if (waypoint) {
        waypoint.legAltitudeDescription = code;
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the altitude constraint for a waypoint in the current flight plan.
     * @param altitude The altitude to set for the waypoint.
     * @param index The index of the waypoint to set.
     * @param callback A callback to call once the operation is complete.
     * @param isDescentConstraint For enroute waypoints, indicates whether constraint is a descent or climb constraint
     */
    setWaypointAltitude(altitude, index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      let isDescentConstraint = arguments.length > 3 ? arguments[3] : undefined;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const waypoint = currentFlightPlan.getWaypoint(index);
      if (waypoint) {
        waypoint.legAltitude1 = altitude;
        if (isDescentConstraint !== undefined && !waypoint.additionalData.constraintType) {
          // this propagates through intermediate waypoints
          if (isDescentConstraint) {
            this.setFirstDesConstraintWaypoint(index);
          } else {
            this.setLastClbConstraintWaypoint(index);
          }
        }
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the speed constraint for a waypoint in the current flight plan.
     * @param speed The speed to set for the waypoint.
     * @param index The index of the waypoint to set.
     * @param callback A callback to call once the operation is complete.
     * @param isDescentConstraint For enroute waypoints, indicates whether constraint is a descent or climb constraint
     */
    setWaypointSpeed(speed, index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      let isDescentConstraint = arguments.length > 3 ? arguments[3] : undefined;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const waypoint = currentFlightPlan.getWaypoint(index);
      if (waypoint) {
        waypoint.speedConstraint = speed;
        // this propagates through intermediate waypoints
        if (isDescentConstraint) {
          this.setFirstDesConstraintWaypoint(index);
        } else {
          this.setLastClbConstraintWaypoint(index);
        }
        this.updateFlightPlanVersion();
      }
      callback();
    }
    setLastClbConstraintWaypoint(index) {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      for (let i = index; i >= 0; i--) {
        const waypoint = currentFlightPlan.getWaypoint(i);
        if (waypoint) {
          waypoint.additionalData.constraintType = WaypointConstraintType.CLB;
        }
      }
    }
    setFirstDesConstraintWaypoint(index) {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      for (let i = index; i < this.getWaypointsCount(); i++) {
        const waypoint = currentFlightPlan.getWaypoint(i);
        if (waypoint) {
          waypoint.additionalData.constraintType = WaypointConstraintType.DES;
        }
      }
    }

    /**
     * Sets additional data on a waypoint in the current flight plan.
     * @param index The index of the waypoint to set additional data for.
     * @param key The key of the data.
     * @param value The value of the data.
     * @param callback A callback to call once the operation is complete.
     */
    setWaypointAdditionalData(index, key, value) {
      let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const waypoint = currentFlightPlan.getWaypoint(index);
      if (waypoint) {
        waypoint.additionalData[key] = value;
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Gets additional data on a waypoint in the current flight plan.
     * @param index The index of the waypoint to set additional data for.
     * @param key The key of the data.
     * @param callback A callback to call with the value once the operation is complete.
     */
    getWaypointAdditionalData(index, key) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const waypoint = currentFlightPlan.getWaypoint(index);
      if (waypoint) {
        callback(waypoint.additionalData[key]);
      } else {
        callback(undefined);
      }
    }

    /**
     * Reverses the currently active flight plan.
     * @param {() => void} callback A callback to call when the operation is complete.
     */
    invertActiveFlightPlan() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      this._flightPlans[this._currentFlightPlanIndex].reverse();
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Not sure what this is supposed to do.
     * @param callback Stuff?
     */
    getApproachIfIcao() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      callback(this.getApproach());
    }

    /**
     * Unused
     * @param {*} _callback Unused
     */
    addFlightPlanUpdateCallback(_callback) {}

    /**
     * Adds a waypoint to the currently active flight plan by ident(?)
     * @param ident The ident of the waypoint.
     * @param index The index to add the waypoint at.
     * @param callback A callback to call when the operation finishes.
     */
    addWaypointByIdent(ident, index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Void;
      this.addWaypoint(ident, index, callback).catch(console.error);
    }

    /**
     * Removes a waypoint from the currently active flight plan.
     * @param index The index of the waypoint to remove.
     * @param noDiscontinuity Don't create a discontinuity
     * @param callback A callback to call when the operation finishes.
     */
    removeWaypoint(index) {
      let noDiscontinuity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      this._flightPlans[this._currentFlightPlanIndex].removeWaypoint(index, noDiscontinuity);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }
    addWaypointOverfly(index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      this._flightPlans[this._currentFlightPlanIndex].setWaypointOverfly(index, true);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }
    removeWaypointOverfly(index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      this._flightPlans[this._currentFlightPlanIndex].setWaypointOverfly(index, false);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }
    addOrEditManualHold(index, desiredHold, modifiedHold, defaultHold) {
      const holdIndex = this._flightPlans[this._currentFlightPlanIndex].addOrEditManualHold(index, desiredHold, modifiedHold, defaultHold);
      this.updateFlightPlanVersion().catch(console.error);
      return holdIndex;
    }

    /**
     * Truncates a flight plan after a specific waypoint.
     * @param index The index of the first waypoint to remove.
     * @param callback A callback to call when the operation finishes.
     */
    truncateWaypoints(index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      const fp = this._flightPlans[this._currentFlightPlanIndex];
      for (let i = fp.length; i >= index; i--) {
        fp.removeWaypoint(index);
      }
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Gets the index of a given waypoint in the current flight plan.
     * @param waypoint The waypoint to get the index of.
     */
    indexOfWaypoint(waypoint) {
      return this._flightPlans[this._currentFlightPlanIndex].waypoints.indexOf(waypoint);
    }

    /**
     * Gets the number of waypoints in a flight plan.
     * @param flightPlanIndex The index of the flight plan. If omitted, will get the current flight plan.
     */
    getWaypointsCount() {
      var _this$_flightPlans$fl3, _this$_flightPlans$fl4;
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
      if (isNaN(flightPlanIndex)) {
        var _this$_flightPlans$th, _this$_flightPlans$th2;
        return (_this$_flightPlans$th = (_this$_flightPlans$th2 = this._flightPlans[this._currentFlightPlanIndex]) === null || _this$_flightPlans$th2 === void 0 ? void 0 : _this$_flightPlans$th2.length) !== null && _this$_flightPlans$th !== void 0 ? _this$_flightPlans$th : 0;
      }
      return (_this$_flightPlans$fl3 = (_this$_flightPlans$fl4 = this._flightPlans[flightPlanIndex]) === null || _this$_flightPlans$fl4 === void 0 ? void 0 : _this$_flightPlans$fl4.length) !== null && _this$_flightPlans$fl3 !== void 0 ? _this$_flightPlans$fl3 : 0;
    }

    /**
     * Gets a count of the number of departure waypoints in the current flight plan.
     */
    getDepartureWaypointsCount() {
      return this._flightPlans[this._currentFlightPlanIndex].departure.waypoints.length;
    }

    /**
     * Gets a count of the number of arrival waypoints in the current flight plan.
     */
    getArrivalWaypointsCount() {
      return this._flightPlans[this._currentFlightPlanIndex].arrival.waypoints.length;
    }

    /**
     * Gets a waypoint from a flight plan.
     * @param index The index of the waypoint to get.
     * @param flightPlanIndex The index of the flight plan to get the waypoint from. If omitted, will get from the current flight plan.
     * @param considerApproachWaypoints Whether or not to consider approach waypoints.
     */
    getWaypoint(index) {
      let flightPlanIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      if (isNaN(flightPlanIndex)) {
        flightPlanIndex = this._currentFlightPlanIndex;
      }
      return this._flightPlans[flightPlanIndex].getWaypoint(index);
    }

    /**
     * Gets all non-approach waypoints from a flight plan.
     *
     * @param flightPlanIndex The index of the flight plan to get the waypoints from. If omitted, will get from the current flight plan.
     */
    getWaypoints() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
      if (isNaN(flightPlanIndex)) {
        flightPlanIndex = this._currentFlightPlanIndex;
      }
      return this._flightPlans[flightPlanIndex].nonApproachWaypoints;
    }

    /**
     * Gets all waypoints from a flight plan.
     * @param flightPlanIndex The index of the flight plan to get the waypoints from. If omitted, will get from the current flight plan.
     */
    getAllWaypoints(flightPlanIndex) {
      if (flightPlanIndex === undefined) {
        flightPlanIndex = this._currentFlightPlanIndex;
      }
      return this._flightPlans[flightPlanIndex].waypoints;
    }

    /**
     * Gets the departure runway index, based on the departure in a flight plan.
     */
    getDepartureRunwayIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.hasOrigin) {
        return currentFlightPlan.procedureDetails.departureRunwayIndex;
      }
      return -1;
    }

    /**
     * Gets the index value of the origin runway (oneWayRunways) in a flight plan.
     */
    getOriginRunwayIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.originRunwayIndex !== -1 && currentFlightPlan.originAirfield) {
        return currentFlightPlan.procedureDetails.originRunwayIndex;
      }
      return -1;
    }

    /**
     * Gets the string value of the departure runway in the current flight plan.
     */
    getOriginRunway() {
      const runwayIndex = this.getOriginRunwayIndex();
      if (runwayIndex !== -1) {
        return this.getOrigin().infos.oneWayRunways[runwayIndex];
      }
      return undefined;
    }

    /**
     * Gets the best runway based on the current plane heading.
     */
    getDetectedCurrentRunway() {
      const origin = this.getOrigin();
      if (origin && origin.infos instanceof AirportInfo) {
        const runways = origin.infos.oneWayRunways;
        if (runways && runways.length > 0) {
          const direction = Simplane.getHeadingMagnetic();
          let bestRunway = runways[0];
          let bestDeltaAngle = Math.abs(Avionics.Utils.diffAngle(direction, bestRunway.direction));
          for (let i = 1; i < runways.length; i++) {
            const deltaAngle = Math.abs(Avionics.Utils.diffAngle(direction, runways[i].direction));
            if (deltaAngle < bestDeltaAngle) {
              bestDeltaAngle = deltaAngle;
              bestRunway = runways[i];
            }
          }
          return bestRunway;
        }
      }
      return undefined;
    }

    /**
     * Gets the departure procedure index for the current flight plan.
     */
    getDepartureProcIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      return currentFlightPlan.procedureDetails.departureIndex;
    }

    /**
     * Sets the departure procedure index for the current flight plan.
     * @param index The index of the departure procedure in the origin airport departures information.
     * @param callback A callback to call when the operation completes.
     */
    async setDepartureProcIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.departureIndex !== index) {
        currentFlightPlan.procedureDetails.departureIndex = index;
        await currentFlightPlan.buildDeparture().catch(console.error);
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the departure runway index for the current flight plan.
     * @param index The index of the runway in the origin airport runway information.
     * @param callback A callback to call when the operation completes.
     */
    async setDepartureRunwayIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.departureRunwayIndex !== index) {
        currentFlightPlan.procedureDetails.departureRunwayIndex = index;
        await currentFlightPlan.buildDeparture().catch(console.error);
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the origin runway index for the current flight plan.
     * @param index The index of the runway in the origin airport runway information.
     * @param callback A callback to call when the operation completes.
     */
    async setOriginRunwayIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.originRunwayIndex !== index) {
        currentFlightPlan.procedureDetails.originRunwayIndex = index;
        await currentFlightPlan.buildDeparture().catch(console.error);
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }
    async setOriginRunwayIndexFromDeparture() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.hasOrigin && currentFlightPlan.procedureDetails.departureRunwayIndex !== -1 && currentFlightPlan.procedureDetails.departureIndex !== -1 && currentFlightPlan.originAirfield) {
        const transition = currentFlightPlan.originAirfield.infos.departures[currentFlightPlan.procedureDetails.departureIndex].runwayTransitions[currentFlightPlan.procedureDetails.departureRunwayIndex];
        const runways = currentFlightPlan.originAirfield.infos.oneWayRunways;
        await this.setOriginRunwayIndex(runways.findIndex(r => r.number === transition.runwayNumber && r.designator === transition.runwayDesignation));
      }
    }

    /**
     * Gets the departure transition index for the current flight plan.
     */
    getDepartureEnRouteTransitionIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      return currentFlightPlan.procedureDetails.departureTransitionIndex;
    }

    /**
     * Sets the departure transition index for the current flight plan.
     * @param index The index of the departure transition to select.
     * @param callback A callback to call when the operation completes.
     */
    async setDepartureEnRouteTransitionIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.departureTransitionIndex !== index) {
        currentFlightPlan.procedureDetails.departureTransitionIndex = index;
        await currentFlightPlan.buildDeparture().catch(console.error);
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Unused
     */
    getDepartureDiscontinuity() {}

    /**
     * Unused
     * @param callback A callback to call when the operation completes.
     */
    clearDepartureDiscontinuity() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      callback();
    }

    /**
     * Removes the departure from the currently active flight plan.
     * @param callback A callback to call when the operation completes.
     */
    async removeDeparture() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      currentFlightPlan.procedureDetails.departureIndex = -1;
      await currentFlightPlan.buildDeparture().catch(console.error);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Gets the arrival procedure index in the currenly active flight plan.
     */
    getArrivalProcIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.hasDestination && currentFlightPlan.procedureDetails.arrivalIndex !== -1) {
        return currentFlightPlan.procedureDetails.arrivalIndex;
      }
      return -1;
    }

    /**
     * Gets the arrival transition procedure index in the currently active flight plan.
     */
    getArrivalTransitionIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      return currentFlightPlan.procedureDetails.arrivalTransitionIndex;
    }

    /**
     * Sets the arrival procedure index for the current flight plan.
     * @param {Number} index The index of the arrival procedure to select.
     * @param {() => void} callback A callback to call when the operation completes.
     */
    async setArrivalProcIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.arrivalIndex !== index) {
        // console.log('FPM: setArrivalProcIndex: SET STAR ', currentFlightPlan.destinationAirfield.infos.arrivals[index].name);
        currentFlightPlan.procedureDetails.arrivalTransitionIndex = -1;
        currentFlightPlan.procedureDetails.arrivalIndex = index;
        currentFlightPlan.procedureDetails.approachTransitionIndex = -1;
        await currentFlightPlan.rebuildArrivalApproach();
        this.updateFlightPlanVersion().catch(console.error);
      }

      // TODO check for transition level coded in procedure...
      // pick higher of procedure or destination airfield trans fl

      callback();
    }

    /**
     * Unused
     */
    getArrivalDiscontinuity() {}

    /**
     * Unused
     * @param {*} callback
     */
    clearArrivalDiscontinuity() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      callback();
    }

    /**
     * Clears a discontinuity from the end of a waypoint.
     * @param index
     */
    clearDiscontinuity(index) {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      const waypoint = currentFlightPlan.getWaypoint(index);
      const nextWaypoint = currentFlightPlan.getWaypoint(index + 1);
      if (waypoint !== undefined && nextWaypoint !== undefined && waypoint.discontinuityCanBeCleared) {
        waypoint.endsInDiscontinuity = false;
        switch (nextWaypoint.additionalData.legType) {
          case FSEnums$1.LegType.FA:
          case FSEnums$1.LegType.FC:
          case FSEnums$1.LegType.FD:
          case FSEnums$1.LegType.FM:
          case FSEnums$1.LegType.HA:
          case FSEnums$1.LegType.HF:
          case FSEnums$1.LegType.HM:
          case FSEnums$1.LegType.PI:
            this.addWaypointByIdent(nextWaypoint.icao, index + 1, () => this.updateFlightPlanVersion().catch(console.error));
            break;
          default:
            this.updateFlightPlanVersion().catch(console.error);
        }
        return true;
      }
      this.updateFlightPlanVersion().catch(console.error);
      return false;
    }

    /**
     * Sets the arrival transition index for the current flight plan.
     * @param {Number} index The index of the arrival transition to select.
     * @param {() => void} callback A callback to call when the operation completes.
     */
    async setArrivalEnRouteTransitionIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      // console.log('FPM: setArrivalEnRouteTransitionIndex: SET TRANSITION - ARRIVAL',
      // currentFlightPlan.destinationAirfield.infos.arrivals[currentFlightPlan.procedureDetails.arrivalIndex].enRouteTransitions[index].name);

      if (currentFlightPlan.procedureDetails.arrivalTransitionIndex !== index) {
        currentFlightPlan.procedureDetails.arrivalTransitionIndex = index;
        await currentFlightPlan.rebuildArrivalApproach();
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the arrival runway index in the currently active flight plan.
     * @param {Number} index The index of the runway to select.
     * @param {() => void} callback A callback to call when the operation completes.
     */
    async setArrivalRunwayIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.procedureDetails.arrivalRunwayIndex !== index) {
        /* if (currentFlightPlan.procedureDetails.arrivalIndex >= 0) {
            console.log(`setArrivalRunwayIndex: Finishing at
            ${currentFlightPlan.destinationAirfield.infos.arrivals[currentFlightPlan.procedureDetails.arrivalIndex].runwayTransitions[index].name}`);
        } else {
            console.log('setArrivalRunwayIndex: Finishing at none');
        } */
        currentFlightPlan.procedureDetails.arrivalRunwayIndex = index;
        await currentFlightPlan.rebuildArrivalApproach();
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the destination runway index in the currently active flight plan.
     * @param index The index of the runway to select.
     * @param runwayExtension The length of the runway extension fix to create, or -1 if none.
     * @param callback A callback to call when the operation completes.
     */
    async setDestinationRunwayIndex(index) {
      let runwayExtension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      // console.log('setDestinationRunwayIndex - APPROACH');

      if (currentFlightPlan.procedureDetails.destinationRunwayIndex !== index || currentFlightPlan.procedureDetails.destinationRunwayExtension !== runwayExtension) {
        currentFlightPlan.procedureDetails.destinationRunwayIndex = index;
        currentFlightPlan.procedureDetails.destinationRunwayExtension = runwayExtension;
        await currentFlightPlan.buildApproach().catch(console.error);
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Sets the destination runway index using the current selected approach
     */
    async setDestinationRunwayIndexFromApproach() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.hasDestination && currentFlightPlan.procedureDetails.approachIndex !== -1) {
        console.error('Destination runway index is -1 with valid STAR');
        const approach = currentFlightPlan.destinationAirfield.infos.approaches[currentFlightPlan.procedureDetails.approachIndex];
        const destRunways = currentFlightPlan.destinationAirfield.infos.oneWayRunways;
        await this.setDestinationRunwayIndex(destRunways.findIndex(r => r.number === approach.runwayNumber && r.designator === approach.runwayDesignator));
      }
    }

    /**
     * Gets the index of the approach in the currently active flight plan.
     */
    getApproachIndex() {
      return this._flightPlans[this._currentFlightPlanIndex].procedureDetails.approachIndex;
    }

    /**
     * Sets the approach index in the currently active flight plan.
     * @param index The index of the approach in the destination airport information.
     * @param callback A callback to call when the operation has completed.
     * @param transition The approach transition index to set in the approach information.
     */
    async setApproachIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      // console.log(currentFlightPlan);

      if (currentFlightPlan.procedureDetails.approachIndex !== index) {
        // console.log('FPM: setApproachIndex - APPROACH', currentFlightPlan.destinationAirfield.infos.approaches[index].name);
        currentFlightPlan.procedureDetails.approachIndex = index;
        currentFlightPlan.procedureDetails.approachTransitionIndex = -1;
        currentFlightPlan.procedureDetails.arrivalIndex = -1;
        currentFlightPlan.procedureDetails.arrivalTransitionIndex = -1;
        await currentFlightPlan.rebuildArrivalApproach();
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Whether or not an approach is loaded in the current flight plan.
     * @param forceSimVarCall Unused
     */
    isLoadedApproach() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      return currentFlightPlan.procedureDetails.approachIndex !== -1;
    }

    /**
     * Whether or not the approach is active in the current flight plan.
     * @param forceSimVarCall Unused
     */
    isActiveApproach() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      return currentFlightPlan.approach.waypoints.length > 0 && currentFlightPlan.activeWaypointIndex >= currentFlightPlan.approach.offset;
    }

    /**
     * Activates the approach segment in the current flight plan.
     * @param {() => void} callback
     */
    async activateApproach() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (!this.isActiveApproach() && currentFlightPlan.approach.offset >= 0) {
        await GPS.setActiveWaypoint(currentFlightPlan.approach.offset).catch(console.error);
      }
      callback();
    }

    /**
     * Deactivates the approach segments in the current flight plan.
     */
    deactivateApproach() {}

    /**
     * Attemptes to auto-activate the approach in the current flight plan.
     */
    tryAutoActivateApproach() {}

    /**
     * Gets the index of the active waypoint on the approach in the current flight plan.
     */
    getApproachActiveWaypointIndex() {
      return this._flightPlans[this._currentFlightPlanIndex].activeWaypointIndex;
    }

    /**
     * Gets the approach procedure from the current flight plan destination airport procedure information.
     */
    getApproach() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      if (currentFlightPlan.hasDestination && currentFlightPlan.procedureDetails.approachIndex !== -1) {
        return currentFlightPlan.destinationAirfield.infos.approaches[currentFlightPlan.procedureDetails.approachIndex];
      }
      return undefined;
    }

    /**
     * Gets the index of the approach transition in the current flight plan.
     */
    getApproachTransitionIndex() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      return currentFlightPlan.procedureDetails.approachTransitionIndex;
    }

    /**
     * Gets the last waypoint index before the start of the approach segment in
     * the current flight plan.
     */
    getLastIndexBeforeApproach() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      // TODO: if we have an approach return last index
      if (currentFlightPlan.approach !== FlightPlanSegment.Empty) {
        return currentFlightPlan.approach.offset - 1;
      }
      return this.getWaypointsCount();
    }

    /**
     * Gets the destination runway from the current flight plan.
     */
    getDestinationRunway() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const flightPlan = this._flightPlans[flightPlanIndex];
      const runwayIndex = this.getDestinationRunwayIndex(flightPlanIndex);
      if (runwayIndex !== -1) {
        return flightPlan.destinationAirfield.infos.oneWayRunways[runwayIndex];
      }
      return undefined;
    }

    /**
     * Gets the destination runway index (oneWayRunways) from the current flight plan.
     */
    getDestinationRunwayIndex() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const flightPlan = this._flightPlans[flightPlanIndex];
      if (flightPlan.procedureDetails.destinationRunwayIndex !== -1 && flightPlan.destinationAirfield) {
        return flightPlan.procedureDetails.destinationRunwayIndex;
      }
      if (flightPlan.hasDestination && flightPlan.procedureDetails.approachIndex !== -1) {
        console.error('Destination runway index is -1 with valid STAR');
        const approach = flightPlan.destinationAirfield.infos.approaches[flightPlan.procedureDetails.approachIndex];
        const runways = flightPlan.destinationAirfield.infos.oneWayRunways;
        return runways.findIndex(r => r.number === approach.runwayNumber && r.designator === approach.runwayDesignator);
      }
      return -1;
    }

    /**
     * Gets the approach waypoints for the current flight plan.
     */
    getApproachWaypoints() {
      return this._flightPlans[this._currentFlightPlanIndex].approach.waypoints;
    }

    /**
     * Sets the approach transition index for the current flight plan.
     * @param index The index of the transition in the destination airport approach information.
     * @param callback A callback to call when the operation completes.
     */
    async setApproachTransitionIndex(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      // console.log('setApproachTransitionIndex - APPROACH');

      if (currentFlightPlan.procedureDetails.approachTransitionIndex !== index) {
        // console.log(`setApproachIndex: APPR TRANS ${currentFlightPlan.destinationAirfield.infos.approaches[currentFlightPlan.procedureDetails.approachIndex].transitions[index].name}`);
        currentFlightPlan.procedureDetails.approachTransitionIndex = index;
        await currentFlightPlan.rebuildArrivalApproach();
        this.updateFlightPlanVersion().catch(console.error);
      }
      callback();
    }

    /**
     * Removes the arrival segment from the current flight plan.
     * @param callback A callback to call when the operation completes.
     */
    async removeArrival() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      // console.log('remove arrival - ARRIVAL');

      currentFlightPlan.procedureDetails.arrivalIndex = -1;
      currentFlightPlan.procedureDetails.arrivalRunwayIndex = -1;
      currentFlightPlan.procedureDetails.arrivalTransitionIndex = -1;
      await currentFlightPlan.buildArrival().catch(console.error);
      this.updateFlightPlanVersion().catch(console.error);
      callback();
    }

    /**
     * Inserts direct-to an ICAO designated fix.
     *
     * @param icao The ICAO designation for the fix to fly direct-to.
     */
    async insertDirectTo(waypoint) {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      await currentFlightPlan.addDirectTo(waypoint);
      this.updateFlightPlanVersion().catch(console.error);
    }

    /**
     * Cancels the current direct-to and proceeds back along the flight plan.
     * @param callback A callback to call when the operation completes.
     */
    cancelDirectTo() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      this._flightPlans[this._currentFlightPlanIndex];
      // currentFlightPlan.directTo.cancel();

      callback();
    }

    /**
     * Gets whether or not the flight plan is current in a direct-to procedure.
     */
    getIsDirectTo() {
      return this._flightPlans[this._currentFlightPlanIndex].directTo.isActive;
    }

    /**
     * Gets the target of the direct-to procedure in the current flight plan.
     */
    getDirectToTarget() {
      const currentFlightPlan = this._flightPlans[this._currentFlightPlanIndex];
      if (currentFlightPlan.directTo.waypointIsInFlightPlan) {
        return currentFlightPlan.waypoints[currentFlightPlan.directTo.planWaypointIndex];
      }
      return currentFlightPlan.directTo.waypoint;
    }

    /**
     * Gets the origin/start waypoint of the direct-to procedure in the current flight plan.
     */
    getDirecToOrigin() {
      return this._flightPlans[this._currentFlightPlanIndex].directTo.interceptPoints[0];
    }
    getCoordinatesHeadingAtDistanceAlongFlightPlan(_distance) {}

    /**
     * Gets the coordinates of a point that is a specific distance from the destination along the flight plan.
     * @param distance The distance from destination we want the coordinates for.
     */
    getCoordinatesAtNMFromDestinationAlongFlightPlan(distance) {
      const allWaypoints = this.getAllWaypoints();
      const destination = this.getDestination();
      if (destination) {
        const fromStartDistance = destination.cumulativeDistanceInFP - distance;
        let prev;
        let next;
        for (let i = 0; i < allWaypoints.length - 1; i++) {
          prev = allWaypoints[i];
          next = allWaypoints[i + 1];
          if (prev.cumulativeDistanceInFP < fromStartDistance && next.cumulativeDistanceInFP > fromStartDistance) {
            break;
          }
        }
        const prevCD = prev.cumulativeDistanceInFP;
        const nextCD = next.cumulativeDistanceInFP;
        const d = (fromStartDistance - prevCD) / (nextCD - prevCD);
        const output = new LatLongAlt();
        output.lat = Avionics.Utils.lerpAngle(prev.infos.coordinates.lat, next.infos.coordinates.lat, d);
        output.long = Avionics.Utils.lerpAngle(prev.infos.coordinates.long, next.infos.coordinates.long, d);
        return output;
      }
      return null;
    }

    /**
     * Gets the current stored flight plan
     */
    _getFlightPlan() {
      if (!LnavConfig.LnavConfig.DEBUG_SAVE_FPLN_LOCAL_STORAGE) {
        return;
      }
      const fpln = window.localStorage.getItem(FlightPlanManager.FlightPlanKey);
      if (fpln === null || fpln === '') {
        this._flightPlans = [];
        const initFpln = new ManagedFlightPlan();
        initFpln.setParentInstrument(this._parentInstrument);
        this._flightPlans.push(initFpln);
      } else if (window.localStorage.getItem(FlightPlanManager.FlightPlanCompressedKey) === '1') {
        this._flightPlans = JSON.parse(LZUTF8.decompress(fpln, {
          inputEncoding: 'StorageBinaryString'
        }));
      } else {
        try {
          this._flightPlans = JSON.parse(fpln);
        } catch (e) {
          // Assume we failed because compression status did not match up. Try to decompress anyway.

          this._flightPlans = JSON.parse(LZUTF8.decompress(fpln, {
            inputEncoding: 'StorageBinaryString'
          }));
        }
      }
    }
    getCurrentFlightPlan() {
      return this._flightPlans[this._currentFlightPlanIndex];
    }
    getFlightPlan(index) {
      return this._flightPlans[index];
    }

    /**
     * Updates the synchronized flight plan version and saves it to shared storage.
     */
    async updateFlightPlanVersion() {
      if (this._isSyncPaused) {
        return;
      }
      if (LnavConfig.LnavConfig.DEBUG_SAVE_FPLN_LOCAL_STORAGE) {
        let fpJson = JSON.stringify(this._flightPlans.map(fp => fp.serialize()));
        if (fpJson.length > 2500000) {
          fpJson = LZUTF8.compress(fpJson, {
            outputEncoding: 'StorageBinaryString'
          });
          window.localStorage.setItem(FlightPlanManager.FlightPlanCompressedKey, '1');
        } else {
          window.localStorage.setItem(FlightPlanManager.FlightPlanCompressedKey, '0');
        }
        window.localStorage.setItem(FlightPlanManager.FlightPlanKey, fpJson);
      }
      SimVar.SetSimVarValue(FlightPlanManager.FlightPlanVersionKey, 'number', ++this._currentFlightPlanVersion);
      if (persistence.NXDataStore.get('FP_SYNC', 'LOAD') === 'SAVE') {
        FlightPlanAsoboSync.SaveToGame(this).catch(console.error);
      }
    }
    pauseSync() {
      this._isSyncPaused = true;
      console.log('FlightPlan Sync Paused');
    }
    resumeSync() {
      this._isSyncPaused = false;
      this.updateFlightPlanVersion().catch(console.error);
      console.log('FlightPlan Sync Resume');
    }
    get currentFlightPlanVersion() {
      return this._currentFlightPlanVersion;
    }
    getOriginTransitionAltitude() {
      var _currentFlightPlan$or;
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      return (_currentFlightPlan$or = currentFlightPlan.originTransitionAltitudePilot) !== null && _currentFlightPlan$or !== void 0 ? _currentFlightPlan$or : currentFlightPlan.originTransitionAltitudeDb;
    }

    /**
     * The transition altitude for the origin in the *active* flight plan
     */
    get originTransitionAltitude() {
      return this.getOriginTransitionAltitude(0);
    }
    getOriginTransitionAltitudeIsFromDb() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      return currentFlightPlan.originTransitionAltitudePilot === undefined;
    }

    /**
     * Is the transition altitude for the origin in the *active* flight plan from the database?
     */
    get originTransitionAltitudeIsFromDb() {
      return this.getOriginTransitionAltitudeIsFromDb(0);
    }

    /**
     * Set the transition altitude for the origin
     * @param altitude transition altitude
     * @param database is this value from the database, or pilot?
     * @param flightPlanIndex index of flight plan to be edited, defaults to current plan being edited (not active!)
     */
    setOriginTransitionAltitude(altitude) {
      let database = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let flightPlanIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      if (database) {
        currentFlightPlan.originTransitionAltitudeDb = altitude;
      } else {
        currentFlightPlan.originTransitionAltitudePilot = altitude;
      }
      this.updateFlightPlanVersion();
    }
    getDestinationTransitionLevel() {
      var _currentFlightPlan$de;
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      return (_currentFlightPlan$de = currentFlightPlan.destinationTransitionLevelPilot) !== null && _currentFlightPlan$de !== void 0 ? _currentFlightPlan$de : currentFlightPlan.destinationTransitionLevelDb;
    }

    /**
     * The transition level for the destination in the *active* flight plan
     */
    get destinationTransitionLevel() {
      return this.getDestinationTransitionLevel(0);
    }
    getDestinationTransitionLevelIsFromDb() {
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      return currentFlightPlan.destinationTransitionLevelPilot === undefined;
    }

    /**
     * Is the transition level for the destination in the *active* flight plan from the database?
     */
    get destinationTransitionLevelIsFromDb() {
      return this.getDestinationTransitionLevelIsFromDb(0);
    }

    /**
     * Set the transition level for the destination
     * @param flightLevel transition level
     * @param database is this value from the database, or pilot?
     * @param flightPlanIndex index of flight plan to be edited, defaults to current plan being edited (not active!)
     */
    setDestinationTransitionLevel(flightLevel) {
      let database = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let flightPlanIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._currentFlightPlanIndex;
      const currentFlightPlan = this._flightPlans[flightPlanIndex];
      if (database) {
        currentFlightPlan.destinationTransitionLevelDb = flightLevel;
      } else {
        currentFlightPlan.destinationTransitionLevelPilot = flightLevel;
      }
      this.updateFlightPlanVersion();
    }
    getFixInfo(index) {
      return this._fixInfos[index];
    }
    isWaypointInUse(icao) {
      for (const fp of this._flightPlans) {
        for (let i = 0; i < (fp === null || fp === void 0 ? void 0 : fp.waypoints.length); i++) {
          if (fp.getWaypoint(i).icao === icao) {
            return true;
          }
        }
      }
      for (const fixInfo of this._fixInfos) {
        var _fixInfo$getRefFix;
        if ((fixInfo === null || fixInfo === void 0 ? void 0 : (_fixInfo$getRefFix = fixInfo.getRefFix()) === null || _fixInfo$getRefFix === void 0 ? void 0 : _fixInfo$getRefFix.infos.icao) === icao) {
          return true;
        }
      }
      return false;
    }
    get activeFlightPlan() {
      return this._flightPlans[FlightPlans.Active];
    }
    getApproachType() {
      var _fp$procedureDetails$;
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const fp = this._flightPlans[flightPlanIndex];
      return (_fp$procedureDetails$ = fp === null || fp === void 0 ? void 0 : fp.procedureDetails.approachType) !== null && _fp$procedureDetails$ !== void 0 ? _fp$procedureDetails$ : undefined;
    }
    getGlideslopeIntercept() {
      var _fp$glideslopeInterce;
      let flightPlanIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentFlightPlanIndex;
      const fp = this._flightPlans[flightPlanIndex];
      return (_fp$glideslopeInterce = fp === null || fp === void 0 ? void 0 : fp.glideslopeIntercept) !== null && _fp$glideslopeInterce !== void 0 ? _fp$glideslopeInterce : undefined;
    }
    updateActiveArea() {
      const activeFp = this._flightPlans[FlightPlans.Active];
      if (!activeFp) {
        this.activeArea = FlightArea.Terminal;
        return;
      }
      this.activeArea = this.calculateActiveArea(activeFp);
    }
    calculateActiveArea(activeFp) {
      const activeIndex = activeFp.activeWaypointIndex;
      const appr = activeFp.getSegment(wtsdk.SegmentType.Approach);
      const arrival = activeFp.getSegment(wtsdk.SegmentType.Arrival);
      const departure = activeFp.getSegment(wtsdk.SegmentType.Departure);
      if (departure !== FlightPlanSegment.Empty && activeIndex < departure.offset + departure.waypoints.length) {
        return FlightArea.Terminal;
      }
      if (arrival !== FlightPlanSegment.Empty && activeIndex >= arrival.offset && activeIndex < arrival.offset + arrival.waypoints.length) {
        return FlightArea.Terminal;
      }
      if (appr !== FlightPlanSegment.Empty && activeIndex >= appr.offset && activeIndex < appr.offset + appr.waypoints.length && activeFp.finalApproachActive) {
        const apprType = activeFp.procedureDetails.approachType;
        switch (apprType) {
          case ApproachType.APPROACH_TYPE_ILS:
            return FlightArea.PrecisionApproach;
          case ApproachType.APPROACH_TYPE_GPS:
          case ApproachType.APPROACH_TYPE_RNAV:
            return FlightArea.GpsApproach;
          case ApproachType.APPROACH_TYPE_VOR:
          case ApproachType.APPROACH_TYPE_VORDME:
            return FlightArea.VorApproach;
          default:
            return FlightArea.NonPrecisionApproach;
        }
      }
      return FlightArea.Enroute;
    }
  }
  _defineProperty(FlightPlanManager, "DEBUG_INSTANCE", void 0);
  _defineProperty(FlightPlanManager, "FlightPlanKey", 'A32NX.FlightPlan');
  _defineProperty(FlightPlanManager, "FlightPlanCompressedKey", 'A32NX.FlightPlan.Compressed');
  _defineProperty(FlightPlanManager, "FlightPlanVersionKey", 'L:A32NX.FlightPlan.Version');

  function canInitiateDes(distanceToDestination) {
    const fl = Math.round(Simplane.getAltitude() / 100);
    const fcuSelFl = Simplane.getAutoPilotDisplayedAltitudeLockValue('feet') / 100;
    const cruiseFl = SimVar.GetSimVarValue('L:AIRLINER_CRUISE_ALTITUDE', 'number') / 100;

    // Can initiate descent? OR Can initiate early descent?
    return (distanceToDestination < 200 || fl < 200) && fcuSelFl < cruiseFl && fcuSelFl < fl || distanceToDestination >= 200 && fl > 200 && fcuSelFl <= 200;
  }
  class FlightPhaseManager {
    constructor() {
      _defineProperty(this, "onGroundConfirmationNode", new logic.ConfirmationNode(30 * 1000));
      _defineProperty(this, "activePhase", this.initialPhase || flightphase.FmgcFlightPhase.Preflight);
      _defineProperty(this, "phases", {
        [flightphase.FmgcFlightPhase.Preflight]: new Phase.PreFlightPhase(),
        [flightphase.FmgcFlightPhase.Takeoff]: new Phase.TakeOffPhase(),
        [flightphase.FmgcFlightPhase.Climb]: new Phase.ClimbPhase(),
        [flightphase.FmgcFlightPhase.Cruise]: new Phase.CruisePhase(),
        [flightphase.FmgcFlightPhase.Descent]: new Phase.DescentPhase(),
        [flightphase.FmgcFlightPhase.Approach]: new Phase.ApproachPhase(),
        [flightphase.FmgcFlightPhase.GoAround]: new Phase.GoAroundPhase(),
        [flightphase.FmgcFlightPhase.Done]: new Phase.DonePhase()
      });
      _defineProperty(this, "phaseChangeListeners", []);
    }
    get phase() {
      return this.activePhase;
    }
    get initialPhase() {
      return SimVar.GetSimVarValue('L:B77RS_INITIAL_FLIGHT_PHASE', 'number');
    }
    init() {
      console.log("FMGC Flight Phase: ".concat(this.phase));
      this.phases[this.phase].init();
      this.changePhase(this.activePhase);
    }
    shouldActivateNextPhase(_deltaTime) {
      // process transitions only when plane is ready
      if (flightphase.isReady() && !flightphase.isSlewActive()) {
        if (this.shouldActivateDonePhase(_deltaTime)) {
          this.changePhase(flightphase.FmgcFlightPhase.Done);
        } else if (this.phases[this.phase].shouldActivateNextPhase(_deltaTime)) {
          this.changePhase(this.phases[this.phase].nextPhase);
        }
      } else if (flightphase.isReady() && flightphase.isSlewActive()) {
        this.handleSlewSituation(_deltaTime);
      } else if (this.activePhase !== this.initialPhase) {
        // ensure correct init of phase
        this.activePhase = this.initialPhase;
        this.changePhase(this.initialPhase);
      }
    }
    addOnPhaseChanged(cb) {
      this.phaseChangeListeners.push(cb);
    }
    handleFcuAltKnobPushPull(distanceToDestination) {
      switch (this.phase) {
        case flightphase.FmgcFlightPhase.Takeoff:
          this.changePhase(flightphase.FmgcFlightPhase.Climb);
          break;
        case flightphase.FmgcFlightPhase.Climb:
        case flightphase.FmgcFlightPhase.Cruise:
          if (canInitiateDes(distanceToDestination)) {
            this.changePhase(flightphase.FmgcFlightPhase.Descent);
          }
          break;
      }
    }
    handleFcuAltKnobTurn(distanceToDestination) {
      if (this.phase === flightphase.FmgcFlightPhase.Cruise) {
        const activeVerticalMode = SimVar.GetSimVarValue('L:B77RS_FMA_VERTICAL_MODE', 'Enum');
        const VS = SimVar.GetSimVarValue('L:B77RS_AUTOPILOT_VS_SELECTED', 'feet per minute');
        const FPA = SimVar.GetSimVarValue('L:B77RS_AUTOPILOT_FPA_SELECTED', 'Degrees');
        if ((activeVerticalMode === autopilot.VerticalMode.OP_DES || activeVerticalMode === autopilot.VerticalMode.VS && VS < 0 || activeVerticalMode === autopilot.VerticalMode.FPA && FPA < 0 || activeVerticalMode === autopilot.VerticalMode.DES) && canInitiateDes(distanceToDestination)) {
          this.changePhase(flightphase.FmgcFlightPhase.Descent);
        }
      }
    }
    handleFcuVSKnob(distanceToDestination, onStepClimbDescent) {
      if (this.phase === flightphase.FmgcFlightPhase.Climb || this.phase === flightphase.FmgcFlightPhase.Cruise) {
        /** a timeout of 100ms is required in order to receive the updated autopilot vertical mode */
        setTimeout(() => {
          const activeVerticalMode = SimVar.GetSimVarValue('L:B77RS_FMA_VERTICAL_MODE', 'Enum');
          const VS = SimVar.GetSimVarValue('L:B77RS_AUTOPILOT_VS_SELECTED', 'feet per minute');
          const FPA = SimVar.GetSimVarValue('L:B77RS_AUTOPILOT_FPA_SELECTED', 'Degrees');
          if (activeVerticalMode === autopilot.VerticalMode.VS && VS < 0 || activeVerticalMode === autopilot.VerticalMode.FPA && FPA < 0) {
            if (canInitiateDes(distanceToDestination)) {
              this.changePhase(flightphase.FmgcFlightPhase.Descent);
            } else {
              onStepClimbDescent();
            }
          }
        }, 100);
      }
    }
    handleNewCruiseAltitudeEntered(newCruiseFlightLevel) {
      const currentFlightLevel = Math.round(SimVar.GetSimVarValue('INDICATED ALTITUDE:3', 'feet') / 100);
      if (this.activePhase === flightphase.FmgcFlightPhase.Approach) {
        this.changePhase(flightphase.FmgcFlightPhase.Climb);
      } else if (currentFlightLevel < newCruiseFlightLevel && this.activePhase === flightphase.FmgcFlightPhase.Descent) {
        this.changePhase(flightphase.FmgcFlightPhase.Climb);
      } else if (currentFlightLevel > newCruiseFlightLevel && (this.activePhase === flightphase.FmgcFlightPhase.Climb || this.activePhase === flightphase.FmgcFlightPhase.Descent)) {
        this.changePhase(flightphase.FmgcFlightPhase.Cruise);
      }
    }
    handleNewDestinationAirportEntered() {
      if (this.activePhase === flightphase.FmgcFlightPhase.GoAround) {
        const accAlt = SimVar.GetSimVarValue('L:AIRLINER_ACC_ALT_GOAROUND', 'Number');
        if (Simplane.getAltitude() > accAlt) {
          this.changePhase(flightphase.FmgcFlightPhase.Climb);
        }
      }
    }
    changePhase(newPhase) {
      const prevPhase = this.phase;
      console.log("FMGC Flight Phase: ".concat(prevPhase, " => ").concat(newPhase));
      this.activePhase = newPhase;
      SimVar.SetSimVarValue('L:B77RS_FMGC_FLIGHT_PHASE', 'number', newPhase);
      // Updating old SimVar to ensure backwards compatibility
      SimVar.SetSimVarValue('L:AIRLINER_FLIGHT_PHASE', 'number', newPhase < flightphase.FmgcFlightPhase.Takeoff ? flightphase.FmgcFlightPhase.Preflight : newPhase + 1);
      this.phases[this.phase].init();
      for (const pcl of this.phaseChangeListeners) {
        pcl(prevPhase, newPhase);
      }
      this.shouldActivateNextPhase(0);
    }
    tryGoInApproachPhase() {
      if (this.phase === flightphase.FmgcFlightPhase.Preflight || this.phase === flightphase.FmgcFlightPhase.Takeoff || this.phase === flightphase.FmgcFlightPhase.Done) {
        return false;
      }
      if (this.phase !== flightphase.FmgcFlightPhase.Approach) {
        this.changePhase(flightphase.FmgcFlightPhase.Approach);
      }
      return true;
    }
    shouldActivateDonePhase(_deltaTime) {
      this.onGroundConfirmationNode.input = flightphase.isOnGround();
      this.onGroundConfirmationNode.update(_deltaTime);
      return this.onGroundConfirmationNode.output && !flightphase.isAnEngineOn() && this.phase !== flightphase.FmgcFlightPhase.Done && this.phase !== flightphase.FmgcFlightPhase.Preflight;
    }
    handleSlewSituation(_deltaTime) {
      switch (this.phase) {
        case flightphase.FmgcFlightPhase.Preflight:
        case flightphase.FmgcFlightPhase.Takeoff:
        case flightphase.FmgcFlightPhase.Done:
          if (Simplane.getAltitudeAboveGround() >= 1500) {
            this.changePhase(flightphase.FmgcFlightPhase.Climb);
          }
          break;
      }
    }
  }

  const flightPhaseManager = new FlightPhaseManager();
  function getFlightPhaseManager() {
    return flightPhaseManager;
  }

  // Copyright (c) 2021-2022 FlyByWire Simulations
  // Copyright (c) 2021-2022 Synaptic Simulations
  //
  // SPDX-License-Identifier: GPL-3.0

  /**
   * This enum represents a Control Law selected by the guidance system.
   */
  let ControlLaw;
  (function (ControlLaw) {
    ControlLaw[ControlLaw["HEADING"] = 1] = "HEADING";
    ControlLaw[ControlLaw["TRACK"] = 2] = "TRACK";
    ControlLaw[ControlLaw["LATERAL_PATH"] = 3] = "LATERAL_PATH";
  })(ControlLaw || (ControlLaw = {}));
  let RequestedVerticalMode;
  (function (RequestedVerticalMode) {
    RequestedVerticalMode[RequestedVerticalMode["None"] = 0] = "None";
    RequestedVerticalMode[RequestedVerticalMode["SpeedThrust"] = 1] = "SpeedThrust";
    RequestedVerticalMode[RequestedVerticalMode["VpathThrust"] = 2] = "VpathThrust";
    RequestedVerticalMode[RequestedVerticalMode["VpathSpeed"] = 3] = "VpathSpeed";
    RequestedVerticalMode[RequestedVerticalMode["FpaSpeed"] = 4] = "FpaSpeed";
    RequestedVerticalMode[RequestedVerticalMode["VsSpeed"] = 5] = "VsSpeed";
  })(RequestedVerticalMode || (RequestedVerticalMode = {}));

  function isGuidableCapturingPath(guidable) {
    return !(guidable instanceof CA.CALeg || guidable instanceof CI.CILeg || guidable instanceof CR.CRLeg || guidable instanceof VM.VMLeg || guidable instanceof CourseCaptureTransition.CourseCaptureTransition);
  }
  class Geometry {
    /**
     * The list of transitions between legs.
     * - entry n: transition after leg n
     */

    /**
     * The list of legs in this geometry, possibly connected through transitions:
     * - entry n: nth leg, before transition n
     */

    constructor(transitions, legs, temp) {
      this.temp = temp;
      _defineProperty(this, "transitions", void 0);
      _defineProperty(this, "legs", void 0);
      _defineProperty(this, "version", 0);
      _defineProperty(this, "listener", RegisterViewListener('JS_LISTENER_SIMVARS', null, true));
      _defineProperty(this, "isComputed", false);
      _defineProperty(this, "cachedVectors", []);
      _defineProperty(this, "cachedVectorsVersion", 0);
      this.transitions = transitions;
      this.legs = legs;
    }
    getAllPathVectors(activeLegIndex) {
      if (this.version === this.cachedVectorsVersion) {
        return this.cachedVectors;
      }
      const transmitHoldEntry = !this.temp;
      const ret = [];
      for (const [index, leg] of this.legs.entries()) {
        if (leg.isNull) {
          continue;
        }

        // TODO don't transmit any course reversals when this side range >= 160
        const transmitCourseReversal = LnavConfig.LnavConfig.DEBUG_FORCE_INCLUDE_COURSE_REVERSAL_VECTORS || index === activeLegIndex || index === activeLegIndex + 1;
        if (activeLegIndex !== undefined) {
          if (legs.isCourseReversalLeg(leg) && !transmitCourseReversal) {
            continue;
          }
          if (index < activeLegIndex) {
            continue;
          }
        }
        const legInboundTransition = leg.inboundGuidable instanceof Transition.Transition ? leg.inboundGuidable : null;
        if (legInboundTransition && !legInboundTransition.isNull && (!legs.isHold(leg) || transmitHoldEntry)) {
          ret.push(...legInboundTransition.predictedPath);
        }
        if (leg) {
          ret.push(...leg.predictedPath);
        }
      }
      this.cachedVectors = ret;
      this.cachedVectorsVersion = this.version;
      return ret;
    }

    /**
     * Recomputes the guidable using new parameters
     *
     * @param tas             predicted true airspeed speed of the current leg (for a leg) or the next leg (for a transition) in knots
     * @param gs              predicted ground speed of the current leg
     * @param ppos            present position coordinates
     * @param trueTrack       present true track
     * @param activeLegIdx    current active leg index
     * @param activeTransIdx  current active transition index
     */
    recomputeWithParameters(tas, gs, ppos, trueTrack, activeLegIdx, _activeTransIdx) {
      this.version++;
      if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
        console.log("[FMS/Geometry] Recomputing geometry with current_tas: ".concat(tas, "kts"));
        console.time('geometry_recompute');
      }
      for (let i = activeLegIdx !== null && activeLegIdx !== void 0 ? activeLegIdx : 0; this.legs.get(i) || this.legs.get(i + 1); i++) {
        if (!this.legs.has(i)) {
          continue;
        }
        const leg = this.legs.get(i);
        const wasNull = leg.isNull;
        this.computeLeg(i, activeLegIdx, ppos, trueTrack, tas, gs);

        // If a leg became null/not null, we immediately recompute it to calculate the new guidables and transitions
        if (!wasNull && leg.isNull || wasNull && !leg.isNull) {
          this.computeLeg(i, activeLegIdx, ppos, trueTrack, tas, gs);
        }
      }
      if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
        console.timeEnd('geometry_recompute');
      }
    }
    static getLegPredictedTas(leg, currentTas) {
      var _leg$predictedTas;
      return Math.max(LnavConfig.LnavConfig.DEFAULT_MIN_PREDICTED_TAS, (_leg$predictedTas = leg.predictedTas) !== null && _leg$predictedTas !== void 0 ? _leg$predictedTas : currentTas);
    }
    static getLegPredictedGs(leg, currentGs) {
      var _leg$predictedGs;
      return Math.max(LnavConfig.LnavConfig.DEFAULT_MIN_PREDICTED_TAS, (_leg$predictedGs = leg.predictedGs) !== null && _leg$predictedGs !== void 0 ? _leg$predictedGs : currentGs);
    }
    computeLeg(index, activeLegIdx, ppos, trueTrack, tas, gs) {
      const prevLeg = this.legs.get(index - 1);
      const leg = this.legs.get(index);
      const nextLeg = this.legs.get(index + 1);
      const nextNextLeg = this.legs.get(index + 2);
      const inboundTransition = this.transitions.get(index - 1);
      const outboundTransition = this.transitions.get(index);
      const legPredictedTas = Geometry.getLegPredictedTas(leg, tas);
      const legPredictedGs = Geometry.getLegPredictedGs(leg, gs);

      // If the leg is null, we compute the following:
      //  - transition from prevLeg to nextLeg
      //  - nextLeg
      //  - transition from nextLeg to nextNextLeg (in order to compute nextLeg)
      if (leg !== null && leg !== void 0 && leg.isNull) {
        if (nextLeg) {
          var _newInboundTransition, _newOutboundTransitio;
          let newInboundTransition;
          if (LnavConfig.LnavConfig.NUM_COMPUTED_TRANSITIONS_AFTER_ACTIVE === -1 || index - activeLegIdx < LnavConfig.LnavConfig.NUM_COMPUTED_TRANSITIONS_AFTER_ACTIVE) {
            newInboundTransition = TransitionPicker.TransitionPicker.forLegs(prevLeg, nextLeg);
          }
          let newOutboundTransition;
          if (nextNextLeg && LnavConfig.LnavConfig.NUM_COMPUTED_TRANSITIONS_AFTER_ACTIVE === -1 || index + 1 - activeLegIdx < LnavConfig.LnavConfig.NUM_COMPUTED_TRANSITIONS_AFTER_ACTIVE) {
            newOutboundTransition = TransitionPicker.TransitionPicker.forLegs(nextLeg, nextNextLeg);
          }
          if (newInboundTransition && prevLeg) {
            const prevLegPredictedLegTas = Geometry.getLegPredictedTas(prevLeg, tas);
            const prevLegPredictedLegGs = Geometry.getLegPredictedGs(prevLeg, gs);
            newInboundTransition.setNeighboringGuidables(prevLeg, nextLeg);
            newInboundTransition.recomputeWithParameters(activeLegIdx === index, prevLegPredictedLegTas, prevLegPredictedLegGs, ppos, trueTrack);
          }
          const nextLegPredictedLegTas = Geometry.getLegPredictedTas(nextLeg, tas);
          const nextLegPredictedLegGs = Geometry.getLegPredictedGs(nextLeg, gs);
          nextLeg.setNeighboringGuidables((_newInboundTransition = newInboundTransition) !== null && _newInboundTransition !== void 0 ? _newInboundTransition : prevLeg, (_newOutboundTransitio = newOutboundTransition) !== null && _newOutboundTransitio !== void 0 ? _newOutboundTransitio : nextNextLeg);
          nextLeg.recomputeWithParameters(activeLegIdx === index, nextLegPredictedLegTas, nextLegPredictedLegGs, ppos, trueTrack);
          if (newOutboundTransition) {
            newOutboundTransition.setNeighboringGuidables(nextLeg, nextNextLeg);
            newOutboundTransition.recomputeWithParameters(activeLegIdx === index + 1, nextLegPredictedLegTas, nextLegPredictedLegGs, ppos, trueTrack);
            nextLeg.recomputeWithParameters(activeLegIdx === index, nextLegPredictedLegTas, nextLegPredictedLegGs, ppos, trueTrack);
          }
        }
      }
      if (inboundTransition && prevLeg) {
        const prevLegPredictedLegTas = Geometry.getLegPredictedTas(prevLeg, tas);
        const prevLegPredictedLegGs = Geometry.getLegPredictedGs(prevLeg, gs);
        inboundTransition.setNeighboringGuidables(prevLeg, leg);
        inboundTransition.setNeighboringLegs(prevLeg, leg);
        inboundTransition.recomputeWithParameters(activeLegIdx === index, prevLegPredictedLegTas, prevLegPredictedLegGs, ppos, trueTrack);
      }

      // Compute leg and outbound if previous leg isn't null (we already computed 1 leg forward the previous iteration)
      if (!(prevLeg && prevLeg.isNull)) {
        leg.setNeighboringGuidables(inboundTransition !== null && inboundTransition !== void 0 ? inboundTransition : prevLeg, outboundTransition !== null && outboundTransition !== void 0 ? outboundTransition : nextLeg);
        leg.recomputeWithParameters(activeLegIdx === index, legPredictedTas, legPredictedGs, ppos, trueTrack);
        if (outboundTransition && nextLeg) {
          outboundTransition.setNeighboringGuidables(leg, nextLeg);
          outboundTransition.setNeighboringLegs(leg, nextLeg);
          outboundTransition.recomputeWithParameters(activeLegIdx === index + 1, legPredictedTas, legPredictedGs, ppos, trueTrack);

          // Since the outbound transition can have TAD, we recompute the leg again to make sure the end point is at the right place for this cycle
          leg.setNeighboringGuidables(inboundTransition !== null && inboundTransition !== void 0 ? inboundTransition : prevLeg, outboundTransition);
          leg.recomputeWithParameters(activeLegIdx === index, legPredictedTas, legPredictedGs, ppos, trueTrack);
        }
      }
    }

    /**
     * @param activeLegIdx
     * @param ppos
     * @param trueTrack
     * @param gs
     * @param tas
     */
    getGuidanceParameters(activeLegIdx, ppos, trueTrack, gs, tas) {
      const activeLeg = this.legs.get(activeLegIdx);
      const nextLeg = this.legs.get(activeLegIdx + 1);

      // TODO handle in guidance controller state
      const autoSequencing = !(activeLeg !== null && activeLeg !== void 0 && activeLeg.disableAutomaticSequencing);
      let activeGuidable = null;
      let nextGuidable = null;

      // first, check if we're abeam with one of the transitions (start or end)
      const fromTransition = this.transitions.get(activeLegIdx - 1);
      const toTransition = this.transitions.get(activeLegIdx);
      if (fromTransition && !fromTransition.isNull && fromTransition.isAbeam(ppos)) {
        if (!fromTransition.isFrozen) {
          fromTransition.freeze();
        }

        // Since CA leg CourseCaptureTransition inbound starts at PPOS, we always consider the CA leg as the active guidable
        if (fromTransition instanceof CourseCaptureTransition.CourseCaptureTransition && activeLeg instanceof CA.CALeg) {
          activeGuidable = activeLeg;
          nextGuidable = toTransition;
        } else {
          activeGuidable = fromTransition;
          nextGuidable = activeLeg;
        }
      } else if (toTransition && !toTransition.isNull && autoSequencing) {
        // TODO need to check that the previous leg is actually flown first...
        if (toTransition.isAbeam(ppos)) {
          if (toTransition instanceof FixedRadiusTransition.FixedRadiusTransition && !toTransition.isFrozen) {
            toTransition.freeze();
          }
          activeGuidable = toTransition;
          nextGuidable = nextLeg;
        } else if (activeLeg) {
          activeGuidable = activeLeg;
          nextGuidable = toTransition;
        }
      } else if (activeLeg) {
        activeGuidable = activeLeg;
        if (nextLeg && autoSequencing) {
          nextGuidable = nextLeg;
        }
      }

      // figure out guidance params and roll anticipation
      let guidanceParams;
      let rad;
      let dtg;
      if (activeGuidable) {
        const phiLimit = CommonGeometry.maxBank(tas, isGuidableCapturingPath(activeGuidable));
        guidanceParams = _objectSpread2(_objectSpread2({}, activeGuidable.getGuidanceParameters(ppos, trueTrack, tas, gs)), {}, {
          phiLimit
        });
        dtg = activeGuidable.getDistanceToGo(ppos);
        if (activeGuidable && nextGuidable) {
          rad = this.getGuidableRollAnticipationDistance(gs, activeGuidable, nextGuidable);
          if (rad > 0 && dtg <= rad) {
            const nextGuidanceParams = nextGuidable.getGuidanceParameters(ppos, trueTrack, tas, gs);
            if (nextGuidanceParams.law === ControlLaw.LATERAL_PATH) {
              var _nextGuidanceParams$p;
              guidanceParams.phiCommand = (_nextGuidanceParams$p = nextGuidanceParams === null || nextGuidanceParams === void 0 ? void 0 : nextGuidanceParams.phiCommand) !== null && _nextGuidanceParams$p !== void 0 ? _nextGuidanceParams$p : 0;
            }
          }
        }
      }
      if (LnavConfig.LnavConfig.DEBUG_GUIDANCE) {
        var _crossTrackError$toFi, _crossTrackError, _trackAngleError$toFi, _trackAngleError, _phiCommand$toFixed, _phiCommand, _activeGuidable$repr, _activeGuidable, _dtg$toFixed, _dtg, _nextGuidable$repr, _nextGuidable, _rad$toFixed, _rad, _this$legs$get$repr, _this$legs$get, _this$transitions$get, _this$transitions$get2, _this$legs$get$repr2, _this$legs$get2, _this$transitions$get3, _this$transitions$get4, _this$legs$get$repr3, _this$legs$get3;
        this.listener.triggerToAllSubscribers('B77RS_FM_DEBUG_LNAV_STATUS',
        // eslint-disable-next-line prefer-template
        'B77RS FMS LNAV STATUS\n' + "XTE ".concat((_crossTrackError$toFi = (_crossTrackError = guidanceParams.crossTrackError) === null || _crossTrackError === void 0 ? void 0 : _crossTrackError.toFixed(3)) !== null && _crossTrackError$toFi !== void 0 ? _crossTrackError$toFi : '(NO DATA)', "\n") + "TAE ".concat((_trackAngleError$toFi = (_trackAngleError = guidanceParams.trackAngleError) === null || _trackAngleError === void 0 ? void 0 : _trackAngleError.toFixed(3)) !== null && _trackAngleError$toFi !== void 0 ? _trackAngleError$toFi : '(NO DATA)', "\n") + "PHI ".concat((_phiCommand$toFixed = (_phiCommand = guidanceParams.phiCommand) === null || _phiCommand === void 0 ? void 0 : _phiCommand.toFixed(5)) !== null && _phiCommand$toFixed !== void 0 ? _phiCommand$toFixed : '(NO DATA)', "\n") + '---\n' + "CURR GUIDABLE ".concat((_activeGuidable$repr = (_activeGuidable = activeGuidable) === null || _activeGuidable === void 0 ? void 0 : _activeGuidable.repr) !== null && _activeGuidable$repr !== void 0 ? _activeGuidable$repr : '---', "\n") + "CURR GUIDABLE DTG ".concat((_dtg$toFixed = (_dtg = dtg) === null || _dtg === void 0 ? void 0 : _dtg.toFixed(3)) !== null && _dtg$toFixed !== void 0 ? _dtg$toFixed : '---', "\n") + (activeGuidable instanceof DirectToFixTransition.DirectToFixTransition ? "DFX STATE ".concat(DirectToFixTransition.DirectToFixTransitionGuidanceState[activeGuidable.state], "\n") : '') + '---\n' + "RAD GUIDABLE ".concat((_nextGuidable$repr = (_nextGuidable = nextGuidable) === null || _nextGuidable === void 0 ? void 0 : _nextGuidable.repr) !== null && _nextGuidable$repr !== void 0 ? _nextGuidable$repr : '---', "\n") + "RAD DISTANCE ".concat((_rad$toFixed = (_rad = rad) === null || _rad === void 0 ? void 0 : _rad.toFixed(3)) !== null && _rad$toFixed !== void 0 ? _rad$toFixed : '---', "\n") + '---\n' + "L0 ".concat((_this$legs$get$repr = (_this$legs$get = this.legs.get(activeLegIdx - 1)) === null || _this$legs$get === void 0 ? void 0 : _this$legs$get.repr) !== null && _this$legs$get$repr !== void 0 ? _this$legs$get$repr : '---', "\n") + "T0 ".concat((_this$transitions$get = (_this$transitions$get2 = this.transitions.get(activeLegIdx - 1)) === null || _this$transitions$get2 === void 0 ? void 0 : _this$transitions$get2.repr) !== null && _this$transitions$get !== void 0 ? _this$transitions$get : '---', "\n") + "L1 ".concat((_this$legs$get$repr2 = (_this$legs$get2 = this.legs.get(activeLegIdx)) === null || _this$legs$get2 === void 0 ? void 0 : _this$legs$get2.repr) !== null && _this$legs$get$repr2 !== void 0 ? _this$legs$get$repr2 : '---', "\n") + "T1 ".concat((_this$transitions$get3 = (_this$transitions$get4 = this.transitions.get(activeLegIdx)) === null || _this$transitions$get4 === void 0 ? void 0 : _this$transitions$get4.repr) !== null && _this$transitions$get3 !== void 0 ? _this$transitions$get3 : '---', "\n") + "L2 ".concat((_this$legs$get$repr3 = (_this$legs$get3 = this.legs.get(activeLegIdx + 1)) === null || _this$legs$get3 === void 0 ? void 0 : _this$legs$get3.repr) !== null && _this$legs$get$repr3 !== void 0 ? _this$legs$get$repr3 : '---', "\n"));
      }
      return guidanceParams;
    }
    getGuidableRollAnticipationDistance(gs, from, to) {
      if (!from.endsInCircularArc && !to.startsInCircularArc) {
        return 0;
      }

      // get nominal phi from previous and next leg
      const phiNominalFrom = from.endsInCircularArc ? from.getNominalRollAngle(gs) : 0;
      const phiNominalTo = to.startsInCircularArc ? to.getNominalRollAngle(gs) : 0;

      // TODO consider case where RAD > transition distance

      return Geometry.getRollAnticipationDistance(gs, phiNominalFrom, phiNominalTo);
    }
    static getRollAnticipationDistance(gs, bankA, bankB) {
      // calculate delta phi
      const deltaPhi = Math.abs(bankA - bankB);

      // calculate RAD
      const maxRollRate = 5; // deg / s, TODO picked off the wind
      const k2 = 0.0038;
      const rad = gs / 3600 * (Math.sqrt(1 + 2 * k2 * 9.81 * deltaPhi / maxRollRate) - 1) / (k2 * 9.81);
      return rad;
    }
    getDistanceToGo(activeLegIdx, ppos) {
      const activeLeg = this.legs.get(activeLegIdx);
      if (activeLeg) {
        return activeLeg.getDistanceToGo(ppos);
      }
      return null;
    }
    shouldSequenceLeg(activeLegIdx, ppos) {
      const activeLeg = this.legs.get(activeLegIdx);
      const inboundTransition = this.transitions.get(activeLegIdx - 1);

      // Restrict sequencing in cases where we are still in inbound transition. Make an exception for very short legs as the transition could be overshooting.
      if (!(inboundTransition !== null && inboundTransition !== void 0 && inboundTransition.isNull) && inboundTransition !== null && inboundTransition !== void 0 && inboundTransition.isAbeam(ppos) && activeLeg.distance > 0.01) {
        return false;
      }
      const dtg = activeLeg.getDistanceToGo(ppos);
      if (dtg <= 0 || activeLeg.isNull) {
        return true;
      }
      if (activeLeg) {
        return activeLeg.getDistanceToGo(ppos) < 0.001;
      }
      return false;
    }
    onLegSequenced(_sequencedLeg, nextLeg, followingLeg) {
      if (legs.isCourseReversalLeg(nextLeg) || legs.isCourseReversalLeg(followingLeg)) {
        this.version++;
      }
    }
    legsInSegment(segmentType) {
      const newMap = new Map();
      for (const entry of this.legs.entries()) {
        if (entry[1].segment === segmentType) {
          newMap.set(...entry);
        }
      }
      return newMap;
    }

    /**
     * Returns DTG for a complete leg path, taking into account transitions (including split FXR)
     *
     * @param ppos      present position
     * @param leg       the leg guidable
     * @param inbound   the inbound transition guidable, if present
     * @param outbound  the outbound transition guidable, if present
     */
    static completeLegPathDistanceToGo(ppos, leg, inbound, outbound) {
      const [, legPartLength, outboundTransLength] = Geometry.completeLegPathLengths(leg, inbound, outbound);
      if (outbound && outbound.isAbeam(ppos)) {
        return outbound.getDistanceToGo(ppos) - outbound.distance / 2; // Remove half of the transition length, since it is split (Type I)
      }

      if (inbound && inbound.isAbeam(ppos)) {
        return inbound.getDistanceToGo(ppos) + legPartLength + outboundTransLength;
      }
      return leg.getDistanceToGo(ppos) - (outbound && outbound instanceof FixedRadiusTransition.FixedRadiusTransition ? outbound.unflownDistance : 0) + outboundTransLength;
    }

    /**
     * Returns lengths of the different segments of a leg, taking into account transitions (including split FXR)
     *
     * @param leg       the leg guidable
     * @param inbound   the inbound transition guidable, if present
     * @param outbound  the outbound transition guidable, if present
     */
    static completeLegPathLengths(leg, inbound, outbound) {
      let inboundLength = 0;
      let outboundLength = 0;
      if (outbound) {
        if (outbound instanceof FixedRadiusTransition.FixedRadiusTransition) {
          // Type I transitions are split between the prev and next legs
          outboundLength = outbound.distance / 2;
        }
      }
      if (inbound) {
        if (inbound instanceof FixedRadiusTransition.FixedRadiusTransition) {
          // Type I transitions are split between the prev and next legs
          inboundLength = inbound.distance / 2;
        } else {
          inboundLength = inbound.distance;
        }
      }
      return [inboundLength, leg.distance, outboundLength];
    }
  }

  /**
   * This class will guide the aircraft by predicting a flight path and
   * calculating the autopilot inputs to follow the predicted flight path.
   */
  class GuidanceManager {
    constructor(flightPlanManager) {
      _defineProperty(this, "flightPlanManager", void 0);
      this.flightPlanManager = flightPlanManager;
    }

    /**
     * Returns a {@link Leg} from two {@link WayPoint} objects. Only for fpm v1.
     *
     * @param from      the FROM waypoint
     * @param to        the TO waypoint
     * @param toIndex   index of the TO waypoint
     * @param segment   flight plan segment
     *
     * @private
     */
    static legFromWaypoints(prevLeg, nextLeg, from, to, toIndex, segment) {
      var _to$additionalData;
      if ((to === null || to === void 0 ? void 0 : (_to$additionalData = to.additionalData) === null || _to$additionalData === void 0 ? void 0 : _to$additionalData.legType) === FSEnums$1.LegType.IF) {
        const editableData = legs.legMetadataFromMsfsWaypoint(to);
        if (prevLeg && prevLeg instanceof XF.XFLeg && !prevLeg.fix.endsInDiscontinuity) {
          return new TF.TFLeg(prevLeg.fix, to, editableData, segment);
        }
        return new IF.IFLeg(to, editableData, segment);
      }
      if (!from || !to) {
        return null;
      }
      const metadata = legs.legMetadataFromMsfsWaypoint(to);
      if (from.endsInDiscontinuity) {
        if ((to === null || to === void 0 ? void 0 : to.additionalData.legType) === FSEnums$1.LegType.CF || (to === null || to === void 0 ? void 0 : to.additionalData.legType) === FSEnums$1.LegType.TF) {
          return new IF.IFLeg(to, metadata, segment);
        }
        return null;
      }
      if (to.additionalData) {
        var _to$additionalData2, _to$additionalData3, _to$additionalData4;
        if (to.additionalData.legType === FSEnums$1.LegType.AF) {
          return new AF.AFLeg(to, to.additionalData.recommendedLocation, to.additionalData.rho, to.additionalData.thetaTrue, to.additionalData.course, metadata, segment);
        }
        if (to.additionalData.legType === FSEnums$1.LegType.CF) {
          return new CF.CFLeg(to, to.additionalData.course, metadata, segment);
        }
        if (to.additionalData.legType === FSEnums$1.LegType.DF) {
          return new DF.DFLeg(to, metadata, segment);
        }
        if (to.additionalData.legType === FSEnums$1.LegType.RF) {
          return new RF.RFLeg(from, to, to.additionalData.center, metadata, segment);
        }

        // FIXME VALeg should be implemented to give proper heading guidance
        if (to.additionalData.legType === FSEnums$1.LegType.CA || to.additionalData.legType === FSEnums$1.LegType.VA) {
          var _from$additionalData$;
          const course = to.additionalData.course;
          const altitude = to.additionalData.vectorsAltitude;
          const extraLength = ((_from$additionalData$ = from.additionalData.runwayLength) !== null && _from$additionalData$ !== void 0 ? _from$additionalData$ : 0) / (2 * 1852);
          return new CA.CALeg(course, altitude, metadata, segment, extraLength);
        }
        if (to.additionalData.legType === FSEnums$1.LegType.CI || to.additionalData.legType === FSEnums$1.LegType.VI) {
          if (!nextLeg) {
            return null;
          }
          const course = to.additionalData.course;
          return new CI.CILeg(course, nextLeg, metadata, segment);
        }
        if (to.additionalData.legType === FSEnums$1.LegType.CR) {
          // TODO clean this whole thing up
          const course = to.additionalData.course;
          const radial = to.additionalData.thetaTrue;
          const theta = to.additionalData.theta;
          const ident = WayPoint.formatIdentFromIcao(to.additionalData.recommendedIcao);
          const originObj = {
            coordinates: to.additionalData.recommendedLocation,
            ident,
            theta
          };
          return new CR.CRLeg(course, originObj, radial, metadata, segment);
        }
        if (((_to$additionalData2 = to.additionalData) === null || _to$additionalData2 === void 0 ? void 0 : _to$additionalData2.legType) === FSEnums$1.LegType.HA) {
          return new HX.HALeg(to, metadata, segment);
        }
        if (((_to$additionalData3 = to.additionalData) === null || _to$additionalData3 === void 0 ? void 0 : _to$additionalData3.legType) === FSEnums$1.LegType.HF) {
          return new HX.HFLeg(to, metadata, segment);
        }
        if (((_to$additionalData4 = to.additionalData) === null || _to$additionalData4 === void 0 ? void 0 : _to$additionalData4.legType) === FSEnums$1.LegType.HM) {
          return new HX.HMLeg(to, metadata, segment);
        }
        if (to.additionalData.legType === FSEnums$1.LegType.PI) {
          return new PI.PILeg(to, nextLeg, metadata, segment);
        }
      }
      if (to.isVectors) {
        return new VM.VMLeg(to.additionalData.course, metadata, segment);
      }
      return new TF.TFLeg(from, to, metadata, segment);
    }
    getLeg(prevLeg, nextLeg, index, flightPlanIndex) {
      const from = this.flightPlanManager.getWaypoint(index - 1, flightPlanIndex);
      const to = this.flightPlanManager.getWaypoint(index, flightPlanIndex);
      const segment = this.flightPlanManager.getSegmentFromWaypoint(to, flightPlanIndex).type;
      return GuidanceManager.legFromWaypoints(prevLeg, nextLeg, from, to, index, segment);
    }
    updateGeometry(geometry, flightPlanIndex, activeIdx, wptCount) {
      if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
        console.log('[Fms/Geometry/Update] Starting geometry update.');
      }
      for (let i = activeIdx - 1; i < wptCount; i++) {
        const prevLeg = geometry.legs.get(i - 1);
        const oldLeg = geometry.legs.get(i);
        const nextLeg = this.getLeg(prevLeg, null, i + 1, flightPlanIndex);
        const newLeg = this.getLeg(prevLeg, nextLeg, i, flightPlanIndex);
        if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
          var _oldLeg$repr, _newLeg$repr;
          console.log("[FMS/Geometry/Update] Old leg #".concat(i, " = ").concat((_oldLeg$repr = oldLeg === null || oldLeg === void 0 ? void 0 : oldLeg.repr) !== null && _oldLeg$repr !== void 0 ? _oldLeg$repr : '<none>'));
          console.log("[FMS/Geometry/Update] New leg #".concat(i, " = ").concat((_newLeg$repr = newLeg === null || newLeg === void 0 ? void 0 : newLeg.repr) !== null && _newLeg$repr !== void 0 ? _newLeg$repr : '<none>'));
        }
        const legsMatch = (oldLeg === null || oldLeg === void 0 ? void 0 : oldLeg.repr) === (newLeg === null || newLeg === void 0 ? void 0 : newLeg.repr);
        if (legsMatch) {
          if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
            console.log('[FMS/Geometry/Update] Old and new leg are the same. Keeping old leg.');
          }

          // Sync discontinuity info (FIXME until we have proper discontinuities)

          if (oldLeg instanceof XF.XFLeg && newLeg instanceof XF.XFLeg) {
            oldLeg.fix = newLeg.fix;
          }

          // Sync metadata

          if (oldLeg && newLeg) {
            oldLeg.metadata = _objectSpread2(_objectSpread2({}, oldLeg.metadata), newLeg.metadata);
          }
          const prevLeg = geometry.legs.get(i - 1);
          const oldInboundTransition = geometry.transitions.get(i - 1);
          const newInboundTransition = TransitionPicker.TransitionPicker.forLegs(prevLeg, newLeg);
          const transitionsMatch = (oldInboundTransition === null || oldInboundTransition === void 0 ? void 0 : oldInboundTransition.repr) === (newInboundTransition === null || newInboundTransition === void 0 ? void 0 : newInboundTransition.repr);
          if (!transitionsMatch) {
            geometry.transitions.set(i - 1, newInboundTransition);
          }
        } else {
          if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
            if (!oldLeg) console.log('[FMS/Geometry/Update] No old leg. Adding new leg.');else if (!newLeg) console.log('[FMS/Geometry/Update] No new leg. Removing old leg.');else console.log('[FMS/Geometry/Update] Old and new leg are different. Keeping new leg.');
          }
          if (newLeg) {
            geometry.legs.set(i, newLeg);
            const prevLeg = geometry.legs.get(i - 1);
            const computeAllTransitions = LnavConfig.LnavConfig.NUM_COMPUTED_TRANSITIONS_AFTER_ACTIVE === -1;
            if (prevLeg && (computeAllTransitions || i - activeIdx <= LnavConfig.LnavConfig.NUM_COMPUTED_TRANSITIONS_AFTER_ACTIVE)) {
              const newInboundTransition = TransitionPicker.TransitionPicker.forLegs(prevLeg, newLeg);
              if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
                var _newInboundTransition;
                console.log("[FMS/Geometry/Update] Set new inbound transition for new leg (".concat((_newInboundTransition = newInboundTransition === null || newInboundTransition === void 0 ? void 0 : newInboundTransition.repr) !== null && _newInboundTransition !== void 0 ? _newInboundTransition : '<none>', ")"));
              }
              if (newInboundTransition) {
                geometry.transitions.set(i - 1, newInboundTransition);
              } else {
                geometry.transitions.delete(i - 1);
              }
            } else {
              geometry.transitions.delete(i - 1);
            }
          } else {
            geometry.legs.delete(i);
            geometry.transitions.delete(i - 1);
            geometry.transitions.delete(i);
          }
        }
      }

      // Trim geometry

      for (const [index] of geometry.legs.entries()) {
        const legBeforePrev = index < activeIdx - 1;
        const legAfterLastWpt = index >= wptCount;
        if (legBeforePrev || legAfterLastWpt) {
          if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
            var _geometry$legs$get$re, _geometry$legs$get;
            console.log("[FMS/Geometry/Update] Removed leg #".concat(index, " (").concat((_geometry$legs$get$re = (_geometry$legs$get = geometry.legs.get(index)) === null || _geometry$legs$get === void 0 ? void 0 : _geometry$legs$get.repr) !== null && _geometry$legs$get$re !== void 0 ? _geometry$legs$get$re : '<unknown>', ") because of trimming."));
          }
          geometry.legs.delete(index);
          geometry.transitions.delete(index - 1);
        }
      }
      if (LnavConfig.LnavConfig.DEBUG_GEOMETRY) {
        console.log('[Fms/Geometry/Update] Done with geometry update.');
      }
    }

    /**
     * The full leg path geometry, used for the ND and predictions on the F-PLN page.
     */
    getMultipleLegGeometry(temp) {
      if (temp) {
        if (this.flightPlanManager.getFlightPlan(1) === undefined) {
          return undefined;
        }
      }
      const activeIdx = temp ? this.flightPlanManager.getFlightPlan(1).activeWaypointIndex : this.flightPlanManager.getCurrentFlightPlan().activeWaypointIndex;
      const legs = new Map();
      const transitions = new Map();
      const wpCount = temp ? this.flightPlanManager.getFlightPlan(1).length : this.flightPlanManager.getCurrentFlightPlan().length;
      for (let i = activeIdx - 1; i < wpCount; i++) {
        // Leg
        const prevLeg = legs.get(i - 1);
        const nextLeg = this.getLeg(prevLeg, null, i + 1, temp ? FlightPlans.Temporary : FlightPlans.Active);
        const currentLeg = this.getLeg(prevLeg, nextLeg, i, temp ? FlightPlans.Temporary : FlightPlans.Active);
        if (currentLeg) {
          legs.set(i, currentLeg);
        }

        // Transition
        const transition = TransitionPicker.TransitionPicker.forLegs(prevLeg, currentLeg);
        if (transition) {
          transitions.set(i - 1, transition);
        }
      }
      return new Geometry(transitions, legs, temp);
    }
  }

  /**
   * Represents the current turn state of the LNAV driver
   */
  let LnavTurnState;
  (function (LnavTurnState) {
    LnavTurnState[LnavTurnState["Normal"] = 0] = "Normal";
    LnavTurnState[LnavTurnState["ForceLeftTurn"] = 1] = "ForceLeftTurn";
    LnavTurnState[LnavTurnState["ForceRightTurn"] = 2] = "ForceRightTurn";
  })(LnavTurnState || (LnavTurnState = {}));
  class LnavDriver {
    constructor(guidanceController) {
      _defineProperty(this, "guidanceController", void 0);
      _defineProperty(this, "lastAvail", void 0);
      _defineProperty(this, "lastLaw", void 0);
      _defineProperty(this, "lastXTE", void 0);
      _defineProperty(this, "lastTAE", void 0);
      _defineProperty(this, "lastPhi", void 0);
      _defineProperty(this, "turnState", LnavTurnState.Normal);
      _defineProperty(this, "ppos", new LatLongAlt());
      _defineProperty(this, "listener", RegisterViewListener('JS_LISTENER_SIMVARS', null, true));
      this.guidanceController = guidanceController;
      this.lastAvail = null;
      this.lastLaw = null;
      this.lastXTE = null;
      this.lastTAE = null;
      this.lastPhi = null;
    }
    init() {
      console.log('[FMGC/Guidance] LnavDriver initialized!');
    }
    update(_) {
      let available = false;
      this.ppos.lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      this.ppos.long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      const geometry = this.guidanceController.activeGeometry;
      const activeLegIdx = this.guidanceController.activeLegIndex;
      if (geometry && geometry.legs.size > 0) {
        const dtg = geometry.getDistanceToGo(this.guidanceController.activeLegIndex, this.ppos);
        const inboundTrans = geometry.transitions.get(activeLegIdx - 1);
        const activeLeg = geometry.legs.get(activeLegIdx);
        const outboundTrans = geometry.transitions.get(activeLegIdx) ? geometry.transitions.get(activeLegIdx) : null;
        if (!activeLeg) {
          if (LnavConfig.LnavConfig.DEBUG_GUIDANCE) {
            console.log('[FMS/LNAV] No leg at activeLegIdx!');
          }
          return;
        }
        let completeDisplayLegPathDtg;
        if (inboundTrans instanceof FixedRadiusTransition.FixedRadiusTransition && !inboundTrans.isNull) {
          if (inboundTrans.isAbeam(this.ppos)) {
            const inboundHalfDistance = inboundTrans.distance / 2;
            const inboundDtg = inboundTrans.getDistanceToGo(this.ppos);
            if (inboundDtg > inboundHalfDistance) {
              completeDisplayLegPathDtg = inboundDtg - inboundHalfDistance;
            }
          }
        }
        const completeLegPathDtg = Geometry$1.Geometry.completeLegPathDistanceToGo(this.ppos, activeLeg, inboundTrans, outboundTrans);
        this.guidanceController.activeLegDtg = dtg;
        this.guidanceController.activeLegCompleteLegPathDtg = completeLegPathDtg;
        this.guidanceController.displayActiveLegCompleteLegPathDtg = completeDisplayLegPathDtg;

        // Update activeTransIndex in GuidanceController
        if (inboundTrans && inboundTrans.isAbeam(this.ppos)) {
          this.guidanceController.activeTransIndex = activeLegIdx - 1;
        } else if (outboundTrans && outboundTrans.isAbeam(this.ppos)) {
          this.guidanceController.activeTransIndex = activeLegIdx;
        } else {
          this.guidanceController.activeTransIndex = -1;
        }

        // Pseudo waypoint sequencing

        // FIXME when we have a path model, we don't have to do any of this business ?
        // FIXME see PseudoWaypoints.ts:153 for why we also allow the previous leg
        const pseudoWaypointsOnActiveLeg = this.guidanceController.currentPseudoWaypoints.filter(it => it.alongLegIndex === activeLegIdx || it.alongLegIndex === activeLegIdx - 1);
        for (const pseudoWaypoint of pseudoWaypointsOnActiveLeg) {
          // FIXME as with the hack above, we use the dtg to the intermediate point of the transition instead of
          // completeLegPathDtg, since we are pretending the previous leg is still active
          let dtgToUse;
          if (inboundTrans instanceof FixedRadiusTransition.FixedRadiusTransition && pseudoWaypoint.alongLegIndex === activeLegIdx - 1) {
            const inboundHalfDistance = inboundTrans.distance / 2;
            const inboundDtg = inboundTrans.getDistanceToGo(this.ppos);
            if (inboundDtg > inboundHalfDistance) {
              dtgToUse = inboundDtg - inboundHalfDistance;
            } else {
              dtgToUse = completeLegPathDtg;
            }
          } else {
            dtgToUse = completeLegPathDtg;
          }
          if (pseudoWaypoint.distanceFromLegTermination >= dtgToUse) {
            this.guidanceController.sequencePseudoWaypoint(pseudoWaypoint);
          }
        }

        // Leg sequencing

        // TODO FIXME: Use FM position

        const trueTrack = SimVar.GetSimVarValue('GPS GROUND TRUE TRACK', 'degree');

        // this is not the correct groundspeed to use, but it will suffice for now
        const tas = SimVar.GetSimVarValue('AIRSPEED TRUE', 'Knots');
        const gs = SimVar.GetSimVarValue('GPS GROUND SPEED', 'knots');
        const params = geometry.getGuidanceParameters(activeLegIdx, this.ppos, trueTrack, gs, tas);
        if (params) {
          var _params$phiLimit;
          if (this.lastLaw !== params.law) {
            this.lastLaw = params.law;
            SimVar.SetSimVarValue('L:B77RS_FG_CURRENT_LATERAL_LAW', 'number', params.law);
          }

          // Send bank limit to FG
          const bankLimit = (_params$phiLimit = params === null || params === void 0 ? void 0 : params.phiLimit) !== null && _params$phiLimit !== void 0 ? _params$phiLimit : CommonGeometry.maxBank(tas, false);
          SimVar.SetSimVarValue('L:B77RS_FG_PHI_LIMIT', 'Degrees', bankLimit);
          switch (params.law) {
            case autopilot.ControlLaw.LATERAL_PATH:
              let {
                crossTrackError,
                trackAngleError,
                phiCommand
              } = params;

              // Update and take into account turn state; only guide using phi during a forced turn

              if (this.turnState !== LnavTurnState.Normal) {
                if (Math.abs(trackAngleError) < GuidanceConstants.GuidanceConstants.FORCED_TURN_TKAE_THRESHOLD) {
                  // Stop forcing turn
                  this.turnState = LnavTurnState.Normal;
                }
                const forcedTurnPhi = this.turnState === LnavTurnState.ForceLeftTurn ? -CommonGeometry.maxBank(tas, true) : CommonGeometry.maxBank(tas, true);
                crossTrackError = 0;
                trackAngleError = 0;
                phiCommand = forcedTurnPhi;
              }

              // Set FG inputs

              if (!this.lastAvail) {
                SimVar.SetSimVarValue('L:B77RS_FG_AVAIL', 'Bool', true);
                this.lastAvail = true;
              }
              if (crossTrackError !== this.lastXTE) {
                SimVar.SetSimVarValue('L:B77RS_FG_CROSS_TRACK_ERROR', 'nautical miles', crossTrackError);
                this.lastXTE = crossTrackError;
              }
              if (trackAngleError !== this.lastTAE) {
                SimVar.SetSimVarValue('L:B77RS_FG_TRACK_ANGLE_ERROR', 'degree', trackAngleError);
                this.lastTAE = trackAngleError;
              }
              if (phiCommand !== this.lastPhi) {
                SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', phiCommand);
                this.lastPhi = phiCommand;
              }
              break;
            case autopilot.ControlLaw.HEADING:
              const {
                heading,
                phiCommand: forcedPhiHeading
              } = params;
              if (!this.lastAvail) {
                SimVar.SetSimVarValue('L:B77RS_FG_AVAIL', 'Bool', true);
                this.lastAvail = true;
              }
              if (this.lastXTE !== 0) {
                SimVar.SetSimVarValue('L:B77RS_FG_CROSS_TRACK_ERROR', 'nautical miles', 0);
                this.lastXTE = 0;
              }

              // Track Angle Error
              const currentHeading = SimVar.GetSimVarValue('PLANE HEADING DEGREES TRUE', 'Degrees');
              const deltaHeading = MathUtils.MathUtils.diffAngle(currentHeading, heading);

              // Update and take into account turn state; only guide using phi during a forced turn

              if (this.turnState !== LnavTurnState.Normal) {
                if (Math.abs(deltaHeading) < GuidanceConstants.GuidanceConstants.FORCED_TURN_TKAE_THRESHOLD) {
                  // Stop forcing turn
                  this.turnState = LnavTurnState.Normal;
                }
                const forcedTurnPhi = this.turnState === LnavTurnState.ForceLeftTurn ? -CommonGeometry.maxBank(tas, true) : CommonGeometry.maxBank(tas, true);
                if (forcedTurnPhi !== this.lastPhi) {
                  SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', forcedTurnPhi);
                  this.lastPhi = forcedTurnPhi;
                }
                if (this.lastTAE !== 0) {
                  SimVar.SetSimVarValue('L:B77RS_FG_TRACK_ANGLE_ERROR', 'degree', 0);
                  this.lastTAE = 0;
                }
              } else {
                if (deltaHeading !== this.lastTAE) {
                  SimVar.SetSimVarValue('L:B77RS_FG_TRACK_ANGLE_ERROR', 'degree', deltaHeading);
                  this.lastTAE = deltaHeading;
                }
                if (forcedPhiHeading !== undefined) {
                  if (forcedPhiHeading !== this.lastPhi) {
                    SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', forcedPhiHeading);
                    this.lastPhi = forcedPhiHeading;
                  }
                } else if (this.lastPhi !== 0) {
                  SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', 0);
                  this.lastPhi = 0;
                }
              }
              break;
            case autopilot.ControlLaw.TRACK:
              const {
                course,
                phiCommand: forcedPhiCourse
              } = params;
              if (!this.lastAvail) {
                SimVar.SetSimVarValue('L:B77RS_FG_AVAIL', 'Bool', true);
                this.lastAvail = true;
              }
              if (this.lastXTE !== 0) {
                SimVar.SetSimVarValue('L:B77RS_FG_CROSS_TRACK_ERROR', 'nautical miles', 0);
                this.lastXTE = 0;
              }
              const deltaCourse = MathUtils.MathUtils.diffAngle(trueTrack, course);
              if (this.turnState !== LnavTurnState.Normal) {
                if (Math.abs(deltaCourse) < GuidanceConstants.GuidanceConstants.FORCED_TURN_TKAE_THRESHOLD) {
                  // Stop forcing turn
                  this.turnState = LnavTurnState.Normal;
                }
                const forcedTurnPhi = this.turnState === LnavTurnState.ForceLeftTurn ? -CommonGeometry.maxBank(tas, true) : CommonGeometry.maxBank(tas, true);
                if (forcedTurnPhi !== this.lastPhi) {
                  SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', forcedTurnPhi);
                  this.lastPhi = forcedTurnPhi;
                }
                if (this.lastTAE !== 0) {
                  SimVar.SetSimVarValue('L:B77RS_FG_TRACK_ANGLE_ERROR', 'degree', 0);
                  this.lastTAE = 0;
                }
              } else {
                if (deltaCourse !== this.lastTAE) {
                  SimVar.SetSimVarValue('L:B77RS_FG_TRACK_ANGLE_ERROR', 'degree', deltaCourse);
                  this.lastTAE = deltaCourse;
                }
                if (forcedPhiCourse !== undefined) {
                  if (forcedPhiCourse !== this.lastPhi) {
                    SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', forcedPhiCourse);
                    this.lastPhi = forcedPhiCourse;
                  }
                } else if (this.lastPhi !== 0) {
                  SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', 0);
                  this.lastPhi = 0;
                }
              }
              break;
          }
          available = true;
        }
        if (LnavConfig.LnavConfig.DEBUG_GUIDANCE) {
          SimVar.SetSimVarValue('L:B77RS_FM_TURN_STATE', 'Enum', this.turnState);
        }
        SimVar.SetSimVarValue('L:B77RS_GPS_WP_DISTANCE', 'nautical miles', dtg !== null && dtg !== void 0 ? dtg : 0);

        // Update EFIS active waypoint info

        this.updateEfisData(activeLeg, gs);

        // Sequencing

        const flightPhase = SimVar.GetSimVarValue('L:B77RS_FMGC_FLIGHT_PHASE', 'Enum');
        const canSequence = !activeLeg.disableAutomaticSequencing && flightPhase >= flightphase.FmgcFlightPhase.Takeoff;
        let withinSequencingArea = true;
        if (params.law === autopilot.ControlLaw.LATERAL_PATH) {
          withinSequencingArea = Math.abs(params.crossTrackError) < 7 && Math.abs(params.trackAngleError) < 90;
        }
        if (canSequence && withinSequencingArea && geometry.shouldSequenceLeg(activeLegIdx, this.ppos) || activeLeg.isNull) {
          const outboundTransition = geometry.transitions.get(activeLegIdx);
          const nextLeg = geometry.legs.get(activeLegIdx + 1);
          const followingLeg = geometry.legs.get(activeLegIdx + 2);
          if (nextLeg) {
            // FIXME we should stop relying on discos in the wpt objects, but for now it's fiiiiiine
            // Hard-coded check for TF leg after the disco for now - only case where we don't wanna
            // sequence this way is VM
            if (activeLeg instanceof XF.XFLeg && activeLeg.fix.endsInDiscontinuity) {
              this.sequenceDiscontinuity(activeLeg);
            } else {
              this.sequenceLeg(activeLeg, outboundTransition);
            }
            geometry.onLegSequenced(activeLeg, nextLeg, followingLeg);
          } else {
            this.sequenceDiscontinuity(activeLeg);
            geometry.onLegSequenced(activeLeg, nextLeg, followingLeg);
          }
        }
      }

      /* Set FG parameters */

      if (!available && this.lastAvail !== false) {
        SimVar.SetSimVarValue('L:B77RS_FG_AVAIL', 'Bool', false);
        SimVar.SetSimVarValue('L:B77RS_FG_CROSS_TRACK_ERROR', 'nautical miles', 0);
        SimVar.SetSimVarValue('L:B77RS_FG_TRACK_ANGLE_ERROR', 'degree', 0);
        SimVar.SetSimVarValue('L:B77RS_FG_PHI_COMMAND', 'degree', 0);
        this.lastAvail = false;
        this.lastTAE = null;
        this.lastXTE = null;
        this.lastPhi = null;
        this.turnState = LnavTurnState.Normal;
      }
    }

    /**
     * Updates the EFIS TO WPT data
     *
     * @param activeLeg currently active display leg
     * @param gs        current ground speed in knots
     *
     * @private
     */
    updateEfisData(activeLeg, gs) {
      const termination = activeLeg instanceof XF.XFLeg ? activeLeg.fix.infos.coordinates : activeLeg.getPathEndPoint();
      const efisBearing = termination ? B77RS_Util.trueToMagnetic(Avionics.Utils.computeGreatCircleHeading(this.ppos, termination), Facilities.getMagVar(this.ppos.lat, this.ppos.long)) : -1;

      // Don't compute distance and ETA for XM legs
      const efisDistance = activeLeg instanceof VM.VMLeg ? -1 : Avionics.Utils.computeGreatCircleDistance(this.ppos, termination);
      const efisEta = activeLeg instanceof VM.VMLeg ? -1 : LnavDriver.legEta(this.ppos, gs, termination);

      // FIXME should be NCD if no FM position

      SimVar.SetSimVarValue('L:B77RS_EFIS_L_TO_WPT_BEARING', 'Degrees', efisBearing);
      SimVar.SetSimVarValue('L:B77RS_EFIS_L_TO_WPT_DISTANCE', 'Number', efisDistance);
      SimVar.SetSimVarValue('L:B77RS_EFIS_L_TO_WPT_ETA', 'Seconds', efisEta);
      SimVar.SetSimVarValue('L:B77RS_EFIS_R_TO_WPT_BEARING', 'Degrees', efisBearing);
      SimVar.SetSimVarValue('L:B77RS_EFIS_R_TO_WPT_DISTANCE', 'Number', efisDistance);
      SimVar.SetSimVarValue('L:B77RS_EFIS_R_TO_WPT_ETA', 'Seconds', efisEta);
    }
    static legEta(ppos, gs, termination) {
      // FIXME use a more accurate estimate, calculate in predictions

      const UTC_SECONDS = Math.floor(SimVar.GetGlobalVarValue('ZULU TIME', 'seconds'));
      const nauticalMilesToGo = Avionics.Utils.computeGreatCircleDistance(ppos, termination);
      const secondsToGo = nauticalMilesToGo / Math.max(LnavConfig.LnavConfig.DEFAULT_MIN_PREDICTED_TAS, gs) * 3600;
      const eta = (UTC_SECONDS + secondsToGo) % (3600 * 24);
      return eta;
    }
    sequenceLeg(_leg, outboundTransition) {
      let wpIndex = this.guidanceController.flightPlanManager.getActiveWaypointIndex(false, false, 0);
      const wp = this.guidanceController.flightPlanManager.getActiveWaypoint(false, false, 0);
      console.log("[FMGC/Guidance] LNAV - sequencing leg. [WP: ".concat(wp.ident, " Active WP Index: ").concat(wpIndex, "]"));
      wp.waypointReachedAt = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
      this.guidanceController.flightPlanManager.setActiveWaypointIndex(++wpIndex, () => {}, 0);
      outboundTransition === null || outboundTransition === void 0 ? void 0 : outboundTransition.freeze();

      // Set turn state based on turn direction
      if (outboundTransition && (outboundTransition instanceof PathCaptureTransition.PathCaptureTransition || outboundTransition instanceof CourseCaptureTransition.CourseCaptureTransition)) {
        if (outboundTransition.turnDirection === FSEnums$1.TurnDirection.Left) {
          this.turnState = LnavTurnState.ForceLeftTurn;
        } else if (outboundTransition.turnDirection === FSEnums$1.TurnDirection.Right) {
          this.turnState = LnavTurnState.ForceRightTurn;
        } else {
          // Just to be safe
          this.turnState = LnavTurnState.Normal;
        }
      } else {
        this.turnState = LnavTurnState.Normal;
      }
    }
    sequenceDiscontinuity(_leg) {
      console.log('[FMGC/Guidance] LNAV - sequencing discontinuity');

      // Lateral mode is NAV
      const lateralModel = SimVar.GetSimVarValue('L:B77RS_FMA_LATERAL_MODE', 'Enum');
      const verticalMode = SimVar.GetSimVarValue('L:B77RS_FMA_VERTICAL_MODE', 'Enum');
      let reverted = false;
      if (lateralModel === autopilot.LateralMode.NAV) {
        // Set HDG (current heading)
        SimVar.SetSimVarValue('H:A320_Neo_FCU_HDG_PULL', 'number', 0);
        SimVar.SetSimVarValue('L:B77RS_AUTOPILOT_HEADING_SELECTED', 'number', Simplane.getHeadingMagnetic());
        reverted = true;
      }
      if (verticalMode === autopilot.VerticalMode.DES) {
        // revert to V/S
        SimVar.SetSimVarValue('H:A320_Neo_FCU_VS_PULL', 'number', 0);
        reverted = true;
      } else if (verticalMode === autopilot.VerticalMode.CLB) {
        // revert to OP CLB
        SimVar.SetSimVarValue('H:A320_Neo_FCU_ALT_PULL', 'number', 0);
        reverted = true;
      }
      if (reverted) {
        // Triple click
        Coherent.call('PLAY_INSTRUMENT_SOUND', '3click').catch(console.error);
      }
      this.sequenceLeg(_leg, null);
    }
    sequenceManual(_leg) {
      console.log('[FMGC/Guidance] LNAV - sequencing MANUAL');
    }
  }

  let FlapConf;
  (function (FlapConf) {
    FlapConf[FlapConf["CLEAN"] = 0] = "CLEAN";
    FlapConf[FlapConf["CONF_1"] = 1] = "CONF_1";
    FlapConf[FlapConf["CONF_2"] = 2] = "CONF_2";
    FlapConf[FlapConf["CONF_3"] = 3] = "CONF_3";
    FlapConf[FlapConf["CONF_FULL"] = 4] = "CONF_FULL";
  })(FlapConf || (FlapConf = {}));
  let AccelFactorMode;
  (function (AccelFactorMode) {
    AccelFactorMode[AccelFactorMode["CONSTANT_CAS"] = 0] = "CONSTANT_CAS";
    AccelFactorMode[AccelFactorMode["CONSTANT_MACH"] = 1] = "CONSTANT_MACH";
  })(AccelFactorMode || (AccelFactorMode = {}));
  let VerticalWaypointType;
  (function (VerticalWaypointType) {
    VerticalWaypointType[VerticalWaypointType["CRZ"] = 0] = "CRZ";
    VerticalWaypointType[VerticalWaypointType["CLB"] = 1] = "CLB";
    VerticalWaypointType[VerticalWaypointType["DES"] = 2] = "DES";
  })(VerticalWaypointType || (VerticalWaypointType = {}));
  class Common {
    /**
     * Calculates ISA temperature as a function of altitude
     * @param alt in feet
     * @param aboveTropo boolean
     * @returns ISA temperature in celsius
     */
    static getIsaTemp(alt) {
      let aboveTropo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (aboveTropo) {
        return -56.5;
      }
      return 15 - 0.0019812 * alt;
    }
    static getTemp(alt) {
      let isaDev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let aboveTropo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (aboveTropo) {
        return -56.5 + isaDev;
      }
      return 15 - 0.0019812 * alt + isaDev;
    }

    /**
     * Get temperature ratio for a particular altitude (below tropopause)
     * @param alt pressure altitude
     * @param isaDev ISA deviation in celsius
     * @param aboveTropo whether the aircraft is above the tropopause
     * @returns temperature ratio
     */
    static getTheta(alt) {
      let isaDev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let aboveTropo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (aboveTropo) {
        return (216.65 + isaDev) / 288.15;
      }
      return (288.15 - 0.0019812 * alt + isaDev) / 288.15;
    }

    /**
     * Get temperature ratio for a particular altitude and mach.
     * @param theta temperature ratio (from only altitude)
     * @param mach mach
     * @returns temperature ratio
     */
    static getTheta2(theta, mach) {
      return theta * (1 + 0.2 * mach ** 2);
    }

    /**
     * Get pressure ratio for a particular theta
     * @param alt pressure altitude
     * @param aboveTropo whether the aircraft is above the tropopause
     * @returns pressure ratio
     */
    static getDelta(alt) {
      let aboveTropo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (aboveTropo && alt !== undefined) {
        return 0.22336 * Math.exp((36089.24 - alt) / 20805.7);
      }
      return this.getTheta(alt, 0, aboveTropo) ** 5.25588;
    }

    /**
     * Get pressure ratio for a particular theta and mach
     * @param delta pressure ratio (from only theta)
     * @param mach mach
     * @returns pressure ratio
     */
    static getDelta2(delta, mach) {
      return delta * (1 + 0.2 * mach ** 2) ** 3.5;
    }

    /**
     * Get KTAS value from mach
     * @param mach
     * @param theta
     * @returns speed in KTAS (knots true airspeed)
     */
    static machToTAS(mach, theta) {
      return 661.4786 * mach * Math.sqrt(theta);
    }
    static machToEAS(mach, delta) {
      return 661.4786 * mach * Math.sqrt(delta);
    }
    static CAStoMach(cas, delta) {
      const term1 = 1 + 0.2 * (cas / 661.4786) ** 2;
      const term2 = 1 / delta * (term1 ** 3.5 - 1);
      const term3 = 5 * ((term2 + 1) ** (1 / 3.5) - 1);
      return Math.sqrt(term3);
    }
    static machToCas(mach, delta) {
      const term1 = (0.2 * mach ** 2 + 1) ** 3.5;
      const term2 = (delta * term1 + 1) ** (1 / 3.5) - 1;
      return 1479.1 * Math.sqrt(term2);
    }
    static TAStoCAS(tas, theta, delta) {
      const term1 = 1 + 1 / theta * (tas / 1479.1) ** 2;
      const term2 = delta * (term1 ** 3.5 - 1) + 1;
      const term3 = term2 ** (1 / 3.5) - 1;
      return 1479.1 * Math.sqrt(term3);
    }
    static CAStoTAS(cas, theta, delta) {
      const term1 = 1 + 0.2 * (cas / 661.4786) ** 2;
      const term2 = 1 / delta * (term1 ** 3.5 - 1);
      const term3 = theta * ((term2 + 1) ** (1 / 3.5) - 1);
      return 1479.1 * Math.sqrt(term3);
    }
    static CAStoEAS(cas, delta) {
      const term1 = 1 + 0.2 * (cas / 661.4786) ** 2;
      const term2 = 1 / delta * (term1 ** 3.5 - 1);
      const term3 = delta * ((term2 + 1) ** (1 / 3.5) - 1);
      return 1479.1 * Math.sqrt(term3);
    }
    static getAccelFactorCAS(mach, aboveTropo, tempRatio) {
      const phi = ((1 + 0.2 * mach ** 2) ** 3.5 - 1) / (0.7 * mach ** 2 * (1 + 0.2 * mach ** 2) ** 2.5);
      if (aboveTropo) {
        return 1 + 0.7 * mach ** 2 * phi;
      }
      return 1 + 0.7 * mach ** 2 * (phi - 0.190263 * tempRatio);
    }
    static getAccelFactorMach(mach, aboveTropo, tempRatio) {
      if (aboveTropo) {
        return 0;
      }
      return -0.13318 * mach ** 2 * tempRatio;
    }

    /**
     * Placeholder
     * @param mach
     * @param temp
     * @param stdTemp
     * @param aboveTropo
     * @param accelFactorMode
     * @returns
     */
    static getAccelerationFactor(mach, altitude, isaDev, aboveTropo, accelFactorMode) {
      const stdTemp = Common.getIsaTemp(altitude, aboveTropo);
      const temp = Common.getTemp(altitude, isaDev, aboveTropo);
      const tempRatio = stdTemp / temp;
      if (accelFactorMode === AccelFactorMode.CONSTANT_CAS) {
        return Common.getAccelFactorCAS(mach, aboveTropo, tempRatio);
      }
      return Common.getAccelFactorMach(mach, aboveTropo, tempRatio);
    }
    static interpolate(x, x0, x1, y0, y1) {
      return (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);
    }
    static poundsToMetricTons(pounds) {
      return pounds / 2204.6;
    }
  }

  class EngineModel {
    // In pounds of force. Used as a multiplier for results of table 1506

    /**
     * Table 1502 - CN2 vs CN1 @ Mach 0, 0.2, 0.9
     * n2_to_n1_table
     * @param i row index (n2)
     * @param j 1 = Mach 0, 2 = Mach 0.2, 3 = Mach 0.9
     * @returns Corrected N1 (CN1)
     */

    /**
     * Table 1503 - Turbine LoMach (0) CN2 vs. Throttle @ IAP Ratio 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313
     * mach_0_corrected_commanded_ne_table
     * @param i row index (thrust lever position)
     * @param j IAP ratio
     * @returns Corrected N2 (CN2)
     */

    /**
     * Table 1504 - Turbine HiMach (0.9) CN2 vs. Throttle @ IAP Ratio 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313
     * mach_hi_corrected_commanded_ne_table
     * @param i row index (thrust lever position)
     * @param j IAP ratio
     * @returns Corrected N2 (CN2)
     */

    /**
     * Table 1506 - Corrected net Thrust vs CN1 @ Mach 0 to 0.9 in 0.1 steps
     * n1_and_mach_on_thrust_table
     * @param i row index (CN1)
     * @param j mach
     * @returns Corrected net thrust (pounds of force)
     */

    /**
     * Placeholder
     * @param table
     * @param i
     * @param j
     * @returns
     */
    static tableInterpolation(table, i, j) {
      const numRows = table.length;
      const numCols = table[0].length;
      // Iterate through rows to find the upper bound to i
      let r;
      for (r = 1; r < numRows; r++) {
        if (table[r][0] > i) {
          break;
        }
      }
      // Get lower bound to i
      const r1 = Math.max(1, r - 1);
      const r2 = Math.min(numRows - 1, r);
      // Iterate through rows to find the upper bound to j
      let c;
      for (c = 1; c < numCols; c++) {
        if (table[0][c] > j) {
          break;
        }
      }
      // Get the lower bound to j
      const c1 = Math.max(1, c - 1);
      const c2 = Math.min(numCols - 1, c);
      const interpolatedRowAtC1 = r1 === r2 ? table[r1][c1] : Common.interpolate(i, table[r1][0], table[r2][0], table[r1][c1], table[r2][c1]);
      const interpolatedRowAtC2 = r1 === r2 ? table[r1][c2] : Common.interpolate(i, table[r1][0], table[r2][0], table[r1][c2], table[r2][c2]);
      return Common.interpolate(j, table[0][c1], table[0][c2], interpolatedRowAtC1, interpolatedRowAtC2);
    }

    /**
     * Retrieve a bilinear interpolated row value from a table
     * @param table
     * @param j Value on column axis
     * @param result Value normally returned as result
     */
    static reverseTableInterpolation(table, j, result) {
      const numRows = table.length;
      const numCols = table[0].length;
      let c;
      for (c = 1; c < numCols; c++) {
        if (table[0][c] > j) {
          break;
        }
      }
      const c1 = Math.max(1, c - 1);
      const c2 = Math.min(numCols - 1, c);
      let r;
      for (r = 1; r < numRows; r++) {
        if (table[r][c1] > result) {
          break;
        }
      }
      const r1 = Math.max(1, r - 1);
      const r2 = Math.min(numRows - 1, r);
      for (r = 1; r < numRows; r++) {
        if (table[r][c2] > result) {
          break;
        }
      }
      const r3 = Math.max(1, r - 1);
      const r4 = Math.min(numRows - 1, r);
      const interpolatedRowAtC1 = r1 === r2 ? table[r1][0] : Common.interpolate(result, table[r1][c1], table[r2][c1], table[r1][0], table[r2][0]);
      const interpolatedRowAtC2 = r3 === r4 ? table[r3][0] : Common.interpolate(result, table[r3][c2], table[r4][c2], table[r3][0], table[r4][0]);
      return Common.interpolate(j, table[0][c1], table[0][c2], interpolatedRowAtC1, interpolatedRowAtC2);
    }

    /**
     * Placeholder
     * @param cn1 corrected N1 %
     * @param mach mach value
     * @param alt altitude in feet
     * @returns fuel flow, in pounds per hour (per engine)
     */
    static getCorrectedFuelFlow(cn1, mach, alt) {
      const coefficients = [-639.6602981, 0.00000e+00, 1.03705e+02, -2.23264e+03, 5.70316e-03, -2.29404e+00, 1.08230e+02, 2.77667e-04, -6.17180e+02, -7.20713e-02, 2.19013e-07, 2.49418e-02, -7.31662e-01, -1.00003e-05, -3.79466e+01, 1.34552e-03, 5.72612e-09, -2.71950e+02, 8.58469e-02, -2.72912e-06, 2.02928e-11];
      const flow = coefficients[0] + coefficients[1] + coefficients[2] * cn1 + coefficients[3] * mach + coefficients[4] * alt + coefficients[5] * cn1 ** 2 + coefficients[6] * cn1 * mach + coefficients[7] * cn1 * alt + coefficients[8] * mach ** 2 + coefficients[9] * mach * alt + coefficients[10] * alt ** 2 + coefficients[11] * cn1 ** 3 + coefficients[12] * cn1 ** 2 * mach + coefficients[13] * cn1 ** 2 * alt + coefficients[14] * cn1 * mach ** 2 + coefficients[15] * cn1 * mach * alt + coefficients[16] * cn1 * alt ** 2 + coefficients[17] * mach ** 3 + coefficients[18] * mach ** 2 * alt + coefficients[19] * mach * alt ** 2 + coefficients[20] * alt ** 3;
      return flow;
    }

    // static getCN1fromUncorrectedThrust(thrust: number)

    static getCorrectedN1(n1, theta2) {
      return n1 / Math.sqrt(theta2);
    }
    static getUncorrectedN1(cn1, theta2) {
      return cn1 * Math.sqrt(theta2);
    }
    static getUncorrectedN2(cn2, theta2) {
      return cn2 * Math.sqrt(theta2);
    }
    static getUncorrectedThrust(correctedThrust, delta2) {
      return correctedThrust * delta2;
    }
    static getUncorrectedFuelFlow(correctedFuelFlow, delta2, theta2) {
      return correctedFuelFlow * delta2 * Math.sqrt(theta2);
    }
    static getCorrectedThrust(uncorrectedThrust, delta2) {
      return uncorrectedThrust / delta2;
    }
  }
  _defineProperty(EngineModel, "maxThrust", 27120);
  _defineProperty(EngineModel, "table1502", [[0, 0, 0.2, 0.9], [18.200000, 0.000000, 0.000000, 17.000000], [22.000000, 1.900000, 1.900000, 17.400000], [26.000000, 2.500000, 2.500000, 18.200000], [57.000000, 12.800000, 12.800000, 27.000000], [68.200000, 19.600000, 19.600000, 34.827774], [77.000000, 26.000000, 26.000000, 40.839552], [83.000000, 31.420240, 31.420240, 44.768766], [89.000000, 40.972041, 40.972041, 50.092140], [92.800000, 51.000000, 51.000000, 55.042000], [97.000000, 65.000000, 65.000000, 65.000000], [100.000000, 77.000000, 77.000000, 77.000000], [104.000000, 85.000000, 85.000000, 85.500000], [116.500000, 101.000000, 101.000000, 101.000000]]);
  _defineProperty(EngineModel, "table1503", [[0, 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313], [0.000000, 68.200000, 69.402657, 70.671269, 73.432244, 76.544349, 78.644882, 78.644882], [0.100000, 76.000000, 77.340205, 78.753906, 81.830654, 85.298688, 87.639458, 87.639458], [0.200000, 83.000000, 84.463645, 86.007556, 89.367688, 93.155146, 95.711513, 95.711513], [0.400000, 92.800000, 94.436461, 96.162664, 99.919535, 104.154188, 107.012390, 107.012390], [0.600000, 98.000000, 99.728159, 101.551090, 105.518475, 109.990414, 113.008774, 113.008774], [0.750000, 101.500000, 103.289879, 105.177914, 109.286991, 113.918643, 117.044802, 117.044802], [0.900000, 103.000000, 104.816330, 106.000000, 110.902070, 115.602170, 118.774528, 118.774528], [1.000000, 104.200000, 106.037491, 107.975750, 112.194133, 116.948991, 120.158309, 120.158309]]);
  _defineProperty(EngineModel, "table1504", [[0, 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313], [0.000000, 63.267593, 64.383271, 65.560133, 68.121427, 71.008456, 72.957073, 72.957073], [0.100000, 70.503476, 71.746753, 73.058212, 75.912441, 79.129658, 81.301137, 81.301137], [0.200000, 76.997217, 78.355007, 79.787258, 82.904376, 86.417916, 88.789399, 88.789399], [0.400000, 86.088455, 87.606562, 89.207922, 92.693086, 96.621477, 99.272967, 99.272967], [0.600000, 90.912377, 92.515550, 94.206642, 97.887095, 102.035612, 104.835676, 104.835676], [0.750000, 94.159247, 95.819677, 97.571165, 101.383063, 105.679741, 108.579808, 108.579808], [0.900000, 95.550763, 97.235732, 98.333795, 102.881334, 107.241510, 110.184435, 110.184435], [1.000000, 104.200000, 106.037491, 107.975750, 112.194133, 116.948991, 120.158309, 120.158309]]);
  _defineProperty(EngineModel, "table1506", [[0, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], [0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000], [20.000000, 0.091741, 0.057020, 0.031529, 0.014096, -0.017284, -0.037284, -0.057077, -0.205841, -0.315399, -0.488717], [25.000000, 0.142810, 0.072215, 0.038026, 0.020404, -0.009593, -0.026571, -0.024556, -0.151328, -0.266204, -0.439028], [30.000000, 0.189837, 0.082322, 0.04205, 0.026748, 0.017389, 0.003990, -0.026921, -0.056814, -0.081946, -0.369391], [35.000000, 0.262207, 0.126047, 0.077206, 0.045921, 0.024719, 0.006062, -0.0028121, -0.022800, -0.06972, -0.293631], [40.000000, 0.330230, 0.162757, 0.124088, 0.069579, 0.057905, 0.049621, 0.029790, 0.054284, 0.054218, -0.220630], [45.000000, 0.393293, 0.250096, 0.156707, 0.112419, 0.091418, 0.076757, 0.056090, 0.018509, -0.057520, -0.155120], [50.000000, 0.452337, 0.311066, 0.211353, 0.158174, 0.127429, 0.104915, 0.081171, 0.047419, -0.007399, -0.098474], [55.000000, 0.509468, 0.373568, 0.269961, 0.209106, 0.168650, 0.137223, 0.108383, 0.075660, 0.028704, -0.049469], [60.000000, 0.594614, 0.439955, 0.334629, 0.267477, 0.217773, 0.176899, 0.141404, 0.107148, 0.064556, -0.005036], [65.000000, 0.660035, 0.512604, 0.407151, 0.335055, 0.276928, 0.226669, 0.183627, 0.145850, 0.104441, 0.039012], [70.000000, 0.733601, 0.593506, 0.488571, 0.412623, 0.347163, 0.288210, 0.237559, 0.195142, 0.152485, 0.087269], [75.000000, 0.818693, 0.683880, 0.578756, 0.499514, 0.427939, 0.361604, 0.304241, 0.257197, 0.212005, 0.144042], [80.000000, 0.910344, 0.783795, 0.675982, 0.593166, 0.516644, 0.444822, 0.382689, 0.332384, 0.284867, 0.212679], [85.000000, 1.025165, 0.891823, 0.776548, 0.688692, 0.608128, 0.533210, 0.469351, 0.418690, 0.370870, 0.294907], [90.000000, 1.157049, 1.004695, 0.874400, 0.778466, 0.694251, 0.619011, 0.557581, 0.511153, 0.467149, 0.390203], [95.000000, 1.281333, 1.116993, 0.960774, 0.851733, 0.763455, 0.690890, 0.637136, 0.601322, 0.567588, 0.495167], [100.000000, 1.357935, 1.220844, 1.023864, 0.894234, 0.800352, 0.733488, 0.693684, 0.654691, 0.617963, 0.539115], [105.000000, 1.378826, 1.239626, 1.048498, 0.915750, 0.819609, 0.751137, 0.710375, 0.670444, 0.632832, 0.552086], [110.000000, 1.392754, 1.252148, 1.069322, 0.933937, 0.835886, 0.766054, 0.724483, 0.683759, 0.645400, 0.563051]]);

  class FlightModel {
    // in knots/second

    // in m/s^2

    // in knots/second

    // in m/s^2

    // From https://github.com/flybywiresim/a32nx/pull/6903#issuecomment-1073168320

    /**
     * Get lift coefficient at given conditions
     * @param weight in pounds
     * @param mach self-explanatory
     * @param delta pressure at the altitude divided by the pressure at sea level
     * @param loadFactor g-Force
     * @returns lift coefficient (Cl)
     */
    static getLiftCoefficient(weight, mach, delta) {
      let loadFactor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return weight * loadFactor / (1481.4 * mach ** 2 * delta * this.wingArea);
    }
    static getLiftCoefficientFromEAS(lift, eas) {
      return 295.369 * lift / (eas ** 2 * this.wingArea);
    }

    /**
     * Get drag coefficient at given conditions
     * @param Cl coefficient of lift
     * @param spdBrkDeflected whether speedbrake is deflected at half or not
     * @param gearExtended whether gear is extended or not
     * @param flapConf flap configuration
     * @returns drag coefficient (Cd)
     */
    static getDragCoefficient(Cl) {
      let spdBrkDeflected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let gearExtended = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      let flapConf = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : FlapConf.CLEAN;
      // Values taken at mach 0
      let baseDrag;
      switch (flapConf) {
        case FlapConf.CLEAN:
          baseDrag = -0.1043 * Cl ** 5 + 0.2635 * Cl ** 4 - 0.2319 * Cl ** 3 + 0.1537 * Cl ** 2 - 0.0379 * Cl + 0.0233;
          break;
        case FlapConf.CONF_1:
          baseDrag = -0.0207 * Cl ** 5 + 0.0764 * Cl ** 4 - 0.0813 * Cl ** 3 + 0.0912 * Cl ** 2 - 0.0285 * Cl + 0.0337;
          break;
        case FlapConf.CONF_2:
          baseDrag = 0.0066 * Cl ** 5 - 0.0271 * Cl ** 4 + 0.0615 * Cl ** 3 - 0.0187 * Cl ** 2 + 0.0035 * Cl + 0.0538;
          break;
        case FlapConf.CONF_3:
          baseDrag = 0.0768 * Cl ** 5 - 0.3979 * Cl ** 4 + 0.8252 * Cl ** 3 - 0.7951 * Cl ** 2 + 0.3851 * Cl - 0.0107;
          break;
        case FlapConf.CONF_FULL:
          baseDrag = 0.017 * Cl ** 5 - 0.0978 * Cl ** 4 + 0.2308 * Cl ** 3 - 0.2278 * Cl ** 2 + 0.1157 * Cl + 0.0682;
          break;
      }
      const spdBrkIncrement = spdBrkDeflected ? 0.00611 : 0;
      const gearIncrement = gearExtended ? 0.03 : 0;
      return baseDrag + spdBrkIncrement + gearIncrement;
    }

    /**
     * Get drag at given conditions
     * @param weight in pounds
     * @param mach self-explanatory
     * @param delta pressure at the altitude divided by the pressure at sea level
     * @param spdBrkDeflected Whether speedbrake is deflected at half or not
     * @param gearExtended whether gear is extended or not
     * @param flapConf flap configuration
     * @returns drag
     */
    static getDrag(weight, mach, delta, spdBrkDeflected, gearExtended, flapConf) {
      const Cl = this.getLiftCoefficient(weight, mach, delta);
      const Cd = this.getDragCoefficient(Cl, spdBrkDeflected, gearExtended, flapConf);
      const deltaCd = this.getMachCorrection(mach, flapConf);
      return 1481.4 * mach ** 2 * delta * this.wingArea * (Cd + deltaCd);
    }
    static getMachCorrection(mach, flapConf) {
      if (flapConf !== FlapConf.CLEAN) {
        return 0;
      }
      return this.interpolate(mach, this.machValues, this.dragCoefficientCorrections);
    }

    /**
     * Interpolates in a list
     * @param x The value to look up in in `xs`.
     * @param xs The table of x values with known y values
     * @param ys The y values corresponding to the x values in `xs`
     */
    static interpolate(x, xs, ys) {
      if (x <= xs[0]) {
        return ys[0];
      }
      for (let i = 0; i < xs.length - 1; i++) {
        if (x > xs[i] && x <= xs[i + 1]) {
          return Common.interpolate(x, xs[i], xs[i + 1], ys[i], ys[i + 1]);
        }
      }
      return ys[ys.length - 1];
    }

    // NEW

    /**
     * Returns the available climb or descent gradient.
     *
     * @param thrust the thrust in lbf
     * @param drag
     * @param weight in lbs
     *
     * @returns the available gradient in radians
     */
    static getAvailableGradient(thrust, drag, weight) {
      return Math.asin((thrust - drag) / weight);
    }

    /**
     * Returns an acceleration for a given available gradient, fpa and acceleration factor.
     *
     * @param availableGradient in radians
     * @param fpa in radians
     * @param accelFactor
     *
     * @returns the acceleration
     */
    static accelerationForGradient(availableGradient, fpa, accelFactor) {
      return (Math.sin(availableGradient) - Math.sin(fpa)) * accelFactor;
    }

    /**
     * Returns an fpa for a given available gradient, acceleration and acceleration factor.
     *
     * @param availableGradient in radians
     * @param acceleration
     * @param accelFactor
     *
     * @returns the fpa in radians
     */
    static fpaForGradient(availableGradient, acceleration, accelFactor) {
      return Math.asin(Math.sin(availableGradient) - acceleration / accelFactor);
    }

    // END NEW

    static getConstantThrustPathAngle(thrust, weight, drag, accelFactor) {
      return Math.asin((thrust - drag) / weight / accelFactor);
    }
    static getConstantThrustPathAngleFromCoefficients(thrust, weight, Cl, Cd, accelFactor) {
      return Math.asin((thrust / weight - Cd / Cl) / accelFactor);
    }
    static getThrustFromConstantPathAngle(fpa, weight, drag, accelFactor) {
      // fpa is in degrees
      return weight * (accelFactor * Math.sin(fpa * MathUtils.MathUtils.DEGREES_TO_RADIANS)) + drag;
    }
    static getThrustFromConstantPathAngleCoefficients(fpa, weight, Cl, Cd, accelFactor) {
      // fpa is in degrees
      return weight * (accelFactor * Math.sin(fpa * MathUtils.MathUtils.DEGREES_TO_RADIANS) + Cd / Cl);
    }
    static getSpeedChangePathAngle(thrust, weight, drag) {
      return Math.asin((thrust - drag) / weight - 1 / FlightModel.gravityConstMS2 * FlightModel.requiredAccelRateMS2);
    }
    static getSpeedChangePathAngleFromCoefficients(thrust, weight, Cl, Cd) {
      return Math.asin(thrust / weight - Cd / Cl - 1 / FlightModel.gravityConstMS2 * FlightModel.requiredAccelRateMS2);
    }
    static getAccelRateFromIdleGeoPath(thrust, weight, drag, fpaDeg) {
      // fpa is in degrees
      const fpaRad = fpaDeg * MathUtils.MathUtils.DEGREES_TO_RADIANS;
      return FlightModel.gravityConstKNS * ((thrust - drag) / weight - Math.sin(fpaRad));
    }
    static getAccelRateFromIdleGeoPathCoefficients(thrust, weight, Cl, Cd, fpaDeg) {
      // fpa is in degrees
      const fpaRad = fpaDeg * MathUtils.MathUtils.DEGREES_TO_RADIANS;
      return FlightModel.gravityConstKNS * (thrust / weight - Cd / Cl - Math.sin(fpaRad));
    }

    /**
     * Gets distance required to accelerate/decelerate
     * @param thrust
     * @param drag
     * @param weight in pounds
     * @param initialSpeed
     * @param targetSpeed
     * @param fpa flight path angle, default value 0 for level segments
     * @param accelFactor acceleration factor, default value 0 for level segments
     * @returns distance to accel/decel
     */
    static getAccelerationDistance(thrust, drag, weight, initialSpeed, targetSpeed) {
      let fpa = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      let accelFactor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      const sign = Math.sign(fpa);
      const force = thrust - drag + sign * weight * Math.sin(fpa * (Math.PI / 180)) * accelFactor;
      const accel = force / weight; // TODO: Check units
      const timeToAccel = (targetSpeed - initialSpeed) / accel;
      const distanceToAccel = initialSpeed * timeToAccel + 0.5 * accel * timeToAccel ** 2; // TODO: Check units
      return distanceToAccel;
    }
  }
  _defineProperty(FlightModel, "Cd0", 0.0187);
  _defineProperty(FlightModel, "wingSpan", 117.454);
  _defineProperty(FlightModel, "wingArea", 1319.7);
  _defineProperty(FlightModel, "wingEffcyFactor", 0.70);
  _defineProperty(FlightModel, "requiredAccelRateKNS", 1.33);
  _defineProperty(FlightModel, "requiredAccelRateMS2", 0.684);
  _defineProperty(FlightModel, "gravityConstKNS", 19.0626);
  _defineProperty(FlightModel, "gravityConstMS2", 9.806665);
  _defineProperty(FlightModel, "machValues", [0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85]);
  _defineProperty(FlightModel, "dragCoefficientCorrections", [0, 0.0002, 0.0003, 0.0004, 0.0008, 0.0015, 0.01]);

  let VnavStepError;
  (function (VnavStepError) {
    VnavStepError[VnavStepError["AVAILABLE_GRADIENT_INSUFFICIENT"] = 0] = "AVAILABLE_GRADIENT_INSUFFICIENT";
    VnavStepError[VnavStepError["TOO_LOW_DECELERATION"] = 1] = "TOO_LOW_DECELERATION";
  })(VnavStepError || (VnavStepError = {}));
  class Predictions {
    /**
     * THIS IS DONE.
     * @param initialAltitude altitude at beginning of step, in feet
     * @param stepSize the size of the altitude step, in feet
     * @param econCAS airspeed during climb (taking SPD LIM & restrictions into account)
     * @param econMach mach during climb, after passing crossover altitude
     * @param commandedN1 N1% at CLB (or idle) setting, depending on flight phase
     * @param zeroFuelWeight zero fuel weight of the aircraft (from INIT B)
     * @param initialFuelWeight weight of fuel at the end of last step
     * @param headwindAtMidStepAlt headwind component (in knots) at initialAltitude + (stepSize / 2); tailwind is negative
     * @param isaDev ISA deviation (in celsius)
     * @param tropoAltitude tropopause altitude (feet)
     * @param speedbrakesExtended whether or not speedbrakes are extended at half (for geometric segment path test only)
     */
    static altitudeStep(initialAltitude, stepSize, econCAS, econMach, commandedN1, zeroFuelWeight, initialFuelWeight, headwindAtMidStepAlt, isaDev, tropoAltitude) {
      let speedbrakesExtended = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      let flapsConfig = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : FlapConf.CLEAN;
      const midStepAltitude = initialAltitude + stepSize / 2;
      const theta = Common.getTheta(midStepAltitude, isaDev);
      const delta = Common.getDelta(midStepAltitude);
      let mach = Common.CAStoMach(econCAS, delta);
      let eas;
      let tas;
      let usingMach = false;
      // If above crossover altitude, use econMach
      if (mach > econMach) {
        mach = econMach;
        eas = Common.machToEAS(mach, delta);
        tas = Common.machToTAS(mach, theta);
        usingMach = true;
      } else {
        eas = Common.CAStoEAS(econCAS, delta);
        tas = Common.CAStoTAS(econCAS, theta, delta);
      }

      // Engine model calculations
      const theta2 = Common.getTheta2(theta, mach);
      const delta2 = Common.getDelta2(delta, mach);
      const correctedN1 = EngineModel.getCorrectedN1(commandedN1, theta2);
      const correctedThrust = EngineModel.tableInterpolation(EngineModel.table1506, correctedN1, mach) * 2 * EngineModel.maxThrust;
      const correctedFuelFlow = EngineModel.getCorrectedFuelFlow(correctedN1, mach, midStepAltitude) * 2;
      const thrust = EngineModel.getUncorrectedThrust(correctedThrust, delta2); // in lbf
      const fuelFlow = EngineModel.getUncorrectedFuelFlow(correctedFuelFlow, delta2, theta2); // in lbs/hour

      const weightEstimate = zeroFuelWeight + initialFuelWeight;
      let pathAngle;
      let verticalSpeed;
      let stepTime;
      let distanceTraveled;
      let fuelBurned;
      let lift = weightEstimate;
      let midStepWeight = weightEstimate;
      let previousMidStepWeight = midStepWeight;
      let iterations = 0;
      do {
        // Assume lift force is equal to weight as an initial approximation
        const liftCoefficient = FlightModel.getLiftCoefficientFromEAS(lift, eas);
        const dragCoefficient = FlightModel.getDragCoefficient(liftCoefficient, speedbrakesExtended, false, flapsConfig);
        const accelFactorMode = usingMach ? AccelFactorMode.CONSTANT_MACH : AccelFactorMode.CONSTANT_CAS;
        const accelFactor = Common.getAccelerationFactor(mach, midStepAltitude, isaDev, midStepAltitude > tropoAltitude, accelFactorMode);
        pathAngle = FlightModel.getConstantThrustPathAngleFromCoefficients(thrust, midStepWeight, liftCoefficient, dragCoefficient, accelFactor);
        verticalSpeed = 101.268 * tas * Math.sin(pathAngle); // in feet per minute
        stepTime = stepSize / verticalSpeed; // in minutes
        distanceTraveled = (tas - headwindAtMidStepAlt) * (stepTime / 60); // in nautical miles
        fuelBurned = fuelFlow / 60 * stepTime;
        // const endStepWeight = zeroFuelWeight + (initialFuelWeight - fuelBurned); <- not really needed

        // Adjust variables for better accuracy next iteration
        previousMidStepWeight = midStepWeight;
        midStepWeight = zeroFuelWeight + (initialFuelWeight - fuelBurned / 2);
        lift = midStepWeight * Math.cos(pathAngle);
        iterations++;
      } while (iterations < 4 && Math.abs(previousMidStepWeight - midStepWeight) < 100);
      return {
        pathAngle: pathAngle * MathUtils.MathUtils.RADIANS_TO_DEGREES,
        verticalSpeed,
        timeElapsed: stepTime,
        distanceTraveled,
        fuelBurned,
        finalAltitude: initialAltitude + stepSize
      };
    }

    /**
     * THIS IS DONE.
     * @param altitude altitude of this level segment
     * @param stepSize the distance of the step, in NM
     * @param econCAS airspeed during level segment
     * @param econMach mach during level segment (when over crossover altitude)
     * @param zeroFuelWeight zero fuel weight of the aircraft (from INIT B)
     * @param initialFuelWeight weight of fuel at the end of last step
     * @param headwind headwind component (in knots) at altitude; tailwind is negative
     * @param isaDev ISA deviation (in celsius)
     */
    static levelFlightStep(altitude, stepSize, econCAS, econMach, zeroFuelWeight, initialFuelWeight, headwind, isaDev) {
      const theta = Common.getTheta(altitude, isaDev);
      const delta = Common.getDelta(altitude);
      let mach = Common.CAStoMach(econCAS, delta);
      let tas;
      // If above crossover altitude, use econMach
      if (mach > econMach) {
        mach = econMach;
        tas = Common.machToTAS(mach, theta);
      } else {
        tas = Common.CAStoTAS(econCAS, theta, delta);
      }
      const initialWeight = zeroFuelWeight + initialFuelWeight;
      const thrust = FlightModel.getDrag(initialWeight, mach, delta, false, false, FlapConf.CLEAN);

      // Engine model calculations
      const theta2 = Common.getTheta2(theta, mach);
      const delta2 = Common.getDelta2(delta, mach);
      // Divide by 2 to get thrust per engine
      const correctedThrust = thrust / delta2 / 2;
      // Since table 1506 describes corrected thrust as a fraction of max thrust, divide it
      const correctedN1 = EngineModel.reverseTableInterpolation(EngineModel.table1506, mach, correctedThrust / EngineModel.maxThrust);
      const correctedFuelFlow = EngineModel.getCorrectedFuelFlow(correctedN1, mach, altitude) * 2;
      const fuelFlow = EngineModel.getUncorrectedFuelFlow(correctedFuelFlow, delta2, theta2); // in lbs/hour

      const stepTime = (tas - headwind) / stepSize / 60; // in minutes
      const fuelBurned = fuelFlow / 60 * stepTime;
      let result;
      result.pathAngle = 0;
      result.verticalSpeed = 0;
      result.timeElapsed = stepTime;
      result.distanceTraveled = stepSize;
      result.fuelBurned = fuelBurned;
      result.finalAltitude = altitude;
      return result;
    }

    /**
     * THIS IS DONE.
     * @param initialAltitude altitude at beginning of step, in feet
     * @param initialCAS airspeed at beginning of step
     * @param finalCAS airspeed at end of step
     * @param initialMach initial mach, above crossover altitude
     * @param finalMach final mach, above crossover altitude
     * @param commandedN1 N1% at CLB (or idle) setting, depending on flight phase
     * @param zeroFuelWeight zero fuel weight of the aircraft (from INIT B)
     * @param initialFuelWeight weight of fuel at the end of last step
     * @param headwindAtInitialAltitude headwind component (in knots) at initialAltitude
     * @param isaDev ISA deviation (in celsius)
     * @param tropoAltitude tropopause altitude (feet)
     * @param gearExtended whether the gear is extended
     * @param flapConfig the flaps configuration
     * @param minimumAbsoluteAcceleration the minimum absolute acceleration before emitting TOO_LOW_DECELERATION (kts/s)
     */
    static speedChangeStep(flightPahAngle, initialAltitude, initialCAS, finalCAS, initialMach, finalMach, commandedN1, zeroFuelWeight, initialFuelWeight, headwindAtInitialAltitude, isaDev, tropoAltitude) {
      let gearExtended = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : false;
      let flapConfig = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : FlapConf.CLEAN;
      let minimumAbsoluteAcceleration = arguments.length > 14 ? arguments[14] : undefined;
      const theta = Common.getTheta(initialAltitude, isaDev);
      const delta = Common.getDelta(initialAltitude);
      let actualInitialMach = Common.CAStoMach(initialCAS, delta);
      let actualFinalMach = Common.CAStoMach(finalCAS, delta);
      let initialTas;
      let finalTas;
      // let initialEas;
      // let finalEas;

      // let usingMachAtStart;
      // If above crossover altitude, use mach
      if (actualInitialMach > initialMach) {
        actualInitialMach = initialMach;
        initialTas = Common.machToTAS(actualInitialMach, theta);
        // initialEas = Common.machToEAS(actualInitialMach, delta);
        // usingMachAtStart = true;
      } else {
        initialTas = Common.CAStoTAS(initialCAS, theta, delta);
        // initialEas = Common.CAStoEAS(initialCAS, delta);
        // usingMachAtStart = false;
      }

      // let usingMachAtEnd;
      if (actualFinalMach > finalMach) {
        actualFinalMach = finalMach;
        finalTas = Common.machToTAS(actualFinalMach, theta);
        // finalEas = Common.machToEAS(actualFinalMach, delta);
        // usingMachAtEnd = true;
      } else {
        finalTas = Common.CAStoTAS(finalCAS, theta, delta);
        // finalEas = Common.CAStoEAS(finalCAS, delta);
        // usingMachAtEnd = false;
      }

      const averageMach = (actualInitialMach + actualFinalMach) / 2;
      const averageTas = (initialTas + finalTas) / 2;

      // Engine model calculations
      const theta2 = Common.getTheta2(theta, averageMach);
      const delta2 = Common.getDelta2(delta, averageMach);
      const correctedN1 = EngineModel.getCorrectedN1(commandedN1, theta2);
      const correctedThrust = EngineModel.tableInterpolation(EngineModel.table1506, correctedN1, averageMach) * 2 * EngineModel.maxThrust;
      const correctedFuelFlow = EngineModel.getCorrectedFuelFlow(correctedN1, averageMach, initialAltitude) * 2;
      const thrust = EngineModel.getUncorrectedThrust(correctedThrust, delta2); // in lbf
      const fuelFlow = EngineModel.getUncorrectedFuelFlow(correctedFuelFlow, delta2, theta2); // in lbs/hour

      const weightEstimate = zeroFuelWeight + initialFuelWeight;
      const pathAngleRadians = flightPahAngle * MathUtils.MathUtils.DEGREES_TO_RADIANS;
      let error;
      let verticalSpeed;
      let stepTime;
      let distanceTraveled;
      let fuelBurned;
      let finalAltitude;
      let lift = weightEstimate;
      let midStepWeight = weightEstimate;
      let previousMidStepWeight = midStepWeight;
      let iterations = 0;
      do {
        // Calculate the available gradient
        const drag = FlightModel.getDrag(lift, averageMach, delta, false, gearExtended, flapConfig);
        const availableGradient = FlightModel.getAvailableGradient(thrust, drag, weightEstimate);
        if (Math.abs(availableGradient) < Math.abs(pathAngleRadians)) {
          error = VnavStepError.AVAILABLE_GRADIENT_INSUFFICIENT;
        }
        const acceleration = FlightModel.accelerationForGradient(availableGradient, pathAngleRadians, 9.81);

        // TODO what do we do with this
        // const accelFactorMode = usingMachAtStart ? AccelFactorMode.CONSTANT_MACH : AccelFactorMode.CONSTANT_CAS;
        // const accelFactor = Common.getAccelerationFactor(averageMach,
        //     initialAltitude,
        //     isaDev,
        //     initialAltitude > tropoAltitude,
        //     accelFactorMode);

        // pathAngle = FlightModel.fpaForGradient(
        //     availableGradient,
        //     FlightModel.requiredAccelRateMS2,
        //     accelFactor,
        // );

        const accelerationKNS = FlightModel.requiredAccelRateKNS * acceleration / FlightModel.requiredAccelRateMS2;
        if (Math.abs(accelerationKNS) < minimumAbsoluteAcceleration) {
          error = VnavStepError.TOO_LOW_DECELERATION;
        }
        stepTime = Math.abs(finalTas - initialTas) / Math.abs(accelerationKNS);
        distanceTraveled = stepTime / 3600 * averageTas;
        verticalSpeed = 101.268 * averageTas * Math.sin(pathAngleRadians); // in feet per minute
        // // TODO: double-check if accel rate operates on TAS or CAS
        // stepTime = Math.abs(finalTas - initialTas) / accelerationKNS; // in seconds
        finalAltitude = initialAltitude + verticalSpeed * (stepTime / 60); // in feet
        // TODO: now that we have final altitude, we could get accurate mid-step headwind instead of using initial headwind...
        // distanceTraveled = (averageTas - headwindAtInitialAltitude) * (stepTime / 3_600); // in NM
        fuelBurned = fuelFlow / 60 * stepTime;
        // const endStepWeight = zeroFuelWeight + (initialFuelWeight - fuelBurned); <- not really needed

        // Adjust variables for better accuracy next iteration
        previousMidStepWeight = midStepWeight;
        midStepWeight = zeroFuelWeight + (initialFuelWeight - fuelBurned / 2);
        lift = midStepWeight * Math.cos(pathAngleRadians);
        iterations++;
      } while (iterations < 4 && Math.abs(previousMidStepWeight - midStepWeight) < 100);
      return {
        pathAngle: pathAngleRadians * MathUtils.MathUtils.RADIANS_TO_DEGREES,
        verticalSpeed,
        timeElapsed: stepTime,
        distanceTraveled,
        fuelBurned,
        finalAltitude,
        error
      };
    }

    /**
     * THIS IS DONE.
     * @param initialAltitude altitude at beginning of step, in feet
     * @param finalAltitude altitude at end of step, in feet
     * @param distance distance of step, in NM
     * @param econCAS airspeed during step
     * @param econMach mach during step
     * @param idleN1 N1% at idle setting
     * @param zeroFuelWeight zero fuel weight of the aircraft (from INIT B)
     * @param initialFuelWeight weight of fuel at the end of last step
     * @param headwindAtMidStepAlt headwind component (in knots) at initialAltitude + (stepSize / 2); tailwind is negative
     * @param isaDev ISA deviation (in celsius)
     * @param tropoAltitude tropopause altitude (feet)
     */
    static geometricStepAchievable(initialAltitude, finalAltitude, distance, econCAS, econMach, idleN1, zeroFuelWeight, initialFuelWeight, headwindAtMidStepAlt, isaDev, tropoAltitude) {
      const idleStepResults = Predictions.altitudeStep(initialAltitude, finalAltitude - initialAltitude, econCAS, econMach, idleN1, zeroFuelWeight, initialFuelWeight, headwindAtMidStepAlt, isaDev, tropoAltitude, true);

      // If converted FPA is less than the FPA from altitudeStep, then this path is too steep :(
      const distanceInFeet = distance * 6076.12;
      const stepFPA = Math.atan((finalAltitude - initialAltitude) / distanceInFeet) * MathUtils.MathUtils.RADIANS_TO_DEGREES;
      return idleStepResults.pathAngle <= stepFPA;
    }

    /**
     * THIS IS DONE.
     * @param initialAltitude altitude at beginning of step, in feet
     * @param finalAltitude altitude at end of step, in feet
     * @param distance distance of step, in NM
     * @param econCAS airspeed during step
     * @param econMach mach during step
     * @param zeroFuelWeight zero fuel weight of the aircraft (from INIT B)
     * @param initialFuelWeight weight of fuel at the end of last step
     * @param isaDev ISA deviation (in celsius)
     * @param tropoAltitude tropopause altitude (feet)
     */
    static geometricStep(initialAltitude, finalAltitude, distance, econCAS, econMach, zeroFuelWeight, initialFuelWeight, isaDev, tropoAltitude) {
      const distanceInFeet = distance * 6076.12;
      const fpaRadians = Math.atan((finalAltitude - initialAltitude) / distanceInFeet);
      const fpaDegrees = fpaRadians * MathUtils.MathUtils.RADIANS_TO_DEGREES;
      const midStepAltitude = (initialAltitude + finalAltitude) / 2;
      const theta = Common.getTheta(midStepAltitude, isaDev);
      const delta = Common.getDelta(midStepAltitude);
      let mach = Common.CAStoMach(econCAS, delta);
      let eas;
      let tas;
      let usingMach = false;
      // If above crossover altitude, use econMach
      if (mach > econMach) {
        mach = econMach;
        eas = Common.machToEAS(mach, delta);
        tas = Common.machToTAS(mach, theta);
        usingMach = true;
      } else {
        eas = Common.CAStoEAS(econCAS, delta);
        tas = Common.CAStoTAS(econCAS, theta, delta);
      }
      const weightEstimate = zeroFuelWeight + initialFuelWeight;
      const theta2 = Common.getTheta2(theta, mach);
      const delta2 = Common.getDelta2(delta, mach);
      let thrust;
      let verticalSpeed;
      let stepTime;
      let fuelBurned;
      let lift = weightEstimate * Math.cos(fpaRadians);
      let midStepWeight = weightEstimate;
      let previousMidStepWeight = midStepWeight;
      let iterations = 0;
      do {
        const liftCoefficient = FlightModel.getLiftCoefficientFromEAS(lift, eas);
        const dragCoefficient = FlightModel.getDragCoefficient(liftCoefficient);
        const accelFactorMode = usingMach ? AccelFactorMode.CONSTANT_MACH : AccelFactorMode.CONSTANT_CAS;
        const accelFactor = Common.getAccelerationFactor(mach, midStepAltitude, isaDev, midStepAltitude > tropoAltitude, accelFactorMode);
        thrust = FlightModel.getThrustFromConstantPathAngleCoefficients(fpaDegrees, midStepWeight, liftCoefficient, dragCoefficient, accelFactor);
        verticalSpeed = 101.268 * tas * Math.sin(fpaRadians); // in feet per minute
        stepTime = (finalAltitude - initialAltitude) / verticalSpeed; // in minutes

        // Divide by 2 to get thrust per engine
        const correctedThrust = thrust / delta2 / 2;
        // Since table 1506 describes corrected thrust as a fraction of max thrust, divide it
        const correctedN1 = EngineModel.reverseTableInterpolation(EngineModel.table1506, mach, correctedThrust / EngineModel.maxThrust);
        const correctedFuelFlow = EngineModel.getCorrectedFuelFlow(correctedN1, mach, midStepAltitude) * 2;
        const fuelFlow = EngineModel.getUncorrectedFuelFlow(correctedFuelFlow, delta2, theta2); // in lbs/hour

        fuelBurned = fuelFlow / 60 * stepTime;

        // Adjust variables for better accuracy next iteration
        previousMidStepWeight = midStepWeight;
        midStepWeight = zeroFuelWeight + (initialFuelWeight - fuelBurned / 2);
        lift = midStepWeight * Math.cos(fpaRadians);
        iterations++;
      } while (iterations < 4 && Math.abs(previousMidStepWeight - midStepWeight) < 100);
      return {
        pathAngle: fpaDegrees,
        verticalSpeed,
        timeElapsed: stepTime,
        distanceTraveled: distance,
        fuelBurned,
        finalAltitude
      };
    }

    // static constantSlopeSegment(
    //
    // ): StepResults {
    //     // e = ((T - D / W)
    //     // a = g * (sin(available climb angle) - sin (desired fpa))
    //     // d = ((final velocity squared) - (initial velocity squared)) / (2 * a)
    // }

    /**
     * THIS IS DONE.
     * @param initialAltitude altitude at beginning of step, in feet
     * @param finalAltitude altitude at end of step, in feet
     * @param distance distance of step, in NM
     * @param econCAS airspeed during step
     * @param econMach mach during step
     * @param idleN1 N1% at idle setting
     * @param zeroFuelWeight zero fuel weight of the aircraft (from INIT B)
     * @param initialFuelWeight weight of fuel at the end of last step
     * @param isaDev ISA deviation (in celsius)
     */
    static decelerationFromGeometricStep(initialAltitude, finalAltitude, econCAS, econMach, idleN1, zeroFuelWeight, initialFuelWeight, isaDev) {
      const distanceInFeet = distance * 6076.12;
      const fpaRadians = Math.atan((finalAltitude - initialAltitude) / distanceInFeet);
      const fpaDegrees = fpaRadians * MathUtils.MathUtils.RADIANS_TO_DEGREES;
      const midStepAltitude = (initialAltitude + finalAltitude) / 2;
      const theta = Common.getTheta(midStepAltitude, isaDev);
      const delta = Common.getDelta(midStepAltitude);
      let mach = Common.CAStoMach(econCAS, delta);
      let eas;
      // If above crossover altitude, use econMach
      if (mach > econMach) {
        mach = econMach;
        eas = Common.machToEAS(mach, delta);
      } else {
        eas = Common.CAStoEAS(econCAS, delta);
      }
      const theta2 = Common.getTheta2(theta, mach);
      const delta2 = Common.getDelta2(delta, mach);
      const correctedN1 = EngineModel.getCorrectedN1(idleN1, theta2);
      const correctedThrust = EngineModel.tableInterpolation(EngineModel.table1506, correctedN1, mach) * 2 * EngineModel.maxThrust;
      const thrust = EngineModel.getUncorrectedThrust(correctedThrust, delta2); // in lbf

      const weightEstimate = zeroFuelWeight + initialFuelWeight;
      const lift = weightEstimate * Math.cos(fpaRadians);
      const liftCoefficient = FlightModel.getLiftCoefficientFromEAS(lift, eas);
      const dragCoefficient = FlightModel.getDragCoefficient(liftCoefficient);
      const accelRate = FlightModel.getAccelRateFromIdleGeoPathCoefficients(thrust, weightEstimate, liftCoefficient, dragCoefficient, fpaDegrees);
      return accelRate;
    }
  }

  class ClimbPathBuilder {
    static computeClimbPath(_geometry) {
      var _SimVar$GetSimVarValu, _SimVar$GetSimVarValu2, _SimVar$GetSimVarValu3, _SimVar$GetSimVarValu4;
      const airfieldElevation = (_SimVar$GetSimVarValu = SimVar.GetSimVarValue('L:B77RS_DEPARTURE_ELEVATION', 'feet')) !== null && _SimVar$GetSimVarValu !== void 0 ? _SimVar$GetSimVarValu : 0;
      const accelerationAltitude = airfieldElevation + 1500;
      const midwayAltitudeSrs = (accelerationAltitude + airfieldElevation) / 2;
      const isaDev = 8;
      const v2 = (_SimVar$GetSimVarValu2 = SimVar.GetSimVarValue('L:AIRLINER_V2_SPEED', 'knots')) !== null && _SimVar$GetSimVarValu2 !== void 0 ? _SimVar$GetSimVarValu2 : 130;
      console.log("v2 + 10: ".concat(JSON.stringify(v2 + 10)));
      const commandedN1Toga = (_SimVar$GetSimVarValu3 = SimVar.GetSimVarValue('L:B77RS_AUTOTHRUST_THRUST_LIMIT', 'Percent')) !== null && _SimVar$GetSimVarValu3 !== void 0 ? _SimVar$GetSimVarValu3 : 0;
      console.log("commandedN1: ".concat(JSON.stringify(commandedN1Toga)));
      const thetaSrs = Common.getTheta(midwayAltitudeSrs, isaDev);
      const deltaSrs = Common.getDelta(thetaSrs);
      const machSrs = Common.CAStoMach(v2 + 10, deltaSrs);
      console.log("mach: ".concat(JSON.stringify(machSrs)));
      const zeroFuelWeight = 101853.57;
      const fuelWeight = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY WEIGHT', 'lbs');
      console.log("fuelWeight: ".concat(JSON.stringify(fuelWeight)));
      const takeoffRollDistance = this.computeTakeOffRollDistance();
      console.log("takeoffRollDistance: ".concat(JSON.stringify(takeoffRollDistance)));
      const {
        pathAngle: pathAngleSrs,
        distanceTraveled: distanceTraveledSrs
      } = Predictions.altitudeStep(airfieldElevation, accelerationAltitude - airfieldElevation, v2 + 10, machSrs, commandedN1Toga, zeroFuelWeight, fuelWeight, 0, isaDev, 36000, false);
      console.log("pathAngleSrs: ".concat(pathAngleSrs));
      console.log("distanceToAccelerationAltitude: ".concat(JSON.stringify(distanceTraveledSrs)));
      const cruiseAltitude = 20000;
      const climbSpeed = v2 + 10;
      const commandedN1Climb = (_SimVar$GetSimVarValu4 = SimVar.GetSimVarValue('L:B77RS_AUTOTHRUST_THRUST_LIMIT', 'Percent')) !== null && _SimVar$GetSimVarValu4 !== void 0 ? _SimVar$GetSimVarValu4 : 0;
      const midwayAltitudeClimb = (cruiseAltitude + accelerationAltitude) / 2;
      const thetaClimb = Common.getTheta(midwayAltitudeClimb, isaDev);
      const deltaClimb = Common.getDelta(thetaClimb);
      const machClimb = Common.CAStoMach(climbSpeed, deltaClimb);
      const {
        pathAngle: pathAngleClimb,
        distanceTraveled: distanceTraveledClb
      } = Predictions.altitudeStep(accelerationAltitude, cruiseAltitude - accelerationAltitude, climbSpeed, machClimb, commandedN1Climb, zeroFuelWeight, fuelWeight, 0, isaDev, 36000, false);
      console.log("pathAngleClimb: ".concat(pathAngleClimb));
      console.log("distanceToCruiseAltitude: ".concat(JSON.stringify(distanceTraveledClb)));
      console.log("[FMS/VNAV] T/C: ".concat(JSON.stringify(takeoffRollDistance + distanceTraveledSrs + distanceTraveledClb)));
      return {
        distanceToAccelerationAltitude: distanceTraveledSrs
      };
    }
    static computeTakeOffRollDistance() {
      // TODO
      return 1;
    }
  }

  class VnavDriver {
    // eslint-disable-next-line camelcase

    constructor(guidanceController) {
      this.guidanceController = guidanceController;
      _defineProperty(this, "atmosphericConditions", new AtmosphericConditions.AtmosphericConditions());
      _defineProperty(this, "currentClimbProfile", void 0);
      _defineProperty(this, "currentDescentProfile", void 0);
      _defineProperty(this, "currentApproachProfile", void 0);
      _defineProperty(this, "guidanceMode", void 0);
      _defineProperty(this, "targetVerticalSpeed", void 0);
      _defineProperty(this, "targetAltitude", void 0);
      _defineProperty(this, "coarsePredictionsUpdate", new B77RS_Util.UpdateThrottler(5000));
      _defineProperty(this, "lastCruiseAltitude", 0);
    }
    init() {
      console.log('[FMGC/Guidance] VnavDriver initialized!');
    }
    acceptMultipleLegGeometry(geometry) {
      this.computeVerticalProfile(geometry);
    }
    update(deltaTime) {
      this.atmosphericConditions.update();
      if (this.coarsePredictionsUpdate.canUpdate(deltaTime) !== -1) {
        CoarsePredictions.CoarsePredictions.updatePredictions(this.guidanceController, this.atmosphericConditions);
      }
      const newCruiseAltitude = SimVar.GetSimVarValue('L:AIRLINER_CRUISE_ALTITUDE', 'number');
      if (newCruiseAltitude !== this.lastCruiseAltitude) {
        this.lastCruiseAltitude = newCruiseAltitude;
        this.computeVerticalProfile(this.guidanceController.activeGeometry);
      }
      this.updateGuidance();
    }
    computeVerticalProfile(geometry) {
      if (geometry.legs.size > 0) {
        if (VnavConfig.VnavConfig.VNAV_CALCULATE_CLIMB_PROFILE) {
          this.currentClimbProfile = ClimbPathBuilder.computeClimbPath(geometry);
        }
        if (this.guidanceController.flightPlanManager.getApproach(FlightPlanManager$1.FlightPlans.Active)) {
          this.currentApproachProfile = DecelPathBuilder$1.DecelPathBuilder.computeDecelPath(geometry);
        } else {
          this.currentApproachProfile = null;
        }
        this.currentDescentProfile = DescentBuilder$1.DescentBuilder.computeDescentPath(geometry, this.currentApproachProfile);
        this.guidanceController.pseudoWaypoints.acceptVerticalProfile();
      }
    }
    updateGuidance() {
      let newGuidanceMode = ControlLaws.RequestedVerticalMode.None;
      let newVerticalSpeed = 0;
      let newAltitude = 0;
      if (this.guidanceController.isManualHoldActive()) {
        const fcuVerticalMode = SimVar.GetSimVarValue('L:B77RS_FMA_VERTICAL_MODE', 'Enum');
        if (fcuVerticalMode === autopilot.VerticalMode.DES) {
          const holdSpeed = SimVar.GetSimVarValue('L:B77RS_FM_HOLD_SPEED', 'number');
          const atHoldSpeed = this.atmosphericConditions.currentAirspeed <= holdSpeed + 5;
          if (atHoldSpeed) {
            newGuidanceMode = ControlLaws.RequestedVerticalMode.VsSpeed;
            newVerticalSpeed = -1000;
            newAltitude = 0;
          }
        }
      }
      if (this.guidanceController.isManualHoldActive() || this.guidanceController.isManualHoldNext()) {
        let holdSpeedCas = SimVar.GetSimVarValue('L:B77RS_FM_HOLD_SPEED', 'number');
        const holdDecelReached = SimVar.GetSimVarValue('L:B77RS_FM_HOLD_DECEL', 'bool');
        const speedControlManual = Simplane.getAutoPilotAirspeedSelected();
        const isMach = Simplane.getAutoPilotMachModeActive();
        if (speedControlManual && holdDecelReached) {
          if (isMach) {
            const holdValue = Simplane.getAutoPilotMachHoldValue();
            holdSpeedCas = this.atmosphericConditions.computeCasFromMach(this.atmosphericConditions.currentAltitude, holdValue);
          } else {
            holdSpeedCas = Simplane.getAutoPilotAirspeedHoldValue();
          }
        }
        const holdSpeedTas = this.atmosphericConditions.computeTasFromCas(this.atmosphericConditions.currentAltitude, holdSpeedCas);
        this.guidanceController.setHoldSpeed(holdSpeedTas);
      }
      if (newGuidanceMode !== this.guidanceMode) {
        this.guidanceMode = newGuidanceMode;
        SimVar.SetSimVarValue('L:B77RS_FG_REQUESTED_VERTICAL_MODE', 'number', this.guidanceMode);
      }
      if (newVerticalSpeed !== this.targetVerticalSpeed) {
        this.targetVerticalSpeed = newVerticalSpeed;
        SimVar.SetSimVarValue('L:B77RS_FG_TARGET_VERTICAL_SPEED', 'number', this.targetVerticalSpeed);
      }
      if (newAltitude !== this.targetAltitude) {
        this.targetAltitude = newAltitude;
        SimVar.SetSimVarValue('L:B77RS_FG_TARGET_ALTITUDE', 'number', this.targetAltitude);
      }
    }
  }

  // How often the (milliseconds)
  const GEOMETRY_RECOMPUTATION_TIMER = 5000;
  class GuidanceController {
    get hasTemporaryFlightPlan() {
      // eslint-disable-next-line no-underscore-dangle
      return this.flightPlanManager._currentFlightPlanIndex === FlightPlans.Temporary;
    }
    updateEfisState(side, state) {
      const ndMode = SimVar.GetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_MODE"), 'Enum');
      const ndRange = NavigationDisplay.rangeSettings[SimVar.GetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_RANGE"), 'Enum')];
      if ((state === null || state === void 0 ? void 0 : state.mode) !== ndMode || (state === null || state === void 0 ? void 0 : state.range) !== ndRange) {
        this.taskQueue.cancelAllInCategory(TaskQueue.TaskCategory.EfisVectors);
        this.efisVectors.forceUpdate();
      }
      state.mode = ndMode;
      state.range = ndRange;
      this.updateEfisApproachMessage();
    }
    updateMrpState() {
      // PLAN mode center

      const focusedWpIndex = SimVar.GetSimVarValue('L:B77RS_SELECTED_WAYPOINT', 'number');
      const focusedWp = this.flightPlanManager.getWaypoint(focusedWpIndex);
      if (this.lastFocusedWpIndex !== focusedWpIndex) {
        this.lastFocusedWpIndex = focusedWpIndex;
        this.efisVectors.forceUpdate();
      }
      if (focusedWp) {
        this.focusedWaypointCoordinates.lat = focusedWp.infos.coordinates.lat;
        this.focusedWaypointCoordinates.long = focusedWp.infos.coordinates.long;
        SimVar.SetSimVarValue('L:B77RS_SELECTED_WAYPOINT_LAT', 'Degrees', this.focusedWaypointCoordinates.lat);
        SimVar.SetSimVarValue('L:B77RS_SELECTED_WAYPOINT_LONG', 'Degrees', this.focusedWaypointCoordinates.long);
      }
    }
    updateMapPartlyDisplayed() {
      if (this.efisStateForSide.L.dataLimitReached || this.efisStateForSide.L.legsCulled) {
        SimVar.SetSimVarValue('L:B77RS_EFIS_L_MAP_PARTLY_DISPLAYED', 'boolean', true);
      } else {
        SimVar.SetSimVarValue('L:B77RS_EFIS_L_MAP_PARTLY_DISPLAYED', 'boolean', false);
      }
      if (this.efisStateForSide.R.dataLimitReached || this.efisStateForSide.R.legsCulled) {
        SimVar.SetSimVarValue('L:B77RS_EFIS_R_MAP_PARTLY_DISPLAYED', 'boolean', true);
      } else {
        SimVar.SetSimVarValue('L:B77RS_EFIS_R_MAP_PARTLY_DISPLAYED', 'boolean', false);
      }
    }
    updateEfisIdent() {
      var _this$activeGeometry$, _this$activeGeometry$2;
      // Update EFIS ident

      const efisIdent = (_this$activeGeometry$ = (_this$activeGeometry$2 = this.activeGeometry.legs.get(this.activeLegIndex)) === null || _this$activeGeometry$2 === void 0 ? void 0 : _this$activeGeometry$2.ident) !== null && _this$activeGeometry$ !== void 0 ? _this$activeGeometry$ : 'PPOS';
      const efisVars = simvar.SimVarString.pack(efisIdent, 9);
      // setting the simvar as a number greater than about 16 million causes precision error > 1... but this works..
      SimVar.SetSimVarValue('L:B77RS_EFIS_L_TO_WPT_IDENT_0', 'string', efisVars[0].toString());
      SimVar.SetSimVarValue('L:B77RS_EFIS_L_TO_WPT_IDENT_1', 'string', efisVars[1].toString());
      SimVar.SetSimVarValue('L:B77RS_EFIS_R_TO_WPT_IDENT_0', 'string', efisVars[0].toString());
      SimVar.SetSimVarValue('L:B77RS_EFIS_R_TO_WPT_IDENT_1', 'string', efisVars[1].toString());
    }
    updateEfisApproachMessage() {
      let apprMsg = '';
      const appr = this.flightPlanManager.getApproach(FlightPlans.Active);
      if (appr && appr.approachType !== ApproachType.APPROACH_TYPE_UNKNOWN) {
        const phase = flightphase$1.getFlightPhaseManager().phase;
        if (phase > flightphase.FmgcFlightPhase.Cruise || phase === flightphase.FmgcFlightPhase.Cruise && this.flightPlanManager.getDistanceToDestination(FlightPlans.Active) < 250) {
          apprMsg = appr.name;
        }
      }
      if (apprMsg !== this.approachMessage) {
        this.approachMessage = apprMsg;
        const apprMsgVars = simvar.SimVarString.pack(apprMsg, 9);
        // setting the simvar as a number greater than about 16 million causes precision error > 1... but this works..
        SimVar.SetSimVarValue('L:B77RS_EFIS_L_APPR_MSG_0', 'string', apprMsgVars[0].toString());
        SimVar.SetSimVarValue('L:B77RS_EFIS_L_APPR_MSG_1', 'string', apprMsgVars[1].toString());
        SimVar.SetSimVarValue('L:B77RS_EFIS_R_APPR_MSG_0', 'string', apprMsgVars[0].toString());
        SimVar.SetSimVarValue('L:B77RS_EFIS_R_APPR_MSG_1', 'string', apprMsgVars[1].toString());
      }
    }
    constructor(flightPlanManager, guidanceManager) {
      _defineProperty(this, "flightPlanManager", void 0);
      _defineProperty(this, "guidanceManager", void 0);
      _defineProperty(this, "lnavDriver", void 0);
      _defineProperty(this, "vnavDriver", void 0);
      _defineProperty(this, "pseudoWaypoints", void 0);
      _defineProperty(this, "efisVectors", void 0);
      _defineProperty(this, "activeGeometry", void 0);
      _defineProperty(this, "temporaryGeometry", void 0);
      _defineProperty(this, "activeLegIndex", void 0);
      _defineProperty(this, "temporaryLegIndex", -1);
      _defineProperty(this, "activeTransIndex", void 0);
      _defineProperty(this, "activeLegDtg", void 0);
      _defineProperty(this, "activeLegCompleteLegPathDtg", void 0);
      _defineProperty(this, "displayActiveLegCompleteLegPathDtg", void 0);
      _defineProperty(this, "focusedWaypointCoordinates", {
        lat: 0,
        long: 0
      });
      _defineProperty(this, "currentPseudoWaypoints", []);
      _defineProperty(this, "automaticSequencing", true);
      _defineProperty(this, "leftEfisState", void 0);
      _defineProperty(this, "rightEfisState", void 0);
      _defineProperty(this, "efisStateForSide", void 0);
      _defineProperty(this, "approachMessage", '');
      _defineProperty(this, "taskQueue", new TaskQueue.TaskQueue());
      _defineProperty(this, "listener", RegisterViewListener('JS_LISTENER_SIMVARS', null, true));
      _defineProperty(this, "lastFocusedWpIndex", -1);
      _defineProperty(this, "lastFlightPlanVersion", SimVar.GetSimVarValue(FlightPlanManager.FlightPlanVersionKey, 'number'));
      _defineProperty(this, "geometryRecomputationTimer", GEOMETRY_RECOMPUTATION_TIMER + 1);
      this.flightPlanManager = flightPlanManager;
      this.guidanceManager = guidanceManager;
      this.lnavDriver = new LnavDriver(this);
      this.vnavDriver = new VnavDriver(this);
      this.pseudoWaypoints = new PseudoWaypoints.PseudoWaypoints(this);
      this.efisVectors = new EfisVectors.EfisVectors(this);
    }
    init() {
      console.log('[FMGC/Guidance] GuidanceController initialized!');
      this.lnavDriver.ppos.lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      this.lnavDriver.ppos.long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      this.activeLegIndex = this.flightPlanManager.getActiveWaypointIndex(false, false, FlightPlans.Active);
      this.updateGeometries();
      this.leftEfisState = {
        mode: NavigationDisplay.Mode.ARC,
        range: 10,
        dataLimitReached: false,
        legsCulled: false
      };
      this.rightEfisState = {
        mode: NavigationDisplay.Mode.ARC,
        range: 10,
        dataLimitReached: false,
        legsCulled: false
      };
      this.efisStateForSide = {
        L: this.leftEfisState,
        R: this.rightEfisState
      };
      this.updateEfisState('L', this.leftEfisState);
      this.updateEfisState('R', this.rightEfisState);
      this.efisStateForSide.L = this.leftEfisState;
      this.efisStateForSide.R = this.leftEfisState;
      this.lnavDriver.init();
      this.vnavDriver.init();
      this.pseudoWaypoints.init();
      Coherent.on('B77RS_IMM_EXIT', (fpIndex, immExit) => {
        const leg = this.activeGeometry.legs.get(fpIndex);
        const tas = SimVar.GetSimVarValue('AIRSPEED TRUE', 'Knots');
        if (leg instanceof HX.HMLeg) {
          leg.setImmediateExit(immExit, this.lnavDriver.ppos, tas);
          this.flightPlanManager.updateFlightPlanVersion();
          this.automaticSequencing = true;
        }
      }, undefined);
    }
    update(deltaTime) {
      this.geometryRecomputationTimer += deltaTime;
      this.activeLegIndex = this.flightPlanManager.getActiveWaypointIndex(false, false, FlightPlans.Active);
      this.temporaryLegIndex = this.flightPlanManager.getActiveWaypointIndex(false, false, FlightPlans.Temporary);
      this.updateEfisState('L', this.leftEfisState);
      this.updateEfisState('R', this.rightEfisState);

      // Generate new geometry when flight plan changes
      // TODO also need to do it when FMS perf params change, e.g. speed limit/alt, climb/crz/des speeds
      const newFlightPlanVersion = this.flightPlanManager.currentFlightPlanVersion;
      if (newFlightPlanVersion !== this.lastFlightPlanVersion) {
        this.lastFlightPlanVersion = newFlightPlanVersion;
        try {
          this.updateGeometries();
          this.geometryRecomputationTimer = GEOMETRY_RECOMPUTATION_TIMER + 1;
        } catch (e) {
          console.error('[FMS] Error during update of geometry. See exception below.');
          console.error(e);
        }
      }
      if (this.geometryRecomputationTimer > GEOMETRY_RECOMPUTATION_TIMER) {
        this.geometryRecomputationTimer = 0;
        try {
          this.recomputeGeometries();
          if (this.activeGeometry) {
            this.vnavDriver.acceptMultipleLegGeometry(this.activeGeometry);
            this.pseudoWaypoints.acceptMultipleLegGeometry(this.activeGeometry);
          }
        } catch (e) {
          console.error('[FMS] Error during geometry recomputation. See exception below.');
          console.error(e);
        }
      }
      try {
        this.updateMrpState();
      } catch (e) {
        console.error('[FMS] Error during map state computation. See exception below.');
        console.error(e);
      }
      try {
        this.updateMapPartlyDisplayed();
      } catch (e) {
        console.error('[FMS] Error during map partly displayed computation. See exception below.');
        console.error(e);
      }
      try {
        this.lnavDriver.update(deltaTime);
      } catch (e) {
        console.error('[FMS] Error during LNAV driver update. See exception below.');
        console.error(e);
      }
      try {
        this.vnavDriver.update(deltaTime);
      } catch (e) {
        console.error('[FMS] Error during VNAV driver update. See exception below.');
        console.error(e);
      }
      try {
        this.pseudoWaypoints.update(deltaTime);
      } catch (e) {
        console.error('[FMS] Error during pseudo waypoints update. See exception below.');
        console.error(e);
      }
      try {
        this.efisVectors.update(deltaTime);
      } catch (e) {
        console.error('[FMS] Error during EFIS vectors update. See exception below.');
        console.error(e);
      }
      try {
        this.taskQueue.update(deltaTime);
      } catch (e) {
        console.error('[FMS] Error during task queue update. See exception below.');
        console.error(e);
      }
    }

    /**
     * Called when the lateral flight plan is changed
     */
    updateGeometries() {
      this.updateActiveGeometry();
      if (this.flightPlanManager.getFlightPlan(FlightPlans.Temporary)) {
        this.updateTemporaryGeometry();
      } else {
        this.temporaryGeometry = undefined;
      }
      this.recomputeGeometries();
      this.updateEfisIdent();
      this.geometryRecomputationTimer = 0;
      this.vnavDriver.acceptMultipleLegGeometry(this.activeGeometry);
      this.pseudoWaypoints.acceptMultipleLegGeometry(this.activeGeometry);
    }
    updateActiveGeometry() {
      const wptCount = this.flightPlanManager.getWaypointsCount(FlightPlans.Active);
      const activeIdx = this.flightPlanManager.getActiveWaypointIndex(false, false, FlightPlans.Active);
      if (this.activeGeometry) {
        this.guidanceManager.updateGeometry(this.activeGeometry, FlightPlans.Active, activeIdx, wptCount);
      } else {
        this.activeGeometry = this.guidanceManager.getMultipleLegGeometry();
      }
    }
    updateTemporaryGeometry() {
      const wptCount = this.flightPlanManager.getWaypointsCount(FlightPlans.Temporary);
      const activeIdx = this.flightPlanManager.getActiveWaypointIndex(false, false, FlightPlans.Temporary);
      if (this.temporaryGeometry) {
        this.guidanceManager.updateGeometry(this.temporaryGeometry, FlightPlans.Temporary, activeIdx, wptCount);
      } else {
        this.temporaryGeometry = this.guidanceManager.getMultipleLegGeometry(true);
      }
    }
    recomputeGeometries() {
      const tas = SimVar.GetSimVarValue('AIRSPEED TRUE', 'Knots');
      const gs = SimVar.GetSimVarValue('GPS GROUND SPEED', 'Knots');
      const trueTrack = SimVar.GetSimVarValue('GPS GROUND TRUE TRACK', 'degree');
      if (this.activeGeometry) {
        this.activeGeometry.recomputeWithParameters(tas, gs, this.lnavDriver.ppos, trueTrack, this.activeLegIndex, this.activeTransIndex);
      }
      if (this.temporaryGeometry) {
        this.temporaryGeometry.recomputeWithParameters(tas, gs, this.lnavDriver.ppos, trueTrack, this.temporaryLegIndex, this.temporaryLegIndex - 1);
      }
    }

    /**
     * Notifies the FMS that a pseudo waypoint must be sequenced.
     *
     * This is to be sued by {@link LnavDriver} only.
     *
     * @param pseudoWaypoint the {@link PseudoWaypoint} to sequence.
     */
    sequencePseudoWaypoint(pseudoWaypoint) {
      this.pseudoWaypoints.sequencePseudoWaypoint(pseudoWaypoint);
    }
    isManualHoldActive() {
      if (this.activeGeometry) {
        const activeLeg = this.activeGeometry.legs.get(this.activeLegIndex);
        return activeLeg instanceof HX.HMLeg;
      }
      return false;
    }
    isManualHoldNext() {
      if (this.activeGeometry) {
        const nextLeg = this.activeGeometry.legs.get(this.activeLegIndex + 1);
        return nextLeg instanceof HX.HMLeg;
      }
      return false;
    }
    setHoldSpeed(tas) {
      let holdLeg;
      if (this.isManualHoldActive()) {
        holdLeg = this.activeGeometry.legs.get(this.activeLegIndex);
      } else if (this.isManualHoldNext()) {
        holdLeg = this.activeGeometry.legs.get(this.activeLegIndex + 1);
      }
      if (holdLeg) {
        holdLeg.setPredictedTas(tas);
      }
    }
  }

  let TuningMode;

  /**
   * This is a placeholder for the new radio nav tuning logic... coming soon to an B77RS near you
   */
  (function (TuningMode) {
    TuningMode[TuningMode["Auto"] = 0] = "Auto";
    TuningMode[TuningMode["Manual"] = 1] = "Manual";
    TuningMode[TuningMode["Remote"] = 2] = "Remote";
  })(TuningMode || (TuningMode = {}));
  class NavRadioManager {
    constructor(_parentInstrument) {
      this._parentInstrument = _parentInstrument;
      _defineProperty(this, "tuningMode1", TuningMode.Auto);
      _defineProperty(this, "tuningMode2", TuningMode.Auto);
      _defineProperty(this, "tuningMode3", TuningMode.Auto);
      SimVar.SetSimVarValue('L:B77RS_AIMS_RADIONAV_1_TUNING_MODE', 'Enum', TuningMode.Manual);
      SimVar.SetSimVarValue('L:B77RS_AIMS_RADIONAV_2_TUNING_MODE', 'Enum', TuningMode.Manual);
      SimVar.SetSimVarValue('L:B77RS_AIMS_RADIONAV_3_TUNING_MODE', 'Enum', TuningMode.Manual);
    }
    update(_) {
      // Do nothing
    }
  }

  // WARNING: this is a temporary implementation until the new nav database is complete
  // Do not write any code which depends on it
  class NearbyFacilities {
    // metres

    constructor() {
      _defineProperty(this, "nearbyAirports", new Map());
      _defineProperty(this, "nearbyNdbNavaids", new Map());
      _defineProperty(this, "nearbyVhfNavaids", new Map());
      _defineProperty(this, "nearbyWaypoints", new Map());
      _defineProperty(this, "version", 0);
      _defineProperty(this, "listener", void 0);
      _defineProperty(this, "initDone", false);
      _defineProperty(this, "airportSessionId", void 0);
      _defineProperty(this, "ndbSessionId", void 0);
      _defineProperty(this, "vorSessionId", void 0);
      _defineProperty(this, "waypointSessionId", void 0);
      _defineProperty(this, "lastPpos", {
        lat: 0,
        long: 0
      });
      _defineProperty(this, "throttler", new UpdateThrottler(10000));
      _defineProperty(this, "radius", 381 * 1852);
      _defineProperty(this, "limit", 160);
      this.listener = RegisterViewListener('JS_LISTENER_FACILITY', async () => {
        this.listener.on('SendAirport', this.addAirport.bind(this));
        this.listener.on('SendIntersection', this.addWaypoint.bind(this));
        this.listener.on('SendNdb', this.addNdbNavaid.bind(this));
        this.listener.on('SendVor', this.addVhfNavaid.bind(this));
        this.listener.on('NearestSearchCompleted', this.onSearchCompleted.bind(this));
        this.airportSessionId = await Coherent.call('START_NEAREST_SEARCH_SESSION', NearestSearchType.Airport);
        this.ndbSessionId = await Coherent.call('START_NEAREST_SEARCH_SESSION', NearestSearchType.Ndb);
        this.vorSessionId = await Coherent.call('START_NEAREST_SEARCH_SESSION', NearestSearchType.Vor);
        this.waypointSessionId = await Coherent.call('START_NEAREST_SEARCH_SESSION', NearestSearchType.Intersection);
        this.initDone = true;
      });
    }
    init() {
      // Do nothing for now
    }
    async update(deltaTime) {
      if (!this.initDone || this.throttler.canUpdate(deltaTime) === -1) {
        return;
      }
      const ppos = {
        lat: SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude'),
        long: SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude')
      };
      if (Avionics.Utils.computeDistance(ppos, this.lastPpos) > 5) {
        this.lastPpos = ppos;
      }
      Coherent.call('SEARCH_NEAREST', this.airportSessionId, this.lastPpos.lat, this.lastPpos.long, this.radius, this.limit);
      Coherent.call('SEARCH_NEAREST', this.vorSessionId, this.lastPpos.lat, this.lastPpos.long, this.radius, this.limit);
      Coherent.call('SEARCH_NEAREST', this.ndbSessionId, this.lastPpos.lat, this.lastPpos.long, this.radius, this.limit);
      Coherent.call('SEARCH_NEAREST', this.waypointSessionId, this.lastPpos.lat, this.lastPpos.long, this.radius, this.limit);
    }
    onSearchCompleted(result) {
      let nearestList;
      let loadCall;
      switch (result.sessionId) {
        case this.airportSessionId:
          nearestList = this.nearbyAirports;
          loadCall = 'LOAD_AIRPORTS';
          break;
        case this.ndbSessionId:
          nearestList = this.nearbyNdbNavaids;
          loadCall = 'LOAD_NDBS';
          break;
        case this.vorSessionId:
          nearestList = this.nearbyVhfNavaids;
          loadCall = 'LOAD_VORS';
          break;
        case this.waypointSessionId:
          nearestList = this.nearbyWaypoints;
          loadCall = 'LOAD_INTERSECTIONS';
          break;
        default:
          console.warn('Unknown session', result.sessionId);
          return;
      }
      for (const icao of result.removed) {
        delete nearestList[icao];
        this.version++;
      }
      const loadIcaos = [];
      for (const icao of result.added) {
        if (nearestList.has(icao)) {
          continue;
        }
        loadIcaos.push(icao);
      }
      if (loadIcaos.length > 0) {
        Coherent.call(loadCall, loadIcaos);
      }
    }
    addAirport(airport) {
      this.nearbyAirports.set(airport.icao, airport);
      this.version++;
    }
    addWaypoint(waypoint) {
      this.nearbyWaypoints.set(waypoint.icao, waypoint);
      this.version++;
    }
    addNdbNavaid(ndb) {
      this.nearbyNdbNavaids.set(ndb.icao, ndb);
      this.version++;
    }
    addVhfNavaid(vor) {
      this.nearbyVhfNavaids.set(vor.icao, vor);
      this.version++;
    }
  }

  class EfisSymbols {
    constructor(flightPlanManager, guidanceController) {
      _defineProperty(this, "blockUpdate", false);
      _defineProperty(this, "flightPlanManager", void 0);
      _defineProperty(this, "guidanceController", void 0);
      _defineProperty(this, "guidanceManager", void 0);
      _defineProperty(this, "nearby", void 0);
      _defineProperty(this, "syncer", new FlowEventSync.FlowEventSync());
      _defineProperty(this, "lastMode", {
        L: -1,
        R: -1
      });
      _defineProperty(this, "lastRange", {
        L: 0,
        R: 0
      });
      _defineProperty(this, "lastEfisOption", {
        L: 0,
        R: 0
      });
      _defineProperty(this, "lastPlanCentre", undefined);
      _defineProperty(this, "lastPpos", {
        lat: 0,
        long: 0
      });
      _defineProperty(this, "lastTrueHeading", -1);
      _defineProperty(this, "lastNearbyFacilitiesVersion", void 0);
      _defineProperty(this, "lastFpVersion", void 0);
      this.flightPlanManager = flightPlanManager;
      this.guidanceController = guidanceController;
      this.guidanceManager = guidanceController.guidanceManager;
      this.nearby = new NearbyFacilities();
    }
    init() {
      this.nearby.init();
    }
    async update(deltaTime) {
      var _this$flightPlanManag, _this$lastPlanCentre, _this$lastPlanCentre2;
      this.nearby.update(deltaTime);
      if (this.blockUpdate) {
        return;
      }

      // TODO use FMGC position
      const ppos = {
        lat: SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude'),
        long: SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude')
      };
      const trueHeading = SimVar.GetSimVarValue('PLANE HEADING DEGREES TRUE', 'degrees');
      const pposChanged = Avionics.Utils.computeDistance(this.lastPpos, ppos) > 2;
      if (pposChanged) {
        this.lastPpos = ppos;
      }
      const trueHeadingChanged = Avionics.Utils.diffAngle(trueHeading, this.lastTrueHeading) > 2;
      if (trueHeadingChanged) {
        this.lastTrueHeading = trueHeading;
      }
      const nearbyFacilitiesChanged = this.nearby.version !== this.lastNearbyFacilitiesVersion;
      this.lastNearbyFacilitiesVersion = this.nearby.version;
      const fpChanged = this.lastFpVersion !== this.flightPlanManager.currentFlightPlanVersion;
      this.lastFpVersion = this.flightPlanManager.currentFlightPlanVersion;
      // FIXME map reference point should be per side
      const planCentreIndex = SimVar.GetSimVarValue('L:B77RS_SELECTED_WAYPOINT', 'number');
      const planCentre = (_this$flightPlanManag = this.flightPlanManager.getWaypoint(planCentreIndex)) === null || _this$flightPlanManag === void 0 ? void 0 : _this$flightPlanManag.infos.coordinates;
      const planCentreChanged = (planCentre === null || planCentre === void 0 ? void 0 : planCentre.lat) !== ((_this$lastPlanCentre = this.lastPlanCentre) === null || _this$lastPlanCentre === void 0 ? void 0 : _this$lastPlanCentre.lat) || (planCentre === null || planCentre === void 0 ? void 0 : planCentre.long) !== ((_this$lastPlanCentre2 = this.lastPlanCentre) === null || _this$lastPlanCentre2 === void 0 ? void 0 : _this$lastPlanCentre2.long);
      this.lastPlanCentre = planCentre;
      const activeFp = this.flightPlanManager.getCurrentFlightPlan();
      // TODO temp f-pln

      const hasSuitableRunway = airport => {
        for (const runway of airport.runways) {
          switch (runway.surface) {
            case RunwaySurface.Asphalt:
            case RunwaySurface.Bituminous:
            case RunwaySurface.Concrete:
            case RunwaySurface.Tarmac:
              if (runway.length >= 1500 && runway.width >= 30) {
                return true;
              }
              break;
          }
        }
        return false;
      };
      for (const side of EfisSymbols.sides) {
        const range = NavigationDisplay.rangeSettings[SimVar.GetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_RANGE"), 'number')];
        const mode = SimVar.GetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_MODE"), 'number');
        const efisOption = SimVar.GetSimVarValue("L:B77RS_EFIS_".concat(side, "_OPTION"), 'Enum');
        const rangeChange = this.lastRange[side] !== range;
        this.lastRange[side] = range;
        const modeChange = this.lastMode[side] !== mode;
        this.lastMode[side] = mode;
        const efisOptionChange = this.lastEfisOption[side] !== efisOption;
        this.lastEfisOption[side] = efisOption;
        const nearbyOverlayChanged = efisOption !== NavigationDisplay.EfisOption.Constraints && efisOption !== NavigationDisplay.EfisOption.None && nearbyFacilitiesChanged;
        if (!pposChanged && !trueHeadingChanged && !rangeChange && !modeChange && !efisOptionChange && !nearbyOverlayChanged && !fpChanged && !planCentreChanged) {
          continue;
        }
        if (mode === NavigationDisplay.Mode.PLAN && !planCentre) {
          this.syncer.sendEvent("B77RS_EFIS_".concat(side, "_SYMBOLS"), []);
          return;
        }
        const [editAhead, editBehind, editBeside] = this.calculateEditArea(range, mode);

        // eslint-disable-next-line no-loop-func
        const withinEditArea = ll => {
          const dist = Avionics.Utils.computeGreatCircleDistance(mode === NavigationDisplay.Mode.PLAN ? planCentre : ppos, ll);
          let bearing = Avionics.Utils.computeGreatCircleHeading(mode === NavigationDisplay.Mode.PLAN ? planCentre : ppos, ll);
          if (mode !== NavigationDisplay.Mode.PLAN) {
            bearing = Avionics.Utils.clampAngle(bearing - trueHeading);
          }
          bearing = bearing * Math.PI / 180;
          const dx = dist * Math.sin(bearing);
          const dy = dist * Math.cos(bearing);
          return Math.abs(dx) < editBeside && dy > -editBehind && dy < editAhead;
        };
        const symbols = [];

        // symbols most recently inserted always end up at the end of the array
        // we reverse the array at the end to make sure symbols are drawn in the correct order
        // eslint-disable-next-line no-loop-func
        const upsertSymbol = symbol => {
          const symbolIdx = symbols.findIndex(s => s.databaseId === symbol.databaseId);
          if (symbolIdx !== -1) {
            var _symbol$constraints, _symbol$direction, _symbol$length, _symbol$location;
            const oldSymbol = symbols.splice(symbolIdx, 1)[0];
            symbol.constraints = (_symbol$constraints = symbol.constraints) !== null && _symbol$constraints !== void 0 ? _symbol$constraints : oldSymbol.constraints;
            symbol.direction = (_symbol$direction = symbol.direction) !== null && _symbol$direction !== void 0 ? _symbol$direction : oldSymbol.direction;
            symbol.length = (_symbol$length = symbol.length) !== null && _symbol$length !== void 0 ? _symbol$length : oldSymbol.length;
            symbol.location = (_symbol$location = symbol.location) !== null && _symbol$location !== void 0 ? _symbol$location : oldSymbol.location;
            symbol.type |= oldSymbol.type;
            if (oldSymbol.radials) {
              if (symbol.radials) {
                symbol.radials.push(...oldSymbol.radials);
              } else {
                symbol.radials = oldSymbol.radials;
              }
            }
            if (oldSymbol.radii) {
              if (symbol.radii) {
                symbol.radii.push(...oldSymbol.radii);
              } else {
                symbol.radii = oldSymbol.radii;
              }
            }
          }
          symbols.push(symbol);
        };

        // TODO ADIRs aligned (except in plan mode...?)
        if (efisOption === NavigationDisplay.EfisOption.VorDmes) {
          for (const vor of this.nearby.nearbyVhfNavaids.values()) {
            if (vor.type !== VorType.VORDME && vor.type !== VorType.VOR && vor.type !== VorType.DME && vor.type !== VorType.VORTAC && vor.type !== VorType.TACAN) {
              continue;
            }
            const ll = {
              lat: vor.lat,
              long: vor.lon
            };
            if (withinEditArea(ll)) {
              upsertSymbol({
                databaseId: vor.icao,
                ident: vor.icao.substring(7, 12),
                location: ll,
                type: this.vorDmeTypeFlag(vor.type) | NavigationDisplay.NdSymbolTypeFlags.EfisOption
              });
            }
          }
        } else if (efisOption === NavigationDisplay.EfisOption.Ndbs) {
          for (const ndb of this.nearby.nearbyNdbNavaids.values()) {
            const ll = {
              lat: ndb.lat,
              long: ndb.lon
            };
            if (withinEditArea(ll)) {
              upsertSymbol({
                databaseId: ndb.icao,
                ident: ndb.icao.substring(7, 12),
                location: ll,
                type: NavigationDisplay.NdSymbolTypeFlags.Ndb | NavigationDisplay.NdSymbolTypeFlags.EfisOption
              });
            }
          }
        } else if (efisOption === NavigationDisplay.EfisOption.Airports) {
          for (const ap of this.nearby.nearbyAirports.values()) {
            const ll = {
              lat: ap.lat,
              long: ap.lon
            };
            if (withinEditArea(ll) && hasSuitableRunway(ap)) {
              upsertSymbol({
                databaseId: ap.icao,
                ident: ap.icao.substring(7, 12),
                location: ll,
                type: NavigationDisplay.NdSymbolTypeFlags.Airport | NavigationDisplay.NdSymbolTypeFlags.EfisOption
              });
            }
          }
        } else if (efisOption === NavigationDisplay.EfisOption.Waypoints) {
          for (const wp of this.nearby.nearbyWaypoints.values()) {
            const ll = {
              lat: wp.lat,
              long: wp.lon
            };
            if (withinEditArea(ll)) {
              upsertSymbol({
                databaseId: wp.icao,
                ident: wp.icao.substring(7, 12),
                location: ll,
                type: NavigationDisplay.NdSymbolTypeFlags.Waypoint | NavigationDisplay.NdSymbolTypeFlags.EfisOption
              });
            }
          }
        }
        for (let i = 0; i < 4; i++) {
          const fixInfo = this.flightPlanManager.getFixInfo(i);
          const refFix = fixInfo === null || fixInfo === void 0 ? void 0 : fixInfo.getRefFix();
          if (refFix !== undefined) {
            upsertSymbol({
              databaseId: refFix.icao,
              ident: refFix.ident,
              location: refFix.infos.coordinates,
              type: NavigationDisplay.NdSymbolTypeFlags.FixInfo,
              radials: fixInfo.getRadialTrueBearings(),
              radii: [fixInfo.getRadiusValue()]
            });
          }
        }
        const formatConstraintAlt = function (alt, descent) {
          var _activeFp$originTrans, _activeFp$destination;
          let prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          const transAlt = (_activeFp$originTrans = activeFp === null || activeFp === void 0 ? void 0 : activeFp.originTransitionAltitudePilot) !== null && _activeFp$originTrans !== void 0 ? _activeFp$originTrans : activeFp === null || activeFp === void 0 ? void 0 : activeFp.originTransitionAltitudeDb;
          const transFl = (_activeFp$destination = activeFp === null || activeFp === void 0 ? void 0 : activeFp.destinationTransitionLevelPilot) !== null && _activeFp$destination !== void 0 ? _activeFp$destination : activeFp === null || activeFp === void 0 ? void 0 : activeFp.destinationTransitionLevelDb;
          if (descent) {
            const fl = Math.round(alt / 100);
            if (transFl && fl >= transFl) {
              return "".concat(prefix, "FL").concat(fl);
            }
          } else if (transAlt && alt >= transAlt) {
            return "".concat(prefix, "FL").concat(Math.round(alt / 100));
          }
          return "".concat(prefix).concat(Math.round(alt));
        };
        const formatConstraintSpeed = function (speed) {
          let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          return "".concat(prefix).concat(Math.floor(speed), "KT");
        };
        for (const [index, leg] of this.guidanceController.activeGeometry.legs.entries()) {
          if (!leg.isNull && leg.terminationWaypoint && leg.displayedOnMap) {
            if (!(leg.terminationWaypoint instanceof WayPoint)) {
              const isActive = index === this.guidanceController.activeLegIndex;
              let type = NavigationDisplay.NdSymbolTypeFlags.FlightPlan;
              if (isActive) {
                type |= NavigationDisplay.NdSymbolTypeFlags.ActiveLegTermination;
              }
              const ident = leg.ident;
              const cutIdent = leg.ident.substring(0, 4).padEnd(5, ' ');
              const id = (Math.random() * 10000000).toString().substring(0, 5);
              upsertSymbol({
                databaseId: "X".concat(id).concat(cutIdent),
                ident,
                type,
                location: leg.terminationWaypoint
              });
            }
          }
        }

        // TODO don't send the waypoint before active once FP sequencing is properly implemented
        // (currently sequences with guidance which is too early)
        // eslint-disable-next-line no-lone-blocks
        {
          for (let i = activeFp.length - 1; i >= activeFp.activeWaypointIndex - 1 && i >= 0; i--) {
            const wp = activeFp.getWaypoint(i);

            // Managed by legs
            // FIXME these should integrate with the normal algorithms to pick up contraints, not be drawn in enroute ranges, etc.
            const legType = wp.additionalData.legType;
            if (legType === LegType.CA || legType === LegType.CR || legType === LegType.CI || legType === LegType.FM || legType === LegType.PI || legType === LegType.VA || legType === LegType.VI || legType === LegType.VM) {
              continue;
            }
            if (wp.type === 'A') {
              // we pick these up later
              continue;
            }
            // if range >= 160, don't include terminal waypoints, except at enroute boundary
            if (range >= 160) {
              const segment = activeFp.findSegmentByWaypointIndex(i);
              if (segment.type === wtsdk$1.SegmentType.Departure) {
                // keep the last waypoint from the SID as it is the enroute boundary
                if (!activeFp.isLastWaypointInSegment(i)) {
                  continue;
                }
              } else if (segment.type !== wtsdk$1.SegmentType.Enroute) {
                continue;
              }
            }
            if (!withinEditArea(wp.infos.coordinates)) {
              continue;
            }
            let type = NavigationDisplay.NdSymbolTypeFlags.FlightPlan;
            const constraints = [];
            let direction;
            const isCourseReversal = wp.additionalData.legType === LegType.HA || wp.additionalData.legType === LegType.HF || wp.additionalData.legType === LegType.HM || wp.additionalData.legType === LegType.PI;
            if (i === activeFp.activeWaypointIndex) {
              type |= NavigationDisplay.NdSymbolTypeFlags.ActiveLegTermination;
            } else if (isCourseReversal && i > activeFp.activeWaypointIndex + 1 && range <= 80 && !LnavConfig$1.LnavConfig.DEBUG_FORCE_INCLUDE_COURSE_REVERSAL_VECTORS) {
              if (wp.turnDirection === TurnDirection.Left) {
                type |= NavigationDisplay.NdSymbolTypeFlags.CourseReversalLeft;
              } else {
                type |= NavigationDisplay.NdSymbolTypeFlags.CourseReversalRight;
              }
              direction = wp.additionalData.course;
            }
            if (wp.legAltitudeDescription > 0 && wp.legAltitudeDescription < 6) {
              // TODO vnav to predict
              type |= NavigationDisplay.NdSymbolTypeFlags.ConstraintUnknown;
            }
            if (efisOption === NavigationDisplay.EfisOption.Constraints) {
              const descent = wp.constraintType === FlightPlanManager$2.WaypointConstraintType.DES;
              switch (wp.legAltitudeDescription) {
                case 1:
                  constraints.push(formatConstraintAlt(wp.legAltitude1, descent));
                  break;
                case 2:
                  constraints.push(formatConstraintAlt(wp.legAltitude1, descent, '+'));
                  break;
                case 3:
                  constraints.push(formatConstraintAlt(wp.legAltitude1, descent, '-'));
                  break;
                case 4:
                  constraints.push(formatConstraintAlt(wp.legAltitude1, descent, '-'));
                  constraints.push(formatConstraintAlt(wp.legAltitude2, descent, '+'));
                  break;
              }
              if (wp.speedConstraint > 0) {
                constraints.push(formatConstraintSpeed(wp.speedConstraint));
              }
            }
            upsertSymbol({
              databaseId: wp.icao,
              ident: wp.ident,
              location: wp.infos.coordinates,
              type,
              constraints: constraints.length > 0 ? constraints : undefined,
              direction
            });
          }
        }
        const airports = [[activeFp.originAirfield, activeFp.getOriginRunway()], [activeFp.destinationAirfield, activeFp.getDestinationRunway()]];
        for (const [airport, runway] of airports) {
          if (!airport) {
            continue;
          }
          if (runway) {
            if (withinEditArea(runway.beginningCoordinates)) {
              upsertSymbol({
                databaseId: airport.icao,
                ident: "".concat(airport.ident).concat(Avionics.Utils.formatRunway(runway.designation)),
                location: runway.beginningCoordinates,
                direction: runway.direction,
                length: runway.length / 1852,
                type: NavigationDisplay.NdSymbolTypeFlags.Runway
              });
            }
          } else if (withinEditArea(airport.infos.coordinates)) {
            upsertSymbol({
              databaseId: airport.icao,
              ident: airport.ident,
              location: airport.infos.coordinates,
              type: NavigationDisplay.NdSymbolTypeFlags.Airport
            });
          }
        }

        // Pseudo waypoints

        for (const pwp of this.guidanceController.currentPseudoWaypoints.filter(it => it)) {
          upsertSymbol({
            databaseId: "W      ".concat(pwp.ident),
            ident: pwp.ident,
            location: pwp.efisSymbolLla,
            type: pwp.efisSymbolFlag
          });
        }
        const wordsPerSymbol = 6;
        const maxSymbols = 640 / wordsPerSymbol;
        if (symbols.length > maxSymbols) {
          symbols.splice(0, symbols.length - maxSymbols);
          this.guidanceController.efisStateForSide[side].dataLimitReached = true;
        } else {
          this.guidanceController.efisStateForSide[side].dataLimitReached = false;
        }
        this.syncer.sendEvent("B77RS_EFIS_".concat(side, "_SYMBOLS"), symbols);

        // make sure we don't run too often
        this.blockUpdate = true;
        setTimeout(() => {
          this.blockUpdate = false;
        }, 200);
      }
    }
    generatePathVectorSymbol(vector) {
      let typeVectorPart;
      if (vector.type === PathVector.PathVectorType.Line) {
        typeVectorPart = NavigationDisplay.NdSymbolTypeFlags.FlightPlanVectorLine;
      } else if (vector.type === PathVector.PathVectorType.Arc) {
        typeVectorPart = NavigationDisplay.NdSymbolTypeFlags.FlightPlanVectorArc;
      } else if (vector.type === PathVector.PathVectorType.DebugPoint) {
        typeVectorPart = NavigationDisplay.NdSymbolTypeFlags.FlightPlanVectorDebugPoint;
      }

      // FIXME https://cdn.discordapp.com/attachments/845070631644430359/911876826169741342/brabs.gif
      const id = Math.round(Math.random() * 10000).toString();
      const symbol = {
        databaseId: id,
        ident: vector.type === PathVector.PathVectorType.DebugPoint ? vector.annotation : id,
        type: NavigationDisplay.NdSymbolTypeFlags.ActiveFlightPlanVector | typeVectorPart,
        location: vector.startPoint
      };
      if (vector.type === PathVector.PathVectorType.Line) {
        symbol.lineEnd = vector.endPoint;
      }
      if (vector.type === PathVector.PathVectorType.Arc) {
        symbol.arcEnd = vector.endPoint;
        symbol.arcRadius = msfsGeo.distanceTo(vector.startPoint, vector.centrePoint);
        symbol.arcSweepAngle = vector.sweepAngle;
      }
      return symbol;
    }
    vorDmeTypeFlag(type) {
      switch (type) {
        case VorType.VORDME:
        case VorType.VORTAC:
          return NavigationDisplay.NdSymbolTypeFlags.VorDme;
        case VorType.VOR:
          return NavigationDisplay.NdSymbolTypeFlags.Vor;
        case VorType.DME:
        case VorType.TACAN:
          return NavigationDisplay.NdSymbolTypeFlags.Dme;
        default:
          return 0;
      }
    }
    findPointFromEndOfPath(path, distanceFromEnd) {
      let accumulator = 0;

      // FIXME take transitions into account on newer FMSs
      for (const [, leg] of path.legs) {
        accumulator += leg.distance;
        if (accumulator > distanceFromEnd) {
          const distanceFromEndOfLeg = distanceFromEnd - (accumulator - leg.distance);
          return leg.getPseudoWaypointLocation(distanceFromEndOfLeg);
        }
      }

      // console.error(`[VNAV/findPointFromEndOfPath] ${distanceFromEnd.toFixed(2)}nm is larger than the total lateral path.`);

      return undefined;
    }
    calculateEditArea(range, mode) {
      switch (mode) {
        case NavigationDisplay.Mode.ARC:
          if (range <= 10) {
            return [10.5, 3.5, 8.3];
          }
          if (range <= 20) {
            return [20.5, 7, 16.6];
          }
          if (range <= 40) {
            return [40.5, 14, 33.2];
          }
          if (range <= 80) {
            return [80.5, 28, 66.4];
          }
          if (range <= 160) {
            return [160.5, 56, 132.8];
          }
          return [320.5, 112, 265.6];
        case NavigationDisplay.Mode.ROSE_NAV:
          if (range <= 10) {
            return [7.6, 7.1, 7.1];
          }
          if (range <= 20) {
            return [14.7, 14.2, 14.2];
          }
          if (range <= 40) {
            return [28.9, 28.4, 28.4];
          }
          if (range <= 80) {
            return [57.3, 56.8, 56.8];
          }
          if (range <= 160) {
            return [114.1, 113.6, 113.6];
          }
          return [227.7, 227.2, 227.2];
        case NavigationDisplay.Mode.PLAN:
          if (range <= 10) {
            return [7, 7, 7];
          }
          if (range <= 20) {
            return [14, 14, 14];
          }
          if (range <= 40) {
            return [28, 28, 28];
          }
          if (range <= 80) {
            return [56, 56, 56];
          }
          if (range <= 160) {
            return [112, 112, 112];
          }
          return [224, 224, 224];
        default:
          return [0, 0, 0];
      }
    }
  }
  _defineProperty(EfisSymbols, "sides", ['L', 'R']);

  class DescentBuilder {
    static computeDescentPath(geometry, decelPath) {
      var _ref, _decelPath$decel;
      const cruiseAlt = SimVar.GetSimVarValue('L:AIRLINER_CRUISE_ALTITUDE', 'number');
      const verticalDistance = (_ref = cruiseAlt - (decelPath === null || decelPath === void 0 ? void 0 : decelPath.top)) !== null && _ref !== void 0 ? _ref : 0;
      const fpa = 3;
      const tod = (_decelPath$decel = decelPath === null || decelPath === void 0 ? void 0 : decelPath.decel) !== null && _decelPath$decel !== void 0 ? _decelPath$decel : 0 + verticalDistance / Math.tan(fpa * Math.PI / 180) * 0.000164579;
      return {
        tod
      };

      //     const decelPointDistance = DecelPathBuilder.computeDecelPath(geometry);
      //
      //     const lastLegIndex = geometry.legs.size - 1;
      //
      //     // Find descent legs before decel point
      //     let accumulatedDistance = 0;
      //     let currentLegIdx;
      //     let currentLeg;
      //     for (currentLegIdx = lastLegIndex; accumulatedDistance < decelPointDistance; currentLegIdx--) {
      //         currentLeg = geometry.legs.get(currentLegIdx);
      //
      //         accumulatedDistance += currentLeg.distance;
      //     }
      //     currentLegIdx--;
      //
      //     const geometricPath = GeomtricPathBuilder.buildGeometricPath(geometry, currentLegIdx);
      //
      //     console.log(geometricPath);
      //
      //     return { geometricPath };
      // }
    }
  }

  const ALTITUDE_ADJUSTMENT_FACTOR = 1.4;

  /**
   * The minimum deceleration rate, in knots per second, to target on the approach path.
   *
   * This will be used as the target rate in case it cannot be achieved using the desired fpa.
   */
  const MINIMUM_APPROACH_DECELERATION = 0.5;
  let ApproachPathSegmentType;
  (function (ApproachPathSegmentType) {
    ApproachPathSegmentType[ApproachPathSegmentType["CONSTANT_SLOPE"] = 0] = "CONSTANT_SLOPE";
    ApproachPathSegmentType[ApproachPathSegmentType["CONSTANT_SPEED"] = 1] = "CONSTANT_SPEED";
    ApproachPathSegmentType[ApproachPathSegmentType["LEVEL_DECELERATION"] = 2] = "LEVEL_DECELERATION";
  })(ApproachPathSegmentType || (ApproachPathSegmentType = {}));
  class DecelPathBuilder {
    static computeDecelPath(geometry) {
      // TO GET FPA:
      // If approach exists, use approach alt constraints to get FPA and glidepath
      // If no approach but arrival, use arrival alt constraints, if any
      // If no other alt constraints, use 3 degree descent from cruise altitude

      // Given FPA above, calculate distance required (backwards from Vapp @ runway threshold alt + 50ft + 1000ft),
      // to decelerate from green dot speed to Vapp using `decelerationFromGeometricStep`
      // Then, add a speedChangeStep (1.33 knots/second decel) backwards from this point (green dot spd) to previous speed, aka min(last spd constraint, spd lim)
      //      - TODO: make sure alt constraints are obeyed during this speed change DECEL segment?
      // The point at the beginning of the speedChangeStep is DECEL

      const TEMP_TROPO = 36000;
      const TEMP_FUEL_WEIGHT = 2300;
      const DES = 250;
      const O = 203;
      const S = 184;
      const F = 143;
      const vappSegment = DecelPathBuilder.computeVappSegment(geometry);
      let fuelWeight = TEMP_FUEL_WEIGHT;
      const cFullTo3Segment = DecelPathBuilder.computeConfigurationChangeSegment(ApproachPathSegmentType.CONSTANT_SLOPE, -3, 1000, F, 135, fuelWeight, common.FlapConf.CONF_FULL, true, TEMP_TROPO);
      fuelWeight += cFullTo3Segment.fuelBurned;
      const c3to2Segment = DecelPathBuilder.computeConfigurationChangeSegment(ApproachPathSegmentType.CONSTANT_SLOPE, -3, cFullTo3Segment.initialAltitude, F + (S - F) / 2, F, fuelWeight, common.FlapConf.CONF_3, true, TEMP_TROPO);
      fuelWeight += c3to2Segment.fuelBurned;
      const c2to1Segment = DecelPathBuilder.computeConfigurationChangeSegment(ApproachPathSegmentType.CONSTANT_SLOPE, -3, c3to2Segment.initialAltitude, S, F + (S - F) / 2, fuelWeight, common.FlapConf.CONF_2, false, TEMP_TROPO);
      fuelWeight += c2to1Segment.fuelBurned;
      const c1toCleanSegment = DecelPathBuilder.computeConfigurationChangeSegment(ApproachPathSegmentType.CONSTANT_SLOPE, -2.5, c2to1Segment.initialAltitude, O, S, fuelWeight, common.FlapConf.CONF_1, false, TEMP_TROPO);
      fuelWeight += c1toCleanSegment.fuelBurned;
      let cleanToDesSpeedSegment = DecelPathBuilder.computeConfigurationChangeSegment(ApproachPathSegmentType.CONSTANT_SLOPE, -2.5, c1toCleanSegment.initialAltitude, DES, O, fuelWeight, common.FlapConf.CLEAN, false, TEMP_TROPO);

      // TODO for TOO_LOW_DECELERATION do CONSTANT_DECELERATION, not LEVEL_DECELERATION
      if (cleanToDesSpeedSegment.error === Predictions$1.VnavStepError.AVAILABLE_GRADIENT_INSUFFICIENT || cleanToDesSpeedSegment.error === Predictions$1.VnavStepError.TOO_LOW_DECELERATION) {

        // if (VnavConfig.VNAV_DESCENT_MODE !== VnavDescentMode.CDA) {
        cleanToDesSpeedSegment = DecelPathBuilder.computeConfigurationChangeSegment(ApproachPathSegmentType.LEVEL_DECELERATION, undefined, c1toCleanSegment.initialAltitude, DES, O, fuelWeight, common.FlapConf.CLEAN, false, TEMP_TROPO);
        // } else {
        //     throw new Error('[VNAV/computeDecelPath] Computation of cleanToDesSpeedSegment for CDA is not yet implemented');
        // }
      }

      return {
        flap1: vappSegment.distanceTraveled + cFullTo3Segment.distanceTraveled + c3to2Segment.distanceTraveled + c2to1Segment.distanceTraveled + c1toCleanSegment.distanceTraveled,
        flap2: vappSegment.distanceTraveled + cFullTo3Segment.distanceTraveled + c3to2Segment.distanceTraveled + c2to1Segment.distanceTraveled,
        decel: vappSegment.distanceTraveled + cFullTo3Segment.distanceTraveled + c3to2Segment.distanceTraveled + c2to1Segment.distanceTraveled + c1toCleanSegment.distanceTraveled + cleanToDesSpeedSegment.distanceTraveled,
        top: cleanToDesSpeedSegment.finalAltitude
      };
    }

    /**
     * Calculates the Vapp segment of the DECEL path.
     *
     * @return the Vapp segment step results
     */
    static computeVappSegment(geometry) {
      const TEMP_VAPP = 135; // TODO actual Vapp

      const finalAltitude = DecelPathBuilder.findLastApproachPoint(geometry);

      // TODO For now we use some "reasonable" values for the segment. When we have the ability to predict idle N1 and such at approach conditions,
      // we can change this.
      return _objectSpread2(_objectSpread2({}, Predictions$1.Predictions.altitudeStep(1000, -(1000 - finalAltitude), TEMP_VAPP,
      // TODO placeholder value
      999,
      // TODO placeholder value
      26,
      // TODO placeholder value
      107000,
      // TODO placeholder value
      5000,
      // TODO placeholder value
      2,
      // TODO placeholder value
      0,
      // TODO placeholder value
      36000,
      // TODO placeholder value
      false // TODO placeholder value
      )), {}, {
        distanceTraveled: 3.14 // FIXME hard-coded correct value for -3deg fpa
      });
    }

    /**
     * Calculates a config change segment of the DECEL path.
     *
     * @return the config change segment step results
     */
    static computeConfigurationChangeSegment(type, fpa, finalAltitude, fromSpeed, toSpeed, initialFuelWeight,
    // TODO take finalFuelWeight and make an iterative prediction
    newConfiguration, gearExtended, tropoAltitude) {
      // TODO For now we use some "reasonable" values for the segment. When we have the ability to predict idle N1 and such at approach conditions,
      // we can change this.

      switch (type) {
        case ApproachPathSegmentType.CONSTANT_SLOPE:
          // FIXME hard-coded to -3deg in speedChangeStep

          let currentIterationAltitude = finalAltitude * ALTITUDE_ADJUSTMENT_FACTOR;
          let stepResults;
          let altitudeError = 0;
          let iterationCount = 0;
          do {
            const newStepResults = Predictions$1.Predictions.speedChangeStep(fpa !== null && fpa !== void 0 ? fpa : -3, currentIterationAltitude, fromSpeed, toSpeed, 999, 999, 26, 107000, initialFuelWeight, 2, 0, tropoAltitude, gearExtended, newConfiguration, MINIMUM_APPROACH_DECELERATION);

            // Stop if we encounter a NaN
            if (Number.isNaN(newStepResults.finalAltitude)) {
              break;
            }
            stepResults = newStepResults;
            altitudeError = finalAltitude - stepResults.finalAltitude;
            currentIterationAltitude += altitudeError;
            iterationCount++;
          } while (Math.abs(altitudeError) >= 25 && iterationCount < 4);
          return _objectSpread2(_objectSpread2({}, stepResults), {}, {
            initialAltitude: currentIterationAltitude
          });
        case ApproachPathSegmentType.CONSTANT_SPEED:
          throw new Error('[FMS/VNAV/computeConfigurationChangeSegment] CONSTANT_SPEED is not supported for configuration changes.');
        case ApproachPathSegmentType.LEVEL_DECELERATION:
          return Predictions$1.Predictions.speedChangeStep(0, finalAltitude * ALTITUDE_ADJUSTMENT_FACTOR, fromSpeed, toSpeed, 999, 999, 26, 107000, initialFuelWeight, 2, 0, tropoAltitude, gearExtended, newConfiguration);
        default:
          throw new Error('[FMS/VNAV/computeConfigurationChangeSegment] Unknown segment type.');
      }
    }

    /**
     * Returns altitude of either, in order of priority:
     * - runway threshold;
     * - missed approach point;
     * - airport.
     */
    static findLastApproachPoint(geometry) {
      const lastLeg = geometry.legs.get(geometry.legs.size - 1);

      // Last leg is TF AND is runway or airport
      if (lastLeg instanceof TF.TFLeg && (lastLeg.to.isRunway || lastLeg.to.type === 'A')) {
        return lastLeg.to.legAltitude1;
      }
      return 150; // TODO temporary value
    }
  }

  class VerticalFlightPlanBuilder {
    static buildVerticalFlightPlan(geometry) {
      const arrivalLegs = geometry.legsInSegment(FlightPlanSegment$1.SegmentType.Arrival);
      const approachLegs = geometry.legsInSegment(FlightPlanSegment$1.SegmentType.Approach);
      const descent = VerticalFlightPlanBuilder.buildVerticalDescent(arrivalLegs, approachLegs);
      return {
        climb: {
          thrustReductionAltitude: 1500,
          accelerationAltitude: 2100,
          climConstraints: {}
        },
        cruise: {
          cruiseAltitude: 36000
        },
        descent
      };
    }
    static buildVerticalDescent(descentLegs, approachLegs) {
      const descentConstraints = {};
      for (const leg of descentLegs.entries()) {
        descentConstraints[leg[0]] = {};
        descentConstraints[leg[0]].altitude = leg[1].altitudeConstraint;
        descentConstraints[leg[0]].speed = leg[1].speedConstraint;
      }
      const approachConstraints = {};
      for (const leg of approachLegs.entries()) {
        approachConstraints[leg[0]] = {};
        approachConstraints[leg[0]].altitude = leg[1].altitudeConstraint;
        approachConstraints[leg[0]].speed = leg[1].speedConstraint;
      }
      return {
        descentConstraints,
        approachConstraints
      };
    }
  }

  class EfisLabels {
    constructor() {
      _defineProperty(this, "lastTransitionAltitude", void 0);
      _defineProperty(this, "lastTransitionLevel", void 0);
      _defineProperty(this, "flightPlanManager", void 0);
    }
    init(_baseInstrument, flightPlanManager) {
      this.flightPlanManager = flightPlanManager;
    }
    update(_deltaTime) {
      const transitionAltitude = this.flightPlanManager.originTransitionAltitude;
      const transitionLevel = this.flightPlanManager.destinationTransitionLevel;

      // FIXME ARINC429 when the PR adding a TS impl. lands...
      if (transitionAltitude !== this.lastTransitionAltitude) {
        SimVar.SetSimVarValue('L:AIRLINER_TRANS_ALT', 'Number', transitionAltitude !== null && transitionAltitude !== void 0 ? transitionAltitude : 0);
        this.lastTransitionAltitude = transitionAltitude;
      }
      if (transitionLevel !== this.lastTransitionLevel) {
        SimVar.SetSimVarValue('L:AIRLINER_APPR_TRANS_ALT', 'Number', (transitionLevel !== null && transitionLevel !== void 0 ? transitionLevel : 0) * 100);
        this.lastTransitionLevel = transitionLevel;
      }
    }
  }

  class GpsPrimary {
    constructor() {
      _defineProperty(this, "message", FmMessages.FMMessageTypes.GpsPrimary);
      _defineProperty(this, "lastState", false);
    }
    process(_) {
      const newState = SimVar.GetSimVarValue('L:A32NX_ADIRS_USES_GPS_AS_PRIMARY', 'Bool') === 1;
      if (newState !== this.lastState) {
        this.lastState = newState;
        return newState ? FMMessageUpdate.SEND : FMMessageUpdate.RECALL;
      }
      return FMMessageUpdate.NO_ACTION;
    }
  }

  /**
   * Since this happens when the simvar goes to zero, we need to use some CONF nodes to make sure we do not count the initial
   * first-frame value, as the ADIRS module might not have run yet.
   */
  class GpsPrimaryLost {
    constructor() {
      _defineProperty(this, "message", FmMessages.FMMessageTypes.GpsPrimaryLost);
      _defineProperty(this, "confLost", new logic.ConfirmationNode(1000));
      _defineProperty(this, "trigLost", new logic.Trigger(true));
      _defineProperty(this, "confRegained", new logic.ConfirmationNode(1000));
      _defineProperty(this, "trigRegained", new logic.Trigger(true));
    }
    process(deltaTime) {
      const lostNow = SimVar.GetSimVarValue('L:A32NX_ADIRS_USES_GPS_AS_PRIMARY', 'Bool') === 0;
      this.confLost.input = lostNow;
      this.confLost.update(deltaTime);
      this.trigLost.input = this.confLost.output;
      this.trigLost.update(deltaTime);
      this.confRegained.input = !lostNow;
      this.confRegained.update(deltaTime);
      this.trigRegained.input = this.confRegained.output;
      this.trigRegained.update(deltaTime);
      if (this.trigLost.output) {
        return FMMessageUpdate.SEND;
      }
      if (this.trigRegained.output) {
        return FMMessageUpdate.RECALL;
      }
      return FMMessageUpdate.NO_ACTION;
    }
  }

  class MapPartlyDisplayed {
    constructor() {
      _defineProperty(this, "message", FmMessages.FMMessageTypes.MapPartlyDisplayed);
      _defineProperty(this, "efisSide", void 0);
      _defineProperty(this, "trigRising", new logic.Trigger(true));
      _defineProperty(this, "trigFalling", new logic.Trigger(true));
    }
    process(deltaTime) {
      const partlyDisplayed = SimVar.GetSimVarValue("L:A32NX_EFIS_".concat(this.efisSide, "_MAP_PARTLY_DISPLAYED"), 'boolean');
      this.trigRising.input = partlyDisplayed === 1;
      this.trigRising.update(deltaTime);
      this.trigFalling.input = partlyDisplayed === 0;
      this.trigFalling.update(deltaTime);
      if (this.trigRising.output) {
        return FMMessageUpdate.SEND;
      }
      if (this.trigFalling.output) {
        return FMMessageUpdate.RECALL;
      }
      return FMMessageUpdate.NO_ACTION;
    }
  }
  class MapPartlyDisplayedLeft extends MapPartlyDisplayed {
    constructor() {
      super(...arguments);
      _defineProperty(this, "efisSide", 'L');
    }
  }
  class MapPartlyDisplayedRight extends MapPartlyDisplayed {
    constructor() {
      super(...arguments);
      _defineProperty(this, "efisSide", 'R');
    }
  }

  /**
   * This class manages Type II messages sent from the FMGC.
   *
   * Since many of those are also sent to the EFIS, this class sets a bitfield signalling the active messages to the DMCs
   *
   * At the moment, other Type II messages which are not displayed on the EFIS are declared in the old JavaScript CDU/"FMC".
   *
   * **Note:** The plan is eventually to move them here as well - but since they can be triggered manually on pilot output as well, and it
   * is not currently convenient to use this class from the JS CDU, we will not do that at the moment
   *
   * -Benjamin
   */
  class FmsMessages {
    constructor() {
      _defineProperty(this, "listener", RegisterViewListener('JS_LISTENER_SIMVARS', null, true));
      _defineProperty(this, "baseInstrument", void 0);
      _defineProperty(this, "ndMessageFlags", {
        L: 0,
        R: 0
      });
      _defineProperty(this, "messageSelectors", [new GpsPrimary(), new GpsPrimaryLost(), new MapPartlyDisplayedLeft(), new MapPartlyDisplayedRight(), new TurnAreaExceedance.TurnAreaExceedanceLeft(), new TurnAreaExceedance.TurnAreaExceedanceRight()]);
    }
    init(baseInstrument, _flightPlanManager) {
      this.baseInstrument = baseInstrument;
      for (const selector of this.messageSelectors) {
        if (selector.init) {
          selector.init(this.baseInstrument);
        }
      }
    }
    update(deltaTime) {
      let didMutateNd = false;
      for (const selector of this.messageSelectors) {
        const newState = selector.process(deltaTime);
        const message = selector.message;
        switch (newState) {
          case FMMessageUpdate.SEND:
            if (message.text) {
              this.listener.triggerToAllSubscribers(FmMessages.FMMessageTriggers.SEND_TO_MCDU, message);
            }
            if (message.ndFlag > 0) {
              if (selector.efisSide) {
                this.ndMessageFlags[selector.efisSide] |= message.ndFlag;
              } else {
                for (const side in this.ndMessageFlags) {
                  if (Object.prototype.hasOwnProperty.call(this.ndMessageFlags, side)) {
                    this.ndMessageFlags[side] |= message.ndFlag;
                  }
                }
              }
              didMutateNd = true;
            }
            break;
          case FMMessageUpdate.RECALL:
            if (message.text) {
              this.listener.triggerToAllSubscribers(FmMessages.FMMessageTriggers.RECALL_FROM_MCDU_WITH_ID, message.text); // TODO id
            }

            if (message.ndFlag > 0) {
              if (selector.efisSide) {
                this.ndMessageFlags[selector.efisSide] &= ~message.ndFlag;
              } else {
                for (const side in this.ndMessageFlags) {
                  if (Object.prototype.hasOwnProperty.call(this.ndMessageFlags, side)) {
                    this.ndMessageFlags[side] &= ~message.ndFlag;
                  }
                }
              }
              didMutateNd = true;
            }
            break;
          case FMMessageUpdate.NO_ACTION:
            break;
          default:
            throw new Error('Invalid FM message update state');
        }
      }
      if (didMutateNd) {
        for (const side in this.ndMessageFlags) {
          if (Object.prototype.hasOwnProperty.call(this.ndMessageFlags, side)) {
            SimVar.SetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_FM_MESSAGE_FLAGS"), 'number', this.ndMessageFlags[side]);
          }
        }
      }
    }
    send(messageClass) {
      const message = this.messageSelectors.find(it => it instanceof messageClass).message;
      this.listener.triggerToAllSubscribers(FmMessages.FMMessageTriggers.SEND_TO_MCDU, message);
      if (message.ndFlag) {
        for (const side in this.ndMessageFlags) {
          if (Object.prototype.hasOwnProperty.call(this.ndMessageFlags, side)) {
            this.ndMessageFlags[side] |= message.ndFlag;
            SimVar.SetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_FM_MESSAGE_FLAGS"), 'number', this.ndMessageFlags[side]);
          }
        }
      }
    }
    recall(messageClass) {
      const message = this.messageSelectors.find(it => it instanceof messageClass).message;
      this.listener.triggerToAllSubscribers(FmMessages.FMMessageTriggers.RECALL_FROM_MCDU_WITH_ID, message.text); // TODO id

      if (message.ndFlag) {
        for (const side in this.ndMessageFlags) {
          if (Object.prototype.hasOwnProperty.call(this.ndMessageFlags, side)) {
            this.ndMessageFlags[side] &= ~message.ndFlag;
            SimVar.SetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_FM_MESSAGE_FLAGS"), 'number', this.ndMessageFlags[side]);
          }
        }
      }
    }
    recallId(id) {
      const message = this.messageSelectors.find(it => it.message.id === id).message;
      this.listener.triggerToAllSubscribers(FmMessages.FMMessageTriggers.RECALL_FROM_MCDU_WITH_ID, message.text); // TODO id

      if (message.ndFlag) {
        for (const side in this.ndMessageFlags) {
          if (Object.prototype.hasOwnProperty.call(this.ndMessageFlags, side)) {
            this.ndMessageFlags[side] &= ~message.ndFlag;
            SimVar.SetSimVarValue("L:B77RS_EFIS_".concat(side, "_ND_FM_MESSAGE_FLAGS"), 'number', this.ndMessageFlags[side]);
          }
        }
      }
    }
  }

  /**
   * Type II message update state.
   *
   * Used when a message selector implements the {@link FMMessageSelector.process `process`} method.
   */
  let FMMessageUpdate;

  /**
   * Defines a selector for a Type II message.
   */
  (function (FMMessageUpdate) {
    FMMessageUpdate[FMMessageUpdate["NO_ACTION"] = 0] = "NO_ACTION";
    FMMessageUpdate[FMMessageUpdate["SEND"] = 1] = "SEND";
    FMMessageUpdate[FMMessageUpdate["RECALL"] = 2] = "RECALL";
  })(FMMessageUpdate || (FMMessageUpdate = {}));

  const fmsMessages = new FmsMessages();
  const components = [fmsMessages, new EfisLabels(), new ReadySignal.ReadySignal()];
  function initComponents(baseInstrument, flightPlanManager) {
    components.forEach(component => component.init(baseInstrument, flightPlanManager));
  }
  function updateComponents(deltaTime) {
    components.forEach(component => component.update(deltaTime));
  }
  function recallMessageById(id) {
    fmsMessages.recallId(id);
  }

  class Navigation {
    constructor(flightPlanManager) {
      this.flightPlanManager = flightPlanManager;
      _defineProperty(this, "requiredPerformance", void 0);
      _defineProperty(this, "currentPerformance", void 0);
      _defineProperty(this, "accuracyHigh", false);
      _defineProperty(this, "ppos", {
        lat: 0,
        long: 0
      });
      _defineProperty(this, "groundSpeed", 0);
      this.requiredPerformance = new RequiredPerformance.RequiredPerformance(this.flightPlanManager);
    }

    // eslint-disable-next-line no-empty-function
    init() {}
    update(deltaTime) {
      this.requiredPerformance.update(deltaTime);
      this.updateCurrentPerformance();
      this.updatePosition();
    }
    updateCurrentPerformance() {
      const gs = SimVar.GetSimVarValue('GPS GROUND SPEED', 'knots');

      // FIXME fake it until we make it :D
      const estimate = 0.03 + Math.random() * 0.02 + gs * 0.00015;
      // basic IIR filter
      this.currentPerformance = this.currentPerformance === undefined ? estimate : this.currentPerformance * 0.9 + estimate * 0.1;
      const accuracyHigh = this.currentPerformance <= this.requiredPerformance.activeRnp;
      if (accuracyHigh !== this.accuracyHigh) {
        this.accuracyHigh = accuracyHigh;
        SimVar.SetSimVarValue('L:B77RS_AIMS_L_NAV_ACCURACY_HIGH', 'bool', this.accuracyHigh);
        SimVar.SetSimVarValue('L:B77RS_AIMS_R_NAV_ACCURACY_HIGH', 'bool', this.accuracyHigh);
      }
    }
    updatePosition() {
      this.ppos.lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      this.ppos.long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      this.groundSpeed = SimVar.GetSimVarValue('GPS GROUND SPEED', 'knots');
    }
  }

  function initFmgcLoop(baseInstrument, flightPlanManager) {
    initComponents(baseInstrument, flightPlanManager);
  }
  function updateFmgcLoop(deltaTime) {
    updateComponents(deltaTime);
  }

  Object.defineProperty(exports, 'normaliseApproachName', {
    enumerable: true,
    get: function () { return flightplan.normaliseApproachName; }
  });
  exports.DecelPathBuilder = DecelPathBuilder;
  exports.DescentBuilder = DescentBuilder;
  exports.EfisSymbols = EfisSymbols;
  exports.FlightPlanAsoboSync = FlightPlanAsoboSync;
  exports.FlightPlanManager = FlightPlanManager;
  exports.GuidanceController = GuidanceController;
  exports.GuidanceManager = GuidanceManager;
  exports.ManagedFlightPlan = ManagedFlightPlan;
  exports.NavRadioManager = NavRadioManager;
  exports.Navigation = Navigation;
  exports.VerticalFlightPlanBuilder = VerticalFlightPlanBuilder;
  exports.WaypointBuilder = WaypointBuilder;
  exports.getFlightPhaseManager = getFlightPhaseManager;
  exports.initFmgcLoop = initFmgcLoop;
  exports.recallMessageById = recallMessageById;
  exports.updateFmgcLoop = updateFmgcLoop;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
