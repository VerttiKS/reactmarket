// require the model
const items = require('../models/items');
const Joi = require('joi');  //Load the module which is a class

// Define the schema of the object
const itemInsertSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.string().min(4).required(),
  description: Joi.string().min(2).required(),
  image: Joi.string().min(2).required()
});

const itemUpdateSchema = Joi.object({
  id: Joi.number().required().integer(),
  name: Joi.string().min(2).required(),
  price: Joi.string().min(4).required(),
  description: Joi.string().min(2).required(),
  image: Joi.string().min(2).required()
});

const getItems = async (req, res) => {
  const response = await items.findItems();
  if (response) {
    res.json(response);
  }
};

const getItemById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const response = await items.findItemById(id);
    if (response) {
      res.send(response);
    }
    else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const createItem = async (req, res) => {

  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = itemInsertSchema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const item = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  }

  
  try {
    const result = await items.findByItem(item);
    if (result.length > 0) {
      res.status(400).send('Item exist');
      return;
    }

    const response = await items.createNewItem(item);
    if (response) {
      item.id = response.insertId;
      res.status(201).json(item);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const updateItem = async (req, res) => {

  try{
    // Validate the req.body against the schema
    // Validate returns an error object if there are validation errors
    const { error } = itemUpdateSchema.validate(req.body);
    if (error) {
      //Sending back the error details
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const item = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    };

    const result = await items.findItemById(item.id);
    if (result == null) {
      res.status(404).send('Not Found');
      return;
    }

    const response = await items.updateItemById(item);
    if (response) {
      res.json(item);
    }

  } catch (error){
    res.status(500).json({message: "Something went wrong"});
  }
};

const deleteItem = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  try {
    const result = await items.findItemById(id);
    if (result == null) {
      res.status(404).send('Not Found');
      return;
    }

    
    const response = await items.deleteItemById(id);
    if(response) {
      res.status(200).send("Item deleted");
    }

  } catch (err) {
    res.status(500).send("Something went wrong");
  } 
};

// export named functions
module.exports = {
  createItem,
  deleteItem,
  getItems,
  getItemById,
  updateItem
};