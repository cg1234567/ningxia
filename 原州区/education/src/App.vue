<template>
  <div id="education">
    <div class="content">
      <div class="left">
        <div class="echartitem">
          <div class="title">办学类型</div>
          <div id="bxlxechart" class="echarts"></div>
        </div>
        <div class="echartitem">
          <div class="title">教学装备</div>
          <div id="jxzbcontent" class="echarts">
            <div v-for="(item,index) in jxzblist" :key="index" class="jxzbitem">
              <img :src="item.img">
              <span class="jxzb-name">{{item.name}}</span>
              <span class="jxzb-num">{{item.num}}间</span>
            </div>
          </div>
        </div>
        <div class="echartitem">
          <div class="title">访问终端</div>
          <div id="fwzdechart" class="echarts"></div>
        </div>
      </div>
      <div class="mid">
        <div class="mid-top">
          <div v-for="(item,index) in midtoplist" :key="index" class="mid-item">
            <count :countto="item.num" :newcolor="'rgba(80, 227, 194, 1)'" :fs="'34px'"></count>
            <span class="mid-name">{{item.name}}</span>
          </div>
          <div class="mid-item" style="height: 164px">
            <div v-for="(item,index) in midtoplist1" :key="index" class="mid-item1-item">
              <span class="item1-name">{{item.name}}：</span>
              <span class="item1-num">{{item.num1}}</span>
              <span>所</span>
              <span class="item1-num">{{item.num2}}</span>
              <span>人</span>
            </div>
          </div>
        </div>
        <div class="mid-input">
          <div class="search-lable">
            <span class="lable1">搜索:</span>
            <div class="circle"></div>
            <span class="lable2">中学</span>
            <div class="circle"></div>
            <span class="lable2">小学</span>
            <div class="circle"></div>
            <span class="lable2">幼儿园</span>
          </div>
          <div class="searchwrap">
            <input v-model="xqmc" type="text" placeholder="输入文本..." id="search" @keyup.enter="search" />
            <button @click="search">查询</button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="echartitem">
          <div class="title">教师</div>
          <div class="echarts">
            <div id="jsechart"></div>
            <div id="jsechartpie"></div>
          </div>
        </div>
        <div class="echartitem">
          <div class="title">学生</div>
          <div class="echarts">
            <div id="xsleft"></div>
            <div id="xsmid"></div>
            <div id="xsright"></div>
          </div>
        </div>
        <div class="echartitem">
          <div class="title">家长</div>
          <div id="jzechart" class="echarts"></div>
          <div class="jzimg"></div>
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
      midtoplist: [
        { num: 808, name: '学校总数（所）' },
        { num: 255366, name: '学生人数（人次）' }
      ],
      midtoplist1: [
        {name:'中学',num1:67,num2:102267},
        {name:'小学',num1:474,num2:118578},
        {name:'幼儿园',num1:262,num2:22310},
        {name:'其他',num1:5,num2:11811},
      ],
      jxzblist:[
        {img:require('@/assets/image/jsj.png'),name:'计算机教室',num:22},
        {img:require('@/assets/image/dmt.png'),name:'多媒体教室',num:126},
        {img:require('@/assets/image/sys.png'),name:'实验室',num:12},
      ],
      thlist: [{ name: '同比', num: 12 }, { name: '环比', num: -12 }],
      xqsylist: [{ name: '确诊案例', num: 2 }, { name: '疑似案例', num: 3 }],
      bxlxechart: null,
      fwzdechart: null,
      jsechart: null,
      jsechartpie:null,
      xsleft:null,
      xsmid:null,
      xsright:null,
      nvblechart: null,
      jzechart: null,
      xqmc: '',
      shequlist: [
        {
          name: '固原市第一中学',
          longitude: '106.278072',
          latitude: '36.042309',
          sel: false,
          message: {
            name: '固原市第一中学',
            img: require('@/assets/image/gy1.png'),
            intro: '固原市第一中学位于宁夏南部山区六盘山下的清水河畔，是固原市唯一的一所自治区重点学校。固原一中始建于1891年，时称“五原书院”。1941年创设为初级中学，1956年增设高中部，1963年被确立为自治区重点中学'
          },
        },
        {
          name: '固原市回民中学',
          longitude: '106.250351',
          latitude: '36.032269',
          sel: false,
          message: {
            name: '固原市回民中学',
            img: require('@/assets/image/gyh.png'),
            intro: '固原市回民中学是是市委、政府重点建设的示范性高级中学，是区内第三所、宁南山区唯一享受自治区财政特补的高级中学，是教育部中国教师发展基金会“十二五”规划重点课题实验学校，是国家级青少年阳光俱乐部、自治区级木球、篮球运动基地、田径训练基地和防震减灾示范性教育基地'
          },
        },
        {
          name: '固原市第八中学',
          longitude: '106.238446',
          latitude: '36.000726',
          sel: false,
          message: {
            name: '固原市第八中学',
            img: require('@/assets/image/gy8.png'),
            intro: '固原市第八中学是固原市人民政府举办的一所市属公办完全中学，隶属于固原二中教育集团。学校坐落于固原市西南新区。占地面积211.87亩，建筑面积57103平方米，绿化面积17965平方米。室外运动场面积9822平方米，室内运动场面积3426平方米。教室90间，实验室、功能室53间，学生宿舍356间，食堂餐位1720人。浴室洗浴位192个，学校设计规模90个班，4500人'
          },
        },
      ]
    }
  },
  mixins: [bmapMixin],
  mounted() {
    this.initMap()
    this.bxlxinit()
    this.fwzdinit()
    this.jsinit()
    this.jsinitpie()
    this.nvblinit()
    this.xsinit()
    this.jzinit()
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
    bxlxinit() {
      this.bxlxechart = this.$echarts.init(document.getElementById("bxlxechart"))
      let dataarr = [
        { value: 262, name: '幼儿园' },
        { value: 474, name: '小学' },
        { value: 54, name: '初中' },
        { value: 13, name: '高中' },
        { value: 5, name: '职中' }
      ]
      let option = {
        color: ['rgba(80, 227, 194, 1)', 'rgba(210, 165, 23, 1)', 'rgba(249, 123, 124, 1)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '30%',
          right: '10%',
          icon: 'circle',
          formatter: function(value) {
            var data = dataarr
            var num = 0
            var total = 0
            var per = 0
            for (var i = 0; i < dataarr.length; i++) {
              if (value == dataarr[i].name) {
                num = dataarr[i].value
              }
            }
            return '{a|' + value + '}' + ' ' + '{b|' + num + '}'+' {a|所}'
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 16,
                verticalAlign: 'top',
                align: 'center',
                color: '#fff',
                // padding:[0,15,0,0]
              },
              b: {
                fontSize: 14,
                align: 'center',
                color: '#79FCFF',
              }
            }
          },
          data: dataarr

        },
        series: [{
          name: '办学类型',
          type: 'pie',
          center: ['40%', '50%'],
          radius: ['55%', '70%'],
          roseType : 'radius',
          data: dataarr,
          // labelLine: {
          //   show:true,
          //   lineStyle: {
          //     color: '#ddd'
          //   },
          //   smooth: 0.2,
          //   length: 10,
          //   length2: 20,
          // },
          label: {
              show: false,
              position: 'center',
              color: '#EBE806',
              formatter: (params)=>{
                  // console.log(params)
                  return '{top|'+params.percent+'%}' + '\n' + '{bottom| '+params.data.name+'}'
                  
              },
              rich: {
                  top: {
                      color: '#EBE806',
                      fontSize: 18,
                      fontWeight: 400,
                      fontFamily: 'PingFangSC'
                  },
                  bottom: {
                      color: '#EBE806',
                      fontSize: 18,
                      fontWeight: 400,
                      fontFamily: 'PingFangSC',
                      padding: [0, 0, 10, 0]
                  }
              }
          },
          emphasis: {
            label: {
                show: true
            },
            itemStyle:{
            }
          },
        }]
      }
      this.bxlxechart.setOption(option)
      window.tools.loopShowTooltip(this.bxlxechart, option, { loopSeries: true, interval: 6000 });
    },
    fwzdinit() {
      this.fwzdechart = this.$echarts.init(document.getElementById("fwzdechart"))
      let option = {
        color:['rgba(255, 255, 255, 1)','rgba(60, 151, 229, 1)','rgba(255, 169, 77, 1)'],
        tooltip: {
            trigger: 'axis',
            formatter: '{a}:{c}<br>{a1}:{c1}<br>{a2}:{c2}'
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
          data: ['访问量','手机端','PC端']
        },
        xAxis: {
            type: 'category',
            axisTick:{
              show: false
            },
            axisLabel: {
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
            data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
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
          }
        ],
        series: [
           {
              name: '访问量',
              type: 'line',
              symbol:'emptyCircle',
              symbolSize:10,
              data: [56,41,53,30,70,48,55]
          },
          {
              name: '手机端',
              type: 'bar',
              barWidth:15,
              data: [65,45,54,35,74,49,58]
          },
          {
              name: 'PC端',
              type: 'bar',
              barWidth:15,
              data: [43,32,41,28,66,47,51]
          },
        ]
      }
      this.fwzdechart.setOption(option);
      window.tools.loopShowTooltip(this.fwzdechart, option, { loopSeries: true, interval: 6000 });
    },
    jsinit() {
      this.jsechart = this.$echarts.init(document.getElementById("jsechart"))
      let myData = ['中学', '小学', '幼儿园', '其他'];
      let databeast =  [103, 89, 22, 11];
      let databeauty =  [47, 32, 89, 8];

      let spirit = 'image://'+require('@/assets/image/boy.png');
      let spirit1 = 'image://'+require('@/assets/image/gril.png')

      let maxData = 200;
      let option = {
          baseOption: {
              tooltip: {
                  show: true,
                  trigger: 'axis',
                  formatter: '{b}<br/>{a}教师: {c}人',
                  axisPointer: {
                      type: 'shadow',
                  }
              },
              title:[
                {
                  text:'男',
                  textStyle:{
                    fontSize:14,
                    color:'#fff',
                  },
                  top:10,
                  left:'20%'
                },
                {
                  text:'女',
                  textStyle:{
                    fontSize:14,
                    color:'#fff',
                  },
                  top:10,
                  right:'20%'
                },
              ],
              grid: [{
                  show: false,
                  right: '65%',
                  top: 20,
                  bottom: 20,
                  containLabel: true,
                  // width: '46%',
              }, {
                  show: false,
                  left: '50.5%',
                  top: 20,
                  bottom: 20,
                  // width: '0%',
              }, {
                  show: false,
                  left: '60%',
                  top: 20,
                  bottom: 20,
                  containLabel: true,
                  // width: '46%',
              }, ],

              xAxis: [
                  {
                  type: 'value',
                  inverse: true,
                  axisLine: {
                      show: false,
                  },
                  axisTick: {
                      show: false,
                  },
                  // position: 'top',
                  axisLabel: {
                      show: false,
                  },
                  splitLine: {
                      show: false,
                  },
              }, {
                  gridIndex: 1,
                  show: true,
                  axisLabel: {
                      show:false
                  }
              }, {
                  gridIndex: 2,
                  type: 'value',
                  axisLine: {
                      show: false,
                  },
                  axisTick: {
                      show: false,
                  },
                  // position: 'top',
                  axisLabel: {
                      show: false,
                  },
                  splitLine: {
                      show: false,
                  },
              }, ],
              yAxis: [{
                  type: 'category',
                  inverse: true,
                  position: 'right',
                  axisLine: {
                      show: false
                  },
                  axisTick: {
                      show: false
                  },
                  axisLabel: {
                      show: false,
                  },
                  data: myData,
              }, {
                  gridIndex: 1,
                  type: 'category',
                  inverse: true,
                  position: 'left',
                  axisLine: {
                      show: false
                  },
                  axisTick: {
                      show: false
                  },
                  axisLabel: {
                      show: true,
                      textStyle: {
                          color: '#9D9EA0',
                          fontSize: 12,
                      },

                  },
                  data: myData.map(function(value) {
                      return {
                          value: value,
                          textStyle: {
                              align: 'center',
                          }
                      }
                  }),
              }, {
                  gridIndex: 2,
                  type: 'category',
                  inverse: true,
                  position: 'left',
                  axisLine: {
                      show: false
                  },
                  axisTick: {
                      show: false
                  },
                  axisLabel: {
                      show: false,
                  },
                  data: myData,
              }, ],
              series: [{
                      name: '男',
                      type: 'pictorialBar',
                      symbol: spirit,
                      symbolRepeat: 'fixed',
                      symbolMargin: '3%',
                      symbolClip: true,
                      symbolSize: 15,
                      symbolBoundingData: maxData,
                      z: 10,
                      label:{
                          normal: {
                          show: true,
                          position: 'right',
                          textStyle: {
                              fontSize: 12,
                              color:'#fff'
                          }
                      }
                      },
                      data: databeast,
                  },
                  {
                      name: '女',
                      barGap: 20,
                      barWidth: 20,
                      xAxisIndex: 2,
                      yAxisIndex: 2,
                      type: 'pictorialBar',
                      symbol: spirit1,
                      symbolRepeat: 'fixed',
                      symbolMargin: '3%',
                      symbolClip: true,
                      symbolSize: 15,
                      symbolBoundingData: maxData,
                      z: 10,
                      label:{
                          normal: {
                          show: true,
                          position: 'left',
                          textStyle: {
                              fontSize: 12,
                              color:'#fff'
                          }
                      }
                      },
                      data: databeauty,
                  }
              ]

          },
      };

      this.jsechart.setOption(option);
    },
    jsinitpie() {
      this.jsechartpie = this.$echarts.init(document.getElementById("jsechartpie"))
      let dataarr = [
        { value: 104, name: '教龄不足1年' },
        { value: 349, name: '教龄1~3年' },
        { value: 289, name: '教龄3年以上' },
      ]
      let option = {
        color: ['rgba(80, 227, 194, 1)', 'rgba(210, 165, 23, 1)', 'rgba(249, 123, 124, 1)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: '5%',
          x:'center',
          icon: 'circle',
          textStyle:{
            color:'#fff',
          },
          data: dataarr
        },
        series: [{
          name: '教师',
          type: 'pie',
          center: ['40%', '40%'],
          radius: ['0', '60%'],
          data: dataarr,
          label: {
              show: true,
              formatter:'{c}',
              position: 'inside',
          },
        }]
      }
      this.jsechartpie.setOption(option)
      window.tools.loopShowTooltip(this.jsechartpie, option, { loopSeries: true, interval: 6000 });
    },
    xsinit() {
      this.xsleft = echarts.init(document.getElementById("xsleft"))
      let dataarr1 = [34560,54560, 14560, 360]
      let option1 = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}:'+'{c}'
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
              inverse:true,
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
              inverse: true,
              position: 'right',
              axisTick: {
                  show:false
              },
              axisLabel:{
                show:false
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
              data: ['中学', '小学', '幼儿园', '其他']
          },
          series: [
              {
                  type: 'bar',
                  barWidth:10,
                  itemStyle: {
                    color:'rgba(36, 214, 255, 1)',
                    opacity:.42,
                  },
                  label: {
                      show:true,
                      inverse:true,
                      position:['75%',-20],
                      color:'#fff',
                      formatter:'{b}'
                  },
                  data: [56000,56000, 56000, 56000]
              },
              {
                  name: '男',
                  type: 'bar',
                  barWidth:10,
                  barGap: '-100%',
                  itemStyle: {
                    color:'rgba(36, 214, 255, 1)'
                  },
                  data: dataarr1
              },
          ]
      }
      this.xsleft.setOption(option1)
      window.tools.loopShowTooltip(this.xsleft, option1, {loopSeries: true,interval:6000});

      this.xsright = echarts.init(document.getElementById("xsright"))
      let dataarr = [34560,54560, 14560, 360]
      let option = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}:'+'{c}'
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
              inverse: true,
              axisTick: {
                  show:false
              },
              axisLabel:{
                show:false
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
              data: ['中学', '小学', '幼儿园', '其他']
          },
          series: [
              {
                  type: 'bar',
                  barWidth:10,
                  itemStyle: {
                    color:'rgba(252, 141, 122, 1)',
                    opacity:.42,
                  },
                  label: {
                      show:true,
                      position:[0,-20],
                      color:'#fff',
                      formatter:'{b}'
                  },
                  data: [56000,56000, 56000, 56000]
              },
              {
                  name: '女',
                  type: 'bar',
                  barWidth:10,
                  barGap: '-100%',
                  itemStyle: {
                    // barBorderRadius: 30,
                    color:'rgba(252, 141, 122, 1)'
                  },
                  data: dataarr
              },
          ]
      }
      this.xsright.setOption(option)
      window.tools.loopShowTooltip(this.xsright, option, {loopSeries: true,interval:6000});
    },
    nvblinit() {
      this.xsmid = echarts.init(document.getElementById("xsmid"))
      let symbols = [
        'image://'+require('@/assets/image/boy1.png'),
        'image://'+require('@/assets/image/gril1.png')
      ];
      let bodyMax = 255366; //指定图形界限的值
      let labelSetting = {
        normal: {
          show: true,
          position: 'center',
          offset: [0, 50],
          formatter: function(param) {
            return (param.value / bodyMax * 100).toFixed(0) + '%';
          },
          textStyle: {
            fontSize: 18,
            fontFamily: 'Arial',
            color: '#fff'
          }
        }
      };
      let markLineSetting = { //设置标线
        symbol: 'none',
        lineStyle: {
          normal: {
            opacity: 0.3
          }
        },
        data: [{
          type: 'max',
          label: {
            normal: {
              formatter: 'max: {c}'
            }
          }
        }, {
          type: 'min',
          label: {
            normal: {
              formatter: 'min: {c}'
            }
          }
        }]
      };
      let option = {
        tooltip: {
          show: false, //鼠标放上去显示悬浮数据
        },
        title: [
          {
            text:'男',
            top:10,
            left:45,
            textStyle: {
              fontSize:14,
              color:'#fff'
            }
          },
          {
            text:'女',
            top:10,
            right:30,
            textStyle: {
              fontSize:14,
              color:'#fff'
            }
          },
          {
            text:'120806人',
            bottom:20,
            right:0,
            textStyle: {
              fontSize:14,
              color:'#fff'
            }
          },
          {
            text:'134560人',
            bottom:20,
            left:25,
            textStyle: {
              fontSize:14,
              color:'#fff'
            }
          }
        ],
        grid: {
          top: '20%',
          left: '15%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          data: ['a', 'x', 'b'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          max: bodyMax,
          splitLine: {
            show: false
          },
          axisTick: {
            // 刻度线
            show: false
          },
          axisLine: {
            // 轴线
            show: false
          },
          axisLabel: {
            // 轴坐标文字
            show: false
          }
        },
        series: [{
            name: 'typeA',
            type: 'pictorialBar',
            symbolClip: true,
            symbolBoundingData: bodyMax,
            label: labelSetting,
            data: [{
                value: 134560,
                symbol: symbols[0],
                itemStyle: {
                  normal: {
                    color: 'rgba(105,204,230)' //单独控制颜色
                  }
                },
              },
            {},
              {
                value: 120806,
                symbol: symbols[1],
                itemStyle: {
                  normal: {
                    color: 'rgba(255,130,130)' //单独控制颜色
                  }
                },
              }
            ],
            // markLine: markLineSetting,
            z: 10
          },
          {
            // 设置背景底色，不同的情况用这个
            name: 'full',
            type: 'pictorialBar', //异型柱状图 图片、SVG PathData
            symbolBoundingData: bodyMax,
            animationDuration: 0,
            itemStyle: {
              normal: {
                color: '#ccc' //设置全部颜色，统一设置
              }
            },
            z: 10,
            data: [{
                itemStyle: {
                  normal: {
                    color: 'rgba(105,204,230,0.40)' //单独控制颜色
                  }
                },
                value: 468258,
                symbol: symbols[0],
                symbolSize: [80, '100%'],
              },
              {
                // 设置中间冒号
                itemStyle: {
                  normal: {
                    color: 'none' //单独控制颜色
                  }
                },
                value: 100,
                symbol: '',
                symbolSize: [2, '18%'],
                symbolOffset: [0, '-200%']
              },
              {
                itemStyle: {
                  normal: {
                    color: 'rgba(255,130,130,0.40)' //单独控制颜色
                  }
                },
                value: 468258,
                symbol: symbols[1],
                symbolSize: [80, '100%'],
              }
            ]
          }
        ]
      }
      this.xsmid.setOption(option)
    },
    jzinit() {
      this.jzechart = echarts.init(document.getElementById("jzechart"))
      let dataarr = [
                      {value: 1188, name: '小学'},
                      {value: 2301, name: '中学'},
                      {value: 5234, name: '幼儿园'},
                      {value: 134, name:'其他'}
                  ]
      let option = {
          color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} :{c}人 ({d}%)'
          },
          legend:{
            orient: 'vertical',
            top:'25%',
            left: '10%',
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
                return '{a|'+value +'}'+'  '+'{b|'+ per+'%}'+' ' +'{c|'+num+'}'
            },
            textStyle:{
                rich:{
                    a:{
                        fontSize:14,
                        color:'rgba(255, 255, 255, 0.65)',
                        // padding:[0,15,0,0]
                    },
                    b:{
                        fontSize:16,
                        color:'#79FCFF',
                        // padding:[0,15,0,0],
                        lineHeight:25
                    },
                    c:{
                      fontSize:14,
                      color:'#fff'
                    }
                }
            },
            data: dataarr

          },
          series: [
              {
                  name: '家长情况',
                  type: 'pie',
                  center: ['70%', '50%'],
                  radius: ['50%', '65%'],
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
      this.jzechart.setOption(option)
      window.tools.loopShowTooltip(this.jzechart, option, {loopSeries: true,interval:6000});
    },
    openvideo() {
      this.isvideo = true
    },
    change(item) {
      this.shequlist.forEach(item => item.sel = false)
      this.itemsel = this.shequlist[item].message
      this.shequlist[item].sel = true
      this.setshequ(this.shequlist, this.change, this.openvideo)
    }
  },
  components: {
    count
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

@width: 500px !important;
@top: 215px !important;

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
  top: @top;
  
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

    .BMap_bubble_content {
      width: @width;
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
  width: 250px;
  height: 290px;
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
    left: 20px;
    top: 100px;
    background-image: url('assets/image/camera.png');
    background-size: 100% 100%;
    cursor: pointer;
    z-index: 100
  }
}

