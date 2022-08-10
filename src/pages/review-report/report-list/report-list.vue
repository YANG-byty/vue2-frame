<template>
  <div>
    <Drawer title="生成审查报告" v-model="visible" width="1000">
      <div class="top-form">
        <Form ref="dataForm" :model="dataForm" :label-width="100">
          <Row :gutter="88">
            <Col span="9" style="padding-right: 0">
              <FormItem label="任务名称：">
                <Input v-model="dataForm.taskName" maxlength="100" clearable></Input>
              </FormItem>
            </Col>
            <Col span="9" style="padding-right: 0">
              <FormItem label="任务截止：">
                <DatePicker
                  type="daterange"
                  v-model="dataForm.endDate"
                  clearable
                  placeholder=""
                  format="yyyy-MM-dd"
                  @on-change="changeEndDate"
                  :editable="false"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="2">
              <Button class="reset" @click="resetForm">重置</Button>
            </Col>
            <Col span="2">
              <Button type="primary" class="search" @click="getDataList">查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="common-table">
        <Table :columns="columns" :data="dataList" :loading="loading">
          <template slot="status" slot-scope="{ row }">
            <span :class="row.class">{{ row.statusHide }}</span>
          </template>
          <template slot="action" slot-scope="{ row }">
            <div class="table-action">
              <span @click="selectFn(row)">
                <Icon type="ios-checkmark-circle-outline" />
                选择
              </span>
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
    </Drawer>
  </div>
</template>

<script>
import * as requestRefers from '@/api/review';
import { taskStatusEnumList } from '@/libs/enum';
export default {
  props: ['value'],
  data() {
    return {
      dataForm: {},
      visible: false,
      dataList: [],
      total: 0,
      loading: true,
      taskStatusList: taskStatusEnumList,
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
          align: 'left',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '任务截止',
          key: 'endTime',
          align: 'center',
          width: 200
        },
        {
          title: '任务状态',
          slot: 'status',
          align: 'center'
        },
        {
          title: '审查任务进度',
          key: 'taskPace',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 100
        }
      ]
    };
  },
  methods: {
    // 选择
    selectFn(row) {
      let obj = {
        deptName: row.deptName,
        endTime: row.endTime,
        taskBatch: row.taskBatch,
        taskName: row.taskName
      };
      requestRefers.reviewReportAdd(obj).then((res) => {
        this.$Message.success('生成成功！');
        this.getDataList();
        this.$emit('selectSuccess', '');
      });
    },
    // 查询列表
    getDataList() {
      requestRefers
        .reviewTaskTaskPage({
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
    resetForm() {
      this.dataForm = {};
      this.getDataList();
    },
    // 截止时间选中
    changeEndDate(date) {
      this.dataForm.startTime = date[0];
      this.dataForm.endTime = date[1];
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
  watch: {
    value(val) {
      this.getDataList();
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style></style>
