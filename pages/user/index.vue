<template>
  <div class="universal-base">
    <AtdTable title="用户管理" @updated="updated" :change="update" :total="tableData.length">
      <!-- 内容 -->
      <div slot="content">
        <el-table
          class="table-content"
          :data="tableData.list"
          style="width: 100%"
          :row-style="{ height: '60px' }"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="昵称"></el-table-column>
          <el-table-column prop="fullname" label="姓名">
            <template slot-scope="scope">
              <span>{{scope.row.fullname==null? '暂无姓名信息': scope.row.fullname}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="修改角色" width="175">
            <template slot-scope="scope">
              <el-select
                size="small"
                v-model="scope.row.role"
                placeholder="请选择角色级别"
                @change="changeRole($event, scope.row)"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.role"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </AtdTable>
  </div>
</template>

<script>
import { post } from "~/static/js/api";

export default {
  data() {
    return {
      // ===== 基本数据 =====
      // 刷新回调启用
      update: false,
      // ===== 常用数据 =====
      tableData: {},
      roleList: [],
    };
  },
  methods: {
    // ===== 基本函数 =====
    // 回调函数
    updated(page) {
      this.$store.dispatch("profile");
      setTimeout(() => {
        let temp = {
          current: page.current,
          pageSize: page.pageSize,
          level: this.$store.getters.getUserRoleLevel,
        };
        this.getInfo(temp);
        this.getRole(this.$store.getters.getUserRoleLevel);
      }, 50);
    },
    updatex() {
      this.update = !this.update;
    },
    // ===== 常用函数 =====
    // 获取数据
    getInfo(info) {
      post("/api/user/select", info).then((response) => {
        if (response.data.Status == 1) {
          this.tableData = response.data.Result;
        }
      });
    },
    // 获取角色信息
    getRole(level) {
      post("/api/user/rolelist", { level: level }).then((response) => {
        if (response.data.Status == 1) {
          this.roleList = response.data.Result;
        }
      });
    },
    // ===== 页面函数 =====
    // 获取等级信息
    getLevelInfo(level) {
      if (level == 0) {
        return "访客用户(仅保留基础查看权限，无操作权限)";
      }
      return this.$store.getters.getLevelInfo(level);
    },
    // 前往角色授权
    goPermAdmin(id, title) {
      this.$router.push({
        path: "/role/permission",
        query: { id: id, title: title },
      });
    },
    changeRole(role, userinfo) {
      post("/api/user/updateUserRole", {
        uuid: userinfo.uuid,
        role: role,
      }).then((response) => {
        if (response.data.Status == 1) {
          this.$notify({
            title: "操作成功",
            message: "已经成功修改新的身份",
            position: "bottom-right",
            type: "success",
          });
        } else {
          this.$notify.error({
            title: "操作失败",
            message:
              response.data.Result.msg != null
                ? response.data.Result.msg
                : response.data.Result,
            position: "bottom-right",
          });
        }
        this.update = !this.update;
      });
    },
  },
};
</script>

<style>
</style>