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
        component: () => import('@/pages/review-task')
      },
      {
        path: '/reviewTask/detail',
        name: 'reviewTask/detail',
        meta: {
          title: '审查任务管理'
        },
        component: () => import('@/pages/review-task/detail')
      },
      {
        path: '/reviewObject',
        name: 'reviewObject',
        meta: {
          title: '分发审查对象'
        },
        component: () => import('@/pages/review-object')
      },
      {
        path: '/reviewObject/detail',
        name: 'reviewObject/detail',
        meta: {
          title: '分发审查对象'
        },
        component: () => import('@/pages/review-object/detail')
      },
      {
        path: '/reviewOpinion',
        name: 'reviewOpinion',
        meta: {
          title: '填写审查意见'
        },
        component: () => import('@/pages/review-opinion')
      },
      {
        path: '/reviewOpinion/detail',
        name: 'reviewOpinion/detail',
        meta: {
          title: '填写审查意见'
        },
        component: () => import('@/pages/review-opinion/detail')
      },
      {
        path: '/reviewReport',
        name: 'reviewReport',
        meta: {
          title: '审查报告管理'
        },
        component: () => import('@/pages/review-report')
      },
      {
        path: '/reviewReport/detail',
        name: 'reviewReport/detail',
        meta: {
          title: '审查报告管理'
        },
        component: () => import('@/pages/review-report/detail')
      },
      {
        path: '/reviewCenter',
        name: 'reviewCenter',
        meta: {
          title: '业务审批中心'
        },
        component: () => import('@/pages/review-center')
      }
    ]
  },
  {
    path: '/reviewSet',
    name: 'reviewSet',
    redirect: 'reviewSet/reviewRole',
    meta: {
      title: '系统基础设置'
    },
    component: () => import('@/pages/review-set'),
    children: [
      {
        path: '/reviewSet/reviewProcess',
        name: 'reviewSet/reviewProcess',
        meta: {
          title: '审批流程管理'
        },
        component: () => import('@/pages/review-set/review-process')
      },
      {
        path: '/reviewSet/reviewReceive',
        name: 'reviewSet/reviewReceive',
        meta: {
          title: '审批流程管理'
        },
        component: () => import('@/pages/review-set/review-receive')
      },
      {
        path: '/reviewSet/reviewRole',
        name: 'reviewSet/reviewRole',
        meta: {
          title: '审批角色设置'
        },
        component: () => import('@/pages/review-set/review-role')
      },
      {
        path: '/reviewSet/reviewDepartment',
        name: 'reviewSet/reviewDepartment',
        meta: {
          title: '审批角色设置'
        },
        component: () => import('@/pages/review-set/review-department')
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
