import { Router } from "express"; 
import {userController} from "../controllers/user.controller"
import { verifyToken}  from "../middlewares/jwt.middleware"


const router = Router(); 

// router.use(verifyToken)
// path: http:localhost:3000 /api/vl/users

// leer los usuarios
// ruta protegida:
router.get('/', verifyToken, userController.getUsers)

// leer un único usuario por id

router.get('/:id', userController.getUser)

// crea un usuario
router.post('/', userController.createUser)
// eliminar un usuario por  id

// actualizar un usuario por id

 
export default router;