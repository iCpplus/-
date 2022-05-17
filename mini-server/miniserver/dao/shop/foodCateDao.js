const dbConfig = require('../../utils/dbconfig')
//查询食品种类
getFoodCate = (shopId) => {
  const sql = 'select * from food_category where store_id =?'
  const sqlArr = [shopId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//删除食品种类
deleteFoodCate = (data) => {
  const sql = 'delete from food_category where store_id=? and category_id=?'
  const { shopId, cateId } = data
  const sqlArr = [shopId, cateId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//增加类别
addFoodCate = (data) => {
  const sql = 'insert into food_category (store_id,category_name) values(?,?)'
  const { shopId, cateName } = data
  const sqlArr = [shopId, cateName]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

module.exports = {
  getFoodCate,
  deleteFoodCate,
  addFoodCate
}