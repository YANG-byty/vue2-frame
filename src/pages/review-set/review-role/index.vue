<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="dataForm" :model="dataForm" :label-width="100">
        <Row :gutter="88">
          <Col span="6">
            <FormItem label="节点名称：">
              <Input v-model="dataForm.roleName"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <Button class="mr10 reset" @click="resetForm">重置</Button>
            <Button type="primary" class="search" @click="getDataList">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="center-button">
      <Button type="primary" @click="handleAddRole">新建角色</Button>
    </div>
    <div class="common-table">
      <Table :columns="columns" :data="dataList" :loading="loading">
        <template slot="person" slot-scope="{ row }">
          <span class="blue-tag" v-for="item in row.userList" :key="item.uid">{{ item.userName }}</span>
        </template>
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="handleSelectUser(row)"><i class="iconfont icon-shezhi" style="margin-right: 0"></i> 人员设置</span>
            <span @click="handleUpdate(row)"> <i class="iconfont icon-bianji"></i>编辑</span>
            <span class="red" @click="handleRemoveUser(row)"> <i class="iconfont icon-yichu-1"></i>删除</span>
          </div>
        </template>
      </Table>
    </div>
    <div class="common-page align-right">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        @on-change="pageCurrentChangeHandle"
        @on-page-size-change="pageSizeChangeHandle"
      />
    </div>
    <select-user
      v-model="isSelectUser"
      currentTitle="人员选择"
      @setDataList="getUserList"
      @resetDataList="resetDataList"
      :userList="userList"
    />
    <add-role v-model="isAddRole" @reloadList="getDataList" :id="id" />
  </div>
</template>

<script>
import { mixinSelectUser, mixinAddRole } from '@/libs/mixin';
import * as requestRefers from '@/api/user-role';
export default {
  mixins: [mixinSelectUser, mixinAddRole],
  data() {
    return {
      dataForm: {
        roleName: ''
      },
      dataList: [],
      total: 0,
      loading: true,
      params: {
        limit: 10,
        page: 1
      },
      columns: [
        {
          title: '节点名称',
          key: 'roleName',
          align: 'left',
          minWidth: 100
        },
        {
          title: '节点负责人员',
          // key: 'person',
          align: 'left',
          slot: 'person',
          minWidth: 100
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          minWidth: 200
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          minWidth: 100
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 300
        }
      ]
    };
  },
  methods: {
    resetDataList(data) {
      this.userList = data;
    },
    // 获取已选人员
    getUserList(data) {
      let userList = [];
      if (data.length > 0) {
        data.map((item) => {
          userList.push({
            uid: item.userId,
            userName: item.nickName
          });
        });
      }
      let obj = {
        roleId: this.roleId,
        userList
      };
      this.userList = [];
      requestRefers.userRoleAdd(obj).then((res) => {
        this.$Message.success('人员设置成功');
        this.getDataList();
      });
    },
    // 查询列表
    getDataList() {
      requestRefers
        .rolePage({
          ...this.params,
          ...this.dataForm
        })
        .then((res) => {
          this.dataList = res.list || [];
          this.loading = false;
          this.total = res.total || 0;
        });
    },
    // 重置
    resetForm() {
      this.dataForm = {};
      this.getDataList();
    },
    // 分页
    pageCurrentChangeHandle(data) {
      this.params.page = data;
      this.getDataList();
    },
    // 翻页
    pageSizeChangeHandle(data) {
      this.params.limit = data;
      this.getDataList();
    },
    // 角色删除点击
    handleRemoveUser(val) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要删除' + val.roleName + '么？',
        onOk: () => {
          const params = {
            id: val.id
          };
          requestRefers.roleDelete(params).then((res) => {
            this.$Message.success('删除成功');
            this.getDataList();
          });
        },
        onCancel: () => {
          return false;
        }
      });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.blue-tag {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  background: #2d8cf0;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  color: #ffffff;
}
</style>
