const express = require('express');
const { displayListPage, addPost, deletePost, detailPost, displayEditPage, editPost } = require('../controllers/noticeController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Route working');
});

router.get('/list', displayListPage);
// router.get('/list/:indexnum', displayListPage);
router.get('/detail/:id', detailPost);
router.get('/edit/:id', displayEditPage);
router.get('/write', (req, res) => res.render('write.ejs'));

router.post('/add', addPost);
router.put('/edit', editPost);

router.delete('/delete', deletePost);

module.exports = router;
