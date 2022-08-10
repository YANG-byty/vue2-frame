// Vue
import Vue from 'vue';
import App from './App';
// store
import store from '@/store/index';
import ViewUI from 'view-design';
// 菜单和路由
import router from './router';
// 自定义指令
import '@/assets/css/basic.less';
import Directive from '@/libs/directive';
import './libs/iview-pro/iview-pro.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'view-design/dist/styles/iview.css';
import '@/assets/css/common.less';
import '@/assets/css/iconfont.css';
import { Tree, Select, Option, Input } from 'element-ui';
// 回显
import { enumConversion, getUserId, getUserName } from '@/libs/util';
Vue.use(Tree);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.enumConversion = enumConversion;
Vue.prototype.$getUserId = getUserId;
Vue.prototype.$getUserName = getUserName;
Vue.use(Directive);

Vue.use(ViewUI, {});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
