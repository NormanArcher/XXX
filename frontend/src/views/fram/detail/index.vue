<template>
  <div id="fram-detail" class="app-container" v-if="settings">
    <detail-header :options="options"/>
    <contentMobile v-if="device=='mobile'" :options="options"/>
    <detail-content v-else :options="options"/>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import detailHeader from './header';
import detailContent from './content';
import contentMobile from './contentMobile';
import countdown from '../countdown';
import { ROUTE_NAMES } from '@/utils/Constants.js'
import CapitalPoolContract from '@/services/CapitalPool.js';
import TokenContract from '@/services/Token.js';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
    detailHeader,
    detailContent,
    contentMobile,
    countdown
  },
  data() {
    return {
      options: {
        depositShow: false,
        ransomShow: false,
        getShow: false,
        myShow: false,

        getType: null,

        referrer: null, // 推荐人

        rewardBalanceOf: 0, // 奖励币余额
        tokenBalanceOf: 0, // 挖矿币可用余额
        balanceOf: 0, // 已存入staked
        earned: 0, // 流动性挖出

        rewardForDuration: 0, // 在某段时间内流动性挖出
        rewardsDuration: 0, // 产生收益的间隔时间

        auth: 0,
        data: {},
        actives: {
          liquidityType: false,
          auth: true,
          deposited: false,
          liquidity: false,
          contribution: false,
        },
      },
      defaultAddress: "0x0000000000000000000000000000000000000000",
      CapitalPool: null,
      Token: null,
      cacheKey: "pool-detail",
      timer: null,
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
  },
  watch: {
    web3Status: watch.web3Status,
  },
  created(){
    this.initEvent();
    this.loadData();
    this.initData();
    this.$Bus.bindEvent(this.$EventNames.switchAccount, this._uid, (account)=>{
      this.initData();
    });
  },
  beforeRouteEnter(to, from, next) {
    if(localStorage.getItem("pool-detail")){
      next();
    }else if(to.params && to.params.name){
      next();
    }else{
      next({ name: ROUTE_NAMES.FRAM });
    }
  },
  methods: {
    initEvent(){
      this.$Bus.$off(this.$EventNames.refreshBalance);
      this.$Bus.$on(this.$EventNames.refreshBalance, ()=>{
        this.getTokenBalanceOf();
        this.getBalanceOf();
      });
      this.$Bus.$off(this.$EventNames.refreshEarned);
      this.$Bus.$on(this.$EventNames.refreshEarned, ()=>{
        this.getEarned();
      });
      this.$Bus.$off(this.$EventNames.refreshEarnedByWeight);
      this.$Bus.$on(this.$EventNames.refreshEarnedByWeight, ()=>{
        this.getEarnedByWeight();
      });
    },
    loadData(){
      if(this.$route.params && this.$route.params.name){
        this.options.data = JSON.parse(JSON.stringify(this.$route.params));
        this.cacheObject(this.cacheKey, this.options);
      }else{
        this.options = this.getObjectCache(this.cacheKey);
      }
    },
    initData(){
      if(this.web3Status === this.WEB3_STATUS.AVAILABLE){
        this.initContract();
      }
    },
    async initContract(){
      const key = "Pool-" + this.options.data.poolAddress;
      this.CapitalPool = await CapitalPoolContract.getInstance(key, this.options.data.poolAddress, this);
      const tokenKey = "Token-" + this.options.data.tokenAddress;
      this.Token = await TokenContract.getInstance(tokenKey, this.options.data.tokenAddress, this);
      this.getData();
    },
    getPoolInstance(){
      return this.CapitalPool.contract.instance;
    },
    getTokenInstance(){
      return this.Token.contract.instance;
    },
    getData(){
      this.getTokenBalanceOf();
      this.getBalanceOf();
      this.getEarned();
      this.getRewardForDuration();
      this.getRewardsDuration();
      this.getRef();
      if(this.timer){
        return;
      }
      this.timer = setInterval(()=>{
        this.refreshData();
      }, this.settings.refreshInterval || 5000);
    },
    refreshData(){
      this.getEarned();
      this.getRef();
      this.getBalanceOf();
      this.getTokenBalanceOf();
    },
    getRef(){
      this.options.referrer = null;
      this.getPoolInstance().referrerMap(this.member.account).then(res=>{
        const refAddress = res.toString();
        if(refAddress != this.defaultAddress){
          this.options.referrer = res.toString();
        }
      }).catch(e => {
        console.error(e);
      });
    },
    getTokenBalanceOf(){
      this.getTokenInstance().balanceOf(this.member.account).then(res => {
        console.info("tokenBalanceOf", res.toString());
        this.options.tokenBalanceOf = res.toString();
      }).catch(e => {
        console.info(e);
      });
    },
    getBalanceOf(){
      this.getPoolInstance().balanceOf(this.member.account).then(res => {
        console.info("balanceOf", res.toString());
        this.options.balanceOf = res.toString();
      }).catch(e => {
        console.info(e);
      });
    },
    getEarned(){
      this.getPoolInstance().earned(this.member.account).then(res => {
        console.info("earned", res.toString());
        this.options.earned = res.toString();
      }).catch(e => {
        console.info(e);
      });
    },
    getRewardForDuration(){
      this.getPoolInstance().getRewardForDuration().then(res => {
        console.info("rewardForDuration", res.toString());
        this.options.rewardForDuration = res.toString();
      }).catch(e => {
        console.info(e);
      });
    },
    getRewardsDuration(){
      this.getPoolInstance().rewardsDuration().then(res => {
        console.info("rewardsDuration", res.toString());
        this.options.rewardsDuration = res.toString();
      }).catch(e => {
        console.info(e);
      });
    },
  },
  destroyed(){
    if(this.timer){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
</script>
<style lang="scss" scoped>
#fram-detail{

}
</style>
