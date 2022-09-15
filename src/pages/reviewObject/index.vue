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
                style="width:100%"
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
                style="width:100%"
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
    <div class="mt20"></div>
    <div class="common-table">
      <Table :columns="columns" :loading="loading" :data="dataList">
        <template slot="status" slot-scope="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(row)">
              <i class="iconfont icon-xiangqing"></i>
              详情</span
            >
            <span @click="handleDistribute(row)"><i class="iconfont icon-fenfa"></i>分发审查对象</span>
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
  </div>
</template>

<script>
import { instanceStatus, taskStatusEnumList } from '@/libs/enum';
import * as requestRefers from '@/api/review';
export default {
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
    // 查看详情
    openDetailInfo(val) {
      this.$router.push({
        path: '/reviewTask/detail',
        query: {
          id: val.id
        }
      });
    },
    // 分发点击
    handleDistribute(val) {
      this.$router.push({
        path: '/reviewObject/detail',
        query: {
          id: val.id
        }
      });
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
    // 查询列表
    getDataList() {
      requestRefers
        .dffPage({
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
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style></style>
