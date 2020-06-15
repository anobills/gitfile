<template>
    <div class="main">
        <div :style="{display: $route.query.artical?'none':'block'}">
            <div id="myCarousel" class="carousel slide" ref="banner" data-ride="carousel">
                <ol class="carousel-indicators" style="position: absolute;width: 60px;left: 0;right: 0;top: 10%;margin: 10px auto;">
                <li :class="{active:bannerInd==0}" @click="bannerInd=0"></li>
                <li :class="{active:bannerInd==1}" @click="bannerInd=1"></li>
                <li :class="{active:bannerInd==2}" @click="bannerInd=2"></li>
                <li :class="{active:bannerInd==3}" @click="bannerInd=3"></li>
                </ol>
                <div class="carousel-inner">
                <div class="item" :class="{active:bannerInd==0}">
                    <img src="./img/banner1.jpg" alt="">
                    <div class="carousel-caption" :style="{display:mobileScreen?'none':'block'}">
                    <h4>First Thumbnail label</h4>
                    <p>等待我的小船慢慢成长，远航走向蔚蓝大海</p>
                    </div>
                </div>
                <div class="item" :class="{active:bannerInd==1}">
                    <img src="./img/banner2.jpg" alt="">
                    <div class="carousel-caption" :style="{display:mobileScreen?'none':'block'}">
                    <h4>Second Thumbnail label</h4>
                    <p>宅也是种态度，游戏确实很香</p>
                    </div>
                </div>
                <div class="item" :class="{active:bannerInd==2}">
                    <img src="./img/banner3.jpg" alt="">
                    <div class="carousel-caption" :style="{display:mobileScreen?'none':'block'}">
                    <h4>Third Thumbnail label</h4>
                    <p>愿出走半生，归来仍是少年</p>
                    </div>
                </div>
                <div class="item" :class="{active:bannerInd==3}">
                    <img src="./img/banner4.jpg" alt="">
                    <div class="carousel-caption" :style="{display:mobileScreen?'none':'block'}">
                    <h4>Fourth Thumbnail label</h4>
                    <p>心有多大，世界就有多大</p>
                    </div>
                </div>
                </div>
                <a class="left carousel-control prev" data-slide="prev" @click="bannerInd==0?bannerInd=3:bannerInd--"><i class="el-icon-arrow-left"></i></a>
                <a class="right carousel-control next" data-slide="next" @click="bannerInd==3?bannerInd=0:bannerInd++"><i class="el-icon-arrow-right"></i></a>
            </div>
            <ul class="nav nav-tabs">
                <li :class="{active: tab == 0}" @click="tab=0"><a data-toggle="tab">html</a></li>
                <li :class="{active: tab == 1}" @click="tab=1"><a data-toggle="tab">css</a></li>
                <li :class="{active: tab == 2}" @click="tab=2"><a data-toggle="tab">js</a></li>
                <li :class="{active: tab == 3}" @click="tab=3"><a data-toggle="tab">git</a></li>
                <li :class="{active: tab == 4}" @click="tab=4"><a data-toggle="tab">other</a></li>
            </ul>
            
            <div class="tab-content">
                <!-- <div class="tab-pane active" id="tab1"> -->
                    <div class="media" v-for="(el,ind) in getContent" :key="ind">
                        <router-link class="pull-left" :to="`/index/detial?artical=${el.id}`">
                        <img class="media-object" v-lazy="el.img" @click="getDetial(el)">
                        </router-link>
                        <div class="media-body text-left">
                            <h4 class="media-heading" @click="getDetial(el)">
                                <router-link :to="`/index/detial?artical=${el.id}`">
                                    {{el.title}}
                                </router-link>
                            </h4>
                            <p class="msg">{{el.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{el.viewNum}}</p>
                            <p v-html="el.content[0].text1"></p>
                            <!-- <p class="msg">{{el.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{el.viewNum}}</p> -->
                        </div>
                    </div>
                <!-- </div> -->
            </div>
        </div>
        <div>
            
                <keep-alive>
                    <transition name="showDetial">
                        <router-view ></router-view>
                    </transition>
                </keep-alive>
            
            
            
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() { 
        return {
            bannerInd: 0,
            tab: 0,
            mobileScreen: window.innerWidth<450,
        }
    },
    mounted(){
        // this.classMap = ["getArticals"];
        
        console.log(new Date())
        this.timer = setInterval(()=>{
            this.bannerInd==3?this.bannerInd=0:this.bannerInd++;
        },3000);
        this.$refs.banner. onmouseover=()=>{
            clearInterval(this.timer);
        }
        this.$refs.banner. onmouseleave=()=>{
            this.timer = setInterval(()=>{
                this.bannerInd==3?this.bannerInd=0:this.bannerInd++;
            },3000);
        }
        return this.$store.dispatch('getArticals');
    },
    methods: {
        
        getDetial(el){
            return this.$store.dispatch('getDetial',el);
        }
    },
    computed: {
        getContent(){
            let typeArr = ['html','css','js','git','other'];
            let typeArt = [];
            if(this.$store.state.articals[0]){
                return this.$store.state.articals.filter(text=>text.type==typeArr[this.tab]);
            }
            // return this.$store.dispatch('getContent',type);
        },
    }
}
</script>
<style lang="" scoped>
.tab-content .media{
    position: relative;
    box-sizing: border-box;
    /* box-shadow: 1px 1px 20px 20px tomato; */
    transition: .5s;
}
.tab-content .media:hover{
    border-right: 6px solid #fff;
    border-bottom: 1px solid #fff;
    border-radius: 0 20px 20px 0;
}
.tab-content .media img{
    height: 105px;
}
.tab-content .media a{
    overflow: hidden;
    color: #fff;
}
.tab-content .media .msg{
    /* position: absolute;
    top: 5px;
    right: 20px; */
    white-space:nowrap;
    overflow: hidden;
}
.media-heading{
    white-space:nowrap;
    overflow: hidden;/* ????????????? */
    text-overflow: ellipsis;   
    -webkit-box-orient: vertical; /* ??????????????????? */ 
    padding-right: 10px;
    word-wrap: break-word;
}
.tab-content .media .media-object{
    transition: .5s;
}
.tab-content .media:hover .media-object{
    transform: scale(1.5);
}
p{
    /* white-space:nowrap;????????   */
    overflow: hidden;/* ????????????? */
    text-overflow: ellipsis;
    display: -webkit-box; /* ??????????????? */      
    -webkit-line-clamp: 3; /* ???????? */      
    -webkit-box-orient: vertical; /* ??????????????????? */ 
    padding-right: 10px;
    word-wrap: break-word;
}
/* .carousel-control.prev{
    border-radius: 100% 0 0 100%;
}
.carousel-control.next{
    border-radius: 0 100% 100% 0;
} */
.el-icon-arrow-left,.el-icon-arrow-right{
    font-size: 40px;
}

.showDetial-enter, .showDetial-leave-to
{
  left:0;top: 0;right: 0;
  position: absolute;
  transform: translateY(-500px) scale(0.5);
  opacity:1;
}
.showDetial-enter-active{
  transition: all 0.6s;
}
.showDetial-leave-active {
  transition: all 0.7s;
  /* background-color: white; */
  transform: translateX(-500px);
  opacity: 0;
  z-index: 100;
}
</style>

