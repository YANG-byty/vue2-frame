<template>
  <div>
    <Drawer title="审核操作" v-model="visible" width="700">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="审核结果：" prop="name">
          <RadioGroup v-model="formValidate.phone">
            <Radio label="apple">
              <span>同意</span>
            </Radio>
            <Radio label="android">
              <span>拒绝</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="审核结果：" prop="name">
          <Input
            v-model="formValidate.value8"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请填写审核结果"
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
        name: [{ required: true, trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 保存点击
    handleSave() {
      this.visible = false;
    },
    // 取消点击
    handdleCannel() {
      this.visible = false;
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
