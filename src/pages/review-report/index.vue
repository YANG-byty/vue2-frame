<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="formValidate" :model="formValidate" :label-width="100">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.taskBatch" clearable></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="审查任务：">
              <Input v-model="formValidate.taskName" clearable></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <Button type="primary" class="search" @click="getDataList">查询</Button>
          </Col>
        </Row>
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="汇总报告：">
              <Input v-model="formValidate.reportName" clearable></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="审核结果：">
              <Select v-model="formValidate.taskStatus" clearable placeholder="">
                <Option :value="item.value" v-for="item in resultEnumList" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3">
            <Button class="reset" @click="resetForm">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="mt20"></div>
    <Button @click="handleReportList" class="reset" style="margin-bottom: 20px; width: auto">生成审查报告</Button>
    <div class="common-table">
      <Table :columns="columns" :data="dataList" :loading="loading">
        <template slot="statusHide" slot-scope="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(row, 0)">
              <i class="iconfont icon-xiangqing"></i>
              详情
            </span>
            <span @click="openDetailInfo(row, 1)" v-if="row.taskStatus == 0 || row.taskStatus == 1"
              ><i class="iconfont icon-bianji"></i>编辑</span
            >
            <!-- <span @click="handleSendAudit(row)" v-if="row.taskStatus == 0 || row.taskStatus == 1"
              ><i class="iconfont icon-fenfa"></i>送审
            </span> -->
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

    <!-- 送审 -->
    <send-audit v-model="isSendAudit" @reviewCause="reviewCauseFn"></send-audit>
    <!-- 审查列表 -->
    <report-list v-model="isReportList" @selectSuccess="getDataList"></report-list>
  </div>
</template>

<script>
import * as requestRefers from '@/api/review';
import { mixinSendAudit } from '@/libs/mixin';
import { mixinReportList } from './report-list';
import { auditResultEnumList } from '@/libs/enum';
export default {
  mixins: [mixinSendAudit, mixinReportList],
  data() {
    return {
      resultEnumList: auditResultEnumList,
      isExaminationReport: false,
      formValidate: {},
      dataList: [],
      columns: [
        {
          title: '任务批次',
          key: 'taskBatch',
          align: 'center'
        },
        {
          title: '报告名称',
          key: 'reportName',
          align: 'left',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '所属审查任务',
          key: 'taskName',
          align: 'left',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '任务截止',
          key: 'endTime',
          align: 'center'
        },
        {
          title: '审核结果',
          slot: 'statusHide',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 220
        }
      ],
      params: {
        limit: 10,
        page: 1
      },
      total: 0,
      loading: true
    };
  },
  methods: {
    // 查询列表
    getDataList() {
      requestRefers
        .reviewReportPage({
          ...this.params,
          ...this.formValidate,
          uid: this.$getUserId()
        })
        .then((res) => {
          this.dataList = res.list || [];
          this.loading = false;
          this.total = res.total || 0;
          this.dataList.forEach((item) => {
            item.statusHide = this.enumConversion(this.resultEnumList, 'value', item.taskStatus, 'label');
            item.class = this.enumConversion(this.resultEnumList, 'value', item.taskStatus, 'class');
          });
        });
    },
    resetForm() {
      this.formValidate = {};
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
    // 确定送审
    reviewCauseFn(data) {
      let obj = {
        uid: this.$getUserId(),
        userName: this.$getUserName(),
        id: this.id,
        actionRemark: data
      };
      requestRefers.reviewReportSubmitApproval(obj).then((res) => {
        this.$Message.success('送审成功');
        this.getDataList();
      });
    },
    openDetailInfo(val, flag) {
      this.$router.push({
        path: '/reviewReport/detail',
        query: {
          id: val.id,
          flag: flag
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
