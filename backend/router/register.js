const { register } = require("../controller/register");

const router = require("express").Router();

router.route('/register').post(register)

module.exports = router