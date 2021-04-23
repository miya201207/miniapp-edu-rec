// pages/user/test-record/test-record.js
const config = require('../../../config.js')
const http = require('../../../http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHave: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllRecords()
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

  testResult: function(e) {
    let pos = e.currentTarget.dataset.pos
    wx.setStorageSync("testRecord", this.data.examRecordList[pos])
    wx.navigateTo({
      url: '../../../pages/examination/exam-result/exam-result?type=1',
    })
  },

  getAllRecords: function() {
    var that = this
    http.request(
      config.allRecords,
      'POST', null,
      function(res) {
        if (res.rows != null) {
          that.setData({
            examRecordList: res.rows
          })

          if (res.rows.length > 0) {
            that.setData({
              isHave: true
            })
          }
        }
      },
      function(err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }, true,true
    )
  }
})