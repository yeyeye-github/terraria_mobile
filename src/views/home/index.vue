<template>
  <div>
    <div class="headerr">
      <img class="fimg" src="@/assets/images/home/1.webp" alt="">
      <span>头条号</span>
      <div style="flex:1"></div>
      <i class="iconfont icon-search"></i>
    </div>
    <div>
      <div class="channel" style="left: 0;right:0" ref="ch">
        <span v-for="(d) in channelList" :key="d.id" @click.prevent="changeChannelCurr(d.id,$event)">{{d.name}}<div v-show="d.id == channelCurr"></div> </span>
      </div>
      <div class="jiahao">+</div>
    </div>
    <div ref="panel" v-for="(d) in allArticle" :key="d.id" class="main" @scroll="getScroll" :class="{no:d.id != channelCurr}">
      <div class="article">
        <myarticle v-for="(c) in d.data" :key='c.id' :title="c.title" :num="c.content_num" :time="c.time" :name="c.username" :type="c.type" :imglist="c.imgurl.split(',')"></myarticle>
      </div>
      <div class="jiazaiz">
        {{d.zz}}
      </div>
    </div>

  </div>
</template>

<script>
import myarticle from "./article";
export default {
  name: "HomeBody",
  data() {
    return {
      channelCurr: 1,
      kaishi0: 0,
      kaishi1: 0,
      chleft: 0,
      channelList: [],
      allArticle: {},
      show: [],
      isjz: false,
      test:[{name:0,id:7}]
    };
  },
  components: {
    myarticle,
  },
  mounted() {
    this.getChannel();
  },
  methods: {
    getScroll(e) {
      var scrollHeight = e.target.scrollHeight;
      var scrollTop = e.target.scrollTop;
      var clientHeight = e.target.clientHeight;

      if (this.isjz == true) {
        if (scrollTop + clientHeight >= scrollHeight - 3) {
          this.showTS = "加载中...";
          this.isjz = false;
          this.getArticle(+this.allArticle[this.channelCurr].page + 1);
        }
      }
    },
    async getChannel() {
      const r = await this.$api.channelAPI();
      this.channelList = r.data.data;
      this.channelList.forEach((e) => {
        const tem = {};
        tem.page = 0;
        tem.isDown = false;
        tem.isLoad = false;
        tem.zz = '加载中'
        tem.id = e.id;
        tem.data = []
        // this.allArticle[e.id] = tem;
        this.$set(this.allArticle,`${e.id}`,tem)
        // this.$set(this.allArticle[e.id],"data",[])
        // this.$set(this.allArticle[e.id],"page",0)
        // this.$set(this.allArticle[e.id],"isDown",false)
        // this.$set(this.allArticle[e.id],"isLoad",false)
        // this.$set(this.allArticle[e.id],"zz",'加载中')
        // this.$set(this.allArticle[e.id],"id",e.id)
      });
      this.getArticle();
    },
    async changeChannelCurr(id, e) {
      if (this.channelCurr == id) {
        return;
      }
      this.channelCurr = id;
      // console.dir(e.target);
      this.$refs.ch.scrollTo({
        left:
          e.target.offsetLeft -
          document.documentElement.clientWidth / 2 +
          e.target.offsetWidth / 2,
        behavior: "smooth",
      });

      if (this.allArticle[this.channelCurr].page == 0) {
        this.getArticle();
      }
    },
    async getArticle(page = 1) {
      const r = await this.$api.articleAPI(this.channelCurr, page);

      r.data.data.sort(function(){
        return Math.random() - 0.5
      })

      if(this.allArticle[this.channelCurr].isDown){
        return 
      }
      if(r.data.data.length < 10){
        this.allArticle[this.channelCurr].data = this.allArticle[
          this.channelCurr
        ].data.concat(r.data.data);
        this.isjz = true;
        this.allArticle[this.channelCurr].page += 1
        this.allArticle[this.channelCurr].isDown = true
        this.allArticle[this.channelCurr].zz = '没有更多了...'
        // this.$forceUpdate();
        return
      }
      if (this.allArticle[this.channelCurr].isLoad == false) {
        this.allArticle[this.channelCurr].data = this.allArticle[
          this.channelCurr
        ].data.concat(r.data.data);
        this.allArticle[this.channelCurr].isLoad = true;
        this.allArticle[this.channelCurr].page = 1
        // this.$forceUpdate();
        this.isjz = true;
      } else {
        this.allArticle[this.channelCurr].data = this.allArticle[
          this.channelCurr
        ].data.concat(r.data.data);
        this.isjz = true;
        this.allArticle[this.channelCurr].page += 1
        // console.log(this.allArticle[this.channelCurr])
        // this.$forceUpdate();
      }
      // this.allArticle[this.channelCurr].page += 1;
    },
  },
  watch: {
    chleft: {
      handler() {
        if (this.chleft > 0) {
          this.$refs.ch.style.left = "0px";
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
.headerr {
  position: fixed;
  z-index: 5;
  height: 50px;
  width: 100%;
  background-color: #5590ef;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  overflow: hidden;
  .fimg {
    height: 75%;
  }
  i {
    font-size: 32px;
    color: white;
    margin-right: 10px;
  }
  span {
    font-size: 17px;
    color: white;
    padding-top: 7px;
    padding-left: 5px;
  }
}
.jiahao {
  font-size: 32px;
  position: fixed;
  z-index: 5;
  right: 0;
  background-color: #fff;
  color: #666;
  top: 50px;
  width: 40px;
  text-align: center;
}
.channel {
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 5;
  padding-right: 40px;
  overflow-x: scroll;
  position: fixed;
  display: flex;
  top: 50px;
  background-color: white;
  // transition: 0.3s;
  span {
    position: relative;
    padding: 10px 20px;
    font-size: 16px;
    flex-shrink: 0;
    color: #666;
    div {
      position: absolute;
      width: 75%;
      height: 5px;
      background-color: #5590ef;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      border-radius: 5px;
    }
  }
}
.main {
  height: calc(100vh - 132px);
  width: 100vw;
  overflow: scroll;
  .article {
    // background-color: rgb(201, 201, 201);
    padding: 0 10px;
    padding-top: 10px;
  }
  .jiazaiz {
    text-align: center;
    padding-bottom: 10px;
    color: #999;
  }
}
.no {
  display: none;
}
</style>