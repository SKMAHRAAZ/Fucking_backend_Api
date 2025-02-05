const vendorController = require('../Contollers/VendorController')
const express = require('express')
const router = express.Router();


router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin)
router.get('/all-vendors', vendorController.getAllvendors)
router.get('/singleVendor/:id',vendorController.getvendorById)

module.exports = router