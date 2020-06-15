<template>
  <div id="app">
    <!-- <div class="hero-unit mask">
      <h1>Loading......</h1>
      <p>Welcome to Moope′s blog</p> -->
      <!-- <p> -->
        <!-- <a class="btn btn-primary btn-large">
          Learn more
        </a> -->
        <!-- <div class="circle">
        </div>
      </p> -->
    <!-- </div> -->
    <!-- <div class="hide"> -->
      <div class="header navbar navbar-inverse" :class="{fix: ifTop}">
        <div class="navbar-inner">
          <a class="brand" href="/">Moope的个人博客</a>
          <ul class="nav">
              <li :class="{active: tab==0}" @click="tab=0">
                <a href="#">
                  <router-link to="/index">首页</router-link>
                </a>
              </li>
              <li :class="{active: tab==1}" @click="tab=1"><a href="#"><router-link to="/record">学习记录</router-link></a></li>
              <li :class="{active: tab==2}" @click="tab=2"><a href="#"><router-link to="/myApp">App</router-link></a></li>
              <li :class="{active: tab==3}" @click="tab=3"><a href="#"><router-link to="/about">关于</router-link></a></li>
          </ul>
        </div>
      </div>
      <div class="view-wrap" :style="{marginTop: ifTop? '40px':'none'}">
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
        
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
// import index from "./components/index/index"
export default {
  name: 'App',
  components: {
    // HeadNav,
    // index
  },
  data(){
    return{
      ifTop: window.scrollY,
      tab: 0,
    }
  },
  mounted(){
    // @click=“one();two()” 注意: 方法名后加() => 调用方法 多个方法用;隔开
    addEventListener("scroll",()=>{
          if(window.scrollY){
            this.ifTop = true;
          }else{
            this.ifTop = false;
          }
      })
  }
}
</script>

<style>
.header.fix{
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  z-index: 20;
}
.carousel-indicators li{
    background-color: rgba(0,0,0,.5);
}

.hide{
  display: none;
}
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(146, 146, 146, 0.267);
  margin: 0;
  z-index: 1000;
}
.mask .circle{
  width: 40px;
  height: 40px;
  border: 1px solid seashell;
  border-right: 1px solid transparent;
  border-radius: 50%;
  animation: roll 1s infinite;
}
.mask .circle:after{
  content: '';
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid seashell;
  border-left: 1px solid transparent;
  border-radius: 50%;
  margin: 4px;
  
}
@keyframes roll{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;top: 0;right: 0;
  position: absolute;
  transform: translateX(-500px)  scale(0.5);
  opacity:1;
}
.slide-fade-enter-active {
  /* background-color: white; */
  transition: all 0.6s;
}
.slide-fade-leave-active {
  transition: all 0.7s;
  /* background-color: white; */
  transform: translateX(500px) scale(1) ;
  opacity: 0;
  z-index: 100;
}
</style>
