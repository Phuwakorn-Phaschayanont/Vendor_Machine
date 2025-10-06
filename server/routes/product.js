const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getProductsByCategory,
    purchaseProduct,
    getCategories,
    updateStock
} = require('../controller/product');

// Product routes
router.get('/products', getProducts);
router.get('/products/category/:category', getProductsByCategory);
router.get('/products/:id', getProductById);
router.post('/purchase/:id', purchaseProduct);
router.get('/categories', getCategories);
router.put('/products/:id/stock', updateStock);

module.exports = router;