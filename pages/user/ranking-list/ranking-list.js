// pages/user/ranking-list/ranking-list.js
const config = require('../../../config.js')
const http = require('../../../http.js')
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHave: false,
    myUnitsList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1
    this.getMyunits(page)
    var myDate = new Date();
    var tYear = myDate.getFullYear()
    this.setData({
      year: tYear
    })

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

  loadMoreData: function () {
    console.log("loadMoreData")
    page++
    this.getMyunits(page)
  },


  getMyunits: function (p) {
    var that = this
    http.request(
      config.myunits,
      'POST', {
        page: p,
        rows: 20
      },
      function (res) {

        if (res.data != null && res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i]
            let ht = 0
            if (item.studyTime != null) {
              let t = item.studyTime.split(".");
              ht = ((parseInt(t[0])*100) + (parseFloat(((parseInt(t[1])) / 60).toFixed(2)))*100)/100;
            }
            item.hour = ht
            if (ht >= 40) {
              item.timeType = 1
            } else {
              item.timeType = 0
            }
            if (item.examSt == "合格") {
              item.examType = 1
            } else if (item.examSt == "不合格") {
              item.examType = 2
            } else {
              item.examType = 3
            }
          }
          if (p > 1) {
            that.setData({
              myUnitsList: that.data.myUnitsList.concat(res.data)
            })
          } else {
            that.setData({
              isHave: true,
              myUnitsList: res.data
            })
          }
        }
      },
      function (err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }, false, true
    )
  }


})