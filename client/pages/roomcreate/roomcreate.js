// pages/roomcreate/roomcreate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 各种角色
    role_nums: {
      townsfolk: 4,
      werewolf: 4,
      seer: 1
    },
    townsfolk: 3,
    werewolf: 3,
    seer: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'normal',
    special_villagers: [
      {name: 'seer', value: '预言家'},
      {name: 'witch', value: '女巫'},
      {name: 'hunter', value: '猎人'},
      {name: 'guard', value: '守卫'},
      {name: 'idiot', value: '白痴'}
    ]
  },

  /* ============= 通用加减号 ============== */
  /* 点击减号 */
  bindMinus: function (e) {
    console.log(e.target.dataset.role);
    var role = e.target.dataset.role;
    var role_nums = this.data.role_nums;
    // 如果大于0时，才可以减
    if (role_nums[role] > 0) {
      role_nums[role]--;
    }
    // 只有大于0件的时候，才能normal状态，否则disable状态
    var minusStatus = role_nums[role] <= 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      role_nums: role_nums,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    console.log(e.target.dataset.role);
    var role = e.target.dataset.role;
    var role_nums = this.data.role_nums;
    // 不作过多考虑自增1
    role_nums[role]++;
    // 只有大于0件的时候，才能normal状态，否则disable状态
    var minusStatus = role_nums[role] < 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      role_nums: role_nums,
      minusStatus: minusStatus
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


  /* ============= 平民 ============== */
  /* 点击减号 */
  bindMinusTownsfolk: function () {
    var townsfolk = this.data.townsfolk;
    // 如果大于0时，才可以减
    if (townsfolk > 0) {
      townsfolk--;
    }
    // 只有大于0件的时候，才能normal状态，否则disable状态
    var minusStatus = townsfolk <= 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      townsfolk: townsfolk,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlusTownsfolk: function () {
    var townsfolk = this.data.townsfolk;
    // 不作过多考虑自增1
    townsfolk++;
    // 只有大于0件的时候，才能normal状态，否则disable状态
    var minusStatus = townsfolk < 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      townsfolk: townsfolk,
      minusStatus: minusStatus
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

  /* ============= 狼人 ============== */
  /* 点击减号 */
  bindMinusWerewolf: function () {
    var num = this.data.werewolf;
    // 如果大于0时，才可以减
    if (num > 0) {
      num--;
    }
    // 只有大于0件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      werewolf: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlusWerewolf: function () {
    var num = this.data.werewolf;
    // 不作过多考虑自增1
    num++;
    // 只有大于0件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 0 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      werewolf: num,
      minusStatus: minusStatus
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

  checkboxChange: function (e) {
    console.log(e.detail.value);
    for (var val in e.detail.value) {
      console.log(e.detail.value[val]);
      console.log(this.data['seer']);
    }
    // 将数值与状态写回
    this.setData({
      seer: 11
    });
  },


  newGame: function (e) {
    var townsfolk = this.data.tonsfolk;
    var werewolf = this.data.werewolf;
    var seer = this.data.seer;
    wx.showModal({
      title: '确定开启新的一局？',
      content: '将生成新的加入码，请小伙伴们凭加入码抽取新卡牌',
      
      success: function() {
      }
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