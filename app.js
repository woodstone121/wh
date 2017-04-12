//app.js
// App({
//   onLaunch: function () {
//     //调用API从本地缓存中获取数据
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)
//   },
//   getUserInfo:function(cb){
//     var that = this
//     if(this.globalData.userInfo){
//       typeof cb == "function" && cb(this.globalData.userInfo)
//     }else{
//       //调用登录接口
//       wx.login({
//         success: function () {
//           wx.getUserInfo({
//             success: function (res) {
//               that.globalData.userInfo = res.userInfo
//               typeof cb == "function" && cb(that.globalData.userInfo)
//             }
//           })
//         }
//       })
//     }
//   },
//   globalData:{
//     userInfo:null
//   }
// })

const AV = require('./libs/av-weapp-min.js');

AV.init({
  appId: 'LzBhLSKlEF0PiggU0O1KaVGc-gzGzoHsz',
  appKey: 'jpfDHXLN72vFjDyPrKYKNM0h',
});

App({
    onLaunch: function () {
      console.log('onLaunch')
    },
    onShow: function () {
      console.log('onShow')
    },
    onHide: function () {
      console.log('onHide')
    },
    globalData: {
      userInfo: null
    }
  });