import LiBorderRadius from '@/components/BorderRadius/index'
import highlight from '@/components/Common/highlight'
import space from '@/components/Common/space'
import spacev from '@/components/Common/spacev'
import DegreesBadge from '@/components/DegreesBadge/index'
import liDialog from '@/components/Common/liDialog'

// 这里是重点
const CustomComponents = {
  install: function(Vue){
    Vue.component('LiBorderRadius', LiBorderRadius);
    Vue.component('highlight', highlight);
    Vue.component('space', space);
    Vue.component('spacev', spacev);
    Vue.component('liDialog', liDialog);
    Vue.component('DegreesBadge', DegreesBadge);
  }
}

// 导出组件
export default CustomComponents
