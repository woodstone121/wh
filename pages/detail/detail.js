// pages/detail/detail.js
const AV = require('../../libs/av-weapp-min');

Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    new AV.Query('ProductItem')
      .equalTo('productId', options.productId)
      .find()
      .then(items => this.setData({ 
        productItem: items[0].object, 
        goodsPicsInfo: function(items) {
          var goodsPicsInfo = []
          var goodspic = items[0].object.swiper
          var goodspics = goodspic.substring(0, goodspic.length - 1) 
          var goodspicsArr = goodspics.split("#") 
          for (var i = 0; i < goodspicsArr.length; i++) {
            goodsPicsInfo.push({
              "picurl": goodspicsArr[i]
            })
          }
          return goodsPicsInfo;
        }
      }))
      .catch(console.error);
  },
  onReady:function(){
    // 页面渲染完成
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