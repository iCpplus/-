var dbConfig = require('../../utils/dbconfig')
var shopDao = require('../../dao/shop/shopDao')

//获取商店信息
getShopDetail = (req, res) => {
  const { userId } = req.body
  shopDao.getShopDetail(userId).then((detailRes) => {
    res.send({
      code: 200,
      shopDetail: detailRes[0]
    })
  })
}
//修改商店信息
updateShopInfo = (req, res) => {
  shopDao.updateShopInfo(req.body).then((updateRes) => {
    res.send({
      code: 200,
      msg: '修改成功'
    })
  }).catch(updateErr=>{
    console.log(updateErr);
    res.send({
      code: 999,
      msg: '更新失败'
    })
  })
}
//写好的方法暴露出去
module.exports = {
  getShopList,
  getShopDetail,
  updateShopInfo
}
