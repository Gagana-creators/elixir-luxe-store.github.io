/**
 * ÉLIXIR & SOIE — Maison de Haute Beauté & Joaillerie
 * Main Interactive Application Controller
 */

// Application State
const state = {
  activeCategory: "all",
  activeSort: "featured",
  searchQuery: "",
  currentCurrency: "USD",
  cart: [],
  wishlist: [],
  selectedQuickViewProduct: null,
  selectedFreeSampleIds: []
};

// DOM Selectors
const DOM = {
  productsGrid: document.getElementById("products-grid"),
  productsCount: document.getElementById("products-count"),
  categoryFilters: document.getElementById("category-filters"),
  sortSelect: document.getElementById("sort-select"),
  currencySelect: document.getElementById("currency-select"),
  
  // Cart Drawer
  cartDrawer: document.getElementById("cart-drawer"),
  cartBackdrop: document.getElementById("cart-backdrop"),
  cartItemsContainer: document.getElementById("cart-items-container"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  cartTotal: document.getElementById("cart-total"),
  cartBadgeCount: document.getElementById("cart-badge-count"),
  cartItemsCountText: document.getElementById("cart-items-count-text"),
  shippingThresholdBar: document.getElementById("shipping-threshold-bar"),
  shippingThresholdText: document.getElementById("shipping-threshold-text"),
  
  // Wishlist Drawer
  wishlistDrawer: document.getElementById("wishlist-drawer"),
  wishlistBackdrop: document.getElementById("wishlist-backdrop"),
  wishlistItemsContainer: document.getElementById("wishlist-items-container"),
  wishlistBadgeCount: document.getElementById("wishlist-badge-count"),
  
  // Quick View Modal
  quickViewModal: document.getElementById("quick-view-modal"),
  quickViewBackdrop: document.getElementById("quick-view-backdrop"),
  quickViewContent: document.getElementById("quick-view-content"),
  
  // Search Overlay
  searchOverlay: document.getElementById("search-overlay"),
  searchInput: document.getElementById("search-input"),
  searchResults: document.getElementById("search-results"),
  
  // VIP Consultation Modal
  vipModal: document.getElementById("vip-modal"),
  vipBackdrop: document.getElementById("vip-backdrop"),
  vipForm: document.getElementById("vip-form"),
  
  // Checkout Modal
  checkoutModal: document.getElementById("checkout-modal"),
  checkoutBackdrop: document.getElementById("checkout-backdrop"),
  checkoutItemsList: document.getElementById("checkout-items-list"),
  checkoutSubtotal: document.getElementById("checkout-subtotal"),
  checkoutTotal: document.getElementById("checkout-total"),
  
  // Toast container
  toastContainer: document.getElementById("toast-container")
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
});

// Load localStorage persistence
function loadStoredData() {
  try {
    const savedCart = localStorage.getItem("elixir_soie_cart");
    if (savedCart) state.cart = JSON.parse(savedCart);
    
    const savedWishlist = localStorage.getItem("elixir_soie_wishlist");
    if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
    
    const savedCurrency = localStorage.getItem("elixir_soie_currency");
    if (savedCurrency && CURRENCY_RATES[savedCurrency]) {
      state.currentCurrency = savedCurrency;
      if (DOM.currencySelect) DOM.currencySelect.value = savedCurrency;
    }
  } catch (err) {
    console.warn("Storage loading warning:", err);
  }
}

