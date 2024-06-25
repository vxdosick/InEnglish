"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const mongoose_1 = require("mongoose");
const card = new mongoose_1.Schema({
    word: {
        type: String,
        required: true
    },
    transcription: {
        type: String,
        required: false,
        default: "Not transcription"
    },
    translate: {
        type: String,
        required: true
    },
    isTranslated: {
        type: Boolean,
        default: false
    }
}, { collection: "cards" });
exports.Card = (0, mongoose_1.model)("cards", card);
