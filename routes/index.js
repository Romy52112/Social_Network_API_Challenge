// routes/index.js
const express = require('express');
const router = express.Router();

// Define routes
router.get('/test', (req, res) => {
  res.send('API route working!');
});

// Export the router
module.exports = router;
