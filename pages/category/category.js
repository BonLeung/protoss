import { Category } from 'category-model.js';
let category = new Category();

// category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['translate0', 'translate1', 'translate2', 'translate3', 'translate4', 'translate5'],
    currentMenuIndex: 0,
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function (callback) {
    category.getCategoryTypes((categoryTypes) => {
      this.setData({
        categoryTypes: categoryTypes,
        loadingHidden: true
      });
     
      this.getProductsByCategory(categoryTypes[0].id, (res) => {
        var dataObj = {
          products: res,
          topImgUrl: categoryTypes[0].img.url,
          title: categoryTypes[0].name
        };
        this.setData({
          loadingHidden: true,
          categoryInfo0: dataObj
        });
        callback && callback();
      })
    });
  },

  /**
   * 切换分类
   */
  changeCategory: function(event) {
    var that = this;
    var index = category.getDataSet(event,'index'),
        id    = category.getDataSet(event, 'id');
    this.setData({
      currentMenuIndex: index
    });

    if (!this.isLoadedData(index)) {
      this.getProductsByCategory(id, (data) => {
        this.setData(
          that.getDataObjForBind(index, data)
        );
      })
    }
  },

  isLoadedData: function(index) {
    if (this.data['categoryInfo' + index]) {
      return true;
    } 
    return false;
  },

  getDataObjForBind: function(index, data) {
    var obj = {},
        arr = [0, 1, 2, 3, 4, 5],
        baseData = this.data.categoryTypes[index];
    for (var item in arr) {
      if (item == arr[index]) {
        obj['categoryInfo' + item] = {
          products: data,
          topImgUrl: baseData.img.url,
          title: baseData.name
        };
        return obj;
      }
    }
  },

  getProductsByCategory(id, callback) {
    category.getProductsByCategory(id, (data) => {
      callback & callback(data);
    })
  },

  /**
   * 跳转到商品详情
   */
  onProductsItemTap: function(event) {
    let id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },

  /**
   * 下拉刷新页面
   */
  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 分享效果
   */
  onShareAppMessage: function() {
    return {
      title: '零食商贩 Pretty Vender',
      path: 'pages/category/category'
    }
  }
})