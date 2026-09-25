// AURELIA | Royal Indian Haute Cuisine · Standalone Script
// Curated for Chef Ayan Ghosh · Contact: 6294601364

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 1. Business Hours Logic (10:00 AM - 10:00 PM) ---
  const OPEN_HOUR = 10;
  const CLOSE_HOUR = 22;

  function updateHoursStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const isOpen = currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR;
    const badgeText = document.getElementById('hours-status-text');
    const dot = document.querySelector('.pulse-dot');

    if (isOpen) {
      badgeText.textContent = 'Open Now';
      badgeText.style.color = '#10b981';
      dot.style.background = '#10b981';
      dot.style.boxShadow = '0 0 8px #10b981';
    } else {
      badgeText.textContent = 'Closed Now';
      badgeText.style.color = '#f43f5e';
      dot.style.background = '#f43f5e';
      dot.style.boxShadow = '0 0 8px #f43f5e';
    }
  }
  updateHoursStatus();
  setInterval(updateHoursStatus, 30000);

  // --- 2. Menu Data (Indian Haute Cuisine) ---
  const MENU_DATA = [
    {
      id: 'galouti',
      name: 'Awadhi Galouti Kebab',
      hindiName: 'अवधी गलौटी कबाब',
      category: 'appetizer',
      price: 1850,
      description: 'Silken minced lamb infused with 160 potli spices, charcoal dhungar smoke, 24K chandi warq, served on miniature saffron sheermal.',
      provenance: 'Lucknow, Uttar Pradesh',
    },
    {
      id: 'malai-broccoli',
      name: 'Malai Truffle Broccoli & Paneer',
      hindiName: 'मलाई ट्रफल ब्रोकली व पनीर',
      category: 'appetizer',
      price: 1450,
      description: 'Charred clay-oven broccoli florets and Malai paneer marinated in roasted cashew cheese, green cardamom, and winter truffle oil.',
      provenance: 'Chandigarh & Kangra Valley',
    },
    {
      id: 'butter-chicken',
      name: 'Old Delhi Smoked Butter Chicken',
      hindiName: 'पुरानी दिल्ली मखमली मुर्ग',
      category: 'main',
      price: 2100,
      description: 'Tandoor-charred chicken ballotine resting in 48-hour slow-reduced tomato-cashew makhani gravy, churned white makhan, and crispy roomali tuile.',
      provenance: 'Old Delhi & Punjab',
    },
    {
      id: 'dal-aurelia',
      name: 'Dal AURELIA (48-Hr Bukhara)',
      hindiName: 'दाल औरेलिया (धीमी आंच)',
      category: 'main',
      price: 1350,
      description: 'Whole black urad lentils slow-simmered over live charcoal embers for 48 uninterrupted hours with San Marzano purée and fresh cream.',
      provenance: 'North-West Frontier Heritage',
    },
    {
      id: 'shahi-tukda',
      name: 'Kesariya Shahi Tukda & Rasmalai Sphere',
      hindiName: 'केसरिया शाही टुकड़ा व रसमलाई',
      category: 'dessert',
      price: 1450,
      description: 'Crisp ghee brioche infused with saffron honey, velvety cardamom rabri, bursting molecular rasmalai sphere, Iranian pistachio soil, and 24K gold foil.',
      provenance: 'Awadh & Bengal Heritage',
    },
    {
      id: 'royal-old-fashioned',
      name: 'Royal Saffron & Clove Old Fashioned',
      hindiName: 'शाही लौंग व केसर कॉकटेल',
      category: 'drinks',
      price: 950,
      description: 'Smoked single malt aged in bourbon casks, Kashmiri saffron reduction, aromatic clove bitters, poured over a hand-carved clear ice diamond.',
      provenance: 'AURELIA Mixology Laboratory',
    },
  ];

  // Render Menu Items
  const menuContainer = document.getElementById('menu-items-grid');
  function renderMenu(items) {
    menuContainer.innerHTML = '';
    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <div>
          <div class="menu-card-top">
            <div>
              <h3 class="dish-name">${item.name}</h3>
              <p class="dish-hindi">${item.hindiName}</p>
            </div>
            <span class="dish-price">₹${item.price.toLocaleString('en-IN')}</span>
          </div>
          <p class="dish-desc">${item.description}</p>
        </div>
        <div class="dish-card-footer">
          <span class="dish-origin">${item.provenance}</span>
          <button class="btn-primary btn-add-cart" data-id="${item.id}">Customize & Order</button>
        </div>
      `;
      menuContainer.appendChild(card);
    });

    // Add event listeners to customize buttons
    document.querySelectorAll('.btn-add-cart').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        openCustomModal(id);
      });
    });
  }
  renderMenu(MENU_DATA);

  // Category Filtering
  document.querySelectorAll('.cat-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-cat');
      if (cat === 'all') {
        renderMenu(MENU_DATA);
      } else {
        const filtered = MENU_DATA.filter((m) => m.category === cat);
        renderMenu(filtered);
      }
    });
  });

  // Search Filter
  const searchInput = document.getElementById('menu-search-input');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = MENU_DATA.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.hindiName.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
    renderMenu(filtered);
  });

  // Render Anatomy cards
  const anatomyGrid = document.getElementById('anatomy-cards-grid');
  const ANATOMY_INGREDIENTS = [
    { title: 'Potli Masala (160 Spices)', origin: 'Old Lucknow Spice Vault', tech: 'Slow-pounded in stone mortar with kabab chini & mace' },
    { title: 'Bespoke Chandi Warq', origin: 'Heritage Silversmiths, Varanasi', tech: 'Hand-beaten edible 24K silver leaf' },
    { title: 'Dhungar Charcoal Smoke', origin: 'Kolkata Binchōtan Hearth', tech: 'Smoked with whole cloves and melted A2 desi cow ghee' },
    { title: 'Kashmiri Mogra Saffron', origin: 'Pampore Highlands, Kashmir', tech: 'Infused for 36 hours in warm buffalo milk' },
  ];

  ANATOMY_INGREDIENTS.forEach((ing, i) => {
    const card = document.createElement('div');
    card.className = 'glass-card';
    card.innerHTML = `
      <span class="gold-text" style="font-family: monospace;">0${i + 1}</span>
      <h3 style="font-family: var(--font-serif); font-size: 20px; color: #fff; margin-top: 6px;">${ing.title}</h3>
      <p style="font-size: 12px; color: var(--gold-light); margin: 6px 0;">${ing.origin}</p>
      <p style="font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 8px;">${ing.tech}</p>
    `;
    anatomyGrid.appendChild(card);
  });

  // --- 3. Cart & Ordering System ---
  let cart = [];
  let currentModalItem = null;

  const modal = document.getElementById('custom-modal');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartCounter = document.getElementById('cart-counter');

  function openCustomModal(id) {
    currentModalItem = MENU_DATA.find((m) => m.id === id);
    if (!currentModalItem) return;

    document.getElementById('modal-item-title').textContent = currentModalItem.name;
    document.getElementById('modal-item-price').textContent = `₹${currentModalItem.price.toLocaleString('en-IN')}`;
    document.getElementById('modal-item-desc').textContent = currentModalItem.description;
    modal.classList.remove('hidden');
  }

  document.getElementById('btn-close-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.getElementById('btn-confirm-add').addEventListener('click', () => {
    if (!currentModalItem) return;
    let extra = 0;
    if (document.getElementById('mod-acc-1').checked) extra += 250;
    if (document.getElementById('mod-acc-2').checked) extra += 180;

    cart.push({
      item: currentModalItem,
      totalPrice: currentModalItem.price + extra,
    });

    modal.classList.add('hidden');
    updateCartUI();
    openCartDrawer();
  });

  function updateCartUI() {
    cartCounter.textContent = cart.length;
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if (cart.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">Your royal order is empty.</p>';
      document.getElementById('cart-subtotal').textContent = '₹0';
      document.getElementById('cart-total').textContent = '₹0';
      return;
    }

    let subtotal = 0;
    cart.forEach((cItem, idx) => {
      subtotal += cItem.totalPrice;
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);';
      row.innerHTML = `
        <div>
          <div style="font-size: 14px; color: #fff; font-family: var(--font-serif);">${cItem.item.name}</div>
          <div style="font-size: 11px; color: var(--gold-light);">Chef Preparation</div>
        </div>
        <div style="display:flex; align-items:center; gap: 12px;">
          <span style="font-size: 14px; color: var(--gold-primary);">₹${cItem.totalPrice.toLocaleString('en-IN')}</span>
          <button style="background:none; border:none; color: var(--text-muted); cursor:pointer;" data-idx="${idx}">&times;</button>
        </div>
      `;
      container.appendChild(row);
    });

    container.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', (e) => {
        const i = Number(e.target.getAttribute('data-idx'));
        cart.splice(i, 1);
        updateCartUI();
      });
    });

    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('cart-total').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  function openCartDrawer() {
    cartDrawer.classList.remove('hidden');
  }

  document.getElementById('btn-open-cart').addEventListener('click', openCartDrawer);
  document.getElementById('btn-close-cart').addEventListener('click', () => {
    cartDrawer.classList.add('hidden');
  });

  // WhatsApp Checkout
  document.getElementById('btn-checkout-wa').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add a dish first.');
      return;
    }
    let orderList = '';
    let total = 0;
    cart.forEach((c) => {
      orderList += `- ${c.item.name}: ₹${c.totalPrice}\n`;
      total += c.totalPrice;
    });

    const msg = encodeURIComponent(
      `Namaste Chef Ayan Ghosh,\n\nI would like to place an order from AURELIA:\n\n${orderList}\nTotal: ₹${total}\n\nKindly confirm dispatch.`
    );
    window.open(`https://wa.me/916294601364?text=${msg}`, '_blank');
  });

  // --- 4. Table Reservation Engine ---
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('res-date');
  if (dateInput) dateInput.value = today;

  const resForm = document.getElementById('reservation-form');
  resForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const seating = document.getElementById('res-seating').value;
    const notes = document.getElementById('res-notes').value || 'None';

    const ref = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;

    resForm.classList.add('hidden');
    const successBox = document.getElementById('reservation-success');
    successBox.classList.remove('hidden');

    document.getElementById('res-success-msg').textContent = `We await your presence, ${name}. Your table is confirmed.`;
    document.getElementById('res-summary-box').innerHTML = `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px; margin: 16px 0; text-align: left; font-size: 13px;">
        <p><strong>Booking Ref:</strong> <span class="gold-text">${ref}</span></p>
        <p><strong>Date & Time:</strong> ${date} at ${time} IST</p>
        <p><strong>Party Size:</strong> ${guests} Guests (${seating})</p>
        <p><strong>Special Requests:</strong> ${notes}</p>
        <p style="margin-top: 8px; color: var(--gold-light); font-size: 11px;">Confirmation notification transmitted to Chef Ayan Ghosh.</p>
      </div>
    `;

    const waMsg = encodeURIComponent(
      `Namaste Chef Ayan Ghosh,\n\nI have booked a table at AURELIA:\n\nReference: ${ref}\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nArea: ${seating}\nNotes: ${notes}\n\nPlease confirm.`
    );
    document.getElementById('res-wa-btn').href = `https://wa.me/916294601364?text=${waMsg}`;
  });

  document.getElementById('res-reset-btn').addEventListener('click', () => {
    document.getElementById('reservation-success').classList.add('hidden');
    resForm.classList.remove('hidden');
    resForm.reset();
  });

  // --- 5. Three.js Background 3D Model with Scroll Assembly ---
  const container = document.getElementById('canvas-container');
  if (!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 5.8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // Lights
  const keyLight = new THREE.DirectionalLight(0xff9933, 2.6);
  keyLight.position.set(4, 7, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xffb84d, 3.4);
  rimLight.position.set(-4, 3, -3);
  scene.add(rimLight);

  const fillLight = new THREE.AmbientLight(0x29180d, 0.95);
  scene.add(fillLight);

  // Master Dish Group
  const dishGroup = new THREE.Group();
  scene.add(dishGroup);

  // 5 Plating Assembly Layers
  const layer1Plate = new THREE.Group();
  const layer2Sauce = new THREE.Group();
  const layer3Kebab = new THREE.Group();
  const layer4Garnish = new THREE.Group();
  const layer5Tuile = new THREE.Group();

  dishGroup.add(layer1Plate);
  dishGroup.add(layer2Sauce);
  dishGroup.add(layer3Kebab);
  dishGroup.add(layer4Garnish);
  dishGroup.add(layer5Tuile);

  // Build Layer 1: Kansa Bronze Coupe Plate
  const platePoints = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.2, 0.02),
    new THREE.Vector2(2.1, 0.12),
    new THREE.Vector2(2.8, 0.35),
    new THREE.Vector2(3.0, 0.45),
    new THREE.Vector2(3.04, 0.43),
    new THREE.Vector2(2.78, 0.28),
    new THREE.Vector2(2.0, 0.06),
    new THREE.Vector2(1.0, -0.04),
    new THREE.Vector2(0.9, -0.15),
    new THREE.Vector2(0.8, -0.15),
    new THREE.Vector2(0.7, -0.04),
    new THREE.Vector2(0, -0.04),
  ];
  const plateGeo = new THREE.LatheGeometry(platePoints, 64);
  const plateMat = new THREE.MeshStandardMaterial({ color: 0x221a14, roughness: 0.72, metalness: 0.35 });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  plateMesh.castShadow = true;
  layer1Plate.add(plateMesh);

  // Inlaid Gold Rim
  const rimGeo = new THREE.TorusGeometry(2.9, 0.025, 16, 64);
  rimGeo.rotateX(Math.PI / 2);
  rimGeo.translate(0, 0.42, 0);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xe6ca65, roughness: 0.15, metalness: 0.95 });
  layer1Plate.add(new THREE.Mesh(rimGeo, rimMat));

  // Shadow
  const shadowGeo = new THREE.CircleGeometry(3.3, 48);
  shadowGeo.rotateX(-Math.PI / 2);
  shadowGeo.translate(0, -0.18, 0);
  layer1Plate.add(new THREE.Mesh(shadowGeo, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.65 })));

  // Layer 2: Rogan / Makhani Gravy Pool
  const sauceGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.04, 36);
  sauceGeo.translate(0.05, 0.03, 0.05);
  const sauceMat = new THREE.MeshPhysicalMaterial({ color: 0x732912, roughness: 0.08, clearcoat: 1.0 });
  layer2Sauce.add(new THREE.Mesh(sauceGeo, sauceMat));

  // Layer 3: Central Galouti Medallions
  for (let i = 0; i < 3; i++) {
    const kGeo = new THREE.CylinderGeometry(0.55, 0.58, 0.28, 24);
    const kMat = new THREE.MeshStandardMaterial({ color: 0x3d2015, roughness: 0.6 });
    const kMesh = new THREE.Mesh(kGeo, kMat);
    const a = (i * Math.PI * 2) / 3;
    kMesh.position.set(Math.cos(a) * 0.42, 0.18, Math.sin(a) * 0.42);
    layer3Kebab.add(kMesh);
  }

  // Layer 4: 24K Chandi Warq & Pomegranate
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, metalness: 0.98, roughness: 0.1 });
  for (let i = 0; i < 6; i++) {
    const wGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const wMesh = new THREE.Mesh(wGeo, silverMat);
    wMesh.position.set((Math.random() - 0.5) * 0.8, 0.48 + Math.random() * 0.06, (Math.random() - 0.5) * 0.8);
    layer4Garnish.add(wMesh);
  }

  // Layer 5: Saffron Roomali Tuile Arch
  const tuileCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.0, 0.3, 0.4),
    new THREE.Vector3(-0.4, 1.05, 0.1),
    new THREE.Vector3(0.5, 0.95, -0.3),
    new THREE.Vector3(1.15, 0.25, -0.5),
  ]);
  const tuileGeo = new THREE.TubeGeometry(tuileCurve, 32, 0.045, 8, false);
  const tuileMat = new THREE.MeshPhysicalMaterial({ color: 0xf4a261, roughness: 0.35, transmission: 0.2 });
  layer5Tuile.add(new THREE.Mesh(tuileGeo, tuileMat));

  // Dhungar Charcoal Smoke Particles
  const pCount = 35;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 1.2;
    pPos[i * 3 + 1] = 0.5 + Math.random() * 1.5;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const smokePoints = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffe0b2, size: 0.15, transparent: true, opacity: 0.4 }));
  dishGroup.add(smokePoints);

  // Scroll Choreography
  let scrollP = 0;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollP = max > 0 ? window.scrollY / max : 0;
  });

  // Drag interaction for 360 inspection
  let isInspecting = false;
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let userRotX = 0, userRotY = 0;

  const inspectBtn = document.getElementById('btn-toggle-inspect');
  const heroInspectBtn = document.getElementById('hero-inspect-btn');

  function toggleInspect() {
    isInspecting = !isInspecting;
    container.classList.toggle('inspecting', isInspecting);
    if (inspectBtn) inspectBtn.textContent = isInspecting ? 'Exit 360°' : '👁 360°';
  }

  if (inspectBtn) inspectBtn.addEventListener('click', toggleInspect);
  if (heroInspectBtn) heroInspectBtn.addEventListener('click', toggleInspect);

  window.addEventListener('pointerdown', (e) => {
    if (!isInspecting) return;
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;
    userRotY += dx * 0.008;
    userRotX += dy * 0.008;
  });

  window.addEventListener('pointerup', () => { isDragging = false; });

  // Animation Loop with delta time damping
  let clock = new THREE.Clock();
  let l2_y = 2.0, l3_y = 2.5, l4_y = 2.8, l5_y = 3.0;

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);
    const damp = 1 - Math.exp(-8.0 * delta);

    // Determine current assembly stage based on scroll
    let stage = 1;
    if (scrollP < 0.18) stage = 1;
    else if (scrollP < 0.42) stage = 2;
    else if (scrollP < 0.68) stage = 3;
    else if (scrollP < 0.88) stage = 4;
    else stage = 5;

    // Update HUD
    const hudNum = document.getElementById('hud-stage-num');
    const hudPercent = document.getElementById('hud-stage-percent');
    const hudTitle = document.getElementById('hud-stage-title');
    const hudDesc = document.getElementById('hud-stage-desc');
    const hudFill = document.getElementById('hud-progress-fill');

    if (hudNum) {
      hudNum.textContent = `Phase ${stage} / 5`;
      hudPercent.textContent = `${stage * 20}% Plated`;
      hudFill.style.width = `${stage * 20}%`;

      const STAGE_TITLES = [
        'The Kansa Thali Base',
        'Rogan & Makhani Gravy',
        'Awadhi Galouti Medallions',
        'Chandi Warq & Garnishes',
        'Saffron Roomali Tuile',
      ];
      const STAGE_DESCS = [
        'Bronze coupe thali with hand-inlaid 24K gold mandala rim descends.',
        '48-hour slow-reduced velvet gravy pools across the plate with desi ghee.',
        'Binchōtan-charred lamb medallions seat softly with rising dhungar smoke.',
        'Hand-beaten 24K silver Chandi warq and ruby pomegranate pearls flutter down.',
        'Fragile arched saffron tuile crowns the dish as the plate rotates in 360°.',
      ];
      hudTitle.textContent = STAGE_TITLES[stage - 1];
      hudDesc.textContent = STAGE_DESCS[stage - 1];
    }

    // Layer descent physics
    const target2 = stage >= 2 ? 0 : 2.0;
    const target3 = stage >= 3 ? 0 : 2.5;
    const target4 = stage >= 4 ? 0 : 2.8;
    const target5 = stage >= 5 ? 0 : 3.0;

    l2_y += (target2 - l2_y) * damp;
    l3_y += (target3 - l3_y) * damp;
    l4_y += (target4 - l4_y) * damp;
    l5_y += (target5 - l5_y) * damp;

    layer2Sauce.position.y = l2_y;
    layer3Kebab.position.y = l3_y;
    layer4Garnish.position.y = l4_y;
    layer5Tuile.position.y = l5_y;

    // Overall model position based on scroll
    let targetX = 1.6;
    let targetY = -0.3;
    let targetRotY = scrollP * Math.PI * 4;

    if (window.innerWidth < 900) {
      targetX = 0;
      targetY = 0.2;
    } else {
      if (scrollP > 0.2 && scrollP < 0.5) {
        targetX = 0;
        targetY = 0.1;
      } else if (scrollP >= 0.5 && scrollP < 0.8) {
        targetX = -1.6;
      }
    }

    dishGroup.position.x += (targetX - dishGroup.position.x) * damp;
    dishGroup.position.y += (targetY - dishGroup.position.y) * damp;
    dishGroup.rotation.y += (targetRotY + userRotY - dishGroup.rotation.y) * damp;
    dishGroup.rotation.x += (0.55 + userRotX - dishGroup.rotation.x) * damp;

    // Animate smoke
    const pos = smokePoints.geometry.attributes.position.array;
    for (let i = 0; i < pCount; i++) {
      pos[i * 3 + 1] += 0.008;
      if (pos[i * 3 + 1] > 2.0) pos[i * 3 + 1] = 0.5;
    }
    smokePoints.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});