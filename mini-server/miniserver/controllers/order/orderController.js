const dbConfig = require('../../utils/dbconfig')
const userDao = require('../../dao/userDao')
//用户获取订单
getOrder = (req, res) => {
  const sql = 'select * from order_master where buyer_id =?'
  const sqlArr = [req.body.userId]
  const orderDetailSql = 'select * from order_detail where order_id =?'
  const callBack = (err, data) => {
    if (err) {
      console.log(err)
      res.send({
        code: 999,
        msg: '获取订单失败'
      })
    } else {
      data.forEach((item) => {
        const orderDetailSqlArr = [item.order_id]
        dbConfig.sqlConnect(orderDetailSql, orderDetailSqlArr, (err, foods) => {
          if (err) {
            console.log(err)
          } else {
            item.foods = foods
          }
        })
      })
      res.send({
        list: data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//用户创建订单
createOrder = (req, res) => {
  const {
    userId,
    storeId,
    userName,
    userPhone,
    userAddress,
    userRemark,
    orderAmount
  } = req.body
  const foods = req.body.foods
  const masterSql =
    'insert into review (buyer_id,store_id,buyer_name,buyer_phone,buyer_address,buyer_remark,order_amount) values(?,?,?,?,?,?,?)'
  const masterSqlArr = [
    userId,
    storeId,
    userName,
    userPhone,
    userAddress,
    userRemark,
    orderAmount
  ]
  dbConfig.sqlConnect(masterSql, masterSqlArr, (err, data) => {
    if (err) {
      console.log(err)
      res.send({
        code: 999,
        msg: '创建订单失败'
      })
    } else {
      const orderId = data.insertId
      const detailSql =
        'insert into review (order_id,store_id,food_id,food_name,food_price,food_quantity,food_icon) values(?,?,?,?,?,?,?)'
      const detailSqlArr = []
      foods.forEach((item) => {
        detailSqlArr = [
          orderId,
          storeId,
          item.food_id,
          item.food_name,
          item.food_price,
          item.food_quantity,
          item.food_icon
        ]
        dbConfig.sqlConnect(detailSql, detailSqlArr, (err, data) => {
          if (err) {
            console.log(err)
          }
        })
      })
      res.send({
        order_id: orderId,
        code: 200,
        msg: '创建订单成功'
      })
    }
  })
}
//用户支付订单
payOrder = (req, res) => {
  const sql = 'update order_master set pay_status=? where order_id=?'
  const { userId, payStatus, orderId, allPrice } = req.body
  const sqlArr = [payStatus, orderId]
  const updateMoney = userDao.getUserInfo(userId).money - allPrice
  if (updateMoney < 0) {
    res.send({
      code: 999,
      msg: '余额不足'
    })
  } else {
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
      if (err) {
        console.log(err)
        res.send({
          code: 999,
          msg: '支付失败'
        })
      } else {
        res.send({
          code: 200,
          msg: '支付成功'
        })
      }
    })
  }
}
//商家操作订单
updateOrderByShop=(req,res)=>{
  
}
//用户评价订单
evaluateOrderByUser = (req, res) => {
  const evaluateSql =
    'insert into review (order_id,user_id,store_id,start_num,content) values(?,?,?,?,?)'
  const { orderId, userId, storeId, starNum, content } = req.body
  const evaluateSqlArr = [orderId, userId, storeId, starNum, content]
  dbConfig.sqlConnect(evaluateSql, evaluateSqlArr, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      // 6 已评价
      updateOrderStatus(orderId, 6, null)
      res.send({
        code: 200,
        msg: '评价成功'
      })
    }
  })
}
//更新订单状态
updateOrderStatus = (orderId, orderStatus, payStatus) => {
  let sql = ''
  let sqlArr = []
  if (orderStatus != null && payStatus == null) {
    sql = 'update order_master set order_status=? where order_id=?'
    sqlArr = [orderStatus, orderId]
  } else if (orderStatus == null && payStatus != null) {
    sql = 'update order_master set pay_status=? where order_id=?'
    sqlArr = [payStatus, orderId]
  } else {
    sql = 'update order_master set order_status=?,pay_status=? where order_id=?'
    sqlArr = [orderStatus, payStatus, orderId]
  }
  dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('订单状态更新成功')
    }
  })
}

module.exports = {
  getOrder,
  evaluateOrderByUser,
  createOrder,
  payOrder
}
