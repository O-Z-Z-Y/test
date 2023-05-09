const express = require('express');
const { getNoticeList, getMainCourse, getSubCourse } = require('../controllers/jobsApiController');
const router = express.Router();
/**
 * @swagger
 * paths:
 *  /jobs/notice/list/{id}:
 *   get:
 *    tags: [Jobs]
 *    summary: Notice List
 *    operationId: NoticeList
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The page ID
 *    responses:
 *     '200':
 *       description: 'Successfully get notice list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get notice list'
 *       headers: {}
 */
router.get('/notice/list/:id', getNoticeList);

/**
 * @swagger
 * paths:
 *  /jobs/maincourse/list:
 *   get:
 *    tags: [Jobs]
 *    summary: Get Main Course List
 *    operationId: McourseList
 *    responses:
 *     '200':
 *       description: 'Successfully get main course list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get main course list'
 *       headers: {}
 */
router.get('/maincourse/list', getMainCourse);

/**
 * @swagger
 * paths:
 *  /jobs/subcourse/list/{id}:
 *   get:
 *    tags: [Jobs]
 *    summary: Get Subcourse List
 *    operationId: SubcourseList
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: number
 *         required: true
 *         description: The page ID
 *    responses:
 *     '200':
 *       description: 'Successfully get notice list'
 *       headers: {}
 *     '400':
 *       description: 'Error to get notice list'
 *       headers: {}
 */
router.get('/subcourse/list/:id', getSubCourse);

module.exports = router;
