document.addEventListener('DOMContentLoaded', function () {
  var confettiScript = document.createElement('script');
  confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  document.head.appendChild(confettiScript);

  var PASSING_SCORE = 16;
  var QUIZ_QUESTION_COUNT = 20;

  var cryptoPool = [
    { name: 'Bitcoin',               symbol: 'BTC',   img: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
    { name: 'Ethereum',              symbol: 'ETH',   img: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
    { name: 'XRP',                   symbol: 'XRP',   img: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
    { name: 'BNB',                   symbol: 'BNB',   img: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
    { name: 'Solana',                symbol: 'SOL',   img: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
    { name: 'Dogecoin',              symbol: 'DOGE',  img: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png' },
    { name: 'Cardano',               symbol: 'ADA',   img: 'https://assets.coingecko.com/coins/images/975/large/cardano.png' },
    { name: 'TRON',                  symbol: 'TRX',   img: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png' },
    { name: 'Polkadot',              symbol: 'DOT',   img: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png' },
    { name: 'Chainlink',             symbol: 'LINK',  img: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png' },
    { name: 'Litecoin',              symbol: 'LTC',   img: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png' },
    { name: 'Polygon',               symbol: 'MATIC', img: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png' },
    { name: 'Uniswap',               symbol: 'UNI',   img: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png' },
    { name: 'Bitcoin Cash',          symbol: 'BCH',   img: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png' },
    { name: 'Stellar',               symbol: 'XLM',   img: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png' },
    { name: 'Monero',                symbol: 'XMR',   img: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png' },
    { name: 'Cosmos',                symbol: 'ATOM',  img: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png' },
    { name: 'Avalanche',             symbol: 'AVAX',  img: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png' },
    { name: 'Near Protocol',         symbol: 'NEAR',  img: 'https://assets.coingecko.com/coins/images/10365/large/near.jpg' },
    { name: 'Algorand',              symbol: 'ALGO',  img: 'https://assets.coingecko.com/coins/images/4030/large/32x32.png' },
    { name: 'Aave',                  symbol: 'AAVE',  img: 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png' },
    { name: 'Compound',              symbol: 'COMP',  img: 'https://assets.coingecko.com/coins/images/10775/large/COMP.png' },
    { name: 'MakerDAO',              symbol: 'MKR',   img: 'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png' },
    { name: 'Synthetix',             symbol: 'SNX',   img: 'https://assets.coingecko.com/coins/images/3406/large/SNX.png' },
    { name: 'Yearn Finance',         symbol: 'YFI',   img: 'https://assets.coingecko.com/coins/images/11849/large/yfi-192x192.png' },
    { name: 'SushiSwap',             symbol: 'SUSHI', img: 'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png' },
    { name: 'Curve DAO Token',       symbol: 'CRV',   img: 'https://assets.coingecko.com/coins/images/12124/large/Curve.png' },
    { name: 'Fantom',                symbol: 'FTM',   img: 'https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png' },
    { name: 'Theta Network',         symbol: 'THETA', img: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png' },
    { name: 'Decentraland',          symbol: 'MANA',  img: 'https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png' },
    { name: 'Axie Infinity',         symbol: 'AXS',   img: 'https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png' },
    { name: 'The Sandbox',           symbol: 'SAND',  img: 'https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg' },
    { name: 'Ethereum Classic',      symbol: 'ETC',   img: 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png' },
    { name: 'EOS',                   symbol: 'EOS',   img: 'https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png' },
    { name: 'NEO',                   symbol: 'NEO',   img: 'https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png' },
    { name: 'IOTA',                  symbol: 'IOTA',  img: 'https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png' },
    { name: 'VeChain',               symbol: 'VET',   img: 'https://assets.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png' },
    { name: 'Waves',                 symbol: 'WAVES', img: 'https://assets.coingecko.com/coins/images/425/large/waves.png' },
    { name: 'Basic Attention Token', symbol: 'BAT',   img: 'https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png' },
    { name: 'Enjin Coin',            symbol: 'ENJ',   img: 'https://assets.coingecko.com/coins/images/1102/large/enjin-coin-logo.png' },
    { name: 'Zcash',                 symbol: 'ZEC',   img: 'https://assets.coingecko.com/coins/images/486/large/circle-zcash-color.png' },
    { name: 'Dash',                  symbol: 'DASH',  img: 'https://assets.coingecko.com/coins/images/19/large/dash-logo.png' },
    { name: 'OmiseGO',               symbol: 'OMG',   img: 'https://assets.coingecko.com/coins/images/776/large/OMG_Network.jpg' },
    { name: 'Loopring',              symbol: 'LRC',   img: 'https://assets.coingecko.com/coins/images/913/large/LRC.png' },
    { name: 'Ren',                   symbol: 'REN',   img: 'https://assets.coingecko.com/coins/images/11232/large/Ren.png' },
    { name: 'Filecoin',              symbol: 'FIL',   img: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png' },
    { name: '1inch',                 symbol: '1INCH', img: 'https://assets.coingecko.com/coins/images/13469/large/1inch-token.png' },
    { name: '0x Protocol',           symbol: 'ZRX',   img: 'https://assets.coingecko.com/coins/images/863/large/0x.png' },
    { name: 'Shiba Inu',             symbol: 'SHIB',  img: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png' },
    { name: 'Kyber Network',         symbol: 'KNC',   img: 'https://assets.coingecko.com/coins/images/14899/large/RwdVsGcw_400x400.jpg' },
    { name: 'Toncoin',               symbol: 'TON',   img: 'https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png' },
  ];

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

  function makeLogoImg(src, altText, cssClass, size) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = altText;
    img.className = cssClass;
    img.width = size;
    img.height = size;
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    img.onerror = function () { this.style.opacity = '0.15'; };
    return img;
  }

  window.showQuestion = function (index) {
    var question = shuffledQuestions[index];
    questionContainer.innerHTML = '';

    var questionEl = document.createElement('div');
    questionEl.className = 'question';

    var logoWrap = document.createElement('div');
    logoWrap.className = 'kviz-logo-question';
    logoWrap.appendChild(makeLogoImg(question.crypto.img, '?', 'kviz-logo-img', 120));
    var logoText = document.createElement('p');
    logoText.className = 'kviz-logo-question-text';
    logoText.textContent = 'Koja je ovo kriptovaluta?';
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
      reviewLogoWrap.appendChild(makeLogoImg(q.crypto.img, q.crypto.name, 'kviz-review-logo-img', 44));
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
