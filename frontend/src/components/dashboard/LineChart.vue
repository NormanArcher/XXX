<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import styles from '@/styles/element-variables.scss';
import { BigNumber } from 'bignumber.js';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '396px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      pointData: []
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$el, "dark")
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData, xAxisData } = {}) {
      const echarts = this.$echarts;
      let index = xAxisData.length - 1
      let flag = Math.abs( actualData[index]  / expectedData[index] - 1) > 0.2
      let pointData = []
      if (flag) {
        pointData = [{name:'Data exception', coord: [index, actualData[index]]}]
      }
      const title = this.title;
      const textFormat = this.textFormat;
      this.chart.setOption({
        backgroundColor: styles.frontBackgroundColor,
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#696974"
          }
        },
        grid: {
          left: 10,
          right: 30,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross'
        //   },
        //   padding: [5, 10]
        // },
        tooltip: {
          trigger: 'axis',
          className: 'chart-tooltip',
          backgroundColor: '#C4C4C4',
          borderColor: '#7BB0FF',
          borderWidth: '1',
          textStyle: {
            color: "#333333",
          },
          // position: function (point, params, dom, rect, size) {
          //   return [0, 0];
          // },
          formatter: function (params, ticket, callback) {
            const value = textFormat(BigNumber(params[0].data).toFixed(2), "$#,##0.00");
            let preValue = null;
            let percentage = null;
            if(params[0].dataIndex>0){
              preValue = actualData[params[0].dataIndex-1];
              if(BigNumber(preValue).eq(0)){
                percentage = null;
              }else{
                percentage = BigNumber(params[0].data).minus(preValue).div(preValue).times(100).toFixed(2);
              }
            }
            let data = "";
            if(preValue!=null && percentage!=null){
              if(BigNumber(percentage).lt(0)){
                data = `
                  <span class="error-color" style="margin-right:20px;">
                    ↓ ${percentage}%
                  </span>`;
              }else{
                data = `
                  <span class="green" style="margin-right:20px;">
                    ↑ ${percentage}%
                  </span>`;
              }
            }

            let tooltip = `
              <div class='chart-tooltip-title'>${title}</div>
              <br />
              <div class="chart-tooltip-data">
                ${data}
                ${value}
              </div>
            `;
            callback(ticket, tooltip);
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#696974"
          }
        },
        series: [{
          name: 'ETH/USDT', itemStyle: {
            normal: {
              color: '#7BB0FF',
              lineStyle: {
                color: '#7BB0FF',
                width: 3
              }
            }
          },
          smooth: true,
          type: 'line',
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#DBF0FF'},
                  {offset: 0.5, color: '#EDF8FF'},
                  {offset: 1, color: '#FFFFFF'}
                ]
              )
            },
          },
        }]
      })
    }
  }
}
</script>
<style>
.chart-tooltip {
  background-color:#FFFFFF !important;
}
.chart-tooltip-title {
  font-size: 12px;
  line-height: 18px !important;
  height: 18px !important;
}
.chart-tooltip-data{
  font-size: 12px;
  height: 14px !important;
  line-height: 14px !important;
}
</style>
