<template>
  <div class="dT" style="width: 90%;height: 90%;margin: auto;">
    <el-table
    :data="tableData"
    size = 'mini'
    style="width: 100%;height: 100%">
    <el-table-column
      prop="rank"
      label="排名">
    </el-table-column>
    <el-table-column
      prop="name"
      label="患者">
      <div class="dT_name" slot-scope="scope" :title="scope.row.name"><img src="../../assets/img/ticon.png">{{ scope.row.name }}</div>
    </el-table-column>
    <el-table-column
      prop="address"
      label="区域">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄区间">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {
      tableData: [{
        rank: 'Top1',
        name: '2345',
        address: '沙坡头区',
        age: '20-30'
      }, {
        rank: 'Top2',
        name: '2012',
        address: '中宁县',
        age: '20-50'
      }, {
        rank: 'Top3',
        name: '1223',
        address: '海原县',
        age: '30-40'
      }, {
        rank: 'Top4',
        name: '1156',
        address: '沙坡头区',
        age: '20-30'
      }, {
        rank: 'Top5',
        name: '994',
        address: '中宁县',
        age: '20-30'
      }]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.dT_name
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(245,166,35,1);
  line-height:28px;
.el-table--mini td, .el-table--mini th
    padding: 6px 0;
    text-align: center;
.dT .el-table, .el-table__expanded-cell {
    background-color: rgba(255,255,255,0)
}
.dT .el-table th,.dT .el-table tr {
    background-color: #fff0;
}
.dT .el-table td,.dT .el-table th.is-leaf {
    border-bottom: 1px solid #ebeef500;
}
.el-table::before {//去掉最下面的那一条线
  height: 0px;
}
.dT .el-table .cell {
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
}
.dT .el-table th>.cell {
    color:rgba(255,255,255,.7)!important;
}
</style>
