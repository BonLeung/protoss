import { Base } from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }

  getBannerData(id, callback) {
    let params = {
      url: '/banner/' + id,
      sCallback: function(res) {
        callback && callback(res.items);
      }
    }
    this.request(params);
  }    

  getThemeData(callback) {
    let params = {
      url: '/theme?ids=1,2,3',
      sCallback: function(res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  getProductsData(callback) {
    let params = {
      url: '/product/recent',
      sCallback: function(res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export { Home };