const express = require('express');
const { addCourse, listCourse } = require('../controllers/courseController');
const { uploader } = require('../middleware/multer');
const router = express.Router();

router.get('/', listCourse);
router.get('/add', (req, res) => {
  res.render('course/course-add.ejs');
});
router.post('/add', uploader.single('thumnail_course'), addCourse);

module.exports = router;
