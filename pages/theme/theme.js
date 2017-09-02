import { Theme } from 'theme-model.js';

let theme = new Theme();

// theme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.data.name = options.name;
    console.log(this.data);
    this._loadData();
  },

  _loadData: function() {
    theme.getProductsData(this.data.id, (res) => {
      this.setData({
        themeInfo: res
      });
    });
  },

  onProductsItemTap: function (event) {
    let id = theme.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
})