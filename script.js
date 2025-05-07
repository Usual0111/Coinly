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
    console.log("Menu toggled", navLinks.classList.contains("show"));
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
    // Напрямую добавляем обработчик клика
    menuToggleButton.addEventListener("click", function(e) {
      console.log("Menu button clicked");
      e.preventDefault(); // Предотвращаем действие по умолчанию
      toggleMenu();
    });
  } else {
    console.error("Menu toggle button not found");
  }
  
  // Дополнительно добавляем обработчик для всех кнопок с классом menu-toggle
  const allMenuButtons = document.querySelectorAll(".menu-toggle");
  console.log("Found menu buttons:", allMenuButtons.length);
  
  allMenuButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      console.log("Menu toggle button clicked (from class selector)");
      e.preventDefault(); // Предотвращаем действие по умолчанию
      toggleMenu();
    });
  });

  // Инициализация проектов при загрузке страницы
  initializeProjects();
});

// Onboarding Flow Logic (эти функции определены в index.html)
function startOnboarding() {
  document.getElementById('onboarding').style.display = 'flex';
  showStep(0);
}

function closeOnboarding() {
  document.getElementById('onboarding').style.display = 'none';
  steps.forEach(step => step.classList.remove('active'));
  currentStep = 0;
}

function showStep(stepIndex) {
  const steps = document.querySelectorAll('.step');
  steps.forEach(step => step.classList.remove('active'));
  steps[stepIndex].classList.add('active');
  currentStep = stepIndex;
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

// Остальные функции из index.html
// Переменная для хранения позиции прокрутки
let scrollPosition = 0;
let currentStep = 0;

// Task Modal Logic
function openTask(taskId) {
  // Сохраняем текущую позицию прокрутки перед открытием модального окна
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  const taskModal = document.getElementById('task-modal');
  const taskContent = document.getElementById('task-content');
  
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
  
  taskModal.style.display = 'flex';
  return false;
}

function closeTaskModal() {
  document.getElementById('task-modal').style.display = 'none';
  
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
  referralInput.select();
  document.execCommand('copy');
  alert('Referral link copied to clipboard!');
}

// Show More Projects Logic
let projectsShown = 0;
let clickCount = 0;

// Initialize the page with first 3 projects
function initializeProjects() {
  // Show first 3 projects on page load
  showMoreProjects();
}

// Create a single project card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'offer-card';
  
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
  button.textContent = project.btnText;
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
    cardsContainer.appendChild(card);
    projectsShown++;
  }
  
  // Show info text after second click
  if (clickCount === 2) {
    infoText.style.display = 'block';
  }
  
  // Show action buttons after showing all projects
  if (projectsShown >= projects.length) {
    showMoreBtn.style.display = 'none';
    actionButtons.style.display = 'flex';
  } else {
    // Update button text to show how many projects remain
    const remaining = Math.min(3, projects.length - projectsShown);
    showMoreBtn.textContent = `🔽 Show ${remaining} More Projects`;
  }
}

// Email Form Modal Logic
function openEmailForm() {
  document.getElementById('email-modal').style.display = 'flex';
}

function closeEmailModal() {
  document.getElementById('email-modal').style.display = 'none';
}
