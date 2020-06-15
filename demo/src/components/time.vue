<template>
    <div class="clock">
        <p><span class="hour">{{hour}}</span>:<span class="minute">{{minute}}</span>:<span class="secend">{{secend}}</span></p>
        <canvas ref="canvas"></canvas>
        
    </div>
</template>

<script>
export default {
    name: '',
    data() { 
        return {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            secend: new Date().getSeconds(),
            ctx: '',
            i: 0,
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        mm(){
            console.log(this.secend)
        },
        init(){
            let width = this.$refs.canvas.width = 300,
            height = this.$refs.canvas.height = 300;
            // console.log(this.$refs.canvas)
            this.ctx = this.$refs.canvas.getContext("2d");
            // console.log(new Date().getHours())
            setInterval(()=>{
                this.hour = new Date().getHours();
                this.minute = new Date().getMinutes();
                this.secend = new Date().getSeconds();
                this.ctx.clearRect(0,0,width,height)
                this.move(new Date().getSeconds(),this.secPointer.bind(this),120,0);
                this.move(new Date().getMinutes(),this.minPointer.bind(this),90,0);
                this.move(new Date().getHours(),this.hourPointer.bind(this),60,1);
            }, 1000);
        },
        hourPointer(x,y){
            this.circle(x,y,10);
            this.stroke(60,0,0.5*Math.PI);
            this.line(x,y);
        },
        minPointer(x,y){
            this.circle(x,y,10);
            this.stroke(90,Math.PI,0.75*Math.PI);
            this.line(x,y);
        },
        secPointer(x,y){
            this.circle(x,y,10);
            this.stroke(120,1.5*Math.PI,1.75*Math.PI);
            this.line(x,y);
        },
        move(time,action,r,isHour){  // new Date().getSeconds(), this.secPointer(x,y);
            let x= 0,y=0,deg=0;
            if(isHour){
                // console.log("?")
                if(time%12<=3){
                    deg = (time%12)/3*0.5*Math.PI;
                }
                if(time%12>3&&time%12<=6){
                    deg = (6-time%12)/3*0.5*Math.PI;
                    // console.log(deg)
                }
                if(time%12>6&&time%12<=9){
                    deg = (6-time%12)/3*0.5*Math.PI;
                }
                if(time%12>9){
                    deg = (time%12-12)/3*0.5*Math.PI;
                }
            }else{
                if(time<=15){
                    deg = time/15*0.5*Math.PI;
                }
                if(time>15&&time<=30){
                    deg = (30-time)/15*0.5*Math.PI;
                }
                if(time>30&&time<=45){
                    deg = (30-time)/15*0.5*Math.PI;
                }
                if(time>45){
                    deg = (time-60)/15*0.5*Math.PI;
                }
            }
            
            x = Math.cos(0.5*Math.PI-deg)*r;
            if(isHour){
                if(time%12<3||time%12>9){
                    y = -Math.sqrt(r*r-x*x)+150;
                }else{
                    y = Math.sqrt(r*r-x*x)+150;
                }
            }else{
                if(time<15||time>45){
                    y = -Math.sqrt(r*r-x*x)+150;
                }else{
                    y = Math.sqrt(r*r-x*x)+150;
                }
            }
            
            x += 150;
            action(x,y);
        },
        circle(x,y,r){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#fff';
            this.ctx.arc(x,y,r,0,2*Math.PI,false);
            this.ctx.closePath();    // 规范
            // cxt.fill();     // 产生圆
            this.ctx.stroke();   // 产生弧
            this.ctx.restore(); // 规范
        },
        line(x,y){
            this.ctx.save(); //规范
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#fff";
            this.ctx.beginPath();    //规范
            this.ctx.moveTo(150,150);
            this.ctx.closePath();    // 规范
            this.ctx.lineTo(x,y);
            this.ctx.stroke();
            this.ctx.restore(); // 规范
        },
        stroke(r,start,end){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#fff';
            this.ctx.arc(150,150,r,start,end,true);
            // cxt.fill();     // 产生圆
            this.ctx.stroke();   // 产生弧
            this.ctx.restore(); // 规范
        },
    }
}
</script>

<style lang="" scoped>
.clock{
    max-width: 150px;
    height: 160px;
    margin: 0 auto;
}
p{
    position: absolute;
    z-index: 10;
}
canvas{
    background-color: black;
    transform: scale(0.5);
    transform-origin: 0 0;
}
</style>