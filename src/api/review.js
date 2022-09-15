import request from '@/plugins/request';

//审查任务管理详情
export function getDetails(data) {
  return request({
    url: '/review/reviewTask/getDetails?id=' + data,
    method: 'get'
  });
}
//添加分发部门
export function reviewDistribute(data) {
  return request({
    url: '/review/reviewDistribute/add',
    method: 'post',
    data
  });
}
//填写审查意见列表
export function page(data) {
  return request({
    url: '/review/reviewDistribute/page',
    method: 'post',
    data
  });
}
//添加审查任务
export function reviewTaskAdd(data) {
  return request({
    url: '/review/reviewTask/add',
    method: 'post',
    data
  });
}
//导入人员信息解析
export function importInfo(data) {
  return request({
    url: '/review/reviewTask/importInfo',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
}
//审查任务管理列表
export function reviewTaskPage(data) {
  return request({
    url: '/review/reviewTask/page',
    method: 'post',
    data
  });
}
//编辑审查任务管理
export function update(data) {
  return request({
    url: '/review/reviewTask/update',
    method: 'post',
    data
  });
}
//审查任务删除
export function del(data) {
  return request({
    url: '/review/reviewTask/del?id=' + data,
    method: 'get'
  });
}
//移除人员
export function personDel(data) {
  return request({
    url: '/review/reviewPerson/del?id=' + data,
    method: 'get'
  });
}
//审查任务作废
export function cancel(data) {
  return request({
    url: '/review/reviewTask/cancel?id=' + data,
    method: 'get'
  });
}
//分发审查对象列表
export function dffPage(data) {
  return request({
    url: '/review/reviewTask/dffPage',
    method: 'post',
    data
  });
}
//填写审查意见列表
export function reviewDistributePage(data) {
  return request({
    url: '/review/reviewDistribute/page',
    method: 'post',
    data
  });
}
//填写审查意见列表
export function distributeDetails(data) {
  return request({
    url: '/review/reviewDistribute/getDetails?id=' + data,
    method: 'get'
  });
}
//获取人员列表信息
export function getDistributePage(data) {
  return request({
    url: '/review/reviewDistribute/getDistributePage',
    method: 'post',
    data
  });
}
//分发部门移除
export function distributeDel(data) {
  return request({
    url: '/review/reviewDistribute/del?id=' + data,
    method: 'get'
  });
}
//更新分发部门
export function updateDept(data) {
  return request({
    url: '/review/reviewDistribute/updateDept',
    method: 'post',
    data
  });
}

//上传图片附件
export function uploadFile(data) {
  return request({
    url: '/file/filetransfer/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
}

//意见类型下拉数据
export function getAppraiseTemplate(data) {
  return request({
    url: '/review/appraiseTemplate/getAppraiseTemplate?id=' + data,
    method: 'get'
  });
}

//填写意见编辑保存
export function reviewDistributeUpdate(data) {
  return request({
    url: '/review/reviewDistribute/update',
    method: 'post',
    data
  });
}
