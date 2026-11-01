// ========================================================
// Vanity - Content Script (Ultra Performance & Zero Lag)
// ========================================================

(function () {
  const DEFAULT_SETTINGS = {
    enabled: true,
    lastMessagesPreview: true,
    allMessages: false,
    userNames: false,
    profilePictures: false,
    mediaPreview: false,
    textInput: false,
    blurStrength: 5,
    unblurDelay: 0.4,
    autoLockMinutes: 0,
    lockPassword: "",
    isLocked: false
  };

  let currentSettings = { ...DEFAULT_SETTINGS };
  let idleTimer = null;
  let lockOverlay = null;

  // 1. Apply classes and styles to documentElement (Zero DOM mutations or overhead on scroll)
  function applyStyles(settings) {
    const root = document.documentElement;

    if (!settings.enabled) {
      root.classList.remove('wa-active');
      return;
    }

    root.classList.add('wa-active');

    // Blur toggles
    toggleRootClass(root, 'wa-blur-preview', settings.lastMessagesPreview);
    toggleRootClass(root, 'wa-blur-messages', settings.allMessages);
    toggleRootClass(root, 'wa-blur-names', settings.userNames);
    toggleRootClass(root, 'wa-blur-photos', settings.profilePictures);
    toggleRootClass(root, 'wa-blur-media', settings.mediaPreview);
    toggleRootClass(root, 'wa-blur-input', settings.textInput);

    // Dynamic blur strength & unblur delay (Optimized for smooth rendering)
    const strength = settings.blurStrength || 5;
    const delay = settings.unblurDelay !== undefined ? settings.unblurDelay : 0.4;
    root.style.setProperty('--wa-blur-preview-val', `${Math.min(5, strength)}px`);
    root.style.setProperty('--wa-blur-messages-val', `${strength}px`);
    root.style.setProperty('--wa-blur-names-val', `${Math.max(4, strength - 1)}px`);
    root.style.setProperty('--wa-blur-photos-val', `${Math.min(5, Math.max(4, strength - 1))}px`);
    root.style.setProperty('--wa-blur-media-val', `${Math.max(10, strength + 4)}px`);
    root.style.setProperty('--wa-blur-input-val', `${Math.max(4, strength)}px`);
    root.style.setProperty('--wa-unblur-delay', `${delay}s`);

    // Lock screen status
    updateLockState(settings.isLocked);
    resetIdleTracker();
  }

  function toggleRootClass(el, className, condition) {
    if (condition) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  }

  // 2. Lock Screen Implementation
  function createLockScreen() {
    if (document.getElementById('wa-privacy-lock-screen')) return;

    lockOverlay = document.createElement('div');
    lockOverlay.id = 'wa-privacy-lock-screen';

    lockOverlay.innerHTML = `
      <div class="wa-lock-card">
        <div class="wa-lock-icon">
          <svg viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <h2 class="wa-lock-title">WhatsApp Terkunci</h2>
        <p class="wa-lock-subtitle">Mode privasi aktif. Buka kunci untuk melihat chat.</p>
        
        <div class="wa-lock-password-container" id="wa-password-container" style="display: none;">
          <input type="password" id="wa-lock-input" class="wa-lock-input" placeholder="Masukkan Password" autocomplete="off" />
          <div class="wa-lock-error" id="wa-lock-error">Password salah!</div>
        </div>

        <button class="wa-unlock-btn" id="wa-unlock-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>
          </svg>
          Buka Kunci
        </button>
        <span class="wa-lock-hint">Tekan <b>Alt + X</b> untuk kunci/buka layar</span>
      </div>
    `;

    document.body.appendChild(lockOverlay);

    const unlockBtn = document.getElementById('wa-unlock-btn');
    const lockInput = document.getElementById('wa-lock-input');
    const errorDiv = document.getElementById('wa-lock-error');

    function attemptUnlock() {
      if (currentSettings.lockPassword && currentSettings.lockPassword.trim() !== '') {
        if (lockInput.value === currentSettings.lockPassword) {
          errorDiv.style.display = 'none';
          lockInput.value = '';
          unlockScreen();
        } else {
          errorDiv.style.display = 'block';
          lockInput.focus();
        }
      } else {
        unlockScreen();
      }
    }

    unlockBtn.addEventListener('click', attemptUnlock);
    lockInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        attemptUnlock();
      }
    });
  }

  function updateLockState(isLocked) {
    if (!lockOverlay && document.body) {
      createLockScreen();
    }
    if (!lockOverlay) return;

    const pwdContainer = document.getElementById('wa-password-container');
    const lockInput = document.getElementById('wa-lock-input');
    const errorDiv = document.getElementById('wa-lock-error');

    if (currentSettings.lockPassword && currentSettings.lockPassword.trim() !== '') {
      pwdContainer.style.display = 'block';
    } else {
      pwdContainer.style.display = 'none';
    }

    if (errorDiv) errorDiv.style.display = 'none';

    if (isLocked) {
      lockOverlay.classList.add('is-locked');
      if (pwdContainer.style.display !== 'none' && lockInput) {
        setTimeout(() => lockInput.focus(), 100);
      }
    } else {
      lockOverlay.classList.remove('is-locked');
    }
  }

  function lockScreen() {
    currentSettings.isLocked = true;
    updateLockState(true);
    chrome.storage.sync.set({ isLocked: true });
  }

  function unlockScreen() {
    currentSettings.isLocked = false;
    updateLockState(false);
    chrome.storage.sync.set({ isLocked: false });
    resetIdleTracker();
  }

  // 3. Auto-lock on idle
  function resetIdleTracker() {
    if (idleTimer) clearTimeout(idleTimer);

    if (currentSettings.autoLockMinutes && currentSettings.autoLockMinutes > 0 && !currentSettings.isLocked) {
      idleTimer = setTimeout(() => {
        lockScreen();
      }, currentSettings.autoLockMinutes * 60 * 1000);
    }
  }

  ['pointerdown', 'keydown', 'click', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
      if (!currentSettings.isLocked) {
        resetIdleTracker();
      }
    }, { passive: true });
  });

  // 4. Keyboard Shortcuts: Alt+Z (Overall toggle), Alt+X (Lock screen)
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      currentSettings.enabled = !currentSettings.enabled;
      chrome.storage.sync.set({ enabled: currentSettings.enabled });
      applyStyles(currentSettings);
    } else if (e.altKey && (e.key === 'x' || e.key === 'X')) {
      e.preventDefault();
      if (currentSettings.isLocked) {
        if (!currentSettings.lockPassword) {
          unlockScreen();
        } else {
          const lockInput = document.getElementById('wa-lock-input');
          if (lockInput) lockInput.focus();
        }
      } else {
        lockScreen();
      }
    }
  });

  // 5. Initialize settings
  function loadAndInit() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
      currentSettings = { ...DEFAULT_SETTINGS, ...items };
      applyStyles(currentSettings);
    });
  }

  // Immediate init
  loadAndInit();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createLockScreen();
      updateLockState(currentSettings.isLocked);
    });
  } else {
    createLockScreen();
    updateLockState(currentSettings.isLocked);
  }

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      for (const key in changes) {
        currentSettings[key] = changes[key].newValue;
      }
      applyStyles(currentSettings);
    }
  });

  // Listen for direct messages from popup
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'LOCK_NOW') {
      lockScreen();
      sendResponse({ status: 'locked' });
    } else if (msg.action === 'UNLOCK_NOW') {
      unlockScreen();
      sendResponse({ status: 'unlocked' });
    } else if (msg.action === 'GET_STATUS') {
      sendResponse(currentSettings);
    }
  });
})();
