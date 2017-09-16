// pages/search/search.js
var app = getApp();
Page({
  data: {
    keyword: "",
    showDelete: false,
    result: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 搜索影视 */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showDelete: false };
    if (value.length > 0) {
      readyData = { showDelete: true };
      this.handleSearchData(value);
    }
    this.setData(readyData);
  },
  /**清空输入框 */
  bindSearchDelete: function (event) {
    var readyData = { searchValue: "", showDelete: false, result: {} };
    this.setData(readyData);
  },

  /** 提交搜索请求 */
  handleSearchData: function (value) {
    var that = this;
    var url = app.globalData.doubanBase + app.globalData.search + '?q='+ value +'&start=0&count=10';
    wx.request({
      url: url,
      method: 'GET',
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {

        // var data = res.data;
        that.processSearchData(res.data);
      }
      });
      // ,
      // fail: function () {
      //
      // },
      // complete: function () {
      //
      // }

  },
  /**组装搜索数据 */
  processSearchData: function (data) {
    var movies = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var directors = "";
      var separate = " / ";
      for (let i in subject.directors) {
        directors += subject.directors[i].name + separate;
      }
      directors = directors.substring(0, directors.length - separate.length);
      var summary = subject.rating.average + "分" + separate + subject.year + separate + directors;
      var temp = {
        id: subject.id,
        casts: subject.casts,
        collect_count: subject.collect_count,
        directors: subject.directors,
        title: subject.title,
        images: subject.images,
        rating: subject.rating,
        year: subject.year,
        summary: summary
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData["result"] = {
      subjects: movies
    }

    this.setData(readyData);
  },
  /** 点击进入搜索条目 */
  handletap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({

      url: '/pages/logs/logs?id=' + id
    })
  }
})
// Page({
//
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     postsList:[],
//     searchType: 0,
//
//     hotKeyword: ['迷失之城', 'okja', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
//     hotTag: ['动作', '喜剧', '爱情', '悬疑'],
//     // activeIndex:
//     movielist:[],
//     list:[]
//   },
//   changeSearchType: function() {
//     var types = ['默认', '类型'];
//     var that = this
//     wx.showActionSheet({
//       itemList: types,
//       success: function(res) {
//         if (!res.cancel) {
//           that.setData({
//             searchType: res.tapIndex
//           })
//         }
//       }
//     })
//   },
//   search: function(e) {
//     var that = this
//     var keyword = e.detail.value.keyword
//     var url ='http://api.douban.com/v2/movie/search'+'?q='+keyword;
//     console.log(url);
//     if (keyword == '') {
//
//       wx.showToast({
//       title: '请输入内容',
//       icon: 'info',
//       duration: 2000
//       })
//       return false
//     } else {
//
//         wx.request({
//         url: url,
//         method: 'GET',
//         header: {
//           "content-type": "json"
//         },
//         success: function (res) {
//           console.log(res.data.subjects);
//           console.log(res.data);
//
//           that.setData({
//             // searchs: res.data
//             movielist:res.data.subjects,
//             list:res.data
//              })
//         }
//
//       })
//      }
//   },
//
//   searchByKeyword: function(e) {
//     var that =this
//
//     var keyword = e.currentTarget.dataset.keyword
//     wx.navigateTo({
//       url: ''
//
//     })
//   },
//   searchByTag: function(e) {
//     var that = this
//
//     var keyword = e.currentTarget.dataset.keyword
//     wx.navigateTo({
//       url: ''
//
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     // var inTheatersURL = app.globalData.doubanBase +app.globalData.inTheaters + "?start=0&count=10";
//
//
//
//
//   },
//  //  getSearchListData: function (url, settedKey, categoryTitle) {
//  //   wx.showToast({
//  //     title: "加载中",
//  //     icon: 'loading',
//  //     duration: 10000
//  //   });
//  //   var that = this;
//  //   wx.request({
//  //     url: url,
//  //     method: 'GET',
//  //     header: {
//  //       "Content-Type": "json",
//  //     },
//  //     success: function (res) {
//  //       console.log(res.data);
//  //       that.setData({
//  //         movieList: res.data.subjects,
//  //         list:res.data
//  //       })
//  //     }
//  //   });
//  // },
//
//
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
//
//   },
//
//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
//
//   },
//
//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
//
//   },
//
//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
//
//   }
// })
