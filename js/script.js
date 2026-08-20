// Simple slideshow sync: we rotate header images and also sync the body background
(function(){
  const slides = Array.from(document.querySelectorAll('.header-slideshow .slide'));
  if (!slides.length) return;
  let idx = 0;
  const change = (i) => {
    slides.forEach((s, j) => {
      s.classList.toggle('active', j === i);
    });
    // sync body background to the active slide
    const src = slides[i].getAttribute('src');
    if (src) document.body.style.backgroundImage = `url("${src}")`;
  }
  let interval = setInterval(()=>{
    idx = (idx + 1) % slides.length;
    change(idx);
  }, 5000);

  // pause on hover
  const container = document.querySelector('.header-slideshow');
  if (container) {
    container.addEventListener('mouseenter', ()=> clearInterval(interval));
    container.addEventListener('mouseleave', ()=> { interval = setInterval(()=>{ idx = (idx + 1) % slides.length; change(idx); }, 5000); });
  }

  // initial sync
  change(0);
})();
