// projects.js - Contains all project data and related functionality

// Глобальные переменные, которые могут потребоваться функциям в этом файле
// (предполагается, что scrollPosition и startOnboarding будут доступны из script.js)
// let scrollPosition = 0; // Уже есть в script.js, будет доступна глобально
// function startOnboarding() {} // Должна быть определена в script.js и доступна глобально

// Объект для хранения счетчиков проектов по категориям
const projectTrackers = {
  recommended: { shown: 0, clickCount: 0 },
  browser: { shown: 0, clickCount: 0 },
  free: { shown: 0, clickCount: 0 },
  play: { shown: 0, clickCount: 0 },
  nft: { shown: 0, clickCount: 0 },
  testnet: { shown: 0, clickCount: 0 }
};

// --- ДАННЫЕ ПРОЕКТОВ ---
// Вам нужно будет заполнить эти массивы реальными данными проектов

const recommendedProjects = [
  // Пример рекомендованного проекта (добавьте свои)
  // {
  //   icon: "⭐",
  //   name: "Super Recommended Project",
  //   description: "This project is highly recommended for reasons X, Y, Z.",
  //   reward: "+$100-$500 (Est.)",
  //   btnText: "Explore",
  //   hot: true,
  //   taskId: "rec_super",
  //   instructions: {
  //     title: "🚀 Get Started with Super Recommended Project",
  //     description: "Follow these steps to participate:",
  //     steps: [
  //       "Sign up on their platform.",
  //       "Complete KYC if required.",
  //       "Engage with the community."
  //     ],
  //     actionUrl: "https://example.com/super-recommended",
  //     actionText: "Go to Project"
  //   }
  // }
];

const browserProjects = [
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
        "Turn on the node. Keep it running — the longer it's on, the more points you get."
        // Добавьте недостающие шаги или URL, если есть
      ],
      actionUrl: "https://example.com/bless", // Замените на реальный URL
      actionText: "Start Node"
    }
  }
  // Добавьте еще браузерные проекты сюда
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
];

const freeProjects = [
  // Пример бесплатного проекта (добавьте свои)
  // {
  //   icon: "🎁",
  //   name: "Freebie Coin",
  //   description: "Earn crypto by completing simple social tasks.",
  //   reward: "100-500 FREEBIE Tokens",
  //   btnText: "Get Free",
  //   hot: false,
  //   taskId: "free_freebie",
  //   instructions: {
  //     title: "Claim Your Freebie Coins!",
  //     description: "Easy tasks for free tokens:",
  //     steps: [
  //       "Join our Telegram group.",
  //       "Follow us on Twitter.",
  //       "Submit your wallet address."
  //     ],
  //     actionUrl: "https://example.com/freebie-coin",
  //     actionText: "Claim Now"
  //   }
  // }
];

const playProjects = [
  // Пример Play-to-Earn проекта (добавьте свои)
  // {
  //   icon: "🎮",
  //   name: "Crypto Raiders",
  //   description: "Play an exciting RPG and earn NFTs and tokens.",
  //   reward: "Varies (NFTs, Game Tokens)",
  //   btnText: "Play Now",
  //   hot: true,
  //   taskId: "play_raiders",
  //   instructions: {
  //     title: "⚔️ Become a Crypto Raider!",
  //     description: "Embark on adventures and earn rewards:",
  //     steps: [
  //       "Create an account and connect your wallet.",
  //       "Choose your hero and start questing.",
  //       "Win battles to earn items and tokens."
  //     ],
  //     actionUrl: "https://example.com/crypto-raiders",
  //     actionText: "Enter Game"
  //   }
  // }
];

const nftProjects = [
  // Пример NFT проекта (добавьте свои)
  // {
  //   icon: "🖼️",
  //   name: "PixelPunks",
  //   description: "Mint unique pixel art NFTs with a chance for rare traits.",
  //   reward: "1 Free Mint (Gas fees apply)",
  //   btnText: "Mint NFT",
  //   hot: false,
  //   taskId: "nft_punks",
  //   instructions: {
  //     title: "🎨 Mint Your PixelPunk NFT",
  //     description: "Get your hands on a unique digital collectible:",
  //     steps: [
  //       "Connect your wallet to the minting site.",
  //       "Approve the transaction for minting.",
  //       "Your NFT will appear in your wallet."
  //     ],
  //     actionUrl: "https://example.com/pixelpunks-mint",
  //     actionText: "Go to Mint"
  //   }
  // }
];

