<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="dataForm" :model="dataForm" :label-width="100">
        <Row :gutter="88">
          <Col span="6">
            <FormItem label="任务批次：">
              <Input v-model="dataForm.input"></Input>
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
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="handleSelectUser"><i class="iconfont icon-shezhi" style="margin-right:0"></i> 人员设置</span>
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
    <select-user v-model="isSelectUser" currentTitle="人员选择" @setDataList="getUserList" />
    <add-role v-model="isAddRole" @reloadList="getDataList" />
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
          title: '角色名',
          key: 'roleName',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createDate',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
        },
        {
          title: '已设置人员',
          key: 'person',
          align: 'center'
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
    // 获取已选人员
    getUserList(data) {
      console.log(data);
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
        content: '确定要移除' + val.roleName + '么？',
        onOk: () => {
          const params = {
            id: val.id
          };
          requestRefers.roleDelete(params).then((res) => {
            this.$Message.success('移除成功');
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

<style></style>
