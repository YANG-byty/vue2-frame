<template>
  <div>
    <Drawer title="审核日志" v-model="visible" width="1300" class="no-padding-top">
      <Row :gutter="20">
        <Col span="17">
          <div class="info-title">
            <span class="left-size">评价对象</span>
          </div>
          <div class="common-table table">
            <Table :columns="columns" :data="nodeLogInfo" @on-row-click="nodeDetailFn">
              <template slot-scope="{ row, index }" slot="processId">
                <span class="text-decoration">
                  <span>{{ row.processId }}</span>
                </span>
              </template>
              <template slot-scope="{ row, index }" slot="statusHide">
                <span :class="row.class">{{ row.statusHide }}</span>
              </template>
            </Table>
          </div>
          <!-- <div class="common-page align-right">
            <Page :total="100" show-sizer show-elevator show-total />
          </div> -->
        </Col>
        <Col span="7">
          <div class="info-title">
            <span class="left-size">流程详情</span>
          </div>
          <Card :bordered="false" dis-hover class="process-log">
            <div class="step-box" v-if="nodeLogInfo.length > 0">
              <div v-bind:class="'item ' + item.class" v-for="(item, index) in nodeLogInfo[activeIndex].nodeList" :key="index">
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
import { iconEnumList, auditProcessEnumList } from '@/libs/enum';

export default {
  props: ['value', 'nodeLogInfo'],
  data() {
    return {
      auditProcessEnumList: auditProcessEnumList,
      visible: false,
      columns: [
        {
          title: '送审时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '送审编号',
          slot: 'processId',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '审核流程',
          align: 'center',
          slot: 'statusHide'
        },
        {
          title: '处理结果',
          key: 'nodeName',
          align: 'center'
        }
      ],
      activeIndex: 0
    };
  },
  mounted() {},
  methods: {
    nodeDetailFn(data, index) {
      this.activeIndex = index;
    }
  },
  watch: {
    nodeLogInfo(val) {
      if (val.length > 0) {
        this.logInfo = val.map((item) => {
          item.nodeName = item.approveStatus ? (item.approveStatus == 'agree' ? '同意' : '拒绝') : null;
          item.statusHide = this.enumConversion(auditProcessEnumList, 'value', item.instanceStatus, 'label');
          item.class = this.enumConversion(auditProcessEnumList, 'value', item.instanceStatus, 'class');
          let result = '';
          item.nodeList.map((value) => {
            result = this.enumConversion(iconEnumList, 'value', value.icon, 'class');
            this.$set(value, 'class', result);
          });
          return item;
        });
      }
    },
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
