<template>
  <div>
    <Drawer title="工作送审" v-model="visible" width="700">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="送审原因：" prop="reviewCause">
          <Input
            v-model="formValidate.reviewCause"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请填写送审原因"
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
        reviewCause: [{ required: true, message: '送审原因不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 保存点击
    handleSave() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.$emit('reviewCause', this.formValidate.reviewCause);
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
      this.$set(this.formValidate, 'reviewCause', '');
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
