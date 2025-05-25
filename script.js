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

  { 
  "icon": "🧠", 
  "name": "OpenLedger", 
  "description": "Get rewarded in crypto for simply keeping a browser extension active while supporting AI innovation.", 
  "reward": "+$40–$200 (Est. avg.)", 
  "btnText": "Start Earning", 
  "hot": true, 
  "taskId": "openledger", 
  "instructions": { 
    "title": "📦 OpenLedger Mini-Guide", 
    "description": "🧠 Earn Free Crypto While You Browse — Help Build the Future of AI", 
    "steps": [ 
      "Install & Sign In. Add the OpenLedger extension to Chrome and log in with your Gmail.",
      "Stay Active. Keep the extension running in the background to earn points automatically.",
      "Boost Your Rewards. Complete missions, check in daily, and join the community to score more." 
    ], 
    "actionUrl": "https://testnet.openledger.xyz/?referral_code=y4ipacocuq", 
    "actionText": "It’s free, simple, and you’re right on time — don’t miss out!" 
  } 
},

  {
  "icon": "🧠",
  "name": "OptimAI",
  "description": "Get paid in crypto by running a browser node and helping train smarter AI.",
  "reward": "+$25–$120 (Est. avg.)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "optimai",
  "instructions": {
    "title": "📦 OptimAI Mini-Guide",
    "description": "🧠 Earn Free Crypto by Powering AI with Your Browser — It’s Free, Simple, and You’re Early",
    "steps": [
      "Sign Up & Set Up. Create an account, generate a wallet, and save your recovery phrase.",
      "Install the Extension. Add the OptimAI Lite Node from the Chrome Web Store.",
      "Run the Node & Earn. Keep the extension active, complete simple tasks, and start earning rewards."
    ],
    "actionUrl": "https://node.optimai.network/register?ref=27F19F8A",
    "actionText": "Join early — earn crypto while supporting next-gen AI!"
  }
},

  {
  "icon": "⚡️",
  "name": "Flow3",
  "description": "Get paid in crypto just by keeping your browser online — earn SOL & points daily.",
  "reward": "+$30–$180 (Est. avg.)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "flow3",
  "instructions": {
    "title": "📦 Flow3 Mini-Guide",
    "description": "⚡️ Earn Free Crypto by Staying Online — Simple, Free, and You’re Early",
    "steps": [
      "Sign Up & Connect. Register with Gmail, connect your Solana wallet.",
      "Install the Extension. Add Flow3 Node from the Chrome Web Store and keep it running.",
      "Boost Earnings. Earn SOL & Flow3 Points daily — refer friends or buy a node for bigger rewards."
    ],
    "actionUrl": "https://app.flow3.tech/sale-nodes?ref=oAIomW1Rs9",
    "actionText": "Get started early — earn daily rewards just by being online!"
  }
},

  {
  "icon": "🌐",
  "name": "Exeos Network",
  "description": "Get paid in crypto by sharing your unused internet — it runs quietly in your browser.",
  "reward": "+$20–$100 (Est. avg.)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "exuse",
  "instructions": {
    "title": "📦 Exuse Network Mini-Guide",
    "description": "🌐 Earn Free Crypto Using Your Internet — No Tech Skills Needed, Just Stay Online",
    "steps": [
      "Connect Your Wallet. Visit the site, log in with Google or connect MetaMask.",
      "Install the Extension. Add the Exuse browser plugin and keep it active.",
      "Earn & Share. Earn points automatically and boost rewards by inviting friends."
    ],
    "actionUrl": "https://app.exeos.network?referralCode=REFZBWAYSE5",
    "actionText": "Get in early — turn your internet into daily crypto rewards!"
  }
},

  {
  "icon": "⛏️",
  "name": "Grid Network",
  "description": "Get paid in crypto for sharing your internet — earn passively while your browser runs.",
  "reward": "+$20–$100 (Est. avg.)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "grid",
  "instructions": {
    "title": "📦 Grid Network Mini-Guide",
    "description": "⛏️ Earn Free Crypto Just by Keeping the Extension Active — It’s Easy and You’re Early",
    "steps": [
      "Register & Verify. Sign up using your email and confirm it.",
      "Install the Extension. Add the Grid browser plugin and let it run in the background.",
      "Refer Friends. Share your link and earn more points for each invite."
    ],
    "actionUrl": "https://sso.getgrid.ai/registration?referral_code=2b30ce9",
    "actionText": "Start now — turn your unused internet into daily crypto rewards!"
  }
},

  {
  "icon": "📶",
  "name": "DeSpeed",
  "description": "Get paid in crypto for testing your internet speed — earn passively with a browser extension.",
  "reward": "+$25–$120 (Est. avg.)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "despeed",
  "instructions": {
    "title": "📦 DeSpeed Mini-Guide",
    "description": "📶 Earn Free Crypto by Verifying Internet Speed — It’s Simple, Free, and You’re Early",
    "steps": [
      "Sign Up with Gmail. Register on DeSpeed and log in to your account.",
      "Install the Extension. Add the DeSpeed Validator from the Chrome Web Store.",
      "Activate & Earn. Open the extension, stay online, and invite friends for more rewards."
    ],
    "actionUrl": "https://app.despeed.net/register?ref=qFV0QHxGSiVw",
    "actionText": "Join now — earn rewards just by measuring your internet speed!"
  }
},
  
{
  "icon": "💻",
  "name": "Hivello",
  "description": "Earn points and USDT by sharing your internet — passive income with just your device.",
  "reward": "+$100-$500 (Est. avg.)",
  "btnText": "Start Mining",
  "hot": true,
  "taskId": "hivello",
  "instructions": {
    "title": "📦 Hivello Mini-Guide",
    "description": "⚡️ Free, easy, and passive — earn crypto by running a simple app on your PC.",
    "steps": [
      "Sign Up & Download. Create an account at Hivello.com and install the app for Windows, macOS, or Linux.",
      "Run the App 24/7. Let it use your unused internet and hardware — start earning points and USDT right away.",
      "Invite & Earn More. Get 500 points for every friend you refer from your dashboard."
    ],
    "actionUrl": "https://dashboard.hivello.com/referrals?code=E9C2195981",
    "actionText": "⏳ Get in early — earn while airdrop slots are still open!"
  }
},
  
{ icon: "⬛", name: "Gradient", description: "Get paid in crypto for using your browser.", 
 reward: "+$50-$250 (Est. avg.)", btnText: "Start", hot: true, taskId: "gradient", 
 instructions: { title: "🪙 Gradient Airdrop — no investment needed!", 
 description: "Complete these simple steps to earn your Gradient Airdrop:", 
 steps: ["Set up a node (right from your browser)", "Earn XP for uptime & inviting friends", "Claim rewards in Season 1"], 
 actionUrl: "https://app.gradient.network/signup?code=744DX2", actionText: "Start Earning" }},