const testnetProjects = [
  // Пример Testnet проекта (добавьте свои)
  // {
  //   icon: "🧪",
  //   name: "AlphaNet Explorer",
  //   description: "Participate in our testnet and get rewarded for feedback.",
  //   reward: "Potential Mainnet Tokens",
  //   btnText: "Join Testnet",
  //   hot: true,
  //   taskId: "test_alpha",
  //   instructions: {
  //     title: "🔬 Explore AlphaNet Testnet",
  //     description: "Help us test our new blockchain and earn potential rewards:",
  //     steps: [
  //       "Request testnet tokens from the faucet.",
  //       "Perform transactions and test smart contracts.",
  //       "Report bugs and provide feedback."
  //     ],
  //     actionUrl: "https://example.com/alphanet-testnet",
  //     actionText: "Get Started"
  //   }
  // }
];


// --- ФУНКЦИИ ДЛЯ РАБОТЫ С ПРОЕКТАМИ ---

// Project Cards (Карточки проектов)
function createProjectCard(project, category) {
  // Валидация обязательных полей проекта
  const requiredFields = ['icon', 'name', 'description', 'reward', 'btnText', 'taskId'];
  const missingFields = requiredFields.filter(field => !(field in project) || project[field] === null || project[field] === undefined);
  
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
  const joinButton = card.querySelector(".join-btn");
  if (joinButton) {
    joinButton.onclick = () => openTask(project.taskId, category);
  } else {
    console.error("Join button not found in project card template for project:", project);
  }
  
  return card;
}

function initializeProjects(category, projectsArray, containerId) {
  if (typeof projectsArray === 'undefined' || !Array.isArray(projectsArray)) {
    console.error(`Projects array for category ${category} is not defined or not an array. Cannot initialize project cards.`);
    const container = document.getElementById(containerId);
    if(container) container.innerHTML = "<p>Project data is unavailable.</p>";
    const showMoreBtn = document.getElementById(`show-more-${category}-btn`);
    if(showMoreBtn) showMoreBtn.style.display = 'none';
    return;
  }
  
  if (projectsArray.length === 0) {
    console.warn(`Projects array for category ${category} is empty. No projects to display.`);
    const container = document.getElementById(containerId);
    if(container) container.innerHTML = "<p>No projects to display in this category yet.</p>";
    const showMoreBtn = document.getElementById(`show-more-${category}-btn`);
    if(showMoreBtn) showMoreBtn.style.display = 'none';
    return;
  }
  
  // Сбрасываем счетчики для этой категории
  if (projectTrackers[category]) {
    projectTrackers[category].shown = 0;
    projectTrackers[category].clickCount = 0;
  } else {
    console.warn(`No tracker defined for category: ${category}.`);
  }
  
  const container = document.getElementById(containerId);
  if(container) {
    container.innerHTML = ''; // Очищаем контейнер перед добавлением карточек
    showMoreProjects(category, projectsArray, containerId); // Показываем первую порцию проектов
  } else {
    console.error(`Container with ID ${containerId} not found for category ${category}.`);
  }
}

function showMoreProjects(category, projectsArray, containerId) {
  const container = document.getElementById(containerId);
  const showMoreBtn = document.getElementById(`show-more-${category}-btn`);
  const infoText = document.getElementById(`${category}-info-text`);
  const actionButtons = document.getElementById(`${category}-action-buttons`);

  if (!container) {
    console.error(`Project cards container with ID ${containerId} for ${category} not found.`);
    return;
  }
  
  if (typeof projectsArray === 'undefined' || !Array.isArray(projectsArray)) {
    console.error(`Projects array for category ${category} is not defined or not an array in showMoreProjects.`);
    return;
  }

  const tracker = projectTrackers[category];
  if (!tracker) {
    console.warn(`No tracker found for category: ${category}. Cannot update show/click counts.`);
    return;
  }

  // Увеличиваем clickCount только если уже показаны проекты и это не первый вызов (из initializeProjects)
  if (tracker.shown > 0) {
    tracker.clickCount++;
  }

  const start = tracker.shown;
  const end = Math.min(start + 3, projectsArray.length);

  for (let i = start; i < end; i++) {
    if (projectsArray[i]) {
      const card = createProjectCard(projectsArray[i], category);
      if (card) {
        container.appendChild(card);
        tracker.shown++;
      } else {
        console.warn(`Skipping project card at index ${i} for category ${category} due to validation error or missing data.`);
      }
    } else {
      console.warn(`Project data at index ${i} for category ${category} is undefined.`);
    }
  }

  // Показываем информационный текст после второго клика, если он существует
  if (infoText && tracker.clickCount === 2) {
    infoText.style.display = 'block';
  }

  // Управляем видимостью кнопки "показать еще" и кнопок действий
  if (tracker.shown >= projectsArray.length) {
    if (showMoreBtn) showMoreBtn.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'flex'; // Используйте 'flex' или 'block' в зависимости от вашего CSS
  } else if (showMoreBtn) {
    showMoreBtn.style.display = 'inline-block';
    const remaining = Math.min(3, projectsArray.length - tracker.shown);
    showMoreBtn.textContent = `🔽 Show ${remaining} More Projects`;
  }
}

