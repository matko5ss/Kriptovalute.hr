/**
 * NFT Animation Implementation
 * Displays the NFT animation in the tutorial page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load Lottie library if it's not already loaded
  if (typeof lottie === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    
    script.onload = initializeAnimation;
    document.body.appendChild(script);
  } else {
    // Lottie already loaded, initialize animation directly
    initializeAnimation();
  }
  
  function initializeAnimation() {
    // Find the NFT animation container
    const nftContainer = document.getElementById('nft-animation-container');
    
    if (!nftContainer) return;
    
    // Clear previous animation if exists
    nftContainer.innerHTML = '';
    
    // Initialize the animation with canvas renderer instead of SVG
    const animation = lottie.loadAnimation({
      container: nftContainer,
      renderer: 'canvas', // Switch to canvas renderer for better scaling
      loop: true,
      autoplay: true,
      path: './Animations/NFT.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet', // Changed to 'meet' which preserves aspect ratio and ensures visibility
        clearCanvas: true,
        progressiveLoad: false, // Disable progressive loading for canvas renderer
        hideOnTransparent: true
      }
    });
    
    // Set specific dimensions for container
    nftContainer.style.width = '100%';
    nftContainer.style.height = '100%';
    
    // Scale animation to fit properly
    animation.setSubframe(false); // Better rendering
    
    // Adjust animation scale as needed
    animation.addEventListener('DOMLoaded', function() {
      console.log('NFT animation loaded successfully');
      // Add a small delay to ensure animation is loaded before resizing
      setTimeout(() => {
        // Force resize to ensure the animation fits properly
        animation.resize();
      }, 100);
    });
    
    animation.addEventListener('error', function(error) {
      console.error('NFT animation failed to load:', error);
    });
    
    // Handle window resize to ensure animation stays visible
    window.addEventListener('resize', function() {
      animation.resize();
    });
  }
});
