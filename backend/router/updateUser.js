const { updateUserProfile } = require("../controller/updateUser");

const router = require("express").Router();

router.route('/update').post(updateUserProfile)

module.exports = router