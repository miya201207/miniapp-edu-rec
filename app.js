//app.js
const config = require('config.js')
const http = require('http.js')
const updateManager = wx.getUpdateManager()
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.login()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
    })
  },
  onShow:function(){
    console.log("App onShow")
  },

  onHide:function(){
    console.log("App onHide")
  },
 

  watch: function(method) {
    var obj = this.globalData
    var tmp = obj['isConnect'];
    Object.defineProperty(obj, "isConnect", {
      configurable: true,
      enumerable: true,
      set: function(value) {
        tmp = value
        method(value);
      },
      get: function() {
        return tmp
      }
    })
  },
  globalData: {
    userInfo: null,
    isConnect: false,
    // type:null,
    question: {
      zero: false,
      one: false,
      two: false,
      three: false,
      four: false
    },
    score: {
      zero: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      total: 0
    }
  },

  studyTimeAdd: function(courseId,chapterId,second) {
    var app = this
    http.request(
      config.studyTimeAdd,
      'POST', {
        courseId:courseId,
        chapterId:chapterId,
        studyTime: second
      },
      function(res) {
        if (res.data != null) {

        }
      },
      function(err) {
        // wx.showToast({
        //   title: '数据请求失败',
        //   icon: 'none',
        // })
      }
    )
  },

  login: function() {
    var app = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.showLoading({
          title: '正在加载中...',
        })
        wx.request({
          url: config.login,
          data: {
            code: res.code
          },
          method: 'POST',
          success(res) {
            wx.hideLoading()
            console.log("login res", res)
            if (res.data.data != null) {
              wx.setStorageSync('sessionId', res.data.data)
              app.globalData.isConnect = true
            }
          },
          fail(err) {
            wx.hideLoading()
          }
        })
      }
    })

  }
})