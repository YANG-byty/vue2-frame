import request from '@/plugins/request';
//---------------------用户管理--------------------------//
//添加用户
export function addUserPort(data) {
  return request({
    url: 'user/user/add',
    method: 'post',
    data: data
  });
}
//获取部门下拉
export function getDepartList(data) {
  return request({
    url: 'user/org/treeList',
    method: 'post',
    data
  });
}
//用户编辑详情
export function getUserDetil(data) {
  return request({
    url: 'user/user/getDetails',
    method: 'get',
    params: data
  });
}
//用户授权列表
export function getUserListPage(data) {
  return request({
    url: '/user/user/page',
    method: 'post',
    data
  });
}
//用户编辑
export function getUserEdit(data) {
  return request({
    url: 'user/user/edit',
    method: 'put',
    data
  });
}
//添加职务
export function addOrgUser(data) {
  return request({
    url: 'user/orgUser/add',
    method: 'post',
    data: data
  });
}
//职务列表
export function orgUserList(data) {
  return request({
    url: 'user/orgUser/list',
    method: 'get',
    params: data
  });
}
//任职详情
export function orgUserInfo(data) {
  return request({
    url: 'user/orgUser/details',
    method: 'get',
    params: data
  });
}
//任职编辑
export function orgUserEdit(data) {
  return request({
    url: 'user/orgUser/edit',
    method: 'PUT',
    data
  });
}
//任职删除
export function orgUserDel(data) {
  return request({
    url: 'user/orgUser/del/' + data.id,
    method: 'delete'
  });
}
//设为主职
export function settingMaster(data) {
  return request({
    url: 'user/orgUser/settingMaster',
    method: 'get',
    params: data
  });
}
//用户状态启用
export function updateStatus(data) {
  return request({
    url: 'user/user/updateStatus',
    method: 'get',
    params: data
  });
}
//用户详情
export function getUserDetails(data) {
  return request({
    url: 'user/user/getUserDetails',
    method: 'get',
    params: data
  });
}
//重置密码
export function resetPassword(data) {
  return request({
    url: 'user/user/resetPassword',
    method: 'get',
    params: data
  });
}
export function permissionRole(data) {
  return request({
    url: 'permission/user/role/' + data.id,
    method: 'get'
  });
}

//修改用户
export function userEdit(data) {
  return request({
    url: '/user/user/uuser/update',
    method: 'post',
    data
  });
}
//用户授权
export function userAuth(data) {
  return request({
    url: '/permission/user/role',
    method: 'put',
    data
  });
}
//删除用户
export function userDelete(data) {
  return request({
    url: '/user/user/del',
    method: 'delete',
    params: data
  });
}
//解锁用户
export function unlockUser(data) {
  return request({
    url: '/user/user/unlockUser',
    method: 'get',
    params: data
  });
}
//检验用户是否设置手机号
export function verifyAuthId(data) {
  return request({
    url: '/user/user/verifyAuthId',
    method: 'get',
    params: data
  });
}
//重置密码
export function resertPasswordPort(data) {
  return request({
    url: '/user/user/uuser/resetPassword',
    method: 'get',
    params: data
  });
}
//修改用户状态
export function changeUserStatus(data) {
  return request({
    url: '/user/user/uuser/changeUserStatus',
    method: 'get',
    params: data
  });
}
//获取职级，编制，面貌
export function getConfigType(data) {
  return request({
    url: '/user/configType/list',
    method: 'post',
    data
  });
}

//---------------------用户分组管理--------------------------//
//列表
export function getUserGroupListPage(data) {
  return request({
    url: 'user/group/page',
    method: 'post',
    data
  });
}
//添加用户分组
export function addUserGroupPort(data) {
  return request({
    url: 'user/group/add',
    method: 'post',
    data
  });
}
//编辑用户分组
export function editUserGroupPort(data) {
  return request({
    url: 'user/group/update',
    method: 'post',
    data
  });
}
//用户分组所属组织
export function getUnitOrg(data) {
  return request({
    url: 'user/orgUser/getUnitOrg',
    method: 'get',
    params: data
  });
}
//部门刷选人
export function getOrgUsers(data) {
  return request({
    url: 'user/orgUser/getOrgUsers',
    method: 'get',
    params: data
  });
}
//删除用户分组
export function delUserGroup(data) {
  return request({
    url: 'user/group/del',
    method: 'get',
    params: data
  });
}
//分组详情
export function getUserGroupDetail(data) {
  return request({
    url: 'user/group/details',
    method: 'get',
    params: data
  });
}

