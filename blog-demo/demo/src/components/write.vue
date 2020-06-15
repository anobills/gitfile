<template>
    <div class="write">
        <div class="wrap">
            <h2>后台界面</h2>
            <input type="submit" class="btn" id="submit" value="添加到学习记录" @click="appear=0">
            <input type="submit" class="btn" id="submit" value="添加到artical" @click="appear=1">
            <br>
            <br>
            <div v-show="appear==0">
                <input type="text" placeholder="年" v-model="record.year">
                <input type="text" placeholder="月" v-model="record.month">
                <input type="text" placeholder="日" v-model="record.day">
                <br>
                <textarea name="artical" id="" cols="30" rows="10" v-model="record.text"></textarea>
                <br>
                <input type="submit" class="btn" value="提交" @click="submit('/api/addRecord','record')">
            </div>
            <div v-show="appear==1">
                <input type="text" placeholder="title" v-model="artical.title">
                <h4>图片</h4>
                <!-- <input type="file" @change="getImgUrl('img',$event)"> -->
                <input type="text" placeholder="urlll" v-model="artical.img">
                <img :src="artical.img" alt="" width="150" ref="mainImg">
                <br>
                <label class="checkbox inline">
                    <input type="radio" id="inlineCheckbox3" value="html" name="option" v-model="artical.type"> html
                </label>
                <label class="checkbox inline">
                    <input type="radio" id="inlineCheckbox3" value="css" name="option" v-model="artical.type"> css
                </label>
                <label class="checkbox inline">
                    <input type="radio" id="inlineCheckbox3" value="js" name="option" v-model="artical.type"> js
                </label>
                <label class="checkbox inline">
                    <input type="radio" id="inlineCheckbox3" value="git" name="option" v-model="artical.type"> git
                </label>
                <label class="checkbox inline">
                    <input type="radio" id="inlineCheckbox3" value="other" name="option" v-model="artical.type"> other
                </label>
                <p>id
                    <input type="text" placeholder="1234" v-model="artical.id">
                </p>
                <p>time
                    <input type="text" placeholder="2012.6.7" v-model="artical.time">
                </p>
                <h4>author</h4>
                <input type="text" value="moope" v-model="artical.author">
                <div>
                    <h4>小标题</h4>
                    <input type="text" value="摘要" v-model="artical.content[num].h2">
                    <textarea name="" id="" cols="30" rows="10" placeholder="text1" v-model="artical.content[num].text1"></textarea>
                    <h4>图片</h4>
                    <!-- <input type="file" @change="getImgUrl(num,$event)"> -->
                    <input type="text" placeholder="urlll" v-model="artical.content[num].img">
                    <img :src="artical.content[num].img" alt="" width="150" :ref="num">
                    <textarea name="" id="" cols="30" rows="10" placeholder="代码" v-model="artical.content[num].pre"></textarea>
                    <textarea name="" id="" cols="30" rows="10" placeholder="text2" v-model="artical.content[num].text2"></textarea>
                </div>
                <button v-for="(el,ind) in artical.content" :key="ind" @click="num=ind">{{ind}}</button>
                <input type="submit" class="btn" value="添加新块" @click="addBlock">
                <input type="submit" class="btn" value="提交" @click="submit('/api/addArtical','artical')">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'write',
    data(){
        return {
            record: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                day: new Date().getDate(),
                text: ""
            },
            
            artical: {
                title: "",
                img: "",
                time: "",
                type: "",
                author: "moope",
                viewNum: 0,
                id: '',
                comments: [],
                content: [
                    {
                        h2: "摘要",
                        text1:'',
                        img: "",
                        pre: "",
                        text2: ""
                    }
                ]
            },
            text: '',
            appear: 0,
            num: 0,
        }
    },
    methods: {
        addBlock(){

            this.artical.content[this.num].text1 = this.artical.this.artical.content[this.num].text2 = content[this.num].text1.replace(/\n/g, "<br>");
            this.artical.content[this.num].text2.replace(/\n/g, "<br>");
            console.log(this.artical.content);
            this.artical.content.push({
                        h2: "",
                        text1: "",
                        img: "",
                        pre: "",
                        text2: ""
                    })  
            this.num++;
        },
        getImgUrl(target,event){
            var fileReader=new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = ()=>{
             // if(this.result.match())
             console.log(event.target)
                let imgUrl = fileReader.result;
                // console.log(imgUrl)
                target=="img"?
                this.artical[target] = imgUrl:
                this.artical.content[target].img = imgUrl;
            }
        },
        submit(url,data){

            this.artical.content[this.num].text1 = this.artical.content[this.num].text1.replace(/\n/g, "<br>");
            this.artical.content[this.num].text2 = this.artical.content[this.num].text2.replace(/\n/g, "<br>");
            if(this.record.text){
                this.record.text = this.record.text.replace(/\n/g, "<br>");
            }
            let empty = Object.values(this[data]).some((el,ind)=>{
                if(Object.keys(this[data])[ind]=='comments')return false;
                if(!(el+"").trim()){
                    alert(Object.keys(this[data])[ind]+"为空")
                    return true;
                }
            })
            if(empty)return;
            if(confirm("确认提交？")){
                // let d = JSON.stringify(this[data])
                // console.log(d);
                // let c = JSON.parse(d)
                // console.log(c)

                this.$http.get(`${url}?data=${encodeURIComponent(JSON.stringify(this[data]))}`).then(res=>{
                    alert("成功添加");
                })
            }
        }
        // getData(){
        //     // let text = document.querySelector('textarea');
        //     // console.log(text.value);
        //     data.text = this.text;
        //     data.year = new Date().getFullYear();
        //     data.month = new Date().getMonth();
        //     data.day = new Date().getUTCDate();
        //     console.log(data);

        //     // ajax('/write',(res)=>{
        //     //     alert(res)
        //     // })
        // }
    }
}
</script>

<style lang="" scoped>
.wrap{
    box-sizing: border-box;
    width: 80%;
    padding: 20px;
    background-color: rgb(129, 107, 79);
    margin: 40px auto;
    /* cursor: url(./img/default.cur),default; */
}
h2,h4{
    color: #fff;
}
input[type='text']{
    width: 90%;
    white-space: pre-wrap;
}
textarea{
    width: 90%;
    white-space: pre-wrap;
}
</style>