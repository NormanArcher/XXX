<template>
  <div id="navbar">
    <div v-if="device==='mobile'" class="navbar-logo-mobile">
      <img src="../../assets/images/logo-white.svg" class="sidebar-logo"></img>
    </div>
    <div class="navbar">
      <img src="../../assets/images/logo.svg" class="sidebar-logo" v-if="device==='desktop'"></img>
      <NavMenu />
      <div class="right-menu">
        <div style="display: inline-block;" v-if="device==='desktop'">
          <DownloadFarmer class="light-btn-noborder" />
          <el-button v-if="member.account && web3Status != UNAVAILABLE" class="light-btn-noborder" round>
            {{formatterAddress(member.account)}}
          </el-button>
          <el-button v-else class="light-btn-noborder" round @click="connectMetamask">
            {{$t("layout.connect")}}
          </el-button>
          <el-dropdown trigger="click" class="national-dropdown"
                  @command="handleCommand">
            <el-button class="national-btn" round v-if="$i18n.locale=='zh'">
              <svg-icon icon-class="China" class="national"></svg-icon>中文
            </el-button>
            <el-button class="national-btn" round v-else-if="$i18n.locale=='ko'">
              <svg-icon icon-class="SouthKorea" class="national"></svg-icon>한국어
            </el-button>
            <el-button class="national-btn" round v-else-if="$i18n.locale=='en'">
              <svg-icon icon-class="UnitedStates" class="national"></svg-icon>English
            </el-button>
            <el-dropdown-menu slot="dropdown" class="national-dropdown-menu" v-if="settings">
              <el-dropdown-item v-if="!item.hidden" :command="item.name" v-for="item in settings.language"><svg-icon :icon-class="item.class" class="national"></svg-icon>{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="display: inline-block;" v-else>
          <el-button class="light-btn-noborder" round v-if="member.account && web3Status != UNAVAILABLE" icon="el-icon-connection">
            {{$t("layout.connected")}}
          </el-button>
          <el-button class="light-btn-noborder" v-else round @click="connectMetamask" :title="$t('layout.connect')" icon="el-icon-link">
            {{$t("layout.conn")}}
          </el-button>
          <el-dropdown trigger="click" class="national-dropdown"
                  @command="handleCommand">
            <el-button class="national-btn" circle v-if="$i18n.locale=='zh'">
              CN
            </el-button>
            <el-button class="national-btn" circle v-else-if="$i18n.locale=='ko'">
              KO
            </el-button>
            <el-button class="national-btn" circle v-else-if="$i18n.locale=='en'">
              EN
            </el-button>
            <el-dropdown-menu slot="dropdown" class="national-dropdown-menu" v-if="settings">
              <el-dropdown-item v-if="!item.hidden" :command="item.name" v-for="item in settings.language"><svg-icon :icon-class="item.class" class="national"></svg-icon>{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <myDialog :options="options" v-if="options && $route.path=='/farm/detail' && member.account && web3Status != UNAVAILABLE"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import DownloadFarmer from '@/components/DownloadFarmer'
import elementStyle from '@/styles/element-variables.scss';
import { WEB3_STATUS } from '@/utils/Constants.js'
import { getSettings } from '@/api/common.js'
import Cookies from 'js-cookie'
import NavMenu from './NavMenu/index'
import myDialog from '@/views/fram/detail/dialog/my';

export default {
  components: {
    NavMenu,
    Hamburger,
    myDialog,
    DownloadFarmer
  },
  data(){
    return {
      AVAILABLE: WEB3_STATUS.AVAILABLE,
      UNAVAILABLE: WEB3_STATUS.UNAVAILABLE,
      options: null,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'web3',
      'web3Status',
      'member',
      'device',
      'settings'
    ]),
  },
  created(){
    this.options = this.getObjectCache("pool-detail");
  },
  methods: {
    formatterAddress(account){
      let acc = account && this.web3Status != this.UNAVAILABLE ? account : "Connect Metamask";
      return this.formatterLongString(acc, 10, 5, 3);
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async connectMetamask(){
      this.$store.dispatch('app/connectWallet', { web3: this.$CustomWeb3, settings: this.$settings});
    },
    handleCommand(command){
      Cookies.set("language", command, { expires: 7 });
      this.$i18n.locale = command;
    },
    showMy(){
      this.options.myShow = true;
    },
    download(){
      this.$openWindow(this.settings.downloadFarmerUrl);
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/element-variables.scss';
@import '../../styles/variables.scss';
.navbar-logo-mobile{
  display: flex;
  flex-flow: column;
  height: $navbarHeight;
  background: $--bottom-background-color;
  line-height: $navbarHeight;

}
.mobile {
  .navbar{
    background: $--bottom-background-color;
    button.is-circle{
      width: 35.6px !important;
      height: 35.6px !important;
      vertical-align: middle;
      padding: 5px;
    }
    .header-my{
      height: 35.6px;
      font-size: 14px;
      padding-top: 4.8px;
      padding-bottom: 4.8px;
      vertical-align: middle;
      line-height: 24px;
      span{
        line-height: 24px;
      }
      .btn-img{
        margin-top: -4px;
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }
  }
}
.national-dropdown-menu.el-dropdown-menu{
    background-color: $--dropdown-background-color;
    border-color: $--dropdown-background-color;
    .el-dropdown-menu__item{
      color: $--dropdown-color;
    }
    .popper__arrow{
      top: -8px;
      border-color: rgba(0, 0, 0, 0) !important;
    }
    .popper__arrow::after{
      border-bottom-color: $--dropdown-background-color !important;
    }
}
.navbar {
  height: $navbarHeight;
  overflow: hidden;
  position: relative;
  background: $--header-background-color;

  .national-dropdown{
    margin-left: 0.625rem;
  }
  .national{
    width: 2em !important;
    margin-right: 0.3125rem;
  }
  .national-btn{
    background-color: $--dropdown-background-color;
    border-color: $--dropdown-background-color;
    color: $--dropdown-color;
    box-shadow: $--card-box-shadow;
  }

  .vip-icon{
    width:1.875rem !important;
    height:1.875rem !important;
    fill:$--color-primary !important;
    font-weight: bold !important;
    margin-right:0.9375rem !important;
    vertical-align: middle !important;
  }
  .hamburger-container {
    line-height: 2.875rem;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    position: absolute;
    height: 100%;
    right: 0rem;
    top: 0rem;
    line-height: $navbarHeight;
    margin-right: 1.25rem;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 0.5rem;
      height: 100%;
      font-size: $--font-size-base;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
}
</style>
<style lang="scss">
.sidebar-logo {
  float: left;
  height: 24px;
  vertical-align: middle;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  margin-top: 17px;
}
.mobile{
  .sidebar-logo {
    margin-right: 0px;
    margin-left: 5px;
  }
}
</style>
