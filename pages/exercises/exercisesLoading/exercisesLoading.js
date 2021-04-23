// pages/exam/exerciesesLoading/exerciesesLoading.js
var app = getApp();
var config = require('../../../config.js');
var c = 0
var totalTime = 3;
var t;
var responseData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: totalTime,
    openid:'oqNye4l33HhOUdHk2EDbMMPS2TZ4'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var exercisesId = options.bankId;
      this.setData({
        exercisesId: exercisesId,
        time: totalTime
      })
      //请求题库数据
      this.initData();


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      c = 0;
      this.setData({
        time: totalTime
      })
      this.timedCount();
  },

  initData: function () {
    var that = this;
    wx.request({
      url: config.getExerciseesList,
      method: "POST",
      data: {
        openId:this.data.openid,
        bankId: that.data.exercisesId
      },
      success: function (ret) {
        var data = ret.data
        if (data.success == 0) {
         responseData = data.rows;
          var exercisesData = responseData;
          if (responseData && responseData.questionVos) {
            //存入到Storage中 避免大数量传递问题
            console.log('111' + JSON.stringify(exercisesData))
            try {
              wx.setStorageSync(config.exercisesList, exercisesData)
          
            } catch (e) {
            }
          }
        } else {
          //获取考题失败
          wx.showToast({
            title: '服务器出错啦！',
            icon: "none"
          })
        }
      }
    })
  },

  timedCount: function () {
    var that = this;
    t = setTimeout(function () {
      c = c + 1
      that.setData({
        time: (totalTime - c) == 0 ? "答题开始" : totalTime - c
      });
      if ((totalTime - c) == 0) {
        that.stopCount();
        c = 0;
      } else {
        that.timedCount();
      }

    }, 1000)



  },

  //时间到 停止任务
  stopCount: function () {
    var that = this;
    clearTimeout(t)
    if (responseData) {
      setTimeout(function () {
        wx.redirectTo({
          url: '../exercisesGoing/exercisesGoing?bankId=' + that.data.exercisesId
        }, 3000);
      })

    } else {

      that.setData({
        time: "0"
      });
      //间隔1.5 再次重试
      setTimeout(function () {
        if (responseData) {
          wx.redirectTo({
            url: '../exercisesGoing/exercisesGoing?bankId=' + that.data.exercisesId
          })
        }
      }, 1500);
    }

  }

})