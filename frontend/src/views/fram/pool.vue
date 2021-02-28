<template>
  <div id="fram-pools-pool" v-if="settings">
    <div class="fram-pool-card">
      <div class="pool-image"><img :src="data.icon" /></div>
      <div class="pool-title">
        {{data.poolCoin}}
        <span v-if="data.liquidity=='yes'">({{data.subCoin1}}-{{data.subCoin2}})</span>
      </div>
      <spacev height="10px"></spacev>
      <div class="pool-value">{{totalUSDT}} <div class="pool-unit">{{settings.valueUnit}}</div></div>
      <div class="pool-btn">
        <el-button type="primary" @click="fram" round style="width: 100%;">{{$t("fram.pool.fram")}}</el-button>
      </div>
      <div class="pool-income">
        <div class="pool-income-label">
          {{$t("fram.pool.income")}}
        </div>
        <div class="pool-income-value-green">
          <span v-format="'#,##0.00'">{{apy.toFixed(2)}}</span>%
        </div>
      </div>
      <div class="pool-income">
        <div class="pool-income-label">
          {{$t("fram.pool.stored", {poolName: data.name})}}
        </div>
        <div class="pool-income-value">
          <span v-format="'#,##0.00'">{{data.earnedPerDay}}</span> {{settings.rewardCoin}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin.js';

export default {
  mixins: [mixin],
}
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
$margin-bottom: 1rem;
$label-color: $--label-color;
$font-size: $--font-size-base;
#fram-pools-pool{
  .fram-pool-card{
    width: 100%;
    border-radius: 1.25rem;
    box-shadow: $--card-box-shadow;
    background-color: $--front-background-color;
    margin-top: 45px;
    margin-right: 1.25rem;
    margin-bottom: 25px;
    display: inline-block;
    padding: 1.875rem;
    text-align: center;
    font-size: $font-size;
    position: relative;

    .pool-image{
      img{
        height: 4rem;
        position: absolute;
        top: -25px;
        left: 0;
        right: 0;
        margin: auto;
      }
      margin-bottom: $margin-bottom;
    }
    .pool-title{
      font-size: 1rem;
      font-weight: bold;
      color: #017B9E;
    }
    .pool-value{
      margin: 2.25rem 0rem 2.875rem 0rem;
      font-size: 1.625rem;
      font-weight: bold;
      color: #292932;
    }
    .pool-unit{
      display: inline-block;
      margin-bottom: $margin-bottom;
      font-size: 1.125rem;
      color: #92929D;
    }
    .pool-btn{
      margin-bottom: $margin-bottom;
      width:60%;
      position: absolute;
      bottom: -20px;
      left: 0;
      right: 0;
      margin: auto;
    }
    .pool-income{
      height: 2.375rem;
      line-height: 2.125rem;
      color: $label-color;
      text-align: left;
      .pool-income-label{
        display: inline-block;
        margin-left: 0.9375rem;
        font-size: 0.875rem;
      }
      .pool-income-value-green{
        display: inline-block;
        font-size: 0.875rem;
        font-weight: bold;
        line-height: 1.625rem;
        float: right;
        margin-right: 0.875rem;
        border-radius: 0.3125rem;
        padding: 0px 0.625rem 0px 0.625rem;
        margin-top: 0.25rem;
        color: #09A265;
        background-color: rgba(61, 213, 152, 0.1);
      }
      .pool-income-value{
        display: inline-block;
        font-size: 0.875rem;
        font-weight: bold;
        line-height: 1.625rem;
        float: right;
        margin-right: 0.875rem;
        padding: 0px 0.625rem 0px 0.625rem;
        margin-top: 0.25rem;
        color: $--secondary-text-color;
        .pool-income-value-icon{
          color: #979797;
          display: none;
        }
      }
    }
  }
}
</style>
