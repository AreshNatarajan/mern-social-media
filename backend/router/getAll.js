const router = require("express").Router();
const {getAll} = require('../controller/getAll');


router.route('/user').get(getAll)


module.exports = router;