<template>
  <div id="fram-detail-content-deposited">
    <detail-card>
      <template slot="image">
        <img :src="options.data.icon" />
      </template>
      <template slot="title" v-if="options.data.liquidity=='yes'">
        {{options.data.poolCoin}}({{options.data.subCoin1}}-{{options.data.subCoin2}})
      </template>
      <template slot="title" v-else>
        {{options.data.poolCoin}}
      </template>
      <template slot="label">
        {{$t("fram.pool.deposited")}}
      </template>
      <template slot="value">
        <div v-format="'#,##0.00'">{{$etherToNumber(options.balanceOf)}}</div>
      </template>
      <template slot="btn">
        <el-row :gutter="15" v-if="options.actives.auth">
          <el-col :span="24">
            <auth :options="options" />
          </el-col>
        </el-row>
        <el-row :gutter="15" v-else-if="hasBalance">
          <el-col :span="12">
            <el-button type="primary" :disabled="options.actives.auth" @click="deposit" round style="width: 100%;">{{$t("fram.detail.deposited.depositBtn")}}</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="dark-btn" :disabled="options.actives.auth" @click="ransom" round style="width: 100%;">{{$t("fram.detail.deposited.ransomBtn")}}</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-else>
          <el-col :span="24">
            <el-button type="primary" :disabled="options.actives.auth" @click="deposit" round style="width: 100%;">{{$t("fram.detail.deposited.depositBtn")}}</el-button>
          </el-col>
        </el-row>
      </template>
    </detail-card>
    <depositedDialog :options="options" />
    <ransomDialog :options="options" />
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import auth from './auth';
import detailCard from './card';
import formItem from './formItem'
import depositedDialog from './dialog/deposited';
import ransomDialog from './dialog/ransom';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
    detailCard, formItem, depositedDialog, ransomDialog, auth
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
      'web3Status',
      'settings'
    ]),
    hasBalance(){
      return BigNumber(this.options.balanceOf).gt(0);
    },
    allEarned(){
      return BigNumber(this.options.earnedByWeight).plus(this.options.earned).toString();
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
    deposit(){
      this.options.depositShow = true;
    },
    ransom(){
      this.options.ransomShow = true;
    }
  }
}
</script>
<style lang="scss" scoped>
#fram-detail-content-deposited{

}
</style>
