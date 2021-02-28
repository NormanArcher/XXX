import store from '@/store'
import TokenContract from '@/services/Token.js';
import CapitalPoolContract from '@/services/CapitalPool.js';
import { BigNumber } from 'bignumber.js';

class ApyService {

  constructor(key, pool, vue) {
    this.key = key;
    this.pool = pool;
    this.vue = vue;
  }

  getSettings(){
    return store.getters.settings;
  }

  async getCurrentTokenInstance(){
    this.tokenContract = await TokenContract.getInstance("Token-" + this.pool.tokenAddress, this.pool.tokenAddress, this.vue);
    return this.tokenContract.contract.instance;
  }

  async getCurrentPoolInstance(){
    this.poolContract = await CapitalPoolContract.getInstance("Pool-" + this.pool.poolAddress, this.pool.poolAddress, this.vue);
    return this.poolContract.contract.instance;
  }

  async getCurrentRewardInstance(){
    this.rewardContract = await CapitalPoolContract.getInstance("Reward-" + this.pool.rewardAddress, this.pool.rewardAddress, this.vue);
    return this.rewardContract.contract.instance;
  }

  async calcApy(){
    let totalSupply = this.pool.totalSupply;
    const rewardRate = this.pool.rewardRate;
    const rewardRateByWeight = this.pool.rewardRateByWeight;
    this.pool.totalSupply = totalSupply;
    this.pool.rewardRate = rewardRate;
    this.pool.rewardRateByWeight = rewardRateByWeight;

    totalSupply = BigNumber(totalSupply).eq(0) ? 1 : totalSupply;
    // return BigNumber(rewardRate).plus(rewardRateByWeight).times(365*24*3600).times(100).div(totalSupply);
    return BigNumber(rewardRate).times(365*24*3600).times(100).div(totalSupply);
  }
}

export default ApyService
