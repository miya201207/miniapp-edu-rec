// pages/learn/note/note.js
const config = require('../../../config.js')
const http = require('../../../http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: -1,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      courseId: options.courseId
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

  noteInput: function(e) {
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },

  saveNote: function() {
    if (this.data.content == "") {
      wx.showToast({
        title: '笔记为空',
        icon: 'none'
      })
      return
    }
    var that = this
    http.request(
      config.courseNoteAdd,
      'POST', {
        noteContent: this.data.content,
        courseId: this.data.courseId
      },
      function(res) {
        if (res.data != null) {
          wx.navigateBack({

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