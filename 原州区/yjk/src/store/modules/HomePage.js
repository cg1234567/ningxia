// collection.js
import axios from 'axios'
// import router from '../../router'
// import store from '../../store'
// import Vue from 'vue'
import common from './common'

const state = {
  messageIP: common.state.IP,
  collects: [], // 初始化一个colects数组
  name: '',
  mapData: [
    { zdmc: '固原市人民医院', center: [106.246509, 36.003753] },
    { zdmc: '固原市原州区人民医院', center: [106.298386, 36.0124293] },
    { zdmc: '固原市妇幼保健院', center: [106.26756, 36.012600] },
    { zdmc: '固原市中医医院', center: [106.256531, 36.036131] }
  ],
  mapData2: [
    { zdmc: '七堡村', jd: '118.170914', wd: '34.016705' },
    { zdmc: '三义村', jd: '118.161125', wd: '33.929291' },
    { zdmc: '三台山森林公园', jd: '118.305771', wd: '34.033962' },
    { zdmc: '三斗', jd: '118.082916', wd: '34.084068' },
    { zdmc: '三树中学', jd: '118.262344', wd: '33.882313' }
  ]
}
const getters = {
  renderCollects (state) { // 承载变化的collects
    return state.collects
  }
}
const mutations = {
  pushCollects (state, items) { // 如何变化collects,插入items
    state.collects.push(items)
  },
  // 地图数据获取
  getMapData (state, items) {
    axios
      .get(
        state.messageIP + '/wz/Portrait/MapPoint', {
          params: {
            zdmc: items
          }
        })
      .then(function (res) {
        var data = res.data
        if (data.code === 200) {
          var map = []
          data.data.forEach((item, index, arr) => {
            map.push(
              {
                zdmc: item.zdmc,
                center: [item.jd, item.wd]
              }
            )
          })
          state.mapData = map
          state.name = data.data[0].zdmc
          mutations.getjbxxData(state, state.name)
          mutations.getyxzkData(state, state.name)
          mutations.getsytjData(state, state.name)
          mutations.getyltjData(state, state.name)
        }
      })
      // .catch(function (error) {
      // })
  }
}
const actions = {
  invokePushItems (context, item) { // 触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('pushCollects', item)
  },
  invokeGetAllData (context, item) {
    console.log(item)
  },
  invokeGetMapData (context, item) {
    // context.commit('getMapData', item)
  }
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
