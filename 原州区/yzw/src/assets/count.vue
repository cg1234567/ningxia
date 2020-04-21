<template>
    <div class="chartNum">
      <div class="box-item" :style="{color:newcolor}">
          <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
              v-for="(item,index) in orderNum1"
              :key="index">
                  <span v-if="!isNaN(item)">
                    <i ref="numberItem">0123456789</i>
                  </span>
              <span class="comma" v-else>{{item}}</span>
          </li>
      </div>
  </div>
</template>
<script>
    export default {
        props:['countto','newcolor'],
        data() {
            return {
                orderNum: [ '0', '0', '0','0', '0', '0'], // 默认订单总数
            }
        },
        mounted() {
            this.inittime(this.countto)
            this.increaseNumber()            
        },
        methods: {
             // 设置文字滚动
          setNumberTransform () {
            const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量
            const numberArr = this.orderNum.filter(item => !isNaN(item))
            // 结合CSS 对数字字符进行滚动,显示订单数量
            for (let index = 0; index < numberItems.length; index++) {
              const elem = numberItems[index]
              elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
            }
          },
          // 处理总订单数字
          toOrderNum(num) {
            num = num.toString()
            this.orderNum = num.split('')
          },
          increaseNumber() {
              let self = this
              let num = ''
              let len = 0
              len = this.countto.toString().split('').length
              num = parseFloat('1010101010101010101'.substr(0,len))
              this.timer = setInterval(() => {
                  self.timeout(num);
                  setTimeout(()=>self.timeout(self.countto), 1000);
              }, 10000)
          },
          inittime(num) {
            let self = this
            setTimeout(()=>self.timeout(num), 1000);
          },
          timeout(num) {
            this.toOrderNum(num) 
            this.setNumberTransform()
          }
        },
        computed: {
          orderNum1() {
            let arr = this.countto.toString().split('')
            arr.forEach(item=>item = isNaN(item)?'.':'0')
            return arr
          }
        }
      }
</script>
<style scoped>
     /*订单总量滚动数字设置*/
    .box-item {
        position: relative;
        height: 41px;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        list-style: none;
        writing-mode: vertical-lr;
        font-family:Acens;
        text-orientation: upright;
        /*文字禁止编辑*/
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
        /* overflow: hidden; */
    }
    /* 默认逗号设置 */
    .mark-item {
        width: 10px;
        height: 41px;
        line-height: 10px;
        font-size: 24px;
        position: relative;
    }
    .mark-item > span {
        position: absolute;
        width: 100%;
        bottom: 0;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }
    /*滚动数字设置*/
    .number-item {
        width: 20px;
        height: 41px;
        list-style: none;
        margin-right: 5px;
    }
    .number-item > span {
        position: relative;
        display: inline-block;
        margin-right: 20px;
        width: 100%;
        height: 100%;
        writing-mode: vertical-rl;
        text-orientation: upright;
        overflow: hidden;
    }
    .number-item > span> i {
        font-style: normal;
        font-family:Acens;
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translate(-50%,0);
        transition: transform 1s ease-in-out;
        letter-spacing: 10px;
    }
    .number-item:last-child {
        margin-right: 0;
    }
</style>
