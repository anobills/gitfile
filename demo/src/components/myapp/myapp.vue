<template>
    <div class="myApp">
        <div :style="{display: $route.path.match(/myApp$/)?'block':'none'}">
            <h2>app列表</h2>
            <div class="list">
                <div class="item">
                    <router-link to="/myApp/drawLJ">
                        <img src="./img/lingjian.png" alt="">
                        <span>零件demo</span>
                    </router-link>
                    
                </div>
                <div class="item">
                    <a href="http://m.moope.top">
                    <!-- <router-link to="/myApp/eleme"> -->
                        <img src="./img/list.jpg" alt="">
                        <span>饿了么</span>
                    <!-- </router-link> -->
                    </a>
                    
                </div>
                <div class="item">
                    <a href="https://www.cnblogs.com/moope/">
                        <img src="https://ae01.alicdn.com/kf/H5a3dfb8962c74663bec4d8e041df2d163.jpg" alt="">
                        <span>路指博客园☞</span>
                    </a>
                </div>
                <div class="item">
                    <router-link to="/myApp/nothing">
                        <img src="./img/list.jpg" alt="">
                        <span>asda</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/myApp/nothing">
                        <img src="./img/list.jpg" alt="">
                        <span>asda</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/myApp/nothing">
                        <img src="./img/list.jpg" alt="">
                        <span>asda</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/myApp/nothing">
                        <img src="./img/list.jpg" alt="">
                        <span>asda</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/myApp/nothing">
                        <img src="./img/list.jpg" alt="">
                        <span>asda</span>
                    </router-link>
                </div>
            </div>
        </div>
        
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'myApp',
    data() { 
        return {
            enter: false
        }
    },
    methods: {
        toApp(num){
            this.enter=true;
            // this.$http.get(`/api/myApp?num=${num}`)
        }
    }
}
</script>

<style lang="" scoped>
.list{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    background-color: rgba(121, 121, 121, 0.37);
    margin: auto;
}
.item{
    overflow: hidden;
    width: 100px;
    height: 120px;
    border-radius: 20px;
    /* background-color: darkgoldenrod; */
    margin: 10px;
}
</style>