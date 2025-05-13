// Глобальные переменные (объявляем один раз)
let scrollPosition = 0;
let currentStep = 0; // Используется для отслеживания текущего шага в онбординге
let steps = []; // Будет содержать шаги онбординга (NodeList)

// Лайтбокс
function openLightbox(src) {
  const img = document.getElementById("lightbox-img");
  const lightbox = document.getElementById("lightbox");
  if (img && lightbox) {
    img.src = src;
    lightbox.classList.add("active");
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.classList.remove("active");
}

// Гайд (Мобильное руководство)
function openGuideModal() {
  const modal = document.getElementById("guideModal");
  if (modal) modal.classList.add("active");
}

function closeGuideModal() {
  const modal = document.getElementById("guideModal");
  if (modal) modal.classList.remove("active");
  scrollToAirdropsSection(); // Прокрутка к нужному блоку после закрытия
}

function scrollToAirdropsSection() {
  const airdropsSection = document.getElementById("airdrops");
  if (airdropsSection) {
    airdropsSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Мобильное меню
function toggleMenu() {
  const navLinks = document.getElementById("nav-links"); // Используем ID для точности
  if (navLinks) navLinks.classList.toggle("show");
}

// Модальные окна — закрытие при клике вне
function setupModalEvents() {
  window.onclick = function(event) {
    ["lightbox", "guideModal", "task-modal", "email-modal", "onboarding"].forEach(id => {
      const modal = document.getElementById(id);
      // Закрываем, если клик был непосредственно по оверлею модального окна
      if (event.target === modal) {
        modal?.classList.remove("active");
      }
    });
  };
}

// Onboarding (Процесс адаптации)
function startOnboarding() {
  const onboardingModal = document.getElementById('onboarding');
  if (onboardingModal) {
    onboardingModal.classList.add('active');
    // Инициализируем или обновляем NodeList шагов онбординга
    steps = document.querySelectorAll('#onboarding .step');
    if (steps.length > 0) {
      showStep(0);
    } else {
      console.error("Onboarding steps not found inside #onboarding element.");
    }
  }
}

function closeOnboarding() {
  const onboardingModal = document.getElementById('onboarding');
  if (onboardingModal) {
    onboardingModal.classList.remove('active');
    // Скрываем все шаги, если они были инициализированы
    if (steps && steps.length > 0) {
      steps.forEach(step => step.classList.remove('active'));
    } else {
      // Запасной вариант, если `steps` не был корректно заполнен
      document.querySelectorAll('#onboarding .step').forEach(s => s.classList.remove('active'));
    }
    currentStep = 0;
  }
}

function showStep(stepIndex) {
  // `steps` должен быть NodeList шагов онбординга, установленный в startOnboarding
  if (!steps || steps.length === 0) {
    console.error("Onboarding steps not available in showStep.");
    return;
  }
  steps.forEach(step => step.classList.remove('active'));
  if (steps[stepIndex]) {
    steps[stepIndex].classList.add('active');
    currentStep = stepIndex;
  }
}

function nextStep() {
  // `steps` используется из глобальной области, установленной в startOnboarding
  if (steps && currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

// Email Modal (Модальное окно для Email)
function openEmailForm() {
  const modal = document.getElementById('email-modal');
  if (modal) modal.classList.add('active');
}

function closeEmailModal() {
  const modal = document.getElementById('email-modal');
  if (modal) modal.classList.remove('active');
}

// Копирование реферальной ссылки (если используется)
function copyReferralLink() {
  const referralInput = document.querySelector('.referral-link input'); // Убедитесь, что такой элемент существует
  if (referralInput) {
    referralInput.select();
    referralInput.setSelectionRange(0, 99999); // Для мобильных устройств
    try {
      document.execCommand('copy');
      alert('Referral link copied to clipboard!');
    } catch (err) {
      console.error('Error copying referral link:', err);
      alert('Failed to copy. Please copy manually.');
    }
  }
}

// Инициализация всех обработчиков событий
function initEventHandlers() {
  // Мобильное меню
  const menuButton = document.getElementById('menu-toggle-button');
  const navLinks = document.getElementById('nav-links');
  if (menuButton && navLinks) {
    if (window.innerWidth > 768) {
      menuButton.style.display = 'none';
    } else {
      menuButton.style.display = 'block';
    }
    menuButton.addEventListener('click', toggleMenu);

    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        menuButton.style.display = 'none';
        navLinks.classList.remove('show');
      } else {
        menuButton.style.display = 'block';
      }
    });
  }
  
  // Дополнительные переключатели меню, если есть
  document.querySelectorAll(".menu-toggle").forEach(btn => {
    if (btn.id !== 'menu-toggle-button') {
      // Добавляем обработчики для дополнительных переключателей меню, если необходимо
      btn.addEventListener('click', toggleMenu);
    }
  });

  // Закрытие мобильного меню при клике вне меню
  document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('nav-links');
    const menuButton = document.getElementById('menu-toggle-button');
    
    if (navLinks && menuButton && navLinks.classList.contains('show')) {
      const isClickInsideMenu = navLinks.contains(event.target) || menuButton.contains(event.target);
      
      if (!isClickInsideMenu) {
        navLinks.classList.remove('show');
      }
    }
  });

  // Для кнопок с data-modal-target
  document.querySelectorAll('button[data-modal-target="guideModal"]').forEach(button => {
    button.addEventListener('click', () => openGuideModal());
  });

  // Для кнопок закрытия модальных окон
  document.querySelectorAll('[data-dismiss="modal"]').forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal, .lightbox');
      if (modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Для изображений в галерее, открывающих lightbox
  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', function() {
      openLightbox(this.src);
    });
  });

  // Для открытия email формы
  const openEmailFormBtn = document.getElementById('open-email-form-btn');
  if (openEmailFormBtn) {
    openEmailFormBtn.addEventListener('click', openEmailForm);
  }

  // Для отправки формы подписки
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Email for subscription:', this.querySelector('input[type="email"]').value);
      closeEmailModal();
    });
  }

  // Для навигации в onboarding
  document.querySelectorAll('[data-onboarding-next]').forEach(button => {
    button.addEventListener('click', nextStep);
  });
  
  const onboardingDoneBtn = document.querySelector('[data-onboarding-done]');
  if (onboardingDoneBtn) {
    onboardingDoneBtn.addEventListener('click', function() {
      document.getElementById('onboarding').classList.add('hidden');
    });
  }

  // Для кнопки "начать онбординг"
  const getStartedOnboardingBtn = document.getElementById('get-started-onboarding-btn');
  if (getStartedOnboardingBtn) {
    getStartedOnboardingBtn.addEventListener('click', startOnboarding);
  }
}

// Функция для инициализации основных компонентов страницы
function initializePage() {
  // Инициализируем обработчики событий
  initEventHandlers();
  
  // Настраиваем события для модальных окон
  setupModalEvents();
  
  // Импортированная из projects.js функция инициализации проектов
  if (typeof initializeAllProjects === 'function') {
    initializeAllProjects();
  } else {
    console.warn('Function initializeAllProjects is not defined. Make sure projects.js is loaded before core.js.');
  }
}

// Добавляем обработчик события загрузки документа
document.addEventListener('DOMContentLoaded', initializePage);

// Экспортируем функции, которые могут быть вызваны извне
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.openGuideModal = openGuideModal;
window.closeGuideModal = closeGuideModal;
window.toggleMenu = toggleMenu;
window.startOnboarding = startOnboarding;
window.closeOnboarding = closeOnboarding;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.openEmailForm = openEmailForm;
window.closeEmailModal = closeEmailModal;
window.copyReferralLink = copyReferralLink;
