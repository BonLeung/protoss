import { Category } from 'category-model.js';
let category = new Category();

// category.js
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
    this._loadData();
  },

 _loadData: function() {
    category.getCategoryTypes((res) => {
      this.setData({
        categoryTypes: res
      })
    })
 }
})