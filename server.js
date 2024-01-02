import app from "./app.js";
import { config } from "dotenv";
import connectionToDB from "./config/dbConnection.js";
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async()=>{
    connectionToDB();
    console.log(`Port is running at localhost://5014`);
})