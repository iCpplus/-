// pages/shop/shopEdit/shopEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName: '',
    shopDesc: '',
    phone: '',
    shopAddress: '',
    minPrice: '',
    postPrice: '',
    startDate: '',
    endDate: '',
    minHour: 0,
    maxHour: 24,
    startShow: false,
    endShow: false,
    storeStatus: '1',
    fileList: [],
    checked: true
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
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
  getShopDetail() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://127.0.0.1:3000/shop/detail',
      method: 'POST',
      data: {
        userId: user_id
      },
      success: (detailRes) => {
        console.log(detailRes);
        const {
          shopDetail
        } = detailRes.data
        let startDate
        let endDate
        if (shopDetail.store_open_time) {
          startDate = shopDetail.store_open_time.split('-')[0]
          endDate = shopDetail.store_open_time.split('-')[1]
        } else {
          startDate = '08:00'
          endDate = '22:00'
        }
        if (shopDetail.store_icon) {
          this.setData({
            fileList: [{
              url: shopDetail.store_icon,
              name: '图片',
            }]
          })
        }

        this.setData({
          shopName: shopDetail.store_name,
          shopDesc: shopDetail.store_desc,
          phone: shopDetail.store_phone,
          shopAddress: shopDetail.store_address,
          minPrice: shopDetail.min_price,
          postPrice: shopDetail.post_price,
          startDate: startDate,
          endDate: endDate,
          storeStatus: shopDetail.store_status,
          checked: shopDetail.store_status == 1 ? true : false
        })
      }
    })
  },
  confirmShopInfo() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    if (!this.data.shopName) {

    }
    wx.request({
      url: 'http://127.0.0.1:3000/shop/update',
      method: 'POST',
      data: {
        userId: user_id,
        storeName: this.data.shopName,
        storePhone: this.data.phone,
        storeAddress: this.data.shopAddress,
        storeIcon: this.data.fileList[0].url,
        storeOpenTime: this.data.startDate + '-' + this.data.endDate,
        storeStatus: this.data.checked ? '1' : 0,
        storeDesc: this.data.shopDesc,
        minPrice: this.data.minPrice,
        postPrice: this.data.postPrice
      },
      success: (detailRes) => {
        wx.reLaunch({
          url: '/pages/shop/main/main'
        })
      }
    })

  },
  editStartDate() {
    this.setData({
      startShow: true
    })
  },
  editEndDate() {
    this.setData({
      endShow: true
    })
  },
  onInputStart(event) {
    this.setData({
      startDate: event.detail,
    });
  },
  onInputEnd(event) {
    this.setData({
      endDate: event.detail,
    });
  },
  onClose() {
    this.setData({
      startShow: false,
      endShow: false
    });
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
    this.getShopDetail()
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