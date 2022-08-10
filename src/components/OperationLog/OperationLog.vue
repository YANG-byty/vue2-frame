<template>
  <div>
    <Drawer title="操作日志" v-model="visible" width="900">
      <div class="common-table">
        <Table :columns="columns" :data="operationList"> </Table>
      </div>
      <div class="common-page align-right">
        <!-- <Page
          :total="total"
          show-sizer
          show-elevator
          show-total
          @on-change="pageCurrentChangeHandle"
          @on-page-size-change="pageSizeChangeHandle"
        /> -->
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  props: ['value', 'operationList'],
  data() {
    return {
      total: 0,
      visible: false,
      columns: [
        {
          title: '操作时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '操作类型',
          key: 'operation',
          align: 'center'
        },
        {
          title: '操作用户',
          key: 'userName',
          align: 'center'
        }
        // {
        //   title: '操作结果',
        //   key: 'result',
        //   align: 'center'
        // },
        // {
        //   title: '操作备注',
        //   key: 'remark',
        //   align: 'center'
        // }
      ]
    };
  },
  methods: {
    // 分页
    pageCurrentChangeHandle(data) {
      // this.params.page = data;
    },
    // 翻页
    pageSizeChangeHandle(data) {
      // this.params.limit = data;
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
