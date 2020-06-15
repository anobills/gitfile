<template>
    <div class="recent">
        <div data-v-016619b6="" class="center" v-for="(el,ind) in recentArtical" :key="ind">
            <router-link :to="`/index/detial?artical=${el.id}`" class="pull-left">
                <img data-v-016619b6="" v-lazy="el.img" @click="num(el)">
            </router-link> 
            <div data-v-016619b6="" class="bg text-left">
                <h4 data-v-016619b6="" class="media-heading" @click="num(el)">
                    <router-link :to="`/index/detial?artical=${el.id}`" class="">
                    {{el.title}}
                    </router-link>
                </h4> 
                <p>{{el.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{el.viewNum}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'recent',
    data() { 
        return {
            recentArtical: [],
            id: '' 
        }
    },
    mounted(){
        this.$http.get('/api/recent').then(res=>{
            const result = res.data;
            this.recentArtical = result.data;
            // console.log(result)
        })
    }
}
</script>

<style lang="" scoped>
.bg{
    background-color: #666;
}
</style>