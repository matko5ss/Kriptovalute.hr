/**
 * Rive Parrot Animation Integration
 * Uses the Rive runtime to display an animated parrot from Rive
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create container for the Rive animation
  const logoDiv = document.querySelector("header .logo");
  if (!logoDiv) return;
  
  // Clear existing content
  logoDiv.innerHTML = "";
  
  // Create wrapper div with lawyer styling
  const parrotWrapper = document.createElement('div');
  parrotWrapper.className = 'parrot-lawyer-wrapper';
  
  // Create canvas for Rive
  const canvas = document.createElement('canvas');
  canvas.id = 'rive-canvas';
  canvas.width = 300;
  canvas.height = 200;
  canvas.style.cursor = 'pointer';
  
  // Create speech bubble div
  const speechBubble = document.createElement('div');
  speechBubble.className = 'speech-bubble';
  speechBubble.textContent = 'Edukacija!';
  speechBubble.style.display = 'none';
  
  // Create lawyer wig element
  const lawyerWig = document.createElement('div');
  lawyerWig.className = 'lawyer-wig';
  
  // Create lawyer glasses element
  const lawyerGlasses = document.createElement('div');
  lawyerGlasses.className = 'lawyer-glasses';
  
  // Add elements to the page
  parrotWrapper.appendChild(lawyerWig);
  parrotWrapper.appendChild(canvas);
  parrotWrapper.appendChild(lawyerGlasses);
  logoDiv.appendChild(parrotWrapper);
  logoDiv.appendChild(speechBubble);
  
  // Add styles for parrot lawyer
  const style = document.createElement('style');
  style.textContent = `
    .logo {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 200px;
    }
    
    .parrot-lawyer-wrapper {
      position: relative;
      width: 200px;
      height: 140px;
      display: flex;
      justify-content: center;
      transform: scale(0.8);
    }
    
    #rive-canvas {
      position: relative;
      z-index: 2;
      transform: scale(0.7);
    }
    
    .lawyer-wig {
      position: absolute;
      top: -30px;
      width: 120px;
      height: 60px;
      background: white;
      border-radius: 60px 60px 0 0;
      z-index: 3;
      box-shadow: 0 -5px 10px rgba(0,0,0,0.1);
    }
    
    .lawyer-wig:before, .lawyer-wig:after {
      content: '';
      position: absolute;
      background: white;
      border-radius: 50%;
    }
    
    .lawyer-wig:before {
      width: 30px;
      height: 40px;
      left: 15px;
      top: 20px;
    }
    
    .lawyer-wig:after {
      width: 30px;
      height: 40px;
      right: 15px;
      top: 20px;
    }
    
    .lawyer-glasses {
      position: absolute;
      top: 40px;
      width: 100px;
      height: 30px;
      z-index: 4;
      display: flex;
      justify-content: space-between;
    }
    
    .lawyer-glasses:before, .lawyer-glasses:after {
      content: '';
      width: 35px;
      height: 35px;
      border: 2px solid black;
      border-radius: 50%;
      background: transparent;
    }
    
    .lawyer-glasses:after {
      right: 0;
    }
    
    .speech-bubble {
      position: absolute;
      top: 10px;
      right: -80px;
      background: white;
      border: 2px solid black;
      border-radius: 10px;
      padding: 5px 10px;
      font-weight: bold;
      z-index: 10;
      font-size: 14px;
    }
    
    .speech-bubble:after {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      margin-top: -10px;
      border-width: 10px 10px 10px 0;
      border-style: solid;
      border-color: transparent white transparent transparent;
      display: block;
      width: 0;
    }
    
    .speech-bubble:before {
      content: '';
      position: absolute;
      left: -12px;
      top: 50%;
      margin-top: -11px;
      border-width: 11px 11px 11px 0;
      border-style: solid;
      border-color: transparent black transparent transparent;
      display: block;
      width: 0;
    }
  `;
  document.head.appendChild(style);
  
  // Load Rive runtime from CDN
  const riveScript = document.createElement('script');
  riveScript.src = 'https://unpkg.com/@rive-app/canvas@2.7.0';
  riveScript.onload = initRive;
  document.body.appendChild(riveScript);
  
  // Create an iframe to embed the Rive animation
  function initRive() {
    // Create iframe for the Rive animation
    const iframe = document.createElement('iframe');
    iframe.src = 'https://editor.rive.app/preview/12740-24196-parrot/10861124?mode=animate&artboard=Artboard&animation=Idle';
    iframe.style.width = '300px';
    iframe.style.height = '200px';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '1';
    iframe.style.pointerEvents = 'none'; // Make iframe non-interactive
    
    // Replace canvas with iframe
    canvas.parentNode.replaceChild(iframe, canvas);
    
    // Add click event to show speech bubble
    parrotWrapper.addEventListener('click', () => {
      // Show speech bubble
      speechBubble.style.display = 'block';
      
      // Phrases to cycle through
      const phrases = ['Edukacija!', 'Blockchain!', 'MiCA!', 'Pravni savjet?', 'Kriptovalute!'];
      speechBubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      
      // Hide speech bubble after 3 seconds
      setTimeout(() => {
        speechBubble.style.display = 'none';
      }, 3000);
    });
  }
});
