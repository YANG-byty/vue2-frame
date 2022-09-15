<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="dataForm" :model="dataForm" :label-width="100">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="dataForm.taskBatch" maxlength="40"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务名称：">
              <Input v-model="dataForm.taskName" maxlength="100"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="需求单位：">
              <Input v-model="dataForm.deptName" maxlength="64"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <Button type="primary" class="search" @click="getDataList">查询</Button>
          </Col>
        </Row>
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务截止：">
              <DatePicker
                type="datetimerange"
                v-model="dataForm.endDate"
                clearable
                placeholder=""
                format="yyyy-MM-dd HH:mm"
                @on-change="changeEndDate"
                :editable="false"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务状态：">
              <Select v-model="dataForm.status" clearable placeholder="">
                <Option v-for="item in taskStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="创建时间：">
              <DatePicker
                type="datetimerange"
                style="width: 100%"
                v-model="dataForm.acquiredDate"
                clearable
                :editable="false"
                placeholder=""
                format="yyyy-MM-dd HH:mm"
                @on-change="changeCreatDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="3">
            <Button class="reset" @click="resetForm">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="center-button">
      <Button type="primary" @click="handleAddForm">新建审查任务</Button>
    </div>
    <div class="common-table">
      <Table :columns="columns" :data="dataList" :loading="loading">
        <template slot="status" slot-scope="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(row, 0)">
              <i class="iconfont icon-xiangqing"></i>
              详情</span
            >
            <span @click="handleUpdate(row)" v-if="row.taskStatus == 1"> <i class="iconfont icon-bianji"></i>编辑</span>
            <span class="red" @click="handleDelet(row)" v-if="row.taskStatus == 1 || row.taskStatus == 0"
              ><i class="iconfont icon-yichu"></i>删除</span
            >
            <span @click="handleCancel(row)" class="red" v-if="row.taskStatus == 2"
              ><i class="iconfont icon-zuofei"></i>作废</span
            >
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
    <add-form v-model="isAddForm" @reloadList="reloadList" :id="id"></add-form>
  </div>
</template>

<script>
import { mixinAddForm } from './AddForm';
import { taskStatusEnumList } from '@/libs/enum';
import * as requestRefers from '@/api/review';
export default {
  mixins: [mixinAddForm],
  data() {
    return {
      dataForm: {},
      dataList: [],
      total: 0,
      taskStatusList: taskStatusEnumList,
      loading: true,
      params: {
        limit: 10,
        page: 1
      },
      columns: [
        {
          title: '任务批次',
          key: 'taskBatch',
          align: 'center'
        },
        {
          title: '任务名称',
          key: 'taskName',
          align: 'center'
        },
        {
          title: '需求单位',
          key: 'deptName',
          align: 'center'
        },
        {
          title: '任务截止',
          key: 'endTime',
          align: 'center'
        },
        {
          title: '任务状态',
          slot: 'status',
          align: 'center'
        },
        {
          title: '审查对象',
          key: 'personNum',
          align: 'center'
        },
        {
          title: '已分发对象',
          key: 'personDisNum',
          align: 'center'
        },
        {
          title: '审查任务进度',
          key: 'taskPace',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
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
    // 接收子组件数据
    reloadList() {
      this.getDataList();
    },
    // 创建时间选中
    changeCreatDate(date) {
      this.dataForm.createStartTime = date[0];
      this.dataForm.createEndTime = date[1];
    },
    // 截止时间选中
    changeEndDate(date) {
      this.dataForm.startTime = date[0];
      this.dataForm.endTime = date[1];
    },
    // 跳转详情
    openDetailInfo(val) {
      this.$router.push({
        path: '/reviewTask/detail',
        query: {
          id: val.id
        }
      });
    },
    // 查询列表
    getDataList() {
      requestRefers
        .reviewTaskPage({
          ...this.params,
          ...this.dataForm
        })
        .then((res) => {
          this.dataList = res.list || [];
          this.loading = false;
          this.total = res.total || 0;
          this.dataList.forEach((item) => {
            item.statusHide = this.enumConversion(taskStatusEnumList, 'value', item.taskStatus, 'label');
            item.class = this.enumConversion(taskStatusEnumList, 'value', item.taskStatus, 'class');
          });
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
    // 编辑点击
    handleUpdate(val) {
      this.id = val.id;
      this.isAddForm = true;
    },
    // 删除点击
    handleDelet(val) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除任务' + val.taskName + '么？',
        onOk: () => {
          requestRefers.del(val.id).then((res) => {
            this.$Message.success('删除任务' + val.taskName + '成功');
            this.getDataList();
          });
        },
        onCancel: () => {
          return false;
        }
      });
    },
    // 作废按钮点击
    handleCancel(val) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定作废任务' + val.taskName + '么？',
        onOk: () => {
          requestRefers.cancel(val.id).then((res) => {
            this.$Message.success('作废任务' + val.taskName + '成功');
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
