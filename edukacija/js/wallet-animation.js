/**
 * Wallet Animation Script
 * Loads and displays the BTC_wallet.json animation on the tutorial-1.html page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the right page and animation container exists
  const animationContainer = document.getElementById('wallet-animation');
  if (!animationContainer) return;
  
  // Load LottieFiles player if it's not already loaded
  if (typeof lottie === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.onload = initAnimation;
    document.head.appendChild(script);
  } else {
    initAnimation();
  }
  
  // Initialize the animation
  function initAnimation() {
    // Create Lottie player element
    const player = document.createElement('lottie-player');
    player.src = 'Animations/BTC_wallet.json';
    player.background = 'transparent';
    player.speed = '1';
    player.style.width = '100%';
    player.style.height = '100%';
    player.setAttribute('loop', '');
    player.setAttribute('autoplay', '');
    
    // Add the player to our container
    animationContainer.innerHTML = '';
    animationContainer.appendChild(player);
  }
});
