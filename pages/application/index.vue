<template>
  <div class="universal-base">
    <AtdTable title="应用管理" @updated="updated" :change="update" :total="tableData.length">
      <!-- 操作 -->
      <div slot="opreate">
        <el-button
          size="small"
          plain
          :disabled="!$store.getters.getUserHasAuthority('app', 'create', 'permission-app-create')"
          @click="newInfo"
        >新增应用</el-button>
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
          <el-table-column prop="name" label="应用名称" width="125"></el-table-column>
          <el-table-column prop="permission" label="应用标识" width="125"></el-table-column>
          <el-table-column prop="description" label="应用说明">
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
          <el-table-column prop="port" label="应用端口" width="100">
            <template slot-scope="scope">
              <div class="flex items-center">
                <span
                  class="port-show"
                  :style="scope.row.port_exist?'background: #67C23A;':'background: #F56C6C;'"
                ></span>
                <span class="rowspan">{{ scope.row.port }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="操作" width="175">
            <template slot-scope="scope">
              <el-button
                class="margin-right-xs"
                size="small"
                plain
                slot="reference"
                :disabled="!$store.getters.getUserHasAuthority('app', 'changeFunc', 'permission-app-set'+ scope.row.permission)"
                @click="goFuncAdmin(scope.row.id, scope.row.name)"
              >功能管理</el-button>
              <el-popconfirm title="确定删除此应用？" @confirm="delInfo(scope.row.id)">
                <el-button
                  size="small"
                  type="danger"
                  slot="reference"
                  :disabled="!$store.getters.getUserHasAuthority('app', 'delete', 'permission-app-delete')"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </AtdTable>

    <DiaApp ref="diaapp" @updated="updatex" />
  </div>
</template>

<script>
import { post } from "~/static/js/api";
import DiaApp from "@/components/DiaLog/Application";

export default {
  components: {
    DiaApp,
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
      post("/api/app/select", pageinfo).then((response) => {
        if (response.data.Status == 1) {
          this.tableData = response.data.Result;
        }
      });
    },
    // 删除数据
    delInfo(id) {
      post("/api/app/delete", { id: id }).then((response) => {
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
      this.$refs["diaapp"].diaLogShow();
    },
    // ===== 页面函数 =====
    // 前往功能管理
    goFuncAdmin(id, title) {
      this.$router.push({
        path: "/application/function",
        query: { id: id, title: title },
      });
    },
  },
};
</script>

<style scoped>
.port-show {
  margin-right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 8px;
}
</style>    