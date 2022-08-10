import request from '@/plugins/request';
export function clientToken(data) {
  return request({
    url: '/review/auth/client/token',
    method: 'post',
    data
  });
}
export function getLoginUserInfo() {
  return request({
    url: '/user/user/getUserLoginInfo',
    method: 'get'
  });
}
