import { userService } from "./user.service";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginWithEmailAndPassword = async (email: string, password: string) => {
    const users = await userService.getAllUsers();
    const user = users.find((item) => item.email === email)
    // verificamos que existe el usuario:
    if (!user) {
        throw new Error("User not found")
    }    
    // comparar los hash de contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
        throw new Error("Password incorrect")
    }

    // generar el token
    const token = jwt.sign({ email: user.email }, "secret", {
        expiresIn: "1h",
    });

    return token;
};


export const authService = {
    loginWithEmailAndPassword,
}