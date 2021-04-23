// pages/exercises/exercisesDetail/exercisesDetail.js
var app = getApp();
var config = require('../../../config.js');
var fromType = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankId:null,
    openid:'oqNye4l33HhOUdHk2EDbMMPS2TZ4'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    fromType = options.fromType;
    console.log(fromType)
    this.setData({
      bankId: options.bankId
    })
     this.getDetails();
  },

  //获取列表数据
  getDetails: function () {
    var that = this;
    wx.request({
      url: config.getExercisesDetails,
      method: "POST",
      data: {
        openId: this.data.openid,
        bankId: that.data.bankId
      },
      success: function (ret) {
        var data = ret.data
        if (data.success == 0) {
          var exerciseInfo = data.rows;
          if (exerciseInfo){

            that.setData({
              des: exerciseInfo.instroduce,
              name: exerciseInfo.bankName,
              img: exerciseInfo.imgUrl,
              source: exerciseInfo.source,
              count: exerciseInfo.questionCount
            })

          }
          
      
        }
      }
    })
  },


  /**
   * 跳转练习页
   */
  toExercising: function () {
    if(fromType==1){
      
      wx.navigateTo({
        url: '../../../pages/examination/loading/loading?type=0&examId=' +this.data.bankId
      })
    }else{
      wx.navigateTo({
        url: '../exercisesLoading/exercisesLoading?bankId=' + this.data.bankId
      })
    }
   
   

  },

  //邀请好友答题
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '依法治藏',
      path: '/pages/index/index',
      success: function (res) {
        console.log(res)
      }
    }
  },

 
})