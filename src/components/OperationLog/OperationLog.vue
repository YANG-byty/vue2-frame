<template>
  <div>
    <Drawer title="操作日志" v-model="visible" width="900">
      <div class="common-table">
        <Table :columns="columns" :data="dataList"> </Table>
      </div>
      <div class="common-page align-right">
        <Page :total="100" show-sizer show-elevator show-total />
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
      dataList: [
        {
          name: '2022年3月9日01',
          age: '',
          address: '杭州百图科技有限公司',
          date: '2016-10-01'
        },
        {
          name: '2022年3月9日01',
          age: '',
          address: '杭州百图科技有限公司',
          date: '2016-10-01'
        },
        {
          name: '2022年3月9日01',
          age: '',
          address: '杭州百图科技有限公司',
          date: '2016-10-01'
        },
        {
          name: '2022年3月9日01',
          age: '',
          address: '杭州百图科技有限公司',
          date: '2016-10-01'
        }
      ],
      columns: [
        {
          title: '操作时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作类型',
          key: 'age',
          align: 'center'
        },
        {
          title: '操作用户',
          key: 'address',
          align: 'center'
        },
        {
          title: '操作结果',
          key: 'address',
          align: 'center'
        },
        {
          title: '操作备注',
          key: 'address',
          align: 'center'
        }
      ]
    };
  },
  methods: {},
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
