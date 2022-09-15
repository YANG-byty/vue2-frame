<template>
  <div>
    <Drawer :title="title" class="no-padding" v-model="visible" width="700" :before-close="beforeClose">
      <div class="drawer-form">
        <Form :model="formValidate" :label-width="110" :rules="ruleValidate" ref="formValidate">
          <FormItem label="任务名称：" prop="taskName">
            <Input v-model="formValidate.taskName" maxlength="100" placeholder="请填写任务名称"></Input>
          </FormItem>
          <Row :gutter="20">
            <Col span="12">
              <FormItem label="任务截止：" prop="endTime">
                <DatePicker
                  style="width: 100%"
                  type="datetime"
                  ref="endTime"
                  :editable="false"
                  @on-open-change="ruleDate"
                  :value="formValidate.endTime"
                  @on-change="changeDate"
                  placeholder="请选择任务截止时间"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="需求单位：" prop="deptName">
                <Input v-model="formValidate.deptName" maxlength="64" placeholder="请填写需求单位"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="任务联系人：" prop="contactPerson">
                <Input v-model="formValidate.contactPerson" maxlength="64" placeholder="请填写任务联系人"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系人电话：" prop="contactPhone">
                <Input v-input-num="0" v-model="formValidate.contactPhone" maxlength="14" placeholder="请填写联系人电话"></Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="任务备注：">
            <Input
              v-model="formValidate.remark"
              type="textarea"
              maxlength="125"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请填写任务备注"
            ></Input>
          </FormItem>
          <div class="staff-list">
            <div class="list-title">
              <div class="left">
                <span class="person">人员清单：</span>
                <span class="blue" @click="handleDownload">《下载模板》</span>
              </div>
              <div class="right">
                <Button size="small" @click="handleClear" v-if="!id">清空列表</Button>
                <Button size="small" type="primary" @click="handelAdd">手动添加</Button>
                <Upload ref="upload" action="#" :show-upload-list="false" :headers="headers" :before-upload="handleBeforeUpload">
                  <Button size="small" type="success">文件导入</Button>
                </Upload>
              </div>
            </div>
            <div class="common-table">
              <Table :columns="columns" :data="dataList">
                <template slot="num" slot-scope="{ row, index }">
                  <span> {{ index + 1 }}</span>
                </template>
                <template slot="action" slot-scope="{ row, index }">
                  <div class="table-action">
                    <span class="red" @click="handleRemove(index, row)" v-if="!row.ifOperation"> 移除</span>
                  </div>
                </template>
                <template slot="name" slot-scope="{ row, index }">
                  <div v-if="!row.isInput">
                    {{ row.userName }}
                  </div>
                  <div v-else>
                    <Input class="center" v-model="dataList[index].userName" maxlength="10" />
                  </div>
                </template>
                <template slot="duty" slot-scope="{ row, index }">
                  <div v-if="!row.isInput">
                    {{ row.duty }}
                  </div>
                  <div v-else>
                    <Input class="center" v-model="dataList[index].duty" maxlength="10" />
                  </div>
                </template>
              </Table>
            </div>
          </div>
        </Form>
      </div>
      <div class="footer-button align-right">
        <Button type="primary" @click="handleSave">保存</Button>
        <Button @click="beforeClose">取消</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import * as requestRefers from '@/api/review';
