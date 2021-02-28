<template>
  <div id="fram-chart">
    <div class="fram-card" v-if="pricesData">
      <div :class="{'fram-card-header': true}">
        <div class="fram-chart-title">
          <img :src="pricesData.icon" />
          <span>{{pricesData.name}}</span>

          <space width="15px" />
          <span class="sub-title">
            <svg-icon icon-class="circle" :class="{'error-color': !isUp, 'green': isUp}"></svg-icon>
            <span :class="{'error-color': !isUp, 'green': isUp}">
              <span v-format="'#,##0.00'">{{increment}}</span> USDT
              <i :class="{'el-icon-top': isUp && isChange, 'el-icon-bottom': !isUp}"/>
            </span>
            <space width="15px"/>
            <svg-icon icon-class="circle" :class="{'error-color': !isUpPercentage, 'green': isUpPercentage}"></svg-icon>
            <span :class="{'error-color': !isUpPercentage, 'green': isUpPercentage}">
              <span v-if="isUpPercentage">+</span><span v-format="'#,##0.00'">{{incrementPercentage}}</span>%
              <i :class="{'el-icon-top': isUpPercentage && isChangePercentage, 'el-icon-bottom': !isUpPercentage}"/>
            </span>
          </span>
        </div>
      </div>
      <div class="chart-wrapper">
        <line-chart :title="pricesData.name" :chart-data="chartData.lineData" height="18.875rem"/>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import { BigNumber } from 'bignumber.js';
import LineChart from '@/components/dashboard/LineChart'
import { getPrices } from '@/api/common.js';
import Moment from 'moment';

export default {
  components:{
    LineChart,
  },
  data() {
    return {
      pricesData: null,
      dateList: [],
      priceList: [],
    }
  },
  computed: {
    ...mapGetters([
      'web3',
      'member',
      'web3Status',
      'settings',
      'device'
    ]),
    chartData(){
      if(!this.pricesData){
        return {
          lineData: {
            xAxisData: dateList,
            expectedData: [],
            actualData: priceList,
          }
        };
      }
      const dateList = this.pricesData.data.map(item=>item.date);
      dateList.push(Moment(new Date()).format('YYYY-MM-DD'));
      const priceList = this.pricesData.data.map(item=>item.price);
      priceList.push(this.curPrice);
      const lineData = {
        xAxisData: dateList,
        expectedData: [],
        actualData: priceList,
      };
      return {
        lineData: lineData
      };
    },
    curPrice(){
      return this.member.price;
    },
    increment(){
      const priceList = this.priceList;
      if(priceList.length>0){
        return BigNumber(this.curPrice).minus(priceList[priceList.length - 1]).toFixed(2);
      }
      return BigNumber(this.curPrice).toFixed(2);
    },
    isUp(){
      return BigNumber(this.increment).gte(0);
    },
    isChange(){
      return !BigNumber(this.increment).eq(0);
    },
    incrementPercentage(){
      const priceList = this.priceList;
      if(priceList.length>0){
        const lastPrice = priceList[priceList.length - 1];
        if(BigNumber(lastPrice).eq(0)){
          return 0;
        }
        return BigNumber(this.curPrice).minus(lastPrice).div(lastPrice).times(100).toFixed(2);
      }
      return 0;
    },
    isUpPercentage(){
      return BigNumber(this.incrementPercentage).gte(0);
    },
    isChangePercentage(){
      return !BigNumber(this.incrementPercentage).eq(0);
    },
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
      getPrices().then(res => {
        this.pricesData = res.data;
        this.initChartData();
      }).catch(e => {
        console.error(e);
      });
      if(this.web3Status === this.WEB3_STATUS.AVAILABLE){
        this.initContract();
      }
    },
    async initContract(){
    },
    initChartData(){
      this.dateList = this.pricesData.data.map(item=>item.date);
      this.priceList = this.pricesData.data.map(item=>item.price);
    },
    exchange(){
      this.$openWindow(this.settings.exchangeUrl);
    },
    add(){
      this.$openWindow(this.settings.addLiquidityUrl);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
#fram-chart{
  .right-area{
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .mobile-btn{
    text-align: center;
  }
  .fram-card{
    width: 100%;
    border-radius: 1.25rem;
    box-shadow: $--card-box-shadow;
    background-color: $--front-background-color;
    margin-right: 1.25rem;
    display: inline-block;
    padding: 1.25rem;
    .fram-card-header{
      position: relative;
      line-height: 2.5rem;
      .fram-chart-title{
        font-weight: bold;
        font-size: 1.25rem;
        .sub-title{
          font-size: 0.875rem;
        }
        img{
          height: 2rem;
          vertical-align: middle;
          margin-right: 0.9375rem;
        }
      }
    }
  }
}
</style>
