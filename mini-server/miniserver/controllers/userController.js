const dbConfig = require('../utils/dbconfig')
const userDao = require('../dao/userDao')

test = (req, res) => {
  res.send({
    code: 200,
    msg: '欢迎使用寇寇的express服务'
  })
}

register = (req, res) => {
  userDao
    .getUserList()
    .then((daoRes) => {
      const userList = daoRes
      const { username, phone } = req.body
      let flag = true
      userList.forEach((item) => {
        if (item.username == username) {
          flag = false
          res.send({
            code: 999,
            msg: '用户名重复'
          })
        } else if (item.phone == phone) {
          flag = false
          res.send({
            code: 999,
            msg: '手机号重复'
          })
        }
      })
      if (flag) {
        userDao
          .addUser(req.body)
          .then((addUserRes) => {
            res.send({
              code: 200,
              msg: '注册成功'
            })
          })
          .catch((addUserErr) => {
            console.log(addUserErr)
            res.send({
              code: 999,
              msg: '注册失败'
            })
          })
      }
    })
    .catch((getUserListErr) => {
      console.log(getUserListErr)
    })
}
//登录
login = (req, res) => {
  const { username, password, role } = req.body
  userDao
    .getUserList()
    .then((userListRes) => {
      const userList = userListRes

      let loginUser = null
      userList.forEach((item) => {
        if (
          username == item.username &&
          password == item.password &&
          item.role.includes(role)
        ) {
          loginUser = item
          return
        }
      })
      if (loginUser) {
        res.send({
          code: 200,
          data: loginUser
        })
      } else {
        res.send({
          code: 999,
          msg: '请检查用户名或密码是否错误'
        })
      }
    })
    .catch((getUserListErr) => {
      console.log(getUserListErr)
    })
}
//获取用户盐
getUserSalt = (req, res) => {
  const { username } = req.body
  userDao
    .getUserInfoByName(username)
    .then((saltRes) => {
      console.log(saltRes[0])
      res.send({
        code: 200,
        salt: saltRes[0].salt
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '无此用户'
      })
    })
}
// updateUserMoney=(req,res)=>{
//   const {userId} = req.body
//   userDao.updateUserMoney(userId).then(updateRes=>{
//     res.send({
//       code:200,
//       msg:'更新成功'
//     })
//   }).catch(err=>{
//     res.send({
//       code:999,
//       msg:'更新失败'
//     })
//   })
// }
updateUserInfo=(req,res)=>{
  userDao.updateUserInfo(req.body).then(updateRes=>{
    res.send({
      code:200,
      msg:'成功'
    })
  })
}
getUserInfoById = (req, res) => {
  const { userId } = req.body
  console.log(userId);
  userDao
    .getUserInfoById(userId)
    .then((infoRes) => {
      res.send({
        code: 200,
        data: infoRes[0]
      })
    })
    .catch((err) => {
      console.log(err);
      res.send({
        code: 999,
        msg: '失败'
      })
    })
}
updatePassword= (req,res)=>{
  userDao.updatePassword(req.body).then(s=>{
    res.send({
      code:200,
      msg:'修改密码成功'
    })
  })
}
//写好的方法暴露出去
module.exports = {
  test,
  register,
  login,
  getUserSalt,
  getUserInfoById,
  updateUserInfo,
  updatePassword
}
