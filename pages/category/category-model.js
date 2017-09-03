import { Base } from '../../utils/base.js';

class Category extends Base {
  constructor() {
    super();
  }

  getCategoryTypes(callback) {
    let params = {
      url: '/category/all',
      sCallback: function(res) {
        callback && callback(res);
      }
    };

    this.request(params);
  }

  getProductsByCategory(id, callback) {
    let params = {
      url: '/product/by_category?id=' + id,
      sCallback: function(res) {
        callback && callback(res);
      }
    };

    this.request(params);
  }
}

export { Category };