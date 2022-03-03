<template>
  <el-dialog
    :title="title"
    :visible.sync="diolog_show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
    @close="clear"
  >
    <el-form :model="info" :rules="info_rules" ref="new" label-width="100px">
      <slot></slot>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="valiDate">确认新增</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  model: {
    prop: "show",
    event: "close",
  },
  props: {
    title: {
      type: String,
      default: "默认标题",
    },
    show: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
    },
    info_rules: {
      type: Object,
    },
  },
  data() {
    return {
      diolog_show: false,
    };
  },
  mounted() {
    const temp = JSON.stringify(this.show);
    this.diolog_show = JSON.parse(temp);
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    clear() {
      this.$emit("clear", false);
    },
    valiDate() {
      this.$refs["new"].validate((valid) => {
        if (valid) {
          this.$emit("upload");
        }
      });
    },
  },
  watch: {
    show(value) {
      const temp = JSON.stringify(value);
      this.diolog_show = JSON.parse(temp);
    },
  },
};
</script>

<style>
</style>