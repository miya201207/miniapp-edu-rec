
const config = require('../../config.js')
const http = require('../../http.js')
//获取应用实例
const app = getApp()
var page = 1;
var search="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionlist: [],
    isRefresh: false,
    pageSize:15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page=1
    //this.getlist(page,search);
  },
  getlist: function (page,search) {
    var that = this
    console.log('search',search)
    http.request(
      config.getactivitylist+"/"+page+"/"+this.data.pageSize,
      'GET',{
        search :search,
      }, 
      function (res) {
        if (res.data != null ) {
          if (page == 1) {
            that.setData({
              questionlist: res.data
            })
          }else{
            that.setData({
              questionlist:that.data.questionlist.concat(res.data)
            })

          }
        
        }
        if (that.data.isRefresh) {
          that.setData({
            isRefresh: false
          })
        }

      },
      function (err) {
        wx.showToast({
          title: err,
          icon: 'none',
        })
      }
    )
  },

  /**
   * 监听搜索
   */
  listenersearchInput:function(e){
    this.setData({
      keyword:e.detail.value
   })      
  },


  searchBar: function (e) {
    var keyword=this.data.keyword;
    console.log(keyword)
    if(keyword!=undefined && keyword !=""){
      this.getlist(page,keyword)

    }else{
      wx.showToast({
        title: "请输入关键字",
        icon: 'none',
      })
    }
  },

  bindscrolltolower: function () {
    console.log("bindscrolltolower")
    page++
    this.getlist(page,search)
  },

  bindrefresherrefresh: function () {
    console.log("bindrefresherrefresh")
    this.setData({
      isRefresh: true
    })
    page = 1
    this.getlist(page,search)
  },
  
  onclick: function (e) {
    wx.navigateToMiniProgram({
      appId:'wx8bf9b0e678f1f7ff',
      path: '/pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
        wx.showToast({
          title: '跳转成功'
          })
      },
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})