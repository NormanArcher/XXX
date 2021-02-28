<template>
  <div id="fram-detail-header" v-if="settings">
    <div class="header-img" v-if="device==='desktop'">
      <img :src="options.data.icon" />
    </div>
    <div class="title">
      {{$t("fram.detail.common.desc", {
        poolCoin: options.data.poolCoin,
        rewardCoin: settings.rewardCoin
      })}}
    </div>
    <spacev height="10px"></spacev>
    <div class="sub-title">{{settings.rewardCoin}} =
      <span class="green">{{formatPrice}} USDT</span>
    </div>
    <div class="right-area">
      <el-button type="primary" round @click="my">
        <img class="btn-img" :src="require('@/assets/images/logo-mini.svg')" />
        {{$t("fram.detail.my")}}{{settings.rewardCoin}}
      </el-button>
    </div>
    <links :options="options" v-if="options.data.liquidity=='yes'" />
    <spacev height="50px" v-if="device==='desktop'"></spacev>
    <myDialog :options="options" />
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import myDialog from './dialog/my';
import links from '../links';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
    myDialog, links
  },
  props:["options"],
  data() {
    return {
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
    formatPrice(){
      return BigNumber(this.member.price).toFixed(2);
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
    },
    my(){
      this.options.myShow = true;
    }
  }
}
</script>
<style lang="scss">
#fram-detail-header{
  position: relative;
  line-height: 1.875rem;
  text-align: center;
  .header-img{
    img{
      height: 90px;
    }
    margin: 20px;
  }
  .title{
    font-size: 1.75rem;
    font-weight: bold;
  }
  .sub-title{
    font-size: 1rem;
  }
  .right-area{
    position: absolute;
    top: 0rem;
    right: 0rem;
    height: 5rem;
    .btn-img{
      height: 1.4375rem;
      vertical-align: middle;
    }
  }
}
.mobile{
  #fram-detail-header{
    position: relative;
    .title{
      font-size: 18px;
      font-weight: bold;
      line-height: 32px;
    }
    .sub-title{
      font-size: 1rem;
    }
    .right-area{
      position: static;
      height: 3.75rem;
      margin-top: 20px;
      .el-button{
        padding: 8px 15px 8px 15px;
        .btn-img{
          height: 18px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
