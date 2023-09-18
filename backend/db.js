const mongoose = require("mongoose")
const {MONGO_URI}=process.env

const connectDatabase = async()=>{
    
    await mongoose.connect(MONGO_URI)
    .then(()=>console.log("connected tp database successfully"))
    .catch((err)=>console.log(err))


}


module.exports = connectDatabase;