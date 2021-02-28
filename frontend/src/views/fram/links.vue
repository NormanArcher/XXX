<template>
  <div id="fram-links">
    <div v-if="device==='desktop'">
      <el-button class="light-btn-noborder" round @click="exchange">{{$t("fram.chart.exchange")}}</el-button>
      <el-button class="light-btn-noborder" round @click="add">{{$t("fram.chart.add")}}</el-button>
    </div>
    <div v-else>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-button class="dark-btn-noborder" style="width:100%;" round @click="exchange">{{$t("fram.chart.exchange")}}</el-button>
        </el-col>
        <el-col :span="12">
          <el-button class="dark-btn-noborder" style="width:100%;" round @click="add">{{$t("fram.chart.add")}}</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components:{
  },
  props: ["options"],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'web3',
      'member',
      'settings',
      'device'
    ]),
  },

  methods: {
    exchange(){
      const url = this.settings.exchangeUrl.replace("${inputCurrency}", this.options.data.inputAddress)
            .replace("${outputCurrency}", this.options.data.outputAddress);
      this.$openWindow(url);
    },
    add(){
      const url = this.settings.addLiquidityUrl.replace("${inputCurrency}", this.options.data.inputAddress)
            .replace("${outputCurrency}", this.options.data.outputAddress);
      this.$openWindow(url);
    },
  }
}
</script>
<style lang="scss" scoped>
#fram-links{
  margin: 10px 0px 10px 0px;
  text-align: center;
  .light-btn-noborder{
    width: 200px;
  }
}
</style>
<style lang="scss" >

</style>
