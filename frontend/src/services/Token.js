import ABIJson from '@/contracts/Token.json'
import BaseContract from './BaseContract'

class TokenContract extends BaseContract {
  constructor(key, address, vue) {
    super(key, ABIJson, vue, address);
    this.member = vue.$store.getters.member;
    this.poolOptions = vue.$store.getters.poolOptions;
  }
  getTokenBalanceOf(){
    this.getContractInstance().balanceOf(this.member.account).then(res => {
      console.info("tokenBalanceOf", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        tokenBalanceOf: res.toString()
      });
    }).catch(e => {
      console.info(e);
    });
  }
  getAuth(){
    this.getContractInstance().allowance(this.member.account, this.poolOptions.data.poolAddress).then(res => {
      console.info("auth", res.toString());
      this.vue.$store.dispatch("pool/changeOptions", {
        auth: res.toString()
      });
    }).catch(e=>{
      console.error(e);
    })
  }

  auth(){
    this.vue.loading = true;
    this.getTokenInstance().approve(this.poolOptions.data.poolAddress, this.vue.$MaxUint256, { from: this.member.account }).then(res => {
      this.vue.$message.success(this.vue.$t("common.tranSuccess"));
      this.vue.$store.dispatch("pool/changeOptions", {
        auth: this.vue.$MaxUint256
      });
    }).catch(e=>{
      this.vue.$message.error(e.message);
      console.error(e);
    }).finally(()=>{
      this.vue.loading = false;
    });
  }
}
TokenContract.getInstance = async function(key, address, vue){
  return BaseContract.getInstance(key, address, vue, TokenContract);
}
export default TokenContract
