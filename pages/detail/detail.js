// pages/detail/detail.js
var Bmob = require('../../utils/bmob.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var id = options.id

    var that = this
    var Message = Bmob.Object.extend("Message");
    var query = new Bmob.Query(Message);
    query.equalTo("objectId", id);

    query.find({
      success: function (results) {
        // 循环处理查询到的数据
        console.log(JSON.stringify(results))
        if (results.length > 0) {
          var item = results[0]
          var message = {}
          message.title = item.get("title")
          message.content = item.get("content")
          message.avatarUrl = item.get("avatarUrl")
          message.publisher = item.get("publisher")
          message.images = item.get("images")
          message.id = item.id
          message.date = item.createdAt
          that.setData({
            message: message
          })
        }
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
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