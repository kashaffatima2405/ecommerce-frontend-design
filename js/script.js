// ================================================
// ECOMMERCE WEB DESIGN - JAVASCRIPT
// DevelopersHub Corporation Internship Task
// ================================================

// ------------------------------------------------
// HERO SLIDER
// ------------------------------------------------
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  heroSlides.forEach((s, i) => {
    s.style.opacity = i === index ? '1' : '0';
    s.style.zIndex = i === index ? '1' : '0';
  });
  heroDots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function startSlider() {
  if (heroSlides.length === 0) return;
  slideTimer = setInterval(() => {
    let next = (currentSlide + 1) % heroSlides.length;
    showSlide(next);
  }, 4000);
}

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    showSlide(i);
    startSlider();
  });
});

if (heroSlides.length > 0) {
  showSlide(0);
  startSlider();
}

// ------------------------------------------------
// SEARCH BAR - LIVE SEARCH STYLING
// ------------------------------------------------
const searchInput = document.querySelector('.search-input');
const searchBar = document.querySelector('.search-bar');

if (searchInput && searchBar) {
  searchInput.addEventListener('focus', () => {
    searchBar.style.boxShadow = '0 0 0 3px rgba(255, 106, 0, 0.15)';
  });
  searchInput.addEventListener('blur', () => {
    searchBar.style.boxShadow = 'none';
  });

  // Search button click
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        console.log('Searching for:', query);
        // In real app: redirect to search results page
        // window.location.href = `products.html?q=${encodeURIComponent(query)}`;
      }
    });
    // Enter key search
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }
}

// ------------------------------------------------
// SIZE SELECTOR (Product Detail Page)
// ------------------------------------------------
const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ------------------------------------------------
// COLOR SWATCH SELECTOR (Product Detail Page)
// ------------------------------------------------
const colorSwatches = document.querySelectorAll('.color-swatch');
colorSwatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    colorSwatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});

// ------------------------------------------------
// QUANTITY CONTROL (Product Detail Page)
// ------------------------------------------------
const qtyInput = document.querySelector('.qty-input');
const qtyMinus = document.querySelector('.qty-btn.minus');
const qtyPlus = document.querySelector('.qty-btn.plus');

if (qtyInput && qtyMinus && qtyPlus) {
  qtyMinus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });
  qtyPlus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value) || 1;
    qtyInput.value = val + 1;
  });
  // Prevent invalid input
  qtyInput.addEventListener('input', () => {
    let val = parseInt(qtyInput.value);
    if (isNaN(val) || val < 1) qtyInput.value = 1;
  });
}

// ------------------------------------------------
// TABS (Product Detail Page - Description/Reviews)
// ------------------------------------------------
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetContent = document.getElementById(target);
    if (targetContent) targetContent.classList.add('active');
  });
});

// ------------------------------------------------
// THUMBNAIL GALLERY (Product Detail Page)
// ------------------------------------------------
const mainImg = document.querySelector('.main-product-img');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbnails.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    if (mainImg) {
      mainImg.src = thumb.src;
    }
  });
});

// ------------------------------------------------
// SORT OPTIONS (Product Listing Page)
// ------------------------------------------------
const sortOptions = document.querySelectorAll('.sort-option');
sortOptions.forEach(option => {
  option.addEventListener('click', () => {
    sortOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
  });
});

// ------------------------------------------------
// GRID TOGGLE (Product Listing Page)
// ------------------------------------------------
const gridToggleBtns = document.querySelectorAll('.grid-toggle button');
const productGridEl = document.querySelector('.product-grid');

gridToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gridToggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (productGridEl) {
      const cols = btn.getAttribute('data-cols');
      if (cols === '4') {
        productGridEl.style.gridTemplateColumns = 'repeat(4, 1fr)';
      } else if (cols === '3') {
        productGridEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
      } else {
        productGridEl.style.gridTemplateColumns = 'repeat(5, 1fr)';
      }
    }
  });
});

// ------------------------------------------------
// ADD TO CART (with feedback)
// ------------------------------------------------
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-buy') || e.target.classList.contains('btn-primary')) {
    if (e.target.textContent.includes('Add to Cart') || e.target.textContent.includes('Buy Now')) {
      const original = e.target.textContent;
      e.target.textContent = '✓ Added!';
      e.target.style.background = '#27ae60';
      setTimeout(() => {
        e.target.textContent = original;
        e.target.style.background = '';
      }, 1500);

      // Update cart badge
      const badge = document.querySelector('.cart-badge .badge');
      if (badge) {
        let count = parseInt(badge.textContent) || 0;
        badge.textContent = count + 1;
        badge.style.transform = 'scale(1.4)';
        setTimeout(() => badge.style.transform = '', 300);
      }
    }
  }
});

// ------------------------------------------------
// WISHLIST TOGGLE
// ------------------------------------------------
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('product-wishlist')) {
    const isWished = e.target.textContent === '❤️';
    e.target.textContent = isWished ? '🤍' : '❤️';
    if (!isWished) {
      e.target.style.background = '#ffe0e0';
    } else {
      e.target.style.background = '';
    }
  }
});

// ------------------------------------------------
// STICKY HEADER SHADOW ON SCROLL
// ------------------------------------------------
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (header) {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
  }
});

// ------------------------------------------------
// ANIMATE ON SCROLL (fade in cards)
// ------------------------------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .category-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(15px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(card);
});

// ------------------------------------------------
// PRICE RANGE SLIDER (Filter Sidebar)
// ------------------------------------------------
const priceSlider = document.querySelector('.price-slider');
const priceMax = document.querySelector('#price-max');
if (priceSlider && priceMax) {
  priceSlider.addEventListener('input', () => {
    priceMax.value = priceSlider.value;
  });
}

// ------------------------------------------------
// NEWSLETTER FORM
// ------------------------------------------------
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input && input.value) {
      const btn = newsletterForm.querySelector('button');
      btn.textContent = '✓';
      btn.style.background = '#27ae60';
      input.value = '';
      setTimeout(() => {
        btn.textContent = '→';
        btn.style.background = '';
      }, 2000);
    }
  });
}

// ------------------------------------------------
// DROPDOWN CATEGORY SEARCH (Header)
// ------------------------------------------------
const categorySelect = document.querySelector('.search-category');
if (categorySelect) {
  // Already a native select, just ensure it works
}

console.log('✅ Ecommerce JS loaded successfully!');
