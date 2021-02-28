<template>
  <div id="fram-detail-dialog-my">
    <liDialog class="my-dialog" :options="dialogOptions" @close="options.myShow=false">
      <template slot="title">
        {{$t('fram.detail.my')}} {{settings.appName}}
      </template>
      <template slot="body">
        <div class="field-area" v-if="member.account && web3Status === AVAILABLE">
          {{formatterLongString(member.account, 20, 13, 6)}}
        </div>
        <div class="field-area" v-else>
          {{$t('fram.detail.mymsg.unlogon')}}
        </div>
        <spacev height="20px"/>
        <div class="field-area">
          <div class="img"><img :src="require('@/assets/images/reward.svg')" /></div>
          <div class="content">
            <div class="label">{{settings.rewardCoin}}</div>
            <div class="value" v-format="'#,##0.00'">{{$etherToNumber(options.rewardBalanceOf)}}</div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div>
          <el-button type="primary" @click="view" round style="width: 100%;">{{$t("fram.detail.mymsg.view")}}</el-button>
        </div>
        <spacev height="10px"/>
        <div>
          <el-button class="light-btn" @click="copy" round style="width: 100%;">{{$t("fram.detail.mymsg.copy")}}</el-button>
        </div>
      </template>
    </liDialog>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import { BigNumber } from 'bignumber.js';
import { WEB3_STATUS } from '@/utils/Constants.js'
import TokenContract from '@/services/Token.js';

export default {
  components:{
  },
  props: ["options"],
  data() {
    return {
      dialogOptions:{
        show: false,
        "append-to-body": true,
        width: "300px"
      },
      getNum: "",
      AVAILABLE: WEB3_STATUS.AVAILABLE,
      Reward: null,
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
        this.dialogOptions.show = newVal.myShow;
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
      const key = "Reward-" + this.options.data.rewardAddress;
      this.Reward = await TokenContract.getInstance(key, this.options.data.rewardAddress, this);

      this.getBalanceOf();
    },
    getRewardInstance(){
      return this.Reward.contract.instance;
    },
    copy(){
      this.$copyText(this.member.account).then(res => {
        this.$message.success(this.$t('common.copied'));
      });
    },
    view(){
      this.$openWindow(this.settings.heco + this.member.account);
    },
    getBalanceOf(){
      this.getRewardInstance().balanceOf(this.member.account).then(res => {
        console.info("rewardBalanceOf", res.toString());
        this.options.rewardBalanceOf = res.toString();
      }).catch(e => {
        console.info(e);
      });
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../styles/element-variables.scss';
.my-dialog{
  .field-area{
    border-radius: 0.625rem;
    box-shadow: $--card-box-shadow;
    background-color: $--form-item-background-color !important;
    border: 1px solid #3AAFA9;
    padding: 0.5rem;
    position: relative;
    text-align: center;
  }
  .img{
    height: 3.125rem;
    width: 3.125rem;
    img{
      height: 2.5rem;
      margin: 0.3125rem;
    }
    position: absolute;
    left: 0.5rem;
  }
  .content{
    margin-left: 3.75rem;
    text-align: left;
    .label{
      font-size: 0.75rem;
      color: $--label-color;
      line-height: 1.25rem;
    }
    .value{
      font-weight: bold;
      color: $--color-primary;
      line-height: 1.875rem;
    }
  }
}
</style>
<style lang="scss">
#fram-detail-dialog-my{
}
</style>
