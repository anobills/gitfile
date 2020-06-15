<template>
    <div class="index">
        <div class="container-fluid" style="max-width: 1200px; margin: auto;">
          <div class="row-fluid">
              <div :class="{span9:!smallScreen,span12:smallScreen}">
                    <Main />
              </div>
              <div class="span3" :style="{display: smallScreen?'none':'block'}">
                  <div class="container">
                      <div class="navbar">
                          <div class="navbar-inner">
                              <a class="brand" href="#">日历</a>
                          </div>
                      </div>
                      <Calendar />
                  </div>
                  <div class="container">
                      <div class="navbar">
                          <div class="navbar-inner">
                              <a class="brand" href="#">时钟</a>
                          </div>
                      </div>
                        <Time />
                      
                  </div>
                  <div class="container">
                      <div class="navbar">
                          <div class="navbar-inner">
                              <a class="brand" href="#">近期博文</a>
                          </div>
                          <div class="recent">
                                <div class="center" v-for="(el,ind) in recentArtical" :key="ind">
                                    <router-link :to="`/index/detial?artical=${el.id}`" class="pull-left">
                                    <div class="img-wrap">
                                        <img v-lazy="el.img" @click="num(el)">
                                    </div>
                                    </router-link> 
                                    <div class="bg text-left">
                                        <h4 class="media-heading" @click="num(el)">
                                            <router-link :to="`/index/detial?artical=${el.id}`" class="">
                                            {{el.title}}
                                            </router-link>
                                        </h4> 
                                        <p>{{el.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{el.viewNum}}</p>
                                    </div>
                                </div>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <Foot />
    </div>
</template>

<script>
// import Foot from "../footer/footer"
// import Main from "../main/main"
// import Calendar from "../calendar"
// import Time from "../time"
const Foot = ()=>import('../footer/footer')
const Main = ()=>import('../main/main')
const Calendar = ()=>import('../calendar')
const Time = ()=>import('../time')


export default {
    name: 'index',
    components: {
        Foot,
        Calendar,
        Time,
        Main,
    },
    data() { 
        return {
          smallScreen: window.innerWidth<700,
          id: '',
          detialTran: ''
        }
    },
    computed: {
        recentArtical(){
            // console.log(this.$store.getters.recentArtical)
            return this.$store.getters.recentArtical;
        }
    },
    mounted(){
      addEventListener("resize",()=>{
          if(window.innerWidth<700){
            this.smallScreen = true;
          }else{
            this.smallScreen = false;
          }
      })
    },
    methods: {
        num(el){
            this.id=el.id;
            el.viewNum++;
            this.$http.get(`/api/addviewNum?id=${el.id}&&viewNum=${el.viewNum}`);
        }
    },

}
</script>

<style lang="" scoped>
.span3 .container{
  overflow: hidden; 
  width: 100%; 
  min-width: 150px; 
  background-color: rgba(255,255,255,.6);
  margin-bottom: 30px;
}
.recent .img-wrap{
    text-align: center;
}
.recent .img-wrap img{
    width: 100%;
}

</style>