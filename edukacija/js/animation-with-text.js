/**
 * Animation with Text Logo
 * Displays the animation from Animations folder with Edukacija text below
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the logo container
  const logoDiv = document.querySelector("header .logo");
  if (!logoDiv) return;
  
  // Clear existing content
  logoDiv.innerHTML = "";
  
  // Create container for animation and text
  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
  
  // Create animation container
  const animationContainer = document.createElement('div');
  animationContainer.id = 'animation-container';
  animationContainer.className = 'animation-container';
  
  // Create text element
  const logoText = document.createElement('div');
  logoText.className = 'logo-text';
  logoText.textContent = 'Edukacija';
  
  // Add elements to the page
  logoContainer.appendChild(animationContainer);
  logoContainer.appendChild(logoText);
  logoDiv.appendChild(logoContainer);
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .animation-container {
      width: 120px;
      height: 120px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
    }
    
    .logo-text {
      font-size: 20px;
      font-weight: bold;
      color: var(--primary-color);
      letter-spacing: 2px;
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
    console.log('Lottie library loaded, initializing animation');
    
    // Use the correct filename that exists in the Animations folder
    const animationPath = './Animations/Animation - 1749551213760.json';
    console.log('Trying to load animation from:', animationPath);
    
    try {
      const animation = lottie.loadAnimation({
        container: document.getElementById('animation-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
      });
      
      // Add event listeners to debug animation loading
      animation.addEventListener('data_ready', () => {
        console.log('Animation data loaded successfully');
      });
      
      animation.addEventListener('data_failed', () => {
        console.error('Failed to load animation data');
      });
      
      // Make animation container more visible for debugging
      document.getElementById('animation-container').style.border = '1px dashed red';
      document.getElementById('animation-container').style.minHeight = '100px';
    } catch (error) {
      console.error('Error initializing animation:', error);
    }
  }
});
