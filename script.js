// Placeholder for future JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully!");
  
    // Add to cart functionality (example)
    const addToCartButtons = document.querySelectorAll(".btn-primary");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
        alert("Item added to cart!");
      });
    });
  });

  // تهيئة Swiper.js للصور المتحركة
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
  console.log("Website loaded successfully!");


  // دالة إضافة المنتجات إلى السلة
function addToCart(productName, productPrice) {
    // الحصول على السلة من localStorage أو إنشاء سلة جديدة
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // إضافة المنتج إلى السلة
    cart.push({ name: productName, price: productPrice });
  
    // حفظ السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // تحديث عدد المنتجات في السلة
    updateCartCount();
  }
  
  // تحديث عدد المنتجات في السلة
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
  
    // تحديث العدد في زر السلة
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
      cartCountElement.textContent = `Cart (${cartCount})`;
    }
  }
  
  // عرض محتويات السلة
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
  
    // إذا كانت السلة فارغة
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    // إضافة كل منتج إلى السلة
    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
      total += item.price;
      return `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5>${item.name}</h5>
            <p>$${item.price}</p>
          </div>
          <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
      `;
    }).join('');
  
    // إضافة المجموع الكلي
    cartItemsContainer.innerHTML += <div class="text-end"><h4>Total: $${total.toFixed(2)}</h4></div>;
  }
  
  // دالة لإزالة منتج من السلة
  function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
  
  // استدعاء دوال التحديث والعرض عند تحميل الصفحة
  window.onload = () => {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
      displayCart();
    }
  };


  // تعريف قائمة المنتجات
const products = [];
for (let i = 1; i <= 100; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: (Math.random() * 100 + 20).toFixed(2), // سعر عشوائي
    image: `images/product${i}.jpg`, // مسار الصور
    description: `This is the description for Product ${i}. It's a high-quality item that you'll love to wear.`,
  });
}


// عرض المنتجات
function displayProducts() {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = '';

  products.forEach(product => {
    // إنشاء كرت المنتج
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
        <h5>${product.name}</h5>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      </div>
    `;
    productsList.innerHTML += productCard;
  });
}

// دالة لإضافة المنتجات إلى السلة
function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price: productPrice });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// تحديث عداد السلة
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').textContent = `Cart (${cart.length})`;
}

// استدعاء الدوال عند تحميل الصفحة
window.onload = () => {
  displayProducts();
  updateCartCount();
};