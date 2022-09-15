import request from '@/plugins/request';
//用户角色列表
export function rolePage(data) {
  return request({
    url: '/review/manage/role/page',
    method: 'get',
    params: data
  });
}
//添加用户角色
export function roleSave(data) {
  return request({
    url: '/review/manage/role/save',
    method: 'post',
    data
  });
}
//编辑用户角色
export function roleUpdate(data) {
  return request({
    url: '/review/manage/role/update',
    method: 'post',
    data
  });
}
//用户角色详情
export function roleInfo(data) {
  return request({
    url: '/review/manage/role/' + data,
    method: 'get'
  });
}
//用户角色删除
export function roleDelete(data) {
  return request({
    url: '/review/manage/role/delete',
    method: 'post',
    data
  });
}
//新增用户部门关系
export function userOrgAdd(data) {
  return request({
    url: '/review/user/userOrg/add',
    method: 'post',
    data
  });
}

//新增用户部门关系
export function userOrgPage(data) {
  return request({
    url: '/review/user/userOrg/page',
    method: 'post',
    data
  });
}
