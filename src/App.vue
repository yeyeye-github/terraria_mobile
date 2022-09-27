<template>
  <div class="all">
    <transition name='test'>
      <div class="bigtip" v-show="bigtipShow">
        {{ts}}
      </div>
    </transition>
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- <div class="test"><button @click="ttt">点击</button></div> -->
    <myfooter v-if="!$route.meta.footer"></myfooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bigtipShow: false,
      ts: "",
    };
  },
  methods: {
    tts(data) {
      this.bigtipShow = data.show;
      this.ts = data.ts;
      setTimeout(() => {
        this.bigtipShow = false
        if(data.fun){
          data.fun(this)
        }
      }, data.time);
    },
  },
  mounted() {
    this.$bus.$on("ttss", this.tts);
  },
};
</script>

<style scoped lang="less">
body {
  overflow: hidden;
}
html {
  overflow: hidden;
}
// .main {
//   // height: 100vh;

//   // height: calc(100% - 65px);
// }

.bigtip {
  position: fixed;
  width: 200px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  color: white;
  text-align: center;
  line-height: 100px;
  font-size: 17px;
}
.all {
  height: 100vh;
  padding-top: 87px;
  // padding-bottom: 100px;
  overflow: hidden;
  user-select: none;
}
.test-enter-active,
.test-leave-active {
  transition: all 0.3s ease;
}
.test-enter, .test-leave-to {
    opacity: 0
  }
</style>