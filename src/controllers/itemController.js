const Item = require('../models/Item');
const { validationResult } = require('express-validator');

// Create an item
exports.createItem = async (req, res) => {
  const { name, description } = req.body;

  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validasi keberadaan userId
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'User ID is required for this action.' });
  }

  try {
    const newItem = new Item({
      name,
      description,
      userId: req.user.id, // Ambil ID dari req.user
    });
    const savedItem = await newItem.save();
    res.status(201).json({
      message: 'Item created successfully',
      data: savedItem,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    } else {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id }).populate('userId', 'name email');

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
