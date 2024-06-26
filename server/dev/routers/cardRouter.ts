import { Router } from "express";
import { Card } from "../models/cardModel";
const router = Router()
router.get("/cardElement", async (req, res)=> {
    try {
        const result = await Card.find()
        if(!result)
            console.log("Empty base");
        res.status(200).send(result)
        
    } catch (err) {
        console.log(err);
    }
})
router.post("/cardAddWord", async (req, res)=> {
    try {
        const word = new Card(req.body)
        const result = await word.save()
        if(!result)
            console.log("Not Added");
        res.status(200).send(result)
        console.log("Word Added");
    } catch (err) {
        console.log(err);
    }
})
router.delete("/cardDeleteWord/:id", async (req, res)=> {
    try {
        let result = await Card.deleteOne({"_id": req.params.id}, {$set: req.query})
        if(!result) console.log("Not deleted");
        res.status(200).send(result)
        console.log("Word deleted");
        res.end()
    } catch (err) {
        console.log(err);
    }
})

export const cardRouter = router