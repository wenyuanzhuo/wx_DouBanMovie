// pages/welcome/welcome.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    slider: [],
    swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersURL = app.globalData.doubanBase +
     app.globalData.inTheaters + "?start=0&count=10";
     this.getinTheatersMovieListData(inTheatersURL, "inTheaters", "影院热映");
    //  console.log(inTheatersURL);
    var comingSoonURL = app.globalData.doubanBase +
      app.globalData.comingSoon + "?start=0&count=10";
    this.getcomingSoonMovieListData(comingSoonURL,"coming_soon","即将上映");
    // this.getMovieListData(comingSoonURL,"inTheaters","");

    // var weeklyURL = app.globalData.doubanBase +
    //   app.globalData.weekly + "?start=0&count=10";
    // this.getweeklyMovieListData(weeklyURL, "weekly", "口碑榜");
    // console.log("weeklyURL");
    var that = this;
    util.getRecommend(function(data){
      that.setData({
        slider: data.data.slider
      })
    });
},
  getinTheatersMovieListData:function(url,settedKey,categoryTitle) {
     wx.showToast({
       title: '加载中',
       icon: 'loading',
       duration: 3000
     });
     var that = this;
     wx.request({
       url: url,
       method: 'GET',
       header:{
         "content-type": "json"
       },

       success: function(res) {
        that.setData({
          inTheaters:res.data.subjects

        })

       }
     })
  },
  getcomingSoonMovieListData: function (url, settedKey, categoryTitle) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "content-type": "json"
      },

      success: function (res) {
        that.setData({
          comingSoon: res.data.subjects

        })

      }
    })
  },




  // getweeklyMovieListData: function (url, settedKey, categoryTitle) {
  //   wx.showToast({
  //     title: '加载中',
  //     icon: 'loading',
  //     duration: 3000
  //   });
  //   var that = this;
  //   wx.request({
  //     url: url,
  //     method: 'GET',
  //     header: {
  //       "content-type": "json"
  //     },

  //     success: function (res) {
  //       that.setData({
  //         weekly: res.data.subjects

  //       })

  //     }
  //   })
  // },

  //轮播图的切换事件
  swiperChange:function(e){
//只要把切换后当前的index传给<swiper>组件的current属性即可
    this.setData({
      swiperCurrent: e.detail.current

    })
  },
  //点击指示点切换
 chuangEvent: function(e){
   this.setData({
     swiperCurrent: e.currentTarget.id
   })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
