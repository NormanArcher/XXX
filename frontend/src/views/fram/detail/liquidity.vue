<template>
  <div id="fram-detail-content-liquidity">
    <detail-card>
      <template slot="image">
        <img :src="require('@/assets/images/reward.svg')" />
      </template>
      <template slot="title">
        {{settings.rewardCoin}}
      </template>
      <template slot="label">
        {{$t("fram.detail.common.canGet")}}
      </template>
      <template slot="value">
        <div v-format="'#,##0.00'">{{$etherToNumber(options.earned)}}</div>
      </template>
      <template slot="btn">
        <el-button type="primary" :disabled="options.actives.auth" @click="get" round style="width: 100%;">{{$t("fram.detail.common.get")}}</el-button>
      </template>
    </detail-card>
    <getDialog :options="options"/>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import detailCard from './card';
import formItem from './formItem'
import getDialog from './dialog/get';
import { BigNumber } from 'bignumber.js';
import CapitalPoolContract from '@/services/CapitalPool.js';

export default {
  components:{
    detailCard, formItem, getDialog
  },
  props: ["options"],
  data() {
    return {
      CapitalPool: null,
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'web3',
      'member',
      'web3Status',
      'settings'
    ]),
    earnedOfDay(){
      return this.getEarning().times(24 * 60 * 60);
    },
    earnedOfWeek(){
      return this.earnedOfDay.times(7);
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
      if(this.web3Status === this.WEB3_STATUS.AVAILABLE){
        this.initContract();
      }
    },
    async initContract(){
      const key = "Pool-" + this.options.data.poolAddress;
      this.CapitalPool = await CapitalPoolContract.getInstance(key, this.options.data.poolAddress, this);
    },
    getPoolInstance(){
      return this.CapitalPool.contract.instance;
    },
    get(){
      this.loading = true;
      this.getPoolInstance().getReward({ from: this.member.account }).then(res=>{
        this.$message.success(this.$t("common.tranSuccess"));
        this.$Bus.$emit(this.$EventNames.refreshEarned);
      }).catch(e => {
        this.$message.error(e.message);
        console.error(e);
      }).finally(() => {
        this.loading = false;
      });
    },
    getEarning(){
      const options = this.options;
      const balanceOf = BigNumber(options.balanceOf);
      const rewardForDuration = BigNumber(options.rewardForDuration);
      const rewardsDuration = BigNumber(options.rewardsDuration);
      const totalSupply = BigNumber(options.data.totalSupply);

      if(balanceOf.eq(0) || rewardForDuration.eq(0) || rewardsDuration.eq(0) || totalSupply.eq(0)){
        return BigNumber(0);
      }
      return rewardForDuration.div(rewardsDuration).times(balanceOf).div(totalSupply);
    }
  }
}
</script>
<style lang="scss" scoped>
#fram-detail-content-liquidity{

}
</style>
