<template>
    <div class="calendar">
        <div class="header">
            <input type="submit" value="<" @click="lastMonth()">
            <span class="year" ref="viewYear">{{newYear}}</span>
            <span>年</span>
            <span class="month" ref="viewMonth">{{newMonth}}</span>
            <span>月</span>
            <input type="submit" value=">" @click="nextMonth()">
            <input type="submit" value="now" @click="nowTime()">
        </div>
        <div class="week-wrap">
            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>
        </div>
        <div class="day-wrap" ref="dayWrap" v-show="date[0]">
            <div class="day" v-for="(el,ind) in date" :key="ind" :class="{other: !(el%1)}" :style="{border: DetailDay(ind)}">{{Math.floor(el)}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'calendar',
    data() {
        return {
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth()+1,
            currentDate: new Date().getDate(),
            
            a: this,
            currentW: new Date().getDay(),
            newYear: new Date().getFullYear(),
            newMonth: new Date().getMonth()+1,
            month: [// 默认2月有28天
                31,28,31,30,
                31,30,31,31,
                30,31,30,31
            ],
            date: [],
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        getDate: function(year,month){
            let week = this.weekOfFirstDay(year,month);
            this.month[1] = this.isLeapMonth(year);
            let preMonth = month == 1? 12: month-1;
            this.date.splice(0,42);
                for(let i=0;i<42;i++){
                    if(i<week){
                        this.date.push(this.month[preMonth-1]-week+i+1);
                    }else if(i<week+this.month[month-1]){
                        this.date.push(i-week+1+0.3);
                    }else{
                        this.date.push(i-(week+this.month[month-1])+1);
                    }
                }
        },
        init: function(){
            this.getDate(this.newYear,this.newMonth);
        },
        DetailDay: function(ind){
            let week = this.weekOfFirstDay(this.currentYear,this.currentMonth);
            
            if(this.newYear==this.currentYear&&this.newMonth==this.currentMonth){
                // this.$refs.dayWrap.children[week+this.currentDate-1].style.border = '1px solid #aa2';
                return ind==week+this.currentDate-1?'1px solid #fff':'none';
            }else{
                // this.$refs.dayWrap.children[week+this.currentDate-1].style.border = 'none';
                return 'none';
            }
        },
        isLeapYear: (year)=>{
            if(year%400) return true;
            if(year%100) return false;
            if(year%4) return true;
            return false;
        },
        isLeapMonth: function(year){
            return this.isLeapYear(year)? 29: 28;
        },
        weekOfFirstDay: (year,month)=>{
            return new Date(`${year}/${month}/1`).getDay()
        },
        lastMonth: function(){
            this.newMonth--;
            if(this.newMonth==0){
                this.newYear--;
                this.newMonth=12;
                
            }
            this.init();
        },
        nextMonth: function(){
            this.newMonth++;
            if(this.newMonth==13){
                this.newYear++;
                this.newMonth=1;
            }
            this.init();
        },
        nowTime: function(){
            this.newYear = this.currentYear;
            this.newMonth = this.currentMonth;
            this.init();
        }
    }
}
</script>

<style lang="" scoped>
.calendar{
    display: inline-block;
    /* width: 220px; */
    /* min-width: 145px; */
    border: 1px solid #aa2;
    text-align: center;
    font-size: 0;
}
.calendar .header{
    font-size: 15px;
}
.week{
    display: inline-block;
    width: 14%;
    height: 25px;
    background-color: #aa2; 
    font-size: 18px;
    
}
.day.other{
    font-weight: 300;
    font-size: 8px;
    color: #999;
}
.day{
    display: inline-block;
    box-sizing: border-box;
    width: 14%;
    height: 20px;
    vertical-align: middle;
    line-height: 20px;
    font-weight: 700;
    font-size: 15px;
}
</style>