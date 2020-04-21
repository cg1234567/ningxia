<template>
  <div class="HP_content">
    <div class="HP_content_row">
      <div class="HP_content_row_left">
        <div class="yjk_frame">
          <div class="yjk_frame_title">
            <div class="yjk_frame_title_icon"></div>
            <div class="yjk_frame_title_content">就医次数整体趋势图</div>
          </div>
          <examinationLine></examinationLine>
        </div>
        <div class="yjk_frame">
          <div class="yjk_frame_title">
            <div class="yjk_frame_title_icon"></div>
            <div class="yjk_frame_title_content">就医人员类型分布</div>
          </div>
          <personnelTypePie></personnelTypePie>
        </div>
        <div class="yjk_frame">
          <div class="yjk_frame_title">
            <div class="yjk_frame_title_icon"></div>
            <div class="yjk_frame_title_content">就医评价反馈统计</div>
          </div>
          <feedbackGraph></feedbackGraph>
        </div>
      </div>
      <div class="HP_content_row_medium" style="height: 15%;">
        <el-row :gutter="40" style="padding: 0 40px;">
          <el-col :span="8">
            <div class="HP_content_card">
              <div class="HP_content_card_left">
                <div class="HP_content_card_left_t"><SumScroll :value="7"></SumScroll></div>
                <div class="HP_content_card_left_b">医院总数</div>
              </div>
              <div class="HP_content_card_right"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="HP_content_card">
              <div class="HP_content_card_left2">
                <div class="HP_content_card_left_t"><SumScroll :value="322"></SumScroll></div>
                <div class="HP_content_card_left_b">当日就诊（人次）</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="HP_content_card">
              <div class="HP_content_card_left2">
                <div class="HP_content_card_left_t"><SumScroll :value="2456"></SumScroll></div>
                <div class="HP_content_card_left_b">入院人数（人次）</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="HP_content_row_right">
        <div class="yjk_frame">
          <div class="yjk_frame_title">
            <div class="yjk_frame_title_icon"></div>
            <div class="yjk_frame_title_content">综合决策分析</div>
          </div>
          <decisionTable></decisionTable>
        </div>
        <div class="yjk_frame">
          <decisionLine></decisionLine>
        </div>
        <div class="yjk_frame">
          <div class="yjk_frame_title">
            <div class="yjk_frame_title_icon"></div>
            <div class="yjk_frame_title_content">阶段性患病类型分析</div>
          </div>
          <getSickPie></getSickPie>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import examinationLine from '@/components/HomePage/examinationLine.vue'
import getSickPie from '@/components/HomePage/getSickPie.vue'
import personnelTypePie from '@/components/HomePage/personnelTypePie.vue'
import feedbackGraph from '@/components/HomePage/feedbackGraph.vue'
import decisionLine from '@/components/HomePage/decisionLine.vue'
import decisionTable from '@/components/HomePage/decisionTable.vue'
import SumScroll from '@/components/HomePage/sumScroll.vue'
export default {
  components: {
    examinationLine,
    getSickPie,
    personnelTypePie,
    feedbackGraph,
    decisionLine,
    decisionTable,
    SumScroll
  },
  data () {
    return {
      startVal: 0,
      endVal: 2017
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
<style lang="stylus">
.HP_content .el-row {
  height 100%
}
.HP_content .el-col {
  height 100%
}
.HP_content
  width 100%
.yjk_frame
  margin-bottom 5px
  width:100%;
  height:33%;
  background:linear-gradient(90deg,rgba(13,61,61,1) 0%,rgba(0,0,0,0.34) 100%);
.yjk_frame_title
  display: flex;
  padding-top: 10px;
  padding-left: 10px;
.yjk_frame_title_icon
  width:4px;
  height:30px;
  margin-right: 10px;
  background:rgba(94,197,212,1);
  opacity:0.79;
.yjk_frame_title_content
  height:30px;
  background:linear-gradient(270deg,rgba(151,228,236,0) 0%,rgba(94,197,212,1) 100%);
  font-size:18px;
  font-family:MicrosoftYaHei;
  color:rgba(255,255,255,1);
  line-height:24px;
  padding-left: 5px;
  opacity:0.79;
.HP_content_card
  width 100%
  height:74px;
  display flex
  align-items: center;
  justify-content center
  background:rgba(0,24,48,0.52);
  box-shadow:0px 8px 6px 0px rgba(0,49,38,1);
  border-radius:4px;
  border:1px solid;
  border-image:linear-gradient(90deg, rgba(35,231,241,0.54), rgba(50,150,245,0.41), rgba(60,149,248,0), rgba(89,255,255,0.63)) 1 1;
.HP_content_card_left
  width: 45%;
  display flex
  flex-direction: column;
.HP_content_card_left2
  width: 85%;
  display flex
  flex-direction: column;
.HP_content_card_right
  width: 40%;
  text-align center
  font-size:15px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:21px;
  text-shadow:0px 8px 6px rgba(0,49,38,1);
.HP_content_card_right span
  font-size:15px;
  font-family:Acens;
  color:rgba(255,124,124,1);
  line-height:14px;
  text-shadow:0px 8px 6px rgba(0,49,38,1);
.HP_content_card_left_t
  font-size:34px;
  font-family:Acens;
  color:rgba(80,227,194,1);
  line-height:31px;
  text-shadow:0px 8px 6px rgba(0,49,38,1);
.HP_content_card_left_b
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:30px;
  text-shadow:0px 8px 6px rgba(0,49,38,1);
.HP_content_row_left
  width 26.5%
  position: absolute;
  height: 86vh;
  left: 0;
.HP_content_row_medium
  width 47%
  height: 15%;
  position: absolute;
  left: 26.5%;
.HP_content_row_right
  width 26.5%
  position: absolute;
  height: 86vh;
  right: 0;
</style>
