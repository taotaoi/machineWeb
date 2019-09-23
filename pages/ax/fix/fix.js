function submitAdd(data) {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/fix.php',
      method: 'POST',
      data: {
        main: 'submitadd',
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

exports.submitAdd = submitAdd;