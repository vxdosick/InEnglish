import express from "express"
const cors = require('cors');
import { MONGO, PORT } from "./config";
import { connect } from "mongoose";
import { cardRouter } from "./routers/cardRouter";
import path from "path"



const app = express()
app.use(cors({
    origin: 'https://inenglish-1.onrender.com'
}))
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

connect(MONGO)
console.log(MONGO, PORT);

app.use(express.urlencoded({extended: true}))
app.use("/api/card", cardRouter)

app.listen(PORT, ()=> {
    console.log(`Server started in ${PORT}`);
})