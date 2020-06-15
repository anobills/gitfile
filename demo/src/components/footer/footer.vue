<template>
        <div class="foot">
            <p>备案号：粤ICP备20017736号 </p>
                <p>
                    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44142302000035">
                        <img src="./beian.png"/>
                        <span style="color: #fff;">粤公网安备 44142302000035号</span>
                    </a>
                </p>
                
            <p>此网站用于本人的学习成果展示和功能分享，如若出现侵权内容，联系本人删除</p>
        </div>
</template>

<script>
export default {
    name: 'foot',
    data() { 
        return {

        }
    }
}
</script>

<style lang="" scoped>
.foot{
    min-width: 260px;
    padding: 20px;
    background-color: black;
    margin-top: 150px;
} 
.foot span{
  vertical-align: middle;
}
</style>