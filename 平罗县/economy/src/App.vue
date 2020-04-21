<template>
  <div id="economy">
    <video src="@/assets/bg.mp4" type="video/mp4"
              autoplay muted  loop="loop">
           <p>你的浏览器不支持video标签.</p>
    </video>
    <div class="zwytitle">平罗县宏观经济</div>
    <div class="content">
      <div class="left">
        <div class="item">
          <div class="title">GDP生产总值</div>
          <div id="sczz"></div>
        </div>
        <div class="item">
          <div class="title">财政情况</div>
          <div id="czqk"></div>
        </div>
        <div class="item">
          <div class="title">全社会固定资产投资增长速度</div>
          <div id="xfsp"></div>
        </div>
      </div>
      <div class="mid">
        <div class="mid-top">
          <!-- <count></count> -->
          <div v-for="(item,index) in midlist" :key="index" class="mid-top-item">
            <!-- <span class="mid-item-num">{{item.num}}</span> -->
            <count 
              :countto="item.num"
              :newcolor ="'rgba(253, 57, 57, 1)'">
            </count>
            <span class="mid-item-name">{{item.name}}</span>
          </div>
        </div>
        <!-- <div class="midtc">
          <div v-for="(item,index) in tclist" :key="index" class="midtc-item" v-show="index==tcindex" @mouseenter="enter" @mouseleave="leave">
            <div class="mid-name">{{item.name}}</div>
            <div class="mid-num">
              <span>税收收入：</span>
              <span>{{item.num1}}万元</span>
            </div>
            <div class="mid-num">
              <span>GDP生产总值：</span>
              <span>{{item.num2}}亿元</span>
            </div>
          </div>
        </div> -->
        <div class="map"></div>
      </div>
      <div class="right">
        <div class="item">
          <div class="title">产业情况</div>
          <div id="cyqk"></div>
          <div class="cyimg"></div>
        </div>
        <div class="item">
          <div class="title">城乡居民可支配收入情况</div>
          <div id="qyqk"></div>
        </div>
        <div class="item">
          <div class="title">各税种收入情况统计</div>
          <div id="srqk"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import HighCharts from 'highcharts'
