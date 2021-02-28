<template>
  <el-dialog
    class="li-dialog"
    :before-close="handleClose"
    :visible.sync="options.show"
    :close-on-click-modal="false"
    :append-to-body="options['append-to-body']"
    :width="options && options.width ? options.width : '50%'">
    <div slot="title" class="li-dialog-title">
      <slot name="title"></slot>
    </div>
    <slot name="body"></slot>
    <span slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'liDialog',
  props: ["options"],
  data() {
    return {

    }
  },
  methods: {
    handleClose(){
      this.$emit("close");
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/element-variables.scss';
.li-dialog{
  .li-dialog-title{
    text-align: center;
    font-size: 1.125rem;
    font-weight: bold;
  }
  .el-dialog{
    background-color: $--front-background-color;
    border-radius: 1.25rem;
  }
}
</style>
