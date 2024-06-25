import express from "express"
import { MONGO, PORT } from "./config";
import { connect } from "mongoose";
import { cardRouter } from "./routers/cardRouter";

const app = express()
connect(MONGO)
console.log(MONGO, PORT);

app.use(express.urlencoded({extended: true}))
app.use("/api/card", cardRouter)

app.listen(PORT, ()=> {
    console.log(`Server started in ${PORT}`);
})