function persistCart() {
  try {
    localStorage.setItem("elixir_soie_cart", JSON.stringify(state.cart));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

function persistWishlist() {
  try {
    localStorage.setItem("elixir_soie_wishlist", JSON.stringify(state.wishlist));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// ==========================================================================
// Currency Formatter
// ==========================================================================
function formatPrice(usdPrice) {
  if (usdPrice === null || usdPrice === undefined) return "";
  const info = CURRENCY_RATES[state.currentCurrency] || CURRENCY_RATES.USD;
  const converted = usdPrice * info.rate;
  
  if (state.currentCurrency === "JPY") {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// ==========================================================================
// Product Catalog Rendering
// ==========================================================================
function getFilteredAndSortedProducts() {
  let list = [...LUXURY_PRODUCTS];

  // Category filter
  if (state.activeCategory !== "all") {
    list = list.filter(p => p.category === state.activeCategory);
  }

  // Search filter
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      (p.details && p.details.some(d => d.toLowerCase().includes(q)))
    );
  }

  // Sort
  if (state.activeSort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.activeSort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.activeSort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    // Default featured: bestsellers first
    list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }

  return list;
}

function renderProducts() {
  if (!DOM.productsGrid) return;
  const products = getFilteredAndSortedProducts();

  if (DOM.productsCount) {
    DOM.productsCount.textContent = `Showing ${products.length} of ${LUXURY_PRODUCTS.length} Masterpieces`;
  }

  if (products.length === 0) {
    DOM.productsGrid.innerHTML = `
      <div class="col-span-full text-center py-20 px-4 glass-panel rounded-sm">
        <i class="fas fa-gem text-gold text-4xl mb-4 opacity-60"></i>
        <h3 class="font-serif text-2xl text-alabaster mb-2">No Acquisitions Found</h3>
        <p class="text-sm text-muted max-w-md mx-auto mb-6">
          We could not find any creations matching your specific search query or active filter.
        </p>
        <button onclick="resetFilters()" class="btn-gold">
          View All Creations
        </button>
      </div>
    `;
    return;
  }

  DOM.productsGrid.innerHTML = products.map(product => {
    const isWishlisted = state.wishlist.some(id => id === product.id);
    const originalPriceHtml = product.originalPrice 
      ? `<span class="text-xs text-muted line-through mr-2">${formatPrice(product.originalPrice)}</span>` 
      : "";

    return `
      <div class="product-card group flex flex-col justify-between" data-product-id="${product.id}">
        <!-- Image & Actions Container -->
        <div class="product-image-container relative">
          <!-- Badges -->
          <div class="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            ${product.badge ? `<span class="badge-gold">${product.badge}</span>` : ""}
          </div>

          <!-- Wishlist Toggle -->
          <button 
            type="button" 
            class="wishlist-toggle ${isWishlisted ? "in-wishlist" : ""}" 
            onclick="toggleWishlist('${product.id}')"
            title="${isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}"
            aria-label="Save to Wishlist"
          >
            <i class="${isWishlisted ? "fas" : "far"} fa-heart text-sm"></i>
          </button>

          <!-- Imagery -->
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="primary-img w-full h-full object-cover object-center"
            loading="lazy"
          />
          <img 
            src="${product.secondaryImage}" 
            alt="${product.name} alternate view" 
            class="secondary-img w-full h-full object-cover object-center"
            loading="lazy"
          />

          <!-- Quick Action Hover Bar -->
          <div class="product-card-actions">
            <button 
              type="button" 
              onclick="openQuickView('${product.id}')" 
              class="flex-1 py-2.5 px-3 bg-[#111116]/95 hover:bg-gold text-alabaster hover:text-black border border-gold/40 text-[10px] tracking-[0.14em] uppercase font-semibold transition-all flex items-center justify-center gap-1.5 backdrop-blur-md"
            >
              <i class="far fa-eye"></i> Quick View
            </button>
            <button 
              type="button" 
              onclick="addToCart('${product.id}', 1)" 
              class="flex-1 py-2.5 px-3 btn-gold text-[10px] tracking-[0.14em] font-semibold flex items-center justify-center gap-1.5"
            >
              <i class="fas fa-shopping-bag"></i> Acquire
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-5 flex flex-col flex-1 justify-between bg-[#111115]">
          <div>
            <div class="flex items-center justify-between text-[11px] text-gold/80 uppercase tracking-widest font-sans mb-1.5">
              <span>${product.categoryLabel}</span>
              <div class="flex items-center gap-1 text-gold">
                <i class="fas fa-star text-[10px]"></i>
                <span class="text-xs font-semibold text-pearl">${product.rating.toFixed(1)}</span>
                <span class="text-[10px] text-muted">(${product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              class="font-serif text-lg text-alabaster font-normal tracking-wide group-hover:text-gold transition-colors cursor-pointer mb-2 line-clamp-1"
              onclick="openQuickView('${product.id}')"
            >
              ${product.name}
            </h3>

            <p class="text-xs text-muted font-light line-clamp-2 mb-4 leading-relaxed">
              ${product.shortDescription}
            </p>
          </div>

          <div class="pt-3 border-t border-gold/15 flex items-center justify-between">
            <div class="flex items-baseline">
              ${originalPriceHtml}
              <span class="font-serif text-xl font-medium text-gold">${formatPrice(product.price)}</span>
            </div>
            <span class="text-[10px] text-[#A69E8C] uppercase tracking-wider font-sans">
              ${product.stockStatus.includes("Stock") ? "In Atelier" : "Made to Order"}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Reset filters
window.resetFilters = function() {
  state.activeCategory = "all";
  state.searchQuery = "";
  state.activeSort = "featured";
  
  if (DOM.searchInput) DOM.searchInput.value = "";
  if (DOM.sortSelect) DOM.sortSelect.value = "featured";
  
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === "all");
  });
  
  renderProducts();
};

// ==========================================================================
// Quick View Modal
// ==========================================================================
window.openQuickView = function(productId) {
  const product = LUXURY_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.selectedQuickViewProduct = product;
  
  const galleryHtml = product.gallery.map((imgUrl, idx) => `
    <button 
      type="button" 
      onclick="setQuickViewMainImage('${imgUrl}', this)" 
      class="quick-view-thumb border ${idx === 0 ? "border-gold" : "border-white/10"} overflow-hidden w-16 h-16 rounded-sm opacity-80 hover:opacity-100 transition-all flex-shrink-0"
    >
      <img src="${imgUrl}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover" />
    </button>
  `).join("");

  const detailsListHtml = product.details ? product.details.map(d => `
    <li class="flex items-start gap-2 text-xs text-[#C5C4CB] font-light">
      <i class="fas fa-check text-gold text-[10px] mt-1 flex-shrink-0"></i>
      <span>${d}</span>
    </li>
  `).join("") : "";

  DOM.quickViewContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Media Column -->
      <div class="space-y-4">
        <div class="aspect-[4/5] overflow-hidden rounded-sm bg-[#0B0B0E] border border-gold/20 relative">
          <img 
            id="qv-main-image" 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-full h-full object-cover transition-all duration-500" 
          />
          ${product.badge ? `<span class="badge-gold absolute top-4 left-4">${product.badge}</span>` : ""}
        </div>
        <!-- Thumbnails -->
        <div class="flex gap-3 overflow-x-auto pb-2">
          ${galleryHtml}
        </div>
      </div>

      <!-- Info Column -->
      <div class="flex flex-col justify-between h-full space-y-5">
        <div>
          <div class="flex items-center justify-between text-xs tracking-widest text-gold uppercase mb-2">
            <span>${product.categoryLabel}</span>
            <div class="flex items-center gap-1.5">
              <span class="text-alabaster font-semibold">${product.rating.toFixed(1)}</span>
              <div class="text-gold text-[11px]">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <span class="text-muted">(${product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          <h2 class="font-serif text-3xl text-alabaster font-normal mb-3 leading-tight">
            ${product.name}
          </h2>

          <div class="flex items-baseline gap-3 mb-4">
            <span class="font-serif text-3xl font-medium text-gold">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="text-sm text-muted line-through">${formatPrice(product.originalPrice)}</span>` : ""}
            <span class="text-xs text-pearl/70 bg-white/5 border border-white/10 px-2 py-0.5 ml-2">Complimentary Luxury Box</span>
          </div>

          <p class="text-sm text-[#B4B3BC] leading-relaxed mb-6 font-light">
            ${product.description}
          </p>

          <!-- Specifications / Inclusions -->
          <div class="bg-noir-elevated/70 border border-gold/20 p-4 rounded-sm mb-6">
            <h4 class="font-sans text-xs uppercase tracking-widest text-gold font-semibold mb-3">
              Maison Specifications & Inclusions
            </h4>
            <ul class="space-y-2">
              ${detailsListHtml}
            </ul>
          </div>

          <div class="text-xs text-muted space-y-1 mb-6 border-l-2 border-gold pl-3 py-1">
            <p><strong class="text-pearl">Origin:</strong> ${product.craftsmanship}</p>
            <p><strong class="text-pearl">Availability:</strong> ${product.stockStatus}</p>
          </div>
        </div>

        <!-- Action Row -->
        <div class="space-y-3 pt-4 border-t border-gold/20">
          <div class="flex items-center gap-3">
            <div class="flex items-center border border-gold/30 bg-[#0E0E12] rounded-sm">
              <button 
                type="button" 
                onclick="decrementQvQuantity()" 
                class="px-3 py-2 text-muted hover:text-gold transition-colors"
              >-</button>
              <span id="qv-quantity" class="px-4 py-2 text-sm font-semibold text-alabaster">1</span>
              <button 
                type="button" 
                onclick="incrementQvQuantity()" 
                class="px-3 py-2 text-muted hover:text-gold transition-colors"
              >+</button>
            </div>

            <button 
              type="button" 
              onclick="addQvToCart()" 
              class="btn-gold flex-1 py-3 text-xs tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <i class="fas fa-shopping-bag"></i> Add to Bag
            </button>
          </div>

          <button 
            type="button" 
            onclick="quickAcquire('${product.id}')" 
            class="btn-outline-gold w-full py-2.5 text-xs tracking-widest"
          >
            Immediate VIP Acquisition
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.style.overflow = "hidden";
  DOM.quickViewModal.classList.add("active");
};

window.closeQuickView = function() {
  document.body.style.overflow = "";
  DOM.quickViewModal.classList.remove("active");
  state.selectedQuickViewProduct = null;
};

window.setQuickViewMainImage = function(url, thumbBtn) {
  const mainImg = document.getElementById("qv-main-image");
  if (mainImg) mainImg.src = url;
  
  document.querySelectorAll(".quick-view-thumb").forEach(b => {
    b.classList.remove("border-gold");
    b.classList.add("border-white/10");
  });
  if (thumbBtn) {
    thumbBtn.classList.add("border-gold");
    thumbBtn.classList.remove("border-white/10");
  }
};

let currentQvQty = 1;
window.incrementQvQuantity = function() {
  currentQvQty++;
  const el = document.getElementById("qv-quantity");
  if (el) el.textContent = currentQvQty;
};
window.decrementQvQuantity = function() {
  if (currentQvQty > 1) {
    currentQvQty--;
    const el = document.getElementById("qv-quantity");
    if (el) el.textContent = currentQvQty;
  }
};

window.addQvToCart = function() {
  if (state.selectedQuickViewProduct) {
    addToCart(state.selectedQuickViewProduct.id, currentQvQty);
    closeQuickView();
    currentQvQty = 1;
  }
};

window.quickAcquire = function(productId) {
  addToCart(productId, 1);
  closeQuickView();
  openCheckout();
};

// ==========================================================================
// Cart Management
// ==========================================================================
window.addToCart = function(productId, qty = 1) {
  const product = LUXURY_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      categoryLabel: product.categoryLabel,
      quantity: qty
    });
  }

  persistCart();
  updateCartUI();
  showToast(`Added to your Bag: ${product.name}`, "fas fa-check-circle");
};

window.updateCartItemQuantity = function(productId, delta) {
  const index = state.cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
    showToast("Item removed from your Bag", "far fa-trash-alt");
  }

  persistCart();
  updateCartUI();
};

window.removeFromCart = function(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  persistCart();
  updateCartUI();
  showToast("Item removed from your Bag", "far fa-trash-alt");
};

function calculateCartSubtotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartUI() {
  const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (DOM.cartBadgeCount) {
    DOM.cartBadgeCount.textContent = totalItemsCount;
    DOM.cartBadgeCount.style.display = totalItemsCount > 0 ? "flex" : "none";
  }

  if (DOM.cartItemsCountText) {
    DOM.cartItemsCountText.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? "Creation" : "Creations"}`;
  }

  const subtotal = calculateCartSubtotal();
  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPrice(subtotal);
  if (DOM.cartTotal) DOM.cartTotal.textContent = formatPrice(subtotal);

  // Complimentary Shipping Bar ($300 threshold)
  const freeThreshold = 300;
  if (DOM.shippingThresholdBar && DOM.shippingThresholdText) {
    const percent = Math.min(100, (subtotal / freeThreshold) * 100);
    DOM.shippingThresholdBar.style.width = `${percent}%`;
    
    if (subtotal >= freeThreshold) {
      DOM.shippingThresholdText.innerHTML = `<span class="text-gold font-medium"><i class="fas fa-check"></i> Eligible for Complimentary White-Glove Courier Delivery</span>`;
    } else {
      const remaining = freeThreshold - subtotal;
      DOM.shippingThresholdText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to receive <strong>Complimentary White-Glove Delivery</strong>`;
    }
  }

  // Render items
  if (!DOM.cartItemsContainer) return;

  if (state.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="text-center py-16 px-4">
        <div class="w-16 h-16 rounded-full border border-gold/30 mx-auto flex items-center justify-center text-gold mb-4">
          <i class="fas fa-shopping-bag text-xl opacity-60"></i>
        </div>
        <h4 class="font-serif text-xl text-alabaster mb-2">Your Shopping Bag is Empty</h4>
        <p class="text-xs text-muted max-w-xs mx-auto mb-6">
          Indulge in our limited beauty sets, high jewelry, and couture collections.
        </p>
        <button onclick="closeCart(); scrollToCatalog();" class="btn-outline-gold text-xs">
          Explore The Creations
        </button>
      </div>
    `;
    return;
  }

  DOM.cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="flex gap-4 p-4 bg-[#141419] border border-gold/15 rounded-sm relative group">
      <!-- Thumbnail -->
      <div class="w-20 h-24 overflow-hidden rounded-sm bg-[#0A0A0C] flex-shrink-0 border border-white/5">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
      </div>

      <!-- Details -->
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-[10px] text-gold uppercase tracking-wider block">${item.categoryLabel}</span>
              <h5 class="font-serif text-sm text-alabaster font-normal line-clamp-1">${item.name}</h5>
            </div>
            <button 
              type="button" 
              onclick="removeFromCart('${item.id}')" 
              class="text-muted hover:text-red-400 text-xs p-1 transition-colors"
              title="Remove item"
            >
              <i class="far fa-times-circle"></i>
            </button>
          </div>
          <p class="font-serif text-gold text-sm mt-1">${formatPrice(item.price)}</p>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center border border-gold/25 bg-[#0C0C10] rounded-sm">
            <button 
              type="button" 
              onclick="updateCartItemQuantity('${item.id}', -1)" 
              class="px-2 py-1 text-xs text-muted hover:text-gold"
            >-</button>
            <span class="px-3 py-1 text-xs font-semibold text-alabaster">${item.quantity}</span>
            <button 
              type="button" 
              onclick="updateCartItemQuantity('${item.id}', 1)" 
              class="px-2 py-1 text-xs text-muted hover:text-gold"
            >+</button>
          </div>
          <span class="font-serif text-xs text-pearl">${formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  `).join("");
}

