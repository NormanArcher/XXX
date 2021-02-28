export const watch = {
  "web3Status": function(newVal, oldVal){
    if(newVal && newVal !== this.WEB3_STATUS.UNAVAILABLE && this.initData){
      this.initData();
    }
  }
}
