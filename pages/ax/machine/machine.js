// 查询所有的list
function getAllList() {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/machine.php',
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

function getById(id) {
  var data = {id:id}
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/machine.php',
      method: 'POST',
      data: {
        main: 'getbyid',
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
exports.getAllList = getAllList;
exports.getById = getById;