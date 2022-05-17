var shopOrderDao = require('../../dao/shop/orderDao')
const studentOrderDao = require('../../dao/student/orderDao')

getAllOrder = (req, res) => {
  const { storeId } = req.body
  shopOrderDao.getShopOrderList(storeId).then((orderRes) => {
    let arr = []

    orderRes.forEach((item) => {
      let promise = new Promise((resolve) => {
        studentOrderDao.getOrderDetail(item.order_id).then((detailRes) => {
          item.foods = detailRes
          resolve()
        })
      })
      arr.push(promise)
    })

    Promise.all(arr)
      .then((allRes) => {
        res.send({
          code: 200,
          list: orderRes
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          code: 999,
          msg: '失败'
        })
      })
  })
}

updateOrderStatus = (req, res) => {
    const { orderId, status } = req.body
    shopOrderDao
      .updateOrderStatus(orderId, status)
      .then((updateRes) => {
        res.send({
          code: 200,
          msg: '更新成功'
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          code: 200,
          msg: '失败'
        })
      })
  }

module.exports = {
  getAllOrder,
  updateOrderStatus
}
