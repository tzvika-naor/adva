const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get("", orderController.getOrders);
router.get("/user/:userId",orderController.getOrderByUserId); 
router.get("/ordersCount", orderController.getOrdersCount);
router.post("", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);            
router.post("/searchOrders", orderController.searchOrders);

module.exports = router;