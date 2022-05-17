const dbConfig = require('../../utils/dbconfig')
//增加
addComment = (data) => {
  const sql =
    'insert into review (user_id,store_id,start_num,content,order_id) values(?,?,?,?,?)'
  const { userId, storeId, starNum, content, orderId } = data
  const sqlArr = [userId, storeId, starNum, content, orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查找
getComment = (id) => {
  const sql = 'select * from review where order_id =?'
  const sqlArr = [id]
  return dbConfig.SySqlConnect(sql, sqlArr)
}

//查询列表
getCommentList=(storeId)=>{
  const sql = 'select * from review where store_id =?'
  const sqlArr = [storeId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//更新
updateComment = (data) => {
  const sql =
    'update review set store_content=?,rider_content=? where order_id=?'
  const { storeContent, riderContent, orderId } = data
  const sqlArr = [storeContent, riderContent, orderId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
module.exports = {
  addComment,
  getComment,
  updateComment,
  getCommentList
}
