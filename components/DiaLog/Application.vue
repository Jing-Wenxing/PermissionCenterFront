<template>
  <AtdDialog
    v-model="show"
    title="新增功能"
    :info="info"
    :info_rules="info_rules"
    @upload="upload"
    @clear="clear"
  >
    <el-form-item label="应用名称" prop="name">
      <el-input v-model="info.name" placeholder="请输入应用名称" />
    </el-form-item>
    <el-form-item label="应用标识" prop="permission">
      <el-input v-model="info.permission" placeholder="请输入应用标识" />
    </el-form-item>
    <el-form-item label="应用端口" prop="port">
      <el-input v-model="info.port" placeholder="请输入应用端口" />
    </el-form-item>
    <el-form-item label="应用说明" prop="description">
      <el-input
        type="textarea"
        resize="none"
        :rows="5"
        placeholder="请输入应用说明"
        show-word-limit
        maxlength="100"
        v-model="info.description"
      ></el-input>
    </el-form-item>
  </AtdDialog>
</template>

<script>
import { post } from "~/static/js/api";

export default {
  props: {
    appid: {
      type: String,
    },
  },
  data() {
    return {
      // ===== 基本数据 =====
      show: false,
      // ===== 常用数据 =====
      // 新增数据
      info: {
        name: null,
        permission: null,
        port: null,
        description: null,
      },
      // 新增规则
      info_rules: {
        name: [
          { required: true, message: "请输入应用名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        permission: [
          { required: true, message: "请输入应用标识", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在3~15个字符，且为英语",
            trigger: "blur",
          },
        ],
        port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
        description: [
          { required: true, message: "请输入应用说明", trigger: "blur" },
          { min: 0, max: 100, message: "说明请保持在100字内", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // ===== 基本函数 =====
    diaLogShow() {
      this.show = !this.show;
    },
    // ===== 常用函数 =====
    // 上传数据
    upload() {
      post("/api/app/create", this.info).then((response) => {
        if (response.data.Status == 1) {
          this.$notify({
            title: "新增成功",
            message: "请继续其余操作",
            position: "bottom-right",
            type: "success",
          });
        } else {
          this.$notify.error({
            title: "新增失败",
            message:
              response.data.Result.msg != null
                ? response.data.Result.msg
                : response.data.Result,
            position: "bottom-right",
          });
        }
        this.show = false;
        this.$emit("updated");
      });
    },
    // 清空
    clear() {
      this.info = {
        name: null,
        permission: null,
        port: null,
        description: null,
      };
    },
  },
};
</script>

<style>
</style>