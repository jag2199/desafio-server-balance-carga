const mongoose = require("mongoose")

const URL = "mongodb+srv://jonathan:mongo753@clustercab.kfxke.mongodb.net/BELGRANO?retryWrites=true&w=majority"

async function dbMongoose() {
    try {
        mongoose.connect(URL, {
            userNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.connection.on("open", () => {
            console.log("Base de datos conectada")
        })

        // modelos
        const algoSchema = new mongoose.Schema({
            nombre: {
                type: String,
                required: true
            },
            precio: {
                type: Number,
                required: true
            },
            stock: {
                type: Number,
                default: 0
            }
        })
        const algoModelo = mongoose.model("Algos", algoSchema)

        //Guardar en DB C
        const algo1 = {
            nombre: "Algo1",
            precio: 8,
            stock: 9
        }

        const alguito = new algoModelo(algo1)
        await alguito.save()

        //Leer todos R
        let algoTraido = await algoModelo.find({})
        console.log(algoTraido)

        //Actualizar U
        let algoUpdated = await algoModelo.updateOne({ nombre: "Algo1" }, { $set: { stock: 100 } })
        console.log(algoUpdated)

        //Eliminar D
        let algoEliminado = await algoModelo.deleteOne({ nombre: "Algo1" })
        console.log(algoEliminado)

    } catch (error) {
        console.log(error)
    }
}

dbMongoose()