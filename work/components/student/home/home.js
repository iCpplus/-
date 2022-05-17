// components/student/home/home.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
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
    value: '',
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    activityList: [{
        url: "/assets/images/swiper1.png"
      },
      {
        url: "/assets/images/swiper2.png"
      },
      {
        url: "/assets/images/swiper3.png"
      }
    ],
    option1: [{
        text: '综合排序',
        value: 0
      },
      {
        text: '销量最高',
        value: 1
      },
      // {
      //   text: '好评优先',
      //   value: 2
      // },
      // {
      //   text: '人均消费最低到最高',
      //   value: 3
      // },
    ],
    option2: [{
        text: '所有类型',
        value: 'a'
      },
      // {
      //   text: '汉堡薯条',
      //   value: 'b'
      // },
      // {
      //   text: '热干面',
      //   value: 'c'
      // },
      // {
      //   text: '酸辣粉',
      //   value: 'd'
      // },
      // {
      //   text: '生煎',
      //   value: 'e'
      // },
      // {
      //   text: '米饭',
      //   value: 'f'
      // },
    ],
    value1: 0,
    value2: 'a',
    shopList: [],
    list: []

  },
  lifetimes: {
    ready() {
      this.getAnnounce()
      this.getShopList()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange1(value){
      console.log(this.data.list);
      if(value.detail == 0){
        this.setData({
          shopList:this.data.list
        })
      }else if(value.detail == 1){
        let arr = this.data.shopList.sort((a,b)=>{
          return b.order_quantity-a.order_quantity
        })
        this.setData({
          shopList:arr
        })
      }
    },
    onSearch() {
      const arr = this.data.list.filter(item => {
        return item.store_name.includes(this.data.value)
      })
      this.setData({
        shopList: arr
      })
    },
    getAnnounce() {
      wx.request({
        url: 'http://127.0.0.1:3000/student/announce/list',
        method: 'POST',
        data: {},
        success: res => {
          this.setData({
            activityList: res.data.list
          })
        }
      })
    },
    getShopList() {
      wx.request({
        url: 'http://127.0.0.1:3000/student/shop/list',
        method: 'POST',
        data: {},
        success: res => {
          this.setData({
            shopList: res.data.list,
            list: res.data.list.map(item=>{
              return item
            })
          })
        }
      })
    },
    goAnnounce(e) {
      const {
        item
      } = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/student/announce/announce?item=' + encodeURIComponent(JSON.stringify(item)),
      })
    },
    goShopPage(e) {
      const {
        item
      } = e.currentTarget.dataset
      if(item.store_status!=1){
        Notify({
          type: 'danger',
          message: '该店铺暂不营业！'
        });
        return
      }
      wx.navigateTo({
        url: '/pages/student/shopDetail/shopDetail?storeId=' + item.store_id,
      })
    }
  }
})