import ReportList from './report-list.vue';

// 报告列表
const mixinReportList = {
  components: {
    ReportList
  },
  data() {
    return {
      isReportList: false
    };
  },
  components: {
    ReportList
  },
  methods: {
    handleReportList() {
      this.isReportList = true;
    }
  }
};

export { mixinReportList };
