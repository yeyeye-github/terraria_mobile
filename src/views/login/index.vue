<template>
  <div class="main">
    <div class="headerr">泰拉瑞亚头条-登录</div>
    <form action="#" @submit.prevent="login">
      <div>
        <span>手机号</span><input required type="text" v-model.lazy="phone">
      </div>
      <div class="tips" :class="{white:phoneright}">请输入正确的手机号！</div>
      <div>
        <span>密码</span><input required type="password" v-model.lazy="password">
      </div>
      <div class="tips" :class="{white:passwordright}">密码为六位纯数字！</div>
      <button>登录</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "13888888888",
      password: "000000",
      phoneright: true,
      passwordright: true,
    };
  },
  methods: {
    async login() {
      if(this.phoneright && this.passwordright){
        const r = await this.$api.loginAPI(this.phone, this.password)
        console.log(r.data)
        if(r.data.code == 200){
          this.$router.replace('/home')
        }
        else{
          alert(r.data.msg)
        }
      }
    },
  },
  watch: {
    phone: {
      immediate: true,
      handler() {
        if (!/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(this.phone)) {
          this.phoneright = false;
        } else {
          this.phoneright = true;
        }
      },
    },
    password: {
      immediate: true,
      handler() {
        if (this.password.length != 6 || !/^[0-9]*$/.test(this.password)) {
          this.passwordright = false;
        } else {
          this.passwordright = true;
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
.main {
  position: relative;
  top: -87px;
  .headerr {
    width: 100%;
    background-color: #5590ef;
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    .tips {
      color: red;
      font-size: 12px;
      padding: 5px 10px 5px 10px;
    }
    .white {
      color: transparent;
    }
    div {
      padding: 0px 10px;
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #666;
      span {
        // font-size: 16px;
        display: inline-block;
        width: 70px;
        text-align-last: justify;
        margin-right: 25px;
      }
      input {
        flex: 1;
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:first-of-type {
        // margin-bottom: 20px;
        margin-top: 20px;
      }
    }
    button {
      border: none;
      color: white;
      background-color: #5590ef;
      font-size: 16px;
      height: 35px;
      line-height: 35px;
      width: 80%;
      margin: 0 auto;
      margin-top: 15px;
      border-radius: 30px;
    }
  }
}
</style>