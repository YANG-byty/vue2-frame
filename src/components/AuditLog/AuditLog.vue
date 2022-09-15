<template>
  <div>
    <Drawer title="审核日志" v-model="visible" width="1300" class="no-padding-top">
      <Row :gutter="20">
        <Col span="17">
          <div class="info-title">
            <span class="left-size">评价对象</span>
          </div>
          <div class="common-table">
            <Table :columns="columns" :data="dataList"> </Table>
          </div>
          <div class="common-page align-right">
            <Page :total="100" show-sizer show-elevator show-total />
          </div>
        </Col>
        <Col span="7">
          <div class="info-title">
            <span class="left-size">流程详情</span>
          </div>
          <Card :bordered="false" dis-hover class="process-log">
            <div class="step-box">
              <div :class="'item ' + item.class" v-for="item in logInfo">
                <div class="round"><i class="iconfont"></i></div>
                <div class="cont">
                  <!--头部-->
                  <template v-if="item.nodeName || item.deal">
                    <div class="row half">
                      <span class="name">{{ item.nodeName }}</span>
                      <span class="state">{{ item.deal }}</span>
                    </div>
                  </template>

                  <template v-if="item.operationName || item.operateTime || item.action">
                    <div class="row half text">
                      <span
                        >{{ item.operationName }} <template v-if="item.action"> ({{ item.action }}) </template></span
                      >
                      <span>{{ item.operateTime }}</span>
                    </div>
                  </template>

                  <!--操作内容-->
                  <template v-if="item.actionRemark">
                    <div class="text">审核意见：{{ item.actionRemark }}</div>
                  </template>

                  <!--抄送人-->
                  <template v-if="item.sendList && item.sendList.length > 0">
                    <div class="people-list">
                      <span
                        v-for="(people, index) in item.sendList"
                        :class="people.ifRead === 1 ? 'read' : ''"
                        :key="'people' + index"
                        >{{ people.operationName }}<i class="iconfont iconradio-active"></i
                      ></span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { iconEnumList } from '@/libs/enum';
export default {
  props: ['value'],
  data() {
    return {
      visible: false,
      logInfo: [
        {
          action: '',
          actionExt: '',
          actionRemark: '',
          deal: '已结束',
          icon: 1,
          nodeName: '已结束',
          operateTime: '',
          operationName: '',
          sendList: ''
        },
        {
          action: '',
          actionExt: '',
          actionRemark: '',
          deal: '',
          icon: 1,
          nodeName: '抄送节点',
          operateTime: '',
          operationName: '',
          sendList: [{ ifRead: 1, operationName: '张笑保' }]
        },
        {
          action: '同意',
          actionExt: 'agree',
          actionRemark: '',
          deal: '已处理',
          icon: 1,
          nodeName: '领导审批',
          operateTime: '2022-04-19 14:18:23',
          operationName: '张笑保',
          sendList: ''
        },
        {
          action: '',
          actionExt: '',
          actionRemark: '',
          deal: '提交',
          icon: 1,
          nodeName: '提交申请',
          operateTime: '2022-04-19 14:18:20',
          operationName: '张笑保',
          sendList: ''
        },
        {
          action: null,
          actionExt: null,
          actionRemark: null,
          deal: '已撤回',
          icon: 4,
          nodeName: '撤回申请',
          operateTime: null,
          operationName: '张笑保',
          sendList: null
        },
        {
          action: null,
          actionExt: null,
          actionRemark: null,
          deal: '已作废',
          icon: 3,
          nodeName: '作废申请',
          operateTime: null,
          operationName: '张笑保',
          sendList: null
        }
      ],
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
  created() {
    let result = '';
    this.logInfo = this.logInfo.map((item) => {
      result = this.enumConversion(iconEnumList, 'value', item.icon, 'class');
      this.$set(item, 'class', result);
      return item;
    });
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

<style lang="less" scoped>
.info-title {
  padding-left: 0 !important;
}
</style>
