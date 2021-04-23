// pages/learn/study/study.js
const config = require('../../../config.js')
const http = require('../../../http.js')
//获取应用实例
const app = getApp()
var page = 1
var currentChapterId = 0
var lastChapterId = 0
var isStudy = false
var isContinue = false
var firstStudyClick = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: "",
    swiperHeight: "",
    fileType: 1, // 1 PDF 2 音频 3 视频
    courseId: -1,
    courseName: '',
    courseData: null,
    noteData: null,
    exerciseData: null,
    examItem: null,
    position: 0,
    isAnalysis: false,
    optionCanClick: true,
    autoPlay: false,
    studyPDF: false,
    isAddNote: false,
    haveExercise: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initHeight()
    this.setData({
      courseId: options.courseId,
      courseName: options.courseName,
      currentTab: options.studyTab
    })
    page = 1
    if (this.data.currentTab == 0) {
      this.getCourseChapterList(page, this.data.courseId)
    } else {
      this.getCourseExerciseList(this.data.courseId)
    }

    currentChapterId = 0
    lastChapterId = 0
    firstStudyClick = true
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
    console.log("onShow")
    if (this.data.isAddNote) {
      page = 1
      this.getCourseNoteList(page, this.data.courseId)
      this.data.isAddNote = false
    }
    if (this.data.studyPDF) {
      console.log("studyPDF come back")
      this.data.studyPDF = false
      this.endTime()
    }

    if (isContinue) {
      this.startTime()
      isContinue = false
    }

  },

  startTime: function () {
    console.log("startTime")
    isStudy = true
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("start==" + timestamp);
    this.setData({
      startTime: timestamp
    })
  },

  endTime: function () {
    console.log("endTime")
    isStudy = false
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("end==" + timestamp);
    let second = timestamp - this.data.startTime
    // let hour = ((timestamp - this.data.startTime) / 3600).toFixed(2)
    console.log("lastChapterId=" + lastChapterId + "     second=" + second)
    app.studyTimeAdd(this.data.courseId, lastChapterId, second)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
    if (this.data.studyPDF) {
      console.log("go to studyPDF")
    } else {
      if (isStudy) {
        this.endTime()
        isContinue = true
      }
    }

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
    if (isStudy) {
      this.endTime()
    }
  },


  loadMorChapterData: function () {
    console.log("加载更多章节")
    page++
    this.getCourseChapterList(page, this.data.courseId)
  },

  addNote: function () {
    this.setData({
      isAddNote: true
    })
    wx.navigateTo({
      url: '../../../pages/learn/note/note?courseId=' + this.data.courseId,
    })
  },

  lastExercise: function () {
    this.setData({
      optionCanClick: true,
      isAnalysis: false
    })
    this.data.position--;
    if (this.data.position >= 0) {
      this.setData({
        position: this.data.position,
        examItem: {
          content: this.data.exerciseData[this.data.position],
          state: {
            flag1: 0,
            flag2: 0,
            flag3: 0,
            flag4: 0,
          }
        }
      })
    } else {
      this.setData({
        position: 0
      })
      wx.showToast({
        title: '当前是第一题',
        icon: 'none'
      })
    }
  },

  nextExercise: function () {
    this.setData({
      optionCanClick: true,
      isAnalysis: false
    })
    this.data.position++;
    if (this.data.position < this.data.length) {
      this.setData({
        position: this.data.position,
        examItem: {
          content: this.data.exerciseData[this.data.position],
          state: {
            flag1: 0,
            flag2: 0,
            flag3: 0,
            flag4: 0,
          }
        }
      })
    } else {
      this.data.position--;
      this.setData({
        position: this.data.position
      })
      wx.showToast({
        title: '已经是最后一题',
        icon: 'none'
      })
    }
  },

  //选项点击事件
  optionClick: function (e) {
    console.log("optionClick")
    let pos = e.currentTarget.dataset.pos
    let correct = this.data.examItem.content.correct
    if (this.data.optionCanClick) {
      this.setData({
        optionCanClick: false
      })
      if (correct == pos) {
        switch (pos) {
          case '1':
            this.data.examItem.state.flag1 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '2':
            this.data.examItem.state.flag2 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '3':
            this.data.examItem.state.flag3 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '4':
            this.data.examItem.state.flag4 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
        }
      } else {
        switch (pos) {
          case '1':
            this.data.examItem.state.flag1 = 2
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '2':
            this.data.examItem.state.flag2 = 2
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '3':
            this.data.examItem.state.flag3 = 2
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '4':
            this.data.examItem.state.flag4 = 2
            this.setData({
              examItem: this.data.examItem
            })
            break
        }

        switch (correct) {
          case '1':
            this.data.examItem.state.flag1 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '2':
            this.data.examItem.state.flag2 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '3':
            this.data.examItem.state.flag3 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
          case '4':
            this.data.examItem.state.flag4 = 1
            this.setData({
              examItem: this.data.examItem
            })
            break
        }

        console.log("examItem", this.data.examItem)
      }
    }
  },

  // 滚动切换标签样式 
  switchTab: function (e) {
    var cur = e.detail.current;
    this.setData({
      currentTab: cur
    });
    page = 1
    if (cur == 0) {
      this.getCourseChapterList(page, this.data.courseId)
    } else if (cur == 1) {
      this.getCourseNoteList(page, this.data.courseId)
    } else {
      this.setData({
        optionCanClick: true,
        position: 0
      })
      this.getCourseExerciseList(this.data.courseId)
    }
  },



  /**
   * 动态设置高度
   */
  initHeight: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight
        var clientWidth = res.windowWidth
        var rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 350;
        that.setData({
          winHeight: calc,
          swiperHeight: calc - 150,

        });
      },
    })
  },

  analysisClick: function () {
    this.setData({
      isAnalysis: !this.data.isAnalysis
    })
  },

  typeClick: function (e) {
    var t = e.currentTarget.dataset.type
    this.setData({
      currentTab: t
    })
  },


  loadMorChapterData: function () {
    page++
    this.getCourseChapterList(page, this.data.courseId)
  },

  loadMoreNoteData: function () {
    page++
    this.getCourseNoteList(page, this.data.courseId)
  },

  studyClick: function (e) {
    console.log(e)
    let pos = e.currentTarget.dataset.pos
    var item = this.data.courseData[pos]
    this.setData({
      fileType: item.resourceType,
      fileUrl: item.resourceUrl
    })
    currentChapterId = item.id
    if (currentChapterId != lastChapterId) {
      if (firstStudyClick) {
        this.startTime()
      } else {
        this.endTime()
        this.startTime()
      }
    }
    lastChapterId = item.id
    firstStudyClick = false

    if (item.resourceType == 1) {
      this.setData({
        autoPlay: false,
        studyPDF: true
      })
      wx.showLoading({
        title: "正在加载中...",
      })
      wx.downloadFile({
        url: this.data.fileUrl,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        },
        fail: function () {
          wx.showToast({
            title: '文件下载失败',
            icon: 'none'
          })
        },
        complete: function () {
          wx.hideLoading();
        }

      })
    } else {
      this.setData({
        autoPlay: true
      })
    }
    // if (item.completed == 0) {
    //   this.userStudyBehaviourAdd(this.data.courseData[pos].id)
    // }

  },

  userStudyBehaviourAdd: function (id) {
    var that = this
    http.request(
      config.userStudyBehaviourAdd,
      'POST', {
        chapterId: id
      },
      function (res) {
        if (res.data != null) {

        }
      },
      function (err) {
        // wx.showToast({
        //   title: '数据请求失败',
        //   icon: 'none',
        // })
      }
    )
  },

  getCourseChapterList: function (p, id) {
    var that = this
    http.request(
      config.courseChapterList,
      'POST', {
        page: p,
        rows: 10,
        courseId: id
      },
      function (res) {
        if (res.data != null) {

          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i]
            let m = 0
            if (item.chapterStudyTime != null) {
              let t = item.chapterStudyTime.split(".");
              m = parseInt(t[0]) * 60 + parseInt(t[1]);
            }

            if (m <= 0) {
              item.minuteStr = "继续学习"
            } else {
              item.minuteStr = "已学" + m + "分钟"
            }

          }

          if (p > 1) {
            that.setData({
              courseData: that.data.courseData.concat(res.data)
            })
          } else {
            that.setData({
              courseData: res.data
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


  getCourseNoteList: function (p, id) {
    var that = this
    http.request(
      config.courseNoteList,
      'POST', {
        page: p,
        rows: 10,
        courseId: id
      },
      function (res) {
        if (res.data != null) {
          if (p > 1) {
            that.setData({
              noteData: that.data.noteData.concat(res.data)
            })
          } else {
            that.setData({
              noteData: res.data
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


  getCourseExerciseList: function (id) {
    var that = this
    http.request(
      config.courseExerciseList,
      'POST', {
        courseId: id
      },
      function (res) {
        if (res.data != null && res.data.length > 0) {
          that.setData({
            haveExercise: true,
            exerciseData: res.data,
            length: res.data.length,
            examItem: {
              content: res.data[that.data.position],
              state: {
                flag1: 0,
                flag2: 0,
                flag3: 0,
                flag4: 0,
              }
            }
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
  }
})