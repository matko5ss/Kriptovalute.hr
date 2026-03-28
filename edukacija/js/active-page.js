document.addEventListener('DOMContentLoaded', function() {
  // Get the current page URL
  const currentPage = window.location.pathname.split('/').pop();
  
  // Find all dropdown menu links
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');
  
  // Check each link to see if it matches the current page
  dropdownLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // If the link's href matches the current page, add the active class
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Also check main navigation links
  const navLinks = document.querySelectorAll('nav ul li a:not(.dropdown-toggle)');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // If the link's href matches the current page, add the active class
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
});
