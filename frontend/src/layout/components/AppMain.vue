<template>
  <section :class="{'app-main':true, 'app-main-mobile': $route.path=='/farm/index'}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <div class="footer" v-if="device==='desktop'"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TokenContract from '@/services/Token.js';
import { BigNumber } from 'bignumber.js';
import { watch } from '@/utils/watch.js';

export default {
  name: 'AppMain',
  data() {
    return {
      Tokenreward: null,
      TokenUSDT: null,
    }
  },
  computed: {
    ...mapGetters([
      'device',
      'web3Status',
      'settings'
    ]),
    key() {
      return this.$route.path
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
      if(this.web3Status !== this.WEB3_STATUS.UNAVAILABLE){
        this.initContract();
      }
    },
    async initContract(){
      const rewardAddress = this.settings.rewardAddress;
      this.Tokenreward = await TokenContract.getInstance("Token-" + rewardAddress, rewardAddress, this);
      const usdtAddress = this.settings.usdtAddress;
      this.TokenUSDT = await TokenContract.getInstance("Token-" + usdtAddress, usdtAddress, this);
      this.getPrice();
      this.getTotalSupply();
    },
    async getPrice(){
      const rewardInstance = this.Tokenreward.contract.instance;
      const usdtInstance = this.TokenUSDT.contract.instance;

      const rewardBalance = await rewardInstance.balanceOf(this.settings.tradeAddress);
      const usdtBalance = await usdtInstance.balanceOf(this.settings.tradeAddress);
      console.info("reward:", rewardBalance.toString(), usdtBalance.toString());
      const price = BigNumber(usdtBalance.toString()).div(rewardBalance.toString()).toString();
      console.info("reward price:", price);
      this.$store.dispatch("member/changeMember", { key: "price", value: price });
    },
    async getTotalSupply(){
      const rewardInstance = this.Tokenreward.contract.instance;
      const totalSupply = await rewardInstance.totalSupply();
      console.info("totalSupply:", totalSupply.toString());
      this.$store.dispatch("member/changeMember", { key: "totalSupply", value: totalSupply.toString() });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - #{$navbarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  .footer{
    height: $navbarHeight;
    width: 100%;
  }
}
.fixed-header+.app-main {
  margin-top: $navbarHeight;
}
.fixed-header+.app-main.app-main-mobile {
  margin-top: 0px;
}
.app-main-mobile{
  background-image: url('../../assets/images/mobile-bg.svg');
  background-position: right top;
  background-repeat: no-repeat;
}
</style>

<style lang="scss">
@import '../../styles/variables.scss';
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    //padding-right: 0.9375rem;
  }
}
.mobile{
  .fixed-header+.app-main {
    margin-top: calc(#{$navbarHeight} + #{$navbarHeight});
  }
  .fixed-header+.app-main.app-main-mobile {
    margin-top: 0px;
  }
}
</style>
