const options = {
    mariaDB: {
        client: "mysql",
        connection: {
            host: "127.0.0.1 ",
            user: "root",
            password: "",
            database: "dbDesafio"
        },
    },
    sqlite3: {
        client: "sqlite3",
        connection: {
            filename: "./DB/ecommerce.sqlite"
        },
        useNullAsDefault: true
    },
    mongoDB: {
        URL: "mongodb+srv://jonathan:mongo753@clustercab.kfxke.mongodb.net/desafios?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}

export default options