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
