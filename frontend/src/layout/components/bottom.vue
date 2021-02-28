<template>
  <div id="app-bottom">
    <div v-if="!isDesktop" class="app-bottom-btn">
      <el-button class="light-btn-noborder" round @click="rules">{{$t("fram.countdown.rules")}}</el-button>
      <el-button class="light-btn-noborder" round @click="report">{{$t("fram.countdown.report")}}</el-button>
      <el-button class="light-btn-noborder" round @click="doc">{{$t("fram.countdown.doc")}}</el-button>
    </div>
    <div class="app-bottom">
      <div class="copyright">©{{settings ? settings.appName : ''}} 2020 - {{year}}</div>
      <div class="app-bottom-right-area">
        <el-button class="light-btn-noborder" round v-if="isDesktop" @click="rules">{{$t("fram.countdown.rules")}}</el-button>
        <el-button class="light-btn-noborder" round v-if="isDesktop" @click="report">{{$t("fram.countdown.report")}}</el-button>
        <el-button class="light-btn-noborder" round v-if="isDesktop" @click="doc">{{$t("fram.countdown.doc")}}</el-button>
        <el-button class="light-btn-noborder" icon="el-icon-s-promotion" circle @click="telegram"></el-button>
        <el-button class="light-btn-noborder" icon="iconfont icon-twitter" circle @click="twitter"></el-button>
        <el-button class="light-btn-noborder" icon="iconfont icon-reddit" circle @click="reddit"></el-button>
        <el-button class="light-btn-noborder" icon="iconfont icon-github" circle @click="github"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';

export default {
  components:{
  },
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
      'device',
    ]),
    isDesktop(){
      return this.device === 'desktop';
    },
    year(){
      return new Date().getFullYear();
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
    telegram(){
      this.$openWindow(this.settings.telegramUrl);
    },
    twitter(){
      this.$openWindow(this.settings.twitterUrl);
    },
    rules(){
      this.$openWindow(this.settings.ruleUrl);
    },
    report(){
      if(this.$i18n.locale=='zh'){
        this.$openWindow(this.settings.reportUrlCN);
        return;
      }
      this.$openWindow(this.settings.reportUrlEN);
    },
    doc(){
      this.$openWindow(this.settings.docUrl);
    },
    reddit(){
      this.$openWindow(this.settings.redditUrl);
    },
    github(){
      this.$openWindow(this.settings.githubUrl);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
@import '../../styles/variables.scss';
#app-bottom{
  background: $--bottom-background-color;
}
.app-bottom-btn{
  line-height: 50px;
  text-align: center;
  padding: 0px 20px 0px 20px;
}
.app-bottom {
  display: table;
  vertical-align: middle;
  position: fixed;
  z-index: 999;
  bottom: 0px;
  width: calc(100%);
  height: $navbarHeight;
  padding: 0px 5rem 0rem 5rem;
  background: $--bottom-background-color;
  color: #FFFFFF;
  .copyright{
    display: table-cell;
    vertical-align: middle;
  }
  .app-bottom-right-area{
    line-height: $navbarHeight;
    position: absolute;
    right: 5rem;
    top: 0px;
    button.is-circle{
      width: 38.8px !important;
      height: 38.8px !important;
    }
  }
}
.mobile {
  .app-bottom{
    position: relative;
    padding: 0px 10px 0rem 10px;
  }
  .app-bottom-right-area{
    right: 10px;
  }
}

</style>
