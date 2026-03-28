document.addEventListener('DOMContentLoaded', function() {
  // Setup for Nivo 1
  setupLevelToggle('level-1-card', 'toggle-level-1', 'level-1-content');
  
  // Setup for Nivo 2
  setupLevelToggle('level-2-card', 'toggle-level-2', 'level-2-content');
  
  // Function to set up toggle functionality for a level
  function setupLevelToggle(cardId, btnId, contentId) {
    const levelCard = document.getElementById(cardId);
    const toggleBtn = document.getElementById(btnId);
    const levelContent = document.getElementById(contentId);
    
    if (levelCard && toggleBtn && levelContent) {
      // Function to toggle the content visibility
      function toggleContent() {
        levelContent.classList.toggle('active');
        
        // Update button text based on current state
        if (levelContent.classList.contains('active')) {
          toggleBtn.textContent = 'Sakrij sadržaj';
        } else {
          toggleBtn.textContent = 'Prikaži sadržaj';
        }
      }
      
      // Add click event to both the card and the button
      levelCard.addEventListener('click', function(e) {
        // Only toggle if the click was directly on the card (not on the button)
        if (e.target === levelCard || e.target.tagName === 'H4') {
          toggleContent();
        }
      });
      
      // Add click event to the button
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the card's click event from firing
        toggleContent();
      });
    }
  }
});
