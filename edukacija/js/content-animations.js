/**
 * Content Animations
 * Loads and displays Lottie animations in content sections using data-animation attribute
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load Lottie library if not already loaded
  if (typeof lottie === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.onload = initContentAnimations;
    document.body.appendChild(script);
  } else {
    initContentAnimations();
  }

  function initContentAnimations() {
    // Find all animation containers in content
    const animationElements = document.querySelectorAll('.lottie-animation');
    
    // Initialize each animation
    animationElements.forEach((element, index) => {
      const animationPath = element.getAttribute('data-animation');
      if (animationPath) {
        // Add unique ID to the element
        const animId = 'content-anim-' + index;
        element.id = animId;
        
        // Create animation
        try {
          const animation = lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationPath
          });
          
          // Debug logs
          animation.addEventListener('DOMLoaded', function() {
            console.log('Animation loaded successfully:', animationPath);
          });
          
          animation.addEventListener('error', function(error) {
            console.error('Animation failed to load:', animationPath, error);
          });
        } catch (error) {
          console.error('Error initializing animation:', animationPath, error);
        }
      }
    });
  }
});
