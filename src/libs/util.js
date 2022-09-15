import cookies from './util.cookies';
import log from './util.log';

const util = {
  cookies,
  log
};

function tTitle(title = '') {
  if (window && window.$t) {
    if (title.indexOf('$t:') === 0) {
      return window.$t(title.split('$t:')[1]);
    } else {
      return title;
    }
  } else {
    return title;
  }
}

/**
 * @description 更改标题
 * @param {Object} title 标题
 * @param {Object} count 未读消息数提示（可视情况选择使用或不使用）
 */
util.title = function({ title, count }) {
  title = tTitle(title);
  // let fullTitle = title ? `${title} - ${Setting.titleSuffix}` : Setting.titleSuffix;

  // if (count) fullTitle = `(${count}条消息)${fullTitle}`;
  // window.document.title = fullTitle;
};

function requestAnimation(task) {
  if ('requestAnimationFrame' in window) {
    return window.requestAnimationFrame(task);
  }

  setTimeout(task, 16);
}

export { requestAnimation };
// 后去用户id
export function getUserId() {
  return util.cookies.get('user_id');
}
export function clearLoginInfo() {
  util.cookies.remove('token');
  util.cookies.remove('nick_name');
  util.cookies.remove('token_type');
  util.cookies.remove('user_id');
  localStorage.clear();
  sessionStorage.clear();
}
export default util;
/**
 * 函数防抖
 * functionTimeOut // 函数防抖节流存储对象
 * functionDelay // 延迟执行时间
 * @param that
 * @param fn
 * @param delay
 */
export const debounce = (that, fn, delay) => {
  delay = delay || 3000;

  if (that.functionTimeOut) {
    clearTimeout(that.functionTimeOut);
  }
  const context = that;
  const args = arguments;
  that.functionTimeOut = setTimeout(function() {
    fn.apply(context, args);
  }, delay);
};
/**
 * 枚举数据源
 * @param enumList  枚举数据源
 * @param afferentKey    传入值名称
 * @param afferentValue  传入值
 * @param outKey        传出值名称
 */
export const enumConversion = (enumList, afferentKey, afferentValue, outKey) => {
  let result = '';
  if (enumList.length <= 0 || afferentValue === null || !afferentKey || !outKey) {
    return result;
  }

  const resultArray = enumList.filter((item) => item[afferentKey] === afferentValue);
  if (resultArray.length > 0) {
    // 取第一个
    result = resultArray[0][outKey];
    return result;
  }

  return result;
};
