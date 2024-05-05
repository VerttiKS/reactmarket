const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const userLogInSchema = Joi.object({
  email: Joi.string().email().required().min(2),
  password: Joi.string().required().min(2),
})

const userSignUpSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required().min(2),
  password: Joi.string().required().min(2),
  admin: Joi.boolean().required(),
})


const users = require('../models/users');

const signUpUser = async (req, res) => {
  
  const { error } = userSignUpSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  const { name, email, password, admin } = req.body;

  try{
    const exist = await users.findByEmail(email);
    if (exist.length > 0) {
      return res.status(422).send('Could not create user, user exists');
    }
  } catch (err) {
    return res.status(500).send('Something went wrong creating the user');
  }

  let hashedPassword;
  try {
    // Parameters, the string to hash, salt length to generate or salt to use
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send('Could not create user, try again');
  }
  
  const newUser = {
    id: v4(),
    name,
    email,
    hashed_password: hashedPassword,
    admin
  }
  
  try {
    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send('Something went wrong creating the user');
    }

    const token = jwt.sign(
      {
        id: newUser.id, // payload, anything that make sense and
        email: newUser.email // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: '1h' } // options like an experation time
    );
    
    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token: token
    })
  } catch (err) {
    return res.status(500).send('Signup failed, please try again');
  }
}


const loginUser = async (req, res) => {
  
  const { error } = userLogInSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { email, password } = req.body
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).send('Could not identify user, credetials might be wrong');
    }
    
    identifiedUser = result[0];
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong with login in the user');
  }
  
  let isValidPassword = false;
  try {
    //comparing password with hash
    isValidPassword = await bcrypt.compare(password, identifiedUser.hashed_password);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Could not log you in , check your credetials');
  }
  if (!isValidPassword) {
    return es.status(401).send('Could not identify user, credetials might be wrong');
  }

  let token
  try {
    token = jwt.sign(
      {
        id: identifiedUser.id, // payload, anything that make sense and
        email: identifiedUser.email // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: '1h' } // options like an experation time
    )
  } catch (err) {
    return res.status(500).send('Something went wrong with login in the user');
  }
  res.status(201).json({
    id: identifiedUser.id,
    email: identifiedUser.email,
    name: identifiedUser.name,
    token: token
  })
}

module.exports = {
  loginUser,
  signUpUser
};
