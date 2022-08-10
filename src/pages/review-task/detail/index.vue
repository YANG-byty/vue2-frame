<template>
  <div class="common-content">
    <div class="detail-top">
      <p class="title">任务名称：{{ dataJson.taskName || '--' }}</p>
      <div class="detail-item">
        <Row :gutter="100" class="mt20">
          <Col span="5">任务批次：{{ dataJson.taskBatch || '--' }} </Col>
          <Col span="5">任务状态：{{ dataJson.taskStatusHide || '--' }}</Col>
          <Col span="5">任务截止：{{ dataJson.endTime || '--' }}</Col>
          <Col span="5">任务剩余：{{ dataJson.dayNum || '--' }}</Col>
        </Row>
        <Row :gutter="100">
          <Col span="5">任务联系人：{{ dataJson.contactPerson || '--' }}</Col>
          <Col span="5">联系人电话：{{ dataJson.contactPhone || '--' }}</Col>
          <Col span="5">需求单位：{{ dataJson.deptName || '--' }}</Col>
        </Row>
      </div>
    </div>
    <div class="detail-center-button align-right">
      <Button @click="handleOperationLog($route.query.id)">操作日志</Button>
      <Button @click="handleSendDing(1, $route.query.id)" v-if="dataJson.taskStatus == 2 && personList.length > 0">催办</Button>
      <Button @click="handleUpdate(dataJson)" v-if="dataJson.taskStatus == 1">编辑</Button>
      <Button @click="handleDel" v-if="dataJson.taskStatus == 1 || dataJson.taskStatus == 0">删除</Button>
      <Button type="primary" @click="handleCancel(dataJson)" v-if="dataJson.taskStatus == 2">作废</Button>
    </div>
    <div class="detail-info">
      <p class="title">审查进度</p>
      <div class="info">
        <div class="info-title">
          <span class="left-size">评价对象</span>
        </div>
      </div>
      <div class="detail-table common-table">
        <div class="detail-content" v-for="(item, index) in personList" :key="item.applyId">
          <p class="table-title flex-right">
            <span>{{ item.userName }}【{{ item.duty }}】</span>
            <Button @click="handlePackUp(index)">{{ item.packUp ? '展开' : '收起' }}</Button>
          </p>
          <div class="table-border" :class="item.packUp ? 'pack-up' : ''">
            <Table :columns="columns" :data="item.distributeInfoList">
              <template slot="num" slot-scope="{ row, index }">
                <span>{{ index + 1 }}</span>
              </template>
              <template slot="statusHide" slot-scope="{ row, index }">
                <span :class="row.class">{{ row.statusHide }}</span>
              </template>
              <template slot="action" slot-scope="{ row }">
                <div class="table-action">
                  <span @click="openDetailInfo(row, 0)">
                    <i class="iconfont icon-xiangqing"></i>
                    详情
                  </span>
                  <span @click="handleSendDing(2, row.id)" v-if="row.taskStatus == 1">
                    <i class="iconfont icon-cuiban"></i>
                    催办
                  </span>
                </div>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>
    <!-- 操作日志 -->
    <operation-log v-model="isOperationLog" :operationList="operationList"></operation-log>
    <!-- 催办 -->
    <send-ding v-model="isSendDing" @CuiBanForm="CuiBanForm"></send-ding>
    <add-form v-model="isAddForm" @reloadList="reloadList" :id="id"></add-form>
  </div>
</template>

<script>
import { mixinSendDing, mixinOperationLog } from '@/libs/mixin';
import { mixinAddForm } from '../add-form';
import * as requestRefers from '@/api/review';
import { instanceStatus, auditResultEnumList } from '@/libs/enum';
import moment from 'moment';
export default {
  mixins: [mixinSendDing, mixinOperationLog, mixinAddForm],
  data() {
    return {
      packUp: false,
      columns: [
        {
          title: '序号',
          slot: 'num',
          align: 'center',
          width: 80
        },
        {
          title: '征求单位',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, '【' + params.row.supOrgName + '】' + '【' + params.row.departmentHide + '】');
          },
          width: 400
        },
        {
          title: '反馈意见类型',
          key: 'appraiseType',
          align: 'center'
        },
        {
          title: '分发时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '反馈意见审核结果',
          slot: 'statusHide',
          align: 'center'
        },
        {
          title: '完成时间',
          key: 'endTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      dataList: [],
      dataJson: {},
      personList: []
    };
  },
  methods: {
    // 点击催办保存
    CuiBanForm(data) {
      let obj = {
        msgType: this.msgType, //催办类型 全部-1  指定-2
        instanceId: this.instanceId,
        msg: data.CBcontent
      };
      requestRefers.msgPushAdd(obj).then((res) => {
        this.$Message.success('催办成功');
      });
    },
    // 收起展开
    handlePackUp(i) {
      this.$set(this.dataJson.personList[i], 'packUp', !this.dataJson.personList[i].packUp);
    },
    // 获取详情
    getDetailInfo() {
      const id = this.$route.query.id;
      requestRefers.getDetails(id).then((res) => {
        this.dataJson = res;
        this.dataJson.taskStatusHide = instanceStatus(this.dataJson.taskStatus);
        if (this.dataJson.endTime <= moment(new Date()).format('YYYY-MM-DD')) {
          this.dataJson.taskStatus = 3;
        }
        this.personList = this.dataJson.personList || [];
        this.personList.forEach((item) => {
          if (item.distributeInfoList.length > 0) {
            item.distributeInfoList.map((value) => {
              value.statusHide = this.enumConversion(auditResultEnumList, 'value', value.taskStatus, 'label');
              value.class = this.enumConversion(auditResultEnumList, 'value', value.taskStatus, 'class');
            });
          }
        });
      });
    },
    // 编辑点击
    handleUpdate(val) {
      this.id = val.id;
      this.isAddForm = true;
    },
    // 详情点击
    openDetailInfo(val, flag) {
      this.$router.push({
        path: '/reviewOpinion/detail',
        query: {
          id: val.id,
          flag: flag,
          instanceId: val.instanceId
        }
      });
    },
    // 接收子组件
    reloadList() {
      this.packUp = false;
      this.getDetailInfo();
    },
    // 删除按钮点击
    handleDel() {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除任务' + this.dataJson.taskName + '么？',
        onOk: () => {
          const id = this.$route.query.id;
          requestRefers.del(id).then((res) => {
            this.$Message.success('删除任务' + this.dataJson.taskName + '成功');
            this.$router.go(-1);
          });
        },
        onCancel: () => {
          return false;
        }
      });
    },
    // 作废按钮点击
    handleCancel() {
      this.$Modal.confirm({
        title: '提示',
        content: '确定作废任务' + this.dataJson.taskName + '么？',
        onOk: () => {
          const id = this.$route.query.id;
          requestRefers.cancel(id).then((res) => {
            this.$Message.success('作废任务' + this.dataJson.taskName + '成功');
            this.$router.go(-1);
          });
        },
        onCancel: () => {
          return false;
        }
      });
    }
  },
  created() {
    this.getDetailInfo();
  }
};
</script>

<style></style>
