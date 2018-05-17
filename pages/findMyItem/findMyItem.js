// pages/findMyItem/findMyItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },
  voiceSearch: function () {
    wx.navigateTo({
      url: '../voiceSearch/voiceSearch',
    })
  },

  navigateBack: function () {
    wx.navigateBack({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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