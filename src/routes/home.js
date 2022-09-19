import { Router } from "express"
import ProductosContainer from "../daos/productos.js"
import passport from "passport"

const router = Router()

let container = new ProductosContainer()

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.redirect("/info")
    }
}

router.get("/", isAuth, (req, res) => {
    res.render("index", { productos: container.getAll(), nombre: req.user.nombre })
})

// router.get("/productos", (req, res) => {
//     res.render("productos",)
// })

// router.get("/:id", (req, res) => {
//     res.send(container.getById(req.params.id))
// })

router.post("/", (req, res) => {
    container.save(req.body)
    res.redirect("/")
})

// router.put("/:id", (req, res) => {
//     res.send(container.update(req.params.id, req.body))
// })

// router.delete("/:id", (req, res) => {
//     res.send(container.delete(req.params.id))
// })

export default router