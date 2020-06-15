<template>
    <div class="lj-wrap">
        <canvas ref="canvas"></canvas>
        <div class="app-wrap">
            <input type="text" v-model="a" placeholder="A=350(行程)" class="a"><br>
            <input type="text" v-model="b" placeholder="B=30(轴心半径)" class="b"><br>
            <input type="text" v-model="c" placeholder="C=90(大圆半径)" class="c"><br>
            <!-- <input type="text" placeholder="请输入该电脑的横向分辨率" class="DPIx"><br>
            <input type="text" placeholder="请输入该电脑的纵向分辨率" class="DPIy"><br> -->
            <br><input type="submit" value="原样生成" @click="updateOrign">
            <!-- <br><input type="submit" value="生成" @click="update"> -->
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-detial',
    data() { 
        return {
            x: 420,
            a: 350,
            b: 30,
            c: 90, 
            pointL: [],
            pointR: [],
            ctx: '',
        }
    },
    computed: {
        y(){return 594-this.c-70},
        realA(){return this.a.toString().trim()},
        realB(){return this.b.toString().trim()},
        realC(){return this.c.toString().trim()},
        tany(){return Math.sqrt((this.a/2)*(this.a/2)-this.c*this.c)*this.c/(this.a/2)},
        tanx(){return Math.sqrt(this.c*this.c-this.tany*this.tany)},
        // 圆c的角度
        degE(){return Math.acos(this.c/(this.a/2))},
        degS(){return Math.PI-Math.acos(this.c/(this.a/2))},
    },
    mounted(){
        this.init();
    },
    methods: {
        updateOrign(){
            let a = this.realA;
            let b = this.realB;
            let c = this.realC;
            if(!(a&&b&&c)){
                alert("不能留空");
                return;
            }
            let reg = /\D/g ;
            // console.log(reg.test(a))
            if(reg.test(a)||reg.test(b)||reg.test(c)){
                alert("含有除数字外的其他字符");
                return;
            }
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.init();
            
        },
        update(){
            let a = this.realA;
            let b = this.realB;
            let c = this.realC;
            if(!(a&&b&&c)){
                alert("不能留空");
                return;
            }
            let reg = /\D/g ;
            if(reg.test(a)||reg.test(b)||reg.test(c)){
                alert("含有除数字外的其他字符");
                return;
            }
            this.a = a/c*90;
            this.b = b/c*90;
            this.c = 90;
            this.init();
        },
        init(){
            let width = this.$refs.canvas.width = 841;
            let height = this.$refs.canvas.height = 594;
            this.data = [];
            this.ctx = this.$refs.canvas.getContext("2d");
            this.pointL = [];
            this.pointR = [];
            this.ctx.clearRect(0,0,width,height);
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(0,0,width,height);
            this.circle(this.b);

            // 大小圆弧
            this.stroke(this.c,this.degS,this.degE)
            this.stroke(this.a-this.c,-this.degE,-this.degS)


            // 下方直线
            this.line(this.x+this.a/2,this.y,this.tanx+this.x,this.tany+this.y)
            this.line(this.x-this.a/2,this.y,this.x-this.tanx,this.tany+this.y)
            
            // 散点收集
            this.intoArr();

            // 散点连接
            this.continueLine(this.pointL);
            this.continueLine(this.pointR);
            
            // 连接几个线段
            this.line(this.x-this.a/2,this.y,this.pointL[0].x,this.pointL[0].y);
            this.line(this.x+this.a/2,this.y,this.pointR[0].x,this.pointR[0].y);
            this.line(this.x-this.pointx,this.y-this.pointy,this.pointL[this.pointL.length-1].x,this.pointL[this.pointL.length-1].y);
            this.line(this.x+this.pointx,this.y-this.pointy,this.pointR[this.pointR.length-1].x,this.pointR[this.pointR.length-1].y);

            // 注释
            this.line(this.x,this.y,this.x+240,this.y);
            this.line(this.x,this.y+this.b,this.x+200,this.y+this.b);
            this.line(this.x,this.y+this.c,this.x+275,this.y+this.c);
            this.line(this.x,this.y+this.c-this.a,this.x+275,this.y+this.c-this.a);

            this.text(`A=${this.realA}`,this.x+270,this.y-80);
            this.text(`B=${this.realB}`,this.x+200,this.y+15);
            this.text(`C=${this.realC}`,this.x+240,this.y+40);
        },
        // 散的点收集
        intoArr(){
            for(let i=1;this.a/2-i>this.tanx;i++){
                this.pointL.push({
                    x: this.x-this.otherPointX(this.a/2-i,this.forY(this.a/2-i)),
                    y: this.y-this.otherPointY(this.a/2-i,this.forY(this.a/2-i))
                })
            }
            for(let i=1;this.a/2-i>this.tanx;i++){
                this.pointR.push({
                    x: this.x+this.otherPointX(this.a/2-i,this.forY(this.a/2-i)),
                    y: this.y-this.otherPointY(this.a/2-i,this.forY(this.a/2-i))
                })
            }
        },
        // 求直线部分的Y的相对坐标绝对值
        forY(x){
            let deg = Math.acos(this.c/(this.a/2));
            return Math.tan(0.5*Math.PI-deg)*(this.a/2-x);
        },
        // 大圆的边界断点
        pointx(){
            return this.otherPointX(this.tanx,this.tany);
        },
        pointy(){
            return this.otherPointY(this.tanx,this.tany);
        },
        otherPointX(x,y){
            return x/Math.sqrt(x*x+y*y)*(this.a-Math.sqrt(x*x+y*y))
        },
        otherPointY(x,y){
            return y/Math.sqrt(x*x+y*y)*(this.a-Math.sqrt(x*x+y*y))
        },
        circle(r){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#000';
            this.ctx.arc(this.x,this.y,r,0,2*Math.PI,false);
            this.ctx.closePath();    // 规范
            this.ctx.stroke();   // 产生弧
            this.ctx.restore(); // 规范
        },
        continueLine(arr){
            this.ctx.save(); //规范
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#000";
            this.ctx.beginPath();    //规范
            for(let i=0;i<arr.length-1;i++){
                this.ctx.moveTo(arr[i].x,arr[i].y);
                this.ctx.closePath();    // 规范
                this.ctx.lineTo(arr[i+1].x,arr[i+1].y);
            }
            this.ctx.stroke();
            this.ctx.restore(); // 规范
        },
        line(x,y,x2,y2){
            this.ctx.save(); //规范
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#000";
            this.ctx.beginPath();    //规范
            this.ctx.moveTo(x2,y2);
            this.ctx.closePath();    // 规范
            this.ctx.lineTo(x,y);
            this.ctx.stroke();
            this.ctx.restore(); // 规范
        },
        stroke(r,start,end){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#000';
            this.ctx.arc(this.x,this.y,r,start,end,true);
            this.ctx.stroke();   // 产生弧
            this.ctx.restore(); // 规范
        },
        text(text,x,y){
            this.ctx.font="bold 14px Arial";
            this.ctx.textAlign="center";
            this.ctx.textBaseline="middle";
            this.ctx.fillStyle = "#000";
            this.ctx.fillText(text,x,y);
        }
    }
}
let app = {

            
            
            // 圆c的切线点的相对坐标
            
            
            
            
        }
</script>

<style lang="" scoped>
.lj-wrap{
    position: relative;
    width: 80%;
    min-width: 300px;
    margin: 20px auto;
}
.app-wrap{
    position: absolute;
    top: 0;
    left: 0;
}
canvas{
    background-color: rgb(255, 255, 255);
}
</style>