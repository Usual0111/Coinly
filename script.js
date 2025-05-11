// Глобальные переменные (объявляем один раз)
let scrollPosition = 0;
let currentStep = 0; // Используется для отслеживания текущего шага в онбординге
let projectsShown = 0;
let clickCount = 0;
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

// Task Modal (Модальное окно задачи)
function openTask(taskId) {
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const taskModal = document.getElementById('task-modal');
  const taskContent = document.getElementById('task-content');

  if (!taskModal || !taskContent) {
    console.error("Task modal or task content element not found.");
    return false;
  }

  if (typeof projects !== 'undefined') {
    const project = projects.find(p => p.taskId === taskId);
    if (project && project.instructions) {
      taskContent.innerHTML = `
        <h2>${project.instructions.title}</h2>
        <p>${project.instructions.description}</p>
        <ol class="task-steps">${project.instructions.steps.map(step => `<li>${step}</li>`).join('')}</ol>
        <div class="task-buttons">
          <a href="${project.instructions.actionUrl}" target="_blank" class="btn-primary">${project.instructions.actionText}</a>
          <button class="btn-secondary" onclick="showWalletHelp()">Need a Wallet?</button>
        </div>`;
    } else {
      taskContent.innerHTML = `<p>Task details not available for ID: ${taskId}</p>`;
    }
  } else {
    taskContent.innerHTML = `<p>Project data is not defined. Cannot open task.</p>`;
    console.error("Projects array is not defined.");
  }

  taskModal.classList.add('active');
  return false; // Полезно, если вызывается из <a> href="#"
}

function closeTaskModal() {
  const taskModal = document.getElementById('task-modal');
  if (taskModal) taskModal.classList.remove('active');
  // Восстанавливаем позицию прокрутки
  setTimeout(() => window.scrollTo(0, scrollPosition), 10);
}

