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
      <Button @click="handleOperationLog">操作记录</Button>
      <Button @click="handleAuditLog">审核记录</Button>
      <Button @click="handleAuditOperation">送审</Button>
      <Button type="primary" v-if="!isDetail" @click="handleSave">保存</Button>
      <Button type="primary" v-else @click="handleUpdate">编辑</Button>
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
          <div class="tag cp" v-for="(item, index) in filePathList" :key="'u' + index" @click="uploadDownFn(item.url)">
            {{ item.name }}
          </div>
        </FormItem>
      </Form>
      <Form ref="formValidate" class="pr16" :model="formValidate" :rules="ruleValidate" :label-width="100" v-show="!isDetail">
        <FormItem label="意见类型：" prop="appraiseType">
          <Select v-model="formValidate.appraiseType" @on-change="handleChangeFn">
            <Option :value="item.name" v-for="item in appraiseTypeList" :key="item.id">{{ item.name }}</Option>
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
          <Col span="5"> 分发时间：2022-3-10 09:42:19 </Col>
          <Col span="5">分发人员：李春洋</Col>
          <Col span="5">分发部室：杭州百图科技有限公司 / 信息中心</Col>
        </Row>
        <Row :gutter="100">
          <Col span="5"> 分发备注：请及时填写内容 </Col>
        </Row>
      </div>
    </div>
    <!-- 操作日志 -->
    <operation-log v-model="isOperationLog"></operation-log>
    <!-- 审核日志 -->
    <audit-log v-model="isAuditLog"></audit-log>
    <!-- 审批操作 -->
    <audit-operation v-model="isAuditOperation"></audit-operation>
  </div>
</template>

<script>
import { auditResultStatus } from '@/libs/enum';
import Setting from '@/setting';
import util from '@/libs/util';
import * as requestRefers from '@/api/review';
import { mixinOperationLog, mixinAuditLog, mixinAuditOperation } from '@/libs/mixin';
export default {
  mixins: [mixinOperationLog, mixinAuditLog, mixinAuditOperation],
  data() {
    const ruleFile = (rule, value, callback) => {
      if (this.fileList.length <= 0) {
        return callback(new Error('附件不能为空'));
      }
      return callback();
    };
    return {
      dataJson: {},
      isDetail: true,
      formValidate: {},
      ruleValidate: {
        appraiseType: [{ required: true, message: '意见类型不能为空', trigger: 'change' }],
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
      this.formValidate.appraise = this.enumConversion(this.appraiseTypeList, 'name', value, 'value');
    },
    // 获取详情
    getDetailInfo() {
      const id = this.$route.query.id;
      this.isDetail = this.$route.query.flag == 0;
      requestRefers.distributeDetails(id).then((res) => {
        this.dataJson = res;
        this.$set(this.formValidate, 'appraiseType', res.appraiseType);
        this.$set(this.formValidate, 'appraise', res.appraise);
        this.$set(this.formValidate, 'appraise', res.appraise);
        this.dataJson.taskStatusHide = auditResultStatus(this.dataJson.taskStatus);
        this.filePathList = res.fileNamePath ? JSON.parse(res.fileNamePath) : [];
        this.fileList = res.fileNamePath ? JSON.parse(res.fileNamePath) : [];
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
          let fileNamePath = [],
            filePath = '';
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
        this.$Message.info('文件最大不能超过' + Setting.fileSize + 'M');
        return false;
      }
    }
  },
  created() {
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
