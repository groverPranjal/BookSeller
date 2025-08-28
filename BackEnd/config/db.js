import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://groverpranjal34:pranjal1097@cluster0.jrqte7s.mongodb.net/BookSeller')
    .then(()=>console.log("DB connected"))
}