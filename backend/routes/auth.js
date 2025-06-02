const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Request to register a new user
router.post('/signup', async (req, res) => {
  // TODO: Handle signup (create user, hash password, return JWT)
  const { email, password } = req.body;

  //Checks if email and password are provided
  if(!email || !password){
    return res.status(400).json({message: 'Email and password are required!'});
  }

  try {
    const isUserExisting = await prisma.user.findUnique({ where: { email }});

    //Checks if user already exists
    if(isUserExisting){
      return res.status(400).json({ message: 'User already exists!'});
    }

    //Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    //Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: passwordHash
      }
    });

    //Generate a JWT token for the new user
    const token = jwt.sign({ 
      userId: newUser.id,
      email: newUser.email
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { 
      id: newUser.id,
      email: newUser.email 
    } });

  } 
  catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Request to login an existing user
router.post('/login', async (req, res) => {
  // TODO: Handle login (check user, compare password, return JWT)
  const { email, password } = req.body;

  try{
      //Checks if email and password are provided
      if(!email || !password){
        return res.status(400).json({ message: 'Email and password are required!' });
      }

      const isUserExisting = await prisma.user.findUnique({ where: { email }});

      //Checks if user exists
      if(!isUserExisting){
        return res.status(400).json({ message: 'Invalid email!' });
      }

      //Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, isUserExisting.password);
      if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid password!' });
      }

      //Generate a JWT token for the user
      const token = jwt.sign({ 
        userId: isUserExisting.id,
        email: isUserExisting.email
      }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token, user: { 
        id: isUserExisting.id,
        email: isUserExisting.email
      } });

    }
    catch(err){
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
