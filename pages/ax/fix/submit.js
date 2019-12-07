const url = getApp().globa.URL + 'submit.php';

function submitAdd(data) {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'insert',
        data:JSON.stringify(data)
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
function update(data){
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'update',
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

function del(id){
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'del',
        data: JSON.stringify({fixid:id})
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

function getAlllist(){
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

function getByFixId(data){
  var formdata = {fixid:data};
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

function getByUserId(data) {
  var formdata = {userid:data};
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getbyuser',
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

exports.submitAdd = submitAdd;
exports.update = update;
exports.del = del;
exports.getAlllist = getAlllist;
exports.getByFixId = getByFixId;
exports.getByUserId = getByUserId;