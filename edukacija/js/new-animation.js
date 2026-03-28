/**
 * New Animation Implementation
 * Displays the graduation cap animation in the header
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the logo container
  const logoDiv = document.querySelector("header .logo");
  if (!logoDiv) return;
  
  // Clear existing content
  logoDiv.innerHTML = "";
  
  // Create link to homepage
  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.className = 'home-link';
  homeLink.title = 'Povratak na početnu stranicu';
  
  // Create container for animation
  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
  
  // Create animation container
  const animationContainer = document.createElement('div');
  animationContainer.id = 'lottie-container';
  animationContainer.className = 'lottie-container';
  
  // Add elements to the page
  logoContainer.appendChild(animationContainer);
  homeLink.appendChild(logoContainer);
  logoDiv.appendChild(homeLink);
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .home-link {
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.2s ease;
      display: block;
    }
    
    .home-link:hover {
      transform: scale(1.05);
    }
    
    .home-link:active {
      transform: scale(0.98);
    }
    
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .lottie-container {
      width: 80px;
      height: 80px;
      margin-bottom: 5px;
      overflow: visible;
    }
  `;
  document.head.appendChild(style);
  
  // Load Lottie library and initialize animation
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
  
  script.onload = function() {
    // Initialize the animation after the script is loaded
    const animation = lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: './Animations/graduation-cap.json'
    });
    
    // Log success or failure
    animation.addEventListener('DOMLoaded', function() {
      console.log('Animation loaded successfully');
    });
    
    animation.addEventListener('error', function(error) {
      console.error('Animation failed to load:', error);
    });
  };
  
  document.body.appendChild(script);
});
