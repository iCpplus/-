// pages/student/shopDetail/shopDetail.js
const computedBehavior = require('../../../miniprogram_npm/miniprogram-computed/index').behavior
Page({
  behaviors: [computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    shopDetail: {},
    selectFoods: [],
    commentList: [],
    cateList: []
  },
  computed: {
    selectNum(data) {
      let num = 0
      data.selectFoods.forEach(item => {
        num += item.num
      })
      return num
    },
    allPrice(data) {
      let price = 0
      data.selectFoods.forEach(item => {
        price += item.food_price * item.num
      })
      return price
    },
    minPriceFlag(data) {
      if (data.allPrice < data.shopDetail.min_price) {
        return false
      } else {
        return true
      }
    }
  },
  selectCate(e) {
    const {
      cateid
    } = e.currentTarget.dataset
    console.log('aaaaaa',cateid);
    let arr = this.data.shopDetail.foods.filter(item => {
      return item.category_type == cateid
    })
    this.setData({
      currentList: arr
    })
  },
  getAll(){
    this.setData({
      currentList: this.data.shopDetail.foods
    })
  },
  clearAll() {
    this.setData({
      selectFoods: []
    })
  },
  foodNumAdd(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.data.selectFoods.forEach((item, index) => {
      if (item.food_id == id) {
        item.num++
      }
    })
    this.setData({
      selectFoods: this.data.selectFoods
    })
  },
  foodNumDecrease(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.data.selectFoods.forEach((item, index) => {
      if (item.food_id == id) {
        if (item.num > 1) {
          item.num--
        } else {
          this.data.selectFoods.splice(index, 1)
        }
      }
      this.setData({
        selectFoods: this.data.selectFoods
      })
    })
  },
  selectFood(e) {
    const {
      food
    } = e.currentTarget.dataset
    let flag = true
    this.data.selectFoods.forEach(item => {
      if (item.food_id == food.food_id) {
        item.num++
        console.log(this.data.selectFoods);
        this.setData({
          selectFoods: this.data.selectFoods
        })
        flag = false
      }
    })
    if (flag) {
      food.num = 1
      this.data.selectFoods.push(food)
      this.setData({
        selectFoods: this.data.selectFoods
      })
    }

  },
  getCateList(id) {
    const storeId = id
    wx.request({
      url: 'http://127.0.0.1:3000/shop/foodCate/list',
      method: 'POST',
      data: {
        shopId: storeId
      },
      success: (res) => {
        this.setData({
          cateList: res.data.list,
        })
      }
    })
  },
  getComment(id) {
    wx.request({
      url: 'http://127.0.0.1:3000/student/comment/list',
      method: 'POST',
      data: {
        storeId: id
      },
      success: res => {
        res.data.list.forEach(item => {
          item.create_time = item.create_time.substr(0, 10)
        })
        this.setData({
          commentList: res.data.list
        })
      }
    })
  },
  goDetailConfirm() {
    if (this.data.minPriceFlag) {
      const detail = {
        foodsPrice: this.data.allPrice,
        minPrice: this.data.shopDetail.min_price,
        foods: this.data.selectFoods,
        allPrice: this.data.allPrice,
        shopDetail: this.data.shopDetail
      }
      console.log(detail);
      wx.navigateTo({
        url: '/pages/student/orderConfirm/orderConfirm?detail=' + encodeURIComponent(JSON.stringify(detail))
      })
    }
  },
  showSheet() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      storeId
    } = options
    this.getComment(storeId)
    wx.request({
      url: 'http://127.0.0.1:3000/student/shop/detail',
      method: 'POST',
      data: {
        storeId: storeId
      },
      success: res => {
        this.setData({
          shopDetail: res.data.shopDetail,
          currentList:res.data.shopDetail.foods

        })
        this.getCateList(res.data.shopDetail.store_id)
      }
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