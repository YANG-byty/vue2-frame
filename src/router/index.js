import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'view-design';

import util from '@/libs/util';

import Setting from '@/setting';

// 路由数据
import routes from './routes';

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes,
  mode: Setting.routerMode,
  base: Setting.routerBase
});

/**
 * 路由拦截
 * 权限验证
 */

router.beforeEach((to, from, next) => {
  if (Setting.showProgressBar) iView.LoadingBar.start();
  if (to.meta.title) {
    //判断是否有标题
    document.title = to.meta.title;
  }
  // 不需要登录的页面直接放行
  if (to.meta.noAuth) {
    return next();
  }
  // token 判断是否登录
  const token = util.cookies.get('token');
  if (token && token !== 'undefined') {
    next();
  } else {
    // 没有登录的时候跳转到登录界面
    // 携带上登陆成功之后需要跳转的页面完整路径
    // next();
    next({
      name: 'login'
    });
  }
});

router.afterEach((to) => {
  if (Setting.showProgressBar) iView.LoadingBar.finish();
  // 多页控制 打开新的页面
  // 更改标题
  util.title({
    title: to.meta.title
  });
  // 返回页面顶端
  window.scrollTo(0, 0);
});

export default router;
