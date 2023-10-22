const mongoose = require('mongoose');

const url = "mongodb+srv://ImperatorRaj:SSHv0kuTSrbpcv1M@prahmodhrcluster.c5egdo3.mongodb.net/?retryWrites=true&w=majority"

module.exports.connect= ()=>{
    mongoose.connect(url).then((res)=>{
        console.log("Mongodb connected successfully")
    }).catch((err)=>console.log("Error connecting to Mongo",err))
}