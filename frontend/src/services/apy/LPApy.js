import store from '@/store'
import TokenContract from '@/services/Token.js';
import CapitalPoolContract from '@/services/CapitalPool.js';
import { BigNumber } from 'bignumber.js';
import ApyService from './ApyService.js';

class LPApy extends ApyService {

  constructor(key, pool, vue) {
    super(key, pool, vue);
  }

  async calcApy(){
    const rewardInstance = await this.getCurrentRewardInstance();

    const rewardBalance = await rewardInstance.balanceOf(this.pool.poolAddress);
    const tokenTotalSupply = this.pool.tokenTotalSupply;
    let totalSupply = this.pool.totalSupply;
    const rewardRate = this.pool.rewardRate;

    totalSupply = BigNumber(totalSupply).eq(0) ? 1 : totalSupply;
    let c = BigNumber(rewardBalance).times(2).div(tokenTotalSupply);
    c = c.eq(0) ? 1 : c;
    return BigNumber(rewardRate).times(365*24*3600).times(100).div(c).div(totalSupply);
  }
}

export default LPApy
