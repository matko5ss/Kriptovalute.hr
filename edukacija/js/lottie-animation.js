/**
 * Lottie Animation Integration
 * Uses the Lottie library to display an animation from a local JSON file
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create container for the Lottie animation
  const logoDiv = document.querySelector("header .logo");
  if (!logoDiv) return;
  
  // Clear existing content
  logoDiv.innerHTML = "";
  
  // Create wrapper div
  const animationWrapper = document.createElement('div');
  animationWrapper.className = 'animation-wrapper';
  animationWrapper.id = 'lottie-container';
  
  // Create Edukacija text overlay that will appear when beak opens
  const raraText = document.createElement('div');
  raraText.className = 'rara-text';
  raraText.textContent = 'Edukacija';
  raraText.style.display = 'none';
  
  // Create speech bubble div
  const speechBubble = document.createElement('div');
  speechBubble.className = 'speech-bubble';
  speechBubble.textContent = 'Edukacija!';
  speechBubble.style.display = 'none';
  
  // Add elements to the page
  logoDiv.appendChild(animationWrapper);
  logoDiv.appendChild(raraText);
  logoDiv.appendChild(speechBubble);
  
  // Add styles for animation and speech bubble
  const style = document.createElement('style');
  style.textContent = `
    .logo {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 200px;
    }
    
    .animation-wrapper {
      width: 150px;
      height: 150px;
      cursor: pointer;
      position: relative;
    }
    
    .rara-text {
      position: absolute;
      top: 50%;
      left: 140px; /* Position to the right of the parrot */
      transform: translateY(-50%);
      color: #ff5722;
      font-weight: bold;
      font-size: 24px;
      text-shadow: 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white;
      z-index: 10;
      pointer-events: none;
      animation: pulse 0.5s infinite alternate;
      background: rgba(255, 255, 255, 0.9);
      padding: 5px 15px;
      border-radius: 15px;
      border: 2px solid #ff5722;
      display: flex;
      align-items: center;
    }
    
    /* Speech lines to connect text to parrot */
    .rara-text:before {
      content: '';
      position: absolute;
      left: -15px;
      width: 15px;
      height: 2px;
      background-color: #ff5722;
      top: 50%;
    }
    
    .rara-text:after {
      content: '';
      position: absolute;
      left: -10px;
      width: 10px;
      height: 2px;
      background-color: #ff5722;
      top: calc(50% - 5px);
      transform: rotate(30deg);
    }
    
    @keyframes pulse {
      from { opacity: 0.8; transform: translateY(-50%) scale(0.95); }
      to { opacity: 1; transform: translateY(-50%) scale(1.05); }
    }
    
    .speech-bubble {
      position: absolute;
      top: 10px;
      right: -80px;
      background: white;
      border: 2px solid black;
      border-radius: 10px;
      padding: 5px 10px;
      font-weight: bold;
      z-index: 10;
      font-size: 14px;
    }
    
    .speech-bubble:after {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      margin-top: -10px;
      border-width: 10px 10px 10px 0;
      border-style: solid;
      border-color: transparent white transparent transparent;
      display: block;
      width: 0;
    }
    
    .speech-bubble:before {
      content: '';
      position: absolute;
      left: -12px;
      top: 50%;
      margin-top: -11px;
      border-width: 11px 11px 11px 0;
      border-style: solid;
      border-color: transparent black transparent transparent;
      display: block;
      width: 0;
    }
  `;
  document.head.appendChild(style);
  
  // Load Lottie library from CDN
  const lottieScript = document.createElement('script');
  lottieScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
  lottieScript.onload = initLottie;
  document.body.appendChild(lottieScript);
  
  // Initialize Lottie animation once the library is loaded
  function initLottie() {
    const animation = lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/Animations/Animation - 1749550304470.json'
    });
    
    // Track animation frames to detect when beak opens
    let isBeakOpen = false;
    let beakOpenFrames = [];
    let currentFrame = 0;
    
    // Analyze frames to detect beak opening
    // Since we can't directly access the animation structure,
    // we'll use a timer-based approach to show/hide the Edukacija text
    animation.addEventListener('enterFrame', (e) => {
      currentFrame = Math.floor(e.currentTime * animation.frameRate);
      
      // This timing will need to be adjusted based on the actual animation
      // We're assuming the beak opens periodically
      if (currentFrame % 60 > 30 && currentFrame % 60 < 45) {
        if (!isBeakOpen) {
          isBeakOpen = true;
          raraText.style.display = 'block';
        }
      } else {
        if (isBeakOpen) {
          isBeakOpen = false;
          raraText.style.display = 'none';
        }
      }
    });
    
    // Add click event to show speech bubble and trigger talking
    animationWrapper.addEventListener('click', () => {
      // Show speech bubble
      speechBubble.style.display = 'block';
      
      // Phrases to cycle through
      const phrases = ['Edukacija!', 'Blockchain!', 'MiCA!', 'Pravni savjet?', 'Kriptovalute!'];
      speechBubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      
      // Show Edukacija text for a moment
      raraText.style.display = 'block';
      
      // Hide speech bubble and Edukacija text after 3 seconds
      setTimeout(() => {
        speechBubble.style.display = 'none';
        if (!isBeakOpen) {
          raraText.style.display = 'none';
        }
      }, 3000);
    });
  }
});
