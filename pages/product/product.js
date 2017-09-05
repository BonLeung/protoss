import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';
let product = new Product();
let cart = new Cart();

// product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCount: 1,
    tabs: ['商品详情', '产品参数', '售后保障'],
    currentTabIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this._loadData();
  },

  _loadData: function() {
    product.getDetailInfo(this.data.id, (res) => {
      this.setData({
        product: res,
        cartTotalCounts: cart.getCartTotalCount()
      });
    })
  },

  productCountChange: function(event) {
    let index = event.detail.value;
    let selectedCount = this.data.countsArray[index];
    this.setData({
      productCount: selectedCount
    })
  },

  onTabsItemTap: function(e) {
    let index = product.getDataSet(e, 'index');
    this.setData({
      currentTabIndex: index
    });
  },

  onAddingToCartTap: function(event) {
    this.addToCart();
    this.setData({
      cartTotalCounts: cart.getCartTotalCount()
    })
  },

  addToCart: function() {
    var productObj = {};
    var keys = ['id', 'name', 'main_img_url', 'price'];
    for(let key in this.data.product) {
      if (keys.indexOf(key) !== -1) {
        productObj[key] = this.data.product[key];
      }
    }
    cart.add(productObj, this.data.productCount);
  }
})