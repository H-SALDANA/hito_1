import { nanoid } from "nanoid";
import bcrypt from "bcryptjs"
// import { User} from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { HttpError } from "../utils/httpError.util";


const getAllUsers= async() =>{
   return  await User.findAll();
}

const getUser= async() =>{

}

const getUserByEmail = async(email: string) =>{
    const user = await User.findOne({where:{email}})
    return user

}

const createUserWithEmailAndPassword = async(email:string, password: string) => {
    const user = await User.findOne({where:{email}});

    if(user){
        throw new HttpError("Email already exists", 400)
    }

    // hasheamos el pasword:
    // const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, 10)
    const newUser = await User.create({email, password: passwordHashed})
    return newUser
   
}


// export const findUserById = async (uid: string) => { 
//   // return await User.findByPk(uid); 
  
// };

// export const findUserById = async (uid: string) => {
//   console.log(`Buscando usuario con UID: ${uid}`); // Añadir log
//   const user = await User.findByPk(uid);
//   if (user) {
//     console.log(`Usuario encontrado: ${user.uid}`); // Añadir log
//   } else {
//     console.log(`Usuario con UID: ${uid} no encontrado`); // Añadir log
//   }
//   return user;
// };

const findUserById = async (uid: number) => {
  try {
      console.log(`Buscando usuario con UID: ${uid}`); // Añadir log
      const user = await User.findByPk(uid);
      if (user) {
          console.log(`Usuario encontrado: ${user.uid}`); // Añadir log
      } else {
          console.log(`Usuario con UID: ${uid} no encontrado`); // Añadir log
      }
      return user;
  } catch (error) {
      console.error(`Error al buscar el usuario: ${error}`);
      throw error;
  }
};


// const deleteUserService = async (uid: number): Promise<{ message: string }> => {
//   const user = await User.findByPk(uid);
//   if (user) {
//     await user.destroy();
//     return { message: 'Usuario eliminado exitosamente' };
//   } else {
//     throw new Error('Usuario no encontrado');
//   }
// };

const deleteUserService = async (uid: number): Promise<{ message: string }> => {
  try {
      const user = await User.findByPk(uid);
      if (user) {
          await user.destroy();
          return { message: 'Usuario eliminado exitosamente' };
      } else {
          throw new HttpError('Usuario no encontrado', 404);
      }
  } catch (error) {
      console.error(`Error al eliminar el usuario: ${error}`);
      throw error;
  }
};





export const userService = {
    getAllUsers,
    getUser,
    createUserWithEmailAndPassword,
    getUserByEmail,
    findUserById,
    deleteUserService,
    
}