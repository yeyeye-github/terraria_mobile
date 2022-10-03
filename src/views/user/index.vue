<template>
  <div class="usermain">
    <div class="headerr">
      <img :src="'http://yeyeye.cc:5003/temp/touxiang1.webp'" alt="">
      <div class="userdata">
        <span>{{all.username}}</span>
        <span>实名认证</span>
      </div>
    </div>
    <div class="showelse">
      <div>
        <span>{{all.dongtai}}</span>
        <span>动态</span>
      </div>
      <div>
        <span>{{all.guanzhu}}</span>
        <span>关注</span>
      </div>
      <div>
        <span>{{all.fans}}</span>
        <span>粉丝</span>
      </div>
    </div>
    <div class="cz">
      <div @click="bianjizl">
        <i class="iconfont icon-editor"></i>
        <span>编辑资料</span>
        <div style="flex:1"></div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <div @click="$router.push('guide');">
        <i class="iconfont icon-comments"></i>
        <span>向导</span>
        <div style="flex:1"></div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <div @click.stop="outlogin">
        <i class="iconfont icon-prompt"></i>
        <span>退出登录</span>
        <div style="flex:1"></div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      all:{}
    }
  },
  mounted() {
    this.autoLogin();
  },
  methods: {
    bianjizl(){
      this.$router.push('edit')
    },
    async getuser(){
        const r = await this.$api.userAPI()
        this.all = r.data.data
        this.all.touxiang = require(`@/assets/images/touxiang/${this.all.touxiang}.webp`)
    },
    async autoLogin() {
      const r = await this.$api.autoLoginAPI();
      // console.log(r);
      if (r.data.code == "201") {
        this.$router.replace("/login");
      }
      else{
        this.getuser()
      }
    },
    async outlogin() {
      const r = await this.$api.outloginAPI();
      if (r.data.code == "200") {
        this.$router.replace("/login");
        window.location.reload();
      }
    },
  },
};
</script>

<style scoped lang="less">
.usermain {
  position: relative;
  top: -87px;
  .headerr {
    height: 100px;
    background-color: #5590ef;
    display: flex;
    align-items: center;
    img {
      object-fit:cover;
      width: 60px;
      height: 60px;
      border-radius: 60px;
      margin-right: 10px;
      margin-left: 20px;
    }
    .userdata {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        &:first-of-type {
          height: 25px;
          line-height: 25px;
          color: white;
          margin-bottom: 5px;
        }
        &:last-of-type {
          background-color: white;
          padding: 0 5px;
          border-radius: 2px;
          color: #5590ef;
        }
      }
    }
  }
  .showelse {
    display: flex;
    justify-content: space-around;
    height: 75px;
    background-color: #5590ef;
    align-items: center;
    color: white;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        padding-bottom: 3px;
      }
    }
  }
  .cz{
    padding: 0 10px;
    div{
      display: flex;
      align-items: center;
      height: 45px;
      i{
        &:first-of-type{
          margin-right: 5px;
        }
      }
    }
  }
}
</style>