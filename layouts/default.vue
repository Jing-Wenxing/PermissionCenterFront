<template>
  <div>
    <Navbar />
    <transition name="el-fade-in" mode="out-in">
      <nuxt v-if="!$store.state.login" />
      <div v-else class="page-base">
        <div class="page-range">
          <div class="left">
            <Menu />
          </div>
          <div class="right">
            <transition name="el-fade-in" mode="out-in">
              <nuxt />
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <Footer v-if="!$store.state.login" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("profile");
  },
};
</script>

<style scoped>
.page-base {
  padding-top: 100px;
  padding-bottom: 40px;
  width: 100%;
  height: calc(100vh - 140px);
  display: flex;
  justify-content: center;
}

.page-range {
  width: 1280px;
  display: flex;
}

.page-range .left {
  width: 200px;
}

.page-range .right {
  padding-left: 20px;
  width: calc(100% - 220px);
}
</style>