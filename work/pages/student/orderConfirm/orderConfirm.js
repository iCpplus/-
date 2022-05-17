// pages/student/orderConfirm/orderConfirm.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTip: '',
    detail: {},
    addressInfo: {},
    userMoney: 0
  },
  submit() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    if (this.data.userMoney < this.data.detail.allPrice + this.data.detail.shopDetail.post_price) {
      Notify({
        type: 'danger',
        message: '余额不足'
      });
    } else {
      wx.request({
        url: 'http://127.0.0.1:3000/student/order/add',
        method: 'POST',
        data: {
          buyerId: user_id,
          storeId: this.data.detail.shopDetail.store_id,
          buyerName: this.data.addressInfo.name,
          buyerPhone: this.data.addressInfo.phone,
          buyerAddress: this.data.addressInfo.address,
          buyerRemark: this.data.orderTip,
          postPrice: this.data.detail.shopDetail.post_price,
          allPrice: this.data.detail.allPrice,
          storeUserId: this.data.detail.shopDetail.seller_id,
          payStatus: 1,
          foods: this.data.detail.foods,
          storeName:this.data.detail.shopDetail.store_name
        },
        success: res => {
          Notify({
            message: '购买成功',
            type:'primary',
            duration: 1000,
            onClose: () => {
              wx.reLaunch({
                url: '/pages/student/main/main',
              })
            }
          });
        }
      })
    }

  },
  goAddressManage() {
    wx.navigateTo({
      url: '/pages/student/addressManage/adressList/adressList'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const detail = JSON.parse(decodeURIComponent(options.detail))
    console.log(detail);
    this.setData({
      detail: detail
    })
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
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://127.0.0.1:3000/userInfo',
      method: 'POST',
      data: {
        userId: user_id
      },
      success: res => {
        this.setData({
          userMoney: res.data.data.money
        })
      }
    })

    wx.request({
      url: 'http://127.0.0.1:3000/student/address/allList',
      method: 'POST',
      data: {
        userId: user_id
      },
      success: res => {
        res.data.list.forEach(item => {
          if (item.default_address == 1) {
            this.setData({
              addressInfo: item
            })
          }
        })
      }
    })
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