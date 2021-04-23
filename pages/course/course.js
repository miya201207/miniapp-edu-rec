// pages/course/course.js
const config = require('../../config.js')
const http = require('../../http.js')
//获取应用实例
const app = getApp()
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    showModal: false,
    tmpTag: true,
    bannerData: [],
    type:null,
  },

  noticeClick: function () {
    this.showHint()
    this.setData({
      tmpTag: false
    })
  },

  //事件处理函数
  showHint: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    console.log("hideModal")
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  clickButton: function () {
    this.hideModal();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=wx.getStorageSync('type');
    
    if(type==''||type==null){
        type=1
    }
    console.log(type)
      this.setData({
        type: type
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
    this.getCourseHeader()
    page = 1
    this.getCourseList(page, this.data.type)
    this.getBanners();
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
    console.log('调用啦')
    wx.clearStorageSync()
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

  toStudy: function (e) {
    console.log(e)
    let pos = e.currentTarget.dataset.pos
    let id = this.data.courseList[pos].id
    let name = this.data.courseList[pos].courseName
    wx.navigateTo({
      url: '../../pages/learn/study/study?courseId=' + id + '&courseName=' + name + '&studyTab=0',
    })
  },

  toExercise: function (e) {
    console.log(e)
    let pos = e.currentTarget.dataset.pos
    let id = this.data.courseList[pos].id
    let name = this.data.courseList[pos].courseName
    wx.navigateTo({
      url: '../../pages/learn/study/study?courseId=' + id + '&courseName=' + name + '&studyTab=2',
    })
  },

  typeClick: function (e) {
    console.log(e)
    let t = e.currentTarget.dataset.type
    this.setData({
      type: t
    })
    page = 1
    this.getCourseList(page, t)
  },

  loadMoreData: function () {
    console.log("加载更多")
    page++
    this.getCourseList(page, this.data.type)
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
            stTime: ht,
            percent:res.data.percent
          })
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

  /**
   * 头部统计数据
   * courseType 1 必修  2 选修
   */
  getCourseList: function (p, t) {
    var that = this
    http.request(
      config.courseList,
      'POST', {
        page: p,
        rows: 10,
        courseType: t
      },
      function (res) {
        if (res.data != null) {
          if (p > 1) {
            that.setData({
              courseList: that.data.courseList.concat(res.data)
            })
          } else {
            that.setData({
              courseList: res.data
            })
          }
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
  getBanners: function() {
    var that = this;
    http.request(
      config.banner,
      'GET', null,
      function(res) {
        if (res.rows != null) {
          var array = []
          for (var i = 0; i < res.rows.length; i++) {
            array.push(res.rows[i].imgUrl)
          }
          that.setData({
            bannerData: array
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
  },
})