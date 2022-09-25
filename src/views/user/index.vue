<template>
  <div class="usermain">
    用户页
  </div>
</template>

<script>
export default {
  mounted() {
    this.autoLogin();
  },
  methods: {
    async autoLogin() {
      const r = await this.$api.autoLoginAPI();
      console.log(r);
      if (r.data.code == "201") {
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style scoped lang="less">
.usermain {
  position: relative;
  top: -87px;
}
</style>