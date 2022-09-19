import { Router } from "express"
import os from "os"

const router = Router()

const info = {
    "Node version": process.version,
    "Platform": process.platform,
    "Directorio de ejecución": process.cwd(),
    "ID del proceso": process.pid,
    "Uso de la memoria": process.memoryUsage(),
    "Memoria total reservada (rss)": process.memoryUsage().rss,
    "Path de ejecución": process.execPath,
    "Argumentos de entrada": process.argv,
    "Numero de procesadores": os.cpus().length
}

router.get("/", (req, res) => {
    res.send(info)
})

export default router