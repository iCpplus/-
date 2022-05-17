// components/rider/home/home.js
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
    list: [],
    userInfo:{}
  },
  lifetimes: {
    ready() {
      this.getOrderList()
      this.getUserInfo()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo() {
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
            userInfo: res.data.data
          })
        }
      })
    },
    fightOrder(e) {
      const {
        orderid
      } = e.currentTarget.dataset
      wx.request({
        url: 'http://127.0.0.1:3000/rider/order/fight',
        method: 'POST',
        data: {
          riderName:this.data.userInfo.nickname||'专业配送员',
          riderId:this.data.userInfo.user_id,
          riderPhone:this.data.userInfo.phone,
          orderId:orderid
        },
        success: res => {
          if(res.data.code==200){
            Notify({
              type: 'primary',
              message: '抢单成功',
            });

          }else{
            Notify({
              type: 'danger',
              message: '抢单失败',
            });
          }
          this.getOrderList()
        }
      })
    },

    getOrderList() {

      wx.request({
        url: 'http://127.0.0.1:3000/rider/order/list',
        method: 'POST',
        data: {},
        success: res => {
          const arr = res.data.list.filter(item => {
            return item.order_status == 1
          })
          this.setData({
            list: arr
          })
        }
      })
    },
  }
})