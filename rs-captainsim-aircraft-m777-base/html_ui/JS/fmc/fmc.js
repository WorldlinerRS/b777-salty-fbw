(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('src/hdsdk/Repositories/SpeedRepository'), require('src/hdsdk/Managers/SpeedManager')) :
  typeof define === 'function' && define.amd ? define(['exports', 'src/hdsdk/Repositories/SpeedRepository', 'src/hdsdk/Managers/SpeedManager'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Fmgc = {}, global.SpeedRepository, global.SpeedManager));
})(this, (function (exports, SpeedRepository, SpeedManager) { 'use strict';

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

  class B777_FMC_FMCCommPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      fmc._renderer.renderTitle('FMC COMM');
      fmc._renderer.renderPages(1, 2);
      fmc._renderer.render([[''], ['<RTE 1', 'POS REPORT>'], ['UPLINK'], ['<DES FORECAST'], [''], ['<RTE DATA'], [''], [''], [''], [''], ['DATA LINK'], ['READY']]);
    }
  }

  class SimBriefApi {
    /**
     * SimBrief credentials
     * @type {SimBriefCredentials}
     * @private
     */

    /**
     * SimBrief API base url
     * @type {string}
     * @private
     */

    /**
     * SimBrief API path
     * @type {string}
     * @private
     */

    /**
     * Constructor
     * @param {SimBriefCredentials} credentials
     */
    constructor(credentials) {
      _defineProperty(this, "credentials", void 0);
      _defineProperty(this, "apiBase", 'https://www.simbrief.com');
      _defineProperty(this, "apiPath", 'api/xml.fetcher.php');
      this.credentials = credentials;
    }

    /**
     * Fetches SimBrief flight plan from API
     * @param {boolean} json
     * @returns {Promise<JSON>}
     */
    fetchData() {
      let json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      let url = this.constructApiUrl(json);
      return fetch(url.href).then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
    }

    /**
     * Constructs SimBrief API url
     * @param {boolean} json
     * @returns {URL}
     * @private
     */
    constructApiUrl() {
      let json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      let url = new URL(this.apiPath, this.apiBase);
      if (json) {
        url.searchParams.append('json', '1');
      }
      if (this.credentials && this.credentials.userId) {
        url.searchParams.append('userid', String(this.credentials.userId));
      }
      if (this.credentials && this.credentials.userName) {
        url.searchParams.append('username', String(this.credentials.userName));
      }
      return url;
    }
  }

  class HeavyDataStorage {
    /**
     * Data storage KEY prefix
     * @type {string}
     * @private
     */

    /**
     * Loads data from data storage
     * @param {string} _key
     * @param {string | number | boolean | null} _default
     * @returns {string | number | boolean}
     */
    static get(_key) {
      let _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return GetStoredData(this.storagePrefix + _key) || _default || false;
    }

    /**
     * Loads data from data storage (get alias)
     * @param {string} _key
     * @param {string | number | boolean | null} _default
     * @returns {string | number | boolean}
     */
    static load(_key) {
      let _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.get(_key, _default);
    }

    /**
     * Stores data to data storage
     * @param {string} _key
     * @param {string | number | boolean} _data
     */
    static set(_key, _data) {
      SetStoredData(this.storagePrefix + _key, _data);
    }

    /**
     * Stores data to data storage (set alias)
     * @param {string} _key
     * @param {string | number | boolean} _data
     */
    static store(_key, _data) {
      this.set(_key, _data);
    }

    /**
     * Removes data from data storage
     * @param {string} _key
     */
    static delete(_key) {
      DeleteStoredData(this.storagePrefix + _key);
    }

    /**
     * Removes data from data storage (delete alias)
     * @param {string} _key
     */
    static remove(_key) {
      this.delete(_key);
    }

    /**
     * Finds data in data storage
     * @param {string} _key
     * @param {boolean} _printLog
     * @returns {any}
     */
    static search(_key) {
      let _printLog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      try {
        let Storage = GetDataStorage();
        if (Storage) {
          let values = Storage.searchData(_key);
          if (_printLog) {
            for (let i = 0; i < values.length; i++) {
              console.log(i + ' : ' + values[i].key + ' : ' + values[i].data);
            }
          }
          return values;
        }
      } catch (error) {
        return null;
      }
      return null;
    }

    /**
     * Finds data in data storage (search alias)
     * @param {string} _key
     * @param {boolean} _printLog
     * @returns {any}
     */
    static find(_key) {
      let _printLog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.search(_key, _printLog);
    }
  }
  _defineProperty(HeavyDataStorage, "storagePrefix", 'HEAVY_B78XH_');

  class SimBriefCredentials {
    /**
     * SimBrief username
     * @type {string}
     * @private
     */

    /**
     * SimBrief userId
     * @type {number}
     * @private
     */

    /**
     * Constructor
     * @param {string} userName
     * @param {number} userId
     */
    constructor() {
      let userName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      let userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      _defineProperty(this, "_userName", void 0);
      _defineProperty(this, "_userId", void 0);
      this._userName = userName;
      this._userId = userId;
    }

    /**
     * Returns SimBrief username
     * @returns {string}
     */
    get userName() {
      if (this._userName) {
        return this._userName;
      } else {
        const userName = HeavyDataStorage.get('SIMBRIEF_USERNAME', '');
        if (userName) {
          return String(userName);
        } else {
          return '';
        }
      }
    }

    /**
     * Returns SimBrief userId
     * @returns {number}
     */
    get userId() {
      return this._userId || Number(HeavyDataStorage.get('SIMBRIEF_USERID', ''));
    }
  }

  class SimBrief {
    /**
     * SimBrief credentials
     * @type {SimBriefCredentials}
     * @private
     */

    /**
     * SimBrief Api
     * @type {SimBriefApi}
     * @private
     */

    /**
     * SimBrief flight plan
     * @type {Promise<JSON> | null}
     * @private
     */

    /**
     * Constructor
     */
    constructor() {
      _defineProperty(this, "credentials", void 0);
      _defineProperty(this, "api", void 0);
      _defineProperty(this, "flightPlan", void 0);
      this.credentials = new SimBriefCredentials();
      this.api = new SimBriefApi(this.credentials);
      this.flightPlan = null;
    }

    /**
     * Returns SimBrief username from credentials
     * @returns {string}
     */
    getUserName() {
      return this.credentials.userName;
    }

    /**
     * Returns SimBrief userId from credentials
     * @returns {number}
     */
    getUserId() {
      return this.credentials.userId;
    }

    /**
     * Returns SimBrief flight plan
     * @returns {Promise<JSON> | null}
     */
    async getFlightPlan() {
      return await this.api.fetchData(true);
    }
  }

  class SimBriefOceanicWaypointConverter {
    /**
     * Converts SimBrief oceanic waypoints to MSFS oceanic waypoints
     * @param {string} value
     * @returns {string}
     */
    static convert(waypoint) {
      const pattern = /([0-9]{2})(N|S)([0-9]{3})(W|E)/;
      const match = waypoint.match(pattern);
      if (match !== null) {
        const lat = parseInt(match[1], 10);
        const lathem = match[2];
        const long = parseInt(match[3], 10);
        const longhem = match[4];
        const sep = {
          'NW': 'N',
          'NE': 'E',
          'SW': 'W',
          'SE': 'S'
        }["".concat(lathem).concat(longhem)];
        return long < 100 ? "".concat(lat).concat(long).concat(sep) : "".concat(lat).concat(sep).concat(long % 100);
      }
      return waypoint;
    }
  }

  let HDFixType;
  (function (HDFixType) {
    HDFixType[HDFixType["WAYPOINT"] = 0] = "WAYPOINT";
    HDFixType[HDFixType["AIRPORT"] = 1] = "AIRPORT";
    HDFixType[HDFixType["VOR"] = 2] = "VOR";
    HDFixType[HDFixType["MISC"] = 3] = "MISC";
  })(HDFixType || (HDFixType = {}));

  let HDFixStage;
  (function (HDFixStage) {
    HDFixStage[HDFixStage["CLB"] = 0] = "CLB";
    HDFixStage[HDFixStage["CRZ"] = 1] = "CRZ";
    HDFixStage[HDFixStage["DES"] = 2] = "DES";
  })(HDFixStage || (HDFixStage = {}));

  class HDFix {
    get ident() {
      return this._ident;
    }
    get originalIdent() {
      return this._originalIdent;
    }
    get flightPhase() {
      return this.stage;
    }
    get isCoordinatesWaypoint() {
      this.coordinatesRegex.lastIndex = 0;
      this.coordinatesShorthandOverRegex.lastIndex = 0;
      this.coordinatesShorthandUnderRegex.lastIndex = 0;
      if (this.type === HDFixType.MISC || this.type === HDFixType.WAYPOINT) {
        if (this.coordinatesRegex.test(this.originalIdent) || this.coordinatesShorthandOverRegex.test(this.originalIdent) || this.coordinatesShorthandUnderRegex.test(this.originalIdent)) {
          return true;
        }
      }
      return false;
    }
    constructor(data) {
      _defineProperty(this, "rawData", void 0);
      _defineProperty(this, "_originalIdent", void 0);
      _defineProperty(this, "_ident", void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "type", void 0);
      _defineProperty(this, "airway", void 0);
      _defineProperty(this, "airwayIn", void 0);
      _defineProperty(this, "airwayOut", void 0);
      _defineProperty(this, "lat", void 0);
      _defineProperty(this, "lon", void 0);
      _defineProperty(this, "mora", void 0);
      _defineProperty(this, "stage", void 0);
      _defineProperty(this, "coordinatesRegex", /([0-9]{2})([NS])([0-9])([0-9]{2})([WE])/g);
      _defineProperty(this, "coordinatesShorthandOverRegex", /([0-9]{2}([NSE])([0-9]{2}))/g);
      _defineProperty(this, "coordinatesShorthandUnderRegex", /([0-9]{2}([0-9]{2})([NSE]))/g);
      this.rawData = data;
      this.parse();
    }
    parse() {
      this._originalIdent = this.rawData.ident;
      this._ident = this.convertIdent(this.rawData.ident);
      this.name = this.rawData.name;
      this.type = this.parseType(this.rawData.type);
      this.stage = this.parseStage(this.rawData.stage);
      this.airway = this.rawData.via_airway;
      this.lat = this.rawData.pos_lat;
      this.lon = this.rawData.pos_long;
      this.mora = this.rawData.mora;
      this.airwayIn = undefined;
      this.airwayOut = undefined;
    }
    convertIdent(ident) {
      /**
       * 50.30N060W -> H5060
       *
       *
       * 50N160W -> 50N60
       * 50S160E -> 50S60
       * 50S160W -> 50W60
       * 50N160E -> 50E60
       *
       *
       * 50N060W -> 5060N
       * 50N060E  -> 5060E
       * 50S060E -> 5060S
       * 50S060W -> 5060W
       */
      /**
       * /([0-9]{2})([NS])([0-9])([0-9]{2})([WE])/g
       */
      if (this.coordinatesRegex.test(ident)) {
        return ident.replace(this.coordinatesRegex, (matches, lat, mid, lonStart, lonEnd, end) => {
          if (lonStart == '0') {
            if (mid === 'N' && end == 'W') {
              return lat + lonEnd + 'N';
            } else if (mid === 'N' && end == 'E') {
              return lat + lonEnd + 'E';
            } else if (mid === 'S' && end == 'W') {
              return lat + lonEnd + 'W';
            } else if (mid === 'S' && end == 'E') {
              return lat + lonEnd + 'S';
            }
          } else {
            if (mid === 'N' && end == 'W') {
              return lat + 'N' + lonEnd;
            } else if (mid === 'N' && end == 'E') {
              return lat + 'E' + lonEnd;
            } else if (mid === 'S' && end == 'W') {
              return lat + 'W' + lonEnd;
            } else if (mid === 'S' && end == 'E') {
              return lat + 'S' + lonEnd;
            }
          }
        });
      }
      return ident;
    }
    parseType(value) {
      switch (value) {
        case 'wpt':
          return HDFixType.WAYPOINT;
        case 'apt':
          return HDFixType.AIRPORT;
        case 'vor':
          return HDFixType.VOR;
        default:
          return HDFixType.MISC;
      }
    }
    parseStage(value) {
      switch (value) {
        case 'CLB':
          return HDFixStage.CLB;
        case 'CRZ':
          return HDFixStage.CRZ;
        case 'DSC':
          return HDFixStage.DES;
        default:
          return undefined;
      }
    }
  }

  class HDAirport {
    constructor(data) {
      _defineProperty(this, "icao", void 0);
      _defineProperty(this, "iata", void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "lat", void 0);
      _defineProperty(this, "lon", void 0);
      _defineProperty(this, "elevation", void 0);
      _defineProperty(this, "plannedRunway", void 0);
      const airport = data;
      this.icao = airport.icao_code;
      this.iata = airport.iata_code;
      this.name = airport.name;
      this.lat = Number(airport.pos_lat);
      this.lon = Number(airport.pos_lon);
      this.elevation = Number(airport.elevation);
      this.plannedRunway = airport.plan_rwy;
    }
  }

  class HDOrigin extends HDAirport {
    constructor(data) {
      super(data.origin);
    }
  }

  class HDDestination extends HDAirport {
    constructor(data) {
      super(data.destination);
    }
  }

  class HDNavlogInfo {
    constructor(data) {
      _defineProperty(this, "flightNumber", void 0);
      _defineProperty(this, "costIndex", void 0);
      _defineProperty(this, "initialAltitude", void 0);
      _defineProperty(this, "cruiseMach", void 0);
      _defineProperty(this, "cruiseTrueAirspeed", void 0);
      _defineProperty(this, "route", void 0);
      _defineProperty(this, "sid", void 0);
      _defineProperty(this, "star", void 0);
      _defineProperty(this, "enRouteTrans", void 0);
      _defineProperty(this, "units", void 0);
      const general = data.general;
      this.flightNumber = general.flight_number;
      this.costIndex = parseInt(general.costindex);
      this.initialAltitude = parseInt(general.initial_altitude);
      this.cruiseMach = parseFloat(general.cruise_mach);
      this.cruiseTrueAirspeed = parseInt(general.cruise_tas);
      this.route = general.route;
      this.units = data.params.units;
      const fixes = data.navlog.fix;
      const destination = data.destination.icao_code;
      const lastWaypointIndex = fixes[fixes.length - 1].ident === destination ? fixes.length - 2 : fixes.length - 1;
      this.sid = fixes[0].via_airway !== 'DCT' ? fixes[0].via_airway : 'DCT';
      this.star = fixes[lastWaypointIndex].via_airway !== 'DCT' ? fixes[lastWaypointIndex].via_airway : 'DCT';
      if (this.sid !== 'DCT') {
        const transIndex = data.navlog.fix.map(waypoint => {
          return waypoint.via_airway === this.sid;
        }).lastIndexOf(true);
        this.enRouteTrans = data.navlog.fix[transIndex].ident;
      }
    }
  }

  class HDWeights {
    get payload() {
      return this._payload;
    }
    get paxWeight() {
      return this._paxWeight;
    }
    get paxCount() {
      return this._paxCount;
    }
    get cargo() {
      return this._cargo;
    }
    get estimatedRamp() {
      return this._estimatedRamp;
    }
    get estimatedLanding() {
      return this._estimatedLanding;
    }
    get estimatedZeroFuel() {
      return this._estimatedZeroFuel;
    }
    get estimatedTakeoff() {
      return this._estimatedTakeoff;
    }
    get maxLanding() {
      return this._maxLanding;
    }
    get maxZeroFuel() {
      return this._maxZeroFuel;
    }
    get maxTakeoffStruct() {
      return this._maxTakeoffStruct;
    }
    get maxTakeoff() {
      return this._maxTakeoff;
    }
    get operatingEmpty() {
      return this._operatingEmpty;
    }
    constructor(data) {
      _defineProperty(this, "_operatingEmpty", void 0);
      _defineProperty(this, "_maxTakeoff", void 0);
      _defineProperty(this, "_maxTakeoffStruct", void 0);
      _defineProperty(this, "_maxZeroFuel", void 0);
      _defineProperty(this, "_maxLanding", void 0);
      _defineProperty(this, "_estimatedTakeoff", void 0);
      _defineProperty(this, "_estimatedZeroFuel", void 0);
      _defineProperty(this, "_estimatedLanding", void 0);
      _defineProperty(this, "_estimatedRamp", void 0);
      _defineProperty(this, "_cargo", void 0);
      _defineProperty(this, "_paxCount", void 0);
      _defineProperty(this, "_paxWeight", void 0);
      _defineProperty(this, "_payload", void 0);
      const weights = data.weights;
      this._operatingEmpty = Number(weights.oew);
      this._maxTakeoff = Number(weights.max_tow);
      this._maxTakeoffStruct = Number(weights.max_tow_struct);
      this._maxZeroFuel = Number(weights.max_zfw);
      this._maxLanding = Number(weights.max_ldw);
      this._estimatedTakeoff = Number(weights.est_tow);
      this._estimatedZeroFuel = Number(weights.est_zfw);
      this._estimatedLanding = Number(weights.est_ldw);
      this._estimatedRamp = Number(weights.est_ramp);
      this._cargo = Number(weights.cargo);
      this._paxCount = Number(weights.pax_count);
      this._paxWeight = Number(weights.pax_weight);
      this._payload = Number(weights.payload);
    }
  }

  class HDFuel {
    get taxi() {
      return this._taxi;
    }
    set taxi(value) {
      this._taxi = value;
    }
    get enrouteBurn() {
      return this._enrouteBurn;
    }
    set enrouteBurn(value) {
      this._enrouteBurn = value;
    }
    get alternateBurn() {
      return this._alternateBurn;
    }
    set alternateBurn(value) {
      this._alternateBurn = value;
    }
    get contingency() {
      return this._contingency;
    }
    set contingency(value) {
      this._contingency = value;
    }
    get reserve() {
      return this._reserve;
    }
    set reserve(value) {
      this._reserve = value;
    }
    get extra() {
      return this._extra;
    }
    set extra(value) {
      this._extra = value;
    }
    get minTakeoff() {
      return this._minTakeoff;
    }
    set minTakeoff(value) {
      this._minTakeoff = value;
    }
    get plannedTakeoff() {
      return this._plannedTakeoff;
    }
    set plannedTakeoff(value) {
      this._plannedTakeoff = value;
    }
    get plannedRamp() {
      return this._plannedRamp;
    }
    set plannedRamp(value) {
      this._plannedRamp = value;
    }
    get plannedLanding() {
      return this._plannedLanding;
    }
    set plannedLanding(value) {
      this._plannedLanding = value;
    }
    get maxTanks() {
      return this._maxTanks;
    }
    set maxTanks(value) {
      this._maxTanks = value;
    }
    get averageFlow() {
      return this._averageFlow;
    }
    set averageFlow(value) {
      this._averageFlow = value;
    }
    get etops() {
      return this._etops;
    }
    set etops(value) {
      this._etops = value;
    }
    constructor(data) {
      _defineProperty(this, "_taxi", void 0);
      _defineProperty(this, "_enrouteBurn", void 0);
      _defineProperty(this, "_alternateBurn", void 0);
      _defineProperty(this, "_contingency", void 0);
      _defineProperty(this, "_reserve", void 0);
      _defineProperty(this, "_extra", void 0);
      _defineProperty(this, "_minTakeoff", void 0);
      _defineProperty(this, "_plannedTakeoff", void 0);
      _defineProperty(this, "_plannedRamp", void 0);
      _defineProperty(this, "_plannedLanding", void 0);
      _defineProperty(this, "_maxTanks", void 0);
      _defineProperty(this, "_averageFlow", void 0);
      _defineProperty(this, "_etops", void 0);
      const fuel = data.fuel;
      this._taxi = fuel.taxi;
      this._enrouteBurn = fuel.enroute_burn;
      this._contingency = fuel.contingency;
      this._alternateBurn = fuel.alternate_burn;
      this._reserve = fuel.reserve;
      this._etops = fuel.etops;
      this._extra = fuel.extra;
      this._minTakeoff = fuel.min_takeoff;
      this._plannedTakeoff = fuel.plan_takeoff;
      this._plannedRamp = fuel.plan_ramp;
      this._plannedLanding = fuel.plan_landing;
      this._averageFlow = fuel.avg_fuel_flow;
      this._maxTanks = fuel.max_tanks;
    }
  }

  class SimBriefNavlogParser {
    constructor(simbrief) {
      _defineProperty(this, "_rawNavlog", undefined);
      _defineProperty(this, "transformedNavlog", undefined);
      _defineProperty(this, "navlog", undefined);
      _defineProperty(this, "middlewares", []);
      _defineProperty(this, "_fixes", []);
      _defineProperty(this, "_origin", void 0);
      _defineProperty(this, "_destination", void 0);
      _defineProperty(this, "_info", void 0);
      _defineProperty(this, "_weights", void 0);
      _defineProperty(this, "_fuel", void 0);
      _defineProperty(this, "simbrief", void 0);
      this.simbrief = simbrief;
    }
    get info() {
      return this._info;
    }
    get origin() {
      return this._origin;
    }
    get destination() {
      return this._destination;
    }
    get fixes() {
      return this._fixes;
    }
    get weights() {
      return this._weights;
    }
    get fuel() {
      return this._fuel;
    }
    async parse() {
      this._rawNavlog = await this.simbrief.getFlightPlan();
      await this.parseOrigin();
      await this.parseDestination();
      await this.parseNavlogInfo();
      await this.parseWeights();
      await this.parseFuel();
      await this.transformNavlog();
      await this.parseWaypoints();
    }
    async transformNavlog() {
      const data = await this._rawNavlog;
      this.transformedNavlog = this.applyMiddlewares(data);
    }
    async parseWaypoints() {
      const fixes = this.transformedNavlog.navlog.fix;
      for (const fix of fixes) {
        this._fixes.push(new HDFix(fix));
      }
    }
    use(middleware) {
      this.middlewares.push(middleware);
    }
    applyMiddleware(data, middleware) {
      return middleware.apply(data);
    }
    applyMiddlewares(data) {
      let output = data;
      this.middlewares.forEach(middleware => {
        output = this.applyMiddleware(output, middleware);
      });
      return output;
    }
    async parseOrigin() {
      this._origin = new HDOrigin(this._rawNavlog);
    }
    async parseDestination() {
      this._destination = new HDDestination(this._rawNavlog);
    }
    async parseNavlogInfo() {
      this._info = new HDNavlogInfo(this._rawNavlog);
    }
    async parseWeights() {
      this._weights = new HDWeights(this._rawNavlog);
    }
    async parseFuel() {
      this._fuel = new HDFuel(this._rawNavlog);
    }
  }

  class SimBriefImporter {
    constructor(parser) {
      _defineProperty(this, "parser", void 0);
      this.parser = parser;
    }
    getInfo() {
      return this.parser.info;
    }
    getFixes() {
      return this.parser.fixes;
    }
    getOrigin() {
      return this.parser.origin;
    }
    getDestination() {
      return this.parser.destination;
    }
    getFuel() {
      return this.parser.fuel;
    }
    getWeights() {
      return this.parser.weights;
    }
    async execute() {
      return new Promise(async resolve => {
        await this.parser.parse();
        resolve();
      });
    }
  }

  let HeavyInput$1;
  (function (_HeavyInput) {
    class Converters {
      static inputToAltitude(input) {
        let inputCheck = input.split('FL');
        if (inputCheck.length === 1) {
          return isFinite(Number(inputCheck[0])) ? Number(inputCheck[0]) : false;
        } else {
          if (inputCheck[0] === '' && isFinite(Number(inputCheck[1]))) {
            return Number(inputCheck[1]) * 100;
          } else {
            return false;
          }
        }
      }
      static convertAltitudeDescriptionLettersToIndexes(input) {
        switch (input) {
          case '':
            return 1;
          case 'A':
            return 2;
          case 'B':
            return 3;
          case 'AB':
            return 4;
          default:
            return 0;
        }
      }
      static waypointConstraints(input) {
        let convertToFeet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let convertAltitudeDescriptionLettersToIndexes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        let inputCheck = input;
        let inputArray;
        let output = {
          speed: -1,
          altitudes: []
        };
        let stringAltitudes = [];
        let speed;
        let altitudes;
        if (inputCheck.indexOf('/') !== -1) {
          inputArray = inputCheck.split('/');
          if (inputArray.length !== 2) {
            return false;
          } else {
            speed = inputArray[0];
            altitudes = inputArray[1];
          }
        } else {
          altitudes = inputCheck;
        }
        if (speed) {
          if (Validators.speedRange(speed)) {
            output.speed = Math.round(parseInt(speed));
          } else {
            return false;
          }
        }
        if (altitudes) {
          let match = altitudes.match(/^([0-9]{4}|[0-5][0-9]{4}|FL[0-5][0-9]{2}|[0-5][0-9]{2})([AB]?)$/);
          if (!match) {
            match = altitudes.match(/^([0-9]{4}|[0-5][0-9]{4}|FL[0-5][0-9]{2}|[0-5][0-9]{2})(A)([0-9]{4}|[0-5][0-9]{4}|FL[0-5][0-9]{2}|[0-5][0-9]{2})(B)$/);
          }
          if (match) {
            match.forEach(value => {
              stringAltitudes.push(String(value));
            });
          }
        }
        if (stringAltitudes) {
          if (convertToFeet) {
            for (let i = 1; i < stringAltitudes.length - 1; i++) {
              if (stringAltitudes[i].indexOf('FL') !== -1) {
                stringAltitudes[i] = stringAltitudes[i].replace('FL', '');
                output.altitudes[i] = parseInt(stringAltitudes[i]) * 100;
              } else {
                output.altitudes[i] = parseInt(stringAltitudes[i]);
              }
            }
          }
          if (convertAltitudeDescriptionLettersToIndexes) {
            if (stringAltitudes[2] || stringAltitudes[2] === '') {
              output.altitudes[2] = this.convertAltitudeDescriptionLettersToIndexes(stringAltitudes[2]);
            }
            if (stringAltitudes[5]) {
              output.altitudes[5] = this.convertAltitudeDescriptionLettersToIndexes(stringAltitudes[5]);
            }
          }
        }
        return output.speed !== -1 || output.altitudes ? output : false;
      }
    }
    _HeavyInput.Converters = Converters;
    class Validators {
      static speedRange(input) {
        let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 399;
        const inputCheck = Number(input);
        return isFinite(inputCheck) && inputCheck >= min && inputCheck <= max;
      }
      static altitudeRange(input) {
        let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
        const inputCheck = Number(input);
        return isFinite(inputCheck) && inputCheck >= min && inputCheck <= max;
      }
      static speedRangeWithAltitude(input) {
        const inputCheck = input.split('/');
        return inputCheck.length === 2 && inputCheck[0] !== undefined && inputCheck[1] !== undefined && this.speedRange(inputCheck[0]) && this.altitudeRange(inputCheck[1]);
      }
      static speedRestriction(input, cruiseAltitude) {
        if (!this.speedRangeWithAltitude(input) || !this.altitudeRange(String(cruiseAltitude))) {
          return false;
        }
        let inputCheck = input.split('/');
        return inputCheck.length === 2 && inputCheck[0] !== undefined && inputCheck[1] !== undefined && this.speedRange(inputCheck[0]) && this.altitudeRange(inputCheck[1], 0, Number(cruiseAltitude));
      }
    }
    _HeavyInput.Validators = Validators;
  })(HeavyInput$1 || (HeavyInput$1 = {}));

  let FMCLineType;
  (function (FMCLineType) {
    FMCLineType[FMCLineType["LINE"] = 0] = "LINE";
    FMCLineType[FMCLineType["TITLE"] = 1] = "TITLE";
  })(FMCLineType || (FMCLineType = {}));

  class SelectKey {
    constructor(id, container) {
      _defineProperty(this, "id", undefined);
      _defineProperty(this, "side", undefined);
      _defineProperty(this, "_event", undefined);
      _defineProperty(this, "hoverElement", undefined);
      _defineProperty(this, "buttonElement", undefined);
      _defineProperty(this, "borderElement", undefined);
      _defineProperty(this, "dashElement", undefined);
      this.side = id.substring(0, 3);
      this.id = parseInt(id.substring(3, 4));
      this.init(container);
    }
    init(container) {
      const id = this.side + this.id;
      this.buttonElement = container.querySelector('#' + id + '-BUTTON');
      this.hoverElement = container.querySelector('#' + id + '-HOVER');
      this.dashElement = container.querySelector('#' + id + '-DASH');
      this.borderElement = container.querySelector('#' + id + '-BORDER');
      this.hookupHoverEvents();
      this.deactivateHover();
    }
    set event(event) {
      this._event = event;
      this.update();
    }
    get event() {
      return this._event;
    }
    update() {
      this.activate();
    }
    hookupHoverEvents() {
      /**
       * TODO: ForeignObject is rendered above SVG elements because of bug in ingame browser and the bug does not
       * allow to trigger events bind to SVG elements (HOVER PATH)
       *
       * POSSIBLE WORKAROUNDS:
       *
       * 1) Do not use SVG Path for highlighting (not ideal workaround)
       * 2) Bind events to SVG path and also to RSK/LSK foreign objects (not ideal [it needs to be bind to all lines and all positions LL/CL/CLL/CRL/RL])
       * 3) Create fake invisible foreign objects above lines and bind events to SVG path and the fake foreign objects [not ideal -> fake objects]
       * 4) Render SVG paths outside the SVG (not sure if possible) -> This is possible but z-index of hovers SVG has to be bigger then z-index of real FMC SVG
       * 5) Render SVG path to PNG and use foreign object to pack the PNG. (not ideal. Complications with HDRemoteFMC because the remote fmc can be rendered on many
       * devices phones/touchscreens/tables and in many resolutions)
       * 6) Render SVG dynamically and append the hover SVGs into DOM (This is what ASOBO uses...) -> do not like this approach because it needs logic for rendering static elements
       *
       * Current implementation: Number 4;
       */

      this.hoverElement.addEventListener('mouseenter', () => {
        if (this._event) {
          this.hoverElement.style.opacity = '1';
        }
      });
      this.hoverElement.addEventListener('mouseleave', () => {
        this.hoverElement.style.opacity = '0';
      });
      this.hoverElement.addEventListener('mouseup', event => {
        if (event.button === 0) {
          if (this._event) {
            this.event();
          }
        }
      });
    }
    deactivate() {
      this.deactivateButton();
      this.deactivateDash();
      this.deactivateBorder();
    }
    deactivateButton() {
      this.buttonElement.style.display = 'none';
    }
    deactivateHover() {
      this.hoverElement.style.opacity = '0';
    }
    deactivateDash() {
      this.dashElement.style.fill = '#4fceee';
    }
    deactivateBorder() {
      this.borderElement.style.fillOpacity = '0';
      this.borderElement.style.stroke = '#4fceee';
    }
    deactivateEvent() {
      this.event = undefined;
    }
    activate() {
      if (this._event) {
        this.activateButton();
        this.activateDash();
        this.activateBorder();
      } else {
        this.deactivate();
      }
    }
    activateButton() {
      this.buttonElement.style.display = 'block';
    }
    activateHover() {
      throw new Error('NOT IMPLEMENTED');
    }
    activateDash() {
      this.dashElement.style.fill = '#ffffff';
    }
    activateBorder() {
      this.borderElement.style.stroke = '#000000';
      this.borderElement.style.fill = '#726d72';
      this.borderElement.style.fillOpacity = '.56471';
    }
    trigger() {
      if (this.event) {
        this.event();
      }
    }
    render() {
      if (this.event) {
        this.activate();
      } else {
        this.deactivate();
      }
    }
  }

  class MainKey {
    constructor(id, container) {
      _defineProperty(this, "_event", undefined);
      _defineProperty(this, "id", undefined);
      _defineProperty(this, "borderElement", undefined);
      this.id = parseInt(id.substring(2));
      this.init(container);
    }

    /**
     * TODO: Revise border element html ID
     * @param {HTMLElement} container
     * @private
     */
    init(container) {
      this.borderElement = container.querySelector('#MK' + this.id + '-BUTTON');
      this.hookupKeyEvent();
    }
    set event(event) {
      this._event = event;
    }
    get event() {
      return this._event;
    }
    hookupKeyEvent() {
      this.borderElement.addEventListener('mouseup', event => {
        if (event.button === 0) {
          if (this.event) {
            this.event();
          }
        }
      });
    }
    trigger() {
      if (this.event) {
        this.event();
      }
    }
    render() {}
  }

  class FMCRenderer {
    /**
     * Holds container reference
     * TODO: Do we need to hold the container reference???
     * @type {HTMLElement}
     * @private
     */

    /**
     * TODO: Consider switch to ForeignObject DIV/SPAN because of line wrap and partial coloring/settable
     * @type {SVGTSpanElement[][]}
     * @private
     */

    /**
     * FMC Renderer
     * @param {HTMLElement} container
     * @param {IRendererTemplater} templater
     */
    constructor(container, templater) {
      _defineProperty(this, "container", void 0);
      _defineProperty(this, "middlewares", []);
      _defineProperty(this, "title", void 0);
      _defineProperty(this, "pages", void 0);
      _defineProperty(this, "lines", []);
      _defineProperty(this, "titles", []);
      _defineProperty(this, "selectKeys", []);
      _defineProperty(this, "mainKeys", []);
      _defineProperty(this, "execs", void 0);
      _defineProperty(this, "templater", void 0);
      this.container = container;
      this.templater = templater;
      this.loadElements(container);
    }

    /**
     * Renders page title
     * @param {string} title
     */
    renderTitle(title) {
      if (this.title) {
        this.title.innerHTML = title;
        this.title = this.applyMiddlewares(this.title);
      }
    }

    /**
     * Renders pages
     * @param {number} current
     * @param {number} total
     */
    renderPages(current, total) {
      if (this.pages) {
        this.pages.innerHTML = String(current) + '/' + String(total);
      }
    }

    /**
     * Clears display
     */
    clearDisplay() {
      if (this.pages) {
        this.pages.textContent = '';
        this.pages.innerHTML = '';
      }
      if (this.title) {
        this.title.textContent = '';
        this.title.innerHTML = '';
      }
      for (let i = 0; i <= this.titles.length - 1; i++) {
        this.titles[i].forEach(title => {
          title.textContent = '';
          title.innerHTML = '';
        });
      }
      for (let i = 0; i <= this.lines.length - 1; i++) {
        this.lines[i].forEach(line => {
          line.textContent = '';
          line.innerHTML = '';
        });
      }
    }

    /**
     * Returns main key
     * @param {number} id
     * @returns {MainKey | undefined}
     */
    mk(id) {
      const mkID = id - 1;
      if (mkID < 0 || mkID > 16) {
        return undefined;
      }
      return this.mainKeys[mkID];
    }

    /**
     * Sets all events to UNDEFINED
     */
    cleanUpSelectKeyEvents() {
      this.selectKeys.forEach(key => {
        key.event = undefined;
      });
    }

    /**
     * Returns Left Select Key (LSK) Object
     * @param {number} id
     * @returns {SelectKey | undefined}
     */
    lsk(id) {
      const lskID = id - 1;
      if (lskID < 0 || lskID > 5) {
        return undefined;
      }
      return this.selectKeys[lskID];
    }

    /**
     * Sets event for LSK
     * @param {number} id
     * @param {() => void} event
     */
    setLskEvent(id, event) {
      const lskID = id - 1;
      if (lskID < 0 || lskID > 5) {
        return;
      }
      this.selectKeys[lskID].event = event;
    }

    /**
     * Returns Right Select Key (RSK) Object
     * @param {number} id
     * @returns {SelectKey | undefined}
     */
    rsk(id) {
      const rskID = id + 5;
      if (rskID < 6 || rskID > 12) {
        return undefined;
      }
      return this.selectKeys[rskID];
    }

    /**
     * Sets event for RSK
     * @param {number} id
     * @param {() => void} event
     */
    setRskEvent(id, event) {
      const rskID = id + 5;
      if (rskID < 6 || rskID > 12) {
        return;
      }
      this.selectKeys[rskID].event = event;
    }

    /**
     * Renders data to FMC
     * @param {string[][]} data
     */
    render(data) {
      for (let i = 0; i <= this.titles.length - 1; i++) {
        this.setDataToLine(i, data[i * 2], FMCLineType.TITLE);
        this.titles[i] = this.titles[i].map(value => {
          return this.applyMiddlewares(value);
        });
      }
      for (let i = 0; i <= this.lines.length - 1; i++) {
        this.setDataToLine(i, data[i * 2 + 1], FMCLineType.LINE);
        this.lines[i] = this.lines[i].map(value => {
          return this.applyMiddlewares(value);
        });
      }
    }

    /**
     * Renders exec state
     * @param {boolean} state
     */
    renderExec(state) {
      if (this.execs) {
        if (state === true) {
          for (const exec of this.execs) {
            exec.style.fill = '#65ff3a';
          }
        } else {
          for (const exec of this.execs) {
            exec.style.fill = '#354b4f';
          }
        }
      }
    }

    /**
     * Sets data to lines
     * @param {number} index
     * @param {string[]} data
     * @param {FMCLineType} type
     * @private
     */
    setDataToLine(index, data, type) {
      let target = [];
      if (type === FMCLineType.LINE) {
        target = this.lines[index];
      } else if (type === FMCLineType.TITLE) {
        target = this.titles[index];
      }
      if (data && target) {
        this.templater.arrange(data, target);
      }
    }

    /**
     * Adds middleware
     * @param {IRendererMiddleware} middleware
     */
    use(middleware) {
      this.middlewares.push(middleware);
    }

    /**
     * Apply middleware to value
     * @param value
     * @param {IRendererMiddleware} middleware
     * @returns {any}
     * @private
     */
    applyMiddleware(value, middleware) {
      return middleware.apply(value);
    }

    /**
     * Applies all middlewares
     * @param value
     * @returns {any}
     * @private
     */
    applyMiddlewares(value) {
      let output = value;
      this.middlewares.forEach(middleware => {
        output = this.applyMiddleware(output, middleware);
      });
      return output;
    }

    /**
     * Loads all elements and store references
     * @param {HTMLElement} container
     * @private
     */
    loadElements(container) {
      this.loadTitles(container);
      this.loadLines(container);
      /**
       * Exec require document or body to be able to highlight both buttons. This is not a good practice
       * but it does not have performance impact because the elements are cached in memory
       */
      this.loadExec(document.body);
      this.loadPageTitle(container);
      this.loadPages(container);
      this.loadSelectKeys(container);
      this.loadMainKeys(container);
    }

    /**
     * Loads all lines and store references
     * @param {HTMLElement} container
     * @private
     */
    loadLines(container) {
      for (let i = 0; i <= FMCRenderer.numberOfLines - 1; i++) {
        this.lines[i] = [];
        for (let j = 0; j <= FMCRenderer.linesPrefixes.length - 1; j++) {
          const element = this.loadLine(String('#' + FMCRenderer.linesPrefixes[j] + (i + 1) + '-FOREIGN'), container);
          if (element) {
            this.lines[i][j] = element;
          }
        }
      }
    }

    /**
     * Loads all titles and store references
     * @param {HTMLElement} container
     * @private
     */
    loadTitles(container) {
      for (let i = 0; i <= FMCRenderer.numberOfTitles - 1; i++) {
        this.titles[i] = [];
        for (let j = 0; j <= FMCRenderer.titlesPrefixes.length - 1; j++) {
          const element = this.loadTitle(String('#' + FMCRenderer.titlesPrefixes[j] + (i + 1) + '-FOREIGN'), container);
          if (element) {
            this.titles[i][j] = element;
          }
        }
      }
    }

    /**
     * Loads title page element
     * @param {HTMLElement} container
     * @private
     */
    loadPageTitle(container) {
      const textElement = container.querySelector('#TITLE-FOREIGN');
      if (textElement) {
        this.title = textElement;
      }
    }

    /**
     * Loads pages text element
     * @param {HTMLElement} container
     * @private
     */
    loadPages(container) {
      const textElement = container.querySelector('#PAGES-FOREIGN');
      if (textElement) {
        this.pages = textElement;
      }
    }

    /**
     * Loads exec light
     * @param {HTMLElement} container
     * @private
     */
    loadExec(container) {
      const execRects = container.getElementsByClassName('exec-emit-class');
      if (execRects) {
        this.execs = execRects;
      }
    }

    /**
     * Loads line from container and returns HTMLElement of line
     * @param {string} id
     * @param {HTMLElement} container
     * @returns {HTMLElement}
     * @private
     */
    loadLine(id, container) {
      const textElement = container.querySelector(id);
      if (textElement) {
        return textElement;
      }
      return undefined;
    }

    /**
     * Loads title from container and returns HTMLElement of title
     * @param {string} id
     * @param {HTMLElement} container
     * @returns {HTMLElement}
     * @private
     */
    loadTitle(id, container) {
      const textElement = container.querySelector(id);
      if (textElement) {
        return textElement;
        //return textElement.getElementsByTagName('tspan')[0];
      }

      return undefined;
    }
    loadSelectKeys(container) {
      const leftKeys = container.querySelectorAll('.lsk-btn');
      const rightKeys = container.querySelectorAll('.rsk-btn');
      leftKeys.forEach(element => {
        this.selectKeys.push(new SelectKey(element.id, container));
      });
      rightKeys.forEach(element => {
        this.selectKeys.push(new SelectKey(element.id, container));
      });
    }
    loadMainKeys(container) {
      const mainKeys = container.querySelectorAll('.mk-btn');
      mainKeys.forEach(element => {
        this.mainKeys.push(new MainKey(element.id, container));
      });
    }
  }
  _defineProperty(FMCRenderer, "linesPrefixes", ['LL', 'CLL', 'CL', 'CRL', 'RL']);
  _defineProperty(FMCRenderer, "titlesPrefixes", ['LT', 'CLT', 'CT', 'CRT', 'RT']);
  _defineProperty(FMCRenderer, "numberOfLines", 6);
  _defineProperty(FMCRenderer, "numberOfTitles", 6);
  exports = {
    FMCRenderer
  };

  class ColorRendererMiddleware {
    constructor() {
      _defineProperty(this, "regex", /\[color=([a-z-]+)\](.*?)\[\/color\]/g);
    }
    apply(value) {
      return this.applyRegex(value);
    }
    applyRegex(value) {
      if (value instanceof String) {
        return value.replace(this.regex, '$2');
      } else if (value instanceof SVGTSpanElement) {
        if (value.textContent) {
          value.textContent = value.textContent.replace(this.regex, '$2');
          return value;
        } else {
          return value;
        }
      } else if (value instanceof HTMLElement) {
        if (this.regex.test(value.innerHTML)) {
          value.innerHTML = value.innerHTML.replace(this.regex, '<tspan class="$1">$2</tspan>');
        }
        return value;
      }
      return value;
    }
  }

  class SizeRendererMiddleware {
    constructor() {
      _defineProperty(this, "regex", /\[size=([a-z-]+)\](.*?)\[\/size\]/g);
    }
    apply(value) {
      return this.applyRegex(value);
    }
    applyRegex(value) {
      if (value instanceof String) {
        return value.replace(this.regex, '$2');
      } else if (value instanceof SVGTSpanElement) {
        if (value.textContent) {
          value.textContent = value.textContent.replace(this.regex, '$2');
          return value;
        } else {
          return value;
        }
      } else if (value instanceof HTMLElement) {
        if (this.regex.test(value.innerHTML)) {
          value.innerHTML = value.innerHTML.replace(this.regex, '<tspan class="$1">$2</tspan>');
        }
        return value;
      }
      return value;
    }
  }

  class SeparatorRendererMiddleware {
    constructor() {
      _defineProperty(this, "separator", '__FMCSEPARATOR');
      _defineProperty(this, "replace", '---------------------------------------------');
    }
    apply(value) {
      return this.applyReplace(value);
    }
    applyReplace(value) {
      if (value instanceof String) {
        if (value === this.separator) {
          value = this.replace;
        }
      } else if (value instanceof SVGTSpanElement) {
        if (value.textContent === this.separator) {
          value.textContent = this.replace;
        }
      } else if (value instanceof HTMLElement) {
        if (value.innerText === this.separator) {
          value.innerHTML = this.replace;
        }
      }
      return value;
    }
  }

  class SettableRendererMiddleware {
    constructor() {
      _defineProperty(this, "regexUndefined", /\[settable=undefined](.*)\[\/settable]/g);
      _defineProperty(this, "regexFixedWidth", /\[settable=([0-9]+)](.*)\[\/settable]/g);
    }
    apply(value) {
      return this.applyRegex(value);
    }
    applyRegex(value) {
      this.regexUndefined.lastIndex = 0;
      this.regexFixedWidth.lastIndex = 0;
      if (value instanceof String) {
        value = value.replace(this.regexUndefined, '<div class="settable"><span>$1</span></div>');
        value = value.replace(this.regexFixedWidth, '<div class=\'settable\' style=\'width: $1px\'><span>$2</span></div>');
        return value;
      } else if (value instanceof SVGTSpanElement) {
        if (value.textContent) {
          if (this.regexUndefined.test(value.textContent) || this.regexFixedWidth.test(value.textContent)) {
            value.classList.add('settableTarget');
          } else {
            value.classList.remove('settableTarget');
          }
          value.textContent = value.textContent.replace(this.regexUndefined, '<div class="settable"><span>$1</span></div>');
          value.textContent = value.textContent.replace(this.regexFixedWidth, '<div class=\'settable\' style=\'width: $1px\'><span>$2</span></div>');
          return value;
        } else {
          value.classList.remove('settableTarget');
          return value;
        }
      } else if (value instanceof HTMLElement) {
        value.innerHTML = value.innerHTML.replace(this.regexUndefined, '<div class="settable"><span>$1</span></div>');
        value.innerHTML = value.innerHTML.replace(this.regexFixedWidth, '<div class=\'settable\' style=\'width: $1px\'><span>$2</span></div>');
        return value;
      }
      return value;
    }
  }

  /**
   * NaturalRendererTemplater
   *
   * Templater renders data in natural way
   *
   * ['left']
   * ['left', 'right']
   * ['left', 'center', 'right']
   * ['left', 'center left', 'center right','right']
   */

  class NaturalRendererTemplater {
    arrange(data, target) {
      this.execute(data, target);
    }

    /**
     * Executes arrange
     * @param {string[]} data
     * @param {HTMLElement[] | SVGTSpanElement[]} target
     * @private
     */
    execute(data, target) {
      /**
       * TODO: This is only basic check. It should unpack target array and handle every target independently
       * Templater will fail if the targets are not same. (It should not be a problem because does not make sense to have different targets in one line)
       */
      if (target[0] instanceof SVGTSpanElement) {
        this.arrangeSVG(data, target);
      } else if (target[0] instanceof HTMLElement) {
        this.arrangeHtml(data, target);
      }
    }
    arrangeSVG(data, target) {
      switch (data.length) {
        case 1:
          target[0].textContent = data[0];
          target[1].textContent = '';
          target[2].textContent = '';
          target[3].textContent = '';
          target[4].textContent = '';
          break;
        case 2:
          target[0].textContent = data[0];
          target[1].textContent = '';
          target[2].textContent = '';
          target[3].textContent = '';
          target[4].textContent = data[1];
          break;
        case 3:
          target[0].textContent = data[0];
          target[1].textContent = '';
          target[2].textContent = data[1];
          target[3].textContent = '';
          target[4].textContent = data[2];
          break;
        case 4:
          target[0].textContent = data[0];
          target[1].textContent = data[1];
          target[2].textContent = '';
          target[3].textContent = data[2];
          target[4].textContent = data[3];
          break;
      }
    }
    arrangeHtml(data, target) {
      switch (data.length) {
        case 1:
          target[0].textContent = target[0].innerText = data[0];
          target[1].textContent = target[1].innerText = '';
          target[2].textContent = target[2].innerText = '';
          target[3].textContent = target[3].innerText = '';
          target[4].textContent = target[4].innerText = '';
          break;
        case 2:
          target[0].textContent = target[0].innerText = data[0];
          target[1].textContent = target[1].innerText = '';
          target[2].textContent = target[2].innerText = '';
          target[3].textContent = target[3].innerText = '';
          target[4].textContent = target[4].innerText = data[1];
          break;
        case 3:
          target[0].textContent = target[0].innerText = data[0];
          target[1].textContent = target[1].innerText = '';
          target[2].textContent = target[2].innerText = data[1];
          target[3].textContent = target[3].innerText = '';
          target[4].textContent = target[4].innerText = data[2];
          break;
        case 4:
          target[0].textContent = target[0].innerText = data[0];
          target[1].textContent = target[1].innerText = data[1];
          target[2].textContent = target[2].innerText = '';
          target[3].textContent = target[3].innerText = data[2];
          target[4].textContent = target[4].innerText = data[3];
          break;
      }
    }
  }

  let HDSpeedPhase;
  (function (HDSpeedPhase) {
    HDSpeedPhase[HDSpeedPhase["SPEED_PHASE_CLIMB"] = 0] = "SPEED_PHASE_CLIMB";
    HDSpeedPhase[HDSpeedPhase["SPEED_PHASE_CRUISE"] = 1] = "SPEED_PHASE_CRUISE";
    HDSpeedPhase[HDSpeedPhase["SPEED_PHASE_DESCENT"] = 2] = "SPEED_PHASE_DESCENT";
    HDSpeedPhase[HDSpeedPhase["SPEED_PHASE_APPROACH"] = 3] = "SPEED_PHASE_APPROACH";
  })(HDSpeedPhase || (HDSpeedPhase = {}));

  let HDSpeedType;
  (function (HDSpeedType) {
    HDSpeedType[HDSpeedType["SPEED_TYPE_ECON"] = 0] = "SPEED_TYPE_ECON";
    HDSpeedType[HDSpeedType["SPEED_TYPE_SELECTED"] = 1] = "SPEED_TYPE_SELECTED";
    HDSpeedType[HDSpeedType["SPEED_TYPE_RESTRICTION"] = 2] = "SPEED_TYPE_RESTRICTION";
    HDSpeedType[HDSpeedType["SPEED_TYPE_TRANSITION"] = 3] = "SPEED_TYPE_TRANSITION";
    HDSpeedType[HDSpeedType["SPEED_TYPE_ACCELERATION"] = 4] = "SPEED_TYPE_ACCELERATION";
    HDSpeedType[HDSpeedType["SPEED_TYPE_PROTECTED"] = 5] = "SPEED_TYPE_PROTECTED";
    HDSpeedType[HDSpeedType["SPEED_TYPE_WAYPOINT"] = 6] = "SPEED_TYPE_WAYPOINT";
  })(HDSpeedType || (HDSpeedType = {}));

  class HDSpeed {
    constructor(speed) {
      _defineProperty(this, "_speed", void 0);
      this._speed = Number(speed);
    }

    /**
     * Speed getter
     * @returns {number}
     */
    get speed() {
      return this._speed;
    }

    /**
     * Speed setter
     * @param speed
     */
    set speed(speed) {
      this._speed = Number(speed);
    }
    isValid() {
      return this._speed && isFinite(this._speed);
    }
  }

  class HDDescentSpeed extends HDSpeed {
    constructor(speed, speedMach) {
      super(speed);
      _defineProperty(this, "_speedMach", void 0);
      this._speedMach = Number(speedMach);
    }
    get speedMach() {
      return this._speedMach;
    }
    set speedMach(speedMach) {
      this._speedMach = Number(speedMach);
    }
  }

  class HDSpeedRestriction extends HDSpeed {
    constructor(speed, altitude) {
      super(speed);
      _defineProperty(this, "_altitude", void 0);
      this._altitude = Number(altitude);
    }
    get altitude() {
      return this._altitude;
    }
    set altitude(altitude) {
      this._altitude = Number(altitude);
    }
  }

  class HDAccelerationSpeedRestriction extends HDSpeedRestriction {
    constructor(speed, altitude, height) {
      super(speed, altitude);
      _defineProperty(this, "_accelerationHeight", void 0);
      this._accelerationHeight = Number(height);
    }

    /**
     * Acceleration height setter
     * @param height
     */
    set accelerationHeight(height) {
      this._accelerationHeight = Number(height);
    }

    /**
     * Returns acceleration height
     * @returns {number}
     */
    get accelerationHeight() {
      return this._accelerationHeight;
    }

    /**
     * TODO: logic for v2+10 - v2+25 has to be implemented
     * @returns {boolean}
     */
    isValid() {
      const planeAltitude = Simplane.getAltitude();
      const v2speed = SimVar.GetSimVarValue('L:AIRLINER_V2_SPEED', 'Knots');
      this.speed = Number(v2speed + 25);
      if (this._speed && isFinite(this._speed) && this._altitude && isFinite(this._altitude)) {
        if (this._altitude > planeAltitude) {
          return true;
        }
      }
      return false;
    }
  }

  class HDOverspeedProtection extends HDSpeed {
    /**
     * Speed getter
     * @returns {number}
     */
    get speed() {
      return Number(this.getFlapProtectionMaxSpeed(Simplane.getFlapsHandleIndex()));
    }

    /**
     * Overspeed protection should be always valid
     * @returns {boolean}
     */
    isValid() {
      return true;
    }

    /**
     * Flap protection speeds table
     * @param handleIndex
     * @returns {number}
     */
    getFlapProtectionMaxSpeed(handleIndex) {
      switch (handleIndex) {
        case 0:
          return 360;
        case 1:
          return 255;
        case 2:
          return 235;
        case 3:
          return 225;
        case 4:
          return 215;
        case 5:
          return 210;
        case 6:
          return 210;
        case 7:
          return 205;
        case 8:
          return 185;
        case 9:
          return 175;
      }
      return 360;
    }
  }

  class HDClimbSpeedRestriction extends HDSpeedRestriction {
    isValid() {
      const planeAltitude = Simplane.getAltitude();
      if (this._speed && isFinite(this._speed) && this._altitude && isFinite(this._altitude)) {
        if (this._altitude > planeAltitude) {
          return true;
        }
      }
      return false;
    }
  }

  class HDSpeedTransition extends HDSpeedRestriction {
    constructor() {
      let speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
      let altitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      let isDeleted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      super(speed, altitude);
      _defineProperty(this, "_isDeleted", void 0);
      this._isDeleted = Boolean(isDeleted);
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(isDeleted) {
      this._isDeleted = Boolean(isDeleted);
    }

    /**
     * TODO implement above/bellow altitude check
     * @param planeAltitude
     * @returns {boolean}
     */
    isValid() {
      const planeAltitude = Simplane.getAltitude();
      if (this._speed && isFinite(this._speed) && !this._isDeleted) {
        if (10000 > planeAltitude) {
          return true;
        }
      }
      return false;
    }
  }

  class HDClimbSpeedTransition extends HDSpeedTransition {
    constructor() {
      let speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
      let altitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      let isDeleted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      super(speed, altitude, isDeleted);
    }
  }

  class HDClimbSpeed extends HDSpeed {
    constructor(speed) {
      super(speed);
    }
  }

  class HDCruiseSpeed extends HDSpeed {
    constructor(speed, speedMach) {
      super(speed);
      _defineProperty(this, "_speedMach", void 0);
      this._speedMach = Number(speedMach);
    }
    get speedMach() {
      return this._speedMach;
    }
    set speedMach(speedMach) {
      this._speedMach = Number(speedMach);
    }
  }

  class HDDescentSpeedRestriction extends HDSpeedRestriction {
    /**
     * TODO: Not implemented
     * @returns {boolean}
     */
    isValid() {
      return false;
    }
  }

  class HDDescentSpeedTransition extends HDSpeedTransition {
    constructor() {
      let speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 240;
      let altitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10500;
      let isDeleted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      super(speed, altitude, isDeleted);
    }
  }

  class SpeedDirector {
    get descentSpeedEcon() {
      return this._descentSpeedEcon;
    }
    set descentSpeedEcon(value) {
      this._descentSpeedEcon = value;
    }
    get descentSpeedSelected() {
      return this._descentSpeedSelected;
    }
    set descentSpeedSelected(value) {
      this._descentSpeedSelected = value;
    }
    get descentSpeedTransition() {
      return this._descentSpeedTransition;
    }
    set descentSpeedTransition(value) {
      this._descentSpeedTransition = value;
    }
    get descentSpeedRestriction() {
      return this._descentSpeedRestriction;
    }
    set descentSpeedRestriction(value) {
      this._descentSpeedRestriction = value;
    }
    get cruiseSpeedEcon() {
      return this._cruiseSpeedEcon;
    }
    set cruiseSpeedEcon(value) {
      this._cruiseSpeedEcon = value;
    }
    get cruiseSpeedSelected() {
      return this._cruiseSpeedSelected;
    }
    set cruiseSpeedSelected(value) {
      this._cruiseSpeedSelected = value;
    }
    get climbSpeedEcon() {
      return this._climbSpeedEcon;
    }
    set climbSpeedEcon(value) {
      this._climbSpeedEcon = value;
    }
    get climbSpeedSelected() {
      return this._climbSpeedSelected;
    }
    set climbSpeedSelected(value) {
      this._climbSpeedSelected = value;
    }
    get climbSpeedTransition() {
      return this._climbSpeedTransition;
    }
    set climbSpeedTransition(value) {
      this._climbSpeedTransition = value;
    }
    get climbSpeedRestriction() {
      return this._climbSpeedRestriction;
    }
    set climbSpeedRestriction(value) {
      this._climbSpeedRestriction = value;
    }
    get accelerationSpeedRestriction() {
      return this._accelerationSpeedRestriction;
    }
    set accelerationSpeedRestriction(value) {
      this._accelerationSpeedRestriction = value;
    }
    constructor(speedManager) {
      _defineProperty(this, "_commandedSpeedType", void 0);
      _defineProperty(this, "_lastCommandedSpeedType", void 0);
      _defineProperty(this, "_speedPhase", void 0);
      _defineProperty(this, "_lastSpeedPhase", void 0);
      _defineProperty(this, "_machMode", void 0);
      _defineProperty(this, "_lastMachMode", void 0);
      _defineProperty(this, "_lastSpeed", void 0);
      _defineProperty(this, "_speedCheck", void 0);
      _defineProperty(this, "_planeAltitude", void 0);
      _defineProperty(this, "_accelerationSpeedRestriction", void 0);
      _defineProperty(this, "_overspeedProtection", void 0);
      _defineProperty(this, "_climbSpeedRestriction", void 0);
      _defineProperty(this, "_climbSpeedTransition", void 0);
      _defineProperty(this, "_climbSpeedSelected", void 0);
      _defineProperty(this, "_climbSpeedEcon", void 0);
      _defineProperty(this, "_cruiseSpeedSelected", void 0);
      _defineProperty(this, "_cruiseSpeedEcon", void 0);
      _defineProperty(this, "_descentSpeedRestriction", void 0);
      _defineProperty(this, "_descentSpeedTransition", void 0);
      _defineProperty(this, "_descentSpeedSelected", void 0);
      _defineProperty(this, "_descentSpeedEcon", void 0);
      _defineProperty(this, "_speedManager", void 0);
      _defineProperty(this, "_costIndexCoefficient", void 0);
      this._speedManager = speedManager;
      /**
       * TODO: FMC should be removed. All speed related values should be stored directly in SpeedDirector
       * @private
       */
      this._commandedSpeedType = undefined;
      this._lastCommandedSpeedType = undefined;
      this._speedPhase = undefined;
      this._lastSpeedPhase = undefined;
      this._machMode = undefined;
      this._lastMachMode = undefined;
      this._lastSpeed = undefined;
      this._speedCheck = undefined;
      this.Init();
    }
    Init() {
      this._updateAltitude();
      this._updateLastSpeed();
      this._updateMachMode();
      this._updateManagedSpeed();
      this._initSpeeds();
    }
    _initSpeeds() {
      this._accelerationSpeedRestriction = new HDAccelerationSpeedRestriction(this._speedManager.repository.v2Speed + 10, 1500, 1500);
      this._overspeedProtection = new HDOverspeedProtection(undefined);
      this._climbSpeedRestriction = new HDClimbSpeedRestriction(undefined, undefined);
      this._climbSpeedTransition = new HDClimbSpeedTransition();
      this._climbSpeedSelected = new HDClimbSpeed(undefined);
      this._climbSpeedEcon = new HDClimbSpeed(this._speedManager.getEconClbManagedSpeed(0));
      this._cruiseSpeedSelected = new HDCruiseSpeed(undefined, undefined);
      this._cruiseSpeedEcon = new HDCruiseSpeed(this._speedManager.getEconCrzManagedSpeed(0), 0.85);
      this._descentSpeedRestriction = new HDDescentSpeedRestriction(undefined, undefined);
      this._descentSpeedTransition = new HDDescentSpeedTransition();
      this._descentSpeedSelected = new HDDescentSpeed(undefined, undefined);
      this._descentSpeedEcon = new HDDescentSpeed(282, undefined);

      //		this._waypointSpeedConstraint = new WaypointSpeed(null, null);
    }

    get machModeActive() {
      return this._machMode;
    }
    _updateMachMode() {
      this._machMode = Simplane.getAutoPilotMachModeActive();
      this._updateFmcIfNeeded();
    }
    _updateLastMachMode() {
      this._lastMachMode = this._machMode;
    }
    _updateAltitude() {
      this._planeAltitude = Simplane.getAltitude();
    }
    _updateManagedSpeed() {}
    _resolveMachKias(speed) {
      if (this.machModeActive) {
        const maxMachSpeed = 0.850;
        const requestedSpeed = SimVar.GetGameVarValue('FROM KIAS TO MACH', 'number', speed.speed);
        return Math.min(maxMachSpeed, requestedSpeed);
      } else {
        return speed.speed;
      }
    }
    get speed() {
      switch (this.speedPhase) {
        case HDSpeedPhase.SPEED_PHASE_CLIMB:
          switch (this.commandedSpeedType) {
            case HDSpeedType.SPEED_TYPE_RESTRICTION:
              return this._resolveMachKias(this._climbSpeedRestriction);
            case HDSpeedType.SPEED_TYPE_TRANSITION:
              return this._resolveMachKias(this._climbSpeedTransition);
            case HDSpeedType.SPEED_TYPE_SELECTED:
              return this._resolveMachKias(this._climbSpeedSelected);
            case HDSpeedType.SPEED_TYPE_ACCELERATION:
              return this._resolveMachKias(this._accelerationSpeedRestriction);
            case HDSpeedType.SPEED_TYPE_PROTECTED:
              return this._resolveMachKias(this._overspeedProtection);
            //					case SpeedType.SPEED_TYPE_WAYPOINT:
            //						return (this.machModeActive ? (this._waypointSpeedConstraint.speedMach ? this._waypointSpeedConstraint.speedMach : this._resolveMachKias(this._waypointSpeedConstraint)) : this._waypointSpeedConstraint.speed);
            case HDSpeedType.SPEED_TYPE_ECON:
              return this._resolveMachKias(this._climbSpeedEcon);
            default:
              return 133;
          }
        case HDSpeedPhase.SPEED_PHASE_CRUISE:
          switch (this.commandedSpeedType) {
            case HDSpeedType.SPEED_TYPE_RESTRICTION:
            case HDSpeedType.SPEED_TYPE_TRANSITION:
            case HDSpeedType.SPEED_TYPE_ECON:
              return this.machModeActive ? this._cruiseSpeedEcon.speedMach : this._cruiseSpeedEcon.speed;
            case HDSpeedType.SPEED_TYPE_SELECTED:
              return this.machModeActive ? this._cruiseSpeedSelected.speedMach ? this._cruiseSpeedSelected.speedMach : this._resolveMachKias(this._cruiseSpeedSelected) : this._cruiseSpeedSelected.speed;
            case HDSpeedType.SPEED_TYPE_PROTECTED:
              return this._resolveMachKias(this._overspeedProtection);
            //					case SpeedType.SPEED_TYPE_WAYPOINT:
            //						return (this.machModeActive ? (this._waypointSpeedConstraint.speedMach ? this._waypointSpeedConstraint.speedMach : this._resolveMachKias(this._waypointSpeedConstraint)) : this._waypointSpeedConstraint.speed);
          }

          break;
        case HDSpeedPhase.SPEED_PHASE_DESCENT:
          switch (this.commandedSpeedType) {
            case HDSpeedType.SPEED_TYPE_RESTRICTION:
              return this._resolveMachKias(this._descentSpeedRestriction);
            case HDSpeedType.SPEED_TYPE_TRANSITION:
              return this._resolveMachKias(this._descentSpeedTransition);
            case HDSpeedType.SPEED_TYPE_SELECTED:
              return this.machModeActive ? this._descentSpeedSelected.speedMach ? this._descentSpeedSelected.speedMach : this._resolveMachKias(this._descentSpeedSelected) : this._descentSpeedSelected.speed;
            case HDSpeedType.SPEED_TYPE_ECON:
              return this._resolveMachKias(this._descentSpeedEcon);
            case HDSpeedType.SPEED_TYPE_PROTECTED:
              return this._resolveMachKias(this._overspeedProtection);
            //					case SpeedType.SPEED_TYPE_WAYPOINT:
            //						return (this.machModeActive ? (this._waypointSpeedConstraint.speedMach ? this._waypointSpeedConstraint.speedMach : this._resolveMachKias(this._waypointSpeedConstraint)) : this._waypointSpeedConstraint.speed);
          }

          break;
        case HDSpeedPhase.SPEED_PHASE_APPROACH:
          switch (this.commandedSpeedType) {
            case HDSpeedType.SPEED_TYPE_RESTRICTION:
              return this._resolveMachKias(this._descentSpeedRestriction);
            case HDSpeedType.SPEED_TYPE_TRANSITION:
              return this._resolveMachKias(this._descentSpeedTransition);
            case HDSpeedType.SPEED_TYPE_SELECTED:
              return this.machModeActive ? this._descentSpeedSelected.speedMach ? this._descentSpeedSelected.speedMach : this._resolveMachKias(this._descentSpeedSelected) : this._descentSpeedSelected.speed;
            case HDSpeedType.SPEED_TYPE_ECON:
              return this._resolveMachKias(this._descentSpeedEcon);
            case HDSpeedType.SPEED_TYPE_PROTECTED:
              return this._resolveMachKias(this._overspeedProtection);
            //					case SpeedType.SPEED_TYPE_WAYPOINT:
            //						return (this.machModeActive ? (this._waypointSpeedConstraint.speedMach ? this._waypointSpeedConstraint.speedMach : this._resolveMachKias(this._waypointSpeedConstraint)) : this._waypointSpeedConstraint.speed);
          }

          break;
      }
    }
    get speedPhase() {
      return this._speedPhase;
    }
    get commandedSpeedType() {
      return this._commandedSpeedType;
    }
    _updateLastSpeed() {
      this._lastSpeed = this.speed ? this.speed : undefined;
    }
    _updateCheckSpeed() {
      this._speedCheck = this.speed;
    }
    update(flightPhase, costIndexCoefficient) {
      this._costIndexCoefficient = costIndexCoefficient;
      this._updateAltitude();
      this._updateLastSpeed();
      switch (flightPhase) {
        case FlightPhase.FLIGHT_PHASE_PREFLIGHT:
        case FlightPhase.FLIGHT_PHASE_TAXI:
        case FlightPhase.FLIGHT_PHASE_TAKEOFF:
        case FlightPhase.FLIGHT_PHASE_CLIMB:
        case FlightPhase.FLIGHT_PHASE_GOAROUND:
          this._updateClimbSpeed();
          break;
        case FlightPhase.FLIGHT_PHASE_CRUISE:
          this._updateCruiseSpeed();
          break;
        case FlightPhase.FLIGHT_PHASE_DESCENT:
          this._updateDescentSpeed();
          break;
        case FlightPhase.FLIGHT_PHASE_APPROACH:
          this._updateApproachSpeed();
          break;
      }
      this._updateCheckSpeed();
    }
    _updateClimbSpeed() {
      let speed = {
        [HDSpeedType.SPEED_TYPE_RESTRICTION]: this._climbSpeedRestriction && this._climbSpeedRestriction.isValid() ? this._climbSpeedRestriction.speed : false,
        [HDSpeedType.SPEED_TYPE_TRANSITION]: this._climbSpeedTransition && this._climbSpeedTransition.isValid() ? this._climbSpeedTransition.speed : false,
        [HDSpeedType.SPEED_TYPE_ACCELERATION]: this._accelerationSpeedRestriction && this._accelerationSpeedRestriction.isValid() ? this._accelerationSpeedRestriction.speed : false,
        [HDSpeedType.SPEED_TYPE_PROTECTED]: this._overspeedProtection && this._overspeedProtection.isValid() ? this._overspeedProtection.speed : false,
        [HDSpeedType.SPEED_TYPE_SELECTED]: this._climbSpeedSelected && this._climbSpeedSelected.isValid() ? this._climbSpeedSelected.speed : false,
        //[SpeedType.SPEED_TYPE_WAYPOINT]: (this._waypointSpeedConstraint && this._waypointSpeedConstraint.isValid() ? this._waypointSpeedConstraint.speed : false),
        [HDSpeedType.SPEED_TYPE_ECON]: this._climbSpeedEcon && this._climbSpeedEcon.isValid() ? this._climbSpeedEcon.speed : false
      };
      this._updateLastCommandedSpeed();
      this._updateLastMachMode();
      let commandedSpeedKey = Object.keys(speed).filter(key => !!speed[key]).reduce((accumulator, value) => {
        return speed[value] < speed[accumulator] ? value : accumulator;
      }, HDSpeedType.SPEED_TYPE_ECON);
      commandedSpeedKey = this.shouldCommandSelectedSpeed(commandedSpeedKey, this._climbSpeedSelected);
      this._updateCommandedSpeed(commandedSpeedKey, HDSpeedPhase.SPEED_PHASE_CLIMB);
      this._updateMachMode();
    }
    shouldCommandSelectedSpeed(commandedSpeedKey, selectedSpeed) {
      if (Number(commandedSpeedKey) === HDSpeedType.SPEED_TYPE_ECON) {
        return selectedSpeed.isValid() ? HDSpeedType.SPEED_TYPE_SELECTED : HDSpeedType.SPEED_TYPE_ECON;
      } else {
        return Number(commandedSpeedKey);
      }
    }
    _updateCruiseSpeed() {
      let speed = {
        [HDSpeedType.SPEED_TYPE_SELECTED]: this._cruiseSpeedSelected && this._cruiseSpeedSelected.isValid() ? this._cruiseSpeedSelected.speed : false,
        [HDSpeedType.SPEED_TYPE_PROTECTED]: this._overspeedProtection && this._overspeedProtection.isValid() ? this._overspeedProtection.speed : false,
        //[SpeedType.SPEED_TYPE_WAYPOINT]: (this._waypointSpeedConstraint && this._waypointSpeedConstraint.isValid() ? this._waypointSpeedConstraint.speed : false),
        [HDSpeedType.SPEED_TYPE_ECON]: this._cruiseSpeedEcon && this._cruiseSpeedEcon.isValid() ? this._cruiseSpeedEcon.speed : null
      };
      this._updateLastCommandedSpeed();
      this._updateLastMachMode();
      let commandedSpeedKey = Object.keys(speed).filter(key => !!speed[key]).reduce((accumulator, value) => {
        return speed[value] < speed[accumulator] ? value : accumulator;
      }, HDSpeedType.SPEED_TYPE_ECON);
      commandedSpeedKey = this.shouldCommandSelectedSpeed(commandedSpeedKey, this._cruiseSpeedSelected);
      this._updateCommandedSpeed(commandedSpeedKey, HDSpeedPhase.SPEED_PHASE_CRUISE);
      this._updateMachMode();
    }
    _updateDescentSpeed() {
      let speed = {
        [HDSpeedType.SPEED_TYPE_RESTRICTION]: this._descentSpeedRestriction && this._descentSpeedRestriction.isValid() ? this._descentSpeedRestriction.speed : false,
        [HDSpeedType.SPEED_TYPE_TRANSITION]: this._descentSpeedTransition && this._descentSpeedTransition.isValid() ? this._descentSpeedTransition.speed : false,
        [HDSpeedType.SPEED_TYPE_PROTECTED]: this._overspeedProtection && this._overspeedProtection.isValid() ? this._overspeedProtection.speed : false,
        [HDSpeedType.SPEED_TYPE_SELECTED]: this._descentSpeedSelected && this._descentSpeedSelected.isValid() ? this._descentSpeedSelected.speed : false,
        //[SpeedType.SPEED_TYPE_WAYPOINT]: (this._waypointSpeedConstraint && this._waypointSpeedConstraint.isValid() ? this._waypointSpeedConstraint.speed : false),
        [HDSpeedType.SPEED_TYPE_ECON]: this._descentSpeedEcon && this._descentSpeedEcon.isValid() ? this._descentSpeedEcon.speed : false
      };
      this._updateLastCommandedSpeed();
      this._updateLastMachMode();
      let commandedSpeedKey = Object.keys(speed).filter(key => !!speed[key]).reduce((accumulator, value) => {
        return speed[value] < speed[accumulator] ? value : accumulator;
      }, HDSpeedType.SPEED_TYPE_ECON);
      commandedSpeedKey = this.shouldCommandSelectedSpeed(commandedSpeedKey, this._descentSpeedSelected);
      this._updateCommandedSpeed(commandedSpeedKey, HDSpeedPhase.SPEED_PHASE_DESCENT);
      this._updateMachMode();
    }
    _updateApproachSpeed() {
      let speed = {
        [HDSpeedType.SPEED_TYPE_RESTRICTION]: this._descentSpeedRestriction && this._descentSpeedRestriction.isValid() ? this._descentSpeedRestriction.speed : false,
        [HDSpeedType.SPEED_TYPE_TRANSITION]: this._descentSpeedTransition && this._descentSpeedTransition.isValid() ? this._descentSpeedTransition.speed : false,
        [HDSpeedType.SPEED_TYPE_PROTECTED]: this._overspeedProtection && this._overspeedProtection.isValid() ? this._overspeedProtection.speed : false,
        [HDSpeedType.SPEED_TYPE_SELECTED]: this._descentSpeedSelected && this._descentSpeedSelected.isValid() ? this._descentSpeedSelected.speed : false,
        [HDSpeedType.SPEED_TYPE_ECON]: this._descentSpeedEcon && this._descentSpeedEcon.isValid() ? this._descentSpeedEcon.speed : false
      };
      this._updateLastCommandedSpeed();
      this._updateLastMachMode();
      let commandedSpeedKey = Object.keys(speed).filter(key => !!speed[key]).reduce((accumulator, value) => {
        return speed[value] < speed[accumulator] ? value : accumulator;
      }, HDSpeedType.SPEED_TYPE_ECON);
      commandedSpeedKey = this.shouldCommandSelectedSpeed(commandedSpeedKey, this._descentSpeedSelected);
      this._updateCommandedSpeed(commandedSpeedKey, HDSpeedPhase.SPEED_PHASE_APPROACH);
      this._updateMachMode();
    }
    _updateLastCommandedSpeed() {
      this._lastCommandedSpeedType = this._commandedSpeedType;
      this._lastSpeedPhase = this._speedPhase;
    }
    _updateCommandedSpeed(speedType, speedPhase) {
      /**
       * commandedSpeedType has to be retyped to NUMBER because array filter returns KEY as STRING
       * @type {number}
       */
      this._commandedSpeedType = Number(speedType);
      this._speedPhase = Number(speedPhase);
      this._updateFmcIfNeeded();
    }
    _updateFmcIfNeeded() {
      if (this._lastCommandedSpeedType !== this._commandedSpeedType || this._lastSpeedPhase !== this._speedPhase || this._lastMachMode !== this._machMode || this._lastSpeed !== this._speedCheck) {
        SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'Number', 1);
      }
    }
  }

  let HeavyDivision;
  (function (_HeavyDivision) {
    class Configuration {
      static activeFlightPlanSynchronizationStrategy() {
        return parseInt(HeavyDataStorage.get('FP_SYNCHRONIZATION_STRATEGY', '0'));
      }
      static isFlightPlanSynchronizationActive() {
        return !(Configuration.activeFlightPlanSynchronizationStrategy() == 0);
      }
      static isOneWaySynchronizationActive() {
        return Configuration.activeFlightPlanSynchronizationStrategy() == 1;
      }
      static isNonProcedureSynchronizationActive() {
        return Configuration.activeFlightPlanSynchronizationStrategy() == 2;
      }
      static isNormalFlightPlanSynchronizationActive() {
        return Configuration.activeFlightPlanSynchronizationStrategy() == 3;
      }
      static isFocusableScratchpadEnabled() {
        return !!parseInt(HeavyDataStorage.get('IS_FOCUSABLE_SCRATCHPAD_ENABLED', 0));
      }
      static useImperial() {
        return !!parseInt(HeavyDataStorage.get('USE_IMPERIAL', 1));
      }
      static useMetric() {
        return !Configuration.useImperial();
      }
    }
    _HeavyDivision.Configuration = Configuration;
    class SimBrief {
      static importRouteOnly() {
        return !!parseInt(HeavyDataStorage.get('SIMBRIEF_ROUTE_ONLY', 0));
      }
      static importSid() {
        return !!parseInt(HeavyDataStorage.get('SIMBRIEF_WITH_SID', 0));
      }
      static importStar() {
        return !!parseInt(HeavyDataStorage.get('SIMBRIEF_WITH_STAR', 0));
      }
      static importStrategy() {
        return HeavyDataStorage.get('SIMBRIEF_IMPORT_STRATEGY', 'INGAME');
      }
    }
    _HeavyDivision.SimBrief = SimBrief;
  })(HeavyDivision || (HeavyDivision = {}));

  class RemoveTocParserMiddleware {
    apply(data) {
      const fixes = data.navlog.fix;
      data.navlog.fix = fixes.filter(fix => fix.ident !== 'TOC' && fix.name !== 'TOP OF CLIMB');
      return data;
    }
  }

  class RemoveTodParserMiddleware {
    apply(data) {
      const fixes = data.navlog.fix;
      data.navlog.fix = fixes.filter(fix => fix.ident !== 'TOD' && fix.name !== 'TOP OF DESCENT');
      return data;
    }
  }

  class RemoveOriginParserMiddleware {
    apply(data) {
      const fixes = data.navlog.fix;
      const origin = data.destination.icao_code;
      data.navlog.fix = fixes.filter(fix => fix.ident !== origin);
      return data;
    }
  }

  class RemoveDestinationParserMiddleware {
    apply(data) {
      const fixes = data.navlog.fix;
      const destination = data.destination.icao_code;
      data.navlog.fix = fixes.filter(fix => fix.ident !== destination);
      return data;
    }
  }

  /**
   * TODO:
   *
   * Transition has is_sid_star = 0 and via_airway set to SID
   *
   * Should we remove the trans??
   * Is possible to set TRANS by IDENT in MSFS??
   * Is possible to iterate over trans for airport. (easy)
   *
   * REMOVING TRANS NOW
   */
  class RemoveSidParserMiddleware {
    apply(data) {
      const fixes = data.navlog.fix;
      const sid = fixes[0].via_airway !== 'DCT' ? fixes[0].via_airway : 'DCT';
      if (sid === 'DCT') {
        return data;
      }
      data.navlog.fix = fixes.filter(fix => fix.via_airway !== sid && fix.is_sid_star !== 1);
      return data;
    }
  }

  /**
   * TODO:
   *
   * Transition has is_sid_star = 0 and via_airway set to last enroute airway or DCT
   *
   * There is no possibility to find out if the waypoint is TRANS or normal enroute waypoint
   *
   * Should we remove the trans??
   * Is possible to set TRANS by IDENT in MSFS??
   * Is possible to iterate over trans for the star. (easy)
   *
   * REMOVING TRANS NOW
   */
  class RemoveStarParserMiddleware {
    apply(data) {
      const fixes = data.navlog.fix;
      if (fixes.length === 0) {
        return data;
      }
      const destination = data.destination.icao_code;
      const lastWaypointIndex = fixes[fixes.length - 1] && fixes[fixes.length - 1].ident === destination ? fixes.length - 2 : fixes.length - 1;
      const isLastWaypointInStar = parseInt(String(fixes[lastWaypointIndex].is_sid_star));
      const star = fixes[lastWaypointIndex].via_airway !== 'DCT' ? isLastWaypointInStar !== 0 ? fixes[lastWaypointIndex].via_airway : 'DCT' : 'DCT';
      if (star === 'DCT') {
        return data;
      }
      data.navlog.fix = fixes.filter(fix => fix.via_airway !== star && fix.is_sid_star != 1);
      return data;
    }
  }

  class BreakNatsParserMiddleware {
    constructor() {
      _defineProperty(this, "nats", ['NATA', 'NATB', 'NATC', 'NATD', 'NATE', 'NATF', 'NATG', 'NATH', 'NATJ', 'NATK', 'NATL', 'NATM', 'NATN', 'NATP', 'NATQ', 'NATR', 'NATS', 'NATT', 'NATU', 'NATV', 'NATW', 'NATX', 'NATY', 'NATZ']);
    }
    apply(data) {
      const fixes = data.navlog.fix;
      data.navlog.fix = fixes.map(fix => {
        fix.via_airway = this.nats.includes(fix.via_airway) ? 'DCT' : fix.via_airway;
        return fix;
      });
      return data;
    }
  }

  class HDNavlog {
    constructor(fmc) {
      _defineProperty(this, "origin", undefined);
      _defineProperty(this, "destination", undefined);
      _defineProperty(this, "fixes", undefined);
      _defineProperty(this, "info", undefined);
      _defineProperty(this, "fuel", void 0);
      _defineProperty(this, "weights", void 0);
      _defineProperty(this, "importer", undefined);
      _defineProperty(this, "fmc", void 0);
      _defineProperty(this, "_progress", [['ORIGIN', '', ''], ['', '', '[color=yellow]WAITING[/color]'], ['DESTINATION', '', ''], ['', '', '[color=yellow]WAITING[/color]'], ['PAYLOAD', '', ''], ['', '', '[color=yellow]WAITING[/color]'], ['FUEL BLOCK', '', ''], ['', '', '[color=yellow]WAITING[/color]'], ['WAYPOINT', 'AIRWAY', 'PROGRESS'], ['', '', '[color=yellow]WAITING[/color]'], ['', '', ''], ['', '', '']]);
      _defineProperty(this, "defaultConfiguration", {
        withSid: true,
        withStar: true,
        routeOnly: false
      });
      _defineProperty(this, "preloadedAirwaysData", void 0);
      this.fmc = fmc;
    }
    import() {
      return new Promise((resolve, reject) => {
        if (this.importer !== undefined) {
          this.importer.execute().then(() => {
            this.origin = this.importer.getOrigin();
            this.destination = this.importer.getDestination();
            this.fixes = this.importer.getFixes();
            this.info = this.importer.getInfo();
            this.fuel = this.importer.getFuel();
            this.weights = this.importer.getWeights();
            this._progress[1][0] = this.origin.icao;
            this._progress[3][0] = this.destination.icao;
            this._progress[5][0] = String(this.weights.payload);
            this._progress[7][0] = String(this.fuel.plannedRamp);
            resolve();
          });
        } else {
          reject(new Error('Importer is not set!'));
        }
      });
    }
    setImporter(importer) {
      this.importer = importer;
    }

    /**
     * TODO: Use better name / make handlers with strategies
     * @param {{}} configuration
     * @returns {Promise<void>}
     */
    async setToGameIngame(configuration) {
      if (!configuration) {
        configuration = this.defaultConfiguration;
      }
      this.fmc.cleanUpPage();
      this.updateProgress();
      await Promise.all([this.setInitialCruiseAltitude(this.info.initialAltitude), this.asyncSetCostIndex(this.info.costIndex)]).then(() => {
        console.log('INITIAL DATA SET');
      }).catch(error => {
        console.log(error);
      });
      let origin = undefined;
      for (let i = 0; i <= 5; i++) {
        origin = await this.setOrigin(this.origin.icao);
        if (origin) {
          break;
        }
      }
      if (!origin) {
        return Promise.reject(this.fmc.colorizeContent('FP IMPORT FAILED: ORIGIN NOT FOUND', 'red'));
      }
      let destination = undefined;
      for (let i = 0; i <= 5; i++) {
        destination = await this.setDestination(this.destination.icao);
        if (destination) {
          break;
        }
      }
      if (!destination) {
        return Promise.reject(this.fmc.colorizeContent('FAILED: DESTINATION NOT FOUND', 'red'));
      }
      await this.setOriginRunway(this.origin.plannedRunway);
      await this.setInitialCruiseAltitude(this.info.initialAltitude);
      /**
       * Be aware! Payload has to set before FuelBlock
       */
      if (!configuration.routeOnly) {
        await this.setPayload(this.weights);
        await this.setFuel(this.fuel);
      } else {
        this._progress[5][2] = this.fmc.colorizeContent('SKIPPED', 'orange');
        this._progress[7][2] = this.fmc.colorizeContent('SKIPPED', 'orange');
      }
      if (this.info.sid !== 'DCT' && configuration.withSid === true) {
        await this.setDeparture(this.info.sid);
      }
      this._progress[9][2] = this.fmc.colorizeContent('PREPARING', 'yellow');
      const fixesForPreload = this.getReferenceFixesForAirwaysPreload(this.fixes);
      const airways = {};
      for (const fix of fixesForPreload) {
        var icaos = [];
        let waypoint = undefined;
        this._progress[9][0] = this.fmc.colorizeContent(fix.ident, 'yellow');
        this._progress[10][0] = this.fmc.colorizeContent('PRELOADING', 'yellow');
        this.updateProgress();
        for (let i = 0; i <= 10; i++) {
          waypoint = await this.asyncGetOrSelectWaypointByIdentFast(fix.ident, fix);
          if (waypoint) {
            this._progress[9][0] = this.fmc.colorizeContent(fix.ident, 'green');
            this._progress[10][0] = this.fmc.colorizeContent('PRELOADED', 'green');
            this.updateProgress();
            break;
          }
        }
        if (!waypoint) {
          return Promise.reject(this.fmc.colorizeContent('FAILED: REFERENCE NOT FOUND', 'red'));
        }
        this._progress[9][1] = this.fmc.colorizeContent(fix.airway, 'yellow');
        this._progress[10][1] = this.fmc.colorizeContent('PRELOADING', 'yellow');
        this.updateProgress();
        if (waypoint.infos instanceof WayPointInfo) {
          await waypoint.infos.UpdateAirwayCustomLength(fix.airway, 400);
          for (const airway of waypoint.infos.airways) {
            for (const icao of airway.icaos) {
              icaos.push(String(icao.substring(7, 12)));
            }
            airways[airway.name] = icaos;
          }
        }
        this._progress[9][1] = this.fmc.colorizeContent(fix.airway, 'green');
        this._progress[10][1] = this.fmc.colorizeContent('PRELOADED', 'green');
        this.updateProgress();
      }
      this._progress[10][0] = '';
      this._progress[10][1] = '';
      this.updateProgress();
      this.preloadedAirwaysData = airways;
      if (this.isSimBriefRouteValidIngame(this.fixes)) {
        console.log('SB Route is valid ingame route: USING SB import strategy');
        await this.insertWaypoints(this.fixes);
      } else {
        console.log('SB Route is NOT valid ingame route: CHECKING errors');
        const errors = this.getProblemsOfRoute(this.fixes);
        this.fixRoute(errors, this.fixes);
        if (this.isSimBriefRouteValidIngame(this.fixes)) {
          console.log('SB Route is fixed and the route is valid ingame route now: USING SB import strategy');
          await this.insertWaypoints(this.fixes);
        } else {
          console.log('SB Route is NOT valid after fixes');
        }
      }
    }
    fixRoute(errors, fixes) {
      for (const error of errors) {
        console.log('APPLYING FIX TO: ' + error.fix.ident + '; FIX TYPE: ' + error.apply);
        fixes[error.index].airway = 'DCT';
      }
    }
    getProblemsOfRoute(fixes) {
      const errors = [];
      for (let i = 0; i < fixes.length - 1; i++) {
        if (fixes[i].airway === 'DCT') {
          continue;
        }
        this.logK(this.preloadedAirwaysData);
        if (!this.preloadedAirwaysData.hasOwnProperty(fixes[i].airway)) {
          errors.push({
            fix: fixes[i],
            index: i,
            reason: 'InGame waypoints does not use AIRWAY: ' + fixes[i].airway,
            apply: 'DIRECT'
          });
        } else {
          const isFixOnAirway = this.preloadedAirwaysData[fixes[i].airway].findIndex(icao => {
            return icao == fixes[i].ident || icao.trim() == fixes[i].ident;
          });
          if (isFixOnAirway === -1) {
            errors.push({
              fix: fixes[i],
              index: i,
              reason: 'Waypoint ' + fixes[i] + ' is not on AIRWAY: ' + fixes[i].airway,
              apply: 'DIRECT'
            });
          }
        }
      }
      return errors;
    }
    isSimBriefRouteValidIngame(fixes) {
      for (const fix of fixes) {
        if (fix.airway === 'DCT') {
          continue;
        }
        if (this.preloadedAirwaysData.hasOwnProperty(fix.airway)) {
          const isFixOnAirway = this.preloadedAirwaysData[fix.airway].findIndex(icao => {
            //console.log(icao + ':' + fix.ident, Level.debug);
            return icao == fix.ident || icao.trim() == fix.ident;
          });
          if (isFixOnAirway === -1) {
            return false;
          }
        }
      }
      return true;
    }
    async preloadAirways() {}
    getReferenceFixesForAirwaysPreload(fixes) {
      const airways = [...new Set(fixes.map(fix => fix.airway))];
      const referenceWaypoints = [];
      for (const airway of airways) {
        const found = this.fixes.find(fix => fix.airway === airway && airway !== 'DCT');
        if (found !== undefined) {
          referenceWaypoints.push(found);
        }
      }
      return referenceWaypoints;
    }
    async parseAirways(fixes) {
      for (let i = 0; i <= fixes.length - 1; i++) {
        fixes[i - 1];
        const current = fixes[i];
        const next = fixes[i + 1];
        ({
          ident: current.ident,
          airway: current.airway,
          airwayIn: undefined,
          airwayOut: undefined,
          lat: current.lat,
          long: current.lon
        });
        if (current.airway !== 'DCT') {
          current.airwayIn = current.airway;
        }
        if (next) {
          if (next.airway !== 'DCT') {
            current.airwayOut = next.airway;
          }
        }
      }
    }
    async setToGame(configuration) {
      if (!configuration) {
        configuration = this.defaultConfiguration;
      }
      this.fmc.cleanUpPage();
      this.updateProgress();
      await Promise.all([this.setInitialCruiseAltitude(this.info.initialAltitude), this.asyncSetCostIndex(this.info.costIndex)]).then(() => {
        console.log('INITIAL DATA SET');
      }).catch(error => {
        console.log(error);
      });

      /**
       * TODO: It is not possible to use promiseAll for origin and destination
       * need to figured out in future because await is not good for performance
       */

      let origin = undefined;
      for (let i = 0; i <= 5; i++) {
        origin = await this.setOrigin(this.origin.icao);
        if (origin) {
          break;
        }
      }
      if (!origin) {
        return Promise.reject(this.fmc.colorizeContent('FP IMPORT FAILED: ORIGIN NOT FOUND', 'red'));
      }
      let destination = undefined;
      for (let i = 0; i <= 5; i++) {
        destination = await this.setDestination(this.destination.icao);
        if (destination) {
          break;
        }
      }
      if (!destination) {
        return Promise.reject(this.fmc.colorizeContent('FAILED: DESTINATION NOT FOUND', 'red'));
      }
      await this.setOriginRunway(this.origin.plannedRunway);
      /**
       * Be aware! Payload has to set before FuelBlock
       */
      if (!configuration.routeOnly) {
        await this.setPayload(this.weights);
        await this.setFuel(this.fuel);
      } else {
        this._progress[5][2] = this.fmc.colorizeContent('SKIPPED', 'orange');
        this._progress[7][2] = this.fmc.colorizeContent('SKIPPED', 'orange');
      }
      if (this.info.sid !== 'DCT' && configuration.withSid === true) {
        await this.setDeparture(this.info.sid);
      }
      await this.insertWaypoints(this.fixes);
    }
    async airportDump() {
      let houston = await this.fmc.dataManager.GetAirportByIdent('KIAH');

      /**
       * All departures for airport
       */
      //console.log('AVAILABLE DEPARTURES');
      houston.infos.departures.forEach(departure => {
        //console.log('--DEPARTURE: ' + departure.name);
        /**
         * All compatible runways with departure
         */
        //console.log('----ALL RUNWAY TRANSITIONS');
        departure.runwayTransitions.forEach(runwayTransition => {
          //console.log('------AVAILABLE RUNWAY TRANS: ' + runwayTransition.name);
        });

        /**
         * All EnRoute TRANS (Does not include default one: RITAA6 -> RITAA is not in the list)
         */
        departure.enRouteTransitions.forEach(trans => {
          //console.log('------AVAILABLE TRANS: ' + trans.name);
        });
      });
      houston.infos.arrivals.forEach(arrival => {
        //console.log('--ARRIVAL: ' + arrival.name);

        /**
         * All compatible runways with arrival
         */
        //console.log('----ALL RUNWAY TRANSITIONS');
        arrival.runwayTransitions.forEach(runwayTransition => {
          //console.log('------AVAILABLE RUNWAY TRANS: ' + runwayTransition.name);
        });

        /**
         * All EnRoute TRANS (Does not include default one: same as departure)
         */
        arrival.enRouteTransitions.forEach(trans => {
          //console.log('------AVAILABLE TRANS: ' + trans.name);
        });
      });
      houston.infos.approaches.forEach(approach => {
        console.log('--APPROACH: ' + approach.name);
        this.logK(approach);

        /**
         * All EnRoute TRANS (Does not include default one: same as departure)
         */
        approach.transitions.forEach(trans => {
          this.logK(trans);
          console.log('------AVAILABLE TRANS: ' + trans.name);
        });
      });

      //departure.runwayTransitions[j].name.indexOf(selectedRunway.designation) !== -1

      await this.setDeparture(this.info.sid);
    }
    async setOriginRunway(runwayName) {
      return new Promise((resolve, reject) => {
        const origin = this.fmc.flightPlanManager.getOrigin();
        if (origin && origin.infos instanceof AirportInfo) {
          let runwayIndex = origin.infos.oneWayRunways.findIndex(r => {
            return Avionics.Utils.formatRunway(r.designation) === Avionics.Utils.formatRunway(runwayName);
          });
          if (runwayIndex >= 0) {
            this.fmc.ensureCurrentFlightPlanIsTemporary(() => {
              this.fmc.flightPlanManager.setOriginRunwayIndex(runwayIndex, () => {
                return resolve(true);
              });
            });
          } else {
            this.fmc.showErrorMessage('NOT IN DATABASE');
            return resolve(false);
          }
        } else {
          this.fmc.showErrorMessage('NO ORIGIN AIRPORT');
          return resolve(false);
        }
      });
    }
    async insertWaypoints(fixes) {
      return new Promise(async (resolve, reject) => {
        await this.parseAirways(fixes);
        this.updateProgress();
        const total = fixes.length;
        let iterator = 1;
        for (const fix of fixes) {
          this.updateProgress();
          this._progress[9][0] = fix.ident;
          this._progress[9][1] = fix.airway;
          this._progress[9][2] = this.fmc.colorizeContent('(' + iterator + '/' + total + ')', 'blue');
          const idx = this.fmc.flightPlanManager.getWaypointsCount() - 1;
          console.log(fix.ident + ' ADDING TO FP');
          this.fmc.flightPlanManager.pauseSync();
          await this.insertWaypoint(fix, idx);
          this.fmc.flightPlanManager.resumeSync();
          console.log(fix.ident + ' ADDED TO FP');
          iterator++;
        }
        this._progress[9][2] = this.fmc.colorizeContent('DONE', 'green');
        this.updateProgress();
        resolve();
      });
    }
    async setPayload(weights) {
      this._progress[5][2] = this.fmc.colorizeContent('IMPORTING', 'blue');
      this.updateProgress();
      const kgToPoundsCoefficient = 2.20462262;
      const payload = this.info.units === 'kgs' ? weights.payload * kgToPoundsCoefficient : weights.payload;
      const emptyWeight = 315000;
      /**
       * Fuel needed to be able to keep APU/Engines turned on
       * @type {number}
       */
      const fuel = 20;
      SimVar.SetSimVarValue('FUEL TANK CENTER QUANTITY', 'Pounds', 0);
      SimVar.SetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'Pounds', fuel);
      SimVar.SetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'Pounds', fuel);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:1', 'Pounds', 200);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:2', 'Pounds', 200);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:3', 'Pounds', 0);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:4', 'Pounds', 0);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:5', 'Pounds', 0);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:6', 'Pounds', 0);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:7', 'Pounds', 0);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:8', 'Pounds', 0);
      SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:9', 'Pounds', 0);
      console.log('SETTING ZFW to: ' + (emptyWeight + payload));
      console.log('PAYLOAD : ' + payload);
      console.log('ZFW: ' + emptyWeight);
      this.fmc.trySetBlockFuel(0, true);
      this.fmc.setZeroFuelWeight((emptyWeight + payload) / 1000, EmptyCallback.Void, true);
      this._progress[5][2] = this.fmc.colorizeContent('DONE', 'green');
      this.updateProgress();
    }
    async setFuel(fuel) {
      this._progress[7][2] = this.fmc.colorizeContent('IMPORTING', 'blue');
      this.updateProgress();
      const poundsPerGallonCoefficient = 6.699999809265137;
      const centerTankCapacity = 149034;
      const sideTankCapacity = 37319;
      const sideTanksTotalCapacity = sideTankCapacity * 2;
      const block = this.info.units === 'kgs' ? fuel.plannedRamp * 2.20462262 : fuel.plannedRamp;
      const reserve = this.info.units === 'kgs' ? fuel.reserve * 2.20462262 : fuel.reserve;
      const needCenterTank = block > sideTanksTotalCapacity;
      let leftToSet = 0;
      let rightToSet = 0;
      let centerToSet = 0;
      console.log('BLOCK TO SET: ' + block);
      console.log('RESERVES TO SET: ' + reserve);
      console.log('NEED CENTER TANK: ' + needCenterTank);
      if (!needCenterTank) {
        let reminder = block % 2;
        leftToSet = (block - reminder) / 2 + reminder;
        rightToSet = (block - reminder) / 2;
      } else {
        leftToSet = sideTankCapacity;
        rightToSet = sideTankCapacity;
        let remainingFuel = block - sideTanksTotalCapacity;
        centerToSet = Math.min(remainingFuel, centerTankCapacity);
      }
      console.log('CENTER TO SET: ' + centerToSet);
      console.log('LEFT TO SET: ' + leftToSet);
      console.log('RIGHT TO SET: ' + rightToSet);
      SimVar.SetSimVarValue('FUEL TANK CENTER QUANTITY', 'Gallons', centerToSet / poundsPerGallonCoefficient).catch(() => {
        console.log('SETTING OF FUEL TANK CENTER QUANTITY FAILED');
      });
      SimVar.SetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'Gallons', leftToSet / poundsPerGallonCoefficient).catch(() => {
        console.log('SETTING OF FUEL TANK LEFT QUANTITY FAILED');
      });
      SimVar.SetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'Gallons', rightToSet / poundsPerGallonCoefficient).catch(() => {
        console.log('SETTING OF FUEL TANK RIGHT QUANTITY FAILED');
      });
      let total = centerToSet + leftToSet + rightToSet;
      this.fmc.trySetBlockFuel(total, true);
      this.fmc.setFuelReserves(reserve / 1000, true);
      this._progress[7][2] = this.fmc.colorizeContent('DONE', 'green');
      this.updateProgress();
    }
    async insertWaypoint(fix, index) {
      return new Promise((resolve, reject) => {
        this.fmc.ensureCurrentFlightPlanIsTemporary(async result => {
          if (!result) {
            reject();
          }
          if (fix.isCoordinatesWaypoint) {
            const waypoint = new WayPoint(this.fmc);
            waypoint.type = 'W';
            waypoint.ident = fix.ident;
            waypoint.infos = new IntersectionInfo(this.fmc);
            waypoint.infos.ident = fix.ident;
            waypoint.infos.coordinates = new LatLongAlt(Number(fix.lat), Number(fix.lon), 0);
            this.fmc.flightPlanManager.addUserWaypoint(waypoint, index, () => {
              resolve(true);
            });
          } else {
            let waypoint = undefined;
            for (let i = 0; i <= 10; i++) {
              waypoint = await this.asyncGetOrSelectWaypointByIdentFast(fix.ident, fix);
              if (waypoint) {
                break;
              }
            }
            if (!waypoint) {
              this.fmc.showErrorMessage('NOT IN DATABASE');
              return resolve(false);
            }
            const asyncAddWaypoint = (ident, index) => new Promise(resolve => this.fmc.flightPlanManager.addWaypoint(ident, index, resolve));
            await asyncAddWaypoint(waypoint.icao, index).then(() => {
              const fpWaypoint = this.fmc.flightPlanManager.getWaypoint(index);
              fpWaypoint.infos.airwayIn = fix.airwayIn;
              fpWaypoint.infos.airwayOut = fix.airwayOut;
              resolve(true);
            });
          }
        });
      });
    }
    async GetWaypointsByIdent(ident) {
      let waypoints = [];
      let intersections = await this.fmc.dataManager.GetWaypointsByIdentAndType(ident, 'W');
      waypoints.push(...intersections);
      let vors = await this.fmc.dataManager.GetWaypointsByIdentAndType(ident, 'V');
      waypoints.push(...vors);
      let ndbs = await this.fmc.dataManager.GetWaypointsByIdentAndType(ident, 'N');
      waypoints.push(...ndbs);
      let airports = await this.fmc.dataManager.GetWaypointsByIdentAndType(ident, 'A');
      waypoints.push(...airports);
      let i = 0;
      while (i < waypoints.length) {
        let wp = waypoints[i];
        let j = i + 1;
        while (j < waypoints.length) {
          if (waypoints[j] && wp) {
            let other = waypoints[j];
            if (wp.icao === other.icao) {
              waypoints.splice(j, 1);
            } else {
              j++;
            }
          } else {
            j++;
          }
        }
        i++;
      }
      return waypoints;
    }
    async asyncGetOrSelectWaypointByIdentFast(ident, fix) {
      const waypoints = await this.GetWaypointsByIdent(ident);
      if (!waypoints || waypoints.length === 0) {
        return undefined;
      }
      const precisions = [4, 3, 2, 1];
      for (const precision of precisions) {
        for (let i = 0; i <= waypoints.length - 1; i++) {
          if (parseFloat(waypoints[i].infos.coordinates.lat).toFixed(precision) === parseFloat(fix.lat).toFixed(precision) && parseFloat(waypoints[i].infos.coordinates.long).toFixed(precision) === parseFloat(fix.lon).toFixed(precision)) {
            return waypoints[i];
          }
        }
      }
      return undefined;
    }
    async setDeparture(sid) {
      const index = await this.findSidIndex(sid);
      if (index !== -1) {
        const [transIndex] = await Promise.all([this.findTransIndex(index), this.asyncSetDepartureIndex(index)]);
        await this.asyncSetDepartureEnrouteTransitionIndex(transIndex);
      }
    }
    async setDepartureProcIndex(index) {
      await this.fmc.ensureCurrentFlightPlanIsTemporary(async () => {
        await this.fmc.flightPlanManager.setDepartureProcIndex(index);
        const transIndex = await this.findTransIndex(index);
        await this.fmc.setDepartureEnrouteTransitionIndex(transIndex, () => {
          console.log('TRANS SET: ' + transIndex);
        });
      });
    }
    logK(object) {
      Object.keys(object).forEach(key => {
        console.log(key);
      });
    }
    updateProgress() {
      this.fmc._renderer.renderTitle('FLIGHT PLAN');
      this.fmc._renderer.render(this._progress);
    }

    /**
     * Promise like setInitialCruiseAltitude
     * @param {number} cruiseAltitude
     * @returns {Promise<boolean>}
     */
    setInitialCruiseAltitude(cruiseAltitude) {
      const cruiseFlightLevel = Math.round(cruiseAltitude / 100);
      console.log('Setting CruiseAltitude to: ' + cruiseAltitude);
      return SimVar.SetSimVarValue('L:AIRLINER_CRUISE_ALTITUDE', 'number', cruiseAltitude).then(() => {
        this.fmc._cruiseFlightLevel = cruiseFlightLevel;
        console.log('cruiseFlightLevel set to: ' + cruiseFlightLevel);
        console.log('CruiseAltitude set to: ' + cruiseAltitude);
        return true;
      }).catch(error => {
        console.log('Unable to set cruise altitude to LVAR');
        return false;
      });
    }

    /**
     * Promise like setOrigin
     * @param {string} icao
     * @returns {Promise<boolean>}
     */
    async setOrigin(icao) {
      this._progress[1][2] = this.fmc.colorizeContent('IMPORTING', 'blue');
      this.updateProgress();
      const airport = await this.fmc.dataManager.GetAirportByIdent(icao);
      if (!airport) {
        console.log('ORIGIN NOT IN DATABASE: ' + icao);
        this.fmc.showErrorMessage('NOT IN DATABASE');
        this._progress[1][2] = this.fmc.colorizeContent('FAILED', 'red');
        this.updateProgress();
        return false;
      }
      return await this.asyncSetOrigin(airport);
    }

    /**
     * Promise like setDestination
     * @param {string} icao
     * @returns {Promise<boolean>}
     */
    async setDestination(icao) {
      this._progress[3][2] = this.fmc.colorizeContent('IMPORTING', 'blue');
      this.updateProgress();
      const airport = await this.fmc.dataManager.GetAirportByIdent(icao);
      if (!airport) {
        console.log('DESTINATION NOT IN DATABASE: ' + icao);
        this.fmc.showErrorMessage('NOT IN DATABASE');
        this._progress[3][2] = this.fmc.colorizeContent('FAILED', 'red');
        this.updateProgress();
        return false;
      }
      return await this.asyncSetDestination(airport);
    }

    /**
     * Promise like findSidIndex function
     * @param {string} sid
     * @returns {Promise<number>}
     */
    findSidIndex(sid) {
      return new Promise(resolve => {
        const origin = this.fmc.flightPlanManager.getOrigin();
        if (origin.infos instanceof AirportInfo) {
          const index = origin.infos.departures.findIndex(departure => {
            return departure.name === sid;
          });
          resolve(index);
        } else {
          resolve(-1);
        }
      });
    }

    /**
     * Promise like findStarIndex function
     * @param {string} star
     * @returns {Promise<number>}
     */
    findStarIndex(star) {
      return new Promise(resolve => {
        const destination = this.fmc.flightPlanManager.getDestination();
        if (destination.infos instanceof AirportInfo) {
          const index = destination.infos.arrivals.findIndex(arrival => {
            return arrival.name === star;
          });
          resolve(index);
        } else {
          resolve(-1);
        }
      });
    }

    /**
     * Promise like findTransIndex function
     * @param {number} departureIndex
     * @returns {Promise<number>}
     */
    findTransIndex(departureIndex) {
      return new Promise(resolve => {
        const origin = this.fmc.flightPlanManager.getOrigin();
        if (origin.infos instanceof AirportInfo) {
          const index = origin.infos.departures[departureIndex].enRouteTransitions.findIndex(trans => {
            return trans.name === this.info.enRouteTrans;
          });
          resolve(index);
        } else {
          resolve(-1);
        }
      });
    }

    /**
     * Async wrapper for setDepartureIndex function
     * @param index
     * @returns {Promise<boolean>}
     * @private
     */

    asyncSetDepartureIndex(index) {
      return new Promise(resolve => {
        this.fmc.setDepartureIndex(index, resolve);
      });
    }

    /**
     * Async wrapper for setDepartureEnrouteTransitionIndex function
     * @param index
     * @returns {Promise<boolean>}
     * @private
     */
    asyncSetDepartureEnrouteTransitionIndex(index) {
      return new Promise(resolve => {
        this.fmc.setDepartureEnrouteTransitionIndex(index, resolve);
      });
    }

    /**
     * Async wraper for setCostIndex
     * @param {number} costIndex
     * @private
     */
    asyncSetCostIndex(costIndex) {
      return new Promise(resolve => {
        if (this.fmc.tryUpdateCostIndex(costIndex, 10000)) {
          console.log('CostIndex has been set to: ' + costIndex);
          resolve(true);
        } else {
          console.log('CostIndex could not be updated (invalid value): ' + costIndex + '; CI RANGE 0 - 9999');
          resolve(false);
        }
      });
    }
    asyncSetOrigin(airport) {
      return new Promise(resolve => {
        this.fmc.flightPlanManager.setOrigin(airport.icao, () => {
          this.fmc.tmpOrigin = airport.ident;
          console.log('ORIGIN set to: ' + airport.icao);
          this._progress[1][2] = this.fmc.colorizeContent('DONE', 'green');
          this.updateProgress();
          resolve(true);
        });
      });
    }
    asyncSetDestination(airport) {
      return new Promise(resolve => {
        this.fmc.flightPlanManager.setDestination(airport.icao, () => {
          this.fmc.tmpDestination = airport.ident;
          console.log('DESTINATION set to: ' + airport.icao);
          this._progress[3][2] = this.fmc.colorizeContent('DONE', 'green');
          this.updateProgress();
          resolve(true);
        });
      });
    }
  }

  class B777_FMC_SelectWptPage {
    static ShowPage(fmc, waypoints, callback) {
      let page = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      fmc.cleanUpPage();
      let rows = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
      for (let i = 0; i < 5; i++) {
        let w = waypoints[i + 5 * page];
        if (w) {
          let t = '';
          if (w.icao[0] === 'V') {
            t = ' VOR';
          } else if (w.icao[0] === 'N') {
            t = ' NDB';
          } else if (w.icao[0] === 'A') {
            t = ' AIRPORT';
          }
          rows[2 * i] = [w.ident + t];
          rows[2 * i + 1] = [w.infos.coordinates.toDegreeString()];
          fmc._renderer.lsk(i + 1).event = () => {
            callback(w);
          };
          fmc._renderer.rsk(i + 1).event = () => {
            callback(w);
          };
        }
      }
      fmc._renderer.renderTitle('SELECT DESIRED WPT');
      fmc._renderer.renderPages(page + 1, Math.ceil(waypoints.length / 5));
      fmc._renderer.render([...rows, ['']]);
      fmc.onPrevPage = () => {
        if (page > 0) {
          B777_FMC_SelectWptPage.ShowPage(fmc, waypoints, callback, page - 1);
        }
      };
      fmc.onNextPage = () => {
        if (page < Math.floor(waypoints.length / 5)) {
          B777_FMC_SelectWptPage.ShowPage(fmc, waypoints, callback, page + 1);
        }
      };
    }
  }

  class B777_FMC_RouteRequestPage {
    constructor(fmc) {
      _defineProperty(this, "fmc", void 0);
      _defineProperty(this, "eventProtector", void 0);
      _defineProperty(this, "progress", void 0);
      _defineProperty(this, "flightPlan", void 0);
      _defineProperty(this, "waypoints", void 0);
      this.fmc = fmc;
      this.eventProtector = this.fmc.querySelector('#event-protector');
      this.progress = [];
    }
    showPage() {
      this.fmc.cleanUpPage();
      this.fmc._renderer.renderTitle('FLIGHT PLANS');
      this.fmc._renderer.render([[''], ['LOAD FP FROM SB'], [''], ['LOAD FP FROM PFPX'], [''], [''], [''], [''], [''], [''], [''], ['<BACK']]);
      this.setupInputHandlers();
    }
    parseAirways(navlog) {
      let waypoints = [];
      for (let i = 0; i < navlog.length; i++) {
        let ident = SimBriefOceanicWaypointConverter.convert(navlog[i].ident);
        let airwayIn;
        let airwayOut;

        /**
         * Direct waypoints has to have airway in always set to undefined
         *
         * ELSE
         *
         * AirwayIn has to be set to via_airway
         */
        if (navlog[i].via_airway === 'DCT') {
          airwayIn = undefined;
        } else {
          airwayIn = navlog[i].via_airway;
        }

        /**
         * Do we have next waypoint?
         */
        if (navlog[i + 1]) {
          /**
           * If next waypoint has airway DCT then airway out of current waypoint has to be undefined
           */
          if (navlog[i + 1].via_airway === 'DCT') {
            airwayOut = undefined;
          } else {
            /**
             * if next waypoint is on different airway then current waypoint airway out
             * has to be same as next waypoint airway (airways cross)
             */
            if (navlog[i + 1].via_airway !== navlog[i].via_airway) {
              airwayOut = navlog[i + 1].via_airway;
            } else {
              /**
               * If next waypoint is direct then airwayOut of current waypoint has to be undefined
               * (both waypoints are DCT)
               *
               * ELSE
               *
               * next waypoint is on airway so current waypoint exits to the airway
               * (current waypoint is first waypoint on the airway)
               */
              if (navlog[i + 1].via_airway === 'DCT') {
                airwayOut = undefined;
              } else {
                airwayOut = navlog[i + 1].via_airway;
              }
            }
          }
        }
        let waypointToPush = {
          ident: ident,
          airway: navlog[i].via_airway,
          airwayIn: airwayIn,
          airwayOut: airwayOut,
          altitude: navlog[i].altitude_feet,
          lat: navlog[i].pos_lat,
          long: navlog[i].pos_long
        };
        waypoints.push(waypointToPush);
      }
      return waypoints;
    }
    setupInputHandlers() {
      this.fmc._renderer.lsk(6).event = () => {
        //this.eventProtector.style.display = 'none';
        B777_FMC_RoutePage.ShowPage1(this.fmc);
      };
      this.fmc._renderer.lsk(1).event = () => {
        this.fmc.messageManager.showMessage('STANDBY ONE', 'FMC PROCESSING <br> LAST ENTRY <br>PLEASE WAIT');

        /**
         * Callback hell
         */
        if (!Simplane.getIsGrounded()) {
          return;
        }
        const parser = new SimBriefNavlogParser(new SimBrief());
        parser.use(new RemoveTocParserMiddleware());
        parser.use(new RemoveTodParserMiddleware());
        parser.use(new RemoveOriginParserMiddleware());
        parser.use(new RemoveDestinationParserMiddleware());
        parser.use(new RemoveSidParserMiddleware());
        parser.use(new RemoveStarParserMiddleware());
        parser.use(new BreakNatsParserMiddleware());
        const importer = new SimBriefImporter(parser);
        const navlog = new HDNavlog(this.fmc);
        navlog.setImporter(importer);
        navlog.import().then(() => {
          const configuration = {
            withSid: HeavyDivision.SimBrief.importSid(),
            withStar: HeavyDivision.SimBrief.importStar(),
            routeOnly: HeavyDivision.SimBrief.importRouteOnly()
          };
          if (HeavyDivision.SimBrief.importStrategy() === 'INGAME') {
            navlog.setToGameIngame(configuration).then(() => {
              this.fmc._renderer.renderTitle('FP IMPORTED SUCCESSFULLY');
              setTimeout(() => {
                this.fmc.messageManager.removeLastMessage();
                B777_FMC_RoutePage.ShowPage1(this.fmc);
              }, 2000);
            }).catch(reason => {
              this.fmc._renderer.renderTitle(reason);
              setTimeout(() => {
                this.fmc.messageManager.removeLastMessage();
                B777_FMC_RoutePage.ShowPage1(this.fmc);
              }, 2000);
            });
          } else {
            navlog.setToGame(configuration).then(() => {
              this.fmc._renderer.renderTitle('FP IMPORTED SUCCESSFULLY');
              setTimeout(() => {
                this.fmc.messageManager.removeLastMessage();
                B777_FMC_RoutePage.ShowPage1(this.fmc);
              }, 2000);
            }).catch(reason => {
              this.fmc._renderer.renderTitle(reason);
              setTimeout(() => {
                this.fmc.messageManager.removeLastMessage();
                B777_FMC_RoutePage.ShowPage1(this.fmc);
              }, 2000);
            });
          }
        }).catch(error => {
          console.log(error);
        });
      };

      /**
       * TODO: Refactor this... It is same as SimBrief just parsing log is different
       */
      this.fmc._renderer.lsk(2).event = () => {
        /**
         * Protect all events
         */
        //this.eventProtector.style.display = 'block';

        this.fmc.messageManager.showMessage('STANDBY ONE', 'FMC PROCESSING <br> LAST ENTRY <br>PLEASE WAIT');

        /**
         * Callback hell
         */
        if (!Simplane.getIsGrounded()) {
          return;
        }
        let updateFlightPlan = () => {
          //updateFlightNumber();
          //updateCostIndex();
          updateCruiseAltitude();
          this.fmc.flightPlanManager.pauseSync();
          updateRoute();
        };
        let updateRoute = () => {
          updateOrigin();
        };
        let updateOrigin = () => {
          if (Simplane.getIsGrounded()) {
            if (this.fmc.currentFlightPhase <= FlightPhase.FLIGHT_PHASE_TAKEOFF) {
              this.fmc.tmpDestination = undefined;
              this.fmc.flightPlanManager.createNewFlightPlan(() => {
                this.fmc.updateRouteOrigin(this.flightPlan.origin['icao_code'], result => {
                  if (result) {
                    this.fmc.fpHasChanged = true;
                    SimVar.SetSimVarValue('L:WT_CJ4_INHIBIT_SEQUENCE', 'number', 0);
                    this.fmc.updateFuelVars();
                    updateDestination();
                  }
                });
              });
            } else {
              this.fmc.clearUserInput();
              /**
               * TODO: Uncomment after reimplementation
               */
              /*
              this.fmc.prepareForTurnAround(() => {
              	this.fmc.tmpDestination = undefined;
              	this.fmc.flightPlanManager.createNewFlightPlan(() => {
              		this.fmc.updateRouteOrigin(this.flightPlan.origin['icao_code'], (result) => {
              			if (result) {
              				this.fmc.fpHasChanged = true;
              				SimVar.SetSimVarValue('L:WT_CJ4_INHIBIT_SEQUENCE', 'number', 0);
              				this.fmc.updateFuelVars();
              				updateDestination();
              			}
              		});
              	});
              });
              */
            }
          } else {
            this.fmc.showErrorMessage('NOT ON GROUND');
            return;
          }
        };
        let updateDestination = () => {
          this.fmc.updateRouteDestination(this.flightPlan.destination['icao_code'], () => {
            //parseNavlog();
            updateWaypoints();
          });
        };
        let updateCruiseAltitude = () => {
          this.fmc.setCruiseFlightLevelAndTemperature(this.flightPlan.general['initial_altitude']);
        };
        let removeOriginAndDestination = navlog => {
          let out = [];
          navlog.forEach(fix => {
            if (fix.ident !== this.flightPlan.origin.icao_code && fix.ident !== this.flightPlan.destination.icao_code) {
              out.push(fix);
            }
          });
          return out;
        };
        let removeSidAndStar = navlog => {
          let out = [];
          let sid = navlog[0].via_airway !== 'DCT' ? navlog[0].via_airway : '';
          let star = this.flightPlan.navlog.fix[this.flightPlan.navlog.fix.length - 1].via_airway !== 'DCT' ? this.flightPlan.navlog.fix[this.flightPlan.navlog.fix.length - 1].via_airway : '';
          navlog.forEach(fix => {
            if (fix.via_airway !== sid && fix.via_airway !== star || fix.via_airway === 'DCT') {
              out.push(fix);
            }
          });
          return out;
        };
        let removeTocAndTod = navlog => {
          let out = [];
          navlog.forEach(fix => {
            if (fix.ident !== 'TOD' && fix.ident !== 'TOC') {
              out.push(fix);
            }
          });
          return out;
        };
        let breakAPartNAT = navlog => {
          const nats = ['NATA', 'NATB', 'NATC', 'NATD', 'NATE', 'NATF', 'NATG', 'NATH', 'NATJ', 'NATK', 'NATL', 'NATM', 'NATN', 'NATP', 'NATQ', 'NATR', 'NATS', 'NATT', 'NATU', 'NATV', 'NATW', 'NATX', 'NATY', 'NATZ'];
          let out = [];
          navlog.forEach(fix => {
            let index = nats.findIndex(nat => {
              return nat === fix.via_airway;
            });
            if (index !== -1) {
              fix.via_airway = 'DCT';
            }
            out.push(fix);
          });
          return out;
        };
        let parseNavlog = () => {
          let navlog = this.flightPlan.navlog.fix;
          let waypoints = [];
          let finalWaypoints = [];
          navlog = removeOriginAndDestination(navlog);
          navlog = removeSidAndStar(navlog);
          navlog = removeTocAndTod(navlog);
          navlog = breakAPartNAT(navlog);
          navlog.forEach(fix => {
            let ident = SimBriefOceanicWaypointConverter.convert(fix.ident);
            waypoints.push({
              ident: ident,
              airway: fix.via_airway,
              altitude: fix.altitude_feet,
              lat: fix.pos_lat,
              long: fix.pos_long
            });
          });

          /**
           * SET first waypoint to DCT
           */

          waypoints[0].airway = 'DCT';

          /**
           * GROUP BY Airway
           */

          let lastAirway = '';
          waypoints.forEach(waypoint => {
            if (lastAirway === waypoint.airway && waypoint.airway !== 'DCT') {
              finalWaypoints.pop();
            }
            finalWaypoints.push(waypoint);
            lastAirway = waypoint.airway;
          });
          this.waypoints = finalWaypoints;
          this.waypoints.forEach(waypoint => {
            this.progress.push([waypoint.airway, waypoint.ident, '', false]);
          });
        };
        let updateWaypoints = async () => {
          let iterator = 0;
          let protection = 0;
          parseNavlog();
          let insertWaypoint = async () => {
            protection++;
            if (protection > 400) {
              iterator = 20000;
              this.fmc.flightPlanManager.resumeSync();
              //this.eventProtector.style.display = 'none';
              this.fmc.messageManager.removeLastMessage();
              B777_FMC_RoutePage.ShowPage1(this.fmc);
              return;
            }
            if (!this.waypoints[iterator]) {
              iterator = 20000;
              this.fmc.flightPlanManager.resumeSync();
              //this.eventProtector.style.display = 'none';
              this.fmc.messageManager.removeLastMessage();
              B777_FMC_RoutePage.ShowPage1(this.fmc);
              return;
            }
            if (iterator >= this.waypoints.length) {
              this.fmc.flightPlanManager.resumeSync();
              //this.eventProtector.style.display = 'none';
              this.fmc.messageManager.removeLastMessage();
              B777_FMC_RoutePage.ShowPage1(this.fmc);
            }
            this.updateProgress(iterator);
            if (this.waypoints[iterator].airway !== 'DCT') {
              let lastWaypoint = this.fmc.flightPlanManager.getWaypoints()[this.fmc.flightPlanManager.getEnRouteWaypointsLastIndex()];
              if (lastWaypoint.infos instanceof WayPointInfo) {
                lastWaypoint.infos.UpdateAirway(this.waypoints[iterator].airway).then(() => {
                  let airway = lastWaypoint.infos.airways.find(a => {
                    return a.name === this.waypoints[iterator].airway;
                  });
                  if (airway) {
                    this.fmc.onLeftInput = [];
                    this.fmc.onRightInput = [];
                    this.fmc.updateSideButtonActiveStatus();
                    this.insertWaypointsAlongAirway(this.waypoints[iterator].ident, this.fmc.flightPlanManager.getWaypointsCount() - 1, this.waypoints[iterator].airway, () => {
                      iterator++;
                      insertWaypoint();
                    });
                  } else {
                    iterator++;
                    insertWaypoint();
                  }
                });
              }
            } else {
              this.fmc.onLeftInput = [];
              this.fmc.onRightInput = [];
              this.fmc.updateSideButtonActiveStatus();
              this.progress[iterator][2] = this.waypoints[iterator].ident;
              this.insertWaypoint(this.waypoints[iterator].ident, this.fmc.flightPlanManager.getWaypointsCount() - 1, iterator, () => {
                iterator++;
                insertWaypoint();
              });
            }
          };
          await insertWaypoint();
        };
        let convertPlnToFlightPlan = callback => {
          Utils.loadFile('coui://html_UI/plans/plan.pln', content => {
            let parser = new DOMParser();
            let object = parser.parseFromString(content, 'text/xml');
            let crzAltitude = object.getElementsByTagName('CruisingAlt')[0].textContent;
            let origin = object.getElementsByTagName('DepartureID')[0].textContent;
            let destination = object.getElementsByTagName('DestinationID')[0].textContent;
            let output = undefined;
            output.general = {
              initial_altitude: crzAltitude
            };
            output.origin = {
              icao_code: origin
            };
            output.destination = {
              icao_code: destination
            };
            let finalWaypoints = [];

            /**
             * TODO: Suppressed type error by ANY
             * @type {any}
             */
            let waypoints = object.getElementsByTagName('ATCWaypoint');
            for (let item of waypoints) {
              let waypoint = undefined;
              waypoint.ident = item.id;
              for (let airway of item.getElementsByTagName('ATCAirway')) {
                waypoint.via_airway = airway.textContent;
                break;
              }
              if (!waypoint.via_airway) {
                waypoint.via_airway = 'DCT';
              }
              waypoint.lat = 0;
              waypoint.long = 0;
              finalWaypoints.push(waypoint);
            }
            output.navlog = {
              fix: finalWaypoints
            };
            this.flightPlan = output;
            callback();
          });
        };
        convertPlnToFlightPlan(() => {
          updateFlightPlan();
        });
      };
    }
    updateProgress(iterator) {
      let actualPage = Math.floor(iterator / 5);
      let rows = [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']];
      rows[0][0] = 'FLIGHT PLANS';
      for (let i = 1; i <= 5; i++) {
        if (this.progress[i + 5 * actualPage - 1]) {
          if (iterator > i + 5 * actualPage - 1) {
            rows[i * 2][0] = '[color=green]' + this.progress[i + 5 * actualPage - 1][0] + '[/color]';
            rows[i * 2][1] = '[color=green]' + this.progress[i + 5 * actualPage - 1][1] + '[/color]';
          } else if (iterator === i + 5 * actualPage - 1) {
            rows[i * 2][0] = '[color=yellow]' + this.progress[i + 5 * actualPage - 1][0] + '[/color]';
            rows[i * 2][1] = '[color=yellow]' + this.progress[i + 5 * actualPage - 1][1] + '[/color]';
          } else {
            rows[i * 2][0] = this.progress[i + 5 * actualPage - 1][0];
            rows[i * 2][1] = this.progress[i + 5 * actualPage - 1][1];
          }
          if (this.progress[i - 1][3] === false && iterator === i + 5 * actualPage - 1) {
            rows[i * 2 + 1][0] = '[color=yellow]' + this.progress[i + 5 * actualPage - 1][2] + '[/color]';
            rows[i * 2 + 1][1] = '[color=yellow]adding[/color]';
          } else if (this.progress[i + 5 * actualPage - 1][3] === false && iterator < i + 5 * actualPage - 1) {
            rows[i * 2 + 1][0] = this.progress[i + 5 * actualPage - 1][2];
            rows[i * 2 + 1][1] = 'waiting';
          } else if (this.progress[i + 5 * actualPage - 1][3] === false && iterator > i + 5 * actualPage - 1) {
            rows[i * 2 + 1][0] = '[color=green]' + this.progress[i + 5 * actualPage - 1][2] + '[/color]';
            rows[i * 2 + 1][1] = '[color=green]done[/color]';
          }
        }
      }
      this.fmc.cleanUpPage();
      /**
       * Title need to be removed (before refactoring hotfix)
       */
      rows.splice(1, 1);
      this.fmc._renderer.render(rows);
    }
    async insertWaypointsAlongAirway(lastWaypointIdent, index, airwayName) {
      let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EmptyCallback.Boolean;
      const referenceWaypoint = this.fmc.flightPlanManager.getWaypoint(index - 1);
      if (referenceWaypoint) {
        const infos = referenceWaypoint.infos;
        if (infos instanceof WayPointInfo) {
          const airway = infos.airways.find(a => {
            return a.name === airwayName;
          });
          if (airway) {
            const firstIndex = airway.icaos.indexOf(referenceWaypoint.icao);
            const lastWaypointIcao = airway.icaos.find(icao => icao.substring(7, 12) === lastWaypointIdent.padEnd(5, ' '));
            const lastIndex = airway.icaos.indexOf(lastWaypointIcao);
            if (firstIndex >= 0) {
              if (lastIndex >= 0) {
                let inc = 1;
                if (lastIndex < firstIndex) {
                  inc = -1;
                }
                const count = Math.abs(lastIndex - firstIndex);
                for (let i = 1; i < count + 1; i++) {
                  // 9 -> 6
                  const syncInsertWaypointByIcao = async (icao, idx) => {
                    return new Promise(resolve => {
                      let progressIndex = this.progress.findIndex(w => {
                        return w[1] === lastWaypointIdent;
                      });
                      if (progressIndex) {
                        this.progress[progressIndex][2] = icao.trim().split(' ').pop();
                        this.updateProgress(progressIndex);
                      }
                      //console.log('add icao:' + icao + ' @ ' + idx);
                      this.fmc.flightPlanManager.addWaypoint(icao, idx, () => {
                        const waypoint = this.fmc.flightPlanManager.getWaypoint(idx - 1);
                        waypoint.infos.ident;
                        waypoint.infos.UpdateAirway(airwayName).then(() => {
                          waypoint.infos.airwayIn = airwayName;
                          if (i < count) {
                            waypoint.infos.airwayOut = airwayName;
                          }

                          /**
                           * If it is last waypoint on airway override airways by parsed airways
                           */
                          if (lastWaypointIdent === waypoint.infos.ident) {
                            waypoint.infos.airwayIn = this.progress[progressIndex][4];
                            waypoint.infos.airwayOut = this.progress[progressIndex][5];
                          }
                          //console.log('icao:' + icao + ' added; Ident:' + lastWaypointIdent + '; Airway in: ' + waypoint.infos.airwayIn + '; Airway out: ' + waypoint.infos.airwayOut);
                          resolve();
                        });
                      });
                    });
                  };
                  await syncInsertWaypointByIcao(airway.icaos[firstIndex + i * inc], index + i);
                }
                callback(true);
                return;
              }
              this.fmc.showErrorMessage('2ND INDEX NOT FOUND');
              return callback(false);
            }
            this.fmc.showErrorMessage('1ST INDEX NOT FOUND');
            return callback(false);
          }
          this.fmc.showErrorMessage('NO REF WAYPOINT');
          return callback(false);
        }
        this.fmc.showErrorMessage('NO WAYPOINT INFOS');
        return callback(false);
      }
      this.fmc.showErrorMessage('NO REF WAYPOINT');
      return callback(false);
    }
    async insertWaypointsAlongAirway2(lastWaypointIdent, index, airwayName) {
      let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EmptyCallback.Boolean;
      let referenceWaypoint = this.fmc.flightPlanManager.getWaypoint(index - 1);
      if (referenceWaypoint) {
        let infos = referenceWaypoint.infos;
        if (infos instanceof WayPointInfo) {
          let airway = infos.airways.find(a => {
            return a.name === airwayName;
          });
          if (airway) {
            let firstIndex = airway.icaos.indexOf(referenceWaypoint.icao);
            let lastWaypointIcao = airway.icaos.find(icao => {
              return icao.trim().split(' ').pop() === lastWaypointIdent;
            });
            let lastIndex = airway.icaos.indexOf(lastWaypointIcao);
            if (firstIndex >= 0) {
              if (lastIndex >= 0) {
                let inc = 1;
                if (lastIndex < firstIndex) {
                  inc = -1;
                }
                let count = Math.abs(lastIndex - firstIndex);
                for (let i = 1; i < count + 1; i++) {
                  let asyncInsertWaypointByIcao = async (icao, index) => {
                    return new Promise(resolve => {
                      let progressIndex = this.progress.findIndex(w => {
                        return w[1] === lastWaypointIdent;
                      });
                      if (progressIndex) {
                        this.progress[progressIndex][2] = icao.trim().split(' ').pop();
                        this.updateProgress(progressIndex);
                      }
                      this.fmc.flightPlanManager.addWaypoint(icao, index, () => {
                        const waypoint = this.fmc.flightPlanManager.getWaypoint(index);
                        waypoint.infos.UpdateAirway(airwayName).then(() => {
                          waypoint.infos.airwayIn = airwayName;
                          if (i < count) {
                            waypoint.infos.airwayOut = airwayName;
                          }
                          resolve();
                        });
                      });
                    });
                  };
                  let outOfSync = async (icaoIndex, realIndex) => {
                    await asyncInsertWaypointByIcao(airway.icaos[icaoIndex], realIndex);
                  };
                  await outOfSync(firstIndex + i * inc, index - 1 + i);
                }
                return callback(true);
              }
              this.fmc.showErrorMessage('2ND INDEX NOT FOUND');
              return callback(false);
            }
            this.fmc.showErrorMessage('1ST INDEX NOT FOUND');
            return callback(false);
          }
          this.fmc.showErrorMessage('NO REF WAYPOINT');
          return callback(false);
        }
        this.fmc.showErrorMessage('NO WAYPOINT INFOS');
        return callback(false);
      }
      this.fmc.showErrorMessage('NO REF WAYPOINT');
      return callback(false);
    }
    insertWaypointFast(newWaypointTo, index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Boolean;
      this.fmc.ensureCurrentFlightPlanIsTemporary(async () => {
        this.getOrSelectWaypointByIdentFast(newWaypointTo.ident, newWaypointTo, waypoint => {
          if (!waypoint) {
            this.fmc.showErrorMessage('NOT IN DATABASE');
            return callback(false);
          }
          this.fmc.flightPlanManager.addWaypoint(waypoint.icao, index, () => {
            return callback(true);
          });
        });
      });
    }
    insertWaypoint(newWaypointTo, index, iterator) {
      let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EmptyCallback.Boolean;
      this.fmc.ensureCurrentFlightPlanIsTemporary(async () => {
        this.getOrSelectWaypointByIdent(newWaypointTo, iterator, waypoint => {
          if (!waypoint) {
            this.fmc.showErrorMessage('NOT IN DATABASE');
            return callback(false);
          }
          this.fmc.flightPlanManager.addWaypoint(waypoint.icao, index, () => {
            return callback(true);
          });
        });
      });
    }
    getOrSelectWaypointByIdentFast(ident, waypoint, callback) {
      console.log('CHECKING FOR SAME NAME: ' + ident);
      this.fmc.dataManager.GetWaypointsByIdent(ident).then(waypoints => {
        if (!waypoints || waypoints.length === 0) {
          console.log('WAYPOINT NOT FOUND');
          return callback(undefined);
        }
        if (waypoints.length === 1) {
          console.log('ONLY ONE WAYPOINT WITH THE NAME');
          return callback(waypoints[0]);
        }
        console.log('MORE WAYPOINTS WITH SAME NAME');

        /**
         * Precision 10m
         */
        for (let i = 0; i <= waypoints.length - 1; i++) {
          if (parseFloat(waypoints[i].infos.coordinates.lat).toFixed(4) === parseFloat(waypoint.lat).toFixed(4) && parseFloat(waypoints[i].infos.coordinates.long).toFixed(4) === parseFloat(waypoint.long).toFixed(4)) {
            return callback(waypoints[i]);
          }
        }

        /**
         * Precision 100m
         */
        for (let i = 0; i <= waypoints.length - 1; i++) {
          console.log('CHECK LAT: ' + waypoints[i].infos.coordinates.lat + ':' + waypoint.lat + '; CHECK LONG: ' + waypoints[i].infos.coordinates.long + ':' + waypoint.long, waypoint.ident);
          if (parseFloat(waypoints[i].infos.coordinates.lat).toFixed(3) === parseFloat(waypoint.lat).toFixed(3) && parseFloat(waypoints[i].infos.coordinates.long).toFixed(3) === parseFloat(waypoint.long).toFixed(3)) {
            return callback(waypoints[i]);
          }
        }

        /**
         * Precision 1000m
         */
        for (let i = 0; i <= waypoints.length - 1; i++) {
          console.log('CHECK LAT: ' + waypoints[i].infos.coordinates.lat + ':' + waypoint.lat + '; CHECK LONG: ' + waypoints[i].infos.coordinates.long + ':' + waypoint.long, waypoint.ident);
          if (parseFloat(waypoints[i].infos.coordinates.lat).toFixed(2) === parseFloat(waypoint.lat).toFixed(2) && parseFloat(waypoints[i].infos.coordinates.long).toFixed(2) === parseFloat(waypoint.long).toFixed(2)) {
            return callback(waypoints[i]);
          }
        }
        console.log('WAYPOINT BY LAT/LONG NOT FOUND');
        B777_FMC_SelectWptPage.ShowPage(this.fmc, waypoints, callback);
      });
    }
    getOrSelectWaypointByIdent(ident, iterator, callback) {
      this.fmc.dataManager.GetWaypointsByIdent(ident).then(waypoints => {
        if (!waypoints || waypoints.length === 0) {
          return callback(undefined);
        }
        if (waypoints.length === 1) {
          return callback(waypoints[0]);
        }
        for (let i = 0; i <= waypoints.length - 1; i++) {
          if (parseFloat(waypoints[i].infos.coordinates.lat).toFixed(5) === parseFloat(this.waypoints[iterator].lat).toFixed(5) && parseFloat(waypoints[i].infos.coordinates.long).toFixed(5) === parseFloat(this.waypoints[iterator].long).toFixed(5)) {
            return callback(waypoints[i]);
          }
        }
        B777_FMC_SelectWptPage.ShowPage(this.fmc, waypoints, callback);
      });
    }
  }

  class B777_FMC_PosInitPage {
    static ShowPage1(fmc) {
      let currPos = new LatLong(SimVar.GetSimVarValue('GPS POSITION LAT', 'degree latitude'), SimVar.GetSimVarValue('GPS POSITION LON', 'degree longitude')).toDegreeString();
      console.log(currPos);
      let date = new Date();
      let dateString = fastToFixed(date.getHours(), 0).padStart(2, '0') + fastToFixed(date.getMinutes(), 0).padStart(2, '0') + 'z';
      let lastPos = '';
      if (fmc.lastPos) {
        lastPos = fmc.lastPos;
      }
      let refAirport = '□□□□';
      if (fmc.refAirport && fmc.refAirport.ident) {
        refAirport = fmc.refAirport.ident;
      }
      let refAirportCoordinates = '';
      if (fmc.refAirport && fmc.refAirport.infos && fmc.refAirport.infos.coordinates) {
        refAirportCoordinates = fmc.refAirport.infos.coordinates.toDegreeString();
      }
      let gate = '-----';
      if (fmc.refGate) {
        gate = fmc.refGate;
      }
      let heading = '---';
      heading = fmc.makeSettable(heading) + '°';
      if (fmc.refHeading) {
        heading = fmc.makeSettable(fastToFixed(fmc.refHeading, 0).padStart(3, '0')) + '°';
      }
      let irsPos = '□□□°□□.□ □□□□°□□.□';
      if (fmc.initCoordinates) {
        irsPos = fmc.initCoordinates;
      }
      fmc.cleanUpPage();
      fmc._renderer.renderTitle('POS INIT');
      fmc._renderer.renderPages(1, 3);
      fmc._renderer.render([['', 'LAST POS'], ['', lastPos], ['REF AIRPORT'], [fmc.makeSettable(refAirport), refAirportCoordinates], ['GATE'], [fmc.makeSettable(gate)], ['UTC (GPS)', 'GPS POS'], [dateString, currPos], ['SET HDG', 'SET IRS POS'], [heading, fmc.makeSettable(irsPos)], ['__FMCSEPARATOR'], ['<INDEX', 'ROUTE>']]);
      if (fmc.lastPos) {
        fmc._renderer.rsk(1).event = () => {
          fmc.inOut = fmc.lastPos;
        };
      }
      fmc._renderer.lsk(2).event = async () => {
        let value = fmc.inOut;
        fmc.inOut = '';
        if (await fmc.tryUpdateRefAirport(value)) {
          B777_FMC_PosInitPage.ShowPage1(fmc);
        }
      };
      if (refAirportCoordinates) {
        fmc._renderer.rsk(2).event = () => {
          fmc.inOut = refAirportCoordinates;
        };
      }
      fmc._renderer.lsk(3).event = async () => {
        let value = fmc.inOut;
        fmc.inOut = '';
        if (fmc.tryUpdateGate(value)) {
          B777_FMC_PosInitPage.ShowPage1(fmc);
        }
      };
      fmc._renderer.rsk(4).event = () => {
        fmc.inOut = currPos;
      };
      fmc._renderer.lsk(5).event = async () => {
        let value = fmc.inOut;
        fmc.inOut = '';
        if (await fmc.tryUpdateHeading(value)) {
          B777_FMC_PosInitPage.ShowPage1(fmc);
        }
      };
      fmc._renderer.rsk(5).event = async () => {
        let value = fmc.inOut;
        fmc.inOut = '';
        if (await fmc.tryUpdateIrsCoordinatesDisplay(value)) {
          B777_FMC_PosInitPage.ShowPage1(fmc);
        }
      };
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_RoutePage.ShowPage1(fmc);
      };
      fmc.onPrevPage = () => {
        B777_FMC_PosInitPage.ShowPage3(fmc);
      };
      fmc.onNextPage = () => {
        B777_FMC_PosInitPage.ShowPage2(fmc);
      };
    }
    static ShowPage2(fmc) {
      fmc.cleanUpPage();
      let currPos = new LatLong(SimVar.GetSimVarValue("GPS POSITION LAT", "degree latitude"), SimVar.GetSimVarValue("GPS POSITION LON", "degree longitude")).toDegreeString();
      let irsPos = "";
      if (fmc.initCoordinates) {
        irsPos = fmc.initCoordinates;
      }
      fmc.setTemplate([['POS REF', '2', '3'], ['FMC POS (GPS L)', 'GS'], [currPos, 'ARM>'], ['IRS(3)'], [irsPos, ''], ['RNP/ACTUAL', 'DME DME'], [''], [''], [''], ['-----------------', 'GPS NAV'], ['<PURGE', '<INHIBIT'], [''], ['<INDEX', '<BRG/DIST']]);
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {};
      fmc.onPrevPage = () => {
        B777_FMC_PosInitPage.ShowPage1(fmc);
      };
      fmc.onNextPage = () => {
        B777_FMC_PosInitPage.ShowPage3(fmc);
      };
    }
    static ShowPage3(fmc) {
      fmc.cleanUpPage();
      fmc.setTemplate([['POS REF', '2', '3'], ['IRS L', 'GS'], ['000°/0.0NM', '290KT'], ['IRS C', 'GS'], ['000°/0.0NM', '290KT'], ['IRS R', 'GS'], ['000°/0.0NM', '290KT'], ['GPS L', 'GS'], ['000°/0.0NM', '290KT'], ['GPS R', 'GS'], ['000°/0.0NM', '290KT'], ['__FMCSEPARATOR'], ['<INDEX', '<LAT/LON']]);
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {};
      fmc.onPrevPage = () => {
        B777_FMC_PosInitPage.ShowPage2(fmc);
      };
      fmc.onNextPage = () => {
        B777_FMC_PosInitPage.ShowPage1(fmc);
      };
    }
  }

  class B777_FMC_IdentPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      B777_FMC_IdentPage._updateCounter = 0;
      fmc.pageUpdate = () => {
        if (B777_FMC_IdentPage._updateCounter >= 50) {
          B777_FMC_IdentPage.ShowPage1(fmc);
        } else {
          B777_FMC_IdentPage._updateCounter++;
        }
      };
      let date = fmc.getNavDataDateRange();
      fmc._renderer.renderTitle('IDENT');
      fmc._renderer.render([['MODEL', 'ENG RATING'], ['777-200.1', 'GE90-90B'], ['NAV DATA', 'ACTIVE'], ['AIRAC', date.toString()], ['OP PROGRAM', 'CO DATA'], [fmc.fmcManVersion, 'VS1001'], ['OPC'], [fmc.fmcBakVersion, ''], ['', 'DRAG/FF'], ['', '+0.0/+0.0'], ['', '__FMCSEPARATOR', ''], ['<INDEX', 'POS INIT>']]);
      if (fmc.urlConfig.index == 1) {
        fmc._renderer.lsk(6).event = () => {
          B777_FMC_InitRefIndexPage.ShowPage1(fmc);
        };
        fmc._renderer.rsk(6).event = () => {
          B777_FMC_PosInitPage.ShowPage1(fmc);
        };
      }

      /**
       * Set periodic page refresh if version of HD mode is not loaded from misc file
       */
      if (fmc.fmcManVersion.includes('XXXX-X-X') || fmc.fmcBakVersion.includes('XXXX-X-X')) {
        fmc.registerPeriodicPageRefresh(() => {
          B777_FMC_IdentPage.ShowPage1(fmc);
          return true;
        }, 100, false);
      }
    }
  }
  _defineProperty(B777_FMC_IdentPage, "_updateCounter", 0);

  class SpeedCalculator {
    constructor() {
      _defineProperty(this, "flapsFallback", void 0);
      _defineProperty(this, "weightFallback", void 0);
    }
    getClbManagedSpeed(costIndexCoefficient, overSpeedLimitThreshold) {
      const formula = costIndexCoefficient => {
        return 310 * (1 - costIndexCoefficient) + 330 * costIndexCoefficient;
      };
      let speed = this.calculate(formula, costIndexCoefficient);
      if (overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 9800) {
          overSpeedLimitThreshold = false;
        }
      } else if (!overSpeedLimitThreshold) {
        if (Simplane.getAltitude() >= 10000) {
          /**
           * TODO: Figure out where to store property isFmcCurrentPageUpdatedAboveTenThousandFeet
           */
          //if (!this._isFmcCurrentPageUpdatedAboveTenThousandFeet) {
          //	SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
          //	this._isFmcCurrentPageUpdatedAboveTenThousandFeet = true;
          //}
          overSpeedLimitThreshold = true;
        }
      }
      return {
        speed: speed,
        overSpeedLimitThreshold: overSpeedLimitThreshold
      };
    }
    getCrzManagedSpeed(costIndexCoefficient, overSpeedLimitThreshold) {
      let highAltitude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      const formula = costIndexCoefficient => {
        costIndexCoefficient = costIndexCoefficient * costIndexCoefficient;
        return 310 * (1 - costIndexCoefficient) + 330 * costIndexCoefficient;
      };
      let speed = this.calculate(formula, costIndexCoefficient);
      if (!highAltitude) {
        if (overSpeedLimitThreshold) {
          if (Simplane.getAltitude() < 9800) {
            speed = Math.min(speed, 250);
            overSpeedLimitThreshold = false;
          }
        } else if (!overSpeedLimitThreshold) {
          if (Simplane.getAltitude() < 10000) {
            speed = Math.min(speed, 250);
          } else {
            overSpeedLimitThreshold = true;
          }
        }
      }
      return {
        speed: speed,
        overSpeedLimitThreshold: overSpeedLimitThreshold
      };
    }
    getDesManagedSpeed(costIndexCoefficient, overSpeedLimitThreshold) {
      const formula = costIndexCoefficient => {
        return 280 * (1 - costIndexCoefficient) + 300 * costIndexCoefficient;
      };
      let speed = this.calculate(formula, costIndexCoefficient);
      if (overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 10700) {
          speed = Math.min(speed, 240);
          overSpeedLimitThreshold = false;
        }
      } else if (!overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 10700) {
          speed = Math.min(speed, 240);
        } else {
          overSpeedLimitThreshold = true;
        }
      }
      return {
        speed: speed,
        overSpeedLimitThreshold: overSpeedLimitThreshold
      };
    }
    cleanApproachSpeed() {
      let weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      let formula = weight => {
        let dWeight = (weight - 200) / (528 - 200);
        return 121 + 56 * dWeight;
      };
      return this.calculate(formula, this._getCheckedWeight(weight));
    }
    getSlatApproachSpeed() {
      let weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      let formula = weight => {
        let dWeight = (weight - 200) / (528 - 200);
        return 119 + 58 * dWeight;
      };
      return this.calculate(formula, this._getCheckedWeight(weight));
    }
    getFlapApproachSpeed() {
      let weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      let formula = weight => {
        let dWeight = (weight - 200) / (528 - 200);
        return 119 + 53 * dWeight;
      };
      return this.calculate(formula, this._getCheckedWeight(weight));
    }
    getVRef() {
      let flapsHandleIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
      let formula = (min, max) => {
        return Math.round((max - min) / (557 - 298.7) * (this._getCurrentWeight(true) / 1000 - 298.7) + min);
      };
      if (isNaN(flapsHandleIndex)) {
        flapsHandleIndex = Simplane.getFlapsHandleIndex();
      }
      let min = 198;
      let max = 250;
      if (flapsHandleIndex >= 9) {
        min = 119;
        max = 171;
      } else if (flapsHandleIndex >= 8) {
        min = 119;
        max = 174;
      } else if (flapsHandleIndex >= 7) {
        min = 138;
        max = 182;
      } else if (flapsHandleIndex >= 4) {
        min = 138;
        max = 182;
      } else if (flapsHandleIndex >= 2) {
        min = 158;
        max = 210;
      } else if (flapsHandleIndex >= 1) {
        min = 173;
        max = 231;
      }
      return this.calculate(formula, min, max);
    }
    calculate(formula) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return formula(...params);
    }
    _getCheckedWeight(weight) {
      if (weight === undefined) {
        return this._getCurrentWeight(true) / 1000;
      } else {
        return weight;
      }
    }
    _getCurrentWeight() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return useLbs ? Simplane.getWeight() * 2.20462262 : Simplane.getWeight();
    }
  }

  class BaseFMC extends BaseAirliners {
    get speedManager() {
      return this._speedManager;
    }
    constructor() {
      super();
      _defineProperty(this, "defaultInputErrorMessage", 'INVALID ENTRY');
      _defineProperty(this, "currentFlightPlanWaypointIndex", -1);
      _defineProperty(this, "_title", undefined);
      _defineProperty(this, "_pageCurrent", undefined);
      _defineProperty(this, "_pageCount", undefined);
      _defineProperty(this, "_labels", []);
      _defineProperty(this, "_lines", []);
      _defineProperty(this, "_inOut", undefined);
      _defineProperty(this, "onLeftInput", []);
      _defineProperty(this, "onRightInput", []);
      _defineProperty(this, "lastPos", '');
      _defineProperty(this, "costIndex", NaN);
      _defineProperty(this, "lastUserInput", '');
      _defineProperty(this, "isDisplayingErrorMessage", false);
      _defineProperty(this, "maxCruiseFL", 390);
      _defineProperty(this, "routeIndex", 0);
      _defineProperty(this, "coRoute", '');
      _defineProperty(this, "routeIsSelected", false);
      _defineProperty(this, "routePageCurrent", 1);
      _defineProperty(this, "routePageCount", 2);
      _defineProperty(this, "tmpOrigin", '');
      _defineProperty(this, "tmpDestination", '');
      _defineProperty(this, "transitionAltitude", 5000);
      _defineProperty(this, "perfTOTemp", 20);
      _defineProperty(this, "overSpeedLimitThreshold", false);
      _defineProperty(this, "taxiFuelWeight", 0.2);
      _defineProperty(this, "_routeFinalFuelWeight", NaN);
      _defineProperty(this, "_routeFinalFuelTime", NaN);
      _defineProperty(this, "_routeReservedWeight", NaN);
      _defineProperty(this, "_routeReservedPercent", 0);
      _defineProperty(this, "zeroFuelWeight", 0);
      _defineProperty(this, "zeroFuelWeightMassCenter", 0);
      _defineProperty(this, "takeOffTrim", 0);
      _defineProperty(this, "_takeOffFlap", -1);
      _defineProperty(this, "blockFuel", 0);
      _defineProperty(this, "_fuelReserves", NaN);
      _defineProperty(this, "takeOffWeight", NaN);
      _defineProperty(this, "landingWeight", NaN);
      _defineProperty(this, "averageWind", NaN);
      _defineProperty(this, "perfCrzWindHeading", NaN);
      _defineProperty(this, "perfCrzWindSpeed", NaN);
      _defineProperty(this, "perfApprQNH", NaN);
      _defineProperty(this, "perfApprTemp", NaN);
      _defineProperty(this, "perfApprWindHeading", NaN);
      _defineProperty(this, "perfApprWindSpeed", NaN);
      _defineProperty(this, "perfApprTransAlt", NaN);
      _defineProperty(this, "vApp", NaN);
      _defineProperty(this, "perfApprMDA", NaN);
      _defineProperty(this, "perfApprDH", NaN);
      _defineProperty(this, "_flightPhases", ['PREFLIGHT', 'TAXI', 'TAKEOFF', 'CLIMB', 'CRUISE', 'DESCENT', 'APPROACH', 'GOAROUND']);
      _defineProperty(this, "currentFlightPhase", FlightPhase.FLIGHT_PHASE_TAKEOFF);
      _defineProperty(this, "_lockConnectIls", false);
      _defineProperty(this, "_apNavIndex", 1);
      _defineProperty(this, "_apLocalizerOn", false);
      _defineProperty(this, "_canSwitchToNav", false);
      _defineProperty(this, "needApproachToSwitchToNav", true);
      _defineProperty(this, "_vhf1Frequency", 0);
      _defineProperty(this, "_vhf2Frequency", 0);
      _defineProperty(this, "_vor1FrequencyIdent", '');
      _defineProperty(this, "_vor1Frequency", 0);
      _defineProperty(this, "_vor1Course", 0);
      _defineProperty(this, "_vor2FrequencyIdent", '');
      _defineProperty(this, "_vor2Frequency", 0);
      _defineProperty(this, "_vor2Course", 0);
      _defineProperty(this, "_ilsFrequencyIdent", '');
      _defineProperty(this, "_ilsFrequency", 0);
      _defineProperty(this, "_ilsCourse", 0);
      _defineProperty(this, "_adf1Frequency", 0);
      _defineProperty(this, "_adf2Frequency", 0);
      _defineProperty(this, "_rcl1Frequency", 0);
      _defineProperty(this, "_pre1Frequency", undefined);
      _defineProperty(this, "_pre2Frequency", undefined);
      _defineProperty(this, "_atc1Frequency", 0);
      _defineProperty(this, "_radioNavOn", false);
      _defineProperty(this, "_approachInitialized", false);
      _defineProperty(this, "_fuelVarsUpdatedGrossWeight", 0);
      _defineProperty(this, "_fuelVarsUpdatedTripCons", 0);
      _defineProperty(this, "_debug", 0);
      _defineProperty(this, "_checkUpdateFuel", 0);
      _defineProperty(this, "_checkFlightPlan", 0);
      _defineProperty(this, "_smoothedTargetHeading", NaN);
      _defineProperty(this, "_smootherTargetPitch", NaN);
      _defineProperty(this, "_titleElement", undefined);
      _defineProperty(this, "_pageCurrentElement", null);
      _defineProperty(this, "_pageCountElement", null);
      _defineProperty(this, "_labelElements", []);
      _defineProperty(this, "_lineElements", []);
      _defineProperty(this, "_inOutElement", void 0);
      _defineProperty(this, "_inOutRectElement", void 0);
      _defineProperty(this, "_inOutFocused", false);
      _defineProperty(this, "_inOutKeyDownEvent", this.inOutKeyDownEvent.bind(this));
      _defineProperty(this, "_inOutClickEvent", this.inOutClickEvent.bind(this));
      _defineProperty(this, "_cruiseFlightLevel", void 0);
      _defineProperty(this, "dataManager", void 0);
      _defineProperty(this, "refAirport", void 0);
      _defineProperty(this, "refGate", void 0);
      _defineProperty(this, "refHeading", void 0);
      _defineProperty(this, "initCoordinates", void 0);
      _defineProperty(this, "cruiseTemperature", void 0);
      _defineProperty(this, "flightPlanManager", void 0);
      _defineProperty(this, "altDestination", void 0);
      _defineProperty(this, "groundTemperature", void 0);
      _defineProperty(this, "tempCurve", void 0);
      _defineProperty(this, "radioNav", void 0);
      _defineProperty(this, "flaps", void 0);
      _defineProperty(this, "ths", void 0);
      _defineProperty(this, "thrustReductionAltitude", void 0);
      _defineProperty(this, "accelerationAltitude", void 0);
      _defineProperty(this, "preSelectedDesSpeed", void 0);
      _defineProperty(this, "preSelectedCrzSpeed", void 0);
      _defineProperty(this, "preSelectedClbSpeed", void 0);
      _defineProperty(this, "takeOffSpeedsInfo", void 0);
      _defineProperty(this, "onClrLong", void 0);
      _defineProperty(this, "onClr", void 0);
      _defineProperty(this, "onDiv", void 0);
      _defineProperty(this, "onDel", void 0);
      _defineProperty(this, "onSp", void 0);
      _defineProperty(this, "onLetterInput", void 0);
      _defineProperty(this, "onPrevPage", void 0);
      _defineProperty(this, "onNextPage", void 0);
      _defineProperty(this, "onRad", void 0);
      _defineProperty(this, "onMenu", void 0);
      _defineProperty(this, "onProg", void 0);
      _defineProperty(this, "onFmcComm", void 0);
      _defineProperty(this, "onHold", void 0);
      _defineProperty(this, "onFix", void 0);
      _defineProperty(this, "onAtc", void 0);
      _defineProperty(this, "onDepArr", void 0);
      _defineProperty(this, "onInit", void 0);
      _defineProperty(this, "onInputAircraftSpecific", void 0);
      _defineProperty(this, "refreshPageCallback", undefined);
      _defineProperty(this, "pageUpdate", undefined);
      _defineProperty(this, "aircraftType", void 0);
      _defineProperty(this, "_speedRepository", void 0);
      _defineProperty(this, "_speedManager", void 0);
    }
    static approachTypeStringToIndex(approachType) {
      approachType = approachType.trim();
      let index = BaseFMC.approachTypes.indexOf(approachType);
      if (isFinite(index) && index > 0) {
        return index;
      }
      return 0;
    }
    getTitle() {
      if (this._title === undefined) {
        this._title = this._titleElement.textContent;
      }
      return this._title;
    }
    setTitle(content) {
      let color = content.split('[color]')[1];
      if (!color) {
        color = 'white';
      }
      this._title = content.split('[color]')[0];
      this._titleElement.classList.remove('white', 'blue', 'yellow', 'green', 'red');
      this._titleElement.classList.add(color);
      this._titleElement.innerHTML = this._title;
    }
    getPageCurrent() {
      if (this._pageCurrent === undefined) {
        this._pageCurrent = parseInt(this._pageCurrentElement.textContent);
      }
      return this._pageCurrent;
    }
    setPageCurrent(value) {
      if (typeof value === 'number') {
        this._pageCurrent = value;
      } else if (typeof value === 'string') {
        this._pageCurrent = parseInt(value);
      }
      diffAndSetText(this._pageCurrentElement, (this._pageCurrent > 0 ? this._pageCurrent : '') + '');
    }
    getPageCount() {
      if (this._pageCount === undefined) {
        this._pageCount = parseInt(this._pageCountElement.textContent);
      }
      return this._pageCount;
    }
    setPageCount(value) {
      if (typeof value === 'number') {
        this._pageCount = value;
      } else if (typeof value === 'string') {
        this._pageCount = parseInt(value);
      }
      diffAndSetText(this._pageCountElement, (this._pageCount > 0 ? this._pageCount : '') + '');
      if (this._pageCount === 0) {
        diffAndSetText(this.getChildById('page-slash'), '');
      } else {
        diffAndSetText(this.getChildById('page-slash'), '/');
      }
    }
    getLabel(row) {
      let col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!this._labels[row]) {
        this._labels[row] = [];
      }
      return this._labels[row][col];
    }
    setLabel(label, row) {
      let col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (col >= this._labelElements[row].length) {
        return;
      }
      if (!this._labels[row]) {
        this._labels[row] = [];
      }
      if (!label) {
        label = '';
      }
      if (col === -1) {
        for (let i = 0; i < this._labelElements[row].length; i++) {
          this._labels[row][i] = '';
          diffAndSetText(this._labelElements[row][i], '');
        }
        col = 0;
      }
      if (label === '__FMCSEPARATOR') {
        label = '------------------------';
      }
      if (label !== '') {
        let color = label.split('[color]')[1];
        if (!color) {
          color = 'white';
        }
        let e = this._labelElements[row][col];
        e.classList.remove('white', 'blue', 'yellow', 'green', 'red');
        e.classList.add(color);
        label = label.split('[color]')[0];
      }
      this._labels[row][col] = label;
      diffAndSetText(this._labelElements[row][col], label);
    }
    getLine(row) {
      let col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!this._lines[row]) {
        this._lines[row] = [];
      }
      return this._lines[row][col];
    }
    setLine(content, row) {
      let col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (col >= this._lineElements[row].length) {
        return;
      }
      if (!content) {
        content = '';
      }
      if (!this._lines[row]) {
        this._lines[row] = [];
      }
      if (col === -1) {
        for (let i = 0; i < this._lineElements[row].length; i++) {
          this._lines[row][i] = '';
          diffAndSetText(this._lineElements[row][i], '');
        }
        col = 0;
      }
      if (content === '__FMCSEPARATOR') {
        content = '------------------------';
      }
      if (content !== '') {
        if (content.indexOf('[s-text]') !== -1) {
          content = content.replace('[s-text]', '');
          this._lineElements[row][col].classList.add('s-text');
        } else {
          this._lineElements[row][col].classList.remove('s-text');
        }
        let color = content.split('[color]')[1];
        if (!color) {
          color = 'white';
        }
        let e = this._lineElements[row][col];
        e.classList.remove('white', 'blue', 'yellow', 'green', 'red', 'magenta');
        e.classList.add(color);
        content = content.split('[color]')[0];
      }
      content = content.replace('\<', '&lt');
      this._lines[row][col] = content;
      this._lineElements[row][col].innerHTML = this._lines[row][col];
    }
    get inOut() {
      return this.getInOut();
    }
    getInOut() {
      if (this._inOut === undefined) {
        this._inOut = this._inOutElement.innerText;
      }
      return this._inOut;
    }
    set inOut(v) {
      this.setInOut(v);
    }

    /**
     * TODO: Move to FMCRenderer
     * @param {string} content
     */
    setInOut(content) {
      this._inOut = content;
      this._inOutElement.innerText = this._inOut;
      //diffAndSetText(this._inOutElement, this._inOut);
      if (content === BaseFMC.clrValue) {
        this._inOutElement.style.paddingLeft = '8%';
      } else {
        this._inOutElement.style.paddingLeft = '';
      }
    }
    setTemplate(template) {
      if (template[0]) {
        this.setTitle(template[0][0]);
        this.setPageCurrent(template[0][1]);
        this.setPageCount(template[0][2]);
      }
      for (let i = 0; i < 6; i++) {
        let tIndex = 2 * i + 1;
        if (template[tIndex]) {
          if (template[tIndex][1] !== undefined) {
            this.setLabel(template[tIndex][0], i, 0);
            this.setLabel(template[tIndex][1], i, 1);
            this.setLabel(template[tIndex][2], i, 2);
            this.setLabel(template[tIndex][3], i, 3);
          } else {
            this.setLabel(template[tIndex][0], i, -1);
          }
        }
        tIndex = 2 * i + 2;
        if (template[tIndex]) {
          if (template[tIndex][1] !== undefined) {
            this.setLine(template[tIndex][0], i, 0);
            this.setLine(template[tIndex][1], i, 1);
            this.setLine(template[tIndex][2], i, 2);
            this.setLine(template[tIndex][3], i, 3);
          } else {
            this.setLine(template[tIndex][0], i, -1);
          }
        }
      }
      if (template[13]) {
        this.setInOut(template[13][0]);
      }
      SimVar.SetSimVarValue('L:AIRLINER_MCDU_CURRENT_FPLN_WAYPOINT', 'number', this.currentFlightPlanWaypointIndex).catch(console.error);
      // Apply formatting helper to title page, lines and labels
      if (this._titleElement !== null) {
        this._titleElement.innerHTML = this._formatCell(this._titleElement.innerHTML);
      }
      this._lineElements.forEach(row => {
        row.forEach(column => {
          if (column !== null) {
            column.innerHTML = this._formatCell(column.innerHTML);
          }
        });
      });
      this._labelElements.forEach(row => {
        row.forEach(column => {
          if (column !== null) {
            column.innerHTML = this._formatCell(column.innerHTML);
          }
        });
      });
    }
    _formatCell(str) {
      return str.replace(/{big}/g, "<span class='b-text'>").replace(/{small}/g, "<span class='s-text'>").replace(/{big}/g, "<span class='b-text'>").replace(/{amber}/g, "<span class='amber'>").replace(/{red}/g, "<span class='red'>").replace(/{green}/g, "<span class='green'>").replace(/{cyan}/g, "<span class='cyan'>").replace(/{white}/g, "<span class='white'>").replace(/{magenta}/g, "<span class='magenta'>").replace(/{yellow}/g, "<span class='yellow'>").replace(/{inop}/g, "<span class='inop'>").replace(/{sp}/g, "&nbsp;").replace(/{left}/g, "<span class='left'>").replace(/{right}/g, "<span class='right'>").replace(/{end}/g, "</span>");
    }
    getNavDataDateRange() {
      return SimVar.GetGameVarValue('FLIGHT NAVDATA DATE RANGE', 'string');
    }
    get cruiseFlightLevel() {
      return this._cruiseFlightLevel;
    }
    set cruiseFlightLevel(fl) {
      this._cruiseFlightLevel = Math.round(fl);
      SimVar.SetSimVarValue('L:AIRLINER_CRUISE_ALTITUDE', 'number', this._cruiseFlightLevel * 100).catch(console.error);
    }
    getCostIndexFactor() {
      if (isFinite(this.costIndex)) {
        return this.costIndex / 999;
      }
      return 0.1;
    }
    clearUserInput() {
      if (!this.isDisplayingErrorMessage) {
        this.lastUserInput = this.inOut;
      }
      this.inOut = '';
    }
    showErrorMessage(message) {
      this.isDisplayingErrorMessage = true;
      this.inOut = message;
    }
    async tryUpdateRefAirport(airportIdent) {
      let airport = await this.dataManager.GetAirportByIdent(airportIdent);
      if (!airport) {
        this.showErrorMessage('NOT IN DATABASE');
        return false;
      }
      this.refAirport = airport;
      return true;
    }
    tryUpdateGate(gate) {
      if (gate.length > 6) {
        this.showErrorMessage(this.defaultInputErrorMessage);
        return false;
      }
      this.refGate = gate;
      return true;
    }
    tryUpdateHeading(heading) {
      let nHeading = parseInt(heading);
      if (isNaN(nHeading)) {
        this.showErrorMessage(this.defaultInputErrorMessage);
        return false;
      }
      nHeading = Math.round(nHeading) % 360;
      this.refHeading = nHeading;
      return true;
    }
    async tryUpdateIrsCoordinatesDisplay(newIrsCoordinatesDisplay) {
      if (!this.dataManager.IsValidLatLon(newIrsCoordinatesDisplay)) {
        this.showErrorMessage(this.defaultInputErrorMessage);
        return false;
      }
      this.initCoordinates = newIrsCoordinatesDisplay;
      this.lastPos = this.initCoordinates;
      return true;
    }
    setCruiseFlightLevelAndTemperature(input) {
      if (input === BaseFMC.clrValue) {
        this.cruiseFlightLevel = undefined;
        this.cruiseTemperature = undefined;
        return true;
      }
      let flString = input.split('/')[0].replace('FL', '');
      let tempString = input.split('/')[1];
      let onlyTemp = flString.length === 0;
      if (tempString) {
        let temp = parseFloat(tempString);
        if (isFinite(temp)) {
          if (temp > -270 && temp < 100) {
            this.cruiseTemperature = temp;
          } else {
            if (onlyTemp) {
              this.showErrorMessage('ENTRY OUT OF RANGE');
              return false;
            }
          }
        } else {
          if (onlyTemp) {
            this.showErrorMessage(this.defaultInputErrorMessage);
            return false;
          }
        }
      }
      if (flString) {
        let fl = parseFloat(flString);
        if (isFinite(fl)) {
          if (fl > 0 && fl <= this.maxCruiseFL) {
            this.cruiseFlightLevel = fl;
            return true;
          } else if (fl >= 1000 && fl <= this.maxCruiseFL * 100) {
            this.cruiseFlightLevel = Math.floor(fl / 100);
            return true;
          }
          this.showErrorMessage('ENTRY OUT OF RANGE');
          return false;
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    trySetGroundTemperature(groundTemperature) {
      let value = parseInt(groundTemperature);
      if (isFinite(value)) {
        this.groundTemperature = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    tryUpdateCostIndex(costIndex) {
      let maxValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      let value = costIndex;
      if (isFinite(value)) {
        if (value >= 0) {
          if (value < maxValue) {
            this.costIndex = value;
            return true;
          }
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    ensureCurrentFlightPlanIsTemporary() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Boolean;
      if (this.flightPlanManager.getCurrentFlightPlanIndex() === 0) {
        this.flightPlanManager.copyCurrentFlightPlanInto(1, () => {
          this.flightPlanManager.setCurrentFlightPlanIndex(1, result => {
            SimVar.SetSimVarValue('L:FMC_FLIGHT_PLAN_IS_TEMPORARY', 'number', 1).catch(console.error);
            SimVar.SetSimVarValue('L:MAP_SHOW_TEMPORARY_FLIGHT_PLAN', 'number', 1).catch(console.error);
            callback(result);
          });
        });
      } else {
        callback(true);
      }
    }
    tryUpdateFromTo(fromTo) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      if (fromTo === BaseFMC.clrValue) {
        this.showErrorMessage('NOT ALLOWED');
        return callback(false);
      }
      let from = fromTo.split('/')[0];
      let to = fromTo.split('/')[1];
      this.dataManager.GetAirportByIdent(from).then(airportFrom => {
        if (airportFrom) {
          this.dataManager.GetAirportByIdent(to).then(airportTo => {
            if (airportTo) {
              this.eraseTemporaryFlightPlan(() => {
                this.flightPlanManager.clearAllFlightPlans(() => {
                  this.flightPlanManager.setOrigin(airportFrom.icao, () => {
                    this.tmpOrigin = airportFrom.ident;
                    this.flightPlanManager.setDestination(airportTo.icao, () => {
                      this.recalculateTHRRedAccTransAlt();
                      this.tmpOrigin = airportTo.ident;
                      this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_TAKEOFF;
                      callback(true);
                    });
                  });
                });
              });
            } else {
              this.showErrorMessage('NOT IN DATABASE');
              callback(false);
            }
          });
        } else {
          this.showErrorMessage('NOT IN DATABASE');
          callback(false);
        }
      });
    }
    async tryUpdateAltDestination(altDestIdent) {
      if (altDestIdent === 'NONE') {
        this.altDestination = undefined;
        return true;
      }
      let airportAltDest = await this.dataManager.GetAirportByIdent(altDestIdent);
      if (airportAltDest) {
        this.altDestination = airportAltDest;
        return true;
      }
      this.showErrorMessage('NOT IN DATABASE');
      return false;
    }
    updateRouteOrigin(newRouteOrigin) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.dataManager.GetAirportByIdent(newRouteOrigin).then(airport => {
        if (!airport) {
          this.showErrorMessage('NOT IN DATABASE');
          return callback(false);
        }
        this.flightPlanManager.clearAllFlightPlans(() => {
          this.flightPlanManager.setOrigin(airport.icao, () => {
            this.tmpOrigin = airport.ident;
            this.recalculateTHRRedAccTransAlt();
            callback(true);
          });
        });
      });
    }
    updateRouteDestination(routeDestination) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.dataManager.GetAirportByIdent(routeDestination).then(airport => {
        if (!airport) {
          this.showErrorMessage('NOT IN DATABASE');
          return callback(false);
        }
        this.flightPlanManager.setDestination(airport.icao, () => {
          this.tmpDestination = airport.ident;
          this.recalculateTHRRedAccTransAlt();
          callback(true);
        });
      });
    }
    setOriginRunway(runwayName) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      let origin = this.flightPlanManager.getOrigin();
      if (origin && origin.infos instanceof AirportInfo) {
        let runwayIndex = origin.infos.oneWayRunways.findIndex(r => {
          return Avionics.Utils.formatRunway(r.designation) === Avionics.Utils.formatRunway(runwayName);
        });
        if (runwayIndex >= 0) {
          this.ensureCurrentFlightPlanIsTemporary(() => {
            this.flightPlanManager.setOriginRunwayIndex(runwayIndex, () => {
              return callback(true);
            });
          });
        } else {
          this.showErrorMessage('NOT IN DATABASE');
          return callback(false);
        }
      } else {
        this.showErrorMessage('NO ORIGIN AIRPORT');
        return callback(false);
      }
    }
    setOriginRunwayIndex(runwayIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setDepartureProcIndex(-1, () => {
          this.flightPlanManager.setOriginRunwayIndex(runwayIndex, () => {
            return callback(true);
          });
        });
      });
    }
    setRunwayIndex(runwayIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        let routeOriginInfo = this.flightPlanManager.getOrigin().infos;
        if (!this.flightPlanManager.getOrigin()) {
          this.showErrorMessage('NO ORIGIN SET');
          return callback(false);
        } else if (runwayIndex === -1) {
          this.flightPlanManager.setDepartureRunwayIndex(-1, () => {
            this.flightPlanManager.setOriginRunwayIndex(-1, () => {
              return callback(true);
            });
          });
        } else if (routeOriginInfo instanceof AirportInfo) {
          if (routeOriginInfo.oneWayRunways[runwayIndex]) {
            this.flightPlanManager.setDepartureRunwayIndex(runwayIndex, () => {
              return callback(true);
            });
          }
        } else {
          this.showErrorMessage('NOT IN DATABASE');
          callback(false);
        }
      });
    }
    setDepartureIndex(departureIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        let currentRunway = this.flightPlanManager.getDepartureRunway();
        this.flightPlanManager.setDepartureProcIndex(departureIndex, () => {
          if (currentRunway) {
            let departure = this.flightPlanManager.getDeparture();
            if (departure) {
              let departureRunwayIndex = departure.runwayTransitions.findIndex(t => {
                return t.name.indexOf(currentRunway.designation) != -1;
              });
              if (departureRunwayIndex >= -1) {
                return this.flightPlanManager.setDepartureRunwayIndex(departureRunwayIndex, () => {
                  return callback(true);
                });
              }
            }
          }
          return callback(true);
        });
      });
    }
    removeDeparture() {
      this.flightPlanManager.removeDeparture();
      return true;
    }
    setApproachTransitionIndex(transitionIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      let arrivalIndex = this.flightPlanManager.getArrivalProcIndex();
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setApproachTransitionIndex(transitionIndex, () => {
          this.flightPlanManager.setArrivalProcIndex(arrivalIndex, () => {
            callback(true);
          });
        });
      });
    }
    setArrivalProcIndex(arrivalIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setArrivalProcIndex(arrivalIndex, () => {
          callback(true);
        });
      });
    }
    setArrivalIndex(arrivalIndex, transitionIndex) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setArrivalEnRouteTransitionIndex(transitionIndex, () => {
          this.flightPlanManager.setArrivalProcIndex(arrivalIndex, () => {
            callback(true);
          });
        });
      });
    }
    removeArrival() {
      this.flightPlanManager.removeDeparture();
      return true;
    }
    setApproachIndex(approachIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setApproachIndex(approachIndex, () => {
          let frequency = this.flightPlanManager.getApproachNavFrequency();
          if (isFinite(frequency)) {
            let freq = Math.round(frequency * 100) / 100;
            let approach = this.flightPlanManager.getApproach();
            if (approach && approach.name && approach.isLocalizer()) {
              if (this.connectIlsFrequency(freq)) {
                SimVar.SetSimVarValue('L:FLIGHTPLAN_APPROACH_ILS', 'number', freq).catch(console.error);
                let runway = this.flightPlanManager.getApproachRunway();
                if (runway) {
                  SimVar.SetSimVarValue('L:FLIGHTPLAN_APPROACH_COURSE', 'number', runway.direction).catch(console.error);
                }
              }
            } else {
              this.vor1Frequency = freq;
            }
          }
          callback(true);
        });
      });
    }
    updateFlightNo(flightNo) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      if (flightNo.length > 7) {
        this.showErrorMessage(this.defaultInputErrorMessage);
        return callback(false);
      }
      SimVar.SetSimVarValue('ATC FLIGHT NUMBER', 'string', flightNo).then(() => {
        return callback(true);
      });
    }
    updateCoRoute(coRoute) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      if (coRoute.length > 2) {
        if (coRoute.length < 10) {
          if (coRoute === 'NONE') {
            this.coRoute = undefined;
          } else {
            this.coRoute = coRoute;
          }
          return callback(true);
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return callback(false);
    }
    getTotalTripTime() {
      if (this.flightPlanManager.getOrigin()) {
        return this.flightPlanManager.getOrigin().infos.totalTimeInFP;
      }
      return NaN;
    }
    getTotalTripFuelCons() {
      if (this.flightPlanManager.getDestination()) {
        return this.flightPlanManager.getOrigin().infos.totalFuelConsInFP;
      }
      return NaN;
    }
    getOrSelectWaypointByIdent(ident, callback) {
      this.dataManager.GetWaypointsByIdent(ident).then(waypoints => {
        if (!waypoints || waypoints.length === 0) {
          return callback(undefined);
        }
        return callback(waypoints[0]);
      });
    }
    async tryAddNextAirway(newAirway) {
      this.showErrorMessage('NOT IMPLEMENTED');
      return false;
    }
    async tryAddNextWaypoint(newWaypointTo) {
      let waypoints = await this.dataManager.GetWaypointsByIdent(newWaypointTo);
      if (waypoints.length === 0) {
        this.showErrorMessage('NOT IN DATABASE');
        return false;
      }
      if (waypoints.length === 1) {
        this.flightPlanManager.addWaypoint(waypoints[0].icao);
        this.routeIsSelected = false;
        return true;
      }
      return false;
    }
    activateDirectToWaypointIdent(waypointIdent) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      this.getOrSelectWaypointByIdent(waypointIdent, w => {
        if (w) {
          return this.activateDirectToWaypoint(w, callback);
        }
        return callback();
      });
    }
    activateDirectToWaypoint(waypoint) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      this.flightPlanManager.activateDirectTo(waypoint.infos.icao, callback);
    }
    insertWaypointNextTo(newWaypointTo, referenceWaypoint) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Boolean;
      let referenceWaypointIndex = this.flightPlanManager.indexOfWaypoint(referenceWaypoint);
      if (referenceWaypointIndex >= 0) {
        return this.insertWaypoint(newWaypointTo, referenceWaypointIndex + 1, callback);
      }
      this.showErrorMessage('NOT IN DATABASE');
      callback(false);
    }
    insertWaypoint(newWaypointTo, index) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(async () => {
        this.getOrSelectWaypointByIdent(newWaypointTo, waypoint => {
          if (!waypoint) {
            this.showErrorMessage('NOT IN DATABASE');
            return callback(false);
          }
          this.flightPlanManager.addWaypoint(waypoint.icao, index, () => {
            return callback(true);
          });
        });
      });
    }
    insertWaypointsAlongAirway(lastWaypointIdent, index, airwayName) {
      let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EmptyCallback.Boolean;
      let referenceWaypoint = this.flightPlanManager.getWaypoint(index - 1);
      if (referenceWaypoint) {
        let infos = referenceWaypoint.infos;
        if (infos instanceof WayPointInfo) {
          let airway = infos.airways.find(a => {
            return a.name === airwayName;
          });
          if (airway) {
            let firstIndex = airway.icaos.indexOf(referenceWaypoint.icao);
            let lastWaypointIcao = airway.icaos.find(icao => {
              return icao.indexOf(lastWaypointIdent) !== -1;
            });
            let lastIndex = airway.icaos.indexOf(lastWaypointIcao);
            if (firstIndex >= 0) {
              if (lastIndex >= 0) {
                let inc = 1;
                if (lastIndex < firstIndex) {
                  inc = -1;
                }
                let count = Math.abs(lastIndex - firstIndex);
                let asyncInsertWaypointByIcao = async (icao, index) => {
                  return new Promise(resolve => {
                    this.flightPlanManager.addWaypoint(icao, index, () => {
                      resolve(true);
                    });
                  });
                };
                let outOfSync = async () => {
                  await asyncInsertWaypointByIcao(airway.icaos[firstIndex + count * inc], index);
                  callback(true);
                };
                outOfSync().catch(console.error);
                return;
              }
              this.showErrorMessage('2ND INDEX NOT FOUND');
              return callback(false);
            }
            this.showErrorMessage('1ST INDEX NOT FOUND');
            return callback(false);
          }
          this.showErrorMessage('NO REF WAYPOINT');
          return callback(false);
        }
        this.showErrorMessage('NO WAYPOINT INFOS');
        return callback(false);
      }
      this.showErrorMessage('NO REF WAYPOINT');
      return callback(false);
    }
    async tryInsertAirwayByWaypointIdent(newWaypointIdent, from) {
      this.showErrorMessage('NOT IMPLEMENTED');
      return false;
    }
    async tryInsertAirway(newAirway, from) {
      this.showErrorMessage('NOT IMPLEMENTED');
      return false;
    }
    removeWaypoint(index) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.removeWaypoint(index, true, callback);
      });
    }
    async tryUpdateWaypointVia(via, waypointIndex) {
      this.showErrorMessage('NOT IMPLEMENTED');
      return false;
    }
    clearDepartureDiscontinuity() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      this.flightPlanManager.clearDepartureDiscontinuity(callback);
    }
    clearArrivalDiscontinuity() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      this.flightPlanManager.clearArrivalDiscontinuity(callback);
    }
    eraseTemporaryFlightPlan() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      this.flightPlanManager.setCurrentFlightPlanIndex(0, () => {
        SimVar.SetSimVarValue('L:FMC_FLIGHT_PLAN_IS_TEMPORARY', 'number', 0).catch(console.error);
        SimVar.SetSimVarValue('L:MAP_SHOW_TEMPORARY_FLIGHT_PLAN', 'number', 0).catch(console.error);
        callback();
      });
    }
    insertTemporaryFlightPlan() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      if (this.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
        this.flightPlanManager.copyCurrentFlightPlanInto(0, () => {
          this.flightPlanManager.setCurrentFlightPlanIndex(0, () => {
            SimVar.SetSimVarValue('L:FMC_FLIGHT_PLAN_IS_TEMPORARY', 'number', 0).catch(console.error);
            SimVar.SetSimVarValue('L:MAP_SHOW_TEMPORARY_FLIGHT_PLAN', 'number', 0).catch(console.error);
            if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_APPROACH) {
              this.flightPlanManager.activateApproach();
            }
            callback();
          });
        });
      }
    }
    trySetV1Speed(s) {
      if (s != undefined) {
        if (!/^\d+$/.test(s)) {
          this.showErrorMessage('FORMAT ERROR');
          return false;
        }
        let v = parseInt(s);
        if (isFinite(v)) {
          if (v >= 0 && v < 1000) {
            this.speedManager.setV1Speed(v);
            return true;
          }
          this.showErrorMessage('ENTRY OUT OF RANGE');
          return false;
        }
        this.showErrorMessage(this.defaultInputErrorMessage);
        return false;
      } else {
        this.speedManager.setV1Speed(undefined);
        return true;
      }
    }
    trySetVRSpeed(s) {
      if (s != undefined) {
        if (!/^\d+$/.test(s)) {
          this.showErrorMessage('FORMAT ERROR');
          return false;
        }
        let v = parseInt(s);
        if (isFinite(v)) {
          if (v >= 0 && v < 1000) {
            this.speedManager.setVRSpeed(v);
            return true;
          }
          this.showErrorMessage('ENTRY OUT OF RANGE');
          return false;
        }
        this.showErrorMessage(this.defaultInputErrorMessage);
        return false;
      } else {
        this.speedManager.setVRSpeed(undefined);
        return true;
      }
    }
    trySetV2Speed(s) {
      if (s != undefined) {
        if (!/^\d+$/.test(s)) {
          this.showErrorMessage('FORMAT ERROR');
          return false;
        }
        let v = parseInt(s);
        if (isFinite(v)) {
          if (v > 0 && v < 1000) {
            this.speedManager.setV2Speed(v);
            return true;
          }
          this.showErrorMessage('ENTRY OUT OF RANGE');
          return false;
        }
        this.showErrorMessage(this.defaultInputErrorMessage);
        return false;
      } else {
        this.speedManager.setV2Speed(undefined);
        return true;
      }
    }
    trySetTransAltitude(s) {
      if (!/^\d+$/.test(s)) {
        this.showErrorMessage('FORMAT ERROR');
        return false;
      }
      let v = parseInt(s);
      if (isFinite(v) && v > 0) {
        this.transitionAltitude = v;
        SimVar.SetSimVarValue('L:AIRLINER_TRANS_ALT', 'Number', this.transitionAltitude).catch(console.error);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    trySetThrustReductionAccelerationAltitude(s) {
      let thrRed = NaN;
      let accAlt = NaN;
      if (s) {
        let sSplit = s.split('/');
        thrRed = parseInt(sSplit[0]);
        accAlt = parseInt(sSplit[1]);
      }
      if (isFinite(thrRed) || isFinite(accAlt)) {
        if (isFinite(thrRed)) {
          this.thrustReductionAltitude = thrRed;
          SimVar.SetSimVarValue('L:AIRLINER_THR_RED_ALT', 'Number', this.thrustReductionAltitude).catch(console.error);
        }
        if (isFinite(accAlt)) {
          this.accelerationAltitude = accAlt;
          SimVar.SetSimVarValue('L:AIRLINER_ACC_ALT', 'Number', this.accelerationAltitude).catch(console.error);
        }
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    trySetFlapsTHS(s) {
      if (s) {
        let flaps = s.split('/')[0];
        let validEntry = false;
        if (!/^\d+$/.test(flaps)) {
          this.showErrorMessage('FORMAT ERROR');
          return false;
        }
        let vFlaps = parseInt(flaps);
        if (isFinite(vFlaps)) {
          this.flaps = vFlaps;
          validEntry = true;
        }
        let vThs = s.split('/')[1];
        if (vThs) {
          if (vThs.substr(0, 2) === 'UP' || vThs.substr(0, 2) === 'DN') {
            if (isFinite(parseFloat(vThs.substr(2)))) {
              this.ths = vThs;
              validEntry = true;
            }
          }
        }
        if (validEntry) {
          return true;
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getFlapSpeed() {
      let phase = Simplane.getCurrentFlightPhase();
      let flapsHandleIndex = Simplane.getFlapsHandleIndex();
      let flapSpeed = 100;
      if (flapsHandleIndex == 1) {
        let slatSpeed = 0;
        if (phase == FlightPhase.FLIGHT_PHASE_TAKEOFF || phase == FlightPhase.FLIGHT_PHASE_CLIMB || phase == FlightPhase.FLIGHT_PHASE_GOAROUND) {
          slatSpeed = Simplane.getStallSpeedPredicted(flapsHandleIndex - 1) * 1.25;
        } else if (phase == FlightPhase.FLIGHT_PHASE_DESCENT || phase == FlightPhase.FLIGHT_PHASE_APPROACH) {
          slatSpeed = Simplane.getStallSpeedPredicted(flapsHandleIndex + 1) * 1.23;
        }
        return slatSpeed;
      }
      if (flapsHandleIndex == 2 || flapsHandleIndex == 3) {
        if (phase == FlightPhase.FLIGHT_PHASE_TAKEOFF || phase == FlightPhase.FLIGHT_PHASE_CLIMB || phase == FlightPhase.FLIGHT_PHASE_GOAROUND) {
          flapSpeed = Simplane.getStallSpeedPredicted(flapsHandleIndex - 1) * 1.26;
        } else if (phase == FlightPhase.FLIGHT_PHASE_DESCENT || phase == FlightPhase.FLIGHT_PHASE_APPROACH) {
          if (flapsHandleIndex == 2) {
            flapSpeed = Simplane.getStallSpeedPredicted(flapsHandleIndex + 1) * 1.47;
          } else {
            flapSpeed = Simplane.getStallSpeedPredicted(flapsHandleIndex + 1) * 1.36;
          }
        }
      }
      return flapSpeed;
    }
    getFlapTakeOffSpeed() {
      let dWeight = (this.getWeight() - 42) / (75 - 42);
      return 134 + 40 * dWeight;
    }
    getSlatTakeOffSpeed() {
      let dWeight = (this.getWeight() - 42) / (75 - 42);
      return 183 + 40 * dWeight;
    }
    getCleanTakeOffSpeed() {
      if (this.takeOffSpeedsInfo) {
        let dWeight = (this.getWeight() * 1000 - this.takeOffSpeedsInfo.minWeight) / (this.takeOffSpeedsInfo.maxWeight - this.takeOffSpeedsInfo.minWeight);
        return this.takeOffSpeedsInfo.minVal * (1 - dWeight) + this.takeOffSpeedsInfo.maxVal * dWeight;
      }
    }
    updateCleanTakeOffSpeed() {
      let toGreenDotSpeed = this.getCleanTakeOffSpeed();
      if (isFinite(toGreenDotSpeed)) {
        SimVar.SetSimVarValue('L:AIRLINER_TO_GREEN_DOT_SPD', 'Number', toGreenDotSpeed).catch(console.error);
      }
    }
    setPerfTOFlexTemp(s) {
      let value = parseFloat(s);
      if (isFinite(value) && value > -270 && value < 150) {
        this.perfTOTemp = value;
        SimVar.SetSimVarValue('L:AIRLINER_TO_FLEX_TEMP', 'Number', this.perfTOTemp).catch(console.error);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getClbManagedSpeed() {
      let dCI = this.getCostIndexFactor();
      let flapsHandleIndex = Simplane.getFlapsHandleIndex();
      if (flapsHandleIndex != 0) {
        return this.getFlapSpeed();
      }
      let speed = 220 * (1 - dCI) + 280 * dCI;
      if (this.overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 9800) {
          speed = Math.min(speed, 250);
          this.overSpeedLimitThreshold = false;
        }
      } else if (!this.overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 10000) {
          speed = Math.min(speed, 250);
        } else {
          this.overSpeedLimitThreshold = true;
        }
      }
      return speed;
    }
    getCrzManagedSpeed() {
      let dCI = this.getCostIndexFactor();
      dCI = dCI * dCI;
      let flapsHandleIndex = SimVar.GetSimVarValue('FLAPS HANDLE INDEX', 'Number');
      if (flapsHandleIndex != 0) {
        return this.getFlapSpeed();
      }
      let speed = 285 * (1 - dCI) + 310 * dCI;
      if (this.overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 9800) {
          speed = Math.min(speed, 250);
          this.overSpeedLimitThreshold = false;
        }
      } else if (!this.overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 10000) {
          speed = Math.min(speed, 250);
        } else {
          this.overSpeedLimitThreshold = true;
        }
      }
      return speed;
    }
    getDesManagedSpeed() {
      let dCI = this.getCostIndexFactor();
      let flapsHandleIndex = Simplane.getFlapsHandleIndex();
      if (flapsHandleIndex != 0) {
        return this.getFlapSpeed();
      }
      let speed = 240 * (1 - dCI) + 260 * dCI;
      if (this.overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 9800) {
          speed = Math.min(speed, 250);
          this.overSpeedLimitThreshold = false;
        }
      } else if (!this.overSpeedLimitThreshold) {
        if (Simplane.getAltitude() < 10000) {
          speed = Math.min(speed, 250);
        } else {
          this.overSpeedLimitThreshold = true;
        }
      }
      return speed;
    }
    updateCleanApproachSpeed() {
      let apprGreenDotSpeed = this.speedManager.getCleanApproachSpeed(this.getWeight(true));
      if (isFinite(apprGreenDotSpeed)) {
        SimVar.SetSimVarValue('L:AIRLINER_APPR_GREEN_DOT_SPD', 'Number', apprGreenDotSpeed).catch(console.error);
      }
    }
    async trySetTaxiFuelWeight(s) {
      if (!/[0-9]+(\.[0-9][0-9]?)?/.test(s)) {
        this.showErrorMessage('FORMAT ERROR');
        return false;
      }
      let value = parseFloat(s);
      if (isFinite(value) && value >= 0) {
        this.taxiFuelWeight = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getRouteFinalFuelWeight() {
      if (isFinite(this._routeFinalFuelWeight)) {
        return this._routeFinalFuelWeight;
      } else if (isFinite(this._routeFinalFuelTime)) {
        return this.getTotalTripFuelCons() / this.getTotalTripTime() * this._routeFinalFuelTime;
      }
      return NaN;
    }
    getRouteFinalFuelTime() {
      if (isFinite(this._routeFinalFuelTime)) {
        return this._routeFinalFuelTime;
      } else if (isFinite(this._routeFinalFuelWeight)) {
        return this.getTotalTripTime() / this.getTotalTripFuelCons() * this._routeFinalFuelWeight;
      }
      return NaN;
    }
    async trySetRouteFinalFuel(s) {
      if (s) {
        let rteFinalWeight = parseFloat(s.split('/')[0]);
        let rteFinalTime = BaseFMC.hhmmToSeconds(s.split('/')[1]);
        if (isFinite(rteFinalWeight)) {
          this._routeFinalFuelWeight = rteFinalWeight;
          this._routeFinalFuelTime = NaN;
          return true;
        } else if (isFinite(rteFinalTime)) {
          this._routeFinalFuelWeight = NaN;
          this._routeFinalFuelTime = rteFinalTime;
          return true;
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getRouteReservedWeight() {
      if (isFinite(this._routeReservedWeight)) {
        return this._routeReservedWeight;
      } else {
        return this._routeReservedPercent * this.blockFuel / 100;
      }
    }
    getRouteReservedPercent() {
      if (isFinite(this._routeReservedWeight) && isFinite(this.blockFuel)) {
        return this._routeReservedWeight / this.blockFuel * 100;
      }
      return this._routeReservedPercent;
    }
    trySetRouteReservedFuel(s) {
      if (s) {
        let rteRsvWeight = parseFloat(s.split('/')[0]);
        let rteRsvPercent = parseFloat(s.split('/')[1]);
        if (isFinite(rteRsvWeight)) {
          this._routeReservedWeight = rteRsvWeight;
          this._routeReservedPercent = 0;
          return true;
        } else if (isFinite(rteRsvPercent)) {
          this._routeReservedWeight = NaN;
          this._routeReservedPercent = rteRsvPercent;
          return true;
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    updateTakeOffTrim() {
      let grossWeightTrim = [340, 400, 450, 500, 550, 600, 650, 700, 750, 780];
      let cgTrim = [14.0, 19.0, 24.0, 29.0, 34.0, 39.0, 44.0];
      let flaps5TrimTable = [[2.75, 2.35, 1.96, 1.57, 1.18, 0.79, 0.41], [4.22, 3.51, 2.73, 2.07, 1.71, 1.29, 0.88], [5.45, 4.38, 3.38, 2.59, 2.15, 1.71, 1.27], [6.74, 5.46, 4.20, 3.02, 2.49, 1.97, 1.45], [7.42, 5.99, 4.72, 3.45, 2.68, 2.13, 1.58], [8.11, 6.55, 5.20, 3.75, 2.91, 2.30, 1.68], [8.55, 7.01, 5.59, 4.11, 3.11, 2.41, 1.83], [8.76, 7.28, 5.86, 4.40, 3.30, 2.53, 1.88], [8.98, 7.63, 6.24, 4.80, 3.44, 2.60, 1.93], [9.09, 7.88, 6.53, 5.05, 3.63, 2.68, 2.00]];
      let flaps15TrimTable = [[2.64, 2.24, 1.84, 1.60, 1.35, 1.10, 0.84], [3.88, 3.28, 2.57, 2.08, 1.75, 1.36, 1.03], [4.90, 3.88, 3.18, 2.53, 2.08, 1.63, 1.19], [6.13, 4.75, 3.73, 2.88, 2.37, 1.91, 1.34], [7.38, 5.64, 4.38, 3.45, 2.65, 2.13, 1.50], [8.53, 6.72, 5.36, 4.01, 3.02, 2.39, 1.82], [8.86, 7.11, 5.76, 4.32, 3.25, 2.50, 1.93], [9.23, 7.53, 6.15, 4.72, 3.31, 2.57, 2.00], [9.80, 8.07, 6.41, 4.93, 3.38, 2.63, 2.12], [10.35, 8.58, 6.76, 5.15, 3.54, 2.71, 2.25]];
      let flaps20TrimTable = [[2.70, 2.48, 2.25, 1.93, 1.60, 1.40, 1.20], [3.97, 3.52, 2.92, 2.38, 2.07, 1.69, 1.30], [5.48, 4.38, 3.40, 2.76, 2.30, 1.89, 1.38], [6.85, 5.46, 4.12, 3.32, 2.62, 2.03, 1.45], [8.21, 6.65, 5.15, 4.01, 2.88, 2.23, 1.58], [9.41, 7.84, 6.17, 4.68, 3.30, 2.48, 1.78], [10.10, 8.44, 6.78, 5.16, 3.61, 2.63, 1.93], [10.78, 8.98, 7.28, 5.57, 4.03, 2.79, 2.13], [11.13, 9.18, 7.42, 5.78, 4.18, 2.84, 2.18], [11.33, 9.35, 7.55, 5.94, 4.34, 2.91, 2.20]];
      const interpolate = (xarr, yarr, xpoint) => {
        const xa = [...xarr].reverse().find(x => x <= xpoint),
          xb = xarr.find(x => x >= xpoint),
          ya = yarr[xarr.indexOf(xa)],
          yb = yarr[xarr.indexOf(xb)];
        return yarr[xarr.indexOf(xpoint)] || ya + (xpoint - xa) * (yb - ya) / (xb - xa);
      };
      var cellSelector = 0;
      for (let i = 0; i < grossWeightTrim.length; i++) {
        if (grossWeightTrim[i] >= this.getWeight(true) / 1000) {
          cellSelector = i + 1;
          break;
        }
      }

      // current workaround fro flight model by adding 6 to trim
      switch (this.getTakeOffFlap()) {
        case 5:
          this.takeOffTrim = interpolate(cgTrim, flaps5TrimTable[cellSelector], this.zeroFuelWeightMassCenter) + 6;
          break;
        case 15:
          this.takeOffTrim = interpolate(cgTrim, flaps15TrimTable[cellSelector], this.zeroFuelWeightMassCenter) + 6;
          break;
        case 20:
          this.takeOffTrim = interpolate(cgTrim, flaps20TrimTable[cellSelector], this.zeroFuelWeightMassCenter) + 6;
          break;
      }
    }
    getTakeOffFlap() {
      return this._takeOffFlap;
    }
    setTakeOffFlap(s) {
      let value = Number.parseInt(s);
      if (isFinite(value)) {
        if (value === 5 || value === 15 || value === 20) {
          this._takeOffFlap = value;
          return true;
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getZeroFuelWeight() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (useLbs) {
        return this.zeroFuelWeight * 2.204623;
      }
      return this.zeroFuelWeight;
    }
    getApproachWeight() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.getWeight(useLbs) * 0.25 + this.getZeroFuelWeight(useLbs) * 0.75;
    }
    setZeroFuelWeight(s) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      let useLbs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      let value = s;
      if (isFinite(value)) {
        if (!useLbs) {
          value = value * 2.204623;
        }
        Coherent.call('ZFW_VALUE_SET', value * 1000).catch(console.error);
        this.updateFuelVars().catch(console.error);
        this.updateTakeOffTrim();
        return callback(true);
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      callback(false);
    }
    setZeroFuelCG(s) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      let value = parseFloat(s);
      if (isFinite(value) && value > 0 && value < 100) {
        this.zeroFuelWeightMassCenter = value;
        this.updateTakeOffTrim();
        return callback(true);
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      callback(false);
    }
    async trySetZeroFuelWeightZFWCG(s) {
      let useLbs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let zfw = NaN;
      let zfwcg = NaN;
      if (s) {
        let sSplit = s.split('/');
        zfw = parseFloat(sSplit[0]);
        if (!useLbs) {
          zfw = zfw * 2.204623;
        }
        zfwcg = parseFloat(sSplit[1]);
      }
      if (isFinite(zfw) || isFinite(zfwcg) && zfw > 0 && zfwcg > 0) {
        if (isFinite(zfw)) {
          await Coherent.call('ZFW_VALUE_SET', zfw * 1000);
          await this.updateFuelVars();
        }
        if (isFinite(zfwcg)) {
          this.zeroFuelWeightMassCenter = zfwcg;
        }
        this.updateTakeOffTrim();
        this.updateCleanTakeOffSpeed();
        this.updateCleanApproachSpeed();
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getBlockFuel() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (useLbs) {
        return this.blockFuel * 2.204623;
      }
      return this.blockFuel;
    }
    trySetBlockFuel(s) {
      let useLbs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let value = s;
      if (isFinite(value)) {
        if (useLbs) {
          value = value / 2.204623;
        }
        this.blockFuel = value;
        this.updateTakeOffTrim();
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getFuelReserves() {
      return this._fuelReserves;
    }
    setFuelReserves(s) {
      let useLbs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let value = s;
      if (isFinite(value)) {
        if (value >= 0) {
          if (value < this.getBlockFuel(useLbs)) {
            this._fuelReserves = value;
            return true;
          }
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getWeight() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let w = this.zeroFuelWeight + this.blockFuel;
      if (useLbs) {
        w *= 2.204623;
      }
      return w;
    }
    getCurrentWeight() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return new Promise(resolve => {
        Coherent.call('TOTAL_WEIGHT_GET').then(v => {
          if (!useLbs) {
            v /= 2.204623;
          }
          resolve(v);
        });
      });
    }
    setWeight(a) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      let useLbs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      let v = NaN;
      if (typeof a === 'number') {
        v = a;
      } else if (typeof a === 'string') {
        v = parseFloat(a);
      }
      if (isFinite(v)) {
        if (useLbs) {
          v = v / 2.204623;
        }
        if (isFinite(this.zeroFuelWeight)) {
          if (v - this.zeroFuelWeight > 0) {
            this.blockFuel = v - this.zeroFuelWeight;
            return callback(true);
          }
        } else {
          this.showErrorMessage('ZFW NOT SET');
          return callback(false);
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return callback(false);
    }
    async trySetTakeOffWeightLandingWeight(s) {
      let tow = NaN;
      let lw = NaN;
      if (s) {
        let sSplit = s.split('/');
        tow = parseFloat(sSplit[0]);
        lw = parseFloat(sSplit[1]);
      }
      if (isFinite(tow) || isFinite(lw)) {
        if (isFinite(tow)) {
          this.takeOffWeight = tow;
        }
        if (isFinite(lw)) {
          this.landingWeight = lw;
        }
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    async trySetAverageWind(s) {
      let value = parseFloat(s);
      if (isFinite(value)) {
        this.averageWind = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setPerfCrzWind(s) {
      let heading = NaN;
      let speed = NaN;
      if (s) {
        let sSplit = s.split('/');
        heading = parseFloat(sSplit[0]);
        speed = parseFloat(sSplit[1]);
      }
      if (isFinite(heading) && heading >= 0 && heading < 360 || isFinite(speed) && speed > 0) {
        if (isFinite(heading)) {
          this.perfCrzWindHeading = heading;
        }
        if (isFinite(speed)) {
          this.perfCrzWindSpeed = speed;
        }
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    trySetPreSelectedClimbSpeed(s) {
      let v = parseFloat(s);
      if (isFinite(v)) {
        this.preSelectedClbSpeed = v;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    trySetPreSelectedCruiseSpeed(s) {
      let v = parseFloat(s);
      if (isFinite(v)) {
        this.preSelectedCrzSpeed = v;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    trySetPreSelectedDescentSpeed(s) {
      let v = parseFloat(s);
      if (isFinite(v)) {
        this.preSelectedDesSpeed = v;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setPerfApprQNH(s) {
      let value = parseFloat(s);
      if (isFinite(value)) {
        this.perfApprQNH = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setPerfApprTemp(s) {
      let value = parseFloat(s);
      if (isFinite(value) && value > -270 && value < 150) {
        this.perfApprTemp = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setPerfApprWind(s) {
      let heading = NaN;
      let speed = NaN;
      if (s) {
        let sSplit = s.split('/');
        heading = parseFloat(sSplit[0]);
        speed = parseFloat(sSplit[1]);
      }
      if (isFinite(heading) && heading >= 0 && heading < 360 || isFinite(speed) && speed > 0) {
        if (isFinite(heading)) {
          this.perfApprWindHeading = heading;
        }
        if (isFinite(speed)) {
          this.perfApprWindSpeed = speed;
        }
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setPerfApprTransAlt(s) {
      let value = parseFloat(s);
      if (isFinite(value) && value > 0 && value < 60000) {
        this.perfApprTransAlt = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getVApp() {
      if (isFinite(this.vApp)) {
        return this.vApp;
      }
      let windComp = SimVar.GetSimVarValue('AIRCRAFT WIND Z', 'knots') / 3;
      windComp = Math.max(windComp, 5);
      return this.speedManager.getVLS(this.getWeight()) + windComp;
    }
    setPerfApprVApp(s) {
      if (s === BaseFMC.clrValue) {
        this.vApp = NaN;
      }
      let value = parseFloat(s);
      if (isFinite(value) && value > 0) {
        this.vApp = value;
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getVLS() {
      let flapsHandleIndex = Simplane.getFlapsHandleIndex();
      if (flapsHandleIndex === 4) {
        let dWeight = (this.getWeight() - 61.4) / (82.5 - 61.4);
        return 141 + 20 * dWeight;
      } else {
        let dWeight = (this.getWeight() - 61.4) / (82.5 - 61.4);
        return 146 + 21 * dWeight;
      }
    }
    setPerfApprMDA(s) {
      let value = parseFloat(s);
      if (isFinite(value)) {
        this.perfApprMDA = value;
        SimVar.SetSimVarValue('L:AIRLINER_MINIMUM_DESCENT_ALTITUDE', 'number', this.perfApprMDA).catch(console.error);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setPerfApprDH(s) {
      let value = parseFloat(s);
      if (isFinite(value)) {
        this.perfApprDH = value;
        SimVar.SetSimVarValue('L:AIRLINER_DECISION_HEIGHT', 'number', this.perfApprDH).catch(console.error);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getIsFlying() {
      return this.currentFlightPhase >= FlightPhase.FLIGHT_PHASE_TAKEOFF;
    }
    async tryGoInApproachPhase() {
      if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB) {
        this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_APPROACH;
        await Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO);
        return true;
      }
      if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
        this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_APPROACH;
        await Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO);
        return true;
      }
      if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_DESCENT) {
        this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_APPROACH;
        await Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO);
        return true;
      }
      if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_APPROACH) {
        return true;
      }
      return false;
    }
    checkUpdateFlightPhase() {
      let airSpeed = Simplane.getTrueSpeed();
      if (airSpeed > 10) {
        if (this.currentFlightPhase === 0) {
          this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_TAKEOFF;
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_TAKEOFF) {
          let enterClimbPhase = false;
          let agl = Simplane.getAltitude();
          let altValue = isFinite(this.thrustReductionAltitude) ? this.thrustReductionAltitude : 1500;
          if (agl > altValue) {
            this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_CLIMB;
            enterClimbPhase = true;
          }
          if (enterClimbPhase) {
            let origin = this.flightPlanManager.getOrigin();
            if (origin) {
              origin.altitudeWasReached = Simplane.getAltitude();
              origin.timeWasReached = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
              origin.fuelWasReached = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms') / 1000;
            }
          }
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB) {
          let altitude = SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet');
          let cruiseFlightLevel = this.cruiseFlightLevel * 100;
          if (isFinite(cruiseFlightLevel)) {
            if (altitude >= 0.96 * cruiseFlightLevel) {
              this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_CRUISE;
              Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO).catch(console.error);
            }
          }
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
          let altitude = SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet');
          let cruiseFlightLevel = this.cruiseFlightLevel * 100;
          if (isFinite(cruiseFlightLevel)) {
            if (altitude < 0.9 * cruiseFlightLevel) {
              this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_DESCENT;
              Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO).catch(console.error);
            }
            let destination = this.flightPlanManager.getDestination();
            if (destination) {
              let lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
              let long = Simplane.getCurrentLon();
              let planeLla = new LatLongAlt(lat, long);
              let dist = Avionics.Utils.computeGreatCircleDistance(destination.infos.coordinates, planeLla);
              if (dist < cruiseFlightLevel / 6076 * 20) {
                this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_DESCENT;
                Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO).catch(console.error);
              }
            }
          }
        }
        if (this.currentFlightPhase != FlightPhase.FLIGHT_PHASE_APPROACH) {
          if (this.flightPlanManager.decelWaypoint) {
            let lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
            let long = Simplane.getCurrentLon();
            let planeLla = new LatLongAlt(lat, long);
            let dist = Avionics.Utils.computeGreatCircleDistance(this.flightPlanManager.decelWaypoint.infos.coordinates, planeLla);
            if (dist < 3) {
              this.tryGoInApproachPhase().catch(console.error);
            }
          }
        }
        if (this.currentFlightPhase != FlightPhase.FLIGHT_PHASE_APPROACH) {
          let destination = this.flightPlanManager.getDestination();
          if (destination) {
            let lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
            let long = Simplane.getCurrentLon();
            let planeLla = new LatLongAlt(lat, long);
            let dist = Avionics.Utils.computeGreatCircleDistance(destination.infos.coordinates, planeLla);
            if (dist < 20) {
              this.tryGoInApproachPhase().catch(console.error);
            }
          }
        }
      }
      if (Simplane.getCurrentFlightPhase() != this.currentFlightPhase) {
        Simplane.setCurrentFlightPhase(this.currentFlightPhase);
        this.onFlightPhaseChanged();
      }
    }
    onFlightPhaseChanged() {}
    connectVorFrequency(_index, _freq) {
      if (_freq >= 108 && _freq <= 117.95 && RadioNav.isHz50Compliant(_freq)) {
        if (_index == 1) {
          SimVar.SetSimVarValue('L:FMC_VOR_FREQUENCY:1', 'Hz', _freq * 1000000).catch(console.error);
          if (!this.isRadioNavActive()) {
            this.radioNav.setVORActiveFrequency(1, _freq);
          }
        } else if (_index == 2) {
          SimVar.SetSimVarValue('L:FMC_VOR_FREQUENCY:2', 'Hz', _freq * 1000000).catch(console.error);
          if (!this.isRadioNavActive()) {
            this.radioNav.setVORActiveFrequency(2, _freq);
          }
        }
      }
      return false;
    }
    connectIlsFrequency(_freq) {
      if (_freq >= 108 && _freq <= 111.95 && RadioNav.isHz50Compliant(_freq)) {
        switch (this.radioNav.mode) {
          case NavMode.FOUR_SLOTS:
            {
              this.ilsFrequency = _freq;
              break;
            }
          case NavMode.TWO_SLOTS:
            {
              this.vor1Frequency = _freq;
              break;
            }
        }
        this.connectIls();
        return true;
      }
      return false;
    }
    connectIls() {
      if (this.isRadioNavActive()) {
        return;
      }
      if (this._lockConnectIls) {
        return;
      }
      this._lockConnectIls = true;
      this.requestCall(() => {
        this._lockConnectIls = false;
      }, 1000);
      switch (this.radioNav.mode) {
        case NavMode.FOUR_SLOTS:
          {
            if (Math.abs(this.radioNav.getILSActiveFrequency(1) - this.ilsFrequency) > 0.005) {
              this.radioNav.setILSActiveFrequency(1, this.ilsFrequency);
            }
            break;
          }
        case NavMode.TWO_SLOTS:
          {
            if (Math.abs(this.radioNav.getVORActiveFrequency(1) - this.vor1Frequency) > 0.005) {
              this.radioNav.setVORActiveFrequency(1, this.vor1Frequency);
            }
            break;
          }
        default:
          console.error('Unknown RadioNav operating mode');
          break;
      }
    }
    setIlsFrequency(s) {
      if (s === BaseFMC.clrValue) {
        this.ilsFrequency = 0;
        return true;
      }
      let v = parseFloat(s);
      if (isFinite(v)) {
        let freq = Math.round(v * 100) / 100;
        if (this.connectIlsFrequency(freq)) {
          return true;
        }
        this.showErrorMessage('OUT OF RANGE');
        return false;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    initRadioNav(_boot) {
      if (this.isPrimary) {
        {
          if (_boot) {
            this.vhf1Frequency = this.radioNav.getVHFActiveFrequency(this.instrumentIndex, 1);
            this.vhf2Frequency = this.radioNav.getVHFActiveFrequency(this.instrumentIndex, 2);
          } else {
            if (Math.abs(this.radioNav.getVHFActiveFrequency(this.instrumentIndex, 1) - this.vhf1Frequency) > 0.005) {
              this.radioNav.setVHFActiveFrequency(this.instrumentIndex, 1, this.vhf1Frequency);
            }
            if (Math.abs(this.radioNav.getVHFActiveFrequency(this.instrumentIndex, 2) - this.vhf2Frequency) > 0.005) {
              this.radioNav.setVHFActiveFrequency(this.instrumentIndex, 2, this.vhf2Frequency);
            }
          }
        }
        {
          if (Math.abs(this.radioNav.getVORActiveFrequency(1) - this.vor1Frequency) > 0.005) {
            this.radioNav.setVORActiveFrequency(1, this.vor1Frequency);
          }
          if (this.vor1Course >= 0) {
            SimVar.SetSimVarValue('K:VOR1_SET', 'number', this.vor1Course).catch(console.error);
          }
          this.connectIls();
        }
        {
          if (Math.abs(this.radioNav.getVORActiveFrequency(2) - this.vor2Frequency) > 0.005) {
            this.radioNav.setVORActiveFrequency(2, this.vor2Frequency);
          }
          if (this.vor2Course >= 0) {
            SimVar.SetSimVarValue('K:VOR2_SET', 'number', this.vor2Course).catch(console.error);
          }
          if (Math.abs(this.radioNav.getILSActiveFrequency(2) - 0) > 0.005) {
            this.radioNav.setILSActiveFrequency(2, 0);
          }
        }
        {
          if (_boot) {
            this.adf1Frequency = this.radioNav.getADFActiveFrequency(1);
            this.adf2Frequency = this.radioNav.getADFActiveFrequency(2);
          } else {
            if (Math.abs(this.radioNav.getADFActiveFrequency(1) - this.adf1Frequency) > 0.005) {
              SimVar.SetSimVarValue('K:ADF_ACTIVE_SET', 'Frequency ADF BCD32', Avionics.Utils.make_adf_bcd32(this.adf1Frequency * 1000)).then(() => {});
            }
            if (Math.abs(this.radioNav.getADFActiveFrequency(2) - this.adf2Frequency) > 0.005) {
              SimVar.SetSimVarValue('K:ADF2_ACTIVE_SET', 'Frequency ADF BCD32', Avionics.Utils.make_adf_bcd32(this.adf2Frequency * 1000)).then(() => {});
            }
          }
        }
        {
          if (_boot) {
            this.atc1Frequency = SimVar.GetSimVarValue('TRANSPONDER CODE:1', 'number');
          } else {
            if (this.atc1Frequency > 0) {
              SimVar.SetSimVarValue('K:XPNDR_SET', 'Frequency BCD16', Avionics.Utils.make_xpndr_bcd16(this.atc1Frequency)).catch(console.error);
            } else {
              this.atc1Frequency = SimVar.GetSimVarValue('TRANSPONDER CODE:1', 'number');
            }
          }
        }
      }
    }
    updateRadioNavState() {
      if (this.isPrimary) {
        let radioNavOn = this.isRadioNavActive();
        if (radioNavOn != this._radioNavOn) {
          this._radioNavOn = radioNavOn;
          if (!radioNavOn) {
            this.initRadioNav(false);
          }
          if (this.refreshPageCallback) {
            this.refreshPageCallback();
          }
        }
        let apNavIndex = 1;
        let gpsDriven = true;
        if (this.canSwitchToNav()) {
          let navid = 0;
          let ils = this.radioNav.getBestILSBeacon();
          if (ils.id > 0) {
            navid = ils.id;
          } else {
            let vor = this.radioNav.getBestVORBeacon();
            if (vor.id > 0) {
              navid = vor.id;
            }
          }
          if (navid > 0) {
            apNavIndex = navid;
            let hasFlightplan = Simplane.getAutopilotGPSActive();
            let apprCaptured = Simplane.getAutoPilotAPPRCaptured();
            if (apprCaptured || !hasFlightplan) {
              gpsDriven = false;
            }
          }
        }
        if (apNavIndex != this._apNavIndex) {
          Simplane.setAutoPilotSelectedNav(apNavIndex);
          this._apNavIndex = apNavIndex;
        }
        let curState = SimVar.GetSimVarValue('GPS DRIVES NAV1', 'Bool');
        if (curState != gpsDriven) {
          SimVar.SetSimVarValue('K:TOGGLE_GPS_DRIVES_NAV1', 'Bool', 0).catch(console.error);
        }
      }
    }
    canSwitchToNav() {
      if (!this._canSwitchToNav) {
        let altitude = Simplane.getAltitudeAboveGround();
        if (altitude >= 500) {
          this._canSwitchToNav = true;
        }
      }
      if (this._canSwitchToNav) {
        if (!this.needApproachToSwitchToNav) {
          return true;
        } else {
          let apprHold = SimVar.GetSimVarValue('AUTOPILOT APPROACH HOLD', 'Bool');
          if (apprHold) {
            return true;
          }
        }
      }
      return false;
    }
    isRadioNavActive() {
      return this.radioNav.getRADIONAVActive(this.isPrimary ? 1 : 2);
    }
    get vhf1Frequency() {
      return this._vhf1Frequency;
    }
    get vhf2Frequency() {
      return this._vhf2Frequency;
    }
    get vor1FrequencyIdent() {
      return this._vor1FrequencyIdent;
    }
    get vor1Frequency() {
      return this._vor1Frequency;
    }
    get vor1Course() {
      return this._vor1Course;
    }
    get vor2FrequencyIdent() {
      return this._vor2FrequencyIdent;
    }
    get vor2Frequency() {
      return this._vor2Frequency;
    }
    get vor2Course() {
      return this._vor2Course;
    }
    get ilsFrequencyIdent() {
      return this._ilsFrequencyIdent;
    }
    get ilsFrequency() {
      return this._ilsFrequency;
    }
    get ilsCourse() {
      return this._ilsCourse;
    }
    get adf1Frequency() {
      return this._adf1Frequency;
    }
    get adf2Frequency() {
      return this._adf2Frequency;
    }
    get rcl1Frequency() {
      return this._rcl1Frequency;
    }
    get pre2Frequency() {
      return this._pre2Frequency;
    }
    get pre1Frequency() {
      return this._pre1Frequency;
    }
    get atc1Frequency() {
      return this._atc1Frequency;
    }
    set vhf1Frequency(_frq) {
      this._vhf1Frequency = _frq;
    }
    set vhf2Frequency(_frq) {
      this._vhf2Frequency = _frq;
    }
    set vor1FrequencyIdent(_ident) {
      this._vor1FrequencyIdent = _ident;
      this.radioNav.setVORActiveIdent(1, _ident);
    }
    set vor1Frequency(_frq) {
      this._vor1Frequency = _frq;
      this.connectVorFrequency(1, _frq);
    }
    set vor1Course(_crs) {
      this._vor1Course = _crs;
    }
    set vor2FrequencyIdent(_ident) {
      this._vor2FrequencyIdent = _ident;
      this.radioNav.setVORActiveIdent(2, _ident);
    }
    set vor2Frequency(_frq) {
      this._vor2Frequency = _frq;
      this.connectVorFrequency(2, _frq);
    }
    set vor2Course(_crs) {
      this._vor2Course = _crs;
    }
    set ilsFrequencyIdent(_ident) {
      this._ilsFrequencyIdent = _ident;
      this.radioNav.setILSActiveIdent(1, _ident);
    }
    set ilsFrequency(_frq) {
      this._ilsFrequency = _frq;
    }
    set ilsCourse(_crs) {
      this._ilsCourse = _crs;
    }
    set adf1Frequency(_frq) {
      this._adf1Frequency = _frq;
    }
    set adf2Frequency(_frq) {
      this._adf2Frequency = _frq;
    }
    set rcl1Frequency(_frq) {
      this._rcl1Frequency = _frq;
    }
    set pre1Frequency(_frq) {
      this._pre1Frequency = _frq;
    }
    set pre2Frequency(_frq) {
      this._pre2Frequency = _frq;
    }
    set atc1Frequency(_frq) {
      this._atc1Frequency = _frq;
    }
    Init() {
      super.Init();
      this.dataManager = new FMCDataManager(this);
      this._speedRepository = new SpeedRepository.SpeedRepository();
      this._speedManager = new SpeedManager.SpeedManager(this._speedRepository, new SpeedCalculator());
      this.tempCurve = new Avionics.Curve();
      this.tempCurve.interpolationFunction = Avionics.CurveTool.NumberInterpolation;
      this.tempCurve.add(-10 * 3.28084, 21.50);
      this.tempCurve.add(0 * 3.28084, 15.00);
      this.tempCurve.add(10 * 3.28084, 8.50);
      this.tempCurve.add(20 * 3.28084, 2.00);
      this.tempCurve.add(30 * 3.28084, -4.49);
      this.tempCurve.add(40 * 3.28084, -10.98);
      this.tempCurve.add(50 * 3.28084, -17.47);
      this.tempCurve.add(60 * 3.28084, -23.96);
      this.tempCurve.add(70 * 3.28084, -30.45);
      this.tempCurve.add(80 * 3.28084, -36.94);
      this.tempCurve.add(90 * 3.28084, -43.42);
      this.tempCurve.add(100 * 3.28084, -49.90);
      this.tempCurve.add(150 * 3.28084, -56.50);
      this.tempCurve.add(200 * 3.28084, -56.50);
      this.tempCurve.add(250 * 3.28084, -51.60);
      this.tempCurve.add(300 * 3.28084, -46.64);
      this.tempCurve.add(400 * 3.28084, -22.80);
      this.tempCurve.add(500 * 3.28084, -2.5);
      this.tempCurve.add(600 * 3.28084, -26.13);
      this.tempCurve.add(700 * 3.28084, -53.57);
      this.tempCurve.add(800 * 3.28084, -74.51);
      let mainFrame = this.getChildById('Electricity');
      if (mainFrame == null) {
        mainFrame = this;
      }
      this.generateHTMLLayout(mainFrame);
      var cockpitSettings = SimVar.GetGameVarValue('', 'GlassCockpitSettings');
      this.takeOffSpeedsInfo = cockpitSettings.TakeOffSpeeds;
      this._titleElement = this.getChildById('title');
      this._pageCurrentElement = this.getChildById('page-current');
      this._pageCountElement = this.getChildById('page-count');

      //this._labelElements = [];
      this._labelElements.splice(0, this._labelElements.length);
      //this._lineElements = [];
      this._lineElements.splice(0, this._lineElements.length);
      for (let i = 0; i < 6; i++) {
        this._labelElements[i] = [this.getChildById('label-' + i + '-left'), this.getChildById('label-' + i + '-right'), this.getChildById('label-' + i + '-center')];
        this._lineElements[i] = [this.getChildById('line-' + i + '-left'), this.getChildById('line-' + i + '-right'), this.getChildById('line-' + i + '-center')];
      }
      this.onLetterInput = l => {
        if (this.inOut === BaseFMC.clrValue) {
          this.inOut = '';
        }
        if (this.isDisplayingErrorMessage) {
          this.inOut = this.lastUserInput;
          this.isDisplayingErrorMessage = false;
        }
        this.inOut += l;
      };
      this.onSp = () => {
        if (this.inOut === BaseFMC.clrValue) {
          this.inOut = '';
        }
        if (this.isDisplayingErrorMessage) {
          this.inOut = this.lastUserInput;
          this.isDisplayingErrorMessage = false;
        }
        this.inOut += ' ';
      };
      this.onDel = () => {
        if (this.inOut.length > 0) {
          this.inOut = this.inOut.slice(0, this.inOut.length - 1);
        }
      };
      this.onDiv = () => {
        if (this.inOut === BaseFMC.clrValue) {
          this.inOut = '';
        }
        if (this.isDisplayingErrorMessage) {
          this.inOut = this.lastUserInput;
          this.isDisplayingErrorMessage = false;
        }
        this.inOut += '/';
      };
      this.onClr = () => {
        if (this.inOut === '') {
          this.inOut = BaseFMC.clrValue;
        } else if (this.inOut === BaseFMC.clrValue) {
          this.inOut = '';
        } else {
          if (this.isDisplayingErrorMessage) {
            this.inOut = this.lastUserInput;
            this.isDisplayingErrorMessage = false;
          } else if (this.inOut.length > 0) {
            this.inOut = this.inOut.substr(0, this.inOut.length - 1);
          }
        }
      };
      this.onClrLong = () => {
        if (this.inOut === '') {
          this.inOut = BaseFMC.clrValue;
        } else if (this.inOut === BaseFMC.clrValue) {
          this.inOut = '';
        } else {
          if (this.isDisplayingErrorMessage) {
            this.inOut = this.lastUserInput;
            this.isDisplayingErrorMessage = false;
          } else if (this.inOut.length > 0) {
            this.inOut = '';
          }
        }
      };
      SimVar.SetSimVarValue('L:FLIGHTPLAN_USE_DECEL_WAYPOINT', 'number', 1).catch(console.error);
      SimVar.SetSimVarValue('L:AIRLINER_TO_FLEX_TEMP', 'Number', this.perfTOTemp).catch(console.error);
      SimVar.SetSimVarValue('L:FLIGHTPLAN_USE_DECEL_WAYPOINT', 'number', 1).catch(console.error);
      this.flightPlanManager.onCurrentGameFlightLoaded(() => {
        this.flightPlanManager.updateFlightPlan(() => {
          this.flightPlanManager.updateCurrentApproach(() => {
            this.onApproachUpdated();
            if (Simplane.getAltitude() > 1000) {
              if (this.flightPlanManager.getWaypoints().length === 2) {
                Coherent.call('GET_RUNWAY_ARRIVAL').then(runwayArrivalIndex => {
                  let destination = this.flightPlanManager.getDestination();
                  if (destination.infos instanceof AirportInfo) {
                    let runwayArrival = destination.infos.unsortedOneWayRunways[runwayArrivalIndex];
                    if (runwayArrival) {
                      let ilsApproachIndex = destination.infos.approaches.findIndex(approach => {
                        return approach.isLocalizer() && approach.name.indexOf(runwayArrival.designation) != -1;
                      });
                      if (ilsApproachIndex) {
                        this.setApproachIndex(ilsApproachIndex, () => {
                          this.insertTemporaryFlightPlan();
                        });
                      }
                    }
                  }
                });
              }
            }
          });
          if (this.flightPlanManager.getWaypoints().length > 0) {
            this.costIndex = 100;
          }
          this.onFMCFlightPlanLoaded();
          let callback = () => {
            this.flightPlanManager.createNewFlightPlan();
            let cruiseAlt = Math.floor(this.flightPlanManager.cruisingAltitude / 100);
            console.log('FlightPlan Cruise Override. Cruising at FL' + cruiseAlt + ' instead of default FL' + this.cruiseFlightLevel);
            if (cruiseAlt > 0) {
              this.cruiseFlightLevel = cruiseAlt;
            }
          };
          let arrivalIndex = this.flightPlanManager.getArrivalProcIndex();
          if (arrivalIndex >= 0) {
            this.flightPlanManager.setArrivalProcIndex(arrivalIndex, callback);
          } else {
            callback();
          }
          this.recalculateTHRRedAccTransAlt();
        });
      });
      this.recalculateTHRRedAccTransAlt();
      this._inOutElement = this.querySelector('#inOut-line-html');
      this._inOutRectElement = this.querySelector('#inOut-line');
      this.unfocusInOut();
      if (this.urlConfig.index === 1) {
        if (HeavyDivision.Configuration.isFocusableScratchpadEnabled()) {
          this.enableFocusableScratchpad();
        }
      }
    }
    enableFocusableScratchpad() {
      this.unfocusInOut(true);
      this._inOutRectElement.addEventListener('click', this._inOutClickEvent);
    }
    disableFocusableScratchpad() {
      this.unfocusInOut(true);
      this._inOutRectElement.removeEventListener('click', this._inOutClickEvent);
    }
    prepareInOutKeyEvents() {
      window.document.addEventListener('keydown', this._inOutKeyDownEvent);
    }
    unfocusInOut() {
      let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (force) {
        this._inOutRectElement.setAttribute('style', 'fill: black;');
        this._inOutFocused = false;
      }
      window.document.removeEventListener('keydown', this._inOutKeyDownEvent);
      Coherent.call('UNFOCUS_INPUT_FIELD');
    }
    inOutClickEvent() {
      this._inOutFocused = !this._inOutFocused;
      if (this._inOutFocused) {
        this.prepareInOutKeyEvents();
        Coherent.call('FOCUS_INPUT_FIELD');
        this._inOutRectElement.setAttribute('style', 'fill: red; fill-opacity: 0.2;');
      } else {
        this._inOutRectElement.setAttribute('style', 'fill: black;');
        this.unfocusInOut();
      }
    }
    inOutKeyDownEvent(event) {
      if (event.keyCode === 17) {
        this.unfocusInOut(true);
      }

      /**
       * Use event.keyCode (event.code is not supported by MSFS)
       */
      let keyHandler;
      const getKeyEvent = event => {
        const getKeyToExecute = () => {
          let key = {
            handleAsControlKey: false,
            code: undefined
          };
          /**
           * Control Keys
           * 46 - DELETE (DELETE)
           * 8 - CLEAR (BACKSPACE)
           * 32 - SPACE (SPACE)
           * 111 - SLASH (NUMERIC DIVIDE)
           * 191 - SLASH (GENERAL KEYS SLASH)
           */
          key.handleAsControlKey = [8, 32, 46, 111, 191].findIndex(value => {
            return value === event.keyCode;
          }) !== -1;
          if (key.handleAsControlKey) {
            key.code = event.keyCode;
            return key;
          }

          /**
           * Numeric keyboard handling
           */
          if (event.location === 3) {
            /**
             * Convert DECIMAL POINT to PERIOD
             */
            if (event.keyCode === 110) {
              key.code = 46;
            }

            /**
             * Convert NUMERIC numbers to GENERAL numbers
             */
            if (event.keyCode >= 96 && event.keyCode <= 105) {
              key.code = event.keyCode - 48;
            }
            return key;
          }

          /**
           * Is the key allowed in scratchpad
           */
          const isCapitalAlphabet = event.keyCode >= 65 && event.keyCode <= 90;
          const isSmallAlphabet = event.keyCode >= 97 && event.keyCode <= 122;
          const isNumber = event.keyCode >= 48 && event.keyCode <= 57;
          const isPeriod = event.keyCode === 190;
          if (isCapitalAlphabet || isSmallAlphabet || isNumber) {
            key.code = event.keyCode;
          } else if (isPeriod) {
            key.code = 46;
          }
          return key;
        };
        const key = getKeyToExecute();
        if (key.code === undefined) {
          /**
           * KeyCode is not allowed in scratchpad
           */
          return undefined;
        }
        if (key.handleAsControlKey) {
          const controlKeys = [{
            keyCode: 8,
            handler: this.onClr
          }, {
            keyCode: 32,
            handler: this.onSp
          }, {
            keyCode: 46,
            handler: this.onDel
          }, {
            keyCode: 111,
            handler: this.onDiv
          }, {
            keyCode: 191,
            handler: this.onDiv
          }];
          const controlKeyIndex = controlKeys.findIndex(controlKey => {
            return controlKey.keyCode === key.code;
          });
          if (controlKeyIndex !== -1) {
            return controlKeys[controlKeyIndex].handler;
          }
        }
        return () => {
          this.onLetterInput(String.fromCharCode(key.code));
        };
      };
      keyHandler = getKeyEvent(event);
      if (keyHandler !== undefined) {
        keyHandler();
      }
    }
    onApproachUpdated() {
      if (this._approachInitialized) {
        return;
      }
      let frequency = this.flightPlanManager.getApproachNavFrequency();
      if (isFinite(frequency)) {
        let freq = Math.round(frequency * 100) / 100;
        let approach = this.flightPlanManager.getApproach();
        if (approach && approach.name && approach.name.indexOf('ILS') != -1) {
          if (this.connectIlsFrequency(freq)) {
            SimVar.SetSimVarValue('L:FLIGHTPLAN_APPROACH_ILS', 'number', freq).catch(console.error);
            let runway = this.flightPlanManager.getApproachRunway();
            if (runway) {
              SimVar.SetSimVarValue('L:FLIGHTPLAN_APPROACH_COURSE', 'number', runway.direction).catch(console.error);
            }
          }
        } else {
          console.log('FMCMainDisplay - Frequency is a VOR FREQUENCY');
          this.vor1Frequency = freq;
        }
        this._approachInitialized = true;
      }
    }
    onFMCFlightPlanLoaded() {}
    recalculateTHRRedAccTransAlt() {
      let origin = this.flightPlanManager.getOrigin();
      if (origin) {
        if (isFinite(origin.altitudeinFP)) {
          let altitude = Math.round(origin.altitudeinFP / 10) * 10;
          this.thrustReductionAltitude = altitude + 1500;
          this.accelerationAltitude = altitude + 1500;
          if (origin.infos instanceof AirportInfo) {
            this.transitionAltitude = origin.infos.transitionAltitude;
          }
          SimVar.SetSimVarValue('L:AIRLINER_THR_RED_ALT', 'Number', this.thrustReductionAltitude).catch(console.error);
          SimVar.SetSimVarValue('L:AIRLINER_ACC_ALT', 'Number', this.accelerationAltitude).catch(console.error);
        }
      }
      let destination = this.flightPlanManager.getDestination();
      if (destination) {
        if (destination.infos instanceof AirportInfo) {
          this.perfApprTransAlt = destination.infos.transitionAltitude;
        }
      }
    }
    onPowerOn() {
      super.onPowerOn();
      this.updateFuelVars().catch(console.error);
      let gpsDriven = SimVar.GetSimVarValue('GPS DRIVES NAV1', 'Bool');
      if (!gpsDriven) {
        SimVar.SetSimVarValue('K:TOGGLE_GPS_DRIVES_NAV1', 'Bool', 0).catch(console.error);
      }
      this._canSwitchToNav = false;
      this.initRadioNav(true);
    }
    onShutDown() {
      super.onShutDown();
      this.speedManager.clearVSpeeds();
    }
    getFuelVarsUpdatedGrossWeight() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!useLbs) {
        return this._fuelVarsUpdatedGrossWeight;
      }
      return this._fuelVarsUpdatedGrossWeight * 2.204623;
    }
    getFuelVarsUpdatedTripCons() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!useLbs) {
        return this._fuelVarsUpdatedTripCons;
      }
      return this._fuelVarsUpdatedTripCons * 2.204623;
    }
    updateFuelVars() {
      return new Promise(resolve => {
        this.getCurrentWeight().then(w => {
          let grossWeight = w / 1000;
          if (Math.floor(this._fuelVarsUpdatedGrossWeight) != Math.floor(grossWeight)) {
            this._fuelVarsUpdatedGrossWeight = grossWeight;
            this.blockFuel = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms') / 1000;
            this.zeroFuelWeight = this._fuelVarsUpdatedGrossWeight - this.blockFuel;
            this.zeroFuelWeightMassCenter = SimVar.GetSimVarValue('CG PERCENT', 'percent');
            let waypointsNumber = SimVar.GetSimVarValue('C:fs9gps:FlightPlanWaypointsNumber', 'number', this.instrumentIdentifier);
            if (waypointsNumber > 1) {
              SimVar.SetSimVarValue('C:fs9gps:FlightPlanWaypointIndex', 'number', waypointsNumber - 1).then(() => {
                this._fuelVarsUpdatedTripCons = SimVar.GetSimVarValue('C:fs9gps:FlightPlanWaypointEstimatedFuelConsumption', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms') / 1000;
              });
              resolve();
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        });
      });
    }
    onUpdate(_deltaTime) {
      super.onUpdate(_deltaTime);
      if (this._debug++ > 180) {
        this._debug = 0;
      }
      this.checkUpdateFlightPhase();
      this._checkFlightPlan--;
      if (this._checkFlightPlan <= 0) {
        this._checkFlightPlan = 60;
        this.flightPlanManager.updateFlightPlan();
        this.flightPlanManager.updateCurrentApproach(() => {
          this.onApproachUpdated();
        });
      }
      this._checkUpdateFuel -= _deltaTime / 1000;
      if (this._checkUpdateFuel <= 0) {
        this._checkUpdateFuel = 5;
        this.updateFuelVars().catch(console.error);
      }
      if (this.pageUpdate) {
        this.pageUpdate();
      }
      if (Simplane.getCurrentPage() === 1) {
        Simplane.setCurrentPage(0);
        if (this.refreshPageCallback) {
          this.refreshPageCallback();
        }
      }
      if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_APPROACH) {
        SimVar.SetSimVarValue('L:AIRLINER_MANAGED_APPROACH_SPEED', 'number', this.speedManager.getManagedApproachSpeed()).catch(console.error);
      }
      this.updateRadioNavState();
      this.updateHUDAirspeedColors();
    }
    updateHUDAirspeedColors() {}
    onEvent(_event) {
      if (_event.indexOf('1_BTN_') !== -1 || _event.indexOf('BTN_') !== -1) {
        let input = _event.replace('1_BTN_', '').replace('BTN_', '');
        if (this.onInputAircraftSpecific(input)) {
          return;
        }
        if (input === 'INIT') {
          if (this.onInit) {
            this.onInit();
          }
        } else if (input === 'DEPARR') {
          if (this.onDepArr) {
            this.onDepArr();
          }
        } else if (input === 'ATC') {
          if (this.onAtc) {
            this.onAtc();
          }
        } else if (input === 'FIX') {
          if (this.onFix) {
            this.onFix();
          }
        } else if (input === 'HOLD') {
          if (this.onHold) {
            this.onHold();
          }
        } else if (input === 'FMCCOMM') {
          if (this.onFmcComm) {
            this.onFmcComm();
          }
        } else if (input === 'PROG') {
          if (this.onProg) {
            this.onProg();
          }
        } else if (input === 'MENU') {
          if (this.onMenu) {
            this.onMenu();
          }
        } else if (input === 'NAVRAD') {
          if (this.onRad) {
            this.onRad();
          }
        } else if (input === 'PREVPAGE') {
          if (this.onPrevPage) {
            this.onPrevPage();
          }
        } else if (input === 'NEXTPAGE') {
          if (this.onNextPage) {
            this.onNextPage();
          }
        } else if (input === 'SP') {
          this.onSp();
        } else if (input === 'DEL') {
          this.onDel();
        } else if (input === 'CLR') {
          this.onClr();
        } else if (input === 'CLR_Long') {
          if (this.onClrLong) {
            this.onClrLong();
          }
        } else if (input === 'DIV') {
          this.onDiv();
        } else if (input === 'DOT') {
          this.inOut += '.';
        } else if (input === 'PLUSMINUS') {
          this.inOut += '-';
        } else if (input === 'Localizer') {
          this._apLocalizerOn = !this._apLocalizerOn;
        } else if (input.length === 2 && input[0] === 'L') {
          let v = parseInt(input[1]);
          if (isFinite(v)) {
            if (this.onLeftInput[v - 1]) {
              this.onLeftInput[v - 1]();
            }
          }
        } else if (input.length === 2 && input[0] === 'R') {
          let v = parseInt(input[1]);
          if (isFinite(v)) {
            if (this.onRightInput[v - 1]) {
              this.onRightInput[v - 1]();
            }
          }
        } else if (input.length === 1 && BaseFMC._AvailableKeys.indexOf(input) !== -1) {
          this.onLetterInput(input);
        } else {
          console.log('\'' + input + '\'');
        }
      }
    }
    clearDisplay() {
      return;
    }
    generateHTMLLayout(parent) {
      while (parent.children.length > 0) {
        parent.removeChild(parent.children[0]);
      }
      let header = document.createElement('div');
      header.id = 'header';
      let title = document.createElement('span');
      title.id = 'title';
      header.appendChild(title);
      parent.appendChild(header);
      let page = document.createElement('div');
      page.id = 'page-info';
      page.classList.add('s-text');
      let pageCurrent = document.createElement('span');
      pageCurrent.id = 'page-current';
      let pageSlash = document.createElement('span');
      pageSlash.id = 'page-slash';
      diffAndSetText(pageSlash, '/');
      let pageCount = document.createElement('span');
      pageCount.id = 'page-count';
      page.appendChild(pageCurrent);
      page.appendChild(pageSlash);
      page.appendChild(pageCount);
      parent.appendChild(page);
      for (let i = 0; i < 6; i++) {
        let label = document.createElement('div');
        label.classList.add('label', 's-text');
        let labelLeft = document.createElement('span');
        labelLeft.id = 'label-' + i + '-left';
        labelLeft.classList.add('fmc-block', 'label', 'label-left');
        let labelRight = document.createElement('span');
        labelRight.id = 'label-' + i + '-right';
        labelRight.classList.add('fmc-block', 'label', 'label-right');
        let labelCenter = document.createElement('span');
        labelCenter.id = 'label-' + i + '-center';
        labelCenter.classList.add('fmc-block', 'label', 'label-center');
        label.appendChild(labelLeft);
        label.appendChild(labelRight);
        label.appendChild(labelCenter);
        parent.appendChild(label);
        let line = document.createElement('div');
        line.classList.add('line');
        let lineLeft = document.createElement('span');
        lineLeft.id = 'line-' + i + '-left';
        lineLeft.classList.add('fmc-block', 'line', 'line-left');
        let lineRight = document.createElement('span');
        lineRight.id = 'line-' + i + '-right';
        lineRight.classList.add('fmc-block', 'line', 'line-right');
        let lineCenter = document.createElement('span');
        lineCenter.id = 'line-' + i + '-center';
        lineCenter.classList.add('fmc-block', 'line', 'line-center');
        line.appendChild(lineLeft);
        line.appendChild(lineRight);
        line.appendChild(lineCenter);
        parent.appendChild(line);
      }
      let footer = document.createElement('div');
      footer.classList.add('line');
      let inout = document.createElement('span');
      inout.id = 'in-out';
      footer.appendChild(inout);
      parent.appendChild(footer);
    }
    static secondsTohhmm(seconds) {
      let h = Math.floor(seconds / 3600);
      seconds -= h * 3600;
      let m = Math.floor(seconds / 60);
      return fastToFixed(h, 0).padStart(2, '0') + fastToFixed(m, 0).padStart(2, '0');
    }
    static hhmmToSeconds(hhmm) {
      if (!hhmm) {
        return NaN;
      }
      let h = parseInt(hhmm.substring(0, 2));
      let m = parseInt(hhmm.substring(2, 4));
      return h * 3600 + m * 60;
    }
    setAPSelectedSpeed(_speed, _aircraft) {
      if (isFinite(_speed)) {
        if (Simplane.getAutoPilotMachModeActive()) {
          let mach = SimVar.GetGameVarValue('FROM KIAS TO MACH', 'number', _speed);
          Coherent.call('AP_MACH_VAR_SET', 1, mach).catch(console.error);
          SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_ON', 'number', 1).catch(console.error);
          return;
        }
        Coherent.call('AP_SPD_VAR_SET', 1, _speed).catch(console.error);
        SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_OFF', 'number', 1).catch(console.error);
      }
    }
    setAPManagedSpeed(_speed, _aircraft) {
      if (isFinite(_speed)) {
        if (Simplane.getAutoPilotMachModeActive()) {
          let mach = SimVar.GetGameVarValue('FROM KIAS TO MACH', 'number', _speed);
          let cruiseMach = SimVar.GetGameVarValue('AIRCRAFT CRUISE MACH', 'mach');
          mach = Math.min(mach, cruiseMach);
          Coherent.call('AP_MACH_VAR_SET', 2, mach).catch(console.error);
          SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_ON', 'number', 1).catch(console.error);
          return;
        }
        Coherent.call('AP_SPD_VAR_SET', 2, _speed).catch(console.error);
        SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_OFF', 'number', 1).catch(console.error);
      }
    }
    computeETA(distance) {
      let speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      let currentTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      if (isNaN(speed)) {
        speed = Simplane.getGroundSpeed();
      }
      if (speed < 10) {
        return NaN;
      }
      if (isNaN(currentTime)) {
        currentTime = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
      }
      let eteSeconds = distance / speed * 3600;
      let etaSeconds = currentTime + eteSeconds;
      etaSeconds = etaSeconds % 86400;
      return etaSeconds;
    }
    computeFuelLeft(distance) {
      let speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      let currentFuel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      let currentFuelFlow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NaN;
      if (isNaN(speed)) {
        speed = Simplane.getGroundSpeed();
      }
      if (speed < 10) {
        return NaN;
      }
      if (isNaN(currentFuel)) {
        currentFuel = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms') / 1000;
      }
      if (isNaN(currentFuelFlow)) {
        currentFuelFlow = SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:1', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:2', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:3', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:4', 'pound per hour');
        currentFuelFlow = currentFuelFlow / 1000 / 2.204623;
      }
      let time = distance / speed;
      let fuel = currentFuelFlow * time;
      return currentFuel - fuel;
    }
    setAPSpeedHoldMode() {
      if (!Simplane.getAutoPilotMachModeActive()) {
        if (!SimVar.GetSimVarValue('AUTOPILOT AIRSPEED HOLD', 'Boolean')) {
          SimVar.SetSimVarValue('K:AP_PANEL_SPEED_HOLD', 'Number', 1).catch(console.error);
          console.log('Activating SPEED HOLD (Knots)');
        }
      } else {
        if (!SimVar.GetSimVarValue('AUTOPILOT MACH HOLD', 'Boolean')) {
          SimVar.SetSimVarValue('K:AP_PANEL_MACH_HOLD', 'Number', 1).catch(console.error);
          console.log('Activating SPEED HOLD (Mach)');
        }
      }
    }
  }
  _defineProperty(BaseFMC, "approachTypes", ['UNKNOWN', 'VFR', 'HEL', 'TACAN', 'NDB', 'LORAN', 'RNAV', 'VOR', 'GPS', 'SDF', 'LDA', 'LOC', 'MLS', 'ILS']);
  _defineProperty(BaseFMC, "clrValue", ' CLR ');
  _defineProperty(BaseFMC, "_AvailableKeys", 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

  class B777_FMC_TakeOffRefPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      B777_FMC_TakeOffRefPage._timer = 0;
      fmc.pageUpdate = () => {
        B777_FMC_TakeOffRefPage._timer++;
        if (B777_FMC_TakeOffRefPage._timer >= 15) {
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        }
      };
      let v1 = '□□□';
      if (fmc.speedManager.repository.v1Speed) {
        v1 = fmc.makeSettable(String(fmc.speedManager.repository.v1Speed)) + 'KT';
      } else {
        v1 = fmc.makeSettable(v1);
      }
      fmc._renderer.rsk(1).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (value === BaseFMC.clrValue) {
          fmc.trySetV1Speed(undefined);
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        } else if (value === '') {
          const [runway, weight, flaps] = this.takeOffSetting(fmc);
          const computedSpeed = fmc.speedManager.getComputedV1Speed(runway, weight, flaps);
          fmc.speedManager.setV1Speed(computedSpeed, true);
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        } else {
          if (fmc.trySetV1Speed(value)) {
            B777_FMC_TakeOffRefPage.ShowPage1(fmc);
          }
        }
      };
      let vR = '□□□';
      if (fmc.speedManager.repository.vRSpeed) {
        vR = fmc.makeSettable(String(fmc.speedManager.repository.vRSpeed)) + 'KT';
      } else {
        vR = fmc.makeSettable(vR);
      }
      fmc._renderer.rsk(2).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (value === BaseFMC.clrValue) {
          fmc.trySetVRSpeed(undefined);
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        } else if (value === '') {
          const [runway, weight, flaps] = this.takeOffSetting(fmc);
          const computedSpeed = fmc.speedManager.getComputedVRSpeed(runway, weight, flaps);
          fmc.speedManager.setVRSpeed(computedSpeed, true);
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        } else {
          if (fmc.trySetVRSpeed(value)) {
            B777_FMC_TakeOffRefPage.ShowPage1(fmc);
          }
        }
      };
      let v2 = '□□□';
      if (fmc.speedManager.repository.v2Speed) {
        v2 = fmc.makeSettable(String(fmc.speedManager.repository.v2Speed)) + 'KT';
      } else {
        v2 = fmc.makeSettable(v2);
      }
      fmc._renderer.rsk(3).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (value === BaseFMC.clrValue) {
          fmc.trySetV2Speed(undefined);
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        } else if (value === '') {
          const [runway, weight, flaps] = this.takeOffSetting(fmc);
          const computedSpeed = fmc.speedManager.getComputedV2Speed(runway, weight, flaps);
          fmc.speedManager.setV2Speed(computedSpeed, true);
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        } else {
          if (fmc.trySetV2Speed(value)) {
            B777_FMC_TakeOffRefPage.ShowPage1(fmc);
          }
        }
      };
      let selectedTempCell;
      let selectedTemp = fmc.getThrustTakeOffTemp();
      if (selectedTemp) {
        selectedTempCell = fmc.makeSettable(String(selectedTemp));
      } else {
        selectedTempCell = fmc.makeSettable('--');
      }
      selectedTempCell = selectedTempCell + '°';
      let thrustTOMode = fmc.getThrustTakeOffMode();
      if (thrustTOMode === 0) {
        selectedTempCell += ' ' + (selectedTemp ? 'D-TO' : 'TO');
      } else if (thrustTOMode === 1) {
        selectedTempCell += ' ' + (selectedTemp ? 'D-TO 1' : 'TO 1');
      } else if (thrustTOMode === 2) {
        selectedTempCell += ' ' + (selectedTemp ? 'D-TO 2' : 'TO 2');
      }
      fmc._renderer.lsk(2).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (value === 'DELETE') {
          SimVar.SetSimVarValue('L:B77RS_THRUST_ASSUMED_TEMPERATURE', 'Number', -1000);
          SimVar.SetSimVarValue('H:B777_MFD_1_TAKEOFF_MODES_UPDATED', 'Number', 1);
          SimVar.SetSimVarValue('H:B777_MFD_2_TAKEOFF_MODES_UPDATED', 'Number', 1);
          fmc._thrustTakeOffTemp = NaN;
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
          return;
        }
        if (fmc.setThrustTakeOffTemp(value)) {
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        }
      };
      let flapsCell = '---';
      let flapsAngle = fmc.getTakeOffFlap();
      if (isFinite(flapsAngle) && flapsAngle >= 0) {
        flapsCell = fastToFixed(flapsAngle, 0);
      } else {
        flapsCell = '□□';
      }
      flapsCell = fmc.makeSettable(flapsCell);
      flapsCell = flapsCell + '°';
      fmc._renderer.lsk(1).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (fmc.setTakeOffFlap(value)) {
          B777_FMC_TakeOffRefPage.ShowPage1(fmc);
        }
      };
      let runwayCell = '---';
      let selectedRunway = fmc.flightPlanManager.getDepartureRunway();
      if (selectedRunway) {
        runwayCell = 'RW' + Avionics.Utils.formatRunway(selectedRunway.designation);
      }
      runwayCell = fmc.makeSettable(runwayCell);
      let cgCell = '--%';
      if (isFinite(fmc.zeroFuelWeightMassCenter)) {
        cgCell = fmc.zeroFuelWeightMassCenter.toFixed(1) + "%";
      }
      let trimCell = '-.--';
      if (isFinite(fmc.takeOffTrim)) {
        trimCell = fmc.takeOffTrim.toFixed(2);
      }
      if (fmc.flightPlanManager.getOrigin()) {
        fmc._renderer.lsk(4).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          fmc.setOriginRunway(value, result => {
            if (result) {
              B777_FMC_TakeOffRefPage.ShowPage1(fmc);
            }
          });
        };
      }
      const useImperial = HeavyDivision.Configuration.useImperial();
      let grWtCell = '□□□.□';
      if (isFinite(fmc.getFuelVarsUpdatedGrossWeight(useImperial))) {
        grWtCell = fmc.getFuelVarsUpdatedGrossWeight(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
      }
      let separator = '__FMCSEPARATOR';
      if (!fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished && !fmc.dataHolder.preFlightDataHolder.takeOff.completed) {
        separator = '--------------------------------------PRE-FLT';
      }
      fmc._renderer.renderTitle('TAKEOFF REF');
      fmc._renderer.renderPages(1, 2);
      fmc._renderer.render([['FLAPS', 'V1'], [flapsCell, v1], ['THRUST', 'VR'], [selectedTempCell, vR], ['CG TRIM', 'V2'], [cgCell + '  ' + trimCell, v2], ['RUNWAY POS', '', 'GR WT', 'TOGW'], [runwayCell + '/----', '', grWtCell, ''], ['TAKEOFF DATA', ''], ['<REQUEST', '', ''], ['', separator, ''], ['<INDEX', 'THRUST LIM>']]);
      if (fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished) {
        let fmsPreFlightElementGroup = document.querySelector('#fms-preflight');
        fmsPreFlightElementGroup.setAttribute('visibility', 'visible');
      }
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc.onPrevPage = () => {
        B777_FMC_TakeOffRefPage.ShowPage2(fmc);
      };
      fmc.onNextPage = () => {
        B777_FMC_TakeOffRefPage.ShowPage2(fmc);
      };
    }
    static ShowPage2(fmc) {
      fmc.cleanUpPage();
      B777_FMC_TakeOffRefPage._timer = 0;
      fmc.pageUpdate = () => {
        B777_FMC_TakeOffRefPage._timer++;
        if (B777_FMC_TakeOffRefPage._timer >= 15) {
          B777_FMC_TakeOffRefPage.ShowPage2(fmc);
        }
      };
      let accelHtCell = '';
      if (isFinite(fmc._speedDirector.accelerationSpeedRestriction.accelerationHeight)) {
        accelHtCell = fastToFixed(fmc._speedDirector.accelerationSpeedRestriction.accelerationHeight);
      } else {
        accelHtCell = '---';
      }
      accelHtCell = fmc.makeSettable(accelHtCell);
      accelHtCell = accelHtCell + 'FT';
      fmc._renderer.rsk(2).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (fmc.trySetAccelerationHeight(value)) {
          B777_FMC_TakeOffRefPage.ShowPage2(fmc);
        }
      };
      let thrRedCell = '';
      if (isFinite(fmc.thrustReductionHeight)) {
        thrRedCell = fmc.thrustReductionHeight.toFixed(0);
      } else {
        thrRedCell = '---';
      }
      thrRedCell = fmc.makeSettable(thrRedCell);
      thrRedCell = thrRedCell + 'FT';
      fmc._renderer.rsk(3).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (fmc.trySetThrustReductionHeight(value)) {
          B777_FMC_TakeOffRefPage.ShowPage2(fmc);
        }
      };
      fmc._renderer.renderTitle('TAKEOFF REF');
      fmc._renderer.renderPages(2, 2);
      fmc._renderer.render([['', 'EO ACCEL HT'], ['', '1500FT'], ['', 'ACCEL HT'], ['', accelHtCell], ['WIND', 'THR REDUCTION'], ['000°/0KT', thrRedCell], ['RWY WIND', 'LIM TOGW'], ['0KTH 9KTR', ''], ['SLOPE/COND', 'REF OAT'], ['U0.0/DRY', '', ''], ['__FMCSEPARATOR'], ['<INDEX', 'THRUST LIM>']]);
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc.onPrevPage = () => {
        B777_FMC_TakeOffRefPage.ShowPage1(fmc);
      };
      fmc.onNextPage = () => {
        B777_FMC_TakeOffRefPage.ShowPage1(fmc);
      };
    }
    static takeOffSetting(fmc) {
      let runway = fmc.flightPlanManager.getDepartureRunway();
      if (!runway) {
        runway = fmc.flightPlanManager.getDetectedCurrentRunway();
      }
      const flaps = fmc.getTakeOffFlap();
      const weight = fmc.getWeight(true);
      return [runway, weight, flaps];
    }
  }
  _defineProperty(B777_FMC_TakeOffRefPage, "_timer", 0);

  class B777_FMC_ThrustLimPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      B777_FMC_ThrustLimPage._updateCounter = 0;
      fmc.pageUpdate = () => {
        if (B777_FMC_ThrustLimPage._updateCounter >= 50) {
          B777_FMC_ThrustLimPage.ShowPage1(fmc);
        } else {
          B777_FMC_ThrustLimPage._updateCounter++;
        }
      };
      fmc.refreshPageCallback = () => {
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      let selectedTempCell;
      let selectedTemp = fmc.getThrustTakeOffTemp();
      if (selectedTemp) {
        selectedTempCell = fmc.makeSettable(String(selectedTemp));
      } else {
        selectedTempCell = fmc.makeSettable('--');
      }
      selectedTempCell = selectedTempCell + '°';
      fmc._renderer.lsk(1).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();

        /**
         * TODO: USE DELETE const instead???
         */
        if (value === 'DELETE') {
          SimVar.SetSimVarValue('L:B77RS_THRUST_ASSUMED_TEMPERATURE', 'Number', -1000);
          SimVar.SetSimVarValue('H:B777_MFD_1_TAKEOFF_MODES_UPDATED', 'Number', 1);
          SimVar.SetSimVarValue('H:B777_MFD_2_TAKEOFF_MODES_UPDATED', 'Number', 1);
          fmc._thrustTakeOffTemp = NaN;
          B777_FMC_ThrustLimPage.ShowPage1(fmc);
        } else if (value === '') {
          let origin = fmc.flightPlanManager.getOrigin();
          if (origin) {
            let oatValue = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
            let elevation = Math.round(parseFloat(origin.infos.oneWayRunways[0].elevation) * 3.28);
            let assumendTemp = Math.round((15 - elevation / 1000 * 1.98 + oatValue) * 1.25 - 1);
            if (fmc.setThrustTakeOffTemp(assumendTemp)) {
              B777_FMC_ThrustLimPage.ShowPage1(fmc);
            }
          }
        } else {
          if (fmc.setThrustTakeOffTemp(value)) {
            B777_FMC_ThrustLimPage.ShowPage1(fmc);
          }
        }
      };
      let toN1Cell = fastToFixed(fmc.getThrustTakeOffLimit(), 1) + '%';
      let oatValue = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
      let oatCell = fastToFixed(oatValue, 1) + '°';
      let thrustTOMode = fmc.getThrustTakeOffMode();
      let thrustClimbMode = fmc.getThrustCLBMode();
      fmc._renderer.lsk(2).event = () => {
        fmc.setThrustTakeOffMode(0);
        fmc.setThrustCLBMode(0);
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(3).event = () => {
        fmc.setThrustTakeOffMode(1);
        fmc.setThrustCLBMode(1);
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(4).event = () => {
        fmc.setThrustTakeOffMode(2);
        fmc.setThrustCLBMode(2);
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(2).event = () => {
        fmc.setThrustCLBMode(0);
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(3).event = () => {
        fmc.setThrustCLBMode(1);
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(4).event = () => {
        fmc.setThrustCLBMode(2);
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      let toN1CellTitle;
      switch (thrustTOMode) {
        case 0:
          toN1CellTitle = 'TO N1';
          break;
        case 1:
          toN1CellTitle = 'TO 1 N1';
          break;
        case 2:
          toN1CellTitle = 'TO 2 N1';
          break;
        default:
          toN1CellTitle = 'TO N1';
      }
      let thrustClimbModeCell0 = '';
      let thrustClimbModeCell1 = '';
      let thrustClimbModeCell2 = '';
      switch (thrustClimbMode) {
        case 0:
          thrustClimbModeCell0 = fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB ? '<SEL>' : '<ARM>';
          break;
        case 1:
          thrustClimbModeCell1 = fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB ? '<SEL>' : '<ARM>';
          break;
        case 2:
          thrustClimbModeCell2 = fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB ? '<SEL>' : '<ARM>';
          break;
        default:
          toN1CellTitle = 'TO N1';
      }
      let separator = '__FMCSEPARATOR';
      if (!fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished && !fmc.dataHolder.preFlightDataHolder.thrustLim.completed) {
        separator = '--------------------------------------PRE-FLT';
      }
      fmc._renderer.renderTitle('THRUST LIM');
      fmc._renderer.render([['SEL/OAT', toN1CellTitle], [selectedTempCell + '[size=medium-size]C[/size]/' + oatCell + '[size=medium-size]C[/size]', toN1Cell], [''], ['<TO', thrustTOMode === 0 ? '<SEL>' : '', thrustClimbModeCell0, 'CLB>'], ['TO 1'], ['<-10%', thrustTOMode === 1 ? '<SEL>' : '', thrustClimbModeCell1, 'CLB 1>'], ['TO 2'], ['<-20%', thrustTOMode === 2 ? '<SEL>' : '', thrustClimbModeCell2, 'CLB 2>'], [''], [''],
      //['<TO-B'],
      ['', separator, ''], ['<INDEX', 'TAKEOFF>']]);

      /**
       * TODO: Really want to have these low level things here??
       */
      if (fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished) {
        let fmsPreFlightElementGroup = document.querySelector('#fms-preflight');
        fmsPreFlightElementGroup.setAttribute('visibility', 'visible');
      }
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_TakeOffRefPage.ShowPage1(fmc);
      };
    }
  }
  _defineProperty(B777_FMC_ThrustLimPage, "_updateCounter", 0);

  class B777_FMC_ApproachPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      let landingWeightCell = '';
      let flaps20Cell = '';
      let flaps25Cell = '';
      let flaps30Cell = '';
      let flaps20VRefCell = '';
      let flaps25VRefCell = '';
      let flaps30VRefCell = '';
      const useImperial = HeavyDivision.Configuration.useImperial();
      let landingWeight = fmc.getWeight(useImperial);
      if (isFinite(landingWeight)) {
        landingWeightCell = landingWeight.toFixed(1);
        flaps20Cell = '20°';
        flaps25Cell = '25°';
        flaps30Cell = '30°';
        let flaps20Speed = fmc.speedManager.getVRef(7);
        if (isFinite(flaps20Speed)) {
          flaps20VRefCell = flaps20Speed.toFixed(0) + 'KT';
          fmc._renderer.rsk(1).event = () => {
            fmc.inOut = '20/' + flaps20Speed.toFixed(0);
          };
        }
        let flaps25Speed = fmc.speedManager.getVRef(8);
        if (isFinite(flaps25Speed)) {
          flaps25VRefCell = flaps25Speed.toFixed(0) + 'KT';
          fmc._renderer.rsk(2).event = () => {
            fmc.inOut = '25/' + flaps25Speed.toFixed(0);
          };
        }
        let flaps30Speed = fmc.speedManager.getVRef(9);
        if (isFinite(flaps30Speed)) {
          flaps30VRefCell = flaps30Speed.toFixed(0) + 'KT';
          fmc._renderer.rsk(3).event = () => {
            fmc.inOut = '30/' + flaps30Speed.toFixed(0);
          };
        }
      }
      let finalCell = '-----';
      let runwayLengthCell = '---';
      let approach = fmc.flightPlanManager.getApproach();
      if (approach && approach.name) {
        finalCell = Avionics.Utils.formatRunway(approach.name);
        let approachRunway = fmc.flightPlanManager.getApproachRunway();
        if (approachRunway) {
          runwayLengthCell = approachRunway.length.toFixed(0) + "M";
        }
      }
      let selectedFlapSpeedCell = '';
      if (isFinite(fmc.selectedApproachFlap)) {
        selectedFlapSpeedCell = fmc.selectedApproachFlap.toFixed(0) + "°";
      } else {
        selectedFlapSpeedCell = "---";
      }
      selectedFlapSpeedCell += "/ ";
      if (isFinite(fmc.selectedApproachSpeed)) {
        selectedFlapSpeedCell += fmc.selectedApproachSpeed.toFixed(0) + "KT";
      } else {
        selectedFlapSpeedCell += "---";
      }
      let destination = fmc.flightPlanManager.getDestination();
      if (destination && destination.ident) {
        finalCell = destination.ident + ' ';
      }
      if (approach && approach.name) {
        if (finalCell === '-----') {
          finalCell = '';
        }
        finalCell = finalCell + Avionics.Utils.formatRunway(approach.name);
        let approachRunway = fmc.flightPlanManager.getApproachRunway();
        if (approachRunway) {
          runwayLengthCell = ' ' + (approachRunway.length * 3.2808399).toFixed(0) + 'FT ' + approachRunway.length.toFixed(0) + 'M';
        }
      }
      if (isFinite(fmc.selectedApproachFlap)) {
        selectedFlapSpeedCell = fmc.selectedApproachFlap.toFixed(0) + '°';
      } else {
        selectedFlapSpeedCell = '---';
      }
      selectedFlapSpeedCell += '/ ';
      if (isFinite(fmc.selectedApproachSpeed)) {
        selectedFlapSpeedCell += fmc.selectedApproachSpeed.toFixed(0) + 'KT';
      } else {
        selectedFlapSpeedCell += '---';
      }
      fmc._renderer.rsk(4).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (fmc.setSelectedApproachFlapAndVREFSpeed(value)) {
          B777_FMC_ApproachPage.ShowPage1(fmc);
        }
      };
      fmc._renderer.renderTitle('APPROACH REF');
      fmc._renderer.render([['GROSS WT', '', 'FLAPS', 'VREF'], [landingWeightCell, '', flaps20Cell, flaps20VRefCell], [''], ['', '', flaps25Cell, flaps25VRefCell], ['LANDING REF'], ['<[size=small]QFE[/size]←→[color=green]QNH[/color]', '', flaps30Cell, flaps30VRefCell], [finalCell, 'FLAP/SPD'], [runwayLengthCell, selectedFlapSpeedCell], [''], [''], ['__FMCSEPARATOR'], ['<INDEX', 'THRUST LIM>']]);
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
    }
  }

  class B777_FMC_MaintPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      fmc._renderer.renderTitle('MAINT');
      fmc._renderer.render([[''], [''], [''], [''], [''], [''], [''], [''], [''], [''], [''], ['<INDEX']]);
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_InitRefIndexPage.ShowPage1(fmc);
      };
    }
  }

  class B777_FMC_InitRefIndexPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      fmc._renderer.renderTitle('INIT/REF INDEX');
      fmc._renderer.render([[''], ['<IDENT', 'NAV DATA>'], [''], ['<POS', 'ALTN>'], [''], ['<PERF', 'FMC COMM>'], [''], ['<THRUST LIM'], [''], ['<TAKEOFF'], [''], ['<APPROACH', 'MAINT>']]);
      fmc._renderer.lsk(1).event = () => {
        B777_FMC_IdentPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(2).event = () => {
        B777_FMC_PosInitPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(3).event = () => {
        B777_FMC_PerfInitPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(4).event = () => {
        B777_FMC_ThrustLimPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(5).event = () => {
        B777_FMC_TakeOffRefPage.ShowPage1(fmc);
      };
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_ApproachPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_MaintPage.ShowPage1(fmc);
      };
    }
  }

  class B777_FMC_PerfInitPage {
    static ShowPage1(fmc) {
      fmc.updateFuelVars().then(() => {
        fmc.cleanUpPage();
        const useImperial = HeavyDivision.Configuration.useImperial();
        B777_FMC_PerfInitPage._timer = 0;
        fmc.pageUpdate = () => {
          B777_FMC_PerfInitPage._timer++;
          if (B777_FMC_PerfInitPage._timer >= 15) {
            B777_FMC_PerfInitPage.ShowPage1(fmc);
          }
        };
        let grWtCell = '□□□.□';
        if (isFinite(fmc.getFuelVarsUpdatedGrossWeight(useImperial))) {
          grWtCell = fmc.getFuelVarsUpdatedGrossWeight(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
        }
        let crzAltCell = '□□□□□';
        if (fmc.cruiseFlightLevel) {
          crzAltCell = 'FL' + fmc.cruiseFlightLevel;
        }
        fmc._renderer.rsk(1).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          if (fmc.setCruiseFlightLevelAndTemperature(value)) {
            B777_FMC_PerfInitPage.ShowPage1(fmc);
          }
        };
        let fuelCell = '□□□.□';
        if (fmc.getBlockFuel(useImperial)) {
          fuelCell = fmc.getBlockFuel(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
        }
        let zfwCell = '□□□.□';
        if (fmc.getZeroFuelWeight(useImperial)) {
          zfwCell = fmc.getZeroFuelWeight(useImperial).toFixed(1) + (useImperial ? ' lb' : ' kg');
        }
        fmc._renderer.lsk(3).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          fmc.setZeroFuelWeight(Number(value), result => {
            if (result) {
              B777_FMC_PerfInitPage.ShowPage1(fmc);
            }
          }, useImperial);
        };
        let crzCGCell = '21.00%';
        if (fmc.zeroFuelWeightMassCenter) {
          crzCGCell = fmc.zeroFuelWeightMassCenter.toFixed(1) + '%';
        }
        fmc._renderer.rsk(4).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          fmc.setZeroFuelCG(value, result => {
            if (result) {
              B777_FMC_PerfInitPage.ShowPage1(fmc);
            }
          });
        };
        let costIndexCell = '□□□□';
        if (isFinite(fmc.costIndex)) {
          costIndexCell = fmc.costIndex.toFixed(0);
        }
        fmc._renderer.rsk(2).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          if (fmc.tryUpdateCostIndex(Number(value), 10000)) {
            B777_FMC_PerfInitPage.ShowPage1(fmc);
          }
        };
        let reservesCell = '□□□.□';
        let reserves = fmc.getFuelReserves(useImperial);
        if (isFinite(reserves)) {
          reservesCell = reserves.toFixed(1) + (useImperial ? ' lb' : ' kg');
        }
        fmc._renderer.lsk(4).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          if (fmc.setFuelReserves(Number(value), useImperial)) {
            B777_FMC_PerfInitPage.ShowPage1(fmc);
          }
        };
        let stepSizeCell = 'RVSM';
        let separator = '__FMCSEPARATOR';
        if (!fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished && !fmc.dataHolder.preFlightDataHolder.perfInit.completed) {
          separator = '--------------------------------------PRE-FLT';
        }
        fmc._renderer.renderTitle('PERF INIT');
        fmc._renderer.render([['GR WT', 'CRZ ALT'], [grWtCell, fmc.makeSettable(crzAltCell)], ['FUEL', 'COST INDEX'], [fuelCell, fmc.makeSettable(costIndexCell)], ['ZFW', 'MIN FUEL TEMP'], [fmc.makeSettable(zfwCell), '-37°c'], ['RESERVES', 'CRZ CG'], [fmc.makeSettable(reservesCell), fmc.makeSettable(crzCGCell)], ['DATA LINK', 'STEP SIZE'], ['NO COMM', stepSizeCell], ['', separator, ''], ['<INDEX', 'THRUST LIM>']]);
        if (fmc.dataHolder.preFlightDataHolder.completed && !fmc.dataHolder.preFlightDataHolder.finished) {
          let fmsPreFlightElementGroup = document.querySelector('#fms-preflight');
          fmsPreFlightElementGroup.setAttribute('visibility', 'visible');
        }
        fmc._renderer.lsk(6).event = () => {
          B777_FMC_InitRefIndexPage.ShowPage1(fmc);
        };
        fmc._renderer.rsk(6).event = () => {
          B777_FMC_ThrustLimPage.ShowPage1(fmc);
        };
      });
    }
  }
  _defineProperty(B777_FMC_PerfInitPage, "_timer", 0);

  let RoutePageInstance = undefined;
  class B777_FMC_RoutePage {
    constructor(fmc) {
      _defineProperty(this, "_fmc", void 0);
      _defineProperty(this, "_isDirty", void 0);
      _defineProperty(this, "_currentPage", void 0);
      _defineProperty(this, "_pageCount", void 0);
      _defineProperty(this, "_offset", void 0);
      _defineProperty(this, "_fplnVersion", void 0);
      _defineProperty(this, "_activeWptIndex", void 0);
      _defineProperty(this, "_lsk6Field", void 0);
      _defineProperty(this, "_activateCell", void 0);
      _defineProperty(this, "_modStr", void 0);
      _defineProperty(this, "_originCell", void 0);
      _defineProperty(this, "_destinationCell", void 0);
      _defineProperty(this, "_distanceCell", void 0);
      _defineProperty(this, "_flightNoCell", void 0);
      _defineProperty(this, "_coRouteCell", void 0);
      _defineProperty(this, "_airwayInput", void 0);
      _defineProperty(this, "_airwayIndex", void 0);
      _defineProperty(this, "_rows", void 0);
      _defineProperty(this, "_depRwyCell", void 0);
      this._fmc = fmc;
      this._isDirty = true;
      this._currentPage = 0;
      this._pageCount = 2;
      this._offset = 0;
      this._fplnVersion = -1;
      this._activeWptIndex = -1;
      this._lsk6Field = '';
      this._activateCell = '';
      this._originCell;
      this._destinationCell;
      this._distanceCell;
      this._flightNoCell;
      this._coRouteCell;
      this._airwayInput = '';
      this._rows = [];
    }
    set currentPage(value) {
      this._currentPage = value;
      if (this._currentPage > this._pageCount - 1) {
        this._currentPage = 0;
      } else if (this._currentPage < 0) {
        this._currentPage = this._pageCount - 1;
      }
      if (this._currentPage == 0) {
        this._offset = 0;
      } else {
        this._offset = (this._currentPage - 1) * 5 + 1;
      }
    }
    gotoNextPage() {
      this.currentPage = this._currentPage + 1;
      this.update(true);
    }
    gotoPrevPage() {
      this.currentPage = this._currentPage - 1;
      this.update(true);
    }
    update() {
      let forceUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // check if active wpt changed
      const actWptIndex = this._fmc.flightPlanManager.getActiveWaypointIndex();
      if (this._activeWptIndex != actWptIndex) {
        this._activeWptIndex = actWptIndex;
        this._isDirty = true;
      }
      if (this._isDirty || forceUpdate) {
        this.invalidate();
      }

      // register refresh and bind to update which will only render on changes
      this._fmc.registerPeriodicPageRefresh(() => {
        this.update();
        return true;
      }, 1000, false);
    }
    invalidate() {
      this._isDirty = true;
      this._fmc.cleanUpPage();
      this.prerender();
      this.render();
      this.bindEvents();
      this._isDirty = false;
    }
    prerender() {
      const currentFp = this._fmc.flightPlanManager.getCurrentFlightPlan();
      if (this._currentPage == 0) {
        this._originCell = '□□□□';
        if (currentFp.hasOrigin) {
          this._originCell = this._fmc.flightPlanManager.getOrigin().ident;
        }
        this._originCell = this._fmc.makeSettable(this._originCell);
        this._destinationCell = '□□□□';
        if (currentFp.hasDestination) {
          this._destinationCell = this._fmc.flightPlanManager.getDestination().ident;
        }
        this._destinationCell = this._fmc.makeSettable(this._destinationCell);
        this._distanceCell = '----';
        if (currentFp.hasDestination && currentFp.hasOrigin) {
          this._distanceCell = Avionics.Utils.computeGreatCircleDistance(this._fmc.flightPlanManager.getOrigin().infos.coordinates, this._fmc.flightPlanManager.getDestination().infos.coordinates).toFixed(0);
        }
        this._flightNoCell = '--------';
        const flightNoValue = SimVar.GetSimVarValue('ATC FLIGHT NUMBER', 'string');
        if (flightNoValue) {
          this._flightNoCell = flightNoValue;
        }
        this._flightNoCell = this._fmc.makeSettable(this._flightNoCell);
        this._depRwyCell = '-----';
        const selectedDepRunway = this._fmc.flightPlanManager.getDepartureRunway();
        if (selectedDepRunway) {
          this._depRwyCell = 'RW' + selectedDepRunway.designation;
        }
        this._depRwyCell = this._fmc.makeSettable(this._depRwyCell);
        this._coRouteCell = '--------';
        if (this._fmc.coRoute) {
          this._coRouteCell = this._fmc.coRoute;
        }
        this._coRouteCell = this._fmc.makeSettable(this._coRouteCell);
      }
      if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
        if (!this._fmc._isMainRouteActivated) {
          this._fmc.fpHasChanged = true;
          this._lsk6Field = '<ERASE';
          this._activateCell = 'ACTIVATE>';
        } else {
          this._fmc.fpHasChanged = true;
          this._activateCell = 'PERF INIT>';
          this._lsk6Field = '<ERASE';
        }
      } else if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 0) {
        this._fmc.fpHasChanged = false;
        this._activateCell = 'PERF INIT>';
        this._lsk6Field = '<RTE 2';
      }
      const currFplnVer = SimVar.GetSimVarValue(FlightPlanManager.FlightPlanVersionKey, 'number');
      if (this._fmc.fpHasChanged === true || this._fplnVersion < currFplnVer) {
        this._rows = B777_FMC_RoutePage._GetAllRows(this._fmc);
        this._fplnVersion = currFplnVer;
        // fill in empty row
        const emptyRow = new FpRow();
        const prevRow = this._rows[this._rows.length - 1];
        if (prevRow !== undefined) {
          if (this._airwayInput !== '') {
            emptyRow.airwayIn = this._airwayInput;
            emptyRow.fpIdx = this._airwayIndex;
            const idx = this._rows.findIndex(x => x.fpIdx === this._airwayIndex) + 1;
            this._rows.splice(idx, 0, emptyRow);
          } else {
            emptyRow.fpIdx = prevRow.fpIdx + 2;
            this._rows.push(emptyRow);
          }
        } else {
          let emptyFixIndex = 1;
          const firstFix = this._fmc.flightPlanManager.getWaypoint(emptyFixIndex);
          if (firstFix && firstFix.isRunway) {
            emptyFixIndex++;
          }
          emptyRow.fpIdx = emptyFixIndex;
          this._rows.push(emptyRow);
        }
      }
      this._pageCount = Math.max(2, Math.ceil(this._rows.length / 5) + 1);
      this._modStr = this._fmc.fpHasChanged ? 'MOD' : 'ACT';
    }
    render() {
      if (this._currentPage == 0) {
        this.renderMainPage();
      } else {
        this.renderRoutePage();
      }
    }
    renderMainPage() {
      this._fmc._renderer.renderTitle('RTE 1');
      this._fmc._renderer.renderPages(1, this._pageCount);
      this._fmc._renderer.render([['ORIGIN', 'DEST'], [this._originCell, this._destinationCell], ['RUNWAY', 'FLT NO'], [this._depRwyCell, this._flightNoCell], ['ROUTE', 'CO ROUTE'], ['<REQUEST', this._coRouteCell], ['ROUTE'], ['<REPORT', 'RTE COPY>'], ['', 'ROUTE ---------------------------------------', ''], ['<PRINT', 'ALTN>'], [''], [this._lsk6Field, this._activateCell]]);
    }
    renderRoutePage() {
      const idx = this._offset - 1;
      this._fmc._renderer.renderTitle(this._modStr + ' RTE 1');
      this._fmc._renderer.renderPages(this._currentPage + 1, this._pageCount);
      this._fmc._renderer.render([['VIA', 'TO'], this._rows[idx] ? this._rows[idx].getTemplate(this._fmc)[0] : [''], this._rows[idx] ? this._rows[idx].getTemplate(this._fmc)[1] : [''], this._rows[idx + 1] ? this._rows[idx + 1].getTemplate(this._fmc)[0] : [''], this._rows[idx + 1] ? this._rows[idx + 1].getTemplate(this._fmc)[1] : [''], this._rows[idx + 2] ? this._rows[idx + 2].getTemplate(this._fmc)[0] : [''], this._rows[idx + 2] ? this._rows[idx + 2].getTemplate(this._fmc)[1] : [''], this._rows[idx + 3] ? this._rows[idx + 3].getTemplate(this._fmc)[0] : [''], this._rows[idx + 3] ? this._rows[idx + 3].getTemplate(this._fmc)[1] : [''], this._rows[idx + 4] ? this._rows[idx + 4].getTemplate(this._fmc)[0] : [''], ['__FMCSEPARATOR'], [this._lsk6Field, this._activateCell]]);
    }
    bindEvents() {
      if (this._currentPage == 0) {
        // main page
        this._fmc._renderer.lsk(1).event = () => {
          const value = this._fmc.inOut;
          if (value == '') {
            if (this._fmc.flightPlanManager.getOrigin()) {
              this._fmc.inOut = this._fmc.flightPlanManager.getOrigin().ident;
            }
          } else {
            if (Simplane.getIsGrounded()) {
              if (this._fmc.currentFlightPhase <= FlightPhase.FLIGHT_PHASE_CLIMB) {
                this._fmc.clearUserInput();
                this.setOrigin(value.padEnd(4));
              } else {
                this._fmc.clearUserInput();
                /*
                 this._fmc.prepareForTurnAround(() => {
                 this.setOrigin(value.padEnd(4));
                 });
                 */
              }
            }
          }
        };

        this._fmc._renderer.rsk(1).event = () => {
          const value = this._fmc.inOut;
          if (value == '') {
            if (this._fmc.flightPlanManager.getDestination()) {
              this._fmc.inOut = this._fmc.flightPlanManager.getDestination().ident;
            }
          } else {
            this._fmc.clearUserInput();
            this.setDestination(value.padEnd(4));
          }
        };
        if (this._fmc.flightPlanManager.getOrigin()) {
          this._fmc._renderer.lsk(2).event = () => {
            let value = this._fmc.inOut;
            this._fmc.clearUserInput();
            this._fmc.setOriginRunway(value, result => {
              if (result) {
                this.update(true);
              }
            });
          };
        }
        this._fmc._renderer.rsk(2).event = () => {
          const value = this._fmc.inOut;
          this._fmc.clearUserInput();
          this._fmc.updateFlightNo(value, result => {
            if (result) {
              this.update(true);
            }
          });
        };
        if (HeavyDataStorage.get('SIMBRIEF_USERNAME') || HeavyDataStorage.get('SIMBRIEF_USERID')) {
          this._fmc._renderer.lsk(3).event = () => {
            new B777_FMC_RouteRequestPage(this._fmc).showPage();
          };
        }
      } else {
        // other pages
        for (let i = 0; i < 5; i++) {
          if (this._rows[i + this._offset - 1]) {
            this.bindRowEvents(i);
          }
        }
      }

      // paging
      this._fmc.onPrevPage = () => {
        this.gotoPrevPage();
      };
      this._fmc.onNextPage = () => {
        this.gotoNextPage();
      };

      // exec stuff
      this._fmc._renderer.lsk(6).event = () => {
        if (this._lsk6Field === '<ERASE') {
          if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
            this._airwayInput = '';
            this._airwayIndex = -1;
            this._fmc.fpHasChanged = false;
            this._fmc.eraseTemporaryFlightPlan(() => {
              this._fmc.eraseRouteModifications();
              /**
               * TODO: Check for better approach
               */
              this._fmc.flightPlanManager._updateFlightPlanVersion();
              this.update(true);
            });
          }
        }
      };
      this._fmc._renderer.rsk(6).event = () => {
        if (this._activateCell === 'PERF INIT>') {
          B777_FMC_PerfInitPage.ShowPage1(this._fmc);
        } else if (this._activateCell === 'ACTIVATE>') {
          this._fmc.activateMainRoute();
          this.update(true);
        }
      };
      this._fmc.onExecPage = () => {
        if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
          this._airwayInput = '';
          this._airwayIndex = -1;
          if (!this._fmc.getIsRouteActivated()) {
            this._fmc.activateRoute();
          }
          this._fmc.refreshPageCallback = () => this.update(true); // TODO see why this would be needed
          this._fmc.onExecDefault();
        } else {
          this._fmc._isRouteActivated = false;
          this._fmc.fpHasChanged = false;
          this._fmc._activatingDirectTo = false;
        }
      };
    }

    /**
     * Bind the LSK events to a plan row.
     * @param {Number} lskIdx
     */
    bindRowEvents(lskIdx) {
      if (this._currentPage > 0) {
        this._fmc._renderer.lsk(lskIdx + 1).event = () => {
          const value = this._fmc.inOut;
          this._fmc.clearUserInput();
          this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
            const idx = lskIdx;
            //const lastWpIdx = this._rows[idx + this._offset - 1].fpIdx;
            /**
             * Hotfix
             */
            const lastWpIdx = this._rows[idx + this._offset - 2].fpIdx;
            const lastWaypoint = this._fmc.flightPlanManager.getWaypoints()[lastWpIdx];
            if (lastWaypoint.infos instanceof WayPointInfo) {
              lastWaypoint.infos.UpdateAirway(value).then(() => {
                const airway = lastWaypoint.infos.airways.find(a => {
                  return a.name === value;
                });
                if (airway) {
                  this._airwayInput = airway.name;
                  this._airwayIndex = lastWpIdx;
                  this.update(true);
                } else {
                  this._fmc.showErrorMessage('NO AIRWAY MATCH');
                }
              });
            }
          });
        };
      }
      this._fmc._renderer.rsk(lskIdx + 1).event = () => {
        const value = this._fmc.inOut;
        const idx = this._currentPage > 0 ? lskIdx - 1 : 0;
        const row = this._rows[idx + this._offset];
        const wpIdx = row.fpIdx;
        if (value === BaseFMC.clrValue) {
          this._fmc.clearUserInput();
          if (row.isDeparture) {
            this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
              this._fmc.removeDeparture();
              this._fmc.activateRoute(false, () => {
                this.update(true);
              });
            });
          } else {
            this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
              const waypoints = this._fmc.flightPlanManager.getWaypoints();
              const current = waypoints[wpIdx];
              const currentIn = current.infos.airwayIn;
              if (currentIn !== undefined) {
                const currentOut = current.infos.airwayOut;
                let numberOfWaypointsToDelete = 0;
                for (let i = wpIdx - 1; i > 0; i--) {
                  if (waypoints[i].infos.airwayIn === currentIn || waypoints[i].infos.airwayOut === currentOut) {
                    numberOfWaypointsToDelete++;
                  } else {
                    break;
                  }
                }
                const startIndex = wpIdx - numberOfWaypointsToDelete;
                for (let i = 0; i <= numberOfWaypointsToDelete; i++) {
                  const last = i === numberOfWaypointsToDelete;
                  this._fmc.removeWaypoint(startIndex, () => {
                    if (last) {
                      this._fmc.activateRoute(false, () => {
                        this.update(true);
                      });
                    }
                  });
                }
              } else {
                this._fmc.removeWaypoint(wpIdx, () => {
                  this._fmc.activateRoute(false, () => {
                    this.update(true);
                  });
                });
              }
            });
          }
        } else if (value.length > 0) {
          this._fmc.clearUserInput();
          if (this._airwayInput !== '') {
            this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
              this._fmc.getOrSelectWaypointByIdent(value, wpt => {
                if (!wpt) {
                  this._fmc.showErrorMessage('NOT IN DATABASE');
                }
                const lastWpIdx = this._rows[idx + this._offset - 1].fpIdx;
                const lastWaypoint = this._fmc.flightPlanManager.getWaypoints()[lastWpIdx];
                lastWaypoint.infos.airwayOut = this._airwayInput;
                B777_FMC_RoutePage.insertWaypointsAlongAirway(this._fmc, wpt.ident, lastWpIdx, this._airwayInput, result => {
                  if (result) {
                    this._airwayInput = '';
                    this._airwayIndex = -1;
                    // console.log("added " + wpt.ident);
                    this.update(true);
                  } else {
                    this._fmc.showErrorMessage('NOT ON AIRWAY');
                  }
                });
              });
            });
          } else {
            const pilotWaypoint = this._fmc._pilotWaypoints._pilotWaypointArray.find(w => w.id == value);
            if (pilotWaypoint) {
              const pilotWaypointObject = CJ4_FMC_PilotWaypointParser.buildPilotWaypointFromExisting(pilotWaypoint.id, parseFloat(pilotWaypoint.la), parseFloat(pilotWaypoint.lo), this._fmc);
              this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                this._fmc.flightPlanManager.addUserWaypoint(pilotWaypointObject, wpIdx, () => {
                  this._fmc.activateRoute(false, () => {
                    this.update(true);
                  });
                });
              });
            } else {
              this._fmc.insertWaypoint(value, wpIdx, isSuccess => {
                if (isSuccess) {
                  this.update(true);
                }
              });
            }
          }
        } else ;
      };
    }
    setDestination(icao) {
      this._fmc.updateRouteDestination(icao, result => {
        if (result) {
          this._fmc.flightPlanManager.setApproachTransitionIndex(-1, () => {
            this._fmc.flightPlanManager.setArrivalProcIndex(-1, () => {
              this._fmc.flightPlanManager.setApproachIndex(-1, () => {
                this._fmc.fpHasChanged = true;
                this.update(true);
              });
            });
          });
        }
      });
    }
    setOrigin(icao) {
      if (!SimVar.GetSimVarValue('SIM ON GROUND', 'boolean')) {
        this._fmc.showErrorMessage('NOT ON GROUND');
        return;
      }
      this._fmc.tmpDestination = undefined;
      this._fmc.flightPlanManager.createNewFlightPlan(() => {
        this._fmc.updateRouteOrigin(icao, result => {
          if (result) {
            this._fmc.fpHasChanged = true;
            SimVar.SetSimVarValue('L:WT_CJ4_INHIBIT_SEQUENCE', 'number', 0);
            //this._fmc.updateVSpeeds();
            this._fmc.updateFuelVars();
            this.update(true);
          }
        });
      });
    }
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      RoutePageInstance = new B777_FMC_RoutePage(fmc);
      RoutePageInstance.update();
    }
    static async insertWaypointsAlongAirway(fmc, lastWaypointIdent, index, airwayName) {
      let callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : EmptyCallback.Boolean;
      const referenceWaypoint = fmc.flightPlanManager.getWaypoint(index);
      if (referenceWaypoint) {
        const infos = referenceWaypoint.infos;
        if (infos instanceof WayPointInfo) {
          const airway = infos.airways.find(a => {
            return a.name === airwayName;
          });
          if (airway) {
            const firstIndex = airway.icaos.indexOf(referenceWaypoint.icao);
            const lastWaypointIcao = airway.icaos.find(icao => icao.substring(7, 12) === lastWaypointIdent.padEnd(5, ' '));
            const lastIndex = airway.icaos.indexOf(lastWaypointIcao);
            if (firstIndex >= 0) {
              if (lastIndex >= 0) {
                let inc = 1;
                if (lastIndex < firstIndex) {
                  inc = -1;
                }
                const count = Math.abs(lastIndex - firstIndex);
                for (let i = 1; i < count + 1; i++) {
                  // 9 -> 6
                  const syncInsertWaypointByIcao = async (icao, idx) => {
                    return new Promise(resolve => {
                      //console.log('add icao:' + icao + ' @ ' + idx);
                      fmc.flightPlanManager.addWaypoint(icao, idx, () => {
                        const waypoint = fmc.flightPlanManager.getWaypoint(idx);
                        waypoint.infos.UpdateAirway(airwayName).then(() => {
                          waypoint.infos.airwayIn = airwayName;
                          if (i < count) {
                            waypoint.infos.airwayOut = airwayName;
                          }
                          //console.log('icao:' + icao + ' added; Airway in: ' + waypoint.infos.airwayIn + '; Airway out: ' + waypoint.infos.airwayOut);
                          resolve();
                        });
                      });
                    });
                  };
                  await syncInsertWaypointByIcao(airway.icaos[firstIndex + i * inc], index + i);
                }
                callback(true);
                return;
              }
              fmc.showErrorMessage('2ND INDEX NOT FOUND');
              return callback(false);
            }
            fmc.showErrorMessage('1ST INDEX NOT FOUND');
            return callback(false);
          }
          fmc.showErrorMessage('NO REF WAYPOINT');
          return callback(false);
        }
        fmc.showErrorMessage('NO WAYPOINT INFOS');
        return callback(false);
      }
      fmc.showErrorMessage('NO REF WAYPOINT');
      return callback(false);
    }
    static _GetAllRows(fmc) {
      const allRows = [];
      const flightPlanManager = fmc.flightPlanManager;
      let lastDepartureWaypoint = undefined;
      let foundActive = false; // haaaaackyyy
      let departure = undefined;
      let departureWaypoints = undefined;
      if (flightPlanManager) {
        /**
         * Departure
         */

        departure = flightPlanManager.getDeparture();
        if (departure) {
          departureWaypoints = flightPlanManager.getDepartureWaypointsMap();
          const lastDepartureIdx = departureWaypoints.length - 1;
          lastDepartureWaypoint = departureWaypoints[lastDepartureIdx];
          if (lastDepartureWaypoint) {
            foundActive = flightPlanManager.getActiveWaypointIndex() <= lastDepartureIdx;
            allRows.push(new FpRow(lastDepartureWaypoint.ident, lastDepartureIdx + 1, departure.name, undefined, foundActive, true));
          }
        }

        /**
         * Enroute
         */
        const fpIndexes = [];
        const routeWaypoints = flightPlanManager.getEnRouteWaypoints(fpIndexes);
        let tmpFoundActive = false;
        for (let i = 0; i < routeWaypoints.length; i++) {
          let prev = undefined;
          if (i == 0 && lastDepartureWaypoint) {
            prev = lastDepartureWaypoint;
          } else {
            prev = routeWaypoints[i - 1];
          }
          const wp = routeWaypoints[i];
          if (wp) {
            tmpFoundActive = tmpFoundActive || !foundActive && flightPlanManager.getActiveWaypointIndex() <= fpIndexes[i];
            if (tmpFoundActive) {
              foundActive = true;
            }
            if (wp.infos.airwayIn !== undefined && prev && prev.infos.airwayOut === wp.infos.airwayIn) {
              // is there a next waypoint?
              const nextWp = routeWaypoints[i + 1];
              if (nextWp) {
                const airwayContinues = wp.infos.airwayIn === wp.infos.airwayOut && nextWp.infos.airwayIn === wp.infos.airwayOut;
                if (airwayContinues) {
                  continue;
                }
              }
              allRows.push(new FpRow(wp.ident, fpIndexes[i], wp.infos.airwayIn, wp.infos.airwayOut, tmpFoundActive));
              tmpFoundActive = false;
            } else {
              allRows.push(new FpRow(wp.ident, fpIndexes[i], undefined, wp.infos.airwayOut, tmpFoundActive));
              tmpFoundActive = false;
            }
          }
        }

        /** @type {ManagedFlightPlan} */
        const fpln = flightPlanManager.getCurrentFlightPlan();
        const arrivalSeg = fpln.getSegment(SegmentType.Arrival);
        if (arrivalSeg !== FlightPlanSegment.Empty) {
          const arrival = flightPlanManager.getArrival();
          const currentWaypointIndex = fpln.activeWaypointIndex;
          if (arrival) {
            const transitionIndex = fpln.procedureDetails.arrivalTransitionIndex;
            const transition = arrival.enRouteTransitions[transitionIndex];
            const arrivalName = transitionIndex !== -1 && transition ? "".concat(transition.name, ".").concat(arrival.name) : "".concat(arrival.name);
            const finalFix = arrivalSeg.waypoints[arrivalSeg.waypoints.length - 1];
            const isSegmentActive = currentWaypointIndex >= arrivalSeg.offset && currentWaypointIndex < arrivalSeg.offset + arrivalSeg.waypoints.length;
            allRows.push(new FpRow(finalFix ? finalFix.ident : '', arrivalSeg.offset, arrivalName, undefined, isSegmentActive));
          }
        }

        /** @type {FlightPlanSegment} */
        const approachSeg = fpln.getSegment(SegmentType.Approach);
        if (approachSeg !== FlightPlanSegment.Empty) {
          // first app fix
          const fWp = approachSeg.waypoints[0];
          const fFpIdx = approachSeg.offset;
          let tmpFoundActive = !foundActive && flightPlanManager.getActiveWaypointIndex() <= fFpIdx;
          if (tmpFoundActive) {
            foundActive = true;
          }
          allRows.push(new FpRow(fWp.ident, fFpIdx, undefined, undefined, tmpFoundActive));

          // last app fix
          let appName = flightPlanManager.getAirportApproach() !== undefined ? flightPlanManager.getAirportApproach().name : 'APP';
          appName = "".concat(allRows[allRows.length - 1].ident, ".").concat(appName);
          const wp = approachSeg.waypoints[approachSeg.waypoints.length - 1];
          const fpIdx = approachSeg.offset + (approachSeg.waypoints.length - 1);
          tmpFoundActive = !foundActive && flightPlanManager.getActiveWaypointIndex() <= fpIdx;
          if (tmpFoundActive) {
            foundActive = true;
          }
          allRows.push(new FpRow(wp.ident, fpIdx, appName, undefined, tmpFoundActive));
        }
      }
      return allRows;
    }
  }
  class FpRow {
    constructor() {
      let ident = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-----';
      let fpIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      let airwayIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      let airwayOut = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      let isActive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      let isDeparture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      _defineProperty(this, "_ident", void 0);
      _defineProperty(this, "_fpIdx", void 0);
      _defineProperty(this, "_airwayIn", void 0);
      _defineProperty(this, "_airwayOut", void 0);
      _defineProperty(this, "_isActive", void 0);
      _defineProperty(this, "_isDeparture", void 0);
      this._ident = ident;
      this._fpIdx = fpIdx;
      this._airwayIn = airwayIn;
      this._airwayOut = airwayOut;
      this._isActive = isActive;
      this._isDeparture = isDeparture;
    }
    get ident() {
      return this._ident;
    }
    set ident(val) {
      this._ident = val;
    }
    get fpIdx() {
      return this._fpIdx;
    }
    set fpIdx(val) {
      this._fpIdx = val;
    }
    get airwayOut() {
      return this._airwayOut;
    }
    set airwayOut(val) {
      this._airwayOut = val;
    }
    get airwayIn() {
      return this._airwayIn;
    }
    set airwayIn(val) {
      this._airwayIn = val;
    }
    get isDeparture() {
      return this._isDeparture;
    }
    set isDeparture(val) {
      this._isDeparture = val;
    }
    getTemplate(fmc) {
      let row1tmpl,
        row2tmpl = ['', ''];
      if (this._airwayIn === undefined) {
        if (this._ident !== '-----') {
          row1tmpl = [fmc.makeSettable('DIRECT', 150), fmc.makeSettable(this._ident, 150)];
        } else {
          row1tmpl = [fmc.makeSettable('-----', 150), fmc.makeSettable(this._ident, 150)];
        }
      } else {
        row1tmpl = [fmc.makeSettable(this._airwayIn, 150), fmc.makeSettable(this._ident, 150)];
        if (this._ident === '-----') {
          row1tmpl[1] = fmc.makeSettable('□□□□□');
          row2tmpl = ['', '------------- DISCONTINUITY -------------', ''];
        }
      }
      if (this._isActive) {
        row1tmpl[0] += '';
        row1tmpl[1] += '';
      }
      return [row1tmpl, row2tmpl];
    }
  }

  class B777_FMC_DepArrPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      let rowOrigin = [''];
      let origin = fmc.flightPlanManager.getOrigin();
      if (origin) {
        rowOrigin = ['<DEP', origin.ident, '', ''];
        fmc._renderer.lsk(1).event = () => {
          B777_FMC_DepArrPage.ShowDeparturePage(fmc);
        };
      }
      let rowDestination = [''];
      let destination = fmc.flightPlanManager.getDestination();
      if (destination) {
        rowDestination = ['', '', destination.ident, 'ARR>'];
        fmc._renderer.rsk(2).event = () => {
          B777_FMC_DepArrPage.ShowArrivalPage(fmc);
        };
      }
      fmc._renderer.renderTitle('DEP/ARR INDEX');
      fmc._renderer.render([['', 'ACT FPLN', ''], rowOrigin, [''], rowDestination, [''], [''], [''], [''], [''], [''], [''], ['']]);
    }
    static ShowDeparturePage(fmc) {
      let currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      fmc.cleanUpPage();
      let originIdent = '';
      let origin = fmc.flightPlanManager.getOrigin();
      if (origin) {
        originIdent = origin.ident;
      }
      let rows = [['', '', '', ''], [''], [''], [''], [''], [''], [''], [''], ['']];
      let runways = [];
      let displayableRunwaysCount = 0;
      let departures = [];
      let selectedDeparture;
      let displayableDeparturesCount = 0;
      let displayableDpEnrouteTransitionsCount = 0;
      let selectedRunway = fmc.flightPlanManager.getDepartureRunway();
      if (origin) {
        let airportInfo = origin.infos;
        if (airportInfo instanceof AirportInfo) {
          let departureRunway = fmc.flightPlanManager.getDepartureRunway();
          if (departureRunway) {
            selectedRunway = departureRunway;
          }
          runways = airportInfo.oneWayRunways;
          selectedDeparture = airportInfo.departures[fmc.flightPlanManager.getDepartureProcIndex()];
          departures = airportInfo.departures;
        }
      }
      if (selectedRunway) {
        rows[0] = ['', '', '<SEL>', Avionics.Utils.formatRunway(selectedRunway.designation)];
        fmc._renderer.rsk(1).event = () => {
          fmc.flightPlanManager.pauseSync();
          fmc.setRunwayIndex(-1, () => {
            fmc.setDepartureIndex(-1, () => {
              fmc.flightPlanManager.resumeSync();
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowDeparturePage(fmc, currentPage);
            });
          });
        };
      } else {
        let runwayPages = [[]];
        let rowIndex = 0;
        let pageIndex = 0;
        for (let i = 0; i < runways.length; i++) {
          let runway = runways[i];
          let appendRow = false;
          let index = i;
          if (!selectedDeparture) {
            appendRow = true;
            displayableRunwaysCount++;
          } else {
            for (let j = 0; j < selectedDeparture.runwayTransitions.length; j++) {
              if (selectedDeparture.runwayTransitions[j].name.indexOf(runway.designation) !== -1) {
                appendRow = true;
                displayableRunwaysCount++;
                index = j;
                break;
              }
            }
          }
          if (appendRow) {
            if (rowIndex === 5) {
              pageIndex++;
              rowIndex = 0;
              runwayPages[pageIndex] = [];
            }
            runwayPages[pageIndex][rowIndex] = {
              text: Avionics.Utils.formatRunway(runway.designation),
              runwayIndex: index
            };
            rowIndex++;
          }
        }
        let displayedPageIndex = Math.min(currentPage, runwayPages.length) - 1;
        for (let i = 0; i < runwayPages[displayedPageIndex].length; i++) {
          let runwayIndex = runwayPages[displayedPageIndex][i].runwayIndex;
          rows[2 * i] = ['', '', '', runwayPages[displayedPageIndex][i].text];
          fmc._renderer.rsk(i + 1).event = () => {
            if (fmc.flightPlanManager.getDepartureProcIndex() === -1) {
              fmc.setOriginRunwayIndex(runwayIndex, () => {
                fmc.activateRoute();
                B777_FMC_DepArrPage.ShowDeparturePage(fmc, undefined);
              });
            } else {
              fmc.setRunwayIndex(runwayIndex, () => {
                fmc.activateRoute();
                B777_FMC_DepArrPage.ShowDeparturePage(fmc, undefined);
              });
            }
          };
        }
      }
      if (selectedDeparture) {
        rows[0][0] = selectedDeparture.name;
        rows[0][1] = '<SEL>';
        fmc._renderer.lsk(1).event = () => {
          fmc.flightPlanManager.pauseSync();
          fmc.setRunwayIndex(-1, () => {
            fmc.setDepartureIndex(-1, () => {
              fmc.flightPlanManager.resumeSync();
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowDeparturePage(fmc, currentPage);
            });
          });
        };
        rows[1][0] = ' TRANS';
        let selectedDpEnrouteTransitionIndex = fmc.flightPlanManager.getDepartureEnRouteTransitionIndex();
        let selectedDpEnrouteTransition = selectedDeparture.enRouteTransitions[selectedDpEnrouteTransitionIndex];
        if (selectedDpEnrouteTransition) {
          rows[2][0] = selectedDpEnrouteTransition.name.trim();
          fmc._renderer.lsk(2).event = () => {
            fmc.setDepartureEnrouteTransitionIndex(-1, () => {
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowDeparturePage(fmc, currentPage);
            });
          };
        } else {
          displayableDpEnrouteTransitionsCount = selectedDeparture.enRouteTransitions.length;
          let maxDpEnrouteTransitionPageIndex = Math.max(Math.ceil(displayableDpEnrouteTransitionsCount / 4), 1) - 1;
          let displayedDpEnrouteTransitionPageIndex = Math.min(currentPage - 1, maxDpEnrouteTransitionPageIndex);
          for (let i = 0; i < 4; i++) {
            let enrouteDpTransitionIndex = 4 * displayedDpEnrouteTransitionPageIndex + i;
            let enrouteDpTransition = selectedDeparture.enRouteTransitions[enrouteDpTransitionIndex];
            if (enrouteDpTransition) {
              let enrouteDpTransitionName = enrouteDpTransition.name.trim();
              rows[2 * (i + 1)][0] = enrouteDpTransitionName;
              fmc._renderer.lsk(i + 2).event = () => {
                fmc.setDepartureEnrouteTransitionIndex(enrouteDpTransitionIndex, () => {
                  fmc.activateRoute();
                  B777_FMC_DepArrPage.ShowDeparturePage(fmc);
                });
              };
            }
          }
        }
      } else {
        let departurePages = [[]];
        let rowIndex = 0;
        let pageIndex = 0;
        for (let i = 0; i < departures.length; i++) {
          let departure = departures[i];
          let appendRow = false;
          // No runway selected? -> show all departures
          if (!selectedRunway) {
            appendRow = true;
            displayableDeparturesCount++;
          }
          // runway selected? -> show applicable departures
          else {
            for (let j = 0; j < departure.runwayTransitions.length; j++) {
              if (departure.runwayTransitions[j].name.indexOf(selectedRunway.designation) !== -1) {
                appendRow = true;
                displayableDeparturesCount++;
                break;
              }
            }
          }
          // distribute rows accross pages
          if (appendRow) {
            if (rowIndex === 5) {
              pageIndex++;
              rowIndex = 0;
              departurePages[pageIndex] = [];
            }
            departurePages[pageIndex][rowIndex] = {
              text: departure.name,
              departureIndex: i
            };
            rowIndex++;
          }
        }
        // choose page to display: normally "currentPage", but fall back to the last page with data, if necessary
        let displayedPageIndex = Math.min(currentPage, departurePages.length) - 1;
        for (let i = 0; i < departurePages[displayedPageIndex].length; i++) {
          let departureIndex = departurePages[displayedPageIndex][i].departureIndex;
          rows[2 * i][0] = departurePages[displayedPageIndex][i].text;
          fmc._renderer.lsk(i + 1).event = () => {
            fmc.flightPlanManager.pauseSync();
            fmc.setDepartureIndex(departureIndex, () => {
              fmc.flightPlanManager.resumeSync();
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowDeparturePage(fmc);
            });
          };
        }
      }
      let rowsCountOf5RowsPerPageData = Math.max(displayableRunwaysCount, displayableDeparturesCount);
      let rowsCountOf4RowsPerPageData = displayableDpEnrouteTransitionsCount;
      let pageCountOf5RowsPerPageData = Math.ceil(rowsCountOf5RowsPerPageData / 5);
      let pageCountOf4RowsPerPageData = Math.ceil(rowsCountOf4RowsPerPageData / 4);
      let pageCount = Math.max(Math.max(pageCountOf5RowsPerPageData, pageCountOf4RowsPerPageData), 1);

      //start of CWB EXEC handling
      let lsk6Field = '';
      if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
        fmc.fpHasChanged = true;
        lsk6Field = '<ERASE';
      } else if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 0) {
        lsk6Field = '<INDEX';
        fmc.fpHasChanged = false;
      }
      fmc.onExecPage = () => {
        if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
          if (!fmc.getIsRouteActivated()) {
            fmc.activateRoute();
          }
          fmc.onExecDefault();
        }
      };
      fmc.refreshPageCallback = () => {
        B777_FMC_DepArrPage.ShowDeparturePage(fmc, currentPage);
      };

      //end of CWB EXEC handling

      fmc._renderer.renderTitle(originIdent + ' DEPARTURES');
      fmc._renderer.renderPages(currentPage, pageCount);
      fmc._renderer.render([['SIDS', 'RTE 1', 'RUNWAYS'], ...rows, ['__FMCSEPARATOR'], [lsk6Field, 'ROUTE>']]);
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_RoutePage.ShowPage1(fmc);
      };

      //start of CWB CANCEL MOD handling
      fmc._renderer.lsk(6).event = () => {
        if (lsk6Field == '<ERASE') {
          if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
            fmc.eraseTemporaryFlightPlan(() => {
              fmc.eraseRouteModifications();
              B777_FMC_DepArrPage.ShowDeparturePage(fmc);
            });
          }
        } else {
          B777_FMC_DepArrPage.ShowPage1(fmc);
        }
      };
      //end of CWB CANCEL MOD handling

      fmc.onPrevPage = () => {
        if (currentPage > 1) {
          B777_FMC_DepArrPage.ShowDeparturePage(fmc, currentPage - 1);
        } else {
          B777_FMC_DepArrPage.ShowDeparturePage(fmc, pageCount);
        }
      };
      fmc.onNextPage = () => {
        if (currentPage < pageCount) {
          B777_FMC_DepArrPage.ShowDeparturePage(fmc, currentPage + 1);
        } else {
          B777_FMC_DepArrPage.ShowDeparturePage(fmc);
        }
      };
    }
    static ShowArrivalPage(fmc) {
      let currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      fmc.cleanUpPage();
      let destinationIdent = '';
      let destination = fmc.flightPlanManager.getDestination();
      if (destination) {
        destinationIdent = destination.ident;
      }
      let rows = [['', '', '', ''], ['', '', '', ''], [''], [''], [''], [''], [''], [''], ['']];
      let approaches = [];
      let selectedApproach;
      let displayableApproachesCount = 0;
      let arrivals = [];
      let selectedArrival;
      let displayableArrivalsCount = 0;
      let displayableTransitionsCount = 0;
      let lastApproachPage = 0;
      let firstRunwayPage = 0;
      let firstRunwayTitleRow = 0;
      let runways = [];
      let displayableRunwaysCount = 0;
      let displayableEnrouteTransitionsCount = 0;
      let selectedRunway = fmc.vfrLandingRunway;
      if (destination) {
        let airportInfo = destination.infos;
        if (airportInfo instanceof AirportInfo) {
          selectedApproach = airportInfo.approaches[fmc.flightPlanManager.getApproachIndex()];
          approaches = airportInfo.approaches;
          selectedArrival = airportInfo.arrivals[fmc.flightPlanManager.getArrivalProcIndex()];
          arrivals = airportInfo.arrivals;
          runways = airportInfo.oneWayRunways;
        }
      }
      if (selectedApproach) {
        rows[0] = ['  NONE', '', '<SEL>', Avionics.Utils.formatRunway(selectedApproach.name).trim()];
        fmc._renderer.rsk(1).event = () => {
          fmc.flightPlanManager.pauseSync();
          fmc.setApproachIndex(-1, () => {
            fmc.flightPlanManager.resumeSync();
            fmc.activateRoute();
            B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage);
          });
        };
        rows[1] = ['', '', '', 'TRANS'];
        let selectedTransitionIndex = fmc.flightPlanManager.getApproachTransitionIndex();
        let selectedTransition = selectedApproach.transitions[selectedTransitionIndex];
        if (selectedTransition) {
          rows[2] = ['', '', '<SEL>', selectedTransition.name.trim()];
          fmc._renderer.rsk(2).event = () => {
            fmc.flightPlanManager.pauseSync();
            fmc.setApproachTransitionIndex(-1, () => {
              fmc.flightPlanManager.resumeSync();
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage);
            });
          };
        } else {
          displayableTransitionsCount = selectedApproach.transitions.length;
          let maxTransitionPageIndex = Math.max(Math.ceil(displayableTransitionsCount / 4), 1) - 1;
          let displayedTransitionPageIndex = Math.min(currentPage - 1, maxTransitionPageIndex);
          for (let i = 0; i < 4; i++) {
            let transitionIndex = 4 * displayedTransitionPageIndex + i;
            let transition = selectedApproach.transitions[transitionIndex];
            if (transition) {
              let name = transition.name.trim();
              rows[2 * (i + 1)][3] = name;
              fmc._renderer.rsk(i + 2).event = () => {
                fmc.flightPlanManager.pauseSync();
                fmc.setApproachTransitionIndex(transitionIndex, () => {
                  fmc.flightPlanManager.resumeSync();
                  fmc.activateRoute();
                  B777_FMC_DepArrPage.ShowArrivalPage(fmc);
                });
              };
            }
          }
        }
      } else if (selectedRunway) {
        rows[0][3] = 'RW' + Avionics.Utils.formatRunway(selectedRunway.designation);
        rows[0][2] = '<SEL>';
        rows[1][3] = 'RWY EXT';
        rows[2][3] = (fmc.vfrRunwayExtension && fmc.vfrRunwayExtension.toFixed(1)) + 'NM';
        fmc._renderer.rsk(1).event = () => {
          fmc.flightPlanManager.pauseSync();
          fmc.ensureCurrentFlightPlanIsTemporary(() => {
            fmc.deletedVfrLandingRunway = selectedRunway;
            fmc.vfrLandingRunway = undefined;
            fmc.modVfrRunway = true;
            fmc.flightPlanManager.setDestinationRunwayIndex(-1, -1, () => {
              fmc.flightPlanManager.resumeSync();
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage);
            });
          });
        };
        fmc._renderer.rsk(2).event = () => {
          let vfrRunwayExtension = parseFloat(fmc.inOut);
          if (isNaN(vfrRunwayExtension) || vfrRunwayExtension < 1 || vfrRunwayExtension > 25) {
            fmc.showErrorMessage('INVALID');
            return;
          } else {
            fmc.vfrRunwayExtension = vfrRunwayExtension;
          }
          fmc.flightPlanManager.pauseSync();
          fmc.ensureCurrentFlightPlanIsTemporary(() => {
            let runwayIndex = fmc.flightPlanManager.getFlightPlan(1).procedureDetails.destinationRunwayIndex;
            fmc.flightPlanManager.setDestinationRunwayIndex(runwayIndex, fmc.vfrRunwayExtension, () => {
              fmc.flightPlanManager.resumeSync();
              fmc.inOut = '';
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage);
            });
          });
        };
      } else {
        let approachPages = [[]];
        let rowIndex = 0;
        let pageIndex = 0;
        let lastApproachIndex = -1;
        for (let i = 0; i < approaches.length; i++) {
          let approach = approaches[i];
          let appendRow = false;
          if (!selectedArrival) {
            appendRow = true;
            displayableApproachesCount++;
          } else {
            for (let j = 0; j < selectedArrival.runwayTransitions.length; j++) {
              let matchingApproachRunways;
              if (approach.runway.endsWith(' ')) {
                // Approach runways ending with a space are wildcard approches: They are compatible with all matching arrivals
                // e.g. approach runway "4 " is compatible with arrival runwayTransitions "RW4", "RW4L", "RW4R" and "RW4C"
                matchingApproachRunways = [approach.runway.trim(), approach.runway.trim() + 'L', approach.runway.trim() + 'R', approach.runway.trim() + 'C'];
              } else {
                // Specific Approach runways not ending with a space are compatible only with that specific arrival
                // e.g. approach runway "4L" is compatible only with arrival runwayTransition "RW4L"
                matchingApproachRunways = [approach.runway];
              }
              if (matchingApproachRunways.includes(selectedArrival.runwayTransitions[j].name.replace('RW', ''))) {
                appendRow = true;
                displayableApproachesCount++;
                break;
              }
            }
            if (selectedArrival.runwayTransitions.length === 0) {
              appendRow = true;
              displayableApproachesCount++;
            }
          }
          if (appendRow) {
            if (rowIndex === 5) {
              pageIndex++;
              rowIndex = 0;
              approachPages[pageIndex] = [];
            }
            approachPages[pageIndex][rowIndex] = {
              text: Avionics.Utils.formatRunway(approach.name).trim(),
              approachIndex: i
            };
            rowIndex++;
            firstRunwayTitleRow = rowIndex == 5 ? 0 : rowIndex;
            lastApproachIndex = i;
          }
        }
        let firstMatchingRunway = true;
        for (let k = 0; k < runways.length; k++) {
          let runway = runways[k];
          let appendRow = false;
          if (!selectedArrival) {
            appendRow = true;
          } else {
            for (let l = 0; l < selectedArrival.runwayTransitions.length; l++) {
              if (selectedArrival.runwayTransitions[l].name == 'RW' + runway.designation.trim()) {
                appendRow = true;
                break;
              }
            }
            if (selectedArrival.runwayTransitions.length === 0) {
              appendRow = true;
            }
          }
          if (appendRow) {
            displayableRunwaysCount++;
            if (firstMatchingRunway) {
              lastApproachPage = pageIndex + 1;
            }
            if (rowIndex === 5) {
              pageIndex++;
              rowIndex = 0;
              approachPages[pageIndex] = [];
            }
            approachPages[pageIndex][rowIndex] = {
              text: 'RW' + Avionics.Utils.formatRunway(runway.designation).trim(),
              approachIndex: k + approaches.length,
              runwayIndex: k
            };
            if (firstMatchingRunway) {
              firstRunwayPage = pageIndex + 1;
            }
            firstMatchingRunway = false;
            rowIndex++;
          }
        }
        let displayedPageIndex = Math.min(currentPage, approachPages.length) - 1;
        for (let i = 0; i < approachPages[displayedPageIndex].length; i++) {
          let approachIndex = approachPages[displayedPageIndex][i].approachIndex;
          console.log('approachIndex ' + approachIndex);
          rows[2 * i] = ['', '', '', approachPages[displayedPageIndex][i].text];
          fmc._renderer.rsk(i + 1).event = () => {
            if (approachIndex <= lastApproachIndex) {
              console.log('approachIndex <= lastApproachIndex');
              fmc.flightPlanManager.pauseSync();
              console.log('approachIndex ' + approachIndex);
              fmc.setApproachIndex(approachIndex, () => {
                console.log('approach index set, selecting arrival');
                if (selectedArrival) {
                  let landingRunway = fmc.flightPlanManager.getApproachRunway();
                  console.log('approach runway: ' + landingRunway.designation);
                  if (landingRunway) {
                    let arrivalRunwayIndex = selectedArrival.runwayTransitions.findIndex(t => {
                      return t.name.indexOf('RW' + landingRunway.designation) != -1;
                    });
                    console.log('arrivalRunwayIndex ' + arrivalRunwayIndex);
                    if (arrivalRunwayIndex >= -1) {
                      fmc.flightPlanManager.setArrivalRunwayIndex(arrivalRunwayIndex, () => {
                        fmc.flightPlanManager.resumeSync();
                        fmc.activateRoute();
                        B777_FMC_DepArrPage.ShowArrivalPage(fmc);
                      });
                    }
                  }
                }
                fmc.flightPlanManager.resumeSync();
                fmc.activateRoute();
                B777_FMC_DepArrPage.ShowArrivalPage(fmc);
              });
            } else if (approachIndex > lastApproachIndex) {
              console.log('approachIndex > lastApproachIndex');
              let runwayApproachIndex = approachPages[displayedPageIndex][i].runwayIndex;
              console.log('approachIndex ' + approachIndex);
              fmc.flightPlanManager.pauseSync();
              fmc.ensureCurrentFlightPlanIsTemporary(() => {
                console.log('starting to set vfrLandingRunway');
                fmc.modVfrRunway = true;
                fmc.vfrLandingRunway = runways[runwayApproachIndex];
                fmc.vfrRunwayExtension = 5;
                fmc.flightPlanManager.setDestinationRunwayIndex(runwayApproachIndex, fmc.vfrRunwayExtension, () => {
                  if (selectedArrival) {
                    let landingRunway = fmc.vfrLandingRunway;
                    if (landingRunway) {
                      let arrivalRunwayIndex = selectedArrival.runwayTransitions.findIndex(t => {
                        return t.name.indexOf('RW' + landingRunway.designation) != -1;
                      });
                      if (arrivalRunwayIndex >= -1) {
                        fmc.flightPlanManager.setArrivalRunwayIndex(arrivalRunwayIndex, () => {
                          fmc.inOut = '';
                          fmc.flightPlanManager.resumeSync();
                          fmc.activateRoute();
                          B777_FMC_DepArrPage.ShowArrivalPage(fmc);
                        });
                      }
                    }
                  }
                  console.log('completed setting vfrLandingRunway');
                  fmc.flightPlanManager.resumeSync();
                  fmc.activateRoute();
                  B777_FMC_DepArrPage.ShowArrivalPage(fmc);
                });
              });
            }
          };
        }
        if (currentPage > lastApproachPage || lastApproachIndex == -1) ; else if (currentPage == firstRunwayPage && firstRunwayPage == lastApproachPage && firstRunwayTitleRow > 0) {
          let runwaysTitleRow = firstRunwayTitleRow * 2 - 1;
          rows[runwaysTitleRow][3] = 'RUNWAYS';
        }
      }
      if (selectedArrival) {
        console.log('Selected Arrival');
        rows[0][0] = selectedArrival.name;
        rows[0][1] = '<SEL>';
        fmc._renderer.lsk(1).event = () => {
          fmc.flightPlanManager.pauseSync();
          fmc.setArrivalProcIndex(-1, () => {
            fmc.flightPlanManager.resumeSync();
            fmc.activateRoute();
            B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage);
          });
        };
        let selectedArrivalIndex = fmc.flightPlanManager.getArrivalProcIndex();
        rows[1][0] = ' TRANS';
        let selectedEnrouteTransitionIndex = fmc.flightPlanManager.getArrivalTransitionIndex();
        let selectedEnrouteTransition = selectedArrival.enRouteTransitions[selectedEnrouteTransitionIndex];
        if (selectedEnrouteTransition) {
          rows[2][0] = selectedEnrouteTransition.name.trim();
          rows[2][1] = '<SEL>';
          fmc._renderer.lsk(2).event = () => {
            fmc.setArrivalAndRunwayIndex(selectedArrivalIndex, -1, () => {
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage);
            });
          };
        } else {
          displayableEnrouteTransitionsCount = selectedArrival.enRouteTransitions.length;
          let maxEnrouteTransitionPageIndex = Math.max(Math.ceil(displayableEnrouteTransitionsCount / 4), 1) - 1;
          let displayedEnrouteTransitionPageIndex = Math.min(currentPage - 1, maxEnrouteTransitionPageIndex);
          for (let i = 0; i < 4; i++) {
            let enrouteTransitionIndex = 4 * displayedEnrouteTransitionPageIndex + i;
            let enrouteTransition = selectedArrival.enRouteTransitions[enrouteTransitionIndex];
            if (enrouteTransition) {
              let enrouteTransitionName = enrouteTransition.name.trim();
              rows[2 * (i + 1)][0] = enrouteTransitionName;
              fmc._renderer.lsk(i + 2).event = () => {
                fmc.flightPlanManager.pauseSync();
                fmc.setArrivalAndRunwayIndex(selectedArrivalIndex, enrouteTransitionIndex, () => {
                  fmc.flightPlanManager.resumeSync();
                  fmc.activateRoute();
                  B777_FMC_DepArrPage.ShowArrivalPage(fmc);
                });
              };
            }
          }
        }
      } else {
        let arrivalPages = [[]];
        let rowIndex = 0;
        let pageIndex = 0;
        for (let i = 0; i < arrivals.length; i++) {
          let arrival = arrivals[i];
          let appendRow = false;
          if (!selectedApproach && !selectedRunway) {
            appendRow = true;
            displayableArrivalsCount++;
          } else {
            for (let j = 0; j < arrival.runwayTransitions.length; j++) {
              if (selectedApproach) {
                let matchingApproachRunways;
                if (selectedApproach.runway.endsWith(' ')) {
                  matchingApproachRunways = [selectedApproach.runway.trim(), selectedApproach.runway.trim() + 'L', selectedApproach.runway.trim() + 'R', selectedApproach.runway.trim() + 'C'];
                } else {
                  matchingApproachRunways = [selectedApproach.runway];
                }
                if (matchingApproachRunways.includes(arrival.runwayTransitions[j].name.replace('RW', ''))) {
                  appendRow = true;
                  displayableArrivalsCount++;
                  break;
                }
              } else if (selectedRunway && arrival.runwayTransitions[j].name == 'RW' + selectedRunway.designation.trim()) {
                appendRow = true;
                displayableArrivalsCount++;
                break;
              }
            }
            if (arrival.runwayTransitions.length === 0) {
              appendRow = true;
              displayableArrivalsCount++;
            }
          }
          if (appendRow) {
            if (rowIndex === 5) {
              pageIndex++;
              rowIndex = 0;
              arrivalPages[pageIndex] = [];
            }
            arrivalPages[pageIndex][rowIndex] = {
              text: arrival.name,
              arrivalIndex: i
            };
            rowIndex++;
          }
        }
        let displayedPageIndex = Math.min(currentPage, arrivalPages.length) - 1;
        for (let i = 0; i < arrivalPages[displayedPageIndex].length; i++) {
          let arrivalIndex = arrivalPages[displayedPageIndex][i].arrivalIndex;
          rows[2 * i][0] = arrivalPages[displayedPageIndex][i].text;
          fmc._renderer.lsk(i + 1).event = () => {
            console.log('rows length before reload' + rows.length);
            fmc.flightPlanManager.pauseSync();
            fmc.setArrivalAndRunwayIndex(arrivalIndex, -1, () => {
              console.log('Setting Arrival and Runway Index');
              fmc.flightPlanManager.resumeSync();
              fmc.activateRoute();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc);
            });
          };
        }
      }
      let rowsCountOf5RowsPerPageData = Math.max(displayableApproachesCount + displayableRunwaysCount, displayableArrivalsCount);
      let rowsCountOf4RowsPerPageData = Math.max(displayableTransitionsCount, displayableEnrouteTransitionsCount);
      let pageCountOf5RowsPerPageData = Math.ceil(rowsCountOf5RowsPerPageData / 5);
      let pageCountOf4RowsPerPageData = Math.ceil(rowsCountOf4RowsPerPageData / 4);
      let pageCount = Math.max(Math.max(pageCountOf5RowsPerPageData, pageCountOf4RowsPerPageData), 1);

      //start of CWB EXEC handling
      let lsk6Field = '';
      if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
        fmc.fpHasChanged = true;
        lsk6Field = '<ERASE';
      } else if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 0) {
        lsk6Field = '<INDEX';
        fmc.fpHasChanged = false;
      }
      fmc.onExecPage = () => {
        if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
          fmc.modVfrRunway = false;
          fmc.deletedVfrLandingRunway = undefined;
          if (!fmc.getIsRouteActivated()) {
            fmc.activateRoute();
          }
          fmc.onExecDefault();
        }
        B777_FMC_DepArrPage.ShowArrivalPage(fmc);
        fmc.refreshPageCallback = () => B777_FMC_DepArrPage.ShowArrivalPage(fmc);
      };
      //end of CWB EXEC handling

      fmc._renderer.renderTitle(destinationIdent + ' ARRIVALS');
      fmc._renderer.renderPages(currentPage, pageCount);
      fmc._renderer.render([['STAR', 'RTE 1', 'APPROACH'], ...rows, ['__FMCSEPARATOR'], [lsk6Field, 'ROUTE>']]);
      fmc._renderer.rsk(6).event = () => {
        B777_FMC_DepArrPage.ShowPage1(fmc);
      };

      //start of CWB CANCEL MOD handling
      fmc._renderer.lsk(6).event = () => {
        if (lsk6Field == '<ERASE') {
          if (fmc.modVfrRunway == true && fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
            fmc.eraseTemporaryFlightPlan(() => {
              fmc.vfrLandingRunway = fmc.vfrLandingRunway == undefined ? fmc.deletedVfrLandingRunway : undefined;
              fmc.modVfrRunway = false;
              fmc.eraseRouteModifications();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc);
            });
          } else if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
            fmc.eraseTemporaryFlightPlan(() => {
              fmc.eraseRouteModifications();
              B777_FMC_DepArrPage.ShowArrivalPage(fmc);
            });
          }
        } else {
          B777_FMC_DepArrPage.ShowPage1(fmc);
        }
      };
      //end of CWB CANCEL MOD handling

      fmc.onPrevPage = () => {
        if (currentPage > 1) {
          B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage - 1);
        } else {
          B777_FMC_DepArrPage.ShowArrivalPage(fmc, pageCount);
        }
      };
      fmc.onNextPage = () => {
        if (currentPage < pageCount) {
          B777_FMC_DepArrPage.ShowArrivalPage(fmc, currentPage + 1);
        } else {
          B777_FMC_DepArrPage.ShowArrivalPage(fmc);
        }
      };
    }
  }

  class B777_FMC_RouteDataPage {
    constructor(fmc) {
      _defineProperty(this, "fmc", void 0);
      this.fmc = fmc;
    }
    static computeEtaToWaypoint(distance, groundSpeed) {
      if (groundSpeed < 50) {
        groundSpeed = 50;
      }
      if (groundSpeed > 0.1) {
        return distance / groundSpeed * 3600;
      }
    }
    showPage() {
      let currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.fmc.cleanUpPage();
      B777_FMC_RouteDataPage._updateCounter = 0;
      this.fmc.pageUpdate = () => {
        if (B777_FMC_RouteDataPage._updateCounter >= 50) {
          this.showPage(currentPage);
        } else {
          B777_FMC_RouteDataPage._updateCounter++;
        }
      };
      let rows = [[''], [''], [''], [''], [''], [''], [''], [''], ['']];
      let pageCount = 1;
      let offset = Math.floor((currentPage - 1) * 5);
      let activeWaypoint = 0;
      let speed = SimVar.GetSimVarValue('GPS GROUND SPEED', 'knots');
      let flightPlanManagerWaypoints = this.fmc.flightPlanManager.getWaypoints();
      if (flightPlanManagerWaypoints) {
        let useImperial = HeavyDivision.Configuration.useImperial();
        let fuelModifier;
        if (useImperial) {
          fuelModifier = 1.0;
        } else {
          fuelModifier = 0.45359237;
        }
        let currentTime = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
        let currentFuel = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'pounds') / 1000;
        let currentFuelFlow = SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:1', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:2', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:3', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:4', 'pound per hour');
        currentFuelFlow = currentFuelFlow / 1000;
        let waypoints = [...flightPlanManagerWaypoints];
        if (waypoints.length > 2) {
          activeWaypoint = this.fmc.flightPlanManager.getActiveWaypointIndex();
          waypoints.pop();
          let approachWaypoints = this.fmc.flightPlanManager.getApproachWaypoints();
          if (this.fmc.flightPlanManager.isActiveApproach()) {
            activeWaypoint += waypoints.length;
          }
          for (let i = 0; i < approachWaypoints.length; i++) {
            waypoints.push(approachWaypoints[i]);
          }
          activeWaypoint = waypoints.findIndex(w => {
            return w.ident === this.fmc.flightPlanManager.getActiveWaypointIdent();
          });
          waypoints.splice(0, activeWaypoint);
          for (let i = 0; i < 5; i++) {
            let etaCell = '';
            let fuelCell = '';
            let waypoint = waypoints[i + offset];
            if (waypoint) {
              let distance = 0;
              const isActWpt = i == 0 && currentPage == 1;
              if (isActWpt) {
                distance = this.fmc.flightPlanManager.getDistanceToActiveWaypoint();
              } else {
                distance = this.fmc.flightPlanManager.getDistanceToActiveWaypoint();
                for (let j = 0; j < i + offset; j++) {
                  distance = distance + Avionics.Utils.computeGreatCircleDistance(waypoints[j].infos.coordinates, waypoints[j + 1].infos.coordinates);
                }
              }
              let eta = undefined;
              eta = (B777_FMC_RouteDataPage.computeEtaToWaypoint(distance, speed) + currentTime) % 86400;
              if (isFinite(eta)) {
                let etaHours = Math.floor(eta / 3600);
                let etaMinutes = Math.floor((eta - etaHours * 3600) / 60);
                etaCell = etaHours.toFixed(0).padStart(2, '0') + etaMinutes.toFixed(0).padStart(2, '0') + '[size=small]Z[/size]';
              }
              let fuelLeft = this.fmc.computeFuelLeft(distance, speed, currentFuel, currentFuelFlow);
              if (isFinite(fuelLeft)) {
                fuelCell = (fuelLeft * fuelModifier).toFixed(1);
              }
              rows[2 * i] = [etaCell, waypoint.ident, fuelCell, '>'];
            }
          }
        }
        pageCount = Math.floor((waypoints.length - 1) / 5) + 1;
      }
      this.fmc._renderer.renderTitle('ACT RTE 1 DATA');
      this.fmc._renderer.renderPages(currentPage, pageCount);
      this.fmc._renderer.render([['ETA', 'WAYPOINT', 'FUEL', 'WIND'], ...rows, ['', '-------------------------------------WIND DATA', ''], ['<LEGS', 'REQUEST>']]);
      this.fmc._renderer.lsk(6).event = () => {
        B777_FMC_LegsPage.ShowPage1(this.fmc);
      };
      this.fmc.onPrevPage = () => {
        if (currentPage > 1) {
          this.showPage(currentPage - 1);
        }
      };
      this.fmc.onNextPage = () => {
        if (currentPage < pageCount) {
          this.showPage(currentPage + 1);
        }
      };
    }
  }
  _defineProperty(B777_FMC_RouteDataPage, "_updateCounter", 0);

  let LegsPageInstance = undefined;

  // TODO OVERALL
  // Because the page has a state now, we need to watch out to reset vars like activatingDirectTo etc after it is processed

  class B777_FMC_LegsPage {
    constructor(fmc, isAddingHold) {
      _defineProperty(this, "_fmc", void 0);
      _defineProperty(this, "_rows", void 0);
      _defineProperty(this, "_isDirty", void 0);
      _defineProperty(this, "_isAddingHold", void 0);
      _defineProperty(this, "_currentPage", void 0);
      _defineProperty(this, "_pageCount", void 0);
      _defineProperty(this, "_distanceToActiveWpt", void 0);
      _defineProperty(this, "_activeWptIndex", void 0);
      _defineProperty(this, "_wayPointsToRender", void 0);
      _defineProperty(this, "_lsk6Field", void 0);
      _defineProperty(this, "_isMapModePlan", void 0);
      _defineProperty(this, "_step", void 0);
      _defineProperty(this, "_rsk6Field", void 0);
      _defineProperty(this, "_approachWaypoints", void 0);
      this._fmc = fmc;
      this._isDirty = true; // render on first run ofc
      this._isAddingHold = isAddingHold;
      this._currentPage = 1;
      this._pageCount = 1;
      this._rows = [];
      this._activeWptIndex = this._fmc.flightPlanManager.getActiveWaypointIndex();
      this._distanceToActiveWpt = 0;
      this._lsk6Field = '';
      this._wayPointsToRender = [];
      this._isMapModePlan = undefined;
      this._step = undefined;
      this.prepare();
    }
    prepare() {
      // Noop as there is no preparation with this
      this.update(true);
    }
    update() {
      let forceUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // check if active wpt changed
      // TODO: possible that i renders twice as we change index while editing, could cut that out too
      const actWptIndex = this._fmc.flightPlanManager.getActiveWaypointIndex();
      if (this._activeWptIndex != actWptIndex) {
        this._activeWptIndex = actWptIndex;
        this._isDirty = true;
      }
      const isMapModePlan = SimVar.GetSimVarValue('L:B777_MAP_MODE', 'number') === 3;
      if (this._isMapModePlan !== isMapModePlan) {
        this._isMapModePlan = isMapModePlan;
        this._step = undefined;
        this._isDirty = true;
      }

      // get and format distance
      const distanceToActWpt = this._fmc.flightPlanManager.getDistanceToActiveWaypoint();
      if (distanceToActWpt !== this._distanceToActiveWpt) {
        this._distanceToActiveWpt = distanceToActWpt;
        this._isDirty = true;
      }
      if (this._isDirty || forceUpdate) {
        this.invalidate();
      }

      // register refresh and bind to update which will only render on changes
      this._fmc.registerPeriodicPageRefresh(() => {
        this.update();
        return true;
      }, 1000, false);
    }
    updateLegs() {
      this._rows = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
      const offset = Math.floor((this._currentPage - 1) * 5);
      const allWaypoints = this._fmc.flightPlanManager.getAllWaypoints();
      this._wayPointsToRender = this.buildLegs(allWaypoints, this._activeWptIndex);

      //FIND RUNWAY INDEX
      if (allWaypoints.length > 1 && allWaypoints[allWaypoints.length - 2].isRunway) {
        this._wayPointsToRender.length - 2;
      }
      this._pageCount = Math.floor((this._wayPointsToRender.length - 1) / 5) + 1;
      for (let i = 0; i < 5; i++) {
        const waypoint = this._wayPointsToRender[i + offset];

        //EXISTING ->
        if (waypoint && waypoint.fix && waypoint.fix.icao === '$EMPTY') {
          this._rows[2 * i + 1] = [''];
        } else if (waypoint && waypoint.fix) {
          const bearing = isFinite(waypoint.fix.bearingInFP) ? waypoint.fix.bearingInFP.toFixed(0).padStart(3, '0') + '°' : '';
          const prevWaypoint = this._wayPointsToRender[i + offset - 1];
          let distance = 0;
          //const isFromWpt = (i == 0 && this._currentPage == 1);
          const isActWpt = i == 0 && this._currentPage == 1;
          if (isActWpt) {
            distance = this._distanceToActiveWpt;
          } else if (prevWaypoint && prevWaypoint.fix.infos && waypoint.fix.infos) {
            distance = Avionics.Utils.computeGreatCircleDistance(prevWaypoint.fix.infos.coordinates, waypoint.fix.infos.coordinates);
          }
          if (waypoint.isMissedApproachStart) ;

          // format distance
          let distanceString = distance < 100 ? distance.toFixed(1) : distance.toFixed(0);
          let waypointSegment = this._fmc.flightPlanManager.getSegmentFromWaypoint(waypoint.fix);
          if (isActWpt) {
            if (waypoint.fix.icao === '$DISCO') {
              this._rows[2 * i] = [' THEN'];
              this._rows[2 * i + 1] = [this._fmc.makeSettable('□□□□□'), ' ---- ROUTE DISCONTINUITY -----------'];
            } else if (waypoint.fix.hasHold) {
              this._rows[2 * i] = [' HOLD AT'];
              this._rows[2 * i + 1] = ["".concat(waypoint.fix.ident != '' ? this._fmc.makeSettable(waypoint.fix.ident, 100) : this._fmc.makeSettable('USR'))];
            } else {
              this._rows[2 * i] = [' ' + bearing.padStart(3, '0'), distanceString.padStart(4, ' ') + 'NM', ''];
              this._rows[2 * i + 1] = [waypoint.fix.ident != '' ? this._fmc.makeSettable(waypoint.fix.ident + '', 100) : this._fmc.makeSettable('USR')];
            }
          } else {
            if (waypoint.fix.icao === '$DISCO') {
              this._rows[2 * i] = [' THEN'];
              this._rows[2 * i + 1] = [this._fmc.makeSettable('□□□□□'), ' ---- ROUTE DISCONTINUITY -----------'];
            } else if (waypoint.fix.hasHold) {
              this._rows[2 * i] = [' HOLD AT'];
              this._rows[2 * i + 1] = [waypoint.fix.ident != '' ? this._fmc.makeSettable(waypoint.fix.ident, 100) : this._fmc.makeSettable('USR')];
            } else {
              this._rows[2 * i] = [' ' + bearing.padStart(3, '0'), distanceString.padStart(4, ' ') + 'NM', ''];
              this._rows[2 * i + 1] = [waypoint.fix.ident != '' ? this._fmc.makeSettable(waypoint.fix.ident, 100) : this._fmc.makeSettable('USR')];
            }
          }
          if (waypoint.fix.icao !== '$DISCO') {
            let row = '';
            if (SegmentType.Enroute === waypointSegment.type) {
              row = Math.round(this._fmc.speedManager.getCrzManagedSpeed(this._fmc.getCostIndexFactor(), true)) + '/';
              if (this._fmc.cruiseFlightLevel) {
                row += 'FL' + this._fmc.cruiseFlightLevel;
              } else {
                row += '-----';
              }
            } else {
              row += this.getAltSpeedRestriction(waypoint.fix);
            }

            /*
             if (SegmentType.Enroute === waypointSegment.type) {
             let speedConstraint = -1;
             if (waypoint.fix.speedConstraint && waypoint.fix.speedConstraint > 100) {
             speedConstraint = waypoint.fix.speedConstraint;
             }
            		 if (this._fmc._speedDirector._commandedSpeedType === SpeedType.SPEED_TYPE_ECON) {
             row = this._fmc.colorizeContent(this._fmc._speedDirector.speed, 'magenta');
             } else if (this._fmc._speedDirector._commandedSpeedType === SpeedType.SPEED_TYPE_WAYPOINT && isActWpt) {
             row = this._fmc.colorizeContent(this._fmc._speedDirector.speed, 'magenta');
             } else {
             if (speedConstraint !== -1) {
             row = speedConstraint;
             } else {
             row = this._fmc._speedDirector.speed;
             }
             }
             //row = Math.round(this._fmc.getCrzManagedSpeed(true)) + '/';
             row = row + '/';
             if (this._fmc.cruiseFlightLevel) {
             row += 'FL' + this._fmc.cruiseFlightLevel;
             } else {
             row += '-----';
             }
            		 } else {
             row += this.getAltSpeedRestriction(waypoint.fix, isActWpt);
             }
             */

            // (SegmentType.Enroute === waypointSegment.type ? Math.round(this._fmc.getCrzManagedSpeed(true)) + '/' + (this._fmc.cruiseFlightLevel ? 'FL' + this._fmc.cruiseFlightLevel : '-----') : this.getAltSpeedRestriction(waypoint.fix))

            this._rows[2 * i + 1][1] = this._fmc.makeSettable(row, 200);
          }
        }
      }
    }
    render() {
      this._lsk6Field = '';
      if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
        this._fmc.fpHasChanged = true;
        this._lsk6Field = '<ERASE';
      } else {
        this._lsk6Field = '<RTE 2 LEGS';
      }
      if (this._isMapModePlan) {
        this._rsk6Field = 'STEP>';
        let canStep = true;
        if (this._step === undefined) {
          canStep = false;
          const steps = this.buildSteps();
          /**
           * TODO: Better handling (This should set first step on page and not first step)
           */
          if (steps.length > 0) {
            const stepIndex = steps.findIndex(step => {
              return step.page === this._currentPage;
            });
            this._step = steps[stepIndex];
            if (this._step !== undefined) {
              SimVar.SetSimVarValue('L:B77RS_MCDU_CURRENT_FPLN_WAYPOINT', 'number', this._step.index + this._activeWptIndex);
            }
            canStep = true;
          }
        }
        if (canStep === true) {
          if (this._rows[2 * this._step.position + 1][0] != '') {
            if (!this._rows[2 * this._step.position + 1][0]) {
              this._rows[2 * this._step.position + 1][0] = '';
            }
            /**
             * This is not good fix
             */
            //this._rows[2 * this._step.position + 1][1] = '<CTR>' + this._rows[2 * this._step.position + 1][1];

            /**
             * TODO: Check this for complicated constraints
             * @type {any}
             */
            this._rows[2 * this._step.position + 1][2] = this._rows[2 * this._step.position + 1][1];
            this._rows[2 * this._step.position + 1][1] = '<CTR>';
          }
        }
      } else {
        this._rsk6Field = 'RTE DATA>';
      }
      const modStr = this._fmc.fpHasChanged ? 'MOD' : 'ACT';
      let holdActive = false;
      let holdExiting = false;
      const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
      if (holdsDirector) {
        const holdIndex = this._fmc.flightPlanManager.getActiveWaypointIndex();
        holdActive = holdsDirector.isHoldActive(holdIndex);
        holdExiting = holdsDirector.isHoldExiting(holdIndex);
      }
      this._fmc._renderer.renderTitle(' ' + modStr + ' LEGS');
      this._fmc._renderer.renderPages(this._currentPage, Math.max(1, this._pageCount));
      this._fmc._renderer.render([...this._rows, ['', "".concat(this._isAddingHold ? '--------------------HOLD AT-------------------' : holdExiting ? '------------------EXIT ARMED------------------' : '__FMCSEPARATOR'), ''], ["".concat(this._isAddingHold ? this._fmc.makeSettable('□□□□□') : holdExiting ? '<CANCEL EXIT' : holdActive ? '<EXIT HOLD' : this._lsk6Field), this._rsk6Field]]);
    }
    buildLegs(waypoints, activeWaypointIndex) {
      const displayWaypoints = [];
      let runwayExists = false;
      const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
      if (holdsDirector) {
        const holdIndex = this._fmc.flightPlanManager.getActiveWaypointIndex();
        holdsDirector.isHoldExited(holdIndex);
      }
      let previousSegment = undefined;
      const destination = this._fmc.flightPlanManager.getDestination();
      for (var i = Math.max(0, activeWaypointIndex - 1); i < waypoints.length; i++) {
        const currentSegment = this._fmc.flightPlanManager.getSegmentFromWaypoint(waypoints[i]).type;
        if (waypoints[i].isRunway && currentSegment === SegmentType.Approach) {
          runwayExists = true;
        }
        if (runwayExists && waypoints[i] === destination) ; else {
          const isFirstMissedApproachLeg = currentSegment === SegmentType.Missed && previousSegment === SegmentType.Approach;
          displayWaypoints.push({
            index: i,
            fix: waypoints[i],
            isMissedApproachStart: isFirstMissedApproachLeg
          });
          if (waypoints[i].endsInDiscontinuity) {
            displayWaypoints.push({
              index: i,
              fix: {
                icao: '$DISCO',
                isRemovable: waypoints[i].isVectors !== true
              }
            });
          }
          previousSegment = currentSegment;
        }
      }
      displayWaypoints.shift();
      return displayWaypoints;
    }
    bindInputs() {
      var _this = this;
      for (let i = 0; i < this._wayPointsToRender.length; i++) {
        const offsetRender = Math.floor((this._currentPage - 1) * 5);
        const wptRender = this._wayPointsToRender[i + offsetRender];
        // if its a real fix
        if (wptRender && (wptRender.fix.ident !== '$EMPTY' || wptRender.fix.ident !== '$DISCO')) {
          if (i >= 5) {
            break;
          }
          this._fmc._renderer.rsk(i + 1).event = () => {
            const offset = Math.floor((this._currentPage - 1) * 5);
            const wptIndex = this._wayPointsToRender[i + offset].index;
            const waypoint = this._fmc.flightPlanManager.getWaypoint(wptIndex);
            const value = this._fmc.inOut;
            if (value === BaseFMC.clrValue) {
              waypoint.legAltitudeDescription = -1;
              waypoint.speedConstraint = -1;
              this._fmc.flightPlanManager._updateFlightPlanVersion();
              this.resetAfterOp();
              return;
            }
            this.parseConstraintInput(value, waypoint);
            this._fmc.flightPlanManager._updateFlightPlanVersion();
            this.resetAfterOp();
          };
        }
        const lsk = this._fmc._renderer.lsk(i + 1);
        if (wptRender && lsk !== undefined) {
          lsk.event = async () => {
            const offset = Math.floor((this._currentPage - 1) * 5);
            const waypoint = this._wayPointsToRender[i + offset];
            if (!waypoint) {
              return;
            }
            if (waypoint.fix.ident === 'USR') {
              this._fmc.showErrorMessage('UNABLE MOD USR');
              return;
            }
            const value = this._fmc.inOut;
            let selectedWpIndex = waypoint.index;

            // Mode evaluation
            if (value == '') {
              this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.NONE;
            } else if (value === BaseFMC.clrValue) {
              this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.DELETE;
            } else if (value.includes('/') && this._fmc.selectMode === B777_FMC_LegsPage.SELECT_MODE.EXISTING) {
              // looks like user waypoint, go to new
              this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.NEW;
            } else if (value.length > 0 && this._fmc.selectMode !== B777_FMC_LegsPage.SELECT_MODE.EXISTING) {
              // scratchpad not empty, nothing selected, must be new wpt
              this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.NEW;
            }
            switch (this._fmc.selectMode) {
              case B777_FMC_LegsPage.SELECT_MODE.NONE:
                {
                  if (i >= 0 && this._currentPage == 1 || this._currentPage > 1) {
                    // SELECT EXISTING WAYPOINT FROM FLIGHT PLAN
                    this._approachWaypoints = this._fmc.flightPlanManager.getApproachWaypoints();
                    if (this._approachWaypoints.length > 0) {
                      if (waypoint.fix.ident === this._approachWaypoints[this._approachWaypoints.length - 1].ident) {
                        this._fmc.showErrorMessage('UNABLE MOD RW');
                        return;
                      }
                    }
                    this._fmc.selectedWaypoint = waypoint;
                    this._fmc.inOut = waypoint.fix.ident;
                    this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.EXISTING;
                  }
                  break;
                }
              case B777_FMC_LegsPage.SELECT_MODE.EXISTING:
                {
                  if (i >= 0 && this._currentPage == 1 || this._currentPage > 1) {
                    let scratchPadWaypointIndex = this._fmc.selectedWaypoint.index;

                    // MOVE EXISTING WAYPOINT WITH LEGS AFTER
                    let lskWaypointIndex = selectedWpIndex;
                    const isDirectTo = i == 0 && this._currentPage == 1;
                    if (isDirectTo) {
                      // DIRECT TO
                      this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                        this._fmc.flightPlanManager.activateDirectToByIndex(scratchPadWaypointIndex, () => {
                          this._fmc.activateRoute(true, () => {
                            this.resetAfterOp();
                          });
                        });
                      });
                    } else {
                      // MOVE TO POSITION IN FPLN
                      let isMovable = true;
                      if (waypoint.fix.icao === '$DISCO') {
                        if (waypoint.fix.isRemovable) {
                          this._fmc.flightPlanManager.clearDiscontinuity(waypoint.index);
                          lskWaypointIndex += 1;
                        } else {
                          this._fmc.clearUserInput();
                          this._fmc.messageManager.showMessage('INVALID DELETE', 'SELECTED LINE CAN NOT <br> BE DELETED');
                          isMovable = false;
                        }
                      }
                      if (waypoint.fix.isHold) {
                        this._fmc.flightPlanManager.deleteHoldAtWaypointIndex(waypoint.index);
                        lskWaypointIndex += 1;
                      }
                      if (isMovable) {
                        const removeWaypointForLegsMethod = function () {
                          let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
                          if (lskWaypointIndex < scratchPadWaypointIndex) {
                            _this._fmc.flightPlanManager.removeWaypoint(lskWaypointIndex, false, () => {
                              scratchPadWaypointIndex--;
                              removeWaypointForLegsMethod(callback);
                            });
                          } else {
                            callback();
                          }
                        };
                        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                          removeWaypointForLegsMethod(() => {
                            this._fmc.activateRoute(false, () => {
                              this.resetAfterOp();
                            });
                          });
                        });
                      }
                    }
                  }
                  break;
                }
              case B777_FMC_LegsPage.SELECT_MODE.NEW:
                {
                  if (i >= 0 && this._currentPage == 1 || this._currentPage > 1) {
                    if (waypoint && waypoint.fix) {
                      if (waypoint.fix.icao === '$EMPTY') {
                        selectedWpIndex = Infinity;
                      }
                      if (waypoint.fix.icao === '$DISCO') {
                        if (waypoint.fix.isRemovable) {
                          this._fmc.flightPlanManager.clearDiscontinuity(waypoint.index);
                          selectedWpIndex += 1;
                        } else {
                          this._fmc.clearUserInput();
                          this._fmc.messageManager.showMessage('INVALID DELETE', 'SELECTED LINE CAN NOT <br> BE DELETED');
                          return;
                        }
                      }
                    }
                    const scratchPadWaypointIndex = this._fmc.selectedWaypoint ? this._fmc.selectedWaypoint.index : undefined;
                    const userWaypoint = await CJ4_FMC_PilotWaypointParser.parseInput(value, scratchPadWaypointIndex, this._fmc);
                    if (userWaypoint) {
                      const databaseDuplicate = await this._fmc._pilotWaypoints.checkDatabaseDuplicates(userWaypoint.wpt.ident);
                      if (databaseDuplicate) {
                        this._fmc.showErrorMessage('DUPLICATE IDENT');
                        return;
                      }
                      let insertIndex = selectedWpIndex;
                      if (userWaypoint.offset > 0) {
                        if (scratchPadWaypointIndex !== selectedWpIndex || i == 1 && this._currentPage == 1 && userWaypoint.offset <= 0) {
                          this._fmc.showErrorMessage('WPT NOT MATCHED');
                          return;
                        } else {
                          insertIndex = userWaypoint.offset >= 0 ? selectedWpIndex + 1 : selectedWpIndex;
                        }
                      }
                      this._fmc._pilotWaypoints.addPilotWaypointWithOverwrite(userWaypoint.wpt.ident, userWaypoint.wpt.infos.coordinates.lat, userWaypoint.wpt.infos.coordinates.long);
                      this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                        this._fmc.flightPlanManager.addUserWaypoint(userWaypoint.wpt, insertIndex, () => {
                          const isDirectTo = i == 0 && this._currentPage == 1;
                          if (isDirectTo) {
                            this._fmc.flightPlanManager.activateDirectToByIndex(insertIndex, () => {
                              this._fmc.activateRoute(true, () => {
                                this.resetAfterOp();
                              });
                            });
                          } else {
                            this._fmc.activateRoute(false, () => {
                              this.resetAfterOp();
                            });
                          }
                        });
                      });
                    } else {
                      const pilotWaypoint = this._fmc._pilotWaypoints._pilotWaypointArray.find(w => w.id == value);
                      if (pilotWaypoint) {
                        const pilotWaypointObject = CJ4_FMC_PilotWaypointParser.buildPilotWaypointFromExisting(pilotWaypoint.id, parseFloat(pilotWaypoint.la), parseFloat(pilotWaypoint.lo), this._fmc);
                        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                          this._fmc.flightPlanManager.addUserWaypoint(pilotWaypointObject, selectedWpIndex, () => {
                            const isDirectTo = i == 0 && this._currentPage == 1;
                            if (isDirectTo) {
                              this._fmc.flightPlanManager.activateDirectToByIndex(selectedWpIndex, () => {
                                this._fmc.activateRoute(true, () => {
                                  this.resetAfterOp();
                                });
                              });
                            } else {
                              this._fmc.activateRoute(false, () => {
                                this.resetAfterOp();
                              });
                            }
                          });
                        });
                      } else {
                        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                          this._fmc.insertWaypoint(value, selectedWpIndex, isSuccess => {
                            if (isSuccess) {
                              const isDirectTo = i == 0 && this._currentPage == 1;
                              if (isDirectTo) {
                                this._fmc.flightPlanManager.activateDirectToByIndex(selectedWpIndex, () => {
                                  this._fmc.activateRoute(true, () => {
                                    this.resetAfterOp();
                                  });
                                });
                              } else {
                                this._fmc.activateRoute(false, () => {
                                  this.resetAfterOp();
                                });
                              }
                            } else {
                              this._fmc.fpHasChanged = false;
                              this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.NONE;
                              this._fmc.eraseTemporaryFlightPlan(() => {
                                this.resetAfterOp();
                              });
                            }
                          });
                        });
                      }
                    }
                  }
                  break;
                }
              case B777_FMC_LegsPage.SELECT_MODE.DELETE:
                {
                  // DELETE WAYPOINT
                  if (i > 0 && this._currentPage == 1 || this._currentPage > 1) {
                    this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
                      if (waypoint.fix.icao === '$DISCO') {
                        if (waypoint.fix.isRemovable) {
                          this._fmc.flightPlanManager.clearDiscontinuity(waypoint.index);
                          this._fmc.activateRoute(false, () => {
                            this.resetAfterOp();
                          });
                        } else {
                          this._fmc.clearUserInput();
                          this._fmc.messageManager.showMessage('INVALID DELETE', 'SELECTED LINE CAN NOT <br> BE DELETED');
                        }
                      } else if (waypoint.fix.isHold) {
                        this._fmc.flightPlanManager.deleteHoldAtWaypointIndex(waypoint.index);
                        this._fmc.activateRoute(false, () => {
                          this.resetAfterOp();
                        });
                      } else {
                        const prev = this._fmc.flightPlanManager.getWaypoint(selectedWpIndex - 1);
                        const next = this._fmc.flightPlanManager.getWaypoint(selectedWpIndex + 1);
                        const current = this._fmc.flightPlanManager.getWaypoint(selectedWpIndex);
                        prev.endsInDiscontinuity = true;
                        if (next && next.infos.airwayIn === current.infos.airwayOut) {
                          next.infos.airwayIn = undefined;
                        }
                        if (prev && prev.infos.airwayOut === current.infos.airwayIn) {
                          prev.infos.airwayOut = undefined;
                        }
                        this._fmc.flightPlanManager.removeWaypoint(selectedWpIndex, false, () => {
                          this._fmc.activateRoute(false, () => {
                            this.resetAfterOp();
                          });
                        });
                      }
                    });
                  } else {
                    this._fmc.clearUserInput();
                    this._fmc.messageManager.showMessage('INVALID DELETE', 'SELECTED LINE CAN NOT <br> BE DELETED');
                  }
                  break;
                }
            }
          };
        }
      }
    }
    resetAfterOp() {
      this._fmc.clearUserInput();
      this._fmc.selectedWaypoint = undefined;
      this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.NONE;
      this.update(true);
    }
    bindEvents() {
      this._fmc._renderer.lsk(6).event = () => {
        let holdActive = false;
        let holdExiting = false;
        const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
        if (holdsDirector) {
          const holdIndex = this._fmc.flightPlanManager.getActiveWaypointIndex();
          holdActive = holdsDirector.isHoldActive(holdIndex);
          holdExiting = holdsDirector.isHoldExiting(holdIndex);
        }
        if (this._isAddingHold) {
          this.addHold();
        } else if (this._lsk6Field == '<ERASE') {
          if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
            this._fmc.fpHasChanged = false;
            this._fmc.selectMode = B777_FMC_LegsPage.SELECT_MODE.NONE;
            this._fmc.eraseTemporaryFlightPlan(() => {
              this._fmc.eraseRouteModifications();
              this.resetAfterOp();
            });
          }
        } else if (holdExiting) {
          holdsDirector.cancelHoldExit();
          this.update(true);
        } else if (holdActive) {
          holdsDirector.exitActiveHold();
          this.update(true);
        }
      };

      // EXEC
      this._fmc.onExecPage = () => {
        if (this._fmc.fpHasChanged && this._fmc._isRouteActivated) {
          this._fmc.refreshPageCallback = () => {
            this.resetAfterOp();
          }; // TODO this seems annoying, but this is how stuff works in cj4_fmc right now
          this._fmc.onExecDefault();
        } else if (this._fmc.fpHasChanged) {
          this._fmc.fpHasChanged = false;
          this._fmc.activateRoute(false, () => {
            //this._fmc.activatingDirectTo = false;
            this._fmc.refreshPageCallback = () => {
              this.resetAfterOp();
            }; // TODO this seems annoying, but this is how stuff works in cj4_fmc right now
            this._fmc.onExecDefault();
          });
        }
      };
      this._fmc.onPrevPage = () => {
        if (this._currentPage > 1) {
          this._currentPage--;
          this.update(true);
        } else {
          this._currentPage = this._pageCount;
          this.update(true);
        }
      };
      this._fmc.onNextPage = () => {
        if (this._currentPage < this._pageCount) {
          this._currentPage++;
          this.update(true);
        } else {
          this._currentPage = 1;
          this.update(true);
        }
      };
      if (this._isMapModePlan) {
        //this._fmc.currentFlightPlanWaypointIndex = this._activeWptIndex + offset + this._step - this._discoOffset;
        const steps = this.buildSteps();
        if (steps.length > 0) {
          this._fmc._renderer.rsk(6).event = () => {
            let nextStep;
            if (steps[this._step.index + 1]) {
              nextStep = steps[this._step.index + 1];
            } else {
              nextStep = steps[0];
            }
            this._step = nextStep;
            this._currentPage = nextStep.page;
            SimVar.SetSimVarValue('L:B77RS_MCDU_CURRENT_FPLN_WAYPOINT', 'number', this._activeWptIndex + nextStep.index);
            this.update(true);
          };
        }
      } else {
        this._fmc._renderer.rsk(6).event = () => {
          new B777_FMC_RouteDataPage(this._fmc).showPage();
        };
      }
    }

    /**
     * Build steps array
     * @returns {*[]}
     */
    buildSteps() {
      let steps = [];
      for (let i = 0; i < this._wayPointsToRender.length; i++) {
        /**
         * Skip discontinuities
         */
        if (this._wayPointsToRender[i] && this._wayPointsToRender[i].fix.icao === '$DISCO') {
          continue;
        }

        /**
         * Build step
         */
        const page = Math.ceil((i + 1) / 5);
        const positionOffset = (page - 1) * 5;
        const position = i - positionOffset;
        const index = steps.length;
        steps.push({
          /**
           * Index of step
           */
          index: index,
          /**
           * Page of step
           */
          page: page,
          /**
           * Position on page
           */
          position: position,
          /**
           * ICAO of waypoint (just for debug purpose)
           */
          icao: this._wayPointsToRender[i].fix.icao
        });
      }
      return steps;
    }
    addHold() {
      /** @type {{waypoint: WayPoint, index: number}} */
      const holdWaypoint = this._fmc.flightPlanManager.getAllWaypoints().map((waypoint, index) => ({
        waypoint,
        index
      })).slice(this._activeWptIndex).find(x => x.waypoint.ident === this._fmc.inOut);
      if (holdWaypoint !== undefined) {
        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
          const details = HoldDetails.createDefault(holdWaypoint.waypoint.bearingInFP, holdWaypoint.waypoint.bearingInFP);
          this._fmc.flightPlanManager.addHoldAtWaypointIndex(holdWaypoint.index, details);
          this._fmc.inOut = '';
          this._fmc.activateRoute(false, () => {
            B777_FMC_HoldPage.showHoldPage(this._fmc, holdWaypoint.waypoint.ident);
          });
        });
      } else {
        this._fmc.showErrorMessage('INVALID ENTRY');
      }
    }

    // TODO, later this could be in the base class
    invalidate() {
      this._isDirty = true;
      this._fmc.cleanUpPage();
      this.updateLegs();
      this.render();
      this.bindInputs(); // TODO ideally this should only be called once, but clearDisplay clears everthing
      this.bindEvents(); // TODO     ""
      this._isDirty = false;
    }
    getAltSpeedRestriction(waypoint) {
      let speedConstraint = '---';
      let altitudeConstraint = '----- ';
      const wpt = waypoint;
      if (wpt.speedConstraint && wpt.speedConstraint > 100) {
        speedConstraint = wpt.speedConstraint;
      }
      if (wpt.legAltitudeDescription > 0) {
        if (wpt.legAltitudeDescription == 1) {
          altitudeConstraint = wpt.legAltitude1.toFixed(0) >= 18000 ? 'FL' + wpt.legAltitude1.toFixed(0) / 100 : wpt.legAltitude1.toFixed(0);
        } else if (wpt.legAltitudeDescription == 2) {
          altitudeConstraint = wpt.legAltitude1.toFixed(0) >= 18000 ? 'FL' + wpt.legAltitude1.toFixed(0) / 100 + 'A' : wpt.legAltitude1.toFixed(0) + 'A';
        } else if (wpt.legAltitudeDescription == 3) {
          altitudeConstraint = wpt.legAltitude1.toFixed(0) >= 18000 ? 'FL' + wpt.legAltitude1.toFixed(0) / 100 + 'B' : wpt.legAltitude1.toFixed(0) + 'B';
        } else if (wpt.legAltitudeDescription == 4) {
          const altitudeConstraintA = wpt.legAltitude2.toFixed(0) >= 18000 ? 'FL' + wpt.legAltitude2.toFixed(0) / 100 + 'A' : wpt.legAltitude2.toFixed(0) + 'A';
          const altitudeConstraintB = wpt.legAltitude1.toFixed(0) >= 18000 ? 'FL' + wpt.legAltitude1.toFixed(0) / 100 + 'B' : wpt.legAltitude1.toFixed(0) + 'B';
          altitudeConstraint = altitudeConstraintA + altitudeConstraintB;
        }
      }
      altitudeConstraint = altitudeConstraint.padStart(6, ' ');

      //if (this._fmc._speedDirector._commandedSpeedType === SpeedType.SPEED_TYPE_WAYPOINT && isActive) {
      //	speedConstraint = this._fmc.colorizeContent(speedConstraint, 'magenta');
      //}

      return speedConstraint + '/' + altitudeConstraint + '';
    }
    parseConstraintInput(value, waypoint) {
      let re = /(\d*)\/(F?|FL?)(\d+)([AB]?)(F?|FL?)(\d+)?([AB]?)/;
      // 1 = speed
      // 2 = F/FL
      // 3 = ALT
      // 4 = A/B
      // 5 = F/FL
      // 6 = ALT
      // 7 = A/B
      let match = value.match(re);
      if (!match) {
        // no match, input without speed?
        re = /()(F?|FL?)(\d+)([AB]?)(F?|FL?)(\d+)?([AB]?)/;
        match = value.match(re);
        if (!match) {
          return;
        }
        // if "alt" is < 500 and no FL its a speed
        if (match[2] === '' && match[3] !== '' && isFinite(match[3])) {
          const speed = Number(match[3]);
          if (speed < 500) {
            match[1] = speed;
            match[3] = '';
          }
        }
      }

      // speed
      if (match[1] !== '') {
        const speed = Number(match[1]);
        if (isFinite(speed) && speed > 0 && speed < 500) {
          waypoint.speedConstraint = speed;
        }
      }

      // alt 1
      if (match[3] !== '') {
        const fl = match[2];
        let alt = Number(match[3]);
        if (isFinite(alt)) {
          const multi = fl === 'F' || fl === 'FL' ? 100 : 1;
          alt *= multi;
          if (alt >= -1300 || alt <= 65000) {
            waypoint.legAltitude1 = alt;
          }
          // alt desc
          if (match[4] !== '') {
            waypoint.legAltitudeDescription = match[4] === 'A' ? 2 : 3;
          } else {
            waypoint.legAltitudeDescription = 1;
          }
        }
      }

      // alt 2
      if (match[6] !== '') {
        const fl = match[5];
        let alt = Number(match[6]);
        if (isFinite(alt)) {
          const multi = fl === 'F' || fl === 'FL' ? 100 : 1;
          alt *= multi;
          if (alt >= -1300 || alt <= 65000) {
            waypoint.legAltitude2 = alt;
          }
          // alt desc
          if (match[7] !== '') {
            waypoint.legAltitudeDescription = 4;
          } else {
            waypoint.legAltitudeDescription = 1;
          }
        }
      }
    }
    static ShowPage1(fmc) {
      let isAddingHold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      fmc.cleanUpPage();

      // create page instance and init
      LegsPageInstance = new B777_FMC_LegsPage(fmc, isAddingHold);
      LegsPageInstance.update();
    }
  }
  _defineProperty(B777_FMC_LegsPage, "SELECT_MODE", {
    NONE: 'NONE',
    EXISTING: 'EXISTING',
    NEW: 'NEW',
    DELETE: 'DELETE'
  });
  _defineProperty(B777_FMC_LegsPage, "DEBUG_SHOW_WAYPOINT_PHASE", false);

  class B777_FMC_HoldPage {
    /**
    * Creates an instance of the holds page controller.
    * @param {B777_FMC} fmc The instance of the FMC to use with this instance.
    */
    constructor(fmc) {
      _defineProperty(this, "_fmc", void 0);
      _defineProperty(this, "_state", void 0);
      /** The FMC instance. */
      this._fmc = fmc;

      /** The page state. */
      this._state = {
        pageNumber: 1,
        fromWaypointIndex: 0,
        isModifying: false,
        page: B777_FMC_HoldPage.FPLN_HOLD
      };
    }

    /**
    * Initializes the holds page instance.
    */
    prepare() {
      this.update(true);
    }

    /**
     * Updates the holds page.
     * @param {boolean} forceUpdate Whether or not to force the page update.
     */
    update() {
      this._fmc.cleanUpPage();
      const currentHolds = B777_FMC_HoldPage.getFlightplanHolds(this._fmc);
      if (currentHolds.length === 0) {
        B777_FMC_LegsPage.ShowPage1(this._fmc, true);
      } else {
        if (this._state.page === B777_FMC_HoldPage.HOLD_LIST) {
          if (currentHolds.length > 1) {
            this.bindHoldListInputs(currentHolds);
            this.renderHoldList(currentHolds);
          } else {
            this._state.page = B777_FMC_HoldPage.FPLN_HOLD;
          }
        }
        if (this._state.page === B777_FMC_HoldPage.FPLN_HOLD) {
          this._state.fromWaypointIndex = this._fmc.flightPlanManager.getActiveWaypointIndex() - 1;
          if (this._state.pageNumber > currentHolds.length) {
            this._state.pageNumber = currentHolds.length;
          }
          if (this._state.pageNumber < 1) {
            this._state.pageNumber = 1;
          }
          const currentHold = currentHolds[this._state.pageNumber - 1];
          const eta = this.calculateETA(currentHold);
          this.bindFplnHoldInputs(currentHold, currentHolds.length);
          this.renderFplnHold(currentHold, eta, currentHolds.length);
        }
      }
      this._fmc.registerPeriodicPageRefresh(() => {
        this.update();
        return true;
      }, 1000, false);
    }

    /**
     * Binds LSK behavior for the FPLN HOLD page.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold that is being displayed.
     * @param {number} numHolds The total number of holds currently in the plan.
     */
    bindFplnHoldInputs(currentHold, numHolds) {
      this._fmc._renderer.lsk(3).event = () => this.changeHoldCourse(currentHold);
      this._fmc._renderer.lsk(4).event = () => this.changeHoldTime(currentHold);
      this._fmc._renderer.lsk(5).event = () => this.changeHoldDistance(currentHold);

      //this._fmc._renderer.rsk(1).event = () => this.toggleSpeedType(currentHold);
      this._fmc._renderer.rsk(4).event = () => this.changeEFCTime(currentHold);
      if (numHolds < 6) {
        this._fmc._renderer.rsk(5).event = () => B777_FMC_LegsPage.ShowPage1(this._fmc, true);
      }
      if (this.isHoldActive(currentHold)) {
        this._fmc._renderer.rsk(6).event = () => this.handleExitHold();
      }
      if (this.isHoldExiting(currentHold)) {
        this._fmc._renderer.rsk(6).event = () => this.handleCancelExit();
      }
      if (this._state.isModifying) {
        this._fmc._renderer.lsk(6).event = () => this.handleCancelMod();
      }
      this._fmc.onPrevPage = () => {
        this._state.pageNumber--;
        this.update();
      };
      this._fmc.onNextPage = () => {
        this._state.pageNumber++;
        this.update();
      };
      this._fmc.onExecPage = () => this.handleExec();
    }

    /**
     * Binds LSK behavior for the HOLD LIST page.
     * @param {{waypoint: WayPoint, index: number}[]} currentHolds The current holds that are being displayed.
     */
    bindHoldListInputs(currentHolds) {
      for (let i = 0; i < 6; i++) {
        if (i < 5 && currentHolds[i] !== undefined) {
          this._fmc._renderer.lsk(i + 1).event = () => B777_FMC_HoldPage.showHoldPage(this._fmc, currentHolds[i].waypoint.ident);
        } else if (i >= 5 && currentHolds[i] !== undefined) {
          this._fmc._renderer.rsk(i - 5 + 1).event = () => B777_FMC_HoldPage.showHoldPage(this._fmc, currentHolds[i].waypoint.ident);
        }
      }
      if (this._state.isModifying) {
        this._fmc._renderer.lsk(6).event = () => this.handleCancelMod();
      }
      if (currentHolds.length < 6) {
        this._fmc._renderer.rsk(6).event = () => B777_FMC_LegsPage.ShowPage1(this._fmc, true);
      }
    }

    /**
     * Changes the hold's inbound course.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold to change the course for.
     */
    changeHoldCourse(currentHold) {
      const input = String(this._fmc.inOut);
      const parser = /(\d{3})(T?)\/(R|L)/;
      if (parser.test(input)) {
        this._fmc.inOut = '';
        const matches = parser.exec(input);
        const course = parseInt(matches[1]);
        const isTrueCourse = matches[2] === 'T';
        const isLeftTurn = matches[3] === 'L';
        const bearingToHoldWaypoint = this._fmc.flightPlanManager.getAllWaypoints()[currentHold.index - 1].bearingInFP;
        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
          const newDetails = Object.assign({}, currentHold.waypoint.holdDetails);
          newDetails.holdCourse = course;
          newDetails.isHoldCourseTrue = isTrueCourse;
          newDetails.turnDirection = isLeftTurn ? HoldTurnDirection.Left : HoldTurnDirection.Right;
          newDetails.entryType = HoldDetails.calculateEntryType(course, bearingToHoldWaypoint, newDetails.turnDirection);
          this._state.isModifying = true;
          this._fmc.fpHasChanged = true;
          this._fmc.flightPlanManager.modifyHoldDetails(currentHold.index, newDetails).then(() => {
            this._fmc.activateRoute(false, () => {
              this.update();
            });
          });
        });
      } else {
        this._fmc.showErrorMessage('INVALID ENTRY');
      }
    }

    /**
     * Changes the hold's leg time.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold to change the leg time for.
     */
    changeHoldTime(currentHold) {
      const input = parseFloat(this._fmc.inOut);
      if (!isNaN(input)) {
        this._fmc.inOut = '';
        const groundSpeed = Math.max(Simplane.getGroundSpeed(), 140);
        const distance = input * (groundSpeed / 60);
        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
          const newDetails = Object.assign({}, currentHold.waypoint.holdDetails);
          newDetails.speed = groundSpeed;
          newDetails.legTime = input * 60;
          newDetails.legDistance = distance;
          this._state.isModifying = true;
          this._fmc.fpHasChanged = true;
          this._fmc.flightPlanManager.modifyHoldDetails(currentHold.index, newDetails).then(() => {
            this._fmc.activateRoute(false, () => {
              this.update();
            });
          });
        });
      } else {
        this._fmc.showErrorMessage('INVALID ENTRY');
      }
    }

    /**
     * Changes the hold's leg time.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold to change the leg time for.
     */
    changeHoldDistance(currentHold) {
      const input = parseFloat(this._fmc.inOut);
      if (!isNaN(input)) {
        this._fmc.inOut = '';
        const groundSpeed = Math.max(Simplane.getGroundSpeed(), 120);
        const timeSeconds = input / (groundSpeed / 3600);
        this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
          const newDetails = Object.assign({}, currentHold.waypoint.holdDetails);
          newDetails.speed = groundSpeed;
          newDetails.legTime = timeSeconds;
          newDetails.legDistance = input;
          this._state.isModifying = true;
          this._fmc.fpHasChanged = true;
          this._fmc.flightPlanManager.modifyHoldDetails(currentHold.index, newDetails).then(() => {
            this._fmc.activateRoute(false, () => {
              this.update();
            });
          });
        });
      } else {
        this._fmc.showErrorMessage('INVALID ENTRY');
      }
    }

    /**
     * Toggles the hold's max speed type.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold to change the max speed type for.
     */
    toggleSpeedType(currentHold) {
      const speedType = currentHold.waypoint.holdDetails.holdSpeedType === HoldSpeedType.FAA ? HoldSpeedType.ICAO : HoldSpeedType.FAA;
      this._fmc.ensureCurrentFlightPlanIsTemporary(() => {
        const newDetails = Object.assign({}, currentHold.waypoint.holdDetails);
        newDetails.holdSpeedType = speedType;
        this._state.isModifying = true;
        this._fmc.flightPlanManager.modifyHoldDetails(currentHold.index, newDetails).then(() => this.update());
      });
    }

    /**
     * Updates the EFC time for the current hold.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold to change the EFC time for.
     */
    changeEFCTime(currentHold) {
      const pattern = /[0-2][0-9][0-5][0-9]/;
      if (pattern.test(this._fmc.inOut)) {
        currentHold.waypoint.holdDetails.efcTime = parseInt(this._fmc.inOut);
        this._fmc.inOut = '';
        this.update();
      } else {
        this._fmc.showErrorMessage('INVALID ENTRY');
      }
    }

    /**
     * Renders the FPLN HOLD page.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold.
     * @param {Date} eta The ETA to arrive at the hold fix.
     * @param {number} numPages The total number of pages.
     */
    renderFplnHold(currentHold, eta, numPages) {
      const actMod = this._state.isModifying ? 'MOD' : 'ACT';
      const etaDisplay = "".concat(eta.getHours().toFixed(0).padStart(2, '0'), ":").concat(eta.getMinutes().toFixed(0).padStart(2, '0'));
      const holdDetails = currentHold.waypoint.holdDetails;
      const speedSwitch = ""; //this._fmc.renderSwitch(["FAA", "ICAO"], holdDetails.holdSpeedType === HoldSpeedType.FAA ? 0 : 1);

      let efcTime = '----Z';
      if (holdDetails.efcTime !== undefined) {
        const efcTimeString = holdDetails.efcTime.toFixed(0);
        efcTime = "".concat(efcTimeString.substr(0, 2), ":").concat(efcTimeString.substr(2, 2));
      }
      const rows = [[' FIX', ''], ["".concat(currentHold.waypoint.ident), speedSwitch], [' QUAD/RADIAL', 'MAX KIAS '], ['--/---°', this.getMaxKIAS(holdDetails).toFixed(0)], [' INBD CRS/DIR', 'FIX ETA '], [this._fmc.makeSettable("".concat(holdDetails.holdCourse.toFixed(0).padStart(3, '0')).concat(holdDetails.isHoldCourseTrue ? 'T' : '', "\xB0/").concat(holdDetails.turnDirection === HoldTurnDirection.Left ? 'L' : 'R', " TURN")), "".concat(etaDisplay)], [' LEG TIME', 'EFC TIME '], [this._fmc.makeSettable((holdDetails.legTime / 60).toFixed(1)) + ' MIN', efcTime], [' LEG DIST'], [this._fmc.makeSettable(holdDetails.legDistance.toFixed(1)) + 'NM', "".concat(numPages < 6 ? 'NEW HOLD>' : '')], ['__FMCSEPARATOR'], ["".concat(this._state.isModifying ? '<ERASE' : ''), "".concat(this.isHoldExiting(currentHold) ? 'CANCEL EXIT>' : this.isHoldActive(currentHold) ? 'EXIT HOLD>' : '')]];
      this._fmc._renderer.renderTitle("".concat(actMod, " RTE 1 HOLD"));
      this._fmc._renderer.renderPages(this._state.pageNumber, numPages);
      this._fmc._renderer.render(rows);
    }

    /**
     * Renders the HOLD LIST page.
     * @param {{waypoint: WayPoint, index: number}[]} currentHolds The current holds.
     */
    renderHoldList(currentHolds) {
      const actMod = this._state.isModifying ? 'MOD' : 'ACT';
      const getLine = holdIndex => currentHolds[holdIndex] !== undefined ? currentHolds[holdIndex].waypoint.ident : '';
      const rows = [[''], ["".concat(getLine(0)), "".concat(getLine(5))], [''], ["".concat(getLine(1))], [''], ["".concat(getLine(2))], [''], ["".concat(getLine(3))], [''], ["".concat(getLine(4))], [''], ["".concat(this._state.isModifying ? '<ERASE' : ''), "".concat(currentHolds.length < 6 ? 'NEW HOLD>' : '')]];
      this._fmc._renderer.renderTitle("".concat(actMod, " HOLD LIST"));
      this._fmc._renderer.renderPages(1, 1);
      this._fmc._renderer.render(rows);
    }

    /**
     * Handles when CANCEL MOD is pressed.
     */
    handleCancelMod() {
      if (this._fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
        this._fmc.eraseTemporaryFlightPlan(() => {
          this._fmc.fpHasChanged = false;
          this._state.isModifying = false;
          this._fmc.eraseRouteModifications();
          this.update();
        });
      }
    }

    /**
     * Handles when EXEC is pressed.
     */
    handleExec() {
      if (this._fmc.fpHasChanged && this._fmc._isRouteActivated) {
        this._fmc.refreshPageCallback = () => {
          this._state.isModifying = false;
          this.update();
        }; // TODO this seems annoying, but this is how stuff works in cj4_fmc right now
        this._fmc.onExecDefault();
      } else if (this._fmc.fpHasChanged) {
        this._fmc.fpHasChanged = false;
        this._fmc.activateRoute(false, () => {
          //this._fmc.activatingDirectTo = false;
          this._fmc.refreshPageCallback = () => {
            this.update();
          }; // TODO this seems annoying, but this is how stuff works in cj4_fmc right now
          this._fmc.onExecDefault();
        });
      }
      /*
       if (this._fmc._fpHasChanged) {
       this._fmc._fpHasChanged = false;
       this._state.isModifying = false;
      		 this._fmc.activateRoute(false, () => {
       this.update();
       this._fmc.onExecDefault();
       });
       }
       */
    }

    /**
     * Handles when EXIT HOLD is pressed.
     */
    handleExitHold() {
      const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
      if (holdsDirector) {
        holdsDirector.exitActiveHold();
        this.update();
      }
    }

    /**
     * Handles when CANCEL EXIT is pressed.
     */
    handleCancelExit() {
      const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
      if (holdsDirector) {
        holdsDirector.cancelHoldExit();
        this.update();
      }
    }

    /**
     * Whether or not the current hold is active.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold.
     * @returns {boolean} True if active, false otherwise.
     */
    isHoldActive(currentHold) {
      const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
      if (holdsDirector) {
        return holdsDirector.isHoldActive(currentHold.index);
      }
      return false;
    }

    /**
     * Whether or not the current hold is exiting.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold.
     * @returns {boolean} True if exiting, false otherwise.
     */
    isHoldExiting(currentHold) {
      const holdsDirector = this._fmc._lnav && this._fmc._lnav.holdsDirector;
      if (holdsDirector) {
        return holdsDirector.isHoldExiting(currentHold.index);
      }
      return false;
    }

    /**
     * Gets the maximum KIAS for the hold given the hold speed regulation selection.
     * @param {HoldDetails} holdDetails The details about the given hold.
     * @returns {number} The maximum hold speed in KIAS.
     */
    getMaxKIAS(holdDetails) {
      const altitude = Simplane.getAltitude();
      if (holdDetails.holdSpeedType === HoldSpeedType.FAA) {
        if (altitude <= 6000) {
          return 200;
        } else if (altitude > 6000 && altitude <= 14000) {
          return 230;
        } else {
          return 265;
        }
      } else if (holdDetails.holdSpeedType === HoldSpeedType.ICAO) {
        if (altitude <= 14000) {
          return 230;
        } else if (altitude > 14000 && altitude <= 20000) {
          return 240;
        } else if (altitude > 20000 && altitude <= 34000) {
          return 265;
        } else {
          return 280;
        }
      }
    }

    /**
     * Calculates the estimated time of arrival at the specified hold.
     * @param {{waypoint: WayPoint, index: number}} currentHold The current hold to change the course for.
     * @returns {Date} The ETA to the hold fix.
     */
    calculateETA(currentHold) {
      let simtime = SimVar.GetSimVarValue('E:ZULU TIME', 'seconds');
      const currentDate = new Date(0, 0, 0, 0, 0, 0);
      const activeHoldIndex = SimVar.GetSimVarValue('L:WT_NAV_HOLD_INDEX', 'number');
      const groundSpeed = Math.max(Simplane.getGroundSpeed(), 140);
      if (activeHoldIndex !== -1 && activeHoldIndex === currentHold.index) {
        const eteSeconds = Math.round(SimVar.GetSimVarValue('L:WT_CJ4_WPT_DISTANCE', 'number') / (groundSpeed / 3600));
        currentDate.setSeconds(simtime + eteSeconds);
        return currentDate;
      } else {
        const activeWaypointIndex = this._fmc.flightPlanManager.getActiveWaypointIndex() - 1;
        const waypointsToHold = this._fmc.flightPlanManager.getAllWaypoints().slice(activeWaypointIndex, currentHold.index - activeWaypointIndex);
        const planePosition = B777_FMC_HoldPage.getPlanePosition();
        let distanceToHold = 0;
        for (var i = 0; i < waypointsToHold.length; i++) {
          if (i === 0) {
            distanceToHold += Avionics.Utils.computeGreatCircleDistance(planePosition, waypointsToHold[i].infos.coordinates);
          } else {
            distanceToHold += Avionics.Utils.computeGreatCircleDistance(waypointsToHold[i - 1].infos.coordinates, waypointsToHold[i].infos.coordinates);
          }
        }
        const eteSeconds = Math.round(distanceToHold / (groundSpeed / 3600));
        currentDate.setSeconds(simtime + eteSeconds);
        return currentDate;
      }
    }

    /**
     * Gets the current plane position
     * @returns {LatLongAlt} The current plane position.
     */
    static getPlanePosition() {
      return new LatLongAlt(SimVar.GetSimVarValue('GPS POSITION LAT', 'degree latitude'), SimVar.GetSimVarValue('GPS POSITION LON', 'degree longitude'));
    }

    /**
     * Gets the holds defined in the flight plan.
     * @param {B777_FMC} fmc The FMC to use to look up the holds.
     * @returns {{waypoint: WayPoint, index: number}[]} A collection of waypoints that have holds defined.
     */
    static getFlightplanHolds(fmc) {
      const fromWaypointIndex = fmc.flightPlanManager.getActiveWaypointIndex() - 1;
      return fmc.flightPlanManager.getAllWaypoints().map((waypoint, index) => ({
        waypoint,
        index
      })).slice(fromWaypointIndex).filter(x => x.waypoint.hasHold);
    }

    /**
     * Gets a string for the given entry type.
     * @param {HoldEntry} entryType The entry type.
     * @returns {string} The string for the entry type.
     */
    static getEntryTypeString(entryType) {
      switch (entryType) {
        case HoldEntry.Direct:
          return 'DIRECT';
        case HoldEntry.Parallel:
          return 'PARALL';
        case HoldEntry.Teardrop:
          return 'TEARDP';
      }
    }

    /**
     * Shows the FPLN HOLD page optionally for the specified ident.
     * @param {B777_FMC} fmc The instance of the FMC to use.
     * @param {string} ident The ident to show.
     */
    static showHoldPage(fmc, ident) {
      const instance = new B777_FMC_HoldPage(fmc);
      const holds = B777_FMC_HoldPage.getFlightplanHolds(fmc);
      const holdPageIndex = holds.findIndex(x => x.waypoint.ident === ident);
      if (holdPageIndex !== -1) {
        instance._state.pageNumber = holdPageIndex + 1;
        instance._state.page = B777_FMC_HoldPage.FPLN_HOLD;
      }
      console.log('is fp changed' + fmc._fpHasChanged);
      instance._state.isModifying = fmc._fpHasChanged;
      B777_FMC_HoldPage.Instance = instance;
      instance.update();
    }

    /**
     * Shows the HOLD LIST page.
     * @param {B777_FMC} fmc The instance of the FMC to use.
     */
    static showHoldList(fmc) {
      const instance = new B777_FMC_HoldPage(fmc);
      instance._state.page = B777_FMC_HoldPage.HOLD_LIST;
      instance._state.isModifying = fmc._fpHasChanged;
      B777_FMC_HoldPage.Instance = instance;
      instance.update();
    }

    /**
     * Handles when HOLD is pressed from the IDX page.
     * @param {B777_FMC} fmc The instance of the FMC to use.
     */
    static handleHoldPressed(fmc) {
      const holds = B777_FMC_HoldPage.getFlightplanHolds(fmc);
      if (holds.length === 0) {
        B777_FMC_LegsPage.ShowPage1(fmc, true);
      } else if (holds.length === 1) {
        B777_FMC_HoldPage.showHoldPage(fmc, undefined);
      } else if (holds.length > 1) {
        B777_FMC_HoldPage.showHoldList(fmc);
      }
    }
  }
  _defineProperty(B777_FMC_HoldPage, "Instance", undefined);
  _defineProperty(B777_FMC_HoldPage, "FPLN_HOLD", 'FPLN HOLD');
  _defineProperty(B777_FMC_HoldPage, "HOLD_LIST", 'HOLD LIST');
  _defineProperty(B777_FMC_HoldPage, "NONE", 'NONE');
  _defineProperty(B777_FMC_HoldPage, "ADD", 'ADD');
  _defineProperty(B777_FMC_HoldPage, "CHANGE_EXISTING", 'CHANGE_EXISTING');

  class B777_FMC_NavRadioPage {
    static ShowPage(fmc) {
      fmc.cleanUpPage();
      fmc.refreshPageCallback = () => {
        B777_FMC_NavRadioPage.ShowPage(fmc);
      };
      B777_FMC_NavRadioPage._updateCounter = 0;
      fmc.pageUpdate = () => {
        B777_FMC_NavRadioPage._updateCounter++;
        if (B777_FMC_NavRadioPage._updateCounter >= 20) {
          B777_FMC_NavRadioPage.ShowPage(fmc);
        }
      };
      let radioOn = fmc.isRadioNavActive();
      let vor1FrequencyCell = '[]/[]';
      let vor1CourseCell = '';
      let radialLCell = '';
      if (!radioOn) {
        const bacon = fmc.radioNav.getVORBeacon(1);
        /*
         if (fmc.vor1FrequencyIdent != '') {
         vor1FrequencyCell = fmc.vor1FrequencyIdent + '/';
         } else {
         let approach = fmc.flightPlanManager.getApproach();
         if (approach && approach.name && approach.name.indexOf('VOR') !== -1) {
         if (approach.vorIdent != '') {
         fmc.vor1FrequencyIdent = approach.vorIdent;
         vor1FrequencyCell = approach.vorIdent + '/';
         } else {
         vor1FrequencyCell = Avionics.Utils.formatRunway(approach.name, true) + '/';
         }
         }
         }
         116.80MSEA
         */
        if (bacon.ident !== '' && fmc.vor1Frequency > 0) {
          vor1FrequencyCell = fmc.makeSettable(fmc.colorizeContent(fmc.vor1Frequency.toFixed(2), 'green') + fmc.resizeContent('M', 'small') + fmc.colorizeContent(bacon.ident, 'green'));
        } else if (bacon.ident === '' && fmc.vor1Frequency > 0) {
          vor1FrequencyCell = fmc.makeSettable(fmc.colorizeContent(fmc.vor1Frequency.toFixed(2), 'green') + fmc.resizeContent('M', 'small') + fmc.colorizeContent('---', 'green'));
        }
        if (vor1FrequencyCell == '[]/[]') {
          vor1FrequencyCell = fmc.makeSettable('-----');
        }
        if (bacon.radial) ;
        fmc._renderer.lsk(1).event = () => {
          let value = fmc.inOut;
          let numValue = parseFloat(value);
          fmc.clearUserInput();
          if (isFinite(numValue) && numValue >= 108 && numValue <= 117.95 && RadioNav.isHz50Compliant(numValue)) {
            fmc.vor1Frequency = numValue;
            if (fmc.isRadioNavActive()) {
              fmc.requestCall(() => {
                B777_FMC_NavRadioPage.ShowPage(fmc);
              });
            } else {
              fmc.radioNav.setVORStandbyFrequency(1, numValue).then(() => {
                fmc.radioNav.swapVORFrequencies(1);
                fmc.requestCall(() => {
                  B777_FMC_NavRadioPage.ShowPage(fmc);
                });
              });
            }
          } else if (value === BaseFMC.clrValue) {
            fmc.vor1Frequency = 0;
            B777_FMC_NavRadioPage.ShowPage(fmc);
          } else {
            fmc.showErrorMessage(fmc.defaultInputErrorMessage);
          }
        };
        vor1CourseCell = fmc.makeSettable('-----');
        if (fmc.vor1Course >= 0) {
          vor1CourseCell = fmc.makeSettable(fmc.vor1Course.toFixed(0)) + '°';
        }
        fmc._renderer.lsk(2).event = () => {
          let value = fmc.inOut;
          let numValue = parseFloat(value);
          fmc.clearUserInput();
          if (isFinite(numValue) && numValue >= 0 && numValue < 360) {
            SimVar.SetSimVarValue('K:VOR1_SET', 'number', numValue).then(() => {
              fmc.vor1Course = numValue;
              fmc.requestCall(() => {
                B777_FMC_NavRadioPage.ShowPage(fmc);
              });
            });
          } else if (value === BaseFMC.clrValue) {
            fmc.vor1Frequency = 0;
            B777_FMC_NavRadioPage.ShowPage(fmc);
          } else if (Avionics.Utils.isIdent(value)) {
            fmc.vor1FrequencyIdent = value;
            fmc.requestCall(() => {
              B777_FMC_NavRadioPage.ShowPage(fmc);
            });
          } else {
            fmc.showErrorMessage(fmc.defaultInputErrorMessage);
          }
        };
      }
      let vor2FrequencyCell = '[]/[]';
      let vor2CourseCell = '';
      let radialRCell = '';
      if (!radioOn) {
        const bacon = fmc.radioNav.getVORBeacon(2);
        if (bacon.ident !== '' && fmc.vor2Frequency > 0) {
          vor2FrequencyCell = fmc.makeSettable(fmc.colorizeContent(bacon.ident, 'green') + fmc.resizeContent('M', 'small') + fmc.colorizeContent(fmc.vor2Frequency.toFixed(2), 'green'));
        } else if (bacon.ident === '' && fmc.vor2Frequency > 0) {
          vor2FrequencyCell = fmc.makeSettable(fmc.resizeContent('M', 'small') + fmc.colorizeContent(fmc.vor2Frequency.toFixed(2), 'green') + fmc.colorizeContent('---', 'green'));
        }
        if (vor2FrequencyCell == '[]/[]') {
          vor2FrequencyCell = fmc.makeSettable('-----');
        }
        if (bacon.radial) ;

        /*
         vor2FrequencyCell = '[]/';
         if (fmc.vor2FrequencyIdent != '') {
         vor2FrequencyCell = fmc.vor2FrequencyIdent + '/';
         }
         if (fmc.vor2Frequency > 0) {
         vor2FrequencyCell = '[]/' + fmc.vor2Frequency.toFixed(2);
         } else {
         vor2FrequencyCell += '[]';
         }
         if (vor2FrequencyCell == '[]/[]') {
         vor2FrequencyCell = '-----';
         }
         */
        fmc._renderer.rsk(1).event = () => {
          let value = fmc.inOut;
          let numValue = parseFloat(value);
          fmc.clearUserInput();
          if (isFinite(numValue) && numValue >= 108 && numValue <= 117.95 && RadioNav.isHz50Compliant(numValue)) {
            fmc.vor2Frequency = numValue;
            if (fmc.isRadioNavActive()) {
              fmc.requestCall(() => {
                B777_FMC_NavRadioPage.ShowPage(fmc);
              });
            } else {
              fmc.radioNav.setVORStandbyFrequency(2, numValue).then(() => {
                fmc.radioNav.swapVORFrequencies(2);
                fmc.requestCall(() => {
                  B777_FMC_NavRadioPage.ShowPage(fmc);
                });
              });
            }
          } else if (value === BaseFMC.clrValue) {
            fmc.vor2Frequency = 0;
            B777_FMC_NavRadioPage.ShowPage(fmc);
          } else if (Avionics.Utils.isIdent(value)) {
            fmc.vor2FrequencyIdent = value;
            fmc.requestCall(() => {
              B777_FMC_NavRadioPage.ShowPage(fmc);
            });
          } else {
            fmc.showErrorMessage(fmc.defaultInputErrorMessage);
          }
        };
        vor2CourseCell = fmc.makeSettable('-----');
        if (fmc.vor2Course >= 0) {
          vor2CourseCell = fmc.makeSettable(fmc.vor2Course.toFixed(0)) + '°';
        }
        fmc._renderer.rsk(2).event = () => {
          let value = fmc.inOut;
          let numValue = parseFloat(value);
          fmc.clearUserInput();
          if (isFinite(numValue) && numValue >= 0 && numValue < 360) {
            SimVar.SetSimVarValue('K:VOR2_SET', 'number', numValue).then(() => {
              fmc.vor2Course = numValue;
              fmc.requestCall(() => {
                B777_FMC_NavRadioPage.ShowPage(fmc);
              });
            });
          } else {
            fmc.showErrorMessage(fmc.defaultInputErrorMessage);
          }
        };
      }
      let adf1FrequencyCell = '';
      let adf2FrequencyCell = '';
      let ilsFrequencyCell = '';
      if (!radioOn) {
        adf1FrequencyCell = fmc.makeSettable('-----');
        if (fmc.adf1Frequency > 0) {
          adf1FrequencyCell = fmc.makeSettable(fmc.adf1Frequency.toFixed(2));
        }
        fmc._renderer.lsk(3).event = () => {
          let value = fmc.inOut;
          let numValue = parseFloat(value);
          fmc.clearUserInput();
          if (isFinite(numValue) && numValue >= 100 && numValue <= 1699.9) {
            SimVar.SetSimVarValue('K:ADF_ACTIVE_SET', 'Frequency ADF BCD32', Avionics.Utils.make_adf_bcd32(numValue * 1000)).then(() => {
              fmc.adf1Frequency = numValue;
              fmc.requestCall(() => {
                B777_FMC_NavRadioPage.ShowPage(fmc);
              });
            });
          } else {
            fmc.showErrorMessage(fmc.defaultInputErrorMessage);
          }
        };
        adf2FrequencyCell = fmc.makeSettable('-----');
        if (fmc.adf2Frequency > 0) {
          adf2FrequencyCell = fmc.makeSettable(fmc.adf2Frequency.toFixed(2));
        }
        fmc._renderer.rsk(3).event = () => {
          let value = fmc.inOut;
          let numValue = parseFloat(value);
          fmc.clearUserInput();
          if (isFinite(numValue) && numValue >= 100 && numValue <= 1699.9) {
            SimVar.SetSimVarValue('K:ADF2_ACTIVE_SET', 'Frequency ADF BCD32', Avionics.Utils.make_adf_bcd32(numValue * 1000)).then(() => {
              fmc.adf2Frequency = numValue;
              fmc.requestCall(() => {
                B777_FMC_NavRadioPage.ShowPage(fmc);
              });
            });
          } else {
            fmc.showErrorMessage(fmc.defaultInputErrorMessage);
          }
        };
        ilsFrequencyCell = '[]/ ';
        let approach = fmc.flightPlanManager.getApproach();
        if (approach && approach.name && approach.name.indexOf('ILS') !== -1) {
          ilsFrequencyCell = Avionics.Utils.formatRunway(approach.name) + '/ ';
          let runway = fmc.flightPlanManager.getApproachRunway();
          if (runway) {
            runway.direction.toFixed(0) + '°';
          }
        }
        if (isFinite(fmc.ilsFrequency) && fmc.ilsFrequency > 0) {
          ilsFrequencyCell += fmc.ilsFrequency.toFixed(2);
        } else {
          ilsFrequencyCell += '[ ]';
        }
        fmc._renderer.lsk(4).event = () => {
          let value = fmc.inOut;
          fmc.clearUserInput();
          if (fmc.setIlsFrequency(value)) {
            B777_FMC_NavRadioPage.ShowPage(fmc);
          }
        };
      }
      fmc._renderer.lsk(6).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (value == BaseFMC.clrValue) {
          fmc.pre1Frequency = undefined;
        } else if (value == '') {
          fmc.inOut = String(fmc.pre1Frequency);
        } else {
          let valueNumber = Number(value);
          if (isFinite(valueNumber) && valueNumber >= 0 && valueNumber < 1699.9) {
            fmc.clearUserInput();
            fmc.pre1Frequency = valueNumber;
          } else {
            fmc.showErrorMessage('INVALID ENTRY');
          }
        }
        B777_FMC_NavRadioPage.ShowPage(fmc);
      };
      fmc._renderer.rsk(6).event = () => {
        let value = fmc.inOut;
        fmc.clearUserInput();
        if (value == BaseFMC.clrValue) {
          fmc.pre2Frequency = undefined;
        } else if (value == '') {
          fmc.inOut = String(fmc.pre2Frequency);
        } else {
          const valueNumber = Number(value);
          if (isFinite(valueNumber) && valueNumber >= 0 && valueNumber < 1699.9) {
            fmc.clearUserInput();
            fmc.pre2Frequency = valueNumber;
            B777_FMC_NavRadioPage.ShowPage(fmc);
          } else {
            fmc.showErrorMessage('INVALID ENTRY');
          }
        }
        B777_FMC_NavRadioPage.ShowPage(fmc);
      };
      let pre1FrequencyCell = '------';
      if (fmc.pre1Frequency) {
        pre1FrequencyCell = String(fmc.pre1Frequency);
      }
      let pre2FrequencyCell = '------';
      if (fmc.pre2Frequency) {
        pre2FrequencyCell = String(fmc.pre2Frequency);
      }
      fmc._renderer.renderTitle('NAV RADIO');
      fmc._renderer.render([['VOR L', 'VOR R'], [vor1FrequencyCell, vor2FrequencyCell], ['CRS', 'RADIAL', 'CRS'], [vor1CourseCell, radialLCell, radialRCell, vor2CourseCell], ['ADF L', 'ADF R'], [adf1FrequencyCell, adf2FrequencyCell], ['ILS-MLS'], [fmc.makeSettable(ilsFrequencyCell)], [''], [''], ['', 'PRESELECT', ''], [fmc.makeSettable(pre1FrequencyCell), fmc.makeSettable(pre2FrequencyCell)]]);
    }
  }
  _defineProperty(B777_FMC_NavRadioPage, "_updateCounter", 0);

  class B777_FMC_ProgressPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      B777_FMC_ProgressPage._timer = 0;
      fmc.pageUpdate = () => {
        B777_FMC_ProgressPage._timer++;
        if (B777_FMC_ProgressPage._timer >= 15) {
          B777_FMC_ProgressPage.ShowPage1(fmc);
        }
      };
      let useImperial = HeavyDivision.Configuration.useImperial();
      let fuelModifier;
      if (useImperial) {
        fuelModifier = 1.0;
      } else {
        fuelModifier = 0.45359237;
      }
      let progressTitle = SimVar.GetSimVarValue("ATC FLIGHT NUMBER", "string") + " PROGRESS";
      let speed = Simplane.getGroundSpeed();
      let currentTime = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
      let currentFuel = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'pounds') / 1000;
      let currentFuelFlow = SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:1', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:2', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:3', 'pound per hour') + SimVar.GetSimVarValue('TURB ENG FUEL FLOW PPH:4', 'pound per hour');
      currentFuelFlow = currentFuelFlow / 1000;
      let waypointActiveCell = '';
      let waypointActiveDistanceCell = '';
      let waypointActiveETACell = '';
      let waypointActiveFuelCell = '';
      let waypointActive = fmc.flightPlanManager.getActiveWaypoint();
      let waypointActiveDistance = fmc.flightPlanManager.getDistanceToActiveWaypoint();
      if (waypointActive) {
        waypointActiveCell = waypointActive.ident;
        if (isFinite(waypointActiveDistance)) {
          waypointActiveDistanceCell = waypointActiveDistance.toFixed(0) + ' ';
          let eta = undefined;
          eta = (B777_FMC_ProgressPage.computeEtaToWaypoint(waypointActiveDistance, speed) + currentTime) % 86400;
          if (isFinite(eta)) {
            let etaHours = Math.floor(eta / 3600);
            let etaMinutes = Math.floor((eta - etaHours * 3600) / 60);
            waypointActiveETACell = etaHours.toFixed(0).padStart(2, '0') + etaMinutes.toFixed(0).padStart(2, '0') + '[size=small]Z[/size]';
          }
          let fuelLeft = fmc.computeFuelLeft(waypointActiveDistance, speed, currentFuel, currentFuelFlow);
          if (isFinite(fuelLeft)) {
            waypointActiveFuelCell = (fuelLeft * fuelModifier).toFixed(1);
          }
        }
      }
      let waypointActiveNextCell = '';
      let waypointActiveNext;
      let waypointActiveNextDistanceCell = '';
      let waypointActiveNextETACell = '';
      let waypointActiveNextFuelCell = '';
      let waypointActiveNextDistance = NaN;
      if (fmc.flightPlanManager.getActiveWaypointIndex() != -1) {
        waypointActiveNext = fmc.flightPlanManager.getNextActiveWaypoint();
        if (waypointActiveNext) {
          waypointActiveNextCell = waypointActiveNext.ident;
          if (waypointActive && isFinite(waypointActiveDistance)) {
            let d = Avionics.Utils.computeGreatCircleDistance(waypointActive.infos.coordinates, waypointActiveNext.infos.coordinates);
            if (isFinite(d)) {
              waypointActiveNextDistance = d + waypointActiveDistance;
              waypointActiveNextDistanceCell = waypointActiveNextDistance.toFixed(0) + ' ';
              let eta = undefined;
              eta = (B777_FMC_ProgressPage.computeEtaToWaypoint(waypointActiveNextDistance, speed) + currentTime) % 86400;
              if (isFinite(eta)) {
                let etaHours = Math.floor(eta / 3600);
                let etaMinutes = Math.floor((eta - etaHours * 3600) / 60);
                waypointActiveNextETACell = etaHours.toFixed(0).padStart(2, '0') + etaMinutes.toFixed(0).padStart(2, '0') + '[size=small]Z[/size]';
              }
              let fuelLeft = fmc.computeFuelLeft(waypointActiveNextDistance, speed, currentFuel, currentFuelFlow);
              if (isFinite(fuelLeft)) {
                waypointActiveNextFuelCell = (fuelLeft * fuelModifier).toFixed(1);
              }
            }
          }
        }
      }
      let destinationCell = '';
      let destination = fmc.flightPlanManager.getDestination();
      let destinationDistanceCell = '';
      let destinationETACell = '';
      let destinationFuelCell = '';
      let destinationDistance = NaN;
      if (destination) {
        destinationCell = destination.ident;
        destinationDistance = destination.cumulativeDistanceInFP;
        if (waypointActive) {
          const missed = fmc.flightPlanManager.getCurrentFlightPlan().approach;
          const mWayipoints = missed.waypoints;
          if (mWayipoints.length > 0) {
            const cumulativeToApproach = mWayipoints[mWayipoints.length - 1].cumulativeDistanceInFP;
            destinationDistance = cumulativeToApproach;
          }
          destinationDistance -= waypointActive.cumulativeDistanceInFP;
          destinationDistance += fmc.flightPlanManager.getDistanceToActiveWaypoint();
          if (isFinite(destinationDistance)) {
            destinationDistanceCell = destinationDistance.toFixed(0) + ' ';
            let eta = undefined;
            eta = (B777_FMC_ProgressPage.computeEtaToWaypoint(destinationDistance, speed) + currentTime) % 86400;
            if (isFinite(eta)) {
              let etaHours = Math.floor(eta / 3600);
              let etaMinutes = Math.floor((eta - etaHours * 3600) / 60);
              destinationETACell = etaHours.toFixed(0).padStart(2, '0') + etaMinutes.toFixed(0).padStart(2, '0') + '[size=small]Z[/size]';
            }
            let fuelLeft = fmc.computeFuelLeft(destinationDistance, speed, currentFuel, currentFuelFlow);
            if (isFinite(fuelLeft)) {
              destinationFuelCell = (fuelLeft * fuelModifier).toFixed(1);
            }
          }
        }
      }
      let toTODCell = '';
      let todDistanceCell = '';
      let todETACell = '';
      const showTOD = SimVar.GetSimVarValue('L:AIRLINER_FMS_SHOW_TOP_DSCNT', 'number');
      if (showTOD === 1) {
        const distanceToTOD = SimVar.GetSimVarValue('L:WT_CJ4_TOD_REMAINING', 'number');
        if (distanceToTOD) {
          todDistanceCell = distanceToTOD.toFixed(0) + '[size=small]NM[/size]';
          let eta = undefined;
          eta = (B777_FMC_ProgressPage.computeEtaToWaypoint(distanceToTOD, speed) + currentTime) % 86400;
          if (isFinite(eta)) {
            let etaHours = Math.floor(eta / 3600);
            let etaMinutes = Math.floor((eta - etaHours * 3600) / 60);
            todETACell = etaHours.toFixed(0).padStart(2, '0') + etaMinutes.toFixed(0).padStart(2, '0') + '[size=small]Z[/size]';
          }
          toTODCell = todETACell + '/' + todDistanceCell;
        }
      }
      fmc._renderer.render([[progressTitle], ['TO', 'DTG', 'ETA', 'FUEL'], [waypointActiveCell, waypointActiveDistanceCell, waypointActiveETACell, waypointActiveFuelCell], ['NEXT', ''], [waypointActiveNextCell, waypointActiveNextDistanceCell, waypointActiveNextETACell, waypointActiveNextFuelCell], ['DEST'], [destinationCell, destinationDistanceCell, destinationETACell, destinationFuelCell], ['', 'TO T/D'], ['', toTODCell], [''], [''], [''], ['<POS REPORT', 'POS REF>']]);
    }
    static computeEtaToWaypoint(distance, groundSpeed) {
      if (groundSpeed < 50) {
        groundSpeed = 50;
      }
      if (groundSpeed > 0.1) {
        return distance / groundSpeed * 3600;
      }
    }
  }
  _defineProperty(B777_FMC_ProgressPage, "_timer", 0);

  class B777_FMC_RobIRSPage {
    constructor(fmc) {
      _defineProperty(this, "fmc", void 0);
      this.fmc = fmc;
    }
    showPage() {
      this.fmc.cleanUpPage();
      let irsState = SimVar.GetSimVarValue('L:B77RS_ADIRU_STATE', 'Number');
      let irsStateString = '';
      switch (irsState) {
        case 0:
          irsStateString = '[color=red]OFF[/color]';
          break;
        case 1:
          irsStateString = '[color=blue]ALIGNING[/color]';
          break;
        case 2:
          irsStateString = '[color=green]ALIGNED[/color]';
          break;
      }
      let irsAlignSpeed;
      switch (HeavyDataStorage.get('ADIRU_ALIGN_SPEED', 'REAL')) {
        case 'INSTANT':
          irsAlignSpeed = 'INSTANT';
          break;
        case 'FAST':
          irsAlignSpeed = 'FAST';
          break;
        case 'NORMAL':
          irsAlignSpeed = 'NORMAL';
          break;
        case 'REAL':
          irsAlignSpeed = 'REAL';
          break;
      }
      this.fmc.refreshPageCallback = () => {
        this.showPage();
      };
      this.fmc._renderer.renderTitle('ADIRU');
      this.fmc._renderer.render([['ADIRU STATUS', 'ALIGN TIME'], [irsStateString, irsAlignSpeed + '>'], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', 'FORCE ALIGN>'], ['', ''], ['<BACK']]);
      this.fmc._renderer.rsk(5).event = () => {
        SimVar.SetSimVarValue('L:B77RS_ADIRU_STATE', 'Number', 2);
        SimVar.SetSimVarValue('L:B77RS_ADIRU_BUTTON_STATE', 'Number', 1);
        SimVar.SetSimVarValue('L:B77RS_IS_IRS_INITED', 'String', '2');
        this.showPage();
      };
      this.fmc._renderer.rsk(1).event = () => {
        this.showAlignSpeedConfigurationPage();
      };
      this.fmc._renderer.lsk(6).event = () => {
        B777_FMC_RobPage.ShowPage1(this.fmc);
      };
      this.fmc.registerPeriodicPageRefresh(() => {
        this.showPage();
        return true;
      }, 1000, false);
    }
    showAlignSpeedConfigurationPage() {
      this.fmc.cleanUpPage();
      let irsState = SimVar.GetSimVarValue('L:B77RS_ADIRU_STATE', 'Number');
      let irsStateString = '';
      switch (irsState) {
        case 0:
          irsStateString = '[color=red]OFF[/color]';
          break;
        case 1:
          irsStateString = '[color=blue]ALIGNING[/color]';
          break;
        case 2:
          irsStateString = '[color=green]ALIGNED[/color]';
          break;
      }
      let irsAlignSpeed;
      switch (HeavyDataStorage.get('ADIRU_ALIGN_SPEED', 'REAL')) {
        case 'INSTANT':
          irsAlignSpeed = 'INSTANT';
          break;
        case 'FAST':
          irsAlignSpeed = 'FAST';
          break;
        case 'NORMAL':
          irsAlignSpeed = 'NORMAL';
          break;
        case 'REAL':
          irsAlignSpeed = 'REAL';
          break;
      }
      this.fmc._renderer.renderTitle('ADIRU');
      this.fmc._renderer.render([['ADIRU STATUS', 'ALIGN TIME'], [irsStateString, irsAlignSpeed], ['', ''], ['', '[size=small]<INSTANT[/size]'], ['', ''], ['', '[size=small]<FAST[/size]'], ['', ''], ['', '[size=small]<NORMAL[/size]'], ['', ''], ['', '[size=small]<REAL[/size]'], ['', ''], ['<BACK']]);
      this.fmc._renderer.rsk(2).event = () => {
        HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'INSTANT');
        this.showPage();
      };
      this.fmc._renderer.rsk(3).event = () => {
        HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'FAST');
        this.showPage();
      };
      this.fmc._renderer.rsk(4).event = () => {
        HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'NORMAL');
        this.showPage();
      };
      this.fmc._renderer.rsk(5).event = () => {
        HeavyDataStorage.set('ADIRU_ALIGN_SPEED', 'REAL');
        this.showPage();
      };
    }
  }

  // Payload Manager for B777-200ER
  class B777_FMC_PayloadManagerPage {
    static get tankCapacity() {
      return {
        "CENTER": 26100,
        "LEFT_MAIN": 9560,
        "RIGHT_MAIN": 9560
      };
    }
    static get tankPriority() {
      return [['LEFT_MAIN', 'RIGHT_MAIN'], ['CENTER']];
    }
    static get tankVariables() {
      return {
        'CENTER': 'FUEL TANK CENTER QUANTITY',
        'LEFT_MAIN': 'FUEL TANK LEFT MAIN QUANTITY',
        'RIGHT_MAIN': 'FUEL TANK RIGHT MAIN QUANTITY'
      };
    }
    static get payloadIndex() {
      return {
        "PILOT": 1,
        "COPILOT": 2,
        "CREW": 3,
        "BUSINESS_CLASS": 4,
        "PREMIUM_ECONOMY": 5,
        "FORWARD_ECONOMY": 6,
        "REAR_ECONOMY": 7,
        "FORWARD_BAGGAGE": 8,
        "REAR_BAGGAGE": 9
      };
    }
    static get getMaxFuel() {
      return 45220;
    }
    static get getMinFuel() {
      return 0;
    }
    static get getMaxPayload() {
      return 656000;
    }
    static get getMinPayload() {
      return 0;
    }
    static get getMaxCenterOfGravity() {
      return 44.0;
    }
    static get getMinCenterOfGravity() {
      return 14.0;
    }
    constructor(fmc) {
      _defineProperty(this, "fmc", void 0);
      _defineProperty(this, "tankPriorityValues", void 0);
      _defineProperty(this, "payloadValues", void 0);
      _defineProperty(this, "_internalPayloadValuesCache", void 0);
      this.fmc = fmc;
      this.tankPriorityValues = [];
      this.payloadValues = [];
      this.init();
    }
    init() {
      this.tankPriorityValues = [{
        'LEFT_MAIN': this.getTankValue(B777_FMC_PayloadManagerPage.tankVariables.LEFT_MAIN),
        'RIGHT_MAIN': this.getTankValue(B777_FMC_PayloadManagerPage.tankVariables.RIGHT_MAIN)
      }, {
        'CENTER': this.getTankValue(B777_FMC_PayloadManagerPage.tankVariables.CENTER)
      }];
      this._internalPayloadValuesCache = [];
      this.payloadValues = this.getPayloadValues();
      B777_FMC_PayloadManagerPage.centerOfGravity = this.getCenterOfGravity();
    }
    getPayloadValues() {
      return [{
        "PILOT": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.PILOT),
        "COPILOT": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.COPILOT),
        "CREW": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.CREW)
      }, {
        "BUSINESS_CLASS": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.BUSINESS_CLASS),
        "PREMIUM_ECONOMY": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.PREMIUM_ECONOMY),
        "FORWARD_BAGGAGE": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.FORWARD_BAGGAGE)
      }, {
        "FORWARD_ECONOMY": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.FORWARD_ECONOMY),
        "REAR_ECONOMY": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.REAR_ECONOMY),
        "REAR_BAGGAGE": this.getPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.REAR_BAGGAGE)
      }];
    }
    getPayloadValue(index) {
      return SimVar.GetSimVarValue('PAYLOAD STATION WEIGHT:' + index, 'Pounds');
    }
    getPayloadValueFromCache(index) {
      return this._internalPayloadValuesCache[index];
    }
    async setPayloadValue(index, value) {
      this._internalPayloadValuesCache[index] = value;
      return SimVar.SetSimVarValue('PAYLOAD STATION WEIGHT:' + index, 'Pounds', value);
    }
    getTankValue(variable) {
      return SimVar.GetSimVarValue(variable, 'Gallons');
    }
    getCenterOfGravity() {
      return SimVar.GetSimVarValue('CG PERCENT', 'Percent');
    }
    getTotalPayload() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let payload = 0;
      this.payloadValues.forEach(group => {
        Object.values(group).forEach(sectionValue => {
          payload = payload + Number(sectionValue);
        });
      });
      return useLbs ? payload : payload * 0.45359237;
    }
    getTotalFuel() {
      let useLbs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let fuel = 0;
      this.tankPriorityValues.forEach(group => {
        Object.values(group).forEach(sectionValue => {
          fuel = fuel + Number(sectionValue);
        });
      });
      return useLbs ? fuel * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'Pounds') : fuel;
    }
    async flushFuelAndPayload() {
      return new Promise(resolve => {
        this.flushFuel().then(() => {
          return this.resetPayload();
        }).then(() => {
          return this.fmc.getCurrentWeight(true);
        }).then(weight => {
          return this.fmc.setZeroFuelWeight((299000 + B777_FMC_PayloadManagerPage.requestedPayload) / 1000, EmptyCallback.Void, true);
        }).then(() => {
          return this.resetPayload();
        }).then(() => {
          resolve();
        });
      });
    }
    async flushFuel() {
      return new Promise(resolve => {
        let setTankFuel = async (variable, gallons) => {
          SimVar.SetSimVarValue(variable, 'Gallons', gallons);
        };
        B777_FMC_PayloadManagerPage.tankPriority.forEach((tanks, index) => {
          tanks.forEach(tank => {
            setTankFuel(B777_FMC_PayloadManagerPage.tankVariables[tank], 0).then(() => {
              console.log(B777_FMC_PayloadManagerPage.tankVariables[tank] + ' flushed');
            });
          });
        });
        this.fmc.trySetBlockFuel(0, true);
        resolve();
      });
    }
    calculateTanks(fuel) {
      this.tankPriorityValues[0].LEFT_MAIN = 0;
      this.tankPriorityValues[1].CENTER = 0;
      this.tankPriorityValues[0].RIGHT_MAIN = 0;
      fuel = this.calculateMainTanks(fuel);
      fuel = this.calculateCenterTank(fuel);
      let fuelBlock = 0;
      let setTankFuel = async (variable, gallons) => {
        fuelBlock += gallons;
        SimVar.SetSimVarValue(variable, 'Gallons', gallons);
      };
      B777_FMC_PayloadManagerPage.tankPriority.forEach((tanks, index) => {
        tanks.forEach(tank => {
          setTankFuel(B777_FMC_PayloadManagerPage.tankVariables[tank], this.tankPriorityValues[index][tank]).then(() => {
            console.log(B777_FMC_PayloadManagerPage.tankVariables[tank] + ' set to ' + this.tankPriorityValues[index][tank]);
          });
        });
      });
      this.fmc.trySetBlockFuel(fuelBlock * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'Pounds') / 1000, true);
    }
    calculateMainTanks(fuel) {
      let remainingFuel = 0;
      let tanksCapacity = B777_FMC_PayloadManagerPage.tankCapacity.LEFT_MAIN * 2;
      if (fuel > tanksCapacity) {
        remainingFuel = fuel - tanksCapacity;
        fuel = tanksCapacity;
      }
      let reminder = fuel % 2;
      let quotient = (fuel - reminder) / 2;
      this.tankPriorityValues[0].LEFT_MAIN = quotient;
      this.tankPriorityValues[0].RIGHT_MAIN = quotient;
      if (reminder) {
        this.tankPriorityValues[0].LEFT_MAIN++;
        reminder--;
      }
      if (reminder) {
        this.tankPriorityValues[0].RIGHT_MAIN++;
        reminder--;
      }
      return remainingFuel;
    }
    calculateCenterTank(fuel) {
      let remainingFuel = 0;
      let tankCapacity = B777_FMC_PayloadManagerPage.tankCapacity.CENTER;
      if (fuel > tankCapacity) {
        remainingFuel = fuel - tankCapacity;
        fuel = tankCapacity;
      }
      this.tankPriorityValues[1].CENTER = fuel;
      return remainingFuel;
    }
    showPage() {
      this.fmc.cleanUpPage();
      this.payloadValues = this.getPayloadValues();
      if (!B777_FMC_PayloadManagerPage.requestedPayload) {
        B777_FMC_PayloadManagerPage.requestedPayload = this.getTotalPayload(true);
      }
      if (!B777_FMC_PayloadManagerPage.requestedCenterOfGravity) {
        B777_FMC_PayloadManagerPage.requestedCenterOfGravity = this.getCenterOfGravity();
      }
      if (!B777_FMC_PayloadManagerPage.requestedFuel) {
        B777_FMC_PayloadManagerPage.requestedFuel = this.getTotalFuel();
      }
      if (B777_FMC_PayloadManagerPage.isPayloadManagerExecuted) {
        this.fmc.pageUpdate = () => {
          this.showPage();
        };
      }
      let rows = [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']];
      let weightPerGallon;
      let units;
      let payloadModifier;
      let useImperial = HeavyDivision.Configuration.useImperial();
      if (useImperial) {
        weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'pounds');
        units = 'Pounds';
        payloadModifier = 1.0;
      } else {
        weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms');
        units = 'Kg';
        payloadModifier = 0.45359237;
      }
      const totalFuel = this.getTotalFuel() * weightPerGallon;
      const fobToRender = totalFuel.toFixed(2);
      const fobReqToRender = B777_FMC_PayloadManagerPage.requestedFuel ? (B777_FMC_PayloadManagerPage.requestedFuel * weightPerGallon).toFixed(2) : fobToRender;
      const totalPayload = this.getTotalPayload(useImperial);
      const payloadToRender = totalPayload.toFixed(0);
      const payloadReqToRender = B777_FMC_PayloadManagerPage.requestedPayload ? (B777_FMC_PayloadManagerPage.requestedPayload * payloadModifier).toFixed(0) : payloadToRender;
      B777_FMC_PayloadManagerPage.requestedFuel ? B777_FMC_PayloadManagerPage.requestedFuel.toFixed(2) : this.getTotalFuel().toFixed(2);
      rows[0][0] = 'REQ VALUES';
      rows[0][1] = 'ACT VALUES';
      rows[2][0] = 'CG';
      rows[2][1] = 'CG';
      rows[3][0] = B777_FMC_PayloadManagerPage.requestedCenterOfGravity ? B777_FMC_PayloadManagerPage.requestedCenterOfGravity.toFixed(2) + '%' : B777_FMC_PayloadManagerPage.centerOfGravity.toFixed(2) + '%';
      rows[3][1] = this.getCenterOfGravity().toFixed(2) + '%';
      rows[4][0] = 'FOB (' + units + ')';
      rows[4][1] = 'FOB (' + units + ')';
      rows[5][0] = fobReqToRender;
      rows[5][1] = fobToRender;
      rows[6][0] = 'PAYLOAD (' + units + ')';
      rows[6][1] = 'PAYLOAD (' + units + ')';
      rows[7][0] = payloadReqToRender;
      rows[7][1] = payloadToRender;
      rows[8][0] = B777_FMC_PayloadManagerPage.remainingPayload ? 'REMAINING PAYLOAD' : '';
      rows[9][0] = B777_FMC_PayloadManagerPage.remainingPayload ? B777_FMC_PayloadManagerPage.remainingPayload + ' lb' : '';
      rows[11][0] = '<BACK';
      this.fmc._renderer.lsk(2).event = () => {
        if (isFinite(parseFloat(this.fmc.inOut))) {
          if (parseFloat(this.fmc.inOut) > B777_FMC_PayloadManagerPage.getMinCenterOfGravity && parseFloat(this.fmc.inOut) < B777_FMC_PayloadManagerPage.getMaxCenterOfGravity) {
            B777_FMC_PayloadManagerPage.requestedCenterOfGravity = parseFloat(this.fmc.inOut);
            this.fmc.clearUserInput();
            this.showPage();
          } else {
            this.fmc.showErrorMessage('OUT OF RANGE');
            return false;
          }
        } else {
          this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
          return false;
        }
      };
      this.fmc._renderer.lsk(3).event = () => {
        if (isFinite(parseFloat(this.fmc.inOut))) {
          let useImperial = HeavyDivision.Configuration.useImperial();
          let requestedInGallons;
          let weightPerGallon;
          if (useImperial) {
            weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'pounds');
          } else {
            weightPerGallon = SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms');
          }
          requestedInGallons = parseFloat(this.fmc.inOut) / weightPerGallon;
          if (parseFloat(requestedInGallons) > B777_FMC_PayloadManagerPage.getMinFuel && parseFloat(requestedInGallons) < B777_FMC_PayloadManagerPage.getMaxFuel) {
            B777_FMC_PayloadManagerPage.requestedFuel = parseFloat(requestedInGallons);
            this.fmc.clearUserInput();
            this.showPage();
          } else {
            this.fmc.showErrorMessage('OUT OF RANGE');
            return false;
          }
        } else {
          this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
          return false;
        }
      };
      this.fmc._renderer.lsk(4).event = () => {
        if (isFinite(parseFloat(this.fmc.inOut))) {
          let useImperial = HeavyDivision.Configuration.useImperial();
          let requestedInPounds;
          let payloadModifier;
          if (useImperial) {
            payloadModifier = 1.0;
          } else {
            payloadModifier = 2.20462262;
          }
          requestedInPounds = parseFloat(this.fmc.inOut) * payloadModifier;
          if (parseFloat(requestedInPounds) > B777_FMC_PayloadManagerPage.getMinPayload && parseFloat(requestedInPounds) < B777_FMC_PayloadManagerPage.getMaxPayload) {
            B777_FMC_PayloadManagerPage.requestedPayload = parseFloat(requestedInPounds);
            this.fmc.clearUserInput();
            this.showPage();
          } else {
            this.fmc.showErrorMessage('OUT OF RANGE');
            return false;
          }
        } else {
          this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
          return false;
        }
      };
      this.fmc._renderer.lsk(6).event = () => {
        B777_FMC_RobPage.ShowPage1(this.fmc);
      };
      if (B777_FMC_PayloadManagerPage.isPayloadManagerExecuted) {
        rows[11][1] = 'RUNNING...';
      } else {
        rows[11][1] = 'EXECUTE>';
        this.fmc._renderer.rsk(6).event = () => {
          B777_FMC_PayloadManagerPage.isPayloadManagerExecuted = true;
          this.flushFuelAndPayload().then(() => {
            if (B777_FMC_PayloadManagerPage.requestedFuel) {
              this.calculateTanks(B777_FMC_PayloadManagerPage.requestedFuel);
            } else {
              this.calculateTanks(this.getTotalFuel());
            }
            if (B777_FMC_PayloadManagerPage.requestedPayload) {
              this.calculatePayload(B777_FMC_PayloadManagerPage.requestedPayload).then(() => {
                B777_FMC_PayloadManagerPage.isPayloadManagerExecuted = false;
              });
            } else {
              this.calculatePayload(this.getTotalPayload(true)).then(() => {
                B777_FMC_PayloadManagerPage.isPayloadManagerExecuted = false;
              });
            }
            this.showPage();
          });
        };
      }
      this.fmc._renderer.renderTitle('PAYLOAD MANAGER');
      this.fmc._renderer.render(rows);
    }
    async resetPayload() {
      await this.setPayloadValue(1, 0);
      await this.setPayloadValue(2, 0);
      await this.setPayloadValue(3, 0);
      await this.setPayloadValue(4, 0);
      await this.setPayloadValue(5, 0);
      await this.setPayloadValue(6, 0);
      await this.setPayloadValue(7, 0);
      await this.setPayloadValue(8, 0);
      await this.setPayloadValue(9, 0);
    }
    async calculatePayload(requestedPayload) {
      await this.resetPayload();
      B777_FMC_PayloadManagerPage.remainingPayload = requestedPayload;
      let amount = 0;
      let requestedCenterOfGravity = B777_FMC_PayloadManagerPage.requestedCenterOfGravity ? B777_FMC_PayloadManagerPage.requestedCenterOfGravity : this.getCenterOfGravity();
      while (B777_FMC_PayloadManagerPage.remainingPayload > 0) {
        B777_FMC_PayloadManagerPage.centerOfGravity = this.getCenterOfGravity();
        if (B777_FMC_PayloadManagerPage.remainingPayload > 30000) {
          amount = 1000;
        } else if (B777_FMC_PayloadManagerPage.remainingPayload > 10000) {
          amount = 200;
        } else if (B777_FMC_PayloadManagerPage.remainingPayload > 5000) {
          amount = 100;
        } else if (B777_FMC_PayloadManagerPage.remainingPayload > 50) {
          amount = 50;
        } else {
          amount = B777_FMC_PayloadManagerPage.remainingPayload;
        }
        if (B777_FMC_PayloadManagerPage.centerOfGravity > requestedCenterOfGravity) {
          await this.increaseFrontPayload(amount, requestedCenterOfGravity);
          B777_FMC_PayloadManagerPage.remainingPayload = B777_FMC_PayloadManagerPage.remainingPayload - amount;
        } else {
          await this.increaseRearPayload(amount, requestedCenterOfGravity);
          B777_FMC_PayloadManagerPage.remainingPayload = B777_FMC_PayloadManagerPage.remainingPayload - amount;
        }
      }
    }
    async increaseFrontPayload(amount, requestedCenterOfGravity) {
      let keys = Object.keys(this.payloadValues[1]);
      let randomFront;
      let actualValue;
      if (B777_FMC_PayloadManagerPage.centerOfGravity > requestedCenterOfGravity + 0.05) {
        actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.BUSINESS_CLASS);
        await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.BUSINESS_CLASS, amount + actualValue);
      } else if (B777_FMC_PayloadManagerPage.centerOfGravity > requestedCenterOfGravity + 0.01) {
        randomFront = keys[Math.floor(Math.random() * keys.length)];
        actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex[randomFront]);
        await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex[randomFront], amount + actualValue);
      } else {
        actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.PREMIUM_ECONOMY);
        await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.PREMIUM_ECONOMY, amount + actualValue);
      }
    }
    async increaseRearPayload(amount, requestedCenterOfGravity) {
      let keys = Object.keys(this.payloadValues[2]);
      let randomRear;
      let actualValue;
      if (B777_FMC_PayloadManagerPage.centerOfGravity < requestedCenterOfGravity - 0.05) {
        actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.REAR_ECONOMY);
        await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.REAR_ECONOMY, amount + actualValue);
      } else if (B777_FMC_PayloadManagerPage.centerOfGravity < requestedCenterOfGravity - 0.01) {
        randomRear = keys[Math.floor(Math.random() * keys.length)];
        actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex[randomRear]);
        await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex[randomRear], amount + actualValue);
      } else {
        actualValue = this.getPayloadValueFromCache(B777_FMC_PayloadManagerPage.payloadIndex.FORWARD_ECONOMY);
        await this.setPayloadValue(B777_FMC_PayloadManagerPage.payloadIndex.FORWARD_ECONOMY, amount + actualValue);
      }
    }
  }
  _defineProperty(B777_FMC_PayloadManagerPage, "isPayloadManagerExecuted", undefined);
  _defineProperty(B777_FMC_PayloadManagerPage, "centerOfGravity", undefined);
  _defineProperty(B777_FMC_PayloadManagerPage, "requestedCenterOfGravity", null);
  _defineProperty(B777_FMC_PayloadManagerPage, "requestedFuel", null);
  _defineProperty(B777_FMC_PayloadManagerPage, "requestedPayload", null);
  _defineProperty(B777_FMC_PayloadManagerPage, "remainingPayload", null);

  class B777_FMC_SimBriefConfigurationPage {
    constructor(fmc) {
      _defineProperty(this, "fmc", void 0);
      this.fmc = fmc;
    }
    showPage() {
      this.fmc.cleanUpPage();
      let simBriefUsernameCell = this.getSimBriefUsernameCell();
      let simBriefUserIdCell = this.getSimBriefUserIdCell();
      let routeOnlyCell = HeavyDivision.SimBrief.importRouteOnly() ? "".concat(this.fmc.resizeContent(this.fmc.colorizeContent('<YES', 'green'), 'large'), "\u2190\u2192").concat(this.fmc.resizeContent('NO', 'small')) : "".concat(this.fmc.resizeContent('<YES', 'small'), "\u2190\u2192").concat(this.fmc.resizeContent(this.fmc.colorizeContent('NO', 'green'), 'large'));
      let withSidCell = HeavyDivision.SimBrief.importSid() ? "".concat(this.fmc.resizeContent(this.fmc.colorizeContent('<YES', 'green'), 'large'), "\u2190\u2192").concat(this.fmc.resizeContent('NO', 'small')) : "".concat(this.fmc.resizeContent('<YES', 'small'), "\u2190\u2192").concat(this.fmc.resizeContent(this.fmc.colorizeContent('NO', 'green'), 'large'));
      let withStarCell = HeavyDivision.SimBrief.importStar() ? "".concat(this.fmc.resizeContent(this.fmc.colorizeContent('<YES', 'green'), 'large'), "\u2190\u2192").concat(this.fmc.resizeContent('NO', 'small')) : "".concat(this.fmc.resizeContent('<YES', 'small'), "\u2190\u2192").concat(this.fmc.resizeContent(this.fmc.colorizeContent('NO', 'green'), 'large'));
      let importStrategyCell = HeavyDivision.SimBrief.importStrategy() === 'INGAME' ? "".concat(this.fmc.resizeContent(this.fmc.colorizeContent('<INGAME', 'green'), 'large'), "\u2190\u2192").concat(this.fmc.resizeContent('SB', 'small')) : "".concat(this.fmc.resizeContent('<INGAME', 'small'), "\u2190\u2192").concat(this.fmc.resizeContent(this.fmc.colorizeContent('SB', 'green'), 'large'));
      this.fmc._renderer.renderTitle('SIMBRIEF CONFIGURATION');
      this.fmc._renderer.render([['Route Only', 'Username'], [routeOnlyCell, simBriefUsernameCell], ['With SID', 'UserID'], [withSidCell, simBriefUserIdCell], ['With STAR'], [withStarCell], ['Import strategy'], [importStrategyCell], [''], [''], [''], ['<BACK']]);
      this.setupInputHandlers();
    }
    setupInputHandlers() {
      this.fmc._renderer.lsk(6).event = () => {
        B777_FMC_RobConfigurationPage.ShowPage1(this.fmc);
      };
      this.fmc._renderer.rsk(1).event = () => {
        let value = this.fmc.inOut;
        if (value === BaseFMC.clrValue) {
          this.fmc.inOut = '';
          HeavyDataStorage.set('SIMBRIEF_USERNAME', '');
        } else if (value.length > 0) {
          this.fmc.clearUserInput();
          HeavyDataStorage.set('SIMBRIEF_USERNAME', value);
        }
        this.showPage();
      };
      this.fmc._renderer.rsk(2).event = () => {
        let value = this.fmc.inOut;
        if (value === BaseFMC.clrValue) {
          this.fmc.inOut = '';
          HeavyDataStorage.set('SIMBRIEF_USERID', '');
        } else if (value.length > 0) {
          this.fmc.clearUserInput();
          HeavyDataStorage.set('SIMBRIEF_USERID', value);
        }
        this.showPage();
      };
      this.fmc._renderer.lsk(1).event = () => {
        if (HeavyDivision.SimBrief.importRouteOnly()) {
          HeavyDataStorage.set('SIMBRIEF_ROUTE_ONLY', '0');
        } else {
          HeavyDataStorage.set('SIMBRIEF_ROUTE_ONLY', '1');
        }
        this.showPage();
      };
      this.fmc._renderer.lsk(2).event = () => {
        if (HeavyDivision.SimBrief.importSid()) {
          HeavyDataStorage.set('SIMBRIEF_WITH_SID', '0');
        } else {
          HeavyDataStorage.set('SIMBRIEF_WITH_SID', '1');
        }
        this.showPage();
      };
      this.fmc._renderer.lsk(3).event = () => {
        if (HeavyDivision.SimBrief.importStar()) {
          HeavyDataStorage.set('SIMBRIEF_WITH_STAR', '0');
        } else {
          HeavyDataStorage.set('SIMBRIEF_WITH_STAR', '1');
        }
        this.showPage();
      };
      this.fmc._renderer.lsk(4).event = () => {
        if (HeavyDivision.SimBrief.importStrategy() === 'INGAME') {
          HeavyDataStorage.set('SIMBRIEF_IMPORT_STRATEGY', 'SB');
        } else {
          HeavyDataStorage.set('SIMBRIEF_IMPORT_STRATEGY', 'INGAME');
        }
        this.showPage();
      };
    }
    getSimBriefUsernameCell() {
      let cell = '-----';
      let username = HeavyDataStorage.get('SIMBRIEF_USERNAME', '');
      if (username) {
        cell = '[color=green]' + username + '[/color]';
      }
      return cell;
    }
    getSimBriefUserIdCell() {
      let cell = '-----';
      let userid = HeavyDataStorage.get('SIMBRIEF_USERID', '');
      if (userid) {
        cell = '[color=green]' + userid + '[/color]';
      }
      return cell;
    }
  }

  class B777_FMC_RobConfigurationPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      let fpSyncCell = '';
      switch (HeavyDivision.Configuration.activeFlightPlanSynchronizationStrategy()) {
        case 0:
          fpSyncCell = '[color=green]None[/color]/[size=small]OneWay[/size]>';
          break;
        case 1:
          fpSyncCell = '[size=small]None[/size]/[color=green]OneWay[/color]>';
          break;
        case 2:
          fpSyncCell = '[color=green]None[/color]/[size=small]OneWay[/size]>';
          break;
        case 3:
          fpSyncCell = '[color=green]None[/color]/[size=small]OneWay[/size]>';
          break;
      }
      let simBriefCell = this.isSimBriefFilled() ? '[color=green]FILLED[/color]>' : '[color=red]NOT FILLED[/color]>';
      let unitsCell = HeavyDivision.Configuration.useImperial() ? '[color=green]IMPERIAL[/color]←→[size=small]METRIC[/size]>' : '[size=small]IMPERIAL[/size]←→[color=green]METRIC[/color]>';
      let focusableScratchpadCell = HeavyDivision.Configuration.isFocusableScratchpadEnabled() ? '[color=green]ENABLED[/color]←→[size=small]DISABLED[/size]>' : '[size=small]ENABLED[/size]←→[color=green]DISABLED[/color]>';
      fmc._renderer.renderTitle('HEAVY CONFIGURATION');
      fmc._renderer.render([['', 'SimBrief'], ['', simBriefCell], ['', 'FP SYNC STRATEGY'], ['', fpSyncCell], ['', 'UNITS'], ['', unitsCell], ['', 'FOCUSABLE SCRATCHPAD'], ['', focusableScratchpadCell], [''], [''], [''], ['<BACK']]);
      this.setupInputHandlers(fmc);
    }
    static setupInputHandlers(fmc) {
      fmc._renderer.lsk(6).event = () => {
        B777_FMC_RobPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(1).event = () => {
        new B777_FMC_SimBriefConfigurationPage(fmc).showPage();
      };
      fmc._renderer.rsk(2).event = () => {
        switch (HeavyDivision.Configuration.activeFlightPlanSynchronizationStrategy()) {
          case 0:
            HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '1');
            break;
          case 1:
            HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '0');
            break;
          case 2:
            HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '0');
            break;
          case 3:
            HeavyDataStorage.set('FP_SYNCHRONIZATION_STRATEGY', '0');
            break;
        }
        B777_FMC_RobConfigurationPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(3).event = () => {
        if (HeavyDivision.Configuration.useImperial()) {
          HeavyDataStorage.set('USE_IMPERIAL', '0');
        } else {
          HeavyDataStorage.set('USE_IMPERIAL', '1');
        }
        B777_FMC_RobConfigurationPage.ShowPage1(fmc);
      };
      fmc._renderer.rsk(4).event = () => {
        if (HeavyDivision.Configuration.isFocusableScratchpadEnabled()) {
          HeavyDataStorage.set('IS_FOCUSABLE_SCRATCHPAD_ENABLED', '0');
          fmc.disableFocusableScratchpad();
        } else {
          fmc.enableFocusableScratchpad();
          HeavyDataStorage.set('IS_FOCUSABLE_SCRATCHPAD_ENABLED', '1');
        }
        B777_FMC_RobConfigurationPage.ShowPage1(fmc);
      };
    }
    static isSimBriefFilled() {
      let username = HeavyDataStorage.get('SIMBRIEF_USERNAME', '');
      let userid = HeavyDataStorage.get('SIMBRIEF_USERID', '');
      return username !== '' || userid !== '';
    }
  }

  class B777_FMC_RobPage {
    static ShowPage1(fmc) {
      fmc.cleanUpPage();
      let rows = [[''], ['', ''], [''], ['', ''], [''], ['', ''], [''], [''], [''], [''], [''], ['', 'CONFIGURATION>']];
      if (!B777_FMC_RobPage.WITHOUT_MANAGERS) {
        rows[1] = ['', 'IRS Menu>'];
        rows[3] = ['', 'Payload Manager>'];
        //rows[5] = ['', 'SimRate Manager>'];

        fmc._renderer.rsk(1).event = () => {
          new B777_FMC_RobIRSPage(fmc).showPage();
        };
        fmc._renderer.rsk(2).event = () => {
          new B777_FMC_PayloadManagerPage(fmc).showPage();
        };
        /*
         fmc._renderer.rsk(3).event = () => {
         new B777_FMC_SimRateManagerPage(fmc).showPage();
         };
         */
      }

      fmc._renderer.rsk(6).event = () => {
        B777_FMC_RobConfigurationPage.ShowPage1(fmc);
      };
      fmc._renderer.renderTitle('ROB MENU');
      fmc._renderer.render(rows);
    }
  }
  _defineProperty(B777_FMC_RobPage, "WITHOUT_MANAGERS", false);

  class B777_FMC_VNAVPage {
    constructor(fmc) {
      _defineProperty(this, "fmc", void 0);
      _defineProperty(this, "enforcedPage", void 0);
      this.fmc = fmc;
      this.enforcedPage = null;
    }
    showPage() {
      switch (this.enforcedPage) {
        case 1:
          this.showPage1();
          return;
        case 2:
          this.showPage2();
          return;
        case 3:
          this.showPage3();
          return;
      }
      if (this.fmc.currentFlightPhase <= FlightPhase.FLIGHT_PHASE_CLIMB) {
        this.showPage1();
      } else if (this.fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
        this.showPage2();
      } else if (this.fmc.currentFlightPhase >= FlightPhase.FLIGHT_PHASE_DESCENT) {
        this.showPage3();
      } else {
        this.showPage1();
      }
    }
    getClimbPageTitle() {
      let cell = '';
      switch (this.fmc._speedDirector.commandedSpeedType) {
        case HDSpeedType.SPEED_TYPE_RESTRICTION:
          if (this.fmc._speedDirector.climbSpeedRestriction) {
            cell = cell + fastToFixed(this.fmc._speedDirector.climbSpeedRestriction.speed) + 'KT ';
          }
          break;
        case HDSpeedType.SPEED_TYPE_TRANSITION:
          cell = cell + fastToFixed(this.fmc.speedManager.getCrzManagedSpeed(this.fmc.getCostIndexFactor()), 0) + 'KT';
          break;
        case HDSpeedType.SPEED_TYPE_SELECTED:
          let selectedClimbSpeed = fastToFixed(this.fmc._speedDirector.climbSpeedSelected.speed) || '';
          cell = cell + selectedClimbSpeed + 'KT';
          break;
        case HDSpeedType.SPEED_TYPE_ECON:
          cell = cell + 'ECON';
          break;
        default:
          cell = cell + 'ECON';
      }
      return cell;
    }
    getClimbCruiseAltitudeCell() {
      let cell = '□□□□□';
      let departureWaypoints = this.fmc.flightPlanManager.getDepartureWaypointsMap();
      let commandedAltitudeCruise = true;
      if (departureWaypoints) {
        departureWaypoints.forEach(waypoint => {
          if (waypoint && waypoint.legAltitudeDescription === 3) {
            commandedAltitudeCruise = false;
          }
        });
      }
      if (this.fmc.cruiseFlightLevel) {
        cell = 'FL' + this.fmc.cruiseFlightLevel;
        if (commandedAltitudeCruise && this.fmc.getIsVNAVActive()) {
          cell = this.fmc.colorizeContent(cell, 'magenta');
        }
      }
      if (cell) {
        cell = this.fmc.makeSettable(cell);
      }
      return cell;
    }
    getClimbSpeedRestrictionCell() {
      let cell = '---/-----';
      let speedRestrictionSpeedValue = '';
      let speedRestrictionAltitudeValue = '';

      /**
       * TODO better type check (remove double retyping )
       */

      if (this.fmc._speedDirector.climbSpeedRestriction) {
        speedRestrictionSpeedValue = String(this.fmc._speedDirector.climbSpeedRestriction.speed) || '';
        speedRestrictionAltitudeValue = String(this.fmc._speedDirector.climbSpeedRestriction.altitude) || '';
      }
      if (speedRestrictionSpeedValue && isFinite(Number(speedRestrictionSpeedValue)) && speedRestrictionAltitudeValue && isFinite(Number(speedRestrictionAltitudeValue))) {
        if (this.fmc._speedDirector.commandedSpeedType === HDSpeedType.SPEED_TYPE_RESTRICTION && this.fmc._speedDirector.speedPhase === HDSpeedPhase.SPEED_PHASE_CLIMB && this.fmc.getIsVNAVActive()) {
          speedRestrictionSpeedValue = this.fmc.colorizeContent(speedRestrictionSpeedValue, 'magenta');
        }
        cell = speedRestrictionSpeedValue + '/' + speedRestrictionAltitudeValue;
      }
      cell = this.fmc.makeSettable(cell);
      return cell;
    }
    getClimbSpeedTransitionCell() {
      let cell = '';
      if (this.fmc._speedDirector.climbSpeedTransition.isDeleted || Simplane.getAltitude() > 10000) {
        return '';
      }
      let speed = this.fmc._speedDirector.climbSpeedTransition.speed;
      if (isFinite(speed)) {
        cell = fastToFixed(speed, 0);
      }
      if (this.fmc._speedDirector.commandedSpeedType === HDSpeedType.SPEED_TYPE_TRANSITION && this.fmc._speedDirector.speedPhase === HDSpeedPhase.SPEED_PHASE_CLIMB && this.fmc.getIsVNAVActive()) {
        cell = this.fmc.colorizeContent(cell, 'magenta');
      }
      cell = cell + '/10000';
      return cell;
    }
    getClimbTransitionAltitudeCell() {
      return this.fmc.makeSettable(fastToFixed(this.fmc.transitionAltitude, 0));
    }
    getSelectedClimbSpeedCell() {
      let selectedClimbSpeed = this.fmc._speedDirector.climbSpeedSelected.speed || NaN;
      let cell = '';
      if (selectedClimbSpeed && isFinite(selectedClimbSpeed)) {
        cell = selectedClimbSpeed + '';
      }
      if (this.fmc._speedDirector.commandedSpeedType === HDSpeedType.SPEED_TYPE_SELECTED && this.fmc._speedDirector.speedPhase === HDSpeedPhase.SPEED_PHASE_CLIMB && this.fmc.getIsVNAVActive()) {
        cell = this.fmc.colorizeContent(cell, 'magenta');
      }
      if (cell) {
        cell = this.fmc.makeSettable(cell);
      }
      return cell;
    }
    getEconClimbPromptCell() {
      let selectedClimbSpeed = this.fmc._speedDirector.climbSpeedSelected.speed || NaN;
      return selectedClimbSpeed && isFinite(selectedClimbSpeed) ? '<ECON' : '';
    }
    getEconClimbSpeedCell() {
      let cell = '';
      let speedNumber = this.fmc._speedDirector._resolveMachKias(this.fmc._speedDirector.climbSpeedEcon);
      let isMach = false;
      if (speedNumber < 1 && speedNumber > 0) {
        isMach = true;
      }
      if (isMach) {
        let mach = fastToFixed(speedNumber, 3);
        if (mach.charAt(0) === '0') {
          mach = mach.substring(1);
        }
        cell = mach;
      } else {
        cell = fastToFixed(speedNumber, 0);
      }
      if (this.fmc._speedDirector.commandedSpeedType === HDSpeedType.SPEED_TYPE_ECON && this.fmc._speedDirector.speedPhase === HDSpeedPhase.SPEED_PHASE_CLIMB && this.fmc.getIsVNAVActive()) {
        cell = this.fmc.colorizeContent(cell, 'magenta');
      }
      if (cell) {
        cell = this.fmc.makeSettable(cell);
      }
      return cell;
    }
    setupClimbPageEvents() {
      var _this = this;
      /**
       * Left side
       */
      this.fmc._renderer.lsk(1).event = () => {
        let value = this.fmc.inOut;
        this.fmc.clearUserInput();
        if (this.fmc.setCruiseFlightLevelAndTemperature(value)) {
          this.showPage1();
        }
      };
      this.fmc._renderer.lsk(2).event = () => {
        let value = this.fmc.inOut;
        this.fmc.clearUserInput();
        let storeToFMC = async function (value) {
          let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (HeavyInput.Validators.speedRange(value) || force) {
            _this.fmc._speedDirector.climbSpeedSelected.speed = value;
          }
        };
        if (value === 'DELETE') {
          this.fmc.inOut = '';
          storeToFMC(null, true).then(() => {
            this.showPage1();
          });
        }
        if (value.length > 0) {
          storeToFMC(value).then(() => {
            this.showPage1();
          });
        }
      };
      if (!this.fmc._speedDirector.climbSpeedTransition.isDeleted) {
        this.fmc._renderer.lsk(3).event = () => {
          let value = this.fmc.inOut;
          this.fmc.clearUserInput();
          if (value === 'DELETE') {
            this.fmc.inOut = '';
            this.fmc._speedDirector.climbSpeedTransition.isDeleted = true;
            SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
            return;
          }
          if (value.length > 0) {
            this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
            SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
          }
        };
      }
      this.fmc._renderer.lsk(4).event = () => {
        let value = this.fmc.inOut;
        this.fmc.clearUserInput();
        if (value === 'DELETE') {
          this.fmc.inOut = '';
          value = '';
          this.fmc._speedDirector.climbSpeedRestriction.speed = null;
          this.fmc._speedDirector.climbSpeedRestriction.altitude = null;
          this.showPage1();
        }
        if (value.length > 0) {
          let storeToFMC = async value => {
            let toSet = value.split('/');
            let speed = toSet[0];
            let altitude = toSet[1];
            let roundedAltitude = Math.round(altitude / 100) * 100;
            let valueToCheck = speed + '/' + roundedAltitude;
            if (HeavyInput.Validators.speedRestriction(valueToCheck, this.fmc.cruiseFlightLevel * 100)) {
              this.fmc._speedDirector.climbSpeedRestriction.speed = speed;
              this.fmc._speedDirector.climbSpeedRestriction.altitude = roundedAltitude;
            } else {
              this.fmc.showErrorMessage(this.fmc.defaultInputErrorMessage);
            }
          };
          storeToFMC(value).then(() => {
            this.showPage1();
          });
        }
      };
      let selectedClimbSpeed = this.fmc._speedDirector.climbSpeedSelected.speed || NaN;
      if (selectedClimbSpeed && isFinite(selectedClimbSpeed)) {
        this.fmc._renderer.lsk(5).event = () => {
          this.fmc._speedDirector.climbSpeedSelected.speed = null;
          this.showPage1();
        };
      }

      /**
       * Right side
       */

      this.fmc._renderer.rsk(3).event = () => {
        let value = this.fmc.inOut;
        this.fmc.clearUserInput();
        let altitude = HeavyInput.Converters.inputToAltitude(value);
        if (altitude) {
          this.fmc.trySetTransAltitude(String(altitude));
        }
        this.showPage1();
      };
    }
    checkExecHandlers() {
      /*
      if (Object.keys(this.fmc._activeExecHandlers).length > 0) {
      	this.fmc.onExec = () => {
      		Object.keys(this.fmc._activeExecHandlers).forEach((key) => {
      			this.fmc._activeExecHandlers[key]();
      			delete this.fmc._activeExecHandlers[key];
      		});
      		this.fmc._shouldBeExecEmisssive = false;
      		SimVar.SetSimVarValue('L:FMC_EXEC_ACTIVE', 'Number', 0);
      		SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
      	};
      }
      		 */
    }
    showPage1() {
      /**
       * Page default settings
       */
      this.fmc.cleanUpPage();
      this.fmc.refreshPageCallback = () => {
        this.showPage();
      };

      /**
       * Cells inits
       */
      let pageTitleCell = this.getClimbPageTitle();
      let cruiseAltitudeCell = this.getClimbCruiseAltitudeCell();
      let speedRestrictionCell = this.getClimbSpeedRestrictionCell();
      let selectedClimbSpeedCell = this.getSelectedClimbSpeedCell();
      let speedTransitionCell = this.getClimbSpeedTransitionCell();
      let econClimbSpeedCell = this.getEconClimbSpeedCell();
      let econPromptCell = this.getEconClimbPromptCell();
      let transitionAltitudeCell = this.getClimbTransitionAltitudeCell();
      this.setupClimbPageEvents();
      this.checkExecHandlers();
      this.fmc._renderer.renderTitle(pageTitleCell + ' CLB');
      this.fmc._renderer.renderPages(1, 3);
      this.fmc._renderer.render([['CRZ ALT'], [cruiseAltitudeCell], [selectedClimbSpeedCell ? 'SEL SPD' : 'ECON SPD'], [selectedClimbSpeedCell ? selectedClimbSpeedCell : econClimbSpeedCell], ['SPD TRANS', 'TRANS ALT'], [speedTransitionCell, transitionAltitudeCell], ['SPD RESTR'], [speedRestrictionCell], ['', '__FMCSEPARATOR', ''], [econPromptCell, 'ENG OUT>'], [], []]);
      this.fmc.onNextPage = () => {
        this.enforcedPage = 2;
        this.showPage2();
      };
    }
    getCruisePageTitle() {
      let cell = '';
      /*
      if (Object.keys(this.fmc._activeExecHandlers).length > 0) {
      	cell = this.fmc.makeSettable('MOD ');
      } else {
      	cell = cell + 'ACT ';
      }
       */

      switch (this.fmc._speedDirector.commandedSpeedType) {
        case HDSpeedType.SPEED_TYPE_SELECTED:
          cell = cell + this.fmc._speedDirector.cruiseSpeedSelected.speed + 'KT';
          break;
        case HDSpeedType.SPEED_TYPE_ECON:
          cell = cell + 'ECON';
          break;
        default:
          cell = cell + 'ECON';
      }
      return cell;
    }
    getCruiseAltitudeCell() {
      let cell = '□□□□□';
      if (this.fmc.cruiseFlightLevel) {
        cell = 'FL' + this.fmc.cruiseFlightLevel;
        if (this.fmc.getIsVNAVActive()) {
          cell = this.fmc.colorizeContent(cell, 'magenta');
        }
      }
      if (cell) {
        cell = this.fmc.makeSettable(cell);
      }
      return cell;
    }
    getSelectedCruiseSpeedCell() {
      if (!this.fmc._speedDirector.cruiseSpeedSelected.isValid()) {
        return '';
      }
      let selectedCruiseSpeed = fastToFixed(this.fmc._speedDirector.cruiseSpeedSelected.speed, 0) || NaN;
      let cell = '';
      if (selectedCruiseSpeed && isFinite(Number(selectedCruiseSpeed))) {
        cell = selectedCruiseSpeed + '';
      }
      if (this.fmc._speedDirector.commandedSpeedType === HDSpeedType.SPEED_TYPE_SELECTED && this.fmc._speedDirector.speedPhase === HDSpeedPhase.SPEED_PHASE_CRUISE && this.fmc.getIsVNAVActive()) {
        cell = this.fmc.colorizeContent(cell, 'magenta');
      }
      if (cell) {
        cell = this.fmc.makeSettable(cell);
      }
      console.log(cell);
      return cell;
    }
    getEconCruisePromptCell() {
      let selectedCruiseSpeed = this.fmc._speedDirector.cruiseSpeedSelected.speed || NaN;
      return selectedCruiseSpeed && isFinite(selectedCruiseSpeed) ? '<ECON' : '';
    }
    getEconCruiseSpeedCell() {
      let cell = '';
      if (this.fmc._speedDirector.commandedSpeedType === HDSpeedType.SPEED_TYPE_ECON && this.fmc._speedDirector.speedPhase === HDSpeedPhase.SPEED_PHASE_CRUISE && this.fmc.getIsVNAVActive()) {
        if (Simplane.getAutoPilotMachModeActive()) {
          let mach = fastToFixed(this.fmc._speedDirector.cruiseSpeedEcon.speedMach, 3);
          if (mach.charAt(0) === '0') {
            mach = mach.substring(1);
          }
          cell = mach;
        } else {
          cell = fastToFixed(this.fmc._speedDirector.cruiseSpeedEcon.speed, 0);
        }
        cell = this.fmc.colorizeContent(cell, 'magenta');
      }
      if (cell) {
        cell = this.fmc.makeSettable(cell);
      }
      return cell;
    }
    getN1Cell() {
      let cell = '--%';
      let n1Value = this.fmc.getThrustClimbLimit();
      if (isFinite(n1Value)) {
        cell = fastToFixed(n1Value, 1) + '%';
      }
      return cell;
    }
    setupCruisePageEvents() {
      var _this2 = this;
      /**
       * Left side
       */
      this.fmc._renderer.lsk(1).event = () => {
        let value = this.fmc.inOut;
        this.fmc.clearUserInput();
        if (this.fmc.setCruiseFlightLevelAndTemperature(value)) {
          this.showPage2();
        }
      };
      this.fmc._renderer.lsk(2).event = () => {
        let value = this.fmc.inOut;
        this.fmc.clearUserInput();
        let storeToFMC = async function (value) {
          let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (HeavyInput.Validators.speedRange(value) || force) {
            _this2.fmc._speedDirector.cruiseSpeedSelected.speed = value;
          }
        };
        if (value === 'DELETE') {
          this.fmc.inOut = '';
          storeToFMC(null, true).then(() => {
            this.showPage2();
          });
        }
        if (value.length > 0) {
          storeToFMC(value).then(() => {
            this.showPage2();
          });
        }
      };
      let selectedCruiseSpeed = this.fmc._speedDirector.cruiseSpeedSelected.speed || NaN;
      if (selectedCruiseSpeed && isFinite(selectedCruiseSpeed)) {
        this.fmc._renderer.lsk(5).event = () => {
          this.fmc._speedDirector.cruiseSpeedSelected.speed = null;
          this.showPage2();
        };
      }
    }
    showPage2() {
      /**
       * Page default settings
       */
      this.fmc.cleanUpPage();
      this.fmc.refreshPageCallback = () => {
        this.showPage();
      };
      let pageTitleCell = this.getCruisePageTitle();
      let cruiseAltitudeCell = this.getCruiseAltitudeCell();
      let n1Cell = this.getN1Cell();
      let econCruiseSpeedCell = this.getEconCruiseSpeedCell();
      let selectedCruiseSpeedCell = this.getSelectedCruiseSpeedCell();
      let econPromptCell = this.getEconCruisePromptCell();
      this.setupCruisePageEvents();
      this.checkExecHandlers();

      /** Highlight speeds */

      this.fmc._renderer.renderTitle(pageTitleCell + ' CRZ');
      this.fmc._renderer.renderPages(2, 3);
      this.fmc._renderer.render([['CRZ ALT', 'STEP TO'], [cruiseAltitudeCell], [selectedCruiseSpeedCell ? 'SEL SPD' : 'ECON SPD', 'AT'], [selectedCruiseSpeedCell ? selectedCruiseSpeedCell : econCruiseSpeedCell], ['N1'], [n1Cell], ['STEP', 'OPT', 'MAX', 'RECMD'], [], ['', '__FMCSEPARATOR', ''], [econPromptCell, ''], [''], ['', 'LRC>']]);
      this.fmc.onPrevPage = () => {
        this.enforcedPage = 1;
        this.showPage1();
      };
      this.fmc.onNextPage = () => {
        this.enforcedPage = 3;
        this.showPage3();
      };
    }
    showPage3() {
      this.fmc.cleanUpPage();
      let speedTransCell = '---';
      let speed = this.fmc.speedManager.getDesManagedSpeed(this.fmc.getCostIndexFactor());
      if (isFinite(speed)) {
        speedTransCell = speed.toFixed(0);
      }
      speedTransCell += '/10000';
      let descentNowAvailable = this.fmc.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE && SimVar.GetSimVarValue('L:B77RS_DESCENT_NOW_AVAILABLE', 'Number');
      if (descentNowAvailable) {
        this.fmc._renderer.rsk(6).event = () => {
          this.fmc.currentFlightPhase = FlightPhase.FLIGHT_PHASE_DESCENT;
          SimVar.SetSimVarValue('L:B77RS_DESCENT_NOW_ACTIVATED', 'Number', 1);
        };
      }
      this.fmc._renderer.renderTitle('DES');
      this.fmc._renderer.renderPages(3, 3);
      this.fmc._renderer.render([['E/D AT'], [], ['ECON SPD'], [], ['SPD TRANS', 'WPT/ALT'], [speedTransCell], ['SPD RESTR'], [], ['PAUSE @ DIST FROM DEST'], ['OFF', 'FORECAST>'], [], ['<OFFPATH DES', descentNowAvailable && !SimVar.GetSimVarValue('L:B77RS_DESCENT_NOW_ACTIVATED', 'Number') ? 'DES NOW>' : '']]);
      this.fmc.onPrevPage = () => {
        this.enforcedPage = 2;
        this.showPage2();
      };
    }
  }

  class PreFlightDataHolder {
    /**
     * ThrustLim page pre flight check/holder
     * @returns {ThrustLimPagePreFlightCheck}
     */
    get thrustLim() {
      return this._thrustLim;
    }

    /**
     * TakeOff page pre flight check/holder
     * @returns {TakeOffPagePreFlightCheck}
     */
    get takeOff() {
      return this._takeOff;
    }

    /**
     * PerfInit page pre flight check/holder
     * @returns {PerfInitPagePreFlightCheck}
     */
    get perfInit() {
      return this._perfInit;
    }

    /**
     * Route page pre flight check/holder
     * @returns {RoutePagePreFlightCheck}
     */
    get route() {
      return this._route;
    }

    /**
     * Is preflight completed?
     * @returns {boolean}
     */
    get completed() {
      return this._completed;
    }

    /**
     * @param {boolean} value
     */
    set completed(value) {
      this._completed = value;
    }

    /**
     * Is preflight finished?
     * @returns {boolean}
     */
    get finished() {
      return this._finished;
    }

    /**
     * @param {boolean} value
     */
    set finished(value) {
      this._finished = value;
    }
    constructor() {
      _defineProperty(this, "_completed", void 0);
      _defineProperty(this, "_finished", void 0);
      _defineProperty(this, "_thrustLim", void 0);
      _defineProperty(this, "_takeOff", void 0);
      _defineProperty(this, "_perfInit", void 0);
      _defineProperty(this, "_route", void 0);
      this._completed = false;
      this._finished = false;
      this._thrustLim = new ThrustLimPagePreFlightCheck();
      this._takeOff = new TakeOffPagePreFlightCheck();
      this._perfInit = new PerfInitPagePreFlightCheck();
      this._route = new RoutePagePreFlightCheck();
    }
  }
  class ThrustLimPagePreFlightCheck {
    /**
     * Is thrust page preflight completed?
     * @returns {boolean}
     */
    get completed() {
      return this._completed;
    }

    /**
     * @param {boolean} value
     */
    set completed(value) {
      this._completed = value;
    }

    /**
     * Is assumed temperature filled?
     * TODO: Assumed temperature is not required for preflight (should be removed)
     * @returns {boolean}
     */
    get assumedTemperature() {
      return this._assumedTemperature;
    }

    /**
     * @param {boolean} value
     */
    set assumedTemperature(value) {
      this._assumedTemperature = value;
    }
    constructor() {
      _defineProperty(this, "_completed", void 0);
      _defineProperty(this, "_assumedTemperature", void 0);
      this._completed = false;
      this._assumedTemperature = false;
    }
  }
  class TakeOffPagePreFlightCheck {
    /**
     * Is takeoff page preflight completed?
     * @returns {boolean}
     */
    get completed() {
      return this._completed;
    }

    /**
     * @param {boolean} value
     */
    set completed(value) {
      this._completed = value;
    }

    /**
     * Are flaps filled?
     * @returns {boolean}
     */
    get flaps() {
      return this._flaps;
    }

    /**
     * @param {boolean} value
     */
    set flaps(value) {
      this._flaps = value;
    }

    /**
     * Is v filled?
     * @returns {boolean}
     */
    get v1() {
      return this._v1;
    }

    /**
     * @param {boolean} value
     */
    set v1(value) {
      this._v1 = value;
    }

    /**
     * Is vR filled?
     * @returns {boolean}
     */
    get vR() {
      return this._vR;
    }

    /**
     * @param {boolean} value
     */
    set vR(value) {
      this._vR = value;
    }

    /**
     * Is v2 filled?
     * @returns {boolean}
     */
    get v2() {
      return this._v2;
    }

    /**
     * @param {boolean} value
     */
    set v2(value) {
      this._v2 = value;
    }
    constructor() {
      _defineProperty(this, "_completed", void 0);
      _defineProperty(this, "_flaps", void 0);
      _defineProperty(this, "_v1", void 0);
      _defineProperty(this, "_vR", void 0);
      _defineProperty(this, "_v2", void 0);
      this._completed = false;
      this._flaps = false;
      this._v1 = false;
      this._vR = false;
      this._v2 = false;
    }
  }
  class PerfInitPagePreFlightCheck {
    /**
     * Is PerfInit page preflight completed?
     * @returns {boolean}
     */
    get completed() {
      return this._completed;
    }

    /**
     * @param {boolean} value
     */
    set completed(value) {
      this._completed = value;
    }

    /**
     * Is cruise altitude filled?
     * @returns {boolean}
     */
    get cruiseAltitude() {
      return this._cruiseAltitude;
    }

    /**
     * @param {boolean} value
     */
    set cruiseAltitude(value) {
      this._cruiseAltitude = value;
    }

    /**
     * Is cost index filled?
     * @returns {boolean}
     */
    get costIndex() {
      return this._costIndex;
    }

    /**
     * @param {boolean} value
     */
    set costIndex(value) {
      this._costIndex = value;
    }

    /**
     * Are reserves filled?
     * @returns {boolean}
     */
    get reserves() {
      return this._reserves;
    }

    /**
     * @param {boolean} value
     */
    set reserves(value) {
      this._reserves = value;
    }
    constructor() {
      _defineProperty(this, "_completed", void 0);
      _defineProperty(this, "_cruiseAltitude", void 0);
      _defineProperty(this, "_costIndex", void 0);
      _defineProperty(this, "_reserves", void 0);
      this._completed = false;
      this._cruiseAltitude = false;
      this._costIndex = false;
      this._reserves = false;
    }
  }
  class RoutePagePreFlightCheck {
    /**
     * Is PerfInit page preflight completed?
     * @returns {boolean}
     */
    get completed() {
      return this._completed;
    }

    /**
     * @param {boolean} value
     */
    set completed(value) {
      this._completed = value;
    }

    /**
     * Is origin filled?
     * @returns {boolean}
     */
    get origin() {
      return this._origin;
    }

    /**
     * @param {boolean} value
     */
    set origin(value) {
      this._origin = value;
    }

    /**
     * Is destination filled?
     * @returns {boolean}
     */
    get destination() {
      return this._destination;
    }

    /**
     * @param {boolean} value
     */
    set destination(value) {
      this._destination = value;
    }

    /**
     * Is route activated?
     * @returns {boolean}
     */
    get activated() {
      return this._activated;
    }

    /**
     * @param {boolean} value
     */
    set activated(value) {
      this._activated = value;
    }
    constructor() {
      _defineProperty(this, "_completed", void 0);
      _defineProperty(this, "_origin", void 0);
      _defineProperty(this, "_destination", void 0);
      _defineProperty(this, "_activated", void 0);
      this._completed = false;
      this._origin = false;
      this._destination = false;
      this._activated = false;
    }
  }

  class FMCDataHolder {
    get preFlightDataHolder() {
      return this._preFlightDataHolder;
    }
    constructor() {
      _defineProperty(this, "_preFlightDataHolder", void 0);
      this._preFlightDataHolder = new PreFlightDataHolder();
    }
  }

  class Boeing_FMC extends BaseFMC {
    /**
     *
    * Reason of this property is wrong activeRoute function and wrong using of _isRouteActivated property.
    * Normal behavior is that once route is activated by ACTIVATE prompt and EXEC all others modifications of route
    * automatically activate EXEC for direct executing and storing the changes in FMC.
    * When route is not activated by ACTIVATE prompt any changes do not activate EXEC and only way to activate
    * the EXEC is use ACTIVATE prompt
    *
    * ASOBO behavior:
    * _isRouteActivated is used as flag for awaiting changes for execution in a route and as EXEC illumination FLAG.
    *
    * STATES OF ROUTE:
    *
    * NOT ACTIVATED -> Route is not activated -> ACTIVATE prompt not pushed and EXECUTED, changes in route do not illuminate EXEC
    * ACTIVATED -> Route is activated -> ACTIVATE prompt pushed and EXECUTED, changes in route illuminate EXEC
    * MODIFIED -> Route is modified -> ACTIVATED and changes awaiting for execution (EXEC illuminating)
    *
    * This property holds ACTIVATED / NOT ACTIVATED state because of the misuse of _isRouteActivated in default Asobo implementation
    * @type {boolean}
    * @private
    */

    setTakeOffFlap(s) {
      let value = Number.parseInt(s);
      if (isFinite(value)) {
        /**
         * Only flaps 5, 15, 20 can be set for takeoff
         */
        if ([5, 15, 20].indexOf(value) !== -1) {
          this._takeOffFlap = value;
          /**
           * Automatically clear all vSpeeds after flaps change
           */
          this.speedManager.clearVSpeeds();
          return true;
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }

    // Property for EXEC handling
    get fpHasChanged() {
      return this._fpHasChanged;
    }
    set fpHasChanged(value) {
      this._fpHasChanged = value;
    }

    /**
     * Speed Intervention FIX
     */

    getIsSpeedInterventionActive() {
      return this._isSpeedInterventionActive;
    }
    toggleSpeedIntervention() {
      if (this.getIsSpeedInterventionActive()) {
        this.deactivateSpeedIntervention();
      } else {
        this.activateSpeedIntervention();
      }
    }
    activateSpeedIntervention() {
      if (!this.getIsVNAVActive()) {
        return;
      }
      this._isSpeedInterventionActive = true;
      if (Simplane.getAutoPilotMachModeActive()) {
        let currentMach = Simplane.getAutoPilotMachHoldValue();
        Coherent.call('AP_MACH_VAR_SET', 1, currentMach);
      } else {
        let currentSpeed = Simplane.getAutoPilotAirspeedHoldValue();
        Coherent.call('AP_SPD_VAR_SET', 1, currentSpeed);
      }
      SimVar.SetSimVarValue('L:AP_SPEED_INTERVENTION_ACTIVE', 'number', 1);
      SimVar.SetSimVarValue('K:SPEED_SLOT_INDEX_SET', 'number', 1);
      if (this.aircraftType == Aircraft.AS01B) {
        this.activateSPD();
      }
    }
    deactivateSpeedIntervention() {
      this._isSpeedInterventionActive = false;
      SimVar.SetSimVarValue('L:AP_SPEED_INTERVENTION_ACTIVE', 'number', 0);
      if (this.getIsVNAVActive()) {
        SimVar.SetSimVarValue('K:SPEED_SLOT_INDEX_SET', 'number', 2);
      }
    }
    activateSPD() {
      if (this.getIsVNAVActive() && this.aircraftType != Aircraft.AS01B) {
        return;
      }
      let altitude = Simplane.getAltitudeAboveGround();
      if (altitude < 400) {
        this._pendingSPDActivation = true;
      } else {
        this.doActivateSPD();
      }
      SimVar.SetSimVarValue('L:AP_SPD_ACTIVE', 'number', 1);
      this._isSPDActive = true;
    }
    doActivateSPD() {
      this._pendingSPDActivation = false;
      if (Simplane.getAutoPilotMachModeActive()) {
        let currentMach = Simplane.getAutoPilotMachHoldValue();
        Coherent.call('AP_MACH_VAR_SET', 1, currentMach);
        SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_ON', 'number', 1);
      } else {
        let currentSpeed = Simplane.getAutoPilotAirspeedHoldValue();
        Coherent.call('AP_SPD_VAR_SET', 1, currentSpeed);
        SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_OFF', 'number', 1);
      }
      if (!this._isFLCHActive) {
        this.setAPSpeedHoldMode();
      }
      this.setThrottleMode(ThrottleMode.AUTO);
      let stayManagedSpeed = (this._pendingVNAVActivation || this._isVNAVActive) && !this._isSpeedInterventionActive;
      if (!stayManagedSpeed) {
        SimVar.SetSimVarValue('K:SPEED_SLOT_INDEX_SET', 'number', 1);
      }
    }
    deactivateSPD() {
      SimVar.SetSimVarValue('L:AP_SPD_ACTIVE', 'number', 0);
      this._isSPDActive = false;
      this._pendingSPDActivation = false;
    }
    constructor() {
      super();
      _defineProperty(this, "_forceNextAltitudeUpdate", false);
      _defineProperty(this, "_lastTargetAirspeed", 200);
      _defineProperty(this, "_isLNAVActive", false);
      _defineProperty(this, "_pendingLNAVActivation", false);
      _defineProperty(this, "_isVNAVActive", false);
      _defineProperty(this, "_pendingVNAVActivation", false);
      _defineProperty(this, "_isFLCHActive", false);
      _defineProperty(this, "_pendingFLCHActivation", false);
      _defineProperty(this, "_isSPDActive", false);
      _defineProperty(this, "_pendingSPDActivation", false);
      _defineProperty(this, "_isSpeedInterventionActive", false);
      _defineProperty(this, "_isHeadingHoldActive", false);
      _defineProperty(this, "_headingHoldValue", 0);
      _defineProperty(this, "_pendingHeadingSelActivation", false);
      _defineProperty(this, "_isVSpeedActive", false);
      _defineProperty(this, "_isAltitudeHoldActive", false);
      _defineProperty(this, "_altitudeHoldValue", 0);
      _defineProperty(this, "_onAltitudeHoldDeactivate", EmptyCallback.Void);
      _defineProperty(this, "_isRouteActivated", false);
      _defineProperty(this, "_fpHasChanged", false);
      _defineProperty(this, "_activatingDirectTo", false);
      _defineProperty(this, "_isMainRouteActivated", false);
      _defineProperty(this, "dataHolder", new FMCDataHolder());
      _defineProperty(this, "messageManager", new FMCMessagesManager());
      _defineProperty(this, "onExec", undefined);
      _defineProperty(this, "onExecPage", undefined);
      _defineProperty(this, "onExecDefault", undefined);
      _defineProperty(this, "_pageRefreshTimer", void 0);
      _defineProperty(this, "_navModeSelector", undefined);
      _defineProperty(this, "_speedDirector", void 0);
      _defineProperty(this, "_thrustTakeOffTemp", void 0);
      _defineProperty(this, "thrustReductionHeight", void 0);
      _defineProperty(this, "isThrustReductionAltitudeCustomValue", void 0);
      _defineProperty(this, "_activatingDirectToExisting", void 0);
      _defineProperty(this, "vfrLandingRunway", void 0);
    }
    Init() {
      super.Init();
      this.maxCruiseFL = 450;
      this.onDel = () => {
        if (this.inOut.length === 0) {
          this.inOut = 'DELETE';
        }
      };
      this.onClr = () => {
        if (this.isDisplayingErrorMessage) {
          this.inOut = this.lastUserInput;
          this.isDisplayingErrorMessage = false;
        } else if (this.inOut.length > 0) {
          if (this.inOut === 'DELETE') {
            this.inOut = '';
          } else {
            this.inOut = this.inOut.substr(0, this.inOut.length - 1);
          }
        }
      };
      this.onExec = () => {
        if (this.onExecPage) {
          console.log('if this.onExecPage');
          this.onExecPage();
        } else {
          console.log('else this.onExecPage');
          this._isRouteActivated = false;
          this.fpHasChanged = false;
          this._activatingDirectTo = false;
        }
      };
      this.onExecPage = undefined;
      this.onExecDefault = () => {
        if (this.getIsRouteActivated() && !this._activatingDirectTo) {
          this.insertTemporaryFlightPlan(() => {
            this.copyAirwaySelections();
            this._isRouteActivated = false;
            this._activatingDirectToExisting = false;
            this.fpHasChanged = false;
            SimVar.SetSimVarValue('L:FMC_EXEC_ACTIVE', 'number', 0);
            if (this.refreshPageCallback) {
              this.refreshPageCallback();
            }
          });
        } else if (this.getIsRouteActivated() && this._activatingDirectTo) {
          const activeIndex = this.flightPlanManager.getActiveWaypointIndex();
          this.insertTemporaryFlightPlan(() => {
            this.flightPlanManager.activateDirectToByIndex(activeIndex, () => {
              this.copyAirwaySelections();
              this._isRouteActivated = false;
              this._activatingDirectToExisting = false;
              this._activatingDirectTo = false;
              this.fpHasChanged = false;
              SimVar.SetSimVarValue('L:FMC_EXEC_ACTIVE', 'number', 0);
              if (this.refreshPageCallback) {
                this.refreshPageCallback();
              }
            });
          });
        } else {
          this.fpHasChanged = false;
          this._isRouteActivated = false;
          SimVar.SetSimVarValue('L:FMC_EXEC_ACTIVE', 'number', 0);
          if (this.refreshPageCallback) {
            this._activatingDirectTo = false;
            this.fpHasChanged = false;
            this.refreshPageCallback();
          }
        }
      };
      let flapAngles = [0, 1, 5, 15, 20, 25, 30];
      let flapIndex = Simplane.getFlapsHandleIndex(true);
      if (flapIndex >= 1) {
        this._takeOffFlap = flapAngles[flapIndex];
      }
    }

    // Copy airway selections from temporary to active flightplan
    copyAirwaySelections() {
      const temporaryFPWaypoints = this.flightPlanManager.getWaypoints(1);
      const activeFPWaypoints = this.flightPlanManager.getWaypoints(0);
      for (let i = 0; i < activeFPWaypoints.length; i++) {
        if (activeFPWaypoints[i].infos && temporaryFPWaypoints[i] && activeFPWaypoints[i].icao === temporaryFPWaypoints[i].icao && temporaryFPWaypoints[i].infos) {
          activeFPWaypoints[i].infos.airwayIn = temporaryFPWaypoints[i].infos.airwayIn;
          activeFPWaypoints[i].infos.airwayOut = temporaryFPWaypoints[i].infos.airwayOut;
        }
      }
    }
    onFMCFlightPlanLoaded() {
      let runway = this.flightPlanManager.getDepartureRunway();
      if (!runway) {
        runway = this.flightPlanManager.getDetectedCurrentRunway();
      }
      const weight = this.getWeight(true);
      const flaps = this.getTakeOffFlap();
      let vRSpeed = this.speedManager.getComputedVRSpeed(runway, weight, flaps);
      SimVar.SetSimVarValue('FLY ASSISTANT TAKEOFF SPEED ESTIMATED', 'Knots', vRSpeed);
    }
    activateRoute() {
      let directTo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Void;
      if (directTo) {
        this._activatingDirectTo = true;
      }
      this.fpHasChanged = true;
      if (this._isMainRouteActivated) {
        this._isRouteActivated = true;
        SimVar.SetSimVarValue('L:FMC_EXEC_ACTIVE', 'number', 1);
      }
      callback();
    }
    eraseRouteModifications() {
      this.fpHasChanged = false;
      this._activatingDirectTo = false;
      this._isRouteActivated = false;
      SimVar.SetSimVarValue('L:FMC_EXEC_ACTIVE', 'number', 0);
    }
    activateMainRoute() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyCallback.Void;
      this._isMainRouteActivated = true;
      this.activateRoute(false, callback);
    }

    //function added to set departure enroute transition index
    setDepartureEnrouteTransitionIndex(departureEnrouteTransitionIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setDepartureEnRouteTransitionIndex(departureEnrouteTransitionIndex, () => {
          callback(true);
        });
      });
    }

    //function added to set arrival runway transition index
    setArrivalRunwayTransitionIndex(arrivalRunwayTransitionIndex) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        this.flightPlanManager.setArrivalRunwayIndex(arrivalRunwayTransitionIndex, () => {
          callback(true);
        });
      });
    }
    setArrivalAndRunwayIndex(arrivalIndex, enrouteTransitionIndex) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Boolean;
      this.ensureCurrentFlightPlanIsTemporary(() => {
        let landingRunway = this.vfrLandingRunway;
        if (landingRunway === undefined) {
          landingRunway = this.flightPlanManager.getApproachRunway();
        }
        this.flightPlanManager.setArrivalProcIndex(arrivalIndex, () => {
          this.flightPlanManager.setArrivalEnRouteTransitionIndex(enrouteTransitionIndex, () => {
            if (landingRunway) {
              const arrival = this.flightPlanManager.getArrival();
              const arrivalRunwayIndex = arrival.runwayTransitions.findIndex(t => {
                return t.name.indexOf(landingRunway.designation) != -1;
              });
              if (arrivalRunwayIndex >= -1) {
                return this.flightPlanManager.setArrivalRunwayIndex(arrivalRunwayIndex, () => {
                  return callback(true);
                });
              }
            }
            return callback(true);
          });
        });
      });
    }
    toggleLNAV() {}
    toggleHeadingHold() {}
    activateAltitudeSel() {
      if (this.getIsVNAVActive()) {
        let displayedAltitude = Simplane.getAutoPilotDisplayedAltitudeLockValue();
        this.cruiseFlightLevel = Math.floor(displayedAltitude / 100);
      } else {
        Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, Simplane.getAutoPilotDisplayedAltitudeLockValue(), true);
      }
    }
    onEvent(_event) {
      super.onEvent(_event);
      console.log('B777_BaseFMC onEvent ' + _event);
      if (_event.indexOf('AP_LNAV') != -1) {
        if (this._isMainRouteActivated) {
          this._navModeSelector.onNavChangedEvent('NAV_PRESSED');
        } else {
          this.messageManager.showMessage('NO ACTIVE ROUTE', 'ACTIVATE ROUTE TO <br> ENGAGE LNAV');
        }
      } else if (_event.indexOf('AP_VNAV') != -1) {
        this.toggleVNAV();
      } else if (_event.indexOf('AP_FLCH') != -1) {
        this.toggleFLCH();
      } else if (_event.indexOf('AP_HEADING_HOLD') != -1) {
        this._navModeSelector.onNavChangedEvent('HDG_HOLD_PRESSED');
      } else if (_event.indexOf('AP_HEADING_SEL') != -1) {
        this._navModeSelector.onNavChangedEvent('HDG_SEL_PRESSED');
      } else if (_event.indexOf('AP_SPD') != -1) {
        if (this.aircraftType == Aircraft.AS01B) {
          if (SimVar.GetSimVarValue('AUTOPILOT THROTTLE ARM', 'Bool')) {
            this.activateSPD();
          } else {
            this.deactivateSPD();
          }
        } else {
          if ((this.getIsAltitudeHoldActive() || this.getIsVSpeedActive()) && this.getIsTHRActive()) {
            this.toggleSPD();
          }
        }
      } else if (_event.indexOf('AP_SPEED_INTERVENTION') != -1) {
        this.toggleSpeedIntervention();
      } else if (_event.indexOf('AP_VSPEED') != -1) {
        this.toggleVSpeed();
      } else if (_event.indexOf('AP_ALT_INTERVENTION') != -1) {
        this.activateAltitudeSel();
      } else if (_event.indexOf('AP_ALT_HOLD') != -1) {
        this.toggleAltitudeHold();
      } else if (_event.indexOf('THROTTLE_TO_GA') != -1) {
        this.setAPSpeedHoldMode();
        if (this.aircraftType == Aircraft.AS01B) {
          this.deactivateSPD();
        }
        this.setThrottleMode(ThrottleMode.TOGA);
        if (Simplane.getIndicatedSpeed() > 80) {
          this.deactivateLNAV();
          this.deactivateVNAV();
        }
      } else if (_event.indexOf('EXEC') != -1) {
        this.onExec();
      }
    }
    getIsLNAVArmed() {
      return this._pendingLNAVActivation;
    }
    getIsLNAVActive() {
      return this._isLNAVActive;
    }
    activateLNAV() {
      if (this.flightPlanManager.getWaypointsCount() === 0) {
        return;
      }
      Simplane.setAPLNAVArmed(1);
      let altitude = Simplane.getAltitudeAboveGround();
      if (altitude < 50) {
        this._pendingLNAVActivation = true;
      } else {
        this.doActivateLNAV();
      }
      this.deactivateHeadingHold();
    }
    doActivateLNAV() {
      this._isLNAVActive = true;
      this._pendingLNAVActivation = false;
      if (SimVar.GetSimVarValue('AUTOPILOT APPROACH HOLD', 'boolean')) {
        return;
      }
      Simplane.setAPLNAVActive(1);
      SimVar.SetSimVarValue('K:AP_NAV1_HOLD_ON', 'number', 1);
    }
    deactivateLNAV() {
      this._pendingLNAVActivation = false;
      this._isLNAVActive = false;
      Simplane.setAPLNAVArmed(0);
      Simplane.setAPLNAVActive(0);
    }
    getIsVNAVArmed() {
      return this._pendingVNAVActivation;
    }
    getIsVNAVActive() {
      return this._isVNAVActive;
    }
    toggleVNAV() {
      if (this.getIsVNAVArmed()) {
        this.deactivateVNAV();
        SimVar.SetSimVarValue('K:ALTITUDE_SLOT_INDEX_SET', 'number', 1);
        SimVar.SetSimVarValue('K:SPEED_SLOT_INDEX_SET', 'number', 1);
      } else {
        this.activateVNAV();
      }
    }
    activateVNAV() {
      if (this.flightPlanManager.getWaypointsCount() === 0) {
        return;
      }
      Simplane.setAPVNAVArmed(1);
      let altitude = Simplane.getAltitudeAboveGround();
      if (altitude < 400) {
        this._pendingVNAVActivation = true;
      } else {
        this.doActivateVNAV();
      }
      this.deactivateAltitudeHold();
      this.deactivateFLCH();
      this.deactivateVSpeed();
      if (this.aircraftType != Aircraft.AS01B) {
        this.deactivateSPD();
      }
    }
    doActivateVNAV() {
      this._isVNAVActive = true;
      Simplane.setAPVNAVActive(1);
      SimVar.SetSimVarValue('K:FLIGHT_LEVEL_CHANGE_ON', 'Number', 1);
      this._pendingVNAVActivation = false;
      this.activateTHRREFMode();
      SimVar.SetSimVarValue('K:SPEED_SLOT_INDEX_SET', 'number', 2);
      SimVar.SetSimVarValue('K:ALTITUDE_SLOT_INDEX_SET', 'number', 2);
      if (this.aircraftType == Aircraft.AS01B) {
        this.activateSPD();
      }
      this.setThrottleMode(ThrottleMode.CLIMB);
    }
    setThrottleMode(_mode) {
      if (this.getIsSPDActive() && this.aircraftType == Aircraft.AS01B) {
        Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO);
      } else {
        Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', _mode);
      }
    }
    deactivateVNAV() {
      this._pendingVNAVActivation = false;
      this._isVNAVActive = false;
      this._pendingVNAVActivation = false;
      Simplane.setAPVNAVArmed(0);
      Simplane.setAPVNAVActive(0);
      this.deactivateSpeedIntervention();
    }
    getIsFLCHArmed() {
      return this._pendingFLCHActivation;
    }
    getIsFLCHActive() {
      return this._isFLCHActive;
    }
    toggleFLCH() {
      if (this.getIsFLCHArmed()) {
        this.deactivateFLCH();
      } else {
        this.activateFLCH();
      }
    }
    activateFLCH() {
      this._isFLCHActive = true;
      Simplane.setAPFLCHActive(1);
      this.deactivateVNAV();
      this.deactivateAltitudeHold();
      this.deactivateVSpeed();
      let altitude = Simplane.getAltitudeAboveGround();
      if (altitude < 400) {
        this._pendingFLCHActivation = true;
      } else {
        this.doActivateFLCH();
      }
    }
    doActivateFLCH() {
      this._pendingFLCHActivation = false;
      SimVar.SetSimVarValue('K:ALTITUDE_SLOT_INDEX_SET', 'number', 1);
      let displayedAltitude = Simplane.getAutoPilotDisplayedAltitudeLockValue();
      Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, displayedAltitude, this._forceNextAltitudeUpdate);
      if (!Simplane.getAutoPilotFLCActive()) {
        SimVar.SetSimVarValue('K:FLIGHT_LEVEL_CHANGE_ON', 'Number', 1);
      }
      SimVar.SetSimVarValue('K:SPEED_SLOT_INDEX_SET', 'number', 1);
      this.setThrottleMode(ThrottleMode.CLIMB);
      if (this.aircraftType != Aircraft.AS01B) {
        this.activateSPD();
      }
    }
    deactivateFLCH() {
      this._isFLCHActive = false;
      this._pendingFLCHActivation = false;
      Simplane.setAPFLCHActive(0);
      this.deactivateSpeedIntervention();
    }
    getIsSPDArmed() {
      return this._pendingSPDActivation;
    }
    getIsSPDActive() {
      return this._isSPDActive;
    }
    toggleSPD() {
      if (this.getIsSPDArmed()) {
        this.deactivateSPD();
      } else {
        this.activateSPD();
      }
    }
    activateTHRREFMode() {
      let altitude = Simplane.getAltitudeAboveGround();
      this.setThrottleMode(ThrottleMode.CLIMB);
      let n1 = 100;
      if (altitude < this.thrustReductionAltitude) {
        n1 = this.getThrustTakeOffLimit();
      } else {
        n1 = this.getThrustClimbLimit();
      }
      SimVar.SetSimVarValue('AUTOPILOT THROTTLE MAX THRUST', 'number', n1);
    }
    getIsHeadingHoldActive() {
      return this._isHeadingHoldActive;
    }
    activateHeadingHold() {
      this.deactivateLNAV();
      this._isHeadingHoldActive = true;
      if (!SimVar.GetSimVarValue('AUTOPILOT HEADING LOCK', 'Boolean')) {
        SimVar.SetSimVarValue('K:AP_PANEL_HEADING_HOLD', 'Number', 1);
      }
      SimVar.SetSimVarValue('L:AP_HEADING_HOLD_ACTIVE', 'number', 1);
      this._headingHoldValue = Simplane.getHeadingMagnetic();
      SimVar.SetSimVarValue('K:HEADING_SLOT_INDEX_SET', 'number', 2);
      Coherent.call('HEADING_BUG_SET', 2, this._headingHoldValue);
    }
    deactivateHeadingHold() {
      this._isHeadingHoldActive = false;
      SimVar.SetSimVarValue('L:AP_HEADING_HOLD_ACTIVE', 'number', 0);
    }
    activateHeadingSel() {
      this.deactivateHeadingHold();
      this.deactivateLNAV();
      SimVar.SetSimVarValue('K:HEADING_SLOT_INDEX_SET', 'number', 1);
      let altitude = Simplane.getAltitudeAboveGround();
      if (altitude < 400) {
        this._pendingHeadingSelActivation = true;
      } else {
        this.doActivateHeadingSel();
      }
    }
    doActivateHeadingSel() {
      this._pendingHeadingSelActivation = false;
      if (!SimVar.GetSimVarValue('AUTOPILOT HEADING LOCK', 'Boolean')) {
        SimVar.SetSimVarValue('K:AP_PANEL_HEADING_HOLD', 'Number', 1);
      }
    }
    getIsTHRActive() {
      return false;
    }
    getIsVSpeedActive() {
      return this._isVSpeedActive;
    }
    toggleVSpeed() {
      if (this.getIsVSpeedActive()) {
        let altitude = Simplane.getAltitudeAboveGround();
        if (altitude < 50) {
          this.deactivateVSpeed();
          this.deactivateSPD();
        } else {
          this.activateVSpeed();
        }
      } else {
        this.activateVSpeed();
      }
    }
    activateVSpeed() {
      this._isVSpeedActive = true;
      this.deactivateVNAV();
      this.deactivateAltitudeHold();
      this.deactivateFLCH();
      this.activateSPD();
      SimVar.SetSimVarValue('K:ALTITUDE_SLOT_INDEX_SET', 'number', 1);
      let displayedAltitude = Simplane.getAutoPilotDisplayedAltitudeLockValue();
      Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, displayedAltitude, this._forceNextAltitudeUpdate);
      this.requestCall(() => {
        let currentVSpeed = Simplane.getVerticalSpeed();
        Coherent.call('AP_VS_VAR_SET_ENGLISH', 0, currentVSpeed);
        if (!SimVar.GetSimVarValue('AUTOPILOT VERTICAL HOLD', 'Boolean')) {
          SimVar.SetSimVarValue('K:AP_PANEL_VS_HOLD', 'Number', 1);
        }
      }, 200);
      SimVar.SetSimVarValue('L:AP_VS_ACTIVE', 'number', 1);
    }
    deactivateVSpeed() {
      this._isVSpeedActive = false;
      SimVar.SetSimVarValue('L:AP_VS_ACTIVE', 'number', 0);
    }
    toggleAltitudeHold() {
      if (this.getIsAltitudeHoldActive()) {
        let altitude = Simplane.getAltitudeAboveGround();
        if (altitude < 50) {
          this.deactivateAltitudeHold();
          this.deactivateSPD();
        }
      } else {
        this.activateAltitudeHold();
      }
    }
    getIsAltitudeHoldActive() {
      return this._isAltitudeHoldActive;
    }
    activateAltitudeHold() {
      let useCurrentAutopilotTarget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.deactivateVNAV();
      this.deactivateFLCH();
      this.deactivateVSpeed();
      this.activateSPD();
      this._isAltitudeHoldActive = true;
      Simplane.setAPAltHoldActive(1);
      if (useCurrentAutopilotTarget) {
        this._altitudeHoldValue = Simplane.getAutoPilotAltitudeLockValue('feet');
      } else {
        this._altitudeHoldValue = Simplane.getAltitude();
        this._altitudeHoldValue = Math.round(this._altitudeHoldValue / 100) * 100;
      }
      SimVar.SetSimVarValue('K:ALTITUDE_SLOT_INDEX_SET', 'number', 1);
      Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, this._altitudeHoldValue, this._forceNextAltitudeUpdate);
      if (!SimVar.GetSimVarValue('AUTOPILOT ALTITUDE LOCK', 'Boolean')) {
        SimVar.SetSimVarValue('K:AP_PANEL_ALTITUDE_HOLD', 'Number', 1);
      }
    }
    deactivateAltitudeHold() {
      this._isAltitudeHoldActive = false;
      Simplane.setAPAltHoldActive(0);
      Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, Simplane.getAutoPilotDisplayedAltitudeLockValue(), this._forceNextAltitudeUpdate);
      if (this._onAltitudeHoldDeactivate) {
        let cb = this._onAltitudeHoldDeactivate;
        this._onAltitudeHoldDeactivate = undefined;
        cb();
      }
    }
    getThrustTakeOffLimit() {
      return 121;
    }
    getThrustClimbLimit() {
      return 106;
    }
    getVRef() {
      return 200;
    }
    getTakeOffManagedSpeed() {
      let altitude = Simplane.getAltitudeAboveGround();
      if (altitude < 35) {
        return this.speedManager.repository.v2Speed + 15;
      }
      return 250;
    }
    getIsRouteActivated() {
      return this._isRouteActivated;
    }
    setBoeingDirectTo(directToWaypointIdent, directToWaypointIndex) {
      let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EmptyCallback.Boolean;
      let waypoints = this.flightPlanManager.getWaypoints();
      let waypointIndex = waypoints.findIndex(w => {
        return w.ident === directToWaypointIdent;
      });
      if (waypointIndex === -1) {
        waypoints = this.flightPlanManager.getApproachWaypoints();
        if (waypoints) {
          let waypoint = waypoints.find(w => {
            return w.ident === directToWaypointIdent;
          });
          if (waypoint) {
            return this.flightPlanManager.activateDirectTo(waypoint.icao, () => {
              return callback(true);
            });
          }
        }
      }
      if (waypointIndex > -1) {
        this.ensureCurrentFlightPlanIsTemporary(() => {
          this.flightPlanManager.removeWaypointFromTo(directToWaypointIndex, waypointIndex, true, () => {
            callback(true);
          });
        });
      } else {
        callback(false);
      }
    }
    updateHUDAirspeedColors() {
      let crossSpeed = Simplane.getCrossoverSpeed();
      let cruiseMach = Simplane.getCruiseMach();
      let crossSpeedFactor = Simplane.getCrossoverSpeedFactor(crossSpeed, cruiseMach);
      let stallSpeed = Simplane.getStallSpeed();
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_WHITE_START', 'number', Simplane.getDesignSpeeds().VS0 * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_WHITE_END', 'number', Simplane.getMaxSpeed(this.aircraftType) * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_GREEN_START', 'number', stallSpeed * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_GREEN_END', 'number', stallSpeed * Math.sqrt(1.3) * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_YELLOW_START', 'number', stallSpeed * Math.sqrt(1.3) * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_YELLOW_END', 'number', Simplane.getMaxSpeed(this.aircraftType) * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_RED_START', 'number', Simplane.getMaxSpeed(this.aircraftType) * crossSpeedFactor);
      SimVar.SetSimVarValue('L:HUD_AIRSPEED_RED_END', 'number', (Simplane.getDesignSpeeds().VMax + 100) * crossSpeedFactor);
    }

    /**
     * Registers a periodic page refresh with the FMC display.
     * @param {number} interval The interval, in ms, to run the supplied action.
     * @param {function} action An action to run at each interval. Can return a bool to indicate if the page refresh should stop.
     * @param {boolean} runImmediately If true, the action will run as soon as registered, and then after each
     * interval. If false, it will start after the supplied interval.
     */
    registerPeriodicPageRefresh(action, interval, runImmediately) {
      this.unregisterPeriodicPageRefresh();
      const refreshHandler = () => {
        const isBreak = action();
        if (isBreak) {
          return;
        }
        this._pageRefreshTimer = window.setTimeout(refreshHandler, interval);
      };
      if (runImmediately) {
        refreshHandler();
      } else {
        this._pageRefreshTimer = window.setTimeout(refreshHandler, interval);
      }
    }

    /**
     * Unregisters a periodic page refresh with the FMC display.
     */
    unregisterPeriodicPageRefresh() {
      if (this._pageRefreshTimer) {
        clearInterval(this._pageRefreshTimer);
      }
    }
    clearDisplay() {
      super.clearDisplay();
      this.unregisterPeriodicPageRefresh();
    }

    /**
     * FMC Renderer extensions
     * TODO: Standalone rendered should be created.
     */

    setTemplate(template) {
      return;
    }

    /**
     * Convert text to settable FMC design
     * @param content
     * @param width
     * @returns {string}
     */
    makeSettable(content) {
      let width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return '[settable=' + String(width) + ']' + content + '[/settable]';
      //return '[settable]' + content + '[/settable]';
    }

    /**
     * Convert/set text to colored text
     * @param content
     * @param color
     * @returns {string}
     */
    colorizeContent(content, color) {
      return '[color=' + color + ']' + content + '[/color]';
    }

    /**
     * Convert/set text size
     * @param content
     * @param size
     * @returns {string}
     */
    resizeContent(content, size) {
      return '[size=' + size + ']' + content + '[/size]';
    }

    /**
     * setTitle with settable/size/color support
     * @param content
     */
    setTitle(content) {
      if (content !== '') {
        let re3 = /\[settable\](.*?)\[\/settable\]/g;
        content = content.replace(re3, '<div class="settable"><span>$1</span></div>');
        let re2 = /\[size=([a-z-]+)\](.*?)\[\/size\]/g;
        content = content.replace(re2, '<tspan class="$1">$2</tspan>');
        let re = /\[color=([a-z-]+)\](.*?)\[\/color\]/g;
        content = content.replace(re, '<tspan class="$1">$2</tspan>');
        content.split('[color]')[1];
      }
      let color = content.split('[color]')[1];
      if (!color) {
        color = 'white';
      }
      this._title = content.split('[color]')[0];
      this._titleElement.classList.remove('white', 'blue', 'yellow', 'orange', 'green', 'red');
      this._titleElement.classList.add(color);
      this._titleElement.innerHTML = this._title;
    }

    /**
     * setlabel with settable/size/color support
     * @param content
     */
    setLabel(label, row) {
      let col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (col >= this._labelElements[row].length) {
        return;
      }
      if (!this._labels[row]) {
        this._labels[row] = [];
      }
      if (!label) {
        label = '';
      }
      if (col === -1) {
        for (let i = 0; i < this._labelElements[row].length; i++) {
          this._labels[row][i] = '';
          this._labelElements[row][i].textContent = '';
        }
        col = 0;
      }
      if (label === '__FMCSEPARATOR') {
        label = '---------------------------------------';
      }
      if (label !== '') {
        label = label.replace('\<', '&lt');
        let re3 = /\[settable\](.*?)\[\/settable\]/g;
        //content = content.replace(re3, '<div style="padding-top: 4px"><span class="settable">$1</span></div>')
        label = label.replace(re3, '<div class="settable"><span>$1</span></div>');
        let re2 = /\[size=([a-z-]+)\](.*?)\[\/size\]/g;
        label = label.replace(re2, '<tspan class="$1">$2</tspan>');
        let re = /\[color=([a-z-]+)\](.*?)\[\/color\]/g;
        label = label.replace(re, '<tspan class="$1">$2</tspan>');
        let color = label.split('[color]')[1];
        if (!color) {
          color = 'white';
        }
        let e = this._labelElements[row][col];
        e.classList.remove('white', 'blue', 'yellow', 'orange', 'green', 'red');
        e.classList.add(color);
        label = label.split('[color]')[0];
      }
      this._labels[row][col] = label;
      this._labelElements[row][col].innerHTML = '<bdi>' + label + '</bdi>';
    }

    /**
     * setline with settable/size/color support
     * @param content
     */
    setLine(content, row) {
      let col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (col >= this._lineElements[row].length) {
        return;
      }
      if (!content) {
        content = '';
      }
      if (!this._lines[row]) {
        this._lines[row] = [];
      }
      if (col === -1) {
        for (let i = 0; i < this._lineElements[row].length; i++) {
          this._lines[row][i] = '';
          this._lineElements[row][i].textContent = '';
        }
        col = 0;
      }
      if (content === '__FMCSEPARATOR') {
        content = '---------------------------------------';
      }
      if (content !== '') {
        content = content.replace('\<', '&lt');
        if (content.indexOf('[s-text]') !== -1) {
          content = content.replace('[s-text]', '');
          this._lineElements[row][col].classList.add('s-text');
        } else {
          this._lineElements[row][col].classList.remove('s-text');
        }
        let re3 = /\[settable\](.*?)\[\/settable\]/g;
        //content = content.replace(re3, '<div style="padding-top: 4px"><span class="settable">$1</span></div>')
        content = content.replace(re3, '<div class="settable"><span>$1</span></div>');
        let re2 = /\[size=([a-z-]+)\](.*?)\[\/size\]/g;
        content = content.replace(re2, '<tspan class="$1">$2</tspan>');
        let re = /\[color=([a-z-]+)\](.*?)\[\/color\]/g;
        content = content.replace(re, '<tspan class="$1">$2</tspan>');
        let color = content.split('[color]')[1];
        if (!color) {
          color = 'white';
        }
        let e = this._lineElements[row][col];
        e.classList.remove('white', 'blue', 'yellow', 'green', 'red', 'magenta');
        e.classList.add(color);
        content = content.split('[color]')[0];
      }
      this._lines[row][col] = content;
      this._lineElements[row][col].innerHTML = '<bdi>' + this._lines[row][col] + '</bdi>';
    }
    trySetTransAltitude(s) {
      if (!/^\d+$/.test(s)) {
        this.showErrorMessage('FORMAT ERROR');
        return false;
      }
      let v = parseInt(s);
      if (isFinite(v) && v > 0) {
        this.transitionAltitude = v;
        SimVar.SetSimVarValue('L:AIRLINER_TRANS_ALT', 'Number', this.transitionAltitude);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }

    /**
     * TODO: Should be moved to SpeedDirector class
     * @param s
     * @returns {boolean}
     */
    trySetAccelerationHeight(s) {
      let accelerationHeight = parseInt(s);
      let origin = this.flightPlanManager.getOrigin();
      if (origin) {
        if (isFinite(accelerationHeight)) {
          let elevation = Math.round(parseFloat(origin.infos.oneWayRunways[0].elevation) * 3.28);
          let roundedHeight = Math.round(accelerationHeight / 100) * 100;
          if (this.trySetAccelerationAltitude(String(roundedHeight + elevation))) {
            this._speedDirector.accelerationSpeedRestriction.accelerationHeight = roundedHeight;
            return true;
          }
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }

    /**
     * TODO: Should be moved to SpeedDirector class
     * @param s
     * @returns {boolean}
     */
    trySetAccelerationAltitude(s) {
      let accelerationHeight = parseInt(s);
      if (isFinite(accelerationHeight)) {
        this._speedDirector.accelerationSpeedRestriction.altitude = accelerationHeight;
        SimVar.SetSimVarValue('L:AIRLINER_ACC_ALT', 'Number', accelerationHeight);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }

    /**
     * TODO: Should be moved to SpeedDirector/ThrustDirector
     * TODO: Probably should be better to make ThrustDirector because thr reduction is not speed thing
     * @param s
     * @returns {boolean}
     */
    trySetThrustReductionHeight(s) {
      let thrustReductionHeight = parseInt(s);
      let origin = this.flightPlanManager.getOrigin();
      if (origin) {
        if (isFinite(thrustReductionHeight)) {
          let elevation = Math.round(parseFloat(origin.infos.oneWayRunways[0].elevation) * 3.28);
          let roundedHeight = Math.round(thrustReductionHeight / 100) * 100;
          if (this.trySetThrustReductionAltitude(String(roundedHeight + elevation))) {
            this.thrustReductionHeight = roundedHeight;
            this.isThrustReductionAltitudeCustomValue = true;
            return true;
          }
        }
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }

    /**
    * TODO: Should be moved to SpeedDirector class
    * @param s
    * @returns {boolean}
    */
    trySetThrustReductionAltitude(s) {
      let thrustReductionHeight = parseInt(s);
      if (isFinite(thrustReductionHeight)) {
        this.thrustReductionAltitude = thrustReductionHeight;
        SimVar.SetSimVarValue('L:AIRLINER_THR_RED_ALT', 'Number', this.thrustReductionAltitude);
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }

    /**
     * TODO: Should be moved to SpeedDirector class or the function should be only bypass for new function in SpeedDirector
     */
    recalculateTHRRedAccTransAlt() {
      /**
       * TODO: HotFix!!! Need to be fixed in future... SpeedDirector is not normally accessible from here
       */
      if (this._speedDirector === undefined) {
        this._speedDirector = new SpeedDirector(this.speedManager);
      }
      let origin = this.flightPlanManager.getOrigin();
      if (origin) {
        this._recalculateOriginTransitionAltitude(origin);
        this._recalculateThrustReductionAltitude(origin);
        this._recalculateAccelerationAltitude(origin);
      }
      let destination = this.flightPlanManager.getDestination();
      if (destination) {
        this._recalculateDestinationTransitionAltitude(destination);
      }
    }

    /**
     * TODO: Should be moved into SpeedDirector/ThrustDirector??
     * @param origin
     * @private
     */
    _recalculateThrustReductionAltitude(origin) {
      if (origin) {
        if (origin.infos instanceof AirportInfo) {
          if (!this.isThrustReductionAltitudeCustomValue) {
            const elevation = Math.round(parseFloat(origin.infos.oneWayRunways[0].elevation) * 3.28);
            this.thrustReductionAltitude = elevation + 1500;
            this.thrustReductionHeight = 1500;
            SimVar.SetSimVarValue('L:AIRLINER_THR_RED_ALT', 'Number', this.thrustReductionAltitude);
          }
        }
      }
    }

    /**
     * TODO: Should be moved into SpeedDirector
     * @param origin
     * @private
     */
    _recalculateAccelerationAltitude(origin) {
      if (origin) {
        if (origin.infos instanceof AirportInfo) {
          const elevation = Math.round(parseFloat(origin.infos.oneWayRunways[0].elevation) * 3.28);
          this._speedDirector.accelerationSpeedRestriction.altitude = elevation + this._speedDirector.accelerationSpeedRestriction.accelerationHeight;
          SimVar.SetSimVarValue('L:AIRLINER_ACC_ALT', 'Number', this._speedDirector.accelerationSpeedRestriction.altitude);
        }
      }
    }
    _recalculateOriginTransitionAltitude(origin) {
      if (origin) {
        if (origin.infos instanceof AirportInfo) {
          if (isFinite(origin.infos.transitionAltitude)) {
            this.transitionAltitude = origin.infos.transitionAltitude;
          }
        }
      }
    }
    _recalculateDestinationTransitionAltitude(destination) {
      if (destination) {
        if (destination.infos instanceof AirportInfo) {
          if (isFinite(destination.infos.transitionAltitude)) {
            this.perfApprTransAlt = destination.infos.transitionAltitude;
          }
        }
      }
    }
    setAPManagedSpeedMach(_mach, _aircraft) {
      if (isFinite(_mach)) {
        if (Simplane.getAutoPilotMachModeActive()) {
          Coherent.call('AP_MACH_VAR_SET', 2, _mach);
          SimVar.SetSimVarValue('K:AP_MANAGED_SPEED_IN_MACH_ON', 'number', 1);
        }
      }
    }
    getThrustTakeOffTemp() {
      return this._thrustTakeOffTemp;
    }
    checkFmcPreFlight() {
      if (!this.dataHolder.preFlightDataHolder.finished) {
        this.dataHolder.preFlightDataHolder.thrustLim.assumedTemperature = !!this.getThrustTakeOffTemp();
        this.dataHolder.preFlightDataHolder.thrustLim.completed = this.dataHolder.preFlightDataHolder.thrustLim.assumedTemperature;
        this.dataHolder.preFlightDataHolder.takeOff.flaps = !!this.getTakeOffFlap();
        this.dataHolder.preFlightDataHolder.takeOff.v1 = !!this.speedManager.repository.v1Speed;
        this.dataHolder.preFlightDataHolder.takeOff.vR = !!this.speedManager.repository.vRSpeed;
        this.dataHolder.preFlightDataHolder.takeOff.v2 = !!this.speedManager.repository.v2Speed;
        this.dataHolder.preFlightDataHolder.takeOff.completed = this.dataHolder.preFlightDataHolder.takeOff.v1 && this.dataHolder.preFlightDataHolder.takeOff.vR && this.dataHolder.preFlightDataHolder.takeOff.v2 && this.dataHolder.preFlightDataHolder.takeOff.flaps;
        this.dataHolder.preFlightDataHolder.perfInit.cruiseAltitude = !!this.cruiseFlightLevel;
        this.dataHolder.preFlightDataHolder.perfInit.costIndex = !!this.costIndex;
        this.dataHolder.preFlightDataHolder.perfInit.reserves = !!this.getFuelReserves();
        this.dataHolder.preFlightDataHolder.perfInit.completed = this.dataHolder.preFlightDataHolder.perfInit.cruiseAltitude && this.dataHolder.preFlightDataHolder.perfInit.costIndex && this.dataHolder.preFlightDataHolder.perfInit.reserves;
        this.dataHolder.preFlightDataHolder.route.origin = !!this.flightPlanManager.getOrigin();
        this.dataHolder.preFlightDataHolder.route.destination = !!this.flightPlanManager.getDestination();
        this.dataHolder.preFlightDataHolder.route.activated = true;
        this.dataHolder.preFlightDataHolder.route.completed = this.dataHolder.preFlightDataHolder.route.activated && this.dataHolder.preFlightDataHolder.route.destination && this.dataHolder.preFlightDataHolder.route.origin;
        this.dataHolder.preFlightDataHolder.completed = this.dataHolder.preFlightDataHolder.thrustLim.completed && this.dataHolder.preFlightDataHolder.takeOff.completed && this.dataHolder.preFlightDataHolder.perfInit.completed && this.dataHolder.preFlightDataHolder.route.completed;
      }
    }
    showFMCPreFlightComplete(airspeed) {
      if (this.currentFlightPhase <= FlightPhase.FLIGHT_PHASE_TAKEOFF && airspeed < 80) {
        this.checkFmcPreFlight();
      } else {
        if (this.dataHolder.preFlightDataHolder.finished === false) {
          let fmsPreFlightElementGroup = document.querySelector('#fms-preflight');
          fmsPreFlightElementGroup.setAttribute('visibility', 'hidden');
          this.dataHolder.preFlightDataHolder.finished = true;
        }
      }
    }

    /**
     * TODO: This should be in FlightPhaseManager
     */
    checkUpdateFlightPhase() {
      let airSpeed = Simplane.getTrueSpeed();
      this.showFMCPreFlightComplete(airSpeed);
      if (airSpeed > 10) {
        if (this.currentFlightPhase === 0) {
          this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_TAKEOFF;
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_TAKEOFF) {
          let enterClimbPhase = false;
          let agl = Simplane.getAltitude();
          let altValue = isFinite(this.thrustReductionAltitude) ? this.thrustReductionAltitude : 1500;
          if (agl > altValue) {
            this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_CLIMB;
            enterClimbPhase = true;
          }
          if (enterClimbPhase) {
            let origin = this.flightPlanManager.getOrigin();
            if (origin) {
              origin.altitudeWasReached = Simplane.getAltitude();
              origin.timeWasReached = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
              origin.fuelWasReached = SimVar.GetSimVarValue('FUEL TOTAL QUANTITY', 'gallons') * SimVar.GetSimVarValue('FUEL WEIGHT PER GALLON', 'kilograms') / 1000;
            }
          }
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB) {
          let altitude = Simplane.getAltitude();
          let cruiseFlightLevel = this.cruiseFlightLevel * 100;
          if (isFinite(cruiseFlightLevel)) {
            if (altitude >= 0.96 * cruiseFlightLevel) {
              this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_CRUISE;
              Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO);
            }
          }
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
          SimVar.SetSimVarValue('L:AIRLINER_FMS_SHOW_TOP_CLIMB', 'number', 0);

          //console.log('TO TD: ' + SimVar.GetSimVarValue('L:WT_CJ4_TOD_REMAINING', 'number'));
          //console.log('DIS TD: ' + SimVar.GetSimVarValue('L:WT_CJ4_TOD_DISTANCE', 'number'));
          /**
           * Basic TOD to destination
           */
          let cruiseAltitude = SimVar.GetSimVarValue('L:AIRLINER_CRUISE_ALTITUDE', 'number');
          let showTopOfDescent = false;
          if (isFinite(cruiseAltitude)) {
            let destination = this.flightPlanManager.getDestination();
            if (destination) {
              let firstTODWaypoint = this.getWaypointForTODCalculation();
              if (firstTODWaypoint) {
                let totalDistance = 0;
                const destinationElevation = firstTODWaypoint.targetAltitude;
                const descentAltitudeDelta = Math.abs(destinationElevation - cruiseAltitude) / 100;
                const todDistance = descentAltitudeDelta / 3.3;
                const indicatedSpeed = Simplane.getIndicatedSpeed();
                let speedToLose = 0;
                if (indicatedSpeed > 220) {
                  speedToLose = indicatedSpeed - 220;
                }
                const distanceForSpeedReducing = speedToLose / 10;
                totalDistance = todDistance + distanceForSpeedReducing + firstTODWaypoint.distanceFromDestinationToWaypoint;
                let todCoordinates = this.flightPlanManager.getCoordinatesAtNMFromDestinationAlongFlightPlan(totalDistance, true);
                let todLatLongAltCoordinates = new LatLongAlt(todCoordinates.lat, todCoordinates.long);
                let planeCoordinates = new LatLongAlt(SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude'), SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude'));
                let distanceToTOD = Avionics.Utils.computeGreatCircleDistance(planeCoordinates, todLatLongAltCoordinates);
                SimVar.SetSimVarValue('L:WT_CJ4_TOD_REMAINING', 'number', distanceToTOD);
                SimVar.SetSimVarValue('L:WT_CJ4_TOD_DISTANCE', 'number', totalDistance);
                if (distanceToTOD < 50) {
                  if (!SimVar.GetSimVarValue('L:B77RS_DESCENT_NOW_AVAILABLE', 'Number')) {
                    SimVar.SetSimVarValue('L:B77RS_DESCENT_NOW_AVAILABLE', 'Number', 1);
                    SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
                  }
                }
                if (distanceToTOD > 1) {
                  showTopOfDescent = true;
                } else {
                  showTopOfDescent = false;
                  let lastFlightPhase = this.currentFlightPhase;
                  this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_DESCENT;
                  Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.AUTO);
                  if (lastFlightPhase !== FlightPhase.FLIGHT_PHASE_DESCENT) {
                    SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
                  }
                }
                if (showTopOfDescent) {
                  SimVar.SetSimVarValue('L:AIRLINER_FMS_SHOW_TOP_DSCNT', 'number', 1);
                } else {
                  SimVar.SetSimVarValue('L:AIRLINER_FMS_SHOW_TOP_DSCNT', 'number', 0);
                }
              }
            }
          }
        }
        if (this.currentFlightPhase !== FlightPhase.FLIGHT_PHASE_APPROACH) {
          if (this.flightPlanManager.decelWaypoint) {
            let lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
            let long = Simplane.getCurrentLon();
            let planeLla = new LatLongAlt(lat, long);
            let dist = Avionics.Utils.computeGreatCircleDistance(this.flightPlanManager.decelWaypoint.infos.coordinates, planeLla);
            if (dist < 3) {
              this.tryGoInApproachPhase();
            }
          }
        }
        if (this.currentFlightPhase !== FlightPhase.FLIGHT_PHASE_APPROACH) {
          let destination = this.flightPlanManager.getDestination();
          if (destination) {
            let lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
            let long = Simplane.getCurrentLon();
            let planeLla = new LatLongAlt(lat, long);
            let dist = Avionics.Utils.computeGreatCircleDistance(destination.infos.coordinates, planeLla);
            if (dist < 20) {
              this.tryGoInApproachPhase();
            }
          }
        }
      }
      if (Simplane.getCurrentFlightPhase() != this.currentFlightPhase) {
        Simplane.setCurrentFlightPhase(this.currentFlightPhase);
        this.onFlightPhaseChanged();
      }
    }
    getWaypointForTODCalculation() {
      let getWaypoint = allWaypoints => {
        /**
         * 0 - NO
         * 1 - AT
         * 2 - A
         * 3 - B
         * 4 - AB
         */

        for (let i = 0; i <= allWaypoints.length - 1; i++) {
          if (allWaypoints[i].legAltitudeDescription === 0) {
            continue;
          }
          if (allWaypoints[i].legAltitudeDescription === 1 && isFinite(allWaypoints[i].legAltitude1)) {
            return {
              fix: allWaypoints[i],
              targetAltitude: Math.round(allWaypoints[i].legAltitude1)
            };
          }
          if (allWaypoints[i].legAltitudeDescription === 2 && isFinite(allWaypoints[i].legAltitude1)) {
            //continue;
            return {
              fix: allWaypoints[i],
              targetAltitude: Math.round(allWaypoints[i].legAltitude1)
            };
          }
          if (allWaypoints[i].legAltitudeDescription === 3 && isFinite(allWaypoints[i].legAltitude1)) {
            return {
              fix: allWaypoints[i],
              targetAltitude: Math.round(allWaypoints[i].legAltitude1)
            };
          }
          if (allWaypoints[i].legAltitudeDescription === 4 && isFinite(allWaypoints[i].legAltitude1) && isFinite(allWaypoints[i].legAltitude2)) {
            if (allWaypoints[i].legAltitude1 === allWaypoints[i].legAltitude2) {
              return {
                fix: allWaypoints[i],
                targetAltitude: Math.round(allWaypoints[i].legAltitude1)
              };
            }
            if (allWaypoints[i].legAltitude1 < allWaypoints[i].legAltitude2) {
              let middle = (allWaypoints[i].legAltitude2 - allWaypoints[i].legAltitude1) / 2;
              return {
                fix: allWaypoints[i],
                targetAltitude: Math.round(allWaypoints[i].legAltitude1 + middle)
              };
            }
            if (allWaypoints[i].legAltitude1 > allWaypoints[i].legAltitude2) {
              let middle = (allWaypoints[i].legAltitude1 - allWaypoints[i].legAltitude2) / 2;
              return {
                fix: allWaypoints[i],
                targetAltitude: Math.round(allWaypoints[i].legAltitude2 + middle)
              };
            }
          }
        }
        return undefined;
      };
      let waypoint = undefined;
      let destination = this.flightPlanManager.getDestination();
      if (destination) {
        let arrivalSegment = this.flightPlanManager.getCurrentFlightPlan().arrival;
        let approachSegment = this.flightPlanManager.getCurrentFlightPlan().approach;
        waypoint = getWaypoint(arrivalSegment.waypoints);
        if (!waypoint) {
          waypoint = getWaypoint(approachSegment.waypoints);
        }
        if (!waypoint) {
          waypoint = {
            fix: destination,
            targetAltitude: Math.round(parseFloat(destination.infos.oneWayRunways[0].elevation) * 3.28)
          };
        }
        if (waypoint) {
          if (approachSegment.waypoints.length > 0) {
            const cumulativeToApproach = approachSegment.waypoints[approachSegment.waypoints.length - 1].cumulativeDistanceInFP;
            waypoint.distanceFromDestinationToWaypoint = cumulativeToApproach - waypoint.fix.cumulativeDistanceInFP;
          } else {
            waypoint.distanceFromDestinationToWaypoint = destination.cumulativeDistanceInFP - waypoint.fix.cumulativeDistanceInFP;
          }
        }
      }
      return waypoint;
    }
  }
  BaseFMC.clrValue = 'DELETE';

  class CJ4_FMC_PilotWaypoint_Manager {
    constructor(fmc) {
      _defineProperty(this, "_fmc", void 0);
      _defineProperty(this, "_pilotWaypointArray", void 0);
      _defineProperty(this, "_pilotWaypointCount", void 0);
      _defineProperty(this, "_pilotWaypointArray1", void 0);
      _defineProperty(this, "_pilotWaypointArray2", void 0);
      _defineProperty(this, "_pilotWaypointArray3", void 0);
      _defineProperty(this, "_pilotWaypointArray4", void 0);
      _defineProperty(this, "_pilotWaypointArray5", void 0);
      this._fmc = fmc;
      this._pilotWaypointArray = [];
      this._pilotWaypointCount = 0;
      this._pilotWaypointArray1 = []; //To protect datastore, only 4 wpts per array for a total of 20
      this._pilotWaypointArray2 = [];
      this._pilotWaypointArray3 = [];
      this._pilotWaypointArray4 = [];
      this._pilotWaypointArray5 = [];
    }
    activate() {
      this._pilotWaypointArray1 = JSON.parse(WTDataStore.get('CJ4_PILOTWPT_1', '{ }')); //To protect datastore, only 4 wpts per array for a total of 20
      this._pilotWaypointArray2 = JSON.parse(WTDataStore.get('CJ4_PILOTWPT_2', '{ }'));
      this._pilotWaypointArray3 = JSON.parse(WTDataStore.get('CJ4_PILOTWPT_3', '{ }'));
      this._pilotWaypointArray4 = JSON.parse(WTDataStore.get('CJ4_PILOTWPT_4', '{ }'));
      this._pilotWaypointArray5 = JSON.parse(WTDataStore.get('CJ4_PILOTWPT_5', '{ }'));
      if (this._pilotWaypointArray1.length > 0) {
        this._pilotWaypointArray = [...this._pilotWaypointArray1];
      }
      if (this._pilotWaypointArray2.length > 0) {
        this._pilotWaypointArray.push(...this._pilotWaypointArray2);
      }
      if (this._pilotWaypointArray3.length > 0) {
        this._pilotWaypointArray.push(...this._pilotWaypointArray3);
      }
      if (this._pilotWaypointArray4.length > 0) {
        this._pilotWaypointArray.push(...this._pilotWaypointArray4);
      }
      if (this._pilotWaypointArray5.length > 0) {
        this._pilotWaypointArray.push(...this._pilotWaypointArray5);
      }
      console.log('Pilot waypoints loaded from datastore: ' + this._pilotWaypointArray.length);
      this._pilotWaypointCount = this._pilotWaypointArray.length;
    }
    checkPilotDuplicates(ident) {
      return this._pilotWaypointArray.find(w => {
        return w.id == ident;
      }) !== undefined;
    }
    async checkDatabaseDuplicates(ident) {
      return new Promise(resolve => {
        this._fmc.dataManager.GetWaypointsByIdent(ident).then(waypoints => {
          if (waypoints && waypoints.length > 0 && waypoints.find(w => {
            return w.ident === ident;
          })) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
    async addPilotWaypoint(ident, latitude, longitude) {
      let duplicateExists = false;
      duplicateExists = this.checkPilotDuplicates(ident);
      if (!duplicateExists) {
        duplicateExists = await this.checkDatabaseDuplicates(ident);
      }
      if (duplicateExists) {
        return false;
      } else {
        const pilotWaypoint = new CJ4_FMC_PilotWaypoint(ident, latitude, longitude);
        this._pilotWaypointArray.push(pilotWaypoint);
        this._pilotWaypointCount++;
        if (this._pilotWaypointCount > 20) {
          const deleteCount = this._pilotWaypointCount - 20;
          this._pilotWaypointArray.splice(0, deleteCount);
        }
        this.writePilotWaypointsToDatastore();
        return true;
      }
    }
    addPilotWaypointWithOverwrite(ident, latitude, longitude) {
      let duplicateExists = false;
      duplicateExists = this.checkPilotDuplicates(ident);
      if (duplicateExists) {
        this.deletePilotWaypoint(ident);
      }
      const pilotWaypoint = new CJ4_FMC_PilotWaypoint(ident, Math.round(latitude * 10000) / 10000, Math.round(longitude * 10000) / 10000);
      this._pilotWaypointArray.push(pilotWaypoint);
      this._pilotWaypointCount++;
      if (this._pilotWaypointCount > 20) {
        const deleteCount = this._pilotWaypointCount - 20;
        this._pilotWaypointArray.splice(0, deleteCount);
      }
      this.writePilotWaypointsToDatastore();
    }
    deletePilotWaypoint(ident) {
      const pilotWaypoint = this._pilotWaypointArray.find(w => {
        return w.id == ident;
      });
      if (pilotWaypoint) {
        const pilotWaypointIndex = this._pilotWaypointArray.indexOf(pilotWaypoint);
        this._pilotWaypointArray.splice(pilotWaypointIndex, 1);
        this._pilotWaypointCount--;
        this.writePilotWaypointsToDatastore();
        return true;
      } else {
        return false;
      }
    }
    writePilotWaypointsToDatastore() {
      const pilotWaypointCount = this._pilotWaypointArray.length;
      if (pilotWaypointCount != this._pilotWaypointCount) {
        this._pilotWaypointCount = pilotWaypointCount;
      }
      const arraysRequired = Math.ceil(this._pilotWaypointCount / 4);
      this._pilotWaypointArray1 = [];
      this._pilotWaypointArray2 = [];
      this._pilotWaypointArray3 = [];
      this._pilotWaypointArray4 = [];
      this._pilotWaypointArray5 = [];
      let waypointsToWrite = undefined;
      for (let i = 1; i <= arraysRequired; i++) {
        switch (i) {
          case 1:
            for (let j = 0; j < 4; j++) {
              if (this._pilotWaypointArray[(i - 1) * 4 + j]) {
                this._pilotWaypointArray1.push(this._pilotWaypointArray[(i - 1) * 4 + j]);
              }
            }
            waypointsToWrite = JSON.stringify(this._pilotWaypointArray1);
            WTDataStore.set('CJ4_PILOTWPT_1', waypointsToWrite);
            break;
          case 2:
            for (let j = 0; j < 4; j++) {
              if (this._pilotWaypointArray[(i - 1) * 4 + j]) {
                this._pilotWaypointArray2.push(this._pilotWaypointArray[(i - 1) * 4 + j]);
              }
            }
            waypointsToWrite = JSON.stringify(this._pilotWaypointArray2);
            WTDataStore.set('CJ4_PILOTWPT_2', waypointsToWrite);
            break;
          case 3:
            for (let j = 0; j < 4; j++) {
              if (this._pilotWaypointArray[(i - 1) * 4 + j]) {
                this._pilotWaypointArray3.push(this._pilotWaypointArray[(i - 1) * 4 + j]);
              }
            }
            waypointsToWrite = JSON.stringify(this._pilotWaypointArray3);
            WTDataStore.set('CJ4_PILOTWPT_3', waypointsToWrite);
            break;
          case 4:
            for (let j = 0; j < 4; j++) {
              if (this._pilotWaypointArray[(i - 1) * 4 + j]) {
                this._pilotWaypointArray4.push(this._pilotWaypointArray[(i - 1) * 4 + j]);
              }
            }
            waypointsToWrite = JSON.stringify(this._pilotWaypointArray4);
            WTDataStore.set('CJ4_PILOTWPT_4', waypointsToWrite);
            break;
          case 5:
            for (let j = 0; j < 4; j++) {
              if (this._pilotWaypointArray[(i - 1) * 4 + j]) {
                this._pilotWaypointArray5.push(this._pilotWaypointArray[(i - 1) * 4 + j]);
              }
            }
            waypointsToWrite = JSON.stringify(this._pilotWaypointArray5);
            WTDataStore.set('CJ4_PILOTWPT_5', waypointsToWrite);
            break;
        }
      }

      // if (arraysRequired < 5) {
      //   for (let l = arraysRequired + 1; l <= 5; l++) {
      //     if (WTDataStore.get('CJ4_PILOTWPT_' + l, 'empty') !== 'empty') {
      //       WTDataStore.remove('CJ4_PILOTWPT_' + l);
      //     }
      //   }
      // }
    }
  }

  /**
   * A Pilot Waypoint; simplified for minimal datastorage footprint.
   */
  class CJ4_FMC_PilotWaypoint {
    constructor() {
      let ident = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      let latitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      let longitude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      _defineProperty(this, "id", void 0);
      _defineProperty(this, "la", void 0);
      /**
       * User Waypoint ident.
       * @type {number}
       */
      this.id = ident;

      /**
       * Latitude in DDMM.MM format.
       * @type {number}
       */
      this.la = latitude;

      /**
       * Longitude in in DDDMM.MM format.
       * @type {number}
       */
      this.la = longitude;
    }
  }

  class B777_FMC extends Boeing_FMC {
    /**
     * TODO: Make private, Use DI
     * @type {FMCRenderer}
     */

    /**
    * SU6 ORIGIN compatibility patch.
    * TODO: Should be moved to Heavy_Boeing_FMC/Boeing_FMC
    * @param newRouteOrigin
    * @param callback
    */
    updateRouteOrigin(newRouteOrigin) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyCallback.Boolean;
      this.dataManager.GetAirportByIdent(newRouteOrigin).then(airport => {
        if (!airport) {
          this.showErrorMessage('NOT IN DATABASE');
          return callback(false);
        }
        this.flightPlanManager.setOrigin(airport.icao, () => {
          this.tmpOrigin = airport.ident;
          callback(true);
        });
      });
    }
    _updateAlertingMessages() {
      if (this.messageManager.numberOfMessages > 0) {
        let messageBoxTitle = document.body.querySelector('.fms-message-title');
        let messageBoxContent = document.body.querySelector('.fms-message-content');
        let messageBoxCount = document.body.querySelector('.fms-message-count');
        messageBoxTitle.innerHTML = this.messageManager.lastMessage.title;
        messageBoxContent.innerHTML = this.messageManager.lastMessage.text;
        messageBoxCount.innerHTML = this.messageManager.numberOfMessages.toFixed(0).padStart(2, '0');
        let messageBox = document.body.querySelector('.fms-message');
        messageBox.style.display = 'block';
      } else {
        let messageBox = document.body.querySelector('.fms-message');
        messageBox.style.display = 'none';
      }
    }

    /**
    * TODO: This should not be here. It should be moved to parent an refactored...
    * @param _event
    */
    onEvent(_event) {
      if (_event.indexOf('AP_ALT_INTERVENTION') != -1) {
        SimVar.SetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number', 1);
        let shouldOverrideCruiseAltitude = false;
        let altitude = Simplane.getAutoPilotSelectedAltitudeLockValue('feet');
        if (altitude >= this.cruiseFlightLevel * 100 && this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
          shouldOverrideCruiseAltitude = true;
          SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number', 0);
        }
        if (altitude < this.cruiseFlightLevel * 100 && this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
          shouldOverrideCruiseAltitude = true;
          SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number', 0);
        }
        if (altitude <= this.cruiseFlightLevel * 100 && SimVar.GetSimVarValue('L:B77RS_DESCENT_NOW_AVAILABLE', 'Number') && !SimVar.GetSimVarValue('L:B77RS_DESCENT_NOW_ACTIVATED', 'Number')) {
          this.currentFlightPhase = FlightPhase.FLIGHT_PHASE_DESCENT;
          SimVar.SetSimVarValue('L:B77RS_DESCENT_NOW_ACTIVATED', 'Number', 1);
          SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
          return;
        }
        if (SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number') && !shouldOverrideCruiseAltitude) {
          SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number', 0);
          SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
          return;
        }
        if (SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number') && !shouldOverrideCruiseAltitude) {
          SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number', 0);
          SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
          return;
        }
        if (SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number') || SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number')) {
          SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
          return;
        }
        SimVar.SetSimVarValue('L:FMC_UPDATE_CURRENT_PAGE', 'number', 1);
      }
      super.onEvent(_event);
    }

    /**
    * TODO: Refactor section
    */

    getNextDescentAltitude() {
      let fp = this.flightPlanManager.getCurrentFlightPlan();
      let allWaypoints = fp.waypoints.slice(fp.activeWaypointIndex);
      let targetAltitude = undefined;
      let targetIndex = undefined;
      let targetType = undefined;
      for (let i = 0; i <= allWaypoints.length - 1; i++) {
        if (allWaypoints[i].legAltitudeDescription === 0) {
          continue;
        }
        if (allWaypoints[i].legAltitudeDescription === 1 && isFinite(allWaypoints[i].legAltitude1)) {
          targetAltitude = Math.round(allWaypoints[i].legAltitude1);
          targetIndex = i;
          targetType = 'AT';
          break;
        }
        if (allWaypoints[i].legAltitudeDescription === 2 && isFinite(allWaypoints[i].legAltitude1)) {
          targetAltitude = Math.round(allWaypoints[i].legAltitude1);
          targetIndex = i;
          targetType = 'A';
          break;
        }
        if (allWaypoints[i].legAltitudeDescription === 3 && isFinite(allWaypoints[i].legAltitude1)) {
          targetAltitude = Math.round(allWaypoints[i].legAltitude1);
          targetIndex = i;
          targetType = 'B';
          break;
        }
        if (allWaypoints[i].legAltitudeDescription === 4 && isFinite(allWaypoints[i].legAltitude1) && isFinite(allWaypoints[i].legAltitude2)) {
          if (allWaypoints[i].legAltitude1 === allWaypoints[i].legAltitude2) {
            targetAltitude = Math.round(allWaypoints[i].legAltitude1);
            targetIndex = i;
            targetType = 'AT';
            break;
          }
          if (allWaypoints[i].legAltitude1 < allWaypoints[i].legAltitude2) {
            let middle = (allWaypoints[i].legAltitude2 - allWaypoints[i].legAltitude1) / 2;
            targetAltitude = Math.round(allWaypoints[i].legAltitude1 + middle);
            targetIndex = i;
            targetType = 'AB';
            break;
          }
          if (allWaypoints[i].legAltitude1 > allWaypoints[i].legAltitude2) {
            let middle = (allWaypoints[i].legAltitude1 - allWaypoints[i].legAltitude2) / 2;
            targetAltitude = Math.round(allWaypoints[i].legAltitude2 + middle);
            targetIndex = i;
            targetType = 'AB';
            break;
          }
        }
      }
      const lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      const long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      const ll = new LatLongAlt(lat, long);
      let distance = Avionics.Utils.computeGreatCircleDistance(ll, allWaypoints[0].infos.coordinates);
      if (targetIndex !== 0) {
        for (let i = 1; i < allWaypoints.length; i++) {
          distance += Avionics.Utils.computeGreatCircleDistance(allWaypoints[i - 1].infos.coordinates, allWaypoints[i].infos.coordinates);
          if (i === targetIndex) {
            break;
          }
        }
      }
      if (targetAltitude) {
        return {
          targetAltitude: targetAltitude,
          distance: distance,
          waypoint: allWaypoints[targetIndex],
          targetType: targetType
        };
      }
      return {
        targetAltitude: NaN,
        distance: NaN,
        waypoint: allWaypoints[targetIndex],
        targetType: targetType
      };
    }
    getEconClbManagedSpeed() {
      return this.getEconCrzManagedSpeed();
    }
    getEconCrzManagedSpeed() {
      return this.speedManager.getCrzManagedSpeed(this.getCostIndexFactor(), true);
    }

    /**
    * TODO: Refactor section end
    */

    constructor() {
      super();
      _defineProperty(this, "_timeDivs", void 0);
      _defineProperty(this, "_dateDivs", void 0);
      _defineProperty(this, "onVNAV", void 0);
      _defineProperty(this, "onLegs", void 0);
      _defineProperty(this, "onRte", void 0);
      _defineProperty(this, "_pointer", void 0);
      _defineProperty(this, "_execLight", void 0);
      _defineProperty(this, "fmcManVersion", void 0);
      _defineProperty(this, "fmcBakVersion", void 0);
      _defineProperty(this, "_lnav", void 0);
      _defineProperty(this, "_registered", void 0);
      _defineProperty(this, "_leftKeyElements", void 0);
      _defineProperty(this, "_rightKeyElements", void 0);
      _defineProperty(this, "selectedApproachFlap", void 0);
      _defineProperty(this, "selectedApproachSpeed", void 0);
      _defineProperty(this, "_takeOffN1Table", void 0);
      _defineProperty(this, "_climbN1TempRow", void 0);
      _defineProperty(this, "_climbN1Table", void 0);
      _defineProperty(this, "_takeOffN1TempRow", void 0);
      _defineProperty(this, "_thrustCLBMode", void 0);
      _defineProperty(this, "_lastUpdateAPTime", void 0);
      _defineProperty(this, "refreshFlightPlanCooldown", void 0);
      _defineProperty(this, "updateAutopilotCooldown", void 0);
      _defineProperty(this, "_hasSwitchedToHoldOnTakeOff", void 0);
      _defineProperty(this, "_previousApMasterStatus", void 0);
      _defineProperty(this, "_apMasterStatus", void 0);
      _defineProperty(this, "_apHasActivated", void 0);
      _defineProperty(this, "_aThrStatus", void 0);
      _defineProperty(this, "_aThrHasActivated", void 0);
      _defineProperty(this, "_hasReachedTopOfDescent", void 0);
      _defineProperty(this, "_previousAThrStatus", void 0);
      _defineProperty(this, "_apHasDeactivated", void 0);
      _defineProperty(this, "_thrustTakeOffMode", void 0);
      _defineProperty(this, "_apCooldown", void 0);
      _defineProperty(this, "_lastFMCCommandSpeedRestrictionValue", void 0);
      _defineProperty(this, "_lastFmcCommandClimbSpeedType", void 0);
      _defineProperty(this, "_lastFMCCommandSelectedClimbSpeedValue", void 0);
      _defineProperty(this, "_fmcCommandCruiseSpeedType", void 0);
      _defineProperty(this, "_fmcCommandClimbSpeedType", void 0);
      _defineProperty(this, "_lastFmcCommandCruiseSpeedType", void 0);
      _defineProperty(this, "onInputAircraftSpecific", input => {
        console.log('B777_FMC.onInputAircraftSpecific input = \'' + input + '\'');
        if (input === 'LEGS') {
          if (this.onLegs) {
            this.onLegs();
          }
          return true;
        }
        if (input === 'RTE') {
          if (this.onRte) {
            this.onRte();
          }
          return true;
        }
        if (input === 'VNAV') {
          if (this.onVNAV) {
            this.onVNAV();
          }
          return true;
        }
        return false;
      });
      _defineProperty(this, "_pilotWaypoints", void 0);
      _defineProperty(this, "_climbSpeedTransitionDeleted", void 0);
      _defineProperty(this, "_isFmcCurrentPageUpdatedAboveTenThousandFeet", void 0);
      _defineProperty(this, "_selectedAltitude", void 0);
      _defineProperty(this, "_descentTargetAltitude", void 0);
      _defineProperty(this, "_lastDescentTargetAltitude", void 0);
      _defineProperty(this, "_lastSelectedAltitude", void 0);
      _defineProperty(this, "vfrRunwayExtension", void 0);
      _defineProperty(this, "modVfrRunway", void 0);
      _defineProperty(this, "deletedVfrLandingRunway", void 0);
      _defineProperty(this, "selectMode", void 0);
      _defineProperty(this, "selectedWaypoint", void 0);
      _defineProperty(this, "_renderer", void 0);
      _defineProperty(this, "apListener", void 0);
      this._registered = false;
      this._leftKeyElements = [];
      this._rightKeyElements = [];
      this.selectedApproachFlap = NaN;
      this.selectedApproachSpeed = NaN;
      this._climbN1Table = [[96.5, 97.2, 97.0, 97.4, 96.7, 95.1, 96.1, 95.1, 94.7], [97.6, 98.7, 99.0, 99.6, 98.9, 97.3, 98.2, 95.0, 93.8], [98.8, 99.8, 100.4, 101.2, 101.0, 99.3, 100.1, 97.0, 95.8], [99.1, 101.1, 101.6, 102.4, 102.5, 101.2, 101.9, 98.8, 97.7], [97.5, 101.3, 103.3, 103.8, 104.1, 102.8, 103.4, 100.5, 99.4], [95.8, 99.6, 102.9, 104.4, 105.6, 104.6, 104.7, 102.6, 100.9], [94.2, 97.8, 101.1, 102.6, 105.0, 106.9, 106.5, 104.3, 102.4], [92.5, 96.1, 99.4, 100.8, 103.2, 105.3, 107.1, 106.3, 104.3], [90.8, 94.3, 97.6, 99.0, 101.5, 103.4, 105.1, 106.5, 106.4], [89.1, 92.4, 95.7, 97.1, 99.7, 101.5, 103.2, 104.4, 104.4], [87.3, 90.5, 93.9, 95.2, 97.8, 99.5, 101.2, 102.2, 102.2], [85.5, 88.6, 91.9, 93.3, 95.8, 97.5, 99.1, 100.1, 100.1]];
      this._climbN1TempRow = [60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50];
      this._takeOffN1Table = [[106.1, 106.1, 105.9, 105.5, 105.1, 104.9, 104.7], [106.8, 106.9, 106.8, 106.5, 106.1, 105.9, 105.7], [107.5, 107.5, 107.5, 107.3, 107.0, 106.9, 106.6], [108.2, 108.2, 108.2, 108.0, 107.9, 107.8, 107.7], [109.0, 108.9, 109.0, 108.8, 108.7, 108.7, 108.6], [109.1, 109.8, 109.8, 109.7, 109.6, 109.7, 103.6], [108.2, 108.9, 110.3, 110.6, 110.5, 110.6, 110.6], [107.3, 108.0, 109.4, 110.6, 111.3, 112.0, 112.1], [106.4, 107.1, 108.5, 109.7, 110.0, 112.0, 112.1], [105.5, 106.2, 107.5, 108.8, 110.0, 111.3, 112.1], [103.6, 104.3, 105.7, 106.9, 108.1, 109.4, 110.1], [101.7, 102.4, 103.8, 104.9, 106.1, 107.4, 108.1], [99.8, 100.4, 101.8, 103.0, 104.2, 105.4, 106.1], [97.9, 98.5, 99.8, 101.0, 102.2, 103.4, 104.0], [95.9, 96.4, 97.8, 99.0, 100.1, 101.3, 102.0], [93.8, 94.4, 95.8, 96.9, 98.0, 99.2, 99.8]];
      this._takeOffN1TempRow = [55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 0, -10, -20, -30, -40, -50];
      this._thrustTakeOffMode = 1;
      this._thrustCLBMode = 1;
      this._thrustTakeOffTemp = NaN;
      this._lastUpdateAPTime = NaN;
      this.refreshFlightPlanCooldown = 0;
      this.updateAutopilotCooldown = 0;
      this._hasSwitchedToHoldOnTakeOff = false;
      this._previousApMasterStatus = false;
      this._apMasterStatus = false;
      this._apHasDeactivated = false;
      this._apHasActivated = false;
      this._previousAThrStatus = false;
      this._aThrStatus = false;
      this._aThrHasActivated = false;
      this._hasReachedTopOfDescent = false;
      this._apCooldown = 500;
      this._prepareDefaultValues();
      this._overrideDefaultAsoboValues();
    }
    _overrideDefaultAsoboValues() {
      /**
       * Flaps handling
       */
      this._takeOffFlap = -1;
      let flapAngles = [0, 1, 5, 15, 20, 25, 30];
      let flapIndex = Simplane.getFlapsHandleIndex(true);
      if (flapIndex >= 1) {
        this._takeOffFlap = flapAngles[flapIndex];
      }
    }
    _prepareDefaultValues() {
      /**
       * TODO: All these properties should be removed after Speed director implementation
       * @type {null}
       * @private
       */
      this._lastFMCCommandSpeedRestrictionValue = null;
      this._lastFMCCommandSelectedClimbSpeedValue = null;
      this._fmcCommandClimbSpeedType = null;
      this._lastFmcCommandClimbSpeedType = null;
      this._fmcCommandCruiseSpeedType = null;
      this._lastFmcCommandCruiseSpeedType = null;

      /**
       * WorldlinerRS FMC Identification
       */
      this.fmcManVersion = 'RS-XXXX-X-A';
      this.fmcBakVersion = 'RS-XXXX-X-B';
    }
    get templateID() {
      return 'B777_FMC';
    }
    get instrumentAlias() {
      return 'B77RS_FMC';
    }
    get isInteractive() {
      return true;
    }
    connectedCallback() {
      super.connectedCallback();
      RegisterViewListener('JS_LISTENER_KEYEVENT', () => {
        console.log('JS_LISTENER_KEYEVENT registered.');
        RegisterViewListener('JS_LISTENER_FACILITY', () => {
          console.log('JS_LISTENER_FACILITY registered.');
          this._registered = true;
        }, true);
      });
      /* FOR New LNAV
      RegisterViewListener('JS_LISTENER_AUTOPILOT', () => {
      	console.log('JS_LISTENER_AUTOPILOT registered.');
      });
      */
    }

    cleanUpPage() {
      this.onLeftInput = [];
      this.onRightInput = [];
      this.onPrevPage = undefined;
      this.onNextPage = undefined;
      this.pageUpdate = undefined;
      this.refreshPageCallback = undefined;
      this.unregisterPeriodicPageRefresh();
      this._renderer.cleanUpSelectKeyEvents();
      this._renderer.renderTitle('UNTITLED');
      this._renderer.clearDisplay();
    }
    Init() {
      super.Init();
      this.aircraftType = Aircraft.B777;
      Utils.loadFile('coui://html_UI/b77rs/b77rs.json', content => {
        const miscFile = JSON.parse(content);
        this.fmcManVersion = miscFile.fms_man_version;
        this.fmcBakVersion = miscFile.fms_bak_version;
      });
      this._renderer = new FMCRenderer(this, new NaturalRendererTemplater());
      /**
       * Separator middleware has to be here because of FO FMC...
       */
      this._renderer.use(new SeparatorRendererMiddleware());
      if (this.urlConfig.index == 1) {
        //HDLogger.addHandler(new SocketIOHandler('localhost', 3000));
        //HDLogger.addHandler(new ConsoleHandler());
        this._renderer.use(new SettableRendererMiddleware());
        this._renderer.use(new SizeRendererMiddleware());
        this._renderer.use(new ColorRendererMiddleware());

        /**
         * Reset TOD
         */

        SimVar.SetSimVarValue('L:WT_CJ4_TOD_REMAINING', 'number', 0);
        SimVar.SetSimVarValue('L:WT_CJ4_TOD_DISTANCE', 'number', 0);
        /**
         * Reset stepping
         */
        SimVar.SetSimVarValue('L:B77RS_MCDU_CURRENT_FPLN_WAYPOINT', 'number', -1);
        this.onInit = () => {
          B777_FMC_InitRefIndexPage.ShowPage1(this);
        };
        this.onLegs = () => {
          B777_FMC_LegsPage.ShowPage1(this);
        };
        this.onRte = () => {
          B777_FMC_RoutePage.ShowPage1(this);
        };
        this.onRad = () => {
          B777_FMC_NavRadioPage.ShowPage(this);
        };
        this.onVNAV = () => {
          new B777_FMC_VNAVPage(this).showPage();
        };
        this._pointer = this.getChildById('fms-pointer');
        this._pointer.style.zIndex = '5';
        this._pointer.style.position = 'fixed';
        this._pointer.style.width = '36px';
        this._pointer.style.height = '36px';
        this._pointer.style.pointerEvents = 'none';
        this._execLight = this.querySelector('.fms-exec-light');
        document.body.addEventListener('mousemove', e => {
          let x = e.clientX - 18;
          let y = e.clientY - 18;
          this._pointer.style.left = x + 'px';
          this._pointer.style.top = y + 'px';
        });
        document.body.style.overflow = 'hidden';
        document.body.style.clip = 'auto';
        document.body.style.position = 'absolute';
        this._renderer.mk(1).event = () => {
          if (Simplane.getIsGrounded()) {
            B777_FMC_PerfInitPage.ShowPage1(this);
          } else {
            B777_FMC_InitRefIndexPage.ShowPage1(this);
          }
        };
        this._renderer.mk(2).event = () => {
          B777_FMC_RoutePage.ShowPage1(this);
        };
        this._renderer.mk(3).event = () => {
          B777_FMC_DepArrPage.ShowPage1(this);
        };
        this._renderer.mk(4).event = () => {
          console.log('NOT IMPLEMENTED');
        };
        this._renderer.mk(5).event = () => {
          new B777_FMC_VNAVPage(this).showPage();
        };
        this._renderer.mk(6).event = () => {
          console.log('NOT IMPLEMENTED');
        };
        this._renderer.mk(7).event = () => {
          B777_FMC_LegsPage.ShowPage1(this);
        };
        this._renderer.mk(8).event = () => {
          B777_FMC_HoldPage.handleHoldPressed(this);
        };
        this._renderer.mk(9).event = () => {
          B777_FMC_FMCCommPage.ShowPage1(this);
        };
        this._renderer.mk(10).event = () => {
          B777_FMC_ProgressPage.ShowPage1(this);
        };
        this._renderer.mk(11).event = () => {
          B777_FMC_NavRadioPage.ShowPage(this);
        };
        this._renderer.mk(12).event = () => {
          console.log('NOT IMPLEMENTED');
        };
        this._renderer.mk(13).event = () => {
          console.log('NOT IMPLEMENTED');
        };
        this._renderer.mk(14).event = () => {
          if (!B777_FMC_RobPage.WITHOUT_MANAGERS) {
            B777_FMC_RobPage.ShowPage1(this);
          }
        };
        this._renderer.mk(15).event = () => {
          if (this.onPrevPage) {
            this.onPrevPage();
          }
        };
        this._renderer.mk(16).event = () => {
          if (this.onNextPage) {
            this.onNextPage();
          }
        };
        this._renderer.mk(17).event = () => {
          if (this.onExec) {
            this.onExec();
          }
        };
        this.getChildById('.fms-clr-msg').addEventListener('mouseup', () => {
          if (this.messageManager.numberOfMessages > 0) {
            this.messageManager.removeLastMessage();
          }
        });

        //-------------------------------------------------------------------------------------------------

        /**
         * Check NAV DATA
         */

        let currentYear = SimVar.GetGlobalVarValue('ZULU YEAR', 'number');
        let currentMonth = SimVar.GetGlobalVarValue('ZULU MONTH OF YEAR', 'number');
        let currentDay = SimVar.GetGlobalVarValue('ZULU DAY OF MONTH', 'number');
        let currentDate = new Date();
        currentDate.setUTCFullYear(currentYear, currentMonth - 1, currentDay);
        let navDataDateRange = this.getNavDataDateRange();
        let startYear = 20 + navDataDateRange.substring(navDataDateRange.length - 2);
        let startMonth = B777_FMC._MonthOfYear.findIndex(function (element) {
          return element === navDataDateRange.substring(0, 3);
        });
        let startDay = navDataDateRange.substring(3, 5);
        let startDate = new Date();
        startDate.setUTCFullYear(parseInt(startYear), startMonth, parseInt(startDay));
        startDate.setUTCHours(0, 0, 0);
        let endDate = new Date(startDate);
        endDate.setUTCDate(startDate.getUTCDate() + 27);
        endDate.setUTCHours(23, 59, 59);
        if (!(startDate.getTime() < currentDate.getTime() && currentDate.getTime() < endDate.getTime())) {
          this.messageManager.showMessage('NAV DATA OUT OF DATE', 'END DATE OF THE ACTIVE <br> DATA BASE HAS PASSED <br> SELECT NEW CYCLE <br> ON IDENT PAGE');
        }
      }

      /**
       * TODO: TO IMPLEMENT
       */
      //if (B777_FMC_HeavyPage.WITHOUT_MANAGERS) {
      //this.getChildById('.fms-heavy').classList.add('fms-empty');
      //}

      this._inOutElement = this.querySelector('#inOut-line-html');
      this._titleElement = this.getChildById('.fms-screen-title');
      this._pageCurrentElement = this.getChildById('.fms-screen-page');
      this._pageCountElement = this.getChildById('.fms-screen-page');
      this._labelElements.slice(0, this._labelElements.length);
      let allLabelContainers = this.getChildrenById('.fms-screen-label-container');
      for (let i = 0; i < allLabelContainers.length; i++) {
        this._labelElements[i] = [];
        let labelContainer = allLabelContainers[i];
        if (labelContainer) {
          this._labelElements[i][0] = labelContainer.querySelector('.col-0');
          this._labelElements[i][1] = labelContainer.querySelector('.col-3');
          this._labelElements[i][2] = labelContainer.querySelector('.col-1');
          this._labelElements[i][3] = labelContainer.querySelector('.col-2');
        }
      }
      this._lineElements.slice(0, this._lineElements.length);
      let allLineContainers = this.getChildrenById('.fms-screen-line-container');
      for (let i = 0; i < allLineContainers.length; i++) {
        this._lineElements[i] = [];
        let lineContainer = allLineContainers[i];
        if (lineContainer) {
          this._lineElements[i][0] = lineContainer.querySelector('.col-0');
          this._lineElements[i][1] = lineContainer.querySelector('.col-3');
          this._lineElements[i][2] = lineContainer.querySelector('.col-1');
          this._lineElements[i][3] = lineContainer.querySelector('.col-2');
        }
      }
      /*
      let leftKeysContainer = this.getChildById('.fms-side-container.left').children;
      for (let i = 0; i < leftKeysContainer.length; i++) {
      	let leftKeyElement = leftKeysContainer[i];
      	if (leftKeyElement instanceof HTMLInputElement) {
      		this._leftKeyElements[i] = leftKeyElement;
      	}
      }
      let rightKeysContainer = this.getChildById('.fms-side-container.right').children;
      for (let i = 0; i < rightKeysContainer.length; i++) {
      	let rightKeyElement = rightKeysContainer[i];
      	if (rightKeyElement instanceof HTMLInputElement) {
      		this._rightKeyElements[i] = rightKeyElement;
      	}
      }
      */
      this._pilotWaypoints = new CJ4_FMC_PilotWaypoint_Manager(this);
      this._pilotWaypoints.activate();
      B777_FMC_IdentPage.ShowPage1(this);
    }
    onPowerOn() {
      super.onPowerOn();
      this.deactivateLNAV();
      this.deactivateVNAV();
      Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.HOLD);
    }
    onUpdate(_deltaTime) {
      super.onUpdate(_deltaTime);
      if (this.urlConfig.index != 1) {
        return;
      }
      this.updateAutopilot();
      this._updateTimeAndDate();
      this._updateAlertingMessages();
    }

    /**
     * TODO: Should be in renderer
     */
    _updateTimeAndDate() {
      if (!this._timeDivs) {
        this._timeDivs = document.body.querySelectorAll('.fms-time');
      }
      if (!this._dateDivs) {
        this._dateDivs = document.body.querySelectorAll('.fms-date');
      }
      if (this._timeDivs && this._dateDivs) {
        let t = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
        let hours = Math.floor(t / 3600);
        let minutes = Math.floor((t - hours * 3600) / 60);
        let seconds = t - hours * 3600 - minutes * 60;
        let timeText = fastToFixed(hours, 0).padStart(2, '0') + ':' + fastToFixed(minutes, 0).padStart(2, '0') + ':' + fastToFixed(seconds, 0).padStart(2, '0') + ' z';
        let y = SimVar.GetGlobalVarValue('ZULU YEAR', 'number');
        let m = SimVar.GetGlobalVarValue('ZULU MONTH OF YEAR', 'number');
        let d = SimVar.GetGlobalVarValue('ZULU DAY OF MONTH', 'number');
        let dateText = fastToFixed(d, 0) + ' ' + B777_FMC._MonthOfYear[m - 1] + ' ' + fastToFixed(y, 0);
        this._timeDivs.forEach(d => {
          d.textContent = timeText;
        });
        this._dateDivs.forEach(d => {
          d.textContent = dateText;
        });
      }
    }
    setSelectedApproachFlapAndVREFSpeed(s) {
      let flap = NaN;
      let speed = NaN;
      if (s) {
        let sSplit = s.split('/');
        flap = parseInt(sSplit[0]);
        speed = parseInt(sSplit[1]);
      }
      if (isFinite(flap) || isFinite(speed)) {
        if (isFinite(flap) && flap >= 0 && flap < 60) {
          this.selectedApproachFlap = flap;
          /**
           * Uses better name for the LVar
           */
          SimVar.SetSimVarValue('L:AIRLINER_APPROACH_FLAPS', 'number', flap);
        }
        if (isFinite(speed) && speed >= 10 && speed < 300) {
          SimVar.SetSimVarValue('L:AIRLINER_VREF_SPEED', 'knots', speed);
          this.selectedApproachSpeed = speed;
        }
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    setSelectedApproachFlapSpeedDefault(s) {
      let flap = NaN;
      let speed = NaN;
      if (s) {
        let sSplit = s.split('/');
        flap = parseInt(sSplit[0]);
        speed = parseInt(sSplit[1]);
      }
      if (isFinite(flap) || isFinite(speed)) {
        if (isFinite(flap) && flap >= 0 && flap < 60) {
          this.selectedApproachFlap = flap;
        }
        if (isFinite(speed) && speed >= 10 && speed < 300) {
          this.selectedApproachSpeed = speed;
        }
        return true;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    clearDisplay() {
      super.clearDisplay();
      this.onPrevPage = EmptyCallback.Void;
      this.onNextPage = EmptyCallback.Void;
      this.unregisterPeriodicPageRefresh();
    }
    getClimbThrustN1(temperature, altitude) {
      let lineIndex = 0;
      for (let i = 0; i < this._climbN1TempRow.length; i++) {
        lineIndex = i;
        if (temperature > this._climbN1TempRow[i]) {
          break;
        }
      }
      let rowIndex = Math.floor(altitude / 5000);
      rowIndex = Math.max(0, rowIndex);
      rowIndex = Math.min(rowIndex, this._climbN1Table[0].length - 1);
      return this._climbN1Table[lineIndex][rowIndex];
    }
    getTakeOffThrustN1(temperature, airportAltitude) {
      let lineIndex = 0;
      for (let i = 0; i < this._takeOffN1TempRow.length; i++) {
        lineIndex = i;
        if (temperature > this._takeOffN1TempRow[i]) {
          break;
        }
      }
      let rowIndex = Math.floor(airportAltitude / 1000) + 2;
      rowIndex = Math.max(0, rowIndex);
      rowIndex = Math.min(rowIndex, this._takeOffN1Table[0].length - 1);
      return this._takeOffN1Table[lineIndex][rowIndex];
    }
    getThrustTakeOffMode() {
      return this._thrustTakeOffMode;
    }
    setThrustTakeOffMode(m) {
      if (m >= 0 && m <= 2) {
        SimVar.SetSimVarValue('L:B77RS_THRUST_TAKEOFF_MODE', 'Number', m);
        SimVar.SetSimVarValue('H:B777_MFD_1_TAKEOFF_MODES_UPDATED', 'Number', 1);
        SimVar.SetSimVarValue('H:B777_MFD_2_TAKEOFF_MODES_UPDATED', 'Number', 1);
        this._thrustTakeOffMode = m;
      }
    }
    getThrustCLBMode() {
      return this._thrustCLBMode;
    }
    setThrustCLBMode(m) {
      if (m >= 0 && m <= 2) {
        SimVar.SetSimVarValue('L:B77RS_THRUST_CLIMB_MODE', 'Number', m);
        SimVar.SetSimVarValue('H:B777_MFD_1_TAKEOFF_MODES_UPDATED', 'Number', 1);
        SimVar.SetSimVarValue('H:B777_MFD_2_TAKEOFF_MODES_UPDATED', 'Number', 1);
        this._thrustCLBMode = m;
      }
    }
    getThrustTakeOffTemp() {
      return this._thrustTakeOffTemp;
    }
    setThrustTakeOffTemp(s) {
      let v = parseFloat(s);
      if (isFinite(v)) {
        let oat = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
        if (v >= oat && v < 80) {
          SimVar.SetSimVarValue('L:B77RS_THRUST_ASSUMED_TEMPERATURE', 'Number', v);
          SimVar.SetSimVarValue('H:B777_MFD_1_TAKEOFF_MODES_UPDATED', 'Number', 1);
          SimVar.SetSimVarValue('H:B777_MFD_2_TAKEOFF_MODES_UPDATED', 'Number', 1);
          this._thrustTakeOffTemp = v;
          return true;
        }
        this.showErrorMessage('OUT OF RANGE');
        return false;
      }
      this.showErrorMessage(this.defaultInputErrorMessage);
      return false;
    }
    getThrustTakeOffLimit() {
      let airport = this.flightPlanManager.getOrigin();
      if (airport) {
        let altitude = airport.infos.coordinates.alt;
        const assumedTemp = this.getThrustTakeOffTemp();
        let temp;
        if (assumedTemp) {
          temp = assumedTemp;
        } else {
          temp = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
        }
        return this.getTakeOffThrustN1(temp, altitude) - this.getThrustTakeOffMode() * 10;
      }
      return 100;
    }
    getThrustClimbLimit() {
      let altitude = Simplane.getAltitude();
      let temperature = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
      return this.getClimbThrustN1(temperature, altitude) - this.getThrustCLBMode() * 8.6;
    }

    /**
     * TODO commented out. This is need only for testing
     */
    rateTester() {
      /*
       if (this._lastTimeX === undefined) {
       this._startHeading = Simplane.getHeadingTrue();
       this._lastTimeX = Date.now();
       }
       this._timeX = Date.now();
       //console.log('TIME: ' + this._timeX);
       //console.log('LAST TIME: ' + this._lastTimeX);
       if (this._timeX > this._lastTimeX + 1000) {
       let heading = Simplane.getHeadingTrue();
       let rate = 0;
       if (heading > this._startHeading) {
       rate = heading - this._startHeading;
       } else {
       rate = this._startHeading - heading;
       }
       console.log('RATE PER SEC: ' + rate);
       this._timeX = undefined;
       this._lastTimeX = undefined;
       }
       */
    }
    updateAutopilot() {
      let now = performance.now();
      let dt = now - this._lastUpdateAPTime;
      this._lastUpdateAPTime = now;
      if (isFinite(dt)) {
        this.updateAutopilotCooldown -= dt;
      }
      if (SimVar.GetSimVarValue('L:AIRLINER_FMC_FORCE_NEXT_UPDATE', 'number') === 1) {
        SimVar.SetSimVarValue('L:AIRLINER_FMC_FORCE_NEXT_UPDATE', 'number', 0);
        this.updateAutopilotCooldown = -1;
      }
      if (this.updateAutopilotCooldown < 0) {
        let currentApMasterStatus = SimVar.GetSimVarValue('AUTOPILOT MASTER', 'boolean');
        if (currentApMasterStatus != this._apMasterStatus) {
          this._apMasterStatus = currentApMasterStatus;
          this._forceNextAltitudeUpdate = true;
        }
        this._apHasDeactivated = !currentApMasterStatus && this._previousApMasterStatus;
        this._apHasActivated = currentApMasterStatus && !this._previousApMasterStatus;
        this._previousApMasterStatus = currentApMasterStatus;
        let currentAThrMasterStatus = Simplane.getAutoPilotThrottleActive(1);
        if (currentAThrMasterStatus != this._aThrStatus) {
          this._aThrStatus = currentAThrMasterStatus;
        }
        this._aThrHasActivated = currentAThrMasterStatus && !this._previousAThrStatus;
        this._previousAThrStatus = currentAThrMasterStatus;

        /**
         * WT Stuff begin
         */

        if (!this._navModeSelector) {
          this._navModeSelector = new B77RSNavModeSelector(this.flightPlanManager);
        }

        //RUN LNAV ALWAYS
        if (this._lnav === undefined) {
          this._lnav = new LNavDirector(this.flightPlanManager, this._navModeSelector);
        } else {
          try {
            this._lnav.update();
          } catch (error) {
            console.error(error);
          }
        }
        if (this._speedDirector === undefined) {
          this._speedDirector = new SpeedDirector(this._speedManager);
        } else {
          try {
            /*
             const activeWaypoint = this.flightPlanManager.getActiveWaypoint();
             if(activeWaypoint && activeWaypoint.speedConstraint === -1){
             this._speedDirector._waypointSpeedConstraint.speed = null;
             this._speedDirector._waypointSpeedConstraint.speedMach = null;
             } else if(activeWaypoint && activeWaypoint.speedConstraint !== -1){
             this._speedDirector._waypointSpeedConstraint.speed = activeWaypoint.speedConstraint;
             }
             */
            this._speedDirector.update(this.currentFlightPhase, this.getCostIndexFactor());
          } catch (error) {
            console.error(error);
          }
        }
        this._navModeSelector.generateInputDataEvents();
        this._navModeSelector.processEvents();

        //TAKEOFF MODE HEADING SET (constant update to current heading when on takeoff roll)
        if (this._navModeSelector.currentLateralActiveState === LateralNavModeState.TO && Simplane.getIsGrounded()) {
          Coherent.call('HEADING_BUG_SET', 2, SimVar.GetSimVarValue('PLANE HEADING DEGREES MAGNETIC', 'Degrees'));
        }

        //CHECK FOR ALT set >45000
        if (SimVar.GetSimVarValue('AUTOPILOT ALTITUDE LOCK VAR:1', 'feet') > 45000) {
          Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, 45000, true);
        }

        /**
         * WT Stuff end
         */

        SimVar.SetSimVarValue('SIMVAR_AUTOPILOT_AIRSPEED_MIN_CALCULATED', 'knots', Simplane.getStallProtectionMinSpeed());
        SimVar.SetSimVarValue('SIMVAR_AUTOPILOT_AIRSPEED_MAX_CALCULATED', 'knots', Simplane.getMaxSpeed(Aircraft.AS01B));
        if (this.currentFlightPhase <= FlightPhase.FLIGHT_PHASE_TAKEOFF) {
          let n1 = this.getThrustTakeOffLimit() / 100;
          SimVar.SetSimVarValue('AUTOPILOT THROTTLE MAX THRUST', 'number', n1);
        }
        if (this.currentFlightPhase >= FlightPhase.FLIGHT_PHASE_CLIMB) {
          let n1 = this.getThrustClimbLimit() / 100;
          SimVar.SetSimVarValue('AUTOPILOT THROTTLE MAX THRUST', 'number', n1);
        }
        if (this._apHasActivated) {
          if (!this.getIsVNAVArmed() && !this.getIsVNAVActive()) {
            this.activateSPD();
            this.activateVSpeed();
          } else {
            this.activateVNAV();
          }
          if (this._navModeSelector.currentLateralArmedState !== LateralNavModeState.LNAV && this._navModeSelector.currentLateralActiveState !== LateralNavModeState.LNAV) {
            /**
             * Enable HDG HOLD
             */
            const headingHoldValue = Simplane.getHeadingMagnetic();
            SimVar.SetSimVarValue('K:HEADING_SLOT_INDEX_SET', 'number', 2);
            Coherent.call('HEADING_BUG_SET', 2, headingHoldValue);
            SimVar.SetSimVarValue('L:AP_HEADING_HOLD_ACTIVE', 'number', 1);
          }
        }
        if (this._aThrHasActivated) {
          if (this.getIsSPDActive()) {
            this.activateSPD();
          }
        }

        /**
         * TODO: Check if we really need this
         */
        if (!this.getIsAltitudeHoldActive()) {
          Coherent.call('AP_ALT_VAR_SET_ENGLISH', 1, Simplane.getAutoPilotDisplayedAltitudeLockValue(), this._forceNextAltitudeUpdate);
        }
        if (this.selectedApproachSpeed === 0) {
          let vRef = 0;
          if (this.currentFlightPhase >= FlightPhase.FLIGHT_PHASE_DESCENT) {
            vRef = 1.3 * Simplane.getStallSpeed();
          }
          SimVar.SetSimVarValue('L:AIRLINER_VREF_SPEED', 'knots', vRef);
        }
        if (this._pendingVNAVActivation) {
          let altitude = Simplane.getAltitudeAboveGround();
          if (altitude > 400) {
            this._pendingVNAVActivation = false;
            this.doActivateVNAV();
          }
        }
        if (SimVar.GetSimVarValue('L:AP_VNAV_ACTIVE', 'number') === 1) {
          let targetAltitude = Simplane.getAutoPilotAltitudeLockValue();
          let altitude = Simplane.getAltitude();
          let deltaAltitude = Math.abs(targetAltitude - altitude);
          if (deltaAltitude > 1000) {
            if (!Simplane.getAutoPilotFLCActive()) {
              SimVar.SetSimVarValue('K:FLIGHT_LEVEL_CHANGE_ON', 'Number', 1);
            }
          }
        }
        if (this.getIsFLCHActive()) {
          let targetAltitude = Simplane.getAutoPilotAltitudeLockValue();
          let altitude = Simplane.getAltitude();
          let deltaAltitude = Math.abs(targetAltitude - altitude);
          if (deltaAltitude < 150) {
            this.activateAltitudeHold(true);
          }
        }
        if (this.getIsVSpeedActive()) {
          let targetAltitude = Simplane.getAutoPilotAltitudeLockValue();
          let altitude = Simplane.getAltitude();
          let deltaAltitude = Math.abs(targetAltitude - altitude);
          if (deltaAltitude < 150) {
            this.activateAltitudeHold(true);
          }
        }
        if (this._pendingSPDActivation) {
          let altitude = Simplane.getAltitudeAboveGround();
          if (altitude > 400) {
            this._pendingSPDActivation = false;
            this.doActivateSPD();
          }
        }
        if (Simplane.getAutoPilotGlideslopeActive()) {
          if (this.getIsVNAVActive()) {
            this.deactivateVNAV();
          }
          if (this.getIsVSpeedActive()) {
            this.deactivateVSpeed();
          }
          if (this.getIsAltitudeHoldActive()) {
            this.deactivateAltitudeHold();
          }
          this.activateSPD();
          if (SimVar.GetSimVarValue('AUTOPILOT ALTITUDE LOCK', 'Boolean')) {
            SimVar.SetSimVarValue('K:AP_PANEL_ALTITUDE_HOLD', 'Number', 1);
          }
        }
        if (!this.getIsVNAVActive()) {
          SimVar.SetSimVarValue('L:B77RS_CUSTOM_VNAV_DESCENT_ENABLED', 'Number', 0);
        }
        if (this.getIsVNAVActive()) {
          let altitude = Simplane.getAutoPilotSelectedAltitudeLockValue('feet');
          if (isFinite(altitude)) {
            /**
             * TODO: Temporary level off during climb
             */

            let isLevelOffActive = SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number');
            if ((altitude < this.cruiseFlightLevel * 100 || isLevelOffActive) && this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB) {
              if (Simplane.getAutoPilotAltitudeLockActive()) {
                SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.CLIMB_LEVEL_OFF_ACTIVE, 'Number', 1);
              }
              if (!isLevelOffActive) {
                Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, altitude, this._forceNextAltitudeUpdate);
                this._forceNextAltitudeUpdate = false;
                SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 0);
              }
            } else if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) {
              Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, this.cruiseFlightLevel * 100, this._forceNextAltitudeUpdate);
              this._forceNextAltitudeUpdate = false;
              SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 0);
            } else if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_DESCENT || this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_APPROACH) {
              /**
               * Descent new implementation
               */

              let nextAltitudeObject = this.getNextDescentAltitude();
              let nextAltitude = nextAltitudeObject.targetAltitude;
              let selectedAltitude = altitude;
              this._selectedAltitude = altitude;
              let shouldEnableLevelOff = null;
              let needUpdateAltitude = false;
              let targetAltitude = NaN;
              if (nextAltitude >= selectedAltitude) {
                shouldEnableLevelOff = false;
                targetAltitude = nextAltitude;
              } else if (nextAltitude < selectedAltitude) {
                shouldEnableLevelOff = true;
                targetAltitude = selectedAltitude;
              }
              this._descentTargetAltitude = targetAltitude;
              if (this._lastDescentTargetAltitude !== this._descentTargetAltitude) {
                this._lastDescentTargetAltitude = this._descentTargetAltitude;
                needUpdateAltitude = true;
              }
              if (this._lastSelectedAltitude !== this._selectedAltitude) {
                this._lastSelectedAltitude = this._selectedAltitude;
                needUpdateAltitude = true;
              }
              let altitudeInterventionPushed = SimVar.GetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number');
              if (altitudeInterventionPushed) {
                needUpdateAltitude = true;
                SimVar.SetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number', 0);
              }
              if (Simplane.getAutoPilotAltitudeLockActive()) {
                if (shouldEnableLevelOff) {
                  SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number', 1);
                }
              }
              let isLevelOffActive = SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number');
              if (!isLevelOffActive || altitudeInterventionPushed) {
                if (isFinite(targetAltitude) && needUpdateAltitude) {
                  Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, targetAltitude, this._forceNextAltitudeUpdate);
                  this._forceNextAltitudeUpdate = false;
                  SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 0);
                }
              }
            } else {
              Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, this.cruiseFlightLevel * 100, this._forceNextAltitudeUpdate);
              this._forceNextAltitudeUpdate = false;
              SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 0);
            }
          }
        } else if (!this.getIsFLCHActive() && this.getIsSPDActive()) {
          this.setAPSpeedHoldMode();
        }
        if (this.getIsVNAVArmed() && !this.getIsVNAVActive()) {
          if (Simplane.getAutoPilotThrottleArmed()) {
            if (!this._hasSwitchedToHoldOnTakeOff) {
              let speed = Simplane.getIndicatedSpeed();
              if (speed > 80) {
                Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.HOLD);
                this._hasSwitchedToHoldOnTakeOff = true;
              }
            }
          }
        }
        if (this._isHeadingHoldActive) {
          Coherent.call('HEADING_BUG_SET', 2, this._headingHoldValue);
        }
        if (this.currentFlightPhase > FlightPhase.FLIGHT_PHASE_CLIMB) {
          let altitude = Simplane.getAltitudeAboveGround();
          if (altitude < 20) {
            this.deactivateSPD();
          }
        }
        if (this.currentFlightPhase > FlightPhase.FLIGHT_PHASE_CLIMB) {
          let altitude = Simplane.getAltitudeAboveGround();
          if (altitude < 20) {
            this.deactivateSPD();
          }
        }
        if (this.getIsVNAVActive() && this.currentFlightPhase >= FlightPhase.FLIGHT_PHASE_TAKEOFF) {
          if (this._speedDirector.machModeActive) {
            this.setAPManagedSpeedMach(this._speedDirector.speed, Aircraft.AS01B);
          } else {
            this.setAPManagedSpeed(this._speedDirector.speed, Aircraft.AS01B);
          }
        }
        if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_TAKEOFF) ; else if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CLIMB) ; else if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_CRUISE) ; else if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_DESCENT) ; else if (this.currentFlightPhase === FlightPhase.FLIGHT_PHASE_APPROACH) {
          if (Simplane.getAutoPilotThrottleActive()) {
            let altitude = Simplane.getAltitudeAboveGround();
            if (altitude < 50) {
              if (Simplane.getEngineThrottleMode(0) != ThrottleMode.IDLE) {
                Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.IDLE);
              }
            }
          }
          //this.tryExecuteBAL();
        }

        this._renderer.renderExec(this.getIsRouteActivated());
        this.updateAutopilotCooldown = this._apCooldown;
      }
    }
    calculateFpmToNextWaypoint(altitude, targetAltitude, distance, waypoint, targetType) {
      let groundSpeed = Simplane.getGroundSpeed();
      if (targetAltitude === 'B') {
        targetAltitude = targetAltitude - 300;
      } else if (targetType === 'A') {
        targetAltitude = targetAltitude + 300;
      }
      if (waypoint.isRunway) {
        targetAltitude += 100;
      }
      let altitudeDelta = Math.abs(altitude - targetAltitude);
      let knotsToMilesCoef = 0.0191796575;
      let milesPerMinute = groundSpeed * knotsToMilesCoef;
      let minutesToWaypoint = distance / milesPerMinute;
      let rate = altitudeDelta / minutesToWaypoint;
      return rate;
    }
    executeCustomVNAVDescent(rate, targetAltitude) {
      SimVar.SetSimVarValue('L:B77RS_CUSTOM_VNAV_DESCENT_ENABLED', 'Number', 1);

      /**
       * Disable FLCH mode
       */
      SimVar.SetSimVarValue('K:FLIGHT_LEVEL_CHANGE_ON', 'Number', 0);

      /**
       * Enable AIRSPEED mode
       */
      SimVar.SetSimVarValue('K:AP_AIRSPEED_ON', 'Number', 1);

      /**
       * Round (ceil) vertical speed
       */

      const shouldCeil = !(rate < 30);
      if (shouldCeil) {
        rate = -1 * Math.ceil(Math.abs(rate) / 50) * 50;
      }

      /**
       * Do not descent during descent
       */
      if (rate > -5) {
        rate = 0;
      }

      /**
       * Set vertical speed and add 150 feet per minute (better be on altitude sooner)
       */
      SimVar.SetSimVarValue('K:AP_VS_VAR_SET_ENGLISH', 'Feet per minute', rate);

      /**
       * Set next target altitude
       */
      Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, targetAltitude, this._forceNextAltitudeUpdate);
      SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 1);

      /**
       * Enable AP vertical speed hold
       * NOTE: K:AP_VS_ON can be used instead of K:AP_VS_HOLD
       */
      SimVar.SetSimVarValue('K:AP_VS_HOLD', 'Number', 1);
    }
    controlDescent() {
      /**
       * Descent new implementation
       */
      let altitude = Simplane.getAltitude();
      let targetAltitudeAndDistance = this.getNextDescentAltitude();
      this.executeCustomVNAVDescent(this.calculateFpmToNextWaypoint(altitude, targetAltitudeAndDistance.targetAltitude, targetAltitudeAndDistance.distance, targetAltitudeAndDistance.waypoint, targetAltitudeAndDistance.targetType), targetAltitudeAndDistance.targetAltitude);

      /*
       let selectedAltitude = altitude;
       this._selectedAltitude = altitude;
       let shouldEnableLevelOff = null;
       let needUpdateAltitude = false;
       let targetAltitude = NaN;
       if (nextAltitude >= selectedAltitude) {
       shouldEnableLevelOff = false;
       targetAltitude = nextAltitude;
       } else if (nextAltitude < selectedAltitude) {
       shouldEnableLevelOff = true;
       targetAltitude = selectedAltitude;
       }
       this._descentTargetAltitude = targetAltitude;
       if (this._lastDescentTargetAltitude !== this._descentTargetAltitude) {
       this._lastDescentTargetAltitude = this._descentTargetAltitude;
       needUpdateAltitude = true;
       }
       if (this._lastSelectedAltitude !== this._selectedAltitude) {
       this._lastSelectedAltitude = this._selectedAltitude;
       needUpdateAltitude = true;
       }
       let altitudeInterventionPushed = SimVar.GetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number');
       if (altitudeInterventionPushed) {
       needUpdateAltitude = true;
       SimVar.SetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number', 0);
       }
       if (Simplane.getAutoPilotAltitudeLockActive()) {
       if (shouldEnableLevelOff) {
       SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number', 1);
       }
       }
       let isLevelOffActive = SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number');
       if (!isLevelOffActive || altitudeInterventionPushed) {
       if (isFinite(targetAltitude) && needUpdateAltitude) {
       Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, targetAltitude, this._forceNextAltitudeUpdate);
       this._forceNextAltitudeUpdate = false;
       SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 0);
       }
       }
       */
    }

    controlDescentOld() {
      /*
       let nextAltitude = this.getNextDescentAltitude();
       let selectedAltitude = altitude;
       this._selectedAltitude = altitude;
       let shouldEnableLevelOff = null;
       let needUpdateAltitude = false;
       let targetAltitude = NaN;
       if (nextAltitude >= selectedAltitude) {
       shouldEnableLevelOff = false;
       targetAltitude = nextAltitude;
       } else if (nextAltitude < selectedAltitude) {
       shouldEnableLevelOff = true;
       targetAltitude = selectedAltitude;
       }
       this._descentTargetAltitude = targetAltitude;
       if (this._lastDescentTargetAltitude !== this._descentTargetAltitude) {
       this._lastDescentTargetAltitude = this._descentTargetAltitude;
       needUpdateAltitude = true;
       }
       if (this._lastSelectedAltitude !== this._selectedAltitude) {
       this._lastSelectedAltitude = this._selectedAltitude;
       needUpdateAltitude = true;
       }
       let altitudeInterventionPushed = SimVar.GetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number');
       if (altitudeInterventionPushed) {
       needUpdateAltitude = true;
       SimVar.SetSimVarValue('L:B77RS_DESCENT_ALTITUDE_INTERVENTION_PUSHED', 'Number', 0);
       }
       if (Simplane.getAutoPilotAltitudeLockActive()) {
       if (shouldEnableLevelOff) {
       SimVar.SetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number', 1);
       }
       }
       let isLevelOffActive = SimVar.GetSimVarValue(B77RS_LocalVariables.VNAV.DESCENT_LEVEL_OFF_ACTIVE, 'Number');
       if (!isLevelOffActive || altitudeInterventionPushed) {
       if (isFinite(targetAltitude) && needUpdateAltitude) {
       Coherent.call('AP_ALT_VAR_SET_ENGLISH', 2, targetAltitude, this._forceNextAltitudeUpdate);
       this._forceNextAltitudeUpdate = false;
       SimVar.SetSimVarValue('L:AP_CURRENT_TARGET_ALTITUDE_IS_CONSTRAINT', 'number', 0);
       }
       }
       */
    }
    tryExecuteBAL() {
      /*
       if (Simplane.getAutoPilotThrottleActive()) {
       let altitude = Simplane.getAltitudeAboveGround();
       if (altitude < 50) {
       if (!this._pitch) {
       this._pitch = SimVar.GetSimVarValue('PLANE PITCH DEGREES', 'Radians')
       }
       if(!this._pitchInterval50 && !this._stopPitchInterval50){
       this._pitchInterval50 = setInterval(() => {
       let fpm = Simplane.getVerticalSpeed();
       if(fpm > -400){
       this._pitch += 0.0002;
       } else if (fpm < -800) {
       this._pitch -= 0.0001;
       }
       SimVar.SetSimVarValue('PLANE PITCH DEGREES', 'Radians', this._pitch);
       }, 5)
       }
       if (Simplane.getEngineThrottleMode(0) != ThrottleMode.IDLE) {
       console.log('Setting thrust to idle');
       Coherent.call('GENERAL_ENG_THROTTLE_MANAGED_MODE_SET', ThrottleMode.IDLE);
       SimVar.SetSimVarValue("A:GENERAL ENG THROTTLE LEVER POSITION:1", "Percent", 0);
       SimVar.SetSimVarValue("A:GENERAL ENG THROTTLE LEVER POSITION:2", "Percent", 0);
       }
       }
       if (altitude < 20) {
       this._stopPitchInterval50 = true;
       if(this._pitchInterval50){
       clearInterval(this._pitchInterval50);
       }
       if(!this._pitchInterval11 && !this._stopPitchInterval11){
       this._pitchInterval11 = setInterval(() => {
       let fpm = Simplane.getVerticalSpeed();
       if(fpm > -80){
       this._pitch += 0.0002;
       } else if (fpm < -150) {
       this._pitch -= 0.0005;
       }
       //this._pitch -= 0.00065;
       //this._pitch -= 0.00075;
       SimVar.SetSimVarValue('PLANE PITCH DEGREES', 'Radians', this._pitch);
       }, 2)
       }
       this._stopHoldPitch = true;
       }
       if(altitude < 5){
       this._stopPitchInterval11 = true;
       if(this._pitchInterval11){
       clearInterval(this._pitchInterval11);
       }
       if(!this._pitchInterval5 && !this._stopPitchInterval5){
       this._pitchInterval5 = setInterval(() => {
       this._pitch += 0.00003;
       if(this._pitch < 0){
       SimVar.SetSimVarValue('PLANE PITCH DEGREES', 'Radians', this._pitch);
       }
       }, 5)
       }
       }
       if(Simplane.getAutoPilotActive() != 1){
       this._stopPitchInterval5 = true;
       if(this._pitchInterval5){
       clearInterval(this._pitchInterval5);
       }
       }
       }
       */
    }
    updateSideButtonActiveStatus() {
      for (let i = 0; i < this._leftKeyElements.length; i++) {
        if (this.onLeftInput[i]) {
          this._leftKeyElements[i].classList.add('active');
        } else {
          this._leftKeyElements[i].classList.remove('active');
        }
      }
      for (let i = 0; i < this._rightKeyElements.length; i++) {
        if (this.onRightInput[i]) {
          this._rightKeyElements[i].classList.add('active');
        } else {
          this._rightKeyElements[i].classList.remove('active');
        }
      }
    }
    setPageCurrent(value) {
      if (typeof value === 'number') {
        this._pageCurrent = value;
      } else if (typeof value === 'string') {
        this._pageCurrent = parseInt(value);
      }
      let content = '';
      if (isFinite(this._pageCurrent) && isFinite(this._pageCount)) {
        if (this._pageCurrent > 0) {
          if (this._pageCount > 0) {
            content = this._pageCurrent + '/' + this._pageCount;
          }
        }
      }
      diffAndSetText(this._pageCurrentElement, content);
    }
    setPageCount(value) {
      if (typeof value === 'number') {
        this._pageCount = value;
      } else if (typeof value === 'string') {
        this._pageCount = parseInt(value);
      }
      let content = '';
      if (isFinite(this._pageCurrent) && isFinite(this._pageCount)) {
        if (this._pageCurrent > 0) {
          if (this._pageCount > 0) {
            content = this._pageCurrent + '/' + this._pageCount;
          }
        }
      }
      diffAndSetText(this._pageCurrentElement, content);
    }
    getOrSelectWaypointByIdent(ident, callback) {
      this.dataManager.GetWaypointsByIdent(ident).then(waypoints => {
        if (!waypoints || waypoints.length === 0) {
          return callback(undefined);
        }
        if (waypoints.length === 1) {
          return callback(waypoints[0]);
        }
        B777_FMC_SelectWptPage.ShowPage(this, waypoints, callback);
      });
    }
  }
  _defineProperty(B777_FMC, "_MonthOfYear", ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']);
  _defineProperty(B777_FMC, "_v1s", [[130, 156], [128, 154], [127, 151], [125, 149], [123, 147], [122, 145], [121, 143], [120, 143], [120, 143], [120, 142], [119, 142], [119, 142], [119, 142], [119, 141], [118, 141], [118, 141], [118, 140], [118, 140], [117, 140], [117, 140]]);
  _defineProperty(B777_FMC, "_vRs", [[130, 158], [128, 156], [127, 154], [125, 152], [123, 150], [122, 148], [121, 147], [120, 146], [120, 146], [120, 145], [119, 145], [119, 144], [119, 144], [119, 143], [118, 143], [118, 142], [118, 142], [118, 141], [117, 141], [117, 140]]);
  _defineProperty(B777_FMC, "_v2s", [[135, 163], [133, 160], [132, 158], [130, 157], [129, 155], [127, 153], [127, 151], [126, 150], [125, 150], [125, 149], [124, 149], [124, 148], [124, 148], [123, 147], [123, 146], [123, 146], [123, 145], [122, 145], [122, 144], [121, 144]]);
  registerInstrument('b777-fmc', B777_FMC);

  exports.B777_FMC = B777_FMC;
  exports.B777_FMC_ApproachPage = B777_FMC_ApproachPage;
  exports.B777_FMC_DepArrPage = B777_FMC_DepArrPage;
  exports.B777_FMC_FMCCommPage = B777_FMC_FMCCommPage;
  exports.B777_FMC_HoldPage = B777_FMC_HoldPage;
  exports.B777_FMC_IdentPage = B777_FMC_IdentPage;
  exports.B777_FMC_InitRefIndexPage = B777_FMC_InitRefIndexPage;
  exports.B777_FMC_LegsPage = B777_FMC_LegsPage;
  exports.B777_FMC_MaintPage = B777_FMC_MaintPage;
  exports.B777_FMC_NavRadioPage = B777_FMC_NavRadioPage;
  exports.B777_FMC_PayloadManagerPage = B777_FMC_PayloadManagerPage;
  exports.B777_FMC_PerfInitPage = B777_FMC_PerfInitPage;
  exports.B777_FMC_PosInitPage = B777_FMC_PosInitPage;
  exports.B777_FMC_ProgressPage = B777_FMC_ProgressPage;
  exports.B777_FMC_RobConfigurationPage = B777_FMC_RobConfigurationPage;
  exports.B777_FMC_RobIRSPage = B777_FMC_RobIRSPage;
  exports.B777_FMC_RobPage = B777_FMC_RobPage;
  exports.B777_FMC_RouteDataPage = B777_FMC_RouteDataPage;
  exports.B777_FMC_RouteRequestPage = B777_FMC_RouteRequestPage;
  exports.B777_FMC_SelectWptPage = B777_FMC_SelectWptPage;
  exports.B777_FMC_SimBriefConfigurationPage = B777_FMC_SimBriefConfigurationPage;
  exports.B777_FMC_TakeOffRefPage = B777_FMC_TakeOffRefPage;
  exports.B777_FMC_ThrustLimPage = B777_FMC_ThrustLimPage;
  exports.B777_FMC_VNAVPage = B777_FMC_VNAVPage;
  exports.BaseFMC = BaseFMC;
  exports.Boeing_FMC = Boeing_FMC;
  exports.CJ4_FMC_PilotWaypoint_Manager = CJ4_FMC_PilotWaypoint_Manager;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
