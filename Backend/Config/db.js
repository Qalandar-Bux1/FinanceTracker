const { default: mongoose } = require("mongoose")

const dbconnect=async()=>{
    try{
        mongoose.connect(process.env.Dburl)
        console.log("Db connected")
    }
    catch{
        console.log("Db not connected")
    }
}
module.exports=dbconnect