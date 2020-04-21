<template>
  <div class="ningxia" style="width:100%; height:100%">
    <div id="suqianMap" style="width:100%; height:100%">
    </div>
    <div class="input-card" style="">
      <div class="search_content">医院搜索：</div>
      <el-input placeholder="搜索" v-model="input_value" class="input-with-select" @keyup.enter.native="siteSearch()">
        <el-button slot="append" icon="el-icon-search" @click="siteSearch()"></el-button>
      </el-input>
    </div>
    <div class="input-card" style="display:none">
      <label style='color:grey'>行政区边界查询</label>
      <div class="input-item">
              <div class="input-item-prepend">
                  <span class="input-item-text" >行政级别</span>
              </div>
              <select id="level">
                  <option value="district">district</option>
                  <option value="city">city</option>
                  <option value="province">province</option>
              </select>
      </div>
      <div class="input-item">
              <div class="input-item-prepend">
                  <span class="input-item-text" >名称/adcode</span>
              </div>
              <input id='district' type="text" value=''>

      </div>
      <input id="draw" type="button" class="btn" value="查询" />
    </div>
    <el-dialog
      :title="hname"
       :modal-append-to-body='false'
      :visible.sync="dialogVisible"
      width="40%"
      style="margin-top:15vh"
      :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span="12">
          <img style="height:30vh;width: 100%;" :src="detailtest[hname].img">
        </el-col>
        <el-col :span="12">
          <div style="height: 30vh;overflow-y: auto;" class="ningxia_content">{{detailtest[hname].content}}</div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AMap from 'AMap'
