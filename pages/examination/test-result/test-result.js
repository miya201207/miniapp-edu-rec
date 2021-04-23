// pages/examination/test-result/test-result.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examPaper: null,
    userScore: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var question = app.globalData.question
    this.setData({
      unsureness: question.zero,
      single: question.one,
      multiple: question.two,
      check: question.three,
      completion: question.four,
    })
    var xzExam = wx.getStorageSync("xzExam")
    console.log("xzExam", xzExam)
    if (xzExam) {
      xzExam.startTime = xzExam.startTime.substring(0, 16)
      xzExam.endTime = xzExam.endTime.substring(0, 16)
      this.setData({
        exam: xzExam
      })
    }

    var xzExamPaper = wx.getStorageSync("xzExamPaper")
    console.log("xzExamPaper", xzExamPaper)
    if (xzExamPaper) {
      this.setData({
        examPaper: xzExamPaper
      })
    }
    this.setData({
      userScore: app.globalData.score
    })

    var record = wx.getStorageSync("examRecord")
    if (record) {
      this.setData({
        examRecord: record
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

 
  //再答一次
  examagain: function() {
    wx.redirectTo({
      url: '../../../pages/examination/loading/loading?type=0&examId=' + this.data.exam.id,
    })
  },

  //提交成绩
  submit: function() {
    var that = this
    http.request(
      config.addRecord,
      'POST', {
        examId: this.data.exam.id,
        single_point: this.data.userScore.one,
        multiple_point: this.data.userScore.two,
        check_point: this.data.userScore.three,
        completion_point: this.data.userScore.four,
        unsureness_point: this.data.userScore.zero,
        unsurenessRecord: this.data.examRecord.unsurenessArray,
        singleRecord: this.data.examRecord.singleArray,
        multipleRecord: this.data.examRecord.multipleArray,
        checkRecord: this.data.examRecord.checkArray,
        completionRecord: this.data.examRecord.completionArray
      },
      function(res) {
        wx.switchTab({
          url: '../../../pages/exam/exam',
        })
      },
      function(err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }
    )
  }
})