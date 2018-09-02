// pages/roomcreate/roomcreate.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_role_werewolf: '< 狼人 >',
    title_role_townsfolk: '< 平民 >',
    title_role_gold: '< 神 >',

    room_num: '点击“开启一局”获取',
    join_code: '点击“开启一局”获取',
    // 各种角色
    role_nums: {
      townsfolk: 4,
      werewolf: 4,
      seer: 1,
      witch: 1,
      hunter: 1,
      guard: 1,
      idiot: 0,
      whitewerewolf: 0,
    },
    role_btn: {
      seer: 'btn-on',
      witch: 'btn-on',
      hunter: 'btn-on',
      guard: 'btn-on',
      idiot: 'btn-off',
      whitewerewolf: 'btn-off',
    },
    townsfolk: 3,
    werewolf: 3,
    seer: 1,
    openid: '',
    // 使用data数据对象设置样式名
    minusStatuses: {
      townsfolk: 'normal',
      werewolf: 'normal'
    },
    special_villagers: [
      {name: 'seer', value: '预言家'},
      {name: 'witch', value: '女巫'},
      {name: 'hunter', value: '猎人'},
      {name: 'guard', value: '守卫'},
      {name: 'idiot', value: '白痴'},
      { name: 'whitewerewolf', value: '白狼王' }
    ],
    nickname: ''
  },

  /* ============= 通用加减号 ============== */
  /* 点击减号 */
  bindMinus: function (e) {
    var role = e.target.dataset.role;
    var role_nums = this.data.role_nums;
    var minusStatuses = this.data.minusStatuses;
    // 如果大于0时，才可以减
    if (role_nums[role] > 0) {
      role_nums[role]--;
    }
    // 只有大于0件的时候，才能normal状态，否则disable状态
    minusStatuses[role] = role_nums[role] <= 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      role_nums: role_nums,
      minusStatuses: minusStatuses
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var role = e.target.dataset.role;
    var role_nums = this.data.role_nums;
    var minusStatuses = this.data.minusStatuses;
    // 不作过多考虑自增1
    role_nums[role]++;
    // 只有大于0件的时候，才能normal状态，否则disable状态
    minusStatuses[role] = role_nums[role] <= 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      role_nums: role_nums,
      minusStatuses: minusStatuses
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },

  clickGold: function(e){
    console.log(e.target.dataset.role);
    var role = e.target.dataset.role;
    var role_nums = this.data.role_nums;
    var role_btn = this.data.role_btn;
    if (role_nums[role] == 0) {
      role_nums[role] = 1;
      role_btn[role] = 'btn-on';
    } else {
      role_nums[role] = 0;
      role_btn[role] = 'btn-off';
    }
    this.setData({
      role_nums: role_nums,
      role_btn: role_btn
    });
  },

  newGame: function (e) {
    var that = this;
    var townsfolk = this.data.tonsfolk;
    var werewolf = this.data.werewolf;
    var seer = this.data.seer;
    wx.showModal ({
      title: '确定开启新的一局？',
      content: '将生成新的加入码，请小伙伴们凭加入码抽取新卡牌',
      
      success: function(res) {
        // TODO 此处将数据上传至服务器，并获取加入码
        console.log(app.globalData.userInfo.nickName);
        if (res.confirm) {
          wx.request({
            //url: 'http://172.18.1.60:5000/werewolf/createroom/',
            //url: 'https://werewolf.zhanghaoran.cc/werewolf/createroom/',
            url: app.globalData.urls.restful + '/werewolf/createroom/',
            data: {
              openid: that.data.openid,
              nick_name: app.globalData.userInfo.nickName,
              roles: that.data.role_nums
            },
            success: function (res) {
              console.log(res.data);
              wx.navigateTo({
                url: '../room/room?room_num=' + res.data['room_num'] + '&join_code=' + res.data['join_code']
              })
              that.setData({
                room_num: res.data['room_num'],
                join_code: res.data['join_code']
              })
            },
            method: "POST"
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //nickname: options.nickname
    })
    var that = this
    //test 登录测试
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            //url: 'http://172.18.1.60:5000/werewolf/onlogin/',
            //url: 'https://werewolf.zhanghaoran.cc/werewolf/onlogin/',
            url: app.globalData.urls.restful + '/werewolf/onlogin/',
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