class VendingMachine {
    constructor() {
        this.cart = [];
        this.insertedMoney = 0;
        this.selectedPaymentMethod = null;
        this.currentCategory = 'all';
        
        this.initializeData();
        this.init();
    }
    
    initializeData() {
        // เริ่มต้นสินค้า ถ้ายังไม่มีใน localStorage
        if (!localStorage.getItem('vendingProducts')) {
            const initialProducts = [
                // โดนัท
                { id: 1, name: 'โดนัทไส้คัสตาร์ดช็อกโกแลต', price: 25, stock: 15, category: 'donut', image: '/images/Nolayer_Donut-Cake-Chocolate_2022.png' },
                { id: 2, name: 'โดนัทไส้สังขยา', price: 25, stock: 12, category: 'donut', image: '/images/Nolayer_Donut-Cake-ThaiCustard_2022.png' },
                { id: 3, name: 'โดนัทไส้คัสตาร์ดวานิลลา', price: 20, stock: 18, category: 'donut', image: '/images/Nolayer_Donut-Vanilla_2022.png' },
                
                // โดรายากิ
                { id: 4, name: 'โดรายากิไส้ช็อกโกแลต', price: 35, stock: 10, category: 'dorayaki', image: '/images/Nolayer_edit_Dorayaki_Chocolate_2021.png' },
                { id: 5, name: 'โดรายากิไส้ครีมช็อกโกแลตชิพ', price: 40, stock: 8, category: 'dorayaki', image: '/images/Nolayer_edit_Dorayaki_ChocolateChipCream_2021.png' },
                { id: 6, name: 'โดรายากิไส้คัสตาร์ดครีม', price: 35, stock: 12, category: 'dorayaki', image: '/images/Nolayer_edit_Dorayaki_Cream-Custard_2022.png' },
                { id: 7, name: 'โดรายากิไส้ครีมอัลมอนด์', price: 45, stock: 6, category: 'dorayaki', image: '/images/Nolayer_edit_Dorayaki_Creamy-Almond_2021.png' },

                // ขนมปังไส้
                { id: 8, name: 'ขนมปังไส้งาดำถั่วแดง', price: 30, stock: 14, category: 'filled', image: '/images/Nolayar_2021_RedbeanBlacksesameFilled.png' },
                { id: 9, name: 'ขนมปังไส้ถั่วดำ', price: 25, stock: 16, category: 'filled', image: '/images/Nolayer_2021_BlackbeanFilled.png' },
                { id: 10, name: 'ขนมปังไส้คัสตาร์ดช็อกโกแลต', price: 35, stock: 11, category: 'filled', image: '/images/Nolayer_2021_ChocolateFilled.png' },
                { id: 11, name: 'ขนมปังไส้สังขยามะพร้าว', price: 30, stock: 13, category: 'filled', image: '/images/Nolayer_2021_CoconutPandanFilled.png' },
                { id: 12, name: 'ขนมปังไส้เผือกมะพร้าว', price: 30, stock: 9, category: 'filled', image: '/images/Nolayer_2021_CoconutTaroFilled.png' },
                { id: 13, name: 'ขนมปังไส้ถั่วแดง', price: 25, stock: 17, category: 'filled', image: '/images/Nolayer_2021_RedbeanFilled.png' },
                { id: 14, name: 'ขนมปังไส้ลูกบัวถั่วแดง', price: 35, stock: 7, category: 'filled', image: '/images/Nolayer_2021_RedbeanLotusSeedFilled.png' },
                { id: 15, name: 'ขนมปังไส้เผือก', price: 30, stock: 12, category: 'filled', image: '/images/Nolayer_2021_TaroFilled.png' },
                { id: 16, name: 'ขนมปังไส้สังขยา', price: 35, stock: 10, category: 'filled', image: '/images/Nolayer_2021_ThaicustardFilled.png' },
                
                // แซนด์วิช
                { id: 17, name: 'แซนด์วิชปูอัดมายองเนส', price: 45, stock: 8, category: 'sandwich', image: '/images/Nolayer_2024_Crabstick_Sandwich.png' },
                { id: 18, name: 'แซนด์วิชหมูหยองมายองเนส', price: 40, stock: 12, category: 'sandwich', image: '/images/Nolayer_2024_Pork_Mayonnaise.png' },
                { id: 19, name: 'แซนด์วิชไก่หยองน้ำพริกเผา', price: 45, stock: 9, category: 'sandwich', image: '/images/Nolayer_2024_Shreded_chicken_chili.png' },
                { id: 20, name: 'แซนด์วิชทูน่ามายองเนส', price: 40, stock: 11, category: 'sandwich', image: '/images/Nolayer_2024_Tuna_Mayonnaise.png' }
            ];
            localStorage.setItem('vendingProducts', JSON.stringify(initialProducts));
        }
        
        // เริ่มต้นหมวดหมู่สินค้า ถ้ายังไม่มีใน localStorage
        if (!localStorage.getItem('vendingCategories')) {
            const initialCategories = [
                { id: 'all', name: 'สินค้าทั้งหมด', icon: 'fas fa-th' },
                { id: 'donut', name: 'โดนัทเค้ก', icon: 'fas fa-circle' },
                { id: 'dorayaki', name: 'โดรายากิ', icon: 'fas fa-cookie' },
                { id: 'filled', name: 'ขนมปัง', icon: 'fas fa-bread-slice' },
                { id: 'sandwich', name: 'เดลี่แซนด์วิช', icon: 'fas fa-hamburger' }
            ];
            localStorage.setItem('vendingCategories', JSON.stringify(initialCategories));
        }
        
        if (!localStorage.getItem('vendingSales')) {
            localStorage.setItem('vendingSales', JSON.stringify([]));
        }
    }
    
