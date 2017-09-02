import { Config } from '../utils/config.js';

class Base {
  
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  request(params) {
    let url = this.baseRequestUrl + params.url;
    let method = 
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      method: params.type || 'GET',
      dataType: 'json',
      success: function(res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        params.complete && params.complete(res);
      },
    })
  }

  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
}

export { Base };