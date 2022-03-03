<template>
  <AtdDialog
    v-model="show"
    title="新增角色"
    :info="info"
    :info_rules="info_rules"
    @upload="upload"
    @clear="clear"
  >
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="info.name" placeholder="请输入功能名称" />
    </el-form-item>
    <el-form-item label="角色标识" prop="role">
      <el-input v-model="info.role" placeholder="请输入角色标识" />
    </el-form-item>
    <el-form-item label="角色级别" prop="level">
      <el-select v-model="info.level" placeholder="请选择角色级别">
        <el-option
          v-for="item in $store.state.role_level"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="角色说明" prop="description">
      <el-input
        type="textarea"
        resize="none"
        :rows="5"
        placeholder="请输入功能说明"
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
        role: null,
        level: null,
        description: null,
      },
      // 新增规则
      info_rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        role: [
          { required: true, message: "请输入角色标识", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在3~15个字符，且为英语",
            trigger: "blur",
          },
        ],
        level: [{ required: true, message: "请选择角色级别", trigger: "blur" }],
        description: [
          { required: true, message: "请输入角色说明", trigger: "blur" },
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
      post("/api/role/create", this.info).then((response) => {
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
        role: null,
        level: null,
        description: null,
      };
    },
  },
};
</script>

<style>
</style>