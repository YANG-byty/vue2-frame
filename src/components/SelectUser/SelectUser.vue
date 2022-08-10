<template>
  <div>
     <Drawer :title="title" :closable="false" v-model="visible" :inner="true" width="900" @on-close="closeDrawer">
        <div class="personGroupBox">
          <div>
            <div class="flexBox">
              <div class="personGroupBoxL">
                <Form :label-width="90">
                  <SelectTree :searchTitle="searchTitle" v-model="visible" ref="SelectTree" @getValue="getValue" @getSearchTitle="getSearchTitle" @closeDataTree='closeDataTree' class="mb10" style="width:400px"/>
                </Form>
                <div>
                  <div class='personListBox'>
                    <div class="personList" v-for="(item,index) in personList" :key="index"  @click="setMen(item)">
                    <div class="item">
                      <div class="img-box">
                        <img src="@/assets/images/profile.jpg" alt="" />
                        <div class="user-info">
                          <p>
                            <span class="name">{{ item.nickName }}</span>
                            <span class="mr10"></span>
                          </p>
                          <!-- <p class="org">{{ item.phone }}</p> -->
                        </div>
                      </div>
                      <Icon type="ios-checkmark" size="24" v-if="item.checked" />
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div class="personGroupBoxL">
                <div>
                  <h4>授权用户</h4>
                  <div class='personListBox'>
                    <div class="personList" v-for="(item, index) in groupsList" :key="index">
                    <div class="item">
                      <div class="img-box">
                        <img src="@/assets/images/profile.jpg" alt="" />
                        <div class="user-info">
                          <p>
                            <span class="name">{{ item.nickName }}</span>
                          </p>
                          <!-- <p class="org">{{ item.phone }}</p> -->
                        </div>
                      </div>
                      <div class="btn">
                        <span @click="removePeople(item, index)">移除</span>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div class="align-right">
        <Button class="mr10" @click="closeDrawer">取消</Button>
        <Button type="primary" class="mr10" @click="addGroupUserSubmit" :loading="addGroupFormLoading">确定</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { getOrgUsers } from '@/api/user-center';
import SelectTree from '../SelectTree';
export default {
  components: {
    SelectTree
  },
  props: {
    roleId: {
      type: String
    },
    currentTitle: {
      type: String
    },
    value: {
      type: Boolean
    },
    userList: {
      type: Array,
      default: () => []
    },
    selectCurentItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      title: this.currentTitle,
      personList: [],
      groupsList: this.userList,
      addGroupFormLoading: false,
      searchTitle: '2'
    };
  },
  watch: {
    userList(val) {
      this.groupsList = val;
    },
    currentTitle(val) {
      this.title = val;
    },
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
      if (!val) {
        this.resetData();
      }
    }
  },
  methods: {
    setMen(item) {
      item.id = item.userId;
      this.getCheckArray(item);
    },
    getCheckArray(item) {
      let groupsArr = [];
      this.personList.forEach(list => {
        if (item.userId == list.userId) {
          this.$set(list, 'checked', true);
        }
      });
      let obj = { ...item };
      groupsArr.push(obj, ...this.groupsList);
      this.groupsList = this.filterArry(groupsArr);
    },
    //数组对象去重
    filterArry(arr) {
      var result = [];
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].userId]) {
          result.push(arr[i]);
          obj[arr[i].userId] = true;
        } else {
          this.$Message.error('已存在该授权用户');
        }
      }
      return result;
    },
    closeDataTree() {
      this.personList = [];
    },
    getSearchTitle() {
      this.searchTitle = '2';
    },
    getValue(val) {
      if (val.type == 1 || !val.type) {
        this.getOrgUsersList(val.id);
      } else {
        val.userId = val.id;
        this.getCheckArray(val);
      }
    },
    //部门筛选人
    getOrgUsersList(val) {
      this.personList = [];
      getOrgUsers({ orgId: val }).then((res) => {
        if (res) {
          this.personList = res;
          this.personList.map(item => {
            let index = this.userList.findIndex(value => {
              return value.userId == item.userId;
            });
            this.$set(item, 'checked', index >= 0);
          });
        } else {
          this.$Message.error('该组织下暂无人员');
        }
      });
    },
    removePeople(item) {
      this.personList.forEach(list => {
        if (item.userId == list.userId) {
          this.$set(list, 'checked', false);
        }
      });
      this.groupsList = this.groupsList.filter((list) => list.userId !== item.userId);
    },
    resetData() {
      this.searchTitle = '2';
      this.closeDataTree();
      this.$refs.SelectTree.filterText = '';
      this.$refs.SelectTree.valueTitle = '';
      this.groupsList = [];
    },
    closeDrawer() {
      this.visible = false;
      this.$emit('resetDataList', []);
    },
    // 确定选中的人员
    addGroupUserSubmit() {
      this.$emit('setDataList', this.groupsList);
      this.visible = false;
    }
  }
};
</script>
<style scoped lang='less'>
.personGroupBox {
  background-color: #f6f8f9;
  margin-top: 10px;
  .flexBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px;
    .personGroupBoxL {
      width: 430px;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 10px;
      height: 560px;
      overflow: auto;
      background-color: #fff;
      margin: 10px 2px;
      .personListBox {
        height: 500px;
        overflow: auto;
        .personList {
          padding: 10px;
          margin-top: 5px;
          .item {
            display: flex;
            align-items: center;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 13px;
            justify-content: space-between;
            .setPerson {
              color: orange;
              cursor: pointer;
            }
            .btn {
              color: orange;
              display: flex;
              span {
                display: inline-block;
                padding: 0 5px;
                cursor: pointer;
              }
            }
            .img-box {
              display: flex;
              align-items: center;
              .user-info {
                margin-left: 10px;
              }
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
          }
          &:hover {
            background-color: #f6f8f9;
          }
        }
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
