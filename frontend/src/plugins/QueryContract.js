import TruffleContract from 'truffle-contract'
import Contract from './Contract.js';

class QueryContract extends Contract {
  constructor(contractJSON, address, vue) {
    super(contractJSON, address, vue);
  }

  init(){
    // 创建一个truffle-contract实例,为了初始化合约对象以及拿到原生链上的Web对象！
    this.type = super.init();
    if(this.type=="contract"){
      return this.type;
    }
    this.tc = TruffleContract(this.json);
    this.tc.setProvider(this.vue.$CustomWeb3.web3ProviderQuery);
    console.info("Query Contract init...........");
    return "queryContract";
  }
}

export default QueryContract
