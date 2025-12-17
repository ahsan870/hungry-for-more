// Pizza menu data
const pizzaMenu = [
    {
        id: 1,
        name: "Margherita",
        description: "Classic pizza with fresh tomato sauce, mozzarella cheese, and basil",
        price: 450,
        sizes: { small: 350, medium: 450, large: 600 },
        category: "classic",
        emoji: "🍕"
    },
    {
        id: 2,
        name: "Pepperoni",
        description: "Spicy pepperoni with mozzarella cheese and tomato sauce",
        price: 550,
        sizes: { small: 450, medium: 550, large: 700 },
        category: "classic",
        emoji: "🍕"
    },
    {
        id: 3,
        name: "BBQ Chicken",
        description: "Grilled chicken with BBQ sauce, red onions, and mozzarella",
        price: 650,
        sizes: { small: 550, medium: 650, large: 800 },
        category: "specialty",
        emoji: "🍕"
    },
    {
        id: 4,
        name: "Supreme",
        description: "Pepperoni, sausage, bell peppers, onions, mushrooms, and olives",
        price: 750,
        sizes: { small: 650, medium: 750, large: 950 },
        category: "specialty",
        emoji: "🍕"
    },
    {
        id: 5,
        name: "Hawaiian",
        description: "Ham, pineapple, and mozzarella cheese",
        price: 600,
        sizes: { small: 500, medium: 600, large: 750 },
        category: "specialty",
        emoji: "🍕"
    },
    {
        id: 6,
        name: "Veggie Delight",
        description: "Bell peppers, mushrooms, onions, olives, and tomatoes",
        price: 500,
        sizes: { small: 400, medium: 500, large: 650 },
        category: "veggie",
        emoji: "🍕"
    },
    {
        id: 7,
        name: "Cheese Lovers",
        description: "Extra mozzarella, cheddar, and parmesan cheese",
        price: 550,
        sizes: { small: 450, medium: 550, large: 700 },
        category: "classic",
        emoji: "🍕"
    },
    {
        id: 8,
        name: "Meat Lovers",
        description: "Pepperoni, sausage, ham, and bacon",
        price: 800,
        sizes: { small: 700, medium: 800, large: 1000 },
        category: "specialty",
        emoji: "🍕"
    },
    {
        id: 9,
        name: "Mushroom & Olive",
        description: "Fresh mushrooms, black olives, and mozzarella",
        price: 500,
        sizes: { small: 400, medium: 500, large: 650 },
        category: "veggie",
        emoji: "🍕"
    },
    {
        id: 10,
        name: "Spicy Chicken",
        description: "Spicy chicken, jalapeños, and mozzarella cheese",
        price: 650,
        sizes: { small: 550, medium: 650, large: 800 },
        category: "specialty",
        emoji: "🍕"
    },
    {
        id: 11,
        name: "Four Cheese",
        description: "Mozzarella, cheddar, parmesan, and feta cheese",
        price: 600,
        sizes: { small: 500, medium: 600, large: 750 },
        category: "veggie",
        emoji: "🍕"
    },
    {
        id: 12,
        name: "Buffalo Chicken",
        description: "Buffalo sauce, chicken, red onions, and blue cheese",
        price: 700,
        sizes: { small: 600, medium: 700, large: 850 },
        category: "specialty",
        emoji: "🍕"
    }
];

// Cart and order state
let cart = [];
let currentOrderType = 'delivery';
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    updateCartCount();
});

// Render menu items
function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const filteredMenu = currentFilter === 'all' 
        ? pizzaMenu 
        : pizzaMenu.filter(item => item.category === currentFilter);
    
    menuGrid.innerHTML = filteredMenu.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-image">${item.emoji}</div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-price">৳${item.price}</div>
                </div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-footer">
                    <div class="size-selector" data-item-id="${item.id}">
                        <button class="size-btn ${item.id === 1 ? 'active' : ''}" data-size="small" data-price="${item.sizes.small}" onclick="selectSize(${item.id}, 'small', ${item.sizes.small})">S</button>
                        <button class="size-btn active" data-size="medium" data-price="${item.sizes.medium}" onclick="selectSize(${item.id}, 'medium', ${item.sizes.medium})">M</button>
                        <button class="size-btn" data-size="large" data-price="${item.sizes.large}" onclick="selectSize(${item.id}, 'large', ${item.sizes.large})">L</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id}, 'medium', ${item.sizes.medium})">
                        Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter menu
function filterMenu(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderMenu();
}

// Select size
function selectSize(itemId, size, price) {
    const item = pizzaMenu.find(p => p.id === itemId);
    const sizeSelector = document.querySelector(`[data-item-id="${itemId}"]`);
    
    sizeSelector.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === size) {
            btn.classList.add('active');
        }
    });
    
    // Update add to cart button
    const menuItem = sizeSelector.closest('.menu-item');
    const addBtn = menuItem.querySelector('.add-to-cart-btn');
    addBtn.setAttribute('onclick', `addToCart(${itemId}, '${size}', ${price})`);
    
    // Update price display
    const priceDisplay = menuItem.querySelector('.menu-item-price');
    priceDisplay.textContent = `৳${price}`;
}

// Add to cart
function addToCart(itemId, size, price) {
    const item = pizzaMenu.find(p => p.id === itemId);
    const cartItem = {
        id: Date.now(),
        pizzaId: itemId,
        name: item.name,
        size: size,
        price: price,
        emoji: item.emoji
    };
    
    cart.push(cartItem);
    updateCartCount();
    updateCartDisplay();
    showNotification(`${item.name} (${size.toUpperCase()}) added to cart!`);
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartDisplay();
}

// Update cart count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-details">Size: ${item.size.toUpperCase()}</div>
            </div>
            <div class="cart-item-price">৳${item.price}</div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        updateCartDisplay();
    }
}

// Select order type
function selectOrderType(type) {
    currentOrderType = type;
    document.querySelectorAll('.order-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    const infoDiv = document.getElementById('order-type-info');
    if (type === 'delivery') {
        infoDiv.innerHTML = '<p>📍 Delivery available in Tangail city area</p>';
    } else {
        infoDiv.innerHTML = '<p>📍 Visit us at our store in Tangail city</p>';
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderType = currentOrderType === 'delivery' ? 'Delivery' : 'Pickup';
    
    const orderSummary = cart.map(item => 
        `• ${item.name} (${item.size.toUpperCase()}) - ৳${item.price}`
    ).join('\n');
    
    const message = `Thank you for your order!\n\nOrder Type: ${orderType}\n\nItems:\n${orderSummary}\n\nTotal: ৳${total}\n\nPlease call us at +880 1234-567890 to confirm your order.`;
    
    alert(message);
    
    // In a real application, you would send this to a server
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu functions
function toggleMobileMenu() {
    const nav = document.getElementById('main-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const nav = document.getElementById('main-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('main-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.header');
    
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !menuBtn.contains(event.target) &&
        !header.contains(event.target)) {
        closeMobileMenu();
    }
});

