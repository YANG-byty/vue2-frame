<template>
  <div>
    <Drawer title="任务催办" v-model="visible" width="700">
      <Form :model="formValidate" :label-width="100" :rules="ruleValidate" ref="formValidate">
        <FormItem label="催办方式：" prop="CBtype">
          <CheckboxGroup v-model="formValidate.CBtype">
            <Checkbox label="IM及时通讯"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="催办内容：" prop="CBcontent">
          <Input
            v-model="formValidate.CBcontent"
            type="textarea"
            maxlength="200"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请填写催办内容"
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
      formValidate: {
        CBtype: ['IM及时通讯']
      },
      ruleValidate: {
        CBtype: [{ required: true, type: 'array', message: '催办方式不能为空', trigger: 'change' }],
        CBcontent: [{ required: true, message: '催办内容不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 保存点击
    handleSave() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.$emit('CuiBanForm', this.formValidate);
          this.visible = false;
          this.resetFn();
        }
      });
    },
    // 取消点击
    handdleCannel() {
      this.resetFn();
      this.visible = false;
    },
    // 重置表单
    resetFn() {
      this.$set(this.formValidate, 'CBcontent', '');
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
