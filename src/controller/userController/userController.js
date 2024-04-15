import User from "../../model/userModel/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { config }from 'dotenv'
config()
async function register(req,res){
try {
    console.log('register route');
    const { name , email ,number,password}=req.body;

    if(!name||!email||!number||!password){
        return res.status(400).json({
            success:false,
            message:'user register have failed',
            data:'All fields are required for register'
        })
    }
    const user=await User.findOne({email:email});
    if(user){
        return res.status(400).json({
            success:false,
            message:'user register have failed',
            data:'User Already exist please use other email'
        })
    }
    const passwordhash=await bcrypt.hash(password, 10)

    const data=User.create({name,email,password:passwordhash,number});
    (await data).save
    const userdata=await User.findOne({email:email});
    return res.status(200).json({
        success:true,
        message:'user register success',
        data:{
            name:name,
            email:email,
            number:number
        }
    })

} catch (error) { 
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'user register have failed',
        data:error.message
    })
    
}
}
async function login(req,res){
try {
    console.log('login route');
    const {email ,password}=req.body;
    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:'user login have failed',
            data:'All felids required'
        })
    }
    const user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:'user login have failed',
            data:'user not found'
        })

    }
    console.log(user);
    const passwordCheck=await bcrypt.compare(password,user.password)
    if(!passwordCheck){
        return res.status(400).json({
            success:false,
            message:'user login have failed',
            data:'invalid credentials'
        })
    }
    console.log( process.env.JWT_TOKEN);
    let token =jwt.sign({
        data:{
            email:user.email,
            id:user._id
        }
      }, process.env.JWT_TOKEN, { expiresIn:'1d' });
      res.cool
      const options = { httpOnly: true, secure: true };
    return res.status(200)
    .cookie("token", token, options).json({
        success:true,
        message:'user login have success',
        data:{
            name:user.name,
            token,
        }
    })

} catch (error) {
    console.log(error);
    const options = { httpOnly: true, secure: true };
    return res
    .status(201)
    .clearCookie("token", options).json({
        success:false,
        message:'user login have failed',
        data:error.message
    })
    
}
}
function logout(req,res){
try {
    console.log('logout route');
    const options = { httpOnly: true, secure: true };
    return res
      .status(201)
      .clearCookie("token", options)
      .json({
        success:true,
        message:'user log out'
      })
    
} catch (error) {
    console.log(error);

    return res.status(500).json({
        success:false,
        message:'user logout have failed',
        data:error.message
    })
    
}
}
async function update(req,res){
try {
    console.log('update route');
    const { name  }=req.body;

    if(!name){
        return res.status(400).json({
            success:false,
            message:'user update have failed',
            data:'All fields are required for update'
        })
    }
    const user = await User.findByIdAndUpdate(
        req.id,
        {
          $set: {
           name
          },
        },
        { new: true }
      ).select("-password");
      if (!user) {
        throw new ApiError(400, "user not found");
      }
      await user.save();
      return res.status(200).json({
        success:true,
        message:'user update',
        data:user
    }) 
} catch (error) {
    console.log(error);

    return res.status(500).json({
        success:false,
        message:'user update have failed',
        data:error.message
    }) 
    
}
}
export{login,logout,update,register} 