.mid-gk {
  width: 500px;
  height: 290px;
  background: linear-gradient(90deg, rgba(6, 30, 39, 1) 0%, rgba(45, 138, 170, 0) 100%);
  .xqgktop {
    width: 470px;
    height: 240px;
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
      width: 200px;
      height: 180px;
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
        position: relative;
        margin-bottom: 6px;
        background:linear-gradient(90deg,rgba(13,61,61,1) 0%,rgba(0,0,0,0.34) 100%);

        .echarts {
          width: 100%;
          height: 244px;
          margin-top: 18px;
          display: flex;

          #jsechart {
            width: 60%;
            height: 100%;
          }

          #jsechartpie {
            width: 40%;
            height: 100%;
          }

          #xsleft,#xsright {
            width: 30%;
            height: 100%;
          }

          #xsmid {
            width: 40%;
            height: 100%;
          }
        }
      
        //教学装备
        #jxzbcontent {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .jxzbitem {
            width: 145px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .jxzb-name {
              color: #ffffff;
              font-size: 14px;
            }
            .jxzb-num {
              color: #79FCFF;
              font-size: 24px
            }
          }
        }
        
        .jzimg {
          position: absolute;
          background-image: url('assets/image/jz.png');
          background-size: 100% 100%;
          width: 111px;
          height: 111px;
          top: 38%;
          right:19%;
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
        height: 78px;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;

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

        .mid-item1-item {
          width: 100%;
          color: #ffffff;
          font-size: 16px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          
          .item1-name {
            flex:1;
          }
          .item1-num {
            color: #50E3C2;
            font-size: 20px;
            font-family:Acens;
            flex:1;
          }
          span {
            flex: 0.5
          }
        }
      }

      .mid-input {
        width: 90%;
        height: 100px;
        padding-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .search-lable {
          display: flex;
          align-items: center;

          .lable1 {
            color: rgba(96, 204, 221, 1);
            font-size: 16px;
          }

          .lable2 {
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            position: relative;
          }

          .circle {
            display: block;
            width: 13px;
            height: 13px;
            border: 1px solid #5ec5d4;
            border-radius: 50%;
            margin: 0 10px;
          }
        }

        .searchwrap {
          margin-top: 2vh;
          pointer-events: auto;

          input {
            width: 200px;
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

    .shequicon {
      width: 38px;
      height: 38px;
      background-image: url('assets/image/xqns.png');
      background-size: 100% 100%;
      color: #fff
    }
  }
}
</style>