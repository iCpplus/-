// pages/login/riderLogin/riderLogin.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  login() {
    if (!this.data.username) {
      Notify({
        message: '请输入用户名'
      });
      return
    } else if (!this.data.password) {
      Notify({
        message: '请输入密码'
      });
      return
    }
    const md5 = require('../../../assets/js/md5');
    wx.request({
      url: 'http://127.0.0.1:3000/getSalt',
      method: 'POST',
      data: {
        username: this.data.username
      },
      success: (res) => {
        if (res.data.code == 200) {
          const {
            salt
          } = res.data
          wx.request({
            url: 'http://127.0.0.1:3000/login',
            method: 'POST',
            data: {
              username: this.data.username,
              password: md5.hexMD5(this.data.password + salt),
              role: 'runner'
            },
            success: (loginRes) => {
              console.log(loginRes);
              if (loginRes.data.code == 200) {
                wx.setStorageSync('userInfo', loginRes.data.data)
                Notify({
                  type: 'primary',
                  message: '登录成功',
                  duration: 1000,
                  onClose: () => {
                    wx.redirectTo({
                      url: '/pages/rider/main/main',
                    })
                  }
                });
              } else {
                Notify({
                  message: loginRes.data.msg
                });
              }
            },
            fail: (err) => {
              Notify(err);
            }
          })

        } else {
          Notify(res.data.msg);
        }
      }
    })
  },
  register(){
    wx.redirectTo({
      url: '/pages/login/register/register?role=runner',
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