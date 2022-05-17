// pages/student/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 5,
    message1: '',
    message2: '',
    message3: '',
    storeId:'',
    orderId:'',
    flag: 1
  },
  confirm() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    if (this.data.flag == 0) {
      wx.request({
        url: 'http://127.0.0.1:3000/student/orderStatus/update',
        method: 'POST',
        data: {
          orderId:this.data.orderId,
          status:6
        },
        success: res => {
          wx.navigateBack({
            delta: 0,
          })
        }
      })
      wx.request({
        url: 'http://127.0.0.1:3000/student/comment/add',
        method: 'POST',
        data: {
          userId:user_id,
          starNum:this.data.value,
          content:this.data.message1,
          storeId:this.data.storeId,
          orderId:this.data.orderId
        },
        success: res => {
          wx.navigateBack({
            delta: 0,
          })
        }
      })
    }else {
      wx.request({
        url: 'http://127.0.0.1:3000/student/comment/update',
        method: 'POST',
        data: {
          storeContent:this.data.message2,
          riderContent:this.data.message3,
          orderId:this.data.orderId
        },
        success: res => {
          wx.navigateBack({
            delta: 0,
          })
        }
      })
    }

  },
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      flag,
      orderId,
      storeId
    } = options
    this.setData({
      flag: flag,
      orderId:orderId,
      storeId:storeId||''
    })
    if (flag != 0) {
      wx.request({
        url: 'http://127.0.0.1:3000/student/comment/get',
        method: 'POST',
        data: {
          orderId: orderId
        },
        success: res => {
          this.setData({
            value: res.data.data.start_num,
            message1: res.data.data.content,
            message2: res.data.data.store_content || '',
            message3: res.data.data.rider_content || ''
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})