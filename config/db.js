const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
       await mongoose.connect("mongodb+srv://rekhanjain97_db_user:juRMdq2EUogKhdOf@cluster0.g6eb5la.mongodb.net/?appName=Cluster0")
         console.log("db connected")

    }catch(err){
        console.log(err)
    }
}

module.exports = connectDb;
