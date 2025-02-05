const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')

const vendorRoutes = require('./Routes/VendorRoutes')
const firmRoutes = require('./Routes/FirmRoutes')
const productRoutes = require('./Routes/ProductRoutes')


dotenv.config()

const Port = 8000;

const app = express()


app.use(express.json())
app.use(cors())


//database connection

mongoose.connect(process.env.Mongo_Uri)
.then(()=>{
    console.log("MongoDb connected successfully")
}).catch((err)=>{
    console.log(err)
})


//routes
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))


app.use('/',(req,res)=>{
    res.send("<h1>it's a Fucking code")
})
app.listen(Port, ()=>{
    console.log(`Server up and running at ${Port}`)
})