const dbConfig = require('../../utils/dbconfig')

//增加
addFood = (data) => {
  const sql =
    'insert into food_info (store_id,food_name,food_price,food_description,food_icon,category_type) values(?,?,?,?,?,?)'
  const { storeId, foodName, foodPrice, foodDescription, foodIcon, foodCate } =
    data
  const sqlArr = [
    storeId,
    foodName,
    foodPrice,
    foodDescription,
    foodIcon,
    foodCate
  ]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询列表
getFoodList = (storeId) => {
  const sql = 'select * from food_info where store_id =?'
  const sqlArr = [storeId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询商品信息
getFoodById = (id) => {
  const sql = 'select * from food_info where food_id =?'
  const sqlArr = [id]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//修改
updateFood = (data) => {
  const sql =
    'update food_info set food_name=?,food_price=?,food_description=?,food_icon=?,category_type=? where food_id=?'
  const { foodId, foodName, foodPrice, foodDescription, foodIcon, foodCate } =
    data
  const sqlArr = [
    foodName,
    foodPrice,
    foodDescription,
    foodIcon,
    foodCate,
    foodId
  ]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//删除
deleteFood = (foodId) => {
  const sql = 'delete from food_info where food_id=?'
  const sqlArr = [foodId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
module.exports = {
  addFood,
  getFoodList,
  updateFood,
  deleteFood,
  getFoodById
}
