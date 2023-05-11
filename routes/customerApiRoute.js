const express = require('express');
const { registerCustomer, loginCustomer, findCustomer } = require('../controllers/customerApiController');
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /customer/register:
 *   post:
 *    tags: [Customer]
 *    summary: Register Customer
 *    operationId: RegisterCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              num: 40 //auto increment
 *              name: bob
 *              email: bob@gmail.com
 *              password: secret
 *              phonenumber: 01012341234
 *    responses:
 *     '200':
 *       description: 'Successfully updated'
 *       headers: {}
 *     '400':
 *       description: 'Error to updated'
 *       headers: {}
 */
router.post('/register', registerCustomer);

/**
 * @swagger
 * paths:
 *  /customer/login:
 *   post:
 *    tags: [Customer]
 *    summary: Customer Login
 *    operationId: LoginCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              email: bob@gmail.com
 *              password: secret
 *    responses:
 *     '200':
 *       description: 'Successfully login and provide token'
 *       headers: {}
 *     '400':
 *       description: 'Error to login'
 *       headers: {}
 */
router.post('/login', loginCustomer);

/**
 * @swagger
 * paths:
 *  /customer/findEmail:
 *   post:
 *    tags: [Customer]
 *    summary: Customer find Email
 *    operationId: FindCustomer
 *    requestBody:
 *      description: ''
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/CustomerRequest'
 *          example:
 *              name: bob
 *    responses:
 *     '200':
 *       description: 'Successfully find customer email'
 *       headers: {}
 *     '400':
 *       description: 'Error to login'
 *       headers: {}
 */
router.post('/findEmail', findCustomer);

module.exports = router;
