<template>
  <div id="fram" class="app-container" v-if="settings">
    <spacev height="50px"></spacev>
    <el-row class="fram-header" :gutter="40" v-if="device==='desktop'">
      <el-col :span="12">
        <logo />
      </el-col>
      <el-col :span="12">
        <overall :pools="pools" />
      </el-col>
    </el-row>
    <div v-else>
      <div class="download-farmer">
        <DownloadFarmer type="primary" style="width: 200px;"/>
      </div>
      <overall :pools="pools" />
      <spacev height="25px"></spacev>
      <countdown :pool="firstPool" />
    </div>
    <spacev height="25px"></spacev>
    <pools :pools="pools" />
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import countdown from './countdown';
import links from './links';
import logo from './logo';
import pools from './pools';
import overall from './overall';
import chart from './chart'
import { getPools } from '@/api/common.js';
import DownloadFarmer from '@/components/DownloadFarmer'

export default {
  components:{
    chart,
    countdown,
    links,
    logo,
    pools,
    overall,
    DownloadFarmer
  },
  data() {
    return {
      CapittalPool: null,
      pools:[],
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
    firstPool(){
      if(this.pools && this.pools.length>0){
        return this.pools[0];
      }
      return null;
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
      this.pools = [];
      getPools().then(res => {
        this.pools = res.data;
      }).catch(e => {
        console.error(e);
      });
      this.initContract();
    },
    async initContract(){

    },
  }
}
</script>
<style lang="scss" scoped>
#fram{
  .fram-header{
    padding: 0px 150px 0px 150px;
    display: flex;
    align-items: center;
  }
  .download-farmer{
    text-align: center;
    line-height: 50px;
    margin-bottom: 50px;
  }
}
</style>
