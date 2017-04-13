// pages/detail/detail.js
const AV = require('../../libs/av-weapp-min');

Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hiddenDetail: false,
    hiddenSpecification: true,
    hiddenBrand: true
  },
  toDetail:function(){
    console.log("to detail");
    this.setData({ 
        hiddenDetail: false,
        hiddenSpecification: true,
        hiddenBrand: true
      })
  },
  toSpecification:function(){
    console.log("to specification");
    this.setData({ 
        hiddenDetail: true,
        hiddenSpecification: false,
        hiddenBrand: true
      })
  },
  toBrand:function(){
    console.log("to brand");
    this.setData({ 
        hiddenDetail: true,
        hiddenSpecification: true,
        hiddenBrand: false
      })
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    new AV.Query('ProductItem')
      .equalTo('productId', options.productId)
      .find()
      .then(items => this.setData({ 
        productItem: items[0]
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