<template>
  <div id="aqCloud">
    <div class="content">
      <div class="left">
        <div class="aqzp">
          <div class="title">安全总评</div>
          <canvas id="aqzpechart"></canvas>
          <div class="zpimg">
            <div class="zpnum">94%</div>
            <div class="zpname">安全</div>
          </div>
        </div>
        <div class="yhcy">
          <div class="title">有害程序</div>
          <div id="yhechart"></div>
        </div>
        <div class="wlgj">
          <div class="title">网络攻击</div>
          <div id="gjechart"></div>
          <div class="gjimg"></div>
          <div class="gjcontent">
            <div class="sideline"></div>
            <div class="listWrap">
              <div v-for="(item,index) in gjlist" :key="index" class="gj-item">
                <div class="indexnum">{{index+1}}</div>
                <div class="content-wrap">
                  <div class="content-top">
                    <span>{{item.name}}</span>
                    <span style="color: rgba(255, 234, 18, 1)">{{item.num}}</span>
                  </div>
                  <div class="content-bottom">
                    <div class="bluediv" :style="{'width':item.width*395+'px'}"></div>
                    <div class="nulldiv"></div>
                    <div class="yellowdiv" :style="{'width':(1-item.width)*395+'px'}"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sideline"></div>
          </div>
        </div>
      </div>
      <div class="mid">
        <div class="midtop-wrap">
          <div v-for="(item,index) in midtoplist" :key="index" class="midtop-item">
            <count :countto="item.num" :newcolor="'rgba(57, 125, 255, 1)'" :fs="'34px'"></count>
            <div class="midtop-name">{{item.name}}</div>
          </div>
        </div>
        <div id="midtop">
        </div>
        <div class="gjjc">
          <div class="title">告警监察</div>
          <div class="gjjcwrap">
            <div class="gjjc-title">
              <div v-for="(item,index) in gjjctitle" :key="index" class="gjjc-title-item">{{item}}</div>
            </div>
            <div class="gjjc-content">
              <div v-for="(item,index) in gjjccontent" :key="index" class="gjjc-item">
                <div v-for="(item1,index1) in item" :key="index1" class="gjjc-item-item">{{item1}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="zcaq">
          <div class="title">资产安全</div>
          <div id="zcaqechart">
          </div>
          <div class="aqimg"></div>
        </div>
        <div class="wxdj">
          <div class="title">危险等级</div>
          <div class="wxdj-top">
            <div class="wxdj-line"></div>
            <div class="wxdj-wrap">
              <div v-for="(item,index) in wxdjimg" :key="index" class="wxdjimg-wrap">
                  <img :src="item" >
              </div>
            </div>
          </div>
          <div class="wxdj-lable">
            <div v-for="(item,index) in wxdjlable" :key="index" class="wxdjlable-wrap">
              {{item}}
            </div>
          </div>
          <div class="wxdj-bottom">
            <div v-for="(item,index) in balllist" :key="index" class="zyfp-bottom-item">
              <div class="ballimg" :id="'ballechart'+index"></div>
              <div class="balldata">
                <div class="ball-name">{{item.name}}</div>
                <div class="ball-num">{{item.num}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="sjjc">
          <div class="title">数据监测</div>
          <div id="sjjcechart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../node_modules/echarts/map/js/world.js'
import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
import count from './assets/count'
export default {
  name: 'HelloWorld',
  data () {
    return {
      yhechart:null,
      gjechart:null,
      sjjcechart:null,
      zcaqechart:null,
      ball1: null,
      ball2: null,
      ball3: null,
      gjlist:[
        {name:'扫描攻击',num:498.367,width:0.6},
        {name:'WEB攻击',num:298.367,width:0.5},
        {name:'代码/命令攻击',num:198.367,width:0.4}],
      midtoplist:[
        {num:139.233,name:'日志总量（万）'},
        {num:41115,name:'威胁总量'},
        {num:27816,name:'告警总量'}],
      worldmap:null,
      gjjctitle:['告警时间','告警内容','风险','源IP','固定IP/资产IP'],
      gjjccontent:[
        ['2020-03-24  19:00','2221.199.14.15对218.95.14.15','高危','2221.199.14.15','218.95.14.15'],
        ['2020-03-24  19:00','2221.199.14.15对218.95.14.15','高危','2221.199.14.15','218.95.14.15'],
        ['2020-03-24  19:00','2221.199.14.15对218.95.14.15','高危','2221.199.14.15','218.95.14.15'],
        ['2020-03-24  19:00','2221.199.14.15对218.95.14.15','高危','2221.199.14.15','218.95.14.15'],
        ['2020-03-24  19:00','2221.199.14.15对218.95.14.15','高危','2221.199.14.15','218.95.14.15'],
        ],
      wxdjimg:[require('@/assets/image/big.png'),require('@/assets/image/small.png'),require('@/assets/image/small.png')],
      wxdjlable:['网络攻击','有害程序','安全漏洞'],
      balllist:[
        {pre:'60%',img:require('@/assets/image/ball1.png'),name:'低危:',num:'57%'},
        {pre:'30%',img:require('@/assets/image/ball2.png'),name:'中危:',num:'43%'},
        {pre:'30%',img:require('@/assets/image/ball3.png'),name:'内存:',num:'40%'}
        ],
    }
  },
  mounted(){
    this.zpinit()
    this.yhinit()
    this.gjinit()
    this.zcaqinit()
    this.sjjcinit()
    this.worldinit()
    this.ballinit()
  },
  methods: {
    zpinit () {
      var bg = document.getElementById('aqzpechart');
      var ctx = bg.getContext('2d');
      ctx.beginPath();
      ctx.lineWidth=20;
      ctx.strokeStyle='#143c43';
      ctx.lineCap = "round";
      ctx.arc(150,110,65,0*Math.PI,1*Math.PI,true);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth=12;
      var gradient=ctx.createLinearGradient(0,0,170,0);
      gradient.addColorStop("0","rgba(250, 217, 97, 1)");
      gradient.addColorStop("0.5","rgba(247, 107, 28, 1)");
      gradient.addColorStop("1.0","rgba(247, 107, 28, 1)");
      // 用渐变进行填充
      ctx.strokeStyle=gradient;
      ctx.lineCap = "round";
      ctx.arc(150,110,65,1*Math.PI,1.5*Math.PI,false);
      ctx.stroke();
    },
    yhinit () {
      this.yhechart = echarts.init(document.getElementById("yhechart"))
      let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:'{a}<br>{b}:{c}'
          },
          grid: {
              left: '5%',
              right: '5%',
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
              data: ['木马', '恶意事件', '螨虫', '僵尸程序']
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
                  name: '有害程序',
                  type: 'bar',
                  data: [69,76, 87, 95]
              }
          ]
      }
      this.yhechart.setOption(option)
      window.tools.loopShowTooltip(this.yhechart, option, {loopSeries: true,interval:6000});
    },
    gjinit () {
      this.gjechart = this.$echarts.init(document.getElementById("gjechart"))
      let dataarr = [
                      {value: 24, name: '扫描探测'},
                      {value: 19, name: '漩涡攻击'},
                      {value: 12, name: 'WEB'},
                      {value: 20, name: '其他'}
                  ]
      let option = {
          color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend:{
            orient: 'vertical',
            top:'15%',
            right: '20%',
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
                return '{a|'+value +'}'+'  '+'{b|'+ per+'%}'+'  '+'{b|'+num+'}'
            },
            textStyle:{
                rich:{
                    a:{
                        fontSize:10,
                        color:'#8C8C8C',
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
                  name: '网络攻击',
                  type: 'pie',
                  center: ['30%', '50%'],
                  radius: ['65%', '75%'],
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
      this.gjechart.setOption(option);
      window.tools.loopShowTooltip(this.gjechart, option, {loopSeries: true,interval:6000});
    },
    zcaqinit () {
      this.zcaqechart = echarts.init(document.getElementById("zcaqechart"))
      let data = [
        {
            name: '服务器',
            value: 54
        },{
            name: '网络设备',
            value: 44
        }]
      let seriesArr = []
      let colors = [['rgba(247, 107, 28, 1)', '#ddd'],['rgba(143, 196, 232, 1)', '#ddd']]
      data.forEach(function(item, index){
        seriesArr.push(
            {
                name: item.name,
                type: 'pie',
                radius: [60, 70],
                itemStyle:  {
                    normal: {
                        color: colors[index][0],
                        shadowColor: colors[index][0],
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                center: [index * 50 + 25 +'%', '50%'],
                data: [{
                    value: item.value,
                    label: {
                        normal: {
                            formatter: function(params){
                                return '{a|'+params.seriesName+'}'+'\n'+'{b|'+params.value+'%'+'}';
                            },
                            rich: {
                                a: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    align: 'center',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                },
                                b: {
                                    color: 'rgba(248, 231, 28, 1)',
                                    align: 'center',
                                    fontSize: 30
                                }
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: colors[index][0]
                            }
                        }
                    },
                }, {
                    value: 100-item.value,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: colors[index][1]
                        },
                        emphasis: {
                            color: colors[index][1]
                        }
                    }
                }]
            }    
        )
      });
      let option = {
        series: seriesArr
      }
      this.zcaqechart.setOption(option)
    },
    sjjcinit () {
      this.sjjcechart = echarts.init(document.getElementById("sjjcechart"))
      let option = {
          tooltip: {
            trigger: "axis",
            formatter:'{a}:{c}<br>{a1}:{c1}'
          },
          grid: {
            top: 40,
            bottom: 20
          },
          legend: {
            data: ['威胁类', '总量'],
            right: "5%",
            orient: 'vertical',
            textStyle: {
              color: '#fff'
            },
            icon: 'rect',
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
          },
          xAxis: [
            {
              type: "category",
              data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
              axisTick: {
                show:false
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.5)"
                },
                axisLabel: {
                  color: "rgba(255,255,255,0.5)"
                }
              }
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
              name: "威胁类",
              type: "line",
              symbol: 'circle',
              data:[14,24,43,67,21,56,41,34,47,35,42,57],
              lineStyle: {
                normal: {
                  width: 3,
                  color: "#F5A623",
                  shadowColor: "rgba(72,216,191, 0.3)"
                }
              },
              itemStyle: {
                color: '#F5A623',
              },
            },
            {
              name: "总量",
              type: "line",
              symbol: 'circle',
              data: [12,14,24,43,67,21,56,41,34,47,35,42],
              lineStyle: {
                normal: {
                  width: 3,
                  color: "#2d99ff",
                  shadowColor: "rgba(72,216,191, 0.3)"
                }
              },
              itemStyle: {
                color: '#2d99ff',
              },
              areaStyle: {
                color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28C0C7' // 0% 处的颜色
              }, {
                  offset: 1, color: '#191408' // 100% 处的颜色
              }],
              global: false // 缺省为 false
          }
              }
            }
          ]
        };
      this.sjjcechart.setOption(option)
      window.tools.loopShowTooltip(this.sjjcechart, option, {loopSeries: true,interval:6000});
    },
    worldinit () {
      this.worldmap = echarts.init(document.getElementById("midtop"))
      var geoCoordMap = {
          宁夏: [106.238011,38.489532],
          尼日利亚: [-4.388361, 11.186148],
          美国洛杉矶: [-118.24311, 34.052713],
          香港邦泰: [114.195466, 22.282751],
          美国芝加哥: [-87.801833, 41.870975],
          加纳库马西: [-4.62829, 7.72415],
          英国曼彻斯特: [-1.657222, 51.886863],
          德国汉堡: [10.01959, 54.38474],
          哈萨克斯坦阿拉木图: [45.326912, 41.101891],
          俄罗斯伊尔库茨克: [89.116876, 67.757906],
          巴西: [-48.678945, -10.493623],
          埃及达米埃塔: [31.815593, 31.418032],
          西班牙巴塞罗纳: [2.175129, 41.385064],
          柬埔寨金边: [104.88659, 11.545469],
          意大利米兰: [9.189948, 45.46623],
          乌拉圭蒙得维的亚: [-56.162231, -34.901113],
          莫桑比克马普托: [32.608571, -25.893473],
          阿尔及利亚阿尔及尔: [3.054275, 36.753027],
          阿联酋迪拜: [55.269441, 25.204514],
          匈牙利布达佩斯: [17.108519, 48.179162],
          澳大利亚悉尼: [150.993137, -33.675509],
          美国加州: [-121.910642, 41.38028],
          澳大利亚墨尔本: [144.999416, -37.781726],
          墨西哥: [-99.094092, 19.365711],
          加拿大温哥华: [-123.023921, 49.311753]
      };
      var BJData = [
          [{
              name: "尼日利亚",
              value: 9100
          }, {
              name: "宁夏"
          }],
          [{
              name: "美国洛杉矶",
              value: 2370
          }, {
              name: "宁夏"
          }],
          [{
              name: "香港邦泰",
              value: 3130
          }, {
              name: "宁夏"
          }],
          [{
              name: "美国芝加哥",
              value: 2350
          }, {
              name: "宁夏"
          }],
          [{
              name: "加纳库马西",
              value: 5120
          }, {
              name: "宁夏"
          }],
          [{
              name: "英国曼彻斯特",
              value: 3110
          }, {
              name: "宁夏"
          }],
          [{
              name: "德国汉堡",
              value: 6280
          }, {
              name: "宁夏"
          }],
          [{
              name: "哈萨克斯坦阿拉木图",
              value: 7255
          }, {
              name: "宁夏"
          }],
          [{
              name: "俄罗斯伊尔库茨克",
              value: 8125
          }, {
              name: "宁夏"
          }],
          [{
              name: "巴西",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "埃及达米埃塔",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "西班牙巴塞罗纳",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "柬埔寨金边",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "意大利米兰",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "乌拉圭蒙得维的亚",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "莫桑比克马普托",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "阿尔及利亚阿尔及尔",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "阿联酋迪拜",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "匈牙利布达佩斯",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "澳大利亚悉尼",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "美国加州",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "澳大利亚墨尔本",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "墨西哥",
              value: 3590
          }, {
              name: "宁夏"
          }],
          [{
              name: "加拿大温哥华",
              value: 3590
          }, {
              name: "宁夏"
          }]
      ];
      var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
              var dataItem = data[i];
              var fromCoord = geoCoordMap[dataItem[0].name];
              var toCoord = geoCoordMap[dataItem[1].name];
              if (fromCoord && toCoord) {
                  res.push([{
                          coord: fromCoord,
                          value: dataItem[0].value
                      },
                      {
                          coord: toCoord
                      }
                  ]);
              }
          }
          return res;
      };

      var series = [];
      [
          ["宁夏", BJData]
      ].forEach(function(item, i) {
          series.push({
                  type: "lines",
                  zlevel: 2,
                  effect: {
                      show: true,
                      period: 4, //箭头指向速度，值越小速度越快
                      trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                      symbol: "arrow", //箭头图标
                      symbolSize: 5 //图标大小
                  },
                  lineStyle: {
                      normal: {
                          width: 1, //尾迹线条宽度
                          opacity: 0, //尾迹线条透明度
                          curveness: 0.3 //尾迹线条曲直度
                      }
                  },

                  data: convertData(item[1])
              }, {
                  type: "effectScatter",
                  coordinateSystem: "geo",
                  zlevel: 2,
                  rippleEffect: {
                      //涟漪特效
                      period: 4, //动画时间，值越小速度越快
                      brushType: "stroke", //波纹绘制方式 stroke, fill
                      scale: 4 //波纹圆环最大限制，值越大波纹越大
                  },
                  label: {
                      normal: {
                          show: false,
                          position: "right", //显示位置
                          offset: [5, 0], //偏移设置
                          formatter: "{b}" //圆环显示文字
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  symbol: "circle",
                  symbolSize: function(val) {
                      return 4 + val[2] / 1000; //圆环大小
                  },
                  itemStyle: {
                      normal: {
                          show: false,
                      }
                  },
                  data: item[1].map(function(dataItem) {
                      return {
                          name: dataItem[0].name,
                          value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                      };
                  })
              },
              //被攻击点
              {
                  type: "scatter",
                  coordinateSystem: "geo",
                  zlevel: 2,
                  rippleEffect: {
                      period: 4,
                      brushType: "stroke",
                      scale: 4
                  },
                  label: {
                      normal: {
                          show: true,
                          position: "right",
                          color: "#00ffff",
                          formatter: "{b}",
                          textStyle: {
                              color: "#0bc7f3"
                          }
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  symbol: "pin",
                  symbolSize: 30,
                  itemStyle: {
                      normal: {
                          show: true,
                          color: "#9966cc"
                      }
                  },
                  data: [{
                      name: item[0],
                      value: geoCoordMap[item[0]].concat([100])
                  }]
              }
          );
      });

      let option = {
          // backgroundColor: '#000',
          tooltip: {
              trigger: "item",
              backgroundColor: "#1540a1",
              borderColor: "#FFFFCC",
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: "z-index:100",
              formatter: function(params, ticket, callback) {
                  //根据业务自己拓展要显示的内容
                  var res = "";
                  var name = params.name;
                  var value = params.value[params.seriesIndex + 1];
                  res =
                      "<span style='color:#fff;'>" +
                      name +
                      "</span><br/>数据：" +
                      value;
                  return res;
              }
          },
          visualMap: {
              //图例值控制
              min: 100,
              max: 10000,
              show: false,
              calculable: true,
              color: ["#0bc7f3"],
              textStyle: {
                  color: "#fff"
              },

          },
          geo: {
              map: "world",
              label: {
                  emphasis: {
                      show: false
                  }
              },
              roam: true, //是否允许缩放
              layoutCenter: ["50%", "50%"], //地图位置
              layoutSize: "160%",
              itemStyle: {
                  normal: {
                      color: "#04284e", //地图背景色
                      borderColor: "#5bc1c9" //省市边界线
                  },
                  emphasis: {
                      color: "rgba(37, 43, 61, .5)" //悬浮背景
                  }
              }
          },

          series: series
      };
      this.worldmap.setOption(option)
    },
    ballinit() {
      this.ball1 = this.$echarts.init(document.getElementById("ballechart0"))
      this.ball2 = this.$echarts.init(document.getElementById("ballechart1"))
      this.ball3 = this.$echarts.init(document.getElementById("ballechart2"))
      let option1 = {
        series: [{
          type: 'liquidFill',
          data: [0.6, 0.5],
          color: ['rgba(121, 252, 255, 1)', 'rgba(121, 252, 255, 0.1)'],
          itemStyle: {
            shadowBlur: 0
          },
          backgroundStyle: {
            color: 'none'
          },
          radius: '90%',
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 3,
              borderColor: 'rgba(41, 246, 255, 1)',
            }
          },
          label: {
            show: false,
            // normal: {
            //   textStyle: {
            //   color: '#ffff',
            //   insideColor: '#fff',
            //   fontSize: 21
            //   }
            // }
          },
        }]
      }
      let option2 = {
        series: [{
          type: 'liquidFill',
          data: [0.5, 0.4],
          color: ['rgba(225, 82, 83, 1)', 'rgba(225, 82, 83, 0.5)'],
          itemStyle: {
            shadowBlur: 0
          },
          radius: '90%',
          backgroundStyle: {
            color: 'none'
          },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 3,
              borderColor: 'rgba(225, 82, 83, 1)',
            }
          },
          label: {
            show: false,
            // normal: {
            //   textStyle: {
            //   color: '#fff',
            //   insideColor: '#fff',
            //   fontSize: 21
            //   }
            // }
          },
        }]
      }
      let option3 = {
        series: [{
          type: 'liquidFill',
          data: [0.4, 0.3],
          color: ['rgba(225, 199, 31, 1)', 'rgba(225, 199, 31, 0.5)'],
          itemStyle: {
            shadowBlur: 0
          },
          backgroundStyle: {
            color: 'none'
          },
          radius: '90%',
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 3,
              borderColor: 'rgba(225, 199, 31, 1)',
            }
          },
          label: {
            show: false,
            // normal: {
            //   textStyle: {
            //   color: '#fff',
            //   insideColor: '#fff',
            //   fontSize: 21
            //   }
            // }
          },
        }]
      }
      this.ball1.setOption(option1)
      this.ball2.setOption(option2)
      this.ball3.setOption(option3)
    }
  },
  components: {
    count
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #aqCloud {
    position: absolute;
    width: 1920px;
    height: 1080px;
    left: 0;
    top: 0;
    background-image: url('assets/image/background.png');
    background-size: 100% 100%;
  }
  .content {
    padding-top: 87px;
    display: flex;
    justify-content: space-between;
  }
  .title {
    width: 131px;
    height: 30px;
    background:linear-gradient(90deg,rgba(18,137,253,1) 0%,rgba(110,192,255,0.01) 100%);
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
    background: rgba(49, 109, 223, 1);
    opacity: .79;
  }
  .left {
    width: 514px;
    height: 937px;
  }
  .aqzp {
    width: 100%;
    height: 252px;
    background: linear-gradient(90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
    position: relative;
  }
  #aqzpechart {
    width: 100%;
    height: 202px;
    margin-top: 18px;
  }
  .zpimg {
    width: 120px;
    height: 120px;
    background-image: url('assets/image/zpimg.png');
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50% ,-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .zpnum {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    font-size: 36px;
    text-align: center;
  }
  .zpname {
    width: 100%;
    height: 21px;
    line-height: 21px;
    color: #ffffff;
    font-size: 15px;
    text-align: center;
  }
  .yhcy {
    width: 100%;
    height: 282px;
    margin-top: 31px;
    background: linear-gradient(90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
  }
  #yhechart {
    width: 100%;
    height: 232px;
    margin-top: 18px;
  }
  .wlgj {
    width: 100%;
    height: 368px;
    margin-top: 4px;
    background: linear-gradient(90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
    position: relative;
  }
  #gjechart {
    width: 100%;
    height: 205px;
    margin-top: 18px;
  }
  .gjimg {
    width: 102px;
    height: 102px;
    position: absolute;
    top: 27%;
    left: 20.5%;
    background-image: url('assets/image/gjimg.png');
  }
  .gjcontent {
    width: 100%;
    height: 113px;
    display: flex;
    padding: 0 35px;
    box-sizing: border-box;
  }
  .sideline {
    width: 7px;
    height: 100%;
    background-image: url('assets/image/sideline.png');
    background-size: 100% 100%;
  }
  .listWrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .gj-item {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .indexnum {
    width:18px;
    height:15px;
    background:rgba(57,125,255,0.32);
    font-size: 14px;
    text-align: center;
    line-height: 15px;
    color: #ffffff;
  }
  .content-wrap {
    width: 400px;
    height: 30px;
  }
  .content-top {
    width: 100%;
    height: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    line-height: 16px;
    font-size: 12px;
  }
  .content-bottom {
    width: 100%;
    height: 14px;
    display: flex;
  }
  .bluediv,.nulldiv,.yellowdiv {
    height: 14px;
    width: 10px;
  }
  .bluediv {
    background-color: rgba(57, 125, 255, 1)
  }
  .yellowdiv {
    background-color: rgba(225, 199, 31, 1)
  }
  .mid {
    width: 850px;
    height: 937px;
    position: relative;
  }
  .midtop-wrap {
    width: 100%;
    height: 74px;
    position: absolute;
    top: 30px;
    display: flex;
    justify-content: space-around;
  }
  .midtop-item {
    width: 215px;
    padding-left: 20px;
    height: 100%;
    background:rgba(0,24,48,0.52);
    box-shadow:0px 8px 6px 0px rgba(0,29,49,1);
    border-radius:4px;
    border:1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .midtop-num {
    width: 90%;
    margin-left: 10%;
    height: 31px;
    color: rgba(57, 125, 255, 1);
    font-size: 34px;
    font-family:Acens;
  }
  .midtop-name {
    width: 90%;
    /*margin-left: 10%;*/
    height: 25px;
    color: #ffffff;
    font-size: 18px;
  }
  #midtop {
    width: 100%;
    height: 525px;
    margin-top: 105px;
  }
  .gjjc {
    width: 100%;
    height: 305px;
    background: linear-gradient(-90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
  }
  .gjjcwrap {
    width: 90%;
    margin-top: 18px;
    margin-left: 5%;
    height: 255px;
  }
  .gjjc-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: rgba(245, 198, 80, 1);
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .gjjc-title-item {
    text-align: center;
  }
  .gjjc-title-item:nth-of-type(1) {
    flex: 1
  }
  .gjjc-title-item:nth-of-type(2) {
    flex: 2
  }
  .gjjc-title-item:nth-of-type(3) {
    flex: 0.5
  }
  .gjjc-title-item:nth-of-type(4) {
    flex: 1
  }
  .gjjc-title-item:nth-of-type(5) {
    flex: 1
  }
  .gjjc-content {
    width: 100%;
    height: 205px;
  }
  .gjjc-item {
    width: 100%;
    height: 30px;
    margin-top: 4px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  .gjjc-item:nth-of-type(odd) {
    background:rgba(62,145,163,0.04);
    border:1px solid rgba(77,202,230,0.16);
    color: #D1FFF5;
  }
  .gjjc-item:nth-of-type(even) {
    background:rgba(62,145,163,0.21);
    border:1px solid rgba(77,202,230,0.16);
    color: #3CB398;
  }
  .gjjc-item-item {
    text-align: center;
    color: #ffffff;
  }
  .gjjc-item-item:nth-of-type(1) {
    flex: 1
  }
  .gjjc-item-item:nth-of-type(2) {
    flex: 2;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .gjjc-item-item:nth-of-type(3) {
    flex: 0.5;
    color: #945957;
  }
  .gjjc-item-item:nth-of-type(4) {
    flex: 1
  }
  .gjjc-item-item:nth-of-type(5) {
    flex: 1
  }
  .right {
    width: 514px;
    height: 937px;
  }
  .zcaq {
    width: 100%;
    height: 269px;
    background: linear-gradient(-90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
    position: relative;
  }
  #zcaqechart {
    width: 100%;
    height: 219px;
    margin-top: 18px;
  }
  .aqimg {
    width: 120px;
    height: 120px;
    background-image: url('assets/image/zpimg.png');
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50% ,-50%);
  }
  .wxdj {
    width: 100%;
    height: 334px;
    margin-top: 10px;
    background: linear-gradient(-90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
  }
  .wxdj-top {
    width: 85%;
    margin-top: 60px;
    margin-left: 10%;
    height: 107px;
    position: relative;
  }
  .wxdj-line {
    width: 398px;
    height: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: linear-gradient(90deg,rgba(24, 51, 80, 1) ,rgba(80, 151, 255, 1),rgba(24, 53, 108, 1));
  }
  .wxdj-bottom {
    width: 85%;
    height: 76px;
    margin-top: 10px;
    margin-left: 10%;
    display: flex;
    justify-content: space-around;
  }
  .zyfp-bottom-item {
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .ballimg {
    color: #fff;
    font-size: 21px;
    text-align: center;
    width: 70px;
    height: 70px;
    line-height: 70px;
    position: relative;
  }
  .balldata {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .ball-name {
    color: #ffffff;
    font-size: 14px;
  }
  .ball-num {
    color: rgba(57, 125, 255, 1);
    font-size: 24px;
  }
  .wxdj-wrap {
    width: 100%;
    height: 111px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wxdjimg-wrap {
    flex: 1;
    text-align: center;
  }
  .wxdj-lable {
    width: 85%;
    height: 30px;
    margin-left: 10%;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wxdjlable-wrap {
    flex: 1;
    text-align: center;
    color: rgba(121, 190, 255, 1);
    font-size: 14px;
  }
  .sjjc {
    width: 100%;
    height: 308px;
    margin-top: 16px;
    background: linear-gradient(-90deg,rgba(13, 29, 61, 1) ,rgba(0, 0, 0, 0.34));
  }
  #sjjcechart {
    width: 100%;
    height: 258px;
    margin-top: 18px;
  }
</style>
