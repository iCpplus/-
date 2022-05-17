const dbConfig = require('../../utils/dbconfig')
const addressDao = require('../../dao/student/addressDao')
//获取收货地址
getAddress = (req, res) => {
  const { userId } = req.body
  addressDao
    .getAddressList(userId)
    .then((listRes) => {
      res.send({
        code: 200,
        list: listRes
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
//删除收货地址
deleteAddress = (req, res) => {
  addressDao
    .deleteAddress(req.body)
    .then((delRes) => {
      res.send({
        code: 200,
        msg: '删除成功'
      })
    })
    .catch((delErr) => {
      console.log(delErr)
      res.send({
        code: 999,
        msg: '删除失败'
      })
    })
}
//增加收货地址
addAddress = (req, res) => {
  const { userId, defaultAddress } = req.body

  if (defaultAddress == 1) {
    //判断是否设置为了默认地址，如果设置了先把该用户默认地址设为非默认地址
    addressDao.cancelDefaultAddress(userId).then((cancelRes) => {
      addressDao
        .addAddress(req.body)
        .then((addRes) => {
          res.send({
            code: 200,
            msg: '添加成功'
          })
        })
        .catch((addErr) => {
          console.log(addErr)
          res.send({
            code: 999,
            msg: '添加失败'
          })
        })
    })
  } else {
    addressDao
      .addAddress(req.body)
      .then((addRes) => {
        res.send({
          code: 200,
          msg: '添加成功'
        })
      })
      .catch((addErr) => {
        console.log(addErr)
        res.send({
          code: 999,
          msg: '添加失败'
        })
      })
  }
}

//修改收货地址
updateAddress = (req, res) => {
  const { userId, defaultAddress } = req.body
  if (defaultAddress == 1) {
    //判断是否设置为了默认地址，如果设置了先把该用户默认地址设为非默认地址
    addressDao
      .cancelDefaultAddress(userId)
      .then((cancelRes) => {
        addressDao
          .updateAddress(req.body)
          .then((updateRes) => {
            res.send({
              code: 200,
              msg: '修改成功'
            })
          })
          .catch((updateErr) => {
            console.log(updateErr)
            res.send({
              code: 999,
              msg: '修改失败'
            })
          })
      })
      .catch((cancelErr) => {
        console.log(cancelErr)
        res.send({
          code: 999,
          msg: '修改失败'
        })
      })
  } else {
    addressDao
      .updateAddress(req.body)
      .then((updateRes) => {
        res.send({
          code: 200,
          msg: '修改成功'
        })
      })
      .catch((updateErr) => {
        console.log(updateErr)
        res.send({
          code: 999,
          msg: '修改失败'
        })
      })
  }
}

//写好的方法暴露出去
module.exports = {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress
}
