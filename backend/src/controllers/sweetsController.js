const { Sweet } = require("../models");

// Add a new sweet (Admin only)
exports.createSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    return res.status(201).json(sweet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create sweet" });
  }
};

exports.create = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.json(sweet);
  } catch (err) {
    console.error(err);     // <-- ERROR WILL SHOW IN TERMINAL
    res.status(500).json({ error: "Failed to create sweet" });
  }
};


// Get all sweets
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.findAll();
    return res.json(sweets);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch sweets" });
  }
};

// Search sweets by name, category, or price range
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const where = {};

    if (name) where.name = name;
    if (category) where.category = category;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    const results = await Sweet.findAll({ where });
    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Search failed" });
  }
};

// Update a sweet (Admin only)
exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    await sweet.update(req.body);
    return res.json(sweet);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update sweet" });
  }
};

// Delete a sweet (Admin only)
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    await sweet.destroy();
    return res.json({ message: "Sweet deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete sweet" });
  }
};

// Purchase (decrease quantity)
exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    if (sweet.quantity <= 0)
      return res.status(400).json({ error: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();

    return res.json(sweet);
  } catch (err) {
    return res.status(500).json({ error: "Purchase failed" });
  }
};

// Restock sweet (Admin only)
exports.restockSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    const { amount } = req.body;
    sweet.quantity += Number(amount);

    await sweet.save();
    return res.json(sweet);
  } catch (err) {
    return res.status(500).json({ error: "Restock failed" });
  }
};
