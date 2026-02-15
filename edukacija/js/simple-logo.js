/**
 * Simple Text Logo
 * Creates a clean text-based logo for the Edukacija website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the logo container
  const logoDiv = document.querySelector("header .logo");
  if (!logoDiv) return;
  
  // Clear existing content
  logoDiv.innerHTML = "";
  
  // Create simple text logo
  const logoText = document.createElement('div');
  logoText.className = 'logo-text';
  logoText.textContent = 'Edukacija';
  
  // Add to page
  logoDiv.appendChild(logoText);
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .logo-text {
      font-size: 28px;
      font-weight: bold;
      color: var(--primary-color);
      letter-spacing: 2px;
      padding: 10px 0;
      transition: transform 0.3s ease;
    }
    
    .logo-text:hover {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
});