import count from './assets/count'
export default {
  name: 'HelloWorld',
  data () {
    return {
      midlist:[
        {num:16.84,name:'税收收入（亿元）'},
        {num:9.2,name:'非税收收入（亿元）'},
        {num:167.69,name:'GDP产值（亿元）'}],
      tclist:[
        {name:'原州区',num1:10854,num2:13.644},
        {name:'西吉县',num1:10316,num2:64.92},
        {name:'隆德县',num1:6377,num2:28.8},
        {name:'彭阳县',num1:19684,num2:55.32},
        {name:'泾源县',num1:10360,num2:18.44},
        ],
      tcindex:0,
      times:0,
      timertc:null,
      sczzechart:null,
      czqkechart:null,
      xfspechart:null,
      cyqkechart:null,
      qyqkechart:null,
      srqkechart:null
    }
  },
  mounted(){
    this.sczzinit()
    this.czqkinit()
    this.xfspinit()
    this.cyqkinit()
    this.qyqkinit()
    this.srqkinit()
    this.autotc()
  },
  methods: {
    sczzinit() {
      this.sczzechart = this.$echarts.init(document.getElementById("sczz"))
      let dataarr = [
                      {value: 279389.2, name: '农业'},
                      {value: 1397.6, name: '林业'},
                      {value: 63033, name: '畜牧业'},
                      {value: 40883, name: '渔业'},
                      {value: 11693, name: '服务业'},
                  ]
      let option = {
          color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} 万元({d}%)'
          },
          legend:{
            orient: 'vertical',
            top:'20%',
            right: '10%',
            icon:'circle',
            formatter:function(value){
                var data = dataarr
                var num = 0
                var total = 0
                var per = 0
                for(var i=0;i<dataarr.length;i++){
                    if(value == dataarr[i].name){
                        num = dataarr[i].value
                    }
                    total += dataarr[i].value
                }
                per = ((num/total).toFixed(2))*100
                return '{a|'+value +'}'+':  '+'  '+'{b|'+num+'万元}'
            },
            textStyle:{
                rich:{
                    a:{
                        fontSize:10,
                        color:'rgba(255, 255, 255, 0.65)',
                        // padding:[0,15,0,0]
                    },
                    b:{
                        fontSize:16,
                        color:'rgba(198, 92, 67, 1)',
                        // padding:[0,15,0,0],
                        lineHeight:25
                    }
                }
            },
            data: dataarr

          },
          series: [
              {
                  name: 'GDP生产总值',
                  type: 'pie',
                  center: ['30%', '50%'],
                  radius: ['35%', '55%'],
                  data: dataarr,
                  label: {
                      show:false
                  },
                  labelLine: {
                      show:false
                  },
              }
          ]
      }
      this.sczzechart.setOption(option);
      window.tools.loopShowTooltip(this.sczzechart, option, {loopSeries: true,interval:6000});
    },
    czqkinit() {
      this.czqkechart = this.$echarts.init(document.getElementById("czqk"))
      let option = {
          color:['#5DACCC','#F6BD16','#E8684A'],
          tooltip: {
              trigger: 'axis',
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          legend:{
            top:'5%',
            right: '5%',
            textStyle:{
                color:'#fff'
            },
            data: ['财政收入（亿元）','财政支出（亿元）']
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              axisTick:{
                show: false
              },
              axisLine: {
                lineStyle: {
                  color:'#E6E6E6',
                  opacity:.5,
                  width:1.16
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type:'dotted',
                  color:'#E6E6E6',
                  opacity:.21
                }
              },
              data: ['2014年','2015年','2016年','2017年','2018年']
          },
          yAxis: {
              type: 'value',
              axisTick:{
                show: false
              },
              axisLine: {
                lineStyle: {
                  color:'#E6E6E6',
                  opacity:.5,
                  width:1.16
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type:'dotted',
                  color:'#E6E6E6',
                  opacity:.21
                }
              },
          },
          series: [
             {
                name: '财政收入（亿元）',
                type: 'line',
                symbol:'emptyCircle',
                symbolSize:10,
                data: [23.49,21.5,22.5,26.53,22.54]

            },
            {
                name: '财政支出（亿元）',
                type: 'line',
                symbol:'emptyCircle',
                symbolSize:10,
                data: [181.38,199.31,219.54,240.52,258.43]

            },
          ]
      }
      this.czqkechart.setOption(option);
      window.tools.loopShowTooltip(this.czqkechart, option, {loopSeries: true,interval:6000});
    },
    xfspinit() {
      this.xfspechart = echarts.init(document.getElementById("xfsp"))
      let option = {
          tooltip: {
            trigger: "axis",
            formatter:'{b}：{c}%'
          },
          grid: {
            top: 20,
            left: 10,
            right: 15,
            bottom: 10,
            containLabel:true
          },
          xAxis: [
            {
              type: "category",
              data: ['2014年','2015年','2016年','2017年','2018年'],
              axisTick: {
                show:false
              },
              axisLine: {
                show:false
              },
              axisLabel: {
                color:'#fff'
              },
              boundaryGap:false
            }
          ],
          yAxis: [
            {
              type: "value",
              splitLine: {
                lineStyle: {
                  color:'rgba(255, 255, 255, 1)',
                      opacity:0.1
                }
              },
              axisLabel: {
                color: "rgba(255,255,255,0.5)"
              },
              axisLine: {
                show: false
              },
              splitArea: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "全社会固定资产投资增长速度",
              type: "line",
              symbol: 'circle',
              data:[31.9,30.1,14.1,11.5,-15.5],
              lineStyle: {
                normal: {
                  width: 3,
                  color: "#F5A623",
                  shadowColor: "rgba(72,216,191, 0.3)"
                }
              },
              smooth:.1,
              itemStyle: {
                color: '#F5A623',
              },
              areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: 'rgba(199, 136, 40, 0.06)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(255, 175, 37, 1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                opacity:.19
              }
            },
          ]
        };
      this.xfspechart.setOption(option)
      window.tools.loopShowTooltip(this.xfspechart, option, {loopSeries: true,interval:6000});
    },
    cyqkinit() {
      this.cyqkechart = this.$echarts.init(document.getElementById("cyqk"))
      let dataarr = [
                      {value: 206263, name: '第一产业'},
                      {value: 878584, name: '第二产业'},
                      {value: 493366, name: '第三产业'}
                  ]
      let option = {
          color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}：{c}万元({d}%)'
          },
          legend:{
            orient: 'vertical',
            top:'25%',
            right: '10%',
            icon:'circle',
            formatter:function(value){
                var data = dataarr
                var num = 0
                var total = 0
                var per = 0
                for(var i=0;i<dataarr.length;i++){
                    if(value == dataarr[i].name){
                        num = dataarr[i].value
                    }
                    total += dataarr[i].value
                }
                per = ((num/total)*100).toFixed(2)
                return '{a|'+value +'}'+'  '+'{b|'+ per+'%}'
            },
            textStyle:{
                rich:{
                    a:{
                        fontSize:10,
                        color:'rgba(255, 255, 255, 0.65)',
                        // padding:[0,15,0,0]
                    },
                    b:{
                        fontSize:16,
                        color:'#79FCFF',
                        // padding:[0,15,0,0],
                        lineHeight:25
                    }
                }
            },
            data: dataarr

          },
          series: [
              {
                  name: '产业情况',
                  type: 'pie',
                  center: ['30%', '50%'],
                  radius: ['45%', '55%'],
                  data: dataarr,
                  label: {
                      show:false
                  },
                  labelLine: {
                      show:false
                  },
              }
          ]
      }
      this.cyqkechart.setOption(option);
      window.tools.loopShowTooltip(this.cyqkechart, option, {loopSeries: true,interval:6000});
    },
    qyqkinit() {
      this.qyqkechart = this.$echarts.init(document.getElementById("qyqk"))
      let option = {
        color:['#5DACCC','#E8684A'],
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend:{
          top:'5%',
          right: '5%',
          textStyle: {
            color:'rgba(255, 255, 255, 1)',
            opacity:.53
          },
          data: ['城镇居民可支配收入（元）','农民人均可支配收入（元）']
        },
        xAxis: {
            type: 'category',
            axisTick:{
              show: false
            },
            axisLine: {
              lineStyle: {
                color:'#E6E6E6',
                opacity:.5,
                width:1.16
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type:'dotted',
                color:'#E6E6E6',
                opacity:.21
              }
            },
            data: ['2014年','2015年','2016年','2017年','2018年']
        },
        yAxis: {
            type: 'value',
            axisTick:{
              show: false
            },
            axisLine: {
              show:false
            },
            axisLabel: {
              color:'#E6E6E6'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type:'dotted',
                color:'#E6E6E6',
                opacity:.21
              }
            },
        },
        series: [
          {
              name: '城镇居民可支配收入（元）',
              type: 'bar',
              barWidth:15,
              data: [19677,21144,22717,24628,26709]
          },
          {
              name: '农民人均可支配收入（元）',
              type: 'bar',
              barWidth:15,
              data: [6395,7002,7714,8579,9557]
          },
        ]
      }
      this.qyqkechart.setOption(option);
      window.tools.loopShowTooltip(this.qyqkechart, option, {loopSeries: true,interval:6000});
    },
    srqkinit() {
      this.srqkechart = this.$echarts.init(document.getElementById("srqk"))
      let option = {
        color:['rgba(255, 255, 255, 1)','rgba(253, 57, 57, 1)'],
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br>{a1}:{c1}<br>{a}:{c}%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend:{
          top:'5%',
          right: '5%',
          textStyle: {
            color:'rgba(255, 255, 255, 1)',
            opacity:.53
          },
          data: ['贡献度','税收收入（万元）']
        },
        xAxis: {
            type: 'category',
            axisTick:{
              show: false
            },
            axisLabel: {
              interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
               rotate:38,
               fontSize:10
            },
            axisLine: {
              lineStyle: {
                color:'#E6E6E6',
                opacity:.5,
                width:1.16
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type:'dotted',
                color:'#E6E6E6',
                opacity:.21
              }
            },
            data: ['增值税','营业税','企业所得税','个人所得税','城市维护建设税','房产税','印花税','城镇土地使用税','土地增值税','车船税','耕地占用税','契税','烟叶税','环境保护税']
        },
        yAxis: [
          {
              type: 'value',
              axisTick:{
                show: false
              },
              axisLine: {
                show:false
              },
              axisLabel: {
                color:'#E6E6E6',
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type:'dotted',
                  color:'#E6E6E6',
                  opacity:.21
                }
              },
          },
          {
              type: 'value',
              axisTick:{
                show: false
              },
              axisLine: {
                show:false
              },
              axisLabel: {
                color:'#E6E6E6',
                formatter:'{value}%'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type:'dotted',
                  color:'#E6E6E6',
                  opacity:.21
                }
              },
          }
        ],
        series: [
           {
              name: '贡献度',
              type: 'line',
              symbol:'emptyCircle',
              yAxisIndex:1,
              symbolSize:10,
              data: [39.25,0.51,7.40,3.53,8.68,2.36,2.26,2.94,5.96,4.23,6.87,15.40,0.33,0.28]
          },
          {
              name: '税收收入（万元）',
              type: 'bar',
              yAxisIndex:0,
              barWidth:15,
              data: [40324,527,7603,3627,8912,2425,2327,3018,6125,4343,7054,15817,344,284]

          },
        ]
      }
      this.srqkechart.setOption(option);
      window.tools.loopShowTooltip(this.srqkechart, option, {loopSeries: true,interval:6000});
    },
    autotc() {
      let _this = this
      this.timertc = setInterval(() => {
        _this.times++
        _this.tcindex = _this.times%5
      },3000)
    },
    enter() {
      clearInterval(this.timertc)
      this.timertc = null
    },
    leave() {
      this.autotc()
    }
  },
  components: {
    count
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #economy {
    position: absolute;
    width: 1920px;
    height: 1080px;
    left: 0;
    top: 0;
    background-image: url('assets/image/background.png');
    background-size: 100% 100%;
  }
  .zwytitle {
    width: 100%;
    height: 87px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 87px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    font-size: 40px;
  }
  .content {
    position: absolute;
    left: 0;
    top: 87px;
    display: flex;
    justify-content: space-between;
  }
  .left,.right {
    width: 468px;
    height: 980px;
    /*background-image: url('assets/image/bg.png');*/
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .item {
    width:422px;
    height:302px;
    background:rgba(255,255,255,0.07);
    box-shadow:0px 6px 18px 0px rgba(0,0,0,0.33);
    border-radius:1px;
    position: relative;
  }
  .title {
    width: 300px;
    height: 33px;
    padding-left: 40px;
    font-weight:500;
    line-height: 33px;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    letter-spacing:2px;
    position: relative;
  }
  .title:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 15px;
    width: 13px;
    height: 13px;
    border: 1px solid rgba(253, 57, 57, 1);
    border-radius: 50%;
  }
  .cyimg {
    width: 102px;
    height: 102px;
    position: absolute;
    background-image: url('assets/image/city.png');
    background-size: 100% 100%;
    top: 55%;
    left: 30%;
    transform: translate(-50%,-50%);
  }
  #sczz,#czqk,#xfsp,#cyqk,#qyqk,#srqk {
    width: 100%;
    height: 269px;
  }
  .mid {
    width: 980px;
    height: 920px;
    overflow: hidden;
    position: relative;
    padding-top: 60px;
  }
  .mid-top {
    width: 100%;
    height: 74px;
    position: absolute;
    display: flex;
    justify-content: space-around;
  }
  .mid-top-item {
    width: 232px;
    height: 100%;
    background:rgba(17,17,17,0.52);
    box-shadow:0px 8px 6px 0px rgba(4,9,12,1);
    border-radius:4px;
    border:1px solid;
    border-image:linear-gradient(90deg, rgba(253,57,57,1), rgba(50,150,245,0.41), rgba(60,149,248,0), rgba(253,57,57,1)) 1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
  }
  .mid-item-num {
    color: rgba(253, 57, 57, 1);
    font-size: 34px;
  }
  .mid-item-name {
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
  }
  .midtc {
    width: 100%;
    height: 800px;
    position: absolute;
    top: 140px;
  }
  .midtc-item {
    width: 419px;
    height: 228px;
    background-image: url('assets/image/tc.png');
    background-size: 100% 100%;
    position: absolute;
  }
  .midtc-item:nth-of-type(1){
    top:10px;
    left: 60px;
  }
  .midtc-item:nth-of-type(2){
    top:110px;
    left: 5px;
  }
  .midtc-item:nth-of-type(3){
    top:310px;
    left: 20px;
  }
  .midtc-item:nth-of-type(4){
    top:360px;
    left: 600px;
  }
  .midtc-item:nth-of-type(5){
    top:470px;
    left: 140px;
  }
  .mid-name {
    width: 300px;
    padding-left: 80px;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #fff;
    position: relative;
  }
  .mid-name:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 50px;
    width: 13px;
    height: 13px;
    border: 1px solid rgba(253, 57, 57, 1);
    border-radius: 50%;
  }
  .mid-num {
    width: 230px;
    height: 40px;
    line-height: 40px;
    padding:0 80px;
    color: rgba(192, 192, 192, 1);
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
  .map {
    width: 100%;
    height: 670px;
    margin-top: 110px;
    background-image: url('assets/image/map.png');
    background-size: 100% 100%;
  }
</style>
