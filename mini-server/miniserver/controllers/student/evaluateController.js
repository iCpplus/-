const evaluateDao = require('../../dao/student/evaluateDao')

//获取
getComment = (req, res) => {
  const { orderId } = req.body
  evaluateDao
    .getComment(orderId)
    .then((listRes) => {
      res.send({
        code: 200,
        data: listRes[0]
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '查询失败'
      })
    })
}
getCommentList = (req, res) => {
  evaluateDao.getCommentList(req.body.storeId).then((listRes) => {
    res.send({
      code: 200,
      list: listRes
    })
  })
}
//add
addComment = (req, res) => {
  evaluateDao
    .addComment(req.body)
    .then((addRes) => {
      res.send({
        code: 200,
        msg: '添加成功'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '失败'
      })
    })
}

updateComment = (req, res) => {
  evaluateDao
    .updateComment(req.body)
    .then((updateRes) => {
      res.send({
        code: 200,
        msg: '成功'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '失败'
      })
    })
}

module.exports = {
  getComment,
  addComment,
  updateComment,
  getCommentList
}
