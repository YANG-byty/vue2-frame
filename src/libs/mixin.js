import * as requestRefers from '@/api/review';

import SendDing from '@/components/SendDing';
import OperationLog from '@/components/OperationLog';
import AuditLog from '@/components/AuditLog';
import AuditOperation from '@/components/AuditOperation';
import SelectOrg from '@/components/SelectOrg';
import SelectUser from '@/components/SelectUser';
import SendAudit from '@/components/SendAudit';
import AddRole from '@/components/AddRole';
import AddDepartment from '@/components/AddDepartment';

// 催办
const mixinSendDing = {
  data() {
    return {
      isSendDing: false,
      msgType: 1,
      instanceId: ''
    };
  },
  components: {
    SendDing
  },
  methods: {
    handleSendDing(value, id) {
      this.msgType = value;
      this.instanceId = id;
      this.isSendDing = true;
    }
  }
};
// 操作日志
const mixinOperationLog = {
  data() {
    return {
      isOperationLog: false,
      operationList: []
    };
  },
  components: {
    OperationLog
  },
  methods: {
    handleOperationLog(id) {
      this.isOperationLog = true;
      requestRefers.getOperationList(id).then((res) => {
        this.operationList = res;
      });
    }
  }
};
// 审核日志
const mixinAuditLog = {
  data() {
    return {
      isAuditLog: false,
      nodeLogInfo: []
    };
  },
  components: {
    AuditLog
  },
  methods: {
    // handleAuditLog(nodeLogInfo) {
    //   this.nodeLogInfo = nodeLogInfo;
    //   this.isAuditLog = true;
    // }
  }
};
// 审核操作
const mixinAuditOperation = {
  data() {
    return {
      isAuditOperation: false
    };
  },
  components: {
    AuditOperation
  },
  methods: {
    handleAuditOperation() {
      this.isAuditOperation = true;
    }
  }
};
// 部门选择
const mixinSelectOrg = {
  data() {
    return {
      isSelectOrg: false
    };
  },
  components: {
    SelectOrg
  },
  methods: {
    handleSelectOrg() {
      this.isSelectOrg = true;
    }
  }
};
// 人员选择
const mixinSelectUser = {
  data() {
    return {
      isSelectUser: false,
      roleId: '',
      userList: []
    };
  },
  components: {
    SelectUser
  },
  methods: {
    handleSelectUser(row) {
      this.roleId = row.id;
      this.userList = row.userList;
      if (this.userList.length > 0) {
        this.userList.map((item) => {
          this.$set(item, 'nickName', item.userName);
          this.$set(item, 'userId', item.uid);
        });
      }
      this.isSelectUser = true;
    }
  }
};

// 送审
const mixinSendAudit = {
  data() {
    return {
      isSendAudit: false,
      id: ''
    };
  },
  components: {
    SendAudit
  },
  methods: {
    handleSendAudit(row) {
      this.id = row.id;
      this.isSendAudit = true;
    }
  }
};
// 新建角色
const mixinAddRole = {
  data() {
    return {
      isAddRole: false,
      id: ''
    };
  },
  components: {
    AddRole
  },
  methods: {
    // 新增
    handleAddRole() {
      this.id = '';
      this.isAddRole = true;
    },
    // 编辑
    handleUpdate(val) {
      this.id = val.id;
      this.isAddRole = true;
    }
  }
};
// 新建分发部门
const mixinAddDepartment = {
  data() {
    return {
      isAddDepartment: false,
      orgInfo: {}
    };
  },
  components: {
    AddDepartment
  },
  methods: {
    // 新增
    handleAddDepartment() {
      this.orgInfo = null;
      this.isAddDepartment = true;
    },
    // 编辑
    handleUpdateDepartment(val) {
      this.orgInfo = JSON.parse(JSON.stringify(val));
      this.isAddDepartment = true;
    }
  }
};

export {
  mixinSendDing,
  mixinOperationLog,
  mixinAuditLog,
  mixinAuditOperation,
  mixinSelectOrg,
  mixinSelectUser,
  mixinSendAudit,
  mixinAddRole,
  mixinAddDepartment
};
