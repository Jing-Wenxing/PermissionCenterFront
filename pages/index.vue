<template>
  <div class="index-base">
    <div class="index-range">
      <div>
        <h1>ATD·权限中心</h1>
        <h3>ATD通用产品集群权限服务中心</h3>
        <el-button class="margin-bottom-xl" type="primary">了解更多</el-button>
      </div>
      <img src="@/static/imgs/authority.svg" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.index-base {
  position: relative;
  padding-top: 80px;
  padding-bottom: 80px;
  width: 100vw;
  height: calc(100vh - 160px);
  display: flex;
  justify-content: center;
  /* background: transparent; */
  background: #f4f9fc;
  /* background-image: url("@/static/imgs/bg.jpeg"); */
  background-size: cover;
  transition: all 0.2s ease;
}

.index-range {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.index-range h1 {
  font-size: 40px;
  line-height: 60px;
  color: #1d355e;
}

.index-range h3 {
  margin-top: 5px;
  margin-bottom: 70px;
  font-size: 20px;
  color: #1d355e;
}

.index-range img {
  width: 600px;
}
</style>