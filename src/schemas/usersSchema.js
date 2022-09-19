import mongoose from "mongoose"

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
    },
    pwd: {
        type: String,
        unique: true,
        required: true
    }
})

export default usuariosSchema