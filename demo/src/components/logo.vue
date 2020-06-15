<template>
    <div class="logo">
        <div class="bg">
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
            <div class="four"></div>
            <div class="five"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'logo',
    data() { 
        return {

        }
    }
}
</script>

<style lang="" scoped>
.logo{
    height: 240px;
}
.logo .bg{
    width: 120px;
    height: 120px;
    background-color: rgb(0, 167, 167);
    margin: auto;
    box-shadow: -60px 60px 50px -24px #000;
    transform: rotateZ(-45deg);
}
.logo .bg div{
    width: 80px;
    height: 15px;
    margin:10px 0;
    background-color: #fff;
    border: 1px solid gray;
    box-shadow: 0px 1px 6px #000;
}
.logo .bg .three,.logo .bg .one{
    margin-left: 40px;
}
</style>