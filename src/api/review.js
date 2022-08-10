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
//部门审核送审
export function submitApproval(data) {
  return request({
    url: '/review/reviewDistribute/submitApproval',
    method: 'post',
    data
  });
}
//获取流程实例详情
export function getInstanceById(data) {
  return request({
    url: '/review/reviewDistribute/getInstanceById',
    method: 'post',
    data
  });
}
//第一步审批节点
export function stepOneNode(data) {
  return request({
    url: '/review/reviewDistribute/stepOneNode',
    method: 'post',
    data
  });
}
//第二步审批节点
export function stepTwoNode(data) {
  return request({
    url: '/review/reviewDistribute/stepTwoNode',
    method: 'post',
    data
  });
}
//获取节点日志
export function nodeLog(data) {
  return request({
    url: '/review/process/node/nodeLog',
    method: 'post',
    data
  });
}
//审查报告管理列表
export function reviewReportPage(data) {
  return request({
    url: '/review/reviewReport/page',
    method: 'post',
    data
  });
}
//未生成报告的审查任务列表
export function reviewTaskTaskPage(data) {
  return request({
    url: '/review/reviewTask/taskPage',
    method: 'post',
    data
  });
}
//新增审查汇总报告
export function reviewReportAdd(data) {
  return request({
    url: '/review/reviewReport/add',
    method: 'post',
    data
  });
}
//新增审查汇总报告
export function reviewReportSubmitApproval(data) {
  return request({
    url: '/review/reviewReport/submitApproval',
    method: 'post',
    data
  });
}
//审查报告详情
export function reviewReportGetDetails(data) {
  return request({
    url: '/review/reviewReport/getDetails?id=' + data,
    method: 'get'
  });
}

//获取流程实例详情
export function reviewReportGetInstanceById(data) {
  return request({
    url: '/review/reviewReport/getInstanceById',
    method: 'post',
    data
  });
}
//第一步审批节点
export function reviewReportStepOneNode(data) {
  return request({
    url: '/review/reviewReport/stepOneNode',
    method: 'post',
    data
  });
}
//第一步审批节点
export function reviewReportStepTwoNode(data) {
  return request({
    url: '/review/reviewReport/stepTwoNode',
    method: 'post',
    data
  });
}
//编辑更新汇总报告
export function reviewReportUpdate(data) {
  return request({
    url: '/review/reviewReport/update',
    method: 'post',
    data
  });
}
//获取部门审核数据列表（审批通过）
export function reviewDistributeGetDistribute(data) {
  return request({
    url: '/review/reviewDistribute/getDistribute',
    method: 'post',
    data
  });
}
//获取部门审核数据列表（生成审核报告）
export function reviewDistributeGetDistributeList(data) {
  return request({
    url: '/review/reviewDistribute/getDistributeList',
    method: 'post',
    data
  });
}
//审查意见审批列表
export function distributeApprovePage(data) {
  return request({
    url: '/review/reviewDistribute/distributeApprovePage',
    method: 'post',
    data
  });
}
//审查报告审批列表
export function reportApprovePage(data) {
  return request({
    url: '/review/reviewReport/reportApprovePage',
    method: 'post',
    data
  });
}
//操作日志列表
export function getOperationList(data) {
  return request({
    url: '/review/sys/operationLog/getOperationList?id=' + data,
    method: 'get'
  });
}
//获取首页审查意见及审批中心数量
export function getCount(data) {
  return request({
    url: '/review/reviewDistribute/getCount?uid=' + data,
    method: 'get'
  });
}
//催办
export function msgPushAdd(data) {
  return request({
    url: '/review/msgPush/add',
    method: 'post',
    data
  });
}
