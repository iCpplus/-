// components/rider/order/order.js
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
    active:'a',
    list: [],
    currentList: []
  },
  lifetimes: {
    ready() {
      this.getOrderList()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getOrderList() {
      const {
        user_id
      } = wx.getStorageSync("userInfo")
      wx.request({
        url: 'http://127.0.0.1:3000/rider/riderOrder/list',
        method: 'POST',
        data: {
          riderId: user_id
        },
        success: res => {
          this.setData({
            list: res.data.list,
            currentList: res.data.list
          })
        }
      })
    },
    onChange(event) {
      console.log(event.detail.name);
      const {name} = event.detail
      if(name =='a'){
        this.setData({
          currentList:this.data.list
        })
      }else if(name=='b'){
        const arr= this.data.list.filter(item=>{
          return item.order_status == 2
        })
        this.setData({
          currentList:arr
        })
      }else if(name=='c'){
        const arr= this.data.list.filter(item=>{
          return item.order_status == 3||item.order_status == 6
        })
        this.setData({
          currentList:arr
        })
      }
    },
    goComment(e){
      const {item} = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/student/comment/comment?orderId='+item.order_id+'&flag='+3+'&storeId='+'a',
      })
    },
    delivery(e){
      const {id} = e.currentTarget.dataset
      wx.request({
        url: 'http://127.0.0.1:3000/rider/orderStatus/update',
        method: 'POST',
        data: {
          orderId: id,
          status:7
        },
        success: res => {
          if(res.data.code==200){
            Notify({
              type: 'primary',
              message: '送达成功',
            });
          }else{
            Notify({
              type: 'danger',
              message: '送达失败',
            });
          }
          this.getOrderList()
        }
      })
    },
    goOrderDetail(e) {
      const {item} = e.currentTarget.dataset
      item.create_time = item.create_time.substr(0,10)
      wx.navigateTo({
        url: '/pages/shop/orderDetail/orderDetail?item='+encodeURIComponent(JSON.stringify(item)),
      })
    }
  }
})