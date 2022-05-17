// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapCtx: null
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    // this.mapCtx.moveToLocation()

  },
  onLoad() {
    const md5 = require('../../../assets/js/md5');
    console.log(md5.hexMD5('123456'));
  },
  getCenterLocation() {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation() {
    this.mapCtx.moveToLocation()
  },
  translateMarker() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  studentLogin() {
    wx.navigateTo({
      url: '/pages/login/studentLogin/studentLogin?role=user',
    })
  },
  riderLogin() {
    wx.navigateTo({
      url: '/pages/login/riderLogin/riderLogin',
    })
  },
  shopLogin() {
    wx.navigateTo({
      url: '/pages/login/shopLogin/shopLogin',
    })
  }


})