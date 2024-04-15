import { config }from 'dotenv'
config()
import jwt from 'jsonwebtoken'
async function auth(req,res,next){
    const token=req.cookies.token;
    console.log(token);
    try {
        if(!token){
            return res.status(400).json({
                succes:false,
                message:"Authentication failed auth",
                data:'token not'
            })
        }
        let data= await jwt.verify(token,process.env.JWT_TOKEN)
        req.id=data.data.id;

        next()
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message:"Authentication failed auth",
            data:{}
        })
    }

}
export default auth;