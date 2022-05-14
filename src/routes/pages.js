const express = require('express');

const router = express.Router();

// about page
router.get('/about', function(req, res) {
    res.render('../views/pages/about');;
});

module.exports = router