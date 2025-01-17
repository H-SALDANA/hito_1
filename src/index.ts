import 'dotenv/config'
import express from "express";
// import { pool } from "./config/database";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route"
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import rateLimit from "express-rate-limit";
import petRoute from "./routes/pet.route"

import openapiSpecification from "./config/swagger";
import swaggerUI from "swagger-ui-express";
import { sequelize } from './config/datasequelize';



const app =  express()
const port = process.env.PORT || 3000;

app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// configurador limitador
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
    standardHeaders: true, 
    legacyHeaders: false, 
});

// aplicando limitador globalmente
app.use(limiter);

app.use(loggerMiddleware)

app.use("/api/v1/users", userRoute)

app.use("/api/v1/auth", authRoute)

app.use("/api/v1/pets", petRoute)



app.use(httpErrorHandle)

const main = async() => {

    try {
        
       
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected")
        app.listen(port, () => {
            console.log("servidor andando en el puerto:" + port)
        })
    } catch (error) {
        console.log(error)
    }
}

main()




