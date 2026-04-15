'use strict';

// =====================================================
// PARTICLE SYSTEM
// =====================================================
const ParticleSystem = (() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COLORS = ['#00f5ff', '#bf00ff', '#ff0080', '#00ff88'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
      life: Math.random() * 300 + 100,
      maxLife: 0,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => {
      const p = createParticle();
      p.maxLife = p.life;
      return p;
    });
    window.addEventListener('resize', resize);
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.life--;
      if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        particles[i] = createParticle();
        particles[i].maxLife = particles[i].life;
        return;
      }
      const opacity = (p.life / p.maxLife) * p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const opacity = (1 - dist / 100) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,245,255,${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }

  return { init };
})();

// =====================================================
// COUNTER ANIMATION
// =====================================================
function animateCounter(el, target) {
  const duration = 2000;
  const startTime = performance.now();
  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    if (target >= 1000000) el.textContent = (current / 1000000).toFixed(1) + 'JT';
    else if (target >= 1000) el.textContent = (current / 1000).toFixed(0) + 'K';
    else el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// =====================================================
// GAME DATA
// =====================================================
const gameData = {
  ml: {
    title: 'Mobile Legends',
    sub: 'Diamonds · Season Pass',
    icon: '<img src="mlbb.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'ml-bg',
    denoms: [
      { amount: '5 Diamonds', price: 'Rp 1.500', bonus: '' },
      { amount: '12 Diamonds', price: 'Rp 3.000', bonus: '' },
      { amount: '65 Diamonds', price: 'Rp 15.000', bonus: '' },
      { amount: '172 Diamonds', price: 'Rp 39.000', bonus: '+5 Bonus' },
      { amount: '257 Diamonds', price: 'Rp 59.000', bonus: '+8 Bonus' },
      { amount: '344 Diamonds', price: 'Rp 79.000', bonus: '+12 Bonus' },
      { amount: '706 Diamonds', price: 'Rp 159.000', bonus: '+28 Bonus' },
      { amount: '2195 Diamonds', price: 'Rp 490.000', bonus: '+95 Bonus' },
      { amount: 'Weekly Pass', price: 'Rp 29.000', bonus: '100 Diamonds/hari' },
    ],
  },
  ff: {
    title: 'Free Fire',
    sub: 'Diamonds · Elite Pass',
    icon: '<img src="ffv6.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'ff-bg',
    denoms: [
      { amount: '50 Diamonds', price: 'Rp 11.000', bonus: '' },
      { amount: '100 Diamonds', price: 'Rp 20.000', bonus: '' },
      { amount: '210 Diamonds', price: 'Rp 40.000', bonus: '+5 Bonus' },
      { amount: '520 Diamonds', price: 'Rp 99.000', bonus: '+15 Bonus' },
      { amount: '1060 Diamonds', price: 'Rp 199.000', bonus: '+30 Bonus' },
      { amount: 'Elite Pass', price: 'Rp 79.000', bonus: 'Season Eksklusif' },
    ],
  },
  pubg: {
    title: 'PUBG Mobile',
    sub: 'UC · Royal Pass',
    icon: '<img src="pubgmv7.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'pubg-bg',
    denoms: [
      { amount: '60 UC', price: 'Rp 15.000', bonus: '' },
      { amount: '170 UC', price: 'Rp 40.000', bonus: '' },
      { amount: '325 UC', price: 'Rp 75.000', bonus: '' },
      { amount: '660 UC', price: 'Rp 149.000', bonus: '+10 Bonus' },
      { amount: '1800 UC', price: 'Rp 399.000', bonus: '+30 Bonus' },
      { amount: 'Royal Pass', price: 'Rp 149.000', bonus: 'Season Penuh' },
    ],
  },
  gi: {
    title: 'Genshin Impact',
    sub: 'Genesis Crystals · Welkin',
    icon: '<img src="genshin.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'gi-bg',
    denoms: [
      { amount: '60 Crystals', price: 'Rp 15.000', bonus: '' },
      { amount: '300 Crystals', price: 'Rp 69.000', bonus: '+30 Bonus' },
      { amount: '980 Crystals', price: 'Rp 219.000', bonus: '+110 Bonus' },
      { amount: '1980 Crystals', price: 'Rp 439.000', bonus: '+260 Bonus' },
      { amount: 'Welkin Moon', price: 'Rp 79.000', bonus: '90 Primogems/hari' },
    ],
  },
  val: {
    title: 'Valorant',
    sub: 'VP · Battle Pass',
    icon: '<img src="vlalo.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'val-bg',
    denoms: [
      { amount: '475 VP', price: 'Rp 49.000', bonus: '' },
      { amount: '1000 VP', price: 'Rp 99.000', bonus: '' },
      { amount: '2050 VP', price: 'Rp 199.000', bonus: '' },
      { amount: '3650 VP', price: 'Rp 349.000', bonus: '' },
      { amount: 'Battle Pass', price: 'Rp 149.000', bonus: 'Konten Eksklusif' },
    ],
  },
  hok: {
    title: 'Honor of Kings',
    sub: 'Tokens · Season Pass',
    icon: '<img src="hokv7.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'hok-bg',
    denoms: [
      { amount: '60 Tokens', price: 'Rp 11.000', bonus: '' },
      { amount: '160 Tokens', price: 'Rp 29.000', bonus: '' },
      { amount: '330 Tokens', price: 'Rp 59.000', bonus: '+10 Bonus' },
      { amount: '680 Tokens', price: 'Rp 119.000', bonus: '+20 Bonus' },
      { amount: 'Season Pass', price: 'Rp 89.000', bonus: 'Konten Musiman' },
    ],
  },
  steam: {
    title: 'Steam Wallet',
    sub: 'USD · IDR Wallet Code',
    icon: '<img src="mlbb.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'steam-bg',
    denoms: [
      { amount: 'Rp 20.000', price: 'Rp 22.000', bonus: '' },
      { amount: 'Rp 50.000', price: 'Rp 53.000', bonus: '' },
      { amount: 'Rp 100.000', price: 'Rp 104.000', bonus: '' },
      { amount: 'Rp 200.000', price: 'Rp 207.000', bonus: '' },
      { amount: 'USD 5', price: 'Rp 82.000', bonus: '' },
      { amount: 'USD 10', price: 'Rp 162.000', bonus: '' },
    ],
  },
  coc: {
    title: 'Clash of Clans',
    sub: 'Gems · Season Challenges',
    icon: '<img src="coc.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    bg: 'coc-bg',
    denoms: [
      { amount: '80 Gems', price: 'Rp 14.000', bonus: '' },
      { amount: '500 Gems', price: 'Rp 79.000', bonus: '' },
      { amount: '1200 Gems', price: 'Rp 189.000', bonus: '+50 Bonus' },
      { amount: '2500 Gems', price: 'Rp 389.000', bonus: '+100 Bonus' },
      { amount: 'Season Pass', price: 'Rp 59.000', bonus: 'Gold Pass' },
    ],
  },
  // ★ NEW GAMES
  hsr: {
    title: 'Honkai: Star Rail',
    sub: 'Oneiric Shards · Express Pass',
    icon: '<img src="hsr.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span style="display:none;font-size:2rem;align-items:center;justify-content:center;width:100%;height:100%;">🌌</span>',
    bg: 'hsr-bg',
    denoms: [
      { amount: '60 Oneiric Shards', price: 'Rp 15.000', bonus: '' },
      { amount: '300 Oneiric Shards', price: 'Rp 69.000', bonus: '+30 Bonus' },
      { amount: '980 Oneiric Shards', price: 'Rp 219.000', bonus: '+110 Bonus' },
      { amount: '1980 Oneiric Shards', price: 'Rp 439.000', bonus: '+260 Bonus' },
      { amount: '3280 Oneiric Shards', price: 'Rp 719.000', bonus: '+600 Bonus' },
      { amount: 'Express Supply Pass', price: 'Rp 79.000', bonus: '90 Stellar Jade/hari' },
      { amount: 'Nameless Glory', price: 'Rp 149.000', bonus: 'Battle Pass Penuh' },
    ],
  },
  zzz: {
    title: 'Zenless Zone Zero',
    sub: 'Monochrome · Boopon',
    icon: '<img src="zzz.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span style="display:none;font-size:2rem;align-items:center;justify-content:center;width:100%;height:100%;">⚡</span>',
    bg: 'zzz-bg',
    denoms: [
      { amount: '60 Monochrome', price: 'Rp 15.000', bonus: '' },
      { amount: '300 Monochrome', price: 'Rp 69.000', bonus: '+30 Bonus' },
      { amount: '980 Monochrome', price: 'Rp 219.000', bonus: '+110 Bonus' },
      { amount: '1980 Monochrome', price: 'Rp 439.000', bonus: '+260 Bonus' },
      { amount: '3280 Monochrome', price: 'Rp 719.000', bonus: '+600 Bonus' },
      { amount: 'Playtest Pass S', price: 'Rp 79.000', bonus: '90 Polychrome/hari' },
      { amount: 'Boopon Pack', price: 'Rp 149.000', bonus: 'Konten Eksklusif' },
    ],
  },
  roblox: {
    title: 'Roblox',
    sub: 'Robux · Premium',
    icon: '<img src="roblox.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span style="display:none;font-size:2rem;align-items:center;justify-content:center;width:100%;height:100%;">🧱</span>',
    bg: 'roblox-bg',
    denoms: [
      { amount: '80 Robux', price: 'Rp 14.000', bonus: '' },
      { amount: '400 Robux', price: 'Rp 69.000', bonus: '' },
      { amount: '800 Robux', price: 'Rp 129.000', bonus: '' },
      { amount: '1700 Robux', price: 'Rp 259.000', bonus: '' },
      { amount: '4500 Robux', price: 'Rp 679.000', bonus: '' },
      { amount: 'Premium 450', price: 'Rp 59.000', bonus: '450 Robux/bulan' },
      { amount: 'Premium 1000', price: 'Rp 119.000', bonus: '1000 Robux/bulan' },
      { amount: 'Premium 2200', price: 'Rp 229.000', bonus: '2200 Robux/bulan' },
    ],
  },
  mc: {
    title: 'Minecraft',
    sub: 'Minecoins · Marketplace',
    icon: '<img src="minecraft.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span style="display:none;font-size:2rem;align-items:center;justify-content:center;width:100%;height:100%;">⛏️</span>',
    bg: 'mc-bg',
    denoms: [
      { amount: '320 Minecoins', price: 'Rp 20.000', bonus: '' },
      { amount: '530 Minecoins', price: 'Rp 34.000', bonus: '' },
      { amount: '840 Minecoins', price: 'Rp 54.000', bonus: '' },
      { amount: '1720 Minecoins', price: 'Rp 109.000', bonus: '' },
      { amount: '3500 Minecoins', price: 'Rp 219.000', bonus: '' },
      { amount: 'Minecraft Java', price: 'Rp 349.000', bonus: 'Akun Permanen' },
      { amount: 'Minecraft Bedrock', price: 'Rp 249.000', bonus: 'Akun Permanen' },
    ],
  },
};

// =====================================================
// AUTH SYSTEM (localStorage-based demo)
// =====================================================
const Auth = (() => {
  const USERS_KEY = 'deznero_users';
  const SESSION_KEY = 'deznero_session';

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
  }

  function register(name, email, password) {
    if (!name.trim() || !email.trim() || password.length < 6) return { ok: false, msg: 'Semua field wajib diisi. Password minimal 6 karakter.' };
    const users = getUsers();
    if (users[email]) return { ok: false, msg: 'Email sudah terdaftar. Silakan masuk.' };
    users[email] = { name: name.trim(), email, password, createdAt: Date.now() };
    saveUsers(users);
    const user = { name: name.trim(), email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { ok: true, user };
  }

  function login(email, password) {
    if (!email.trim() || !password) return { ok: false, msg: 'Email dan password wajib diisi.' };
    const users = getUsers();
    // Demo mode: accept any email+password (min 6 chars)
    if (password.length < 6) return { ok: false, msg: 'Password minimal 6 karakter.' };
    if (!users[email]) {
      // Auto-register in demo mode
      const name = email.split('@')[0];
      users[email] = { name, email, password, createdAt: Date.now() };
      saveUsers(users);
    }
    const u = users[email];
    const user = { name: u.name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { ok: true, user };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  return { register, login, logout, getCurrentUser };
})();

// =====================================================
// TRANSACTION HISTORY
// =====================================================
const TxHistory = (() => {
  const KEY = 'deznero_history';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  }

  function addTransaction(tx) {
    const all = getAll();
    all.unshift({ ...tx, id: 'VS-' + Date.now().toString(36).toUpperCase(), date: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(all.slice(0, 50))); // keep last 50
    return all[0].id;
  }

  function getUserTransactions(email) {
    return getAll().filter(tx => tx.userEmail === email);
  }

  return { addTransaction, getUserTransactions, getAll };
})();

// =====================================================
// AUTH UI
// =====================================================
const AuthUI = (() => {
  const overlay = document.getElementById('authModal');
  const loginPanel = document.getElementById('loginPanel');
  const registerPanel = document.getElementById('registerPanel');

  function open(mode = 'login') {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    showPanel(mode);
    clearErrors();
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    clearErrors();
    clearInputs();
  }

  function showPanel(mode) {
    loginPanel.style.display = mode === 'login' ? 'block' : 'none';
    registerPanel.style.display = mode === 'register' ? 'block' : 'none';
  }

  function clearErrors() {
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
  }

  function clearInputs() {
    ['loginEmail','loginPassword','regName','regEmail','regPassword'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }

  function showError(panelId, msg) {
    const el = document.getElementById(panelId);
    el.textContent = msg;
    el.style.display = 'block';
  }

  function updateHeader(user) {
    const loggedOut = document.getElementById('authLoggedOut');
    const loggedIn = document.getElementById('authLoggedIn');
    if (user) {
      loggedOut.style.display = 'none';
      loggedIn.style.display = 'block';
      const initial = user.name.charAt(0).toUpperCase();
      document.getElementById('userAvatarHeader').textContent = initial;
      document.getElementById('userMenuName').textContent = user.name.split(' ')[0];
      document.getElementById('dropdownAvatar').textContent = initial;
      document.getElementById('dropdownName').textContent = user.name;
      document.getElementById('dropdownEmail').textContent = user.email;
    } else {
      loggedOut.style.display = 'block';
      loggedIn.style.display = 'none';
    }
  }

  function bindEvents() {
    document.getElementById('openLoginBtn').addEventListener('click', () => open('login'));
    document.getElementById('authClose').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('goRegister').addEventListener('click', () => showPanel('register'));
    document.getElementById('goLogin').addEventListener('click', () => showPanel('login'));

    // Password toggle
    document.getElementById('toggleLoginPass').addEventListener('click', () => {
      const inp = document.getElementById('loginPassword');
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });
    document.getElementById('toggleRegPass').addEventListener('click', () => {
      const inp = document.getElementById('regPassword');
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });

    // Login submit
    document.getElementById('loginSubmit').addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const result = Auth.login(email, password);
      if (!result.ok) { showError('loginError', result.msg); return; }
      updateHeader(result.user);
      close();
      showToast(`✅ Selamat datang, ${result.user.name}!`);
    });

    // Register submit
    document.getElementById('registerSubmit').addEventListener('click', () => {
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      const result = Auth.register(name, email, password);
      if (!result.ok) { showError('registerError', result.msg); return; }
      updateHeader(result.user);
      close();
      showToast(`🚀 Akun berhasil dibuat! Selamat datang, ${result.user.name}!`);
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      Auth.logout();
      updateHeader(null);
      document.getElementById('userDropdown').classList.remove('open');
      showToast('👋 Berhasil keluar.');
    });

    // User menu toggle
    document.getElementById('userMenuBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('userDropdown').classList.toggle('open');
    });
    document.addEventListener('click', () => {
      document.getElementById('userDropdown').classList.remove('open');
    });

    // Dropdown history button
    document.getElementById('dropdownHistory').addEventListener('click', () => {
      document.getElementById('userDropdown').classList.remove('open');
      HistoryUI.open();
    });

    // Nav: Riwayat
    document.getElementById('navHistory').addEventListener('click', (e) => {
      e.preventDefault();
      const user = Auth.getCurrentUser();
      if (!user) { AuthUI.open('login'); showToast('⚠️ Silakan masuk untuk melihat riwayat.'); return; }
      HistoryUI.open();
    });

    // Init header on load
    updateHeader(Auth.getCurrentUser());
  }

  return { open, close, updateHeader, bindEvents };
})();

// =====================================================
// HISTORY UI
// =====================================================
const HistoryUI = (() => {
  const overlay = document.getElementById('historyModal');

  function open() {
    const user = Auth.getCurrentUser();
    if (!user) { AuthUI.open('login'); return; }
    renderHistory(user.email);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderHistory(email) {
    const body = document.getElementById('historyBody');
    const txs = TxHistory.getUserTransactions(email);

    if (txs.length === 0) {
      body.innerHTML = `
        <div class="history-empty">
          <div class="history-empty-icon">📋</div>
          <h3>Belum Ada Transaksi</h3>
          <p>Transaksi top-up kamu akan muncul di sini setelah pembayaran berhasil.</p>
        </div>`;
      return;
    }

    body.innerHTML = txs.map(tx => {
      const date = new Date(tx.date);
      const dateStr = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      return `
        <div class="history-item">
          <div class="history-item-left">
            <div class="history-item-icon">${tx.gameEmoji || '🎮'}</div>
            <div class="history-item-info">
              <div class="history-item-game">${tx.game}</div>
              <div class="history-item-detail">${tx.item} · ID: ${tx.userId}</div>
              <div class="history-item-date">${dateStr} · ${timeStr}</div>
            </div>
          </div>
          <div class="history-item-right">
            <div class="history-item-price">${tx.price}</div>
            <div class="history-item-method">${tx.method}</div>
            <div class="history-status success">✓ Sukses</div>
          </div>
        </div>`;
    }).join('');
  }

  function bindEvents() {
    document.getElementById('historyClose').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  return { open, close, bindEvents };
})();

// =====================================================
// TOAST NOTIFICATION
// =====================================================
function showToast(msg, duration = 3000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// =====================================================
// MODAL CONTROLLER (Top-Up)
// =====================================================
const Modal = (() => {
  let currentGame = null;
  let currentGameKey = null;
  let currentStep = 1;
  let selectedDenom = null;

  const overlay = document.getElementById('topupModal');
  const closeBtn = document.getElementById('modalClose');

  const gameEmojis = {
    ml:'<img src="mlbb.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', ff:'<img src="ffv6.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', pubg:'<img src="pubgmv7.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', gi:'<img src="genshin.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', val:'<img src="vlalo.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', hok:'<img src="hokv7.png" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
    steam:'🖥️', coc:'<img src="coc.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', hsr:'<img src="hsr.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', zzz:'<img src="zzz.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', roblox:'<img src="roblox.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">', mc:'<img src="mine.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">'
  };

  function open(gameKey) {
    currentGame = gameData[gameKey];
    currentGameKey = gameKey;
    if (!currentGame) return;
    selectedDenom = null;
    goToStep(1);
    populateGameInfo();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    currentStep = 1;
    selectedDenom = null;
    // Reset pay button
    const btn = document.getElementById('payBtn');
    btn.innerHTML = '<span class="btn-glow"></span>⚡ Bayar Sekarang';
    btn.disabled = true;
  }

  function populateGameInfo() {
    document.getElementById('modalGameIcon').innerHTML = currentGame.icon;
    document.getElementById('modalGameIcon').className = `modal-game-icon ${currentGame.bg}`;
    document.getElementById('modalGameTitle').textContent = currentGame.title;
    document.getElementById('modalGameSub').textContent = currentGame.sub;

    const grid = document.getElementById('denomGrid');
    grid.innerHTML = '';
    currentGame.denoms.forEach((d, i) => {
      const item = document.createElement('div');
      item.className = 'denom-item';
      item.dataset.index = i;
      item.innerHTML = `
        <div class="denom-amount">${d.amount}</div>
        <div class="denom-price">${d.price}</div>
        ${d.bonus ? `<div class="denom-bonus">${d.bonus}</div>` : ''}
      `;
      item.addEventListener('click', () => selectDenom(item, d));
      grid.appendChild(item);
    });
  }

  function selectDenom(el, denom) {
    document.querySelectorAll('.denom-item').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    selectedDenom = denom;
    document.getElementById('selectedDenomInfo').style.display = 'flex';
    document.getElementById('denomVal').textContent = `${denom.amount} — ${denom.price}`;
    document.getElementById('denomNext').disabled = false;
  }

  function goToStep(step) {
    document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active', 'done'));
    document.querySelectorAll('.step-line').forEach(l => l.classList.remove('active'));

    currentStep = step;

    if (step === 'success') {
      document.getElementById('stepSuccess').classList.add('active');
      return;
    }

    document.getElementById(`step${step}`).classList.add('active');

    document.querySelectorAll('.step').forEach(s => {
      const sNum = parseInt(s.dataset.step);
      if (sNum < step) s.classList.add('done');
      else if (sNum === step) s.classList.add('active');
    });

    document.querySelectorAll('.step-line').forEach((l, i) => {
      if (i < step - 1) l.classList.add('active');
    });
  }

  function fillSummary() {
    document.getElementById('sumItem').textContent = `${currentGame.title} — ${selectedDenom.amount}`;
    document.getElementById('sumUser').textContent = document.getElementById('userId').value || '—';
    document.getElementById('sumTotal').textContent = selectedDenom.price;
  }

  function verifyUser() {
    const uid = document.getElementById('userId').value.trim();
    if (!uid) { shakeElement(document.getElementById('userId')); return; }

    const btn = document.getElementById('userNext');
    btn.textContent = '⏳ Memverifikasi...';
    btn.disabled = true;

    setTimeout(() => {
      const names = ['Player_' + uid.slice(-4), 'GamerX_' + uid.slice(0, 3), 'Hero_' + uid];
      const name = names[Math.floor(Math.random() * names.length)];
      document.getElementById('verifyBanner').style.display = 'flex';
      document.getElementById('verifyName').textContent = name;
      btn.textContent = 'Lanjut →';
      btn.disabled = false;
      btn.dataset.next = '4';
      btn.onclick = () => { fillSummary(); goToStep(4); };
    }, 1500);
  }

  function shakeElement(el) {
    el.style.borderColor = 'var(--neon-pink)';
    el.style.boxShadow = '0 0 12px rgba(255,0,128,0.3)';
    setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 800);
  }

  function processPayment() {
    const payMethod = document.querySelector('input[name="payment"]:checked');
    if (!payMethod) return;

    const btn = document.getElementById('payBtn');
    btn.innerHTML = '<span class="btn-glow"></span>⏳ Memproses...';
    btn.disabled = true;

    setTimeout(() => {
      // Save transaction
      const user = Auth.getCurrentUser();
      const payMethodNames = {
        gopay: 'GoPay', ovo: 'OVO', dana: 'DANA', shopeepay: 'ShopeePay',
        bca: 'BCA', mandiri: 'Mandiri', bni: 'BNI', alfamart: 'Alfamart', qris: 'QRIS'
      };
      const txId = TxHistory.addTransaction({
        game: currentGame.title,
        item: selectedDenom.amount,
        price: selectedDenom.price,
        userId: document.getElementById('userId').value || '—',
        method: payMethodNames[payMethod.value] || payMethod.value,
        userEmail: user ? user.email : 'guest',
        gameEmoji: gameEmojis[currentGameKey] || '🎮',
      });

      document.getElementById('orderId').textContent = txId;
      goToStep('success');
    }, 2000);
  }

  function bindEvents() {
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    document.addEventListener('click', (e) => {
      const nextBtn = e.target.closest('.btn-next');
      const backBtn = e.target.closest('.btn-back');

      if (nextBtn && !nextBtn.disabled) {
        const nextStep = parseInt(nextBtn.dataset.next);
        if (nextStep === 4 && currentStep === 3) {
          const uid = document.getElementById('userId').value.trim();
          if (!uid) { shakeElement(document.getElementById('userId')); return; }
          fillSummary();
        }
        if (!isNaN(nextStep)) goToStep(nextStep);
      }

      if (backBtn) {
        const backStep = parseInt(backBtn.dataset.back);
        if (!isNaN(backStep)) goToStep(backStep);
      }
    });

    document.getElementById('userNext').addEventListener('click', verifyUser);
    document.getElementById('payBtn').addEventListener('click', processPayment);
    document.getElementById('backHomeBtn').addEventListener('click', close);
  }

  return { open, close, bindEvents };
})();

// =====================================================
// CATEGORY FILTER
// =====================================================
function initCategoryFilter() {
  const tabs = document.querySelectorAll('.cat-tab');
  const cards = document.querySelectorAll('.game-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.cat.includes(cat)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// =====================================================
// SEARCH
// =====================================================
function initSearch() {
  const searchInput = document.getElementById('gameSearch');
  const cards = document.querySelectorAll('.game-card');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.cat-tab[data-cat="all"]').classList.add('active');

    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const sub = card.querySelector('.card-sub').textContent.toLowerCase();
      if (!query || title.includes(query) || sub.includes(query)) card.classList.remove('hidden');
      else card.classList.add('hidden');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
      searchInput.value = '';
      cards.forEach(c => c.classList.remove('hidden'));
    }
  });
}

// =====================================================
// GAME CARD CLICK
// =====================================================
function initGameCards() {
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const gameKey = card.dataset.game;
      if (gameKey) Modal.open(gameKey);
    });
  });
}

