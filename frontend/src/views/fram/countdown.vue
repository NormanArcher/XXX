<template>
  <div id="fram-countdown" v-if="settings.features.countdown">
    <div v-if="device==='desktop'">
      <div class="countdown-label">
        <div v-if="times==0">{{$t("fram.countdown.notstart")}}</div>
        <div v-else>{{$t("fram.countdown.remaining")}}</div>
      </div>
      <spacev height="20px"></spacev>
      <div class="countdown-content">
        <div>{{days}} : {{hours}} : {{mins}} : {{seconds}}</div>
      </div>
    </div>
    <div v-else class="countdown-mobile">
      <div class="countdown-label">
        <div v-if="times==0">{{$t("fram.countdown.notstart")}}</div>
        <div v-else>{{$t("fram.countdown.remaining")}}</div>
      </div>
      <spacev height="10px"></spacev>
      <div class="countdown-content">
        <div>{{days}} : {{hours}} : {{mins}} : {{seconds}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import { BigNumber } from 'bignumber.js';
import CapitalPoolContract from '@/services/CapitalPool.js';

export default {
  components:{
  },
  props: ["pool"],
  data() {
    return {
      times: 0,
      Pool: null,
      timeTask: null,
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
    days(){
      const t = BigNumber(this.times).idiv(60*60*24);
      return t.gt(9) ? t.toString() : "0" + t.toString();
    },
    hours(){
      const t = BigNumber(this.times).mod(60*60*24).idiv(60*60);
      return t.gt(9) ? t.toString() : "0" + t.toString();
    },
    mins(){
      const t = BigNumber(this.times).mod(60*60).idiv(60);
      return t.gt(9) ? t.toString() : "0" + t.toString();
    },
    seconds(){
      const t = BigNumber(this.times).mod(60);
      return t.gt(9) ? t.toString() : "0" + t.toString();
    },
  },
  watch: {
    web3Status: watch.web3Status,
    pool: {
      handler(newVal, oldVal){
        this.initData();
      },
    }
  },
  created(){
    this.initData();
    this.$Bus.bindEvent(this.$EventNames.switchAccount, this._uid, (account)=>{
      this.initData();
    });
  },
  beforeDestroy(){
    if(this.timeTask){
      clearInterval(this.timeTask);
    }
  },
  methods: {
    initData(){
      if(this.web3Status !== this.WEB3_STATUS.UNAVAILABLE && this.pool){
        this.initContract();
      }
    },
    async initContract(){
      if(this.pool){
        const key = "Pool-" + this.pool.poolAddress;
        this.Pool = await CapitalPoolContract.getInstance(key, this.pool.poolAddress, this);
        this.getPeriodFinish();
      }
    },
    getPoolInstance(){
      return this.Pool.contract.instance;
    },
    getPeriodFinish(){
      this.getPoolInstance().periodFinish().then(res=>{
        const periodFinish = res.toString();
        if(BigNumber(periodFinish).eq(0)){
          this.times = 0;
          return;
        }
        const curTime = new Date().getTime();
        this.times = parseInt(BigNumber(periodFinish).minus(BigNumber(curTime).div(1000)).toFixed(0));
        this.startCountdown();
        console.info(periodFinish, this.times);
      }).catch(e=>{
        console.error(e);
      })
    },
    startCountdown(){
      this.timeTask = setInterval(()=>{
        this.times = this.times - 1;
      }, 1000);
    },
    rules(){
      this.$openWindow(this.settings.ruleUrl);
    },
    address(){
      this.$openWindow(this.settings.addressUrl);
    },
    report(){
      this.$openWindow(this.settings.reportUrl);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
#fram-countdown{
  text-align: left;
  .countdown-mobile{
    text-align: center;
    .countdown-content{
      justify-content: center;
      >div{
        font-size: 34px;
        color: #3AAFA9;
        font-weight: bold;
      }
    }
    .countdown-label{
      font-size: 20px;
    }
  }
  .countdown-content{
    width: 100%;
    display: flex;
    justify-content: left;
    >div{
      font-size: 3.75rem;
    }
  }
  .countdown-label{
    font-size: 1.875rem;
    color: #3AAFA9;
  }
  .countdown-card{
    border-radius: 2.0625rem;
    box-shadow: $--card-box-shadow;
    background-color: $--front-background-color;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
}
</style>
<style lang="scss" >
  .mobile {
    .countdown-label{
      font-size: 1rem;
      color: #999999;
    }
  }
</style>
