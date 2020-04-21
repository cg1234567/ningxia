<template>
  <div id="education">
    <div class="content">
      <div class="left">
        <div class="echartitem" style="height: 320px">
          <div class="title">实时路况</div>
          <div class="echarts">
            <div class="sslktitle">
              <span>状态</span>
              <span>区域名称</span>
              <span>拥堵指数</span>
            </div>
            <div class="sslkcontent">
              <div v-for="(item,index) in sslklist" :key="index" class="sslk-item">
                <span :style="{'color':iscolor(item.type)}">{{item.state}}</span>
                <span>{{item.area}}</span>
                <span>{{item.num}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="echartitem" style="height: 302px">
          <div class="title">今日拥堵指数</div>
          <div id="jrydechart" class="echarts"></div>
        </div>
        <div class="echartitem" style="height: 286px">
          <div class="title">重点路段视频监控</div>
          <div id="zdldjk" class="echarts">
            <img src="@/assets/image/jk1.png">
            <img src="@/assets/image/jk2.png">
            <img src="@/assets/image/jk2.png">
            <img src="@/assets/image/jk1.png">
          </div>
        </div>
      </div>
      <div class="mid">
        <div class="mid-top">
          <div class="mid-input">
            <span class="input-tip">请输入内容：</span>
            <div class="searchwrap">
              <input v-model="xqmc" type="text" placeholder="输入文本..." id="search" @keyup.enter="search" />
              <button @click="search">查询</button>
            </div>
            <div class="search-lable">
              <div v-for="(item,index) in searchlist" :key="index" class="search-item">
                <div class="circle"></div>
              <span class="lable2">{{item.name}}</span>
              </div>
            </div>
          </div>
          <div v-for="(item,index) in midtoplist" :key="index" class="mid-item">
            <count :countto="item.num" :newcolor="'rgba(80, 227, 194, 1)'" :fs="'34px'"></count>
            <span class="mid-name">{{item.name}}</span>
          </div>
        </div>
        <div class="mid-video" v-if="isvideo">
          <div class="close" @click="closevideo">x</div>
          <video src="@/assets/sg.mp4" type="video/mp4"
              autoplay muted  loop="loop" style="width: 100%;
              height: 100%">
           <p>你的浏览器不支持video标签.</p>
          </video>
        </div>
        <div class="mid-bottom">
          <span class="bottom-lable">实时路况</span>
          <span v-for="(item,index) in bottomlist" :key="index" class="bottom-item">
            <div class="color-item" :style="{'background-color':item.color}"></div>
            <span class="color-name">{{item.name}}</span>
          </span>
        </div>
      </div>
      <div class="right">
        <div class="echartitem" style="height: 201px">
          <div class="title">道路情况分析</div>
          <div id="dlfx" class="echarts">
            <div v-for="(item,index) in dlfxlist" :key="index" class="dlfx-item">
              <img :src="item.img">
              <div>
                <span>{{item.name}}</span>
                <span>{{item.num}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="echartitem" style="height: 433px">
          <div class="title">驾驶信息分析</div>
          <div class="echarts">
            <div id="jsyfbechart"></div>
            <div id="jxyyechart"></div>
          </div>
        </div>
        <div class="echartitem" style="height: 270px">
          <div class="title">违章分析</div>
          <div id="wzfxechart" class="echarts"></div>
        </div>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import count from './assets/count'
import bmapMixin from "./assets/bmap";
export default {
  name: 'HelloWorld',
  data() {
    return {
      isvideo: false,
      sslklist:[
        {state:'严重拥堵',area:'省道311线',num:'3.2',type:2},
        {state:'拥堵',area:'京藏高速永宁至关马湖段',num:'2.0',type:1},
        {state:'畅通',area:'青铜峡西至黄羊滩段',num:'1.0',type:0},
        {state:'畅通',area:'青铜峡西至黄羊滩段',num:'1.0',type:0},
      ],
      midtoplist: [
        { num: 303, name: '当日卡口驶入量（辆）' },
        { num: 431133, name: '当日卡口驶出总量（辆）' }
      ],
      bottomlist:[
        {
          name:'畅通',
          color:'rgba(0, 156, 121, 1)'
        },
        {
          name:'基本畅通',
          color:'rgba(54, 230, 138, 1)'
        },
        {
          name:'轻度拥堵',
          color:'rgba(255, 234, 18, 1)'
        },
        {
          name:'拥堵',
          color:'rgba(255, 77, 77, 1)'
        },
        {
          name:'严重拥堵',
          color:'rgba(140, 11, 11, 1)'
        },
      ],
      searchlist:[
        {name:'路况预测'},
        {name:'路况预测'},
        {name:'路况预测'},
        {name:'路况预测'},
        {name:'路况预测'}
      ],
      jrydechart:null,//今日拥堵指数
      jsyfbechart:null,
      jxyyechart:null,
      wzfxechart:null,
      dlfxlist:[
        {img:require('@/assets/image/dlzg.png'),name:'城市道路整改完成率：',num:'86%'},
        {img:require('@/assets/image/dlyh.png'),name:'城市隐患道路：',num:'32010'},
        {img:require('@/assets/image/zgwc.png'),name:'整改完成道路：',num:'21321'},
      ],
      xqmc: '',
      shequlist: [{
          name: '道路维护',
          longitude: '106.278072',
          latitude: '36.042309',
          sel: false,
          type:1,
          message: {
            name: '道路维护',
            img: require('@/assets/image/sg.png'),
            intro: '2019年12月2日至2020年6月25日，对北新路北段北新街清真寺向北路段进行道路交通全封闭施工'
          },
        },
        {
          name: '道路维护',
          longitude: '106.284507',
          latitude: '36.030851',
          sel: false,
          type:1,
          message: {
            name: '道路维护',
            img: require('@/assets/image/sg.png'),
            intro: '2020年2月12日至2020年5月25日，对六盘山西路与雁岭北路交汇处附近进行道路交通全封闭施工'
          },
        },
        {
          name: '道路维护',
          longitude: '106.288397',
          latitude: '36.030497',
          sel: false,
          type:2,
          message: {
            name: '道路维护',
            img: require('@/assets/image/sg.png'),
            intro: '2020年4月1日至2020年6月30日，对北塬街道六盘山东路进行道路交通全封闭施工；'
          },
        },
      ]
    }
  },
  mixins: [bmapMixin],
  mounted() {
    this.initMap()
    this.jrydinit()
    this.jsyfbinit()
    this.jxyyinit()
    this.wzfxinit()
    this.setshequ(this.shequlist, this.change, this.openvideo)
  },
  methods: {
    closevideo() {
      this.isvideo = false
    },
    search() {
      let num = 0
      let _this = this
      this.shequlist.forEach((item, index) => {
        if (item.name.indexOf(_this.xqmc) >= 0) {
          num = index
        }
      })
      this.change(num)
    },
    jrydinit() {
      this.jrydechart = echarts.init(document.getElementById("jrydechart"))
      let option = {
          tooltip: {
            trigger: "axis",
            formatter:'时间：{b}点<br>拥堵指数：{c}'
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
              data: ['1','2','3','4','5','6','7','8'],
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
              name: "今日拥堵指数",
              type: "line",
              symbol: 'circle',
              data:[3,2.1,4.1,1.5,4.5,3.6,2.7,4.2],
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
      this.jrydechart.setOption(option)
      window.tools.loopShowTooltip(this.jrydechart, option, {loopSeries: true,interval:6000});
    },
    jsyfbinit() {
      this.jsyfbechart = echarts.init(document.getElementById("jsyfbechart"))
      let option = {
          title: {
            text:'各市驾驶员分布分析',
            x:'center',
            textStyle: {
              color:'#ffffff',
              fontSize:14
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
          },
          grid: {
              left: '5%',
              right: '5%',
              top: '15%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              axisLabel:{
                  lineStyle: {
                      color:'rgba(255, 255, 255, 1)'
                  }
              },
              axisLine: {
                show:false,
                  lineStyle: {
                      color:'rgba(255, 255, 255, 1)',
                      fontSize:12
                  }
              },
              axisTick: {
                  show:false
              },
              splitLine: {
                  lineStyle:{
                      type:'dotted',
                      color:'rgba(255, 255, 255, 1)',
                      opacity:0.1
                  }
              },
              boundaryGap: [0, 0.01],
              data: ['固原市', '银川市', '政府法制办', '总工会']
          },
          yAxis: {
              type: 'value',
              axisTick: {
                  show:false
              },
              axisLabel:{
                  lineStyle: {
                      color:'rgba(255, 255, 255, 1)'
                  }
              },
              splitLine: {
                  lineStyle:{
                      color:'              rgba(255, 255, 255, 0.15)',
                  }
              },
              axisLine: {
                show:false,
                  lineStyle: {
                      color:'rgba(255, 255, 255, 1)',
                      fontSize:12
                  }
              },
          },
          barWidth:44,
          itemStyle: {
            color: function(params) {
                var colorList = ["rgba(66, 161, 242, 1)", "rgba(66, 242, 242, 1)", "rgba(250, 217, 97, 1)", "rgba(255, 156, 74, 1)"];
                return colorList[params.dataIndex]
            }
          },
          series: [
              {
                  name: '各市驾驶员分布分析',
                  type: 'bar',
                  data: [69,76, 87, 95]
              }
          ]
      }
      this.jsyfbechart.setOption(option)
      window.tools.loopShowTooltip(this.jsyfbechart, option, {loopSeries: true,interval:6000});
    },
    jxyyinit() {
      this.jxyyechart = echarts.init(document.getElementById("jxyyechart"))
      let dataarr = [69,76, 87, 95]
      let Len = dataarr.length
      let option = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}:'+'{c1}'
          },
          title: {
            text:'驾校预约情况',
            x:'center',
            textStyle: {
              color:'#ffffff',
              fontSize:14
            }
          },
          grid: {
              top:'15%',
              left: '5%',
              right: '5%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              axisLabel:{
                  show:false
              },
              axisLine: {
                show:false,
              },
              axisTick: {
                  show:false
              },
              splitLine: {
                show:false
              },
          },
          yAxis: {
              type: 'category',
              inverse:true,
              axisTick: {
                  show:false
              },
              axisLabel:{
                  lineStyle: {
                      color:'rgba(255, 255, 255, 1)'
                  }
              },
              splitLine: {
                  lineStyle:{
                      color:'              rgba(255, 255, 255, 0.15)',
                  }
              },
              axisLine: {
                show:false,
                  lineStyle: {
                      color:'rgba(255, 255, 255, 1)',
                      fontSize:12
                  }
              },
              data: ['精英驾校', '天豹驾校', '明鑫驾校', '金辉驾校']
          },
          series: [
              {
                  type: 'bar',
                  barWidth:20,
                  itemStyle: {
                    color:'#19454e',
                    // borderColor: '#19454e',
                    borderWidth: 3,
                    barBorderRadius: 15,
                  },
                  label: {
                    show:false
                  },
                  data: [150,150, 150, 150,150,150,150]
              },
              {
                  name: '驾校预约情况',
                  type: 'bar',
                  barWidth:20,
                  barGap: '-100%',
                  itemStyle: {
                    barBorderRadius: 30,
                    color:'#79fcff'
                  },
                  label: {
                      show:false
                  },
                  data: dataarr
              },
          ]
      }
      this.jxyyechart.setOption(option)
      window.tools.loopShowTooltip(this.jxyyechart, option, {loopSeries: true,interval:6000});
    },
    wzfxinit() {
      this.wzfxechart = this.$echarts.init(document.getElementById("wzfxechart"))
      let dataarr = [
                      {value: 53.85, name: '闯红灯'},
                      {value: 3.91, name: '超速'},
                      {value: 9.88, name: '违规变道'},
                      {value: 1.23, name: '逆向行驶'},
                      {value: 31.13, name: '超载/超员'}
                  ]
      let option = {
          color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}  ({d}%)'
          },
          legend:{
            orient: 'vertical',
            top:'15%',
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
                  name: '违章分析',
                  type: 'pie',
                  center: ['30%', '50%'],
                  radius: ['45%', '70%'],
                  data: dataarr,
                  label: {
                      normal: {
                        position:'inside',
                        formatter:'{c}'
                      }
                  },
                  labelLine: {
                      show:false
                  },
              }
          ]
      }
      this.wzfxechart.setOption(option);
      window.tools.loopShowTooltip(this.wzfxechart, option, {loopSeries: true,interval:6000});
    },
    openvideo() {
      this.isvideo = true
    },
    change(item) {
      this.shequlist.forEach(item => item.sel = false)
      this.itemsel = this.shequlist[item].message
      this.shequlist[item].sel = true
      this.setshequ(this.shequlist, this.change, this.openvideo)
    },
    iscolor(val) {
      let color = ''
      switch(val){
        case 0:
          color = 'rgba(54, 230, 138, 1)'
          break
        case 1:
          color = 'rgba(255, 153, 55, 1)'
          break
        case 2:
          color = 'rgba(255, 55, 55, 1)'
          break
      }
      return color
    }
  },
  computed: {
  },
  components: {
    count
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  @width: 420px !important;
  @height: 250px !important;

  .BMapLabel {
    padding: 0;
    border: none !important;
    background-color: transparent !important;
    cursor: pointer;
  }

  .BMap_bubble_pop {
    background: transparent;
    background-color: transparent !important;
    width: @width;
    height: @height;
    
    .BMap_bubble_top {
      height: 0 !important;
      
      .BMap_bubble_title {
        height: 0 !important;
      }

      .BMap_bubble_buttons {
        background-color: transparent !important;
      }
    }

    .BMap_bubble_center {
      width: @width;
      height: @height;

      .BMap_bubble_content {
        width: @width;
        height: @height;
      }
    }
  }

  .BMap_bubble_pop>img {
    display: none;
  }

  .shadow {
    img {
      display: none
    }

    div {
      display: none;
    }
  }

  //百度地图logo
  .anchorBL {
    display: none;
  }

  .selqy {
    width: 200px;
    height: 200px;
    // background-image: url('assets/image/qy.png');
    // background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .camera {
      position: absolute;
      width: 40px;
      height: 40px;
      left: 0px;
      top: 100px;
      background-image: url('assets/image/camera.png');
      background-size: 100% 100%;
      cursor: pointer;
      z-index: 100
    }
  }

  .mid-gk {
    width: 390px;
    height: 250px;
    background: linear-gradient(90deg, rgba(6, 30, 39, 1) 0%, rgba(45, 138, 170, 0) 100%);
    .xqgktop {
      width: 390px;
      height: 185px;
      margin-top: 18px;
      margin-left: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color:#ffffff;
      font-size: 12px;
      line-height: 17px;
      img{
        width: 214px;
        height: 144px;
      }
      .xqgkcontent {
        width: 150px;
        height: 144px;
        letter-spacing: 2px;
      }
    }
  }

  .title {
    width: 160px;
    height: 30px;
    background: linear-gradient(270deg, rgba(151, 228, 236, 0), #5ec5d4);
    font-size: 18px;
    line-height: 30px;
    color: #fff;
    padding-left: 13px;
    position: relative;
    top: 18px;
    left: 35px;
    text-align: left;
  }

  .title:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -10px;
    width: 4px;
    height: 30px;
    background: #5ec5d4;
    opacity: .79;
  }
