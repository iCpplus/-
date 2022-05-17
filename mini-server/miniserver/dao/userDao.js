const dbConfig = require('../utils/dbconfig')
//获取用户信息
getUserInfoByName = (username) => {
  const sql = 'select * from user where username=?'
  const sqlArr = [username]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//获取用户信息
getUserInfoById = (id) => {
  const sql = 'select * from user where user_id=?'
  const sqlArr = [id]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//查询所有用户
getUserList=()=> {
  console.log('查询所有用户');
  const sql = 'select * from user'
  const sqlArr = []
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//添加用户
addUser = (userInfo) => {
  const sql = 'insert into user (username,password,phone,salt,role) values(?,?,?,?,?)'
  const {username,password,phone,salt,role}=userInfo
  const sqlArr = [username,password,phone,salt,role]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
//update
updateUserInfo=(data)=>{
  const {nickname,iconUrl,userId} = data
  const sql = 'update user set nickname=?,iconUrl=? where user_id=?'
  const sqlArr = [nickname,iconUrl,userId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
updatePassword=(data)=>{
  const {password,userId} = data
  const sql = 'update user set password=? where user_id=?'
  const sqlArr = [password,userId]
  return dbConfig.SySqlConnect(sql, sqlArr)
}
updateUserMoney = (userId, money) => {
  const sql = 'update user set money=? where user_id=?'
  const sqlArr = [money, userId]
  dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('更新用户钱包成功')
    }
  })
}

module.exports = {
  getUserInfoByName,
  getUserList,
  addUser,
  updateUserMoney,
  getUserInfoById,
  updateUserInfo,
  updatePassword
}
