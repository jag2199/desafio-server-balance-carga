import { Router } from "express"
import { fork } from "child_process"

const router = Router()

router.get("/", (req, res) => {
    const cant = req.query.cant || 100000000
    const child = fork("./src/getRandom.js")
    child.send(cant)
    child.on("message", (msj) => {
        res.send(msj)
    })

    child.on("exit", (pid) => {
        console.log("Se ha cerrado el proceso", pid)
    })
})

export default router