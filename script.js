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
// Перемещаем createProjectCard перед initializeProjects, чтобы решить проблему с определением
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

function initializeAllProjects() {
  // Инициализация всех категорий проектов
  initializeProjects('recommended', recommendedProjects, 'recommended-cards');
let browserProjects = [];
  initializeProjects('browser', browserProjects, 'project-cards');
  initializeProjects('free', freeProjects, 'free-cards');
  initializeProjects('play', playProjects, 'play-cards');
  initializeProjects('nft', nftProjects, 'nft-cards');
  initializeProjects('testnet', testnetProjects, 'testnet-cards');
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
// Добавить эти строки в функцию initEventHandlers() или initializePage()
document.querySelectorAll('.close-button, .modal-close, .close').forEach(button => {
  button.addEventListener('click', function() {
    // Находим ближайшую модалку
    const modal = this.closest('.modal, .lightbox');
    if (modal) {
      // Проверяем, какой способ закрытия используется
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
      } else {
        modal.style.display = 'none';
      }
    }
  });
});
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
}

// Функция для инициализации всех необходимых обработчиков и начальных состояний
function initializePage() {
  // Инициализируем проекты
  initializeAllProjects();
  
  // Инициализируем обработчики событий
  initEventHandlers();
  
  // Настраиваем события для модальных окон
  setupModalEvents();
  
  // Любые другие начальные настройки, которые могут потребоваться
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
window.openTask = openTask;
window.closeTaskModal = closeTaskModal;
window.showWalletHelp = showWalletHelp;
window.copyReferralLink = copyReferralLink;
window.showMoreProjects = showMoreProjects;
window.openEmailForm = openEmailForm;
window.closeEmailModal = closeEmailModal;

document.getElementById('get-started-onboarding-btn').addEventListener('click', startOnboarding);
// И так для ВСЕХ элементов, у которых был onclick

// Пример для кнопок "setup guide" в mobile-tip
// Они теперь имеют data-modal-target="guideModal"
document.querySelectorAll('button[data-modal-target="guideModal"]').forEach(button => {
    button.addEventListener('click', () => openGuideModal('guideModal')); // openGuideModal должна принимать ID модалки
});

// Если у тебя была функция openGuideModal() без параметров, сделай так:
// function openGuideModal() { openModalById('guideModal'); }
// function openModalById(modalId) { document.getElementById(modalId).classList.remove('hidden'); /* ... остальная логика */ }


// Для кнопок закрытия модальных окон:
// <button class="close" data-dismiss="modal" aria-label="Close guide modal">&times;</button>
document.querySelectorAll('[data-dismiss="modal"]').forEach(button => {
    button.addEventListener('click', function() {
        // Найти родительское модальное окно и скрыть его
        const modal = this.closest('.modal, .lightbox'); // Находим ближайший родитель с классом .modal или .lightbox
        if (modal) {
            modal.classList.add('hidden');
            // Дополнительно: вернуть фокус на элемент, который открыл модалку
        }
    });
});

// Для изображений в галерее, открывающих lightbox
// <img src="airdrop1.png" class="lightbox-trigger">
document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.src); // Предполагая, что у тебя есть функция openLightbox
    });
});

// Для кнопок "Show More"
// <button id="show-more-recommended-btn" class="btn-show-more">...</button>
document.getElementById('show-more-recommended-btn').addEventListener('click', showMoreRecommended);
// и так далее для других кнопок "Show More"

// Для открытия email формы
document.getElementById('open-email-form-btn').addEventListener('click', openEmailForm);

// Для отправки формы подписки
document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвратить стандартную отправку формы
    // Твоя логика отправки email
    console.log('Email for subscription:', this.querySelector('input[type="email"]').value);
    closeEmailModal(); // Закрыть модалку после "отправки"
});

