<template>
  <div id="form-item">
    <div class="form-item-label"><slot name="label"></slot></div>
    <div class="form-item-value">
      <span class="form-item-value-data"><slot name="value"></slot></span>
      <space width="4px"></space>
      <span class="form-item-value-unit"><slot name="unit"></slot></span>
    </div>
  </div>
</template>

<script>
</script>
<style lang="scss" scoped>
#form-item{
  position: relative;
  text-align: left;
  font-size: 14px;
  .form-item-label{
    color: #92929D;
    display: inline-block;
    text-align: left;
  }
  .form-item-value{
    position: absolute;
    right: 0rem;
    top: 0rem;
    color: #92929D;
    .form-item-value-data{
      color: #3DD598;
      font-weight: bold;
    }
    .form-item-value-unit{
      color: #92929D;
    }
  }
}
</style>
