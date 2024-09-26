
const express=require("express");
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
const vendorRoutes= require('./routers/vendorRoutes')
const bodyparser = require('body-parser');
const firmRoutes = require('./routers/firmRoutes');
const productRoutes = require('./routers/productroutes');
const path = require('path');
const cors = require('cors');

const app=express();
const PORT = process.env.PORT || 4000;

dotEnv.config();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("successfully connnected mongodb"))
.catch((error)=>console.log(error))

app.use(bodyparser.json());
app.use('/vendor',vendorRoutes);//by using middlewareess
app.use('/firm',firmRoutes)
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});

app.use('/',(req,res)=>{
     res.send("<h1> welcome to FF-A MultiVendor Platform");
});

  