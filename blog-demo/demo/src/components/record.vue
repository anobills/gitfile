<template>
    <div class="record">
        <div class="list-wrap">
            <div class="string"></div>
            <ul>
                <li v-for="(el,ind) in data" :key="ind">
                    <div class="circle">
                        <div class="text text-left" v-html="el.text"></div>
                    </div>
                    <p class="text-left">{{el.year}}.{{el.month}}.{{el.day}}</p>
                </li>
            </ul>
        </div>
        <div class="logo-wrap">
            <Logo />
            <h2>每一点滴都将在未来感动自己</h2>
        </div>
    </div>
</template>

<script>
// import Logo from "./logo"
// import Foot from "./footer/footer"
const Logo = ()=>import('./logo')


export default {
    name: 'record',
    components: {
        Logo,
    },
    data() { 
        return {
            data: ''
        }
    },
    mounted(){
        this.$http.get('/api/record').then(res=>{
            const result = res.data;
            this.data = result.data;
            // console.log(result)
        })
    }

}
</script>

<style lang="" scoped>
.list-wrap{
    position: relative;
    max-width: 1200px;
    padding: 40px 0;
    background-color: rgba(112, 112, 112, 0.658);
    margin: 20px auto;
}
.string{
    position: absolute;
    left: 70px;
    top: 30px;
    bottom: -10px;
    width: 10px;
    background-color: rgba(255, 255, 255, 0.63);
    border-radius: 5px 5px 0 0;
    z-index: 1;
}
.list-wrap ul{
    position: relative;
    list-style-type: none;
    z-index: 1;
}
.list-wrap li{
    /* width: 50px; */
    margin: 40px;
}
.circle{
    width: 30px;
    height: 30px;
    background-color: aquamarine;
    border-radius: 15px;
    transition: .5s;
    
}
.circle:hover{
    width: 80%;
    border-radius: 0 0 100% 15px;
}
.circle .text{
    position: relative;
    left: 30px;
    box-sizing: border-box;
    overflow: hidden;
    width: 0;
    height: 0;
    padding: 10px 30px;
    background-color: rgb(255, 175, 78);
    border-radius: 0 0 100% 15px;
    opacity: 0;
    transition: .3s;
}
.circle:hover .text{
    overflow: visible;
    min-width: 250px;
    width: 100%;
    height: auto;
    opacity: 1;
    z-index: 5;
}
.list-wrap li p{
    margin-left: 40px;
}
.circle:hover + p{
    opacity: 0;
}


.logo-wrap{
    position: fixed;
    left: 35%;
    top: 30%;
    z-index: -2;
}
.logo-wrap h2{
    font-family: "youyuan";
}

</style>