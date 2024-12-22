import { userService } from "./user.service";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken" 
import {generateAccessToken} from "../utils/auth.util"
import { HttpError } from "../utils/httpError.util";



const loginWithEmailAndPassword = async (email: string, password: string) => {
    const user = await userService.getUserByEmail(email)
    // verificamos que existe el usuario:
    if (!user) {
        throw new HttpError("User not found", 400)
    }    
    // comparar los hash de contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
        throw new HttpError("Password incorrect", 400)
    }

    // generar el token
    const token = generateAccessToken(user.email, user.id)

    return token;
};

const registerWithEmailAndPassword = async(email: string, password: string) =>{
    // 1. verificar si el email existe
    const newUser = await userService.createUserWithEmailAndPassword(email, password);
    const token = generateAccessToken(newUser.email, newUser.id)
    return token;
}
export const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
}