const mongoose=require("mongoose")
async function connecttodb(){
   await mongoose.connect("mongodb://localhost:27017/secondProject")
   console.log("connect to mongoose");
   
}
connecttodb();

module.exports= mongoose.connection;
