<template>
  <div class="common-content">
    <div class="detail-top">
      <p class="title">任务名称：{{ dataJson.taskName || '--' }}</p>
      <div class="detail-item">
        <Row :gutter="100" class="mt20">
          <Col span="5">任务批次：{{ dataJson.taskBatch || '--' }} </Col>
          <Col span="5">任务状态：{{ dataJson.taskStatusHide }}</Col>
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
    <div class="mt20"></div>
    <div class="detail-info">
      <p class="title">审查进度</p>
      <div class="content-box">
        <Row :gutter="18">
          <Col span="12">
            <div class="info-title">
              <p class="left-size">审查对象</p>
            </div>
            <div class="common-table cp-table">
              <Table :columns="columns" highlight-row :data="dataJson.personList" @on-row-click="handleRowClick">
                <template slot="num" slot-scope="{ row, index }">
                  <span> {{ index + 1 }}</span>
                </template>
              </Table>
            </div>
          </Col>
          <Col span="12">
            <div class="info-title">
              <span class="left-size">征求部门</span>
              <Button @click="handleSelectOrg" v-if="dataJson.taskStatus == 2 || dataJson.taskStatus == 1">选择部门</Button>
            </div>
            <div class="org-item" v-for="(item, index) in distributeInfoList" :key="index">
              <div class="org-title">
                {{ item.userName }}【{{ item.supOrgName }} - {{ item.departmentHide }}】
                <div class="right">
                  <span class="red" v-if="item.taskStatus == 1" @click="handleRmove(index, item)">
                    <i class="iconfont icon-yichu-1"></i>移除
                  </span>
                </div>
              </div>
              <div class="bottom">
                <span class="text">分发备注：</span>
                <Input
                  v-model="distributeInfoList[index].remark"
                  :readonly="dataJson.taskStatus != 2 && dataJson.taskStatus != 1"
                  placeholder="请填写分发备注"
                  :autosize="{ minRows: 1, maxRows: 3 }"
                  maxlength="100"
                  type="textarea"
                  @on-blur="remarkBlurFn"
                />
              </div>
            </div>
            <div class="null" v-if="distributeInfoList.length <= 0">
              <img src="../../../assets/images/null.png" alt="" />
              <p>暂无数据</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="button-box align-right">
      <Button @click="handleOperationLog($route.query.id)">操作日志</Button>
      <Button type="primary" @click="handleSave" v-if="dataJson.taskStatus == 2 || dataJson.taskStatus == 1">保存并分发</Button>
    </div>

    <!-- 操作日志 -->
    <operation-log v-model="isOperationLog" :operationList="operationList"></operation-log>
    <!-- 部门选择 -->
    <select-org v-model="isSelectOrg" @setOrgData="getOrgData" @setSupOrgName="getSupOrgName"></select-org>
  </div>
</template>

