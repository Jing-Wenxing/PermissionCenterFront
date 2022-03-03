<template>
  <AtdDialog
    v-model="show"
    title="新增功能"
    :info="info"
    :info_rules="info_rules"
    @upload="upload"
    @clear="clear"
  >
    <el-form-item label="功能名称" prop="name">
      <el-input v-model="info.name" placeholder="请输入功能名称" />
    </el-form-item>
    <el-form-item label="功能标识" prop="permission">
      <div class="flex items-center">
        <el-input class="margin-right-xs" v-model="info.permission" placeholder="请输入功能标识" />
        <el-input class="margin-left-xs" v-model="info.second_per" placeholder="二级功能标识，默认*(全部)" />
      </div>
    </el-form-item>
    <el-form-item label="功能级别" prop="level">
      <el-select v-model="info.level" placeholder="请选择功能级别">
        <el-option
          v-for="item in $store.state.role_level"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="功能说明" prop="description">
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
        permission: null,
        second_per: null,
        description: null,
        level: "",
      },
      // 新增规则
      info_rules: {
        name: [
          { required: true, message: "请输入功能名称", trigger: "blur" },
          { min: 2, max: 18, message: "长度在2~10个字符", trigger: "blur" },
        ],
        permission: [
          { required: true, message: "请输入功能标识", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在3~15个字符，且为英语",
            trigger: "blur",
          },
        ],
        level: [{ required: true, message: "请选择功能级别", trigger: "blur" }],
        description: [
          { required: true, message: "请输入功能说明", trigger: "blur" },
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
      let temp_info = {};
      if (this.info.second_per == null || this.info.second_per == "") {
        temp_info.description = this.info.description;
        temp_info.name = this.info.name;
        temp_info.permission = this.info.permission;
        temp_info.level = this.info.level;
        temp_info.second_per = "*";
      } else {
        temp_info = this.info;
      }
      temp_info.appid = this.appid;

      post("/api/func/create", temp_info).then((response) => {
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
        second_per: null,
        description: null,
        level: "",
      };
    },
  },
};
</script>

<style>
</style>