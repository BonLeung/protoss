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
  
  },

  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function() {
    cart.execSetStorageSync(this.data.cartData);
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
  },

  toggleSelect: function(event) {
    let id = cart.getDataSet(event, 'id');
    let status = cart.getDataSet(event, 'status');
    let index = this._getProductIndexById(id);

    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },

  toggleSelectAll: function (event) {
    let status = cart.getDataSet(event, 'status') == 'true';

    for (let i = 0; i < this.data.cartData.length; i++) {
      this.data.cartData[i].selectStatus = !status;
    }

    this._resetCartData();
  },

  changeCounts: function(event) {
    let id = cart.getDataSet(event, 'id'),
        type = cart.getDataSet(event, 'type'),
        index = this._getProductIndexById(id),
        count = 1;

    if (type === 'add') {
      cart.addCounts(id);
    } else {
      count = -1;
      cart.cutCounts(id);
    }

    this.data.cartData[index].counts += count;
    this._resetCartData();
  },

  delete: function(event) {
    let id = cart.getDataSet(event, 'id'),
        index = this._getProductIndexById(id);
    
    this.data.cartData.splice(index, 1);
    this._resetCartData();
    cart.delete(id);
  },

  submitOrder: function(event) {
    wx.navigateTo({
      url: '/pages/order/order?account=' + this.data.account + '&from=cart',
    })
  },

  _resetCartData: function() {
    let newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      account: newData.account,
      cartData: this.data.cartData
    })
  },

  _getProductIndexById(id) {
    let cartData = this.data.cartData;
    let len = cartData.length;

    for (let i = 0; i < len; i++) {
      if (cartData[i].id == id) {
        return i;
      }
    }
  }

})