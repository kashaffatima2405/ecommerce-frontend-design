/* =============================================
   ECOMMERCE WEBSITE - MAIN JAVASCRIPT
   Week 3: Interactivity
   ============================================= */

// ---- SEARCH BAR (Header) ----
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (!searchInput) return;

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      performSearch(this.value);
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      performSearch(searchInput.value);
    });
  }
}

function performSearch(query) {
  // Styled search — non-functional as per task requirement
  if (query.trim() !== '') {
    showToast('🔍 Searching for: "' + query + '"');
  }
}

// ---- DROPDOWN MENU (All Categories) ----
function initDropdown() {
  const btn = document.querySelector('.all-categories-btn');
  const menu = document.querySelector('.dropdown-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  document.addEventListener('click', function () {
    menu.classList.remove('active');
  });
}

// ---- BANNER SLIDER ----
function initBannerSlider() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dots span');

  if (slides.length === 0) return;

  let current = 0;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
    });
  });

  // Auto slide every 4 seconds
  setInterval(function () {
    goToSlide(current + 1);
  }, 4000);
}

// ---- COUNTDOWN TIMER (Flash Deals) ----
function initCountdown() {
  const hEl = document.getElementById('count-hours');
  const mEl = document.getElementById('count-mins');
  const sEl = document.getElementById('count-secs');

  if (!sEl) return;

  // 3 hours from now
  let total = 3 * 3600 + 25 * 60 + 0;

  function update() {
    if (total <= 0) {
      clearInterval(timer);
      return;
    }
    total--;

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    hEl.querySelector('.count-num').textContent = String(h).padStart(2, '0');
    mEl.querySelector('.count-num').textContent = String(m).padStart(2, '0');
    sEl.querySelector('.count-num').textContent = String(s).padStart(2, '0');
  }

  const timer = setInterval(update, 1000);
  update();
}

// ---- CATEGORY TABS (Home Page) ----
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });
}

// ---- PRODUCT DETAIL: SIZE SELECTOR ----
function initSizeSelector() {
  const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');

  sizeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizeBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });
}

// ---- PRODUCT DETAIL: COLOR SWATCH ----
function initColorSwatch() {
  const swatches = document.querySelectorAll('.color-swatch');

  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatches.forEach(function (s) { s.classList.remove('active'); });
      this.classList.add('active');
    });
  });
}

// ---- PRODUCT DETAIL: QUANTITY ----
function initQuantity() {
  const qtyInput = document.querySelector('.qty-input');
  const plusBtn = document.querySelector('.qty-btn.plus');
  const minusBtn = document.querySelector('.qty-btn.minus');

  if (!qtyInput) return;

  plusBtn.addEventListener('click', function () {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  minusBtn.addEventListener('click', function () {
    const val = parseInt(qtyInput.value);
    if (val > 1) qtyInput.value = val - 1;
  });
}

// ---- PRODUCT DETAIL: IMAGE THUMBNAILS ----
function initThumbnails() {
  const thumbs = document.querySelectorAll('.thumb');
  const mainImg = document.querySelector('.main-image img');

  if (!mainImg) return;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      const src = this.querySelector('img').src;
      mainImg.src = src;
    });
  });
}

// ---- PRODUCT DETAIL: TABS (Description / Reviews) ----
function initDetailTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = this.dataset.tab;

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabContents.forEach(function (c) { c.classList.remove('active'); });

      this.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ---- ADD TO CART ----
function initAddToCart() {
  const addCartBtns = document.querySelectorAll('.btn-add-cart, .btn-buy, .product-card .btn-buy');

  addCartBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Animate button
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Added!';
      btn.style.background = 'var(--success)';
      setTimeout(function () {
        btn.innerHTML = original;
        btn.style.background = '';
      }, 1500);
      showToast('🛒 Item added to cart!');
    });
  });

  const buyNowBtns = document.querySelectorAll('.btn-buy-now');
  buyNowBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('⚡ Redirecting to checkout...');
    });
  });
}

// ---- WISHLIST ----
function initWishlist() {
  const wishBtns = document.querySelectorAll('.action-btn[title="Wishlist"], .btn-wishlist');

  wishBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.dataset.liked === 'true') {
        this.dataset.liked = 'false';
        this.style.color = '';
        showToast('💔 Removed from wishlist');
      } else {
        this.dataset.liked = 'true';
        this.style.color = 'var(--danger)';
        showToast('❤️ Added to wishlist!');
      }
    });
  });
}

// ---- VIEW TOGGLE (Grid / List) ----
function initViewToggle() {
  const gridBtn = document.querySelector('.view-toggle .grid-btn');
  const listBtn = document.querySelector('.view-toggle .list-btn');
  const grid = document.querySelector('.listing-grid');

  if (!gridBtn || !grid) return;

  gridBtn.addEventListener('click', function () {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  });

  listBtn.addEventListener('click', function () {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    grid.style.gridTemplateColumns = '1fr';
  });
}

// ---- PRICE RANGE FILTER ----
function initPriceRange() {
  const range = document.querySelector('.price-range input[type="range"]');
  const maxLabel = document.querySelector('.price-labels .max-price');

  if (!range || !maxLabel) return;

  range.addEventListener('input', function () {
    maxLabel.textContent = '$' + this.value;
  });
}

// ---- NEWSLETTER FORM ----
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });

  const btn = form.querySelector('button');
  if (btn) {
    btn.addEventListener('click', function () {
      const input = form.querySelector('input');
      if (input && input.value.trim() !== '') {
        showToast('✅ Subscribed successfully! Thank you.');
        input.value = '';
      } else {
        showToast('⚠️ Please enter your email address.');
      }
    });
  }
}

// ---- TOAST NOTIFICATION ----
let toastTimeout;

function showToast(message) {
  let toast = document.querySelector('.toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = '<span>' + message + '</span>';
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

// ---- SMOOTH SCROLL for Pagination ----
function initPagination() {
  const pagLinks = document.querySelectorAll('.pagination a');
  pagLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('📄 Loading page...');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const loadMore = document.querySelector('.load-more-btn');
  if (loadMore) {
    loadMore.addEventListener('click', function () {
      this.textContent = 'Loading...';
      setTimeout(() => {
        this.textContent = 'Load More Products';
        showToast('✅ More products loaded!');
      }, 1200);
    });
  }
}

// ---- INIT ALL ----
document.addEventListener('DOMContentLoaded', function () {
  initSearch();
  initDropdown();
  initBannerSlider();
  initCountdown();
  initCategoryTabs();
  initSizeSelector();
  initColorSwatch();
  initQuantity();
  initThumbnails();
  initDetailTabs();
  initAddToCart();
  initWishlist();
  initViewToggle();
  initPriceRange();
  initNewsletter();
  initPagination();
});