window.openCart = function() {
  document.body.style.overflow = "hidden";
  DOM.cartDrawer.classList.add("active");
};

window.closeCart = function() {
  document.body.style.overflow = "";
  DOM.cartDrawer.classList.remove("active");
};

// ==========================================================================
// Wishlist Management
// ==========================================================================
window.toggleWishlist = function(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = LUXURY_PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from Wishlist: ${product ? product.name : ""}`, "far fa-heart");
  } else {
    state.wishlist.push(productId);
    showToast(`Saved to Private Wishlist: ${product ? product.name : ""}`, "fas fa-heart");
  }

  persistWishlist();
  updateWishlistUI();
  renderProducts(); // refresh heart toggle states
};

function updateWishlistUI() {
  const count = state.wishlist.length;
  if (DOM.wishlistBadgeCount) {
    DOM.wishlistBadgeCount.textContent = count;
    DOM.wishlistBadgeCount.style.display = count > 0 ? "flex" : "none";
  }

  if (!DOM.wishlistItemsContainer) return;

  if (count === 0) {
    DOM.wishlistItemsContainer.innerHTML = `
      <div class="text-center py-16 px-4">
        <div class="w-16 h-16 rounded-full border border-gold/30 mx-auto flex items-center justify-center text-gold mb-4">
          <i class="far fa-heart text-xl opacity-60"></i>
        </div>
        <h4 class="font-serif text-xl text-alabaster mb-2">Your Private Wishlist is Empty</h4>
        <p class="text-xs text-muted max-w-xs mx-auto mb-6">
          Curate your favorite high jewelry, beauty coffrets, and couture creations.
        </p>
        <button onclick="closeWishlist(); scrollToCatalog();" class="btn-outline-gold text-xs">
          Discover Collections
        </button>
      </div>
    `;
    return;
  }

  const wishlistedProducts = LUXURY_PRODUCTS.filter(p => state.wishlist.includes(p.id));

  DOM.wishlistItemsContainer.innerHTML = wishlistedProducts.map(item => `
    <div class="flex gap-4 p-4 bg-[#141419] border border-gold/15 rounded-sm relative group">
      <div class="w-20 h-24 overflow-hidden rounded-sm bg-[#0A0A0C] flex-shrink-0 border border-white/5 cursor-pointer" onclick="openQuickView('${item.id}')">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>

      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <span class="text-[10px] text-gold uppercase tracking-wider block">${item.categoryLabel}</span>
            <button 
              type="button" 
              onclick="toggleWishlist('${item.id}')" 
              class="text-muted hover:text-red-400 text-xs p-1 transition-colors"
              title="Remove from Wishlist"
            >
              <i class="fas fa-trash-alt text-[11px]"></i>
            </button>
          </div>
          <h5 class="font-serif text-sm text-alabaster font-normal line-clamp-1 cursor-pointer hover:text-gold transition-colors" onclick="openQuickView('${item.id}')">${item.name}</h5>
          <p class="font-serif text-gold text-sm mt-1">${formatPrice(item.price)}</p>
        </div>

        <button 
          type="button" 
          onclick="addToCart('${item.id}', 1)" 
          class="btn-gold py-1.5 px-3 text-[10px] tracking-wider w-full mt-2"
        >
          <i class="fas fa-shopping-bag"></i> Move to Bag
        </button>
      </div>
    </div>
  `).join("");
}

window.openWishlist = function() {
  document.body.style.overflow = "hidden";
  DOM.wishlistDrawer.classList.add("active");
};

window.closeWishlist = function() {
  document.body.style.overflow = "";
  DOM.wishlistDrawer.classList.remove("active");
};

// ==========================================================================
// Search Overlay
// ==========================================================================
window.openSearch = function() {
  DOM.searchOverlay.classList.remove("hidden");
  DOM.searchOverlay.classList.add("flex");
  setTimeout(() => {
    if (DOM.searchInput) DOM.searchInput.focus();
  }, 100);
};

window.closeSearch = function() {
  DOM.searchOverlay.classList.add("hidden");
  DOM.searchOverlay.classList.remove("flex");
  if (DOM.searchInput) DOM.searchInput.value = "";
  if (DOM.searchResults) DOM.searchResults.innerHTML = "";
};

function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  if (!query) {
    DOM.searchResults.innerHTML = "";
    return;
  }

  const results = LUXURY_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.categoryLabel.toLowerCase().includes(query) ||
    p.shortDescription.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    DOM.searchResults.innerHTML = `
      <p class="text-sm text-muted text-center py-8">
        No luxury creations matched "<span class="text-gold">${query}</span>".
      </p>
    `;
    return;
  }

  DOM.searchResults.innerHTML = results.map(p => `
    <div 
      class="flex items-center gap-4 p-3 hover:bg-[#1C1C24] transition-colors rounded-sm cursor-pointer border-b border-white/5"
      onclick="closeSearch(); openQuickView('${p.id}');"
    >
      <img src="${p.image}" alt="${p.name}" class="w-14 h-16 object-cover rounded-sm border border-gold/20" />
      <div class="flex-1">
        <span class="text-[10px] text-gold uppercase tracking-wider">${p.categoryLabel}</span>
        <h4 class="font-serif text-base text-alabaster">${p.name}</h4>
        <span class="font-serif text-sm text-gold">${formatPrice(p.price)}</span>
      </div>
      <i class="fas fa-chevron-right text-xs text-muted"></i>
    </div>
  `).join("");
}

// ==========================================================================
// VIP Consultation Modal
// ==========================================================================
window.openVipModal = function() {
  document.body.style.overflow = "hidden";
  DOM.vipModal.classList.add("active");
};

window.closeVipModal = function() {
  document.body.style.overflow = "";
  DOM.vipModal.classList.remove("active");
};

function handleVipFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("vip-name")?.value || "Distinguished Client";
  const service = document.getElementById("vip-service")?.value || "VIP Private Viewing";

  closeVipModal();
  showToast(`Appointment Request Received for ${name}. Our Head Stylist will contact you within 2 hours.`, "fas fa-crown");
  if (DOM.vipForm) DOM.vipForm.reset();
}

// ==========================================================================
// Checkout Flow Simulation
// ==========================================================================
window.openCheckout = function() {
  if (state.cart.length === 0) {
    showToast("Your bag is empty. Please select a creation first.", "fas fa-info-circle");
    return;
  }

  closeCart();

  if (DOM.checkoutModal) {
    document.body.style.overflow = "hidden";
    const subtotal = calculateCartSubtotal();
    if (DOM.checkoutSubtotal) DOM.checkoutSubtotal.textContent = formatPrice(subtotal);
    if (DOM.checkoutTotal) DOM.checkoutTotal.textContent = formatPrice(subtotal);

    if (DOM.checkoutItemsList) {
      DOM.checkoutItemsList.innerHTML = state.cart.map(item => `
        <div class="flex items-center justify-between py-2 border-b border-white/5 text-xs">
          <div class="flex items-center gap-2">
            <img src="${item.image}" alt="${item.name}" class="w-10 h-12 object-cover rounded-sm border border-gold/20" />
            <div>
              <p class="text-alabaster font-serif">${item.name}</p>
              <span class="text-muted text-[10px]">Qty: ${item.quantity}</span>
            </div>
          </div>
          <span class="text-gold font-serif">${formatPrice(item.price * item.quantity)}</span>
        </div>
      `).join("");
    }
    DOM.checkoutModal.classList.add("active");
  } else {
    // Seamless Direct Acquisition Confirmation
    const orderRef = "ES-" + Math.floor(100000 + Math.random() * 900000);
    state.cart = [];
    persistCart();
    updateCartUI();
    showToast(`Acquisition Authorized! Reference #${orderRef}. Our Private Concierge will coordinate courier dispatch.`, "fas fa-crown");
  }
};

