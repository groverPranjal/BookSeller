import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import path from 'path';
import 'dotenv/config'
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoute.js';
import bookRouter from './routes/bookRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app=express();
const port=4000;

const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename)
//Middlewares
app.use(cors({
   origin:(origin,callback) =>{
    const allowedOrgins=['http://localhost:5173','http://localhost:5174'];
    if(!origin || allowedOrgins.includes(origin)){
        callback(null,true)
    }
    else{
        callback(new Error('Not allowed by CORS'));
    }
   },
   credentials:true,
}));
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))



//database connection
connectDb();


//routes
app.use('/api/user',userRouter);
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/api/book',bookRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
})