// pages/examination/notice/notice.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    stCode: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      type: options.type,
      examId: options.examId
    })

    this.getExplain(options.examId)
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

  beginExam: function (id) {
    var that = this;
    http.request(
      config.beginExam,
      'POST', {
        examId: id,
      },
      function (res) {
        wx.navigateTo({
          url: '../../../pages/examination/loading/loading?type=0&examId=' + id,
        })

      },
      function (err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }
    )
  },



  getExplain: function (id) {
    var that = this;
    http.request(
      config.getExplain,
      'POST', {
        examId: id,
      },
      function (res) {
        if (res.data != null) {
          that.setData({
            examMsg: res.data
          })
        }
        that.setData({
          stCode: res.stCode
        })
      },
      function (err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }, true
    )
  },

  examstart: function () {
    // if (this.data.stCode == 0) {
      this.beginExam(this.data.examId)
    // } else {
    //   wx.showToast({
    //     title: '您还未完成规定的课程学习时间',
    //     icon: 'none'
    //   })
    // }

  },

  inquire: function () {
    wx.navigateTo({
      url: '../inquire-grade/inquire-grade?examId=' + this.data.examMsg.exam.id,
    })
  },

  examagain: function () {

    // if (this.data.stCode == 0) {
      if (this.data.examMsg.haveCard == 1) {
        this.beginExam(this.data.examId)
      } else {
        wx.showToast({
          title: '你没有补考卡',
          icon: 'none'
        })
      }
    // } else {
    //   wx.showToast({
    //     title: '您还未完成规定的课程学习时间',
    //     icon: 'none'
    //   })
    // }


  },

  examine: function () {
    wx.navigateTo({
      url: '../../../pages/examination/test-paper/test-paper?type=0&examId=' + this.data.examMsg.exam.id,
    })
  }
})