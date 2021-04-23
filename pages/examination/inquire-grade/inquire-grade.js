// pages/examination/inquire-grade/inquire-grade.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examId: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      examId: options.examId
    })


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


  backIndex: function() {
    wx.switchTab({
      url: '../../../pages/index/index',
    })
  },

  telInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  inquireGrade: function() {
    this.queryRecordTel(this.data.examId, this.data.phone)
  },
  quickInquireGrade: function() {
    this.queryRecordExamId(this.data.examId)
  },
  queryRecordExamId: function(id) {
    var that = this
    http.request(
      config.queryRecord,
      'POST', {
        examId: id,
      },
      function(res) {
        if (res.rows != null) {
          wx.setStorageSync("examRecord", res.rows)
          wx.navigateTo({
            url: '../exam-result/exam-result?type=0',
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

  queryRecordTel: function(id, tel) {
    var that = this
    http.request(
      config.queryRecord,
      'POST', {
        examId: id,
        phone: tel
      },
      function(res) {
        if (res.rows != null) {
          wx.setStorageSync("examRecord", res.rows)
          wx.navigateTo({
            url: '../exam-result/exam-result?type=0',
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