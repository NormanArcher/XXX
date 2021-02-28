<template>
  <div id="fram-pools">
    <div v-if="device==='desktop'">
      <el-row v-for="row in rows" :gutter="20">
        <el-col :span="8" v-for="col in 3">
          <pool v-if="getIndex(row, col) <= pools.length" :data="pools[getIndex(row, col)-1]" />
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <poolMobile v-for="(item, index) in pools" :data="item"/>
    </div>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import { BigNumber } from 'bignumber.js';
import pool from './pool';
import poolMobile from './poolMobile';

export default {
  components:{
    pool, poolMobile
  },
  props: ["pools"],
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
    rows(){
      return (parseInt(this.pools.length / 3) + this.pools.length % 3);
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
    getIndex(row, col){
      return (row - 1)*3 + col;
    }
  }
}
</script>
<style lang="scss" scoped>
#fram-pools{

}
</style>
