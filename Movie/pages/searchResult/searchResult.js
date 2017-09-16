// pages/searchResult/searchResult.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},

     hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersURL = app.globalData.doubanBase +
     app.globalData.inTheaters + "?start=0&count=10";
     this.getinTheatersMovieListData(inTheatersURL, "inTheaters", "影院热映");
    // var id = options.id;
    //
    // this.fetchData(id);
    // wx.request({
    //   url: "http://api.douban.com/v2/movie/subject",
    //   method: "GET",
    //   success: function(res) {
    //     console.log(res);
    //
    //   }
    // })

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
  // fetchData: function(id) {
  //     var url = 'https://api.douban.com/v2/movie/subject';
  //     url += '/' + id ;
  //     console.log(url);
  //     var that = this ;
  //     wx.request({
  //       url: url,
  //       method: 'GET',
  //       success: function(res) {
  //
  //         that.setData({
  //          subjects:res.data
  //         });
  //
  //       }
  //     })
  //
  //   },

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
