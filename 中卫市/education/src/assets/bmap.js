import mapJson from "./mapJson";

const Mixin = {
  data() {
    return {
      mapObj: null,
      marks: []
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      this.mapObj = new window.BMapGL.Map("map"); // 创建Map实例
      this.mapObj.centerAndZoom(new window.BMapGL.Point(105.198394,37.525851), 14); // 初始化地图,设置中心点坐标和地图级别
      this.mapObj.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // this.mapObj.setHeading(40);
      // this.mapObj.setTilt(53);
      this.mapObj.setMapStyleV2({ styleJson: mapJson });
    },
    //社区撒点
    setshequ(marks, cb, cb1) {
      this.closemarks(this.marks)
      marks.forEach((item, index) => {
        if (item.sel) {
          this.mapObj.centerAndZoom(new window.BMapGL.Point(item.longitude, item.latitude), 17);
        }
        let iconns = `<div style="display:flex;flex-direction:column;align-items:center;">
                        <img src=${require('@/assets/image/schoolns.png')} style="width:80px;height:80px;">
                        <span style="color:#fff">${item.name}</span>
                      </div>`
        let icons = `<div class="selqy">
                        <div style="display:flex;flex-direction:column;align-items:center;">
                          <img src=${require('@/assets/image/schools.png')} style="width:112px;height:108px;">
                          <span style="color:#fff">${item.name}</span>
                        </div>
                     </div>`
        let icon = item.sel ? icons : iconns
        let offset1 = new window.BMapGL.Size(-135, -153)
        let offset2 = new window.BMapGL.Size(-24, -27)
        let offset = item.sel ? offset1 : offset2
        let markpot = new window.BMapGL.Point(item.longitude, item.latitude)
        let mark = new window.BMapGL.Label(icon, {
          position: markpot,
          offset: offset
        })
        let content = `<div class="mid-gk">
          <div class="title">${item.message.name}</div>
          <div class="xqgktop">
            <img src="${item.message.img}"/>
            <div class="xqgkcontent">${item.message.intro}</div>
          </div>
        </div>`
        let windowinfo = new window.BMapGL.InfoWindow(content, {
          position: markpot
        });
        this.marks.push(mark)
        mark.item = item
        mark.index = index
        window.openvideo = (e) => {
          e = window.event || e;
          if (window.event) { //只有ie识别
            e.cancelBubble = true;
          } else {
            e.stopPropagation();
          }
          cb1()
        }
        this.mapObj.addOverlay(mark)
        let _this = this
        mark.addEventListener("click", function(e) {
          _this.mapObj.openInfoWindow(windowinfo, markpot); //开启信息窗
          cb(e.target.index)
        })
      })
    },
    //清除marks
    closemarks(marks) {
      marks.forEach(item => {
        this.mapObj.removeOverlay(item);
      });
      marks = [];
    },

  }
}

export default Mixin