function initializeAllProjects() {
  // Инициализация всех категорий проектов
  initializeProjects('recommended', recommendedProjects, 'recommended-cards');
  initializeProjects('browser', browserProjects, 'project-cards'); // 'project-cards' это ID для browser проектов как в оригинале
  initializeProjects('free', freeProjects, 'free-cards');
  initializeProjects('play', playProjects, 'play-cards');
  initializeProjects('nft', nftProjects, 'nft-cards');
  initializeProjects('testnet', testnetProjects, 'testnet-cards');
}

// Task Modal (Модальное окно задачи)
function openTask(taskId, categoryType = 'browser') {
  // scrollPosition должен быть установлен в script.js перед вызовом этой функции,
  // либо передан как аргумент, либо эта функция должна быть в script.js
  // В вашем оригинальном script.js scrollPosition - глобальная переменная.
  // Предполагаем, что она доступна.
  // scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Это было в script.js

  const taskModal = document.getElementById('task-modal');
  const taskContent = document.getElementById('task-content');

  if (!taskModal || !taskContent) {
    console.error("Task modal or task content element not found.");
    return false; // Возвращаем false для предотвращения стандартного поведения ссылки, если вызвано из <a>
  }

  let projectsArray;
  switch(categoryType.toLowerCase()) { // Приводим к нижнему регистру для надежности
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
      console.warn(`Unknown category type: ${categoryType}. Defaulting to browser projects.`);
      projectsArray = browserProjects;
  }

  if (typeof projectsArray !== 'undefined' && Array.isArray(projectsArray)) {
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
      taskContent.innerHTML = `<p>Task details not available for ID: ${taskId} in category ${categoryType}.</p>`;
      console.warn(`Project or instructions not found for taskId: ${taskId} in category: ${categoryType}`);
    }
  } else {
    taskContent.innerHTML = `<p>Project data is not defined or not an array for category: ${categoryType}. Cannot open task.</p>`;
    console.error(`Projects array for category ${categoryType} is not defined or not an array.`);
  }

  taskModal.classList.add('active');
  return false; // Полезно, если вызывается из <a> href="#"
}

function closeTaskModal() {
  const taskModal = document.getElementById('task-modal');
  if (taskModal) {
    taskModal.classList.remove('active');
  }
  // Восстанавливаем позицию прокрутки
  // scrollPosition должна быть доступна глобально из script.js
  if (typeof scrollPosition !== 'undefined') {
    setTimeout(() => window.scrollTo(0, scrollPosition), 10);
  } else {
    console.warn("scrollPosition is not defined. Cannot restore scroll position.");
  }
}

function showWalletHelp() {
  closeTaskModal();
  // startOnboarding() должна быть функцией, определенной в script.js и доступной глобально
  if (typeof startOnboarding === 'function') {
    startOnboarding(); // Показываем онбординг для помощи с кошельком
  } else {
    console.error("startOnboarding function is not defined. Cannot show wallet help onboarding.");
  }
}

// Если этот файл подключается как модуль, то нужно экспортировать функции,
// которые будут вызываться извне (например, из script.js)
// export { initializeAllProjects, showMoreProjects, openTask, closeTaskModal, showWalletHelp, projectTrackers, recommendedProjects, browserProjects, freeProjects, playProjects, nftProjects, testnetProjects };
// Однако, если вы просто подключаете его через <script>, то функции и переменные будут в глобальной области видимости (если не обернуты в IIFE или модуль).
// Для простоты, предполагая классическое подключение <script>, экспорт не обязателен.
