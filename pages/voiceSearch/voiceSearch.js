var netUtil = require("../../utils/netUtil.js");
const util = require("../../utils/util.js");
const app = getApp();
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    recorderManager: null,
    infrastructures: [{ "icon": "../../images/user_icon@2x.png", "title": "收银台" },
    { "icon": "../../images/user_icon@2x.png", "title": "卫生间" },
    { "icon": "../../images/user_icon@2x.png", "title": "寄存柜" },
    { "icon": "../../images/user_icon@2x.png", "title": "电梯" },
    ],
    category: [{ "categoryName": "粮油副食", "subCategory": ["米", "面", "油", "杂粮", "干货", "副食"] },
    { "categoryName": "母婴之家", "subCategory": ["尿不湿", "奶粉"] },
    { "categoryName": "休闲食品", "subCategory": ["零食", "糖果／巧克力", "坚果／凉果", "饼干／糕点"] },
    { "categoryName": "生鲜", "subCategory": ["香梨", "苹果", "榴莲", "哈密瓜"] }],
    hotSearchItem: ["大米", "酸奶", "进口食品", "新鲜牛肉", "白酒", "油"],
    recording: false,
    tips: '',
    startY: 0,
  },

  recordBtnTouchM: function (e) {
    var endY = 0
    if (e.touches.length > 0) {
      endY = e.touches[0].clientY
    }
    if (endY > 0 && (Math.abs(endY - this.data.startY) > 50)) {
      this.setData({
        tips: "手指松开 取消搜索",
      })
    } else {
      this.setData({
        tips: "手指上滑 取消搜索",
      })
    }
  },

  startRecord: function (e) {
    console.log('########## start ##########' + JSON.stringify(e))
    var startY = 0
    if (e.touches.length > 0) {
      startY = e.touches[0].clientY
    }
    this.setData({
      recording: true,
      tips: "手指上滑 取消搜索",
      startY: startY
    })

    // begin recorder
    that.data.recorderManager.start(that.data.options)
  },

  stopRecord: function (e) {
    console.log('########## stop ##########' + JSON.stringify(e))
    this.setData({
      recording: false,
      startY: 0
    })

    // end recorder
    that.data.recorderManager.stop();
  },

  navigateBack: function () {
    wx.navigateBack({
    })
  },

  showTips: function (tip) {
    wx.showModal({
      title: '',
      content: tip,
      showCancel: false
    })
  },

  searchItems: function (keyword) {
    console.log("searchItems:" + keyword);
    
    var url = 'http://qa-search.walmartmobile.cn/mobile/search?v=1.4&storeId=' + app.globalData.curStore.storeId + '&categoryId=&pageSize=20&orderStoreId=&keyword=' + keyword;
    wx.request({
      url: url,
      success: function (res) {
        console.log("voice searchItems success:" + JSON.stringify(res))
        if (res.data.error == 0) {
          var items = res.data.data.detailedItems;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.strPriceWithTax = util.changeTwoDecimal_f(item.priceWithTax);
          }
          // app.globalData.searchResult = items;
          // wx.navigateTo({
          //   url: '../searchResult/searchResult',
          // })
        } else {
          that.showTips('搜索商品出错1')
        }
      },
      fail: function (res) {
        console.log("searchItems fail:" + JSON.stringify(res))
        that.showTips('搜索商品出错2')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.data.recorderManager = wx.getRecorderManager();
    that.data.recorderManager.onStart(() => {
      console.log('recorder start')
    })
    that.data.recorderManager.onResume(() => {
      console.log('recorder resume')
    })
    that.data.recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    that.data.recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      
      if (that.data.tips == "手指松开 取消搜索") {
        console.log('recorder cancel')
        return
      }

      that.data.tips = ''

      netUtil.showLoadingDialog(that, netUtil.requestConfig.canUseWxLoading);

      var tempFilePath = res.tempFilePath
      wx.uploadFile({
        //url: 'http://192.168.19.249:8080/ml/file/uploadSILKFile',
        url: 'http://192.168.19.249:8080/ml/file/uploadAudioFile',
        filePath: tempFilePath,
        name: 'file',
        success: function (res) {
          console.log("upload recorder file success :" + JSON.stringify(res));
          var data = res.data;
          var jsonData = JSON.parse(data);
          console.log("msg:" + jsonData.msg);
          if (jsonData.code == 0) {
            that.searchItems(jsonData.msg);
          } else {
            that.showTips('语音识别出错')
          }
        },
        fail: function (res) {
          console.log("upload recorder file fail :" + JSON.stringify(res));
          that.showTips('上传语音文件出错')
        },
        complete: function (res) {
          netUtil.hideLoadingDialog(that, netUtil.requestConfig.canUseWxLoading);
        }
      })
    })
    that.data.recorderManager.onFrameRecorded((res) => {
      console.log('onFrameRecorded');
      // const { frameBuffer } = res
      // console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    that.data.options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})