const express = require("express");
const router = express.Router();

const Product = require("../models/product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error.message);

    res.status(500).json({
      message: "Products fetch nahi ho sake",
      error: error.message,
    });
  }
});

// GET products by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;

    const products = await Product.find({
      category: categoryName.toLowerCase(),
    });

    res.status(200).json(products);
  } catch (error) {
    console.log("GET CATEGORY ERROR:", error.message);

    res.status(500).json({
      message: "Category products fetch nahi ho sake",
      error: error.message,
    });
  }
});

// POST - Add new product
router.post("/", async (req, res) => {
  try {
    const {
      productId,
      title,
      price,
      oldPrice,
      discount,
      rating,
      imageUrl,
      description,
      category,
      section,
    } = req.body;

    const newProduct = new Product({
      productId,
      title,
      price,
      oldPrice,
      discount,
      rating,
      imageUrl,
      description,
      category,
      section,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error.message);

    res.status(500).json({
      message: "Product add nahi ho saka",
      error: error.message,
    });
  }
});

module.exports = router;