// pages/student/addressManage/adressList/adressList.js
import Notify from '../../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/student/addressManage/addressCreate/addressCreate',
    })
  },
  editAddress(e) {
    const {
      address
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/student/addressManage/addressCreate/addressCreate?address=${encodeURIComponent(JSON.stringify(address))}`,
    })
  },
  deleteAdress(e){
    const {
      addressid
    } = e.currentTarget.dataset
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://127.0.0.1:3000/student/address/delete',
      method: 'POST',
      data: {
        userId: user_id,
        addressId: addressid
      },
      success:()=>{
        Notify({
          type: 'primary',
          message: '删除成功',
        });
        this.getAddressList()
      }
    })
  },
  getAddressList(){
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://127.0.0.1:3000/student/address/allList',
      method: 'POST',
      data: {
        userId: user_id
      },
      success: (listRes) => {
        this.setData({
          addressList: listRes.data.list
        })
        console.log(listRes.data.list);
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getAddressList()
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