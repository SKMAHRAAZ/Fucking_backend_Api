const firmController = require('../Contollers/FirmController')
const VerifyToken = require('../Middleware/VerifyToken')
const express = require('express')
const path = require('path')

const router = express.Router()


router.post('/add-firm',VerifyToken, firmController.AddFirm)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName
    res.header('Content-Type','application/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete('/deleteFirm/:id', firmController.DeleteFirmById)

module.exports = router