// Global constants for timer
const COUNTDOWN_TIME = 15; // 15 seconds
const BLUE_COLOR = '#3498db'; // Default blue color
const RED_COLOR = '#e74c3c'; // Red color for urgency
let activeCountdownInterval = null; // Track the active interval

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing countdown timer system');
    // Add CSS for timer display
    addTimerStyles();
    
    // Create global access for the timer function
    window.startCountdownTimer = function() {
        console.log('Global startCountdownTimer called!');
        const nextButton = document.getElementById('next-question');
        if (!nextButton) {
            console.error('Next button not found');
            return;
        }
        
        // Cancel any existing countdown
        clearExistingTimer();
        
        // Force complete button reset by recreating it
        forceResetButton(nextButton);
    };
    
    // Start the timer when quiz starts
    const startButton = document.getElementById('start-quiz-btn');
    if (startButton) {
        startButton.addEventListener('click', function() {
            setTimeout(() => window.startCountdownTimer(), 500);
        });
    }
    
    // Restart timer when quiz is restarted
    const restartButton = document.getElementById('restart-quiz-btn');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            setTimeout(() => window.startCountdownTimer(), 500);
        });
    }
});

/**
 * Add CSS styles for the timer
 */
function addTimerStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .timer-display {
            margin-left: 8px;
            font-weight: bold;
        }
        
        #next-question {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Clear any existing timer interval
 */
function clearExistingTimer() {
    if (activeCountdownInterval) {
        console.log('Clearing previous countdown interval');
        clearInterval(activeCountdownInterval);
        activeCountdownInterval = null;
    }
}

/**
 * Force a complete reset of the button by recreating it
 * @param {HTMLElement} button - The next question button
 */
function forceResetButton(button) {
    // Only proceed if we're on the questions screen
    if (document.getElementById('quiz-questions').style.display === 'none') {
        console.log('Quiz questions not visible, not starting timer');
        return;
    }
    
    // Get original button text (without timer)
    let buttonText = button.textContent.replace(/\d+$/, '').trim();
    if (buttonText.indexOf('Sljedeće') === -1 && buttonText.indexOf('Završi') === -1) {
        buttonText = 'Sljedeće pitanje';
    }
    
    // Reset button styling with no transitions temporarily
    button.style.transition = 'none';
    button.style.background = BLUE_COLOR;
    button.style.pointerEvents = 'none'; // Make sure it's non-clickable
    
    // Force a complete DOM reflow to truly reset CSS
    void button.offsetWidth;
    
    // Re-enable transitions
    button.style.transition = 'background 0.3s ease';
    
    // Set initial time and update button text
    const timeLeft = COUNTDOWN_TIME;
    button.innerHTML = `${buttonText} <span class="timer-display">${timeLeft}</span>`;
    
    // Start the actual countdown
    startCountdown(button, timeLeft);
}

/**
 * Start countdown with a new timer
 * @param {HTMLElement} button - The next question button
 * @param {number} initialTime - Initial time in seconds
 */
function startCountdown(button, initialTime) {
    console.log('Starting new countdown from', initialTime);
    
    // Create local variable to track time
    let timeLeft = initialTime;
    
    // Start a new countdown interval
    activeCountdownInterval = setInterval(() => {
        // Decrement time
        timeLeft--;
        console.log('Time left:', timeLeft);
        
        // Check if we're still on the questions page
        if (document.getElementById('quiz-questions').style.display === 'none') {
            clearInterval(activeCountdownInterval);
            activeCountdownInterval = null;
            return;
        }
        
        // Update timer display
        const timerDisplay = button.querySelector('.timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = timeLeft;
        }
        
        // Update the gradient animation
        updateTimerAnimation(button, timeLeft);
        
        // Time's up!
        if (timeLeft <= 0) {
            handleTimeUp();
        }
    }, 1000);
}

/**
 * Update the timer animation based on time left
 * @param {HTMLElement} button - The next question button
 * @param {number} timeLeft - Seconds left in the countdown
 */
function updateTimerAnimation(button, timeLeft) {
    // Calculate progress ratio (0 to 1)
    const ratio = 1 - (timeLeft / COUNTDOWN_TIME);
    
    // Apply liquid gradient effect with a fresh gradient each time
    const gradientPosition = Math.round((1 - ratio) * 100);
    button.style.background = `linear-gradient(to right, ${RED_COLOR} ${gradientPosition}%, ${BLUE_COLOR} ${gradientPosition}%)`;
    
    // Ensure the button remains non-clickable
    button.style.pointerEvents = 'none';
}

/**
 * Handle what happens when time runs out
 */
function handleTimeUp() {
    console.log('TIME UP - Moving to next question');
    
    // Clear the countdown interval
    clearExistingTimer();
    
    // Get current question information
    const currentQuestionIndex = parseInt(document.getElementById('question-number').textContent.split(' ')[1]) - 1;
    const totalQuestions = parseInt(document.getElementById('question-number').textContent.split(' ')[3]);
    console.log(`Current question: ${currentQuestionIndex + 1} of ${totalQuestions}`);
    
    // Mark as unanswered if no answer was selected
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption && window.userAnswers) {
        console.log('Question unanswered - marking as incorrect');
        window.userAnswers[currentQuestionIndex] = null;
    }
    
    // Check if this is the last question
    if (currentQuestionIndex < totalQuestions - 1) {
        // Update global question index
        window.currentQuestionIndex = currentQuestionIndex + 1;
        
        // Go to next question - this will automatically restart the timer
        setTimeout(() => {
            console.log('Going to next question, index:', window.currentQuestionIndex);
            window.showQuestion(window.currentQuestionIndex);
        }, 100); // Small delay to ensure proper sequencing
    } else {
        // Show results if this was the last question
        console.log('Last question finished - showing results');
        window.showResults();
    }
}

// Add CSS for timer display
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .timer-display {
            margin-left: 8px;
            font-weight: bold;
        }
        
        #next-question {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
