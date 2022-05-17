// components/student/profile/profile.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
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
    userInfo:{},
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: 'QQ', icon: 'qq' },
      { name: '微博', icon: 'weibo' },
      { name: '二维码', icon: 'qrcode' }
    ],
  },
  lifetimes: {
    ready() {
      this.getUserInfo()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
            userInfo: res.data.data
          })
        }
      })
    },
    showRules(){
      Dialog.alert({
        title: '资质规则',
        message: '一切资质规则解释权归中工好饿所有',
      }).then(() => {
        // on close
      });
    },
    showAgreement(){
      Dialog.alert({
        title: '使用协议',
        message: '一切使用协议解释权归中工好饿所有',
      }).then(() => {
        // on close
      });
    },
    showVIP(){
      Dialog.alert({
        message: '好饿会员即将上线',
      }).then(() => {
        // on close
      });
    },
    showService(){
      Dialog.alert({
        title: '我的客服',
        message: '客服电话：0371-8888888',
      }).then(() => {
        // on close
      });
    },
    goAccountSetting(){
      wx.navigateTo({
        url: '/pages/account/account',
      })
    },
    goAddressManage(){
      wx.navigateTo({
        url: '/pages/student/addressManage/adressList/adressList',
      })
    },
    inviteUser() {
      this.setData({ showShare: true });
    },
  
    onClose() {
      this.setData({ showShare: false });
    },
  
    onSelect(event) {
      Toast(event.detail.name);
      this.onClose();
    },
  }
})
