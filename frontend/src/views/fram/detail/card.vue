<template>
  <div id="fram-detail-card">
    <div class="card-image"><slot name="image"></slot></div>
    <div class="card-title"><slot name="title"></slot></div>
    <div class="card-subtitle"><slot name="subtitle"></slot></div>
    <div class="card-data">
      <div class="card-value"><slot name="value"></slot></div>
      <div class="card-label"><slot name="label"></slot></div>
    </div>
    <div class="card-unit"><slot name="unit"></slot></div>
    <div class="card-desc">
      <slot name="desc"></slot>
    </div>
    <div class="card-btn">
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script>

</script>
<style lang="scss" scoped>
@import '../../../styles/element-variables.scss';
$margin-bottom: 1rem;
$label-color: #92929D;
$font-size: $--font-size-base;
#fram-detail-card{
  width: 100%;
  border-radius: 1.25rem;
  box-shadow: $--card-box-shadow;
  background-color: $--front-background-color;
  margin-top: 80px;
  margin-right: 1.25rem;
  display: inline-block;
  padding: 1.25rem;
  text-align: center;
  font-size: $font-size;
  height: calc(100% - 1.25rem);
  flex: 1;
  position: relative;

  .card-image{
    img{
      height: 4rem;
      position: absolute;
      top: -25px;
      left: 0;
      right: 0;
      margin: auto;
    }
    margin-bottom: 60px;
  }
  .card-title{
    font-size: 16px;
    font-weight: bold;
  }
  .card-subtitle{
    height: 1rem;
    margin-bottom: $margin-bottom;
  }
  .card-data{
    height: 4.375rem;
    .card-label{
      margin-bottom: $margin-bottom;
      font-size: 14px;
      color: $--label-color;
    }
    .card-value{
      margin-bottom: $margin-bottom;
      font-size: 26px;
      font-weight: bold;
    }
  }
  .card-unit{
    margin-bottom: $margin-bottom;
    color: #017B9E;
  }
  .card-desc{
    margin-bottom: 80px;
    color: $--label-color;
    line-height: 1.625rem;
    font-size: 12px;
  }
  .card-btn{
    margin-bottom: $margin-bottom;
    width:80%;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
<style lang="scss">
$margin-bottom: 1rem;
.mobile{
  #fram-detail-card{
    border: 1px solid #3AAFA9;
    margin-top: 20px;
    font-weight: normal;
    .card-image{
      img{
        position: static;
      }
      margin-bottom: $margin-bottom;
    }
  }
}
</style>
