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

// Функция переключения мобильного меню
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
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

// Добавляем обработчик событий после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggleButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
});
