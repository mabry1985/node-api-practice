const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  const emailExist = await User.findOne({ email: req.body.email });
  if(emailExist) return res.status(400).send('Email already exists');
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    await user.save();
    res.json({user: user._id});
  } catch (error) {
    res.status(400).send(err);
  };
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send('Email does not exist');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid password');
  
  res.send('Logged in')
})

module.exports = router;