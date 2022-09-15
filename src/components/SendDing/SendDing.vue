<template>
  <div>
    <Drawer title="任务催办" v-model="visible" width="700">
      <Form :model="formValidate" :label-width="100" :show-message="false" :rules="ruleValidate" ref="formValidate">
        <FormItem label="催办方式：">
          <Checkbox v-model="formValidate.single">IM及时通讯</Checkbox>
        </FormItem>
        <FormItem label="催办内容：">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            maxlength="200"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请填写催办内容："
          ></Input>
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
        cancelEndDate: [{ required: true, trigger: 'change' }]
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
