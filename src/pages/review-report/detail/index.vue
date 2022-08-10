<template>
  <div class="common-content">
    <Form ref="formValidate" :model="dataJson" :rules="ruleValidate" :label-width="100">
      <div class="detail-top">
        <p class="title" v-show="isDetail">报告名称：{{ dataJson.reportName || '--' }}</p>
        <p class="title" style="margin-top: 10px" v-show="!isDetail">
          <Row :gutter="100" class="mt20">
            <Col span="8">
              <FormItem label="报告名称：" prop="reportName">
                <Input v-model="dataJson.reportName" placeholder="请填写报告名称" />
              </FormItem>
            </Col>
          </Row>
        </p>
        <div class="detail-item">
          <Row :gutter="100" class="mt20">
            <Col span="5">任务名称：{{ dataJson.taskName || '--' }}</Col>
            <Col span="5">任务批次：{{ dataJson.taskBatch || '--' }}</Col>
            <Col span="5">任务状态：{{ dataJson.taskStatusHide || '--' }}</Col>
            <Col span="5">任务截止：{{ dataJson.endTime || '--' }}</Col>
          </Row>
          <Row :gutter="100">
            <Col span="5">任务联系人：{{ dataJson.contactPerson || '--' }} </Col>
            <Col span="5">联系人电话：{{ dataJson.contactPhone || '--' }}</Col>
            <Col span="5">需求单位：{{ dataJson.deptName || '--' }}</Col>
          </Row>
        </div>
      </div>
    </Form>
    <div class="detail-center-button align-right">
      <Button @click="exportFn" v-if="dataJson.report">导出报告</Button>
      <Button @click="handleOperationLog($route.query.id)">操作日志</Button>
      <Button @click="handleAuditLog">审核日志</Button>
      <Button @click="handleAuditOperation" v-if="Object.keys(getInstanceDetail).length > 0 && getInstanceDetail.ifOperation">
        审核
      </Button>
      <Button @click="handleSendAudit" v-if="dataJson.taskStatus == 1 || dataJson.taskStatus == 0">送审</Button>
      <Button type="primary" v-if="!isDetail" @click="handleSave(2)">保存</Button>
      <template v-else>
        <Button type="primary" v-if="dataJson.taskStatus == 1 || dataJson.taskStatus == 0" @click="handleUpdate">编辑</Button>
      </template>
    </div>
    <div class="detail-info">
      <p class="title">报告详情</p>
      <div class="content-box">
        <Row :gutter="18">
          <Col :span="isDetail ? 24 : 12">
            <div class="info-title">
              <p class="left-size">审查报告</p>
            </div>
            <div class="pb20">
              <!-- 富文本编辑器 -->
              <div ref="editor"></div>
            </div>
          </Col>
          <Col span="12" v-if="!isDetail">
            <div class="info-title">
              <span class="left-size">反馈意见</span>
            </div>
            <template v-if="opinionList.length > 0">
              <div class="org-item" v-for="(item, index) in opinionList" :key="item.id">
                <div class="org-title org-height">
                  <div>
                    <p>{{ item.userName + '【' + item.supOrgName + ' - ' + item.departmentHide + '】' }}</p>
                    <p class="org-duty">现任职务：{{ item.duty }}</p>
                  </div>
                  <div class="right cp blue" @click="handlePackUp(index)">
                    {{ item.flag ? '展开' : '收起' }}
                  </div>
                </div>
                <div class="per-info" :class="item.flag ? 'pack-up' : ''">
                  <p>征求单位：{{ item.departmentHide || '--' }}</p>
                  <p>审核结果：{{ item.taskStatusHide || '--' }}</p>
                  <p>意见类型：{{ item.appraiseType || '--' }}</p>
                  <p>意见说明：{{ item.appraise || '--' }}</p>
                  <p>
                    附件：
                    <template v-if="item.fileNamePathList">
                      <span
                        class="file-name"
                        @click="fileDownFn(value.url)"
                        v-for="(value, idx) in item.fileNamePathList"
                        :key="idx"
                      >
                        {{ value.name + (item.fileNamePathList.length - 1 == idx ? '' : '、') }}
                      </span>
                    </template>
                    <span v-else>--</span>
                  </p>
                </div>
              </div>
            </template>
          </Col>
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

    <!-- 循环数据 -->
    <div ref="opsity" v-show="false">
      <h2 data-v-932eaa7a="" style="text-align: center">
        <u><font color="#ff0000" size="6">中共丽水市纪律检查委员会</font></u>
      </h2>
      <h3 data-v-932eaa7a="" style="text-align: center">
        <font size="5"><br /></font>
      </h3>
      <h3 data-v-932eaa7a="" style="text-align: center">
        <font size="5">{{ opsityObj.reportName }}</font>
      </h3>
      <p data-v-932eaa7a=""><br /></p>
      <p data-v-932eaa7a="">{{ opsityObj.deptName }}：</p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;{{ opsityObj.text }}，现将我委在日常监督中掌握的情况反馈如下：</p>
      <template v-if="opsityObj.distributeList.length > 0">
        <div v-for="(item, index) in opsityObj.distributeList" :key="index">
          <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
          <div v-for="(value, idx) in item.distributeList" :key="idx">
            <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;{{ value.userName + ',' + value.departmentHide }}</p>
            <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;{{ value.appraise }}</p>
          </div>
        </div>
      </template>
      <p><br /></p>
      <p><br /></p>
      <p data-v-932eaa7a="" style="text-align: right">中共丽水市纪律检查委员会（盖章）</p>
      <p data-v-932eaa7a="" style="text-align: right">×年×月×日&nbsp;&nbsp;&nbsp;</p>
    </div>
    <!-- 默认模板 -->
    <div ref="opsityDefault" v-show="false">
      <h2 data-v-932eaa7a="" style="text-align: center">
        <u><font color="#ff0000" size="6">中共丽水市纪律检查委员会</font></u>
      </h2>
      <h3 data-v-932eaa7a="" style="text-align: center">
        <font size="5"><br /></font>
      </h3>
      <h3 data-v-932eaa7a="" style="text-align: center"><font size="5">关于××等×名同志党风廉政意见的反馈</font></h3>
      <p data-v-932eaa7a=""><br /></p>
      <p data-v-932eaa7a="">XXXX：</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;你室来函征求××等×名同志的党风廉政意见，现将我委在日常监督中掌握的情况反馈如下：
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;一、<font color="#ff0000">未收到问题线索</font>的×人</p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;1.××（单位职务）</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;二、<font color="#ff0000">收到问题线索，已了结，对其使用不持异议</font>的×人
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;1.××（单位职务）</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;2.××（单位职务）×年×月，×年×月，···，××纪委收到问题线索×件，但反映问题内容比较简单，不具备可查性（或无实质性内容，或无具体情节，或与本人关联不大等），已了结。对其使用不持异议。
        ×年×月，×年×月，···，××纪委收到问题线索×件。第1件××纪委对其进行了函询（或谈话，或委托谈话），其本人对谈话函询的问题予以否认，××纪委采信其本人所作的说明，已了结。第2件××纪委对其进行了函询（或谈话，或委托××谈话）和核实了解，未发现反映的问题，已了结。对其使用不持异议。
      </p>
      <p><br /></p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;3.××（单位职务）&nbsp;</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;×年×月，××纪委收到问题线索×件。经核实，反映失实（或未发现反映的问题），已了结。对其使用不持异议。
      </p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;三、<font color="#ff0000"
          >收到问题线索，已作谈话提醒（或批评教育；或已作出××处分（处理），已过影响期等）</font
        >，对其使用不持异议的×人
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;1.××（单位职务）&nbsp;</p>
      <p data-v-932eaa7a="">
        &nbsp; &nbsp;
        ×年×月，××纪委收到问题线索×件。经核实，存在××等问题，已作谈话提醒（批评教育等第一种形态所列的组织措施）。对其使用不持异议。
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;2.××（单位职务）&nbsp;</p>
      <p data-v-932eaa7a="">
        &nbsp; &nbsp;
        ×年×月，××纪委收到问题线索×件。经核实，存在××等问题，已于×年×月×日对其作出××处分、××处理。鉴于违纪问题不严重，且已过处分影响期，×××××等原因，不影响对其使用。
      </p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;四、<font color="#ff0000">收到问题线索，尚在处置过程中，暂缓提出党风廉政</font>意见的×人
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;××（单位职务）</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;×年×月，××纪委收到问题线索×件。主要反映其××××等问题，经研究，目前正在采取××方式处置，暂缓提出党风廉政意见。
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;五、<font color="#ff0000">收到问题线索，建议暂缓使用</font>的×人</p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;1.××（单位职务）</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;×年×月，××纪委收到问题线索×件。主要反映其××××等问题，经研究，问题线索有可查性，正在进行初核。建议暂缓使用。
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;2.××（单位职务）</p>
      <p data-v-932eaa7a="">
        ×年×月，××纪委收到问题线索×件。经核实，存在××等问题，×年×月×日，×纪委已对其诫勉谈话，未过影响期。建议暂缓使用。
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;六、<font color="#ff0000">收到问题线索，建议不宜使用</font>的×人</p>
      <p data-v-932eaa7a="">&nbsp; &nbsp; 1.××（单位职务）</p>
      <p data-v-932eaa7a="">
        &nbsp;&nbsp;&nbsp;&nbsp;×年×月，××纪委收到问题线索×件。经核实，存在××等违纪问题，已于×年×月×日对其作出××处分、××处理。建议不宜使用。
      </p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;2.××（单位职务）</p>
      <p data-v-932eaa7a="">&nbsp;&nbsp;&nbsp;&nbsp;×年×月，××纪委收到问题线索×件。经核实，存在××等严重问题。建议不宜使用。</p>
      <p><br /></p>
      <p><br /></p>
      <p data-v-932eaa7a="" style="text-align: right">中共丽水市纪律检查委员会（盖章）</p>
      <p data-v-932eaa7a="" style="text-align: right">×年×月×日&nbsp;&nbsp;&nbsp;</p>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor';
