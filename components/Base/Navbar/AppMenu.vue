<template>
  <div class="app-menu" :class="open?'app-menu-open':''">
    <div class="app-range" :tabIndex="-1" @focus="onFucu" @blur="onBlur">
      <h1>ATD·权限中心</h1>
      <span class="iconfont icon-xia-01" :class="open?'iconx-up':'iconx-down'"></span>
    </div>
    <el-collapse-transition>
      <ul class="app-content" v-show="open">
        <li
          class="menu-item"
          v-for="item in menu_list"
          :key="item.id"
          @click.stop="goUrl(item.url)"
        >{{item.name}}</li>
      </ul>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      menu_list: [
        {
          name: "计算机协会",
          url: "https://www.atd.ac.cn/",
        },
        {
          name: "认证中心",
          url: "http://authority.atd.cool/",
        },
      ],
    };
  },
  methods: {
    goUrl(path) {
      if (path === "http://authority.atd.cool/") {
        location.href =
          "http://authority.atd.cool?redirect=" +
          encodeURIComponent(location.href);
      } else {
        location.href = path;
      }
    },
    onFucu() {
      this.open = true;
    },
    onBlur() {
      this.open = false;
    },
  },
};
</script>

<style scoped>
/* 按钮样式 */
.app-menu {
  position: absolute;
  top: 16px;
  margin-left: 65px;
  padding: 10px 0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.app-menu:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.app-menu-open {
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

/* 应用 */
h1 {
  font-size: 20px;
  color: #18191c;
  font-weight: 700;
  user-select: none;
}

/* 倒装效果 */
.iconx-down,
.iconx-up {
  margin-left: 15px;
  font-size: 12px;
  color: #18191c;
  transition: all 0.2s ease;
}

.iconx-up {
  transform: rotate(180deg);
}

/* 主体内容 */
.app-range {
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* 菜单内容 */
.app-content {
  margin-top: 10px;
  list-style: none;
}

.app-content .menu-item {
  padding: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.app-content .menu-item:hover {
  background: #f0f0f0;
}
</style>