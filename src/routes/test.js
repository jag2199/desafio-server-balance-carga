const mocks = require("../utils/mocks")
const express = require("express")
const { Router } = express
const router = Router()

router.get("/", (req, res) => {
    res.render("test", { productos: mocks() })
})
