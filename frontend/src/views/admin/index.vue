<template>
  <div id="admin" class="app-container">
    <desktop v-if="device === 'desktop'" />
    <mobile v-else />
  </div>
</template>

<script>
import { watch } from '@/utils/watch.js';
import { mapGetters } from 'vuex';
import desktop from './desktop';
import mobile from './mobile';

export default {
  components:{
    desktop, mobile
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
  },
}
</script>
<style lang="scss" scoped>
#admin{

}
</style>
