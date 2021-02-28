import ABIJson from '@/contracts/CapitalPool.json'
import BaseContract from './BaseContract'

class CapitalPoolContract extends BaseContract {
  constructor(key, address, vue) {
    super(key, ABIJson, vue, address);
    this.member = vue.$store.getters.member;
  }
  getRef(){
    this.getContractInstance().referrerMap(this.member.account).then(res=>{
      console.info("referrer", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        referrer: res.toString()
      });
    }).catch(e => {
      console.error(e);
    });
  }
  getBalanceOf(){
    this.getContractInstance().balanceOf(this.member.account).then(res => {
      console.info("balanceOf", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        balanceOf: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getEarned(){
    this.getContractInstance().earned(this.member.account).then(res => {
      console.info("earned", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        earned: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getEarnedByWeight(){
    this.getContractInstance().earnedByWeight(this.member.account).then(res => {
      console.info("earnedByWeight", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        earnedByWeight: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getRewardForDuration(){
    this.getContractInstance().getRewardForDuration().then(res => {
      console.info("rewardForDuration", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        rewardForDuration: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getWeightForDuration(){
    this.getContractInstance().getWeightForDuration().then(res => {
      console.info("weightForDuration", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        weightForDuration: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getRewardsDuration(){
    this.getContractInstance().rewardsDuration().then(res => {
      console.info("rewardsDuration", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        rewardsDuration: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getWeight(){
    this.getContractInstance().weight(this.member.account).then(res => {
      console.info("weight", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        weight: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
}
CapitalPoolContract.getInstance = async function(key, address, vue){
  return BaseContract.getInstance(key, address, vue, CapitalPoolContract);
}
export default CapitalPoolContract
