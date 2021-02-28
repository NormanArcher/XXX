<template>
  <div id="fram-detail-content-auth" v-loading.fullscreen.lock="loading"
        :element-loading-text="$t('common.confirmTran')">
    <el-button type="primary" @click="auth" :disabled="isAuth" round style="width: 100%;">{{$t("fram.detail.auth.authBtn")}}</el-button>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import detailCard from './card';
import TokenContract from '@/services/Token.js';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
    detailCard
  },
  props: ["options"],
  data() {
    return {
      Token: null,
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
    isAuth(){
      const isAuth = BigNumber(this.options.auth).gt(0);
      this.updateStep(isAuth);
      return isAuth;
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
      const key = "Token-" + this.options.data.tokenAddress;
      this.Token = await TokenContract.getInstance(key, this.options.data.tokenAddress, this);

      this.getAuth();
    },
    getTokenInstance(){
      return this.Token.contract.instance;
    },
    getAuth(){
      this.getTokenInstance().allowance(this.member.account, this.options.data.poolAddress).then(res => {
        this.options.auth = res.toString();
        console.info(this.options);
      }).catch(e=>{
        console.error("auth", e);
      })
    },
    auth(){
      this.loading = true;
      this.getTokenInstance().approve(this.options.data.poolAddress, this.$MaxUint256, { from: this.member.account }).then(res => {
        this.$message.success(this.$t("common.tranSuccess"));
        this.options.auth = this.$MaxUint256;
      }).catch(e=>{
        this.$message.error(e.message);
        console.error(e);
      }).finally(()=>{
        this.loading = false;
      });
    },
    updateStep(auth){
      this.options.actives.auth = !auth;
      this.options.actives.deposited = auth;
      this.options.actives.liquidity = auth;
      this.options.actives.contribution = auth;
    }
  }
}
</script>
<style lang="scss" scoped>
#fram-detail-content-auth{
  .unauth{
    color: #FC5A5A;
    font-size: 1.9375rem;
  }
  .auth{
    color: #3DD598;
    font-size: 1.9375rem;
  }
  .auth-text{
    font-size: 0.875rem;
  }
}
</style>
