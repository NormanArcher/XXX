<template>
  <div id="fram-detail-dialog-deposited" v-loading.fullscreen.lock="loading"
        :element-loading-text="$t('common.confirmTran')">
    <liDialog :options="dialogOptions" @close="options.depositShow=false">
      <template slot="title">
        {{$t('fram.detail.deposited.depositTitle', {poolCoin: options.data.poolCoin})}}
      </template>
      <template slot="body">
        <div class="input">
          <el-input v-model="depositNum" :placeholder="$t('fram.detail.deposited.depositNum')" @input="checkAmount">
            <el-button class="append-btn" slot="append" @click="depositAll">All</el-button>
          </el-input>
        </div>
        <spacev height="5px"/>
        <div class="data">
          <div class="right">
            {{$t('fram.detail.deposited.canUse')}}: <span class="value" v-format="'#,##0.00'">{{$etherToNumber(options.tokenBalanceOf)}}</span>
          </div>
        </div>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="deposit" round style="width: 100%;">{{$t("fram.detail.deposited.depositBtn")}}</el-button>
      </template>
    </liDialog>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import CapitalPoolContract from '@/services/CapitalPool.js';
import { BigNumber } from 'bignumber.js';

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
      depositNum: "",
      CapitalPool: null,
      loading: false,
      defaultAddress: "0x0000000000000000000000000000000000000000",
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
        this.dialogOptions.show = newVal.depositShow;
        if(this.dialogOptions.show){
          this.initData();
        }
      }
    }
  },
  created(){
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
    depositAll(){
      this.depositNum = this.$etherToValue(this.options.tokenBalanceOf);
    },
    //只允许输入合法的数字
    checkAmount(value){
      let newValue = this.getNumber(value);
      this.depositNum = newValue;
      return newValue;
    },
    deposit(){
      if(this.depositNum.length==0 || BigNumber(this.depositNum).lte(0)){
        this.$message.error(this.$t("error.isNotAmount"));
        return;
      }
      const instance = this.CapitalPool.contract.instance;
      const amount = this.$ether(this.depositNum).toString();
      this.loading = true;
      instance.stake(amount, this.defaultAddress, { from: this.member.account }).then(res => {
        console.info(res, res.toString());
        this.$message.success(this.$t("common.tranSuccess"));
        this.$Bus.$emit(this.$EventNames.refreshBalance);
        this.options.depositShow = false;
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
#fram-detail-dialog-deposited{
  .input{
    input{
      font-size: 0.875rem;
    }
  }
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
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="scss">
#fram-detail-dialog-deposited{

}
</style>
