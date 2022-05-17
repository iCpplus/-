// pages/accountManage/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    fileList: [],
  },
  getUserInfo(){
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
          nickname: res.data.data.nickname
        })
      }
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    console.log(file);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://www.xianchangqiangguo.com/apis/course/api/upload/pic?token=undefined', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'picFile',
      success: (res) => {
        const datas = JSON.parse(res.data)
        this.setData({
          fileList: [{
            name: '图片',
            url: datas.data
          }]
        })
        // 上传完成需要更新 fileList
        // const { fileList = [] } = this.data;
        // fileList.push({ ...file, url: res.data });
        // this.setData({ fileList });
      },
    });
  },

  deleteImage(event) {
    console.log(this.data.fileList);
    this.setData({
      fileList: []
    })
    console.log(this.data.fileList);
  },
  saveInfo() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://127.0.0.1:3000/userInfo/update',
      method: 'POST',
      data: {
        userId: user_id,
        nickname:this.data.nickname,
        iconUrl:this.data.fileList[0].url
      },
      success: res => {
        wx.navigateBack({
          delta: 0,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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