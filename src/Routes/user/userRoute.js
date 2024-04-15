import { Router } from "express";
import {login,logout,update,register} from '../../controller/userController/userController.js'
import auth from "../../middleware/auth.js";
const route=Router()
route.post('/register',register)
route.post('/login',login).get('/logout',logout).put('/update',auth,update)
export default route