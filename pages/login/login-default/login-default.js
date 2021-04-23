// pages/login/login-default/login-default.js
const config = require('../../../config.js')
const http = require('../../../http.js')
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
  onLoad: function(options) {

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



  cancel:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  tellogin: function() {
    wx.navigateTo({
      url: '../../../pages/login/tellogin/tellogin',
    })
  },

  getPhoneNumber(e) {
    var that = this
    // console.log(e)
    http.request(
      config.tel,
      'POST', {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      function(res) {
        console.log(res.data)
        if (res.data != null) {
          that.wxdl()
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



  wxdl: function() {
    var that = this
    http.request(
      config.wxdl,
      'POST', null,
      function(res) {
        console.log(res.data)
        if (res.data != null) {
          //已注册
          app.globalData.userInfo = res.data
          wx.setStorageSync('userInfo', res.data)
          wx.setStorageSync('isLogin', true)
          wx.switchTab({
            url: '../../../pages/mine/mine',
          })

          // var skip = wx.getStorageSync("loginSkip")
          // if (skip) {
          //   if (skip == "course") {
          //     wx.switchTab({
          //       url: '../../../pages/course/course',
          //     })
          //   } else {
          //     wx.switchTab({
          //       url: '../../../pages/exam/exam',
          //     })
          //   }
          //   wx.removeStorageSync('loginSkip')
          // } else {
          //   wx.switchTab({
          //     url: '../../../pages/mine/mine',
          //   })
          // }
        } else {
          //未注册
          wx.navigateTo({
            url: '../../../pages/login/usermsg/usermsg',
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