const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://dubeyankita017:ankita@cluster0.lhaikm1.mongodb.net/AnyGram',{useUnifiedTopology:true,useNewUrlParser:true});

const connection=mongoose.connection

connection.on('connected' , ()=>{
    console.log('Mongo db connection successfull')
})

connection.on('error',()=>{
    console.log('Mongo db connection error')
})

module.exports = mongoose