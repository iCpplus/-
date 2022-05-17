const dbConfig = require('../../utils/dbconfig')
//查询商铺信息
getShopDetail = (userId) => {
  const sql = 'select * from store_info where seller_id =?'
  const sqlArr = [userId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询店铺列表
getShopList = () => {
  const sql = 'select * from store_info'
  const sqlArr = []
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询商铺信息
getShopDetailByStoreId = (storeId) => {
  const sql = 'select * from store_info where store_id =?'
  const sqlArr = [storeId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//更新店铺销量
updateShopOrder = (id) => {
  const sql =
    'update store_info set order_quantity=order_quantity+1 where store_id=?'
  const sqlArr = [id]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//更新店铺信息
updateShopInfo = (data) => {
  const sql =
    'update store_info set store_name=?,store_phone=?,store_address=?,store_icon=?,store_open_time=?,store_status=?,store_desc=?,min_price=?,post_price=? where seller_id=?'
  const {
    storeName,
    storePhone,
    storeAddress,
    storeIcon,
    storeOpenTime,
    storeStatus,
    storeDesc,
    minPrice,
    postPrice,
    userId
  } = data
  const sqlArr = [
    storeName,
    storePhone,
    storeAddress,
    storeIcon,
    storeOpenTime,
    storeStatus,
    storeDesc,
    minPrice,
    postPrice,
    userId
  ]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

module.exports = {
  getShopDetail,
  updateShopInfo,
  getShopDetailByStoreId,
  getShopList,
  updateShopOrder
}
