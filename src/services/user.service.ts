import { nanoid } from "nanoid";
import bcrypt from "bcryptjs"
// import { User} from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { HttpError } from "../utils/httpError.util";


const getAllUsers= async() =>{
    
}

const getUser= async() =>{

}

const getUserByEmail = async(email: string) =>{
    const user = UserModel.findOneByEmail(email)
    return user

}

const createUserWithEmailAndPassword = async(email:string, password: string) => {
    const user = await UserModel.findOneByEmail(email);

    if(user){
        throw new HttpError("Email already exists", 400)
    }

    // hasheamos el pasword:
    // const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create(email, passwordHashed)
    return newUser
   
}

export const userService = {
    getAllUsers,
    getUser,
    createUserWithEmailAndPassword,
    getUserByEmail,
}