import { PetModel } from "../models/pet.model"

// la funcion de service es crear las validaciones del negocio
const createPet = async(uid:string, name:string, age: number) =>{
    const newPet = await PetModel.create(uid, name, age)
    console.log(newPet)
    return newPet;
}

export const petService = {
    createPet,
}