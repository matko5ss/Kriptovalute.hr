/**
 * Interactive Parrot Lawyer Animation
 * Creates an animated parrot lawyer character that responds to user interaction
 */

class ParrotLawyer {
  constructor(containerId) {
    // Create container directory if it doesn't exist
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID ${containerId} not found!`);
      return;
    }
    
    // Create SVG element
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "200");
    this.svg.setAttribute("height", "200");
    this.svg.setAttribute("viewBox", "0 0 200 200");
    this.svg.style.cursor = "pointer";
    
    // Create parrot elements
    this.createParrot();
    
    // Add event listeners
    this.addEventListeners();
    
    // Append SVG to container
    this.container.appendChild(this.svg);
    
    // Animation properties
    this.isAnimating = false;
    this.animationFrame = 0;
    this.phrases = ["Edukacija!", "Pravni savjet?", "Blockchain!", "Kriptovalute!", "MiCA!"];
    this.currentPhrase = 0;
    
    // Start idle animation
    this.startIdleAnimation();
  }
  
  createParrot() {
    // Create a gradient for the parrot body
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "parrotGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#00c853");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#1de9b6");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    this.svg.appendChild(gradient);
    
    // Add some fun feathers on top
    const feathers = [
      {x: 70, y: 40, rotation: -30, color: "#ff4081"},
      {x: 100, y: 30, rotation: 0, color: "#aa00ff"},
      {x: 130, y: 40, rotation: 30, color: "#2979ff"}
    ];
    
    feathers.forEach(f => {
      const feather = document.createElementNS("http://www.w3.org/2000/svg", "path");
      feather.setAttribute("d", `M${f.x},${f.y} Q${f.x},${f.y-20} ${f.x+10},${f.y-15} T${f.x+20},${f.y}`);
      feather.setAttribute("fill", f.color);
      feather.setAttribute("transform", `rotate(${f.rotation} ${f.x} ${f.y})`);
      this.svg.appendChild(feather);
    });
    
    // Parrot body
    const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    body.setAttribute("cx", "100");
    body.setAttribute("cy", "100");
    body.setAttribute("rx", "70");
    body.setAttribute("ry", "80");
    body.setAttribute("fill", "url(#parrotGradient)");
    body.setAttribute("stroke", "#00796b");
    body.setAttribute("stroke-width", "1");
    this.svg.appendChild(body);
    
    // Parrot face
    const face = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    face.setAttribute("cx", "100");
    face.setAttribute("cy", "110");
    face.setAttribute("rx", "50");
    face.setAttribute("ry", "60");
    face.setAttribute("fill", "#ffecb3");
    face.setAttribute("stroke", "#ffa000");
    face.setAttribute("stroke-width", "1");
    this.svg.appendChild(face);
    
    // Left eye white
    const leftEyeWhite = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    leftEyeWhite.setAttribute("cx", "80");
    leftEyeWhite.setAttribute("cy", "80");
    leftEyeWhite.setAttribute("r", "10");
    leftEyeWhite.setAttribute("fill", "white");
    this.svg.appendChild(leftEyeWhite);
    
    // Right eye white
    const rightEyeWhite = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rightEyeWhite.setAttribute("cx", "120");
    rightEyeWhite.setAttribute("cy", "80");
    rightEyeWhite.setAttribute("r", "10");
    rightEyeWhite.setAttribute("fill", "white");
    this.svg.appendChild(rightEyeWhite);
    
    // Left eye pupil
    this.leftEyePupil = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.leftEyePupil.setAttribute("cx", "80");
    this.leftEyePupil.setAttribute("cy", "80");
    this.leftEyePupil.setAttribute("r", "5");
    this.leftEyePupil.setAttribute("fill", "black");
    this.svg.appendChild(this.leftEyePupil);
    
    // Right eye pupil
    this.rightEyePupil = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.rightEyePupil.setAttribute("cx", "120");
    this.rightEyePupil.setAttribute("cy", "80");
    this.rightEyePupil.setAttribute("r", "5");
    this.rightEyePupil.setAttribute("fill", "black");
    this.svg.appendChild(this.rightEyePupil);
    
    // Beak curve
    const beakCurve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    beakCurve.setAttribute("d", "M85,110 Q100,130 115,110");
    beakCurve.setAttribute("stroke", "black");
    beakCurve.setAttribute("stroke-width", "2");
    beakCurve.setAttribute("fill", "none");
    this.svg.appendChild(beakCurve);
    
    // Beak
    this.beak = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.beak.setAttribute("d", "M90,110 L100,125 L110,110");
    this.beak.setAttribute("fill", "#ff5722");
    this.svg.appendChild(this.beak);
    
    // Lawyer glasses - left
    const leftGlass = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    leftGlass.setAttribute("x", "70");
    leftGlass.setAttribute("y", "75");
    leftGlass.setAttribute("width", "20");
    leftGlass.setAttribute("height", "10");
    leftGlass.setAttribute("rx", "5");
    leftGlass.setAttribute("fill", "none");
    leftGlass.setAttribute("stroke", "black");
    leftGlass.setAttribute("stroke-width", "2");
    this.svg.appendChild(leftGlass);
    
    // Lawyer glasses - right
    const rightGlass = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rightGlass.setAttribute("x", "110");
    rightGlass.setAttribute("y", "75");
    rightGlass.setAttribute("width", "20");
    rightGlass.setAttribute("height", "10");
    rightGlass.setAttribute("rx", "5");
    rightGlass.setAttribute("fill", "none");
    rightGlass.setAttribute("stroke", "black");
    rightGlass.setAttribute("stroke-width", "2");
    this.svg.appendChild(rightGlass);
    
    // Glasses bridge
    const glassesBridge = document.createElementNS("http://www.w3.org/2000/svg", "line");
    glassesBridge.setAttribute("x1", "90");
    glassesBridge.setAttribute("y1", "80");
    glassesBridge.setAttribute("x2", "110");
    glassesBridge.setAttribute("y2", "80");
    glassesBridge.setAttribute("stroke", "black");
    glassesBridge.setAttribute("stroke-width", "2");
    this.svg.appendChild(glassesBridge);
    
    // Lawyer wig base with gradient
    const wigGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    wigGradient.setAttribute("id", "wigGradient");
    wigGradient.setAttribute("x1", "0%");
    wigGradient.setAttribute("y1", "0%");
    wigGradient.setAttribute("x2", "0%");
    wigGradient.setAttribute("y2", "100%");
    
    const wigStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    wigStop1.setAttribute("offset", "0%");
    wigStop1.setAttribute("stop-color", "#ffffff");
    
    const wigStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    wigStop2.setAttribute("offset", "100%");
    wigStop2.setAttribute("stop-color", "#e0e0e0");
    
    wigGradient.appendChild(wigStop1);
    wigGradient.appendChild(wigStop2);
    this.svg.appendChild(wigGradient);
    
    // Lawyer wig base
    const wigBase = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wigBase.setAttribute("d", "M45,60 Q100,20 155,60");
    wigBase.setAttribute("fill", "url(#wigGradient)");
    wigBase.setAttribute("stroke", "#bdbdbd");
    wigBase.setAttribute("stroke-width", "1");
    this.svg.appendChild(wigBase);
    
    // Lawyer wig curls - more exaggerated and animated
    this.wigCurls = [];
    const wigPositions = [
      {path: "M50,60 Q60,45 70,60", delay: 0},
      {path: "M70,60 Q85,35 100,60", delay: 100},
      {path: "M100,60 Q115,35 130,60", delay: 200},
      {path: "M130,60 Q145,45 150,60", delay: 300}
    ];
    
    wigPositions.forEach(position => {
      const wigCurl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      wigCurl.setAttribute("d", position.path);
      wigCurl.setAttribute("fill", "url(#wigGradient)");
      wigCurl.setAttribute("stroke", "#bdbdbd");
      wigCurl.setAttribute("stroke-width", "0.5");
      this.svg.appendChild(wigCurl);
      this.wigCurls.push({element: wigCurl, baseY: 60, delay: position.delay});
    });
    
    // Add a small gavel on top of the wig
    const gavelHead = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gavelHead.setAttribute("x", "90");
    gavelHead.setAttribute("y", "25");
    gavelHead.setAttribute("width", "20");
    gavelHead.setAttribute("height", "10");
    gavelHead.setAttribute("fill", "#8d6e63");
    gavelHead.setAttribute("rx", "2");
    this.svg.appendChild(gavelHead);
    
    const gavelHandle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gavelHandle.setAttribute("x", "97");
    gavelHandle.setAttribute("y", "35");
    gavelHandle.setAttribute("width", "6");
    gavelHandle.setAttribute("height", "15");
    gavelHandle.setAttribute("fill", "#a1887f");
    this.svg.appendChild(gavelHandle);
    
    // Speech bubble
    this.speechBubble = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.speechBubble.setAttribute("d", "M140,100 Q170,100 170,80 Q170,60 140,60 L130,60 L135,50 L120,60 L100,60 Q70,60 70,80 Q70,100 100,100 Z");
    this.speechBubble.setAttribute("fill", "white");
    this.speechBubble.setAttribute("stroke", "black");
    this.speechBubble.setAttribute("stroke-width", "2");
    this.svg.appendChild(this.speechBubble);
    
    // Text in speech bubble
    this.speechText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.speechText.setAttribute("x", "105");
    this.speechText.setAttribute("y", "85");
    this.speechText.setAttribute("font-family", "Arial");
    this.speechText.setAttribute("font-size", "16");
    this.speechText.setAttribute("font-weight", "bold");
    this.speechText.setAttribute("text-anchor", "middle");
    this.speechText.textContent = "Edukacija!";
    this.svg.appendChild(this.speechText);
  }
  
  addEventListeners() {
    this.svg.addEventListener("click", () => this.handleClick());
    this.svg.addEventListener("mouseover", () => this.handleMouseOver());
    this.svg.addEventListener("mouseout", () => this.handleMouseOut());
  }
  
  handleClick() {
    if (this.isAnimating) return;
    
    // Change speech bubble text
    this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
    this.speechText.textContent = this.phrases[this.currentPhrase];
    
    // Animate parrot talking
    this.isAnimating = true;
    this.animateTalking();
    
    // Play squawk sound
    this.playSquawk();
  }
  
  handleMouseOver() {
    // Scale up slightly
    this.svg.style.transform = "scale(1.05)";
    this.svg.style.transition = "transform 0.3s ease";
    
    // Move eyes to look at cursor
    this.leftEyePupil.setAttribute("cx", "83");
    this.rightEyePupil.setAttribute("cx", "123");
  }
  
  handleMouseOut() {
    // Scale back to normal
    this.svg.style.transform = "scale(1)";
    
    // Reset eyes
    this.leftEyePupil.setAttribute("cx", "80");
    this.rightEyePupil.setAttribute("cx", "120");
  }
  
  animateTalking() {
    let talkCount = 0;
    const maxTalks = 6;
    
    // Create Edukacija text that appears when beak opens
    if (!this.raraText) {
      this.raraText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      this.raraText.setAttribute("x", "100");
      this.raraText.setAttribute("y", "135");
      this.raraText.setAttribute("font-family", "Arial");
      this.raraText.setAttribute("font-size", "14");
      this.raraText.setAttribute("font-weight", "bold");
      this.raraText.setAttribute("text-anchor", "middle");
      this.raraText.setAttribute("fill", "#ff5722");
      this.raraText.textContent = "Edukacija";
      this.raraText.style.opacity = "0";
      this.svg.appendChild(this.raraText);
    }
    
    const talkInterval = setInterval(() => {
      // Open and close beak
      if (talkCount % 2 === 0) {
        this.beak.setAttribute("d", "M90,110 L100,145 L110,110"); // Open beak wider
        this.raraText.style.opacity = "1"; // Show Edukacija text
        
        // Add visual sound waves when beak is open
        if (!this.soundWaves) {
          this.soundWaves = [];
          for (let i = 0; i < 3; i++) {
            const wave = document.createElementNS("http://www.w3.org/2000/svg", "path");
            wave.setAttribute("stroke", "#ff5722");
            wave.setAttribute("stroke-width", "1.5");
            wave.setAttribute("fill", "none");
            this.svg.appendChild(wave);
            this.soundWaves.push(wave);
          }
        }
        
        // Animate sound waves
        this.soundWaves[0].setAttribute("d", `M115,125 Q120,123 125,125`);
        this.soundWaves[1].setAttribute("d", `M115,130 Q125,128 135,130`);
        this.soundWaves[2].setAttribute("d", `M115,135 Q130,133 145,135`);
        
        this.soundWaves.forEach(wave => wave.style.opacity = "1");
      } else {
        this.beak.setAttribute("d", "M90,110 L100,125 L110,110"); // Close beak
        this.raraText.style.opacity = "0"; // Hide Edukacija text
        
        // Hide sound waves
        if (this.soundWaves) {
          this.soundWaves.forEach(wave => wave.style.opacity = "0");
        }
      }
      
      talkCount++;
      
      if (talkCount >= maxTalks) {
        clearInterval(talkInterval);
        this.isAnimating = false;
      }
    }, 250); // Slightly slower to make the animation more visible
  }
  
  startIdleAnimation() {
    // Animate wig curls
    this.animateWigCurls();
    
    // Animate feathers
    this.animateFeathers();
    
    // Subtle idle animation
    setInterval(() => {
      // Blink occasionally
      if (Math.random() < 0.1) {
        this.blink();
      }
      
      // Small head movements
      if (Math.random() < 0.05) {
        this.smallHeadMovement();
      }
      
      // Occasionally say something
      if (Math.random() < 0.02 && !this.isAnimating) {
        this.handleClick();
      }
    }, 1000);
  }
  
  animateWigCurls() {
    // Animate each wig curl with a slight bobbing motion
    if (!this.wigCurls) return;
    
    this.wigCurls.forEach(curl => {
      let direction = 1;
      let offset = 0;
      
      // Create unique animation timing for each curl
      setTimeout(() => {
        setInterval(() => {
          offset += 0.2 * direction;
          
          // Change direction when reaching limits
          if (offset > 2 || offset < -2) {
            direction *= -1;
          }
          
          // Extract the path data and modify the y coordinates
          const pathData = curl.element.getAttribute("d");
          const newPath = pathData.replace(/Q(\d+),(\d+)/, (match, x, y) => {
            return `Q${x},${parseInt(y) + offset}`;
          });
          
          curl.element.setAttribute("d", newPath);
        }, 100);
      }, curl.delay);
    });
  }
  
  animateFeathers() {
    // Find all feather elements (they're the first 3 path elements)
    const featherElements = Array.from(this.svg.querySelectorAll('path')).slice(0, 3);
    
    featherElements.forEach((feather, index) => {
      let angle = 0;
      let direction = 1;
      
      // Create unique animation timing for each feather
      setTimeout(() => {
        setInterval(() => {
          angle += 0.5 * direction;
          
          // Change direction when reaching limits
          if (angle > 5 || angle < -5) {
            direction *= -1;
          }
          
          // Get the original rotation and position
          const originalTransform = feather.getAttribute("transform");
          const rotationMatch = originalTransform.match(/rotate\(([\-\d\.]+) (\d+) (\d+)\)/);
          
          if (rotationMatch) {
            const originalAngle = parseFloat(rotationMatch[1]);
            const x = rotationMatch[2];
            const y = rotationMatch[3];
            
            // Apply new rotation
            feather.setAttribute("transform", `rotate(${originalAngle + angle} ${x} ${y})`);
          }
        }, 100 + index * 50);
      }, index * 200);
    });
  }
  
  blink() {
    // Close eyes
    this.leftEyePupil.setAttribute("r", "1");
    this.rightEyePupil.setAttribute("r", "1");
    
    // Open eyes after a short delay
    setTimeout(() => {
      this.leftEyePupil.setAttribute("r", "5");
      this.rightEyePupil.setAttribute("r", "5");
    }, 150);
  }
  
  smallHeadMovement() {
    // Small random rotation
    const angle = (Math.random() * 6) - 3; // -3 to +3 degrees
    this.svg.style.transform = `rotate(${angle}deg)`;
    
    // Reset after a delay
    setTimeout(() => {
      this.svg.style.transform = "rotate(0deg)";
    }, 500);
  }
  
  playSquawk() {
    // Create a simple sound effect
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        320, audioContext.currentTime + 0.1
      );
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01, audioContext.currentTime + 0.2
      );
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not supported or blocked");
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Create parrot lawyer container in header
  const header = document.querySelector("header .container");
  const logoDiv = document.querySelector("header .logo");
  
  if (logoDiv) {
    // Clear existing content
    logoDiv.innerHTML = "";
    
    // Set ID for parrot container
    logoDiv.id = "parrot-lawyer-container";
    
    // Initialize parrot
    const parrot = new ParrotLawyer("parrot-lawyer-container");
  }
});
