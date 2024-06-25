"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const mongoose_1 = require("mongoose");
const cardRouter_1 = require("./routers/cardRouter");
const app = (0, express_1.default)();
(0, mongoose_1.connect)(config_1.MONGO);
console.log(config_1.MONGO, config_1.PORT);
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/card", cardRouter_1.cardRouter);
app.listen(config_1.PORT, () => {
    console.log(`Server started in ${config_1.PORT}`);
});
