import store from '@/store'
import QueryContract from '@/plugins/QueryContract';

class BaseContract {

  constructor(key, json, vue, address) {
    this.key = key;
    this.json = json;
    this.vue = vue;
    this.address = address;
    this.contract = null;
  }

  getKey(){
    return this.key;
  }
  getJson(){
    return this.json;
  }
  getVue(){
    return this.vue;
  }

  getContract(){
    return this.contract;
  }

  getContractInstance(){
    return this.contract.instance;
  }

  async initContract(flag){
    // flag = true, 强制初始化
    if(this.contract && this.contract.instance && !flag){
      console.info("Return old instance");
      return this.contract;
    }
    let contractAddress = this.address;
    if(!contractAddress){
      const contracts = store.getters.settings.contracts;
      contractAddress = contracts[this.getKey()];
    }
    if(!contractAddress){
      this.vue.$message.error("The conotract address is error.");
      return this.contract;
    }
    this.contract = new QueryContract(this.getJson(), contractAddress, this.vue);
    if(!this.contract.instance){
      await this.contract.newInstance();
    }
    console.info(`Instance contract ${this.getKey()}(${contractAddress})`);

    return this.contract;
  }
}

BaseContract.getInstance = async function(key, address, vue, contractClass){
  const contractsMap = vue.$store.getters.contracts;
  let instance = contractsMap[key];
  console.info("cache", key, instance);
  if(!instance){
    instance = new contractClass(key, address, vue);
    await instance.initContract();
  }
  vue.$store.dispatch('contract/put', instance);
  return instance;
}

export default BaseContract
