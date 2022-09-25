<template>
  <div class="usermain">
    用户页
    <a href="#" @click.prevent="outlogin">退出登录</a>
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
    async outlogin(){
      const r = await this.$api.outloginAPI()
      if (r.data.code == "200") {
        this.$router.replace("/login");
        window.location.reload()
      }
    }
  },
};
</script>

<style scoped lang="less">
.usermain {
  position: relative;
  top: -87px;
}
</style>