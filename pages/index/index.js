//index.js
const config = require('../../config.js')
const http = require('../../http.js')
//获取应用实例
const app = getApp()

var page = 1

Page({
  data: {
    bannerData: [],
    noticeData: [],
    announcementData: [],
    showModal: false,
  },

  noticeClick: function(e) {
    var pos = e.currentTarget.dataset.pos
    this.setData({
      noticeTitle: this.data.noticeData[pos].title,
      noticeContent: this.data.noticeData[pos].content,
    })
    this.showHint()
  },
  //事件处理函数
  showHint: function() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    console.log("hideModal")
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  clickButton: function() {
    this.hideModal();
  },


  onLoad: function() {

    var value = wx.getStorageSync('sessionId')
    if (value) {
      page = 1
      this.getAnnouncementData(page)
      this.getBanners()
      this.getMessages()
    }
    app.watch(this.watchBack)
  },

  onShareAppMessage: function () {
    // return custom share data when user share.
  },

  watchBack: function(value) {
    if (value){
      page = 1
      this.getAnnouncementData(page)
      this.getBanners()
      this.getMessages()
    }
   
  },

  navigationClick: function(e) {
    switch (e.currentTarget.dataset.pos) {
      case '0':
        wx.switchTab({
          url: '/pages/course/course',
        })
        break
      case '1':
        wx.switchTab({
          url: '/pages/exam/exam',
        })
        break
      case '2':
        // wx.switchTab({
        //   url: '/pages/dynamic/dynamic',
        // })

        wx.navigateToMiniProgram({
          appId:'wx8bf9b0e678f1f7ff',
          path: '/pages/index/index',
          envVersion: 'release',
          success(res) {
            // 打开成功
            wx.showToast({
              title: '跳转成功'
              })
          },
        })
      break

       case '3':
        wx.setStorageSync('type', 1)
        wx.switchTab({
          url: '/pages/course/course',
          success:function(e){
            let page = getCurrentPages().pop();
            console.log('page',page)
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
        break


        case '4':
          wx.setStorageSync('type', 2)
          wx.switchTab({
            url: '/pages/course/course',
            success:function(e){
              let page = getCurrentPages().pop();
              console.log('page',page)
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
          break


          case '5':
            // getApp().globalData.type=3
            wx.setStorageSync('type', 3)
            wx.switchTab({
              url: '/pages/course/course',
              success:function(e){
                let page = getCurrentPages().pop();
                console.log('page',page)
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
            break

            case '6':
              // getApp().globalData.type=4
              wx.setStorageSync('type', 4)
              wx.switchTab({
                url: '/pages/course/course',
                success:function(e){
                  let page = getCurrentPages().pop();
                  console.log('page',page)
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
              break
    }
  },

  itemClick: function(e) {
    let pos = e.currentTarget.dataset.pos
    wx.navigateTo({
      url: '../../pages/dynamic-details/dynamic-details?newsId=' + this.data.announcementData[pos].id,
    })
  },
  toExam:function(e){
    wx.navigateToMiniProgram({
      appId:'wx675db00d4f02fa1a',
      path: '/pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
        wx.showToast({
          title: '跳转成功'
          })
      },
    })
  },
  moreMsg: function() {
    wx.switchTab({
      url: '/pages/dynamic/dynamic',
    })
  },


  loadMore: function(e) {
    console.log("加载更多")
    page++
    this.getAnnouncementData(page)
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

  getMessages: function() {
    var that = this;
    http.request(
      config.message,
      'GET', null,
      function(res) {
        if (res.rows != null) {
          that.setData({
            noticeData: res.rows
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

  getAnnouncementData: function(p) {
    var that = this;
    http.request(
      config.news,
      'GET', {
        page: p,
        pageSize: 3,
      },
      function(res) {
        if (res.data != null) {    
            that.setData({
              announcementData: res.data
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
  }
})