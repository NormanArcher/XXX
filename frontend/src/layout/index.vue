<template>
  <div :class="classObj" class="app-wrapper" v-loading.fullscreen.lock="appLoading"
    element-loading-text="Application is loading ...">
    <div :class="{'main-container': true, 'background': $route.path=='/farm/index' && device==='desktop'}" v-if="!showError">
      <div :class="{'fixed-header':fixedHeader, 'fixed-header-index': $route.path=='/farm/index'}">
        <navbar />
      </div>
      <app-main />
      <bottom/>
    </div>
    <el-dialog
      :title="$t('layout.tip')"
      :visible="showError"
      width="31.25rem"
      :close-on-click-moda="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      >
      <div v-if="tooltipType=='network'">
        <h1>{{$t('layout.network.unsupported')}}</h1>

        <span class="secondary-text"><svg-icon icon-class="circle" class="icon error-color"></svg-icon>
        {{$t('layout.network.switch')}}
        </span>
      </div>
      <div v-else>
        <h1>{{$t('layout.metamask.uninstall')}}</h1>

        <span class="secondary-text">
          <svg-icon icon-class="circle" class="icon error-color"></svg-icon>
          {{$t('layout.metamask.install')}}
          <el-button type="text" @click="downloadMetamask">{{$t('layout.metamask.download')}}</el-button>.<br/>
          {{$t('layout.metamask.installed')}}
          <el-button type="text" @click="reloadPage">{{$t('layout.metamask.reload')}}</el-button>.
        </span>
      </div>


    </el-dialog>
  </div>
</template>

<script>
import { Navbar, bottom, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
import { getSettings } from '@/api/common.js'
import NavMenu from './components/NavMenu/index'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    NavMenu,
    bottom
  },
  data(){
    return {
      tooltipType:"network",
      SOTEMaster:null,
    }
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'web3',
      'member',
      'settings',
      'web3Status',
      'loading',
      'device'
    ]),
    appLoading(){
      return this.loading || this.member.loading;
    },
    showError(){
      return false;
      if(this.web3 && this.web3.web3Provider && this.settings){
        const isMetaMask = this.web3.web3Provider.isMetaMask;
        if(!isMetaMask){
          //没有安装metamask
          this.tooltipType = "noMetaMask";
          return true;
        }
        const version = this.web3.web3Provider.networkVersion;
        const defaultVersion = this.settings.networkVersion;
        //判断网络是否正确
        this.tooltipType = "network";
        return version != defaultVersion;
      }
      return false;
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch:{
    "member.account":function(newVal, oldVal){
      if(newVal != oldVal && this.web3Status === this.WEB3_STATUS.AVAILABLE){
        this.initData();
      }
    }
  },
  created(){
    this.initWeb3();
  },
  methods: {
    initData(){
      //this.$Bus.$emit(this.$EventNames.initMember, this);
    },
    reloadPage(){
      window.location.reload();
    },
    downloadMetamask(){
      this.$openWindow("https://metamask.io/");
    },
    async initWeb3(){
      // 入口初始化系统配置及web3，TruffleContract工具类
      const response = await getSettings();
      const settings = response.data;
      console.info("settings:", settings);
      this.$store.dispatch("settings/changeSetting", { key: "settings", value: settings });
      this.$store.dispatch('app/setWeb3', { web3: this.$CustomWeb3, settings: settings});
    },

    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/mixin.scss";
  @import "../styles/variables.scss";
  @import '../styles/element-variables.scss';
  .mobile-navmenu{
    margin-top: 0.25rem;
    width: 100%;
    height: $navbarHeight;
    background-color: $--header-background-color;
  }
  .icon{
    margin-right: 0.625rem;
  }
  .secondary-text{
    margin-bottom: 2.5rem;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100%);
    transition: width 0.28s;
    background-color: $--background-color;
  }
  .fixed-header-index {
    background-color: rgba($color: #000000, $alpha: 0);
    position: relative;
  }

  .hideSidebar .fixed-header {
    width: calc(100%)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
