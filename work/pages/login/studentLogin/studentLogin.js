// pages/login/studentLogin/studentLogin.js
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
              role: 'user'
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
                      url: '/pages/student/main/main',
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
  register() {
    wx.redirectTo({
      url: '/pages/login/register/register?role=user',
    })
  }
})