var foodCateDao = require('../../dao/shop/foodCateDao')
//列表
getFoodCateList = (req, res) => {
  const { shopId } = req.body
  foodCateDao
    .getFoodCate(shopId)
    .then((listRes) => {
      res.send({
        code: 200,
        list: listRes
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
deleteFoodCate = (req, res) => {
  foodCateDao.deleteFoodCate(req.body).then((r) => {
    res.send({
      code: 200,
      msg: '成功'
    })
  })
}
addFoodCate = (req, res) => {
  foodCateDao.addFoodCate(req.body).then((r) => {
    res.send({
      code: 200,
      msg: '成功'
    })
  })
}

module.exports = {
    getFoodCateList,
  deleteFoodCate,
  addFoodCate
}
