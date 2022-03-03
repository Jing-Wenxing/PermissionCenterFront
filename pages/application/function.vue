<template>
  <div class="universal-base">
    <AtdTable
      :title="$route.query.title+'·功能管理'"
      @updated="updated"
      :change="update"
      :total="tableData.length"
    >
      <!-- 操作 -->
      <div slot="opreate">
        <el-button
          size="small"
          plain
          :disabled="!$store.getters.getUserHasAuthority('func', 'create', 'permission-func-create')"
          @click="newInfo"
        >新增功能</el-button>
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
          <el-table-column prop="description" label="功能名称" width="220">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="bottom">
                <span class="rowspan">{{ scope.row.name }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="permission" label="功能标识" width="125"></el-table-column>
          <el-table-column prop="second_per" label="二级标识" width="125"></el-table-column>
          <el-table-column prop="level" label="功能级别" width="80">
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
          <el-table-column prop="description" label="功能说明">
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
          <el-table-column label="操作" width="125">
            <template slot-scope="scope">
              <el-popconfirm title="确定删除此功能？" @confirm="delInfo(scope.row.id)">
                <el-button
                  size="small"
                  type="danger"
                  slot="reference"
                  :disabled="!$store.getters.getUserHasAuthority('func', 'delete', 'permission-func-delete')"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </AtdTable>

    <DiaFunc ref="diafunc" :appid="$route.query.id" @updated="updatex" />
  </div>
</template>

<script>
import { post } from "~/static/js/api";
import DiaFunc from "@/components/DiaLog/Function";

export default {
  components: {
    DiaFunc,
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
      page.appid = this.$route.query.id;
      this.getInfo(page);
    },
    updatex() {
      this.update = !this.update;
    },
    // ===== 常用函数 =====
    // 获取数据
    getInfo(pageinfo) {
      post("/api/func/select", pageinfo).then((response) => {
        if (response.data.Status == 1) {
          this.tableData = response.data.Result;
        } else {
          this.$router.go(-1);
          this.$notify.error({
            title: "查询失败",
            message:
              response.data.Result.msg != null
                ? response.data.Result.msg
                : response.data.Result,
            position: "bottom-right",
          });
        }
      });
    },
    // 删除数据
    delInfo(id) {
      post("/api/func/delete", { id: id }).then((response) => {
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
      this.$refs["diafunc"].diaLogShow();
    },
    // ===== 页面函数 =====
    // 获取等级信息
    getLevelInfo(level) {
      if (level == 0) {
        return "访客用户(仅保留基础查看权限，无操作权限)";
      }
      return this.$store.getters.getLevelInfo(level);
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