document.addEventListener('DOMContentLoaded', function() {
  // Store timeouts for each dropdown
  const timeouts = {};
  
  // Function to handle dropdown behavior
  function setupDropdowns() {
    // Get all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Add hover behavior to each dropdown
    dropdowns.forEach((dropdown, index) => {
      const id = 'dropdown-' + index;
      dropdown.setAttribute('data-dropdown-id', id);
      
      // Mouse enter - show dropdown and clear timeout
      dropdown.addEventListener('mouseenter', function() {
        if (timeouts[id]) {
          clearTimeout(timeouts[id]);
          delete timeouts[id];
        }
        dropdown.classList.add('active');
      });
      
      // Mouse leave - set timeout to hide dropdown
      dropdown.addEventListener('mouseleave', function() {
        timeouts[id] = setTimeout(function() {
          dropdown.classList.remove('active');
        }, 3000);
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
      // Check if click was outside all dropdowns
      let clickedInsideDropdown = false;
      
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
          clickedInsideDropdown = true;
        }
      });
      
      // If clicked outside, close all dropdowns
      if (!clickedInsideDropdown) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          
          // Clear any timeouts for this dropdown
          const id = dropdown.getAttribute('data-dropdown-id');
          if (timeouts[id]) {
            clearTimeout(timeouts[id]);
            delete timeouts[id];
          }
        });
      }
    });
  }
  
  // Setup dropdowns on page load
  setupDropdowns();
});
