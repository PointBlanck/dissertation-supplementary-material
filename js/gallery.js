const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxLabel = document.getElementById('lightboxLabel');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxStage = document.getElementById('lightboxStage');

function openLightbox(fig) {
  lightboxImg.setAttribute('data', fig.dataset.src);
  lightboxLabel.textContent = fig.dataset.label || '';
  lightboxTitle.textContent = fig.dataset.title || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { if (!lightbox.classList.contains('open')) lightboxImg.removeAttribute('data'); }, 360);
}

document.querySelectorAll('figure').forEach(fig => {
  fig.addEventListener('click', () => openLightbox(fig));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
lightboxStage.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

/* ---------- Spiral galaxy: scatter stars along logarithmic arms ---------- */
(function buildGalaxy() {
  const arms = document.querySelector('.galaxy .arms');
  if (!arms) return;

  const cx = 100, cy = 100;
  const NUM_ARMS = 2;
  const STARS_PER_ARM = 170;
  const a = 3;             // inner radius scale
  const b = 0.255;         // how tightly the spiral winds
  const maxTheta = 4.3 * Math.PI;
  const tints = ['#ffffff', '#dce6ff', '#bcd0ff', '#ffe6c4', '#c77dff'];
  let svg = '';

  for (let arm = 0; arm < NUM_ARMS; arm++) {
    const offset = (arm / NUM_ARMS) * 2 * Math.PI;
    for (let i = 0; i < STARS_PER_ARM; i++) {
      const t = (i / STARS_PER_ARM) * maxTheta;
      const r = a * Math.exp(b * t);
      // modest scatter so arms stay coherent but look like clouds of stars
      const spread = 1.2 + r * 0.07;
      const jx = (Math.random() - 0.5) * spread * 2;
      const jy = (Math.random() - 0.5) * spread * 2;
      const x = cx + r * Math.cos(t + offset) + jx;
      const y = cy + r * Math.sin(t + offset) + jy;
      if (Math.hypot(x - cx, y - cy) > 96) continue;
      const radius = (Math.random() * 0.8 + 0.45).toFixed(2);
      const op = (Math.random() * 0.55 + 0.4).toFixed(2);
      const fill = tints[(Math.random() * tints.length) | 0];
      svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="${fill}" opacity="${op}"/>`;
    }
  }
  arms.innerHTML = svg;
})();

