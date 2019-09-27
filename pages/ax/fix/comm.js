// 根据fixid 查询当前的状态
function getStatusByFixId(data){
  var all = [isSubmit(),isFixing(),isFixEnd()];
  Promise.all(all).then(function(data){
    console.log(data);
  })
}

function isSubmit(data){
  var p1 = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/submit.php',
      method: 'POST',
      data: {
        main: 'getbyfixid',
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
  

}

function isFixing(data){
  var p2 = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/fixing.php',
      method: 'POST',
      data: {
        main: 'getbyfixid',
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

function isFixEnd(data){
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/fixend.php',
      method: 'POST',
      data: {
        main: 'getbyfixid',
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

exports.getStatusByFixId = getStatusByFixId;