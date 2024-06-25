import {model, Schema } from "mongoose";

const card = new Schema({
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
}, {collection: "cards"})
export const Card = model("cards", card)