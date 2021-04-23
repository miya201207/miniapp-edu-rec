const config = require('config.js')
/**
 * 网络请求封装
 */
var header = {
  'Cookie': 'sessionid=' + wx.getStorageSync('openid')
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function httpRequest(url, method, params, onSuccess, onFailed, isloading,tag) {
  if (isloading) {
    console.log("显示loading")
    wx.showLoading({
      title: "正在加载中...",
    })
  }
  wx.request({
    url: url,
    data: params,
    method: method,
    header: {
      'Cookie': 'sessionid=' + wx.getStorageSync('sessionId')
    },
    success(res) {
      if (isloading) {
        console.log("关闭loading")
        wx.hideLoading();
      }
      console.log(url + '接口响应：', res);
      /** start 根据需求 接口的返回状态码进行处理 */
      if (res.statusCode == 200 || res.statusCode == 201) {
        onSuccess(res.data); //request success
      } else if (res.statusCode == 401) {
        if(tag){
          wx.navigateTo({
            url: '../../../pages/login/login-default/login-default',
          })
        }else{
          wx.navigateTo({
            url: '../../pages/login/login-default/login-default',
          })
        }
      
      } else if (res.statusCode == 402) {
        wx.login({
          success: res => {
            wx.request({
              url: config.login,
              data: {
                code: res.code
              },
              method: 'POST',
              success(res) {
                console.log("login res", res)
                if (res.data.data != null) {
                  wx.setStorageSync('sessionId', res.data.data)
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              },
              fail(err) {
                console.log("login err", err)
              }
            })
          }
        })
      } else {
        onFailed(res.data.msg); //request failed
      }
      /** end 处理结束*/
    },
    fail(error) {
      if (isloading) {
        console.log("关闭loading")
        wx.hideLoading();
      }
      console.log(url + '接口失败: ', error);
      onFailed(""); //failure for other reasons
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  console.log("请求参数:", params)
  return params;
}


// 1.通过module.exports方式提供给外部调用
module.exports = {
  request: httpRequest
}