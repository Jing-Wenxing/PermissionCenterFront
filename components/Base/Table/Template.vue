<template>
  <div class="template-base">
    <div class="template-top">
      <h1>{{title}}</h1>
    </div>
    <div class="template-content">
      <slot name="content"></slot>
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
  },
};
</script>

<style scoped>
.template-base {
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.template-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.template-content::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}

.template-top {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-top h1 {
  padding-left: 24px;
  border-left: 4px solid #1172ef;
  font-size: 20px;
}
</style>