<template>
  <div class="common-content">
    <div class="detail-top">
      <p class="title">审查对象：{{ dataJson.userName || '--' }}</p>
      <div class="detail-item">
        <Row :gutter="100" class="mt20">
          <Col span="5">现任职务：{{ dataJson.duty || '--' }} </Col>
          <Col span="5">任务截止：{{ dataJson.endTime || '--' }}</Col>
          <Col span="5">任务剩余：{{ dataJson.dayNum || '--' }}</Col>
          <Col span="5">审核结果：{{ dataJson.taskStatusHide || '--' }}</Col>
        </Row>
        <Row :gutter="100">
          <Col span="5"> 任务批次：{{ dataJson.taskBatch || '--' }} </Col>
          <Col span="5">审查时间：{{ dataJson.taskBatch || '--' }}</Col>
          <Col span="5">任务联系人：{{ dataJson.contactPerson || '--' }}</Col>
          <Col span="5">联系人电话：{{ dataJson.contactPhone || '--' }}</Col>
        </Row>
      </div>
    </div>
    <div class="detail-center-button align-right">
      <Button @click="handleOperationLog($route.query.id)">操作日志</Button>
      <Button @click="handleAuditLog">审核日志</Button>
      <template v-if="isDetail">
        <Button @click="handleAuditOperation" v-if="Object.keys(getInstanceDetail).length > 0 && getInstanceDetail.ifOperation"
          >审核</Button
        >
        <Button @click="handleSendAudit" v-if="dataJson.taskStatus == 1 || dataJson.taskStatus == 0">送审</Button>
      </template>
      <template v-if="dataJson.taskStatus == 0 || dataJson.taskStatus == 1">
        <Button type="primary" v-if="!isDetail" @click="handleSave">保存</Button>
        <Button type="primary" v-else @click="handleUpdate">编辑</Button>
      </template>
    </div>
    <div class="detail-info">
      <p class="title">审查进度</p>
      <div class="info">
        <div class="info-title">
          <span class="left-size">评价对象</span>
        </div>
      </div>
      <div class="mt20"></div>
      <Form :label-width="100" v-show="isDetail">
        <FormItem label="意见类型：">{{ dataJson.appraiseType || '--' }}</FormItem>
        <FormItem label="意见内容：">{{ dataJson.appraise || '--' }}</FormItem>
        <FormItem label="附件：">
          <template v-if="filePathList.length > 0">
            <div class="tag cp" v-for="(item, index) in filePathList" :key="'u' + index" @click="uploadDownFn(item.url)">
              {{ item.name }}
            </div>
          </template>
          <div v-else>--</div>
        </FormItem>
      </Form>
      <Form ref="formValidate" class="pr16" :model="formValidate" :rules="ruleValidate" :label-width="100" v-show="!isDetail">
        <FormItem label="意见类型：" prop="appraiseTypeId">
          <Select v-model="formValidate.appraiseTypeId" @on-change="handleChangeFn">
            <Option :value="item.id" v-for="item in appraiseTypeList" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="意见内容：" prop="appraise">
          <Input
            v-model="formValidate.appraise"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10 }"
            placeholder="请填写意见内容"
          />
        </FormItem>
        <FormItem label="附件：" prop="file">
          <Upload
            :action="url + '/file/filetransfer/upload'"
            :show-upload-list="true"
            multiple
            :default-file-list="filePathList"
            :headers="uploadHeader"
            :before-upload="handleBeforeUpload"
            :on-success="fileSuccessFn"
            :on-remove="handleRemoveFn"
          >
            <Button type="success" style="width: 96px">选择</Button>
          </Upload>
        </FormItem>
      </Form>
      <div class="info">
        <div class="info-title">
          <span class="left-size">分发信息</span>
        </div>
      </div>
      <div class="pd20">
        <Row :gutter="100" class="mt20">
          <Col span="5">分发时间：{{ dataJson.createTime }} </Col>
          <Col span="5">分发人员：{{ dataJson.disPerson }}</Col>
          <Col span="5">分发部室：{{ dataJson.supOrgName + ' / ' + dataJson.disDept }}</Col>
        </Row>
        <Row :gutter="100">
          <Col span="5">分发备注：{{ dataJson.remark || '--' }}</Col>
        </Row>
      </div>
    </div>
    <!-- 操作日志 -->
    <operation-log v-model="isOperationLog" :operationList="operationList"></operation-log>
    <!-- 审核日志 -->
    <audit-log v-model="isAuditLog" :nodeLogInfo="nodeLogInfo"></audit-log>
    <!-- 审批操作 -->
    <audit-operation v-model="isAuditOperation" @approvalOperation="approvalOperation"></audit-operation>
    <!-- 送审 -->
    <send-audit v-model="isSendAudit" @reviewCause="reviewCauseFn"></send-audit>
  </div>
