import { Router } from "express"; 
import {userController} from "../controllers/user.controller"
import { verifyToken}  from "../middlewares/jwt.middleware"


const router = Router(); 

router.use(verifyToken)
// path: http:localhost:3000 /api/vl/users

// leer los usuarios
// ruta protegida:
router.get('/', userController.getUsers)//
// el codigo siguiente se extrajo el verifytoken.
// router.get('/', userController.getUsers)


// leer un único usuario por id

router.get('/:id', userController.getUser)

// crea un usuario
router.post('/', userController.createUser)
// eliminar un usuario por  id


router.delete('/api/v1/users/:uid', userController.deleteUser);




// actualizar un usuario por id

 
export default router;