<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="formValidate" :model="formValidate" :label-width="100">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.taskBatch" maxlength="40"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务名称：">
              <Input v-model="formValidate.taskName" maxlength="100"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <Button type="primary" class="search" @click="searchFn">查询</Button>
          </Col>
        </Row>
        <Row :gutter="88">
          <!-- <Col span="7">
            <FormItem label="审核结果：">
              <Select v-model="formValidate.taskStatus" clearable placeholder="">
                <Option v-for="item in auditResultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="送审时间：">
              <DatePicker
                type="datetimerange"
                v-model="formValidate.endDate"
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
            <!-- <FormItem label="送审人员：">
              <Input v-model="formValidate.userName"></Input>
            </FormItem> -->
          </Col>

          <Col span="3">
            <Button class="reset" @click="resetForm">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="center-tab">
      <span :class="active == 0 ? 'active' : ''" @click="activeFn(0)">意见审核（{{ opinionTotal }}）</span>
      <span :class="active == 1 ? 'active' : ''" @click="activeFn(1)">报告审核（{{ reviewTotal }}）</span>
    </div>
    <div class="common-table">
      <Table :columns="columns" :data="dataList" :loading="loading">
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(row)">
              <i class="iconfont icon-xiangqing"></i>
              详情
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
  </div>
</template>

<script>
import { auditResultEnumList } from '@/libs/enum';
import * as requestRefers from '@/api/review';
export default {
  data() {
    return {
      opinionTotal: 0,
      reviewTotal: 0,
      auditResultList: auditResultEnumList,
      active: 0,
      total: 0,
      formValidate: {},
      loading: true,
      params: {
        limit: 10,
        page: 1,
        uid: this.$getUserId()
      },
      dataList: [],
      columns: [
        {
          title: '业务编号',
          key: 'taskBatch',
          align: 'center'
        },
        {
          title: '业务事项',
          key: 'ywsx',
          align: 'left'
        },
        {
          title: '数据标题',
          key: 'taskName',
          align: 'left'
        },
        {
          title: '审核流程',
          key: 'nodeName',
          align: 'center'
        },
        // {
        //   title: '审核结果',
        //   key: 'statusHide',
        //   align: 'center'
        // },
        {
          title: '送审人员',
          key: 'submitApproveName',
          align: 'center'
        },
        {
          title: '送审时间',
          key: 'submitApproveTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ]
    };
  },
  methods: {
    searchFn() {
      switch (this.active) {
        case 0:
          this.getOpinionDataList();
          break;
        case 1:
          this.getReviewDataList();
          break;

        default:
          break;
      }
    },
    // tab切换
    activeFn(index) {
      this.$set(this.params, 'page', 1);
      this.active = index;
      switch (this.active) {
        case 0:
          this.getOpinionDataList();
          break;
        case 1:
          this.getReviewDataList();
          break;

        default:
          break;
      }
    },
    resetForm() {
      this.$set(this.params, 'page', 1);
      this.formValidate = {};
      switch (this.active) {
        case 0:
          this.getOpinionDataList();
          break;
        case 1:
          this.getReviewDataList();
          break;

        default:
          break;
      }
    },
    // 查询审查意见审批列表列表
    getOpinionDataList() {
      this.loading = true;
      requestRefers
        .distributeApprovePage({
          ...this.params,
          ...this.formValidate
        })
        .then((res) => {
          this.dataList = res.list || [];
          this.loading = false;
          this.total = res.total || 0;
          this.opinionTotal = res.total || 0;
          this.dataList.forEach((item) => {
            item.statusHide = this.enumConversion(auditResultEnumList, 'value', item.taskStatus, 'label');
            item.class = this.enumConversion(auditResultEnumList, 'value', item.taskStatus, 'class');
          });
        });
    },
    // 查询审查报告审批列表列表
    getReviewDataList() {
      this.loading = true;
      requestRefers
        .reportApprovePage({
          ...this.params,
          ...this.formValidate
        })
        .then((res) => {
          this.reviewTotal = res.total || 0;
          if (this.active == 0) {
            return;
          }
          this.dataList = res.list || [];
          this.loading = false;
          this.total = res.total || 0;

          this.dataList.forEach((item) => {
            this.$set(item, 'taskName', item.reportName);
            item.statusHide = this.enumConversion(auditResultEnumList, 'value', item.taskStatus, 'label');
            item.class = this.enumConversion(auditResultEnumList, 'value', item.taskStatus, 'class');
          });
        });
    },
    // 分页
    pageCurrentChangeHandle(data) {
      this.params.page = data;
      switch (this.active) {
        case 0:
          this.getOpinionDataList();
          break;
        case 1:
          this.getReviewDataList();
          break;

        default:
          break;
      }
    },
    // 翻页
    pageSizeChangeHandle(data) {
      this.params.limit = data;
      switch (this.active) {
        case 0:
          this.getOpinionDataList();
          break;
        case 1:
          this.getReviewDataList();
          break;

        default:
          break;
      }
    },
    // 送审时间选中
    changeEndDate(date) {
      this.formValidate.startTime = date[0];
      this.formValidate.endTime = date[1];
    },
    // 详情
    openDetailInfo(val) {
      switch (this.active) {
        case 0:
          this.$router.push({
            path: '/reviewOpinion/detail',
            query: {
              id: val.id,
              flag: 0
            }
          });
          break;
        case 1:
          this.$router.push({
            path: '/reviewReport/detail',
            query: {
              id: val.id,
              flag: 0
            }
          });
          break;

        default:
          break;
      }
    }
  },
  created() {
    this.getOpinionDataList();
    this.getReviewDataList();
  }
};
</script>

<style></style>
