/* ==========================================================================
   GLOBALTRADE EXPORTS - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Components
  initNavbarScroll();
  initMobileNav();
  initProductFilters();
  initRegionTabs();
  initStatsCounter();
  initModals();
  initForms();
  initBackToTop();
});

/* 1. Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Mobile Drawer Navigation */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');
  const backdrop = document.getElementById('overlayBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* 3. Product Catalog Filter */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* 4. Global Network Region Tabs */
const regionData = {
  asia: {
    title: 'Asia & <span>Pacific Hub</span>',
    description: 'Our primary sourcing and distribution engine connecting major trade corridors across East Asia, South Asia, and Southeast Asia.',
    tradeHubs: ['Shanghai', 'Singapore', 'Mumbai', 'Tokyo', 'Bangkok', 'Ho Chi Minh'],
    exports: 'Textiles, Electronics, Spices, Agricultural Commodities, Machinery Parts',
    leadTime: '7 - 14 Days Container Shipping'
  },
  middleEast: {
    title: 'Middle East & <span>Gulf Network</span>',
    description: 'Strategic commercial operations facilitating energy, petrochemicals, building materials, and food security imports across the GCC.',
    tradeHubs: ['Dubai (Jebel Ali)', 'Riyadh', 'Doha', 'Muscat', 'Abu Dhabi', 'Kuwait City'],
    exports: 'Petrochemicals, Polymers, Dates & Agro Produce, Metals, Packaging Materials',
    leadTime: '4 - 10 Days Direct Shipping'
  },
  europe: {
    title: 'Europe & <span>Mediterranean</span>',
    description: 'Robust EU-compliant supply chain networks linking Western European industrial buyers with certified global producers.',
    tradeHubs: ['Rotterdam', 'Hamburg', 'Antwerp', 'Valencia', 'Genoa', 'Istanbul'],
    exports: 'Precision Machinery, Specialty Chemicals, Gourmet Food, Industrial Components',
    leadTime: '12 - 20 Days Sea Cargo'
  },
  africa: {
    title: 'Africa Trade <span>Corridors</span>',
    description: 'Rapidly growing import/export partnerships providing raw material sourcing and consumer products distribution across Pan-Africa.',
    tradeHubs: ['Durban', 'Mombasa', 'Cairo', 'Lagos', 'Casablanca', 'Dar es Salaam'],
    exports: 'Raw Minerals, Cashews, Coffee, Cocoa, Manufactured Consumer Goods',
    leadTime: '10 - 18 Days Shipping'
  },
  northAmerica: {
    title: 'North America <span>Logistics</span>',
    description: 'Direct transatlantic and transpacific logistics hub supplying US and Canadian enterprise buyers with seamless customs clearing.',
    tradeHubs: ['Los Angeles', 'New York/New Jersey', 'Vancouver', 'Houston', 'Toronto', 'Savannah'],
    exports: 'Heavy Machinery, Grains, High-tech Consumer Goods, Industrial Hardware',
    leadTime: '14 - 22 Days Ocean Freight'
  },
  southAmerica: {
    title: 'South America <span>Partnerships</span>',
    description: 'Deep agricultural and mining trade partnerships across Brazil, Argentina, Chile, and Colombia.',
    tradeHubs: ['Santos (Brazil)', 'Buenos Aires', 'Valparaiso', 'Cartagena', 'Callao', 'Montevideo'],
    exports: 'Soybeans, Sugar, Minerals, Fresh Produce, Pulp & Paper',
    leadTime: '16 - 25 Days Direct Route'
  }
};

function initRegionTabs() {
  const regionBtns = document.querySelectorAll('.region-btn');
  const regionContentBox = document.getElementById('regionContentBox');

  if (!regionContentBox) return;

  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      regionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const regionKey = btn.getAttribute('data-region');
      const data = regionData[regionKey];

      if (data) {
        regionContentBox.innerHTML = `
          <div class="region-info-column">
            <h3 class="region-info-title">${data.title}</h3>
            <p class="region-info-text">${data.description}</p>
            <div class="region-stats-list">
              <div class="region-stat-item">
                <div class="region-stat-icon">
                  <i class="fas fa-boxes-packing"></i>
                </div>
                <div class="region-stat-details">
                  <strong>Key Trade Commodities:</strong>
                  <span>${data.exports}</span>
                </div>
              </div>
              <div class="region-stat-item">
                <div class="region-stat-icon">
                  <i class="fas fa-ship"></i>
                </div>
                <div class="region-stat-details">
                  <strong>Average Transit Time:</strong>
                  <span>${data.leadTime}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="region-map-box">
            <h4 class="region-map-title"><i class="fas fa-anchor" style="color:#D4AF37; margin-right:6px;"></i> Major Regional Port Hubs</h4>
            <div class="map-hubs-grid">
              ${data.tradeHubs.map(hub => `<div class="hub-chip"><i class="fas fa-location-dot" style="color:#F59E0B; margin-right:5px;"></i> ${hub}</div>`).join('')}
            </div>
          </div>
        `;
      }
    });
  });
}

