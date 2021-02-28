import PriceService from './PriceService'
import BigNumber from 'bignumber.js'

class LPPrice extends PriceService {
  constructor(key, pool, vue) {
    super(key, pool, vue);
  }
  async calcPrice(){
    const settings = this.getSettings();
    const usdtInstance = await this.getUSDTTokenInstance();
    const usdtBalance = await usdtInstance.balanceOf(this.pool.tokenAddress);
    const tokenTotalSupply = this.pool.tokenTotalSupply;

    return BigNumber(usdtBalance).times(2).div(tokenTotalSupply);
  }
}

export default LPPrice
