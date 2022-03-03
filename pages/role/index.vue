<template>
  <div class="universal-base">
    <AtdTable title="角色管理" @updated="updated" :change="update" :total="tableData.length">
      <!-- 操作 -->
      <div slot="opreate">
        <el-button
          size="small"
          plain
          :disabled="!$store.getters.getUserHasAuthority('role', 'create', 'permission-role-create')"
          @click="newInfo"
        >新增角色</el-button>
      </div>
      <!-- 内容 -->
      <div slot="content">
        <el-table
          class="table-content"
          :data="tableData.list"
          style="width: 100%"
          :row-style="{ height: '60px' }"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="角色名称" width="125"></el-table-column>
          <el-table-column prop="role" label="角色标识" width="125"></el-table-column>
          <el-table-column prop="description" label="角色说明">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.description"
                placement="bottom"
              >
                <span class="rowspan">{{ scope.row.description }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="角色级别" width="80">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="getLevelInfo(scope.row.level)"
                placement="bottom"
              >
                <span class="rowspan">{{ getLevelInfo(scope.row.level) }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                class="margin-right-xs"
                size="small"
                plain
                slot="reference"
                :disabled="!($store.getters.getUserHasAuthority('role', 'self', 'permission-role-self', scope.row.level)
                ||$store.getters.getUserHasAuthority('role', 'down', 'permission-role-down', scope.row.level))"
                @click="goPermAdmin(scope.row.id, scope.row.name)"
              >角色授权</el-button>
              <el-popconfirm title="确定删除此应用？" @confirm="delInfo(scope.row.id)">
                <el-button
                  size="small"
                  type="danger"
                  slot="reference"
                  :disabled="!$store.getters.getUserHasAuthority('role', 'delete', 'permission-role-delete')"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </AtdTable>

    <DiaRole ref="diarole" @updated="updatex" />
  </div>
</template>

<script>
import { post } from "~/static/js/api";
import DiaRole from "@/components/DiaLog/Role";

export default {
  components: {
    DiaRole,
  },
  data() {
    return {
      // ===== 基本数据 =====
      // 刷新回调启用
      update: false,
      // ===== 常用数据 =====
      tableData: {},
    };
  },
  methods: {
    // ===== 基本函数 =====
    // 回调函数
    updated(page) {
      this.getInfo(page);
    },
    updatex() {
      this.update = !this.update;
    },
    // ===== 常用函数 =====
    // 获取数据
    getInfo(pageinfo) {
      post("/api/role/select", pageinfo).then((response) => {
        if (response.data.Status == 1) {
          this.tableData = response.data.Result;
        }
      });
    },
    // 删除数据
    delInfo(id) {
      post("/api/role/delete", { id: id }).then((response) => {
        if (response.data.Status == 1) {
          this.$notify({
            title: "删除成功",
            message: "请继续其余操作",
            position: "bottom-right",
            type: "success",
          });
          this.updatex();
        } else {
          this.$notify.error({
            title: "删除失败",
            message:
              response.data.Result.msg != null
                ? response.data.Result.msg
                : response.data.Result,
            position: "bottom-right",
          });
        }
      });
    },
    // 新增数据
    newInfo() {
      this.$refs["diarole"].diaLogShow();
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
  },
};
</script>

<style>
</style>