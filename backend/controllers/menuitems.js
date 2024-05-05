// require the model
const menuitems = require('../models/menuitems');
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

const getMenuItems = async (req, res) => {
  const response = await menuitems.findMenuItems();
  if (response) {
    res.json(response);
  }
};

const getMenuItemById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const response = await menuitems.findMenuItemById(id);
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

const createMenuItem = async (req, res) => {

  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = itemInsertSchema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const menuitem = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  }

  
  try {
    const result = await menuitems.findByMenuItem(menuitem);
    if (result.length > 0) {
      res.status(400).send('MenuItem exist');
      return;
    }

    const response = await menuitems.createNewMenuItem(menuitem);
    if (response) {
      menuitem.id = response.insertId;
      res.status(201).json(menuitem);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const updateMenuItem = async (req, res) => {

  try{
    // Validate the req.body against the schema
    // Validate returns an error object if there are validation errors
    const { error } = itemUpdateSchema.validate(req.body);
    if (error) {
      //Sending back the error details
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const menuitem = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    };

    const result = await menuitems.findMenuItemById(menuitem.id);
    if (result == null) {
      res.status(404).send('Not Found');
      return;
    }

    const response = await menuitems.updateMenuItemById(menuitem);
    if (response) {
      res.json(menuitem);
    }

  } catch (error){
    res.status(500).json({message: "Something went wrong"});
  }
};

const deleteMenuItem = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  try {
    const result = await menuitems.findMenuItemById(id);
    if (result == null) {
      res.status(404).send('Not Found');
      return;
    }

    
    const response = await menuitems.deleteMenuItemById(id);
    if(response) {
      res.status(200).send("MenuItem deleted");
    }

  } catch (err) {
    res.status(500).send("Something went wrong");
  } 
};

// export named functions
module.exports = {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem
};