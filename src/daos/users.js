import Container from "../container.js"
import usersSchema from "../schemas/usersSchema.js"
import bcrypt from "bcrypt"

export default class UserContainer extends Container {
    constructor() {
        super("users", usersSchema)
    }

    comparePassword(password, userPassword) {
        return bcrypt.compare(password, userPassword)
    }

    encryptPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
}
