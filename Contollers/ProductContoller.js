const Firm = require("../Models/Firm");
const Product = require('../Models/Product')
const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+path.extname(file.originalname))
    }
})


const upload = multer({storage:storage})



const AddProduct = async(req,res)=>{

   try {
    const{productname, price, category, bestSeller, description} = req.body
    const image = req.file?req.file.filename : undefined
    const firmId = req.params.id

    const firm = await Firm.findById(firmId)
    if(!firm){
        res.status(404).send({error:"firm not found"})
    }

    const product = await Product({
        productname, price, category, bestSeller, description, image, firm:firm._id
    })

    const savedProduct = await product.save()
    firm.product.push(savedProduct)
    await firm.save()
    return res.status(200).send({message:"product added succesfully"})
    
   } catch (error) {
    console.log(error)
    res.status(500).send({error:"Internal error occured"})
    
   }
}

const getAllProducts = async(req,res)=>{
    try {
        const firmId = req.params.id
    const firm = await Firm.findById(firmId)
    if(!firm){
        res.status(404).send({error:"firm not found"})
    }
    const products = await Product.find({firm:firm})
    if(!products){
        res.status(404).send({error:"products not found"})
    }
    res.status(200).send({products})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}


const getProductById = async(req,res)=>{
   try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(!product){
        res.status(404).send({error:"product not found"})
    }
    res.status(200).send({product})
    
   } catch (error) {
    console.log(error)
    res.status(500).send({error:"Internal error occured"})

    
   }
}

const deleteProductById = async(req,res)=>{
   try {
    const productId = req.params.id
    const deleteProduct = await Product.findByIdAndDelete(productId)
    if(!deleteProduct){
        res.status(400).send({error:"error occured"})
    }
    res.status(201).send({message:"product deleted successfully"})
    
   } catch (error) {
    console.log(error)
    res.status(500).send({error:"Internal error occured"})
    
   }
}

module.exports = {AddProduct, getAllProducts, getProductById, deleteProductById}