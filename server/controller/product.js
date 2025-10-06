// Product Controller for Vending Machine
// Using localStorage simulation for demo purposes

const products = [
    {
        id: 1,
        name: 'โดรายากิ ช็อกโกแลต',
        price: 35,
        category: 'โดรายากิ',
        image: '/images/Nolayer_edit_Dorayaki_Chocolate_2021.png',
        stock: 10,
        description: 'โดรายากิไส้ช็อกโกแลตหวานหอม'
    },
    {
        id: 2,
        name: 'โดรายากิ ช็อกโกแลตชิป',
        price: 40,
        category: 'โดรายากิ',
        image: '/images/Nolayer_edit_Dorayaki_ChocolateChipCream_2021.png',
        stock: 8,
        description: 'โดรายากิไส้ช็อกโกแลตชิปครีม'
    },
    {
        id: 3,
        name: 'โดรายากิ คัสตาร์ดครีม',
        price: 38,
        category: 'โดรายากิ',
        image: '/images/Nolayer_edit_Dorayaki_Cream-Custard_2022.png',
        stock: 12,
        description: 'โดรายากิไส้คัสตาร์ดครีมนุ่มนวล'
    },
    {
        id: 4,
        name: 'โดรายากิ อัลมอนด์ครีม',
        price: 42,
        category: 'โดรายากิ',
        image: '/images/Nolayer_edit_Dorayaki_Creamy-Almond_2021.png',
        stock: 6,
        description: 'โดรายากิไส้อัลมอนด์ครีมหอมอร่อย'
    },
    {
        id: 5,
        name: 'ขนมปังไส้ถั่วแดง',
        price: 25,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_RedbeanFilled.png',
        stock: 15,
        description: 'ขนมปังนุ่มไส้ถั่วแดงหวานหอม'
    },
    {
        id: 6,
        name: 'ขนมปังไส้ถั่วดำ',
        price: 25,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_BlackbeanFilled.png',
        stock: 10,
        description: 'ขนมปังนุ่มไส้ถั่วดำหอมหวาน'
    },
    {
        id: 7,
        name: 'ขนมปังไส้ช็อกโกแลต',
        price: 30,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_ChocolateFilled.png',
        stock: 12,
        description: 'ขนมปังนุ่มไส้ช็อกโกแลตเข้มข้น'
    },
    {
        id: 8,
        name: 'ขนมปังไส้มะพร้าวใบเตย',
        price: 28,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_CoconutPandanFilled.png',
        stock: 8,
        description: 'ขนมปังไส้มะพร้าวใบเตยหอมหวาน'
    },
    {
        id: 9,
        name: 'ขนมปังไส้มะพร้าวเผือก',
        price: 28,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_CoconutTaroFilled.png',
        stock: 9,
        description: 'ขนมปังไส้มะพร้าวเผือกครีมมี่'
    },
    {
        id: 10,
        name: 'ขนมปังไส้ถั่วแดงบัวลอย',
        price: 32,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_RedbeanLotusSeedFilled.png',
        stock: 7,
        description: 'ขนมปังไส้ถั่วแดงเมล็ดบัว'
    },
    {
        id: 11,
        name: 'ขนมปังไส้เผือก',
        price: 26,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_TaroFilled.png',
        stock: 11,
        description: 'ขนมปังนุ่มไส้เผือกครีมมี่'
    },
    {
        id: 12,
        name: 'ขนมปังไส้คัสตาร์ดไทย',
        price: 30,
        category: 'ขนมปังไส้หวาน',
        image: '/images/Nolayer_2021_ThaicustardFilled.png',
        stock: 10,
        description: 'ขนมปังไส้คัสตาร์ดไทยแท้'
    },
    {
        id: 13,
        name: 'แซนด์วิชปูอัด',
        price: 45,
        category: 'แซนด์วิช',
        image: '/images/Nolayer_2024_Crabstick_Sandwich.png',
        stock: 6,
        description: 'แซนด์วิชปูอัดสดใหม่'
    },
    {
        id: 14,
        name: 'แซนด์วิชหมูมายองเนส',
        price: 42,
        category: 'แซนด์วิช',
        image: '/images/Nolayer_2024_Pork_Mayonnaise.png',
        stock: 8,
        description: 'แซนด์วิชหมูมายองเนสอร่อย'
    },
    {
        id: 15,
        name: 'แซนด์วิชไก่ฉีกพริก',
        price: 40,
        category: 'แซนด์วิช',
        image: '/images/Nolayer_2024_Shreded_chicken_chili.png',
        stock: 9,
        description: 'แซนด์วิชไก่ฉีกรสเผ็ด'
    },
    {
        id: 16,
        name: 'แซนด์วิชทูน่ามายองเนส',
        price: 38,
        category: 'แซนด์วิช',
        image: '/images/Nolayer_2024_Tuna_Mayonnaise.png',
        stock: 10,
        description: 'แซนด์วิชทูน่ามายองเนสสดชื่น'
    },
    {
        id: 17,
        name: 'โดนัทเค้กช็อกโกแลต',
        price: 35,
        category: 'โดนัท',
        image: '/images/Nolayer_Donut-Cake-Chocolate_2022.png',
        stock: 8,
        description: 'โดนัทเค้กช็อกโกแลตหวานหอม'
    },
    {
        id: 18,
        name: 'โดนัทเค้กคัสตาร์ดไทย',
        price: 32,
        category: 'โดนัท',
        image: '/images/Nolayer_Donut-Cake-ThaiCustard_2022.png',
        stock: 9,
        description: 'โดนัทเค้กไส้คัสตาร์ดไทย'
    },
    {
        id: 19,
        name: 'โดนัทวานิลลา',
        price: 28,
        category: 'โดนัท',
        image: '/images/Nolayer_Donut-Vanilla_2022.png',
        stock: 12,
        description: 'โดนัทวานิลลาคลาสสิค'
    }
];

