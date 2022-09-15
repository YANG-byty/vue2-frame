<template>
  <div class="common-content">
    <div class="top-form">
      <Form ref="formValidate" :model="formValidate" :label-width="100">
        <Row :gutter="88">
          <Col span="6">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="任务批次：">
              <Input v-model="formValidate.input"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <Button class="mr10 reset">重置</Button>
            <Button type="primary" class="search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="mt20"></div>
    <div class="common-table">
      <Table :columns="columns" :data="dataList">
        <template slot="action" slot-scope="{ row }">
          <div class="table-action">
            <span @click="handleSelectUser">人员设置</span>
          </div>
        </template>
      </Table>
    </div>
    <div class="common-page align-right">
      <Page :total="100" show-sizer show-elevator show-total />
    </div>
    <select-user v-model="isSelectUser" currentTitle="人员选择" @setDataList="getUserList" />
  </div>
</template>

<script>
import { mixinSelectUser } from '@/libs/mixin';
export default {
  mixins: [mixinSelectUser],
  data() {
    return {
      name: '--',
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
    // 获取已选人员
    getUserList(data) {
      console.log(data);
    }
  }
};
</script>

<style></style>
