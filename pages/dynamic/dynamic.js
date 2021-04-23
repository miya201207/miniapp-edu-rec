// pages/dynamic /dynamic.js
const config = require('../../config.js')
const http = require('../../http.js')
//获取应用实例
const app = getApp()
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: [],
    currentTab: 0,
    winHeight: "",
    dynamicData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initHeight()
    this.getNewsTypes()
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

  /**
   * 动态设置高度
   */
  initHeight: function() {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight
        var clientWidth = res.windowWidth
        var rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 90;
        that.setData({
          winHeight: calc
        });
      },
      footerTap: app.footerTap
    })
  },

  titleClick: function(e) {
    var pos = e.currentTarget.dataset.pos
    this.setData({
      currentTab: pos
    })
  },
  // 滚动切换标签样式 
  switchTab: function(e) {
    var cur = e.detail.current;
    this.setData({
      currentTab: cur
    });
    page = 1
    this.getDynamicData(page, this.data.titles[cur].id)
  },

  itemClick: function(e) {
    let pos = e.currentTarget.dataset.pos
    wx.navigateTo({
      url: '../../pages/dynamic-details/dynamic-details?newsId=' + this.data.dynamicData[pos].id,
    })
  },

  loadMoreData: function(e) {
    console.log("加载更多")
    page++
    this.getDynamicData(page, this.data.titles[this.data.currentTab].id)
  },

  /**
   * 获取动态分类列表
   */

  getNewsTypes: function() {
    var that = this;
    http.request(
      config.newsTypes,
      'GET', null,
      function(res) {
        if (res.data != null) {
          that.setData({
            titles: res.data
          })
          page = 1;
          that.getDynamicData(page, res.data[0].id)
        }
      },
      function(err) {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
        })
      }
    )
  },

  getDynamicData: function(p, t) {
    var that = this;
    http.request(
      config.news,
      'GET', {
        page: p,
        pageSize: 10,
        type: t
      },
      function(res) {
        if (res.data != null) {
          if (p > 1) {
            that.setData({
              dynamicData: that.data.dynamicData.concat(res.data)
            })
          } else {
            that.setData({
              dynamicData: res.data
            })
          }

        }
      },
      function(err) {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
        })
      }
    )
  }
})