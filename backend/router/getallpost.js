const { getallpost } = require("../controller/getallpost");

const router = require("express").Router();

router.route('/getallpost').get(getallpost)
module.exports = router;