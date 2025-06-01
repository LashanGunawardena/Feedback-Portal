const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/feedback', authMiddleware, async (req, res) => {
  // TODO: Fetch all feedback (admin only)
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId
    },
    select: {
      isAdmin: true
    }
  });

  if(!user.isAdmin){
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Admins only.'
    });
  }

  try{
    const feedBacks = await prisma.feedback.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if(feedBacks.length === 0){
      return res.status(404).json({
        success: true,
        feedback: [],
        message: 'No feedback found.'
      });
    }

    res.json({
      success: true,
      feedback: feedBacks
    });
  }
  catch(err){
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
