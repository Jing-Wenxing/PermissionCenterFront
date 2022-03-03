<template>
  <div class="table-base">
    <div>
      <div class="table-top">
        <h1>{{title}}</h1>
        <div class="table-opreate">
          <slot name="opreate"></slot>
        </div>
      </div>
      <div class="table-content">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="table-pagination">
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page="current"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格标题
    title: {
      type: String,
      default: "标题",
    },
    // 总数据
    total: {
      type: Number,
      default: 0,
    },
    // 其余数据刷新回调
    // eg：删除、新增数据的再加载
    change: {},
  },
  data() {
    return {
      current: 1,
      pageSize: 0,
    };
  },
  mounted() {
    // 初始化高度设置
    const tableHeight = document.documentElement.clientHeight - 250 - 48;
    this.pageSize = parseInt(tableHeight / 60);

    // 表格计算高度：this.pageSize * 60 + 48
    document.getElementsByClassName("table-base")[0].style.height =
      this.pageSize * 60 + 48 + 90 + "px";

    this.updated();
  },
  methods: {
    // 回调方法
    updated() {
      let page = {
        current: this.current,
        pageSize: this.pageSize,
        change: this.change,
      };
      this.$emit("updated", page);
    },
    // 页码跳转刷新
    pageChange(current) {
      this.current = current;
      this.updated();
    },
  },
  watch: {
    change: {
      handler(val, oldVal) {
        this.current = 1;
        this.updated();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.table-base {
  padding: 10px;
  width: calc(100% - 20px);
  /* height: calc(100% - 20px); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.table-top {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-top h1 {
  padding-left: 24px;
  border-left: 4px solid #1172ef;
  font-size: 20px;
}

.table-top .table-opreate {
  display: flex;
  align-items: center;
}

.table-pagination {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
}
</style>