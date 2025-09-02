import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { confirmPayment, createOrder, deleteOrder, getOrderById, getOrders, getUSerOrders, updateOrder } from '../controllers/orderController.js';

const orderRouter=express.Router();

//protected routes
orderRouter.post('/',authMiddleware,createOrder)
orderRouter.get('/confirm',authMiddleware,confirmPayment)

//public royes
orderRouter.get('/',getOrders)
orderRouter.get('/user',authMiddleware,getUSerOrders)
orderRouter.get('/:id',getOrderById)
orderRouter.put('/:id',updateOrder);

orderRouter.delete('/:id',deleteOrder);

export default orderRouter;