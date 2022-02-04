const { validationResult } = require('express-validator');

const validarUser = (req, res, next ) => {

    const validation = validationResult(req);
    if( !validation.isEmpty() ) {
        return res.status(400).json(validation);
    }

    next();

}


module.exports = {
    validarUser
}