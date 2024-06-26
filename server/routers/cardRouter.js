"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const express_1 = require("express");
const cardModel_1 = require("../models/cardModel");
const router = (0, express_1.Router)();
router.get("/cardElement", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cardModel_1.Card.find();
        if (!result)
            console.log("Empty base");
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/cardAddWord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const word = new cardModel_1.Card(req.body);
        const result = yield word.save();
        if (!result)
            console.log("Not Added");
        res.status(200).send(result);
        console.log("Word Added");
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete("/cardDeleteWord/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield cardModel_1.Card.deleteOne({ "_id": req.params.id }, { $set: req.query });
        if (!result)
            console.log("Not deleted");
        res.status(200).send(result);
        console.log("Word deleted");
        res.end();
    }
    catch (err) {
        console.log(err);
    }
}));
exports.cardRouter = router;
