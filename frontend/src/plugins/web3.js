import Web3 from 'web3'
import store from '@/store'
import { WEB3_STATUS } from '@/utils/Constants.js'
import { initMember, getAllowance, getBalance, getWBalance } from '@/api/common.js'
import Bus from '@/utils/eventBus.js'
import { BigNumber } from 'bignumber.js'

export default {
  install : function (Vue, options){
    Vue.prototype.WEB3_STATUS = WEB3_STATUS;
    Vue.prototype.$EventNames = Bus.$EventNames;
    Vue.prototype.$Bus = Bus;
    Vue.prototype.$MaxUint256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    Vue.prototype.$settings = null;
    Vue.$settings = null;

    var CustomWeb3 = {
        Bus: Bus,
        web3: null,
        web3Provider: null,
        web3Query: null,
        web3ProviderQuery: null,
        account: null, //当前用户账户地址
        checkNetwork: function(){
          const defaultNetwork = Vue.$settings.networkVersion;
          const currentNetwork = this.web3Provider.networkVersion;
          store.dispatch('settings/changeSetting', {key: "currentVersion", value: currentNetwork});
          if(defaultNetwork == currentNetwork){
            // 网络一致时才初始化合约相关的数据
            console.info("Network is current, initializing global events.");
            store.dispatch('app/setWeb3Status', WEB3_STATUS.AVAILABLE);
          }else{
            store.dispatch('app/setWeb3Status', WEB3_STATUS.NETWORK_ERROR);
          }
        },
        connectWallet: async function(settings){
          if (window.ethereum) {
            this.web3Provider = window.ethereum;
            try {
              console.info("Request account access");
              // Request account access
              await window.ethereum.enable();
            } catch (error) {
              // User denied account access...
              console.error("User denied account access")
              if(error.code == -32002){
                this.Bus.$message.error(error.message);
                return this;
              }
              this.Bus.$message.error("User denied account access");
            }
          }

          if(window.ethereum){
            this.web3 = new Web3(this.web3Provider);
            this.account = window.ethereum.selectedAddress;
            this.initEvent();
            this.initVueEvent();
            this.checkNetwork();
          }else{
            store.dispatch('app/setWeb3Status', WEB3_STATUS.UNAVAILABLE);
          }
          store.dispatch('member/setAccount', this.account);
        },
        initWeb3: async function(settings){
          Vue.$settings = settings;
          Vue.prototype.$settings = settings;
          // If no injected web3 instance is detected, fall back to Ganache
          this.web3ProviderQuery = new Web3.providers.HttpProvider(settings.networkUrl);

          this.web3Query = new Web3(this.web3ProviderQuery);

          const web3StatusOfSession = window.sessionStorage.getItem("web3Status");
          if(web3StatusOfSession == WEB3_STATUS.AVAILABLE || web3StatusOfSession == WEB3_STATUS.NETWORK_ERROR){
            await this.connectWallet(settings);
            store.dispatch('app/loadingComplete');
          }else{
            store.dispatch('app/setWeb3Status', WEB3_STATUS.NOT_CONNECT);
            store.dispatch('app/loadingComplete');
          }

          return this;
        },

        initEvent(){
          this.web3Provider.on("accountsChanged", (accounts)=>{
            if(accounts && accounts.length>0){
              this.Bus.$message.warning("Account changed");
              this.account = accounts[0];
            }else{
              this.Bus.$message("Account disconnect ");
              this.account = null;
            }
            store.dispatch("member/setAccount", this.account);
            // 触发一组事件
            this.Bus.$emitGroup(this.Bus.$EventNames.switchAccount, this.account);
          });
          this.web3Provider.on("networkChanged", ()=>{
            console.info("networkChanged", this.web3Provider.networkVersion);
            this.checkNetwork();
          });
        },
        initVueEvent(){
          // this.Bus.$on(this.Bus.$EventNames.initMember, (vue)=>{
          //   store.dispatch("member/setLoading", true);
          //   initMember(vue);
          // });
          // this.Bus.$on(this.Bus.$EventNames.refreshBalance, (vue)=>{
          //   getBalance(vue);
          //   getWBalance(vue);
          //   this.web3.eth.getBalance(this.account).then((response)=>{
          //       console.info("Account Balance: ", response.toString());
          //       store.dispatch("member/setAccountBalance", response.toString());
          //   });
          // });
        },
    };

    function ether(n) {
      let utils = Web3.utils;
      const bn = new utils.BN(utils.toWei(n, 'ether'));
      return bn.toString();
    }
    // 默认保留小数点后两位
    function etherToNumber(n) {
      if(n == null || n == undefined){
        return n;
      }
      let utils = Web3.utils;
      return BigNumber(utils.fromWei(n.toString(), 'ether').toString()).toFixed(2, 1);
    }
    
    // 全部返回
    function etherToValue(n) {
      if(n == null || n == undefined){
        return n;
      }
      let utils = Web3.utils;
      return utils.fromWei(n.toString(), 'ether').toString();
    }

    Vue.prototype.$CustomWeb3 = CustomWeb3;
    Vue.prototype.$ether = ether;
    Vue.prototype.$etherToNumber = etherToNumber;
    Vue.prototype.$etherToValue = etherToValue;
  }
}
