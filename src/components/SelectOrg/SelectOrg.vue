<template>
  <div>
    <Drawer title="选择征求部门" v-model="visible" width="700">
      <Input v-model.trim="orgName" clearable placeholder="请填写部门名称" />
      <div class="mt10"></div>
      <el-tree
        node-key="id"
        :load="loadNode"
        lazy
        :data="dataList"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        @check="handleCheckChange"
        show-checkbox
        :props="defaultProps"
        ref="tagtree"
        empty-text="未查找到该组织"
      >
      </el-tree>
      <div class="footer-button align-right">
        <Button type="primary" @click="handleSave">保存</Button>
        <Button @click="handdleCannel">取消</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import * as requestRefers from '@/api/org';
import { debounce } from '@/libs/util';
export default {
  props: ['value', 'selectOrg'],
  data() {
    return {
      visible: false,
      orgName: '',
      dataList: [],
      defaultProps: {
        children: 'children',
        label: 'orgName',
        isLeaf: 'leaf'
      },
      selectedOrgData: []
    };
  },
  methods: {
    // 保存点击
    handleSave() {
      this.visible = false;
      this.$emit('setOrgData', this.selectedOrgData);
    },
    // 取消点击
    handdleCannel() {
      this.visible = false;
    },
    refreshNodeBy(id) {
      let node = this.$refs.tagtree.getNode(id); // 通过节点id找到对应树节点对象
      node.loaded = false;
      node.expand();
    },
    getTagTreeList() {
      requestRefers.treeListWithUserNumOrg({ id: '0' }).then((res) => {
        this.dataList = this.transfer_cascader_data(res);
        this.$emit('setSupOrgName', this.dataList[0].orgName);
        setTimeout(() => {
          this.refreshNodeBy(this.dataList[0].id);
        }, 200);
      });
    },
    // 递归渲染tree数据格式
    transfer_cascader_data(original) {
      original.forEach((item) => {
        item.ifSub == 1 ? (item.leaf = false) : (item.leaf = true);
      });
      return original;
    },
    loadNode(node, resolve) {
      //如果是根目录则加载根目录数据
      if (node.level === 0) {
        return resolve(this.dataList);
      }
      requestRefers.treeListWithUserNumOrg({ id: node.data.id }).then((res) => {
        //如果有数据返回，则通过resolve方法懒加载到相应节点
        if (res) {
          setTimeout(() => {
            let resData = res;
            resolve(this.transfer_cascader_data(resData));
            this.handleCheckChange();
          }, 500);
          //否则插入空的节点
        } else {
          return resolve([]);
        }
      });
    },
    // 所搜结果
    getOrgWithName(val) {
      let params = { orgName: this.orgName };
      requestRefers.treeLikeNameListOrg(params).then((res) => {
        let resData = res || [];
        resData.forEach((item) => {
          item.orgName = item.orgPath;
        });
        this.dataList = this.transfer_cascader_data(resData) || [];
      });
    },
    // 获取选中的部门
    handleCheckChange() {
      this.selectedOrgData = this.$refs.tagtree.getCheckedNodes();
    }
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) {
        this.selectedOrgData = [];
        this.getTagTreeList();
      }
    },
    visible(val) {
      this.$emit('input', val);
    },
    orgName(val) {
      const execute = () => {
        if (val) {
          this.getOrgWithName(val);
          return;
        }
        this.getTagTreeList();
      };
      debounce(this, execute, 300);
    }
  }
};
</script>

<style></style>
