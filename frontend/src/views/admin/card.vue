<template>
  <div id="admin-card">
    <div class="card-title"><slot name="title"></slot></div>
    <div class="card-input"><slot name="input"></slot></div>
    <div class="card-btn">
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script>
</script>
<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
$margin-bottom: 1rem;
$font-size: $--font-size-base;
#admin-card{
  width: 100%;
  border-radius: 20px;
  box-shadow: $--card-box-shadow;
  background-color: $--front-background-color;
  margin-top: 1.25rem;
  margin-right: 1.25rem;
  display: inline-block;
  padding: 1.25rem;
  text-align: center;
  font-size: $font-size;

  .card-title{
    font-weight: bold;
    margin-bottom: $margin-bottom;
    text-align: left;
  }
  .card-input{
    margin-bottom: $margin-bottom;
    .el-input{
      input{
        background-color: #292932 !important;
      }
    }
  }
  .card-btn{
    margin-bottom: $margin-bottom;
  }
}
</style>
<style lang="scss">

</style>
