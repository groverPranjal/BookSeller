import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {addToCart, clearUserCart, getCart, removeCartItem, updateCartItem} from '../controllers/cartController.js'



const cartRouter=express.Router();
cartRouter.post('add/',authMiddleware,addToCart)
cartRouter.get('/',authMiddleware,getCart);
cartRouter.put('/update',authMiddleware,updateCartItem)
cartRouter.delete('/remove/:bookId',authMiddleware,removeCartItem);
cartRouter.delete('/clear',authMiddleware,clearUserCart)

export default cartRouter
