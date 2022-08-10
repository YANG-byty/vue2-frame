/**
 * 业务配置
 * */

const isProd = process.env.VUE_APP_ISPROD;
const Setting = {
  /**
   * 基础配置
   * */
  // 网页标题的后缀
  titleSuffix: '一体化工作平台',
  // 路由模式，可选值为 history 或 hash
  routerMode: 'history',
  // 应用的基路径
  routerBase: isProd == 'PROD' ? '/review' : '/',
  // 页面切换时，是否显示模拟的进度条
  showProgressBar: true,
  // 接口请求地址
  apiBaseURL: process.env.VUE_APP_BASE_API,
  // 文件大小
  fileSize: 20 * 1024000,
  //认证回调地址
  OAUTH_REDIRECT_URI: process.env.VUE_APP_OAUTH_REDIRECT_URI,
  modalDuration: 3,
  // 接口请求返回错误时，弹窗的类型，可选值为 Message 或 Notice
  errorModalType: 'Message',
  // Cookies 默认保存时间，单位：天
  cookiesExpires: 1,
  /**
   * 多语言配置
   * */
  i18n: {
    // 默认语言
    default: 'zh-CN',
    // 是否根据用户电脑配置自动设置语言（仅第一次有效）
    auto: false
  },

  page: {
    // 默认打开的页签
    opened: []
  }
};

export default Setting;
