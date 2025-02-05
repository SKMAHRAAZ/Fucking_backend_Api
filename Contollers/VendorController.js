
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Vendor = require("../Models/Vendor")

dotenv.config()


const secret = process.env.secret


const vendorRegister = async(req,res)=>{
   try {
    const{username, email, password} = req.body
    const vendorEmail = await Vendor.findOne({email})
    if(vendorEmail){
        res.status(400).send({message:"email already exists"})
    }

    const hashedpassword = await bcrypt.hash(password,12)

    const vendor = new Vendor({username,email,password:hashedpassword})
    await vendor.save()
    res.status(200).send({message:"vendor registered sucessfully"})
    
   } catch (error) {
    console.log(error)
    res.status(500).send({error:"Internal error occured"})
    
   }
}

const vendorLogin = async(req,res)=>{
    try {
        const{email, password} = req.body
    const vendor = await Vendor.findOne({email})
    if(!vendor||!(await bcrypt.compare(password,vendor.password))){
        res.status(404).send({error:"invalid login credentials"})
    }
    const token = jwt.sign({vendorId:vendor._id},secret, {expiresIn:"1hr"})

    res.status(200).send({message:"login success", token})
    } catch (error) {
        console.log(error)
    res.status(500).send({error:"Internal error occured"})
        
    }
}


const getAllvendors = async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm')
    if(!vendors){
        res.status(404).send({error:"vendor not found"})
    }
    res.status(200).send({vendors})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}

const getvendorById = async(req,res)=>{
    try {

        const vendorId = req.params.id

        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            res.status(404).send({error:"No vendor found"})
        }
        res.status(200).send({vendor})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}

module.exports = {vendorRegister, vendorLogin, getAllvendors, getvendorById}