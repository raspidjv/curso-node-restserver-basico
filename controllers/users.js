const { request, response } = require('express');


const usersGet = (req = request, res = response) => {

    const query = req.query; 
    const { q, nombre ='no name', apikey, page = '1', limit='10' } = req.query; 

    res.json({
        msg: 'get API - controller',
        query,
        q, nombre, apikey, page, limit
    });
};


const usersPut = (req, res) => {

    // const id = req.params.id;
    const {id} = req.params;

    res.json({
        msg: 'put API - controller',
        id
    });
};

const usersPost = (req, res) => {

    const body = req.body;

    res.json({
        msg: 'post API - controller',
        body
    });
};

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
};


module.exports = {
    usersDelete,
    usersGet,
    usersPost,
    usersPut
}
