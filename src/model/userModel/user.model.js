import mongoose from 'mongoose'
import{Schema,model} from 'mongoose'
const userSchema=new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        number:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
     
    },
    {
        timestamps:{
            createdAt:"created at",
        }
    })
const User=model('jobPostingAppUsers',userSchema)
export default User;