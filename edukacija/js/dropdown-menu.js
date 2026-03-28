document.addEventListener('DOMContentLoaded', function() {
    // Mobile dropdown toggle functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            // Only handle click for mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});
