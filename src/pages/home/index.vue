<template>
  <div class="home">
    <div class="header">
      <div class="left-time"><i class="iconfont icon-shijian"></i> {{ nowTime }}</div>
      <span class="center-title">干部党风廉政审查系统</span>
      <div class="right-user"><i class="iconfont icon-gerenzhongxin"></i>{{ name }}</div>
    </div>
    <div class="home-center">
      <div @click="goModule('reviewTask')">
        <img src="../../assets/images/center1.png" alt="" />
        <p>新建审查任务</p>
      </div>
      <div @click="goModule('reviewObject')">
        <img src="../../assets/images/center2.png" alt="" />
        <p>分发审查对象</p>
      </div>
      <div @click="goModule('reviewOpinion')">
        <img src="../../assets/images/center3.png" alt="" />
        <p>填写审查意见</p>
      </div>
      <div @click="goModule('reviewReport')">
        <img src="../../assets/images/center4.png" alt="" />
        <p>审查报告管理</p>
      </div>
      <div @click="goModule('reviewCenter')">
        <img src="../../assets/images/center5.png" alt="" />
        <p>业务审批中心</p>
      </div>
      <div @click="goReviewMaster">
        <img src="../../assets/images/center6.png" alt="" />
        <p>系统基础设置</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import util from '@/libs/util';
export default {
  data() {
    return {
      nowTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      name: util.cookies.get('authName')
    };
  },
  methods: {
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
    }
  },
  created() {
    setInterval(this.getNowTime, 1000);
  }
};
</script>

<style lang="less" scoped src="./style.less"></style>
