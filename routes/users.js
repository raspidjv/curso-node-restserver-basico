const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersGetById, usersGetByQuery, usersPut, usersPost, usersDelete } = require('../controllers/users');

const { validarUser } = require('../middlewares/validar-user');
const { esRoleValido, emailExiste, existeUserById } = require('../helpers/db-validators');




const router = Router();


router.get('/:id', usersGetById);

// router.get('/', usersGet);
router.get('/', usersGetByQuery);


router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUserById),
  // check('correo', 'el correo no tiene formato valido').isEmail(),
  // check('correo').custom(emailExiste),
  check('rol').custom(esRoleValido),
  validarUser
], usersPut);

router.post('/', [
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('password', 'el password debe ser mas de 6 letras').isLength({ min: 6 }),
  check('correo', 'el correo no tiene formato valido').isEmail(),
  check('correo').custom(emailExiste),
  // check('rol','no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRoleValido),
  validarUser
], usersPost);

router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUserById),
  validarUser
], usersDelete);






module.exports = router;