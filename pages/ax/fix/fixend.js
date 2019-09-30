function getAllList() {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/fixend.php',
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

function getByFixEndUser(data){
  var formdata = { fixenduser: data };
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/fixend.php',
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
exports.getAllList = getAllList;
exports.getByFixEndUser = getByFixEndUser;