// Для навигации в onboarding
// <button class="btn-primary" data-onboarding-next>Next</button>
document.querySelectorAll('[data-onboarding-next]').forEach(button => {
     button.addEventListener('click', nextStep); // Предполагая, что nextStep сама разберется какой шаг следующий
});
document.querySelector('[data-onboarding-done]').addEventListener('click', function() {
    // Логика завершения onboarding, например, закрыть модалку
    document.getElementById('onboarding').classList.add('hidden');
    // Возможно, что-то еще, типа "Explore Projects"
});
// Данные проектов
    // Project data for original browser nodes
    const projects = [
      {
        icon: "⬛",
        name: "Gradient",
        description: "Get paid in crypto for using your browser.",
        reward: "+$50-$250 (Est. avg.)",
        btnText: "Claim",
        hot: true,
        taskId: "zeta",
        instructions: {
          title: "🪙 Gradient Airdrop — no investment needed!",
          description: "Complete these simple steps to earn your Gradient Airdrop:",
          steps: [
            "Set up a node (right from your browser)",
            "Earn XP for uptime & inviting friends",
            "Claim rewards in Season 1",
          ],
          actionUrl: "https://app.gradient.network/signup?code=744DX2",
          actionText: "Start Earning"
        }
      },
      {
        icon: "🔷",
        name: "BlockMesh",
        description: "Earn Crypto by Sharing Internet — Help Build Ethical AI.",
        reward: "+$50-$250 (Est. avg.)",
        btnText: "Start",
        hot: true,
        taskId: "nova",
        instructions: {
          title: "🎁 Free Crypto Just by Being Online",
          description: "No money needed • Simple setup • Rewards are live",
          steps: [
            "Sign up on Blockmesh and confirm your email.",
            "Add the Chrome extension. Install it, log in, and keep it running.",
            "Connect your wallet + Twitter. Get points for easy tasks like captchas and follows.",
          ],
          actionUrl: "https://app.blockmesh.xyz/register?invite_code=5b614ab7-bad2-47f9-ae66-282004203f4a",
          actionText: "Start Earning"
        }
      },
      {
        icon: "🛡️",
        name: "Solix",
        description: "Maximize your browser's potential for crypto.",
        reward: "+$50-$250 (Est. avg.)",
        btnText: "Join",
        hot: true,
        taskId: "atom",
        instructions: {
          title: "💰 Earn with Solix — just for being online",
          description: "No investment. Just turn it on — and start getting points.",
          steps: [
            "Create a Solix account",
            "Add the Solix extension",
            "Do simple tasks",
          ],
          actionUrl: "https://dashboard.solixdepin.net/sign-up?ref=LzDVGhu7",
          actionText: "Start Earning"
        }
      },
      {
        icon: "🌱",
        name: "Grass",
        description: "Passive income from your browser tab",
        reward: "+$50-$300 (Est. avg. from past users. Results vary.)",
        btnText: "Join",
        hot: true,
        taskId: "wavenode",
        instructions: {
          title: "💰 Start Earning Free Crypto with Grass",
          description: "No money needed • Simple setup • Rewards are live",
          steps: [
            "Sign up on the Grass website. Create an account with your email and click Connect.",
            "Install the browser extension, or desktop extension",
            "Verify and connect wallet, Confirm your email and link your Solana wallet.",
          ],
          actionUrl: "https://app.grass.io/register/?referralCode=i4m1wvXSIPONluY",
          actionText: "Start Earning"
        }
      },
      {
        icon: "🔮",
        name: "Navigate",
        description: "Browser mining & simple daily tasks",
        reward: "+$75-$250 (Est. avg. from past users. Results vary.)",
        btnText: "Claim",
        hot: false,
        taskId: "nebula",
        instructions: {
          title: "🎉 Get Free Rewards with Navigate",
          description: "No money needed • Just be online • Rewards are already coming",
          steps: [
            "Sign up and set up your profile. Use your email and confirm it to get started.",
            "Install the Chrome extension. It helps you earn points while you browse. ",
            "Boost your points. Fill out a short form and connect your email, wallet, and social accounts. ",
            "Earn while you browse",
          ],
          actionUrl: "https://dataquest.nvg8.io//signup?ref=2496861",
          actionText: "Start Mining"
        }
      },
      {
        icon: "🌐",
        name: "Bless",
        description: "Run a lightweight node in your browser",
        reward: "+$45-$175 (Est. avg. from past users. Results vary.)",
        btnText: "Start",
        hot: false,
        taskId: "orbitalx",
        instructions: {
          title: "💸 Earn Free Points with Bless — No Token Needed Yet",
          description: "Run a lightweight blockchain node right in your browser:",
          steps: [
            "Sign up on the Bless website. Create your account and install the Chrome extension.",
            "Turn on the node. Keep it running — the longer it's on, the more points you get.",
            "Boost your rewards. Connect Twitter/Discord and invite friends for extra bonuses.",
          ],
          actionUrl: "https://bless.network/dashboard?ref=TKQFQK",
          actionText: "Launch Node"
        }
      },
      {
        icon: "🔋",
        name: "Teneo Protocol",
        description: "Browser extension for passive income",
        reward: "+$25-$150 (Est. avg. from past users. Results vary.)",
        btnText: "Join",
        hot: true,
        taskId: "powernode",
        instructions: {
          title: "🎯 Get Free TENEO Points Just by Staying Online",
          description: "No money needed • Simple setup • Rewards are live.",
          steps: [
            "Join Teneo. Sign up on the website with Code: Up2IO to get 1,000 Extra Teneo Points, verify your email.",
            "Install the Node Extension. Download it, log in, and click 'Connect Node' to start earning points.",
            "Earn More Points. Keep the node running and invite friends for big bonuses.",
          ],
          actionUrl: "https://dashboard.teneo.pro/auth/signup?referralCode=Up2IO",
          actionText: "Start Earning"
        }
      },
      {
        icon: "🧬",
        name: "DAWN",
        description: "Browser extension for passive income",
        reward: "+$40-$160 (Est. avg. from past users. Results vary.)",
        btnText: "Claim",
        hot: false,
        taskId: "genosis",
        instructions: {
          title: "💸 Earn Free Crypto Points with DAWN",
          description: "No money needed • Simple setup • Rewards are live",
          steps: [
            "Sign Up on DAWN. Go to the site and use code rqh9kamf to unlock your account.",
            "Install the Extension. Download the DAWN Validator and keep it running.",
            "Boost Your Points. Follow them on X, Discord, Telegram — and invite friends for extra rewards.",
          ],
          actionUrl: "https://dawn-internet.webflow.io/",
          actionText: "Join Network"
        }
      },
      {
        icon: "🌟",
        name: "OpenLoop",
        description: "Get Crypto for Sharing Internet — All Through Your Browser",
        reward: "+$30-$190 (Est. avg. from past users. Results vary.)",
        btnText: "Start",
        hot: false,
        taskId: "stardust",
        instructions: {
          title: "🎯 Get Free Points with OpenLoop — No Cost",
          description: "No money needed • Simple setup • Rewards are live.",
          steps: [
            "1. Sign Up on OpenLoop. Create an account and use code ol8ce15b49.",
            "2. Connect Your Wallet. Log in and click 'Link Wallet' to add your Solana wallet.",
            "3. Install the Extension. Download the Sentry Node extension and log in.",
          ],
          actionUrl: "https://openloop.so/auth/register?ref=ol8ce15b49",
          actionText: "Join Network"
        }
      },
      {
        icon: "🌀",
        name: "Stork",
        description: "Browser extension for passive income",
        reward: "+$55-$210 (Est. avg. from past users. Results vary.)",
        btnText: "Join",
        hot: false,
        taskId: "vortexpay",
        instructions: {
          title: "🎁 Earn Free Rewards with Stork — It's Easy!",
          description: "No money needed • Simple setup • Rewards are live",
          steps: [
            "Install the Stork Extension. Download it from the Chrome Web Store and open it.",
            "2. Sign Up and Use Code. Create an account and enter code `ITYO9FF9K4`",
            "3. Keep It Running. Let the extension stay active to earn rewards automatically.",
          ],
          actionUrl: "https://chromewebstore.google.com/detail/stork-verify/knnliglhgkmlblppdejchidfihjnockl",
          actionText: "Start Mining"
        }
      },
      {
        icon: "⚡",
        name: "NodeGo",
        description: "Earn crypto passively through your browser.",
        reward: "+$35-$185 (Est. avg. from past users. Results vary.)",
        btnText: "Claim",
        hot: true,
        taskId: "lightning",
        instructions: {
          title: "💰 Earn Free GO Tokens Just by Staying Online",
          description: "No money needed • Simple setup • Rewards are live",
          steps: [
            "Sign Up on NodeGo. Register on the NodeGo website and install their browser extension.",
            "Run the Node. Turn it on and keep it active — you'll earn points automatically.",
            "Do Bonus Tasks. Visit the 'Rewards' tab and complete simple tasks to boost your points.",
          ],
          actionUrl: "https://app.nodego.ai/r/NODE91DC98C3479E",
          actionText: "Get Started"
        }
      },
      {
        icon: "🏛️",
        name: "Coming soon...",
        description: "-",
        reward: "-",
        btnText: "Start",
        hot: false,
        taskId: "athena",
        instructions: {
          title: "🏛️ Athena - Earn Through Knowledge",
          description: "Complete knowledge tasks to earn Athena tokens:",
          steps: [
            "Create your Athena account",
            "Install the browser assistant",
            "Complete knowledge-based micro tasks",
            "Earn rewards for your contributions"
          ],
          actionUrl: "#",
          actionText: "Start Learning"
        }
      }
    ];

    // Project data for recommended/top of the week projects
    const recommendedProjects = [
      {
        icon: "🔥",
        name: "FirEdge",
        description: "New Layer 2 solution with huge airdrop potential.",
        reward: "+$80-$350 (Est. avg. from past users. Results vary.)",
        btnText: "Join",
        hot: true,
        taskId: "firedge",
        instructions: {
          title: "🔥 FirEdge - The Hottest Layer 2 Project",
          description: "Top project of the week with significant growth potential:",
          steps: [
            "Create your FirEdge account and verify email",
            "Bridge at least 0.01 ETH to FirEdge testnet",
            "Complete at least 5 transactions on the testnet",
            "Invite friends for bonus points"
          ],
          actionUrl: "#",
          actionText: "Start Now"
        }
      },
      {
        icon: "🌊",
        name: "WaveDAO",
        description: "Governance token with instant staking rewards.",
        reward: "+$65-$270 (Est. avg. from past users. Results vary.)",
        btnText: "Claim",
        hot: true,
        taskId: "wavedao",
        instructions: {
          title: "🌊 WaveDAO - Join the Governance Revolution",
          description: "Leading governance project with immediate benefits:",
          steps: [
            "Sign up for WaveDAO and verify your wallet",
            "Participate in at least one governance vote",
            "Stake your test tokens for rewards",
            "Complete social media tasks for bonus points"
          ],
          actionUrl: "#",
          actionText: "Join DAO"
        }
      },
      {
        icon: "💫",
        name: "StarChain",
        description: "Privacy-focused blockchain with early adopter bonuses.",
        reward: "+$90-$320 (Est. avg. from past users. Results vary.)",
        btnText: "Start",
        hot: true,
        taskId: "starchain",
        instructions: {
          title: "💫 StarChain - Privacy First, Rewards Second",
          description: "Be an early adopter of this revolutionary privacy chain:",
          steps: [
            "Create your StarChain wallet",
            "Complete the privacy protocol tutorial",
            "Send at least 3 private transactions",
            "Invite friends to build your node network"
          ],
          actionUrl: "#",
          actionText: "Claim Spot"
        }
      }
    ];

    // Project data for free-to-earn projects
    const freeToEarnProjects = [
      {
        icon: "📝",
        name: "LearnPad",
        description: "Complete simple tasks and educational quizzes for tokens.",
        reward: "+$30-$150 (Est. avg. from past users. Results vary.)",
        btnText: "Learn",
        hot: false,
        taskId: "learnpad",
        instructions: {
          title: "📝 LearnPad - Knowledge is Crypto",
          description: "Learn and earn with zero investment:",
          steps: [
            "Register your LearnPad account",
            "Complete educational quizzes about blockchain",
            "Participate in daily challenges",
            "Share your knowledge for additional rewards"
          ],
          actionUrl: "#",
          actionText: "Start Learning"
        }
      },
      {
        icon: "🔍",
        name: "DataSeek",
        description: "Share anonymized browsing data for ongoing rewards.",
        reward: "+$40-$180 (Est. avg. from past users. Results vary.)",
        btnText: "Share",
        hot: true,
        taskId: "dataseek",
        instructions: {
          title: "🔍 DataSeek - Your Data, Your Earnings",
          description: "Earn by contributing anonymized browsing data:",
          steps: [
            "Install the DataSeek browser extension",
            "Set your privacy preferences",
            "Earn while you browse normally",
            "Cash out rewards weekly"
          ],
          actionUrl: "#",
          actionText: "Start Sharing"
        }
      },
      {
        icon: "🧩",
        name: "TaskCube",
        description: "Microtasks with instant crypto rewards.",
        reward: "+$25-$130 (Est. avg. from past users. Results vary.)",
        btnText: "Tasks",
        hot: false,
        taskId: "taskcube",
        instructions: {
          title: "🧩 TaskCube - Small Tasks, Real Crypto",
          description: "Complete easy microtasks for immediate rewards:",
          steps: [
            "Create your TaskCube account",
            "Choose from various task categories",
            "Complete tasks at your own pace",
            "Get paid instantly to your wallet"
          ],
          actionUrl: "#",
          actionText: "View Tasks"
        }
      }
    ];

    // Project data for play-to-earn projects
    const playToEarnProjects = [
      {
        icon: "🎯",
        name: "CryptoBlast",
        description: "Fast-paced action game with token rewards.",
        reward: "+$35-$175 (Est. avg. from past users. Results vary.)",
        btnText: "Play",
        hot: true,
        taskId: "cryptoblast",
        instructions: {
          title: "🎯 CryptoBlast - Play and Earn Rewards",
          description: "Have fun and earn crypto while playing:",
          steps: [
            "Download the CryptoBlast game app",
            "Complete the tutorial levels",
            "Participate in daily tournaments",
            "Withdraw your earnings directly to your wallet"
          ],
          actionUrl: "#",
          actionText: "Start Playing"
        }
      },
      {
        icon: "🏆",
        name: "ArenaX",
        description: "Competitive PvP games with weekly tournaments.",
        reward: "+$40-$200 (Est. avg. from past users. Results vary.)",
        btnText: "Compete",
        hot: false,
        taskId: "arenax",
        instructions: {
          title: "🏆 ArenaX - Compete and Earn",
          description: "Test your skills against other players for rewards:",
          steps: [
            "Create your ArenaX account",
            "Practice in free training mode",
            "Enter weekly tournaments",
            "Win rewards based on your ranking"
          ],
          actionUrl: "#",
          actionText: "Join Arena"
        }
      },
      {
        icon: "🎮",
        name: "MetaRealms",
        description: "Open-world exploration with daily quests.",
        reward: "+$50-$220 (Est. avg. from past users. Results vary.)",
        btnText: "Explore",
        hot: true,
        taskId: "metarealms",
        instructions: {
          title: "🎮 MetaRealms - Explore to Earn",
          description: "Immerse yourself in a crypto-powered virtual world:",
          steps: [
            "Create your MetaRealms character",
            "Complete the onboarding quests",
            "Participate in daily and weekly events",
            "Trade your earnings for real crypto"
          ],
          actionUrl: "#",
          actionText: "Start Adventure"
        }
      }
    ];

    // Project data for NFT projects
    const nftProjects = [
      {
        icon: "🖼️",
        name: "PixelVerse",
        description: "Create and trade pixel art NFTs with zero gas fees.",
        reward: "+$60-$280 (Est. avg. from past users. Results vary.)",
        btnText: "Create",
        hot: true,
        taskId: "pixelverse",
        instructions: {
          title: "🖼️ PixelVerse - Create and Earn with NFTs",
          description: "Zero-cost NFT creation with high earning potential:",
          steps: [
            "Sign up for PixelVerse",
            "Create your first pixel art NFT (tools provided)",
            "List your creation on the marketplace",
            "Earn royalties from every sale"
          ],
          actionUrl: "#",
          actionText: "Start Creating"
        }
      },
      {
        icon: "🎭",
        name: "AvatarWorld",
        description: "Free avatar NFTs with staking rewards.",
        reward: "+$45-$190 (Est. avg. from past users. Results vary.)",
        btnText: "Mint",
        hot: false,
        taskId: "avatarworld",
        instructions: {
          title: "🎭 AvatarWorld - Your Digital Identity",
          description: "Get free avatar NFTs with real utility:",
          steps: [
            "Claim your free unique avatar NFT",
            "Customize it with free traits",
            "Stake your avatar for passive rewards",
            "Use across multiple partner platforms"
          ],
          actionUrl: "#",
          actionText: "Claim Avatar"
        }
      },
      {
        icon: "🃏",
        name: "CardChain",
        description: "Collectible card game with tradable NFT cards.",
        reward: "+$55-$230 (Est. avg. from past users. Results vary.)",
        btnText: "Collect",
        hot: true,
        taskId: "cardchain",
        instructions: {
          title: "🃏 CardChain - Collect, Play, Earn",
          description: "Free starter pack with valuable NFT cards:",
          steps: [
            "Claim your free starter deck",
            "Learn to play through tutorials",
            "Compete in daily matches",
            "Trade or sell your valuable cards"
          ],
          actionUrl: "#",
          actionText: "Get Cards"
        }
      }
    ];

    // Project data for testnet projects
    const testnetProjects = [
      {
        icon: "🧪",
        name: "FusionDEX",
        description: "Next-gen DEX testnet with confirmed airdrop.",
        reward: "+$70-$300 (Est. avg. from past users. Results vary.)",
        btnText: "Test",
        hot: true,
        taskId: "fusiondex",
        instructions: {
          title: "🧪 FusionDEX - Test the Future of Trading",
          description: "Early access to revolutionary DEX with confirmed airdrop:",
          steps: [
            "Register for FusionDEX testnet",
            "Get free testnet tokens",
            "Complete at least 10 swaps",
            "Provide feedback for bonus rewards"
          ],
          actionUrl: "#",
          actionText: "Join Testnet"
        }
      },
      {
        icon: "🔐",
        name: "ShieldPay",
        description: "Privacy-focused payment protocol with incentivized testing.",
        reward: "+$55-$240 (Est. avg. from past users. Results vary.)",
        btnText: "Join",
        hot: false,
        taskId: "shieldpay",
        instructions: {
          title: "🔐 ShieldPay - Private Payments, Public Rewards",
          description: "Test the future of private transactions:",
          steps: [
            "Create your ShieldPay account",
            "Complete the privacy protocol tutorial",
            "Send at least 5 private transactions",
            "Report bugs for additional rewards"
          ],
          actionUrl: "#",
          actionText: "Start Testing"
        }
      },
      {
        icon: "🔄",
        name: "CrossBridge",
        description: "Cross-chain bridge with testnet rewards.",
        reward: "+$60-$260 (Est. avg. from past users. Results vary.)",
        btnText: "Bridge",
        hot: true,
        taskId: "crossbridge",
        instructions: {
          title: "🔄 CrossBridge - Connect Chains, Collect Rewards",
          description: "Test groundbreaking cross-chain technology:",
          steps: [
            "Create accounts on multiple test networks",
            "Get free testnet tokens",
            "Perform at least 5 cross-chain transfers",
            "Report your experience for bonus points"
          ],
          actionUrl: "#",
          actionText: "Start Bridging"
        }
      }
    ];

    // We'll add script to populate all sections
    document.addEventListener('DOMContentLoaded', function() {
      // Function to create project cards
      function createProjectCard(project, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'project-card';
        
        let hotBadge = project.hot ? '<span class="hot-badge">🔥 HOT</span>' : '';
        
        cardDiv.innerHTML = `
          <div class="project-icon">${project.icon}</div>
          <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            ${hotBadge}
            <p class="reward">${project.reward}</p>
            <button class="btn-action" onclick="openTaskModal('${project.taskId}')">${project.btnText}</button>
          </div>
        `;
        
        container.appendChild(cardDiv);
      }
      
      // Function to initially show only first 3 projects
      function initializeProjectSection(projectsArray, containerId, showMoreBtnId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear container first
        container.innerHTML = '';
        
        // Show first 3 projects
        for (let i = 0; i < Math.min(3, projectsArray.length); i++) {
          createProjectCard(projectsArray[i], containerId);
        }
        
        // Show "Show More" button only if there are more than 3 projects
        const showMoreBtn = document.getElementById(showMoreBtnId);
        if (showMoreBtn) {
          showMoreBtn.style.display = projectsArray.length > 3 ? 'block' : 'none';
        }
      }
      
      // Initialize all project sections
      initializeProjectSection(projects, 'project-cards', 'show-more-btn');
      initializeProjectSection(recommendedProjects, 'recommended-cards', 'show-more-recommended-btn');
      initializeProjectSection(freeToEarnProjects, 'free-earn-cards', 'show-more-free-btn');
      initializeProjectSection(playToEarnProjects, 'play-earn-cards', 'show-more-play-btn');
      initializeProjectSection(nftProjects, 'nft-cards', 'show-more-nft-btn');
      initializeProjectSection(testnetProjects, 'testnet-cards', 'show-more-testnet-btn');
    });

    // Functions to show more projects in each section
    function showMoreProjects() {
      showMoreItems(projects, 'project-cards', 'show-more-btn');
      document.getElementById('info-text').style.display = 'block';
      document.getElementById('action-buttons').style.display = 'flex';
    }
    
    function showMoreRecommended() {
      showMoreItems(recommendedProjects, 'recommended-cards', 'show-more-recommended-btn');
    }
    
    function showMoreFreeEarn() {
      showMoreItems(freeToEarnProjects, 'free-earn-cards', 'show-more-free-btn');
    }
    
    function showMorePlayEarn() {
      showMoreItems(playToEarnProjects, 'play-earn-cards', 'show-more-play-btn');
    }
    
    function showMoreNft() {
      showMoreItems(nftProjects, 'nft-cards', 'show-more-nft-btn');
    }
    
    function showMoreTestnets() {
      showMoreItems(testnetProjects, 'testnet-cards', 'show-more-testnet-btn');
    }
    
    // General function to show more items
    function showMoreItems(itemsArray, containerId, btnId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      // Clear container first
      container.innerHTML = '';
      
      // Show all projects
      for (let i = 0; i < itemsArray.length; i++) {
        createProjectCard(itemsArray[i], containerId);
      }
      
      // Hide the "Show More" button
      const showMoreBtn = document.getElementById(btnId);
      if (showMoreBtn) {
        showMoreBtn.style.display = 'none';
      }
    }

    // Modal functions
    function openTaskModal(taskId) {
      const modal = document.getElementById('task-modal');
      const content = document.getElementById('task-content');
      
      // Find the project with the matching taskId
      let project = findProjectByTaskId(taskId);
      
      if (project && project.instructions) {
        // Create the task content
        let stepsHtml = '';
        if (project.instructions.steps && project.instructions.steps.length > 0) {
          stepsHtml = '<ol class="task-steps">';
          project.instructions.steps.forEach(step => {
            stepsHtml += `<li>${step}</li>`;
          });
          stepsHtml += '</ol>';
        }
        
        content.innerHTML = `
          <h2>${project.instructions.title}</h2>
          <p class="task-description">${project.instructions.description}</p>
          ${stepsHtml}
          <a href="${project.instructions.actionUrl}" target="_blank" class="btn-primary">${project.instructions.actionText}</a>
        `;
        
        modal.style.display = 'block';
      }
    }
    
    function closeTaskModal() {
      document.getElementById('task-modal').style.display = 'none';
    }
    
    function findProjectByTaskId(taskId) {
      // Check in all project arrays
      const allProjects = [
        ...projects,
        ...recommendedProjects,
        ...freeToEarnProjects,
        ...playToEarnProjects,
        ...nftProjects,
        ...testnetProjects
      ];
      
      return allProjects.find(p => p.taskId === taskId);
    }
    
    function openGuideModal() {
      document.getElementById('guideModal').style.display = 'block';
    }
    
    function closeGuideModal() {
      document.getElementById('guideModal').style.display = 'none';
    }
    
    function startOnboarding() {
      document.getElementById('onboarding').style.display = 'block';
      currentStep = 0;
      showStep(currentStep);
    }
    
    function closeOnboarding() {
      document.getElementById('onboarding').style.display = 'none';
    }
    
    currentStep = 0;
    
    function showStep(stepIndex) {
      const steps = document.querySelectorAll('.step');
      steps.forEach((step, index) => {
        step.style.display = index === stepIndex ? 'block' : 'none';
      });
    }
    
    function nextStep() {
      currentStep++;
      showStep(currentStep);
    }
    
    function openLightbox(src) {
      const lightbox = document.getElementById('lightbox');
      const img = document.getElementById('lightbox-img');
      img.src = src;
      lightbox.style.display = 'block';
    }
    
    function closeLightbox() {
      document.getElementById('lightbox').style.display = 'none';
    }
    
    function openEmailForm() {
      document.getElementById('email-modal').style.display = 'block';
    }
    
    function closeEmailModal() {
      document.getElementById('email-modal').style.display = 'none';
    }
 
