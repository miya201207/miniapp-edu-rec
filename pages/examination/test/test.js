// pages/examination/test/test.js
var examItem = null
var examList = null
var currentAnswerRecord = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: 1,
    typeValue: "单选题",
    typeCode: 0,
    topic: '',
    answers: [],
    currentPos: 0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    currentAnswerRecord = []
    let qt = options.questionType
    this.setData({
      typeCode: qt
    })
    try {
      switch (qt) {
        case '0':
          examList = wx.getStorageSync("unsurenessQuestions")
          this.setData({
            typeValue: "不定项"
          })
          break
        case '1':
          examList = wx.getStorageSync("singleQuestions")
          this.setData({
            typeValue: "单选题"
          })
          break
        case '2':
          examList = wx.getStorageSync("multipleQuestions")
          this.setData({
            typeValue: "多选题"
          })
          break
        case '3':
          examList = wx.getStorageSync("checkQuestions")
          this.setData({
            typeValue: "判断题"
          })
          break
        case '4':
          examList = wx.getStorageSync("completionQuestions")
          this.setData({
            typeValue: "填空题"
          })
          break
      }
      console.log("examList", examList)
      if (examList) {
        this.updatePageData(0)
      }

    } catch (e) {
      // Do something when catch error
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


  next: function() {
    console.log("next")
    if (examItem.selectItems.length > 0 || examItem.inputAnswer != '') {
      console.log("currentPos", this.data.currentPos)
      if (this.data.currentPos <= examList.length - 1) {
        currentAnswerRecord.push(examItem)
      }
      this.data.currentPos++;
      if (this.data.currentPos < examList.length) {
        this.updatePageData(this.data.currentPos)
        this.data.position++;
        this.setData({
          position: this.data.position
        })
      } else {
        //本地保存答题记录
        console.log("本地保存答题记录开始")
        switch (this.data.typeCode) {
          case '0':
            wx.setStorageSync("unsurenessRecord", currentAnswerRecord)
            console.log("unsurenessRecord", currentAnswerRecord)
            break
          case '1':
            wx.setStorageSync("singleRecord", currentAnswerRecord)
            console.log("singleRecord", currentAnswerRecord)
            break
          case '2':
            wx.setStorageSync("multipleRecord", currentAnswerRecord)
            console.log("multipleRecord", currentAnswerRecord)
            break
          case '3':
            wx.setStorageSync("checkRecord", currentAnswerRecord)
            console.log("checkRecord", currentAnswerRecord)
            break
          case '4':
            wx.setStorageSync("completionRecord", currentAnswerRecord)
            console.log("completionRecord", currentAnswerRecord)
            break
        }
        console.log("本地保存答题记录完成")
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          lastQuestionType: this.data.typeCode,
        })
        //返回
        wx.navigateBack({
          delta: 1
        })
      }
    } else {
      wx.showToast({
        title: '请先作答',
        icon: 'none'
      })
      return
    }
  },

  updatePageData(index) {
    examItem = {
      id: examList[index].id,
      correctCount: examList[index].correctCount,
      content: examList[index].content,
      answers: examList[index].answers,
      selectItems: [],
      inputAnswer: ''
    }
    for (var i = 0; i < examItem.answers.length; i++) {
      examItem.answers[i].isSelect = false
    }
    console.log("examItem", examItem)
    this.setData({
      topic: examItem.content,
      answers: examItem.answers,
      currentPos: index,
    })

    if (this.data.typeCode == 4) {
      this.setData({
        answerValue: ''
      })
    }
  },

  itemClick: function(e) {
    console.log("itemClick", e)
    var pos = e.currentTarget.dataset.pos
    var answerId = examItem.answers[pos].id
    let index = examItem.selectItems.indexOf(answerId)
    console.log("pos", pos)
    console.log("index", index)
    console.log("answerId", answerId)
    console.log("typeCode", this.data.typeCode)
    switch (this.data.typeCode) {
      case '0':
        //不定项
        console.log("不定项")
        if (index == -1) {
          examItem.selectItems.push(answerId)
          examItem.answers[pos].isSelect = true
        } else {
          examItem.answers[pos].isSelect = false
          examItem.selectItems.splice(index, 1)
        }
        break
      case '1':
        //单选
        console.log("单选")
        if (index == -1) {
          examItem.selectItems = []
          examItem.selectItems.push(answerId)
          examItem.answers[pos].isSelect = true
          for (var i = 0; i < examItem.answers.length; i++) {
            if (pos != i) {
              examItem.answers[i].isSelect = false
            }
          }
        } else {
          examItem.answers[pos].isSelect = false
          examItem.selectItems = []
        }
        break
      case '2':
        //多选
        console.log("多选")
        if (index == -1) {
          examItem.selectItems.push(answerId)
          examItem.answers[pos].isSelect = true
        } else {
          examItem.answers[pos].isSelect = false
          examItem.selectItems.splice(index, 1)
        }
        break
      case '3':
        //判断
        console.log("判断")
        if (index == -1) {
          examItem.selectItems = []
          examItem.selectItems.push(answerId)
          examItem.answers[pos].isSelect = true
          for (var i = 0; i < examItem.answers.length; i++) {
            if (pos != i) {
              examItem.answers[i].isSelect = false
            }
          }
        } else {
          examItem.answers[pos].isSelect = false
          examItem.selectItems = []
        }
        break
    }
    console.log("examItem", examItem)
    this.setData({
      answers: examItem.answers
    })
  },

  answerInput: function(e) {
    console.log("填空")
    examItem.inputAnswer = e.detail.value
    console.log("examItem", examItem)
  }
})