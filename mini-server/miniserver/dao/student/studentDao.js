const dbConfig = require('../../utils/dbconfig')
//查询列表
getAnnounceList = () => {
  const sql = 'select * from announcement'
  const sqlArr = []
  return dbConfig.SySqlConnect(sql, sqlArr)
}
module.exports = {
  getAnnounceList
}
