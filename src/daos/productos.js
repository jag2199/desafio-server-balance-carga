import Container from "../container.js"
import productosSchema from "../schemas/productosSchema.js"



class ProductosContainer extends Container {
    constructor() {
        super("productos", productosSchema)
    }
}

export default ProductosContainer