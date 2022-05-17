var express = require('express')
var router = express.Router()

var address = require('../../controllers/student/addressController')
var student = require('../../controllers/student/studentController')
var order = require('../../controllers/student/orderController')
var evaluate = require('../../controllers/student/evaluateController')

router.post('/address/allList', address.getAddress)
router.post('/address/add', address.addAddress)
router.post('/address/update', address.updateAddress)
router.post('/address/delete', address.deleteAddress)

router.post('/shop/list', student.getShopList)
router.post('/shop/detail', student.getShopDetailByStoreId)

router.post('/comment/get',evaluate.getComment)
router.post('/comment/update',evaluate.updateComment)
router.post('/comment/add',evaluate.addComment)
router.post('/comment/list',evaluate.getCommentList)

router.post('/order/add',order.addOrder)
router.post('/order/list',order.getAllOrder)
router.post('/orderStatus/update',order.updateOrderStatus)

router.post('/announce/list',student.getAnnounceList)

module.exports = router