import util from '@/libs/util';
import Setting from '@/setting';
import moment from 'moment';
import qs from 'qs';
export default {
  props: ['value', 'id'],
  data() {
    return {
      visible: false,
      title: '新建审查任务',
      formValidate: {},
      // 下载模板地址
      templateURL: '/review/reviewTask/templateDownload',
      params: {
        limit: 10,
        page: 1
      },
      //导入头部信息
      headers: {
        'Accept-Language': 'zh-CN',
        token: util.cookies.get('token'),
        'Content-Type': 'multipart/form-data'
      },
      ruleValidate: {
        taskName: [{ required: true, message: '任务名称不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '任务截止时间不能为空', trigger: 'change' }],
        deptName: [{ required: true, message: '需求单位不能为空', trigger: 'blur' }],
        contactPerson: [{ required: true, message: '任务联系人不能为空', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '联系人电话不能为空', trigger: 'blur' }]
      },
      columns: [
        {
          title: '序号',
          slot: 'num'
        },
        {
          title: '姓名',
          align: 'center',
          slot: 'name'
        },
        {
          title: '现任职务',
          align: 'center',
          slot: 'duty'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      dataList: []
    };
  },
  methods: {
    // 重置表单
    resetForm() {
      this.title = '新建审查任务';
      this.formValidate = {};
    },
    getUserInfo() {
      this.formValidate.departmentHide = util.cookies.get('org_name');
      this.formValidate.applyUid = util.cookies.get('user_id');
      this.formValidate.applyUidHide = util.cookies.get('nick_name');
    },
    // 时间选中
    changeDate(e) {
      if (e == '') {
        this.$set(this.formValidate, 'endTime', '');
        return;
      }
      this.$refs.endTime.onSelectionModeChange('time');
      this.$set(this.formValidate, 'endTime', moment(new Date(e)).format('YYYY-MM-DD HH:mm:ss'));
    },
    ruleDate(val) {
      if (!val) {
        if (this.formValidate.endTime) {
          if (this.formValidate.endTime <= moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) {
            this.$Message.error('任务截止时间不能小于当前时间');
            this.$set(this.formValidate, 'endTime', '');
          }
        }
      }
    },
    // 手动添加按钮点击
    handelAdd() {
      this.dataList.push({
        userName: '',
        duty: '',
        isInput: true
      });
    },
    // 清空列表
    handleClear() {
      this.dataList = [];
    },
    // 移除按钮点击
    handleRemove(index, item) {
      if (this.id) {
        requestRefers.personDel(item.id).then((res) => {
          this.dataList.splice(index, 1);
        });
        return;
      }
      this.dataList.splice(index, 1);
    },
    // 关闭抽屉
    beforeClose() {
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: '提示',
          content: '该表单尚未填写完成，确定要取消么？',
          onOk: () => {
            this.visible = false;
            resolve();
          },
          onCancel: () => {
            reject();
          }
        });
      });
    },
    // 下载模板点击
    handleDownload() {
      let params = qs.stringify({
        token: util.cookies.get('token')
      });
      window.location.href = `${Setting.apiBaseURL}${this.templateURL}?${params}`;
    },
    // 导入模板
    handleBeforeUpload(file) {
      // 判断格式是否满足要求
      if (!/\.(xlsx|xls)$/.test(file.name)) {
        this.$Message.info('文件类型必须是,xlsx,xls中的一种');
        return false;
      }
      if (file.size > Setting.fileSize) {
        this.$Message.info('文件最大不能超过' + Setting.fileSize + 'M');
        return false;
      }
      // 上传开始
      // 创建formData对象
      const formData = new FormData();
      formData.append('file', file);
      formData.append('size', 80);
      requestRefers.importInfo(formData).then((res) => {
        if (res && res.length > 0) {
          this.dataList = this.dataList.concat(res);
          this.$Message.success('人员导入成功');
        }
      });
    },
    // 保存点击
    handleSave() {
      console.log(this.dataList);
      if (this.dataList.filter((item) => item.userName).length <= 0) {
        this.$Message.error('导入人员清单不能为空');
        return;
      }
      this.formValidate.personList = this.dataList;
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (this.id) {
            requestRefers.update(this.formValidate).then((res) => {
              this.$Message.success('编辑审查任务成功');
              this.visible = false;
              this.$emit('reloadList', true);
            });
            return;
          }
          requestRefers.reviewTaskAdd(this.formValidate).then((res) => {
            this.$Message.success('新建审查任务成功');
            this.visible = false;
            this.$emit('reloadList', true);
          });
        }
      });
    },
    // 获取详情
    getDetailInfo() {
      requestRefers.getDetails(this.id).then((res) => {
        this.formValidate = res;
        this.getUserInfo();
        this.dataList = this.formValidate.personList || [];
      });
    }
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) {
        if (this.id) {
          this.title = '编辑';
          this.getDetailInfo();
          return;
        }
        this.resetForm();
        this.getUserInfo();
      }
      this.$refs.formValidate.resetFields();
    },
    visible(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style></style>
