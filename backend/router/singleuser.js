const { singleuser } = require('../controller/singleuser');

const router = require('express').Router();

router.route('/singleuser').get(singleuser)

module.exports = router;