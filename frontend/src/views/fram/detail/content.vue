<template>
  <div id="fram-detail-content">
    <div class="content-step">
      <el-row>
        <el-col :span="6">
          <space width="1px"></space>
        </el-col>
        <el-col :span="12" class="content-step-header">
          <el-row class="content-step-list">
            <el-col :span="12" class="step-col">
              <div>
                <img :src="require('@/assets/images/item.svg')"/>01
              </div>
            </el-col>
            <el-col :span="12" class="step-col">
              <div>
                <img :src="require('@/assets/images/item.svg')"/>02
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <space width="1px"></space>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20" class="flex-row">
      <el-col :span="6">
        <space width="1px"></space>
      </el-col>
      <el-col :span="6">
        <deposited :options="options" />
      </el-col>
      <el-col :span="6">
        <liquidity :options="options" />
      </el-col>
      <el-col :span="6">
        <space width="1px"></space>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import deposited from './deposited';
import liquidity from './liquidity';

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
      'settings'
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
@import '../../../styles/element-variables.scss';
@import './scss/detail-common.scss';
#fram-detail-content{
  .flex-row {
    display: flex;
    flex-flow: row;
    > .el-col {
      display: flex;
      flex-flow: column nowrap;
      > div {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;
      }
    }
  }
  .content-step{
    .content-step-header{
      height: $detail-step-size;
      position: relative;
    }
    .content-step-list{
      .step-col{
        height: $detail-step-size;
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.875rem;
        img{
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
