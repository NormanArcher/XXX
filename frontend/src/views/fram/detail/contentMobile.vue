<template>
  <div id="fram-detail-content-mobile">
    <el-row class="content-mobile-row">
      <el-col>
        <div class="content-step-item">
          <div>
            <img :src="require('@/assets/images/item.svg')"/>01
          </div>
          <div class="content-card"><deposited :options="options" /></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="content-mobile-row">
      <el-col>
        <div class="content-step-item">
          <div>
            <img :src="require('@/assets/images/item.svg')"/>02
          </div>
          <div class="content-card"><liquidity :options="options" /></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import deposited from './deposited';
import liquidity from './liquidity';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
    deposited, liquidity
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
    getRealIndex(index){
      if(this.options.data.liquidity=='no'){
        return "0" + index;
      }else{
        return "0" + (index+1);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#fram-detail-content-mobile .content-mobile-row:first-child{

}
#fram-detail-content-mobile{
  .content-step-item{
    position: relative;
    display: flex;
    flex-flow: column;
    /*实现垂直居中*/
    align-items: center;
    justify-content: center;
    font-size: 1.875rem;
    font-weight: bold;
    margin-top: 20px;
    img{
      vertical-align: middle;
      margin-right: 5px;
    }
    .content-card{
      width: 85%;
      display: inline-block;
    }
  }
}
</style>
