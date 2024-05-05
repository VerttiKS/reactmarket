// Require express
const express = require('express');
const {
  createItem, deleteItem, getItems, getItemById, updateItem
} = require('../controllers/items');

// Create a router object
const router = express.Router();

// Create verify Token
const verifyToken = require('../middleware/verifyToken');

// Add the routes and the controller function that should handle the request
router.get('/', getItems);
router.get('/:id', getItemById);


// Call the verify token function
router.use(verifyToken);

// Authenticated routes
router.post('/', createItem);
router.put('/', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;