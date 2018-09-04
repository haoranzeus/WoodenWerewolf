// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from_info: {}
  },

  getUserInfo: function (e){
    console.log(this.data.from_info);
    // 这里回头可以写成更通用的形式
    var base_url = this.data.from_info.back_url;
    var room_num = this.data.from_info.room_num;
    var url = base_url + '?' + room_num;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
            wx.navigateTo({
            url: url
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      from_info: options
    })
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