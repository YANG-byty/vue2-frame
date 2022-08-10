import request from '@/plugins/request';

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
