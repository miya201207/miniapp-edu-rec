// pages/login/tellogin/tellogin.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()
var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSend: false,
    isFocus: false,
    tel: '',
    msgCode: [],
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

  sendCode: function() {
    if (this.data.canSend) {
      this.sendCodeMsg()
    }

  },

  telInput: function(e) {
    this.setData({
      tel: e.detail.value
    })
    if (myreg.test(e.detail.value)) {
      this.setData({
        canSend: true
      })
    } else {
      this.setData({
        canSend: false
      })
    }
  },

  numberClick: function() {
    this.setData({
      isFocus: true
    })
  },

  numberInput: function(e) {
    this.setData({
      tmpValue: e.detail.value,
      msgCode: e.detail.value.split('')
    })
    console.log("tmpValue", e.detail.value)
    console.log("msgCode", this.data.msgCode)
    if (this.data.msgCode.length == 4) {
      this.verifyCode()
    }
  },

  sendAgain: function() {
    console.log("sendAgain")
    this.setData({
      msgCode: [],
      tmpValue: ''
    })
    this.sendCodeMsg()
  },

  sendCodeMsg: function() {
    var that = this
    http.request(
      config.vcode,
      'POST', {
        phoneNumber: this.data.tel,
      },
      function(res) {
        if (res.stCode == 200 || res.stCode == 401) {
          that.setData({
            isSend: true
          })
          wx.showToast({
            title: '验证码已发送',
            icon: 'none',
          })
        } else {
          wx.showToast({
            title: '验证码发送失败',
            icon: 'none',
          })
        }

      },
      function(err) {
        wx.showToast({
          title: '验证码发送失败',
          icon: 'none',
        })
      }
    )
  },

  verifyCode: function() {
    var that = this
    http.request(
      config.verify,
      'POST', {
        vcode: this.data.tmpValue,
      },
      function(res) {
        console.log(res.data)

        if (res.stCode == 0) {
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
        }

        if (res.stCode == 402) {
          wx.showToast({
            title: '验证码已过期，请重新发送',
            icon: 'none',
          })
        }

        if (res.stCode == 403) {
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
          })
        }
      },
      function(err) {
        wx.showToast({
          title: '验证失败',
          icon: 'none',
        })
      }, true
    )

  }
})