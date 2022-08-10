<template>
  <div>
    <Drawer title="审核操作" v-model="visible" width="700">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="审核结果：" prop="result">
          <RadioGroup v-model="formValidate.result" @on-change="handleSelectFn">
            <Radio label="agree">
              <span>同意</span>
            </Radio>
            <Radio label="disagree">
              <span>拒绝</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="审核备注：">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请填写审核备注"
          />
        </FormItem>
      </Form>
      <div class="footer-button align-right">
        <Button type="primary" @click="handleSave">保存</Button>
        <Button @click="handdleCannel">取消</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      visible: false,
      formValidate: {},
      ruleValidate: {
        result: [{ required: true, message: '审核结果不能为空', trigger: 'change' }]
      }
    };
  },
  methods: {
    handleSelectFn(type) {
      switch (type) {
      case 'agree':
        this.$set(this.formValidate, 'remark', '同意');
        break;
      case 'disagree':
        this.$set(this.formValidate, 'remark', '拒绝');
        break;
      }
    },
    // 保存点击
    handleSave() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.$emit('approvalOperation', this.formValidate);
          this.visible = false;
          this.resetFn();
        }
      });
    },
    // 取消点击
    handdleCannel() {
      this.visible = false;
      this.resetFn();
    },
    // 重置表单
    resetFn() {
      this.$set(this.formValidate, 'result', '');
      this.$set(this.formValidate, 'remark', '');
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style></style>
