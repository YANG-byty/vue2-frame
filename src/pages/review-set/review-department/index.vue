<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="dataForm" :model="dataForm" :label-width="100">
        <Row :gutter="88">
          <Col span="6">
            <FormItem label="部室名称：">
              <Input v-model="dataForm.orgName"></Input>
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
      <Button type="primary" @click="handleAddDepartment">新建部门</Button>
    </div>
    <div class="common-table">
      <Table :columns="columns" :data="dataList" :loading="loading">
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="handleUpdateDepartment(row)"> <i class="iconfont icon-bianji"></i>编辑</span>
          </div>
        </template>
        <template slot="person" slot-scope="{ row }">
          <span class="blue-tag" v-for="item in row.userList" :key="item.uid">{{ item.userName }}</span>
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
    <add-department v-model="isAddDepartment" @reloadList="getDataList" :orgInfo="orgInfo" />
  </div>
</template>

<script>
import * as requestRefers from '@/api/user-role';
import { mixinAddDepartment } from '@/libs/mixin';
export default {
  mixins: [mixinAddDepartment],
  data() {
    return {
      dataForm: {},
      dataList: [],
      total: 0,
      loading: true,
      params: {
        limit: 10,
        page: 1
      },
      columns: [
        {
          title: '部室名称',
          key: 'orgName',
          align: 'left'
        },
        {
          title: '接收人员',
          slot: 'person',
          align: 'left'
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
        .userOrgPage({
          ...this.params,
          ...this.dataForm
        })
        .then((res) => {
          this.dataList = res || [];
          this.loading = false;
          // this.total = res.total || 0;
          this.total = res.length;
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
