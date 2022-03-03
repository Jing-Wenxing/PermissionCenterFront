<template>
  <div class="universal-base">
    <AtdTemplate :title="title+'·角色授权'">
      <!-- 内容 -->
      <div class="page-content" slot="content">
        <el-collapse class="margin-top-xs" v-model="activeNames">
          <el-collapse-item
            v-for="item in tableData"
            :key="item.id"
            :title="item.app_info.name"
            :name="item.app_info.id"
          >
            <div class="w-full flex flex-wrap justify-between">
              <div v-for="func in item.func_list" :key="func.id" class="func-single">
                <div class="w-full flex justify-between items-center">
                  <h3>{{func.name}}</h3>
                  <transition name="el-fade-in-linear">
                    <el-button
                      v-if="func.user_used"
                      size="mini"
                      type="success"
                      @click="deletePerm(func.authorityid)"
                    >已授权</el-button>
                    <el-button
                      v-else
                      size="mini"
                      type="danger"
                      @click="createPerm(item.app_info, func)"
                    >未授权</el-button>
                  </transition>
                </div>
                <p>
                  <span class="left-label">权限字符串：</span>
                  <span
                    class="code"
                  >{{item.app_info.permission}}-{{func.permission}}-{{func.second_per}}</span>
                </p>
                <p>
                  <span class="left-label">功能说明：</span>
                  <span>{{func.description}}</span>
                </p>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </AtdTemplate>
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
      activeNames: [],
      title: "",
      roleid: 0,
    };
  },
  mounted() {
    this.title = this.$route.query.title;
    this.roleid = this.$route.query.id;
    this.getInfo();
  },
  methods: {
    // ===== 常用函数 =====
    // 获取数据
    getInfo() {
      post("/api/perm/getAppFunList", { roleId: this.roleid }).then(
        (response) => {
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
        }
      );
    },
    // ===== 页面函数 =====
    // 授权
    createPerm(app, func) {
      let form = {
        roleid: this.$route.query.id,
        appid: app.id,
        funcid: func.id,
        permission:
          app.permission + "-" + func.permission + "-" + func.second_per,
      };

      post("/api/perm/create", form).then((response) => {
        if (response.data.Status == 1) {
          this.getInfo();
          this.$store.dispatch("profile");
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
      });
    },
    // 取消授权
    deletePerm(id) {
      post("/api/perm/delete", { id: id }).then((response) => {
        if (response.data.Status == 1) {
          this.getInfo();
          this.$store.dispatch("profile");
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
  },
};
</script>

<style scoped>
.func-single {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  width: calc(50% - 30px);
}

.func-single h3 {
  font-size: 15px;
  font-weight: bold;
}

.func-single p {
  margin-top: 5px;
  font-size: 14px;
  line-height: 25px;
}

.func-single .left-label {
  width: 50px;
}

.func-single .code {
  padding: 1px 5px;
  border-radius: 4px;
  background: #ebeef5;
}
</style>

<style>
.el-collapse-item__header {
  font-size: 16px;
  font-weight: bold;
}
</style>