const { login } = require("../controller/login");

const router = require("express").Router();

router.route('/login').post(login)

module.exports = router;