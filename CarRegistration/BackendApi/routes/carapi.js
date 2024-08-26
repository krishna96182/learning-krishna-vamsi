var express = require('express');
var router = express.Router();
const User = require("../models/carapi");
const bcrypt = require("bcrypt");
const { body, param, validationResult } = require('express-validator');

router.get("/", async function (req, res, next) {
  try {
    let results = await User.find();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('dob').isISO8601().withMessage('Invalid date of birth format'),
    body('city').isString().notEmpty().withMessage('City is required'),
    body('profession').isIn(['IT', 'Sales', 'Unemployed']).withMessage('Profession must be IT, Sales, or Unemployed')
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(req.body.password, salt);
      var userOb = new User({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        dob: req.body.dob,
        city: req.body.city,
        profession: req.body.profession,
        password: encryptedPassword,
      });

      const result = await userOb.save();
      res.json({ status: 1, data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('username').optional().isString().notEmpty().withMessage('Username must be a string'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('gender').optional().isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('dob').optional().isISO8601().withMessage('Invalid date of birth format'),
    body('city').optional().isString().notEmpty().withMessage('City must be a string'),
    body('profession').optional().isIn(['IT', 'Sales', 'Unemployed']).withMessage('Profession must be IT, Sales, or Unemployed')
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const result = await User.findByIdAndUpdate(id, updates, { new: true });
      res.json({ status: 1, data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('username').optional().isString().notEmpty().withMessage('Username must be a string'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('gender').optional().isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('dob').optional().isISO8601().withMessage('Invalid date of birth format'),
    body('city').optional().isString().notEmpty().withMessage('City must be a string'),
    body('profession').optional().isIn(['IT', 'Sales', 'Unemployed']).withMessage('Profession must be IT, Sales, or Unemployed')
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const result = await User.findByIdAndUpdate(id, updates, { new: true });
      res.json({ status: 1, data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid user ID')],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      await User.findByIdAndDelete(id);
      res.json({ status: 1, msg: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;