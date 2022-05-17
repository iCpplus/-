var express = require('express')
var router = express.Router()

var shop = require('../../controllers/shop/shopController')
var food = require('../../controllers/shop/foodController')
var foodCate = require('../../controllers/shop/foodCateController')
var order = require('../../controllers/shop/orderController')

//商店
router.post('/allList', shop.getShopList)
router.post('/detail', shop.getShopDetail)
router.post('/update', shop.updateShopInfo)

//食品
router.post('/food/list', food.getFoodList)
router.post('/food', food.getFoodById)
router.post('/food/update', food.updateFood)
router.post('/food/delete', food.deleteFood)
router.post('/food/add', food.addFood)

router.post('/foodCate/add', foodCate.addFoodCate)
router.post('/foodCate/delete', foodCate.deleteFoodCate)
router.post('/foodCate/list', foodCate.getFoodCateList)

router.post('/order/list',order.getAllOrder)
router.post('/orderStatus/update',order.updateOrderStatus)
module.exports = router
