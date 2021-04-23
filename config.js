/**
 * 小程序配置文件
 */

//本地地址
// var host = "http://192.168.1.156:7891/eae/api/";
// 测试地址
// var host = "http://mini.kaililaw.com/eae/api/";
// 线上地址
var host = "https://mini.kaililaw.com/eae/api/";

var hosts = "https://mini.kaililaw.com/studylaw/";//线上地址

var config = {

  //用户模块
  //登陆
  login: `${host}user/login`,
  //获取手机号
  tel: `${host}user/tel`,
  //微信手机号登陆
  wxdl: `${host}user/wxdl`,
  //注册
  reg: `${host}user/reg`,
  //发送验证码
  vcode: `${host}user/vcode`,
  //验证码校验登陆
  verify: `${host}user/verify`,
  //用户信息修改
  user: `${host}user/user`,
  //用户退出登录
  logout: `${host}user/logout`,

  //考试模块
  
  //考试列表
  getExamList: `${host}exam/getExamList`,
  //考试须知
  getExplain: `${host}exam/getExplain`,
  //开始考试
  beginExam: `${host}exam/beginExam`,
  //获取考试题
  getQuestions: `${host}exam/getQuestions`,
  //提交考试成绩
  addRecord: `${host}exam/addRecord`,
  //查询考试成绩
  queryRecord: `${host}exam/queryRecord`,
  //获取考试信息
  gotoApply: `${host}exam/queryRecord`,
  //用户答题报告
  getReport: `${host}exam/getReport`,
  //用户考试记录
  allRecords: `${host}exam/allRecords`,
  //用户答题记录
  recordReport: `${host}exam/recordReport`,

  //课程模块
  //头部统计数据
  courseHeader: `${host}web/study/header`,
  //课程列表
  courseList: `${host}web/study/courseList`,
  //章节列表
  courseChapterList: `${host}web/study/courseChapterList`,
  //笔记列表
  courseNoteList: `${host}web/study/courseNoteList`,
  //添加笔记
  courseNoteAdd: `${host}web/study/courseNoteAdd`,
  //练习题
  courseExerciseList: `${host}web/study/courseExerciseList`,
  //用户学习
  userStudyBehaviourAdd: `${host}web/study/userStudyBehaviourAdd`,
  //用户学习记录
  myStudyRecordList: `${host}web/study/myStudyRecordList`,
  //用户学习时间记录
  studyTimeAdd: `${host}web/study/v1-1/studyTimeAdd`,
  //学习排行榜
  myunits: `${host}web/study/myunits`,

  //动态模块
  //动态列表
  news: `${host}news/news`,
  //动态分类
  newsTypes: `${host}news/news/types`,

  //广告图
  banner: `${host}banner/banners`,
  //消息通知
  message: `${host}message/messages`,

  
  //=========宪法答题====================
  
  //获取列表数据
  getExercisesList: `${hosts}api/xzLaw/getQuestionBankList`,

  //获取列表详情数据
  getExercisesDetails: `${hosts}api/xzLaw/getQuestionBank`,
  
  //开始练习题
  getExerciseesList: `${hosts}api/xzLaw/beginAnswer`,



  
  //========一站到底数据存储需要的Key=========
  gateList: "gateList",

  //法律考试题
  examList: "examList",
  //宪法习作考试题
  exercisesList: "exercisesList",
  //考试结果实体记录
  examResultInfo: "examResultInfo",
};

module.exports = config