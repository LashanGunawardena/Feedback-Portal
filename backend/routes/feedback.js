const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /feedback
router.get('/', async (req, res) => {
  // TODO: Return feedback for logged in user

});

// POST /feedback
router.post('/', async (req, res) => {
  // TODO: Save new feedback for user
  const { message } = req.body;

  
});

module.exports = router;
