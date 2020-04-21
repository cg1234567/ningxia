import mapJson from "./mapJson";

const Mixin = {
  data() {
    return {
      mapObj: null,
      marks:[]
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      this.mapObj = new window.BMapGL.Map("map"); // 创建Map实例
      this.mapObj.centerAndZoom(new window.BMapGL.Point(105.198394,37.525851), 15); // 初始化地图,设置中心点坐标和地图级别
      this.mapObj.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // this.mapObj.setHeading(40);
      // this.mapObj.setTilt(53);
      this.mapObj.setMapStyleV2({ styleJson: mapJson });
    },
    //社区撒点
    setshequ(marks,cb,cb1) {
       this.closemarks(this.marks)
       marks.forEach((item,index)=>{
        if(item.sel) {
          this.mapObj.centerAndZoom(new window.BMapGL.Point(item.longitude,item.latitude),17);
        }
        let iconns = `<div style="display:flex;flex-direction:column;align-items:center;">
                        <img src=${require('@/assets/image/xqns.png')} style="width:38px;height:38px;">
                        <span style="color:#fff">${item.name}</span>
                      </div>`
        let icons = `<div class="selqy">
                        <div style="display:flex;flex-direction:column;align-items:center;">
                          <img src=${require('@/assets/image/xqs.png')} style="width:60px;height:60px;">
                          <span style="color:#fff">${item.name}</span>
                        </div>
                        <div class="camera" onclick="openvideo()"></div>
                     </div>`
        let icon = item.sel?icons:iconns
        let offset1 = new window.BMapGL.Size(-135, -153)
        let offset2 = new window.BMapGL.Size(-24, -27)
        let offset = item.sel?offset1:offset2
        let markpot = new window.BMapGL.Point(item.longitude, item.latitude)
        let mark = new window.BMapGL.Label(icon,{
          position:markpot,
          offset: offset
        })
        let content = `<div class="mid-gk">
          <div class="title">${item.message.name}</div>
          <div class="xqgktop">
            <img src="${item.message.img}" style="width: 181px;height: 131px;" />
            <div class="xqgkcontent">
              <div class="xqgk-item">
                <img src="${item.message.list[0].img}" style="width: 24px;height: 24px;" />
                <span class="item-lable">${item.message.list[0].lable}</span>
                <span class="item-num">${item.message.list[0].num}</span>
              </div>
              <div class="xqgk-item">
                <img src="${item.message.list[1].img}" style="width: 24px;height: 24px;" />
                <span class="item-lable">${item.message.list[1].lable}</span>
                <span class="item-num">${item.message.list[1].num}</span>
              </div>
              <div class="xqgk-item">
                <img src="${item.message.list[2].img}" style="width: 24px;height: 24px;" />
                <span class="item-lable">${item.message.list[2].lable}</span>
                <span class="item-num">${item.message.list[2].num}</span>
              </div>
              <div class="xqgk-item">
                <img src="${item.message.list[3].img}" style="width: 24px;height: 24px;" />
                <span class="item-lable">${item.message.list[3].lable}</span>
                <span class="item-num">${item.message.list[3].num}</span>
              </div>
            </div>
          </div>
          <div class="xqgkbottom">
            ${item.message.intro}
          </div>
        </div>`
        let windowinfo = new window.BMapGL.InfoWindow(content, {
          position:markpot
        }); 
        this.marks.push(mark)
        mark.item = item
        mark.index = index
        window.openvideo=(e)=>{
          e=window.event||e;
          if(window.event){  //只有ie识别
              e.cancelBubble=true;
          }else{
              e.stopPropagation();
          }
          cb1()
        }
        this.mapObj.addOverlay(mark)
        let _this = this
        // console.log(item.area)
        // let polygonarr = []
        // item.area.forEach(item=>{
        //   polygonarr.push(new window.BMapGL.Point(item[0], item[1]));
        // })
        // let polygon = new window.BMapGL.Polygon(polygonarr,{
        //   strokeColor:"#F5C650",
        //   strokeWeight:2,
        //   strokeStyle: 'dashed',
        //   fillColor:"#dce0d7",
        //   fillColorOpacity:"0.3"
        // })
        // this.mapObj.addOverlay(polygon); 
        mark.addEventListener("click",function(e){
          // console.log(this.mapObj)
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