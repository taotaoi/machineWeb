const url = getApp().globa.URL + 'common.php';

// 根据fixid 查询当前的状态
function getStatusByFixId(data){
  var p1 = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        main: 'getstatusbyfixid',
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
  return p1;

}



exports.getStatusByFixId = getStatusByFixId;