import { mapActions } from 'vuex'
export default {
  props: {
    data: Array
  },
  data () {
    return {
      charts: '',
      charts2: '',
      map: '',
      test: '',
      dialogVisible: false,
      input_value: '',
      hname: '中卫市人民医院',
      detailtest: {
        中卫市人民医院: {
          img: require('../../assets/img/rmyy.png'),
          content: '中卫市人民医院是一所二级甲等综合性医院，现有心血管内科，呼吸内科、消化内科，综合内科一、二，小儿科，新生儿科，神经内科，五官科，骨科烧伤科一、二，泌尿胸外科，普外肿瘤科，神经外科，感染性疾病科等17个临床科室，5个医技科室，8个职能科室'
        },
        中卫市第二人民医院: {
          img: require('../../assets/img/rmyy2.png'),
          content: '中卫市沙坡头区人民医院主页，中卫市沙坡头区人民医院（中卫市眼科医院）成立于1994年9月。其前身为兰州铁路局迎水桥医院。2004年5月移交中卫市政府管理，更名为中卫市第二人民医院，2009。微医(挂号网)为您提供中卫市沙坡头区人民医院预约挂号、专家挂号、在线问诊等服务，在线预约医院更快捷，看病问诊更方便'
        },
        中卫市妇幼保健院: {
          img: require('../../assets/img/fybj.png'),
          content: '中卫市妇幼保健院位于中卫市城西大街商业南街1号，成立于1900年01月，是一家综合医院，设置保健部及六个专业保健科室，全面负责全区妇幼保健业务的管理与指导，以群众妇幼保健需求为导向，积极探索并不断创新妇幼保健管理服务模式，对辖区各级医疗保健机构、各地段保健机构及社区卫生服务机构的妇幼卫生工作实行“一体化”管理'
        }
      }
    }
  },
  watch: {
    data: {
      handler (val, oldValue) {
        this.init(this.map)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('HomePage', [
      'invokeGetAllData'
    ]),
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    markerClick2 (e) {
      this.hname = e.target.name
      this.dialogVisible = true
      this.invokeGetAllData(e.target.name)
    },
    // 行政区域高亮
    drawBounds (district, polygons, map) {
      // 加载行政区划插件
      if (!district) {
        // 实例化DistrictSearch
        var opts = {
          subdistrict: 0, // 获取边界不需要返回下级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          level: 'district' // 查询行政级别为 市
        }
        district = new AMap.DistrictSearch(opts)
      }
      // 行政区查询
      district.setLevel(document.getElementById('level').value)
      district.search(document.getElementById('district').value, function (status, result) {
        map.remove(polygons)// 清除上次结果
        polygons = []
        var bounds = result.districtList[0].boundaries
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            // 生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.4,
              fillColor: 'rgba(30, 199, 150, 1)',
              strokeColor: '#0091ea'
            })
            polygons.push(polygon)
          }
        }
        map.add(polygons)
        map.setFitView(polygons)// 视口自适应
      })
    },
    // 描点
    mapMarker (map) {
      // var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, 330) })
      var capitals = this.data

      // 创建一个 Icon
      // var startIcon = new AMap.Icon({
      //   // 图标尺寸
      //   size: new AMap.Size(120, 83),
      //   // 图标的取图地址
      //   image: require('../../assets/img/mapicon.png'),
      //   // 图标所用图片大小
      //   imageSize: new AMap.Size(120, 83),
      //   // 图标取图偏移量
      //   imageOffset: new AMap.Pixel(-9, -3)
      // })
      for (var i = 0; i < capitals.length; i += 1) {
        var center = capitals[i].center
        // var circleMarker = new AMap.CircleMarker({
        //   center: center,
        //   radius: map.getZoom() * 0.75,
        //   strokeColor: 'rgba(76, 221, 180, 1)',
        //   strokeWeight: 2,
        //   strokeOpacity: 1,
        //   fillColor: 'white',
        //   fillOpacity: 1,
        //   zIndex: 10,
        //   bubble: true,
        //   cursor: 'pointer',
        //   clickable: true
        // })
        var icon = require('../../assets/img/mapicon.png')
        var markerContent = '' +
        '<div class="custom-content-marker">' +
        '   <img style="position: absolute;" src=' + icon + '>' +
        '   <div class="mapicon_content">' + capitals[i].zdmc + '</div>' +
        '</div>'
        var circleMarker = new AMap.Marker({
          position: center,
          content: markerContent,
          offset: new AMap.Pixel(-13, -30)
        })
        circleMarker.name = capitals[i].zdmc
        circleMarker.map_this = this
        circleMarker.setMap(map)
        circleMarker.on('click', markerClick)
        circleMarker.on('click', this.markerClick2)
        // var clickHandle = AMap.event.addListener(circleMarker, 'click', function (e) {
        //   circleMarker.setRadius(20)
        //   console.log(e)
        // })
        // console.log(clickHandle)
        this.map = map
      }
      function markerClick (e) {
        var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(60, -30) })
        // 此处的 e 是关键，这样就可以拿到name
        var content = '<div className="custom-infowindow input-card2">' +
            '<div class="input-item2"  style="display:flex">' +
                    '<div id="bar" style="width:220px;height:260px"></div>' +
                    '<div id="bar2" style="width:220px;height:260px"></div>' +
                '</div>' +
            '</div>' +
        '</div>'
        infoWindow.setContent(content)
        // infoWindow.open(map, e.target.getPosition())
        map.setCenter([e.target.getPosition().lng, e.target.getPosition().lat])
      }
      // function markerMouseover (e) {
      //   e.target.setOptions({
      //     fillColor: 'rgba(247, 141, 54, 1)'
      //   })
      // }
      // function markerOut (e) {
      //   e.target.setOptions({
      //     fillColor: 'white'
      //   })
      // }
      map.setFitView()
      map.setZoom(11)
      map.setCenter([105.198394, 37.525851])
    },
    // 搜索
    siteSearch () {
      var ws = 0
      this.map.getAllOverlays().forEach((item, index, arr) => {
        if (item.CLASS_NAME === 'AMap.Marker') {
          if (item.name === this.input_value) {
            ws = 1
            this.markerClick(item)
            this.$message({
              showClose: true,
              type: 'success',
              message: '查询成功！'
            })
          }
        }
      })
      if (ws === 0) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '没有该医院'
        })
      }
    },
    markerClick (e) {
      this.hname = e.name
      this.dialogVisible = true
      var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, 330) })
      // 此处的 e 是关键，这样就可以拿到name
      var content = '<div className="custom-infowindow input-card2">' +
            '<div class="input-item2"  style="display:flex">' +
                    '<div id="bar" style="width:220px;height:260px"></div>' +
                    '<div id="bar2" style="width:220px;height:260px"></div>' +
                '</div>' +
            '</div>' +
        '</div>'
      infoWindow.setContent(content)
      // infoWindow.open(this.map, e.target.getPosition())
      this.map.setCenter([e.getPosition().lng, e.getPosition().lat])
    },
    // 地图初始化
    init (map) {
      map = new AMap.Map('suqianMap', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 3,
        pitch: 40,
        rotation: -10,
        viewMode: '3D', // 开启3D视图,默认为关闭
        buildingAnimation: true, // 楼块出现是否带动画

        expandZoomRange: true,
        zooms: [3, 20],
        center: [106.548591, 38.919157]
      })
      var styleName = 'amap://styles/' + 'blue'
      map.setMapStyle(styleName)

      map.on('zoomchange', function () {
        // 此处的De需要经常替换
        // console.log(map.De.overlays, '32222222222222')
        map.getAllOverlays().forEach((item, index, arr) => {
          if (item.CLASS_NAME === 'AMap.CircleMarker') {
            item.setRadius(map.getZoom() * 0.75)
            item.setOptions({
              fillColor: 'white'
            })
          }
          if (item.CLASS_NAME === 'AMap.InfoWindow') {
            item.close()
          }
        })
      })

      // 3d模式
      // var object3Dlayer = new AMap.Object3DLayer()
      // map.add(object3Dlayer)
      // var opts = {
      //   extensions: 'all',
      //   subdistrict: 0
      // }
      // 实例化DistrictSearch
      // var districtSearch = new AMap.DistrictSearch(opts)

      // districtSearch.search('原州区', function (status, result) {
      //   // 外多边形坐标数组和内多边形坐标数组
      //   var outer = [
      //     new AMap.LngLat(-360, 90, true),
      //     new AMap.LngLat(-360, -90, true),
      //     new AMap.LngLat(360, -90, true),
      //     new AMap.LngLat(360, 90, true)
      //   ]
      //   var holes = result.districtList[0].boundaries

      //   var pathArray = [
      //     outer
      //   ]
      //   pathArray.push.apply(pathArray, holes)
      //   var polygon = new AMap.Polygon({
      //     pathL: pathArray,
      //     // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
      //     strokeColor: 'rgb(20,164,173)',
      //     strokeWeight: 4,
      //     // 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
      //     strokeOpacity: 0.5,
      //     // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
      //     fillColor: 'rgba(0,24,32)',
      //     // 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
      //     fillOpacity: 0.5,
      //     // 轮廓线样式，实线:solid，虚线:dashed
      //     strokeStyle: 'solid',
      //     /* 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在
      //         ie9+浏览器有效 取值：
      //         实线：[0,0,0]
      //         虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
      //         点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实
      //         线和10个像素的空白 （如此反复）组成的虚线 */
      //     strokeDasharray: [10, 2, 10]
      //   })
      //   polygon.setPath(pathArray)
      //   map.add(polygon)
      // })

      // var district = null
      // var polygons = []
      // this.drawBounds(district, polygons, map)
      // document.getElementById('draw').onclick = this.drawBounds(district, polygons, map)
      // document.getElementById('district').onkeydown = function (e) {
      //   if (e.keyCode === 13) {
      //     this.drawBounds(district, polygons, map)
      //     return false
      //   }
      //   return true
      // }

      // 地图标点
      this.mapMarker(map)

      // 3d模式添加一个圆柱体
      // eslint-disable-next-line camelcase
      // var center_3d = map.lngLatToGeodeticCoord([118.266183, 33.965211])
      // var topColor = [0, 1, 1, 0.9]
      // var topFaceColor = [0, 1, 1, 0.4]
      // var bottomColor = [0, 0, 1, 0.9]
      // var addRegularPrism = function (center, segment, height, radius) {
      //   var cylinder = new AMap.Object3D.Mesh()
      //   var geometry = cylinder.geometry
      //   var verticesLength = segment * 2
      //   var path = []
      //   for (var i = 0; i < segment; i += 1) {
      //     var angle = 2 * Math.PI * i / segment
      //     var x = center.x + Math.cos(angle) * radius
      //     var y = center.y + Math.sin(angle) * radius
      //     path.push([x, y])
      //     geometry.vertices.push(x, y, 0) // 底部顶点
      //     geometry.vertices.push(x, y, -height) // 顶部顶点

      //     geometry.vertexColors.push.apply(geometry.vertexColors, bottomColor) // 底部颜色
      //     geometry.vertexColors.push.apply(geometry.vertexColors, topColor) // 顶部颜色

      //     var bottomIndex = i * 2
      //     var topIndex = bottomIndex + 1
      //     var nextBottomIndex = (bottomIndex + 2) % verticesLength
      //     var nextTopIndex = (bottomIndex + 3) % verticesLength

      //     geometry.faces.push(bottomIndex, topIndex, nextTopIndex) // 侧面三角形1
      //     geometry.faces.push(bottomIndex, nextTopIndex, nextBottomIndex) // 侧面三角形2
      //   }

      //   // 构建顶面三角形,为了区分顶面点和侧面点使用不一样的颜色,所以需要独立的顶点
      //   for (var j = 0; j < segment; j += 1) {
      //     geometry.vertices.push.apply(geometry.vertices, geometry.vertices.slice(j * 6 + 3, j * 6 + 6)) // 底部顶点
      //     geometry.vertexColors.push.apply(geometry.vertexColors, topFaceColor)
      //   }

      //   var triangles = AMap.GeometryUtil.triangulateShape(path)
      //   var offset = segment * 2

      //   for (var v = 0; v < triangles.length; v += 3) {
      //     geometry.faces.push(triangles[v] + offset, triangles[v + 2] + offset, triangles[v + 1] + offset)
      //   }

      //   cylinder.transparent = true // 如果使用了透明颜色，请设置true
      //   object3Dlayer.add(cylinder)
      // }
      // addRegularPrism(center_3d.add(new AMap.Pixel(1500, 0)), 32, 1600, 500)// 圆柱
    }
  },
  // 调用
  mounted () {
    this.init(this.map)
    // var _this = this
    // setTimeout(function () { _this.init(_this.map) }, 3000)
  }
}
</script>

