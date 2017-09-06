import { Base } from 'base.js';
import { Config } from 'config.js';

class Address extends Base {
  constructor() {
    super();
  }

  setAddressInfo(res) {
    let province = res.provinceName || res.province,
        city = res.cityName || res.city,
        country = res.countryName || res.country,
        detail = res.detailInfo || res.detail;

    let totalDetail = province + city + country + detail;
    if (isCenterCity(province)) {
      totalDetail = city + country + detail;      
    }

    return totalDetail;
  }

  /**
   * 是否是直辖市
   */
  isCenterCity(cityName) {
    let centerCities = ['北京市', '天津市', '上海市', '重庆市'];
    return centerCities.indexOf(cityName) !== -1;
  }

  /**
   * 更新保存地址
   */
  submitAddress(data, callback) {
    data = this._setUpAddress(data);
    let params = {
      url: '/address',
      type: 'post',
      data: data,
      sCallback: function(res) {
        callback && callback(true, res);
      },
      eCallback: function(res) {
        callback && callback(false, res);
      }
    };
    this.request(params);
  }

  _setUpAddress(data) {
    return {
      name: data.userName,
      province: data.provinceName,
      city: data.cityName,
      country: data.countryName,
      mobile: data.telNumber,
      detail: data.detailInfo
    };
  }
}

export { Address };