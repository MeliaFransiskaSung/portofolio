/**
 * Portfolio Configuration & Interactive Logic
 * Edit PORTFOLIO_PROJECTS atau teks di index.html untuk menyesuaikan konten Anda.
 */

const PORTFOLIO_PROJECTS = [
  {
    category: 'Branding Design',
    title: 'Lunara Botanical Skincare',
    client: 'Lunara Beauty Indonesia',
    year: '2026',
    image: 'assets/project-branding.jpg',
    description:
      'Perancangan identitas visual menyeluruh untuk lini skincare botani premium. Mencakup eksplorasi logo monogram lotus minimalis, sistem tipografi elegan, palet warna midnight navy & soft pearl, serta kemasan produk yang bersih dan modern.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Brand Guidelines', 'Packaging']
  },
  {
    category: 'UI/UX Design',
    title: 'Hamat Mahasiswa',
    client: 'Proyek Aplikasi Keuangan Mahasiswa',
    year: '2026',
    image: 'assets/project-hamat-uiux.png',
    description:
      'Desain splash screen dan antarmuka aplikasi Hamat Mahasiswa untuk membantu mahasiswa mengelola uang saku dengan mudah. Konsep visual menggunakan ilustrasi, palet hijau-biru segar, dan visualisasi keuangan yang sederhana agar aktivitas pencatatan terasa nyaman.',
    tools: ['Figma', 'UI Design', 'Prototype', 'Mobile App']
  },
  {
    category: 'Social Media Design',
    title: 'Dream Bigger Visual Campaign',
    client: 'Peak Horizon Apparel',
    year: '2025',
    image: 'assets/project-social.jpg',
    description:
      'Seri konten kampanye media sosial bertema petualangan dan motivasi untuk Instagram Feed, Carousel, dan Story. Menggabungkan fotografi lanskap atmosferik dengan tipografi tebal berkarakter kuat untuk meningkatkan engagement audiens.',
    tools: ['Adobe Photoshop', 'After Effects', 'Canva', 'Art Direction']
  },
  {
    category: 'Poster Design',
    title: 'Flash Sale Nasi Goreng Spesial',
    client: 'Proyek Desain Promosi',
    year: '2026',
    image: 'assets/poster-nasi-goreng.png',
    description:
      'Poster promosi flash sale Nasi Goreng Spesial seharga Rp15.000. Komposisi merah dan kuning, tipografi tegas, serta ilustrasi bahan makanan dirancang untuk menarik perhatian.',
    tools: ['Canva', 'Poster Design', 'Visual Promosi']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initProjectModal();
  initCopyEmail();
});

/* ==================== MOBILE NAVIGATION ==================== */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==================== ACTIVE NAV ON SCROLL ==================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ==================== SMOOTH REVEAL ON SCROLL ==================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top > viewportHeight * 0.95) {
      el.classList.add('reveal-pending');
    }
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  reveals.forEach((el) => {
    if (el.classList.contains('reveal-pending')) {
      observer.observe(el);
    }
  });
}

/* ==================== PROJECT MODAL PREVIEW ==================== */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalDescription = document.getElementById('modalDescription');
  const modalTools = document.getElementById('modalTools');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const projectButtons = document.querySelectorAll('.project-item[data-project-index]');

  if (!modal) return;

  let currentIndex = 0;

  function renderProject(index) {
    const item = PORTFOLIO_PROJECTS[index];
    if (!item) return;

    currentIndex = index;
    modalImage.src = item.image;
    modalImage.alt = `${item.title} - ${item.category}`;
    modalCategory.textContent = item.category;
    modalYear.textContent = item.year;
    modalTitle.textContent = item.title;
    modalClient.textContent = `Klien: ${item.client}`;
    modalDescription.textContent = item.description;

    modalTools.innerHTML = '';
    item.tools.forEach((tool) => {
      const chip = document.createElement('span');
      chip.className = 'tool-chip';
      chip.textContent = tool;
      modalTools.appendChild(chip);
    });
  }

  function openModal(index) {
    renderProject(index);
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!modal.classList.contains('open')) {
        modal.hidden = true;
      }
    }, 240);
  }

  projectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.projectIndex) || 0;
      openModal(idx);
    });
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modalPrev.addEventListener('click', () => {
    const prevIdx = (currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    renderProject(prevIdx);
  });

  modalNext.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
    renderProject(nextIdx);
  });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') modalPrev.click();
    if (event.key === 'ArrowRight') modalNext.click();
  });
}

/* ==================== EMAIL COPY FEEDBACK ==================== */
function initCopyEmail() {
  const triggers = document.querySelectorAll('.copy-email-trigger');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  triggers.forEach((el) => {
    el.addEventListener('click', () => {
      const email = el.dataset.email;
      if (email && navigator.clipboard) {
        navigator.clipboard.writeText(email).catch(() => {});
        showToast(`Email disalin: ${email}`);
      }
    });
  });
}
