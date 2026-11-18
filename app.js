/* ==========================================================================
   IKNPro — PT IndoPro Karya Nusantara
   Vanilla JS (no dependencies). Data + logic ported from the React app:
   src/data/mockData.ts, src/utils/rules.ts and the modal components.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------ helpers ------------------------------ */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var fmt = function (n) { return 'Rp ' + Math.round(n).toLocaleString('id-ID'); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var icon = function (name, size, extra) {
    return '<svg class="icon i-' + (size || 16) + (extra ? ' ' + extra : '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"/></svg>';
  };
  var randomCode = function () { return Math.floor(1000 + Math.random() * 9000); };
  var downloadText = function (filename, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  };

  /* -------------------------------- data -------------------------------- */
  var EVENTS = [
    { id: 'EVT-BMT-01', title: 'BIMTEK Nasional: Pengelolaan Keuangan & Aset Daerah Berbasis SIPD-RI Sesuai Permendagri No. 77/2020', category: 'BIMTEK', dateRange: '24 - 27 November 2024', city: 'Jakarta Pusat', venue: 'Four Points by Sheraton Jakarta Thamrin', quotaLeft: 6, totalQuota: 35, investmentFee: 'Rp 4.500.000 / Peserta (Fullboard)', hoursCredit: '36 Jam Pelajaran (JP)', tags: ['SIPD-RI', 'BPKAD', 'Permendagri 77', 'Keuangan Daerah'], status: 'Limited' },
    { id: 'EVT-SMN-02', title: 'National Corporate & Government Summit: Optimalisasi Investasi & Infrastruktur Nusantara (IKN)', category: 'Seminar', dateRange: '05 - 06 Desember 2024', city: 'Balikpapan & Sepaku', venue: 'Grand Jatra Balikpapan & Site Tour KIPP IKN', quotaLeft: 14, totalQuota: 120, investmentFee: 'Rp 3.750.000 / Peserta (Hybrid Available)', hoursCredit: '16 Jam Pelajaran (JP)', tags: ['OIKN', 'Infrastruktur', 'BUMN Karya', 'Smart City'], status: 'Open' },
    { id: 'EVT-PRC-03', title: 'Bimbingan Teknis & Mitigasi Risiko Hukum Pengadaan Barang/Jasa (PBJ) Pemerintah Berdasarkan Perpres 12/2021', category: 'Procurement', dateRange: '11 - 13 Desember 2024', city: 'Bandung', venue: 'Hotel Savoy Homann Bidakara Bandung', quotaLeft: 8, totalQuota: 40, investmentFee: 'Rp 4.250.000 / Peserta', hoursCredit: '32 Jam Pelajaran (JP)', tags: ['LKPP', 'Perpres 12/2021', 'Mitigasi Hukum', 'e-Katalog V6'], status: 'Limited' },
    { id: 'EVT-EXP-04', featured: true, title: 'Nusantara Green Technology & Smart Governance Expo 2025', category: 'Expo', dateRange: '15 - 17 Januari 2025', city: 'Jakarta', venue: 'Jakarta Convention Center (JCC) Senayan - Hall B', quotaLeft: 18, totalQuota: 60, investmentFee: 'Start from Rp 3.500.000 / Booth 3x3m', hoursCredit: 'Commercial Expo', tags: ['Smart City', 'Expo 2025', 'Pavilion B2G', 'Booths'], status: 'Open' },
    { id: 'EVT-BMT-05', featured: true, title: 'Pelatihan Sertifikasi Pejabat Pembuat Komitmen (PPK) Tipe C & Tipe B Bersertifikat BNSP', category: 'BIMTEK', dateRange: '20 - 23 Januari 2025', city: 'Yogyakarta', venue: 'The Phoenix Hotel Yogyakarta - MGallery', quotaLeft: 4, totalQuota: 30, investmentFee: 'Rp 4.750.000 / Peserta (Fullboard)', hoursCredit: '40 Jam Pelajaran (JP)', tags: ['Sertifikasi PPK', 'BNSP', 'SKKNI', 'Yogyakarta'], status: 'Almost Full' },
    { id: 'EVT-SMN-06', title: 'Simposium Nasional: Penerapan ESG (Environmental, Social & Governance) dalam Pengadaan Berkelanjutan BUMN', category: 'Seminar', dateRange: '12 Februari 2025', city: 'Jakarta Selatan', venue: 'The Ritz-Carlton Jakarta, Mega Kuningan', quotaLeft: 25, totalQuota: 150, investmentFee: 'Rp 3.500.000 / Peserta', hoursCredit: '16 Jam Pelajaran (JP)', tags: ['ESG BUMN', 'Green Procurement', 'OJK', 'Sustainability'], status: 'Open' }
  ];

  var SPEAKERS = [
    { name: 'Dr. Ir. Wahyu Hidayat, M.Sc., IPU', title: 'Senior Advisor on Digital Infrastructure & Public Sector', organization: 'Dewan Pakar Tata Kelola Pemerintahan Nasional', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', topic: 'Peta Jalan SPBE & Arsitektur Sistem Pemerintahan Berbasis Elektronik Terintegrasi' },
    { name: 'Hj. Sri Rahayu, S.E., M.M., CFrA', title: 'Spesialis Investigasi Pengadaan & Fraud Auditor', organization: 'Ikatan Auditor Pengadaan Indonesia (IAPI)', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', topic: 'Mitigasi Titik Rawan Korupsi & Pemeriksaan BPK terhadap PBJ Instansi Pemerintah' },
    { name: 'Bimo Wicaksono, S.T., M.Eng', title: 'Direktur Manajemen Proyek & Smart Building Solutions', organization: 'PT IndoPro Karya Nusantara', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', topic: 'Standar Konstruksi Modular & Manajemen Venue untuk Pameran Kelas Internasional' }
  ];

  var LEGAL_DOCS = [
    { id: 'nib', code: 'NIB', name: 'Nomor Induk Berusaha (OSS-RBA)', docNumber: '1211260056056', issuingAuthority: 'Kementerian Investasi / BKPM RI', validity: 'Berlaku Selamanya (Efektif Operasional)', badgeText: 'Verified OSS-RBA', verificationNotes: 'KBLI MICE 82301 (Penyelenggara Pertemuan, Insentif, Konvensi, dan Pameran) & KBLI 82302 (Penyelenggara Pameran Khusus)', details: ['KBLI 82301: Aktivitas Penyelenggara Pertemuan, Konferensi, Seminar & BIMTEK', 'KBLI 82302: Aktivitas Penyelenggara Pameran Perdagangan dan Industri (Expo)', 'KBLI 85499: Pelatihan dan Pendidikan Non-Formal Lainnya (Diklat Teknis)', 'Status: Terbit Otomatis dengan Tingkat Risiko Menengah Tinggi & Rendah Terverifikasi'] },
    { id: 'npwp', code: 'NPWP / PKP', name: 'NPWP & Pengukuhan Pengusaha Kena Pajak', docNumber: '1000000011951194', issuingAuthority: 'Direktorat Jenderal Pajak (KPP Pratama)', validity: 'Aktif & Taat Pajak (Status KSWP Valid)', badgeText: 'Verified PKP Aktif', verificationNotes: 'E-Faktur terintegrasi, Surat Keterangan Fiskal (SKF) berlaku aktif untuk tender APBN/APBD.', details: ['Surat Keterangan Fiskal (SKF) Kemenkeu Nomor: S-8812/WPJ.06/KP.0103/2024', 'Kepatuhan Pelaporan SPT Masa PPh & PPN Tepat Waktu (Grade A)', 'Tersedia Akun Rekening Giro Perusahaan Mandiri & BNI (Atas Nama PT IndoPro Karya Nusantara)', 'Faktur Pajak resmi terbit bersama setiap penerbitan SPK/Kwitansi'] }
  ];

  var CLIENT_LOGOS = [
    ['Kementerian Keuangan RI', 'KEMENKEU'], ['Kementerian PUPR RI', 'KEMEN PUPR'], ['Otorita Ibu Kota Nusantara', 'OIKN'],
    ['Bappenas RI', 'BAPPENAS'], ['Kemendagri RI', 'KEMENDAGRI'], ['PT PLN (Persero)', 'PLN'],
    ['PT Pertamina (Persero)', 'PERTAMINA'], ['PT Pelabuhan Indonesia', 'PELINDO'], ['PT Telkom Indonesia', 'TELKOM INDONESIA'],
    ['Bank Mandiri (Persero)', 'MANDIRI'], ['Pemerintah Provinsi Jawa Barat', 'PEMPROV JABAR'], ['Pemerintah Provinsi Kaltim', 'PEMPROV KALTIM']
  ];

  var SBM_PROVINCE_RATES = {
    'DKI Jakarta': { dailyAllowance: 530000, hotelRates: { eselon2: 1830000, eselon3: 992000, staf: 730000 } },
    'Kalimantan Timur (IKN)': { dailyAllowance: 430000, hotelRates: { eselon2: 1514000, eselon3: 870000, staf: 620000 } },
    'Jawa Barat (Bandung)': { dailyAllowance: 430000, hotelRates: { eselon2: 1210000, eselon3: 750000, staf: 570000 } },
    'Bali (Denpasar)': { dailyAllowance: 480000, hotelRates: { eselon2: 1600000, eselon3: 910000, staf: 650000 } },
    'DI Yogyakarta': { dailyAllowance: 420000, hotelRates: { eselon2: 1100000, eselon3: 700000, staf: 520000 } }
  };
  var TRAINING_PACKAGE_FEES = { fullboard: 5000000, fullday: 3500000, non_residential: 2500000 };

  var VERIFIED_CERTIFICATES = {
    'IKN-BMT-2024-0891': { id: 'IKN-BMT-2024-0891', recipientName: 'Drs. Bambang Hariyanto, M.Si', nip: '19780415 200312 1 002', institution: 'Inspektorat Jenderal Kementerian Keuangan RI', eventName: 'BIMTEK Implementasi SPBE & Tata Kelola Pengadaan Berbasis Elektronik', category: 'BIMTEK', issueDate: '18 Oktober 2024', hoursCredit: 32, serialNumber: 'SK-IKNPRO/X/2024/0891', verificationHash: 'SHA256:7a9f82c0e18d6e32d1844b2f', gradeStatus: 'Sangat Memuaskan (A)' },
    'IKN-SMN-2024-1142': { id: 'IKN-SMN-2024-1142', recipientName: 'Retno Wulandari, S.E., Ak., CA', nip: '19840922 200801 2 005', institution: 'Bappeda Provinsi Jawa Barat', eventName: 'National Symposium: Accelerating Public Sector Digital Transformation', category: 'Seminar', issueDate: '12 November 2024', hoursCredit: 16, serialNumber: 'SK-IKNPRO/XI/2024/1142', verificationHash: 'SHA256:91c2b489d81e05ca4837ef', gradeStatus: 'Peserta Utama (Verified Attendance)' },
    'IKN-BMT-2025-0102': { id: 'IKN-BMT-2025-0102', recipientName: 'Ir. Hendra Kusuma, M.T.', nip: '19800310 200604 1 008', institution: 'PT Pelabuhan Indonesia (Persero) / Pelindo', eventName: 'Sertifikasi & Kepatuhan Pengadaan Barang/Jasa BUMN Sesuai Perpres 12/2021', category: 'Procurement', issueDate: '24 Januari 2025', hoursCredit: 40, serialNumber: 'SK-IKNPRO/I/2025/0102', verificationHash: 'SHA256:338fa09bc47514a0f62b88', gradeStatus: 'Lulus Kompetensi Madya' }
  };

  var INITIAL_BOOTHS = [
    { id: 'A1', zone: 'Side Wall', basePrice: 3500000, status: 'available' },
    { id: 'A2', zone: 'Side Wall', basePrice: 3500000, status: 'booked' },
    { id: 'A3', zone: 'Side Wall', basePrice: 3500000, status: 'available' },
    { id: 'A4', zone: 'Side Wall', basePrice: 3500000, status: 'available' },
    { id: 'B1', zone: 'Island Center', basePrice: 4200000, status: 'booked' },
    { id: 'B2', zone: 'Island Center', basePrice: 4200000, status: 'available' },
    { id: 'B3', zone: 'Island Center', basePrice: 4200000, status: 'booked' },
    { id: 'B4', zone: 'Island Center', basePrice: 4200000, status: 'available' },
    { id: 'S1', zone: 'Island Center', basePrice: 4200000, status: 'available' },
    { id: 'S2', zone: 'Island Center', basePrice: 4200000, status: 'available' },
    { id: 'S3', zone: 'Island Center', basePrice: 4200000, status: 'booked' },
    { id: 'S4', zone: 'Island Center', basePrice: 4200000, status: 'available' }
  ];

  /* ------------------------ business logic (rules.ts) ------------------------ */
  function calculateSbm(p) {
    var prov = SBM_PROVINCE_RATES[p.province] || SBM_PROVINCE_RATES['DKI Jakarta'];
    var hotelPerNight = p.packageType === 'fullboard' ? 0 : prov.hotelRates[p.tier];
    var nights = Math.max(0, p.days - 1);
    var training = TRAINING_PACKAGE_FEES[p.packageType];
    var transport = p.includeTransport ? p.transportPerPerson : 0;
    var r = {
      daily: prov.dailyAllowance, hotelPerNight: hotelPerNight, nights: nights, training: training, transport: transport,
      subDaily: prov.dailyAllowance * p.days * p.participants,
      subHotel: hotelPerNight * nights * p.participants,
      subTraining: training * p.participants,
      subTransport: transport * p.participants
    };
    r.grand = r.subDaily + r.subHotel + r.subTraining + r.subTransport;
    r.perPerson = p.participants > 0 ? Math.round(r.grand / p.participants) : 0;
    return r;
  }

  function calculateBoothInvoice(basePrice, wattage) {
    var electricity = (wattage / 440) * 450000;
    var subtotal = basePrice + electricity;
    var ppn = Math.round(subtotal * 0.11);
    return { booth: basePrice, electricity: electricity, ppn: ppn, grand: subtotal + ppn };
  }

  function filterEvents(events, category, query) {
    var q = (query || '').trim().toLowerCase();
    return events.filter(function (ev) {
      var okCat = category === 'Semua' || ev.category.toLowerCase() === category.toLowerCase();
      var okQ = !q || ev.title.toLowerCase().indexOf(q) > -1 || ev.city.toLowerCase().indexOf(q) > -1 ||
        ev.venue.toLowerCase().indexOf(q) > -1 || ev.tags.some(function (t) { return t.toLowerCase().indexOf(q) > -1; });
      return okCat && okQ;
    });
  }

  /* =============================== ROUTER =============================== */
  var ROUTES = ['beranda', 'katalog', 'pengadaan', 'verifikasi', 'portfolio', 'legalitas'];
  var pages = $$('.page');
  var navToggle = $('#nav-toggle');
  var mobileNav = $('#mobile-nav');

  function currentRoute() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, '')).toLowerCase();
    if (h === 'legal') return 'legalitas';
    return ROUTES.indexOf(h) > -1 ? h : 'beranda';
  }
  function setMobileNav(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    mobileNav.hidden = !open;
  }
  function renderRoute(initial) {
    var route = currentRoute();
    var active = null;
    pages.forEach(function (p) {
      var on = p.id === 'page-' + route;
      p.hidden = !on;
      if (on) active = p;
    });
    $$('[data-route]').forEach(function (a) {
      if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (active && active.dataset.title) document.title = active.dataset.title;
    setMobileNav(false);
    if (!initial) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      var h1 = active && active.querySelector('h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
      else $('#main').focus({ preventScroll: true });
    }
  }
  window.addEventListener('hashchange', function () { renderRoute(false); });

  navToggle.addEventListener('click', function () {
    setMobileNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setMobileNav(false); navToggle.focus();
    }
  });
  window.matchMedia('(min-width: 1180px)').addEventListener('change', function (m) { if (m.matches) setMobileNav(false); });

  /* =============================== DIALOGS =============================== */
  var openers = {}; // id -> function(triggerEl) run before showModal

  function openDialog(id) {
    var d = $('#dlg-' + id);
    if (!d) return;
    setMobileNav(false);
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.body.classList.add('modal-open');
    var body = $('.modal-body', d); if (body) body.scrollTop = 0;
  }

  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) {
      e.preventDefault();
      var id = o.dataset.open;
      if (openers[id]) openers[id](o);
      openDialog(id);
      return;
    }
    var c = e.target.closest('[data-close]');
    if (c) { var d = c.closest('dialog'); if (d) d.close(); return; }
    if (e.target.closest('[data-print]')) window.print();
  });

  $$('dialog.modal').forEach(function (d) {
    var downOnBackdrop = false;
    d.addEventListener('mousedown', function (e) { downOnBackdrop = e.target === d; });
    d.addEventListener('click', function (e) { if (e.target === d && downOnBackdrop) d.close(); });
    d.addEventListener('close', function () {
      if (!$('dialog[open]')) document.body.classList.remove('modal-open');
    });
  });

  /* ============================ CATALOG (Katalog) ============================ */
  var catTabs = ['Semua', 'BIMTEK', 'Seminar', 'Procurement', 'Expo'];
  var catState = { cat: 'Semua', q: '' };
  var catGrid = $('#cat-grid'), catEmpty = $('#cat-empty'), catCount = $('#cat-count');
  var catSearch = $('#cat-search'), catClear = $('#cat-search-clear'), catTabsEl = $('#cat-tabs');

  function renderCatTabs() {
    catTabsEl.innerHTML = catTabs.map(function (t) {
      return '<button type="button" class="tab" data-cat="' + t + '" aria-pressed="' + (catState.cat === t) + '">' +
        esc(t) + (t === 'Semua' ? ' (' + EVENTS.length + ')' : '') + '</button>';
    }).join('');
  }
  var MONTHS_ID = { januari: 'JAN', februari: 'FEB', maret: 'MAR', april: 'APR', mei: 'MEI', juni: 'JUN', juli: 'JUL', agustus: 'AGU', september: 'SEP', oktober: 'OKT', november: 'NOV', desember: 'DES' };
  var CAT_ICON = { BIMTEK: 'graduation-cap', Seminar: 'presentation', Procurement: 'file-check', Expo: 'store' };
  // "24 - 27 November 2024" -> { days: "24–27", month: "NOV" }
  function dateBadge(range) {
    var m = range.match(/^(\d{1,2})(?:\s*-\s*(\d{1,2}))?\s+(\S+)\s+\d{4}$/);
    if (!m) return null;
    return { days: m[2] ? m[1] + '\u2013' + m[2] : m[1], month: MONTHS_ID[m[3].toLowerCase()] || m[3].slice(0, 3).toUpperCase() };
  }

  function renderCatalog() {
    var list = filterEvents(EVENTS, catState.cat, catState.q);
    catGrid.innerHTML = list.map(function (ev) {
      var almost = ev.status === 'Almost Full';
      var low = almost || ev.quotaLeft <= 6;
      var db = dateBadge(ev.dateRange);
      var cta = (ev.featured || ev.category === 'Seminar') ? 'orange' : 'navy';
      return '<li class="event-item' + (ev.featured ? ' is-featured' : '') + '">' +
        (ev.featured ? '<span class="hot-tab">' + icon('sparkles', 14) + 'Featured / Hot Event</span>' : '') +
        '<article class="event-card" data-cat="' + ev.category + '"><div class="event-body">' +
        '<div class="event-top"><span class="cat">' + icon(CAT_ICON[ev.category], 14) + esc(ev.category) + '</span>' +
        '<span class="seats' + (low ? ' low' : '') + '">' + (almost ? 'Sisa Kursi Terakhir' : 'Sisa ' + ev.quotaLeft + ' Kursi') + '</span></div>' +
        '<div class="event-titlerow"><h3 title="' + esc(ev.title) + '">' + esc(ev.title) + '</h3>' +
        (db ? '<div class="date-badge" aria-hidden="true"><i></i><b>' + db.days + '</b><small>' + db.month + '</small></div>' : '') + '</div>' +
        '<ul class="event-facts">' +
        '<li><span class="fi fi-date">' + icon('calendar', 14) + '</span><span class="date">' + esc(ev.dateRange) + '</span></li>' +
        '<li><span class="fi fi-loc">' + icon('map-pin', 14) + '</span><span>' + esc(ev.venue) + ', ' + esc(ev.city) + '</span></li>' +
        '<li><span class="fi fi-jp">' + icon('graduation-cap', 14) + '</span><span>Bobot: <strong>' + esc(ev.hoursCredit) + '</strong></span></li></ul>' +
        '<ul class="tags" aria-label="Tag">' + ev.tags.slice(0, 3).map(function (t) { return '<li>#' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="event-foot">' +
        '<button type="button" class="btn btn-soft" data-act="tor" data-id="' + ev.id + '" aria-label="Unduh KAK/TOR: ' + esc(ev.title) + '">' + icon('download', 14) + '<span>Unduh KAK/TOR</span></button>' +
        '<button type="button" class="btn btn-cta-' + cta + '" data-act="register" data-id="' + ev.id + '" aria-label="Daftar: ' + esc(ev.title) + '"><span>Daftar</span>' + icon('arrow-right', 14) + '</button>' +
        '</div></article></li>';
    }).join('');
    catEmpty.hidden = list.length > 0;
    catGrid.hidden = list.length === 0;
    catCount.textContent = 'Menampilkan ' + list.length + ' dari ' + EVENTS.length + ' event';
    catClear.hidden = !catState.q;
    $$('.tab', catTabsEl).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === catState.cat)); });
  }
  catTabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    catState.cat = b.dataset.cat; renderCatalog();
  });
  catSearch.addEventListener('input', function () { catState.q = catSearch.value; renderCatalog(); });
  catClear.addEventListener('click', function () { catSearch.value = ''; catState.q = ''; renderCatalog(); catSearch.focus(); });
  $('#cat-reset').addEventListener('click', function () { catState = { cat: 'Semua', q: '' }; catSearch.value = ''; renderCatalog(); });
  catGrid.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var ev = EVENTS.filter(function (x) { return x.id === b.dataset.id; })[0];
    if (!ev) return;
    if (b.dataset.act === 'tor') { prepareTor(ev.title); openDialog('tor'); }
    else { prepareRegister(ev); openDialog('register'); }
  });
  renderCatTabs(); renderCatalog();

  /* ============================ ToR GENERATOR ============================ */
  var DEFAULT_TOPIC = 'BIMTEK Pengelolaan Keuangan & Aset Daerah (SIPD-RI)';
  var TOR_TOPICS = [
    DEFAULT_TOPIC,
    'Mitigasi Risiko Hukum Pengadaan Barang/Jasa (PBJ Perpres 12/2021)',
    'Sertifikasi Kompetensi PPK Tipe B & C Berbasis Standar BNSP',
    'Tata Kelola Sistem Pemerintahan Berbasis Elektronik (SPBE)',
    'Penerapan Tata Kelola ESG & Green Procurement BUMN'
  ];
  var torTopic = $('#tor-topic'), torInst = $('#tor-instansi'), torLoc = $('#tor-location'), torCount = $('#tor-count'), torPrev = $('#tor-preview');

  function prepareTor(topic) {
    var topics = TOR_TOPICS.slice();
    if (topics.indexOf(topic) === -1) topics.unshift(topic); // keep the clicked event's title selectable
    torTopic.innerHTML = topics.map(function (t) { return '<option>' + esc(t) + '</option>'; }).join('');
    torTopic.value = topic;
    renderTor();
  }
  function torText() {
    var fiscalYear = '2024 / 2025', topic = torTopic.value, instansi = torInst.value, location = torLoc.value, n = torCount.value;
    return 'KERANGKA ACUAN KERJA (KAK) / TERM OF REFERENCE (TOR)\n' +
      'KEGIATAN BIMBINGAN TEKNIS DAN PENGEMBANGAN KAPASITAS APARATUR\n' +
      'TAHUN ANGGARAN ' + fiscalYear + '\n\n' +
      '1. LATAR BELAKANG\n' +
      'Dalam rangka mewujudkan tata kelola kepemerintahan yang baik (Good Governance) dan akuntabel, ' + instansi + ' memandang perlu untuk meningkatkan kompetensi sumber daya aparatur sipil negara (ASN) maupun tenaga pengelola teknis. Seiring berlakunya pembaruan regulasi terkait ' + topic + ', diperlukan pendampingan terstruktur bersama lembaga penyelenggara pelatihan resmi berakreditasi.\n\n' +
      '2. DASAR HUKUM\n' +
      'a. Undang-Undang Nomor 20 Tahun 2023 tentang Aparatur Sipil Negara.\n' +
      'b. Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan atas Perpres No. 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah.\n' +
      'c. Peraturan Menteri Dalam Negeri Nomor 77 Tahun 2020 tentang Pedoman Teknis Pengelolaan Keuangan Daerah.\n' +
      'd. Peraturan Menteri Keuangan tentang Standar Biaya Masukan (SBM) Tahun Anggaran Berjalan.\n\n' +
      '3. MAKSUD DAN TUJUAN\n' +
      'a. Meningkatkan pemahaman komprehensif peserta terhadap implementasi regulasi terkini.\n' +
      'b. Memitigasi risiko temuan administratif maupun hukum oleh Badan Pemeriksa Keuangan (BPK) dan Aparat Pengawasan Intern Pemerintah (APIP).\n' +
      'c. Memberikan keterampilan praktis berbasis studi kasus dan simulasi dokumen kerja nyata.\n\n' +
      '4. RUANG LINGKUP MATERI (32 JAM PELAJARAN / JP)\n' +
      '- Modul 1: Kebijakan Nasional dan Kerangka Regulasi Terkini.\n' +
      '- Modul 2: Tata Cara Penyusunan Perencanaan, KAK, dan HPS yang Akuntabel.\n' +
      '- Modul 3: Mitigasi Risiko Fraud, Pengawasan Audit, dan Kepatuhan Kemenkeu/LKPP.\n' +
      '- Modul 4: Evaluasi Akhir, Uji Pemahaman, dan Penerbitan Sertifikat Resmi Ber-barcode.\n\n' +
      '5. WAKTU DAN TEMPAT PELAKSANAAN\n' +
      '- Tempat: Hotel Berbintang Rekanan IKNPro di ' + location + '.\n' +
      '- Durasi: 4 Hari 3 Malam (Paket Fullboard) / 3 Hari 2 Malam.\n' +
      '- Penyelenggara: PT IndoPro Karya Nusantara (IKNPro).\n\n' +
      '6. PESERTA\n' +
      'Jumlah delegasi diusulkan sebanyak ' + n + ' orang dari lingkungan ' + instansi + '.\n\n' +
      '7. PEMBIAYAAN\n' +
      'Biaya penyelenggaraan dibebankan pada DPA/DIPA ' + instansi + ' Tahun Anggaran ' + fiscalYear + ' dengan mempedomani Standar Biaya Masukan (SBM) Kementerian Keuangan RI.\n\n' +
      'Dikeluarkan di: Makassar\n' +
      'Penyelenggara Resmi: PT INDOPRO KARYA NUSANTARA (IKNPro)';
  }
  function renderTor() { torPrev.textContent = torText(); }
  [torTopic, torInst, torLoc, torCount].forEach(function (el) { el.addEventListener('input', renderTor); el.addEventListener('change', renderTor); });
  openers.tor = function () { prepareTor(DEFAULT_TOPIC); }; // fallback if opened without an event
  $('#tor-copy').addEventListener('click', function () {
    var btn = $('#tor-copy'), label = $('span', btn), text = torText();
    function done(ok) {
      label.textContent = ok ? 'Tersalin!' : 'Gagal menyalin';
      setTimeout(function () { label.textContent = 'Salin Teks KAK'; }, 2500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else { done(fallbackCopy(text)); }
  });
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    $('#dlg-tor').appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove(); return ok;
  }

  /* ============================ BIMTEK SYLLABUS ============================ */
  var SYLLABUS = {
    '24': { title: 'BIMTEK Akselerasi & Pembaruan Regulasi Teknis (24 JP / 3 Hari)', description: 'Program kilat pemadatan materi regulasi baru dan penyelarasan dokumen anggaran.', modules: [['6 JP', 'Kebijakan Terkini & Analisis Regulasi Pengadaan B2G'], ['8 JP', 'Penyusunan KAK, Spesifikasi Teknis, dan HPS Akuntabel'], ['6 JP', 'Praktik Transaksi e-Katalog V6 & Negosiasi Harga'], ['4 JP', 'Evaluasi & Simulasi Mitigasi Risiko Temuan Pemeriksa']], certification: 'Sertifikat Kompetensi Partisipatif IKNPro terdaftar di Sistem Nasional.' },
    '32': { title: 'BIMTEK Standar Nasional Aparatur & Korporasi (32 JP / 4 Hari)', description: 'Paket terlengkap mempedomani pedoman Kemendagri & LKPP dengan simulasi komprehensif.', modules: [['8 JP', 'Tata Kelola Penganggaran & Akuntansi Berbasis Digital SIPD-RI'], ['8 JP', 'Manajemen Kontrak Kritis, Perubahan Kontrak (Addendum), dan Serah Terima Pekerjaan (PHO/FHO)'], ['8 JP', 'Audit Investigatif & Bedah Temuan BPK / APIP pada Belanja Modal'], ['8 JP', 'Studi Kasus Riil, Uji Kompetensi Pre/Post Test, dan Diskusi Interaktif']], certification: 'Sertifikat Kelulusan 32 JP ber-barcode resmi, diakui BPKAD & BKN untuk kenaikan jenjang.' },
    '40': { title: 'Diklat Sertifikasi Keahlian Pengadaan Barang & Jasa (40 JP / 5 Hari)', description: 'Program persiapan sertifikasi keahlian tingkat dasar & madya standar BNSP / LKPP.', modules: [['10 JP', 'Pengantar Pengadaan Barang/Jasa Pemerintah & Prinsip Dasar'], ['10 JP', 'Perencanaan Pengadaan & Identifikasi Kebutuhan Satker'], ['10 JP', 'Pemilihan Penyedia, Evaluasi Penawaran, dan Penanganan Sanggah'], ['10 JP', 'Simulasi Try Out Ujian Sertifikasi & Bimbingan Khusus']], certification: 'Sertifikat Uji Kompetensi 40 JP dan rekomendasi asesmen LSP berlisensi BNSP.' }
  };
  function renderSyllabus(jp) {
    var s = SYLLABUS[jp];
    $$('#jp-tabs [data-jp]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.jp === jp)); });
    $('#syllabus').innerHTML =
      '<div class="syl-title"><h3>' + esc(s.title) + '</h3><span class="jp-total">' + jp + ' JP Total</span></div>' +
      '<p class="muted" style="font-size:.75rem;margin-bottom:1rem">' + esc(s.description) + '</p>' +
      '<div class="stack-sm" style="gap:.625rem">' + s.modules.map(function (m) {
        return '<div class="module"><b>' + esc(m[0]) + '</b><span>' + esc(m[1]) + '</span></div>';
      }).join('') + '</div>' +
      '<div class="cert-line">' + icon('award', 16) + '<span>' + esc(s.certification) + '</span></div>';
  }
  $('#jp-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-jp]'); if (b) renderSyllabus(b.dataset.jp);
  });
  renderSyllabus('32');

  /* ============================ SEMINAR SPEAKERS ============================ */
  function initials(name) {
    var words = name.replace(/\b(Dr|Ir|Hj|Drs|H)\.\s*/g, '').split(/[\s,]+/).filter(Boolean);
    return ((words[0] || '')[0] || '') + ((words[1] || '')[0] || '');
  }
  $('#speakers').innerHTML = SPEAKERS.map(function (s) {
    return '<article class="speaker"><div>' +
      '<div class="ava" data-init="' + esc(initials(s.name)) + '"><img src="' + esc(s.avatarUrl) + '" alt="Foto ' + esc(s.name) + '" loading="lazy" referrerpolicy="no-referrer" width="48" height="48"></div>' +
      '<h4>' + esc(s.name) + '</h4><p class="t">' + esc(s.title) + '</p><p class="o">' + esc(s.organization) + '</p></div>' +
      '<q>' + esc(s.topic) + '</q></article>';
  }).join('');
  $$('#speakers .ava img').forEach(function (img) {
    // Photos are hosted on Unsplash in the original; fall back to initials if offline/blocked.
    img.addEventListener('error', function () { var p = img.parentNode; p.textContent = p.dataset.init; p.setAttribute('role', 'img'); p.setAttribute('aria-label', img.alt); });
  });

  /* ============================ SBM ESTIMATOR ============================ */
  var sbm = {
    prov: $('#sbm-province'), tier: $('#sbm-tier'), pkg: $('#sbm-package'),
    days: $('#sbm-days'), people: $('#sbm-people'), transport: $('#sbm-transport')
  };
  sbm.prov.innerHTML = Object.keys(SBM_PROVINCE_RATES).map(function (p) { return '<option>' + esc(p) + '</option>'; }).join('');
  function updateSbm() {
    var days = Number(sbm.days.value), people = Number(sbm.people.value);
    $('#sbm-days-out').textContent = days + ' Hari';
    $('#sbm-people-out').textContent = people + ' Orang';
    var r = calculateSbm({ province: sbm.prov.value, tier: sbm.tier.value, packageType: sbm.pkg.value, days: days, participants: people, includeTransport: sbm.transport.checked, transportPerPerson: 1800000 });
    $('#rab-title').textContent = 'Standar Biaya Masukan PMK - ' + sbm.prov.value;
    $('#sbm-grand').textContent = fmt(r.grand);
    $('#l-daily').textContent = 'Uang Harian Perjalanan Dinas (' + days + ' Hari × ' + people + ' Peserta @ ' + fmt(r.daily) + '):';
    $('#v-daily').textContent = fmt(r.subDaily);
    $('#l-train').textContent = 'Paket Diklat Penyelenggara (' + people + ' Peserta @ ' + fmt(r.training) + '):';
    $('#v-train').textContent = fmt(r.subTraining);
    $('#row-hotel').hidden = !(r.subHotel > 0);
    $('#l-hotel').textContent = 'Akomodasi Hotel Satker (' + r.nights + ' Malam × ' + people + ' Peserta @ ' + fmt(r.hotelPerNight) + '):';
    $('#v-hotel').textContent = fmt(r.subHotel);
    $('#row-transport').hidden = !sbm.transport.checked;
    $('#l-transport').textContent = 'Estimasi Transportasi PP (' + people + ' Peserta @ ' + fmt(r.transport) + '):';
    $('#v-transport').textContent = fmt(r.subTransport);
    $('#v-per').textContent = fmt(r.perPerson) + ' / Orang';
  }
  Object.keys(sbm).forEach(function (k) { sbm[k].addEventListener('input', updateSbm); sbm[k].addEventListener('change', updateSbm); });
  updateSbm();

  /* ============================ BOOTH RESERVATION ============================ */
  var booths = INITIAL_BOOTHS.map(function (b) { return Object.assign({}, b); });
  var selectedBooth = null;
  var boothForm = $('#booth-form'), boothSuccess = $('#booth-success'), boothError = $('#booth-error');

  function wattage() { return Number(($('input[name="watt"]:checked', boothForm) || {}).value || 440); }
  function boothBtn(b) {
    var booked = b.status === 'booked';
    return '<button type="button" class="booth" data-booth="' + b.id + '"' + (booked ? ' disabled' : '') +
      ' aria-pressed="' + (selectedBooth === b.id) + '" aria-label="Stan ' + b.id + (booked ? ', sudah terisi' : ', tersedia') + '">' +
      b.id + '<small>' + (booked ? 'TERISI' : '3x3m') + '</small></button>';
  }
  function renderBooths() {
    $('#booths-side').innerHTML = booths.slice(0, 4).map(boothBtn).join('');
    $('#booths-island').innerHTML = booths.slice(4, 12).map(boothBtn).join('');
    var b = booths.filter(function (x) { return x.id === selectedBooth; })[0];
    if (b) {
      $('#sel-title').textContent = 'Stan Terpilih: Stan ' + b.id;
      $('#sel-zone').textContent = 'Zona: ' + b.zone + ' • Fasilitas Standard Shell Scheme R80 Lengkap.';
      $('#sel-price').textContent = fmt(b.basePrice);
      var inv = calculateBoothInvoice(b.basePrice, wattage());
      $('#q-booth').textContent = fmt(inv.booth);
      $('#q-watt-label').textContent = 'Instalasi Daya Listrik (' + wattage() + 'W):';
      $('#q-elec').textContent = fmt(inv.electricity);
      $('#q-ppn').textContent = fmt(inv.ppn);
      $('#q-total').textContent = fmt(inv.grand);
    } else {
      $('#sel-title').textContent = 'Belum ada stan dipilih';
      $('#sel-zone').textContent = 'Pilih stan yang tersedia pada denah di atas.';
    }
  }
  openers.booth = function () {
    boothForm.reset();
    boothForm.hidden = false; boothSuccess.hidden = true; boothError.hidden = true;
    var first = booths.filter(function (b) { return b.status === 'available'; })[0];
    selectedBooth = first ? first.id : null;
    renderBooths();
  };
  $('#dlg-booth').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-booth]');
    if (btn && !btn.disabled) { selectedBooth = btn.dataset.booth; renderBooths(); var again = $('[data-booth="' + selectedBooth + '"]'); if (again) again.focus(); }
  });
  boothForm.addEventListener('change', function (e) { if (e.target.name === 'watt') renderBooths(); });
  boothForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var company = $('#b-company').value.trim(), pic = $('#b-pic').value.trim(), phone = $('#b-phone').value.trim();
    var b = booths.filter(function (x) { return x.id === selectedBooth; })[0];
    if (!company || !pic || !phone || !b) {
      boothError.textContent = !b ? 'Pilih stan yang tersedia pada denah terlebih dahulu.' : 'Mohon lengkapi nama perusahaan, nama PIC, dan nomor WhatsApp.';
      boothError.hidden = false; return;
    }
    var inv = calculateBoothInvoice(b.basePrice, wattage());
    b.status = 'booked';
    $('#bs-company').textContent = company;
    $('#bs-booth').textContent = b.id;
    $('#bs-code').textContent = 'RSV-EXP-' + b.id + '-' + randomCode();
    $('#bs-stan').textContent = 'Stan ' + b.id + ' (3m x 3m)';
    $('#bs-total').textContent = fmt(inv.grand);
    renderBooths();
    boothForm.hidden = true; boothSuccess.hidden = false;
    $('h3', boothSuccess).setAttribute('tabindex', '-1'); $('h3', boothSuccess).focus();
  });

  /* ============================ LEGAL DOCS & VAULT ============================ */
  $('#legal-cards').innerHTML = LEGAL_DOCS.map(function (d) {
    return '<article class="legal-card"><div><header><b>' + esc(d.code) + '</b><span class="verified-pill">' + icon('check-circle', 12) + 'Verified</span></header>' +
      '<h3 class="line-clamp-1">' + esc(d.name) + '</h3><p class="doc-num mono">' + esc(d.docNumber) + '</p></div>' +
      '<footer>Penerbit: ' + esc(d.issuingAuthority) + '</footer></article>';
  }).join('');
  $('#logo-grid').innerHTML = CLIENT_LOGOS.map(function (c) {
    return '<li class="logo-tile"><span class="ico">' + icon('building', 18) + '</span><b>' + esc(c[1]) + '</b><small class="line-clamp-2">' + esc(c[0]) + '</small></li>';
  }).join('');

  var vaultSel = 'nib';
  function renderVault() {
    $('#vault-tabs').innerHTML = LEGAL_DOCS.map(function (d) {
      return '<button type="button" class="seg" data-doc="' + d.id + '" aria-pressed="' + (d.id === vaultSel) + '"><span class="row"><b>' + esc(d.code) + '</b><span class="dot" aria-hidden="true"></span></span><small class="line-clamp-1">' + esc(d.name) + '</small></button>';
    }).join('');
    var d = LEGAL_DOCS.filter(function (x) { return x.id === vaultSel; })[0];
    $('#vault-doc').innerHTML =
      '<div class="doc-head"><div><span class="verified-pill" style="border:1px solid var(--emerald-200)">' + icon('check-circle', 14) + esc(d.badgeText) + '</span>' +
      '<h3>' + esc(d.name) + '</h3><div class="mono muted" style="font-size:.75rem;margin-top:.125rem">Nomor Dokumen: <strong style="color:var(--navy)">' + esc(d.docNumber) + '</strong></div></div>' +
      '<div class="r"><div>Instansi Penerbit: <strong>' + esc(d.issuingAuthority) + '</strong></div><div>Masa Berlaku: <strong style="color:#047857">' + esc(d.validity) + '</strong></div></div></div>' +
      '<div class="doc-notes"><b>Catatan Verifikasi Auditor:</b><p>' + esc(d.verificationNotes) + '</p></div>' +
      '<span class="field-label">Poin Rincian &amp; Kesesuaian Regulasi:</span><ul class="doc-details">' +
      d.details.map(function (t) { return '<li>' + icon('check-circle', 16) + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ul>';
  }
  $('#vault-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-doc]'); if (!b) return;
    vaultSel = b.dataset.doc; renderVault();
    var again = $('[data-doc="' + vaultSel + '"]'); if (again) again.focus();
  });
  openers.legal = function () { $('#legal-download-label').textContent = 'Unduh Legal Bundle (PDF / ZIP)'; vaultSel = 'nib'; renderVault(); };
  renderVault();
  $('#legal-download').addEventListener('click', function () {
    $('#legal-download-label').textContent = 'Paket Terunduh!';
    downloadText('IKNPro_Legal_Audit_Bundle_2024.txt',
      'PT INDOPRO KARYA NUSANTARA (IKNPro)\nAUDIT-READY LEGAL COMPLIANCE BUNDLE 2024-2025\n==================================================\n' +
      'Badan Hukum: PT IndoPro Karya Nusantara\nSK Kemenkumham: AHU-0019284.AH.01.01.TAHUN 2020\nNIB OSS-RBA: 1211260056056\nNPWP: 1000000011951194\n' +
      'Klasifikasi Baku Lapangan Usaha Indonesia (KBLI):\n- 82301: Penyelenggara Pertemuan, Insentif, Konvensi, dan Pameran (MICE)\n- 82302: Penyelenggara Pameran Perdagangan Khusus (Expo)\n- 85499: Pelatihan dan Pendidikan Non-Formal Lainnya\n\n' +
      'Rekening Resmi PT IndoPro Karya Nusantara:\n- Bank Mandiri KC Jakarta Rasuna Said (Giro IDR): 124-00-1192840-1\n- Bank BNI KC Dukuh Atas (Giro IDR): 099-2849102-3\n\n' +
      'Kepatuhan Pajak:\n- Terdaftar e-Faktur Pajak Pertambahan Nilai (PPN 11%)\n- Surat Keterangan Fiskal (SKF) DJP Terlampir Valid.');
  });

  /* ============================ COMPANY PROFILE ============================ */
  openers.profile = function () { $('#profile-download-label').textContent = 'Unduh File Profil'; };
  $('#profile-download').addEventListener('click', function () {
    $('#profile-download-label').textContent = 'Terunduh!';
    downloadText('Company_Profile_PT_IndoPro_Karya_Nusantara_2024.txt',
      'PT INDOPRO KARYA NUSANTARA (IKNPro)\nCOMPANY PROFILE & CORPORATE CAPABILITIES 2024-2025\n=====================================================\n' +
      'Nama Perusahaan : PT INDOPRO KARYA NUSANTARA (IKNPro)\nBrand Mark      : iKNPro (Mitra Event & BIMTEK Terpercaya)\nBadan Hukum     : Akta Notaris & SK Kemenkumham AHU-0019284.AH.01.01\nNIB (OSS-RBA)   : 1211260056056 (KBLI 82301, 82302, 85499)\nNPWP            : 1000000011951194\n\n' +
      'VISI:\nMenjadi mitra penyelenggara manajemen acara kedinasan, pelatihan aparatur, dan pameran industri terkemuka di Indonesia yang mengedepankan kepatuhan regulasi, tata kelola akuntabel, dan hospitalitas kelas eksekutif.\n\n' +
      'MISI:\n1. Menyelenggarakan Bimbingan Teknis berstandar SKKNI & SBM PMK Kemenkeu bagi aparatur pemerintah.\n2. Memfasilitasi simposium nasional dan forum strategis pembangunan Indonesia Sentris & Nusantara (IKN).\n3. Menyediakan manajemen stan pameran terpadu bagi penyedia industri dan instansi regulator.\n4. Menjaga transparansi pengadaan B2G melalui kesiapan audit LPSE LKPP dan akuntabilitas keuangan.\n\n' +
      'DIVISI UTAMA:\n- Divisi 1: BIMTEK & Sertifikasi Aparatur\n- Divisi 2: Seminar Nasional, Konferensi & Hybrid Event\n- Divisi 3: Commercial Exhibition & Booth Construction\n- Divisi 4: Pendampingan Pengadaan & B2G Regulatory Advisory\n\n' +
      'KANTOR:\n- Alamat: Jalan Nipa-Nipa Raya Nomor 135, Kelurahan Manggala, Kec. Manggala, Kota Makassar, Provinsi Sulawesi Selatan, Kode Pos 90234\n- Kontak: (+62) 857-0585-2676 | indoprokaryanusantara@gmail.com');
  });

  /* ============================ EVENT REGISTRATION ============================ */
  var regForm = $('#reg-form'), regSuccess = $('#reg-success'), regError = $('#reg-error'), regEvent = null;
  function prepareRegister(ev) {
    regEvent = ev;
    regForm.reset(); regForm.hidden = false; regSuccess.hidden = true; regError.hidden = true;
    $('#reg-cat').textContent = 'Kegiatan Terpilih (' + ev.category + ')';
    $('#reg-title').textContent = ev.title;
    $('#reg-date').textContent = ev.dateRange;
    $('#reg-venue').textContent = ev.venue + ', ' + ev.city;
    $('#reg-fee').textContent = ev.investmentFee;
  }
  regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#r-name').value.trim(), inst = $('#r-inst').value.trim(), phone = $('#r-phone').value.trim();
    if (!name || !inst || !phone) { regError.hidden = false; return; }
    var billing = $('input[name="billing"]:checked', regForm).value;
    $('#rs-code').textContent = 'REG-IKN-' + regEvent.category + '-' + randomCode();
    $('#rs-name').textContent = name; $('#rs-inst').textContent = inst; $('#rs-event').textContent = regEvent.title;
    $('#rs-bill').textContent = billing === 'sppd' ? 'SPPD APBD / Satker' : 'Invoice Perusahaan';
    regForm.hidden = true; regSuccess.hidden = false;
    $('h3', regSuccess).setAttribute('tabindex', '-1'); $('h3', regSuccess).focus();
  });

  /* ============================ CERTIFICATE VERIFY ============================ */
  var verifyForm = $('#verify-form'), verifyInput = $('#cert-id'), verifyOut = $('#verify-result');
  function verify(raw) {
    var id = raw.trim().toUpperCase();
    if (!id) { verifyOut.innerHTML = ''; return; }
    var rec = VERIFIED_CERTIFICATES[id];
    if (!rec) {
      verifyOut.innerHTML = '<div class="result-bad">' + icon('alert', 24) + '<h2>Sertifikat Tidak Ditemukan</h2><p>ID Sertifikat tidak ditemukan. Periksa kembali nomor yang tertera pada bagian bawah sertifikat Anda.</p></div>';
      return;
    }
    verifyOut.innerHTML =
      '<div class="result-ok"><div class="verified-badge">' + icon('check-circle', 16) + '<span>Resmi Terverifikasi</span></div>' +
      '<div class="result-top"><div class="result-ico">' + icon('award', 24) + '</div><div><small>ID: ' + esc(rec.id) + ' • ' + esc(rec.serialNumber) + '</small><h2>' + esc(rec.eventName) + '</h2></div></div>' +
      '<dl class="detail-grid">' +
      '<div><dt>' + icon('user', 14) + 'Nama Pemegang Sertifikat:</dt><dd>' + esc(rec.recipientName) + '<small class="mono">NIP: ' + esc(rec.nip) + '</small></dd></div>' +
      '<div><dt>' + icon('building', 14) + 'Instansi / Lembaga:</dt><dd>' + esc(rec.institution) + '</dd></div>' +
      '<div><dt>' + icon('clock', 14) + 'Jam Pelajaran (JP) &amp; Predikat:</dt><dd class="orange">' + rec.hoursCredit + ' JP • ' + esc(rec.gradeStatus) + '</dd></div>' +
      '<div><dt>Tanggal Penerbitan:</dt><dd>' + esc(rec.issueDate) + '<small class="mono">Hash: ' + esc(rec.verificationHash) + '</small></dd></div></dl>' +
      '<div class="result-actions"><span>Tervalidasi langsung oleh Sistem Sertifikasi IKNPro.</span>' +
      '<button type="button" class="btn btn-navy" data-open="cert" data-cert="' + esc(rec.id) + '">' + icon('external', 14) + '<span>Buka E-Sertifikat Digital</span></button></div></div>';
  }
  function showResult() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (verifyOut.firstChild) verifyOut.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }
  verifyForm.addEventListener('submit', function (e) { e.preventDefault(); verify(verifyInput.value); showResult(); });
  $$('[data-sample]').forEach(function (b) {
    b.addEventListener('click', function () { verifyInput.value = b.dataset.sample; verify(b.dataset.sample); showResult(); });
  });
  openers.cert = function (trigger) {
    var r = VERIFIED_CERTIFICATES[trigger.dataset.cert];
    if (!r) return;
    $('#cert-dbid').textContent = 'ID Database: ' + r.id;
    $('#cert-body').innerHTML =
      '<div class="cert-frame"><div class="cert-watermark" aria-hidden="true">iKNPro</div>' +
      '<div class="cert-top"><div class="a">LEMBAGA PENDIDIKAN &amp; PELATIHAN TERAKREDITASI</div><h3>PT INDOPRO KARYA NUSANTARA</h3><div class="c mono">SK Kemenkumham AHU-0019284.AH.01.01 • NIB: 1211260056056 • KBLI 82301</div></div>' +
      '<div class="cert-mid"><div class="k">SERTIFIKAT KELULUSAN &amp; KOMPETENSI</div><div class="s mono">Nomor: ' + esc(r.serialNumber) + '</div>' +
      '<div style="font-size:.75rem;color:var(--slate-600);margin-bottom:.5rem">Diberikan Kepada:</div><div class="recipient">' + esc(r.recipientName) + '</div>' +
      '<div class="mono" style="font-size:.75rem;color:var(--slate-600);margin-top:.25rem">NIP. ' + esc(r.nip) + '</div>' +
      '<div style="font-size:.75rem;font-weight:600;color:var(--slate-700);margin-top:.5rem">Instansi: ' + esc(r.institution) + '</div></div>' +
      '<div class="cert-desc">Telah mengikuti dan dinyatakan <strong>LULUS</strong> dengan predikat <strong>' + esc(r.gradeStatus) + '</strong> pada kegiatan:' +
      '<div class="ev">&ldquo;' + esc(r.eventName) + '&rdquo;</div>dengan bobot pembelajaran setara <strong>' + r.hoursCredit + ' Jam Pelajaran (JP)</strong> yang diselenggarakan di bawah standar kompetensi nasional.</div>' +
      '<div class="cert-sign"><div><div class="tiny mono">DIVERIFIKASI RESMI</div><div class="qr">' + icon('qr', 48) + '</div><div class="tiny mono">' + esc(r.verificationHash.slice(0, 18)) + '...</div></div>' +
      '<div><div class="seal">' + icon('shield-check', 32) + '</div><div class="reg">TERDAFTAR DI DATABASE NASIONAL</div></div>' +
      '<div><div class="loc">Makassar, ' + esc(r.issueDate) + '</div><div class="sign-name">Dr. Ir. Wahyu Hidayat, M.Sc.</div><div class="role">Direktur Eksekutif Pelatihan IKNPro</div></div></div></div>';
  };

  /* ================================ CONTACT ================================ */
  var contactForm = $('#contact-form'), contactMain = $('#contact-main'), contactSuccess = $('#contact-success'), contactError = $('#contact-error');
  openers.contact = function (trigger) {
    contactForm.reset(); contactMain.hidden = false; contactSuccess.hidden = true; contactError.hidden = true;
    if (trigger && trigger.dataset.service) $('#c-service').value = trigger.dataset.service;
  };
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#c-name').value.trim(), phone = $('#c-phone').value.trim();
    if (!name || !phone) { contactError.hidden = false; return; }
    $('#cs-name').textContent = name; $('#cs-phone').textContent = phone;
    contactMain.hidden = true; contactSuccess.hidden = false;
    $('h3', contactSuccess).setAttribute('tabindex', '-1'); $('h3', contactSuccess).focus();
  });

  /* ============================ PORTFOLIO: RIBBON + COVERFLOW ============================ */
  (function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- partner ribbon: arrow buttons, keyboard, mouse-drag (touch scrolls natively)
    var vp = $('#ribbon');
    if (vp) {
      var by = function (dir) { vp.scrollBy({ left: dir * Math.max(240, vp.clientWidth * 0.7), behavior: reduce ? 'auto' : 'smooth' }); };
      $('#ribbon-prev').addEventListener('click', function () { by(-1); });
      $('#ribbon-next').addEventListener('click', function () { by(1); });
      vp.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); by(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); by(-1); }
      });
      var down = false, startX = 0, startLeft = 0;
      vp.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; startX = e.clientX; startLeft = vp.scrollLeft; });
      window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) vp.classList.add('dragging');
        vp.scrollLeft = startLeft - dx;
      });
      window.addEventListener('pointerup', function () { down = false; vp.classList.remove('dragging'); });
    }

    // --- coverflow testimonials: continuous position model (smooth glide, 1:1 cursor drag, momentum, circular)
    var flow = $('#cflow');
    if (!flow) return;
    var cards = $$('.tcard', flow), n = cards.length;
    var dotsEl = $('#cdots'), countEl = $('#ccount');
    dotsEl.innerHTML = cards.map(function (_, i) { return '<button type="button" aria-label="Testimoni ' + (i + 1) + ' dari ' + n + '"></button>'; }).join('');
    var dots = $$('button', dotsEl);

    var pos = 0;        // fractional index currently drawn
    var target = 0;     // where the glide animation is heading
    var shown = -1;     // nearest card index (for counter / dots / aria)
    var raf = 0, lastT = 0;
    var mod = function (a) { return ((a % n) + n) % n; };
    var stepPx = function () { return Math.min(440, window.innerWidth * 0.82) * 0.98; }; // card width * .98, same as the CSS --step

    function draw() {
      var step = stepPx();
      cards.forEach(function (c, i) {
        var o = i - pos; o -= n * Math.round(o / n);          // signed offset from centre, wrapped into [-n/2, n/2]
        var ab = Math.abs(o), t = Math.min(ab, 1);
        var scale = 1 - 0.14 * t;
        var opacity = ab <= 1 ? 1 - 0.45 * t : Math.max(0, 0.55 * (1 - (ab - 1) / 0.5)); // fades out before it wraps round to the other side
        var rot = Math.max(-1.3, Math.min(1.3, o)) * -9;
        c.style.transform = 'translate(-50%, -50%) translateX(' + (o * step).toFixed(2) + 'px) rotateY(' + rot.toFixed(2) + 'deg) scale(' + scale.toFixed(4) + ')';
        c.style.opacity = opacity.toFixed(3);
        c.style.visibility = opacity < 0.02 ? 'hidden' : 'visible';
        c.style.zIndex = String(10 - Math.round(ab * 3));
        c.style.setProperty('--a', (1 - t).toFixed(3));
      });
      var idx = mod(Math.round(pos));
      if (idx !== shown) {
        shown = idx;
        cards.forEach(function (c, i) {
          c.classList.toggle('is-active', i === idx); c.classList.toggle('is-side', i !== idx);
          c.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
        });
        dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === idx)); });
        countEl.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
      }
    }
    var vel = 0;        // spring velocity, in cards per second
    function tick(now) {
      var dt = Math.min(0.04, (now - lastT) / 1000); lastT = now;
      var w = 13;       // critically damped spring: eases in smoothly, lands softly, no overshoot, and keeps the momentum of a drag
      vel += (w * w * (target - pos) - 2 * w * vel) * dt;
      pos += vel * dt;
      if (Math.abs(target - pos) < 0.0006 && Math.abs(vel) < 0.02) { pos = target; vel = 0; raf = 0; draw(); return; }
      draw(); raf = requestAnimationFrame(tick);
    }
    function glide() {
      if (reduce) { pos = target; draw(); return; }
      if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); }
    }
    function goBy(d) { target = Math.round(target) + d; glide(); }
    function goTo(i) {   // shortest way round the circle
      var d = mod(i) - mod(Math.round(target));
      if (d > n / 2) d -= n; else if (d < -n / 2) d += n;
      target = Math.round(target) + d; glide();
    }
    $('#cflow-prev').addEventListener('click', function () { goBy(-1); });
    $('#cflow-next').addEventListener('click', function () { goBy(1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });
    flow.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goBy(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); goBy(-1); }
    });

    // --- drag with the cursor / finger: cards follow 1:1, release = momentum + snap
    var d0 = null;   // { x, pos0, id, v, lastX, lastT, moved }
    flow.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('button')) return;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }          // grab a card mid-glide
      vel = 0; target = pos;
      d0 = { x: e.clientX, pos0: pos, id: e.pointerId, v: 0, lastX: e.clientX, lastT: performance.now(), moved: false };
    });
    flow.addEventListener('pointermove', function (e) {
      if (!d0 || e.pointerId !== d0.id) return;
      var dx = e.clientX - d0.x;
      if (!d0.moved) {
        if (Math.abs(dx) < 5) return;
        d0.moved = true; flow.classList.add('dragging');
        try { flow.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
      }
      var now = performance.now(), dt = now - d0.lastT;
      if (dt > 0) d0.v = 0.8 * d0.v + 0.2 * ((e.clientX - d0.lastX) / dt);   // smoothed px/ms
      d0.lastX = e.clientX; d0.lastT = now;
      pos = d0.pos0 - dx / stepPx(); target = pos;
      draw();
    });
    function release(e) {
      if (!d0 || (e && e.pointerId !== d0.id)) return;
      var s = d0; d0 = null;
      flow.classList.remove('dragging');
      try { flow.releasePointerCapture(s.id); } catch (_) { /* ignore */ }
      if (!s.moved) {            // plain click: bring a faded side card to the centre
        var side = e && e.target.closest && e.target.closest('.tcard.is-side');
        if (side) goTo(cards.indexOf(side));
        return;
      }
      var v = (performance.now() - s.lastT > 90) ? 0 : s.v;   // paused before letting go = no momentum
      var projected = pos - (v * 160) / stepPx();              // where the flick would carry it
      projected = Math.max(pos - 1.5, Math.min(pos + 1.5, projected));
      target = Math.round(projected);
      vel = -(v * 1000) / stepPx();                             // cards/second, so the glide continues the motion of your hand
      if (target === Math.round(s.pos0) && Math.abs(pos - s.pos0) > 0.12 && Math.abs(v) > 0.25) target += pos > s.pos0 ? 1 : -1; // a quick short flick still turns the page
      glide();
    }
    flow.addEventListener('pointerup', release);
    flow.addEventListener('pointercancel', release);
    window.addEventListener('resize', draw);
    draw();
  })();

  /* ============================ PORTFOLIO FILTER ============================ */
  var caseButtons = $$('#case-filters [data-sector]'), caseCards = $$('.case');
  $('#case-filters').addEventListener('click', function (e) {
    var b = e.target.closest('[data-sector]'); if (!b) return;
    caseButtons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    caseCards.forEach(function (c) { c.hidden = !(b.dataset.sector === 'Semua' || c.dataset.sector === b.dataset.sector); });
  });

  /* ================================= INIT ================================= */
  $('#year').textContent = new Date().getFullYear();
  renderRoute(true);
})();
