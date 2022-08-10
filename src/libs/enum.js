/**
 *  流程日志 icon 枚举
 * */
export const iconEnumList = [
  {
    value: 1,
    label: '勾',
    class: 'green'
  },
  {
    value: 2,
    label: '时钟',
    class: 'blue'
  },
  {
    value: 3,
    label: '叉',
    class: 'red'
  },
  {
    value: 4,
    label: '回',
    class: 'yellow'
  }
];
/**
 *  状态枚举
 * */
export const taskStatusEnumList = [
  {
    value: 0,
    label: '已作废',
    class: 'red'
  },
  {
    value: 1,
    label: '待分发',
    class: 'yellow'
  },
  {
    value: 2,
    label: '进行中',
    class: 'blue'
  },
  {
    value: 3,
    label: '已结束',
    class: 'green'
  }
];
/**
 *  审核结果枚举
 * */
export const auditResultEnumList = [
  {
    value: 0,
    label: '未通过',
    class: 'red'
  },
  {
    value: 1,
    label: '未送审',
    class: 'yellow'
  },
  {
    value: 2,
    label: '审核中',
    class: 'blue'
  },
  {
    value: 3,
    label: '已通过',
    class: 'green'
  }
];
/**
 *  审核流程枚举
 * */
export const auditProcessEnumList = [
  {
    value: 1,
    label: '审核中',
    class: 'blue'
  },
  {
    value: 2,
    label: '已结束',
    class: 'green'
  }
];
// 流程状态
export function instanceStatus(val) {
  if (val === '0' || val === 0) {
    return '已作废';
  }
  if (val === '1' || val === 1) {
    return '待分发';
  }
  if (val === '2' || val === 2) {
    return '进行中';
  }
  if (val === '3' || val === 3) {
    return '已结束';
  }
  return '';
}
// 审核结果
export function auditResultStatus(val) {
  if (val === '0' || val === 0) {
    return '未通过';
  }
  if (val === '1' || val === 1) {
    return '未送审';
  }
  if (val === '2' || val === 2) {
    return '审核中';
  }
  if (val === '3' || val === 3) {
    return '已通过';
  }
  return '';
}
