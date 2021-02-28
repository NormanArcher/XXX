<template>
  <div id="fram-logo">
    <div class="fram-charts-overall-img">
      <spacev height="150px"></spacev>
    </div>
    <img src="../../assets/images/logo-big.svg" class="main-logo"></img>
  </div>
</template>

<script>
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
    ]),
  },
}
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
#fram-logo{
  text-align: left;
  .main-logo{
    height: 80px;
  }
  position: relative;
  .fram-charts-overall-img{
    position: absolute;
    top: -38px;
    z-index: -1;
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 0) url('../../assets/images/ss.svg') no-repeat;
    background-position:center top;
  }
}
</style>
<style lang="scss" >
  .mobile {
    .main-logo{
      height: 54px !important;
    }
  }
</style>
