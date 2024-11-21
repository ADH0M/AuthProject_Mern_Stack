const User = require('../models/usersModel');
const router = require('express').Router();
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/auth', async (req, res, next) => {
  try {
    const { email, password, passwordVerify } = req.body;
    // validation
    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: 'Please enter a password of at least 6 characters.',
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: 'Please enter the same password twice.',
      });

    const UserExist = await User.findOne({ email });

    if (UserExist)
      return res.status(400).json({
        errorMessage: 'An Account wiht this emial alerady exist.',
      });

    const salt = await bycrpt.genSalt();
    const passwordHash = await bycrpt.hash(password, salt);

    const newUser = new User({
      email,
      passwordHash,
    });

    const saveUSer = await newUser.save();
    const token = jwt.sign({ userId: saveUSer._id }, process.env.JWT_SECRET);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: 'Please enter a password of at least 6 characters.',
      });

    const userExist = await User.findOne({ email });

    const comparePassword = await bycrpt.compare(
      password,
      userExist.passwordHash
    );

    if (!userExist || !comparePassword) {
      return res.status(401).json({
        errorMessage: 'the email or password is not correct .',
      });
    }

    const token = jwt.sign(
      { user_id: userExist._id, email: userExist.email },
      process.env.JWT_SECRET
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/logout', (req, res, next) => {
  try {
    const token = '';
    res
      .cookie('token', token, {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/logedin', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    console.error(err);
    res.send(false);
  }
});

module.exports = router;
