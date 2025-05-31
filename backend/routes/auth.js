const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /signup
router.post('/signup', async (req, res) => {
  // TODO: Handle signup (create user, hash password, return JWT)
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({message: 'Email and password are required!'});
  }

  try {
    const isUserExisting = await prisma.user.findUnique({ where: { email }})

    if(isUserExisting){
      return res.status(400).json({ message: 'User already exists!'})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: passwordHash
      }
    })

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
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  // TODO: Handle login (check user, compare password, return JWT)
  const { email, password } = req.body;

  try{
      if(!email || !password){
        return res.status(400).json({ message: 'Email and password are required!' });
      }

      const isUserExisting = await prisma.user.findUnique({ where: { email }})

      if(!isUserExisting){
        return res.status(400).json({ message: 'Invalid email!' });
      }

      const isPasswordValid = await bcrypt.compare(password, isUserExisting.password);
      if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid password!' });
      }

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
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
