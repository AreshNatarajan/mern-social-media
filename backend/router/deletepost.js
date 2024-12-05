const { deletepost } = require("../controller/deletepost");

const router = require("express").Router();

router.route('/deletepost').delete(deletepost)
module.exports = router;