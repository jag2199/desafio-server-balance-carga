import Container from "../container.js"
import msjSchema from "../schemas/msjSchema.js"


class MsjContainer extends Container {
    constructor() {
        super("msj", msjSchema)
    }
}

export default MsjContainer