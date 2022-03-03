<template>
  <div class="menu-base">
    <ul class="menu-range">
      <li
        class="menu-item"
        v-for="item in menu_list"
        :key="item.id"
        @click="routerPush(item.path)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu_list: [
        {
          name: "仪表盘",
          path: "admin",
        },
        {
          name: "角色管理",
          path: "role",
        },
        {
          name: "应用管理",
          path: "application",
        },
        {
          name: "用户管理",
          path: "user",
        },
      ],
    };
  },
  methods: {
    routerPush(path) {
      this.$router.push({ path: "/" + path });
    },
  },
};
</script>

<style scoped>
.menu-base {
  width: 200px;
  display: flex;
  flex-direction: column;
}

.menu-range {
  padding: 10px 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  list-style: none;
}

.menu-item {
  padding: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.menu-item:hover {
  background: #f0f0f0;
}
</style>