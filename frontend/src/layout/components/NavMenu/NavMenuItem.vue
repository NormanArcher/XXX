<template>
    <fragment v-if="item.hasChildren || (item.meta && !item.hidden)">

      <el-menu-item :index="basePath + '/' + item.path" v-if="!item.hasChildren" @click="changeRoute(item.path)">
        {{$t('route.'+item.meta.title)}}
      </el-menu-item>

      <el-submenu :index="basePath + '/' + item.path" v-else-if="item.meta && !item.hidden">
        <span slot="title">{{$t('route.'+item.meta.title)}}</span>
        <Permission v-for="subRoute in item.children" :permissions="[subRoute.permission]" type="remove">
          <NavMenuItem :key="subRoute.path" :item="subRoute" :base-path="basePath + item.path" />
        </Permission>
      </el-submenu>
      <Permission v-else v-for="subRoute in item.children" :permissions="[subRoute.permission]" type="remove">
        <NavMenuItem :key="subRoute.path" :item="subRoute" :base-path="basePath + item.path" />
      </Permission>
    </fragment>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import Permission from '@/components/Permission/index'

export default {
  name: 'NavMenuItem',
  components: { AppLink, Permission },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    changeRoute(path){
      let p = this.resolvePath(path);
      this.$router.push(p);
    }
  }
}
</script>