{
  icon: "🧠",
  name: "Chakra",
  description: "Earn free crypto by simply browsing with the Chakra Scout extension — no effort required.",
  reward: "+$40–$400 (Est. avg. if airdrop confirmed)",
  btnText: "Start Earning",
  hot: true,
  taskId: "chakra",
  instructions: {
    title: "📦 Chakra Scout Mini-Guide",
    description: "🧭 Earn Points for Future Crypto Rewards — Just Keep Your Browser Open",
    steps: [
      "Install Scout Extension. Add Chakra's Scout to your Chrome browser.",
      "Sign Up with Bonus. Register and use referral code RAVYPC to get a 5% boost on your points.",
      "Stay Online & Farm. Keep Scout running in the background — earn points just by browsing normally."
    ],
    actionUrl: "https://app.chakra.dev/?ref=RAVYPC",
    actionText: "Farm points now — the earlier you join, the more you may earn!"
  }
},

{
  "icon": "🌐",
  "name": "Meganet",
  "description": "Get paid in crypto just for staying online and sharing your unused internet — it's simple and rewarding.",
  "reward": "+$50-$500 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "meganet",
  "instructions": {
    "title": "📦 Meganet Testnet Mini-Guide",
    "description": "💻 Earn Crypto by Sharing Your Internet — No Tech Skills Needed, Just Stay Connected!",
    "steps": [
      "Get Your Passport. Mint a free or paid Meganet Passport to join the testnet.",
      "Connect & Stay Online. Keep your device connected to the network to earn points every hour.",
      "Boost with Tasks & Referrals. Complete social quests and invite friends to earn even more."
    ],
    "actionUrl": "https://meganet.app/login?refcode=XQ54JJ",
    "actionText": "Join now — free, simple, and you’re still early!"
  }
},
  
