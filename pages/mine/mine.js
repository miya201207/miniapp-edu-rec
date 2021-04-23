// pages/mine/mine.js
const config = require('../../config.js')
const http = require('../../http.js')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

    var isLogin = wx.getStorageSync('isLogin')
    if (!isLogin) {
      wx.navigateTo({
        url: '../../pages/login/login-default/login-default',
      })
    } else {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.setData({
          name: userInfo.userName,
          unit: userInfo.unit
        })
      } else {
        var user = app.globalData.userInfo
        if (user != null) {
          this.setData({
            name: user.userName,
            unit: user.unit
          })
        }
      }
    }




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

  amendClick: function () {
    wx.navigateTo({
      url: '../../pages/user/amend/amend',
    })
  },

  loginOut: function () {
    http.request(
      config.logout,
      'POST', null,
      function (res) {
        wx.setStorageSync('isLogin', false)
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      function (err) {

      })
  },

  itemClick: function (e) {
    let type = e.currentTarget.dataset.type
    switch (type) {
      case '0':
        wx.navigateTo({
          url: '../../pages/user/learning-record/learning-record',
        })
        break
      case '1':
        wx.navigateTo({
          url: '../../pages/user/test-record/test-record',
        })
        break
      case '2':
        wx.navigateTo({
          url: '../../pages/user/ranking-list/ranking-list',
        })
        break
    }
  },
})