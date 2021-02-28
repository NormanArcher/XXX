<template>
  <el-button :type="type" round @click="download">
    {{$t("common.downloadFarmer")}}
  </el-button>
</template>

<script>
export default {
  props:["type"],
  methods: {
    download(){
      this.$openWindow(this.settings.downloadFarmerUrl);
    }
  }
}
</script>

<style>
</style>
