import express from "express";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route"

const app =  express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/users", userRoute)

app.use("/api/v1/auth", authRoute)

app.listen(port, () => {
    console.log("servidor andando en el puerto:" + port)
})


