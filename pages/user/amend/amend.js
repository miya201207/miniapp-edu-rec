// pages/user/amend/amend.js
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
    var userInfo = wx.getStorageSync('userInfo') 
    if (userInfo) {
      this.setData({
        name: userInfo.userName,
        unit: userInfo.unit,
        tel: userInfo.phone,
        idCard: userInfo.idNum,
        enforceLaw:userInfo.xzzfNum
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


  unitInput: function(e) {
    this.setData({
      unit: e.detail.value
    })
  },

  enforceLawInput:function(e){
    this.setData({
      enforceLaw: e.detail.value
    })
  },

  makeSure: function() {
    if (this.data.unit == "") {
      wx.showToast({
        title: '单位不能为空',
        icon: 'none',
      })
      return
    }

    if (this.data.enforceLaw == "") {
      wx.showToast({
        title: '执法证号不能为空',
        icon: 'none',
      })
      return
    }

    http.request(
      config.user,
      'POST', {
        unit: this.data.unit,
        xzzfNum:this.data.enforceLaw
      },
      function(res) {
        if (res.data != null) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
          })
          wx.setStorageSync('userInfo', res.data)
          app.globalData.userInfo = res.data
          wx.navigateBack({

          })
        }
      },
      function(err) {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
        })
      }, true,true
    )
  },

})