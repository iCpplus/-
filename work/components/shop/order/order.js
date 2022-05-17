// components/shop/order/order.js
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
    acceptOrder(e){
      const {orderid}= e.currentTarget.dataset
      wx.request({
        url: 'http://127.0.0.1:3000/shop/orderStatus/update',
        method: 'POST',
        data: {
          orderId:orderid,
          status:1
        },
        success: res => {
          this.getOrderList()
          Notify({
            type: 'primary',
            message: '接单成功'
          });
        }
      })
    },
    getOrderList(){
      const 
        storeId
       = wx.getStorageSync("storeId")
      wx.request({
        url: 'http://127.0.0.1:3000/shop/order/list',
        method: 'POST',
        data: {
          storeId:storeId
        },
        success: res => {
          this.setData({
            list:res.data.list,
            currentList:res.data.list
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
          return item.order_status == 0
        })
        this.setData({
          currentList:arr
        })
      }else if(name=='c'){
        const arr= this.data.list.filter(item=>{
          return item.order_status == 2
        })
        this.setData({
          currentList:arr
        })
      }else if(name=='d'){
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
        url: '/pages/student/comment/comment?orderId='+item.order_id+'&flag='+2+'&storeId='+'a',
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
