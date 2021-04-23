// pages/examination/test-paper/test-paper.js
const config = require('../../../config.js')
const http = require('../../../http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t = options.type
    if (t == 0) {
      console.log("options.examId", options.examId)
      this.getReportWithExamId(options.examId)
    } else {
      console.log("options.examId", options.examId)
      console.log("options.recordId", options.recordId)
      this.getReportWithRecordId(options.examId, options.recordId)
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

  getReportWithExamId: function(id) {
    var that = this
    http.request(
      config.getReport,
      'POST', {
        examId: id
      },
      function(res) {
        if (res.rows != null && res.rows.length > 0) {
          that.setData({
            size: res.rows.length,
            examList: res.rows
          })
        } else {
          wx.showToast({
            title: '没有答题记录',
            icon: 'none'
          })
        }
      },
      function(err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }
    )
  },
  getReportWithRecordId: function(eId, rId) {
    var that = this
    http.request(
      config.recordReport,
      'POST', {
        examId: eId,
        recordId: rId
      },
      function(res) {
        if (res.rows != null && res.rows.length > 0) {
          that.setData({
            size: res.rows.length,
            examList: res.rows
          })
        } else {
          wx.showToast({
            title: '没有答题记录',
            icon: 'none'
          })
        }
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