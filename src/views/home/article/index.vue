<template>
  <div @click="dakaiwenz" class="armain">
    <div class="arr0">
      <span>{{title}}</span>
      <div style="flex:1"></div>
      <img v-if="type == 1" :src="require(`@/assets/images/article/${imglist[0]}.webp`)" alt="">
    </div>
    <div v-if="type == 3" class="arr1">
      <img v-for="(d,i) in imglist" :key="i" :src="require(`@/assets/images/article/${d}.webp`)" alt="">
    </div>
    <div class="arr2">
      <span>{{name}}&nbsp;&nbsp;&nbsp;</span>
      <span>{{num}} 评论&nbsp;&nbsp;&nbsp;</span>
      <span>{{showtime}}前&nbsp;&nbsp;&nbsp;</span>
      <span @click.stop="fankui" class="fr">×</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showtime: "",
      showPanel:false,
    };
  },
  props: ["title", "num", "time", "name", "type", "imglist","id"],
  watch: {
    time: {
      immediate: true,
      handler() {
        this.timeT(this.time);
      },
    },
  },
  methods: {
    dakaiwenz(){
      this.$router.push({
        name:'article',
        params:{
          id:this.id
        }
      })
    },
    fankui(){
      this.$bus.$emit('fankui',this.id)
    },
    timeT(str) {
      const jiange = new Date(new Date() - new Date(this.time));
      var days = Math.floor(jiange / (24 * 3600 * 1000));
      var leave1 = jiange % (24 * 3600 * 1000);
      var hours = Math.floor(leave1 / (3600 * 1000));
      var leave2 = leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));
      let tem = ""
      if (days > 0) {
        tem = days + ' 天'
        this.showtime = tem
        return
      }
      if (hours > 0){
        tem = hours + ' 小时'
        this.showtime = tem
        return
      }
      if(minutes > 0){
        tem = minutes + ' 分钟'
        this.showtime = tem
        return
      }
    },
  },
};
</script>

<style scoped lang="less">
.armain {
  margin-bottom: 10px;
  .arr0 {
    display: flex;
    align-items: flex-start;
    margin-bottom: 5px;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    img {
      height: 75px;
      padding-left: 10px;
    }
  }
  .arr1 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 5px;
    img {
      width: 33%;
      object-fit: contain;
      height: 75px;
      background-color: rgb(163, 174, 177);
    }
  }
  .arr2 {
    padding: 5px 0;
    font-size: 12px;
    color: #999;
    overflow: hidden;
    .fr {
      line-height: 10px;
      cursor: pointer;
      float: right;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>