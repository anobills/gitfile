<template>
    <div class="detial">
        <h2 class="title">{{artical.title}}</h2>
        <p class="artical-msg">时间：{{artical.time}}  &nbsp;&nbsp; 分类：{{artical.type}} &nbsp;&nbsp; 作者：{{artical.author}} &nbsp;&nbsp; 访问人数：{{artical.viewNum}}</p>
        <div class="detial-text text-left">
            <div v-for="(el,ind) in artical.content" :key="ind">
                <blockquote>
                    <p v-show="el.h2" class="text-left">{{el.h2}}</p>
                    <!-- <small>引用来源 <cite title="Source Title">引用名称</cite></small> -->
                </blockquote>
                <div class="text">
                    <p v-show="el.text1" class="text-left" v-html="el.text1"></p>
                    <div>
                        <img v-lazy="el.img" alt="" v-show="el.img">
                    </div>
                    
                    <br>
                    <br>
                    <pre v-show="el.pre" class="text-left">{{el.pre}}</pre>
                    <p v-show="el.text2" class="text-left" v-html="el.text2"></p>
                </div>
            </div>
            
        </div>
        <div class="comment">
            <input class="span9" type="text" placeholder="name"  v-model="name">
            <input type="submit" class="btn span3" style="vertical-align: top;" @click="addComment">
            <br>
            <textarea class="span12" id="" cols="30" rows="10" placeholder="comment" v-model="comment"></textarea>
        </div>
        <blockquote class="comments text-left" v-for="(el,ind) in artical.comments" :key="ind">
            <small>{{el.name}}</small>
            <p v-html="el.comment"></p>
            <small class="text-right">{{el.time}}</small>
        </blockquote>
    </div>
</template>

<script>
export default {
    name: 'detial',
    data() { 
        return {
            comment: '',
            name: ''
        }
    },
    computed: {
        artical(){
            return this.$store.state.articals.filter(el=>el.id==this.$route.query.artical)[0];
        },
    },
    methods: {
        addComment(){
            let {name,comment} = this;
            comment = comment.replace(/\n/g, "<br>");
            // comment = comment.replace(/ /g, "&nbsp");
            if(!name.trim()||!comment.trim()){
                alert("请输入用户名和内容")
                return;
            }
            // console.log(this.$route.query.artical)
            this.$store.dispatch('addComment',{comment: {
                name,
                comment,
                time: `${new Date().getFullYear()}.${new Date().getMonth()+1}.${new Date().getDate()}`,
                },
                route: this.$route.query.artical});
            this.name = '';
            this.comment = '';
        }
        
    }
}
</script>

<style lang="" scoped>
.title{
    background-color: #999;
}
img{
    text-align: center;
}
p{
    word-wrap: break-word;

}
textarea{
    white-space:pre-wrap;
}
.artical-msg{
    font-size: 15px;
    border-bottom: 1px solid #fff;
}
.detial-text{
    background-color: #999;
}
.detial-text blockquote p{
    font-size: 20px;
}
.detial-text .text{
    padding: 0 15px 20px;
}
.comment{
    margin-top: 40px;
}
.text{
    text-align: center;
}
</style>