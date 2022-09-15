<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="formValidate" :model="formValidate" :label-width="100">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <Button type="primary" class="search">查询</Button>
          </Col>
        </Row>
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <Button class="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="mt20"></div>
    <div class="common-table">
      <Table :columns="columns" :data="dataList">
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo">
              <i class="iconfont icon-xiangqing"></i>
              详情</span
            >
            <span> <i class="iconfont icon-bianji"></i>编辑</span>
            <span class="red"><i class="iconfont icon-yichu"></i>删除</span>
            <span><i class="iconfont icon-fenfa"></i>分发</span>
          </div>
        </template>
      </Table>
    </div>
    <div class="common-page align-right">
      <Page :total="100" show-sizer show-elevator show-total />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {},
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
          title: '任务批次',
          key: 'name',
          align: 'center'
        },
        {
          title: '任务名称',
          key: 'age',
          align: 'center'
        },
        {
          title: '需求单位',
          key: 'address',
          align: 'center'
        },
        {
          title: '任务截止',
          key: 'address',
          align: 'center'
        },
        {
          title: '任务状态',
          key: 'address',
          align: 'center'
        },
        {
          title: '审查对象',
          key: 'address',
          align: 'center'
        },
        {
          title: '已分发对象',
          key: 'address',
          align: 'center'
        },
        {
          title: '审查任务进度',
          key: 'address',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'address',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 300
        }
      ]
    };
  },
  methods: {
    openDetailInfo() {
      this.$router.push('/reviewReport/detail');
    }
  }
};
</script>

<style></style>
