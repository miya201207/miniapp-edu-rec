// pages/exercises/exercisesResult/exercisesResult.js
var app = getApp();
var config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     bankId: null,
     openid:'oqNye4l33HhOUdHk2EDbMMPS2TZ4'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      bankId: options.bankId
    })

    this.exerciseEnd();
  },
  

  //获取数据
  exerciseEnd: function () {
    var that = this;
    wx.request({
      url: config.exerciseEnd,
      method: "POST",
      data: {
        openId: this.data.openid,
        bankId: that.data.bankId,
      },
      success: function (ret) {
        var data = ret.data
        if (data.success == 0) {
          var resultList = data.rows;
          if (resultList) {
            that.setData({
              total: resultList.total,
              correct: resultList.correct,
              wrong: resultList.error,
              source: resultList.source,
              errorList: resultList.questionVos,
            })

          }


        }
      }
    })
  },
  /**
   * 返回首页
   */
  toIndex:function(e){
    wx.navigateBack ({
      delta: 10
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

  //邀请好友答题
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '宪法习作',
      path: '/pages/index/index',
      success: function (res) {
        console.log(res)
      }
    }
  },
})