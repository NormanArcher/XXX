<template>
  <div class="common-space" :style="{height: height}"></div>
</template>

<script>
export default {
  name: 'space',
  props: {
    height: {
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
}
</style>
