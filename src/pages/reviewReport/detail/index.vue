<template>
  <div class="common-content">
    <div class="detail-top">
      <p class="title">任务名称：--</p>
      <div class="detail-item">
        <Row :gutter="100" class="mt20">
          <Col span="5">任务批次：2022年3月10日01 </Col>
          <Col span="5">任务状态：进行中</Col>
          <Col span="5">任务截止：2022-3-10 09:40</Col>
          <Col span="5">任务剩余：15天</Col>
        </Row>
        <Row :gutter="100">
          <Col span="5">任务批次：2022年3月10日01 </Col>
          <Col span="5">任务状态：进行中</Col>
          <Col span="5">任务截止：2022-3-10 09:40</Col>
          <Col span="5">任务剩余：15天</Col>
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
      <p class="title">报告详情</p>
      <div class="content-box">
        <Row :gutter="18">
          <Col span="12">
            <div class="info-title">
              <p class="left-size">审查报告</p>
            </div>
            <div class="pb20">
              <div ref="editor" v-if="!isDetail"></div>
              <!-- <Input type="textarea" :autosize="{ minRows: 23 }" placeholder="请填写审查报告" v-if="!isDetail" /> -->
              <p v-else="isDetail" class="report-text">
                征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司征求单位：杭州百图科技有限公司
              </p>
            </div>
          </Col>
          <Col span="12">
            <div class="info-title">
              <span class="left-size">反馈意见</span>
            </div>
            <div class="org-item">
              <div class="org-title org-height">
                <div>
                  <p>李春洋【杭州百图科技有限公司 - 市场部】</p>
                  <p class="org-duty">现任职务：产品经理</p>
                </div>
                <div class="right cp blue" @click="handlePackUp">
                  {{ packUp ? '展开' : '收起' }}
                </div>
              </div>
              <div class="per-info" :class="packUp ? 'pack-up' : ''">
                <p>征求单位：杭州百图科技有限公司</p>
                <p>审核结果：已通过</p>
                <p>意见类型：收到问题线索，已作谈话提醒</p>
                <p>意见说明：北京市3月9日举行发布会通报，</p>
                <p>附件：<span class="tag cp">涵询附件.docx</span></p>
              </div>
            </div>
            <div class="org-item">
              <div class="org-title org-height">
                <div>
                  <p>李春洋【杭州百图科技有限公司 - 市场部】</p>
                  <p class="org-duty">现任职务：产品经理</p>
                </div>
                <div class="right cp blue" @click="handlePackUp">
                  {{ packUp ? '展开' : '收起' }}
                </div>
              </div>
              <div class="per-info" :class="packUp ? 'pack-up' : ''">
                <p>征求单位：杭州百图科技有限公司</p>
                <p>审核结果：已通过</p>
                <p>意见类型：收到问题线索，已作谈话提醒</p>
                <p>意见说明：北京市3月9日举行发布会通报，</p>
                <p>附件：涵询附件.docx、涵询附件2.docx</p>
              </div>
            </div>
            <div class="org-item">
              <div class="org-title org-height">
                <div>
                  <p>李春洋【杭州百图科技有限公司 - 市场部】</p>
                  <p class="org-duty">现任职务：产品经理</p>
                </div>
                <div class="right cp blue" @click="handlePackUp">
                  {{ packUp ? '展开' : '收起' }}
                </div>
              </div>
              <div class="per-info" :class="packUp ? 'pack-up' : ''">
                <p>征求单位：杭州百图科技有限公司</p>
                <p>审核结果：已通过</p>
                <p>意见类型：收到问题线索，已作谈话提醒</p>
                <p>意见说明：北京市3月9日举行发布会通报，</p>
                <p>附件：涵询附件.docx、涵询附件2.docx</p>
              </div>
            </div>
          </Col>
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
import E from 'wangeditor';
import * as requestRefers from '@/api/review';
import { mixinOperationLog, mixinAuditLog, mixinAuditOperation } from '@/libs/mixin';
export default {
  mixins: [mixinOperationLog, mixinAuditLog, mixinAuditOperation],
  data() {
    return {
      isDetail: true,
      packUp: false
    };
  },
  watch: {},
  methods: {
    // 编辑点击
    handleUpdate() {
      this.isDetail = false;
      this.$nextTick(() => {
        this.createdDditor();
        this.editor.txt.html('6666666666');
      });
    },
    // 保存点击
    handleSave() {
      console.log(this.editor.txt.html());
      this.isDetail = true;
      if (!this.editor.txt.html()) {
        this.$Message.error('请填写审查报告内容!');
        return;
      }
    },
    // 收起展开
    handlePackUp() {
      this.packUp = !this.packUp;
    },
    // 富文本编辑器
    createdDditor() {
      this.editor = new E(this.$refs.editor);
      this.editor.config.height = 480;
      this.editor.config.showFullScreen = false;
      this.editor.config.uploadImgServer = '/upload-img';
      this.editor.config.placeholder = '请填写大事记内容';
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
    }
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