/* 5. Animated Number Counter for Stats */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number-val');
  let animated = false;

  function countUp() {
    const statsSection = document.querySelector('.stats-strip-section');
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            stat.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
          } else {
            stat.innerText = target;
          }
        };

        updateCount();
      });
    }
  }

  window.addEventListener('scroll', countUp);
}

/* 6. Modal Popups (Quote Modal & Product Catalog Detail Modal) */
const sampleCategoryCatalog = {
  agricultural: [
    { name: 'Organic Premium Basmati Rice', spec: 'Extra Long Grain, 1121 Steam Grade', moq: '25 Metric Tons (1 Container)' },
    { name: 'Raw Refined Cane Sugar (ICUMSA 45)', spec: '99.8% Purity, White Granulated', moq: '50 Metric Tons' },
    { name: 'Organic Chickpeas & Lentils', spec: 'Desi & Kabuli 8mm/9mm', moq: '20 Metric Tons' },
    { name: 'Whole Spices (Cardamom, Black Pepper)', spec: 'Grade A Export Spec', moq: '5 Metric Tons' }
  ],
  food: [
    { name: 'Cold-Pressed Virgin Olive Oil', spec: 'Acidity < 0.8%, 5L Tin & Bottle Packaging', moq: '500 Cases' },
    { name: 'Processed Dairy & Milk Powders', spec: 'Full Cream 26% Fat, 25kg Bags', moq: '15 Metric Tons' },
    { name: 'Premium Roasted Coffee Beans', spec: 'Arabica & Robusta Blend', moq: '2 Metric Tons' },
    { name: 'Canned Fruits & Vegetables', spec: 'OEM Private Label Available', moq: '1,000 Cartons' }
  ],
  textiles: [
    { name: '100% Combed Cotton Yarns', spec: 'Ne 20s to Ne 40s Weaving Grade', moq: '10 Metric Tons' },
    { name: 'Finished Woven Fabric Rolls', spec: 'Denim, Twill, Polyester Blends', moq: '5,000 Meters' },
    { name: 'Institutional Hotel Linens', spec: '300 TC Egyptian Cotton Bedding', moq: '500 Sets' },
    { name: 'Ready-Made Export Garments', spec: 'T-Shirts, Workwear, Uniforms', moq: '1,000 Pieces' }
  ],
  industrial: [
    { name: 'Stainless Steel Seamless Pipes', spec: 'ASTM A312 TP304/316L', moq: '5 Metric Tons' },
    { name: 'Industrial Flanges & Valves', spec: 'Class 150/300 Ball & Gate Valves', moq: '200 Units' },
    { name: 'Heavy Duty Fasteners & Bolts', spec: 'High Tensile Grade 8.8 / 10.9', moq: '1,000 Kg' },
    { name: 'Structural Steel Beams', spec: 'HEB / IPE Hot Rolled Beams', moq: '20 Metric Tons' }
  ],
  machinery: [
    { name: 'Automated Packaging Machines', spec: 'Pouch Packing, Sealing & Labeling', moq: '1 Unit' },
    { name: 'Diesel Generator Sets', spec: '50 kVA - 1250 kVA Cummins Power', moq: '1 Unit' },
    { name: 'CNC Lathe & Milling Machines', spec: 'High Precision Precision Tools', moq: '1 Unit' },
    { name: 'Agricultural Tractors & Implements', spec: '50 HP - 120 HP 4WD', moq: '2 Units' }
  ],
  chemicals: [
    { name: 'Titanium Dioxide (TiO2)', spec: 'Rutile Grade R-996 Coating Powder', moq: '10 Metric Tons' },
    { name: 'Industrial Soda Ash Light/Dense', spec: '99.2% Purity Technical Grade', moq: '20 Metric Tons' },
    { name: 'Plastic Polymer Resins (HDPE/PP)', spec: 'Blow Molding & Injection Grade', moq: '25 Metric Tons' },
    { name: 'Water Treatment Chemicals', spec: 'Poly-Aluminum Chloride (PAC)', moq: '10 Metric Tons' }
  ],
  consumer: [
    { name: 'Smart LED Lighting Solutions', spec: 'Commercial & Street Lighting', moq: '500 Units' },
    { name: 'Household Consumer Appliances', spec: 'Blenders, Kettles, Microwaves', moq: '300 Units' },
    { name: 'Personal Care & Hygiene Products', spec: 'Soaps, Shampoos, Sanitizers', moq: '1,000 Packs' },
    { name: 'Office Furniture & Workstations', spec: 'Ergonomic Mesh Chairs & Desks', moq: '50 Sets' }
  ],
  packaging: [
    { name: 'Corrugated Heavy Duty Boxes', spec: '5-Ply & 7-Ply Export Grade', moq: '5,000 Boxes' },
    { name: 'Polypropylene (PP) Woven Sacks', spec: 'Laminated 50kg Grain Bags', moq: '10,000 Bags' },
    { name: 'Stretch Wrap & Shrink Film', spec: 'Hand & Machine Pallet Wrap', moq: '100 Rolls' },
    { name: 'Flexitanks & FIBC Bulk Bags', spec: '1000kg Capacity Jumbo Bags', moq: '500 Bags' }
  ]
};

