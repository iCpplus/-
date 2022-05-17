// pages/login/register/register.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    role: ''
  },
  register() {
    if (!this.data.username) {
      Notify('请输入用户名');
      return
    } else if (this.data.phone.length!=11) {
      Notify('请输入正确手机号');
      return
    } else if (!this.data.password) {
      Notify('请输入密码');
      return
    } else if (this.data.password != this.data.passwordConfirm) {
      Notify('两次密码输入不相同');
      return
    }
    const md5 = require('../../../assets/js/md5');
    const salt = Math.round(Math.random() * 100000000)
    wx.request({
      url: 'http://127.0.0.1:3000/register',
      method: 'POST',
      data: {
        username: this.data.username,
        phone: this.data.phone,
        password: md5.hexMD5(this.data.password+salt),
        role: this.data.role,
        salt: salt
      },
      success: (res) => {
        console.log(res);
        if(res.data.code == 200){
          Notify({
            type: 'primary',
            message: '注册成功',
            duration: 1000,
            onClose:()=>{
              wx.navigateBack({
                delta: 0,
              })
            }
          });
        }else{
          Notify({
            message: '注册失败'
          });
        }
        
      },
      fail:(err)=>{
        Notify(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const {
      role
    } = options
    this.setData({
      role: role
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