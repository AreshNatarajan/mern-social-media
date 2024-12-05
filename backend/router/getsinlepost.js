const { getsinglepost } = require("../controller/getsinglepost");

const router = require("express").Router();

router.route('/singlepost').get(getsinglepost)


module.exports = router;