import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import { BigNumber } from 'bignumber.js';

export default {
  components:{
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
      'device',
    ]),
    rewardTotalSupply(){
      return this.member.totalSupply;
    },
    formatRewardTotalSupply(){
      return this.textFormat(parseFloat(this.$etherToNumber(this.rewardTotalSupply).toString()), "#,##0.0");
    },
    totalStakedValue(){
      if(this.pools.length==0){
        return "0";
      }
      return this.pools.map(item => {
        return BigNumber(this.$etherToValue(item.totalSupply)).times(item.price)
      }).reduce((total, item) => BigNumber(total).plus(item)).toString();
    },
    formatTotalStakedValue(){
      return this.textFormat(parseFloat(this.totalStakedValue), "#,##0.0");
    },
    formatRewardTotalSupplyValue(){
      const value = BigNumber(this.$etherToNumber(this.rewardTotalSupply)).times(this.member.price).toString();
      return this.textFormat(parseFloat(value), "#,##0.0");
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
  }
}