<style lang="stylus">
.amap-info-content {
    position: relative;
    padding: 10px 18px 10px 10px;
    line-height: 1.4;
    overflow: auto;
    background:rgba(0,25,30,.9)!important;
    border:1px solid rgba(140,142,142,1)!important;
}
.input-item-text {
  color white
}
.bottom-center .amap-info-sharp {
    left: 50%;
    margin-left: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 0px solid #fff;
    border-top: 8px solid #fff;
}
.input-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border-radius: .25rem;
    width: 15vw;
    border-width: 0;
    border-radius: 0.4rem;
    position: fixed;
    top: 20vh;
    left: 28vw;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
.input-item {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    width: 80%;
}
.btn {
    width: 30%;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    background-color: transparent;
    background-image: none;
    color: #25A5F7;
    border-color: #25A5F7;
    padding: .25rem .5rem;
    line-height: 1.5;
    border-radius: 1rem;
    -webkit-appearance: button;
    cursor: pointer;
}
#district
  width: 8vw;
  background-color: rgba(0,25,30,.9);
  color: rgba(255,255,255,1);
  border:0.5px solid rgba(255,255,255,.5)
.input-card .el-input__inner {
    -webkit-appearance: none;
    background-color: rgba(0,25,30,.9);
    background-image: none;
    border-radius: 4px;
    border:0px solid rgba(255,255,255,.5)
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: inherit;
    height: 27px;
    line-height: 27px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.input-card  .el-input-group__append,.input-card  .el-input-group__prepend {
    background-color: rgba(0,25,30,.9);;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 0px solid #DCDFE6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}
.mapicon_content
  width: 145px;
  text-align: center;
  position: absolute;
  font-size:12px;
  font-family:MicrosoftYaHei;
  color:rgba(0,0,0,1);
  line-height:22px;
.search_content
  margin-bottom 10px
  font-size:16px;
  font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;
  font-weight:bold;
  color:rgba(96,204,221,1);
  line-height:21px;
.amap-logo,.amap-copyright{
  display: none!important;
}
.ningxia .el-dialog{
  background:linear-gradient(180deg,rgba(10,62,66,1) 0%,rgba(10,62,66,.8) 100%);
  box-shadow:0px 6px 8px 0px rgba(0,0,0,0.5);
  border:1px solid rgba(0,193,222,0.23);
}
.ningxia .el-dialog__title {
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(80,227,194,1);
  line-height:25px;
}
.ningxia_content{
  font-size:16px;
  color: #FFF;
  line-height:20px;
  letter-spacing: 4px;
}
</style>
