const express = require('express');
const router = express.Router();
const { createCategory, listCategory, deleteCategory } = require('../controller/category');

router.post('/category', createCategory);
router.get('/category', listCategory);
router.delete('/category/:id', deleteCategory);


module.exports = router;