const Role = require('../models/role');
const User = require('../models/user');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne( {rol});
    // console.log(rol);
    // console.log(existeRol);
    if( !existeRol) {
      throw new Error( `el rol ${ rol } no es valido`);
    }
  }


const emailExiste = async( correo = '') => {
    const existeMail = await User.findOne( { correo });
    if( existeMail ) {
        throw new Error(  'Ese correo ya existe');
    }
    
}


const existeUserById = async( id ) => {
  const existeId = await User.findById(  id );
  if( !existeId ) {
      throw new Error(  'ID no existe');
  }
  
}

module.exports = {
      esRoleValido,
      emailExiste,
      existeUserById
  }