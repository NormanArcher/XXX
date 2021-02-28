import store from '@/store'
import TokenContract from '@/services/Token.js';
import CapitalPoolContract from '@/services/CapitalPool.js';

class PriceService {

  constructor(key, pool, vue) {
    this.key = key;
    this.pool = pool;
    this.vue = vue;
  }

  getSettings(){
    return store.getters.settings;
  }

  async getTokenInstance(key, address){
    const token = await TokenContract.getInstance(key, address, this.vue);
    return token.contract.instance;
  }

  async getUSDTTokenInstance(){
    const usdtAddress = this.getSettings().usdtAddress;
    const token = await TokenContract.getInstance("Token-" + usdtAddress, usdtAddress, this.vue);
    return token.contract.instance;
  }

  async getCurrentTokenInstance(){
    const token = await TokenContract.getInstance("Token-" + this.pool.tokenAddress, this.pool.tokenAddress, this.vue);
    return token.contract.instance;
  }

  async getCurrentPoolInstance(){
    const pool = await CapitalPoolContract.getInstance("Pool-" + this.pool.poolAddress, this.pool.poolAddress, this.vue);
    return pool.contract.instance;
  }

  calcPrice(){
    const member = store.getters.member;
    return parseFloat(member.price);
  }
}

PriceService.getInstance = function(key, pool, vue){

}

export default PriceService
