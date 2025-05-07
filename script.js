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

// Функции модального окна гайда
function openGuideModal() {
  document.getElementById("guideModal").style.display = "flex";
}

function closeGuideModal() {
  document.getElementById("guideModal").style.display = "none";
}

// Закрыть лайтбокс при клике вне изображения
window.onclick = function(event) {
  const lightbox = document.getElementById("lightbox");
  const guideModal = document.getElementById("guideModal");

  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }

  if (event.target === guideModal) {
    guideModal.style.display = "none";
  }
};
