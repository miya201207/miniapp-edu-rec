// pages/examination/loading/loading.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    typeStr: "加载题库",
    questionType: 0 //0 不定项  1 单选  2 多选 3 判断 4 填空

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = options.type
    if (type == 0) {
      //加载题库
      this.getQuestions(options.examId)
    } else if (type == 1) {


    } else {

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
    console.log("onShow lastQuestionType=", this.data.lastQuestionType)
    var lastQuestionType = this.data.lastQuestionType
    var curQuestionType = parseInt(lastQuestionType) + 1
    console.log("curQuestionType", curQuestionType)
    try {
      if (curQuestionType == 1) {
        if (app.globalData.question.one) {
          this.setData({
            questionType: 1,
            typeStr: "单项选择"
          })

          setTimeout(function() {
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=1',
            })
          }, 500);
          return
        } else {
          curQuestionType++
        }

      }

      if (curQuestionType == 2) {
        if (app.globalData.question.two) {
          this.setData({
            questionType: 2,
            typeStr: "多项选择"
          })

          setTimeout(function() {
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=2',
            })
          }, 500);
          return
        } else {
          curQuestionType++
        }
      }

      if (curQuestionType == 3) {
        if (app.globalData.question.three) {
          this.setData({
            questionType: 3,
            typeStr: "判断题"
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=3',
            })
          }, 500);
          return
        } else {
          curQuestionType++
        }

      }

      if (curQuestionType == 4) {
        if (app.globalData.question.four) {
          this.setData({
            questionType: 4,
            typeStr: "填空题"
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=4',
            })
          }, 500);
          return
        } else {
          curQuestionType++
        }

      }

      if (curQuestionType > 4) {
        this.setData({
          typeStr: "正在计算成绩..."
        })
        this.calculateGrade()
        setTimeout(function () {
          wx.redirectTo({
            url: '../../../pages/examination/test-result/test-result',
          })
        }, 1000);
      }
      return
    } catch (e) {
      // Do something when catch error
    }
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

  //计算成绩
  calculateGrade: function() {
    var unsurenessScore = 0
    var singleScore = 0
    var multipleScore = 0
    var checkScore = 0
    var completionScore = 0

    var unsurenessArray = []
    var singleArray = []
    var multipleArray = []
    var checkArray = []
    var completionArray = []

    var xzExamPaper = wx.getStorageSync("xzExamPaper")
    console.log("xzExamPaper", xzExamPaper)
    if (xzExamPaper) {

    }

    //不定项
    if (app.globalData.question.zero) {
      var unsurenessRecord = wx.getStorageSync("unsurenessRecord")
      console.log("unsurenessRecord", unsurenessRecord)
      if (unsurenessRecord) {
        for (let i = 0; i < unsurenessRecord.length; i++) {
          console.log("外循环 i==", i)
          let outItem = unsurenessRecord[i]
          if (outItem.correctCount == outItem.selectItems.length) {
            let userAnswerCount = 0
            for (let j = 0; j < outItem.answers.length; j++) {
              let inItem = outItem.answers[j]
              console.log("内循环 j==", j)
              if (inItem.correct == 1) {
                if (inItem.isSelect) {
                  userAnswerCount++
                }
              }
            }
            if (userAnswerCount == outItem.correctCount) {
              console.log("正确")
              unsurenessScore += xzExamPaper.unsurenessPoint
            }
          }

          //构造答题记录参数
          var ansItem = {}
          var key = outItem.id
          var value = outItem.selectItems
          ansItem[key] = value
          unsurenessArray.push(ansItem)
        }
      }
    }
    //单选
    if (app.globalData.question.one) {
      var singleRecord = wx.getStorageSync("singleRecord")
      console.log("singleRecord", singleRecord)
      if (singleRecord) {
        for (let i = 0; i < singleRecord.length; i++) {
          console.log("外循环 i==", i)
          let outItem = singleRecord[i]
          for (let j = 0; j < outItem.answers.length; j++) {
            let inItem = outItem.answers[j]
            console.log("内循环 j==", j)
            if (inItem.correct == 1) {
              if (inItem.isSelect) {
                console.log("正确")
                singleScore += xzExamPaper.singlePoint
              }
              break
            }
          }

          //构造答题记录参数
          var ansItem = {}
          var key = outItem.id
          var value = outItem.selectItems
          ansItem[key] = value
          singleArray.push(ansItem)
        }
      }
    }
    //多选
    if (app.globalData.question.two) {
      var multipleRecord = wx.getStorageSync("multipleRecord")
      console.log("multipleRecord", multipleRecord)
      if (multipleRecord) {
        for (let i = 0; i < multipleRecord.length; i++) {
          console.log("外循环 i==", i)
          let outItem = multipleRecord[i]
          if (outItem.correctCount == outItem.selectItems.length) {
            let userAnswerCount = 0
            for (let j = 0; j < outItem.answers.length; j++) {
              let inItem = outItem.answers[j]
              console.log("内循环 j==", j)
              if (inItem.correct == 1) {
                if (inItem.isSelect) {
                  userAnswerCount++
                }
              }
            }
            if (userAnswerCount == outItem.correctCount) {
              console.log("正确")
              multipleScore += xzExamPaper.multiplePoint
            }
          }
          //构造答题记录参数

          var ansItem = {}
          var key = outItem.id
          var value = outItem.selectItems
          ansItem[key] = value
          multipleArray.push(ansItem)
        }
      }
    }
    //判断
    if (app.globalData.question.three) {
      var checkRecord = wx.getStorageSync("checkRecord")
      console.log("checkRecord", checkRecord)
      if (checkRecord) {
        for (let i = 0; i < checkRecord.length; i++) {
          console.log("外循环 i==", i)
          let outItem = checkRecord[i]
          for (let j = 0; j < outItem.answers.length; j++) {
            let inItem = outItem.answers[j]
            console.log("内循环 j==", j)
            if (inItem.correct == 1) {
              if (inItem.isSelect) {
                console.log("正确")
                checkScore += xzExamPaper.checkPoint
              }
              break
            }
          }

          //构造答题记录参数
          var ansItem = {}
          var key = outItem.id
          var value = outItem.selectItems
          ansItem[key] = value
          checkArray.push(ansItem)
        }
      }
    }
    //填空
    if (app.globalData.question.four) {
      var completionRecord = wx.getStorageSync("completionRecord")
      console.log("completionRecord", completionRecord)
      if (completionRecord) {
        for (let i = 0; i < completionRecord.length; i++) {
          console.log("外循环 i==", i)
          let outItem = completionRecord[i]
          if (outItem.inputAnswer == outItem.answers[0].correct_content) {
            completionScore += xzExamPaper.completionPoint
          }

          //构造答题记录参数
          var ansItem = {}
          var key = outItem.id
          outItem.selectItems.push(outItem.inputAnswer)
          var value = outItem.selectItems
          ansItem[key] = value
          completionArray.push(ansItem)
        }
      }
    }
    var totalScore = unsurenessScore + singleScore + multipleScore + checkScore + completionScore
    app.globalData.score = {
      zero: unsurenessScore,
      one: singleScore,
      two: multipleScore,
      three: checkScore,
      four: completionScore,
      total: totalScore
    }

    var examRecord = {
      unsurenessArray: unsurenessArray,
      singleArray: singleArray,
      multipleArray: multipleArray,
      checkArray: checkArray,
      completionArray: completionArray
    }
    wx.setStorageSync("examRecord", examRecord)
    console.log("examRecord", examRecord)
    console.log("app.globalData.score", app.globalData.score)
  },

  /**
   * 获取题库
   */
  getQuestions: function(id) {
    var that = this;
    http.request(
      config.getQuestions,
      'POST', {
        examId: id,
      },
      function(res) {
        if (res.rows != null) {

          if (res.rows.unsurenessQuestions != null && res.rows.unsurenessQuestions.length > 0) {
            app.globalData.question.zero = true
            wx.setStorageSync("unsurenessQuestions", res.rows.unsurenessQuestions)
          } else {
            app.globalData.question.zero = false
            wx.removeStorageSync('unsurenessQuestions')
          }
          if (res.rows.singleQuestions != null && res.rows.singleQuestions.length > 0) {
            app.globalData.question.one = true
            wx.setStorageSync("singleQuestions", res.rows.singleQuestions)
          } else {
            app.globalData.question.one = false
            wx.removeStorageSync('singleQuestions')
          }
          if (res.rows.multipleQuestions != null && res.rows.multipleQuestions.length > 0) {
            app.globalData.question.two = true
            wx.setStorageSync("multipleQuestions", res.rows.multipleQuestions)
          } else {
            app.globalData.question.two = false
            wx.removeStorageSync('multipleQuestions')
          }
          if (res.rows.checkQuestions != null && res.rows.checkQuestions.length > 0) {
            app.globalData.question.three = true
            wx.setStorageSync("checkQuestions", res.rows.checkQuestions)
          } else {
            app.globalData.question.three = false
            wx.removeStorageSync('checkQuestions')
          }
          if (res.rows.completionQuestions != null && res.rows.completionQuestions.length > 0) {
            app.globalData.question.four = true
            wx.setStorageSync("completionQuestions", res.rows.completionQuestions)
          } else {
            app.globalData.question.four = false
            wx.removeStorageSync('completionQuestions')
          }

          wx.setStorageSync("xzExam", res.rows.xzExam)
          wx.setStorageSync("xzExamPaper", res.rows.xzExamPaper)

          if (app.globalData.question.zero) {
            that.setData({
              questionType: 0,
              typeStr: "不定项选择"
            })
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=0',
            })
            return
          }
          if (app.globalData.question.one) {
            that.setData({
              questionType: 1,
              typeStr: "单项选择"
            })
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=1',
            })
            return
          }
          if (app.globalData.question.two) {
            that.setData({
              questionType: 2,
              typeStr: "多项选择"
            })
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=2',
            })
            return

          }
          if (app.globalData.question.three) {
            that.setData({
              questionType: 3,
              typeStr: "判断题"
            })

            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=3',
            })
            return
          }
          if (app.globalData.question.four) {
            that.setData({
              questionType: 4,
              typeStr: "填空题"
            })
            wx.navigateTo({
              url: '../../../pages/examination/test/test?questionType=4',
            })
            return
          }
        }
      },
      function(err) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }
    )
  }
})