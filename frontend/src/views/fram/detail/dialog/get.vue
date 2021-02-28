<template>
  <div id="fram-detail-dialog-get">
    <liDialog :options="dialogOptions" @close="options.getShow=false">
      <template slot="title">
        {{$t('fram.detail.common.get', {rewardCoin: settings.rewardCoin})}}
      </template>
      <template slot="body">
        <div class="input">
          <el-input v-model="getNum" :placeholder="$t('fram.detail.common.getNum')" @input="checkAmount">
            <el-button class="append-btn" slot="append" @click="getAll">All</el-button>
          </el-input>
        </div>
        <spacev height="5px"/>
        <div class="data">
          <div class="right">
            {{$t('fram.detail.common.canGet')}}: <span class="value" v-format="'#,##0.00'">{{$etherToNumber(canGet)}}</span>
          </div>
        </div>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="get" round style="width: 100%;">{{$t("fram.detail.common.get")}}</el-button>
      </template>
    </liDialog>
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
  props: ["options"],
  data() {
    return {
      dialogOptions:{
        show: false,
        width: "300px"
      },
      getNum: "",
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
    canGet(){
      if(this.options.getType == "liquidity"){
        return this.options.earned;
      }
      return this.options.earnedByWeight;
    }
  },
  watch: {
    web3Status: watch.web3Status,
    options: {
      deep: true,
      handler(newVal, oldVal){
        this.dialogOptions.show = newVal.getShow;
      }
    }
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
    getAll(){
      this.getNum = this.$etherToValue(this.canGet);
    },
    //只允许输入合法的数字
    checkAmount(value){
      let newValue = this.getNumber(value);
      this.getNum = newValue;
      return newValue;
    },
    get(){
      if(this.getNum.length==0 || BigNumber(this.getNum).lte(0)){
        this.$message.error(this.$t("error.isNotAmount"));
        return;
      }

      const amount = this.$ether(this.getNum).toString();
      if(BigNumber(this.amount).gt(this.canGet)){
        this.$message.error(this.$t("error.insufficientBalance"));
        return;
      }
      if(this.options.getType == "liquidity"){
        this.getReward();
      }else{
        this.getRewardWeight();
      }
    },
    getReward(){
      this.loading = true;
      this.getPoolInstance().getReward({ from: this.member.account }).then(res=>{
        this.$message.success(this.$t("common.tranSuccess"));
      }).catch(e => {
        this.$message.error(e.message);
        console.error(e);
      }).finally(() => {
        this.loading = false;
      });
    },
    getRewardWeight(){
      this.loading = true;
      this.getPoolInstance().getRewardWeight({ from: this.member.account }).then(res=>{
        this.$message.success(this.$t("common.tranSuccess"));
      }).catch(e => {
        this.$message.error(e.message);
        console.error(e);
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../styles/element-variables.scss';
#fram-detail-dialog-get{
  .input{

  }
  .data{
    position: relative;
    .right{
      font-size: $--font-size-base;
      position: absolute;
      right: 0rem;
      color: #FAFAFB;
      .value{
        color: #3DD598;
      }
    }
  }
}
</style>
<style lang="scss">
#fram-detail-dialog-get{
}
</style>
