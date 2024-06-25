import { Router } from "express";
import { Card } from "../models/cardModel";
const router = Router()
router.get("/cardElement", async (req, res)=> {
    try {
        const result = await Card.find()
        if(!result)
            console.log("Empty base");
        res.status(200).send(result)
        console.log(result);
        
    } catch (err) {
        console.log(err);
    }
})

export const cardRouter = router