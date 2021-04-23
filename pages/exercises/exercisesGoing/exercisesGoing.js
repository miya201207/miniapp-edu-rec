// pages/exercises/exercisesGoing/exercisesGoing.js
var app = getApp();
var config = require('../../../config.js');
//连续答对题数
var count_lineRight = 0;

var questionList=null;
var questionTotalCount=null;
var callWords=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentQuestionPos: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    var exercisesId = options.bankId;
    this.setData({
      exercisesId: exercisesId
    });
  
    this.initData();
    // app.globalData.bgMusic.stop();
    // app.globalData.bgMusicExercise.play();
  },
  toResult: function(e) {
    wx.navigateTo({
      url: '../exercisesResult/exercisesResult',
    })
  },
  /**
   * 每次打开页面都会调用一次。
   */
  onShow: function () {
    if (app.globalData.music) {
      app.globalData.bgMusicExercise.play();
    }
    // app.globalData.bgMusicExercise.play();
  },
  onUnload: function () {
    app.globalData.bgMusicExercise.stop();
    if (app.globalData.music) {
      app.globalData.bgMusic.play();
    }
    // app.globalData.bgMusic.play();
    
  },
  
  //初始化考试题库
  initData: function () {
    var that = this;
    try {
      var value = wx.getStorageSync(config.exercisesList); //取出缓存的问题信息
      if (value) {
          questionList=value.questionVos;
          questionTotalCount= value.questionVos.length;
          callWords=value.callWords
          that.setData({
            questionList: questionList,
              questionTotalCount: questionTotalCount,
            callWords: callWords
          });
        that.getNextQuestion();
      }
     
    } catch (e) {
      console.log("初始化题库数据失败···");
    }

  },




  //获取下一个问题
  getNextQuestion: function() {
    var index = this.data.currentQuestionPos;
    if (index < this.data.questionList.length) {
      var currQuestion = this.data.questionList[index];
      if (currQuestion) {
        var miniQuestion = currQuestion.miniQuestion
        var answerList = currQuestion.answers;
        this.setData({
          miniQuestion: miniQuestion,
          answerList: answerList,
          currentQuestionPos: index,
          //答案解析
          ansewerAnalysis: miniQuestion.explains,
        })
      }

    }
  },



  //答案点击事件
  onAnswerItemClick: function(event) {
    var that = this;
    if (that.data.isShowAnswer) {
      //如果已经显示答案，不能再次选择答案
      return;
    }
    console.log("onAnswerItemClick（）执行啦 ");
    var that = this;
    //获取用户选择的答案id
    var mSelectedId = event.currentTarget.dataset.answerid;
    //判断是否正确
    var correct = event.currentTarget.dataset.correct;

    //根据用户连续答对题数量 给予鼓励性提示
    if (correct == 1) {
      count_lineRight++;
      var tips = that.getTipsByRightCount();
      if (tips) {
        wx.showToast({
          title: tips,
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      count_lineRight = 0;
    }

    //刷新ui
    that.setData({
      isShowAnswer: true,
      answerid: mSelectedId,
      correct: correct == 1 ? 0 : 1
    });

    //计算用户答对了几道题
    this.postAnswer();
  },

  //根据用户连续答对数量 获取对应的提示语
  getTipsByRightCount() {
    var that = this;
    var list = that.data.callWords;
    if (list) {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.answerNum == count_lineRight) {
          return item.callWord;
        }
      }

    }
    return null;
  },

  //显示答案解析
  showAnswer: function() {
    var that = this;
    //1 判断用户是否选择了答案
    if (!that.data.isShowAnswer) {
      return;
    }
    // 2 显示答案解析
    that.setData({
      isShowAnswerAnalysis: !that.data.isShowAnswerAnalysis
    });

  },

  //下一题
  goToNext: function() {
    // 1 重置部分数据 为下一题做准备
    var that = this;
    //1 判断用户是否选择了答案
    if (!that.data.isShowAnswer) {
      wx.showToast({
        title: '请选择答案',
        icon: 'none'
      })
      return;
    }

    if (that.data.currentQuestionPos >= that.data.questionList.length - 1) {
      //结束了 最后一题
      console.log("-----结束了 最后一题------");
      //跳转到结果页面
      wx.redirectTo({
        url: '../exercisesResult/exercisesResult?bankId=' + that.data.exercisesId
      })
      return;
    }

    this.resetData();
    this.getNextQuestion();
  },
  resetData: function() {
    this.setData({
      isShowAnswer: false,
      isShowAnswerAnalysis: false,
      answerid: null,
      currentQuestionPos: this.data.currentQuestionPos + 1
    });

  },

  //向服务器提交答案
  postAnswer: function() {
    var that = this;
    wx.request({
      url: config.postExerciseesAnswer,
      method: "POST",
      data: {
        openId: app.globalData.openid,
        bankId: that.data.exercisesId,
        questionId: that.data.miniQuestion.id,
        correct: that.data.correct

      },
      success: function(ret) {
        wx.hideLoading();
        var data = ret.data
        if (data.success == 0) {
          var responseData = data.rows;
          if (responseData) {}
        } else {
          console.log("提交答案失败了");
        }
      }
    })
  }
})