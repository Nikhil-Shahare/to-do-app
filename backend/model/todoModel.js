const mongoose = require("mongoose")
const {Schema}= mongoose

const ToDO = new Schema({
   todo:{

       type:String,
       require:true
    }
})

module.exports = mongoose.model("todo",ToDO)