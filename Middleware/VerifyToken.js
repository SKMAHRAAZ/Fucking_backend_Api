const jwt = require("jsonwebtoken")
const Vendor = require("../Models/Vendor")
const dotenv = require("dotenv")

dotenv.config()
const secret = process.env.secret

const VerifyToken = async(req,res,next)=>{
    const token = req.headers.token
    if(!token){
        res.status(404).send({message:"token is required"})
    }


    try {

        const decoded = jwt.verify(token,secret)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            res.status(404).send({message:"vendor not found"})
        }

        req.vendorId = vendor._id
        next()
        
    } catch (error) {
        console.log(error)
    res.status(500).send({error:"Internal error occured"})
        
    }
}

module.exports = VerifyToken