//分组成员
export function groupUserList(data) {
  return request({
    url: 'user/group/groupUserList',
    method: 'get',
    params: data
  });
}
//设置分组确定
export function addGroupUser(data) {
  return request({
    url: '/user/group/addGroupUser',
    method: 'post',
    data
  });
}
//用户组授权
export function userGroupAuth(data) {
  return request({
    url: '/permission/group/role',
    method: 'put',
    data
  });
}

//是否设为成员
export function unitVerify(data) {
  return request({
    url: '/user/orgUser/unitVerify',
    method: 'get',
    params: data
  });
}
//获取用户分组角色列表
export function permissionGroupRole(data) {
  return request({
    url: 'permission/group/role/' + data.id,
    method: 'get'
  });
}

//---------------------职位管理--------------------------//

//添加职位
export function addPostPort(data) {
  return request({
    url: '/user/user/upost/save',
    method: 'post',
    data
  });
}
//获取所有职位不分页
export function getPostAllData(data) {
  return request({
    url: '/user/user/upost/getAll',
    method: 'get',
    params: data
  });
}
export function getPostDetail(data) {
  return request({
    url: '/user/user/upost/' + data.id,
    method: 'get'
  });
}
export function updatePost(data) {
  return request({
    url: '/user/user/upost/',
    method: 'put',
    data
  });
}

//---------------------组织关系管理--------------------------//
//添加组织下级
export function addOrg(data) {
  return request({
    url: 'user/org/add',
    method: 'post',
    data
  });
}
// //组织详情
export function getOrgDetaail(data) {
  return request({
    url: 'user/org/detail',
    method: 'post',
    data
  });
}
// //部门授权
export function orgAuthorization(data) {
  return request({
    url: '/permission/org/role',
    method: 'put',
    data
  });
}
//---------------------权限管理--------------------------//
//获取权限树形列表数据
export function getPermissionTreeData(data) {
  return request({
    url: '/permission/permission/list/tree',
    method: 'get',
    params: data
  });
}
//新增权限
export function addPression(data) {
  return request({
    url: '/permission/permission',
    method: 'post',
    data
  });
}
//修改权限
export function updatePression(data) {
  return request({
    url: '/permission/permission',
    method: 'put',
    data
  });
}
//权限详情
export function getPressionDetail(data) {
  return request({
    url: '/permission/permission/' + data.id,
    method: 'get'
  });
}
//删除权限
export function delPression(data) {
  return request({
    url: '/permission/permission/' + data.id,
    method: 'delete'
  });
}
//---------------------角色管理--------------------------//
//获取角色树形列表数据
export function getRoleTreeData(data) {
  return request({
    url: '/permission/role/list/tree',
    method: 'get',
    params: data
  });
}
//新增角色
export function addRole(data) {
  return request({
    url: '/permission/role',
    method: 'post',
    data
  });
}
//修改角色
export function updateRole(data) {
  return request({
    url: '/permission/role',
    method: 'put',
    data
  });
}
//删除角色
export function delRole(data) {
  return request({
    url: '/permission/role/' + data.id,
    method: 'delete'
  });
}
//角色详情
export function getRoleDetail(data) {
  return request({
    url: '/permission/role/' + data.id,
    method: 'get'
  });
}
//角色授权
export function rolePermissionPort(data) {
  return request({
    url: '/permission/role/permission',
    method: 'put',
    data
  });
}
//---------------------根据特定场景查询角色列表--------------------------//
//根据用户id查询角色列表
export function getRoleWithUser(data) {
  return request({
    url: '/permission/user/role/' + data.id,
    method: 'get'
  });
}
//根据组织id查询角色列表
export function getRoleWithOrg(data) {
  return request({
    url: '/permission/org/role/' + data.id,
    method: 'get'
  });
}
//根据组用户组id查询角色列表
export function getRoleWithUserGroup(data) {
  return request({
    url: '/permission/group/role/' + data.id,
    method: 'get'
  });
}
