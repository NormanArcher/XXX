import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import { BigNumber } from 'bignumber.js';
import CapitalPoolContract from '@/services/CapitalPool.js';
import TokenContract from '@/services/Token.js';
import PriceManager from '@/services/price/PriceManager.js';
import ApyManager from '@/services/apy/ApyManager.js';

export default {
  components:{
  },
  props: ["data"],
  data() {
    return {
      CapitalPool: null,
      Token: null,
      Reward: null,
      price: 0,
      apy: 0,
    }
  },
  computed: {
    ...mapGetters([
      'web3',
      'member',
      'web3Status',
      'settings',
      'device'
    ]),
    totalUSDT(){
      const value = BigNumber(this.$etherToNumber(this.data.totalSupply)).times(this.price).times(this.member.price).toFixed(2);
      return this.textFormat(parseFloat(value), "#,##0.00");
    },
    earnedPerDay(){
      const value = BigNumber(this.data.rewardRate).plus(this.data.rewardRateByWeight).times(60*60*24);
      return this.textFormat(parseFloat(this.$etherToNumber(value)), "#,##0.00");
    }
  },
  watch: {
    web3Status: watch.web3Status,
  },
  created(){
    this.initData();
    this.$Bus.bindEvent(this.$EventNames.switchAccount, this._uid, (account)=>{
      this.initData();
    });
  },
  methods: {
    initData(){
      this.initContract();
    },
    async initContract(){
      const key = "Pool-" + this.data.poolAddress;
      this.CapitalPool = await CapitalPoolContract.getInstance(key, this.data.poolAddress, this);
      const tokenKey = "Token-" + this.data.tokenAddress;
      this.Token = await TokenContract.getInstance(tokenKey, this.data.tokenAddress, this);
      const rewardKey = "Reward-" + this.data.rewardAddress;
      this.Reward = await TokenContract.getInstance(rewardKey, this.data.rewardAddress, this);

      await this.getTokenTotalSupply();
      await this.getPoolTotalSupply();
      await this.getRewardTotalsupply();
      await this.getPoolRewardRate();
      this.getPrice();
      this.getApy();
    },
    getPoolInstance(){
      return this.CapitalPool.contract.instance;
    },
    getTokenInstance(){
      return this.Token.contract.instance;
    },
    getRewardInstance(){
      return this.Reward.contract.instance;
    },
    async getPrice(){
      const key = this.data.liquidity == 'yes' ? `LP_${this.data.subCoin1}_${this.data.subCoin2}` : this.data.poolCoin;
      const price = await PriceManager.getPriceService(key, this.data, this).calcPrice();
      this.price = price;
      this.data.price = price;
      console.info(key, "price", this.price.toString());
    },
    async getApy(){
      const key = this.data.liquidity == 'yes' ? `LP_${this.data.subCoin1}_${this.data.subCoin2}` : this.data.poolCoin;
      const apy = await ApyManager.getApyService(key, this.data, this).calcApy();
      this.apy = apy;
      console.info(key, "apy", this.apy.toString());
    },
    async getTokenTotalSupply(){
      try{
        const tokenTotalSupply = await this.getTokenInstance().totalSupply();
        this.data.tokenTotalSupply = tokenTotalSupply.toString();
        console.debug("tokenTotalSupply", this.data.tokenTotalSupply);
      }catch(e){
        console.error(e);
      }
    },
    async getPoolTotalSupply(){
      try{
        const totalSupply = await this.getPoolInstance().totalSupply();
        this.data.totalSupply = totalSupply.toString();
        console.debug("totalSupply", this.data.totalSupply);
      }catch(e){
        console.error(e);
      }
    },
    async getPoolRewardRate(){
      try{
        const rewardRate = await this.getPoolInstance().rewardRate();
        this.data.rewardRate = rewardRate.toString();
        console.debug("rewardRate", this.data.rewardRate);
      }catch(e){
        console.error(e);
      }
    },
    async getRewardTotalsupply(){
      try{
        const rewardTotalSupply = await this.getRewardInstance().totalSupply();
        this.data.rewardTotalSupply = rewardTotalSupply.toString();
        console.debug("rewardTotalSupply", this.data.rewardTotalSupply);
      }catch(e){
        console.error(e);
      }
    },

    fram(){
      if(this.web3Status === this.WEB3_STATUS.AVAILABLE){
        this.$router.push({ name: this.$RouteNames.FRAM_DETAIL, params: JSON.parse(JSON.stringify(this.data)) });
        return;
      }
      this.checkConnect();
    }
  }
}
