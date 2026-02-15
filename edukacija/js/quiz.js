document.addEventListener('DOMContentLoaded', function() {
    // Load confetti script
    const confettiScript = document.createElement('script');
    confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    document.head.appendChild(confettiScript);
    
    // Define passing score threshold
    const PASSING_SCORE = 16;
    // Quiz questions from all 9 tutorials
    const quizQuestions = [
        // Tutorial 1 - Uvod u blockchain
        {
            question: "Što je glavna karakteristika blockchain tehnologije?",
            options: [
                "Centralizirana kontrola podataka",
                "Decentralizirana struktura podataka",
                "Mogućnost brisanja transakcija",
                "Ograničen broj korisnika"
            ],
            correctAnswer: 1
        },
        {
            question: "Tko je objavio originalni Bitcoin whitepaper?",
            options: [
                "Vitalik Buterin",
                "Satoshi Nakamoto",
                "Charlie Lee",
                "Gavin Andresen"
            ],
            correctAnswer: 1
        },
        
        // Tutorial 2 - Kako funkcioniraju kriptovalute
        {
            question: "Što je rudarenje (mining) u kontekstu kriptovaluta?",
            options: [
                "Fizičko kopanje rijetkih metala",
                "Proces validacije transakcija i dodavanja novih blokova u blockchain",
                "Proces kupovine kriptovaluta",
                "Proces konverzije kriptovaluta u fiat novac"
            ],
            correctAnswer: 1
        },
        {
            question: "Koji konsenzusni mehanizam koristi Bitcoin?",
            options: [
                "Proof of Stake",
                "Proof of Authority",
                "Proof of Work",
                "Delegated Proof of Stake"
            ],
            correctAnswer: 2
        },
        
        // Tutorial 3 - Novčanici za kriptovalute
        {
            question: "Što je hardverski novčanik?",
            options: [
                "Softverska aplikacija za pohranu kriptovaluta",
                "Fizički uređaj za sigurnu pohranu privatnih ključeva",
                "Online platforma za trgovanje kriptovalutama",
                "Papirni dokument s privatnim ključem"
            ],
            correctAnswer: 1
        },
        {
            question: "Što je privatni ključ u kontekstu kriptovaluta?",
            options: [
                "Jedinstveni identifikator blockchain mreže",
                "Lozinka za pristup burzi kriptovaluta",
                "Tajni niz znakova koji omogućuje pristup i kontrolu nad kriptovalutama",
                "Javna adresa za primanje kriptovaluta"
            ],
            correctAnswer: 2
        },
        
        // Tutorial 4 - Najpoznatije kriptovalute
        {
            question: "Koja kriptovaluta je prva uvela koncept pametnih ugovora?",
            options: [
                "Bitcoin",
                "Ethereum",
                "Litecoin",
                "Ripple"
            ],
            correctAnswer: 1
        },
        {
            question: "Koja je najpoznatija i prva kriptovaluta?",
            options: [
                "Ethereum",
                "Bitcoin",
                "Dogecoin",
                "Litecoin"
            ],
            correctAnswer: 1
        },
        
        // Tutorial 5 - Prednosti i izazovi kriptovaluta
        {
            question: "Koja je jedna od glavnih prednosti kriptovaluta?",
            options: [
                "Centralizirana kontrola",
                "Visoke naknade za transakcije",
                "Decentralizacija i otpornost na cenzuru",
                "Stabilnost vrijednosti"
            ],
            correctAnswer: 2
        },
        {
            question: "Koji konsenzusni mehanizam trenutno koristi Ethereum?",
            options: [
                "Proof of Work (PoW)",
                "Proof of Stake (PoS)",
                "Delegated Proof of Stake (DPoS)",
                "Proof of Authority (PoA)"
            ],
            correctAnswer: 1
        },
        
        // Tutorial 6 - Pravni i regulatorni okvir
        {
            question: "Što je MiCA?",
            options: [
                "Međunarodni centar za analizu kriptovaluta",
                "Uredba EU o tržištima kriptoimovine",
                "Metoda za identifikaciju crypto adresa",
                "Mobilna aplikacija za praćenje cijena kriptovaluta"
            ],
            correctAnswer: 1
        },
        {
            question: "Koje obveze u Hrvatskoj imaju pružatelji usluga vezanih uz kriptovalute?",
            options: [
                "Nemaju nikakve obveze",
                "Moraju se registrirati samo kod HNB-a",
                "Moraju se registrirati kod HANFA-e i provoditi mjere sprječavanja pranja novca",
                "Moraju prihvaćati samo kune kao sredstvo plaćanja"
            ],
            correctAnswer: 2
        },
        
        // Tutorial 7 - Primjene blockchaina izvan financija
        {
            question: "Koja je primjena blockchain tehnologije u zdravstvu?",
            options: [
                "Samo za naplatu usluga",
                "Sigurna pohrana i dijeljenje medicinskih podataka",
                "Isključivo za praćenje lijekova",
                "Blockchain se ne koristi u zdravstvu"
            ],
            correctAnswer: 1
        },
        {
            question: "Što su pametni ugovori?",
            options: [
                "Tradicionalni pravni ugovori pisani jednostavnim jezikom",
                "Samoprovodivi digitalni ugovori koji se izvršavaju automatski kada su ispunjeni određeni uvjeti",
                "Ugovori koji zahtijevaju odobrenje odvjetnika",
                "Ugovori koji se mogu mijenjati nakon potpisivanja"
            ],
            correctAnswer: 1
        },
        
        // Tutorial 8 - Praktični savjeti i upozorenja
        {
            question: "Koja je preporučena praksa za sigurno čuvanje kriptovaluta?",
            options: [
                "Čuvanje svih kriptovaluta na burzi",
                "Zapisivanje privatnih ključeva na računalu",
                "Korištenje hardverskog novčanika i sigurno čuvanje seed fraze",
                "Dijeljenje privatnih ključeva s prijateljima radi sigurnosti"
            ],
            correctAnswer: 2
        },
        {
            question: "Koji je znak potencijalne prevare u svijetu kriptovaluta?",
            options: [
                "Obećanje garantiranog povrata investicije",
                "Transparentni kod projekta",
                "Jasno definirani ciljevi projekta",
                "Aktivna zajednica korisnika"
            ],
            correctAnswer: 0
        },
        
        // Tutorial 9 - Zaključak i budućnost
        {
            question: "Što je važno za budućnost blockchain tehnologije?",
            options: [
                "Korištenje isključivo za kriptovalute",
                "Razvoj novih primjena i regulatorni okvir",
                "Potpuno ukidanje regulacije",
                "Ograničavanje pristupa samo na banke"
            ],
            correctAnswer: 1
        },
        {
            question: "Koji porezni tretman imaju kriptovalute u Hrvatskoj?",
            options: [
                "Ne podliježu nikakvom oporezivanju",
                "Oporezuju se po stopi od 10% plus prirez, uz određena oslobođenja",
                "Oporezuju se jednako kao dionice po stopi od 25%",
                "Oporezuju se samo ako se koriste za plaćanje robe i usluga"
            ],
            correctAnswer: 1
        },
        {
            question: "Što su CBDC (Central Bank Digital Currencies)?",
            options: [
                "Privatne kriptovalute koje izdaju banke",
                "Digitalne valute koje izdaju središnje banke temeljene na blockchain tehnologiji",
                "Međunarodna udruženja za regulaciju kriptovaluta",
                "Certifikati za blockchain developere"
            ],
            correctAnswer: 1
        },
        {
            question: "Koje obveze imaju pružatelji usluga povezani s kriptovalutama prema AML/CFT propisima?",
            options: [
                "Nemaju nikakve obveze jer kriptovalute nisu službeno sredstvo plaćanja",
                "Samo ograničavanje transakcija na iznose manje od 1000 eura",
                "Provođenje dubinske analize stranaka (KYC) i praćenje sumnjivih transakcija",
                "Isključivo izvještavanje porezne uprave o godišnjim prihodima"
            ],
            correctAnswer: 2
        }
    ];
    
    // DOM elements
    const startScreen = document.getElementById('quiz-start-screen');
    const questionsScreen = document.getElementById('quiz-questions');
    const resultsScreen = document.getElementById('quiz-results');
    const startButton = document.getElementById('start-quiz-btn');
    const questionContainer = document.getElementById('question-container');
    const questionNumber = document.getElementById('question-number');
    const correctAnswers = document.getElementById('correct-answers');
    const totalQuestions = document.getElementById('total-questions');
    const scorePercentage = document.getElementById('score-percentage');
    const restartButton = document.getElementById('restart-quiz-btn');
    
    // Quiz state - expose variables for countdown-timer.js
    window.currentQuestionIndex = 0;
    window.userAnswers = [];
    window.shuffledQuestions = [];
    
    // Local references for convenience
    let currentQuestionIndex = window.currentQuestionIndex;
    let userAnswers = window.userAnswers;
    let shuffledQuestions = window.shuffledQuestions;
    
    // Initialize quiz
    function initQuiz() {
        // Reset state
        currentQuestionIndex = 0;
        userAnswers = Array(quizQuestions.length).fill(null);
        
        // Shuffle questions
        shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
        
        // Update total questions count
        totalQuestions.textContent = shuffledQuestions.length;
        
        // Show first question
        showQuestion(currentQuestionIndex);
    }
    
    // Show question - exposed for countdown-timer.js
    window.showQuestion = function(index) {
        console.log('Showing question', index + 1);
        const question = shuffledQuestions[index];
        questionContainer.innerHTML = '';
        
        // Create question element
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `<h4>${index + 1}. ${question.question}</h4>`;
        
        // Create options
        const optionsList = document.createElement('ul');
        optionsList.className = 'options';
        
        question.options.forEach((option, i) => {
            const optionItem = document.createElement('li');
            optionItem.className = 'option';
            if (userAnswers[index] === i) {
                optionItem.classList.add('selected');
            }
            optionItem.textContent = option;
            optionItem.addEventListener('click', () => selectOption(index, i));
            optionsList.appendChild(optionItem);
        });
        
        questionElement.appendChild(optionsList);
        questionContainer.appendChild(questionElement);
        
        // Update question number
        questionNumber.textContent = `Pitanje ${index + 1} od ${shuffledQuestions.length}`;
        
        // Update local reference
        currentQuestionIndex = index;
    }
    
    // Select option - automatically advances to next question
    window.selectOption = function(questionIndex, optionIndex) {
        userAnswers[questionIndex] = optionIndex;
        
        // Update UI to show selected option
        const options = document.querySelectorAll('.option');
        options.forEach((option, i) => {
            if (i === optionIndex) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
        
        // Wait a brief moment to show the selection before advancing
        setTimeout(() => {
            // Check if this is the last question
            if (questionIndex < shuffledQuestions.length - 1) {
                // Move to next question
                currentQuestionIndex = questionIndex + 1;
                window.currentQuestionIndex = currentQuestionIndex;
                showQuestion(currentQuestionIndex);
                // Timer will be reset by the showQuestion function
            } else {
                // Show results if this was the last question
                window.showResults();
            }
        }, 300); // Short delay to show the selection
    };
    
    // Calculate score
    function calculateScore() {
        let score = 0;
        shuffledQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });
        return score;
    }
    
    // Show results - exposed to be used by countdown-timer.js
    window.showResults = function() {
        const score = calculateScore();
        correctAnswers.textContent = score;
        
        // Create percentage bar
        const percentage = (score / shuffledQuestions.length) * 100;
        scorePercentage.innerHTML = `<div style="width: ${percentage}%;"></div>`;
        
        // Add percentage text
        const percentageText = document.createElement('p');
        percentageText.textContent = `Točnost: ${percentage.toFixed(1)}%`;
        
        // Add pass/fail message
        const passFailMessage = document.createElement('p');
        if (score >= PASSING_SCORE) {
            passFailMessage.innerHTML = `<strong style="color: #2ecc71">Čestitamo! Uspješno ste položili kviz!</strong>`;
            
            // Trigger confetti celebration if score is 16 or higher
            if (typeof confetti === 'function') {
                setTimeout(() => {
                    const duration = 5 * 1000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                    function randomInRange(min, max) {
                        return Math.random() * (max - min) + min;
                    }

                    const interval = setInterval(function() {
                        const timeLeft = animationEnd - Date.now();

                        if (timeLeft <= 0) {
                            return clearInterval(interval);
                        }

                        const particleCount = 50 * (timeLeft / duration);
                        
                        // Use different colors
                        confetti(Object.assign({}, defaults, { 
                            particleCount, 
                            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                            colors: ['#fd79a8', '#6c5ce7', '#a29bfe', '#00cec9']
                        }));
                        confetti(Object.assign({}, defaults, { 
                            particleCount, 
                            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                            colors: ['#fd79a8', '#6c5ce7', '#a29bfe', '#00cec9']
                        }));
                    }, 250);
                }, 500);
            }
        } else {
            passFailMessage.innerHTML = `<strong style="color: #e74c3c">Nažalost, niste položili kviz. Potrebno je minimalno ${PASSING_SCORE} točnih odgovora.</strong>`;
        }
        
        // Ukloni prethodni pregled i dinamičke poruke (pri ponovnom pokretanju kviza)
        const existingReview = document.querySelector('.answers-review');
        if (existingReview) existingReview.remove();
        document.querySelectorAll('.quiz-dynamic-message').forEach(el => el.remove());
        
        passFailMessage.classList.add('quiz-dynamic-message');
        percentageText.classList.add('quiz-dynamic-message');
        scorePercentage.after(passFailMessage);
        passFailMessage.after(percentageText);
        
        // Create review of answers
        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'answers-review';
        reviewContainer.innerHTML = '<h4>Pregled odgovora:</h4>';
        
        shuffledQuestions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const isUnanswered = userAnswer === null;
            
            const questionReview = document.createElement('div');
            questionReview.className = `question-review ${isCorrect ? 'correct' : 'incorrect'}`;
            if (isUnanswered) {
                questionReview.classList.add('unanswered');
            }
            
            // Question text
            const questionText = document.createElement('p');
            questionText.className = 'review-question';
            questionText.innerHTML = `<strong>${index + 1}. ${question.question}</strong>`;
            questionReview.appendChild(questionText);
            
            // User's answer
            if (userAnswer !== null) {
                const statusText = document.createElement('p');
                statusText.className = 'user-answer';
                statusText.innerHTML = isCorrect
                    ? `<span class="correct-text">Vaš odgovor je točan.</span>`
                    : `<span class="incorrect-text">Vaš odgovor je netočan.</span>`;
                questionReview.appendChild(statusText);
                const answerText = document.createElement('p');
                answerText.className = 'user-answer';
                answerText.innerHTML = `Vaš odgovor: <span class="${isCorrect ? 'correct-text' : 'incorrect-text'}">${question.options[userAnswer]}</span>`;
                questionReview.appendChild(answerText);
            } else {
                const userAnswerText = document.createElement('p');
                userAnswerText.className = 'user-answer';
                userAnswerText.innerHTML = `<span class="unanswered-text">Nije odgovoreno - vrijeme je isteklo</span>`;
                questionReview.appendChild(userAnswerText);
            }
            
            // Correct answer (only show if user was wrong or didn't answer)
            if (!isCorrect) {
                const correctAnswerText = document.createElement('p');
                correctAnswerText.className = 'correct-answer';
                correctAnswerText.innerHTML = `Točan odgovor: <span class="correct-text">${question.options[question.correctAnswer]}</span>`;
                questionReview.appendChild(correctAnswerText);
            }
            
            reviewContainer.appendChild(questionReview);
        });
        
        // Add review to results
        document.getElementById('quiz-results').insertBefore(reviewContainer, document.getElementById('restart-quiz-btn'));
        
        // Show results screen
        questionsScreen.style.display = 'none';
        resultsScreen.style.display = 'block';
    }
    
    // Event listeners
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        questionsScreen.style.display = 'block';
        initQuiz();
    });
    
    // Remove previous button functionality (ako postoji)
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    if (prevButton) prevButton.style.display = 'none';
    if (nextButton) nextButton.addEventListener('click', () => {});
    
    restartButton.addEventListener('click', () => {
        resultsScreen.style.display = 'none';
        questionsScreen.style.display = 'block';
        initQuiz();
    });
});
