import mongoose from "mongoose";

mongoose.set('strictQuery', false);
  
const connectionToDB= async ()=>{
    try {
        const {connection}= await mongoose.connect(process.env.Mongo_URI || "mongodb+srv://thakurshivang579:5757751@cluster0.aj8hrur.mongodb.net/Combonation")
        if(connection){
            console.log(`Connection to MongoDB: ${connection.host}`)
        }
    } catch (e) {
        console.log(e)
        process.exit(1);
    }
}

export default connectionToDB;