<template>
  <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle" size="small" ref="multiSelect">
    <el-input class="selectInput" v-model="filterText" size="small" placeholder="请输入关键字搜索"> </el-input>
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        node-key="id"
        lazy
        :load="loadNode"
        :data="rootDate"
        :props="defaultProps"
        @node-click="handleNodeClick"
        empty-text="未查找到该组织"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>
<script>
import { treeListWithUserNumOrg, treeLikeNameListOrg, treeLikeUserorg } from '@/api/org';
import lodash from 'lodash';
export default {
  name: 'el-tree-select',
  props: {
    searchTitle: {
      type: String
    },
    value: {
      type: Boolean
    },
    isUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterText: '',
      valueTitle: '',
      clearable: true,
      treeData: [],
      rootDate: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      userFlag: this.isUser
    };
  },
  methods: {
    // 初始化值
    initHandle() {
      this.$nextTick(() => {
        this.$refs['multiSelect'].toggleMenu(); //默认展开选项

        let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0];
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar');
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;';
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },

    getTagTreeList() {
      treeListWithUserNumOrg({ id: '0' }).then((res) => {
        this.rootDate = res;
        console.log(res);
        this.getTreeData(this.rootDate);
      });
    },
    getTreeData(tree) {
      if (tree && tree.length > 0) {
        let treeData = tree.map((item, index) => {
          if (item.type == 2) {
            item.name = item.nickName;
          } else {
            item.orgPath ? (item.name = item.orgPath) : (item.name = `${item.orgName}(${item.userNum})`);
          }
          item.id = item.id;
          item.ifSub == 1 ? (item.leaf = false) : (item.leaf = true);
        });
        return treeData;
      }
    },
    loadNode(node, resolve) {
      //如果是根目录则加载根目录数据
      if (node.level === 0) {
        return resolve(this.rootDate);
      }
      treeListWithUserNumOrg({ id: node.data.id }).then((res) => {
        //如果有数据返回，则通过resolve方法懒加载到相应节点
        if (res) {
          setTimeout(() => {
            let resData = res;
            this.getTreeData(resData);
            resolve(resData);
          }, 500);
          //否则插入空的节点
        } else {
          return resolve([]);
        }
      });
    },
    // 切换选项
    handleNodeClick(node) {
      //2,3 代表不能选带有父级的组织
      if (this.searchTitle == 2 || this.searchTitle == 3) {
        if (node.ifSub !== 1) {
          this.valueTitle = node.name;
          this.$emit('getValue', node, this.searchTitle);
          this.$refs.multiSelect.blur();
        }
      } else {
        this.valueTitle = node.name;
        this.$emit('getValue', node, this.searchTitle);
        this.$refs.multiSelect.blur();
      }
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = '';
      this.filterText = '';
      this.getTagTreeList();
      this.$emit('closeDataTree');
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node');
      allNode.forEach((element) => element.classList.remove('is-current'));
    },
    //搜索结果
    getOrgWithName(val) {
      if (!this.userFlag) {
        let params = { orgName: this.filterText };
        treeLikeNameListOrg(params).then((res) => {
          if (val) {
            this.rootDate = res;
            this.getTreeData(this.rootDate);
          } else {
            this.rootDate = [];
            this.getTagTreeList();
          }
        });
      } else {
        let params = { name: this.filterText };
        treeLikeUserorg(params).then((res) => {
          if (val) {
            this.rootDate = res;
            this.getTreeData(this.rootDate);
          } else {
            this.rootDate = [];
            this.getTagTreeList();
          }
        });
      }
    }
  },
  watch: {
    isUser(val) {
      this.userFlag = val;
    },
    searchTitle(val) {
      if (!val) {
        this.clearHandle();
        this.$emit('getSearchTitle');
      }
    },
    value(val) {
      if (val) {
        this.initHandle();
        this.getTagTreeList();
        if (!this.searchTitle) {
          this.clearHandle();
          this.$emit('getSearchTitle');
        }
      }
    },
    filterText: lodash.debounce(function (val) {
      if (val) {
        this.getOrgWithName(val);
      } else {
        this.getTagTreeList();
      }
    }, 500)
  }
};
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 400px;
  min-height: 300px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  min-width: 390px;
  background: #fff;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 4px 20px;
  line-height: 25px;
  width: 390px;
  white-space: break-spaces;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #606266;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>
<style>
.el-select-dropdown__wrap {
  max-height: 400px;
}
</style>
