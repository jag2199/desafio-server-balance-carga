import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express"
import bodyParser from "body-parser"
import http from "http"

import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const yargs = _yargs(hideBin(process.argv))
const args = yargs
    .default({
        PORT: 8080,
        MODE: "FORK"
    })
    .argv

import rutaLogin from "./routes/login.js"
import rutaLogout from "./routes/logout.js"
import rutaProductos from "./routes/home.js"
import rutaRegistro from "./routes/register.js"
import rutaErrorLogin from "./routes/errorLogin.js"
import rutaErrorRegister from "./routes/errorRegister.js"
import rutaInfo from "./routes/info.js"
import rutaApi from "./routes/api.js"
import { Server as ioServer } from "socket.io"
import MsjContainer from "./daos/msj.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from 'passport'
import "dotenv/config"

import cluster from 'cluster'
import os from "os"

const numCPUs = os.cpus().length

// dotenv.config()

console.log(args)
const MODE = args.MODE === "FORK"

if (cluster.isMaster && MODE) {
    console.log(`Master (${process.pid}) is running...`);
    console.log(`Numero de procesadores: ${numCPUs}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {

    const app = express()

    const httpServer = http.createServer(app)
    const io = new ioServer(httpServer)


    app.set("view engine", "ejs")
    app.set("views", __dirname + "/public/views")

    // middlewares
    app.use(express.json())
    app.use(express.static(__dirname + "/public"))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(
        {
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@clustercab.kfxke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                ttl: 60 * 10
            })
        }
    ))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/login", rutaLogin)
    app.use("/logout", rutaLogout)
    app.use("/register", rutaRegistro)
    app.use("/", rutaProductos)
    app.use("/errorLogin", rutaErrorLogin)
    app.use("/errorRegister", rutaErrorRegister)
    app.use("/info", rutaInfo)
    app.use("/api/randoms", rutaApi)





    // io
    io.on("connection", (socket) => {
        console.log("conectado")
        // socket.emit("productos", container.getAll())

        // socket.on("newProd", (arg) => {
        //     console.log(arg)
        //     io.sockets.emit("productos", container.getAll())
        // })
        let msjDB = new MsjContainer()

        const msj = msjDB.getAll()

        socket.emit("chat", msj)

        socket.on("newMsj", newMsj => {
            msjDB.save(newMsj)
            io.sockets.emit("chat", msj)
        })
    })

    // server
    const server = httpServer.listen(args.PORT, () => {
        console.log(`Servidor iniciado en el puerto ${server.address().port} ( http://localhost:${server.address().port} ) PID: ${process.pid}`)
    })

    server.on("error", error => console.log(error))
}
