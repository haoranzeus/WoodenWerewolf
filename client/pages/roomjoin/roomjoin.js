// pages/roomjoin/roomjoin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_num: 0,
    join_code: '0',
    openid: '',
    nick: '',
    role: '未知'
  }, 
  
  //事件处理函数
  bindKeyInputRoomNum: function (e) {
    this.setData({
      room_num: e.detail.value
    })
  },
  bindKeyInputJoinCode: function (e) {
    this.setData({
      join_code: e.detail.value
    })
  },
  joinRoom: function(e) {
    var that = this;
    wx.showModal({
      title: '确定加入房间：' + that.data.room_num,
      content: '加入房间将获得角色卡牌',

      success: function () {
        // TODO 此处将数据上传至服务器，并获取加入码
        wx.request({
          url: 'http://172.18.1.60:5000/werewolf/joinroom/',
          data: {
            openid: that.data.openid,
            nick_name: that.data.nickname,
            room_num: that.data.room_num,
            join_code: that.data.join_code
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              role: res.data['role']
            })
          },
          method: "POST"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickname: options.nickname
    })
    var that = this
    //test 登录测试
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://172.18.1.60:5000/werewolf/onlogin/',
            data: {
              code: res.code
            },
            success: function (res) {
              var openid = res.data['openid']
              that.setData({
                openid: openid
              });
            },
            method: "POST"
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // end test
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