// components/student/order/order.js
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
    list:[],
    currentList:[]
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
    cancelOrder(e){
      const {
        user_id
      } = wx.getStorageSync("userInfo")
      const {orderid}=e.currentTarget.dataset
      wx.request({
        url: 'http://127.0.0.1:3000/student/orderStatus/update',
        method: 'POST',
        data: {
          userId: user_id,
          orderId:orderid,
          status:4
        },
        success: res => {
          this.getOrderList()
          Notify({
            type: 'primary',
            message: '取消成功'
          });
        }
      })
    },
    getOrderList(){
      const {
        user_id
      } = wx.getStorageSync("userInfo")
      wx.request({
        url: 'http://127.0.0.1:3000/student/order/list',
        method: 'POST',
        data: {
          userId: user_id
        },
        success: res => {
          this.setData({
            list:res.data.list,
            currentList:res.data.list
          })
        }
      })
    },
    goComment(e){
      const {item} = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/student/comment/comment?orderId='+item.order_id+'&flag='+0+'&storeId='+item.store_id,
      })
    },
    lookComment(e){
      const {item} = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/student/comment/comment?orderId='+item.order_id+'&flag='+1+'&storeId='+item.store_id,
      })
    },
    confirmOrder(e){
      const {item} = e.currentTarget.dataset
      wx.request({
        url: 'http://127.0.0.1:3000/student/orderStatus/update',
        method: 'POST',
        data: {
          storeId:item.store_id,
          orderId: item.order_id,
          status:3,
          riderId:item.runner_id,
          storeUserId:item.store_user_id
        },
        success: res => {
          if(res.data.code=200){
            Notify({
              type: 'primary',
              message: '已确认收货',
            });
          }else{
            Notify({
              type: 'danger',
              message: '确认收货失败',
            });
          }
          this.getOrderList()

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
          return item.order_status == 3
        })
        this.setData({
          currentList:arr
        })
      }else if(name=='c'){
        const arr= this.data.list.filter(item=>{
          return item.order_status == 4
        })
        this.setData({
          currentList:arr
        })
      }
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
