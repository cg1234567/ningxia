<template>
  <div id="govCloud">
    <video src="@/assets/bg.mp4" type="video/mp4" autoplay muted loop="loop">
      <p>你的浏览器不支持video标签.</p>
    </video>
    <div class="zwytitle">中卫市人口基础信息</div>
    <div class="content">
      <div class="left">
        <div class="item">
          <div class="title">人口金字塔</div>
          <div id="rkjzt" class="itemcontent"></div>
        </div>
        <div class="item">
          <div class="title">人口自然增长率</div>
          <div id="rkzrzz" class="itemcontent"></div>
        </div>
        <div class="item">
          <div class="title">少数民族</div>
          <div id="ssmz" class="itemcontent"></div>
        </div>
      </div>
      <div class="mid">
        <div class="midtop">
          <div v-for="(item,index) in midlist" :key="index" class="mid-item">
            <div class="midtop-top">
              <img :src="item.img">
              <span>{{item.name}}</span>
            </div>
            <div class="midtop-bottom">
              <count :countto="item.num" :newcolor="item.color"></count>
              <span>{{item.dw}}</span>
            </div>
          </div>
        </div>
        <!-- <div class="midmap">
          <img src="@/assets/image/map.png">
        </div> -->
      </div>
      <div class="right">
        <div class="item" style="height: 320px">
          <div class="title">各区县人口</div>
          <div id="xzrk" class="itemcontent"></div>
        </div>
        <div class="item" style="height: 220px;">
          <div class="title">人口变动情况</div>
          <div class="itemcontent" id="rkbd">
            <div v-for="(item,index) in rkbdlist" :key="index" class="rkbditem">
              <div class="sideline">
                <div></div>
              </div>
              <div class="rkbdcontent">
                <span>{{item.name}}</span>
                <span>{{item.num}}</span>
              </div>
            </div>
            <div class="sideline">
              <div></div>
            </div>
          </div>
        </div>
        <div class="item" style="height: 360px;">
          <div class="title">社会保障</div>
          <div class="itemcontent">
            <div class="shbztop">
              <div v-for="(item,index) in shbztop" :key="index" class="top-item">
                <div class="topimg" :style="{backgroundImage:'url('+item.img+')'}" :class="{'topimg2':index==2}">
                  <span>{{item.num}}</span>
                </div>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="shbzbottom">
              <div v-for="(item,index) in shbzbottom" :key="index" class="bottom-item">
                <img :src="item.img">
                <span>
                  <span class="name">{{item.name}}</span>
                  <span class="num">{{item.num}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bgmap"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import count from './assets/count'
export default {
  name: 'HelloWorld',
  data() {
    return {
      rkjzt: null,
      rkzrzz: null,
      ssmz: null,
      xzrk: null,
      rkbdlist:[
        {
          name:'出生人口',
          num:7830
        },
        {
          name:'死亡人口',
          num:2589
        },
        {
          name:'迁入人口',
          num:8124
        },
        {
          name:'迁出人口',
          num:9826
        }
      ],
      shbzbottom:[
        {
          img:require('@/assets/image/people.png'),
          name:'城镇居民低保人数（人）',
          num:13634
        },
        {
          img:require('@/assets/image/people.png'),
          name:'城镇居民低保家庭数（户）',
          num:13634
        },
        {
          img:require('@/assets/image/people.png'),
          name:'城镇低保资金全年支出（万元）',
          num:13634
        }
      ],
      shbztop:[
        {
          img:require('@/assets/image/cbs.png'),
          num:1200000,
          name:'参保人数'
        },
        {
          img:require('@/assets/image/cbs.png'),
          num:56048,
          name:'未参保人数'
        },
        {
          img:require('@/assets/image/cbl.png'),
          num:'87%',
          name:'个人参保率'
        }
      ],
      midlist:[
        {
          img:require('@/assets/image/czrk.png'),
          name:'常住人口',
          num:1168400,
          color:'rgb(121, 252, 255)',
          dw:'人'
        },
        {
          img:require('@/assets/image/hjrk.png'),
          name:'户籍人口',
          num:1219100,
          color:'rgb(59, 234, 157)',
          dw:'人'
        },
        {
          img:require('@/assets/image/zhs.png'),
          name:'总户数',
          num:201979,
          color:'rgb(255, 238, 121)',
          dw:'户'
        },
      ]
    }
  },
  mounted() {
    this.rkjztinit()
    this.rkzrzzinit()
    this.ssmzinit()
    this.xzrkinit()
  },
  methods: {
    rkjztinit() {
      this.rkjzt = echarts.init(document.getElementById("rkjzt"))
      let dataarr = [
        { value: 131811, name: '0~17岁' },
        { value: 125470, name: '18~35岁' },
        { value: 155475, name: '35~60岁' },
        { value: 55502, name: '60岁以上' }
      ]
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        legend: {
          top: 10,
          data: dataarr,
          textStyle: {
            color: '#fff'
          }
        },

        series: [{
            name: '人口金字塔',
            type: 'funnel',
            width: '60%',
            height: '65%',
            left: '20%',
            top: 60,
            bottom: 60,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            sort: 'ascending',
            data: dataarr
          },

        ]
      };
      this.rkjzt.setOption(option)
      window.tools.loopShowTooltip(this.rkjzt, option, { loopSeries: true, interval: 6000 });
    },
    rkzrzzinit() {
      this.rkzrzz = echarts.init(document.getElementById("rkzrzz"))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#42a5f5', '#96b9d1', '#3bea9d'],
        legend: {
          data: ['出生率（求和）', '增长率（求和）', '死亡率（求和）'],
          textStyle: {
            color:'#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
             color:'#fff'   
            }
          },
          axisLabel: {
            color: '#fff'
          },
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
             color:'#fff'   
            }
          },
          axisLabel: {
            color: '#fff'
          },
          data: ['2018年', '2019年']
        },
        series: [{
            name: '出生率（求和）',
            type: 'bar',
            data: [16.141, 15.770]
          },
          {
            name: '增长率（求和）',
            type: 'bar',
            data: [11.56, 4.60]
          },
          {
            name: '死亡率（求和）',
            type: 'bar',
            data: [4.58, 11.17]
          }
        ]
      };
      this.rkzrzz.setOption(option)
      window.tools.loopShowTooltip(this.rkzrzz, option, { loopSeries: true, interval: 6000 });
    },
    ssmzinit() {
      this.ssmz = echarts.init(document.getElementById("ssmz"))
      console.log(this.ssmz)
      let option = {
        color: ['rgba(80, 227, 194, 1)', 'rgba(210, 165, 23, 1)', 'rgba(249, 123, 124, 1)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}人<br>占比： ({d}%)'
        },
        series: [{
          name: '少数民族',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '75%'],
          data: [
            { value: 403800, name: '回族' },
            { value: 747100, name: '汉族' },
            { value: 2900, name: '其他民族' },
          ],
          label: {
            color: '#ddd',
            formatter: '{a|{b}}' + '{b|{d}%}',
            textStyle: {
              rich: {
                a: {
                  fontSize: 16,
                  color: '#fff',
                  align: 'center',
                  padding: [0, 15, 0, 0]
                },
                b: {
                  fontSize: 20,
                  color: 'rgba(121, 252, 255, 1)',
                  align: 'center',
                  padding: [0, 15, 0, 0],
                  lineHeight: 25
                }
              }
            },
          },
          labelLine: {
            lineStyle: {
              color: '#ddd'
            },
            smooth: 0.2,
            length: 5,
            length2: 20
          },
        }]
      }
      this.ssmz.setOption(option)
      window.tools.loopShowTooltip(this.ssmz, option, { loopSeries: true, interval: 6000 });
    },
    xzrkinit() {
      this.xzrk = echarts.init(document.getElementById("xzrk"))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter:'{a}<br>{b}:{c}人'
        },
        color:['#ff9300'],
        grid: {
          left: '3%',
          right: '4%',
          top: '5%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
             color:'#fff'   
            }
          },
          axisLabel: {
            color: '#fff',
            interval:0,
            rotate:45
          },
          data: ['沙坡头区', '中宁县','海原县'],
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
             color:'#fff'   
            }
          },
          axisLabel: {
            color: '#fff'
          },
        },
        series: [{
            name: '各乡镇人口',
            type: 'bar',
            barWidth:20,
            data: [400000,340000,460000]
          },
        ]
      };
      this.xzrk.setOption(option)
      window.tools.loopShowTooltip(this.xzrk, option, { loopSeries: true, interval: 6000 });
    },
  },
  components: {
    count
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#govCloud {
  position: absolute;
  width: 1920px;
  height: 1080px;
  left: 0;
  top: 0;

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
    font-size: 30px;
    letter-spacing: 3px;
  }

  .content {
    position: absolute;
    left: 0;
    top: 87px;
    display: flex;
    justify-content: space-between;
    z-index: 1;

    .left,
    .right {
      width: 514px;
      height: 920px;

      .item {
        width: 100%;
        height: 300px;
        margin-top: 5px;
        background: linear-gradient(90deg, rgba(13, 61, 61, 1) 0%, rgba(0, 0, 0, 0.34) 100%);
        position:relative;

        .title {
          width: 131px;
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

        .itemcontent {
          width: 100%;
          height: calc(100% - 48px);
          margin-top: 18px;
          
          .shbztop {
            width: 90%;
            padding-left:5%;
            height: 190px;
            display: flex;
            align-items: center;
            
            .top-item {
              width: 33%;
              height: 80%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;

              .topimg {
                width: 130px;
                height: 130px;
                background-size: 100% 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                &>span {
                  color: rgba(250,250,250,2);
                  font-size: 24px;
                }
              }

              .topimg2 {
                width: 140px;
                height: 140px;

                &>span {
                  color: rgba(121, 252, 255);
                  font-size: 20px;
                }
              }

              &>span {
                color: rgba(250,250,250,1);
                font-size: 20px;
              }
            }
          }

          .shbzbottom {
            width: 90%;
            padding-left:5%;
            height: 120px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .bottom-item {
              width: 33%;
              height: 100%;
              display: flex;
              justify-content: space-around;
              align-items: center;

              &>img {
                width: 60px;
                height: 60px;
              }

              &>span {
                display: inline-block;
                width: calc(100% - 68px);
                height: 60px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                &>.name {
                  color: #fff;
                  font-size: 12px;
                }

                &>.num {
                  color: rgba(121, 252, 255,1);
                  font-size: 18px;
                }
              }
            }
          }
        }

        #rkbd {
          //人口变动情况
          width: 90%;
          padding-left:5%;
          display: flex;
          justify-content: space-around;
          align-items:center;

          .rkbditem {
            width: 25%;
            height: calc(100% - 48px);
            display: flex;
            align-items: center;

            .rkbdcontent {
              width: calc(100% - 6px);
              height: 100%;
              display: flex;
              justify-content: space-around;
              flex-direction: column;
              text-align: center;

              &>span {
                color: #fff;
                font-size: 18px;
              }
            }
          }

          .sideline {
            width:6px;
            height:100px;
            background:rgba(77,168,180,0.63);
            display: flex;
            align-items:center;

            &>div {
              width:100%;
              height:40px;
              background:rgba(121,252,255,1);
            }
          }
        }
      }
    }

    .rigt>.item {
      background: linear-gradient(-90deg, rgba(13, 61, 61, 1) 0%, rgba(0, 0, 0, 0.34) 100%);
    }

    .mid {
      width: 890px;
      height: 920px;

      .midtop {
        width: 86%;
        margin-left: 6%;
        height: 170px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .mid-item {
          width: 30%;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .midtop-top {
            width: 100%;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            &>img {
              width: 70px;
              height: 70px;
            }

            &>span {
              color: rgba(221, 225, 227,1);
              font-size: 25px;
            }
          }

          .midtop-bottom {
            padding-left: 15%;
            width: 70%;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: space-around;

            &>span {
              color: rgb(250, 250, 250);
              font-size: 20px;
            }
          }
        }
      }
    }
  }

  .bgmap {
    width: 928px;
    height: 850px;
    background-image: url('assets/image/map.png');
    background-size:100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 0;
  }
}
</style>