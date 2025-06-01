const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware to verify JWT

const prisma = new PrismaClient();

// GET /feedback
router.get('/', authMiddleware, async (req, res) => {
  // TODO: Return feedback for logged in user
  try{
    const feedBacks = await prisma.feedback.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  )
    res.json(feedBacks);
  }
  catch(err){
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /feedback
router.post('/', authMiddleware, async (req, res) => {
  // TODO: Save new feedback for user
  const { message } = req.body;

  if(!message){
    return res.status(400).json({ message: 'Feedback message is required!' });
  }

  try{
    const newFeedBack = await prisma.feedback.create({
      data: {
        message,
        userId: req.user.userId
      }
    })

    res.status(201).json(newFeedBack);
  }
  catch(err){
    res.status(500).json({ message: 'Internal server error' });
  }

});

module.exports = router;
