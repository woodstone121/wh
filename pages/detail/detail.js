// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
const AV = require('../../libs/av-weapp-min');

Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hiddenDetail: false,
    hiddenSpecification: true,
    hiddenBrand: true,
    payNow: true,
    maskVisual: 'hidden',
    specification: '',
    description: ''
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
      .then(items => {
        return that.loadData(items[0]);
      })
      .catch(console.error);
  },
  loadData:function(data){
    var productItem = data;
    var obj = JSON.parse(JSON.stringify(productItem));
    var specification = obj.specification;
    var description = obj.description;
    this.setData({ 
        productItem: productItem
    })
    this.setData({ 
        specification: specification,
        description: description
    })

    WxParse.wxParse('specification', 'html', specification, this, 10);
    WxParse.wxParse('description', 'html', description, this, 10);
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