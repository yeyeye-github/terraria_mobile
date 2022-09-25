<template>
  <div class="footerr">
    <div @click="dianji(0)" class="tubiao" :class="{'act':clickTB.home}">
      <i class="iconfont" :class="{'icon-home':!clickTB.home, 'icon-home-fill':clickTB.home}"></i>
      <span>首页</span>
    </div>
    <div @click="dianji(1)" class="tubiao" :class="{'act':clickTB.user}">
      <i class="iconfont" :class="{'icon-account':!clickTB.user, 'icon-account-fill':clickTB.user}"></i>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        clickTB:{
            home:this.$route.meta.home,
            user:this.$route.meta.user
        }
    };
  },
  methods: {
    dianji(x) {
        if(x == 0){
            this.clickTB.user = false
            this.clickTB.home = true
            this.$router.push('/home')
        }
        else{
            this.clickTB.home = false
            this.clickTB.user = true
            this.$router.push('/user')
        }
    },
  },
  watch:{
    '$route.path':{
      deep:true,
      handler(){
        this.clickTB.home = this.$route.meta.home
        this.clickTB.user = this.$route.meta.user
      }
    }
  }
};
</script>

<style scoped lang="less">
.footerr {
  position: fixed;
  z-index: 5;
  bottom: 0;
  height: 45px;
  // background-color: rgb(115, 106, 106);
  background-color: white;
  width: 100vw;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  font-size: 0px;
  display: flex;
  justify-content: space-around;
  // z-index: 2;

  .tubiao {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    color: #333;
  }

  i {
    font-size: 25px;
    margin-bottom: -3px;
  }
  span {
    font-size: 14px;
  }
  .act{
    color: #5590ef;
  }
}
</style>