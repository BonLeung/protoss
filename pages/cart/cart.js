import { Cart } from 'cart-model.js';
let cart = new Cart();

// cart.js
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
    console.log('load');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let cartData = cart.getCartDataFromLocal();
    let countsInfo = cart.getCartTotalCount(true);
    this.setData({
      selectedCounts: countsInfo,
      cartData: cartData
    })
  },

  _calcTotalAccountAndCounts: function(data) {
    let len = data.length,
        account = 0,
        // 购买商品的总个数
        selectedCounts = 0,
        // 购买商品总类的总数
        selectedTypeCounts = 0;
    let multiple = 100;
    for (let i = 0; i < len; i++) {
      account += data[i].counts * multiple * Number(data[i].price) * multiple;
      selectedCounts += data[i].counts;
      selectedTypeCounts++;
    }

    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
    };
  }
})