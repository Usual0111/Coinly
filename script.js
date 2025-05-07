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
  console.log("Toggle menu called");
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("show");
    console.log("Menu toggled");
  } else {
    console.error("Nav links not found");
  }
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
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded");
  
  // Находим кнопку меню
  const menuToggleButton = document.getElementById("menu-toggle-button");
  
  if (menuToggleButton) {
    console.log("Menu button found");
    menuToggleButton.addEventListener("click", function() {
      console.log("Menu button clicked");
      toggleMenu();
    });
  } else {
    console.error("Menu toggle button not found");
  }
  
  // Дополнительно добавляем обработчик для всех кнопок с классом menu-toggle
  const allMenuButtons = document.querySelectorAll(".menu-toggle");
  console.log("Found menu buttons:", allMenuButtons.length);
  
  allMenuButtons.forEach(button => {
    button.addEventListener("click", function() {
      console.log("Menu button clicked (from class selector)");
      toggleMenu();
    });
  });
});
