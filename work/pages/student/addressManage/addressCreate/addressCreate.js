// pages/student/addressManage/addressCreate/addressCreate.js
import Notify from '../../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    address: '',
    doorNum: '',
    name: '',
    phone: '',
    editFlag: false,
    addressId: ''
  },
  saveAddress() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    if (this.data.editFlag) {
      wx.request({
        url: 'http://127.0.0.1:3000/student/address/update',
        method: 'POST',
        data: {
          userId: user_id,
          name: this.data.name,
          phone: this.data.phone,
          address: this.data.address + ' ' + this.data.doorNum,
          defaultAddress: this.data.checked ? 1 : 0,
          addressId: this.data.addressId
        },
        success: (addRes) => {
          if (addRes.data.code == 200) {
            Notify({
              type: 'primary',
              message: '修改成功',
              duration: 1000,
              onClose: () => {
                wx.navigateBack({
                  delta: 0,
                })
              }
            });
          } else {
            Notify({
              message: '修改失败'
            });
          }
        }
      })
    } else {
      wx.request({
        url: 'http://127.0.0.1:3000/student/address/add',
        method: 'POST',
        data: {
          userId: user_id,
          name: this.data.name,
          phone: this.data.phone,
          address: this.data.address + ' ' + this.data.doorNum,
          defaultAddress: this.data.checked ? 1 : 0
        },
        success: (addRes) => {
          if (addRes.data.code == 200) {
            Notify({
              type: 'primary',
              message: '添加成功',
              onClose: () => {
                wx.navigateBack({
                  delta: 0,
                })
              }
            });
          } else {
            Notify({
              message: '添加失败'
            });
          }
        }
      })
    }
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.address) {
      const address = JSON.parse(decodeURIComponent(options.address))
      const arr = address.address.split(' ')
      this.setData({
        checked: address.default_address == 1 ? true : false,
        address: arr[0],
        doorNum: arr[1],
        name: address.name,
        phone: address.phone,
        editFlag: true,
        addressId:address.address_id
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