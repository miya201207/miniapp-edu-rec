// pages/login/usermsg/usermsg.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()
var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    name: "",
    idcard: "",
    unit: "",
    enforceLaw: ""

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


  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  idcardInput: function (e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  unitInput: function (e) {
    this.setData({
      unit: e.detail.value
    })
  },

  enforceLawInput: function (e) {
    this.setData({
      enforceLaw: e.detail.value
    })
  },
  makeSure: function () {
    if (this.data.name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
      })
      return
    }
    if (this.data.idcard == '') {
      wx.showToast({
        title: '身份证不能为空',
        icon: 'none',
      })
      return
    }

    if (!idcardReg.test(this.data.idcard)) {
      wx.showToast({
        title: '身份证格式不正确',
        icon: 'none',
      })
      return
    }

    if (this.data.unit == '') {
      wx.showToast({
        title: '单位不能为空',
        icon: 'none',
      })
      return
    }

    if (this.data.enforceLaw == '') {
      wx.showToast({
        title: '执法证号不能为空',
        icon: 'none',
      })
      return
    }

    this.submitUserInfo()

  },

  submitUserInfo: function () {
    var that = this
    http.request(
      config.reg,
      'POST', {
        name: this.data.name,
        idNum: this.data.idcard,
        unit: this.data.unit,
        xzzfNum:this.data.enforceLaw
      },
      function (res) {
        console.log(res.data)
        if (res.data != null) {
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
            // wx.switchTab({
            //   url: '../../../pages/mine/mine',
            // })
          // }
        }
      },
      function (err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }
    )
  },

})