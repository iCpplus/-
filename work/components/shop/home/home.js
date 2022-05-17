// components/shop/home/home.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    shopDetail: {},
    foodList:[]
  },
  lifetimes: {
    ready() {
      this.getShopDetail().then(res => {
        console.log(res);
        this.getFoodList(res)
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    editFood(e) {
      const {
        foodid
      } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/shop/foodAdd/foodAdd?foodId=${foodid}`,
      })
    },
    deleteFood(e){
      const {
        foodid
      } = e.currentTarget.dataset
      wx.request({
        url: 'http://127.0.0.1:3000/shop/food/delete',
        method: 'POST',
        data: {
          foodId:foodid
        },
        success: (res) => {
          this.getFoodList()
        }
      })
    },
    getFoodList(storeId) {
      wx.request({
        url: 'url',
        url: 'http://127.0.0.1:3000/shop/food/list',
        method: 'POST',
        data: {
          storeId: storeId
        },
        success: (listRes) => {
          this.setData({
            foodList: listRes.data.list
          })
        }
      })
    },
    getShopDetail() {
      return new Promise(resolve => {
        const {
          user_id
        } = wx.getStorageSync("userInfo")
        wx.request({
          url: 'url',
          url: 'http://127.0.0.1:3000/shop/detail',
          method: 'POST',
          data: {
            userId: user_id
          },
          success: (detailRes) => {
            console.log(detailRes);
            wx.setStorageSync('storeId', detailRes.data.shopDetail.store_id)
            this.setData({
              shopDetail: detailRes.data.shopDetail
            })
            wx.setStorageSync('storeId', detailRes.data.shopDetail.store_id)
            resolve(detailRes.data.shopDetail.store_id)
          }
        })
      })
    },
    shopEdit() {
      wx.navigateTo({
        url: '/pages/shop/shopEdit/shopEdit'
      })
    },
    addFood() {
      wx.navigateTo({
        url: '/pages/shop/foodAdd/foodAdd'
      })
    }
  }
})