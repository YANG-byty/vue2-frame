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
      isSendDing: false
    };
  },
  components: {
    SendDing
  },
  methods: {
    handleSendDing() {
      this.isSendDing = true;
    }
  }
};
// 操作日志
const mixinOperationLog = {
  data() {
    return {
      isOperationLog: false
    };
  },
  components: {
    OperationLog
  },
  methods: {
    handleOperationLog() {
      this.isOperationLog = true;
    }
  }
};
// 审核日志
const mixinAuditLog = {
  data() {
    return {
      isAuditLog: false
    };
  },
  components: {
    AuditLog
  },
  methods: {
    handleAuditLog() {
      this.isAuditLog = true;
    }
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
      isSelectUser: false
    };
  },
  components: {
    SelectUser
  },
  methods: {
    handleSelectUser() {
      this.isSelectUser = true;
    }
  }
};

// 送审
const mixinSendAudit = {
  data() {
    return {
      isSendAudit: false
    };
  },
  components: {
    SendAudit
  },
  methods: {
    handleSendAudit() {
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