    async init() {
        this.bindEvents();
        await this.loadCategories();
        await this.loadProducts();
        this.updateCartDisplay();
    }
    
    bindEvents() {
        // ค้นหาสินค้า
        document.getElementById('search').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });
        
        // ปุ่มเพิ่มเงิน
        document.addEventListener('click', (e) => {
            if (e.target.closest('.success-modal')) {
                this.hideSuccessModal();
            }
        });
    }
    
    async loadCategories() {
        try {
            const categories = JSON.parse(localStorage.getItem('vendingCategories') || '[]');
            const categoriesContainer = document.getElementById('categories');
            
            categoriesContainer.innerHTML = '';
            
            categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = `category-item ${category.id === this.currentCategory ? 'active' : ''}`;
                categoryElement.innerHTML = `
                    <i class="${category.icon}"></i>
                    ${category.name}
                `;
                categoryElement.addEventListener('click', () => this.selectCategory(category.id, category.name));
                categoriesContainer.appendChild(categoryElement);
            });
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }
    
    async loadProducts(category = 'all') {
        try {
            const products = JSON.parse(localStorage.getItem('vendingProducts') || '[]');
            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            
            this.displayProducts(filteredProducts);
        } catch (error) {
            console.error('Error loading products:', error);
            this.displayProducts([]);
        }
    }
    
    displayProducts(products) {
        const productsContainer = document.getElementById('products');
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d; margin-top: 50px;">ไม่พบสินค้า</p>';
            return;
        }
        
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <i class="fas fa-bread-slice" style="display: none;"></i>
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <div class="price">${product.price} ฿</div>
                    <div class="stock ${product.stock === 0 ? 'out-of-stock' : ''}">
                        ${product.stock > 0 ? `เหลือ ${product.stock} ชิ้น` : 'สินค้าหมด'}
                    </div>
                </div>
            `;
            
            if (product.stock > 0) {
                productElement.addEventListener('click', () => this.addToCart(product));
            } else {
                productElement.style.opacity = '0.5';
                productElement.style.cursor = 'not-allowed';
            }
            
            productsContainer.appendChild(productElement);
        });
    }
    
    selectCategory(categoryId, categoryName) {
        this.currentCategory = categoryId;
        document.getElementById('current-category').textContent = categoryName;
        
        // อัพเดตสถานะปุ่ม
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.closest('.category-item').classList.add('active');
        
        this.loadProducts(categoryId);
    }
    
    searchProducts(searchTerm) {
        const products = JSON.parse(localStorage.getItem('vendingProducts') || '[]');
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayProducts(filteredProducts);
    }
    
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert('สินค้าไม่เพียงพอ');
                return;
            }
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartDisplay();
        this.showAddToCartAnimation();
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
    }
    
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            const product = JSON.parse(localStorage.getItem('vendingProducts') || '[]').find(p => p.id === productId);
            if (newQuantity <= product.stock && newQuantity > 0) {
                item.quantity = newQuantity;
                this.updateCartDisplay();
            } else if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                alert('สินค้าไม่เพียงพอ');
            }
        }
    }
    
    updateCartDisplay() {
        const cartContainer = document.getElementById('cart-items');
        const totalAmount = document.getElementById('total-amount');
        
        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>ยังไม่มีสินค้าในรถเข็น</p>
                </div>
            `;
        } else {
            cartContainer.innerHTML = '';
            this.cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <div class="cart-price">${item.price * item.quantity} ฿</div>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="vendingMachine.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="vendingMachine.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                `;
                cartContainer.appendChild(cartItem);
            });
        }
        
        // อัพเดตยอดรวม
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `${total} ฿`;

        // อัพเดตสถานะปุ่มชำระเงิน
        this.updatePaymentButtonStates();
    }
    
    updatePaymentButtonStates() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const paymentButtons = document.querySelectorAll('.payment-btn');
        
        paymentButtons.forEach(btn => {
            btn.disabled = total === 0;
        });
    }
    
    showAddToCartAnimation() {
        // ไอคอนตะกร้าสินค้า
        const cartIcon = document.querySelector('.cart-section h3 i');
        cartIcon.style.transform = 'scale(1.2)';
        cartIcon.style.color = '#f39c12';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
            cartIcon.style.color = '';
        }, 300);
    }
    
    // ชำระเงิน
    payWithCash() {
        if (this.cart.length === 0) return;
        
        this.selectedPaymentMethod = 'cash';
        this.insertedMoney = 0;
        
        // แสดงอินพุตเงินสด
        document.getElementById('cash-input').style.display = 'block';
        this.updateInsertedMoneyDisplay();
        this.updateConfirmButtonState();
    }
    
    payWithQR() {
        if (this.cart.length === 0) return;
        
        this.selectedPaymentMethod = 'qr';
        // แสดงอินพุต QR Code
        this.showQRPaymentDialog();
    }
    
    addMoney(amount) {
        this.insertedMoney += amount;
        this.updateInsertedMoneyDisplay();
        this.updateConfirmButtonState();
    }
    
    updateInsertedMoneyDisplay() {
        document.getElementById('inserted-money').textContent = this.insertedMoney;
    }
    
    updateConfirmButtonState() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const confirmBtn = document.querySelector('.confirm-payment-btn');
        
        if (this.insertedMoney >= total) {
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'ยืนยันการชำระเงิน';
        } else {
            confirmBtn.disabled = true;
            confirmBtn.textContent = `ขาดอีก ${total - this.insertedMoney} ฿`;
        }
    }
    
    confirmPayment() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (this.insertedMoney >= total) {
            const change = this.insertedMoney - total;
            this.processPayment(change);
        }
    }
    
    showQRPaymentDialog() {
        if (confirm('กรุณาสแกน QR Code ด้วยแอพธนาคารของคุณ\n\nกด OK เมื่อโอนเงินเรียบร้อยแล้ว')) {
            // เวลาประมวลผล
            setTimeout(() => {
                if (Math.random() > 0.05) { 
                    this.processPayment(0);
                } else {
                    alert('ไม่พบการโอนเงิน กรุณาลองใหม่อีกครั้ง');
                }
            }, 1500);
        }
    }
    
    processPayment(change) {
        // อัพเดตสต็อกสินค้า
        this.updateStock();
        
        // บันทึกประวัติการขาย
        this.saveSaleRecord(change);
        
        // รีเซ็ตตะกร้าและการชำระเงิน
        this.cart = [];
        this.insertedMoney = 0;
        this.selectedPaymentMethod = null;
        
        // ซ่อนอินพุตเงินสด
        document.getElementById('cash-input').style.display = 'none';
        
        // อัพเดตการแสดงผล
        this.updateCartDisplay();
        this.updateInsertedMoneyDisplay();
        
        // แสดงโมดัลความสำเร็จ
        this.showSuccessModal(change);
        
        // จำลองการจ่ายสินค้า
        this.simulateDispensing();
    }
    
    updateStock() {
        const products = JSON.parse(localStorage.getItem('vendingProducts') || '[]');
        
        this.cart.forEach(cartItem => {
            const productIndex = products.findIndex(p => p.id === cartItem.id);
            if (productIndex !== -1) {
                products[productIndex].stock -= cartItem.quantity;
            }
        });
        
        localStorage.setItem('vendingProducts', JSON.stringify(products));
        this.loadProducts(this.currentCategory);
    }
    
    saveSaleRecord(change) {
        const sales = JSON.parse(localStorage.getItem('vendingSales') || '[]');
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const saleRecord = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...this.cart],
            total: total,
            paymentMethod: this.selectedPaymentMethod,
            change: change,
            amountPaid: this.selectedPaymentMethod === 'cash' ? this.insertedMoney : total
        };
        
        sales.push(saleRecord);
        localStorage.setItem('vendingSales', JSON.stringify(sales));
    }
    
    showSuccessModal(change) {
        const modal = document.getElementById('success-modal');
        const changeAmount = document.getElementById('change-amount');

        if (change > 0) {
            const denominations = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
            let remain = change;
            let detail = [];
            denominations.forEach(denom => {
                const count = Math.floor(remain / denom);
                if (count > 0) {
                    detail.push(`${denom >= 20 ? 'ธนบัตร' : 'เหรียญ'} ${denom} ฿ x ${count}`);
                    remain -= denom * count;
                }
            });
            changeAmount.innerHTML = `เงินทอน :<br>` + detail.join('<br>');
        } else {
            changeAmount.textContent = '';
        }
        modal.style.display = 'block';
    }
    
    hideSuccessModal() {
        document.getElementById('success-modal').style.display = 'none';
    }
    
    simulateDispensing() {
        const slot = document.querySelector('.dispensing-slot');
        const light = document.querySelector('.slot-light');
        
        light.style.background = '#f39c12';
        light.style.boxShadow = '0 0 15px #f39c12';
        slot.style.animation = 'shake 0.5s ease-in-out 3';
        
        setTimeout(() => {
            light.style.background = '#27ae60';
            light.style.boxShadow = '0 0 15px #27ae60';
            slot.style.animation = '';
        }, 2000);
    }
}

function payWithCash() {
    vendingMachine.payWithCash();
}

function payWithCard() {
    vendingMachine.payWithCard();
}

function payWithQR() {
    vendingMachine.payWithQR();
}

function addMoney(amount) {
    vendingMachine.addMoney(amount);
}

function confirmPayment() {
    vendingMachine.confirmPayment();
}

function closeModal() {
    vendingMachine.hideSuccessModal();
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

let vendingMachine;
document.addEventListener('DOMContentLoaded', () => {
    vendingMachine = new VendingMachine();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        vendingMachine.hideSuccessModal();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}