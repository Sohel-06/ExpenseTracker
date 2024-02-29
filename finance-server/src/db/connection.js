const mongoose=require('mongoose');
mongoose.set('strictQuery',false)
const connection=async()=>{
    try{
        const res= await mongoose.connect("mongodb+srv://urstruleysohel:fq1uvIzEZFfayKQr@cluster0.k2kvo0r.mongodb.net/Finance?retryWrites=true&w=majority");
        console.log("Connection is Successfull")
    }
    catch(e){
        console.log(e)
    }
}

module.exports=connection;