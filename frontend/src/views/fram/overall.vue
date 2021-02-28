<template>
  <div id="fram-charts-overall-parent">
    <div class="fram-charts-overall-img" v-if="device==='mobile'">
      <spacev height="150px"></spacev>
    </div>
    <div id="fram-charts-overall" v-if="settings">
      <div class="fram-charts-overall-card">
        <div class="image">
          <img :src="'/images/totalValue.svg'" />
        </div>
        <div class="label">
          <div class="title">{{$t("fram.chart.totalValue")}}</div>
          <div class="value">{{formatTotalStakedValue}}</div>
        </div>
      </div>
      <div v-if="settings.totalSupply">
        <spacev height="15px"></spacev>
        <div class="fram-charts-overall-card">
          <div class="image">
            <img :src="'/images/totalLiquidityValue.svg'" />
          </div>
          <div class="label">
            <div class="title">{{$t("fram.chart.totalLiquidityValue", {rewardCoin: settings.rewardCoin})}}</div>
            <div class="value">{{formatRewardTotalSupplyValue}}</div>
          </div>
        </div>
        <spacev height="15px"></spacev>
        <div class="fram-charts-overall-card">
          <div class="image">
            <img :src="'/images/totalLiquidity.svg'" />
          </div>
          <div class="label">
            <div class="title">{{$t("fram.chart.totalLiquidity", {rewardCoin: settings.rewardCoin})}}</div>
            <div class="value">{{formatRewardTotalSupply}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './overall.mixin.js';

export default {
  mixins: [mixin],
}
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
#fram-charts-overall-parent{
  position: relative;
  .fram-charts-overall-img{
    position: absolute;
    top: -38px;
    z-index: 0;
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 0) url('../../assets/images/ss.svg') no-repeat;
    background-position:center top;
  }
}
#fram-charts-overall{
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 8px 6px rgba(53, 176, 235, 0.1);
  border-radius: 10px;
  padding: 15px;
  position: relative;
  z-index: 1;
  margin-left: 3.125rem;

  .fram-charts-overall-card:first-child{
    margin-top: 0rem;
  }
  .fram-charts-overall-card{
    display: table;
    width: 100%;
    box-shadow: $--card-box-shadow;
    background-color: $--front-background-color;
    border-radius: 10px;
    margin-right: 1.25rem;
    padding: 0.9375rem;
    height: 5rem;
    line-height: 4.6875rem;
    vertical-align: middle;
    text-align: center;
    .image {
      display: table-cell;
      display: none;
      vertical-align: middle;
      height: 3.125rem;
      width: 3.125rem;
      img {
        height: 3.125rem;
        width: 3.125rem;
        vertical-align: middle;
        margin-right: 0.9375rem;
      }
      margin-right: 0.9375rem;
    }
    .label{
      display: table-cell;
      text-align: center;
      line-height: 1.5rem;
      vertical-align: middle;
      height: 100%;
      .title{
        font-size: 1rem;
        color: #92929D;
        margin-bottom: 0.75rem;
      }
      .value{
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.mobile{
  #fram-charts-overall{
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