{ icon: "🔷", name: "BlockMesh", description: "Earn Crypto by Sharing Internet — Help Build Ethical AI.", reward: "+$50-$250 (Est. avg.)", btnText: "Start", hot: true, taskId: "blockmesh", instructions: { title: "🎁 Free Crypto Just by Being Online", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign up on Blockmesh and confirm your email.", "Add the Chrome extension. Install it, log in, and keep it running.", "Connect your wallet + Twitter. Get points for easy tasks like captchas and follows."], actionUrl: "https://app.blockmesh.xyz/register?invite_code=5b614ab7-bad2-47f9-ae66-282004203f4a", actionText: "Start Earning" }},
  
{ icon: "🛡️", name: "Solix", description: "Maximize your browser's potential for crypto.", reward: "+$50-$250 (Est. avg.)", btnText: "Start", hot: true, taskId: "solix", instructions: { title: "💰 Earn with Solix — just for being online", description: "No investment. Just turn it on — and start getting points.", steps: ["Create a Solix account", "Add the Solix extension", "Do simple tasks"], actionUrl: "https://dashboard.solixdepin.net/sign-up?ref=LzDVGhu7", actionText: "Start Earning" }},
  
{ icon: "🌐", name: "Ping", 
description: "Join the Solana-based (FREE-VPN) network that keeps your data safe and rewards you for it.", 
reward: "+$50-$300 (Est. avg.)", 
btnText: "Start", hot: true, taskId: "ping", 
instructions: { title: "📦 Ping Network Mini-Guide", description: "🛜 Earn Free Crypto Just by Staying Online with Ping", 
steps: ["Install & Sign Up. Add the Ping Chrome extension, register, and use referral code WOFZ0F for a point boost.", 
"Activate & Stay Connected. Turn on the VPN in the app — earn 1 point every 10 minutes you're online.", 
"Boost Earnings with Tasks & Referrals. Complete simple in-app tasks and invite friends to earn 15% of their points too."], 
actionUrl: "https://chromewebstore.google.com/detail/ping-network-vpn/geeedmdpncfeomhgbjeafcahepjelimg?pli=1 ", 
actionText: "Stay connected — the longer you're online, the more you earn!" }},

{ icon: "🦾", name: "3DOS", 
description: "Upload, earn, and manufacture on-demand through a global decentralized network.", 
reward: "+$50-$300 (Est. avg.)", 
btnText: "Start", hot: true, taskId: "3dos", 
instructions: { title: "📦 3DOS Airdrop Mini-Guide", description: "💻 Earn Free $3DOS Tokens by Just Installing a Chrome Extension", 
steps: ["Sign Up & Get Your API Key. Register at 3dos.io, verify your email, and generate your API key.", 
"Install & Activate. Add the 3DOS Chrome extension, log in, and connect it using your API key.", 
"Earn Daily & Invite Friends. Claim daily rewards, complete simple social tasks, and share your referral link for bonus points."], 
actionUrl: "https://dashboard.3dos.ioregister?ref_code=5d1a7f", 
actionText: "Start now — early users have the highest earning potential!" }},

  { icon: "🌱", name: "Grass", description: "Passive income from your browser tab", reward: "+$50-$300 (Est. avg.)", btnText: "Start", hot: true, taskId: "grass", instructions: { title: "💰 Start Earning Free Crypto with Grass", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign up on the Grass website. Create an account with your email and click Connect.", "Install the browser extension, or desktop extension", "Verify and connect wallet, Confirm your email and link your Solana wallet."], actionUrl: "https://app.grass.io/register/?referralCode=i4m1wvXSIPONluY", actionText: "Start Earning" }},
  { icon: "🔮", name: "Navigate", description: "Browser mining & simple daily tasks", reward: "+$75-$250 (Est. avg.)", btnText: "Start", hot: false, taskId: "navigate", instructions: { title: "🎉 Get Free Rewards with Navigate", description: "No money needed • Just be online • Rewards are already coming", steps: ["Sign up and set up your profile. Use your email and confirm it to get started.", "Install the Chrome extension. It helps you earn points while you browse. ", "Boost your points. Fill out a short form and connect your email, wallet, and social accounts. ", "Earn while you browse"], actionUrl: "https://dataquest.nvg8.io//signup?ref=2496861", actionText: "Start Mining" }},
  { icon: "🌐", name: "Bless", description: "Run a lightweight node in your browser", reward: "+$45-$175 (Est. avg.)", btnText: "Start", hot: false, taskId: "bless", instructions: { title: "💸 Earn Free Points with Bless — No Token Needed Yet", description: "Run a lightweight blockchain node right in your browser:", steps: ["Sign up on the Bless website. Create your account and install the Chrome extension.", "Turn on the node. Keep it running — the longer it's on, the more points you get.", "Boost your rewards. Connect Twitter/Discord and invite friends for extra bonuses."], actionUrl: "https://bless.network/dashboard?ref=TKQFQK", actionText: "Launch Node" }},
  { icon: "🔋", name: "Teneo Protocol", description: "Browser extension for passive income", reward: "+$25-$150 (Est. avg.)", btnText: "Start", hot: true, taskId: "teneo", instructions: { title: "🎯 Get Free TENEO Points Just by Staying Online", description: "No money needed • Simple setup • Rewards are live.", steps: ["Join Teneo. Sign up on the website with Code: Up2IO to get 1,000 Extra Teneo Points, verify your email.", "Install the Node Extension. Download it, log in, and click 'Connect Node' to start earning points.", "Earn More Points. Keep the node running and invite friends for big bonuses."], actionUrl: "https://dashboard.teneo.pro/auth/signup?referralCode=Up2IO", actionText: "Start Earning" }},
  { icon: "🧬", name: "DAWN", description: "Browser extension for passive income", reward: "+$40-$160 (Est. avg.)", btnText: "Start", hot: false, taskId: "dawn", instructions: { title: "💸 Earn Free Crypto Points with DAWN", description: "No money needed • Simple setup • Rewards are live", steps: ["Sign Up on DAWN. Go to the site and use code rqh9kamf to unlock your account.", "Install the Extension. Download the DAWN Validator and keep it running.", "Boost Your Points. Follow them on X, Discord, Telegram — and invite friends for extra rewards."], actionUrl: "https://dawn-internet.webflow.io/", actionText: "Join Network" }},
  { icon: "🌟", name: "OpenLoop", description: "Get Crypto for Sharing Internet — All Through Your Browser", reward: "+$30-$190 (Est. avg.)", btnText: "Start", hot: false, taskId: "openloop", instructions: { title: "🎯 Get Free Points with OpenLoop — No Cost", description: "No money needed • Simple setup • Rewards are live.", steps: ["1. Sign Up on OpenLoop. Create an account and use code ol8ce15b49.", "2. Connect Your Wallet. Log in and click 'Link Wallet' to add your Solana wallet.", "3. Install the Extension. Download the Sentry Node extension and log in."], actionUrl: "https://openloop.so/auth/register?ref=ol8ce15b49", actionText: "Join Network" }},
  { icon: "🌀", name: "Stork", description: "Browser extension for passive income", reward: "+$55-$210 (Est. avg.)", btnText: "Start", hot: false, taskId: "stork", instructions: { title: "🎁 Earn Free Rewards with Stork — It's Easy!", description: "No money needed • Simple setup • Rewards are live", steps: ["Install the Stork Extension. Download it from the Chrome Web Store and open it.", "2. Sign Up and Use Code. Create an account and enter code `ITYO9FF9K4`", "3. Keep It Running. Let the extension stay active to earn rewards automatically."], actionUrl: "https://chromewebstore.google.com/detail/stork-verify/knnliglhgkmlblppdejchidfihjnockl", actionText: "Start Mining" }},
  { icon: "🏛️", name: "Coming soon...", description: "-", reward: "-", btnText: "Start", hot: false, taskId: "athena", instructions: { title: "🏛️ Athena - Earn Through Knowledge", description: "Complete knowledge tasks to earn Athena tokens:", steps: ["Create your Athena account", "Install the browser assistant", "Complete knowledge-based micro tasks", "Earn rewards for your contributions"], actionUrl: "#", actionText: "Start Learning" }}
];
projectTrackers.browser.data = browserNodesProjectsData;

const recommendedProjectsData = [

  { 
  "icon": "🧠", 
  "name": "OpenLedger", 
  "description": "Get rewarded in crypto for simply keeping a browser extension active while supporting AI innovation.", 
  "reward": "+$40–$200 (Est. avg.)", 
  "btnText": "Start Earning", 
  "hot": true, 
  "taskId": "openledger", 
  "instructions": { 
    "title": "📦 OpenLedger Mini-Guide", 
    "description": "🧠 Earn Free Crypto While You Browse — Help Build the Future of AI", 
    "steps": [ 
      "Install & Sign In. Add the OpenLedger extension to Chrome and log in with your Gmail.",
      "Stay Active. Keep the extension running in the background to earn points automatically.",
      "Boost Your Rewards. Complete missions, check in daily, and join the community to score more." 
    ], 
    "actionUrl": "https://testnet.openledger.xyz/?referral_code=y4ipacocuq", 
    "actionText": "It’s free, simple, and you’re right on time — don’t miss out!" 
  } 
},
  
{
  "icon": "💻",
  "name": "Hivello",
  "description": "Earn points and USDT by sharing your internet — passive income with just your device.",
  "reward": "+$100-$500 (Est. avg.)",
  "btnText": "Start Mining",
  "hot": true,
  "taskId": "hivello",
  "instructions": {
    "title": "📦 Hivello Mini-Guide",
    "description": "⚡️ Free, easy, and passive — earn crypto by running a simple app on your PC.",
    "steps": [
      "Sign Up & Download. Create an account at Hivello.com and install the app for Windows, macOS, or Linux.",
      "Run the App 24/7. Let it use your unused internet and hardware — start earning points and USDT right away.",
      "Invite & Earn More. Get 500 points for every friend you refer from your dashboard."
    ],
    "actionUrl": "https://dashboard.hivello.com/referrals?code=E9C2195981",
    "actionText": "⏳ Get in early — earn while airdrop slots are still open!"
  }
},

  { icon: "⬛", name: "Gradient", description: "Get paid in crypto for using your browser.", 
 reward: "+$50-$250 (Est. avg.)", btnText: "Start", hot: true, taskId: "gradient", 
 instructions: { title: "🪙 Gradient Airdrop — no investment needed!", 
 description: "Complete these simple steps to earn your Gradient Airdrop:", 
 steps: ["Set up a node (right from your browser)", "Earn XP for uptime & inviting friends", "Claim rewards in Season 1"], 
 actionUrl: "https://app.gradient.network/signup?code=744DX2", actionText: "Start Earning" }}
  
];
projectTrackers.recommended.data = recommendedProjectsData;

const freeToEarnProjectsData = [

  {
  "icon": "🤖",
  "name": "NEXY AI",
  "description": "Get paid in crypto for simple social tasks — no trading skills needed.",
  "reward": "+$30–$150 (Est. avg.)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "nexyai",
  "instructions": {
    "title": "📦 NEXY AI Mini-Guide",
    "description": "🤖 Earn Free Crypto for Social Engagement — Fast, Easy, and You're Early",
    "steps": [
      "Log In with X (Twitter). Go to the NEXY AI event page and sign in via your X account.",
      "Complete Tasks. Follow, like, retweet, join Telegram, and share content to earn Nexy Points.",
      "Refer Friends. Invite others and earn 10% of their points — the more you share, the more you earn."
    ],
    "actionUrl": "https://point.nexyai.io/?ref=EOGFU",
    "actionText": "Free, simple, and you're just in time — start earning now!"
  }
},

{
  "icon": "🚀",
  "name": "Polyester",
  "description": "Get paid in crypto for trying the next-gen trading platform — no KYC, no fees, no risk.",
  "reward": "+$100-$500 (Est. avg.)",
  "btnText": "Join Waitlist",
  "hot": true,
  "taskId": "polyester",
  "instructions": {
    "title": "📦 Polyester Mini-Guide",
    "description": "🪙 Get paid in crypto for using a secure browser-based exchange. Free, simple, fast.",
    "steps": [
      "Sign Up. Go to the waitlist page and join with your email — no wallet needed yet.",
      "Follow & Join. Follow Polyester, Fabric, and Zipper on Twitter. Then join their Discord to boost your spot.",
      "Share & Earn. Share your unique referral link — every new signup pushes you up the list!"
    ],
    "actionUrl": "https://polyester.com/?ref=Z2EAEZG8",
    "actionText": "⏳ Join early — get rewarded in the first wave of token drops!"
  }
},

{
  icon: "🧠",
  name: "X365.ai",
  description: "Earn crypto every 3 hours by simply verifying your email and staying active — no mining gear needed.",
  reward: "+$100–$800 (Est. future value)",
  btnText: "Start Mining",
  hot: true,
  taskId: "x365ai",
  instructions: {
    title: "📦 X365.ai Mini-Guide",
    description: "⚡️ Get Free Crypto Every 3 Hours with AI-Powered Quantum Mining",
    steps: [
      "Sign Up & Verify. Go to the X365.ai site, enter your email, and confirm it through the link in your inbox.",
      "Enter Referral Code. Use code '384193878' during signup to boost your rewards.",
      "Start Quantum Mining. Claim your 50 free tokens every 3 hours — stay active to keep earning!"
    ],
    actionUrl: "https://x365.ai/airdrop/384193878",
    actionText: "Join now — earn free crypto just by showing up!"
  }
},

{
  "icon": "🧠",
  "name": "ByteNova (ClustroAI)",
  "description": "Earn free crypto for checking in daily and completing simple tasks — no tech skills needed.",
  "reward": "+$50-$400 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "bytenova",
  "instructions": {
    "title": "📦 ByteNova Airdrop Mini-Guide",
    "description": "💸 Get Paid in Crypto for Just a Few Clicks a Day — It’s Free and You're Early!",
    "steps": [
      "Sign Up & Connect. Visit ByteNova, connect your wallet (BSC or EVM) and X account.",
      "Do Simple Tasks. Follow, like, and share on social media to earn points.",
      "Check In Daily. Return each day to check in and boost your airdrop chances."
    ],
    "actionUrl": "https://bytenova.ai/rewards?invite_code=fHjzFmrXC",
    "actionText": "Join now — free, fast, and early rewards await!"
  }
},
  
{
  "icon": "🆔",
  "name": "Gen-O",
  "description": "Secure your unique Web3 identity and join an early community that might reward you with future airdrops.",
  "reward": "+$50-$200 (Speculative Airdrop)",
  "btnText": "Claim ID",
  "hot": true,
  "taskId": "geno",
  "instructions": {
    "title": "📦 Gen-O Mini-Guide",
    "description": "🧬 Claim Your Free Web3 Identity & Earn Early Airdrop Rewards",
    "steps": [
      "Register Your Gen-O ID. Visit the site and create your unique [Gen0XXXXXXX] identity.",
      "Connect Your Wallet. Enter your Solana address and basic info to secure your spot.",
      "Invite & Share. Add your ID to your X bio and use your referral link to grow your Gen-O circle."
    ],
    "actionUrl": "https://gen-o.xyz/ids/TUrM4RHHAN?ref=TUrM4RHHAN ",
    "actionText": "🚀 Join Early — Claim Your Identity Before It’s Gone!"
  }
},

{
  "icon": "🧠",
  "name": "ChainGPT",
  "description": "Earn free crypto by creating AI NFTs and sharing them with the world — no experience needed.",
  "reward": "+$20–$500 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "chaingpt",
  "instructions": {
    "title": "📦 ChainGPT $50K Airdrop Mini-Guide",
    "description": "🎨 Get Paid in Crypto for Creating and Sharing AI NFTs — It's Free and Fun!",
    "steps": [
      "Join the Campaign. Connect your wallet on the official ChainGPT page.",
      "Create & Mint AI NFTs. Generate cool NFT art with AI and mint your favorites to earn points.",
      "Share & Refer. Post your NFTs on X and invite friends — earn big bonuses for every referral."
    ],
    "actionUrl": "https://nft.chaingpt.org/?referralcode=ed9df5d29f",
    "actionText": "Get started now — earn free GTAI tokens before April 16!"
  }
},
  
{
  "icon": "🤖",
  "name": "AGNT Hub",
  "description": "Turn your Twitter scroll into crypto rewards with AI-powered Web3 tools. Free, fun, and future-focused.",
  "reward": "+$150-$500 (Est. avg. at TGE)",
  "btnText": "Join Now",
  "hot": false,
  "taskId": "agnthub",
  "instructions": {
    "title": "📦 AGNT Hub Mini-Guide",
    "description": "🚀 Earn Free Crypto by Exploring Web3 with Your Twitter Feed",
    "steps": [
      "Register & Connect. Visit AGNT.Hub, start the game, connect your X (Twitter), and use invite code: Z7US for 2x XP.",
      "Complete Quests. Upload a meme, play the prediction game, and finish social/Galxe tasks to earn XP.",
      "Mint Free Pass. Get your AGNT Connect Pass (limited-time free), join Discord, and start checking in daily for points."
    ],
    "actionUrl": "https://join.agnthub.ai/?ref=Z7US",
    "actionText": "🎯 Start now — earn XP daily and secure your airdrop spot!"
  }
},

{ 
  "icon": "🚀", 
  "name": "Coresky", 
  "description": "Support fun crypto projects, join the hype, and earn potential rewards for simple daily actions.",
  "reward": "🔮 Future Airdrop (Est.)",
  "btnText": "Join Now", 
  "hot": false, 
  "taskId": "coresky", 
  "instructions": { 
    "title": "📦 Coresky Mini-Guide", 
    "description": "💰 Get Paid in Crypto for Using Your Browser — It's Free, Fun, and You’re Still Early", 
    "steps": [
      "Sign Up & Connect Wallet. Visit Coresky, create an account, and link your crypto wallet.",
      "Earn Daily Points. Check in daily, follow on social media, and invite friends — it's super easy!",
      "Stay Active & Vote. Use your points to vote on meme projects and watch your rewards stack up."
    ], 
    "actionUrl": "https://share.coresky.com/pc2tcs/tasks-rewards", 
    "actionText": "🔥 Earn Free Crypto — Don’t Miss Season One!" 
  }
},

{ 
  icon: "🔥", 
  name: "Linera", 
  description: "Earn crypto by engaging with Linera — a fast, next-gen blockchain. No tech skills needed.",
  reward: "+$100-$500 (Est. avg.)", 
  btnText: "Start", 
  hot: true, 
  taskId: "linera", 
  instructions: { 
    title: "📦 Linera Mini-Guide", 
    description: "🚀 Get Paid in Crypto for Using Social Media — Fast, Easy, and Free",
    steps: [
      "Create Your Account. Sign up on the Linera Drops page with your email and set up your profile.",
      "Complete Simple Tasks. Join Discord, follow Linera on X, like & reply to posts — all tracked automatically.",
      "Enter the Drop. Confirm your participation and keep engaging to earn more points."
    ],
    actionUrl: "https://drops.linera.io/invite?code=XCECUKBLCH&ext_id=5oqo4TUSG", 
    actionText: "Earn free crypto for your social activity — don’t miss Season 1!" 
  } 
},

{ 
  icon: "🖥", 
  name: "GPU.net", 
  description: "Get paid in crypto for tapping into the power of your browser — no tech skills needed.",
  reward: "+$100-$500 (Est. avg.)",
  btnText: "Start", 
  hot: true, 
  taskId: "gpu-net",
  instructions: { 
    title: "📦 GPU.net Mini-Guide", 
    description: "🧠 Earn Free Crypto by Completing Simple Tasks on GPU.net",
    steps: [
      "🔗 Join the Campaign. Go to GPU.net’s Road to TGE page, connect your MetaMask wallet, and use referral code 877VSB ",
      "✅ Complete Easy Quests. Follow their social media, join Discord/Telegram, and interact with the platform to earn GXP points.",
      "👥 Invite Friends. Refer others and earn even more points automatically from their activity."
    ],
    actionUrl: "https://token.gpu.net?ref=877VSB", 
    actionText: "Start now — free, easy, and still early!" 
  }
},

{
  "icon": "🛡",
  "name": "Billions Network",
  "description": "Earn crypto by verifying your identity — no biometrics, just privacy-first Web3 tools.",
  "reward": "+$15–$100 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "billions",
  "instructions": {
    "title": "📦 Billions Network Airdrop Mini-Guide",
    "description": "🔐 Get Paid in Crypto for Verifying Your Identity — Safe, Fast & Private",
    "steps": [
      "Sign Up & Verify Email. Visit the Billions site, sign up with your email, and confirm it.",
      "Connect Wallet. Link your Ethereum wallet securely to start earning POWER points.",
      "Follow & Refer. Follow them on X and invite friends to boost your rewards easily."
    ],
    "actionUrl": "https://signup.billions.network?rc=5TGPOVKD",
    "actionText": "Join now — earn POWER points early and be ready for the token drop!"
  }
},

{
  icon: "🎮",
  name: "Play Solana",
  description: "Earn free crypto by completing simple tasks — no gaming skills or crypto needed.",
  reward: "+$100-$500 (Est. avg.)",
  btnText: "Start Farming XP",
  hot: true,
  taskId: "playsolana",
  instructions: {
    title: "📦 Play Solana Airdrop Mini-Guide",
    description: "🎯 Get Paid in Crypto for Supporting the Future of Web3 Gaming",
    steps: [
      "🚀 Sign Up & Connect. Go to PlayDEX, sign in with Matricia, and connect your social accounts (X, Discord, Telegram).",
      "✅ Complete Free Tasks. Follow Play Solana on socials, like & repost their content to start earning XP.",
      "🔥 Track & Grow XP. Stake SOL, invite friends, or pre-order the PSG1 device to boost your XP and airdrop share."
    ],
    actionUrl: "http://playsolana.com/products?code=OSLMSLMOO",
    actionText: "Start now — it's free, simple, and you're still early!"
  }
},

{
  "icon": "🧸",
  "name": "Plushie AI",
  "description": "Get paid in crypto for using your browser — chat, play, and earn in a few clicks.",
  "reward": "+$20-$100 (Est. avg.)",
  "btnText": "Join Airdrop",
  "hot": true,
  "taskId": "plushie-ai",
  "instructions": {
    "title": "📦 Plushie AI Mini-Guide",
    "description": "🎉 Free, fun, and fast — earn crypto just by being online and active.",
    "steps": [
      "Connect Your Wallet. Head to the Plushie Airdrop page and link your MetaMask or other wallet.",
      "Join & Engage. Follow Plushie on X, Telegram, and Discord — be active and spin the Lucky Wheel daily.",
      "Enter Bonus Code. In the Telegram bot, enter code 566AF2C2 to get a reward boost and start faster.",
      "Earn More with Referrals. Invite friends and complete quizzes to boost your $PLSH rewards."
    ],
    "actionUrl": "https://airdrop.plushie.ai/",
    "actionText": "🚀 Use the code early — boost your rewards while slots are open!"
  }
},

{
  "icon": "🤖",
  "name": "Zo",
  "description": "Get rewarded for exploring AI — earn XP now, get ahead for future crypto drops.",
  "reward": "+XP now, potential token later",
  "btnText": "Join Zo",
  "hot": true,
  "taskId": "zo-platform",
  "instructions": {
    "title": "📦 Zo Mini-Guide",
    "description": "🚀 Free, simple, and future-ready — earn XP now and get ahead of the curve.",
    "steps": [
      "Sign Up on Zo. Go to the platform and register using your email or wallet.",
      "Enter Code - usua745 - Use this during sign-up to instantly get 100 XP.",
      "Explore & Refer. Use bots, join group chats, and invite friends for extra XP."
    ],
    "actionUrl": "https://zo.me/usual413",
    "actionText": "⏳ Earn XP early — be ready for the first token drop!"
  }
},
  
{ 
  icon: "🎯", 
  name: "Opinion Labs", 
  description: "Predict the future, earn crypto, and become an early mover — all without spending a cent.", 
  reward: "+$100-$500 (Est. avg.)", 
  btnText: "Start Earning", 
  hot: true, 
  taskId: "olab", 
  instructions: { 
    title: "📦 Opinion Labs Mini-Guide", 
    description: "🧠 Get Paid in Crypto for Using Your Browser", 
    steps: [
      "🎁 Enter Code 'SmeNyGpF'. When signing up, use this referral code to unlock bonus points.",
      "🔗 Connect Your Wallet. Go to the O.LAB app and link your Web3 wallet (like MetaMask).",
      "📊 Make a Daily Trade. Join prediction markets and earn 50 points daily — it’s free!",
      "✅ Complete Simple Tasks. Check in, follow on socials, and invite friends to earn more points.",
    ], 
    actionUrl: "https://app.olab.xyz/home", 
    actionText: "Start now — it’s free, simple, and you're still early!" 
  } 
},
  
{
  "icon": "🚀",
  "name": "LiftOff Monster (LOX)",
  "description": "Join a fair airdrop with real rewards — earn LOX tokens by completing simple tasks and inviting friends.",
  "reward": "+Free LOX Tokens (223M Pool)",
  "btnText": "Join Airdrop",
  "hot": false,
  "taskId": "lox",
  "instructions": {
    "title": "📦 Cosmic Monster Airdrop Mini-Guide",
    "description": "💸 Earn Free LOX Tokens for Simple Actions & Referrals",
    "steps": [
      "Visit LiftOff.Monster and connect your Phantom wallet.",
      "Complete whitelist tasks (follow, post, join Discord, etc.).",
      "Share your referral link to earn more tickets — more tickets, bigger rewards!"
    ],
    "actionUrl": "https://airdrop.liftoff.monster/tasks?ref=93NLSPNR",
    "actionText": "🎯 Complete tasks now — the earlier you join, the more LOX you can earn!"
  }
},

{
  "icon": "🔗",
  "name": "Switchboard",
  "description": "Join a future-ready oracle network and earn crypto for simple community tasks — no coding needed!",
  "reward": "🎁 Potential Airdrop (Est.)",
  "btnText": "Join Tasks", 
  "hot": true, 
  "taskId": "switchboard", 
  "instructions": {
    "title": "📦 Switchboard Mini-Guide",
    "description": "💸 Get Paid in Crypto for Simple Online Tasks — No Experience Needed, You’re Still Early!", 
    "steps": [
      "Join & Connect. Sign up on Zealy, link your wallet, and connect Discord & Twitter.",
      "Complete Easy Tasks. Follow on socials, verify invites, and join Discord to earn XP.",
      "Level Up & Earn. Prioritize high-XP tasks like fragSOL staking and content creation for bigger rewards!"
    ],
    "actionUrl": "https://zealy.io/cw/switchboard/invite/YXcU-xX3aUqIu2yr__JLn", 
    "actionText": "🎯 Earn Free Crypto — Join Early & Start Stacking XP!"
  }
},

{
  icon: "🎮",
  name: "Moonveil",
  description: "Play, earn, and get in early on a top-tier Web3 gaming airdrop — all for free.",
  reward: "+$100-$400 (Est. avg.)",
  btnText: "Join Airdrop",
  hot: true,
  taskId: "moonveil",
  instructions: {
    title: "📦 Moonveil Airdrop Mini-Guide",
    description: "🚀 Get Paid in Crypto for Playing Games — No Experience Needed",
    steps: [
      "🌟 Claim Your Free Badge. Go to Moonveil, connect your wallet, and claim the 'Novice Notch' badge to start.",
      "🧩 Complete Tasks for Points. Earn Moon Beams by finishing simple tasks in the Loyalty Program.",
      "🎯 Stay Active & Earn More. Check in daily, complete pre-season events, and track your progress."
    ],
    actionUrl: "https://moonveil.gg?invite_code=U93MURB3",
    actionText: "Earn free crypto — Season 1 is live, don't miss it!"
  }
},
  
{ 
  icon: "🧠", 
  name: "Recall Network",
  description: "Earn crypto by helping shape the future of decentralized AI. No tech skills needed — just show up, explore, and get rewarded.",
  reward: "+$50-$500 (Est. future airdrop)",
  btnText: "Join Now", 
  hot: true, 
  taskId: "recall",
  instructions: { 
    title: "📦 Recall Network Mini-Guide", 
    description: "🚀 Get Paid in Crypto for Exploring the AI-Powered Web3",
    steps: [
      "Join the Zealy campaign — [Click here to start](https://zealy.io/cw/recallnetwork/invite/UJkZ81u-8a0E74n0zu-AP). Connect your wallet and complete simple tasks to earn XP.",
      "Visit the Boost Absinthe page — Connect your wallet using code 8c734c7d and complete extra tasks to boost your score.",
      "Follow & share on social — Stay active on social media, invite friends, and claim community bonuses like the Discord OG role if eligible."
    ],
    actionUrl: "https://boost.absinthe.network/recall/account",
    actionText: "⏳ Be early — earn Fragments now, get rewarded later!" 
  }
},
  
{
  "icon": "📊",
  "name": "Kiyotaka",
  "description": "Explore cutting-edge trading tools — join early and boost your chances for future crypto rewards.",
  "reward": "+Possible Airdrop (Speculative)",
  "btnText": "Join Early",
  "hot": false,
  "taskId": "kiyotaka",
  "instructions": {
    "title": "📦 Kiyotaka Early Access Mini-Guide",
    "description": "🧠 Join a Smart Trading Community & Get Ready for Future Airdrops",
    "steps": [
      "Sign up on kiyotaka.ai and create your account.",
      "Join the Discord server and stay active — help others, share insights.",
      "Share your referral link to grow your rank and work toward the Orderbook Wizard role."
    ],
    "actionUrl": "https://kiyotaka.ai/ref=6lPD98KILZ",
    "actionText": "🚀 Act now — early users may be first in line for rewards!"
  }
},
  
  { icon: "📝", name: "Mirra", 
description: "Help build a smarter, fairer AI by curating content — powered by the Web3 community.", 
reward: "+$30-$150 (Est. avg.)", 
btnText: "Start", hot: false, taskId: "learnpad", 
instructions: { title: "📦 Mirra Airdrop Mini-Guide", 
description: "🧠 Share Smart Content on X & Earn Free $NLP Tokens with Mirra", 
steps: ["Connect Your X Account. Go to mirra.xyz, link your X account, and follow @Mirra_Terminal + @mirra_agent.", 
"Scout & Create Web3 Content. Tag @Mirra_Terminal under great crypto posts or share your own insights to earn tokens.", 
"Use Referrals to Boost Rewards. Get your referral link and invite friends to earn extra $NLP."], 
actionUrl: "#", actionText: "Start Sharing Now" }},

  { icon: "🎲", name: "Newton", 
description: "Seamless cross-chain access powered by Polygon’s AggLayer — no more switching networks.", 
reward: "+$40-$180 (Est. avg.)", btnText: "Start", hot: true, taskId: "Newton", 
instructions: { title: "📦 Newton Airdrop Mini-Guide", 
description: "🎯 Earn Free Credits Daily by Completing Simple Quests on Newton", 
steps: ["Sign Up & Get 150 Credits. Go to newtonproject.io, register or connect your wallet — get instant signup rewards.", 
"Complete Social & Main Quests. Start with “Side Quests” (follows), then move to Explore Quests for more credits.",  
"Log In Daily for Bonuses. Roll the dice every day for extra credits and check for new tasks."], 
actionUrl: "https://magicnewton.com/portal?referral=6xs7ffo1kx2nfhfm", actionText: "Start Sharing Now" }},
  
  { icon: "📡", name: "Theoriq", 
description: "Join a new wave where AI meets blockchain — no tech skills needed, just your curiosity to start.", 
reward: "+$25-$130 (Est. avg.)", btnText: "Start", hot: false, taskId: "taskcube", 
instructions: { title: "📦 Theoriq Airdrop Mini-Guide", description: "🧠 Earn Free XP Daily by Exploring AI & Inviting Friends with Theoriq", 
steps: ["Connect Wallet & Socials. Go to theoriq.xyz, link your wallet + socials, and complete simple quests to earn 100 XP.", 
"Chat with AI Daily. Use Theoriq’s Infinity Studio — get 50 XP/day for interacting with AI Agents and extra for giving feedback.", 
"Invite & Earn More. Share your referral link — earn 50 XP per friend who joins."], actionUrl: "https://quests.theoriq.ai?r=cWPZh2xM", actionText: "Start Now" }},

{
  "icon": "🤖",
  "name": "Ispolink",
  "description": "Earn free crypto by helping Web3 projects find talent using a smart AI-powered platform.",
  "reward": "+$25-$200 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "ispolink",
  "instructions": {
    "title": "📦 Ispolink Airdrop Mini-Guide",
    "description": "💼 Get Paid in Crypto for Using a Web3 Job Matching Platform",
    "steps": [
      "Sign Up & Connect Wallet. Join the waitlist on the Ispolink site and connect your crypto wallet.",
      "Complete Simple Tasks. Earn points by setting up your profile, doing daily actions, quizzes, and social tasks.",
      "Invite & Earn More. Share your referral link — get bonus points every time your friends join and complete tasks."
    ],
    "actionUrl": "https://dashboard.ispolink.com/?referral=FBZ80D",
    "actionText": "Earn points early — be ready for the GIANT AI token drop!"
  }
},

  {
  "icon": "🎰",
  "name": "Goated",
  "description": "Play games, refer friends, and earn crypto rewards on this next-gen Web3 betting platform.",
  "reward": "+$50-$500 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "goated",
  "instructions": {
    "title": "📦 Goated Airdrop Mini-Guide",
    "description": "🎯 Get Paid in Crypto While You Play and Refer on Goated",
    "steps": [
      "Create an Account. Sign up on Goated and verify your email.",
      "Play to Earn Points. Start betting on games or sports — you earn points win or lose.",
      "Refer and Multiply. Share your referral link to earn 5% of your friends' points too."
    ],
    "actionUrl": "https://www.goated.com/r/34BFJF",
    "actionText": "Earn while you play — join early and secure your share of $GOATED!"
  }
},

  {
  "icon": "🧱",
  "name": "Aergo",
  "description": "Complete simple quests and earn crypto while exploring a powerful Web3 infrastructure platform.",
  "reward": "+$20-$80 (Est. avg.)",
  "btnText": "Start",
  "hot": true,
  "taskId": "aergo",
  "instructions": {
    "title": "📦 Aergo Zealy Campaign Mini-Guide",
    "description": "🎯 Get Paid in Crypto for Completing Fun Daily Tasks with Aergo",
    "steps": [
      "Sign Up on Zealy. Create a free Zealy account and join the Aergo campaign.",
      "Complete Daily Quests. Earn XP by following Aergo on socials, sharing content, and inviting friends.",
      "Track Your Progress. Climb the leaderboard before the April 5 deadline to win real AERGO tokens."
    ],
    "actionUrl": "https://zealy.io/cw/aergo/invite/EgaW6Njs0fkJIKMcJXN1c",
    "actionText": "Complete tasks daily — earn XP and win AERGO before the deadline!"
  }
},
  
  { icon: "🔮", name: "Bitsolara", 
description: "Experience secure and private DeFi on Solana — fast, free, and built for your freedom.", 
reward: "+$40-$90 (Est. avg.)", btnText: "Start", hot: true, taskId: "Newton", 
instructions: { title: "📦 Bitsolara Airdrop Mini-Guide", 
description: "🎮 Chat, Level Up & Claim Free Crypto with Bitsolara", 
steps: ["Start the Bot & Register. Open the Bitsolara bot on Telegram, tap “Start”, then “Play now” to enter the mini app and register (connect your TON wallet if needed).", 
"Complete Quests & Earn XP. Do social tasks, quizzes, and in-app actions to level up and unlock more rewards.",  
"Invite Friends & Track Rewards. Use your referral link to earn more — check your status and claim airdrops in the mini app."], 
actionUrl: "https://t.me/BitsolaraMiniApp_Bot/app?startapp=29257130", actionText: "Start Now" }},

  { icon: "🔮", name: "Fleek", 
description: "Here you can easily create and launch AI agents, websites, and applications.", 
reward: "+$40-$90 (Est. avg.)", btnText: "Start", hot: true, taskId: "Newton", 
instructions: { title: "📦 Fleek Airdrop Mini-Guide", 
description: "Earn Points for the Upcoming Fleek Airdrop", 
steps: ["Sign up at Fleek with your email & verify your account", 
"Use Fleek to launch sites, apps, or AI tools — real usage = more points.",  
"Join the Fleek Affiliate Program, share your link & earn from referrals.",
"Complete quests on Galxe to boost your airdrop score." ], 
actionUrl: "https://fleek.xyz/?ref=semenl2", actionText: "Start Now" }}

];
projectTrackers.free.data = freeToEarnProjectsData;

const playToEarnProjectsData = [

  {
  "icon": "👾",
  "name": "Monsters.fun",
  "description": "Train, battle, and earn with AI-powered monsters on a futuristic Web3 gaming platform.",
  "reward": "+Early Access & Airdrop Potential",
  "btnText": "Join Now",
  "hot": true,
  "taskId": "monstersfun",
  "instructions": {
    "title": "📦 Monsters.fun Mini-Guide",
    "description": "🎮 Create Your AI Monster & Earn Rewards for Early Participation",
    "steps": [
      "Log in on Monsters.fun using your X (Twitter) account and follow @monstersdotfun.",
      "Enter referral code 9FMT1LO8 to secure early access and track your rank.",
      "Invite friends & join Discord for whitelist perks and exclusive roles."
    ],
    "actionUrl": "https://www.monsters.fun/ref/9FMT1LO8",
    "actionText": "⏳ Be Early — Capsule Holders Get First Access to Tokens!"
  }
},
  
{
  icon: "🐧",
  name: "Gacha Peng",
  description: "Summon pixel Penguins, earn up to 500% back in crypto — all while having fun.",
  reward: "+$50–$500 (Est. avg. ROI)",
  btnText: "Summon & Earn",
  hot: true,
  taskId: "gachapeng",
  instructions: {
    title: "📦 Gacha Peng Mini-Guide",
    description: "🎮 Earn Crypto by Summoning Cute Pixel Penguins — Each One Pays You Back",
    steps: [
      "Connect Wallet & Add ETH. Use MetaMask or another wallet and fund it with at least 0.01 ETH.",
      "Summon Penguins. Visit Gacha Peng, connect your wallet, and summon Penguins using ETH.",
      "Earn $PENG Tokens. Each Penguin gives you crypto rewards after 2–10 days — up to 500% ROI!"
    ],
    actionUrl: "https://app.gachapeng.xyz/0xCFfcA02aeD864F55DBC36aB7beaA238Cf25c8762",
    actionText: "Summon early — higher levels mean bigger rewards!"
  }
},

  { icon: "🏆", name: "Comiing soon..", description: "Competitive PvP games with weekly tournaments.", reward: "+$0 (Est. avg.)", btnText: "Compete", hot: false, taskId: "arenax", instructions: { title: "🏆 ArenaX - Compete and Earn", description: "Test your skills against other players for rewards:", steps: ["Create your ArenaX account", "Practice in free training mode", "Enter weekly tournaments", "Win rewards based on your ranking"], actionUrl: "#", actionText: "Join Arena" }},
  { icon: "🎮", name: "Comiing soon..", description: "Open-world exploration with daily quests.", reward: "+$0 (Est. avg.)", btnText: "Explore", hot: true, taskId: "metarealms", instructions: { title: "🎮 MetaRealms - Explore to Earn", description: "Immerse yourself in a crypto-powered virtual world:", steps: ["Create your MetaRealms character", "Complete the onboarding quests", "Participate in daily and weekly events", "Trade your earnings for real crypto"], actionUrl: "#", actionText: "Start Adventure" }}
];
projectTrackers.play.data = playToEarnProjectsData;

const nftProjectsData = [

{
  "icon": "⚔️",
  "name": "Infinity Warlords",
  "description": "Play idle missions, earn crypto rewards, and climb the leaderboard in this Solana-based game world.",
  "reward": "+XP = Higher Airdrop Potential",
  "btnText": "Play Now",
  "hot": true,
  "taskId": "infinitywarlords",
  "instructions": {
    "title": "📦 Infinity Warlords Mini-Guide",
    "description": "🎮 Level Up & Earn Airdrop Rewards by Playing and Engaging",
    "steps": [
      "Log in with Discord. Visit the site and sign in to start your journey.",
      "Play Missions & Earn XP. Complete expeditions, social tasks, and chat daily in Discord.",
      "Create Your Warlord. Customize your NFT hero and climb the leaderboard."
    ],
    "actionUrl": "https://infinitywarlords.com?ref_id=521037791120064512",
    "actionText": "⚡️ Act Fast — Earn XP Early to Boost Airdrop Chances!"
  }
},
  
  {
  "icon": "🪄",
  "name": "Marble & Magic-Fi",
  "description": "Get paid in crypto and NFTs for completing simple social tasks in a next-gen DeFi game.",
  "reward": "+$100-$900 (Est. avg. + NFTs)",
  "btnText": "Join Airdrop",
  "hot": true,
  "taskId": "marble",
  "instructions": {
    "title": "📦 Marble & Magic-Fi Mini-Guide",
    "description": "🎯 Earn free tokens and premium NFTs — no fees, no experience needed.",
    "steps": [
      "Connect Your Wallet. Visit the Marble site and connect your crypto wallet — no signup needed.",
      "Complete Social Tasks. Follow, like, and join Marble’s Twitter, Discord, Telegram, and YouTube to earn points.",
      "Withdraw Tokens & NFTs. Redeem your points for $MARBLE tokens. First 10,000 get valuable NFTs too!"
    ],
    "actionUrl": "https://game.marblefi.io/",
    "actionText": "🚨 Only 50,000 spots — join now before it’s gone!"
  }
},
 
{
  icon: "🪞",
  name: "Black Mirror",
  description: "Claim a FREE NFT pass that gives access to future crypto airdrops and immersive digital experiences.",
  reward: "+$50–$500 (Est. future value)",
  btnText: "Claim NFT",
  hot: true,
  taskId: "blackmirror",
  instructions: {
    title: "📦 Black Mirror Mini-Guide",
    description: "🧬 Claim Your Free NFT Pass & Unlock Airdrops + Exclusive Web3 Experiences",
    steps: [
      "Connect Wallets. Visit the official Black Mirror site and connect both your EVM (MetaMask) and Solana (Phantom) wallets.",
      "Link X Account. Connect your Twitter (X) profile to complete your digital identity.",
      "Secure Your NFT. Once registered, you’re set to receive your FREE Social ID NFT — your pass to future airdrops and perks."
    ],
    actionUrl: "https://blackmirror.ultimet.io/",
    actionText: "Join early — free NFT now, guaranteed rewards later!"
  }
},

{
  "icon": "💨",
  "name": "TheVapeLabs",
  "description": "Track your habits, support health research, and earn crypto while you vape.",
  "reward": "+$MIST Airdrop (Live)",
  "btnText": "Start Earning",
  "hot": true,
  "taskId": "vapetolabs",
  "instructions": {
    "title": "📦 TheVapeLabs Mini-Guide",
    "description": "💰 Vape, Check In, Earn — It’s That Simple with TheVapeLabs",
    "steps": [
      "Open TheVapeLabs Telegram Mini-App and log in to start.",
      "Check in daily to earn 100 $MIST — just a few clicks.",
      "Complete social tasks and invite friends for extra rewards!"
    ],
    "actionUrl": "https://app.thevapelabs.io/login?ref=9875af68-9efb-4a39-9db0-e0509bed2342",
    "actionText": "⏳ Don’t miss the early airdrop — earn while you vape!"
  }
},
  
  { icon: "🎭", name: "Comiing soon..", description: "Free avatar NFTs with staking rewards.", reward: "+$0 (Est. avg.)", btnText: "Mint", hot: false, taskId: "avatarworld", instructions: { title: "🎭 AvatarWorld - Your Digital Identity", description: "Get free avatar NFTs with real utility:", steps: ["Claim your free unique avatar NFT", "Customize it with free traits", "Stake your avatar for passive rewards", "Use across multiple partner platforms"], actionUrl: "#", actionText: "Claim Avatar" }},
  { icon: "🃏", name: "Comiing soon..", description: "Collectible card game with tradable NFT cards.", reward: "+$0 (Est. avg.)", btnText: "Collect", hot: true, taskId: "cardchain", instructions: { title: "🃏 CardChain - Collect, Play, Earn", description: "Free starter pack with valuable NFT cards:", steps: ["Claim your free starter deck", "Learn to play through tutorials", "Compete in daily matches", "Trade or sell your valuable cards"], actionUrl: "#", actionText: "Get Cards" }}
];
projectTrackers.nft.data = nftProjectsData;

const testnetProjectsData = [
 
 { icon: "🔐", name: "Comiing soon..", description: "Privacy-focused payment protocol with incentivized testing.", reward: "+$0 (Est. avg.)", btnText: "Join", hot: false, taskId: "shieldpay", instructions: { title: "🔐 ShieldPay - Private Payments, Public Rewards", description: "Test the future of private transactions:", steps: ["Create your ShieldPay account", "Complete the privacy protocol tutorial", "Send at least 5 private transactions", "Report bugs for additional rewards"], actionUrl: "#", actionText: "Start Testing" }},
  { icon: "🔐", name: "Comiing soon..", description: "Privacy-focused payment protocol with incentivized testing.", reward: "+$0 (Est. avg.)", btnText: "Join", hot: false, taskId: "shieldpay", instructions: { title: "🔐 ShieldPay - Private Payments, Public Rewards", description: "Test the future of private transactions:", steps: ["Create your ShieldPay account", "Complete the privacy protocol tutorial", "Send at least 5 private transactions", "Report bugs for additional rewards"], actionUrl: "#", actionText: "Start Testing" }},
  { icon: "🔄", name: "Comiing soon..", description: "Cross-chain bridge with testnet rewards.", reward: "+$0 (Est. avg.)", btnText: "Bridge", hot: true, taskId: "crossbridge", instructions: { title: "🔄 CrossBridge - Connect Chains, Collect Rewards", description: "Test groundbreaking cross-chain technology:", steps: ["Create accounts on multiple test networks", "Get free testnet tokens", "Perform at least 5 cross-chain transfers", "Report your experience for bonus points"], actionUrl: "#", actionText: "Start Bridging" }}
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
  const img = document.getElementById("lightbox-image");
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
        <button class="btn-secondary js-show-wallet-help">Need Wallet?</button>
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
    showMoreBtn.textContent = `🔽 Show more ${remaining} ${getProjectWord(remaining)}`;
  }
}

function getProjectWord(number) { // Для правильного склонения слова "проект"
    if (number === 1) return 'project';
    if (number >= 2 && number <= 4) return 'projects';
    return 'projects';
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
  // Dropdown Menu for Get Crypto
  const getCryptoLink = document.getElementById('get-crypto-dropdown-link');
  const getCryptoDropdownItem = getCryptoLink ? getCryptoLink.closest('.nav-item-dropdown') : null;

  if (getCryptoLink && getCryptoDropdownItem) {
    // Добавляем обработчик для выпадающего меню "Get Crypto"
    getCryptoLink.addEventListener('click', function(event) {
      event.preventDefault(); // Предотвращаем стандартное поведение ссылки (прокрутку)
      event.stopPropagation(); // Предотвращаем всплытие клика, которое закроет меню

      // Закрываем другие открытые выпадающие меню (при наличии)
      document.querySelectorAll('.nav-item-dropdown.active').forEach(item => {
        if (item !== getCryptoDropdownItem) {
          item.classList.remove('active');
        }
      });

      // Переключаем класс 'active' для родительского элемента li
      getCryptoDropdownItem.classList.toggle('active');
    });

    // Закрываем выпадающее меню при клике вне его
    document.addEventListener('click', function(event) {
      if (getCryptoDropdownItem.classList.contains('active')) {
        const isClickInsideDropdown = getCryptoDropdownItem.contains(event.target);
        if (!isClickInsideDropdown) {
          getCryptoDropdownItem.classList.remove('active');
        }
      }
    });

    // Закрываем выпадающее меню при клике на ссылку внутри него (и прокручиваем к секции)
    getCryptoDropdownItem.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', function() {
        getCryptoDropdownItem.classList.remove('active'); // Закрываем выпадающее меню
        // Позволяем стандартное поведение ссылки (прокрутку к секции)
      });
    });
  }

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

  // Остальные обработчики событий...
}
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

document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', function () {
    openLightbox(this.src); // Call the correct function to open the first lightbox modal
  });
});
