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
    // let countsInfo = cart.getCartTotalCount(true);
    let calcData = this._calcTotalAccountAndCounts(cartData);
    this.setData({
      selectedCounts: calcData.selectedCounts,
      selectedTypeCounts: calcData.selectedTypeCounts,
      account: calcData.account,
      cartData: cartData
    })
  },

  _calcTotalAccountAndCounts: function(data) {
    let len = data.length,
        // 商品的总价格，排除未选中的商品
        account = 0,
        // 购买商品的总个数
        selectedCounts = 0,
        // 购买商品总类的总数
        selectedTypeCounts = 0;
    let multiple = 100;

    for (let i = 0; i < len; i++) {
      if(data[i].selectStatus) {
        account += Number(data[i].price) * multiple * data[i].counts;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }

    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / multiple
    };
  }
})