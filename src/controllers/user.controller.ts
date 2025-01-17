import { Request, Response } from "express"
import { userService } from "../services/user.service";


const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers()
        res.json({
            // email:req.email,
            users
        })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }else res.status(500).json({error: "Error de servidor"})

    }

};

const getUser = async (req: Request, res: Response) => {
    try {
       const {id} = req.params
        res.json({})
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }else res.status(500).json({error: "Error de servidor"})

    }

};

const createUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const newUser = await userService.createUserWithEmailAndPassword(email, password)
        res.json({newUser});
        console.log(newUser);
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }else res.status(500).json({error: "Error de servidor"})

    }

};


const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid } = req.params;
    const user = await userService.findUserById(Number(uid));
    console.log(user)
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};



export const userController = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
}