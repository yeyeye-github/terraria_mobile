<template>
  <div>
    <div class="headerr">
      <img class="fimg" src="@/assets/images/home/1.webp" alt="">
      <span>头条号</span>
      <div style="flex:1"></div>
      <i @click="search" class="iconfont icon-search"></i>
    </div>
    <div>
      <div class="channel" style="left: 0;right:0" ref="ch">
        <span v-for="(d) in channelList" :key="d.idd" @click.stop="changeChannelCurr(d.idd,$event)">{{d.name}}<div v-show="d.idd == channelCurr"></div> </span>
      </div>
      <div class="jiahao" @click="channelDo">+</div>
      <div class="channelDo" v-show="channelDoShow">
        <div class="channelHeader">
          <span>频道管理</span>
          <span @click="channelDoShow = false">×</span>
        </div>
        <div class="wodechannel">
          <span>我的频道：</span>
          <span @click="edit">{{bbj}}</span>
        </div>
        <div class="mychannel">
          <span @click="removec(d.name)" v-for="(d) in channelList" :key="d.idd">{{d.name}} <span v-show="bbj == '完成' && d.idd != 1" class="cx">×</span> </span>
        </div>
        <div class="moreChannel">
          点击添加更多频道：
        </div>
        <div class="allChannel">
          <span @click="addc(d.name)" v-for="(d) in otherChannelList" :key="d.idd">
            {{d.name}}
            <span v-show="bbj == '完成'" class="ca">✓</span>
          </span>
        </div>
      </div>
    </div>
    <div ref="loadtip" class="myreload" style="top: 55px;">{{tips.t[tips.curr]}}</div>
    <div ref="panel" v-for="(d) in allArticle" @touchstart="touchs($event)" @touchmove="touchm($event)" @touchend="touche($event)" :key="d.idd" class="main" :style="{height: `${h}`}" @scroll="getScroll"
      :class="{no:d.idd != channelCurr}">
      <div class="article">
        <transition-group :name="groupname">
          <myarticle v-for="(c) in d.data" :key='c.id' :id="c.id" :title="c.title" :num="c.content_num" :time="c.time" :name="c.username" :type="c.type" :imglist="c.imgurl.split(',')"></myarticle>
        </transition-group>
      </div>
      <div class="jiazaiz">
        {{d.zz}}
      </div>
    </div>
    <transition name="fankuit">
      <div @click="quxiao($event)" v-show="fankuishow" class="fankuipanel">
        <span @click="nointerest">不感兴趣（数据库并没有删除）</span>
        <span @click="fankuishow = false">取消</span>
      </div>
    </transition>
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
      allChannelList: [],
      otherChannelList: [],
      allArticle: {},
      isjz: false,
      tips: { t: ["下拉即可刷新...", "释放即可刷新...", ""], curr: 2 },
      touchAbout: {
        start: null,
        end: null,
      },
      h: "100px",
      channelDoShow: false,
      bigtipShow: false,
      ts: "",
      bbj: "编辑",
      fankuishow: false,
      delID: -1,
      groupname: "no",
    };
  },
  components: {
    myarticle,
  },
  mounted() {
    this.h = document.documentElement.clientHeight - 132 + "px";
    this.getChannel();
    this.$bus.$on("fankui", this.fankuimianban);
  },
  methods: {
    search() {
      this.$router.push('/search')
    },
    async nointerest() {
      const r = await this.$api.autoLoginAPI();
      if (r.data.code == 201) {
        const tem = {};
        tem.show = true;
        tem.ts = "请先登录！";
        tem.time = 1000;
        tem.fun = function (a) {
          a.$router.push("/login");
        };
        this.$bus.$emit("ttss", tem);
        return;
      }
      this.groupname = "del";
      setTimeout(() => {
        this.groupname = "no";
      }, 300);
      this.allArticle[this.channelCurr].data = this.allArticle[
        this.channelCurr
      ].data.filter((e) => {
        return e.id != this.delID;
      });
      this.fankuishow = false;
    },
    quxiao(e) {
      if (e.target.className == "fankuipanel") {
        this.fankuishow = false;
      }
    },
    fankuimianban(id) {
      this.delID = id;
      this.fankuishow = true;
    },
    addc(name) {
      if (this.bbj == "完成") {
        this.otherChannelList = this.otherChannelList.filter((e) => {
          if (e.name != name) {
            return true;
          } else {
            this.channelList.push(e);
            return false;
          }
        });
      }
    },
    removec(name) {
      if (name == "推荐") {
        return;
      }
      if (this.bbj == "完成") {
        this.channelList = this.channelList.filter((e) => {
          if (e.name != name) {
            return true;
          } else {
            this.otherChannelList.push(e);
            if (e.idd == this.channelCurr) {
              this.channelCurr = 1;
            }
            return false;
          }
        });
      }
    },
    async edit() {
      if (this.bbj == "编辑") {
        const r = await this.$api.autoLoginAPI();
        if (r.data.code == 201) {
          const tem = {};
          tem.show = true;
          tem.ts = "请先登录！";
          tem.time = 1000;
          tem.fun = function (a) {
            a.$router.push("/login");
          };
          this.$bus.$emit("ttss", tem);
          return;
        }
        this.bbj = "完成";
      } else {
        this.$api.changeChannelAPI(this.channelList);
        this.bbj = "编辑";
      }
    },
    async getallChannel() {
      const r = await this.$api.allChannelAPI();
      if (r.data.code == 200) {
        this.allChannelList = r.data.data;
        this.otherChannelList = this.allChannelList.filter((e) => {
          for (let index = 0; index < this.channelList.length; index++) {
            const element = this.channelList[index];
            if (element.name == e.name) {
              return false;
            }
          }
          return true;
        });
      } else {
        alert(r.data.msg);
      }
    },
    touchs(e) {
      this.touchAbout.start = e.touches[0].clientY;
      this.tips.curr = 0;
    },
    touchm(e) {
      if (e.currentTarget.scrollTop > 0) {
        return;
      }
      const tem = e.touches[0].clientY - this.touchAbout.start;
      if (tem < 0) {
        return;
      }
      if (tem > 120) {
        this.tips.curr = 1;
      } else {
        this.tips.curr = 0;
      }
      const t = (Math.atan(tem / 100) / (Math.PI / 2)) * 100;
      e.currentTarget.style.top = t + "px";
      this.$refs.loadtip.style.top = 55 + t + "px";
    },
    touche(e) {
      if (this.tips.curr == 1) {
        const tem = {};
        tem.page = 0;
        tem.isDown = false;
        tem.isLoad = false;
        tem.zz = "加载中";
        tem.idd = this.channelCurr;
        tem.data = [];
        // this.allArticle[e.id] = tem;
        this.$set(this.allArticle, `${this.channelCurr}`, tem);
        this.getArticle();
      }

      this.tips.curr = 2;
      // e.currentTarget.style.transition = '0.1s';
      // this.$refs.loadtip.style.transition = '0.1s';
      // e.currentTarget.style.pointerEvents = 'none';

      // setTimeout(() => {
      //   e.currentTarget.style.transition = '0s'
      //   this.$refs.loadtip.style.transition = '0s';
      // }, 300);

      e.currentTarget.style.top = "0px";
      this.$refs.loadtip.style.top = "55px";
    },
    channelDo() {
      this.channelDoShow = true;
    },
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
      const r0 = await this.$api.autoLoginAPI();
      if (r0.data.code == 201) {
        const r = await this.$api.channelAPI();
        this.channelList = r.data.data;
        this.channelList.forEach((e) => {
          const tem = {};
          tem.page = 0;
          tem.isDown = false;
          tem.isLoad = false;
          tem.zz = "加载中";
          tem.idd = e.idd;
          tem.data = [];
          // this.allArticle[e.id] = tem;
          this.$set(this.allArticle, `${e.idd}`, tem);
          // this.$set(this.allArticle[e.id],"data",[])
          // this.$set(this.allArticle[e.id],"page",0)
          // this.$set(this.allArticle[e.id],"isDown",false)
          // this.$set(this.allArticle[e.id],"isLoad",false)
          // this.$set(this.allArticle[e.id],"zz",'加载中')
          // this.$set(this.allArticle[e.id],"id",e.id)
        });
      } else {
        const r = await this.$api.userchannelAPI();
        this.channelList = r.data.data;
        this.channelList.forEach((e) => {
          const tem = {};
          tem.page = 0;
          tem.isDown = false;
          tem.isLoad = false;
          tem.zz = "加载中";
          tem.idd = e.idd;
          tem.data = [];
          // this.allArticle[e.id] = tem;
          this.$set(this.allArticle, `${e.idd}`, tem);
          // this.$set(this.allArticle[e.id],"data",[])
          // this.$set(this.allArticle[e.id],"page",0)
          // this.$set(this.allArticle[e.id],"isDown",false)
          // this.$set(this.allArticle[e.id],"isLoad",false)
          // this.$set(this.allArticle[e.id],"zz",'加载中')
          // this.$set(this.allArticle[e.id],"id",e.id)
        });
      }
      this.getallChannel();
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

      // console.log(this.channelCurr)
      if (!this.allArticle[this.channelCurr]) {
        const tem = {};
        tem.page = 0;
        tem.isDown = false;
        tem.isLoad = false;
        tem.zz = "加载中";
        tem.idd = id;
        tem.data = [];
        this.$set(this.allArticle, `${tem.idd}`, tem);
      }

      if (this.allArticle[this.channelCurr].page == 0) {
        this.getArticle();
      }
    },
    async getArticle(page = 1) {
      const r = await this.$api.articleAPI(this.channelCurr, page);

      r.data.data.sort(function () {
        return Math.random() - 0.5;
      });

      if (this.allArticle[this.channelCurr].isDown) {
        return;
      }
      if (r.data.data.length < 10) {
        this.allArticle[this.channelCurr].data = this.allArticle[
          this.channelCurr
        ].data.concat(r.data.data);
        this.isjz = true;
        this.allArticle[this.channelCurr].page += 1;
        this.allArticle[this.channelCurr].isDown = true;
        this.allArticle[this.channelCurr].zz = "没有更多了...";
        // this.$forceUpdate();
        return;
      }
      if (this.allArticle[this.channelCurr].isLoad == false) {
        this.allArticle[this.channelCurr].data = this.allArticle[
          this.channelCurr
        ].data.concat(r.data.data);
        this.allArticle[this.channelCurr].isLoad = true;
        this.allArticle[this.channelCurr].page = 1;
        // this.$forceUpdate();
        this.isjz = true;
      } else {
        this.allArticle[this.channelCurr].data = this.allArticle[
          this.channelCurr
        ].data.concat(r.data.data);
        this.isjz = true;
        this.allArticle[this.channelCurr].page += 1;
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
.del-leave-active {
  transition: left 0.3s ease;
  position: relative;
  left: 0px;
}

.del-leave-to {
  left: -100%;
}

.fankuit-enter-active,
.fankuit-leave-active {
  transition: all 0.3s ease;
}
.fankuit-enter,
.fankuit-leave-to {
  opacity: 0;
}

.fankuipanel {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 7;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  span {
    text-align: center;
    height: 50px;
    background-color: white;
    line-height: 50px;
    &:first-of-type {
      border-radius: 15px 15px 0 0;
    }
  }
}
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
  height: 38.39px;
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
.channelDo {
  position: fixed;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  width: 100vw;
  z-index: 6;
  top: 0;
  .channelHeader {
    height: 50px;
    width: 100%;
    background-color: #5590ef;
    line-height: 50px;
    span {
      font-size: 17px;
      color: white;
      &:first-of-type {
        float: left;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      &:last-of-type {
        float: right;
        width: 35px;
        text-align: center;
        font-size: 25px;
      }
    }
  }
  .wodechannel {
    font-size: 16px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    span {
      &:first-of-type {
        float: last;
      }
      &:last-of-type {
        float: right;
        cursor: pointer;
        width: 50px;
        text-align: center;
        box-shadow: 0 0 0 1px #5590ef;
        color: #5590ef;
        border-radius: 10px;
      }
    }
  }
  .mychannel,
  .allChannel {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px;
    span {
      position: relative;
      background-color: #eff5ff;
      height: 35px;
      line-height: 35px;
      text-align: center;
      .cx {
        height: 10px;
        position: absolute;
        right: 2px;
        top: 2px;
        line-height: normal;
        color: rgb(226, 150, 150);
      }
      .ca {
        height: 10px;
        position: absolute;
        right: 2px;
        top: 2px;
        line-height: normal;
        color: rgb(149, 233, 136);
      }
    }
  }
  .moreChannel {
    margin: 0 10px;
    margin-top: 10px;
    font-size: 16px;
  }
}
.myreload {
  position: absolute;
  width: 100vw;
  text-align: center;
  height: 30px;
  line-height: 30px;
  // background-color: rgb(162, 225, 253);
  color: #999;
}
.main {
  width: 100vw;
  overflow: scroll;
  position: relative;
  top: 0;
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