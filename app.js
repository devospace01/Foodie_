// Food Data
const foodItems = [
    {
        id: 1,
        name: "Classic Cheese Burger",
        category: "burger",
        price: 499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
        location: "Mumbai, India"
    },
    {
        id: 2,
        name: "BBQ Chicken Pizza",
        category: "pizza",
        price: 850,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
        location: "Delhi, India"
    },
    {
        id: 3,
        name: "Creamy Alfredo Pasta",
        category: "pasta",
        price: 520,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1645112481338-3560e774a63e?auto=format&fit=crop&q=80&w=400",
        location: "Bangalore, India"
    },
    {
        id: 4,
        name: "Grilled Ribeye Steak",
        category: "steak",
        price: 1299,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=400",
        location: "Pune, India"
    },
    {
        id: 5,
        name: "Spicy Zinger Burger",
        category: "burger",
        price: 350,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1513185158878-8d8c196b7f88?auto=format&fit=crop&q=80&w=400",
        location: "Hyderabad, India"
    },
    {
        id: 6,
        name: "Margherita Pizza",
        category: "pizza",
        price: 699,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=400",
        location: "Chennai, India"
    }
];

let cart = [];
const foodGrid = document.getElementById('food-grid');
const cartCount = document.querySelector('.cart-count');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search-bar input');
const locationInput = document.querySelector('.search-location input');
const locationBtn = document.querySelector('.search-location button');
const deliveryBtns = document.querySelectorAll('.btn-option');
const cartModal = document.getElementById('cart-modal');
const cartToggle = document.getElementById('cart-toggle');
const closeModal = document.querySelector('.close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterBtn = document.querySelector('.newsletter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFoodItems(foodItems);
    setupFaq();
    setupLocationSearch();
    setupDeliveryToggle();
    setupCartModal();
    setupNewsletter();
    setupSmoothScroll();
});

// Display Food Items
function displayFoodItems(items) {
    foodGrid.innerHTML = items.map(item => `
        <div class="food-card" data-category="${item.category}">
            <span class="food-badge">Hot Deal</span>
            <img src="${item.image}" alt="${item.name}" class="food-img">
            <div class="food-info">
                <h3>${item.name}</h3>
                <p style="color: #888; font-size: 0.9rem; margin-bottom: 10px;">${item.location}</p>
                <div class="food-meta">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${item.rating}
                    </div>
                    <div class="price">₹${item.price}</div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price})">Add To Cart</button>
            </div>
        </div>
    `).join('');
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active btn
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        if (category === 'all') {
            displayFoodItems(foodItems);
        } else {
            const filtered = foodItems.filter(item => item.category === category);
            displayFoodItems(filtered);
        }
    });
});

// Search Logic (Refined)
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filter food items
    const filteredFood = foodItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    displayFoodItems(filteredFood);
    
    // Smooth scroll to menu if searching
    if (query.length > 2) {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }
});

// Cart Logic
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    showToast(`${name} added to cart!`);
}

function updateCartUI() {
    cartCount.innerText = cart.length;
    renderCartItems();
}

// Render Cart Items in Modal
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">Your cart is empty</p>';
        cartTotal.innerText = '₹0.00';
        return;
    }

    let total = 0;
    cartItemsList.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div>
                    <h4 style="margin: 0;">${item.name}</h4>
                    <span style="color: var(--primary); font-weight: 600;">₹${item.price.toFixed(2)}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
    
    cartTotal.innerText = `₹${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showToast("Item removed from cart");
}

// Cart Modal Interaction
function setupCartModal() {
    cartToggle.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCartItems();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
}

// FAQ Logic
function setupFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if not already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Location Search Logic
function setupLocationSearch() {
    locationBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            setTimeout(() => {
                locationBtn.innerHTML = 'Search';
                showToast(`Showing results for "${location}"`);
            }, 1500);
        } else {
            showToast("Please enter a location");
        }
    });
}

// Delivery/Pickup Toggle
function setupDeliveryToggle() {
    deliveryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deliveryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`Switched to ${btn.innerText}`);
        });
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = '0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// Animation CSS for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Newsletter Logic
function setupNewsletter() {
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            if (email && email.includes('@')) {
                newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    newsletterBtn.innerHTML = 'Subscribed!';
                    showToast("Thanks for subscribing!");
                    newsletterInput.value = '';
                }, 1500);
            } else {
                showToast("Please enter a valid email");
            }
        });
    }
}

// Smooth Scroll Logic
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Checkout Logic
const checkoutBtn = document.querySelector('.modal-footer .btn-primary');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                checkoutBtn.innerHTML = 'Checkout';
                cart = [];
                updateCartUI();
                cartModal.style.display = 'none';
                showToast("Order placed successfully! 🍕");
            }, 2000);
        } else {
            showToast("Your cart is empty!");
        }
    });
}
