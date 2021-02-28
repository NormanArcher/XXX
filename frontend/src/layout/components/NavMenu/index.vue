<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :background-color="backgroundColor"
    :text-color="textColor"
    :unique-opened="false"
    :active-text-color="activeTextColor"
    :collapse-transition="false"
    mode="horizontal"
    class="dark-menu"
    @select="handleSelect"
  >
    <el-menu-item index="0">{{$t("route.home")}}</el-menu-item>
    <!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
    <Permission v-if="settings && settings.features" v-for="route in routes" :permissions="[route.permission]" type="remove">
      <NavMenuItem :key="route.path" :item="route" :base-path="''"/>
    </Permission>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import NavMenuItem from './NavMenuItem'
import variables from '@/styles/variables.scss'
import eleVariables from '@/styles/element-variables.scss'
import Permission from '@/components/Permission/index'

export default {
  components: { NavMenuItem, Permission },
  computed: {
    ...mapGetters([
      'sidebar',
      'settings',
      'device'
    ]),
    backgroundColor(){
      if(this.device == 'desktop'){
        return eleVariables.headerBackgroundColor;
      }
      return eleVariables.bottomBackgroundColor;
    },
    textColor(){
      if(this.device == 'desktop'){
        return variables.menuText;
      }
      return "#B5B5BE";
    },
    activeTextColor(){
      if(this.device == 'desktop'){
        return eleVariables.theme;
      }
      return "#FFFFFF";
    },
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      console.info("current route: ", path);
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    eleVariables() {
      return eleVariables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created(){

  },
  methods:{
    handleSelect(index){
      if(index==0){
        this.$openWindow(this.settings.homeUrl);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/element-variables.scss';
@import '../../../styles/variables.scss';

.dark-menu{
  height: $navbarHeight;
  float: left;
  font-weight: bold !important;
}

</style>
<style lang="scss">
@import '../../../styles/variables.scss';
.el-menu--horizontal {
  border: 0px !important;
  .el-menu-item{
    height: $navbarHeight !important;
    line-height: $navbarHeight !important;
  }
  > .el-menu-item.is-active {
    border-bottom: 0px !important;
  }
}
</style>
