const dbConfig = require('../../utils/dbconfig')

//增加订单
addOrder = (data) => {
  const sql =
    'insert into order_master (buyer_id,store_id,buyer_name,buyer_phone,buyer_address,buyer_remark,post_price,store_user_id,pay_status,order_amount,store_name) values(?,?,?,?,?,?,?,?,?,?,?)'
  const {
    buyerId,
    storeId,
    buyerName,
    buyerPhone,
    buyerAddress,
    buyerRemark,
    postPrice,
    storeUserId,
    payStatus,
    allPrice,
    storeName
  } = data
  const sqlArr = [
    buyerId,
    storeId,
    buyerName,
    buyerPhone,
    buyerAddress,
    buyerRemark,
    postPrice,
    storeUserId,
    payStatus,
    allPrice,
    storeName
  ]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//增加订单详细信息
addOrderDetail = (data) => {
  const sql =
    'insert into order_detail (order_id,store_id,food_id,food_name,food_price,food_quantity,food_icon) values(?,?,?,?,?,?,?)'
  const {
    orderId,storeId,food_id,food_name,food_price,foodQuantity,food_icon
  } = data
  const sqlArr = [
    orderId,storeId,food_id,food_name,food_price,foodQuantity,food_icon
  ]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

//用户查询所有订单
getUserOrderList =(userId)=>{
  const sql = 'select * from order_master where buyer_id =?'
  const sqlArr = [userId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询订单信息
getOrderMaster=(orderId)=>{
  const sql = 'select * from order_master where order_id =?'
  const sqlArr = [orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询订单详细信息
getOrderDetail=(orderId)=>{
  const sql = 'select * from order_detail where order_id =?'
  const sqlArr = [orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//修改订单状态
updateOrderStatus=(orderId,status)=>{
  const sql =
    'update order_master set order_status=? where order_id=?'
  const sqlArr = [status,orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

module.exports = {
  getOrderMaster,
  addOrder,
  addOrderDetail,
  getUserOrderList,
  getOrderDetail,
  updateOrderStatus
}