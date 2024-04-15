import 'dotenv/config'
import mongoose from "mongoose";
mongoose.set('strictQuery',false);
async function connectionToDB(){
   

    try {
        const { connection }=await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        if(connection){
            console.log(`conected to connect to ${connection.host}`);
        }
       
    } catch (error) {
        console.log(error.message,'mongodb connection failed');
        process.exit(1)
        
    }

}
export default connectionToDB;