// Get all products
exports.getProducts = (req, res) => {
    try {
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า',
            error: error.message
        });
    }
};

// Get product by ID
exports.getProductById = (req, res) => {
    try {
        const { id } = req.params;
        const product = products.find(p => p.id === parseInt(id));
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบสินค้าที่ต้องการ'
            });
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า',
            error: error.message
        });
    }
};

// Get products by category
exports.getProductsByCategory = (req, res) => {
    try {
        const { category } = req.params;
        const filteredProducts = products.filter(p => 
            p.category.toLowerCase().includes(category.toLowerCase())
        );
        
        res.json({
            success: true,
            data: filteredProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า',
            error: error.message
        });
    }
};

// Purchase product (reduce stock)
exports.purchaseProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { quantity = 1 } = req.body;
        const productIndex = products.findIndex(p => p.id === parseInt(id));
        
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบสินค้าที่ต้องการ'
            });
        }
        
        const product = products[productIndex];
        
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'สินค้าไม่เพียงพอ',
                availableStock: product.stock
            });
        }
        
        // Reduce stock
        products[productIndex].stock -= quantity;
        
        res.json({
            success: true,
            message: 'ซื้อสินค้าสำเร็จ',
            data: {
                product: products[productIndex],
                purchasedQuantity: quantity,
                totalPrice: product.price * quantity
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการซื้อสินค้า',
            error: error.message
        });
    }
};

// Update product stock (admin function)
exports.updateStock = (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const productIndex = products.findIndex(p => p.id === parseInt(id));
        
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบสินค้าที่ต้องการ'
            });
        }
        
        products[productIndex].stock = stock;
        
        res.json({
            success: true,
            message: 'อัพเดทจำนวนสินค้าสำเร็จ',
            data: products[productIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัพเดทสินค้า',
            error: error.message
        });
    }
};

// Get unique categories
exports.getCategories = (req, res) => {
    try {
        const categories = [...new Set(products.map(p => p.category))];
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่',
            error: error.message
        });
    }
};