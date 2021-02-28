<template>
  <div id="admin-defaultCard">
    <adminCard>
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <template slot="input">
        <el-input v-if="type=='int'" v-model="input" :placeholder="$t('admin.inputNumber')" @input="checkInteger"></el-input>
        <el-input v-else v-model="input" :placeholder="$t('admin.inputAddress')"></el-input>
      </template>
      <template slot="btn">
        <el-button type="primary" @click="confirm" round style="width: 50%;">{{$t("admin.btnConfirm")}}</el-button>
      </template>
    </adminCard>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import adminCard from './card';

export default {
  components:{
    adminCard
  },
  props:["type"],
  data() {
    return {
      input: "",
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
    confirm(){
      this.$emit("confirm", this.input);
    },
    checkInteger(value){
      let newValue = this.getInteger(value);
      this.input = newValue;
      return newValue;
    }
  }
}
</script>
<style lang="scss" scoped>
#admin-defaultCard{

}
</style>
