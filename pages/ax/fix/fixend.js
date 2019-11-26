const url = getApp().globa.URL + 'fixend.php';

function insert(data) {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'insert',
        data: JSON.stringify(data)
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}

function getAllList() {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getalllist'
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}
function getByFixId(data) {
  var formdata = { fixid: data };
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getbyfixid',
        data: JSON.stringify(formdata)
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}

function getByFixEndUser(data){
  var formdata = { fixenduser: data };
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getbyfixenduser',
        data: JSON.stringify(formdata)
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}
function getByFixUser(data){
  var formdata = { fixuser: data };
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getbyfixuser',
        data: JSON.stringify(formdata)
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}

function getBySubmitUser(data) {
  var formdata = { fixuser: data };
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getbysubmituser',
        data: JSON.stringify(formdata)
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}
exports.insert = insert;
exports.getAllList = getAllList;
exports.getByFixId = getByFixId;
exports.getByFixEndUser = getByFixEndUser;
exports.getByFixUser = getByFixUser;
exports.getBySubmitUser = getBySubmitUser;