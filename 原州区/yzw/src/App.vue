<template>
  <div id="govCloud">
    <video src="@/assets/bg.mp4" type="video/mp4" autoplay muted loop="loop">
      <p>你的浏览器不支持video标签.</p>
    </video>
    <div class="zwytitle">政务云</div>
    <div class="content">
      <div class="left">
        <div class="sydw">
          <div class="title">上云单位</div>
          <canvas id="syechart"></canvas>
          <div class="leftlable">
            <div class="leftlable-name">区级</div>
            <div class="leftlable-num">97</div>
          </div>
          <div class="rightlable">
            <div class="rightlable-name">市县级</div>
            <div class="rightlable-num">208</div>
          </div>
          <div class="syimg">
            <div class="synum">305</div>
            <div class="syname">总量（家）</div>
          </div>
        </div>
        <div class="zyfp">
          <div class="title">云资源分配情况</div>
          <div class="zyfp-top">
            <div class="side-line"></div>
            <div v-for="(item,index) in yzylist" :key="index" class="yzy-item">
              <div class="yzy-item-top">
                <img :src="item.img" style="width: 58px;height: 58px" />
                <div class="yzy-item-content">
                  <span class="yzy-name">{{item.name}}</span>
                  <div class="yzy-num">
                    {{item.lable}}
                    <span style="font-size: 24px">{{item.num}}</span>
                    <span v-show="index==1">GB</span>
                  </div>
                </div>
              </div>
              <div class="yzy-item-mid">
                <div class="used"></div>
                <div class="rest" :class="{'restsjk':index==1}"></div>
              </div>
              <div class="yzy-item-bottom">
                <div>{{item.usedlable}}{{item.used}}</div>
                <div :style="{'color':index==1?'#E85D5E':'#E1C71F'}">剩余:{{item.rest}}</div>
              </div>
            </div>
            <div class="side-line"></div>
          </div>
          <div class="zyfp-mid">
            <div id="zyechart"></div>
            <div class="zyimg"></div>
          </div>
          <div class="zyfp-bottom">
            <div v-for="(item,index) in balllist" :key="index" class="zyfp-bottom-item">
              <div class="ballimg" :id="'ballechart'+index"></div>
              <div class="balldata">
                <div class="ball-name">{{item.name}}</div>
                <div class="ball-num" :style="{'color':item.color}">{{item.num}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="right-top-left">
            <img src="@/assets/image/map1.png" style="margin-left: 120px;margin-top: 100px;width: 600px;height: 660px">
            <div class="midfwdiv">
              <div v-for="(item,index) in midfwlist" :key="index" class="midfw-item">
                <!-- <div class="midfw-num">{{item.num}}</div> -->
                <count :countto="item.num" :newcolor="'rgba(80, 227, 194, 1)'">
                </count>
                <div class="midfw-name">{{item.name}}</div>
              </div>
            </div>
            <!-- <div class="jddiv">
              <div v-for="(item,index) in jdlist" :key="index" class="jditem">
                <div class="jdsj">
                  <span>{{item.name}}</span>
                  <span>{{item.num}}</span>
                </div>
                <div class="jdicon"></div>
              </div>
            </div>
 -->
          </div>
          <div class="right-top-right">
            <div class="yscz">
              <div class="title">云上承载系统</div>
              <canvas id="ysechart"></canvas>
              <div class="leftlable">
                <div class="leftlable-name">市县级</div>
                <div class="leftlable-num">292</div>
              </div>
              <div class="rightlable">
                <div class="rightlable-name">区级</div>
                <div class="rightlable-num">690</div>
              </div>
              <div class="syimg">
                <div class="synum">982</div>
                <div class="syname">总量（家）</div>
              </div>
            </div>
            <div class="fwtop">
              <div class="title" style="width: 180px">全国访问量TOP6省份</div>
              <div id="fwechart"></div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="fwdata">
            <div class="title">访问数据排行</div>
            <div class="table-title">
              <div v-for="(item,index) in tableTitle" :key="index" class="table-title-item">{{item}}</div>
            </div>
            <div class="tablecontent">
              <div v-for="(item,index) in datalist" :key="index" class="table-item">
                <div class="item-index">{{'0'+(index+1)}}</div>
                <div class="item-name">{{item.name}}</div>
                <div class="item-data">
                  <div v-for="(item1,index) in item.arr" :key="index" class="item-data-item">{{item1}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
import count from './assets/count'
export default {
  name: 'HelloWorld',
  data() {
    return {
      yzylist: [
        { img: require('@/assets/image/yzj.png'), name: '云主机分配占比', lable: '标配:', usedlable: '已创建:', num: 6550, used: '5940', rest: '610' },
        { img: require('@/assets/image/ysjk.png'), name: '云数据库分配占比', lable: '合同内总量:', usedlable: '已开通总量:', num: 600000, used: '558135GB', rest: '41865GB', }
      ],
      balllist: [
        { pre: '60%', img: require('@/assets/image/ball1.png'), name: 'CPU:', num: '35,000核', color: '#79FCFF' },
        { pre: '30%', img: require('@/assets/image/ball2.png'), name: '内存/GB:', num: '95,878', color: '#E5595A' },
        { pre: '30%', img: require('@/assets/image/ball3.png'), name: '硬盘/GB:', num: '3,500,000', color: '#DDC41F' }
      ],
      tableTitle: ['当日访问人数', '当日访问量', '当日访问数据量', '当月访问人数', '当月访问量', '当月访问数据量'],
      datalist: [
        { name: '自治区旅游发展委员会-宁夏旅游政务网-旅游云一期', arr: ['938', '945', '470KB', '9395', '9498', '4MB'] },
        { name: '中卫市公安局-移动互联网110报警助手', arr: ['8', '630', '3203KB', '91', '4772', '24MB'] },
        { name: '中卫市公安局-信息管理服务器', arr: ['70', '195', '3962KB', '420', '1131', '20MB'] },
        { name: '自治区司法厅-社会纠正管理系统', arr: ['10', '148', '223KB', '40', '369', '0MB'] },
        { name: '自治区计量测试院-门户网站', arr: ['15', '40', '225KB', '90', '88', '198MB'] },
      ],
      midfwlist: [
        { num: 218897, name: '当日访问用户量（人）' },
        { num: 411551, name: '当日访问次数（次）' },
        { num: 279678, name: '当日访问数据量（MB）' }
      ],
      jdlist: [
        { name: '三营街道：', num: 36 },
        { name: '北源街道：', num: 36 },
        { name: '南关街道：', num: 36 },
        { name: '新区街道：', num: 36 },
      ],
      // syechart:null,
      zyechart: null,
      ysechart: null,
      fwechart: null,
      ball1: null,
      ball2: null,
      ball3: null
    }
  },
  mounted() {
    this.syinit()
    this.zyinit()
    this.ysinit()
    this.fwinit()
    this.ballinit()
  },
  methods: {
    syinit() {
      var bg = document.getElementById('syechart');
      var ctx = bg.getContext('2d');
      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.strokeStyle = '#143c43';
      ctx.lineCap = "round";
      ctx.arc(150, 110, 65, 0 * Math.PI, 1 * Math.PI, true);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 12;
      var gradient = ctx.createLinearGradient(0, 0, 170, 0);
      gradient.addColorStop("0", "rgba(228, 86, 87, 1)");
      gradient.addColorStop("0.5", "rgba(228, 86, 87, 1)");
      gradient.addColorStop("1.0", "rgba(210, 165, 23, 1)");
      // 用渐变进行填充
      ctx.strokeStyle = gradient;
      ctx.lineCap = "round";
      ctx.arc(150, 110, 65, 1 * Math.PI, 1.5 * Math.PI, false);
      ctx.stroke();
    },
    zyinit() {
      this.zyechart = this.$echarts.init(document.getElementById("zyechart"))
      let option = {
        color: ['rgba(80, 227, 194, 1)', 'rgba(210, 165, 23, 1)', 'rgba(249, 123, 124, 1)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: '分配情况',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '75%'],
          data: [
            { value: 87, name: '低配' },
            { value: 356, name: '标配' },
            { value: 139, name: '高配' },
          ],
          label: {
            color: '#ddd',
            formatter: '{a|{b}}' + '{b|{d}%}',
            textStyle: {
              rich: {
                a: {
                  fontSize: 16,
                  color: 'rgba(182, 182, 182, 1)',
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
            length: 10,
            length2: 20
          },
        }]
      }
      this.zyechart.setOption(option)
      window.tools.loopShowTooltip(this.zyechart, option, { loopSeries: true, interval: 6000 });
    },
    ysinit() {
      var bg = document.getElementById('ysechart');
      var ctx = bg.getContext('2d');
      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.strokeStyle = '#143c43';
      ctx.lineCap = "round";
      ctx.arc(150, 110, 65, 0 * Math.PI, 1 * Math.PI, true);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 12;
      var gradient = ctx.createLinearGradient(0, 0, 170, 0);
      gradient.addColorStop("0", "rgba(228, 86, 87, 1)");
      gradient.addColorStop("0.5", "rgba(228, 86, 87, 1)");
      gradient.addColorStop("1.0", "rgba(210, 165, 23, 1)");
      // 用渐变进行填充
      ctx.strokeStyle = gradient;
      ctx.lineCap = "round";
      ctx.arc(150, 110, 65, 1 * Math.PI, 1.5 * Math.PI, false);
      ctx.stroke();
    },
    fwinit() {
      this.fwechart = this.$echarts.init(document.getElementById("fwechart"))
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter: '城市：{b}<br>访问量：{c}',
        },
        grid: {
          left: '3%',
          right: '5%',
          top: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 12
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: 'rgba(255, 255, 255, 1)',
              opacity: 0.1
            }
          },
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 12
            }
          },
          data: ['江苏省', '广东省', '北京市', '上海市', '浙江省', '宁夏']
        },
        barWidth: 15,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0,
            [
              { offset: 0, color: 'rgba(59, 183, 230, 0.07)' }, //柱图渐变色
              { offset: 1, color: 'rgba(80, 227, 194, 1)' }, //柱图渐变色                  //柱图渐变色
            ]
          ),
          barBorderRadius: [0, 5, 5, 0],
        },
        series: [{
          name: 'top6省份',
          type: 'bar',
          data: [12405, 12479, 15777, 20474, 21648, 71738]
        }]
      }
      this.fwechart.setOption(option)
      window.tools.loopShowTooltip(this.fwechart, option, { loopSeries: true, interval: 6000 });
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#govCloud {
  position: absolute;
  width: 1920px;
  height: 1080px;
  left: 0;
  top: 0;
  /*background-image: url('assets/image/background.png');
    background-size: 100% 100%;*/
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
  letter-spacing: 8px;
}