window.closeCheckout = function() {
  document.body.style.overflow = "";
  if (DOM.checkoutModal) {
    DOM.checkoutModal.classList.remove("active");
  }
};

window.confirmOrder = function(e) {
  e.preventDefault();
  closeCheckout();
  
  const orderRef = "ES-" + Math.floor(100000 + Math.random() * 900000);
  
  // Clear cart
  state.cart = [];
  persistCart();
  updateCartUI();

  showToast(`Order Confirmed! Reference: #${orderRef}. A private courier tracking link has been sent to your email.`, "fas fa-check-double");
};

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
function showToast(message, iconClass = "fas fa-gem") {
  if (!DOM.toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "luxury-toast";
  toast.innerHTML = `
    <i class="${iconClass} text-gold text-base flex-shrink-0"></i>
    <div class="text-xs text-alabaster font-light">${message}</div>
    <button type="button" onclick="this.parentElement.remove()" class="text-muted hover:text-alabaster ml-2 text-xs">
      <i class="fas fa-times"></i>
    </button>
  `;

  DOM.toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

// ==========================================================================
// Event Listeners & Interaction Bindings
// ==========================================================================
function setupEventListeners() {
  // Category Filter clicks
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Sort change
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener("change", (e) => {
      state.activeSort = e.target.value;
      renderProducts();
    });
  }

  // Currency change
  if (DOM.currencySelect) {
    DOM.currencySelect.addEventListener("change", (e) => {
      state.currentCurrency = e.target.value;
      localStorage.setItem("elixir_soie_currency", state.currentCurrency);
      renderProducts();
      updateCartUI();
      updateWishlistUI();
      showToast(`Currency updated to ${state.currentCurrency}`, "fas fa-coins");
    });
  }

  // Live Search Input
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener("input", handleSearchInput);
  }

  // VIP Consultation Form
  if (DOM.vipForm) {
    DOM.vipForm.addEventListener("submit", handleVipFormSubmit);
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletter-email");
      if (emailInput && emailInput.value) {
        showToast("Welcome to The Private Salon. Your VIP invitation code is: PRIVEE2026", "fas fa-envelope-open-text");
        emailInput.value = "";
      }
    });
  }

  // Escape key closes open modals/drawers
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeWishlist();
      closeQuickView();
      closeSearch();
      closeVipModal();
      closeCheckout();
    }
  });
}

// Scroll to Catalog helper
window.scrollToCatalog = function(category = null) {
  if (category) {
    state.activeCategory = category;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
    renderProducts();
  }

  const catalogSection = document.getElementById("catalog-section");
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: "smooth" });
  }
};