// =====================================================
// STAT COUNTERS
// =====================================================
function initStatCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.target));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
}

// =====================================================
// CARD 3D TILT
// =====================================================
function initCardTilt() {
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotX = (((e.clientY - rect.top) / rect.height) - 0.5) * -12;
      const rotY = (((e.clientX - rect.left) / rect.width) - 0.5) * 12;
      card.style.transform = `translateY(-6px) scale(1.01) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// =====================================================
// SCROLL REVEAL
// =====================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.06}s`;
        entry.target.style.animation = 'fadeInUp 0.5s ease both';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.game-card, .feature-card').forEach(el => observer.observe(el));
}

// =====================================================
// CURSOR GLOW
// =====================================================
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `position:fixed;width:300px;height:300px;pointer-events:none;z-index:1;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(0,245,255,0.04)0%,transparent 70%);transition:transform 0.1s linear;border-radius:50%;`;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
}

// =====================================================
// HEADER SCROLL
// =====================================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 60 ? 'rgba(0,245,255,0.3)' : 'rgba(0,245,255,0.25)';
  });
}

// =====================================================
// PAYMENT RADIO
// =====================================================
function initPaymentOptions() {
  document.querySelectorAll('.pay-option input').forEach(radio => {
    radio.addEventListener('change', () => { document.getElementById('payBtn').disabled = false; });
  });
}

// =====================================================
// INIT ALL
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  ParticleSystem.init();
  initStatCounters();
  initCategoryFilter();
  initSearch();
  initGameCards();
  initCardTilt();
  initScrollReveal();
  initCursorGlow();
  initHeaderScroll();
  initPaymentOptions();
  Modal.bindEvents();
  AuthUI.bindEvents();
  HistoryUI.bindEvents();

  document.getElementById('payBtn').disabled = true;

  console.log('%c⚡ DEZNERO Loaded', 'color:#00f5ff;font-family:monospace;font-size:14px;font-weight:bold;');
});
