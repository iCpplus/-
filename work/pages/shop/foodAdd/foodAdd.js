// pages/shop/foodAdd/foodAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodName: '',
    foodDesc: '',
    foodPrice: '',
    foodCate: '1',
    foodCateName:'',
    fileList: [],
    foodId: '',
    columns: [],
    cateList: [],
    cateShow: false
  },
  showCateSelect(){
    this.setData({
      cateShow:true
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
        let arr=[]
        res.data.list.forEach(item=>{
          arr.push(item.category_name)
        })
        this.setData({
          cateList:res.data.list,
          columns:arr
        })
      }
    })
  },
  onChange(event) {
    const {
      value
    } = event.detail;
    console.log(value);
    let valueId;
    this.data.cateList.forEach(item => {
      if (value == item.category_name) {
        valueId = item.category_id
      }
    })
    this.setData({
      foodCate: valueId,
      foodCateName:value
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
  addFood() {
    const {
      user_id
    } = wx.getStorageSync("userInfo")
    const storeId = wx.getStorageSync("storeId")
    if (this.data.foodId) {
      wx.request({
        url: 'http://127.0.0.1:3000/shop/food/update',
        method: 'POST',
        data: {
          foodId: this.data.foodId,
          foodName: this.data.foodName,
          foodPrice: this.data.foodPrice,
          foodDescription: this.data.foodDesc,
          foodIcon: this.data.fileList[0].url,
          foodCate: this.data.foodCate
        },
        success: (addRes) => {
          wx.reLaunch({
            url: '/pages/shop/main/main'
          })
        }
      })
    } else {
      wx.request({
        url: 'http://127.0.0.1:3000/shop/food/add',
        method: 'POST',
        data: {
          storeId: storeId,
          foodName: this.data.foodName,
          foodPrice: this.data.foodPrice,
          foodDescription: this.data.foodDesc,
          foodIcon: this.data.fileList[0].url,
          foodCate: this.data.foodCate
        },
        success: (addRes) => {
          wx.reLaunch({
            url: '/pages/shop/main/main'
          })
        }
      })
    }

  },

  getFoodDetail(foodId) {
    wx.request({
      url: 'http://127.0.0.1:3000/shop/food',
      method: 'POST',
      data: {
        foodId: foodId
      },
      success: (res) => {
        console.log(res);

        this.setData({
          foodName: res.data.data.food_name,
          foodDesc: res.data.data.food_description,
          foodPrice: res.data.data.food_price,
          foodCate: res.data.data.category_type,
          fileList: [{
            url: res.data.data.food_icon,
            name: 'name'
          }]
        })
      }
    })
  },
  onClose() {
    this.setData({
      cateShow: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList()
    if (options.foodId) {
      this.setData({
        foodId: options.foodId
      })
      this.getFoodDetail(options.foodId)
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