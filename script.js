// Глобальные переменные
let scrollPosition = 0;
let currentStep = 0;
let projectsShown = 0;
let clickCount = 0;
let steps = [];

// Функция показа изображения в лайтбоксе
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lightbox.classList.add("active");
}

// Функция закрытия лайтбокса
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

// Функции модального окна гайда
function openGuideModal() {
  document.getElementById("guideModal").classList.add("active");
}

function closeGuideModal() {
  document.getElementById("guideModal").classList.remove("active");
}

// Функция переключения мобильного меню
function toggleMenu() {
  console.log("Toggle menu called");
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("show");
    console.log("Menu toggled", navLinks.classList.contains("show"));
  } else {
    console.error("Nav links not found");
  }
}

// Обработчики для модальных окон и лайтбоксов
function setupModalEvents() {
  // Закрыть модальные окна при клике вне содержимого
  window.onclick = function(event) {
    // Лайтбокс
    const lightbox = document.getElementById("lightbox");
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
    }
    
    // Гайд модальное окно
    const guideModal = document.getElementById("guideModal");
    if (event.target === guideModal) {
      guideModal.classList.remove("active");
    }
    
    // Таск модальное окно
    const taskModal = document.getElementById("task-modal");
    if (event.target === taskModal) {
      closeTaskModal();
    }
    
    // Email модальное окно
    const emailModal = document.getElementById("email-modal");
    if (event.target === emailModal) {
      closeEmailModal();
    }
    
    // Onboarding модальное окно
    const onboarding = document.getElementById("onboarding");
    if (event.target === onboarding) {
      closeOnboarding();
    }
  };
}

// Onboarding Flow Logic
function startOnboarding() {
  const onboarding = document.getElementById('onboarding');
  if (onboarding) {
    onboarding.classList.add('active');
    showStep(0);
  } else {
    console.error("Onboarding modal not found");
  }
}

function closeOnboarding() {
  const onboarding = document.getElementById('onboarding');
  if (onboarding) {
    onboarding.classList.remove('active');
    steps.forEach(step => step.classList.remove('active'));
    currentStep = 0;
  }
}

function showStep(stepIndex) {
  steps = document.querySelectorAll('.step');
  steps.forEach(step => step.classList.remove('active'));
  if (steps[stepIndex]) {
    steps[stepIndex].classList.add('active');
    currentStep = stepIndex;
  }
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

// Task Modal Logic
function openTask(taskId) {
  // Сохраняем текущую позицию прокрутки перед открытием модального окна
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  const taskModal = document.getElementById('task-modal');
  const taskContent = document.getElementById('task-content');
  
  // Проверяем, определен ли массив projects
  if (typeof projects !== 'undefined') {
    // Find project by taskId
    const project = projects.find(p => p.taskId === taskId);
    
    if (project && project.instructions) {
      taskContent.innerHTML = `
          <h2>${project.instructions.title}</h2>
          <p>${project.instructions.description}</p>
          <ol class="task-steps">
              ${project.instructions.steps.map(step => `<li>${step}</li>`).join('')}
          </ol>
          <div class="task-buttons">
              <a href="${project.instructions.actionUrl}" target="_blank" class="btn-primary">${project.instructions.actionText}</a>
              <button class="btn-secondary" onclick="showWalletHelp()">Need a Wallet?</button>
          </div>
      `;
    } else {
      taskContent.innerHTML = `<p>Task details not available</p>`;
    }
  } else {
    taskContent.innerHTML = `<p>Project data is not defined</p>`;
    console.error("Projects array is not defined");
  }
  
  taskModal.classList.add('active');
  return false;
}

function closeTaskModal() {
  const taskModal = document.getElementById('task-modal');
  taskModal.classList.remove('active');
  
  // Восстанавливаем позицию прокрутки после закрытия модального окна
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 10);
}

function showWalletHelp() {
  closeTaskModal();
  startOnboarding();
}

function copyReferralLink() {
  const referralInput = document.querySelector('.referral-link input');
  if (referralInput) {
    referralInput.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Referral link copied to clipboard!');
      } else {
        console.error('Unable to copy');
      }
    } catch (err) {
      console.error('Error during copy', err);
    }
  }
}

// Show More Projects Logic
// Initialize the page with first 3 projects
function initializeProjects() {
  // Проверяем, определен ли массив projects
  if (typeof projects === 'undefined') {
    console.error("Projects array is not defined. Please define it before initializing projects.");
    return;
  }
  
  // Show first 3 projects on page load
  showMoreProjects();
}

