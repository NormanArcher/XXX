<template>
  <div id="admin-swtich">
    <adminCard>
      <template slot="title">
        {{$t("admin.acceptAdmin")}}
      </template>
      <template slot="input" v-if="isAdmin || isPendingAdmin">
        <el-input class="disabled" disabled :value="$t('admin.adminTip')"></el-input>
      </template>
      <template slot="input" v-else>
        <el-input class="disabled" disabled :value="admin"></el-input>
      </template>
      <template slot="btn">
        <el-button :disabled="!isPendingAdmin" :class="{'green-btn': isPendingAdmin}" @click="accept" round style="width: 50%;">{{$t("admin.btnAccept")}}</el-button>
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
  props: ["admin", "pendingAdmin"],
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
    isAdmin(){
      return this.admin && this.admin.toUpperCase() == this.member.account.toUpperCase();
    },
    isPendingAdmin(){
      return this.pendingAdmin && this.pendingAdmin.toUpperCase() == this.member.account.toUpperCase();
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
    accept(){
      this.$emit("accept");
    }
  }
}
</script>
<style lang="scss" scoped>
#admin-swtich{
  .green-btn{
    background-color: #0088FF;
    border-color: #0088FF;
    color: #FFFFFF;

  }
  .green-btn:active{
    opacity: 0.8;
  }
}
</style>
<style lang="scss">
#admin-swtich{
  .disabled{
    input{
      background-color: rgba(0, 136, 255, 0.1) !important;
      border-color: rgba(0, 136, 255, 0.1) !important;
      border-radius: 10px;
    }
  }
}
</style>
