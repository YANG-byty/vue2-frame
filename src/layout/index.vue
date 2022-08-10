<template>
  <div>
    <div class="header">
      <div class="left-logo"><i class="iconfont icon-logo"></i>干部党风廉政审查系统</div>
      <div class="right-name">
        <Dropdown @on-click="exitFn">
          <div class="flex-right"><i class="iconfont icon-gerenzhongxin"></i>{{ name }}</div>
          <DropdownMenu slot="list">
            <DropdownItem>关闭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="go-back">
      <Button class="reset" style="margin-right: 10px" @click="goHome"
        ><Icon style="font-size: 18px" type="md-home" /> 首页</Button
      >
      <Button class="reset" @click="goBack"><i class="iconfont icon-fanhui"></i> 返回</Button>
      <!-- <div @click="goBack" class="cp" style="display: inline-block"><i class="iconfont icon-fanhui"></i> 返回</div> -->
      <span class="router-title">{{ touterTitle }}</span>
    </div>
    <router-view />
  </div>
</template>

<script>
import util from '@/libs/util';
export default {
  data() {
    return {
      name: util.cookies.get('authName'),
      touterTitle: ''
    };
  },
  created() {
    this.getRouterTitle();
  },
  methods: {
    goHome() {
      this.$router.replace('/');
    },
    exitFn() {
      window.opener = null;
      window.open('about:blank', '_top').close();
    },
    goBack() {
      this.$router.go(-1);
    },
    getRouterTitle() {
      this.touterTitle = this.$route.meta.title;
    }
  },
  watch: {
    $route(to, from) {
      this.touterTitle = this.$route.meta.title;
    }
  }
};
</script>

<style lang="less" scoped>
.reset {
  border: 1px solid #008cff;
  color: #008cff;
}
.header {
  height: 82px;
  background: #011e3c;
  min-width: 1460px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  .left-logo {
    font-size: 32px;
    font-family: Alef-Bold, Alef;
    text-shadow: 0px 0px 10px #105ed9;
    font-weight: bold;
    color: #b1cffc;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 44px;
      margin-right: 13px;
    }
  }
  .right-name {
    font-size: 20px;
    color: #ffffff;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 35px;
      margin-right: 11px;
    }
  }
}
</style>
