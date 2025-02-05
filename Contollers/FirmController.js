const Vendor = require('../Models/Vendor')
const Firm = require('../Models/Firm')

const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+path.extname(file.originalname))
    }
})


const upload = multer({storage:storage})


const AddFirm = async(req,res)=>{

    try {
        const{firmname, area, category, region, offer} = req.body

    const image = req.file? req.file.filename : undefined

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(404).send({error:"vendor not found"})
    }

    const firm = await Firm({
        firmname, area, category, region, offer, image, vendor:vendor._id

    })

    const savedFirm = await firm.save()
    vendor.firm.push(savedFirm)
    await vendor.save()

    return res.status(200).send({message:"firm added sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}


const DeleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.id;
    const deletedFirm = await Firm.findByIdAndDelete(firmId)
    if(!deletedFirm){
        res.status(400).send({error:"no firm deleted"})
    }
    res.status(201).send({message:"firm deleted successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}

module.exports = {AddFirm:[upload.single('image'),AddFirm], DeleteFirmById }