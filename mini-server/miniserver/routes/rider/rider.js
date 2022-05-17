var express = require('express')
var router = express.Router()

var rider = require('../../controllers/rider/orderController')
router.post('/order/list', rider.getAllOrder)
router.post('/riderOrder/list', rider.getRiderOrder)
router.post('/orderStatus/update',rider.updateOrderStatus)
router.post('/order/fight',rider.fightOrder)


module.exports = router