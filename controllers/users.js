const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');



const usersGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // // consulto cantidad de registros
    // const total = await User.countDocuments(query);

    // // sino son todos los usuarios
    // const users = await User.find(query)
    //     // .sort({nombre:1})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            // .sort({nombre:1})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    return res.json({
        total,
        users
    });
};

const usersGetById = async (req = request, res = response) => {

    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        msg: 'get API - usersGetById controller',
        user
    });

};



const usersGetByQuery = async (req = request, res = response) => {

    const query = req.query;
    const { limite = 5, desde = 0 } = req.query;
    query.estado = true;
    console.log(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            // .sort({nombre:1})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    return res.json({
        total,
        users
    });
    // console.log(JSON.stringify(query), JSON.stringify(query).length);
    // if (JSON.stringify(query).length > 2) {
    //     const { q, nombre = 'no name', apikey, page = '1', limit = '10' } = req.query;

    //     return res.json({
    //         msg: 'get API - usersGetById controller',
    //         query,
    //         q, nombre, apikey, page, limit
    //     });
    // }

};



const usersPut = async (req, res) => {

    // const id = req.params.id;
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra BD
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controller',
        user
    });
};

const usersPost = async (req, res) => {

    // const body = req.body;
    // const user = new User( body );

    // const {google, ... campos} = req.body;
    // const user = new User( campos );

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

    // verificar si el correo existe
    // esto se paso a un check de express-validator en el router post con un helper
    // const existeMail = await User.findOne( { correo });
    // if( existeMail ) {
    //     return res.status(400).json( { msg: 'Ese correo ya existe'});
    // }


    // encriptar la password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    // guardar en db
    await user.save();

    // console.log(user);

    res.json({
        msg: 'post API - controller',
        user
    });
};

const usersDelete = async (req, res) => {
    const { id } = req.params;

    //  // borrado fisico
    //  const user = await User.findByIdAndDelete(id);

    // borrado logico
    const user = await User.findByIdAndUpdate(id, { estado: false });


    res.json({
        msg: 'delete API - controller',
        user
    });
};


module.exports = {
    usersDelete,
    usersGet,
    usersGetById,
    usersGetByQuery,
    usersPost,
    usersPut
}
