import { Cart } from '../cart/cart-model.js';
let cart = new Cart();

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: 0,
    orderProducts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let account = options.account;
    let orderProducts = cart.getCartDataFromLocal(true);
    
    wx.chooseAddress({
      success: function(res) {
        console.log(res);
      }
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
  
  }
})