function showWalletHelp() {
  closeTaskModal();
  startOnboarding(); // Показываем онбординг для помощи с кошельком
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

// Project Cards (Карточки проектов)
function initializeProjects() {
  if (typeof projects === 'undefined' || projects.length === 0) {
    console.error("Projects array is not defined or empty. Cannot initialize project cards.");
    const container = document.getElementById('project-cards');
    if(container) container.innerHTML = "<p>No projects to display.</p>";
    const showMoreBtn = document.getElementById('show-more-btn');
    if(showMoreBtn) showMoreBtn.style.display = 'none';
    return;
  }
  // Сбрасываем счетчики перед первой загрузкой
  projectsShown = 0;
  clickCount = 0;
  // Очищаем контейнер перед добавлением карточек (если это повторная инициализация)
  const container = document.getElementById('project-cards');
  if(container) container.innerHTML = '';

  showMoreProjects(); // Показываем первую порцию проектов
}

function createProjectCard(project) {
  const card = document.createElement('div');
  // Добавляем общий класс 'project-card' для возможности стилизации или выбора всех карточек проектов
  card.className = 'offer-card project-card';

  card.innerHTML = `
    <div class="offer-header">
      <div class="logo">${project.icon}</div>
      <div class="offer-title">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      </div>
      ${project.hot ? `<div class="badge"><span class="badge-tag">🔥 HOT</span></div>` : ""}
    </div>
    <p class="reward-range">${project.reward}</p>
    <button class="btn-primary join-btn">${project.btnText || 'Join Now'}</button>
  `;
  // Привязываем событие к кнопке через JS, а не data-task-id + querySelector в openTask
  card.querySelector(".join-btn").onclick = () => openTask(project.taskId);
  return card;
}

function showMoreProjects() {
  const container = document.getElementById('project-cards');
  const showMoreBtn = document.getElementById('show-more-btn');
  const infoText = document.getElementById('info-text');
  const actionButtons = document.getElementById('action-buttons');

  if (!container) {
    console.error("Project cards container not found.");
    return;
  }
  if (typeof projects === 'undefined') {
    console.error("Projects array is not defined in showMoreProjects.");
    return;
  }

  if (projectsShown > 0) { // Не увеличиваем clickCount при первой загрузке (projectsShown === 0)
      clickCount++;
  }

  const start = projectsShown;
  const end = Math.min(start + 3, projects.length);

  for (let i = start; i < end; i++) {
    const card = createProjectCard(projects[i]);
    // Класс hidden-project не используется в текущей логике `showMoreProjects` для пагинации
    // Если он нужен для другой логики "показать все скрытые", это должно быть отдельно.
    // if (i >= 3) card.classList.add('hidden-project'); // Удалено, т.к. пагинация обрабатывается иначе
    container.appendChild(card);
    projectsShown++;
  }

  if (infoText && clickCount === 2) { // Показываем текст после второго клика на "показать еще"
    infoText.style.display = 'block';
  }

  if (projectsShown >= projects.length) {
    if (showMoreBtn) showMoreBtn.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'flex'; // Показываем кнопки действий, когда все проекты отображены
  } else if (showMoreBtn) {
    showMoreBtn.style.display = 'inline-block'; // Убедимся, что кнопка видима
    const remaining = Math.min(3, projects.length - projectsShown);
    showMoreBtn.textContent = `🔽 Show ${remaining} More Projects`;
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
  // Дополнительные переключатели меню, если есть (например, кнопки внутри самого меню для его закрытия)
  document.querySelectorAll(".menu-toggle").forEach(btn => {
      if (btn.id !== 'menu-toggle-button') { // Чтобы не дублировать обработчик для основной кнопки
          btn.addEventListener("click", toggleMenu);
      }
  });


  // Кнопки онбординга
  document.querySelectorAll('#onboarding .next-btn').forEach(btn => btn.addEventListener('click', nextStep));
  document.querySelectorAll('#onboarding .prev-btn').forEach(btn => btn.addEventListener('click', prevStep));
  document.querySelector('#onboarding .done-btn')?.addEventListener('click', function() {
    closeOnboarding();
    scrollToAirdropsSection();
  });

  // Кнопка "Показать еще проекты"
  // HTML: <button id="show-more-btn" ... onclick="showMoreProjects()">...
  // Если onclick атрибут убран из HTML, этот слушатель будет работать. Если onclick есть, он сработает первым.
  // Для чистоты лучше убрать onclick из HTML и полагаться только на этот слушатель.
  const showMoreProjectsBtn = document.getElementById('show-more-btn');
  if (showMoreProjectsBtn && !showMoreProjectsBtn.hasAttribute('onclick')) { // Добавляем слушатель, только если нет onclick
      showMoreProjectsBtn.addEventListener('click', showMoreProjects);
  }


  // Открытие модальных окон по data-атрибуту (если используется)
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', function () {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    });
  });

  // Общие кнопки закрытия для всех модальных окон
  document.querySelectorAll('.close-btn, .modal .close').forEach(btn => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        // Если это было модальное окно гайда, и оно было закрыто общей кнопкой,
        // а не специальной onclick="closeGuideModal()", то также прокручиваем.
        if (modal.id === 'guideModal') {
            // scrollToAirdropsSection(); // Раскомментируйте, если нужно всегда скроллить при закрытии guideModal
                                        // В HTML уже есть onclick="closeGuideModal()", которая это делает.
        }
      }
    });
  });

  // Форма подписки по Email
  const emailForm = document.querySelector('#email-modal .email-form'); // Уточненный селектор
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = emailForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
         // Здесь должна быть реальная логика отправки формы, например, fetch POST-запрос
        console.log("Email for subscription:", emailInput.value);
        alert('Subscription successful! You will receive alerts about top-paying nodes.'); // Заглушка
        emailInput.value = ''; // Очистка поля
        closeEmailModal();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // Настройка закрытия модальных окон по клику вне их контентной части
  setupModalEvents();
}

// Запуск всей логики после полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // `projects` массив должен быть определен в HTML в inline <script> теге ПЕРЕД этим файлом.
  if (typeof projects !== 'undefined' && projects.length > 0) {
    initializeProjects(); // Инициализация и отображение карточек проектов
  } else {
    console.warn("Projects array is not defined or is empty. No project cards will be displayed.");
    const container = document.getElementById('project-cards');
    if(container) container.innerHTML = "<p>No projects to display at the moment.</p>";
    const showMoreBtn = document.getElementById('show-more-btn');
    if(showMoreBtn) showMoreBtn.style.display = 'none'; // Скрыть кнопку "показать еще", если проектов нет
  }

  initEventHandlers(); // Настройка всех остальных обработчиков событий
});
