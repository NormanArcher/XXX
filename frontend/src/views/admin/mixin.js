import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import defaultCard from './defaultCard';
import acceptadmin from './acceptadmin';
import poolsDrop from './poolsDrop';
import rewardDrop from './rewardDrop';
import { getPools } from '@/api/common.js';
import CapitalPoolContract from '@/services/CapitalPool.js';
import TokenContract from '@/services/Token.js';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
    acceptadmin, defaultCard, poolsDrop, rewardDrop
  },
  data() {
    return {
      pools: [],
      poolAddress: "",
      rewardAddress: "",
      adminAddress: "",
      pendingAdminAddress: "",
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'web3',
      'member',
      'web3Status',
      'settings'
    ]),
    poolslist(){
      const list = [];
      this.pools.forEach(item=>{
        if(list.filter(pool=>pool.poolAddress===item.poolAddress).length==0){
          list.push(item);
        }
      });
      return list;
    },
    rewardlist(){
      const list = [];
      this.pools.forEach(item=>{
        if(list.filter(pool=>pool.rewardAddress===item.rewardAddress).length==0){
          list.push(item);
        }
      });
      return list;
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
    },
    changeRewardDrop(rewardAddress){
      this.getAdmin();
      this.getPendingAdmin();
    },
    async getPoolInstance(){
      const key = "Pool-" + this.poolAddress;
      const contract = await CapitalPoolContract.getInstance(key, this.poolAddress, this);
      return contract.contract.instance;
    },
    async getRewardInstance(){
      const key = "Reward-" + this.rewardAddress;
      const contract = await TokenContract.getInstance(key, this.rewardAddress, this);
      return contract.contract.instance;
    },
    checkCommon(type){
      if(!this.checkConnect()){
        return false;
      }
      if(type == "reward" && this.rewardAddress.length<=0){
        this.$message.error(this.$t('admin.pools.rewardAddress'));
        return false;
      }
      if(type == "pool" && this.poolAddress.length<=0){
        this.$message.error(this.$t('admin.pools.poolAddress'));
        return false;
      }

      return true;
    },
    async switchAdmin(address){
      if(address.length<=0){
        this.$message.error(this.$t('admin.messages.address'));
        return;
      }
      if(this.checkCommon("reward")){
        this.loading = true;
        const instance = await this.getRewardInstance();
        instance.setPendingGov(address, {from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async acceptAdmin(){
      if(this.checkCommon("reward")){
        this.loading = true;
        const instance = await this.getRewardInstance();
        instance.acceptGov({from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async addPerson(address){
      if(address.length<=0){
        this.$message.error(this.$t('admin.messages.address'));
        return;
      }
      if(this.checkCommon("reward")){
        this.loading = true;
        const instance = await this.getRewardInstance();
        instance.addMinter(address, {from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async createCoins(number){
      if(number.length<=0 || BigNumber(number).eq(0)){
        this.$message.error(this.$t("error.isNotAmount"));
        return;
      }
      if(this.checkCommon("reward")){
        const amount = this.$ether(number).toString();
        this.loading = true;
        const instance = await this.getRewardInstance();
        instance.mint(this.member.account, amount, {from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async switchPoolAdmin(address){
      if(address.length<=0){
        this.$message.error(this.$t('admin.messages.address'));
        return;
      }
      if(this.checkCommon("pool")){
        this.loading = true;
        const instance = await this.getPoolInstance();
        instance.transferOwnership(address, {from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async addPoolPerson(address){
      if(address.length<=0){
        this.$message.error(this.$t('admin.messages.address'));
        return;
      }
      if(this.checkCommon("pool")){
        this.loading = true;
        const instance = await this.getPoolInstance();
        instance.setRewardDistribution(address, {from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async createWater(number){
      if(number.length<=0 || BigNumber(number).eq(0)){
        this.$message.error(this.$t("error.isNotAmount"));
        return;
      }
      if(this.checkCommon("pool")){
        const amount = this.$ether(number).toString();
        this.loading = true;
        const instance = await this.getPoolInstance();
        instance.notifyRewardAmount(amount, {from: this.member.account}).then(res=>{
          this.$message.success(this.$t("common.tranSuccess"));
          console.info(res, res.toString());
        }).catch(e=>{
          this.$message.error(e.message);
          console.error(e);
        }).finally(()=>{
          this.loading = false;
        });
      }
    },
    async getAdmin(){
      const instance = await this.getRewardInstance();
      instance.governance().then(res=>{
        this.adminAddress = res.toString();
        console.info(res, res.toString());
      }).catch(e=>{
        console.error(e);
      });
    },
    async getPendingAdmin(){
      const instance = await this.getRewardInstance();
      instance.pendingGov().then(res=>{
        this.pendingAdminAddress = res.toString();
        console.info(res, res.toString());
      }).catch(e=>{
        console.error(e);
      });
    }
  }
}
