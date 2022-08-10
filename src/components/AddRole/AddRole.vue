<template>
  <div>
    <Drawer :title="title" v-model="visible" width="700" :before-close="beforeClose">
      <Form :model="formValidate" :label-width="100" :rules="ruleValidate" ref="formValidate">
        <FormItem label="角色名称：" prop="roleName">
          <Input v-model="formValidate.roleName" maxlength="64" placeholder="请填写角色名称"></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="formValidate.remark" maxlength="100" placeholder="请填写备注"></Input>
        </FormItem>
      </Form>
      <div class="footer-button align-right">
        <Button type="primary" @click="handleSave">保存</Button>
        <Button @click="beforeClose">取消</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import * as requestRefers from '@/api/user-role';
export default {
  props: ['value', 'id'],
  data() {
    return {
      visible: false,
      title: '',
      formValidate: {},
      ruleValidate: {
        roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 保存点击
    handleSave() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (this.id) {
            requestRefers.roleUpdate(this.formValidate).then((res) => {
              this.$Message.success('编辑角色成功');
              this.visible = false;
              this.$emit('reloadList', true);
            });
            return;
          }
          requestRefers.roleSave(this.formValidate).then((res) => {
            this.$Message.success('新建角色成功');
            this.visible = false;
            this.$emit('reloadList', true);
          });
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
      this.title = '新建角色';
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
        if (this.id) {
          this.title = '编辑角色';
          this.getRoleInfo();
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
