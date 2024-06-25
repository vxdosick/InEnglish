import express from "express"
import { MONGO, PORT } from "./config";
import { connect } from "mongoose";
import { cardRouter } from "./routers/cardRouter";
import path from "path"
const cors = require("cors")



const app = express()
app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const corsOption = {
    origin: "https://inenglish.onrender.com",
    optionsSuccessStatus: 200
}
app.use(cors(corsOption))
connect(MONGO)
console.log(MONGO, PORT);

app.use(express.urlencoded({extended: true}))
app.use("/api/card", cardRouter)

app.listen(PORT, ()=> {
    console.log(`Server started in ${PORT}`);
})