</style>
<style lang="less" scoped>
  #education {
    position: relative;
    width: 1920px;
    height: 1080px;
    left: 0;
    top: 0;
    background-image: url('assets/image/BG.png');

    .content {
      position: absolute;
      left: 0;
      top: 120px;
      width: 100%;
      height: 926px;
      z-index: 1;
      display: flex;
      pointer-events: none;
      justify-content: space-between;

      .left,
      .right {
        width: 514px;
        height: 100%;
        pointer-events: auto;

        .echartitem {
          width: 100%;
          height: 300px;
          margin-bottom: 6px;
          background:linear-gradient(90deg,rgba(13,61,61,1) 0%,rgba(0,0,0,0.34) 100%);

          .echarts {
            width: 100%;
            height: calc(100% - 50px);
            margin-top: 18px;

            //实时路况
            .sslktitle {
              width: 458px;
              height: 40px;
              margin-top: 30px;
              margin-left: 30px;
              background-color: #0F5456;
              color: #FFFFFF;
              font-size: 14px;
              display: flex;
              justify-content: space-around;
              align-items: center;
              text-align: center;

              span:nth-of-type(1) {
                flex: 1;
              }
              span:nth-of-type(2) {
                flex: 2;
              }
              span:nth-of-type(3) {
                flex: 1;
              }
            }

            .sslkcontent {
              width: 458px;
              height: 130px;
              margin-left: 30px;

              .sslk-item {
                width: 100%;
                height: 40px;
                margin-top: 6px;
                border:1px solid rgba(77,202,230,0.16);
                display: flex;
                justify-content: space-around;
                align-items: center;
                text-align: center;
                font-size: 14px;

                span:nth-of-type(1) {
                  flex: 1;
                  color: rgba(54, 230, 138, 1);
                }
                span:nth-of-type(2) {
                  flex: 2;
                  color: #ffffff;
                }
                span:nth-of-type(3) {
                  flex: 1;
                  color: rgba(245, 198, 80, 1)
                }
              }

              .sslk-item:nth-of-type(odd) {
                background-color:rgba(62,145,163,0.04);
              }

              .sslk-item:nth-of-type(even) {
                background-color:rgba(62, 145, 163, 0.21);
              }              
            }
            
            #jsyfbechart,#jxyyechart {
              width: 100%;
              height: 50%;
            }
          }
          
          //道路分析
          #dlfx {
            width: 90%;
            padding: 0 5%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .dlfx-item {
              width: 30%;
              height: 60px;
              display: flex;
              justify-content: space-between;

              img {
                width: 58px;
                height: 58px;
              }
              div {
                width: 74px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-direction: column;

                span:nth-of-type(1) {
                  color: rgba(255, 255, 255, 1);
                  font-size: 14px
                }

                span:nth-of-type(2) {
                  color: rgba(121, 252, 255, 1);
                  font-size: 24px
                }
              }
            }
          }
          
          #zdldjk {
            display: flex;
            padding:10px 60px 0 60px;
            box-sizing: border-box;
            flex-wrap: wrap;
            justify-content: space-between;

            img {
              width: 182px;
              height: 100px;
            }
          }
        }
      }
      
      .right>.echartitem {
        background:linear-gradient(-90deg,rgba(13,61,61,1) 0%,rgba(0,0,0,0.34) 100%);
      }
      
      .mid {
        width: 892px;
        height: 100%;
        position: relative;

        .mid-top {
          width: 100%;
          height: 132px;
          margin-top: 20px;
          display: flex;
          justify-content: space-around;

          .mid-input {
            width: 35%;
            padding-left: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            
            .input-tip {
              color: #60CCDD;
              font-size: 16px;
            }

            .searchwrap {
              pointer-events: auto;
              margin-top: .5vh;

              input {
                width: 250px;
                height: 20px;
                padding-left: 10px;
                outline: none;
                background: rgba(6, 39, 44, 0.54);
                border: 1px solid rgba(96, 204, 221, 1);
                color: #fff;
              }

              button {
                padding: 1px 10px;
                background: rgba(76, 217, 239, 0.54);
                opacity: 0.67;
                border: 1px solid rgba(96, 204, 221, 1);
                color: #fff;
                cursor: pointer;
              }
            }

            .search-lable {
              height: 150px;
              margin-top: .5vh;
              width: 100%;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              pointer-events: auto;
              background-color: #1A7C8B;
              
              .search-item {
                width: 33%;
                display: flex;
                align-items: center;

                .lable2 {
                  color: rgba(255, 255, 255, 1);
                  font-size: 14px;
                  position: relative;
                }

                .circle {
                  display: block;
                  width: 10px;
                  height: 10px;
                  border: 1px solid rgba(96,204,221,1);
                  border-radius: 50%;
                  margin: 0 10px;
                }
              }
            }
          }

          .mid-item {
            width: 235px;
            height: 74px;
            padding-left: 10px;
            background: rgba(0, 24, 48, 0.52);
            box-shadow: 0px 8px 6px 0px rgba(0, 49, 38, 1);
            border-radius: 4px;
            border: 1px solid;
            border-image: linear-gradient(90deg, rgba(35, 231, 241, 0.54), rgba(50, 150, 245, 0.41), rgba(60, 149, 248, 0), rgba(89, 255, 255, 0.63)) 1 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            position: relative;

            .mid-name {
              color: rgba(255, 255, 255, 1);
              font-size: 18px;
            }
          }
        }

        .mid-video {
          width: 508px;
          height: 400px;
          position: absolute;
          top: 220px;
          right: 100px;
          pointer-events: auto;

          .close {
            width: 20px;
            height: 20px;
            color: #fff;
            font-size: 14px;
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
            z-index: 1
          }
        }

        .mid-bottom {
          width:377px;
          height:43px;
          position:absolute;
          left: 15px;
          bottom: 10px;
          background:rgba(62,145,163,0.21);
          border:1px solid rgba(77,202,230,0.58);
          display: flex;
          align-items: center;
          justify-content: space-around;

          .bottom-lable {
            flex: 1.5;
            color: #fff;
            font-size: 10px;
            text-align: center;
          }

          .bottom-item {
            width: 58px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;

            .color-item {
              width: 100%;
              height: 6px;
            } 

            .color-name {
              color: #fff;
              margin-top: 5px;
              font-size: 8px;
            }
          }
        }
      }
    }
    
    #map {
      width: 100%;
      height: calc(100% - 90px);
      top: 90px;
      left: 0;
      z-index: 0;
      position: absolute;
    }
  }
</style>