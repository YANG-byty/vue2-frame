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
            <FormItem label="审查对象：">
              <Input v-model="dataForm.userName"></Input>
            </FormItem>
          </Col>

          <Col span="3">
            <Button type="primary" class="search" @click="getDataList">查询</Button>
          </Col>
        </Row>
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="审核结果：">
              <Select v-model="dataForm.taskStatus" clearable placeholder="">
                <Option v-for="item in auditResultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
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
            <FormItem label="分发时间：">
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
    <div class="mt20"></div>
    <div class="common-table">
      <Table :columns="columns" :loading="loading" :data="dataList">
        <template slot="status" slot-scope="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(row, 0)">
              <i class="iconfont icon-xiangqing"></i>
              详情</span
            >
            <span @click="handleSendAudit"><i class="iconfont icon-fenfa"></i>送审</span>
            <span @click="openDetailInfo(row, 1)"><i class="iconfont icon-bianji"></i>填写</span>
          </div>
        </template>
        <template slot="info" slot-scope="{ row }">
          <div class="table-action">{{ row.userName }}【{{ row.duty }}】</div>
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

    <send-audit v-model="isSendAudit"></send-audit>
  </div>
</template>

<script>
import { mixinSendAudit } from '@/libs/mixin';
import * as requestRefers from '@/api/review';
import { auditResultEnumList } from '@/libs/enum';
export default {
  mixins: [mixinSendAudit],
  data() {
    return {
      dataForm: {},
      dataList: [],
      total: 0,
      auditResultList: auditResultEnumList,
      loading: true,
      params: {
        limit: 10,
        page: 1,
        uid: this.$getUserId()
      },
      columns: [
        {
          title: '业务编号',
          key: 'taskBatch',
          align: 'center'
        },
        {
          title: '任务名称',
          key: 'taskName',
          align: 'center'
        },
        {
          title: '审查对象 / 现任职务',
          align: 'center',
          slot: 'info',
          width: 200
        },
        {
          title: '任务截止',
          key: 'endTime',
          align: 'center'
        },
        {
          title: '分发时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '责任人',
          key: 'address',
          align: 'center'
        },
        {
          title: '审核结果',
          align: 'center',
          slot: 'status'
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
    // 分发时间选中
    changeCreatDate(date) {
      this.dataForm.createStartTime = date[0];
      this.dataForm.createEndTime = date[1];
    },
    // 截止时间选中
    changeEndDate(date) {
      this.dataForm.startTime = date[0];
      this.dataForm.endTime = date[1];
    },
    // 查看详情
    openDetailInfo(val, flag) {
      this.$router.push({
        path: '/reviewOpinion/detail',
        query: {
          id: val.id,
          flag: flag
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
        .reviewDistributePage({
          ...this.params,
          ...this.dataForm
        })
        .then((res) => {
          this.dataList = res.list || [];
          this.loading = false;
          this.total = res.total || 0;
          this.dataList.forEach((item) => {
            item.statusHide = this.enumConversion(auditResultEnumList, 'value', item.taskStatus, 'label');
            item.class = this.enumConversion(auditResultEnumList, 'value', item.taskStatus, 'class');
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
