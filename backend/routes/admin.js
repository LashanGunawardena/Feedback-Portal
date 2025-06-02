const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();


//Request to fetch all feedbacks
router.get('/feedback', authMiddleware, async (req, res) => {
  // TODO: Fetch all feedback (admin only)
  // Check if the user is an admin
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId
    },
    select: {
      isAdmin: true
    }
  });

  //Only if the user is an admin, it fetches all the feedback
  if(user.isAdmin){
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

      //Checks if there are no feedbacks currently available 
      if(feedBacks.length === 0){
        return res.status(200).json({
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
  }
  else {
    return res.json({ success: false, message: 'Access denied' });
  }
});


//Request to delete feedback by id
router.delete('/feedback/:id', authMiddleware, async (req, res) => {
  const feedBackId = parseInt(req.params.id);

  try{
    const feedback = await prisma.feedback.delete({
      where: {
        id: feedBackId
      }
    }); 

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });
  }
  catch(err){
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Request to update feedback status
router.put(`/feedback/:id`, authMiddleware, async(req, res) => {
  const feedBackId = parseInt(req.params.id);
  const { message } = req.body;

  try{
    const updateFeedback = await prisma.feedback.update({
      where: {
        id: feedBackId
      },
      data: {
        message
      }
    });

    res.json({
      success: true,
      message: 'Feedback updated successfully'
    })
  }
  catch(err){
    res.status(500).json({ success: false, message: 'Internal server error' }); 
  }
})


module.exports = router;
