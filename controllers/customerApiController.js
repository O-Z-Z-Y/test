const Customer = require('../models/Customer');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

/**
 * @brief [ Frontend-API ] registerCustomer
 *
 * @param {*} req req.body customer registration information
 * @param {*} res
 *
 * @return token and user name.
 */
const registerCustomer = async (req, res) => {
  const { name, email, password, phonenumber } = req.body;

  if (!name || !email || !password || !phonenumber) {
    throw new CustomError.BadRequestError('입력한 회원정보를 확인해주세요.');
  }

  const eqcustomer = await Customer.findOne({ $or: [{ email: email }] });
  if (eqcustomer) {
    throw new CustomError.BadRequestError('이미 같은 이메일을 갖고있는 수강생이 있습니다.');
  }

  Sequences.findOneAndUpdate({ name: 'customer-number' }, { $inc: { counter: 1 } })
    .then((result) => {
      const { counter } = result;

      Customer.create({ num: counter, name, email, password, phonenumber })
        .then((customer) => {
          const token = customer.createJWT();
          res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
        })
        .catch((err) => {
          res.status(StatusCodes.BAD_REQUEST).json({ msg: `${err}` });
        });
    })
    .catch((err) => {
      throw new CustomError.NotFoundError(`customer-number 시퀀스 데이터가 없습니다.`);
    });
};

/**
 * @brief [ Frontend-API ] editCustomer
 *
 * @param {*} req req.body customer registration information
 * @param {*} res
 *
 * @return token and user name.
 */
const editCustomer = async (req, res) => {
  const { name, email, password, phonenumber } = req.body;

  if (!name || !email || !password || !phonenumber) {
    throw new CustomError.BadRequestError('수정할 데이터 중 null값이 존재합니다. 다시확인해주세요.');
  }

  Customer.findOneAndUpdate({ email }, { name, password, phonenumber })
    .then((customer) => {
      const token = customer.createJWT();
      res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: `${err}` });
    });
};

/**
 * @brief [ Frontend-API ] loginCustomer
 *
 * @param {*} req email and password
 * @param {*} res
 *
 * @return user information and token
 */
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('로그인정보를 다시 입력해주세요.');
  }

  const user = await Customer.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('입력하신 정보를 다시 확인해주세요.');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('입력하신 정보를 다시 확인해주세요.');
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name, email: user.email, abandonedcart: user.abandonedcart }, token });
};

const saveCart = async (req, res) => {
  const updateCart = await Customer.findOneAndUpdate({ email: req.body.email }, { abandonedcart: req.body.cart }, { new: true });
  res.status(StatusCodes.OK).json({ updateCart });
};

const findCustomer = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new BadRequestError('등록된 올바른 이름이 아닙니다.');
  }

  const findCustomerObj = await Customer.findOne({ name: name });
  if (!findCustomerObj) {
    throw new BadRequestError('일치하는 이름의 회원이 존재하지 않습니다.');
  }
  res.status(StatusCodes.OK).json({ user: { email: findCustomerObj.email } });
};

const getList = async (req, res) => {
  const list = await Customer.find({}).sort({ num: -1 });
  res.status(StatusCodes.OK).json({ list: list });
};

const getCustomerInfo = async (req, res) => {
  console.log(req.user);
  const customer = await Customer.findOne({ email: req.user.userEmail });
  if (!customer) {
    throw new UnauthenticatedError('입력하신 사용자 정보와 일치하는 데이터가 없습니다.');
  } else {
    res.status(StatusCodes.OK).json({ user: { name: customer.name, email: customer.email, phonenumber: customer.phonenumber } });
  }
};

module.exports = {
  registerCustomer,
  editCustomer,
  loginCustomer,
  saveCart,
  findCustomer,
  getList,
  getCustomerInfo,
};
