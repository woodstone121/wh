// pages/home/home.js
const AV = require('../../libs/av-weapp-min');

Page({
  data:{
    homeItems: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    new AV.Query('HomeItem')
      .ascending('rowLocation')
      .find()
      .then(homeItems => this.setData({ homeItems }))
      .catch(console.error);
    
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})