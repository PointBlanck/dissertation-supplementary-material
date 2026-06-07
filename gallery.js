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
