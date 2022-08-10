import AddForm from './add-form.vue';
const mixinAddForm = {
  components: {
    AddForm
  },
  data() {
    return {
      isAddForm: false,
      id: ''
    };
  },
  methods: {
    handleAddForm() {
      this.id = null;
      this.isAddForm = true;
    }
  }
};

export { mixinAddForm };
