const dbConfig = require('../../utils/dbconfig')
//商家获取订单列表
getShopOrderList = (id) => {
  const sql = 'select * from order_master where store_id =?'
  const sqlArr = [id]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//修改订单状态
updateOrderStatus = (orderId, status) => {
  const sql = 'update order_master set order_status=? where order_id=?'
  const sqlArr = [status, orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

module.exports = {
  getShopOrderList,
  updateOrderStatus
}
