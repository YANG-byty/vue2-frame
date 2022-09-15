/**
 * 在主框架之外显示
 */
const frameOut = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '干部党风廉政审查系统'
    },
    component: () => import('@/pages/home')
  },
  {
    path: '/content',
    name: 'content',
    meta: {
      title: '干部党风廉政审查系统'
    },
    component: () => import('@/layout'),
    children: [
      {
        path: '/reviewTask',
        name: 'reviewTask',
        meta: {
          title: '审查任务管理'
        },
        component: () => import('@/pages/reviewTask')
      },
      {
        path: '/reviewTask/detail',
        name: 'reviewTask/detail',
        meta: {
          title: '审查任务管理'
        },
        component: () => import('@/pages/reviewTask/detail')
      },
      {
        path: '/reviewObject',
        name: 'reviewObject',
        meta: {
          title: '分发审查对象'
        },
        component: () => import('@/pages/reviewObject')
      },
      {
        path: '/reviewObject/detail',
        name: 'reviewObject/detail',
        meta: {
          title: '分发审查对象'
        },
        component: () => import('@/pages/reviewObject/detail')
      },
      {
        path: '/reviewOpinion',
        name: 'reviewOpinion',
        meta: {
          title: '填写审查意见'
        },
        component: () => import('@/pages/reviewOpinion')
      },
      {
        path: '/reviewOpinion/detail',
        name: 'reviewOpinion/detail',
        meta: {
          title: '填写审查意见'
        },
        component: () => import('@/pages/reviewOpinion/detail')
      },
      {
        path: '/reviewReport',
        name: 'reviewReport',
        meta: {
          title: '审查报告管理'
        },
        component: () => import('@/pages/reviewReport')
      },
      {
        path: '/reviewReport/detail',
        name: 'reviewReport/detail',
        meta: {
          title: '审查报告管理'
        },
        component: () => import('@/pages/reviewReport/detail')
      },
      {
        path: '/reviewCenter',
        name: 'reviewCenter',
        meta: {
          title: '业务审批中心'
        },
        component: () => import('@/pages/reviewCenter')
      }
    ]
  },
  {
    path: '/reviewSet',
    name: 'reviewSet',
    redirect: '/reviewSet/reviewProcess',
    meta: {
      title: '系统基础设置'
    },
    component: () => import('@/pages/reviewSet'),
    children: [
      {
        path: '/reviewSet/reviewProcess',
        name: 'reviewSet/reviewProcess',
        meta: {
          title: '审批流程管理'
        },
        component: () => import('@/pages/reviewSet/reviewProcess')
      },
      {
        path: '/reviewSet/reviewReceive',
        name: 'reviewSet/reviewReceive',
        meta: {
          title: '审批流程管理'
        },
        component: () => import('@/pages/reviewSet/reviewReceive')
      },
      {
        path: '/reviewSet/reviewRole',
        name: 'reviewSet/reviewRole',
        meta: {
          title: '审批角色设置'
        },
        component: () => import('@/pages/reviewSet/reviewRole')
      },
      {
        path: '/reviewSet/reviewDepartment',
        name: 'reviewSet/reviewDepartment',
        meta: {
          title: '审批角色设置'
        },
        component: () => import('@/pages/reviewSet/reviewDepartment')
      }
    ]
  },

  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      noAuth: true
    },
    component: () => import('@/pages/login/index.vue')
  }
];

// 重新组织后导出
export default [...frameOut];
