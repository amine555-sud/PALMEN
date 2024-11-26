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