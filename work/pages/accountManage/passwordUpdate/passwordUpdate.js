// pages/accountManage/passwordUpdate/passwordUpdate.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    oldPsaaword:'',
    newPassword:''
  },
  saveInfo(){
    const md5 = require('../../../assets/js/md5');

    const user = wx.getStorageSync("userInfo")
    let str = md5.hexMD5(this.data.oldPassword+user.salt)
    if(this.data.phone!=user.phone){
      Notify({
        type: 'danger',
        message: '手机号不正确'
      });
      return
    }else if(str!=user.password){
      Notify({
        type: 'danger',
        message: '旧密码不正确'
      });
      return
    }else if(!this.data.newPassword){
      Notify({
        type: 'danger',
        message: '请输入新密码'
      });
      return
    }
    wx.request({
      url: 'http://127.0.0.1:3000/updatePassword',
      method: 'POST',
      data: {
        userId:user.user_id,
        password:md5.hexMD5(this.data.newPassword+user.salt)
      },
      success: (res) => {
        Notify({
          type: 'primary',
          message: '修改成功',
          duration:1000,
          onClose:()=>{
            wx.reLaunch({
              url: '../../login/login/login',
            })
          }
        });
      }
    }
    )

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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