function initModals() {
  const quoteModal = document.getElementById('quoteModal');
  const productModal = document.getElementById('productDetailModal');
  const quoteCategorySelect = document.getElementById('modalProductCategory');
  const backdrop = document.getElementById('overlayBackdrop');

  // Trigger Quote Modal buttons
  document.addEventListener('click', (e) => {
    const quoteTrigger = e.target.closest('[data-open-quote]');
    if (quoteTrigger) {
      e.preventDefault();
      const category = quoteTrigger.getAttribute('data-open-quote');
      if (category && quoteCategorySelect) {
        quoteCategorySelect.value = category;
      }
      openModal(quoteModal);
    }

    const viewProductTrigger = e.target.closest('[data-view-product]');
    if (viewProductTrigger) {
      e.preventDefault();
      const categoryKey = viewProductTrigger.getAttribute('data-view-product');
      const catTitle = viewProductTrigger.getAttribute('data-cat-title') || 'Product Line';
      showProductDetailsModal(categoryKey, catTitle);
    }

    const closeBtn = e.target.closest('.modal-close-btn');
    if (closeBtn) {
      closeAllModals();
    }
  });

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    if (quoteModal) quoteModal.classList.remove('active');
    if (productModal) productModal.classList.remove('active');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (backdrop) backdrop.addEventListener('click', closeAllModals);

  // Function to build and open Product Catalog Modal
  function showProductDetailsModal(categoryKey, catTitle) {
    const modalTitle = document.getElementById('modalProductTitle');
    const modalBody = document.getElementById('modalProductBody');

    if (!sampleCategoryCatalog[categoryKey]) return;

    if (modalTitle) modalTitle.innerText = catTitle + ' - Product Catalog';

    const items = sampleCategoryCatalog[categoryKey];
    let html = `
      <p style="color:var(--text-muted); margin-bottom:1.5rem;">Below is a curated sample of our top exported/imported products in this category. We also provide custom global sourcing based on your technical specs.</p>
      <div style="display:flex; flex-direction:column; gap:1rem;">
    `;

    items.forEach(item => {
      html += `
        <div style="background:var(--bg-light); padding:1.2rem; border-radius:8px; border:1px solid var(--border-color); display:flex; justify-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
          <div style="flex:1; min-width:240px;">
            <h4 style="color:var(--primary-navy-dark); font-weight:700; font-size:1.05rem;">${item.name}</h4>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;"><strong>Specification:</strong> ${item.spec}</p>
            <p style="font-size:0.82rem; color:#B58E23; font-weight:600;"><strong>Min Order (MOQ):</strong> ${item.moq}</p>
          </div>
          <button class="btn btn-primary btn-sm" data-open-quote="${categoryKey}" onclick="document.getElementById('productDetailModal').classList.remove('active')">
            Get Pricing Quote <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `;
    });

    html += `</div>`;
    if (modalBody) modalBody.innerHTML = html;

    openModal(productModal);
  }
}

/* 7. Contact & Quote Form Submissions */
function initForms() {
  const quoteForm = document.getElementById('modalQuoteForm');
  const mainContactForm = document.getElementById('mainContactForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const quoteModal = document.getElementById('quoteModal');
      const backdrop = document.getElementById('overlayBackdrop');
      if (quoteModal) quoteModal.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
      quoteForm.reset();
      showToast('Thank you! Your quotation request has been submitted. Our trade desk will contact you within 4 hours.');
    });
  }

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      mainContactForm.reset();
      showToast('Inquiry Received! Our international trade specialist will reach out shortly.');
    });
  }
}

/* Toast Notification Utility */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* 8. Back to Top Button */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
