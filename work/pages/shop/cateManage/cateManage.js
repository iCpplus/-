// pages/shop/cateManage/cateManage.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateName: '',
    list: []
  },
  deleteCate(e) {
    const {
      item
    } = e.currentTarget.dataset
    const storeId = wx.getStorageSync("storeId")
    wx.request({
      url: 'http://127.0.0.1:3000/shop/foodCate/delete',
      method: 'POST',
      data: {
        shopId: storeId,
        cateId: item.category_id
      },
      success: () => {
        Notify({
          type: 'danger',
          message: '删除成功',
        });
        this.getCateList()
      }
    })
  },
  getCateList(){
    const storeId = wx.getStorageSync("storeId")
    wx.request({
      url: 'http://127.0.0.1:3000/shop/foodCate/list',
      method: 'POST',
      data: {
        shopId: storeId
      },
      success: (res) => {

        this.setData({
          list:res.data.list
        })
      }
    })
  },
  addCate() {
    const storeId = wx.getStorageSync("storeId")
    wx.request({
      url: 'http://127.0.0.1:3000/shop/foodCate/add',
      method: 'POST',
      data: {
        shopId: storeId,
        cateName: this.data.cateName
      },
      success: () => {
        Notify({
          type: 'primary',
          message: '添加成功',
        });
        this.setData({
          cateName: ''
        })
        this.getCateList()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList()
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