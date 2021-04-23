// pages/exercises/exercisesHome/exercisesHome.js
var app = getApp();
var config = require('../../../config.js');
var fromType = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:null,
    openid:'oqNye4l33HhOUdHk2EDbMMPS2TZ4'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fromType = options.fromType;
    // 1-日常考试 2-专项答题 
    console.log("fromType==="+fromType);
    this.getList();
 
  },


  //获取列表数据
  getList: function () {
    var that = this;
    wx.request({
      url: config.getExercisesList,
      method: "POST",
      data: {
        openId: this.data.openid,
        type:fromType
      },
      success: function (ret) {
        var data = ret.data
        if (data.success == 0) {
          var list = data.rows;
          //设置集合
          that.setData({
            itemList: list
          })
        }
      }
    })
  },

  //  跳转详情
  toDetails: function (event) {
    var detailsId = event.currentTarget.dataset.bankid;
    wx.navigateTo({
      url: '../exercisesDetail/exercisesDetail?bankId=' + detailsId+'&fromType='+fromType
    })
  },












  
})