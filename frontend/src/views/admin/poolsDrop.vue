<template>
  <div id="admin-pools">
    <span>{{$t('admin.pools.poolManage')}}</span>
    <space width="20px"></space>
    <el-select v-model="poolAddress" :placeholder="$t('admin.pools.poolAddress')" @change="selectedPool">
      <el-option
        v-for="item in pools"
        :key="item.poolAddress"
        :label="item.poolAddress"
        :value="item.poolAddress">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';

export default {
  components:{
  },
  props: ["pools", "value"],
  data() {
    return {
      poolAddress: ""
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
    selectedPool(){
      this.$emit("input", this.poolAddress);
      this.$emit("change", this.poolAddress);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
#admin-pools{
  width: 100%;
  background-color: $--front-background-color;
  box-shadow: $--card-box-shadow;
  border-radius: 20px;
  margin-right: 1.25rem;
  padding: 1.25rem;
  font-size: $--font-size-base;
}
</style>
