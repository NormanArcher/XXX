<template>
  <div class="common-space" :style="{width: width}"></div>
</template>

<script>
export default {
  name: 'space',
  props: {
    width: {
      type: String,
      default: "1px"
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.common-space{
  display: inline-block;
}
</style>
