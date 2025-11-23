// Slideshow robusto com autoplay + pause on hover
(function() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const container = document.getElementById('slideshow');

  let current = 0;
  let autoplayInterval = null;
  const AUTOPLAY_MS = 4000; // tempo entre slides

  function goTo(index) {
    if (!slides.length) return;
    // normaliza
    index = (index + slides.length) % slides.length;

    // remove active
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    // ativa novo slide
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    current = index;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // eventos nas setas
  nextBtn.addEventListener('click', () => {
    next();
    restartAutoplay();
  });
  prevBtn.addEventListener('click', () => {
    prev();
    restartAutoplay();
  });

  // eventos nos dots (delegação simples)
  dots.forEach(d => {
    d.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.dataset.slide) - 1;
      goTo(idx);
      restartAutoplay();
    });
  });

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // pausa quando o mouse está sobre o slideshow (útil para mobile ele será ignorado)
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
  container.addEventListener('touchstart', stopAutoplay, {passive:true});
  container.addEventListener('touchend', startAutoplay, {passive:true});

  // inicializa
  goTo(0);
  startAutoplay();

  // segurança: mostra erro no console se não houver imagens carregadas
  window.addEventListener('load', () => {
    const imgs = Array.from(document.querySelectorAll('.slide img'));
    const missing = imgs.filter(i => !i.complete || i.naturalWidth === 0);
    if (missing.length) {
      console.warn('Algumas imagens não carregaram corretamente:', missing);
    }
  });
})();
