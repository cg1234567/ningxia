<template>
  <div id="aqcloud">
    <div class="content">
      <div class="left">
        <div class="leftitem">
          <div class="title">小区类型</div>
          <div id="xqlxechart"></div>
        </div>
        <div class="leftitem">
          <div class="title">小区平安指数</div>
          <div class="xqpa">
            <div v-for="(item,index) in xqpalist" :key="index" class="xqpa-item">
              <span class="paindex" :style="{'color':index<3?'rgba(245, 198, 80, 1)':''}">{{index+1}}</span>
              <span class="xqpa-name">{{item.name}}</span>
              <span class="xqpa-num">{{item.num}}分</span>
            </div>
          </div>
        </div>
        <div class="leftitem">
          <div class="title">汽车分析</div>
          <div class="qcfxtitle">
            <span>汽车总量：</span>
            <span>36849辆</span>
          </div>
          <div id="qcfxechart"></div>
        </div>
      </div>
      <div class="mid">
        <div class="mid-top">
          <div v-for="(item,index) in midtoplist" :key="index" class="mid-item">
            <!-- <span class="mid-num">{{item.num}}</span> -->
            <count
                :countto="item.num"
                :newcolor="'rgba(80, 227, 194, 1)'"></count>
            <span class="mid-name">{{item.name}}</span>
            <!-- <div class="thcontent" v-if="index==2">
              <div v-for="(item,index) in thlist" :key="index" class="th-item">
              <span class="th-name">{{item.name}}：</span>
              <span class="th-name" :style="{'color':item.num>0?'rgba(255, 124, 124, 1)':''}">{{item.num}}%</span>
            </div>
            </div> -->
          </div>
        </div>
        <div class="mid-input">
          <div class="search-lable">
            <span class="lable1">搜索:</span>
            <div class="circle"></div>
            <span class="lable2">小区</span>
          </div>
          <div class="searchwrap">
            <input
              v-model="xqmc"
              type="text"
              placeholder="输入文本..."
              id="search"
              @keyup.enter="search"
            />
            <button @click="search">查询</button>
          </div>
        </div>
        <!-- <div class="mid-gk">
          <div class="title">{{itemsel.name}}</div>
          <div class="xqgktop">
            <img :src="itemsel.img" style="width: 181px;height: 131px;" />
            <div class="xqgkcontent">
              <div v-for="(item,index) in itemsel.list" :key="index" class="xqgk-item">
                <img :src="item.img" style="width: 24px;height: 24px;" />
                <span class="item-lable">{{item.lable}}</span>
                <span class="item-num">{{item.num}}</span>
              </div>
            </div>
          </div>
          <div class="xqgkbottom">
            {{itemsel.intro}}
          </div>
        </div> -->
        <div class="mid-video" v-if="isvideo">
          <div class="close" @click="closevideo">x</div>
          <video src="@/assets/xiaoqu.mp4" type="video/mp4"
              autoplay muted  loop="loop" style="width: 100%;
              height: 100%">
           <p>你的浏览器不支持video标签.</p>
          </video>
        </div>
      </div>
      <div class="right">
        <!-- <div class="rightitem">
          <div class="title">小区涉疫事件</div>
          <div id="xqsyechart"></div>
          <div class="xqsycontent">
            <div v-for="(item,index) in xqsylist" :key="index" class="xqsy-item">
              <span class="xqsy-name" :style="{'color':index==1?'rgba(247, 212, 122, 0.84)':''}">{{item.name}}：</span>
              <span class="xqsy-num">{{item.num}}人</span>
            </div>
          </div>
        </div> -->
        <div class="rightitem">
          <div class="title">人口分析</div>
          <div id="rkfxechart"></div>
        </div>
        <div class="rightitem">
          <div class="title">男女比例</div>
          <div id="nvblechart"></div>
        </div>
        <div class="rightitem">
          <div class="title">民族比例</div>
          <div id="mzblechart"></div>
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
  data () {
    return {
      isvideo:false,
      itemsel:{
        name:'东海园区',
        img:require('@/assets/image/dhyq.png'),
            list:[
              {
                img:require('@/assets/image/ry.png'),
                lable:'人员：',
                num:13565
              },
              {
                img:require('@/assets/image/cl.png'),
                lable:'车辆：',
                num:1698
              },
              {
                img:require('@/assets/image/cz.png'),
                lable:'车站：',
                num:6
              },
              {
                img:require('@/assets/image/cs.png'),
                lable:'超市：',
                num:46
              }
              ],
            intro:'东海园区坐落于新区街道，边上有警民路，西关路，西城路，西关社区,物产丰富,茂林成荫,友好好客,空气清新'    
      },
      xqpalist:[
        {name:'宾河城市花园',num:99},
        {name:'红宝家园',num:98.5},
        {name:'金河小区',num:98},
        {name:'利民小区',num:97.5},
        {name:'平安家园',num:97},
      ],
      midtoplist:[
        {num:220,name:'小区总数（个）'},
        {num:1168400,name:'常住人口（人）'},
        {num:1219100,name:'户籍人口（人）'},
      ],
      thlist:[{name:'同比',num:12},{name:'环比',num:-12}],
      xqsylist:[{name:'确诊案例',num:2},{name:'疑似案例',num:3}],
      xqlxechart:null,
      qcfxechart:null,
      // xqsyechart:null,
      rkfxechart:null,
      nvblechart:null,
      mzblechart:null,
      xqmc:'',
      shequlist:[
        {
          name:'宾河城市花园',longitude:'105.181997',latitude:'37.522543',sel:false,
          message:{
            name:'宾河城市花园',
            img:require('@/assets/image/cshy.png'),
            list:[
              {
                img:require('@/assets/image/ry.png'),
                lable:'人员：',
                num:13565
              },
              {
                img:require('@/assets/image/cl.png'),
                lable:'车辆：',
                num:1698
              },
              {
                img:require('@/assets/image/cz.png'),
                lable:'车站：',
                num:6
              },
              {
                img:require('@/assets/image/cs.png'),
                lable:'超市：',
                num:46
              }
              ],
            intro:'坐落于中卫市沙坡头区鼓楼西街，相邻大河医院，小区内还配有高标准的私人休闲会所、特色幼儿园、学校、农贸市场等设施。 周围的居家氛围浓郁，教育文化、医疗保健、银行金融证券、美食餐饮、休闲娱乐、大型购物百货、商业街、农贸市场，配套成熟完备，应有尽有' },
          area:[
                [106.275068,36.018618],
                [106.275302,36.018311],
                [106.274996,36.017946],
                [106.275176,36.017392],
                [106.278482,36.016939],
                [106.279973,36.019274],
                [106.283566,36.022223],
                [106.280728,36.023624],
                [106.276937,36.020486],
                [106.275104,36.018676]
              ]
        },
        {
          name:'滨河首府',longitude:'105.213578',latitude:'37.495677',sel:false,
          message:{
            name:'滨河首府',
            img:require('@/assets/image/whjy.png'),
            list:[
              {
                img:require('@/assets/image/ry.png'),
                lable:'人员：',
                num:1116
              },
              {
                img:require('@/assets/image/cl.png'),
                lable:'车辆：',
                num:654
              },
              {
                img:require('@/assets/image/cz.png'),
                lable:'车站：',
                num:2
              },
              {
                img:require('@/assets/image/cs.png'),
                lable:'超市：',
                num:11
              }
              ],
            intro:'滨河首府项目的东边是五星级的卧龙酒店，黄河大桥（今年年底双向4车道建成通车），北边是文化 区，这里是中卫市第九 ，中卫七中，中卫一中，小区内有一所幼儿园，正好满足孩子从幼儿园到高中的就近读书。西边是美丽的香山公园，上千亩绿地，绿衣翠堤，数百亩水面，碧波荡漾，南边是中卫城市的新地标，是中卫市 投入巨资打造的“大河之舞”主题文化公园' },
            area:[
                [106.291907,36.022814],
                [106.294602,36.022624],
                [106.296524,36.022215],
                [106.297243,36.024215],
                [106.295159,36.024565],
                [106.292266,36.024711],
                [106.291889,36.022974]
              ]
        },
        {
          name:'中卫恒大都市广场',longitude:'105.221638',latitude:'37.501017',sel:false,
          message:{
            name:'中卫恒大都市广场',
            img:require('@/assets/image/yzf.png'),
            list:[
              {
                img:require('@/assets/image/ry.png'),
                lable:'人员：',
                num:615
              },
              {
                img:require('@/assets/image/cl.png'),
                lable:'车辆：',
                num:89
              },
              {
                img:require('@/assets/image/cz.png'),
                lable:'车站：',
                num:2
              },
              {
                img:require('@/assets/image/cs.png'),
                lable:'超市：',
                num:14
              }
              ],
            intro:'中卫恒大都市广场是世界500强恒大集团在中卫市匠心打造的建筑面积约30万㎡的人文社区，位于中卫市迎宾大道与平安东路交会处，集风情园林、名仕会所、星级影城、双语幼儿园、特色商业街等于一体。属中卫市高端精品社区，开启中卫市品质人居新篇章' },
            area:[
                [106.292949,36.00956],
                [106.296201,36.008961],
                [106.299291,36.008421],
                [106.300117,36.010553],
                [106.297081,36.011151],
                [106.293596,36.011779],
                [106.292931,36.00956]
              ]
        },
      ]
    }
  },
  mixins: [bmapMixin],
  mounted(){
      this.initMap()
      this.xqlxinit()
      this.qcfxinit()
      // this.xqsyinit()
      this.rkfxinit()
      this.nvblinit()
      this.mzblinit()
      this.setshequ(this.shequlist,this.change,this.openvideo)
  },
  methods: {
      closevideo () {
        this.isvideo = false
      },
      search() {
        let num = 0
        let _this = this
        this.shequlist.forEach((item,index)=>{
          if(item.name.indexOf(_this.xqmc)>=0){
            num = index
          }
        })
        this.change(num)
      },
      xqlxinit() {
        this.xqlxechart = this.$echarts.init(document.getElementById("xqlxechart"))
        let dataarr = [
                        {value: 245, name: '混合式'},
                        {value: 58, name: '封闭式'}
                    ]
        let option = {
            color:['rgba(80, 227, 194, 1)','rgba(210, 165, 23, 1)','rgba(249, 123, 124, 1)'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend:{
              orient: 'vertical',
              top:'30%',
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
                  }
                  return '{a|'+value +'}'+' '+'{b|'+ num+'}'
              },
              textStyle:{
                  rich:{
                      a:{
                          fontSize:16,
                          verticalAlign:'top',
                          align:'center',
                          color:'#fff',
                          // padding:[0,15,0,0]
                      },
                      b:{
                          fontSize:14,
                          align:'center',
                          color:'#79FCFF',
                      }
                  }
              },
              data: dataarr

            },
            series: [
                {
                    name: '小区类型',
                    type: 'pie',
                    center: ['40%', '50%'],
                    radius: ['55%', '70%'],
                    data: dataarr,
                    label: {
                        color: '#ddd',
                        formatter: '{d}%',
                        textStyle:{
                            color:'#fff',
                            fontSize:16
                        },
                    },
                    labelLine: {
                        lineStyle: {
                            color: '#ddd'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20,
                    },
                }
            ]
        }
        this.xqlxechart.setOption(option)
        window.tools.loopShowTooltip(this.xqlxechart, option, {loopSeries: true,interval:6000});
      },
      qcfxinit() {
        this.qcfxechart = this.$echarts.init(document.getElementById("qcfxechart"))
        let dataarr = [
                        {value: 3304, name: '外地'},
                        {value: 33545, name: '本地'},
                        {value: 3326, name: '出租车'}
                    ]
        let option = {
            color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend:{
              orient: 'vertical',
              top:'30%',
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
                  }
                  return '{a|'+value +'}'+' '+'{b|'+ num+'}'
              },
              textStyle:{
                  rich:{
                      a:{
                          fontSize:16,
                          verticalAlign:'top',
                          align:'center',
                          color:'#fff',
                          // padding:[0,15,0,0]
                      },
                      b:{
                          fontSize:14,
                          align:'center',
                          color:'#79FCFF',
                      }
                  }
              },
              data: dataarr

            },
            series: [
                {
                    name: '汽车分析',
                    type: 'pie',
                    center: ['40%', '50%'],
                    radius: ['0', '70%'],
                    data: dataarr,
                    label: {
                        position:'inside',
                        formatter:'{d}%'
                    },
                    labelLine: {
                        show:false
                    },
                }
            ]
        }
        this.qcfxechart.setOption(option);
        window.tools.loopShowTooltip(this.qcfxechart, option, {loopSeries: true,interval:6000});
      },
      // xqsyinit() {
      //   this.xqsyechart = this.$echarts.init(document.getElementById("xqsyechart"))
      //   let dataarr = [
      //                   {value: 136.44, name: '原州区'},
      //                   {value: 64.92, name: '西吉县'},
      //                   {value: 28.08, name: '隆德县'},
      //                   {value: 18.44, name: '泾源县'},
      //                   {value: 55.32, name: '彭阳县'},
      //               ]
      //   let option = {
      //       color:['rgba(64, 136, 200, 1)','rgba(198, 92, 67, 1)','rgba(19, 216, 186, 1)','rgba(82, 169, 224, 1)'],
      //       tooltip: {
      //           trigger: 'item',
      //           formatter: '{a} <br/>{b} : {c} 亿元({d}%)'
      //       },
      //       legend:{
      //         orient: 'vertical',
      //         top:'20%',
      //         right: '10%',
      //         icon:'circle',
      //         data: dataarr,
      //         textStyle:{
      //           color:'#fff'
      //         }
      //       },
      //       series: [
      //           {
      //               name: 'GDP生产总值',
      //               type: 'pie',
      //               center: ['50%', '50%'],
      //               radius: ['0', '60%'],
      //               data: dataarr,
      //               label: {
      //                   position:'inside',
      //                   formatter:'{c}'
      //               },
      //               labelLine: {
      //                   show:false
      //               },
      //           }
      //       ]
      //   }
      //   this.xqsyechart.setOption(option);
      //   window.tools.loopShowTooltip(this.xqsyechart, option, {loopSeries: true,interval:6000});
      // },
      rkfxinit() {
        this.rkfxechart = this.$echarts.init(document.getElementById("rkfxechart"))
        let allpeople = 468258
        let bdpeople = 426178
        let wdpeople = 42080
        let placeHolderStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                color: "rgba(0,0,0,0)",
                borderWidth: 0
            },
            emphasis: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0
            }
        };
        let dataStyle = {
            normal: {
                formatter: '{d}%',
                position: 'center',
                show: true,
                textStyle: {
                    fontSize: '28',
                    fontWeight: 'normal',
                    color: '#fff'
                }
            }
        };
        let option = {
            title: [
            {
                text: '本地人口',
                left: '29.8%',
                top: '80%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '16',
                    color: '#fff',
                    textAlign: 'center',
                },
            }, {
                text: '外地人口',
                left: '70%',
                top: '80%',
                textAlign: 'center',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    fontSize: '16',
                    textAlign: 'center',
                },
            }],
            series: [{
                    type: 'pie',
                    hoverAnimation: false, //鼠标经过的特效
                    radius: ['50%', '60%'],
                    center: ['30%', '50%'],
                    startAngle: 255,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: bdpeople,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#99da69'
                                    }, {
                                        offset: 1,
                                        color: '#01babc'
                                    }]),
                                }
                            },
                            label: dataStyle,
                        }, {
                            value: wdpeople,
                            itemStyle: placeHolderStyle,
                        },

                    ]
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['50%', '60%'],
                    center: ['70%', '50%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: wdpeople,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#9f3edd'
                                    }, {
                                        offset: 1,
                                        color: '#4897f6'
                                    }]),
                                }
                            },
                            label: dataStyle,
                        }, {
                            value: bdpeople,
                            itemStyle: placeHolderStyle,
                        },

                    ]
                },
                
                //外圈的边框
                {
                    // name: '总人数',
                    type: 'pie',
                    hoverAnimation: false, //鼠标经过的特效
                    radius: ['61%', '62%'],
                    center: ['30%', '50%'],
                    startAngle: 255,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: 95,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#01babc'
                                    }, {
                                        offset: 1,
                                        color: '#99da69'
                                    }]),
                                }
                            },
                        }, {
                            value: 5,
                            itemStyle: placeHolderStyle,
                        },

                    ]
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['61%', '62%'],
                    center: ['70%', '50%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: 75,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#4897f6'
                                    }, {
                                        offset: 1,
                                        color: '#9f3edd'
                                    }]),
                                }
                            },
                        }, {
                            value: 25,
                            itemStyle: placeHolderStyle,
                        },

                    ]
                },
            ]
        };
        this.rkfxechart.setOption(option);
        // window.tools.loopShowTooltip(this.rkfxechart, option, {loopSeries: true,interval:6000});
      },
      nvblinit() {
        this.nvblechart = echarts.init(document.getElementById("nvblechart"))
        let symbols = [
            'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
            'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z',
            'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z'
        ];
        let bodyMax = 468258; //指定图形界限的值
        let labelSetting = {
            normal: {
                show: true,
                position: 'bottom',
                offset: [0, 10],
                formatter: function(param) {
                    return (param.value / bodyMax * 100).toFixed(0) + '%';
                },
                textStyle: {
                    fontSize: 18,
                    fontFamily: 'Arial',
                    color: '#686868'
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
            grid: {
                // left: '20%',
                // right: '20%',
                top: '20%',
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
                            value: 236867,
                            symbol: symbols[0],
                            itemStyle: {
                                normal: {
                                    color: 'rgba(105,204,230)' //单独控制颜色
                                }
                            },
                        },
                        {

                        },
                        {
                            value: 231391,
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
                            symbol: symbols[0]
                        },
                        {
                            // 设置中间冒号
                            itemStyle: {
                                normal: {
                                    color: '#1DA1F2' //单独控制颜色
                                }
                            },
                            value: 100,
                            symbol: symbols[2],
                            symbolSize: [8, '18%'],
                            symbolOffset: [0, '-200%']
                        },
                        {
                            itemStyle: {
                                normal: {
                                    color: 'rgba(255,130,130,0.40)' //单独控制颜色
                                }
                            },
                            value: 468258,
                            symbol: symbols[1]
                        }
                    ]
                }
            ]
        }
        this.nvblechart.setOption(option)
        // window.tools.loopShowTooltip(this.nvblechart, option, {loopSeries: true,interval:6000});
      },
      mzblinit() {
        this.mzblechart = echarts.init(document.getElementById("mzblechart"))
        var img = 'data:image/png;base64,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';

        let trafficWay = [{
            name: '回族',
            value: 403800
        },{
            name: '汉族',
            value: 747100
        },{
            name: '其他民族',
            value: 2900
        }];

        let data = [];
        let color=['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
        for (var i = 0; i < trafficWay.length; i++) {
            data.push({
                value: trafficWay[i].value,
                name: trafficWay[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 20,
                        borderColor:color[i],
                        shadowColor: color[i]
                    }
                }
            }, {
                value: 2,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
        }
            });
        }
       let seriesOption = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: ['70%', '73%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < trafficWay.length; i++) {
                                total += trafficWay[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(2);
                            if(params.name !== '') {
                                return '民族比例：' + params.name + '\n' + '\n' + '占百分比：' + percent + '%';
                            }else {
                                return '';
                            }
                        },
                    },
                    labelLine: {
                        length:10,
                        length2:10,
                        show: true,
                        color:'#00ffff'
                    }
                }
            },
            data: data
        }];
        let option = {
            color : color,
            title: {
                text: '民族比例',
                top: '48%',
                textAlign: "center",
                left: "49%",
                textStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: '400'
                }
            },
            graphic: {
            elements: [{
                type: "image",
                z: 3,
                style: {
                    image: img,
                    width: 150,
                    height: 150
                },
                left: 'center',
                top:  'center',
                position: [100, 100]
            }]
            },
            tooltip: {
                show: false
            },
            legend: {
                icon: "circle",
                // orient: 'horizontal',
                data:['回族','汉族','其他民族'],
                // right: 340,
                left:30,
                bottom: 10,
                // align: 'right',
                textStyle: {
                  color: "#fff"
                },
                itemGap: 20
            },
            toolbox: {
                show: false
            },
            series: seriesOption
        }
        this.mzblechart.setOption(option)
        // window.tools.loopShowTooltip(this.mzblechart, option, {loopSeries: true,interval:6000});
      },
      openvideo() {
        this.isvideo = true
      },
      change(item) {
        this.shequlist.forEach(item=>item.sel=false)
        this.itemsel = this.shequlist[item].message
        this.shequlist[item].sel = true
        this.setshequ(this.shequlist,this.change,this.openvideo)
      }
  },
  components: {
    count
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
  .BMapLabel {
    padding: 0 ;
    border: none !important;
    background-color: transparent !important;
    cursor: pointer;
  }
  .BMap_bubble_pop {
    background:transparent;
    background-color: transparent !important;
    width: 525px !important;
  }
  .BMap_bubble_pop > img {
    display: none;
  }
  .BMap_bubble_top {
    height: 0 !important;
  }
  .BMap_bubble_title {
    height: 0 !important;
  }
  .BMap_bubble_buttons {
    background-color: transparent !important;
  }
  .shadow img {
    display: none
  }
  .shadow div {
    display: none;
  }
  .anchorBL{
    display:none;
  }
  .selqy {
    width: 250px;
    height: 290px;
    background-image: url('assets/image/qy.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
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
  .mid-gk {
    width: 514px;
    height: 290px;
    background:linear-gradient(90deg,rgba(6,30,39,1) 0%,rgba(45,138,170,0) 100%);
  }
  .xqgktop {
    width: 100%;
    height: 160px;
    margin-top: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .xqgkcontent {
    width: 170px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .xqgk-item {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .item-lable {
    color: rgba(81, 210, 181, 1);
    font-size: 12px;
    flex:1;
    text-align: center;
  }
  .item-num {
    color: rgba(203, 255, 243, 1);
    font-size: 12px;
    flex: 1;
    text-align: center;
  }
  .xqgkbottom {
    width: 430px;
    padding-left: 36px;
    height: 84px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 14px;
    letter-spacing: 2px;
  }
    .title {
    width: 160px;
    height: 30px;
    background: linear-gradient(270deg,rgba(151,228,236,0),#5ec5d4);
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
<style scoped>
  #aqcloud {
    position: relative;
    width: 1920px;
    height: 1080px;
    left: 0;
    top: 0;
    background-image: url('assets/image/background.png');
  }
  .content {
    position: absolute;
    left: 0;
    top: 120px;
    width: 100%;
    z-index: 1;
    display: flex;
    pointer-events: none;
    justify-content: space-between;
  }
  .left,.right {
    width: 514px;
    height: 100%;
    pointer-events: auto;
  }
  .leftitem {
    width: 100%;
    height: 300px;
    margin-bottom: 6px;
    background:linear-gradient(90deg,rgba(6,30,39,1) 0%,rgba(45,138,170,0) 100%);
  }
  #xqlxechart {
    width: 100%;
    height: 244px;
    margin-top: 18px;
  }
  .xqpa {
    width: 370px;
    height: 210px;
    margin-top: 25px;
    padding-left: 40px;
    overflow: auto;
  }
  .xqpa::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
    }
  .xqpa::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
       -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #535353;
      background-image: url('assets/image/scrollbar.png');
      background-size: 100% 100%;
  }
  .xqpa::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: rgba(46, 141, 173, 1);
  }
  .xqpa-item {
    width: 270px;
    height: 30px;
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .xqpa-item:nth-of-type(odd) {
    background-image: url('assets/image/odd.png');
    background-size: 100% 100%;
  }
  .xqpa-item:nth-of-type(even) {
    background-image: url('assets/image/even.png');
    background-size: 100% 100%;
  }
  .paindex {
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
  }
  .xqpa-name {
    color: rgba(191, 241, 255, 1);
    font-size: 14px;
  }
  .xqpa-num {
    color: rgba(54, 230, 138, 1);
    font-size: 14px;
  }
  .qcfxtitle {
    width: 300px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 20px;
    padding-left: 30px;
    margin-top: 30px;
  }
  #qcfxechart {
    width: 100%;
    height: 202px;
  }
  .rightitem {
    width: 100%;
    height: 300px;
    background:linear-gradient(-90deg,rgba(6,30,39,1) 0%,rgba(45,138,170,0) 100%);
    margin-bottom: 5px;
    position: relative;
  }
  #xqsyechart,#rkfxechart,#nvblechart,#mzblechart {
    width: 100%;
    height: 244px;
    margin-top: 18px;
  }
  .xqsycontent {
    width: 150px;
    height: 171px;
    position: absolute;
    top: 50px;
    left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .xqsy-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  .xqsy-name {
    color:rgba(255, 120, 120, 0.9);
    font-size: 12px;
    margin-bottom: 5px;
  }
  .xqsy-num {
    color: rgba(255, 255, 255, 1);
    font-size: 21px;
  }
  .mid {
    width: 892px;
    height: 100%;
    /*pointer-events: auto;*/
    position: relative;
  }
  .mid-top {
    width: 100%;
    height: 75px;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .mid-item {
    width:235px;
    height:74px;
    padding-left: 10px;
    background:rgba(0,24,48,0.52);
    box-shadow:0px 8px 6px 0px rgba(0,49,38,1);
    border-radius:4px;
    border:1px solid;
    border-image:linear-gradient(90deg, rgba(35,231,241,0.54), rgba(50,150,245,0.41), rgba(60,149,248,0), rgba(89,255,255,0.63)) 1 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
  .mid-num {
    color: rgba(80, 227, 194, 1);
    font-size: 34px;
  }
  .mid-name {
    color: rgba(255,255,255,1);
    font-size: 18px;
  }
  .thcontent {
    width: 90px;
    height: 75px;
    position: absolute;
    top: 0;
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .th-item {
    display: flex;
    justify-content: space-around;
  }
  .th-name {
    color: rgba(255, 255, 255, 1);
    font-size: 15px;
  }
  .mid-input {
    width: 90%;
    height: 100px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .search-lable {
    display: flex;
    align-items: center;
  }
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
    margin: 0 20px;
  }
  .searchwrap {
    margin-top: 2vh;
    pointer-events: auto;
  }
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
/*  .mid-gk {
    width: 514px;
    height: 244px;
    background:linear-gradient(90deg,rgba(6,30,39,1) 0%,rgba(45,138,170,0) 100%);
  }
  .xqgktop {
    width: 100%;
    height: 160px;
    margin-top: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .xqgkcontent {
    width: 170px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .xqgk-item {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .item-lable {
    color: rgba(81, 210, 181, 1);
    font-size: 12px;
  }
  .item-num {
    color: rgba(203, 255, 243, 1);
    font-size: 12px;
  }
  .xqgkbottom {
    width: 430px;
    padding-left: 36px;
    height: 84px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 14px;
    letter-spacing: 2px;
  }*/
  .mid-video {
    width: 700px;
    height: 400px;
    position: absolute;
    top: 220px;
    right: 100px;
    pointer-events: auto;
  }
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
  #map {
    width: 100%;
    height: calc(100% - 60px);
    top: 60px;
    left: 0;
    z-index: 0;
    position: absolute;
  }
  #map > .shequicon {
    width: 38px;
    height: 38px;
    background-image: url('assets/image/xqns.png');
    background-size: 100% 100%;
    color: #fff
  }
</style>
