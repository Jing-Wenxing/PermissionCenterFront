<template>
  <div class="footer-base">
    <div class="footer-range">
      <span>
        <a href="https://beian.miit.gov.cn/#/Integrated/index">湘ICP备2021018601号-1</a>
      </span>
      <span>
        <a href="https://beian.miit.gov.cn/#/Integrated/index">中国互联网举报中心</a>
      </span>
      <span>
        <a href="https://beian.miit.gov.cn/#/Integrated/index">版权与免责声明</a>
      </span>
      <!-- <span>©2017-{{year}} ATD计算机协会</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer-base {
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: all 0.2s ease;
}

.footer-base:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.footer-range {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-base span {
  margin: 0 10px;
  line-height: 20px;
  font-size: 14px;
}

.footer-base a {
  text-decoration: none;
  outline: none;
  color: #18191c;
  transition: all 0.2s ease;
}
</style>