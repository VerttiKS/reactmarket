// Require express
const express = require('express');
const {
  createMenuItem, deleteMenuItem, getMenuItems, getMenuItemById, updateMenuItem
} = require('../controllers/menuitems');

// Create a router object
const router = express.Router();

// Create verify Token
const verifyToken = require('../middleware/verifyToken');

// Add the routes and the controller function that should handle the request
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);


// Call the verify token function
router.use(verifyToken);

// Authenticated routes
router.post('/', createMenuItem);
router.put('/', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;