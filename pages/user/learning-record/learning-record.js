// pages/user/learning-record/learning-record.js
const config = require('../../../config.js')
const http = require('../../../http.js')
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyRecordList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1
    this.getCourseHeader()
    this.getMyStudyRecordList(page)
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
    page++
    this.getMyStudyRecordList(page)
  },


  /**
   * 头部统计数据
   */
  getCourseHeader: function () {
    var that = this
    http.request(
      config.courseHeader,
      'POST', null,
      function (res) {
        if (res.data != null) {

          let ht = 0
          if (res.data.studyTime != null) {
            let t = res.data.studyTime.split(".");
            // ht = parseInt(t[0]) + parseFloat(((parseInt(t[1])) / 60).toFixed(2));
            ht = ((parseInt(t[0])*100) + (parseFloat(((parseInt(t[1])) / 60).toFixed(2)))*100)/100;
          }

          that.setData({
            hour: res.data.assessmentHour,
            stTime: ht
          })
        }
      },
      function (err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }, false, true
    )
  },

  getMyStudyRecordList: function (p) {
    var that = this
    http.request(
      config.myStudyRecordList,
      'POST', {
        page: p,
        rows: 20
      },
      function (res) {
        if (res.data != null && res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i]
            let m = 0
            if (item.studyTime != null) {
              let t = item.studyTime.split(".");
              m = parseInt(t[0]) * 60 + parseInt(t[1]);
            }

            if (m <= 0) {
              item.minute = "小于1"
            } else {
              item.minute = m
            }
          }

          if (p > 1) {
            that.setData({
              studyRecordList: that.data.studyRecordList.concat(res.data)
            })
          } else {
            that.setData({
              isHave: true,
              studyRecordList: res.data
            })
          }
        }
      },
      function (err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }, false, false
    )
  }
})