// Create a single project card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'offer-card project-card';
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'offer-header';
  
  const logoDiv = document.createElement('div');
  logoDiv.className = 'logo';
  logoDiv.textContent = project.icon;
  cardHeader.appendChild(logoDiv);
  
  const titleDiv = document.createElement('div');
  titleDiv.className = 'offer-title';
  
  const title = document.createElement('h3');
  title.textContent = project.name;
  titleDiv.appendChild(title);
  
  const description = document.createElement('p');
  description.textContent = project.description;
  titleDiv.appendChild(description);
  
  cardHeader.appendChild(titleDiv);
  
  if (project.hot) {
    const badgeDiv = document.createElement('div');
    badgeDiv.className = 'badge';
    const hotLabel = document.createElement('span');
    hotLabel.className = 'badge-tag';
    hotLabel.textContent = '🔥 HOT';
    badgeDiv.appendChild(hotLabel);
    cardHeader.appendChild(badgeDiv);
  }
  
  card.appendChild(cardHeader);
  
  const reward = document.createElement('p');
  reward.className = 'reward-range';
  reward.innerHTML = project.reward;
  card.appendChild(reward);
  
  const button = document.createElement('button');
  button.className = 'btn-primary join-btn';
  button.textContent = project.btnText || 'Join Now';
  button.setAttribute('data-task-id', project.taskId);
  button.onclick = function() { return openTask(project.taskId); };
  card.appendChild(button);
  
  return card;
}

// Show more projects function
function showMoreProjects() {
  const cardsContainer = document.getElementById('project-cards');
  const showMoreBtn = document.getElementById('show-more-btn');
  const infoText = document.getElementById('info-text');
  const actionButtons = document.getElementById('action-buttons');
  
  if (!cardsContainer) {
    console.error("Project cards container not found");
    return;
  }
  
  // Проверяем, определен ли массив projects
  if (typeof projects === 'undefined') {
    console.error("Projects array is not defined");
    return;
  }
  
  // Increment click count only if not initial load
  if (projectsShown > 0) {
    clickCount++;
  }
  
  // Add 3 more projects
  const startIndex = projectsShown;
  const endIndex = Math.min(startIndex + 3, projects.length);
  
  for (let i = startIndex; i < endIndex; i++) {
    const project = projects[i];
    const card = createProjectCard(project);
    
    // Если это проект после первых трех, добавляем класс hidden-project
    if (i >= 3) {
      card.classList.add('hidden-project');
    }
    
    cardsContainer.appendChild(card);
    projectsShown++;
  }
  
  // Show info text after second click
  if (infoText && clickCount === 2) {
    infoText.style.display = 'block';
  }
  
  // Show action buttons after showing all projects
  if (projectsShown >= projects.length) {
    if (showMoreBtn) showMoreBtn.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'flex';
  } else if (showMoreBtn) {
    // Update button text to show how many projects remain
    const remaining = Math.min(3, projects.length - projectsShown);
    showMoreBtn.textContent = `🔽 Show ${remaining} More Projects`;
  }
}

// Email Form Modal Logic
function openEmailForm() {
  const emailModal = document.getElementById('email-modal');
  if (emailModal) {
    emailModal.classList.add('active');
  }
}

function closeEmailModal() {
  const emailModal = document.getElementById('email-modal');
  if (emailModal) {
    emailModal.classList.remove('active');
  }
}

// Функция для инициализации всех обработчиков событий
function initEventHandlers() {
  console.log("Initializing event handlers");
  
  // Обработчик для кнопки меню
  const menuToggleButton = document.getElementById("menu-toggle-button");
  if (menuToggleButton) {
    console.log("Menu button found");
    menuToggleButton.addEventListener("click", function(e) {
      console.log("Menu button clicked");
      e.preventDefault();
      toggleMenu();
    });
  }
  
  // Обработчики для всех кнопок с классом menu-toggle
  const allMenuButtons = document.querySelectorAll(".menu-toggle");
  console.log("Found menu buttons:", allMenuButtons.length);
  allMenuButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      console.log("Menu toggle button clicked");
      e.preventDefault();
      toggleMenu();
    });
  });
  
  // Обработчики для кнопок "next" в шагах модального окна
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      nextStep();
    });
  });
  
  // Обработчики для кнопок "prev" в шагах модального окна
  document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      prevStep();
    });
  });
  
  // Обработчик для кнопки "Show More Projects"
  const showMoreBtn = document.getElementById('show-more-btn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      showMoreProjects();
    });
  }
  
  // Кнопки для открытия модальных окон
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });
  
  // Обработчики для закрытия модальных окон
  document.querySelectorAll('.close-btn, .modal .close').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  // Обработчики для кнопок показа скрытых проектов
  document.querySelectorAll('.btn-show-more').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.hidden-project').forEach(project => {
        project.classList.add('visible');
      });
      this.style.display = 'none';
    });
  });
  
  // Инициализация обработчиков для модальных окон и лайтбоксов
  setupModalEvents();
}

// Запуск инициализации после загрузки DOM
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded");
  
  // Инициализация обработчиков событий
  initEventHandlers();
  
  // Инициализация проектов при загрузке страницы
  initializeProjects();
  
  // Инициализация шагов (если они есть)
  steps = document.querySelectorAll('.step');
});
