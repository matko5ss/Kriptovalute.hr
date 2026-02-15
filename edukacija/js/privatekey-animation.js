document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('privatekey-animation');
  if (!container) return;

  // Load the animation data
  fetch('../Animations/PrivateKey.json')
    .then(response => response.json())
    .then(animationData => {
      // Initialize lottie animation
      const anim = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      });
    })
    .catch(error => console.error('Error loading PrivateKey animation:', error));
});
