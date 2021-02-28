import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import './styles/element-ui.scss'

import './styles/index.scss' // global css
import './styles/common.scss' // global css
import '@/iconfont/iconfont.js'
import '@/iconfont/iconfont.css'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import web3 from '@/plugins/web3.js'
import utils from '@/plugins/utils.js'
import Fragment from 'vue-fragment'
import vueSkeleton from 'vue-skeleton-antd';
import CustomComponents from '@/components/CustomComponents'
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import { BigNumber } from 'bignumber.js';
import format from 'vue-text-format';

import i18n from './lang' // internationalization

import * as echarts from 'echarts/core';
import {
    LineChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
);
Vue.prototype.$echarts = echarts

// 默认为20，超过20位就变成科学计数了，导致数据转换错误，设置100，超过100位才显示为科学计数
BigNumber.config({ EXPONENTIAL_AT: 100 })

Vue.use(CustomComponents);

Vue.use(vueSkeleton)

Vue.use(Fragment.Plugin)

Vue.use(web3);

Vue.use(utils);

Vue.use(elTableInfiniteScroll);

Vue.use(format)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