<script>
import { mixinSelectOrg, mixinOperationLog } from '@/libs/mixin';
import * as requestRefers from '@/api/review';
import { instanceStatus } from '@/libs/enum';
import moment from 'moment';
export default {
  mixins: [mixinSelectOrg, mixinOperationLog],
  data() {
    return {
      activeIndex: 0,
      packUp: false,
      columns: [
        {
          title: '序号',
          slot: 'num',
          align: 'center',
          minWidth: 50
        },
        {
          title: '审查对象',
          key: 'userName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '现任职务',
          key: 'duty',
          align: 'center',
          minWidth: 100
        }
      ],
      dataList: [],
      formValidate: {},
      dataJson: {},
      distributeInfoList: [],
      supOrgName: '',
      rowJson: ''
    };
  },
  methods: {
    // 备注失去焦点
    remarkBlurFn() {
      this.dataJson.personList[this.activeIndex].distributeInfoList = this.distributeInfoList;
    },
    handlePackUp() {
      this.packUp = !this.packUp;
    },
    // 获取详情
    getDetailInfo() {
      const id = this.$route.query.id;
      requestRefers.getDetails(id).then(async (res) => {
        this.dataJson = res;
        this.dataJson.taskStatusHide = instanceStatus(this.dataJson.taskStatus);
        // 默认选中第一行
        this.rowJson = this.dataJson.personList[0];
        this.dataJson.personList[0]['_highlight'] = true;
        if (this.dataJson.endTime <= moment(new Date()).format('YYYY-MM-DD')) {
          this.dataJson.taskStatus = 3;
        }
        this.distributeInfoList = this.dataJson.personList[0].distributeInfoList;
        // await this.getUserListInfo(this.rowJson);
      });
    },
    // 设置数据
    setDistributeInfo() {
      this.distributeInfoList.forEach((item) => {
        item.supOrgName = this.supOrgName;
        item.userName = this.rowJson.userName;
        item.departmentHide = item.departmentHide;
        item.departmentCode = item.departmentCode;
        item.applyId = this.rowJson.applyId;
        item.duty = this.rowJson.duty;
        item.personId = this.rowJson.id;
      });
    },
    // 获取人员列表信息
    // getUserListInfo(val) {
    //   const data = {
    //     personId: val.id,
    //     taskBatch: this.dataJson.taskBatch
    //   };
    //   requestRefers.getDistributePage(data).then((res) => {
    //     this.distributeInfoList = res;
    //   });
    // },
    // table 点击
    handleRowClick(row, index) {
      this.activeIndex = index;
      if (row.id == this.rowJson.id) return;
      this.rowJson = row;
      this.distributeInfoList = row.distributeInfoList;
      // this.getUserListInfo(row);
    },
    // 移除按钮点击
    handleRmove(index, val) {
      if (val.isAdd) {
        this.distributeInfoList.splice(index, 1);
        this.dataJson.personList[this.activeIndex].distributeInfoList = this.distributeInfoList;
        return;
      }
      this.$Modal.confirm({
        title: '提示',
        content: '确定要移除' + val.supOrgName + '-' + val.departmentHide + '么？',
        onOk: () => {
          requestRefers.distributeDel(val.id).then((res) => {
            this.$Message.success('移除成功');
            this.distributeInfoList.splice(index, 1);
            this.dataJson.personList[this.activeIndex].distributeInfoList = this.distributeInfoList;
            // this.getUserListInfo(this.rowJson);
          });
        },
        onCancel: () => {
          return false;
        }
      });
    },
    // 获取顶级部门名称
    getSupOrgName(data) {
      this.supOrgName = data;
    },
    // 获取选中的部门
    getOrgData(data) {
      data.forEach((item) => {
        item.departmentCode = item.id;
        item.departmentHide = item.orgName;
        item.isAdd = true;
        item.taskStatus = 1;
        delete item.id;
      });
      this.distributeInfoList = this.distributeInfoList.concat(data);
      console.log(this.distributeInfoList);
      this.setDistributeInfo();
      const map = new Map();
      // 去重
      this.distributeInfoList = this.distributeInfoList.filter(
        (key) => !map.has(key.departmentCode) && map.set(key.departmentCode, 1)
      );

      this.dataJson.personList[this.activeIndex].distributeInfoList = this.distributeInfoList;
    },

    // 保存并分发
    handleSave() {
      let deptList = [];
      this.dataJson.personList.map((item) => {
        item.distributeInfoList.map((value) => {
          deptList.push(value);
        });
      });
      if (deptList.length <= 0) {
        this.$Message.info('征求部门不能为空');
        return;
      }
      const data = {
        deptList,
        endTime: this.dataJson.endTime,
        taskBatch: this.dataJson.taskBatch,
        taskName: this.dataJson.taskName,
        createBy: this.$getUserId()
      };
      requestRefers.updateDept(data).then((res) => {
        this.$Message.success('分发成功');
        this.getDetailInfo();
      });
    }
  },
  created() {
    this.getDetailInfo();
  }
};
</script>

<style scoped lang="less">
.info-title {
  border-bottom: none !important;
  padding: 0 !important;
}
.content-box {
  height: calc(~'100vh - 450px');
  overflow-y: auto;
}
</style>
