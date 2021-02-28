import ApyService from './ApyService.js';
import LPApy from './LPApy.js';

const XF = "XF";
const USDT = "USDT";
const LP_XF_USDT = "LP_XF_USDT";
const LP_XF_HUSD = "LP_XF_HUSD";
const LP_XF_HBTC = "LP_XF_HBTC";
const LP_XF_HT = "LP_XF_HT";

class ApyManager {

  constructor() {
    this.ApyMap = {};
    this.keyMap = {
    };
    this.keyMap[XF] = ApyService;
    this.keyMap[LP_XF_USDT] = LPApy;
    this.keyMap[LP_XF_HUSD] = LPApy;
    this.keyMap[LP_XF_HBTC] = LPApy;
    this.keyMap[LP_XF_HT] = LPApy;
  }

  createApyService(key, pool, vue){
    let apy = LPApy;
    if(this.keyMap[key]){
      apy = this.keyMap[key];
    }
    this.ApyMap[key] = new apy(key, pool, vue);
    return this.ApyMap[key];
  }
  getApyService(key){
    return this.ApyMap[key];
  }
}

const apyManager = new ApyManager();

ApyManager.getApyService = function(key, pool, vue){
  if(apyManager.getApyService(key)){
    return apyManager.getApyService(key);
  }
  return apyManager.createApyService(key, pool, vue);
}
ApyManager.XF = XF;
ApyManager.USDT = USDT;
ApyManager.LP_XF_USDT = LP_XF_USDT;
ApyManager.LP_XF_HUSD = LP_XF_HUSD;
ApyManager.LP_XF_HBTC = LP_XF_HBTC;
ApyManager.LP_XF_HT = LP_XF_HT;

export default ApyManager
