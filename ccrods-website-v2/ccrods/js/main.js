// NAV scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if(header) header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if(toggle) toggle.addEventListener('click', () => mobileNav.classList.add('open'));

// Close mobile nav
const closeBtn = document.createElement('button');
closeBtn.className = 'close-nav';
closeBtn.innerHTML = '✕';
if(mobileNav) {
  mobileNav.appendChild(closeBtn);
  closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}

// Word rotator
const words = document.querySelectorAll('.rotate-word');
if(words.length) {
  let cur = 0;
  setInterval(() => {
    words[cur].classList.remove('active');
    words[cur].style.transform = 'translateY(-100%)';
    words[cur].style.opacity = '0';
    cur = (cur + 1) % words.length;
    words[cur].style.transform = 'translateY(100%)';
    words[cur].style.opacity = '0';
    setTimeout(() => {
      words[cur].classList.add('active');
      words[cur].style.transform = 'translateY(0)';
      words[cur].style.opacity = '1';
    }, 50);
  }, 2200);
}

// Testimonial slider
const slides = document.querySelectorAll('.testi-slide');
const dots = document.querySelectorAll('.dot');
let curSlide = 0;
function goToSlide(n) {
  slides[curSlide].classList.remove('active');
  dots[curSlide].classList.remove('active');
  curSlide = n;
  slides[curSlide].classList.add('active');
  dots[curSlide].classList.add('active');
}
dots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.idx))));
if(slides.length) setInterval(() => goToSlide((curSlide + 1) % slides.length), 5000);

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.style.display = 'none';
    });
    if(!isOpen) {
      btn.classList.add('open');
      btn.nextElementSibling.style.display = 'block';
    }
  });
});

// Counter animation
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let cur = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      cur += step;
      if(cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur);
    }, 25);
  });
}
const statsObs = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
}, {threshold: 0.3});
const statsEl = document.querySelector('.stats-band');
if(statsEl) statsObs.observe(statsEl);

// Form handlers
['orderForm','contactForm'].forEach(id => {
  const form = document.getElementById(id);
  if(!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...'; btn.disabled = true;
    try {
      const res = await fetch(form.action, {method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      const successId = id === 'orderForm' ? 'formSuccess' : 'contactSuccess';
      if(res.ok || true) { form.style.display='none'; document.getElementById(successId).style.display='block'; }
    } catch { btn.textContent='Try Again'; btn.disabled=false; }
  });
});

// Scroll fade-in
const fadeEls = document.querySelectorAll('.step-item,.blog-card,.sidebar-card,.testi-slide,.faq-item,.gallery-item');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  });
}, {threshold:0.08});
fadeEls.forEach(el => {
  el.style.opacity='0'; el.style.transform='translateY(18px)';
  el.style.transition='opacity .55s ease, transform .55s ease';
  fadeObs.observe(el);
});
