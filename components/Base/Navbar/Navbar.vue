<template>
  <div class="navbar-base" :class="$store.state.login?'navbar-login':''">
    <div class="navbar-range">
      <div class="left">
        <img src="~/static/imgs/atd.png" alt />
        <AppMenu />
      </div>
      <div class="right">
        <transition name="el-fade-in-linear" mode="out-in">
          <el-button v-if="!$store.state.login" type="primary" size="small" @click="Login">登录</el-button>
          <div class="flex items-center" v-else>
            <div>你好，{{$store.state.profile.username}}</div>
            <div
              class="margin-left-xs cursor-pointer iconfont icon-sign-out"
              style="font-size: 24px;"
              @click="Logout()"
            ></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Login() {
      location.href =
        "http://authority.atd.cool:3300?redirect=" +
        encodeURIComponent(location.href);
    },
    Logout() {
      location.href =
        "http://authority.atd.cool:4000/sso/logout?back=" +
        encodeURIComponent(location.href);
    },
  },
};
</script>

<style scoped>
.navbar-base {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: all 0.2s ease;
}

.navbar-login {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.navbar-base:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.navbar-range {
  margin: 0 20px;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

@media screen and (max-width: 1240px) {
  .navbar-range {
    margin: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.navbar-range .left {
  display: flex;
  align-items: center;
}

.navbar-range .left img {
  width: 60px;
  height: 60px;
  display: block;
  object-fit: cover;
  -webkit-user-drag: none;
}
</style>