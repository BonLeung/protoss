import { Base } from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super();
    this._storageKeyName = 'cart';
  }

/**
 * 加入购物车
 * 如果之前没有这样的商品，则直接添加一条新的纪录，数量为 counts
 * 否则，则只将相应数量 + counts
 * @param item  obj 商品对象
 * @param counts int 商品数目
 */
  add(item, counts) {
    var cartData = this.getCartDataFromLocal();

    var isHasInfo = this._isHasThatOne(item.id, cartData);
    if (isHasInfo.index == -1) {
      item.counts = counts;
      item.selectStatus = true; // 设置选中状态
      cartData.push(item);
    } else {
      cartData[isHasInfo.index].counts += counts;
    }
    wx.setStorageSync(this._storageKeyName, cartData)
  }

  /**
   * 从缓存中读取购物车的数据
   * @params flag boolean 是否过滤未选中的商品
   */
  getCartDataFromLocal(flag) {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];
    }
    if (flag) {
      let newRes = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].selectStatus) {
          newRes.push(res[i]);
        }
      }
      res = newRes;
    }
    return res;
  }

  execSetStorageSync(cartData) {
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  /**
   * 判断某个商品是否已经被添加到购物车中，
   * 并返回这个商品的数据以及所在数组中的序号
   */
  _isHasThatOne(id, arr) {
    var item,
        result = { index: -1 };
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item.id == id) {
        result = {
          index: i,
          data: item
        };
        break;
      }
    }
    return result;
  }

  /**
   * 计算购物车商品的数量
   * @param flag Boolean 是否考虑商品的选中状态
   */
  getCartTotalCount(flag) {
    let data = this.getCartDataFromLocal();
    let counts = 0;

    for(let i = 0; i < data.length; i++) {
      if (flag) {
        if (data[i].selectStatus) {
          counts += data[i].counts;          
        }
      } else {
        counts += data[i].counts;
      }
    }
    return counts;
  }

  /**
   * 增加商品数量
   */
  addCounts(id) {
    this._changeCounts(id, 1);
  }

  /**
   * 减少商品数量
   */
  cutCounts(id) {
    this._changeCounts(id, -1);
  }
  

  /**
   * 修改商品的数目
   * @params id int 商品id
   * @params counts int 数目
   */
  _changeCounts(id, counts) {
    let cartData = this.getCartDataFromLocal();
    let hasInfo = this._isHasThatOne(id, cartData);
    if (hasInfo.index !== -1) {
      if (hasInfo.data.counts > 1) {
        cartData[hasInfo.index].counts += counts;
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  delete(ids) {
    if (!(ids instanceof Array)) {
      ids = [ids];
    }
    let cartData = this.getCartDataFromLocal();
    for(let i = 0; i < ids.length; i++) {
      let hasInfo = this._isHasThatOne(ids[i], cartData);
      if (hasInfo.index !== -1) {
        cartData.splice(hasInfo.index, 1);
      } 
    }
    
    wx.setStorageSync(this._storageKeyName, cartData);
  }
}

export { Cart };