</template>

<script>
import { auditResultStatus } from '@/libs/enum';
import Setting from '@/setting';
import util from '@/libs/util';
import * as requestRefers from '@/api/review';
import { mixinOperationLog, mixinAuditLog, mixinAuditOperation, mixinSendAudit } from '@/libs/mixin';
export default {
  mixins: [mixinOperationLog, mixinAuditLog, mixinAuditOperation, mixinSendAudit],
  data() {
    const ruleFile = (rule, value, callback) => {
      if (this.fileList.length <= 0) {
        return callback(new Error('附件不能为空'));
      }
      return callback();
    };
    return {
      getInstanceDetail: {},
      dataJson: {},
      isDetail: true,
      formValidate: {},
      ruleValidate: {
        appraiseTypeId: [{ required: true, message: '意见类型不能为空', trigger: 'blur' }],
        appraise: [{ required: true, message: '意见内容不能为空', trigger: 'blur' }],
        file: [{ required: true, validator: ruleFile, trigger: 'change' }]
      },
      url: Setting.apiBaseURL,
      appraiseTypeList: [],
      fileList: [],
      filePathList: []
    };
  },
  watch: {
    isDetail() {
      // 获取意见类型下拉
      requestRefers.getAppraiseTemplate(this.$route.query.id).then((res) => {
        this.appraiseTypeList = res;
      });
    }
  },
  computed: {
    uploadHeader() {
      const token = util.cookies.get('token');
      const tokenType = util.cookies.get('token_type');
      return {
        Authorization: tokenType + ' ' + token
      };
    }
  },
  methods: {
    // 点击
    handleAuditLog() {
      this.nodeLogFn();
      this.isAuditLog = true;
    },
    // 获取节点日志
    nodeLogFn() {
      let obj = {
        uid: this.$getUserId(),
        instanceId: this.dataJson.instanceId,
        processId: this.dataJson.processId
      };
      requestRefers.nodeLog(obj).then((res) => {
        this.nodeLogInfo = res;
      });
    },
    //审批操作
    approvalOperation(val) {
      let type = this.getInstanceDetail.nodeLevel;
      if (this.getInstanceDetail.formType !== 1) {
        this.$Message.error('单据类型，无需审批');
        return;
      }
      if (this.getInstanceDetail.instanceStatus !== 1 && this.getInstanceDetail.instanceStatus !== 5) {
        this.$Message.error('流程已完成，无需审批');
        return;
      }
      if (!this.getInstanceDetail.ifOperation) {
        this.$Message.error('暂无权限操作审批');
        return;
      }
      if (!this.getInstanceDetail.nodeId || !this.getInstanceDetail.formObj.instanceId) {
        this.$Message.error('参数异常，请退出后重新提交');
        return;
      }
      const data = {
        processId: this.getInstanceDetail.formObj.processId,
        uid: this.$getUserId(),
        instanceId: this.getInstanceDetail.formObj.instanceId,
        nodeId: this.getInstanceDetail.nodeId,
        actionExt: val.result,
        actionRemark: val.remark
      };
      switch (type) {
        case 1:
          requestRefers.stepOneNode(data).then((res) => {
            console.log('打印审批结果');
            this.$Message.success('提交成功！');
            this.getInstanceByIdFn();
            this.getDetailInfo();
          });
          break;
        case 2:
          requestRefers.stepTwoNode(data).then((res) => {
            console.log('打印审批结果');
            this.$Message.success('提交成功！');
            this.getInstanceByIdFn();
            this.getDetailInfo();
          });
          break;
      }
    },
    // 确定送审
    reviewCauseFn(data) {
      let obj = {
        uid: this.$getUserId(),
        userName: this.$getUserName(),
        id: this.$route.query.id,
        actionRemark: data
      };
      requestRefers.submitApproval(obj).then((res) => {
        this.$Message.success('送审成功');
        this.getDetailInfo();
      });
    },
    //获取流程实例详情
    getInstanceByIdFn() {
      let obj = {
        uid: this.$getUserId(),
        instanceId: this.dataJson.instanceId
      };
      requestRefers.getInstanceById(obj).then((res) => {
        this.getInstanceDetail = res;
      });
    },
    // 点击下载附件
    uploadDownFn(url) {
      window.location.href = url;
    },
    // 附件上传成功
    fileSuccessFn(response, file, fileList) {
      console.log(fileList);
      this.fileList = fileList;
    },
    // 删除附件
    handleRemoveFn(file, fileList) {
      console.log(fileList);
      this.fileList = fileList;
    },
    // 意见类型下拉
    handleChangeFn(value) {
      this.formValidate.appraise = this.enumConversion(this.appraiseTypeList, 'id', value, 'value');
      this.formValidate.appraiseType = this.enumConversion(this.appraiseTypeList, 'id', value, 'name');
    },
    // 获取详情
    getDetailInfo() {
      const id = this.$route.query.id;
      requestRefers.distributeDetails(id).then((res) => {
        this.dataJson = res;
        this.$set(this.formValidate, 'appraiseType', res.appraiseType);
        this.$set(this.formValidate, 'appraiseTypeId', res.appraiseTypeId);
        this.$set(this.formValidate, 'appraise', res.appraise);
        this.$set(this.formValidate, 'appraise', res.appraise);
        this.dataJson.taskStatusHide = auditResultStatus(this.dataJson.taskStatus);
        this.filePathList = res.fileNamePath ? JSON.parse(res.fileNamePath) : [];
        this.fileList = res.fileNamePath ? JSON.parse(res.fileNamePath) : [];

        if (res.taskStatus == 2) {
          this.getInstanceByIdFn();
        }
      });
    },
    // 编辑点击
    handleUpdate() {
      this.isDetail = false;
      const id = this.$route.query.id;
      requestRefers.distributeDetails(id).then((res) => {
        this.dataJson = res;
        this.dataJson.taskStatusHide = auditResultStatus(this.dataJson.taskStatus);
        this.filePathList = res.fileNamePath ? JSON.parse(res.fileNamePath) : [];
      });
    },
    // 保存点击
    handleSave() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          let fileNamePath = [];
          let filePath = '';
          this.fileList.map((item) => {
            fileNamePath.push({
              name: item.name,
              url: item.url || item.response.data
            });
            filePath += item.url || item.response.data + ',';
          });

          let obj = {
            id: this.$route.query.id,
            appraise: this.formValidate.appraise,
            appraiseType: this.formValidate.appraiseType,
            appraiseTypeId: this.formValidate.appraiseTypeId,
            fileNamePath: JSON.stringify(fileNamePath),
            filePath: filePath.substr(0, filePath.length - 1)
          };
          requestRefers.reviewDistributeUpdate(obj).then((res) => {
            this.$Message.success('保存成功!');
            this.isDetail = true;
            this.getDetailInfo();
          });
        }
      });
    },
    // 导入模板
    handleBeforeUpload(file) {
      // 判断格式是否满足要求
      if (file.size > Setting.fileSize) {
        this.$Message.info('文件最大不能超过' + Setting.fileSize / 1024000 + 'M');
        return false;
      }
    }
  },
  created() {
    this.isDetail = this.$route.query.flag == 0;
    this.getDetailInfo();
  }
};
</script>

<style>
.ivu-upload-list-file > span {
  white-space: nowrap !important;
}
.tag:hover {
  color: #008cff;
}
</style>
