/**
 * QUIZ MILITARNY: BWP / BMD / BTR
 * Cross-platform Progressive Web App (Windows, Android, GitHub Pages)
 */

(function () {
  'use strict';

  // --- 1. Sound Effects (Web Audio API - No external files needed) ---
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

  // --- 2. Minimal Standalone SVG QR Code Generator ---
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

  // --- 3. Main Quiz Controller ---
  class MilitaryQuizApp {
    constructor() {
      this.sound = new SoundManager();
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
      // Inline next button
      this.elBtnNext.addEventListener('click', () => {
        this.clearAdvanceTimer();
        this.nextQuestion();
      });

      // Sound toggle
      this.elSoundBtn.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.elSoundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
      });

      // Device info / Android modal
      this.elBtnDeviceInfo.addEventListener('click', () => this.showPairingModal());
      this.elBtnCloseModal.addEventListener('click', () => this.closePairingModal());
      this.elBtnModalOk.addEventListener('click', () => this.closePairingModal());

      // Restart stats
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

      // Keyboard navigation
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

      // Register Service Worker for PWA
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

      const vehicleData = VEHICLES_DATABASE[correctKey];
      
      // Select local image and online fallback
      const localImages = vehicleData.images || [];
      const onlineImages = vehicleData.onlineImages || [];
      
      const selectedLocal = localImages.length > 0
        ? localImages[Math.floor(Math.random() * localImages.length)]
        : null;

      const selectedOnline = onlineImages.length > 0
        ? onlineImages[Math.floor(Math.random() * onlineImages.length)]
        : null;

      return {
        correctKey,
        vehicleData,
        choices,
        selectedLocal,
        selectedOnline
      };
    }

    /**
     * Live image fetcher working both with local server and directly on GitHub Pages!
     */
    async fetchLiveImage(correctKey, wikiTitle) {
      // 1. Try local Python server API first (if running with server.py)
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 800);
        const res = await fetch(`./api/search_image?query=${encodeURIComponent(correctKey)}`, { signal: ctrl.signal });
        clearTimeout(tid);
        if (res.ok) {
          const data = await res.json();
          if (data && data.url) {
            return { url: data.url, source: data.source || 'LIVE GOOGLE / WEB' };
          }
        }
      } catch (e) {
        // Not running on local server (e.g. GitHub Pages)
      }

      // 2. Direct client-side fetch from Wikipedia REST API (CORS enabled for all domains!)
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 1800);
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`, {
          signal: ctrl.signal
        });
        clearTimeout(tid);
        if (res.ok) {
          const data = await res.json();
          const imgUrl = data.thumbnail?.source || data.originalimage?.source;
          if (imgUrl) {
            return { url: imgUrl.split('?')[0], source: 'LIVE GOOGLE / WEB' };
          }
        }
      } catch (e) {
        // Network timeout / offline
      }

      return null;
    }

    /**
     * Next question in the infinite loop
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
      let targetUrl = null;
      let sourceText = 'KATALOG POJAZDÓW';

      // 1. Attempt live fetch
      const liveResult = await this.fetchLiveImage(this.currentQuestion.correctKey, vData.wikiTitle || vData.displayName);
      if (liveResult && liveResult.url) {
        targetUrl = liveResult.url;
        sourceText = liveResult.source;
      } else {
        // 2. Try online CDN image first (best for GitHub Pages)
        targetUrl = this.currentQuestion.selectedOnline || this.currentQuestion.selectedLocal;
        sourceText = 'KATALOG POJAZDÓW';
      }

      this.elTagBadge.textContent = sourceText;

      // Try loading the selected targetUrl
      const tryLoad = (url, fallbackUrl) => {
        const img = new Image();
        img.onload = () => {
          this.elImage.src = url;
          this.elLoader.style.display = 'none';
          this.elImage.classList.remove('hidden');
        };
        img.onerror = () => {
          if (fallbackUrl && fallbackUrl !== url) {
            // Try fallback (e.g. online CDN if local file was not uploaded to GitHub)
            tryLoad(fallbackUrl, null);
            this.elTagBadge.textContent = 'ONLINE CDN';
          } else {
            // Last resort: another online image
            const emergency = (vData.onlineImages && vData.onlineImages[0]) || '';
            if (emergency && emergency !== url) {
              tryLoad(emergency, null);
            }
          }
        };
        img.src = url;
      };

      tryLoad(targetUrl, this.currentQuestion.selectedOnline);

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
