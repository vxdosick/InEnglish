"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const mongoose_1 = require("mongoose");
const cardRouter_1 = require("./routers/cardRouter");
const path_1 = __importDefault(require("path"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
const corsOption = {
    origin: "https://inenglish.onrender.com",
    optionsSuccessStatus: 200
};
app.use(cors(corsOption));
(0, mongoose_1.connect)(config_1.MONGO);
console.log(config_1.MONGO, config_1.PORT);
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/card", cardRouter_1.cardRouter);
app.listen(config_1.PORT, () => {
    console.log(`Server started in ${config_1.PORT}`);
});
