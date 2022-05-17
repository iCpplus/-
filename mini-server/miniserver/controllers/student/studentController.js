const shopDao = require('../../dao/shop/shopDao')
const foodDao = require('../../dao/shop/foodDao')
const studentDao = require('../../dao/student/studentDao')
getAnnounceList = (req,res) => {
  studentDao.getAnnounceList().then(listRes=>{
    res.send({
      code:200,
      list:listRes
    })
  })
}
getShopDetailByStoreId = (req, res) => {
  const { storeId } = req.body
  shopDao
    .getShopDetailByStoreId(storeId)
    .then((detailRes) => {
      foodDao.getFoodList(storeId).then((foodsRes) => {
        detailRes[0].foods = foodsRes
        res.send({
          code: 200,
          shopDetail: detailRes[0]
        })
      })
    })
    .catch((err) => {
      res.send({
        code: 999,
        msg: '查询失败'
      })
    })
}
getShopList = (req, res) => {
  shopDao
    .getShopList()
    .then((resList) => {
      res.send({
        code: 200,
        list: resList
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '查询失败'
      })
    })
}

module.exports = {
  getShopDetailByStoreId,
  getShopList,
  getAnnounceList
}
