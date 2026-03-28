/**
 * Level Navigation - automatski otvara sadržaj određenog nivoa na temelju URL parametra
 */
document.addEventListener('DOMContentLoaded', function() {
  // Provjeri URL parametar
  const urlParams = new URLSearchParams(window.location.search);
  const level = urlParams.get('level');
  
  if (level) {
    // Ako postoji parameter nivoa, otvori odgovarajući nivo
    const levelId = `level-${level}-card`;
    const levelContent = `level-${level}-content`;
    const toggleBtn = document.getElementById(`toggle-level-${level}`);
    
    // Dovedi do elementa nivoa (smooth scroll)
    const levelElement = document.getElementById(levelId);
    if (levelElement) {
      levelElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Kratka pauza prije otvaranja sadržaja da scroll dođe do elementa
      setTimeout(() => {
        // Prikaži sadržaj nivoa
        const contentElement = document.getElementById(levelContent);
        if (contentElement) {
          contentElement.style.display = 'flex';
          
          // Promijeni tekst toggle gumba
          if (toggleBtn) {
            toggleBtn.textContent = 'Sakrij sadržaj';
            toggleBtn.classList.add('active');
          }
        }
      }, 500);
    }
  }
});