import Setting from '@/setting';
import qs from 'qs';
import util from '@/libs/util';
import { auditResultStatus } from '@/libs/enum';
import * as requestRefers from '@/api/review';
import { mixinOperationLog, mixinAuditLog, mixinAuditOperation, mixinSendAudit } from '@/libs/mixin';
export default {
  mixins: [mixinOperationLog, mixinAuditLog, mixinAuditOperation, mixinSendAudit],
  data() {
    return {
      // 导出地址
      templateURL: '/review/reviewReport/exportReviewReport',
      opsityObj: {
        distributeList: []
      },
      opinionList: [],
      isDetail: true,
      dataJson: {},
      getInstanceDetail: {},
      ruleValidate: {
        reportName: [{ required: true, message: '报告名称不能为空', trigger: 'blur' }]
      }
    };
  },
  watch: {},
  methods: {
    fileDownFn(url) {
      window.location.href = url;
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
          requestRefers.reviewReportStepOneNode(data).then((res) => {
            console.log('打印审批结果');
            this.$Message.success('提交成功！');
            this.getInstanceByIdFn();
            this.getDetailInfo();
          });
          break;
        case 2:
          requestRefers.reviewReportStepTwoNode(data).then((res) => {
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
      requestRefers.reviewReportSubmitApproval(obj).then((res) => {
        this.$Message.success('送审成功');
        this.getDetailInfo();
      });
    },
    // 点击审核日志
    handleAuditLog() {
      this.nodeLogFn();
      this.isAuditLog = true;
    },
    // 编辑点击
    handleUpdate() {
      this.isDetail = false;
      this.getDistributeListFn();
      this.editor.$textElem.attr('contenteditable', true);
    },
    // 保存点击
    handleSave(flag) {
      let html = this.editor.txt.html();
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          if (!html) {
            this.$Message.error('请填写审查报告内容!');
            return;
          }
          let obj = {
            id: this.$route.query.id,
            report: html,
            reportName: this.dataJson.reportName
          };
          if (flag == 1) {
            obj.type = 1;
          }
          requestRefers.reviewReportUpdate(obj).then((res) => {
            if (flag == 2) {
              this.$Message.success('保存成功');
              this.isDetail = true;
            }
            this.editor.$textElem.attr('contenteditable', false);
            this.getDetailInfo();
          });
        }
      });
    },
    // 收起展开
    handlePackUp(index) {
      this.opinionList[index].flag = !this.opinionList[index].flag;
    },
    // 获取详情
    getDetailInfo() {
      const id = this.$route.query.id;
      requestRefers.reviewReportGetDetails(id).then((res) => {
        this.dataJson = res;
        this.dataJson.taskStatusHide = auditResultStatus(this.dataJson.taskStatus);

        if (res.taskStatus == 2) {
          this.getInstanceByIdFn();
        }
        this.getDistributeFn();
      });
    },
    //获取流程实例详情
    getInstanceByIdFn() {
      let obj = {
        uid: this.$getUserId(),
        instanceId: this.dataJson.instanceId,
        processId: this.dataJson.processId
      };
      requestRefers.reviewReportGetInstanceById(obj).then((res) => {
        this.getInstanceDetail = res;
      });
    },
    // 富文本编辑器
    createdDditor() {
      this.editor = new E(this.$refs.editor);
      this.editor.config.height = 'auto';
      this.editor.config.showFullScreen = false;
      this.editor.config.uploadImgServer = '/upload-img';
      this.editor.config.placeholder = '请填写审查报告内容!';
      this.editor.config.fontSizes = {
        'x-small': { name: '10px', value: '1' },
        small: { name: '13px', value: '2' },
        normal: { name: '16px', value: '3' },
        large: { name: '18px', value: '4' },
        'x-large': { name: '24px', value: '5' },
        'xx-large': { name: '32px', value: '6' },
        'xxx-large': { name: '48px', value: '7' }
      };
      this.editor.config.colors = ['#000000', '#eeece0', '#1c487f', '#4d80bf', '#FF0000'];
      this.editor.config.customUploadImg = function (file, insertImgFn) {
        // 上传图片开始
        // 创建formData对象
        const formData = new FormData();
        for (var i = 0; i < file.length; i++) {
          formData.append('file', file[i]); // 多张图片文件都放进一个form-data，有些小伙伴说这里应该这样写：formData.append("file[" + i + "]", files[i], files[i].name)，后端才能拿到完整的图片数组，其实不然，用这个formData.getAll("file")方法恰好拿到数组，或者也可以forEach获取，有很多种办法。
        }
        formData.append('size', 0);
        requestRefers.uploadFile(formData).then((res) => {
          insertImgFn(res);
        });
      };
      this.editor.create();
    },
    // 获取部门审核数据列表（审批通过）
    getDistributeFn() {
      requestRefers.reviewDistributeGetDistribute({ taskBatch: this.dataJson.taskBatch }).then((res) => {
        this.opinionList = res.map((item) => {
          item.fileNamePathList = JSON.parse(item.fileNamePath);
          item.taskStatusHide = auditResultStatus(item.taskStatus);
          item.flag = false;
          return item;
        });
        this.getDistributeListFn();
      });
    },
    // 获取部门审核数据列表（生成审核报告）
    getDistributeListFn() {
      requestRefers.reviewDistributeGetDistributeList({ taskBatch: this.dataJson.taskBatch }).then((res) => {
        this.opsityObj = res;
        if (this.dataJson.report) {
          this.editor.txt.html(this.dataJson.report);
        } else if (this.opinionList.length > 0) {
          this.$nextTick(() => {
            let html = this.$refs.opsity.innerHTML;
            this.editor.txt.html(html);
            this.handleSave(1);
          });
        } else if (!this.isDetail) {
          this.$nextTick(() => {
            let htmlDefault = this.$refs.opsityDefault.innerHTML;
            this.editor.txt.html(htmlDefault);
          });
        }
      });
    },
    // 导出审查报告
    exportFn() {
      let params = qs.stringify({
        token: util.cookies.get('token'),
        id: this.$route.query.id
      });
      window.location.href = `${Setting.apiBaseURL}${this.templateURL}?${params}`;
    }
  },
  created() {
    this.getDetailInfo();
  },
  mounted() {
    this.isDetail = this.$route.query.flag == 0;

    this.$nextTick(() => {
      this.createdDditor();
      // 禁用富文本
      if (this.$route.query.flag == 1) {
        this.editor.$textElem.attr('contenteditable', true);
      } else {
        this.editor.$textElem.attr('contenteditable', false);
      }
    });
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
.file-name {
  cursor: pointer;
  padding: 3px 5px;
  // &:hover {
  color: #008cff;
  // }
}
</style>
<style>
.w-e-menu {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}
.w-e-toolbar {
  z-index: 2 !important;
}
</style>
