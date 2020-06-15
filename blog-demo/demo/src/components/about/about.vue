<template>
    <div class="about">
        <canvas ref="canvas"></canvas>
        <div class="card-wrap">
            <div class="author">
                <!-- <img src="./img/list2.jpg" width="100" height="100" alt=""> --><!-- bootstrap不支持width和height -->
                <img src="./img/list2.jpg">
            </div>
            <div class="introduction">
                <div class="introduction-wrap">
                    <p>姓名：<span>黄伟业</span></p>
                    <p>性别：<span>男</span></p>
                    <p>出生年月：<span>1999年8月</span></p>
                    <p>国籍：<span>中国</span></p>
                    <p>毕业院校：<span>广东第二师范学院(电子信息工程专业)</span></p>
                    <ul class="data">
                        <li>
                            <p class="text-left">努力</p>
                            <div class="progress">
                                <div class="bar" style="width: 60%;"></div>
                            </div>
                        </li>
                        <li>
                            <p class="text-left">热爱</p>
                            <div class="progress">
                                <div class="bar" style="width: 80%;"></div>
                            </div>
                        </li>
                        <li>
                            <p class="text-left">坚持</p>
                            <div class="progress">
                                <div class="bar" style="width: 80%;"></div>
                            </div>
                        </li>
                    </ul>
                    <h2>技术栈</h2>
                    <ul class="tech">
                        <li>
                            <img src="./img/vue.png" alt="">
                            <p>vue</p>
                        </li>
                        <li>
                            <img src="./img/koa.png" alt="">
                            <p>koa</p>
                        </li>
                        <li>
                            <img src="./img/mongodb.png" alt="">
                            <p>mongodb</p>
                        </li>
                        <!-- <li>
                            <p>bootstrap</p>
                            <img src="./img/bootstrap.png" alt="">
                        </li> -->
                    </ul>
                    <p class="text-left text">
                        一个在前端匍匐前进的小菜鸟，不会去追求各个方面都非常优秀的一个人，但会努力做到能被周围的人认可，喜欢自己制作的东西实用且能得到大家的赞赏，因此我走进了前端，人活一世，总得有一些坚持让自己的生活有所期待，当初选择了前端，那么即使前路有些迷茫，我也会坚持走下去。
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'about',
    data() { 
        return {
            data: [],
            num: 200,
            r: 2,
            cxt: '',
            speed: 1,
            mouseX: '',
            mouseY: '',
            width: '',
            height: ''
        }
    },
    mounted(){
        this.init();
        this.run();
    },
    created(){
        addEventListener("resize",()=>{
            // location.reload();//页面进行刷新
            this.init();
        })
        addEventListener("mousemove",(event)=>{
            let e = event ||window.event;
            // console.log(e.screenX,e.clientX,e.pageX);// e.screenX 屏幕,e.clientX ,e.pageX 页面
            this.data[this.num+1] = {x:e.clientX,y:e.clientY,rx:0,ry:0};
            for(let i=0;i<this.num;i++){
                if(Math.pow(this.data[i].x-this.data[this.num+1].x,2)+Math.pow(this.data[i].y-this.data[this.num+1].y,2)<=60*60){
                    
                    this.lineD(this.data[i].x,this.data[i].y,this.data[this.num+1].x,this.data[this.num+1].y);
                }
                
            }
        })
    },
    methods: {
        init(){
            // 1.初始化画布
            if(!this.$refs.canvas)return;
            this.width = this.$refs.canvas.width = window.innerWidth,
            this.height = this.$refs.canvas.height = window.innerHeight;
            this.data = [];
            this.cxt = this.$refs.canvas.getContext("2d"); // 绘画环境
            for(let i=0;i<this.num;i++){
                let x = Math.random()*this.width;
                let y = Math.random()*this.height;
                this.data.push({
                    x,y,
                    rx: Math.random()*2*this.speed-this.speed,
                    ry: Math.random()*2*this.speed-this.speed
                });
                // console.log(data[i])
                this.circle(x,y,this.r);
            }
        },
        circle(x,y,r){
            this.cxt.save(); //规范
            this.cxt.beginPath();    //规范
            this.cxt.fillStyle = "#09d"; // 画笔填充颜色
            this.cxt.arc(x,y,r,0,2*Math.PI,false);
            this.cxt.closePath();    // 规范
            this.cxt.fill();     // 产生圆
            this.cxt.restore(); // 规范
        },
        lineD(x1,y1,x2,y2){
            this.cxt.save(); //规范
            
            this.cxt.lineWidth = 1;
            this.cxt.strokeStyle = '#fff';

            this.cxt.beginPath();    //规范
            this.cxt.moveTo(x1,y1);
            this.cxt.closePath();    // 规范
            this.cxt.lineTo(x2,y2);
            this.cxt.stroke();
            this.cxt.restore(); // 规范
        },
        run(){
            setInterval(()=>{
                this.cxt.clearRect(0,0,this.width,this.height)
                for(let i=0;i<this.num;i++){
                    this.data[i].x+=this.data[i].rx;
                    this.data[i].y+=this.data[i].ry;
                    if(this.data[i].x<0||this.data[i].x>this.width){
                        this.data[i].rx= -this.data[i].rx;
                    }
                    if(this.data[i].y<0||this.data[i].y>this.height){
                        this.data[i].ry= -this.data[i].ry;
                    }
                    this.circle(this.data[i].x,this.data[i].y,this.r);

                    for(let j=i+1;j<this.num;j++){
                        if(Math.pow(this.data[i].x-this.data[j].x,2)+Math.pow(this.data[i].y-this.data[j].y,2)<=60*60){
                            
                            this.lineD(this.data[i].x,this.data[i].y,this.data[j].x,this.data[j].y);
                        }
                        
                    }
                    if(this.data[this.num+1]){
                        if(Math.pow(this.data[i].x-this.data[this.num+1].x,2)+Math.pow(this.data[i].y-this.data[this.num+1].y,2)<=60*60){
                        
                            this.lineD(this.data[i].x,this.data[i].y,this.data[this.num+1].x,this.data[this.num+1].y);
                        }
                    }
                    
                }
            },40)
            
        },
    }
}
        



        // init();
        // run();

</script>

<style lang="" scoped>
canvas{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(121, 121, 121, 0.37);
    z-index: -2;
}
.card-wrap{
    display: inline-block;
    margin: 150px auto;
    border-radius: 50%;
    transition: .5s;
}
.card-wrap:hover{
    display: flex;
    min-width: 300px;
    max-width: 700px;
    background-color: rgba(114, 66, 66, 0.562);
    margin: 20px auto;
    border-radius: 20px;
    border: none;
}

.author{
    position: relative;
    flex: 0 0 auto;
    width: 100px;
    margin: auto;
    z-index: 10;
}
.author img{
    display: block;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border: 3px double #fff;
    border-radius: 50%;
}
.introduction{
    display: inline-block;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 0;
    height: 0;
    background-color: rgba(102, 102, 102, 0.774);
    font-size: 16px;
    transition: .5s;
}
.introduction-wrap{
    position: absolute;
    left: 0;
    top: 20px;
    right: -17px;
    bottom: 0;
    padding-right: 17px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.card-wrap:hover .introduction{
    display: block;
    width: 420px;
    height: 750px;
    padding: 40px 0;
}
.introduction ul{
    margin-top: 40px;
}
.introduction .data li{
    display: flex;
    vertical-align: top;
}
.introduction .tech li{
    display: inline-block;
    vertical-align: top;
}
.progress{
    display: inline-block;
    width: 70%;
    height: 10px;
    margin: 6px 10px;
}
.text{
    padding: 30px;
}
</style>