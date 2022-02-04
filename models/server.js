const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {

    constructor() {
        this.app = express();
        this.userPath = '/api/users';

        // conectar a base de datos
        this.conectarDB();

        // Middleware
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json() );

        // directorio publico
        this.app.use(express.static('public'));

    }


    routes() {

        this.app.use(this.userPath, require('../routes/users'));

        this.app.get('/hola', (req, res) => {
            res.send('Hello World!');
        });
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }

}

module.exports = Server;