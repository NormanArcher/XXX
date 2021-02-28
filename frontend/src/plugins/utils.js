import { BNB_BYTE8, CLA_BYTE } from '@/utils/Constants.js'
import Moment from 'moment';
import { ROUTE_NAMES } from '@/utils/Constants.js'
import { BigNumber } from 'bignumber.js'
import { WEB3_STATUS } from '@/utils/Constants.js'

export default {
  install : function (Vue, options){
    function formatterLongString(str, maxLength, prefixLength, suffixLength){
      if(str.length > maxLength){
        str = str.substring(0, prefixLength) + "..." + str.substring(str.length-suffixLength);
      }
      return str;
    }

    function getNumber(value){
      let newValue = value.replace(/[^0-9\.]/g, "");
      newValue = newValue.replace(/(\d)(\.)(\d*)(\2*)(\d*)/g, "$1$2$3$5");
      return newValue;
    }
    function getInteger(value){
      let newValue = getNumber(value);
      newValue = newValue.replace(/\./g, "");
      return newValue;
    }

    function secondsToDateString(seconds, fmt) {
      return Moment(new Date(parseInt(seconds) * 1000)).format(fmt ? fmt : 'DD/MM/YYYY');
    }

    function cacheObject(key, data){
      localStorage.setItem(key, JSON.stringify(data));
    }

    function cacheValue(key, value){
      localStorage.setItem(key, value);
    }

    function getObjectCache(key){
      const str = localStorage.getItem(key);
      if(str!=null){
        return JSON.parse(str);
      }
      return null;
    }

    function getValueCache(key){
      return localStorage.getItem(key);
    }

    function toFixed(value){
      return BigNumber(value).toFixed(2, 1);
    }

    function warningNotify(message){
      this.$notify({
        message: message,
        offset: 50,
        customClass: "notify-warning",
        iconClass: "el-icon-warning-outline"
      });
    }

    function checkConnect(){
      if(this.$store.getters.web3Status === WEB3_STATUS.UNAVAILABLE
        || this.$store.getters.web3Status === WEB3_STATUS.NOT_CONNECT){
        this.$warningNotify(this.$t("fram.pool.connect"));
        return false;
      }
      if(this.$store.getters.web3Status === WEB3_STATUS.NETWORK_ERROR){
        this.$warningNotify(this.$t("fram.pool.network"));
        return false;
      }
      return true;
    }

    function openWindow(url, refresh){
      window.location.href = url;
    }

    Vue.prototype.formatterLongString = formatterLongString;
    Vue.prototype.getNumber = getNumber;
    Vue.prototype.getInteger = getInteger;
    Vue.prototype.$BNB_BYTE8 = BNB_BYTE8;
    Vue.prototype.$CLA_BYTE = CLA_BYTE;
    Vue.prototype.$secondsToDateString = secondsToDateString;
    Vue.prototype.$RouteNames = ROUTE_NAMES;
    Vue.prototype.cacheObject = cacheObject;
    Vue.prototype.cacheValue = cacheValue;
    Vue.prototype.getObjectCache = getObjectCache;
    Vue.prototype.getValueCache = getValueCache;
    Vue.prototype.$toFixed = toFixed;
    Vue.prototype.$warningNotify = warningNotify;
    Vue.prototype.checkConnect = checkConnect;
    Vue.prototype.$openWindow = openWindow;
  }
}
