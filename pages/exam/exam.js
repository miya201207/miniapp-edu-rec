// pages/exam/exam.js
const config = require('../../config.js')
const http = require('../../http.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: 0,
    currentExamList: [],
    pastExamList:[],
    examMsg: null,
    winHeight: "", //窗口高度
    examType:null,//考试状态 0-ing 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamList(1)
    this.getExamList(2)
  },
 
  //获取列表数据
  getExamList: function (type) {
    var that = this;
    http.request(
      config.getExamList,
      'POST', {
        type: type,
      },
      function (res) {
        if (res.rows != null && res.rows.length > 0) {
          if(type==1){
            that.setData({
              currentExamList: res.rows,
              listLength: res.rows.length,
            })
          }else{
            that.setData({
              pastExamList: res.rows,
              listLength: res.rows.length,
            })
          }
        
        } else {
          that.setData({
            listLength: 0,
            examMsg: null
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

  toExam: function (e) {
    let examId = parseInt(e.currentTarget.dataset.id);
    let examStatus = e.currentTarget.dataset.examstatus;
    console.log('examStatus',examStatus)
    if (examStatus <= 2) {
      wx.navigateTo({
        url: '../../pages/examination/notice/notice?type=0&examId=' + examId
      })
    }

    if (examStatus == 3) {
      wx.navigateTo({
        url: '../../pages/examination/notice/notice?type=1&examId=' + examId
      })
    }

    if (examStatus >= 4) {
      wx.navigateTo({
        url: '../../pages/examination/notice/notice?type=2&examId=' + examId
      })
    }
  },


  toExercise:function(e){
    // 1-西藏法规 2-宪法习作
 
    wx.navigateTo({
      url: '../../pages/exercises/exercisesHome/exercisesHome?fromType=2'
    }) 
  },
  //日常考试
  imitaExercise:function(e){
    wx.navigateTo({
      url: '../../pages/exercises/exercisesHome/exercisesHome?fromType=1'
      // url: '../../pages/exercises/exercisesHome/exercisesHome?fromType=3'
    }) 
  }
})