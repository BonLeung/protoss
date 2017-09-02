import {Home} from 'home-model.js';
var home = new Home();

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * Do some initialize when page load.
   */
  onLoad: function() {
    this._loadData();
  },

  _loadData: function() {
    let id =  1;
    home.getBannerData(id, (banners) => {
      this.setData({
        banners: banners
      })
    });

    home.getThemeData((themes) => {
      this.setData({
        themes: themes
      })
    })

    home.getProductsData((products) => {
      this.setData({
        products: products
      })
    })
    
  },

  onProductsItemTap: function(event) {
    let id = home.getDataSet(event, 'id');
    console.log(id);
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },

  onThemesItemTap: function(event) {
    let id = home.getDataSet(event, 'id');
    let name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name,
    })
  }

  
})