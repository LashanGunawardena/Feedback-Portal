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
  })

  if(!user.isAdmin){
    return res.status(403).json({ message: 'Access denied. Admins only.' });
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
        userId: 'asc'
      }
    });

    res.json({feedback: feedBacks});
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
