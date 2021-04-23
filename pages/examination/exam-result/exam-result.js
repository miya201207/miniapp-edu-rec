// pages/examination/exam-result/exam-result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordData: null,
    unsureness: false,
    single: false,
    multiple: false,
    check: false,
    completion: false,
    type: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t = options.type
    this.setData({
      type: t
    })
    let record = null
    if (t == 0) {
      console.log("examRecord")
      record = wx.getStorageSync("examRecord")
    } else {
      console.log("testRecord")
      record = wx.getStorageSync("testRecord")
    }
    console.log("record", record)
    if (record) {
      this.setData({
        examData: {
          unsurenessPoint: record.unsurenessPoint,
          singlePoint: record.singlePoint,
          mulitplePoint: record.mulitplePoint,
          checkPoint: record.checkPoint,
          completionPoint: record.completionPoint,
          totalPoint: record.totalPoint
        },
      })

      if (record.unsurenessPoint != null && record.unsurenessPoint != 0) {
        this.setData({
          unsureness: true
        })
      }
      if (record.singlePoint != null && record.singlePoint != 0) {
        this.setData({
          single: true
        })
      }
      if (record.mulitplePoint != null && record.mulitplePoint != 0) {
        this.setData({
          multiple: true
        })
      }
      if (record.checkPoint != null && record.checkPoint != 0) {
        this.setData({
          check: true
        })
      }
      if (record.completionPoint != null && record.completionPoint != 0) {
        this.setData({
          completion: true
        })
      }

      if (t == 0) {
        if (record.xzExamRecord != null) {
          this.setData({
            recordData: {
              unsurenessPoint: record.xzExamRecord.unsurenessPoint,
              singlePoint: record.xzExamRecord.singlePoint,
              multiplePoint: record.xzExamRecord.multiplePoint,
              checkPoint: record.xzExamRecord.checkPoint,
              completionPoint: record.xzExamRecord.completionPoint,
              totalPoint: record.xzExamRecord.totalPoint
            },
            date: {
              startTime: record.xzExam.startTime.substring(0, 16),
              endTime: record.xzExam.endTime.substring(0, 16)
            },
          })
        } else {
          wx.showToast({
            title: '没有答题成绩',
            icon: 'none'
          })
        }
      } else {
        if (record.eaeExamRecord != null) {
          this.setData({
            recordData: {
              unsurenessPoint: record.eaeExamRecord.unsurenessPoint,
              singlePoint: record.eaeExamRecord.singlePoint,
              multiplePoint: record.eaeExamRecord.multiplePoint,
              checkPoint: record.eaeExamRecord.checkPoint,
              completionPoint: record.eaeExamRecord.completionPoint,
              totalPoint: record.eaeExamRecord.totalPoint
            },
            date: {
              startTime: record.startTime.substring(0, 16),
              endTime: record.endTime.substring(0, 16)
            },

            recordId: record.eaeExamRecord.id,
            examId: record.examId

          })
        } else {
          wx.showToast({
            title: '没有答题成绩',
            icon: 'none'
          })
        }
      }
    } else {
      wx.showToast({
        title: '没有答题成绩',
        icon: 'none'
      })
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


  checkPaper: function() {
    wx.navigateTo({
      url: '../test-paper/test-paper?type=1&examId=' + this.data.examId + "&recordId=" + this.data.recordId,
    })
  }
})