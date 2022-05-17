const orderDao = require('../../dao/student/orderDao')
const userDao = require('../../dao/userDao')
const shopDao = require('../../dao/shop/shopDao')

addOrder = (req, res) => {
  const { buyerId } = req.body
  userDao.getUserInfoById(buyerId).then((getRes) => {
    let updateMoney = getRes[0].money - req.body.allPrice - req.body.postPrice
    userDao.updateUserMoney(buyerId, updateMoney)
  })
  // shopDao.updateShopOrder(req.body.storeId)

  orderDao
    .addOrder(req.body)
    .then((addRes) => {
      let order_id = addRes.insertId
      req.body.foods.forEach((item) => {
        item.orderId = order_id
        item.storeId = req.body.storeId
        item.foodQuantity = item.num
        orderDao.addOrderDetail(item).then((addDetail) => {})
      })
      res.send({
        code: 200,
        msg: '添加成功'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        code: 999,
        msg: '添加订单失败'
      })
    })
}

getAllOrder = (req, res) => {
  const { userId } = req.body
  orderDao.getUserOrderList(userId).then((orderRes) => {
    let arr = []

    orderRes.forEach((item) => {
      let promise = new Promise((resolve) => {
        orderDao.getOrderDetail(item.order_id).then((detailRes) => {
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
  const { orderId, status, userId, riderId, storeUserId,storeId } = req.body
  if (status == 4) {
    orderDao.getOrderMaster(orderId).then((masterRes) => {
      userDao.getUserInfoById(userId).then((getRes) => {
        let updateMoney =
          getRes[0].money + masterRes[0].post_price + masterRes[0].order_amount
        userDao.updateUserMoney(userId, updateMoney)
      })
    })
  } else if (status == 3) {
    shopDao.updateShopOrder(storeId)
    orderDao.getOrderMaster(orderId).then((masterRes) => {
      userDao.getUserInfoById(riderId).then((getRes) => {
        let updateMoney = getRes[0].money + masterRes[0].post_price
        userDao.updateUserMoney(riderId, updateMoney)
      })
    })
    orderDao.getOrderMaster(orderId).then((masterRes) => {
      userDao.getUserInfoById(storeUserId).then((getRes) => {
        let updateMoney = getRes[0].money + masterRes[0].order_amount
        userDao.updateUserMoney(storeUserId, updateMoney)
      })
    })
  }
  orderDao
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
  addOrder,
  getAllOrder,
  updateOrderStatus
}
