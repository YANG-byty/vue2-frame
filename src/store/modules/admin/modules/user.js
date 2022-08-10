/**
 * 用户信息
 * */
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    avatar: '',
    plantform: 'innerPc'
  },
  mutations: {
    setPlantform(state) {
      if (
        navigator.userAgent &&
        (navigator.userAgent.toLowerCase().indexOf('dingtalk') != -1 || navigator.userAgent.toLowerCase().indexOf('nebula') != -1)
      ) {
        state.plantform = 'ddPc';
      }
    }
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {Object} dispatch vuex dispatch
     * @param {*} info info
     */
    set({ state, dispatch }, info) {
      return new Promise(async (resolve) => {
        // store 赋值
        state.info = info;
        // 持久化
        await dispatch(
          'admin/db/set',
          {
            dbName: 'sys',
            path: 'user.info',
            value: info,
            user: true
          },
          { root: true }
        );
        // end
        resolve();
      });
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     * @param {Object} dispatch vuex dispatch
     */
    load({ state, dispatch }) {
      return new Promise(async (resolve) => {
        // store 赋值
        state.info = await dispatch(
          'admin/db/get',
          {
            dbName: 'sys',
            path: 'user.info',
            defaultValue: {},
            user: true
          },
          { root: true }
        );
        // end
        resolve();
      });
    },
    setAvater({ state, dispatch }, info) {
      return new Promise(async (resolve) => {
        // store 赋值
        state.avatar = info;
        // 持久化
        await dispatch(
          'admin/db/set',
          {
            dbName: 'sys',
            path: 'user.avatar',
            value: info,
            user: true
          },
          { root: true }
        );
        await dispatch('loadAvatar');
        // end
        resolve();
      });
    },
    loadAvatar({ state, dispatch }) {
      return new Promise(async (resolve) => {
        // store 赋值
        state.avatar = await dispatch(
          'admin/db/get',
          {
            dbName: 'sys',
            path: 'user.avatar',
            defaultValue: {},
            user: true
          },
          { root: true }
        );
        // end
        resolve();
      });
    }
  }
};
