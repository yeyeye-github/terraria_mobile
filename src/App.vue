<template>
  <div class="all">
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
body{
  overflow: hidden;
}
html{
  overflow: hidden;
}
.main {
  // height: 100vh;
  margin-top: 87px;
  margin-bottom: 45px;
  // height: calc(100% - 65px);
}
.all{
  height: 100vh;
  overflow: hidden;
}
</style>