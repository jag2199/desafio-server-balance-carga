import mongoose from 'mongoose'
import options from './configDB.js'

mongoose.connect(options.mongoDB.URL, options.mongoDB.options)
    .then((res) => console.log("Conectado a la base de datos"))

export default class Container {
    constructor(nombre, docSchema) {
        this.coleccion = mongoose.model(nombre, docSchema)
    }

    // async write(all) {
    //     await fs.promises.writeFile(this.rutaDB, JSON.stringify(all))
    // }

    async getAll() {
        try {
            const all = await this.coleccion.find()
            console.log(all)
            return all
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async getById(id) {
        try {
            return await this.coleccion.findOne({ id: id })
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async getByName(nombre) {
        try {
            return await this.coleccion.findOne({ nombre: nombre })
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async save(obj) {
        try {
            const all = await this.getAll()
            obj["id"] = all.length ? ((all[all.length - 1].id) + 1) : 1
            obj.timestamp = this.getFecha()
            const newObj = await this.coleccion.create(obj)
            return newObj
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async update(id, obj) {
        try {
            obj.timestamp = this.getFecha()
            const newObj = await this.coleccion.findByIdAndUpdate(id, obj)
            return newObj
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async delete(id) {
        try {
            return await this.coleccion.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    getFecha = () => {
        const date = new Date()
        const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}hs`
        return fecha
    }
}




// import knex from "knex"

// class Container {
//     constructor(options, nom) {
//         this.nombre = nom
//         this.db = knex(options)
//     }

//     async getAll() {
//         try {
//             return await this.db.from(this.nombre).select("*")
//         }
//         catch (err) {
//             return "wtf"
//         }
//     }

//     async getById(id) {
//         try {
//             return await this.db.from.select.where("id", id)
//         } catch (error) {
//             return { error: "producto no encontrado" }
//         }
//     }

//     async save(obj) {
//         try {
//             await this.db(this.nombre).insert(obj)
//         } catch (error) {
//             console.log(error)
//             throw error
//         }
//     }

//     async update(id, obj) {
//         await this.db.from(this.nombre).where("id", "=", id).update(obj)
//     }

//     async delete(id) {
//         await this.db.from(this.nombre).where("id", "=", id).del()
//     }
// }

// module.exports = Container

// // (async () => {
// //     try {
// //         await knex(options).schema.createTable("productos", table => {
// //             table.increments("id").primary().unique()
// //             table.string("nombre").notNullable()
// //             table.float("precio").notNullable()
// //             table.string("thumbnail").notNullable()
// //         })
// //             .then(() => {
// //                 console.log("Tabla productos creada")
// //             })
// //     } catch (error) {

// //     }
// // })()

//   // read() {
//     //     try {
//     //         let contenido = JSON.parse(fs.readFileSync(this.nombre))
//     //         console.log(contenido)
//     //         return contenido
//     //     }
//     //     catch (error) {
//     //         return []
//     //     }
//     // }

//      // try {
//         //     obj["id"] = this.products.length ? ((this.products[this.products.length - 1].id) + 1) : 1
//         //     this.products.push(obj)
//         //     return obj
//         // }
//         // catch (err) {
//         //     console.log(err)
//         //     return "wtf2"
//         // }