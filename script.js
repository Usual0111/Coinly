// Глобальные переменные (объявляем один раз)
let scrollPosition = 0;
let currentStep = 0; // Используется для отслеживания текущего шага в онбординге
let steps = []; // Будет содержать шаги онбординга (NodeList)

// Объект для хранения счетчиков проектов по категориям
const projectTrackers = {
  recommended: { shown: 0, clickCount: 0 },
  browser: { shown: 0, clickCount: 0 },
  free: { shown: 0, clickCount: 0 },
  play: { shown: 0, clickCount: 0 },
  nft: { shown: 0, clickCount: 0 },
  testnet: { shown: 0, clickCount: 0 }
};

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
function openTask(taskId, categoryType = 'browser') {
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const taskModal = document.getElementById('task-modal');
  const taskContent = document.getElementById('task-content');

  if (!taskModal || !taskContent) {
    console.error("Task modal or task content element not found.");
    return false;
  }

  // Выбираем нужный массив проектов в зависимости от категории
  let projectsArray;
  switch(categoryType) {
    case 'recommended':
      projectsArray = recommendedProjects;
      break;
    case 'browser':
      projectsArray = browserProjects;
      break;
    case 'free':
      projectsArray = freeProjects;
      break;
    case 'play':
      projectsArray = playProjects;
      break;
    case 'nft':
      projectsArray = nftProjects;
      break;
    case 'testnet':
      projectsArray = testnetProjects;
      break;
    default:
      projectsArray = browserProjects; // По умолчанию используем browserProjects
  }

  if (typeof projectsArray !== 'undefined') {
    const project = projectsArray.find(p => p.taskId === taskId);
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
    taskContent.innerHTML = `<p>Project data is not defined for category: ${categoryType}. Cannot open task.</p>`;
    console.error(`Projects array for category ${categoryType} is not defined.`);
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
function initializeAllProjects() {
  // Инициализация всех категорий проектов
  initializeProjects('recommended', recommendedProjects, 'recommended-cards');
  initializeProjects('browser', browserProjects, 'project-cards');
  initializeProjects('free', freeProjects, 'free-cards');
  initializeProjects('play', playProjects, 'play-cards');
  initializeProjects('nft', nftProjects, 'nft-cards');
  initializeProjects('testnet', testnetProjects, 'testnet-cards');
}

function initializeProjects(category, projectsArray, containerId) {
  if (typeof projectsArray === 'undefined' || projectsArray.length === 0) {
    console.error(`Projects array for category ${category} is not defined or empty. Cannot initialize project cards.`);
    const container = document.getElementById(containerId);
    if(container) container.innerHTML = "<p>No projects to display.</p>";
    const showMoreBtn = document.getElementById(`show-more-${category}-btn`);
    if(showMoreBtn) showMoreBtn.style.display = 'none';
    return;
  }
  
  // Сбрасываем счетчики для этой категории
  projectTrackers[category].shown = 0;
  projectTrackers[category].clickCount = 0;
  
  // Очищаем контейнер перед добавлением карточек
  const container = document.getElementById(containerId);
  if(container) container.innerHTML = '';

  // Показываем первую порцию проектов
  showMoreProjects(category, projectsArray, containerId);
}

function createProjectCard(project, category) {
  // Валидация обязательных полей проекта
  const requiredFields = ['icon', 'name', 'description', 'reward', 'btnText', 'taskId'];
  const missingFields = requiredFields.filter(field => !project[field]);
  
  if (missingFields.length > 0) {
    console.error(`Project is missing required fields: ${missingFields.join(', ')}`, project);
    return null;
  }

  const card = document.createElement('div');
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
  
  // Привязываем событие к кнопке для открытия модального окна с указанием категории
  card.querySelector(".join-btn").onclick = () => openTask(project.taskId, category);
  
  return card;
}

function showMoreProjects(category, projectsArray, containerId) {
  const container = document.getElementById(containerId);
  const showMoreBtn = document.getElementById(`show-more-${category}-btn`);
  const infoText = document.getElementById(`${category}-info-text`);
  const actionButtons = document.getElementById(`${category}-action-buttons`);

  if (!container) {
    console.error(`Project cards container for ${category} not found.`);
    return;
  }
  
  if (typeof projectsArray === 'undefined') {
    console.error(`Projects array for category ${category} is not defined in showMoreProjects.`);
    return;
  }

  // Увеличиваем clickCount только если уже показаны проекты
  if (projectTrackers[category].shown > 0) {
    projectTrackers[category].clickCount++;
  }

  const start = projectTrackers[category].shown;
  const end = Math.min(start + 3, projectsArray.length);

  for (let i = start; i < end; i++) {
    const card = createProjectCard(projectsArray[i], category);
    if (card) {
      container.appendChild(card);
      projectTrackers[category].shown++;
    } else {
      console.warn(`Skipping project card at index ${i} due to validation error`);
    }
  }

  // Показываем информационный текст после второго клика, если он существует
  if (infoText && projectTrackers[category].clickCount === 2) {
    infoText.style.display = 'block';
  }

  // Управляем видимостью кнопки "показать еще" и кнопок действий
  if (projectTrackers[category].shown >= projectsArray.length) {
    if (showMoreBtn) showMoreBtn.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'flex';
  } else if (showMoreBtn) {
    showMoreBtn.style.display = 'inline-block';
    const remaining = Math.min(3, projectsArray.length - projectTrackers[category].shown);
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
  
  // Дополнительные переключатели меню, если есть
  document.querySelectorAll(".menu-toggle").forEach(btn => {
    if (btn.id !== 'menu-toggle-button') {
