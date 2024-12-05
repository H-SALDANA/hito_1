import { UserModel } from "../models/user.model";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs"
import { User} from "../interfaces/user.interface";


const getAllUsers= async() =>{
    const users = await UserModel.readUsers()
    return users;
}

const getUser= async() =>{

}


const createUserWithEmailAndPassword = async(email:string, password: string) => {
    const users = await getAllUsers();
    const user = users.find(item =>item.email === email)
    if(user){
        throw new Error("Email already exists")

    }

    // hasheamos el pasword:
    // const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, 10)
    const newUser: User = {
        id: nanoid(),
        email,
        password:passwordHashed,


    };
    users.push(newUser)
    await UserModel.writeUsers(users)
    return newUser;
    // console.log(newUser)
}

export const userService = {
    getAllUsers,
    getUser,
    createUserWithEmailAndPassword,
}