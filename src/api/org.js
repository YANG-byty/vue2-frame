import request from '@/plugins/request';

//添加组织
export function addOrgPort(data) {
  return request({
    url: '/user/org/add',
    method: 'post',
    data
  });
}
//根据组织类型查询下级可建组织
export function getConfigOrgTypeOrg(data) {
  return request({
    url: '/user/configOrgType/list',
    method: 'post',
    data
  });
}
//编辑组织
export function editOrgPort(data) {
  return request({
    url: '/user/org/update',
    method: 'post',
    data
  });
}
//删除组织
export function deleteOrg(data) {
  return request({
    url: '/user/org/delete',
    method: 'post',
    data
  });
}
//树根据父级id查询组织
export function treeListOrg(data) {
  return request({
    url: '/user/org/treeList',
    method: 'post',
    data
  });
}
//树查询根组织
export function treeRootOrg(data) {
  return request({
    url: '/user/org/treeRoot',
    method: 'post',
    data
  });
}
//树根据组织名称查询组织
export function treeLikeNameListOrg(data) {
  return request({
    url: '/user/org/imTreeListWithUserNum',
    method: 'post',
    data
  });
}
//树根据组织名称查询组织和用户
export function treeLikeUserorg(data) {
  return request({
    url: '/user/org/getOrgTreeAndUserByLikeName',
    method: 'get',
    params: data
  });
}
//树根据父级id查询组织和组织人数
export function treeListWithUserNumOrg(data) {
  return request({
    url: '/user/org/imTreeListWithUserNum',
    method: 'post',
    data
  });
}
//根组织id查询详情
export function getOrgNodeDetail(data) {
  return request({
    url: '/user/org/detail',
    method: 'post',
    data
  });
}
//根组织id查询简单详情
export function getOrgNodeSimpleDetail(data) {
  return request({
    url: '/user/org/detailSimple',
    method: 'post',
    data
  });
}

//移动人员
export function moveOrgPerson(data) {
  return request({
    url: '/user/user/changeDept',
    method: 'post',
    data
  });
}

//查询全部组织树
export function getALLOrgTree() {
  return request({
    url: '/user/org/tree',
    method: 'get'
  });
}
//浙正钉树
export function getZzdOrgTree(params) {
  return request({
    url: '/user/zzd/getZzdOrg',
    method: 'get',
    params: params
  });
}
