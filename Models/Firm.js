const mongoose = require('mongoose')


const firmSchema = new mongoose.Schema({
    firmname:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg', 'non-veg']
        }]
    },  
    region:{
        type:[{
            type:String,
            enum:['north-indian', 'south-indian','chinese','bakery' ]
        }]
    },image:{
        type:String
    },
    offer:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendor'
    }],
      product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})


const Firm = mongoose.model('firm', firmSchema)

module.exports = Firm