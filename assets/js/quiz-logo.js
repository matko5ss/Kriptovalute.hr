document.addEventListener('DOMContentLoaded', function () {
  var confettiScript = document.createElement('script');
  confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  document.head.appendChild(confettiScript);

  var PASSING_SCORE = 16;
  var QUIZ_QUESTION_COUNT = 20;
  var ICON_BASE = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/';

  var cryptoPool = [
    { name: 'Bitcoin',              symbol: 'BTC'   },
    { name: 'Ethereum',             symbol: 'ETH'   },
    { name: 'XRP',                  symbol: 'XRP'   },
    { name: 'BNB',                  symbol: 'BNB'   },
    { name: 'Solana',               symbol: 'SOL'   },
    { name: 'Dogecoin',             symbol: 'DOGE'  },
    { name: 'Cardano',              symbol: 'ADA'   },
    { name: 'TRON',                 symbol: 'TRX'   },
    { name: 'Polkadot',             symbol: 'DOT'   },
    { name: 'Chainlink',            symbol: 'LINK'  },
    { name: 'Litecoin',             symbol: 'LTC'   },
    { name: 'Polygon',              symbol: 'MATIC' },
    { name: 'Uniswap',              symbol: 'UNI'   },
    { name: 'Bitcoin Cash',         symbol: 'BCH'   },
    { name: 'Stellar',              symbol: 'XLM'   },
    { name: 'Monero',               symbol: 'XMR'   },
    { name: 'Cosmos',               symbol: 'ATOM'  },
    { name: 'Avalanche',            symbol: 'AVAX'  },
    { name: 'Near Protocol',        symbol: 'NEAR'  },
    { name: 'Algorand',             symbol: 'ALGO'  },
    { name: 'Aave',                 symbol: 'AAVE'  },
    { name: 'Compound',             symbol: 'COMP'  },
    { name: 'MakerDAO',             symbol: 'MKR'   },
    { name: 'Synthetix',            symbol: 'SNX'   },
    { name: 'Yearn Finance',        symbol: 'YFI'   },
    { name: 'SushiSwap',            symbol: 'SUSHI' },
    { name: 'Curve DAO Token',      symbol: 'CRV'   },
    { name: 'Fantom',               symbol: 'FTM'   },
    { name: 'Theta Network',        symbol: 'THETA' },
    { name: 'Decentraland',         symbol: 'MANA'  },
    { name: 'Axie Infinity',        symbol: 'AXS'   },
    { name: 'The Sandbox',          symbol: 'SAND'  },
    { name: 'Ethereum Classic',     symbol: 'ETC'   },
    { name: 'EOS',                  symbol: 'EOS'   },
    { name: 'NEO',                  symbol: 'NEO'   },
    { name: 'IOTA',                 symbol: 'IOTA'  },
    { name: 'VeChain',              symbol: 'VET'   },
    { name: 'Waves',                symbol: 'WAVES' },
    { name: 'Basic Attention Token',symbol: 'BAT'   },
    { name: 'Enjin Coin',           symbol: 'ENJ'   },
    { name: 'Zcash',                symbol: 'ZEC'   },
    { name: 'Dash',                 symbol: 'DASH'  },
    { name: 'OmiseGO',              symbol: 'OMG'   },
    { name: 'Loopring',             symbol: 'LRC'   },
    { name: 'Ren',                  symbol: 'REN'   },
    { name: 'Filecoin',             symbol: 'FIL'   },
    { name: '1inch',                symbol: '1INCH' },
    { name: 'Kyber Network',        symbol: 'KNC'   },
    { name: '0x Protocol',          symbol: 'ZRX'   },
    { name: 'Shiba Inu',            symbol: 'SHIB'  },
  ].map(function (c) {
    return { name: c.name, symbol: c.symbol, img: ICON_BASE + c.symbol.toLowerCase() + '.svg' };
  });

  function shuffle(arr) {
    return arr.slice().sort(function () { return Math.random() - 0.5; });
  }

  function generateQuestions() {
    var selected = shuffle(cryptoPool).slice(0, QUIZ_QUESTION_COUNT);
    return selected.map(function (crypto) {
      var others = cryptoPool.filter(function (c) { return c.symbol !== crypto.symbol; });
      var wrong = shuffle(others).slice(0, 3);
      var correctIndex = Math.floor(Math.random() * 4);
      var options = wrong.map(function (c) { return c.name; });
      options.splice(correctIndex, 0, crypto.name);
      return { crypto: crypto, options: options, correctAnswer: correctIndex };
    });
  }

  var startScreen      = document.getElementById('quiz-start-screen');
  var questionsScreen  = document.getElementById('quiz-questions');
  var resultsScreen    = document.getElementById('quiz-results');
  var startButton      = document.getElementById('start-quiz-btn');
  var questionContainer= document.getElementById('question-container');
  var questionNumber   = document.getElementById('question-number');
  var correctAnswersEl = document.getElementById('correct-answers');
  var totalQuestionsEl = document.getElementById('total-questions');
  var scorePercentage  = document.getElementById('score-percentage');
  var restartButton    = document.getElementById('restart-quiz-btn');
  var restartMidWrap   = document.getElementById('restart-quiz-mid-wrap');
  var confirmModal     = document.getElementById('kviz-confirm-modal');

  window.currentQuestionIndex = 0;
  window.userAnswers = [];
  window.shuffledQuestions = [];

  var currentQuestionIndex = 0;
  var userAnswers = [];
  var shuffledQuestions = [];

  function initQuiz() {
    currentQuestionIndex = 0;
    shuffledQuestions = generateQuestions();
    window.shuffledQuestions = shuffledQuestions;
    userAnswers = Array(shuffledQuestions.length).fill(null);
    window.userAnswers = userAnswers;
    totalQuestionsEl.textContent = shuffledQuestions.length;
    if (restartMidWrap) restartMidWrap.style.display = 'block';
    showQuestion(0);
  }

  window.showQuestion = function (index) {
    var question = shuffledQuestions[index];
    questionContainer.innerHTML = '';

    var questionEl = document.createElement('div');
    questionEl.className = 'question';

    var logoWrap = document.createElement('div');
    logoWrap.className = 'kviz-logo-question';
    var img = document.createElement('img');
    img.src = question.crypto.img;
    img.alt = '?';
    img.className = 'kviz-logo-img';
    img.width = 120;
    img.height = 120;
    img.onerror = function () { this.style.opacity = '0.15'; };
    var logoText = document.createElement('p');
    logoText.className = 'kviz-logo-question-text';
    logoText.textContent = 'Koja je ovo kriptovaluta?';
    logoWrap.appendChild(img);
    logoWrap.appendChild(logoText);
    questionEl.appendChild(logoWrap);

    var optionsList = document.createElement('ul');
    optionsList.className = 'options';
    question.options.forEach(function (option, i) {
      var li = document.createElement('li');
      li.className = 'option';
      if (userAnswers[index] === i) li.classList.add('selected');
      li.textContent = option;
      li.addEventListener('click', function () { selectOption(index, i); });
      optionsList.appendChild(li);
    });
    questionEl.appendChild(optionsList);
    questionContainer.appendChild(questionEl);

    questionNumber.textContent = 'Pitanje ' + (index + 1) + ' od ' + shuffledQuestions.length;
    var progressFill = document.getElementById('kviz-progress-fill');
    if (progressFill) progressFill.style.width = ((index + 1) / shuffledQuestions.length * 100) + '%';
    currentQuestionIndex = index;
    window.currentQuestionIndex = index;
  };

  window.selectOption = function (questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    window.userAnswers = userAnswers;
    var options = document.querySelectorAll('.option');
    options.forEach(function (opt, i) {
      opt.classList.toggle('selected', i === optionIndex);
    });
    setTimeout(function () {
      if (questionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex = questionIndex + 1;
        window.currentQuestionIndex = currentQuestionIndex;
        showQuestion(currentQuestionIndex);
      } else {
        window.showResults();
      }
    }, 300);
  };

  function calculateScore() {
    var score = 0;
    shuffledQuestions.forEach(function (q, i) {
      if (userAnswers[i] === q.correctAnswer) score++;
    });
    return score;
  }

  window.showResults = function () {
    var score = calculateScore();
    correctAnswersEl.textContent = score;
    var percentage = (score / shuffledQuestions.length) * 100;
    scorePercentage.innerHTML = '<div style="width:' + percentage + '%;"></div>';

    var percentageText = document.createElement('p');
    percentageText.textContent = 'Točnost: ' + percentage.toFixed(1) + '%';
    percentageText.classList.add('quiz-dynamic-message');

    var passFailMessage = document.createElement('p');
    passFailMessage.classList.add('quiz-dynamic-message');

    if (score >= PASSING_SCORE) {
      passFailMessage.innerHTML = '<strong style="color:#2ecc71">Čestitamo! Uspješno ste položili kviz!</strong>';
      if (typeof confetti === 'function') {
        setTimeout(function () {
          var duration = 5000;
          var animationEnd = Date.now() + duration;
          var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };
          function rnd(a, b) { return Math.random() * (b - a) + a; }
          var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount: particleCount, origin: { x: rnd(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#fd79a8', '#6c5ce7', '#a29bfe', '#00cec9'] }));
            confetti(Object.assign({}, defaults, { particleCount: particleCount, origin: { x: rnd(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#fd79a8', '#6c5ce7', '#a29bfe', '#00cec9'] }));
          }, 250);
        }, 500);
      }
    } else {
      passFailMessage.innerHTML = '<strong style="color:#e74c3c">Nažalost, niste položili kviz. Potrebno je minimalno ' + PASSING_SCORE + ' točnih odgovora.</strong>';
    }

    document.querySelectorAll('.answers-review, .quiz-dynamic-message').forEach(function (el) { el.remove(); });
    scorePercentage.after(passFailMessage);
    passFailMessage.after(percentageText);

    var reviewContainer = document.createElement('div');
    reviewContainer.className = 'answers-review';
    reviewContainer.innerHTML = '<h4>Pregled odgovora:</h4>';

    shuffledQuestions.forEach(function (q, i) {
      var userAnswer = userAnswers[i];
      var isCorrect = userAnswer === q.correctAnswer;
      var qReview = document.createElement('div');
      qReview.className = 'question-review ' + (isCorrect ? 'correct' : 'incorrect');

      var reviewLogoWrap = document.createElement('div');
      reviewLogoWrap.className = 'kviz-review-logo';
      var reviewImg = document.createElement('img');
      reviewImg.src = q.crypto.img;
      reviewImg.alt = q.crypto.name;
      reviewImg.className = 'kviz-review-logo-img';
      reviewImg.onerror = function () { this.style.opacity = '0.15'; };
      reviewLogoWrap.appendChild(reviewImg);
      qReview.appendChild(reviewLogoWrap);

      var qText = document.createElement('p');
      qText.className = 'review-question';
      qText.innerHTML = '<strong>' + (i + 1) + '. ' + q.crypto.name + ' (' + q.crypto.symbol + ')</strong>';
      qReview.appendChild(qText);

      if (userAnswer !== null) {
        var statusText = document.createElement('p');
        statusText.className = 'user-answer';
        statusText.innerHTML = isCorrect
          ? '<span class="correct-text">Točan odgovor!</span>'
          : '<span class="incorrect-text">Netočan. Odabrali ste: ' + q.options[userAnswer] + '</span>';
        qReview.appendChild(statusText);
      }

      if (!isCorrect) {
        var correctText = document.createElement('p');
        correctText.className = 'correct-answer';
        correctText.innerHTML = 'Točan odgovor: <span class="correct-text">' + q.crypto.name + '</span>';
        qReview.appendChild(correctText);
      }

      reviewContainer.appendChild(qReview);
    });

    document.getElementById('quiz-results').appendChild(reviewContainer);
    questionsScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
  };

  startButton.addEventListener('click', function () {
    startScreen.style.display = 'none';
    questionsScreen.style.display = 'block';
    initQuiz();
  });

  restartButton.addEventListener('click', function () {
    document.querySelectorAll('.answers-review, .quiz-dynamic-message').forEach(function (el) { el.remove(); });
    resultsScreen.style.display = 'none';
    questionsScreen.style.display = 'block';
    initQuiz();
  });

  var restartMidBtn = document.getElementById('restart-quiz-mid-btn');
  if (restartMidBtn && confirmModal) {
    restartMidBtn.addEventListener('click', function () { confirmModal.style.display = 'flex'; });
    document.getElementById('kviz-confirm-cancel').addEventListener('click', function () { confirmModal.style.display = 'none'; });
    document.getElementById('kviz-confirm-ok').addEventListener('click', function () {
      confirmModal.style.display = 'none';
      document.querySelectorAll('.answers-review, .quiz-dynamic-message').forEach(function (el) { el.remove(); });
      resultsScreen.style.display = 'none';
      questionsScreen.style.display = 'block';
      initQuiz();
    });
  }
});
