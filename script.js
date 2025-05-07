// Функция показа изображения в лайтбоксе
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lightbox.style.display = "block";
}

// Функция закрытия лайтбокса
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Закрыть лайтбокс при клике вне изображения
window.onclick = function(event) {
  const lightbox = document.getElementById("lightbox");
  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }
};
