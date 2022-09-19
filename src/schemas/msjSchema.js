import mongoose from "mongoose"

const msjSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: false
    }
})
export default msjSchema