const dbConfig = require('../../utils/dbconfig')
//配送这获取待接单订单列表
getRiderOrder=()=>{
  const sql = 'select * from order_master'
  const sqlArr = []
  return dbConfig.SySqlConnect(sql, sqlArr)
}
getRiderOrderById=(riderId)=>{
  const sql = 'select * from order_master where runner_id=?'
  const sqlArr = [riderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//修改订单状态
updateOrderStatus = (orderId, status) => {
  const sql = 'update order_master set order_status=? where order_id=?'
  const sqlArr = [status, orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//修改订单信息（配送信息）
updateOrder = (data) => {
  const {riderId,riderName,riderPhone,orderId} = data
  const sql = 'update order_master set runner_id=?,runner_name=?,runner_phone=? where order_id=?'
  const sqlArr = [riderId,riderName,riderPhone,orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
module.exports = {
  getRiderOrder,
  updateOrderStatus,
  updateOrder,
  getRiderOrderById
}