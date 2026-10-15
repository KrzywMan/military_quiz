/**
 * QUIZ MILITARNY: BWP / BMD / BTR
 * Cross-platform Progressive Web App (Windows, Android, GitHub Pages)
 * Z dynamicznym losowaniem RÓŻNYCH zdjęć z internetu w czasie rzeczywistym!
 */

(function () {
  'use strict';

  // --- 1. Sound Effects (Web Audio API) ---
  class SoundManager {
    constructor() {
      this.enabled = true;
      this.audioCtx = null;
    }

    init() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5 -> E5 -> G5
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.28);
      });
    }

    playIncorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  }

  // --- 2. Minimal Standalone QR Code Generator ---
  function renderSvgQr(text, container) {
    const encoded = encodeURIComponent(text);
    const qrImg = document.createElement('img');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encoded}&bgcolor=ffffff&color=0a0e17&margin=1`;
    qrImg.alt = 'QR Code';
    qrImg.style.width = '180px';
    qrImg.style.height = '180px';
    qrImg.style.display = 'block';
    qrImg.onerror = () => {
      container.innerHTML = `<div style="padding: 20px; font-weight: bold; color: #0f172a; text-align: center;">Otwórz w telefonie:<br><span style="font-size: 1.1rem; color: #0284c7;">${text}</span></div>`;
    };
    container.innerHTML = '';
    container.appendChild(qrImg);
  }

  // --- 3. Dynamic Online Image Pool Manager ---
  // Zarządza pobieraniem i losowaniem RÓŻNYCH zdjęć dla każdego pojazdu z sieci
  class ImagePoolManager {
    constructor() {
      // Pamięć podręczna puli zdjęć pobranych z internetu dla każdego pojazdu
      this.onlinePoolCache = {};
      this.lastUsedIndex = {};
    }

    /**
     * Wyszukuje w sieci (Wikimedia/Wikipedia API) do 15 różnych zdjęć danego pojazdu
     */
    async fetchPoolFromInternet(searchQuery) {
      if (this.onlinePoolCache[searchQuery] && this.onlinePoolCache[searchQuery].length > 0) {
        return this.onlinePoolCache[searchQuery];
      }

      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 2500);

        // Krok 1: Wyszukaj pliki graficzne pod hasłem pojazdu (CORS origin: *)
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srnamespace=6&srlimit=15&format=json&origin=*`;
        const res = await fetch(searchUrl, { signal: ctrl.signal });
        clearTimeout(tid);

        if (!res.ok) return [];
        const data = await res.json();
        const searchResults = (data.query && data.query.search) || [];
        
        const validTitles = searchResults
          .map(r => r.title)
          .filter(t => /\.(jpg|jpeg|png)$/i.test(t) && !/(flag|coat|map|icon|symbol|camo|operator|insignia)/i.test(t));

        if (validTitles.length === 0) return [];

        // Krok 2: Pobierz bezpośrednie adresy URL dla znalezionych zdjęć
        const titlesParam = validTitles.slice(0, 10).join('|');
        const urlsApi = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesParam)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
        
        const resUrls = await fetch(urlsApi);
        if (!resUrls.ok) return [];
        const urlsData = await resUrls.json();
        const pages = (urlsData.query && urlsData.query.pages) || {};

        const foundUrls = [];
        for (const pid in pages) {
          const ii = pages[pid].imageinfo;
          if (ii && ii[0] && ii[0].url) {
            foundUrls.push(ii[0].url);
          }
        }

        if (foundUrls.length > 0) {
          this.onlinePoolCache[searchQuery] = foundUrls;
          return foundUrls;
        }
      } catch (err) {
        // błąd sieci lub offline
      }

      return [];
    }

    /**
     * Losuje świeże, inne zdjęcie dla pojazdu (z internetu lub z zapasowej bazy)
     */
    async getRandomImageForVehicle(vehicleData) {
      const query = vehicleData.searchQuery || vehicleData.displayName;
      
      // 1. Pobierz/pobieraj z internetu pulę zdjęć
      const onlinePool = await this.fetchPoolFromInternet(query);

      let poolToUse = [];
      let isLiveWeb = false;

      if (onlinePool.length > 0) {
        poolToUse = onlinePool;
        isLiveWeb = true;
      } else {
        // Fallback: połączenie onlineImages oraz lokalnych images
        poolToUse = [
          ...(vehicleData.onlineImages || []),
          ...(vehicleData.images || [])
        ];
      }

      if (poolToUse.length === 0) {
        return {
          url: 'images/btr_80.jpg',
          source: 'KATALOG POJAZDÓW'
        };
      }

      // Losujemy zdjęcie, unikając natychmiastowego powtórzenia tego samego
      const lastIdx = this.lastUsedIndex[vehicleData.id] || 0;
      let randIdx = Math.floor(Math.random() * poolToUse.length);
      if (poolToUse.length > 1 && randIdx === lastIdx) {
        randIdx = (randIdx + 1) % poolToUse.length;
      }
      this.lastUsedIndex[vehicleData.id] = randIdx;

      return {
        url: poolToUse[randIdx],
        source: isLiveWeb ? `LOSOWANE Z SIECI (${randIdx + 1}/${poolToUse.length})` : 'KATALOG POJAZDÓW',
        fallback: (vehicleData.onlineImages && vehicleData.onlineImages[0]) || poolToUse[0]
      };
    }
  }

  // --- 4. Main Quiz Controller ---
  class MilitaryQuizApp {
    constructor() {
      this.sound = new SoundManager();
      this.imageManager = new ImagePoolManager();

      this.questionCount = 0;
      this.correctCount = 0;
      this.totalAnswered = 0;
      this.streak = 0;
      this.bestStreak = parseInt(localStorage.getItem('military_quiz_best') || '0', 10);

      this.currentQuestion = null;
      this.isAnsweringLocked = false;
      this.advanceTimer = null;
      this.autoAdvanceDuration = 1800;

      // DOM Elements
      this.elImage = document.getElementById('vehicle-image');
      this.elLoader = document.getElementById('image-loader');
      this.elAnswersGrid = document.getElementById('answers-grid');
      this.elFeedbackBanner = document.getElementById('feedback-banner');
      this.elFeedbackIcon = document.getElementById('feedback-icon');
      this.elFeedbackTitle = document.getElementById('feedback-title');
      this.elFeedbackDesc = document.getElementById('feedback-desc');
      this.elBtnNext = document.getElementById('btn-next-inline');
      this.elProgressFill = document.getElementById('progress-fill');
      this.elQuestionNum = document.getElementById('question-num');
      this.elTagBadge = document.getElementById('image-source-tag');
      this.elToggleAuto = document.getElementById('toggle-auto-next');
      this.elSoundBtn = document.getElementById('btn-sound');
      this.elSoundIcon = document.getElementById('sound-icon');

      // Stats Elements
      this.elStatStreak = document.getElementById('stat-streak');
      this.elStatScore = document.getElementById('stat-score');
      this.elStatAccuracy = document.getElementById('stat-accuracy');
      this.elStatBest = document.getElementById('stat-best');

      // Modal Elements
      this.elModal = document.getElementById('qr-modal');
      this.elBtnDeviceInfo = document.getElementById('btn-device-info');
      this.elBtnCloseModal = document.getElementById('btn-close-modal');
      this.elBtnModalOk = document.getElementById('btn-modal-ok');
      this.elQrCanvas = document.getElementById('qr-canvas-wrap');
      this.elNetworkUrl = document.getElementById('qr-network-url');

      this.initEvents();
      this.updateStatsUI();
      this.nextQuestion();
    }

    initEvents() {
      this.elBtnNext.addEventListener('click', () => {
        this.clearAdvanceTimer();
        this.nextQuestion();
      });

      this.elSoundBtn.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.elSoundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
      });

      this.elBtnDeviceInfo.addEventListener('click', () => this.showPairingModal());
      this.elBtnCloseModal.addEventListener('click', () => this.closePairingModal());
      this.elBtnModalOk.addEventListener('click', () => this.closePairingModal());

      document.getElementById('btn-restart').addEventListener('click', () => {
        if (confirm('Czy na pewno chcesz zresetować statystyki i rekord?')) {
          this.correctCount = 0;
          this.totalAnswered = 0;
          this.streak = 0;
          this.bestStreak = 0;
          localStorage.removeItem('military_quiz_best');
          this.updateStatsUI();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (this.elModal && !this.elModal.classList.contains('hidden')) return;

        if (e.key === ' ' || e.key === 'Enter') {
          if (!this.elFeedbackBanner.classList.contains('hidden')) {
            e.preventDefault();
            this.clearAdvanceTimer();
            this.nextQuestion();
          }
          return;
        }

        const keyMap = {
          '1': 0, 'a': 0, 'A': 0,
          '2': 1, 'b': 1, 'B': 1,
          '3': 2, 'c': 2, 'C': 2,
          '4': 3, 'd': 3, 'D': 3
        };

        if (keyMap.hasOwnProperty(e.key)) {
          const btns = this.elAnswersGrid.querySelectorAll('.answer-btn');
          const targetBtn = btns[keyMap[e.key]];
          if (targetBtn && !targetBtn.disabled) {
            targetBtn.click();
          }
        }
      });

      if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      }
    }

    /**
     * Infinite Loop Generator: 1 correct + 3 random distractors
     */
    generateQuestion() {
      const keys = [...VEHICLE_KEYS];
      
      let correctKey;
      do {
        correctKey = keys[Math.floor(Math.random() * keys.length)];
      } while (this.currentQuestion && correctKey === this.currentQuestion.correctKey && keys.length > 1);

      const remainingKeys = keys.filter(k => k !== correctKey);
      for (let i = remainingKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingKeys[i], remainingKeys[j]] = [remainingKeys[j], remainingKeys[i]];
      }
      const distractors = remainingKeys.slice(0, 3);

      const choices = [correctKey, ...distractors];
      for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
      }

      return {
        correctKey,
        vehicleData: VEHICLES_DATABASE[correctKey],
        choices
      };
    }

    /**
     * Kolejne pytanie: losuje pojazd i pobiera na bieżąco nowe zdjęcie z internetu!
     */
    async nextQuestion() {
      this.clearAdvanceTimer();
      this.isAnsweringLocked = false;
      this.questionCount++;
      this.elQuestionNum.textContent = `#${this.questionCount}`;

      this.elFeedbackBanner.className = 'feedback-banner hidden';
      this.elProgressFill.style.transition = 'none';
      this.elProgressFill.style.width = '0%';

      this.currentQuestion = this.generateQuestion();

      this.elLoader.style.display = 'flex';
      this.elImage.classList.add('hidden');

      const vData = this.currentQuestion.vehicleData;

      // Pobieramy i losujemy zdjęcie na bieżąco z internetu!
      const imgResult = await this.imageManager.getRandomImageForVehicle(vData);

      this.elTagBadge.textContent = imgResult.source;

      const tryLoad = (url, fallbackUrl) => {
        const img = new Image();
        img.onload = () => {
          this.elImage.src = url;
          this.elLoader.style.display = 'none';
          this.elImage.classList.remove('hidden');
        };
        img.onerror = () => {
          if (fallbackUrl && fallbackUrl !== url) {
            tryLoad(fallbackUrl, null);
            this.elTagBadge.textContent = 'ONLINE CDN';
          } else {
            const emergency = (vData.onlineImages && vData.onlineImages[0]) || '';
            if (emergency && emergency !== url) {
              tryLoad(emergency, null);
            }
          }
        };
        img.src = url;
      };

      tryLoad(imgResult.url, imgResult.fallback);

      this.renderAnswerButtons();
    }

    renderAnswerButtons() {
      this.elAnswersGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      this.currentQuestion.choices.forEach((choiceKey, index) => {
        const choiceData = VEHICLES_DATABASE[choiceKey];
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.dataset.key = choiceKey;

        const letterBadge = document.createElement('span');
        letterBadge.className = 'btn-letter';
        letterBadge.textContent = letters[index];

        const label = document.createElement('span');
        label.className = 'btn-label';
        label.textContent = choiceData.displayName;

        btn.appendChild(letterBadge);
        btn.appendChild(label);

        btn.addEventListener('click', () => this.handleAnswerClick(choiceKey, btn));
        this.elAnswersGrid.appendChild(btn);
      });
    }

    handleAnswerClick(chosenKey, chosenBtn) {
      if (this.isAnsweringLocked) return;
      this.isAnsweringLocked = true;

      const isCorrect = (chosenKey === this.currentQuestion.correctKey);
      const correctData = this.currentQuestion.vehicleData;
      this.totalAnswered++;

      const allBtns = this.elAnswersGrid.querySelectorAll('.answer-btn');
      allBtns.forEach(b => {
        b.disabled = true;
        if (b.dataset.key !== chosenKey && b.dataset.key !== this.currentQuestion.correctKey) {
          b.classList.add('dimmed');
        }
      });

      if (isCorrect) {
        this.correctCount++;
        this.streak++;
        if (this.streak > this.bestStreak) {
          this.bestStreak = this.streak;
          localStorage.setItem('military_quiz_best', this.bestStreak.toString());
        }

        chosenBtn.classList.add('correct');
        this.sound.playCorrect();

        this.showFeedbackBanner(
          true,
          'Świetnie! Poprawna odpowiedź!',
          `${correctData.displayName} – ${correctData.type}`
        );
      } else {
        this.streak = 0;
        chosenBtn.classList.add('incorrect');
        this.sound.playIncorrect();

        allBtns.forEach(b => {
          if (b.dataset.key === this.currentQuestion.correctKey) {
            b.classList.add('revealed-correct');
          }
        });

        const chosenData = VEHICLES_DATABASE[chosenKey];
        this.showFeedbackBanner(
          false,
          `Błąd! To jest ${correctData.displayName}`,
          `Wybrano: ${chosenData.displayName} | Poprawnie: ${correctData.displayName} (${correctData.type})`
        );
      }

      this.updateStatsUI();

      if (this.elToggleAuto.checked) {
        this.startAutoAdvanceProgress();
      }
    }

    showFeedbackBanner(isCorrect, title, desc) {
      this.elFeedbackBanner.className = `feedback-banner ${isCorrect ? 'correct' : 'incorrect'}`;
      this.elFeedbackIcon.textContent = isCorrect ? '✔' : '✖';
      this.elFeedbackTitle.textContent = title;
      this.elFeedbackDesc.textContent = desc;
    }

    startAutoAdvanceProgress() {
      this.clearAdvanceTimer();

      requestAnimationFrame(() => {
        this.elProgressFill.style.transition = `width ${this.autoAdvanceDuration}ms linear`;
        this.elProgressFill.style.width = '100%';
      });

      this.advanceTimer = setTimeout(() => {
        this.nextQuestion();
      }, this.autoAdvanceDuration);
    }

    clearAdvanceTimer() {
      if (this.advanceTimer) {
        clearTimeout(this.advanceTimer);
        this.advanceTimer = null;
      }
      this.elProgressFill.style.transition = 'none';
      this.elProgressFill.style.width = '0%';
    }

    updateStatsUI() {
      this.elStatStreak.textContent = this.streak;
      this.elStatScore.textContent = `${this.correctCount} / ${this.totalAnswered}`;
      
      const acc = this.totalAnswered > 0 
        ? Math.round((this.correctCount / this.totalAnswered) * 100) 
        : 100;
      this.elStatAccuracy.textContent = `${acc}%`;
      this.elStatBest.textContent = this.bestStreak;
    }

    async showPairingModal() {
      this.elModal.classList.remove('hidden');

      let currentUrl = window.location.href;
      try {
        const res = await fetch('./api/info');
        if (res.ok) {
          const info = await res.json();
          if (info && info.network_url) {
            currentUrl = info.network_url;
          }
        }
      } catch (e) {}

      this.elNetworkUrl.textContent = currentUrl;
      renderSvgQr(currentUrl, this.elQrCanvas);
    }

    closePairingModal() {
      this.elModal.classList.add('hidden');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.app = new MilitaryQuizApp();
  });
})();
