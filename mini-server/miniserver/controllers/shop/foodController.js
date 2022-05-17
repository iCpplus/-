var foodDao = require('../../dao/shop/foodDao')

//获取食品列表
getFoodList = (req, res) => {
  const { storeId } = req.body
  foodDao
    .getFoodList(storeId)
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

//获取食品
getFoodById = (req, res) => {
  const { foodId } = req.body
  foodDao
    .getFoodById(foodId)
    .then((listRes) => {
      res.send({
        code: 200,
        data: listRes[0]
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
//添加
addFood = (req, res) => {
  foodDao
    .addFood(req.body)
    .then(() => {
      res.send({
        code: 200,
        msg: '添加成功'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '添加失败'
      })
    })
}
//修改
updateFood = (req, res) => {
    console.log(req.body);
  foodDao
    .updateFood(req.body)
    .then(() => {
      res.send({
        code: 200,
        msg: '修改成功'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '修改失败'
      })
    })
}
//删除
deleteFood = (req, res) => {
  const { foodId } = req.body
  foodDao
    .deleteFood(foodId)
    .then(() => {
      res.send({
        code: 200,
        msg: '删除成功'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '删除失败'
      })
    })
}

module.exports = {
  addFood,
  deleteFood,
  updateFood,
  getFoodById,
  getFoodList
}
