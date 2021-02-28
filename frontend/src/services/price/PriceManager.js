import PriceService from './PriceService.js';
import USDTPrice from './USDTPrice.js';
import LPPrice from './LPPrice.js';

const XF = "XF";
const USDT = "USDT";
const LP_XF_USDT = "LP_XF_USDT";
const LP_XF_HUSD = "LP_XF_HUSD";
const LP_XF_HBTC = "LP_XF_HBTC";
const LP_XF_HT = "LP_XF_HT";

class PriceManager {

  constructor() {
    this.PriceMap = {};
    this.keyMap = {
    };
    this.keyMap[XF] = PriceService;
    this.keyMap[USDT] = USDTPrice;
    this.keyMap[LP_XF_USDT] = LPPrice;
    this.keyMap[LP_XF_HUSD] = LPPrice;
    this.keyMap[LP_XF_HBTC] = LPPrice;
    this.keyMap[LP_XF_HT] = LPPrice;
  }

  createPriceService(key, pool, vue){
    let price = LPPrice;
    if(this.keyMap[key]){
      price = this.keyMap[key];
    }
    this.PriceMap[key] = new price(key, pool, vue);
    return this.PriceMap[key];
  }
  getPriceService(key){
    return this.PriceMap[key];
  }
}

const priceManager = new PriceManager();

PriceManager.getPriceService = function(key, pool, vue){
  if(priceManager.getPriceService(key)){
    return priceManager.getPriceService(key);
  }
  return priceManager.createPriceService(key, pool, vue);
}
PriceManager.XF = XF;
PriceManager.USDT = USDT;
PriceManager.LP_XF_USDT = LP_XF_USDT;
PriceManager.LP_XF_HUSD = LP_XF_HUSD;
PriceManager.LP_XF_HBTC = LP_XF_HBTC;
PriceManager.LP_XF_HT = LP_XF_HT;

export default PriceManager
