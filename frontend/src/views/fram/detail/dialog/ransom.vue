<template>
  <div id="fram-detail-dialog-ransom" v-loading.fullscreen.lock="loading"
        :element-loading-text="$t('common.confirmTran')">
    <liDialog :options="dialogOptions" @close="options.ransomShow=false">
      <template slot="title">
        {{$t('fram.detail.deposited.ransomTitle', {poolCoin: options.data.poolCoin})}}
      </template>
      <template slot="body">
        <div class="input">
          <el-input v-model="ransomNum" :placeholder="$t('fram.detail.common.ransomNum')" @input="checkAmount">
            <el-button class="append-btn" slot="append" @click="ransomAll">All</el-button>
          </el-input>
        </div>
        <spacev height="5px"/>
        <div class="data">
          <div class="right">
            {{$t('fram.detail.common.canRansom')}}: <span class="value" v-format="'#,##0.00'">{{$etherToNumber(options.balanceOf)}}</span>
          </div>
        </div>
        <div class="error">
          <div class="title">
            <i class="el-icon-warning-outline"></i>
            {{$t('layout.tip')}}
          </div>
          <div class="content">
            {{$t('fram.detail.common.allTip')}}
          </div>
        </div>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="ransom" round style="width: 100%;">{{$t("fram.detail.deposited.ransomBtn")}}</el-button>
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
      ransomNum: "",
      allRansom: "30",
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
  },
  watch: {
    web3Status: watch.web3Status,
    options: {
      deep: true,
      handler(newVal, oldVal){
        this.dialogOptions.show = newVal.ransomShow;
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
    //只允许输入合法的数字
    checkAmount(value){
      let newValue = this.getNumber(value);
      this.ransomNum = newValue;
      return newValue;
    },
    ransomAll(){
      this.ransomNum = this.$etherToValue(this.options.balanceOf);
    },
    ransom(){
      if(this.ransomNum.length==0 || BigNumber(this.ransomNum).lte(0)){
        this.$message.error(this.$t("error.isNotAmount"));
        return;
      }

      const amount = this.$ether(this.ransomNum).toString();
      console.info(amount, this.options.balanceOf);
      if(BigNumber(this.amount).gt(this.options.balanceOf)){
        this.$message.error(this.$t("error.insufficientBalance"));
        return;
      }
      this.loading = true;
      this.getPoolInstance().withdraw(amount, { from: this.member.account }).then(res => {
        console.info(res, res.toString());
        this.$message.success(this.$t("common.tranSuccess"));
        this.$Bus.$emit(this.$EventNames.refreshBalance);
        this.options.ransomShow = false;
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
#fram-detail-dialog-ransom{
  .data{
    position: relative;
    .right{
      font-size: 12px;
      position: absolute;
      right: 0rem;
      color: $--label-color;
      margin-top: 0.625rem;
      .value{
        color: #3DD598;
      }
    }
  }
  .error{
    background-color: #2314281d;
    color: #FC5A5A;
    border-radius: 0.625rem;
    font-size: $--font-size-base;
    padding: 0.625rem;
    margin-top: 2.5rem;
    .title{
      font-weight: bold;
      margin-bottom: 0.625rem;
    }
    .content{
      font-size: 0.875rem;
    }
  }
}
</style>
<style lang="scss">
#fram-detail-dialog-ransom{
}
</style>
