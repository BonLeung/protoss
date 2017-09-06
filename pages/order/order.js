import { Cart } from '../cart/cart-model.js';
import { Address } from '../../utils/address.js';
import { Order } from 'order-model.js';
let cart = new Cart();
let address = new Address();
let order = new Order();

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
    
    this.setData({
      account: account,
      orderProducts: orderProducts,
      orderStatus: 0
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
  
  },

  editAddress: function(event) {
    let that = this;
    wx.chooseAddress({
      success: function(res) {
        let addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }
        
        that._bindAddressInfo(addressInfo);

        // 保存地址
        address.submitAddress(res, (flag) => {
          if (!flag) {
            this.showTips('操作提示', '地址信息更新失败');
          }
        })
      }
    });
  },

  showTips: function(title, content, flag = false) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: true,
      success: function(res) {
        if(flag) {
          wx.switchTab({
            url: '/pages/my/my',
          });
        }
      }
    })
  },

  _bindAddressInfo: function(addressInfo) {
    this.setData({
      addressInfo: addressInfo
    })
  }
})