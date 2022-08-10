<template>
  <div class="home">
    <div class="header">
      <div class="left-time"><i class="iconfont icon-shijian"></i> {{ nowTime }}</div>
      <span class="center-title">干部党风廉政审查系统</span>
      <div class="right-user">
        <Dropdown @on-click="exitFn">
          <div class="flex-right"><i class="iconfont icon-gerenzhongxin"></i>{{ name }}</div>
          <DropdownMenu slot="list">
            <DropdownItem>关闭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="home-center">
      <div @click="goModule('reviewTask')" v-if="userPermissionList.includes('reviewTask')">
        <img src="../../assets/images/center1.png" alt="" />
        <p>新建审查任务</p>
      </div>
      <div @click="goModule('reviewObject')" v-if="userPermissionList.includes('reviewObject')">
        <img src="../../assets/images/center2.png" alt="" />
        <p>分发审查对象</p>
      </div>
      <div @click="goModule('reviewOpinion')" v-if="userPermissionList.includes('reviewOpinion')">
        <img src="../../assets/images/center3.png" alt="" />
        <p>填写审查意见</p>
        <span v-if="distributeCount">{{ distributeCount }}</span>
      </div>
      <div @click="goModule('reviewReport')" v-if="userPermissionList.includes('reviewReport')">
        <img src="../../assets/images/center4.png" alt="" />
        <p>审查报告管理</p>
      </div>
      <div @click="goModule('reviewCenter')" v-if="userPermissionList.includes('reviewCenter')">
        <img src="../../assets/images/center5.png" alt="" />
        <p>业务审批中心</p>
        <span v-if="approveCount">{{ approveCount }}</span>
      </div>
      <div @click="goReviewMaster" v-if="userPermissionList.includes('reviewSet')">
        <img src="../../assets/images/center6.png" alt="" />
        <p>系统基础设置</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as requestRefers from '@/api/review';
import * as userRoleRefers from '@/api/user-role';
import moment from 'moment';
import util from '@/libs/util';
export default {
  data() {
    return {
      nowTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      name: util.cookies.get('authName'),
      approveCount: 0,
      distributeCount: 0,
      userPermissionList: []
    };
  },
  methods: {
    exitFn() {
      window.opener = null;
      window.open('about:blank', '_top').close();
    },
    // 获取审查意见及审批中心数量
    countFn() {
      requestRefers.getCount(this.$getUserId()).then((res) => {
        this.approveCount = res.approveCount;
        this.distributeCount = res.distributeCount;
      });
    },
    // 路由跳转
    goModule(val) {
      this.$router.push(val);
    },
    // 系统基础设置
    goReviewMaster() {
      const { href } = this.$router.resolve({
        path: '/reviewSet'
      });
      window.open(href, '_blank');
    },
    getNowTime() {
      this.nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    },
    // 获取用户权限
    userPermissionFn() {
      userRoleRefers.userMenu().then((res) => {
        if (res) {
          let list = res.filter((value) => value.title == '廉政审查');
          this.userPermissionList = list.length > 0 ? list[0].children.map((item) => item.path) : [];
        }
      });
    }
  },
  created() {
    setInterval(this.getNowTime, 1000);
    this.userPermissionFn();
    this.countFn();
  }
};
</script>

<style lang="less" scoped src="./style.less"></style>
