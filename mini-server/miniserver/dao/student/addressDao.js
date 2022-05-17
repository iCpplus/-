const dbConfig = require('../../utils/dbconfig')
//将用户默认收货地址重置为非默认
cancelDefaultAddress = (userId) => {
  const sql =
    'update user_address set default_address=0 where user_id=? and default_address=1'
  const sqlArr = [userId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

//增加地址
addAddress = (data) => {
  const sql =
    'insert into user_address (user_id,name,phone,address,default_address) values(?,?,?,?,?)'
  const { userId, name, phone, address, defaultAddress } = data
  const sqlArr = [userId, name, phone, address, defaultAddress]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询地址列表
getAddressList = (userId) => {
  const sql = 'select * from user_address where user_id =?'
  const sqlArr = [userId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//修改地址
updateAddress = (data) => {
  const sql =
    'update user_address set name=?,phone=?,address=?,default_address=? where user_id=? and address_id=?'
  const { userId, addressId, name, phone, address, defaultAddress } = data
  const sqlArr = [name, phone, address, defaultAddress, userId, addressId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//删除地址
deleteAddress=(data)=>{
  const sql = 'delete from user_address where user_id=? and address_id=?'
  const { userId, addressId } = data
  const sqlArr = [userId, addressId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
module.exports = {
  cancelDefaultAddress,
  addAddress,
  getAddressList,
  updateAddress,
  deleteAddress
}
