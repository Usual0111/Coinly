// --- Глобальные переменные ---
let scrollPosition = 0;
let currentOnboardingStep = 0;
let onboardingSteps = []; // Массив для элементов шагов онбординга

const projectTrackers = {
  recommended: { shown: 0, data: [], containerId: 'recommended-cards', btnId: 'show-more-recommended-btn', infoTextId: null, actionButtonsId: null },
  browser: { shown: 0, data: [], containerId: 'project-cards', btnId: 'show-more-browser-btn', infoTextId: 'browser-info-text', actionButtonsId: 'browser-action-buttons' },
  free: { shown: 0, data: [], containerId: 'free-cards', btnId: 'show-more-free-btn', infoTextId: null, actionButtonsId: null },
  play: { shown: 0, data: [], containerId: 'play-cards', btnId: 'show-more-play-btn', infoTextId: null, actionButtonsId: null },
  nft: { shown: 0, data: [], containerId: 'nft-cards', btnId: 'show-more-nft-btn', infoTextId: null, actionButtonsId: null },
  testnet: { shown: 0, data: [], containerId: 'testnet-cards', btnId: 'show-more-testnet-btn', infoTextId: null, actionButtonsId: null }
};

const ITEMS_PER_LOAD = 3;

// --- Данные проектов (ПЕРЕМЕЩЕНЫ В НАЧАЛО) ---
// Project data for original browser nodes
const browserNodesProjectsData = [
  { icon: "⬛", name: "Gradient", description: "Get paid in crypto for using your browser.", reward: "+$50-$250 (Est. avg.)", btnText: "Claim", hot: true, taskId: "gradient", instructions: { title: "🪙 Gradient Airdrop — no investment needed!", description: "Complete these simple steps to earn your Gradient Airdrop:", steps: ["Set up a node (right from your browser)", "Earn XP for uptime & inviting friends", "Claim rewards in Season 1"], actionUrl: "https://app.gradient.network/signup?code=744DX2", actionText: "Start Earning" }},
  { icon: "🔷", name: "BlockMesh", description: "Earn Crypto by Sharing Internet — Help Build Ethical AI.", reward: "+$50-$250 (Est. avg.)", btnText: "Start", hot: true, taskId: "blockmesh", instructions: { title: "🎁 Free Crypto Just by Being Online", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign up on Blockmesh and confirm your email.", "Add the Chrome extension. Install it, log in, and keep it running.", "Connect your wallet + Twitter. Get points for easy tasks like captchas and follows."], actionUrl: "https://app.blockmesh.xyz/register?invite_code=5b614ab7-bad2-47f9-ae66-282004203f4a", actionText: "Start Earning" }},
  { icon: "🛡️", name: "Solix", description: "Maximize your browser's potential for crypto.", reward: "+$50-$250 (Est. avg.)", btnText: "Join", hot: true, taskId: "solix", instructions: { title: "💰 Earn with Solix — just for being online", description: "No investment. Just turn it on — and start getting points.", steps: ["Create a Solix account", "Add the Solix extension", "Do simple tasks"], actionUrl: "https://dashboard.solixdepin.net/sign-up?ref=LzDVGhu7", actionText: "Start Earning" }},
  { icon: "🌱", name: "Grass", description: "Passive income from your browser tab", reward: "+$50-$300 (Est. avg.)", btnText: "Join", hot: true, taskId: "grass", instructions: { title: "💰 Start Earning Free Crypto with Grass", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign up on the Grass website. Create an account with your email and click Connect.", "Install the browser extension, or desktop extension", "Verify and connect wallet, Confirm your email and link your Solana wallet."], actionUrl: "https://app.grass.io/register/?referralCode=i4m1wvXSIPONluY", actionText: "Start Earning" }},
  { icon: "🔮", name: "Navigate", description: "Browser mining & simple daily tasks", reward: "+$75-$250 (Est. avg.)", btnText: "Claim", hot: false, taskId: "navigate", instructions: { title: "🎉 Get Free Rewards with Navigate", description: "No money needed • Just be online • Rewards are already coming", steps: ["Sign up and set up your profile. Use your email and confirm it to get started.", "Install the Chrome extension. It helps you earn points while you browse. ", "Boost your points. Fill out a short form and connect your email, wallet, and social accounts. ", "Earn while you browse"], actionUrl: "https://dataquest.nvg8.io//signup?ref=2496861", actionText: "Start Mining" }},
  { icon: "🌐", name: "Bless", description: "Run a lightweight node in your browser", reward: "+$45-$175 (Est. avg.)", btnText: "Start", hot: false, taskId: "bless", instructions: { title: "💸 Earn Free Points with Bless — No Token Needed Yet", description: "Run a lightweight blockchain node right in your browser:", steps: ["Sign up on the Bless website. Create your account and install the Chrome extension.", "Turn on the node. Keep it running — the longer it's on, the more points you get.", "Boost your rewards. Connect Twitter/Discord and invite friends for extra bonuses."], actionUrl: "https://bless.network/dashboard?ref=TKQFQK", actionText: "Launch Node" }},
  { icon: "🔋", name: "Teneo Protocol", description: "Browser extension for passive income", reward: "+$25-$150 (Est. avg.)", btnText: "Join", hot: true, taskId: "teneo", instructions: { title: "🎯 Get Free TENEO Points Just by Staying Online", description: "No money needed • Simple setup • Rewards are live.", steps: ["Join Teneo. Sign up on the website with Code: Up2IO to get 1,000 Extra Teneo Points, verify your email.", "Install the Node Extension. Download it, log in, and click 'Connect Node' to start earning points.", "Earn More Points. Keep the node running and invite friends for big bonuses."], actionUrl: "https://dashboard.teneo.pro/auth/signup?referralCode=Up2IO", actionText: "Start Earning" }},
  { icon: "🧬", name: "DAWN", description: "Browser extension for passive income", reward: "+$40-$160 (Est. avg.)", btnText: "Claim", hot: false, taskId: "dawn", instructions: { title: "💸 Earn Free Crypto Points with DAWN", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign Up on DAWN. Go to the site and use code rqh9kamf to unlock your account.", "Install the Extension. Download the DAWN Validator and keep it running.", "Boost Your Points. Follow them on X, Discord, Telegram — and invite friends for extra rewards."], actionUrl: "https://dawn-internet.webflow.io/", actionText: "Join Network" }},
  { icon: "🌟", name: "OpenLoop", description: "Get Crypto for Sharing Internet — All Through Your Browser", reward: "+$30-$190 (Est. avg.)", btnText: "Start", hot: false, taskId: "openloop", instructions: { title: "🎯 Get Free Points with OpenLoop — No Cost", description: "No money needed • Simple setup • Rewards are live.", steps: ["1. Sign Up on OpenLoop. Create an account and use code ol8ce15b49.", "2. Connect Your Wallet. Log in and click 'Link Wallet' to add your Solana wallet.", "3. Install the Extension. Download the Sentry Node extension and log in."], actionUrl: "https://openloop.so/auth/register?ref=ol8ce15b49", actionText: "Join Network" }},
  { icon: "🌀", name: "Stork", description: "Browser extension for passive income", reward: "+$55-$210 (Est. avg.)", btnText: "Join", hot: false, taskId: "stork", instructions: { title: "🎁 Earn Free Rewards with Stork — It's Easy!", description: "No money needed • Simple setup • Rewards are live", steps: ["Install the Stork Extension. Download it from the Chrome Web Store and open it.", "2. Sign Up and Use Code. Create an account and enter code `ITYO9FF9K4`", "3. Keep It Running. Let the extension stay active to earn rewards automatically."], actionUrl: "https://chromewebstore.google.com/detail/stork-verify/knnliglhgkmlblppdejchidfihjnockl", actionText: "Start Mining" }},
  { icon: "⚡", name: "NodeGo", description: "Earn crypto passively through your browser.", reward: "+$35-$185 (Est. avg.)", btnText: "Claim", hot: true, taskId: "nodego", instructions: { title: "💰 Earn Free GO Tokens Just by Staying Online", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign Up on NodeGo. Register on the NodeGo website and install their browser extension.", "Run the Node. Turn it on and keep it active — you'll earn points automatically.", "Do Bonus Tasks. Visit the 'Rewards' tab and complete simple tasks to boost your points."], actionUrl: "https://app.nodego.ai/r/NODE91DC98C3479E", actionText: "Get Started" }},
  { icon: "🏛️", name: "Coming soon...", description: "-", reward: "-", btnText: "Start", hot: false, taskId: "athena", instructions: { title: "🏛️ Athena - Earn Through Knowledge", description: "Complete knowledge tasks to earn Athena tokens:", steps: ["Create your Athena account", "Install the browser assistant", "Complete knowledge-based micro tasks", "Earn rewards for your contributions"], actionUrl: "#", actionText: "Start Learning" }}
];
projectTrackers.browser.data = browserNodesProjectsData;

const recommendedProjectsData = [
  { icon: "🔥", name: "FirEdge", description: "New Layer 2 solution with huge airdrop potential.", reward: "+$80-$350 (Est. avg.)", btnText: "Join", hot: true, taskId: "firedge", instructions: { title: "🔥 FirEdge - The Hottest Layer 2 Project", description: "Top project of the week with significant growth potential:", steps: ["Create your FirEdge account and verify email", "Bridge at least 0.01 ETH to FirEdge testnet", "Complete at least 5 transactions on the testnet", "Invite friends for bonus points"], actionUrl: "#", actionText: "Start Now" }},
  { icon: "🌊", name: "WaveDAO", description: "Governance token with instant staking rewards.", reward: "+$65-$270 (Est. avg.)", btnText: "Claim", hot: true, taskId: "wavedao", instructions: { title: "🌊 WaveDAO - Join the Governance Revolution", description: "Leading governance project with immediate benefits:", steps: ["Sign up for WaveDAO and verify your wallet", "Participate in at least one governance vote", "Stake your test tokens for rewards", "Complete social media tasks for bonus points"], actionUrl: "#", actionText: "Join DAO" }},
  { icon: "💫", name: "StarChain", description: "Privacy-focused blockchain with early adopter bonuses.", reward: "+$90-$320 (Est. avg.)", btnText: "Start", hot: true, taskId: "starchain", instructions: { title: "💫 StarChain - Privacy First, Rewards Second", description: "Be an early adopter of this revolutionary privacy chain:", steps: ["Create your StarChain wallet", "Complete the privacy protocol tutorial", "Send at least 3 private transactions", "Invite friends to build your node network"], actionUrl: "#", actionText: "Claim Spot" }}
];
projectTrackers.recommended.data = recommendedProjectsData;

const freeToEarnProjectsData = [
  { icon: "📝", name: "LearnPad", description: "Complete simple tasks and educational quizzes for tokens.", reward: "+$30-$150 (Est. avg.)", btnText: "Learn", hot: false, taskId: "learnpad", instructions: { title: "📝 LearnPad - Knowledge is Crypto", description: "Learn and earn with zero investment:", steps: ["Register your LearnPad account", "Complete educational quizzes about blockchain", "Participate in daily challenges", "Share your knowledge for additional rewards"], actionUrl: "#", actionText: "Start Learning" }},
  { icon: "🔍", name: "DataSeek", description: "Share anonymized Browse data for ongoing rewards.", reward: "+$40-$180 (Est. avg.)", btnText: "Share", hot: true, taskId: "dataseek", instructions: { title: "🔍 DataSeek - Your Data, Your Earnings", description: "Earn by contributing anonymized Browse data:", steps: ["Install the DataSeek browser extension", "Set your privacy preferences", "Earn while you browse normally", "Cash out rewards weekly"], actionUrl: "#", actionText: "Start Sharing" }},
  { icon: "🧩", name: "TaskCube", description: "Microtasks with instant crypto rewards.", reward: "+$25-$130 (Est. avg.)", btnText: "Tasks", hot: false, taskId: "taskcube", instructions: { title: "🧩 TaskCube - Small Tasks, Real Crypto", description: "Complete easy microtasks for immediate rewards:", steps: ["Create your TaskCube account", "Choose from various task categories", "Complete tasks at your own pace", "Get paid instantly to your wallet"], actionUrl: "#", actionText: "View Tasks" }}
];
projectTrackers.free.data = freeToEarnProjectsData;

const playToEarnProjectsData = [
  { icon: "🎯", name: "CryptoBlast", description: "Fast-paced action game with token rewards.", reward: "+$35-$175 (Est. avg.)", btnText: "Play", hot: true, taskId: "cryptoblast", instructions: { title: "🎯 CryptoBlast - Play and Earn Rewards", description: "Have fun and earn crypto while playing:", steps: ["Download the CryptoBlast game app", "Complete the tutorial levels", "Participate in daily tournaments", "Withdraw your earnings directly to your wallet"], actionUrl: "#", actionText: "Start Playing" }},
  { icon: "🏆", name: "ArenaX", description: "Competitive PvP games with weekly tournaments.", reward: "+$40-$200 (Est. avg.)", btnText: "Compete", hot: false, taskId: "arenax", instructions: { title: "🏆 ArenaX - Compete and Earn", description: "Test your skills against other players for rewards:", steps: ["Create your ArenaX account", "Practice in free training mode", "Enter weekly tournaments", "Win rewards based on your ranking"], actionUrl: "#", actionText: "Join Arena" }},
  { icon: "🎮", name: "MetaRealms", description: "Open-world exploration with daily quests.", reward: "+$50-$220 (Est. avg.)", btnText: "Explore", hot: true, taskId: "metarealms", instructions: { title: "🎮 MetaRealms - Explore to Earn", description: "Immerse yourself in a crypto-powered virtual world:", steps: ["Create your MetaRealms character", "Complete the onboarding quests", "Participate in daily and weekly events", "Trade your earnings for real crypto"], actionUrl: "#", actionText: "Start Adventure" }}
];
projectTrackers.play.data = playToEarnProjectsData;

const nftProjectsData = [
  { icon: "🖼️", name: "PixelVerse", description: "Create and trade pixel art NFTs with zero gas fees.", reward: "+$60-$280 (Est. avg.)", btnText: "Create", hot: true, taskId: "pixelverse", instructions: { title: "🖼️ PixelVerse - Create and Earn with NFTs", description: "Zero-cost NFT creation with high earning potential:", steps: ["Sign up for PixelVerse", "Create your first pixel art NFT (tools provided)", "List your creation on the marketplace", "Earn royalties from every sale"], actionUrl: "#", actionText: "Start Creating" }},
  { icon: "🎭", name: "AvatarWorld", description: "Free avatar NFTs with staking rewards.", reward: "+$45-$190 (Est. avg.)", btnText: "Mint", hot: false, taskId: "avatarworld", instructions: { title: "🎭 AvatarWorld - Your Digital Identity", description: "Get free avatar NFTs with real utility:", steps: ["Claim your free unique avatar NFT", "Customize it with free traits", "Stake your avatar for passive rewards", "Use across multiple partner platforms"], actionUrl: "#", actionText: "Claim Avatar" }},
  { icon: "🃏", name: "CardChain", description: "Collectible card game with tradable NFT cards.", reward: "+$55-$230 (Est. avg.)", btnText: "Collect", hot: true, taskId: "cardchain", instructions: { title: "🃏 CardChain - Collect, Play, Earn", description: "Free starter pack with valuable NFT cards:", steps: ["Claim your free starter deck", "Learn to play through tutorials", "Compete in daily matches", "Trade or sell your valuable cards"], actionUrl: "#", actionText: "Get Cards" }}
];
projectTrackers.nft.data = nftProjectsData;

const testnetProjectsData = [
  { icon: "🧪", name: "FusionDEX", description: "Next-gen DEX testnet with confirmed airdrop.", reward: "+$70-$300 (Est. avg.)", btnText: "Test", hot: true, taskId: "fusiondex", instructions: { title: "🧪 FusionDEX - Test the Future of Trading", description: "Early access to revolutionary DEX with confirmed airdrop:", steps: ["Register for FusionDEX testnet", "Get free testnet tokens", "Complete at least 10 swaps", "Provide feedback for bonus rewards"], actionUrl: "#", actionText: "Join Testnet" }},
  { icon: "🔐", name: "ShieldPay", description: "Privacy-focused payment protocol with incentivized testing.", reward: "+$55-$240 (Est. avg.)", btnText: "Join", hot: false, taskId: "shieldpay", instructions: { title: "🔐 ShieldPay - Private Payments, Public Rewards", description: "Test the future of private transactions:", steps: ["Create your ShieldPay account", "Complete the privacy protocol tutorial", "Send at least 5 private transactions", "Report bugs for additional rewards"], actionUrl: "#", actionText: "Start Testing" }},
  { icon: "🔄", name: "CrossBridge", description: "Cross-chain bridge with testnet rewards.", reward: "+$60-$260 (Est. avg.)", btnText: "Bridge", hot: true, taskId: "crossbridge", instructions: { title: "🔄 CrossBridge - Connect Chains, Collect Rewards", description: "Test groundbreaking cross-chain technology:", steps: ["Create accounts on multiple test networks", "Get free testnet tokens", "Perform at least 5 cross-chain transfers", "Report your experience for bonus points"], actionUrl: "#", actionText: "Start Bridging" }}
];
projectTrackers.testnet.data = testnetProjectsData;


// --- Функции для модальных окон ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    // Небольшая задержка перед добавлением 'active' для срабатывания CSS-перехода
    setTimeout(() => modal.classList.add('active'), 10);
    // Дополнительно: блокировка прокрутки фона
    // document.body.style.overflow = 'hidden';
  } else {
    console.error(`Modal with ID ${modalId} not found.`);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    // Задержка перед добавлением 'hidden', чтобы CSS-переход успел отработать
    setTimeout(() => modal.classList.add('hidden'), 300); // 300ms - длительность перехода из CSS
    // Дополнительно: разблокировка прокрутки фона
    // document.body.style.overflow = '';
  } else {
    console.error(`Modal with ID ${modalId} not found.`);
  }
}

// Специализированные функции открытия/закрытия
function openLightbox(src) {
  const img = document.getElementById("lightbox-img");
  if (img) img.src = src;
  openModal("lightbox");
}
function closeLightbox() { closeModal("lightbox"); }

function openGuideModal() { openModal("guideModal"); }
function closeGuideModal() {
  closeModal("guideModal");
  scrollToAirdropsSection();
}

function startOnboarding() {
  openModal("onboarding");
  onboardingSteps = document.querySelectorAll('#onboarding .step');
  currentOnboardingStep = 0;
  showOnboardingStep(currentOnboardingStep);
}
function closeOnboarding() {
  closeModal("onboarding");
  // Сброс шагов при закрытии, чтобы они не оставались активными в DOM
    if (onboardingSteps.length > 0) {
        onboardingSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('hidden');
        });
    }
}

function openTaskModal(taskId, categoryKey) {
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const taskModal = document.getElementById('task-modal');
  const taskContent = document.getElementById('task-content');

  if (!taskModal || !taskContent) {
    console.error("Task modal or task content element not found.");
    return;
  }

  const projectsArray = projectTrackers[categoryKey]?.data;
  const project = projectsArray?.find(p => p.taskId === taskId);

  if (project && project.instructions) {
    taskContent.innerHTML = `
      <h2 id="taskModalGeneratedTitle">${project.instructions.title}</h2>
      <p class="task-description">${project.instructions.description}</p>
      <ol class="task-steps">${project.instructions.steps.map(step => `<li>${step}</li>`).join('')}</ol>
      <div class="task-buttons">
        <a href="${project.instructions.actionUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">${project.instructions.actionText}</a>
        <button class="btn-secondary js-show-wallet-help">Нужен кошелек?</button>
      </div>`;
      // Добавляем обработчик для кнопки "Нужен кошелек?" уже после создания контента
      const walletHelpBtn = taskContent.querySelector('.js-show-wallet-help');
      if (walletHelpBtn) {
          walletHelpBtn.addEventListener('click', showWalletHelp);
      }
  } else {
    taskContent.innerHTML = `<h2 id="taskModalGeneratedTitle">Ошибка</h2><p>Детали задачи для ID: ${taskId} (категория: ${categoryKey}) не найдены.</p>`;
  }
  openModal('task-modal');
}
function closeTaskModal() {
  closeModal('task-modal');
  setTimeout(() => window.scrollTo(0, scrollPosition), 10); // Восстанавливаем позицию прокрутки
}

function openEmailForm() { openModal("email-modal"); }
function closeEmailModal() { closeModal("email-modal"); }

// --- Вспомогательные функции ---
function scrollToAirdropsSection() {
  const airdropsSection = document.getElementById("airdrops");
  if (airdropsSection) {
    airdropsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  const menuButton = document.getElementById("menu-toggle-button");
  if (navLinks && menuButton) {
    navLinks.classList.toggle("show");
    menuButton.setAttribute('aria-expanded', navLinks.classList.contains('show'));
  }
}

// --- Логика Онбординга ---
function showOnboardingStep(stepIndex) {
  if (!onboardingSteps || onboardingSteps.length === 0) {
    console.error("Onboarding steps not initialized.");
    return;
  }
  onboardingSteps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.remove('hidden');
      step.classList.add('active'); // Хотя display:flex уже стоит, 'active' может использоваться для других стилей
    } else {
      step.classList.add('hidden');
      step.classList.remove('active');
    }
  });
  currentOnboardingStep = stepIndex;
  // Обновление aria-labelledby, если заголовки шагов имеют разные ID
  const currentStepTitleId = `onboardingStepTitle-${stepIndex}`;
  const onboardingModal = document.getElementById('onboarding');
  if (onboardingModal && document.getElementById(currentStepTitleId)) {
      onboardingModal.setAttribute('aria-labelledby', currentStepTitleId);
  }
}

function nextOnboardingStep() {
  if (currentOnboardingStep < onboardingSteps.length - 1) {
    showOnboardingStep(currentOnboardingStep + 1);
  }
}

function prevOnboardingStep() {
  if (currentOnboardingStep > 0) {
    showOnboardingStep(currentOnboardingStep - 1);
  }
}

function showWalletHelp() {
  closeTaskModal(); // Закрываем модальное окно задачи
  startOnboarding();  // Открываем онбординг (предполагается, что первый шаг про кошелек)
}

// --- Логика отображения проектов ---
function createProjectCardElement(project, categoryKey) {
  const requiredFields = ['icon', 'name', 'description', 'reward', 'btnText', 'taskId'];
  const missingFields = requiredFields.filter(field => project[field] === undefined || project[field] === null);

  if (missingFields.length > 0) {
    console.warn(`Проект пропущен из-за отсутствия полей: ${missingFields.join(', ')}`, project);
    return null;
  }

  const card = document.createElement('div');
  // card.className = 'offer-card project-card'; // Старый вариант с двумя классами
  card.className = 'project-card'; // Используем один общий класс

  // Добавляем data-атрибут для легкого поиска проекта, если нужно
  card.dataset.taskId = project.taskId;
  card.dataset.category = categoryKey;

  let hotBadgeHtml = project.hot ? '<span class="hot-badge">🔥 HOT</span>' : '';

  card.innerHTML = `
    <div class="project-icon">${project.icon}</div>
    <div class="project-info">
      <h3>${project.name} ${hotBadgeHtml}</h3>
      <p>${project.description}</p>
      <p class="reward">${project.reward}</p>
      <button class="btn-action">${project.btnText || 'Узнать больше'}</button>
    </div>
  `;
  
  const actionButton = card.querySelector(".btn-action");
  if (actionButton) {
    actionButton.addEventListener('click', () => openTaskModal(project.taskId, categoryKey));
  }
  
  return card;
}

function displayProjectBatch(categoryKey) {
  const tracker = projectTrackers[categoryKey];
  if (!tracker) {
    console.error(`Трекер для категории ${categoryKey} не найден.`);
    return;
  }

  const container = document.getElementById(tracker.containerId);
  const showMoreBtn = document.getElementById(tracker.btnId);
  const infoTextEl = tracker.infoTextId ? document.getElementById(tracker.infoTextId) : null;
  const actionButtonsEl = tracker.actionButtonsId ? document.getElementById(tracker.actionButtonsId) : null;

  if (!container) {
    console.error(`Контейнер ${tracker.containerId} для категории ${categoryKey} не найден.`);
    if(showMoreBtn) showMoreBtn.classList.add('hidden');
    return;
  }
  
  const projectsToDisplay = tracker.data.slice(tracker.shown, tracker.shown + ITEMS_PER_LOAD);

  projectsToDisplay.forEach(project => {
    const cardElement = createProjectCardElement(project, categoryKey);
    if (cardElement) {
      container.appendChild(cardElement);
    }
  });
  tracker.shown += projectsToDisplay.length;

  // Управление кнопкой "Показать еще"
  if (tracker.shown >= tracker.data.length) {
    if (showMoreBtn) showMoreBtn.classList.add('hidden');
    if (infoTextEl) infoTextEl.classList.remove('hidden');
    if (actionButtonsEl) actionButtonsEl.classList.remove('hidden'); // Показываем flex-контейнер
  } else if (showMoreBtn) {
    showMoreBtn.classList.remove('hidden');
    const remaining = Math.min(ITEMS_PER_LOAD, tracker.data.length - tracker.shown);
    showMoreBtn.textContent = `🔽 Показать еще ${remaining} ${getProjectWord(remaining)}`;
  }
}

function getProjectWord(number) { // Для правильного склонения слова "проект"
    if (number === 1) return 'проект';
    if (number >= 2 && number <= 4) return 'проекта';
    return 'проектов';
}


function initializeAllProjectSections() {
  for (const categoryKey in projectTrackers) {
    if (projectTrackers.hasOwnProperty(categoryKey)) {
      const tracker = projectTrackers[categoryKey];
      const container = document.getElementById(tracker.containerId);
      const showMoreBtn = document.getElementById(tracker.btnId);

      if (container) container.innerHTML = ''; // Очищаем контейнер перед первой загрузкой
      
      if (tracker.data && tracker.data.length > 0) {
        tracker.shown = 0; // Сбрасываем счетчик
        displayProjectBatch(categoryKey); // Отображаем первую порцию
        if(showMoreBtn) {
          showMoreBtn.removeEventListener('click', tracker.eventListener); // Удаляем старый обработчик, если есть
          tracker.eventListener = () => displayProjectBatch(categoryKey); // Сохраняем ссылку на обработчик
          showMoreBtn.addEventListener('click', tracker.eventListener);
        }
      } else {
        if (container) container.innerHTML = "<p>Проекты в этой категории скоро появятся.</p>";
        if (showMoreBtn) showMoreBtn.classList.add('hidden');
      }
    }
  }
}

// --- Настройка обработчиков событий ---
function setupGlobalEventListeners() {
    // ... existing event listeners
getCryptoLink.addEventListener('click', function(event) {
    console.log('Get Crypto link clicked!'); // Добавьте эту строку
    event.preventDefault();
    event.stopPropagation();

    // ... остальной код обработчика
});
    // Dropdown Menu for Get Crypto
    const getCryptoLink = document.getElementById('get-crypto-dropdown-link');
    const getCryptoDropdownItem = getCryptoLink ? getCryptoLink.closest('.nav-item-dropdown') : null;

    if (getCryptoLink && getCryptoDropdownItem) {

if (getCryptoLink && getCryptoDropdownItem) {
    console.log('Found Get Crypto link and parent item, attempting to add event listener.'); // Добавьте эту строку
    getCryptoLink.addEventListener('click', function(event) {
        // ...
    });
    // ...
} else {
    console.log('Get Crypto link or parent item not found!'); // И эту строку для отладки
}
        getCryptoLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (scrolling)
            event.stopPropagation(); // Prevent this click from immediately closing the dropdown via the document listener

            // Close other dropdowns if any (optional)
            document.querySelectorAll('.nav-item-dropdown.active').forEach(item => {
                if (item !== getCryptoDropdownItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle the 'active' class on the parent li
            getCryptoDropdownItem.classList.toggle('active');

            // Close mobile menu if open after showing dropdown on mobile
             const navLinks = document.getElementById('nav-links');
             if (navLinks && navLinks.classList.contains('show') && window.innerWidth <= 768) {
                 // Don't close the mobile menu immediately, the dropdown is part of it now
             }
        });

        // Close the dropdown when clicking outside of it
        document.addEventListener('click', function(event) {
            if (getCryptoDropdownItem.classList.contains('active')) {
                const isClickInsideDropdown = getCryptoDropdownItem.contains(event.target);
                if (!isClickInsideDropdown) {
                    getCryptoDropdownItem.classList.remove('active');
                }
            }
        });

        // Close dropdown when a link inside is clicked (and scroll to section)
         getCryptoDropdownItem.querySelectorAll('.dropdown-content a').forEach(link => {
             link.addEventListener('click', function() {
                 getCryptoDropdownItem.classList.remove('active'); // Close dropdown
                 // Allow default link behavior (scrolling to section)
             });
         });
    }

    // ... rest of your existing event listeners
}

// Make sure setupGlobalEventListeners is called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initializeAllProjectSections();
  setupGlobalEventListeners();
  // ... rest of DOMContentLoaded
});
  // Мобильное меню
  const menuButton = document.getElementById('menu-toggle-button');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }
  // Закрытие мобильного меню при клике на ссылку или вне меню
  document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-toggle-button');
    if (navLinks && navLinks.classList.contains('show')) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnMenuButton = menuBtn && menuBtn.contains(event.target);
      const isClickOnNavLink = event.target.closest('.nav-links a');

      if (!isClickInsideNav && !isClickOnMenuButton || isClickOnNavLink) {
        toggleMenu(); // Закрываем меню
      }
    }
  });
  // Адаптация меню при изменении размера окна
  window.addEventListener('resize', function() {
    const navLinks = document.getElementById('nav-links');
    const menuButton = document.getElementById('menu-toggle-button');
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      if(menuButton) menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Модальные окна: закрытие по клику на оверлей и на кнопки "крестик"
  const modalIds = ["lightbox", "guideModal", "task-modal", "email-modal", "onboarding"];
  // Закрытие по клику на оверлей
  modalIds.forEach(id => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.addEventListener('click', function(event) {
        if (event.target === modal) { // Клик именно по оверлею, а не по контенту
          closeModal(id); // Используем общую функцию closeModal
        }
      });
    }
  });
  // Закрытие по клику на "крестик" (кнопки с классом .js-modal-close)
  document.querySelectorAll('.js-modal-close').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation(); // Предотвращаем всплытие на оверлей
      const modalElement = this.closest('.modal'); // Находим ближайшее модальное окно
      if (modalElement && modalElement.id) {
        closeModal(modalElement.id);
      }
    });
  });

  // Кнопка "Get Started" -> Онбординг
  const getStartedBtn = document.getElementById('get-started-onboarding-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', startOnboarding);
  }

  // Кнопки "setup guide" -> Гайд
  document.querySelectorAll('button[data-modal-target="guideModal"]').forEach(button => {
    button.addEventListener('click', openGuideModal);
  });

  // Изображения в галерее онбординга -> Лайтбокс
  document.querySelectorAll('#onboarding .lightbox-trigger').forEach(img => {
    img.addEventListener('click', function() {
      openLightbox(this.src);
    });
  });

  // Кнопки навигации в Онбординге
  document.querySelectorAll('[data-onboarding-next]').forEach(button => {
    button.addEventListener('click', nextOnboardingStep);
  });
  document.querySelectorAll('[data-onboarding-prev]').forEach(button => {
    button.addEventListener('click', prevOnboardingStep);
  });
  document.querySelectorAll('[data-onboarding-done]').forEach(button => {
    button.addEventListener('click', closeOnboarding); // Просто закрываем онбординг
  });

  // Кнопка "Top 5 Paying Nodes – Get Alerts" (если она одна для всех)
  // Если кнопки специфичны для секций, их ID должны быть уникальны
  const openEmailFormBtnBrowser = document.getElementById('open-email-form-btn-browser');
  if(openEmailFormBtnBrowser) {
    openEmailFormBtnBrowser.addEventListener('click', openEmailForm);
  }
  // Если есть другие кнопки для открытия email формы, их нужно добавить аналогично

  // Форма подписки на Email
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        console.log('Email for subscription:', emailInput.value);
        // Здесь должна быть логика отправки email, например, через Fetch API
        alert(`Спасибо за подписку, ${emailInput.value}!`);
        emailInput.value = ''; // Очищаем поле
        closeEmailModal();
      } else {
        alert('Пожалуйста, введите корректный email.');
      }
    });
  }


// --- Инициализация страницы ---
document.addEventListener('DOMContentLoaded', function() {
  initializeAllProjectSections();
  setupGlobalEventListeners();
  
  // Принудительно показать первый шаг онбординга, если он скрыт через .hidden в HTML
  const firstOnboardingStep = document.querySelector('#onboarding #step-0');
  if (firstOnboardingStep && onboardingSteps.length > 0 && currentOnboardingStep === 0) {
      if (firstOnboardingStep.classList.contains('hidden')) {
        // Эта логика уже есть в showOnboardingStep, которая вызывается из startOnboarding
        // startOnboarding должен быть вызван, если онбординг должен быть показан при загрузке
      }
  }

  // Проверка, чтобы первый шаг онбординга был видимым, если модальное окно онбординга активно
  // (на случай если startOnboarding не вызывается сразу, а модалка показана другим способом)
  const onboardingModal = document.getElementById('onboarding');
  if (onboardingModal && onboardingModal.classList.contains('active')) {
      onboardingSteps = document.querySelectorAll('#onboarding .step');
      showOnboardingStep(currentOnboardingStep);
  }
});
