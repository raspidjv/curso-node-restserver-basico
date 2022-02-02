const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.userPath = '/api/users';

        // Middleware
        this.middlewares();

        // Rutas de mi app
        this.routes();
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