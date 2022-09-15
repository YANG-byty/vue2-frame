<template>
  <div>
    <Drawer :title="title" v-model="visible" width="700" :before-close="beforeClose">
      <Form :model="formValidate" :label-width="80" :show-message="false" :rules="ruleValidate" ref="formValidate">
        <FormItem label="部门：" prop="orgName">
          <Input
            readonly
            suffix="ios-arrow-forward"
            @on-focus="handleSelectOrg"
            class="cp-input"
            placeholder="请选择部门"
            v-if="orgList.length <= 0"
          ></Input>
          <div class="select-user-button" v-else @click="handleSelectOrg">
            <div class="select-user-tag">
              <div class="user-box">
                <span class="tag-user" v-for="item in orgList" :key="item.id">
                  {{ item.orgName }}
                  <Icon type="md-close" @click.stop="orgList = []" />
                </span>
              </div>
              <Icon type="ios-arrow-down" />
            </div>
          </div>
        </FormItem>
        <FormItem label="人员：" prop="userList">
          <Input
            readonly
            suffix="ios-arrow-forward"
            @on-focus="handleSelectUser"
            class="cp-input"
            placeholder="请选择人员"
            v-if="userList.length <= 0"
          ></Input>
          <div class="select-user-button" v-else @click="handleSelectUser">
            <div class="select-user-tag">
              <div class="user-box">
                <span class="tag-user" v-for="item in userList" :key="item.id">
                  {{ item.nickName }}
                  <Icon type="md-close" @click.stop="handleDeleUser(item)" />
                </span>
              </div>
              <Icon type="ios-arrow-down" />
            </div>
          </div>
        </FormItem>
      </Form>
      <div class="footer-button align-right">
        <Button type="primary" @click="handleSave">保存</Button>
        <Button @click="beforeClose">取消</Button>
      </div>
    </Drawer>
    <!-- 部门选择 -->
    <select-org v-model="isSelectOrg" @setOrgData="getOrgData"></select-org>
    <!-- 人员选择 -->
    <select-user v-model="isSelectUser" currentTitle="人员选择" @setDataList="getUserList" />
  </div>
</template>

<script>
import * as requestRefers from '@/api/user-role';
import SelectOrg from '@/components/SelectOrg';
import SelectUser from '@/components/SelectUser';
export default {
  props: ['value', 'orgInfo'],
  components: { SelectOrg, SelectUser },
  data() {
    // 检测部门
    const ruleOrgList = (rule, value, callback) => {
      if (this.orgList.length <= 0) {
        return callback(new Error('部门不能为空'));
      }
      return callback();
    };
    // 检测人员
    const ruleUserList = (rule, value, callback) => {
      if (this.userList.length <= 0) {
        return callback(new Error('人员不能为空'));
      }
      return callback();
    };
    return {
      visible: false,
      title: '',
      formValidate: {},
      isSelectOrg: false,
      isSelectUser: false,
      ruleValidate: {
        orgName: [
          {
            required: true,
            validator: ruleOrgList,
            trigger: 'change'
          }
        ],
        userList: [
          {
            required: true,
            validator: ruleUserList,
            type: 'array',
            trigger: 'change'
          }
        ]
      },
      // 已选部门
      orgList: [],
      // 已选人员
      userList: []
    };
  },
  methods: {
    // 选择部门点击
    handleSelectOrg() {
      this.isSelectOrg = true;
    },
    // 选择人员点击
    handleSelectUser() {
      this.isSelectUser = true;
    },
    // 获取已选部门
    getOrgData(data) {
      if (data.length > 1) {
        this.$Message.info('不支持批量添加部门');
        return;
      }
      this.orgList = data || [];
    },
    // 获取已选人员
    getUserList(data) {
      this.userList = data || [];
      console.log(this.userList);
    },
    // 人员删除
    handleDeleUser(val) {
      this.userList = this.userList.filter((item) => item.id !== val.id);
    },
    // 保存点击
    handleSave() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.formValidate.orgName = this.orgList[0].orgName;
          this.formValidate.orgId = this.orgList[0].id;
          this.formValidate.userList = [];
          this.userList.forEach((item) => {
            this.formValidate.userList.push({
              uid: item.id,
              userName: item.nickName
            });
          });
          requestRefers.userOrgAdd(this.formValidate).then((res) => {
            this.$Message.success('新建角色成功');
            this.visible = false;
            this.$emit('reloadList', true);
          });
        } else {
          this.$Message.error('请填写带*内容后再提交!');
        }
      });
    },
    // 获取角色详情
    getRoleInfo() {
      requestRefers.roleInfo(this.id).then((res) => {
        this.formValidate = res;
      });
    },
    // 重置
    resetForm() {
      this.formValidate = {};
      this.userList = [];
      this.orgList = [];
      this.title = '新建分发部门';
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
            return false;
          }
        });
      });
    }
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) {
        if (this.orgInfo) {
          this.title = '编辑分发部门';
          this.orgList = [
            {
              orgName: this.orgInfo.orgName,
              id: this.orgInfo.orgId
            }
          ];
          this.userList = [];
          this.orgInfo.userList.forEach((item) => {
            this.userList.push({
              id: item.uid,
              nickName: item.userName
            });
          });
          return;
        }
        this.resetForm();
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
