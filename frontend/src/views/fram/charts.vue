<template>
  <div id="fram-charts">
    <el-row :gutter="20" v-if="device==='desktop'">
      <el-col :span="8">
        <overall :pools="pools" />
      </el-col>
      <el-col :span="16">
        <chart />
      </el-col>
    </el-row>
    <div v-else>
      <chart />
      <spacev height="20px"></spacev>
      <overall :pools="pools" />
    </div>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import overall from './overall'
import chart from './chart'

export default {
  components:{
    chart,
    overall
  },
  props:["pools"],
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
  }
}
</script>
<style lang="scss" scoped>
#fram-charts{

}
</style>
