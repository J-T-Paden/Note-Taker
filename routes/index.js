const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api')
router.use('/api', apiRoutes)
router.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
}
);
module.exports = router