.content {
  /*padding-top: 87px;*/
  position: absolute;
  left: 0;
  top: 87px;
  display: flex;
  justify-content: space-between;
}

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

.left {
  width: 514px;
  height: 920px;
}

.sydw {
  width: 100%;
  height: 265px;
  background: linear-gradient(-90deg, #19141480 34%, #0D3D3D 100%);
  position: relative;
}

#syechart {
  width: 100%;
  margin-top: 18px;
  height: 216px;
}

.leftlable,
.rightlable {
  position: absolute;
  left: 20px;
  top: 128px;
  width: 135px;
  height: 90px;
}

.rightlable {
  left: 363px;
  top: 128px;
  text-align: right;
}

.leftlable-name,
.rightlable-name {
  width: 135px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px dotted #ddd;
  color: #fff;
  font-size: 15px;
}

.leftlable-num,
.rightlable-num {
  width: 135px;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  font-size: 36px;
}

.syimg {
  width: 120px;
  height: 120px;
  background-image: url('assets/image/syimg.png');
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.synum {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  font-size: 36px;
  text-align: center;
}

.syname {
  width: 100%;
  height: 21px;
  line-height: 21px;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
}

.zyfp {
  margin-top: 18px;
  width: 100%;
  height: 654px;
  background: linear-gradient(-90deg, #19141480 34%, #0D3D3D 100%)
}

.right {
  width: 1406px;
  height: 920px;
  position: relative;
}

.zyfp-top,
.zyfp-mid,
.zyfp-bottom {
  width: 100%;
}

.zyfp-top {
  height: 30%;
  margin-top: 18px;
  padding: 5px 37px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.side-line {
  width: 7px;
  height: 100%;
  background-image: url('assets/image/sideline.png');
  background-size: 100% 100%;
}

.yzy-item {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.yzy-item-top {
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.yzy-item-bottom {
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
  color: #79FCFF;
  font-size: 12px;
}

.yzy-item-mid {
  width: 100%;
  height: 5px;
  display: flex;
  justify-content: space-between;
}

.used {
  width: 70%;
  height: 100%;
  background-color: #79FCFF;
}

.rest {
  width: 27%;
  height: 100%;
  background-color: #E1C71F;
}

.restsjk {
  background-color: #E85D5E
}

.yzy-item-content {
  width: 140px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.yzy-name {
  color: #fff;
  font-size: 14px;
}

.yzy-num {
  color: #79FCFF;
  font-size: 12px;
}

.zyfp-mid {
  height: 46%;
  position: relative;
}

#zyechart {
  width: 100%;
  height: 100%;
}

.zyimg {
  width: 144px;
  height: 139px;
  position: absolute;
  background-image: url('assets/image/zyimg.png');
  background-size: 100% 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.zyfp-bottom {
  height: 70px;
  display: flex;
  padding-left: 1%;
}

.zyfp-bottom-item {
  width: 33%;
  height: 100%;
  display: flex;
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
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.ball-name {
  color: #ffffff;
  font-size: 14px;
}

.ball-num {
  font-size: 18px;
}

.img-num {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.right-top {
  width: 100%;
  height: 640px;
  display: flex;
  justify-content: space-between;
}

.right-top-left {
  width: 885px;
  height: 100%;
  position: relative;
}

.midfwdiv {
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-around;
}

.midfw-item {
  width: 200px;
  padding: 0 15px;
  height: 75px;
  background: rgba(0, 24, 48, 0.52);
  box-shadow: 0px 8px 6px 0px rgba(0, 49, 38, 1);
  border-radius: 4px;
  border: 1px solid;
  border-image: linear-gradient(90deg, rgba(35, 231, 241, 0.54), rgba(50, 150, 245, 0.41), rgba(60, 149, 248, 0), rgba(89, 255, 255, 0.63)) 1 1;
}

.midfw-num {
  width: 80%;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  padding-left: 16px;
  color: #50E3C2;
  font-size: 34px;
}

.midfw-name {
  width: 100%;
  height: 25px;
  line-height: 25px;
  color: #ffffff;
  font-size: 18px;
}

.jddiv {
  width: 100%;
  height: 528px;
  position: relative;
}

.jditem {
  width: 175px;
  height: 110px;
  position: absolute;
  text-align: center;
}

.jditem:nth-child(1) {
  left: 230px;
  top: 89px;
}

.jditem:nth-child(2) {
  left: 435px;
  top: 95px;
}

.jditem:nth-child(3) {
  left: 205px;
  top: 215px;
}

.jditem:nth-child(4) {
  left: 384px;
  top: 260px;
}

.jdsj {
  width: 175px;
  height: 46px;
  line-height: 46px;
  background-image: url('assets/image/jdsj.png');
  background-size: 100% 100%;
  color: #ffffff;
  font-size: 21px;
}

.jdicon {
  width: 84px;
  height: 64px;
  background-image: url('assets/image/icon.png');
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.right-top-right {
  width: 515px;
  height: 100%;
}

.yscz {
  width: 100%;
  height: 270px;
  background: linear-gradient(90deg, #19141480 34%, #0D3D3D 100%);
  position: relative;
}

#ysechart {
  width: 100%;
  height: 222px;
  margin-top: 18px;
}

.fwtop {
  margin-top: 10px;
  width: 100%;
  height: 360px;
  background: linear-gradient(90deg, #19141480 34%, #0D3D3D 100%)
}

#fwechart {
  width: 100%;
  height: 311px;
  margin-top: 18px;
}

.right-bottom {
  margin-top: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 285px;
  padding: 0 0 5px 5px;
  position: absolute;
}

.fwdata {
  width: 100%;
  height: 100%;
  background: linear-gradient(-90deg, #19141480 34%, #0D3D3D 100%)
}

.table-title {
  width: 60%;
  height: 20px;
  margin-left: 40%;
  display: flex;
}

.table-title-item {
  width: 20%;
  color: #F5C650;
  font-size: 14px;
  text-align: center;
}

.tablecontent {
  width: 100%;
  height: 223px;
}

.table-item {
  width: 100%;
  height: 30px;
  display: flex;
  margin-top: 5px;
  padding-left: 30px;
  border: 1px solid rgba(77, 202, 230, 0.16);
  box-sizing: border-box;
}

.table-item:nth-of-type(odd) {
  /*background-color: #3E91A3*/
}

.table-item:nth-of-type(even) {
  background-color: #163133
}

.item-index {
  width: 42px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #F5C650;
  font-size: 14px;
  background: linear-gradient(90deg, rgba(40, 129, 159, 1) 0%, rgba(18, 55, 69, 0.27) 100%);
}

.item-name {
  width: 35%;
  color: #ffffff;
  font-size: 14px;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
}

.item-data {
  width: 60%;
  display: flex;
}

.item-data-item {
  width: 20%;
  text-align: center;
  color: #ffffff;
  line-height: 30px;
}
</style>