<template>
  <div id="fram-pools-pool">
    <div class="fram-pool-card">
      <div class="pool-info">
        <div class="pool-image"><img :src="data.icon" /></div>
      </div>
      <div class="pool-title">
        {{data.poolCoin}}
        <span v-if="data.liquidity=='yes'">({{data.subCoin1}}-{{data.subCoin2}})</span>
      </div>
      <div class="pool-value">{{totalUSDT}} <div class="pool-unit">{{settings.valueUnit}}</div></div>
      <spacev height="38px"></spacev>
      <div class="pool-income">
        <div class="pool-income-label">
          {{$t("fram.pool.income")}}
        </div>
        <div class="pool-income-value-green">
          <span v-format="'0.00'">{{data.yearlyEarnings}}</span>%
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
      <spacev height="28px"></spacev>
      <div class="pool-btn">
        <el-button type="primary" @click="fram" round style="width: 100%;">{{$t("fram.pool.fram")}}</el-button>
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
    border: 1px solid #3AAFA9;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    padding: 1.875rem;
    text-align: center;
    font-size: $font-size;

    .pool-info{
      margin-bottom: $margin-bottom;
      .pool-image{
        img{
          height: 4rem;
        }
      }
    }
    .pool-title{
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .pool-value{
      font-size: 1.625rem;
      font-weight: bold;
      color: #333333;
      margin-bottom: 6px;
    }
    .pool-unit{
      font-size: 16px;
      color: #92929D;
      display: inline-block;
    }
    .pool-btn{
      margin-bottom: $margin-bottom;
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
        color: $--main-text-color;
        .pool-income-value-icon{
          color: #979797;
          display: none;
        }
      }
    }
  }
}
</style>
