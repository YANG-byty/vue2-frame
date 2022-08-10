<template>
  <div>
    <Layout>
      <Header>
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
      </Header>
      <Content style="display: flex">
        <Sider width="256" class="left-sider">
          <Menu :active-name="$route.name" width="256" @on-select="selectPage">
            <!-- <MenuItem name="reviewSet/reviewProcess">审批流程设置</MenuItem>
            <MenuItem name="reviewSet/reviewReceive">审查接收设置</MenuItem> -->
            <MenuItem name="reviewSet/reviewRole">审批角色设置</MenuItem>
            <MenuItem name="reviewSet/reviewDepartment">部室接收人员设置</MenuItem>
          </Menu>
        </Sider>
        <Content>
          <router-view />
        </Content>
      </Content>
    </Layout>
  </div>
</template>

<script>
import util from '@/libs/util';
export default {
  data() {
    return {
      name: '--'
    };
  },
  methods: {
    exitFn() {
      window.opener = null;
      window.open('about:blank', '_top').close();
    },
    selectPage(route) {
      if (route == this.$route.name) return;
      this.$router.replace({
        name: route
      });
    }
  },
  created() {
    this.name = util.cookies.get('authName');
  }
};
</script>

<style lang="less" scoped>
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
