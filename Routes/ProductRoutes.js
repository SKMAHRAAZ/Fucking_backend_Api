const ProductController = require('../Contollers/ProductContoller')
const express = require('express')
const router = express.Router()



router.post('/add-product/:id', ProductController.AddProduct)
router.get('/:id/all-products',ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.delete('/deleteProduct/:id',ProductController.deleteProductById)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName
    res.header('Content-Type','application/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

module.exports = router