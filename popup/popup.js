// ========================================================
// Vanity - Popup Logic
// ========================================================

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

document.addEventListener('DOMContentLoaded', () => {
  const toggleEnabled = document.getElementById('toggle-enabled');
  const toggleLastMessagesPreview = document.getElementById('toggle-lastMessagesPreview');
  const toggleAllMessages = document.getElementById('toggle-allMessages');
  const toggleUserNames = document.getElementById('toggle-userNames');
  const toggleProfilePictures = document.getElementById('toggle-profilePictures');
  const toggleMediaPreview = document.getElementById('toggle-mediaPreview');
  const toggleTextInput = document.getElementById('toggle-textInput');
  const toggleAutolock = document.getElementById('toggle-autolock');
  const inputAutolock = document.getElementById('input-autolock');

  const btnLockNow = document.getElementById('btn-lock-now');
  const btnToggleSettings = document.getElementById('btn-toggle-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const settingsPanel = document.getElementById('settings-panel');

  const rangeBlur = document.getElementById('range-blur');
  const labelBlurVal = document.getElementById('label-blur-val');
  const rangeDelay = document.getElementById('range-delay');
  const labelDelayVal = document.getElementById('label-delay-val');
  const inputPassword = document.getElementById('input-password');
  const btnSavePwd = document.getElementById('btn-save-pwd');
  const pwdMsg = document.getElementById('pwd-msg');

  // 1. Settings Drawer Toggle
  btnToggleSettings.addEventListener('click', () => {
    settingsPanel.classList.add('open');
  });

  btnCloseSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
  });

  // 2. Load stored settings
  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    toggleEnabled.checked = settings.enabled;
    toggleLastMessagesPreview.checked = settings.lastMessagesPreview;
    toggleAllMessages.checked = settings.allMessages;
    toggleUserNames.checked = settings.userNames;
    toggleProfilePictures.checked = settings.profilePictures;
    toggleMediaPreview.checked = settings.mediaPreview;
    toggleTextInput.checked = settings.textInput;

    const autoMinutes = settings.autoLockMinutes || 0;
    toggleAutolock.checked = autoMinutes > 0;
    inputAutolock.value = autoMinutes > 0 ? autoMinutes : 10;

    rangeBlur.value = settings.blurStrength || 5;
    labelBlurVal.textContent = `${settings.blurStrength || 5}px`;

    const delayVal = settings.unblurDelay !== undefined ? settings.unblurDelay : 0.4;
    rangeDelay.value = delayVal;
    labelDelayVal.textContent = `${delayVal} detik`;

    inputPassword.value = settings.lockPassword || '';
  });

  function saveSetting(key, value) {
    chrome.storage.sync.set({ [key]: value });
  }

  // 3. Event Listeners for toggles
  toggleEnabled.addEventListener('change', () => {
    saveSetting('enabled', toggleEnabled.checked);
  });

  toggleLastMessagesPreview.addEventListener('change', () => {
    saveSetting('lastMessagesPreview', toggleLastMessagesPreview.checked);
  });

  toggleAllMessages.addEventListener('change', () => {
    saveSetting('allMessages', toggleAllMessages.checked);
  });

  toggleUserNames.addEventListener('change', () => {
    saveSetting('userNames', toggleUserNames.checked);
  });

  toggleProfilePictures.addEventListener('change', () => {
    saveSetting('profilePictures', toggleProfilePictures.checked);
  });

  toggleMediaPreview.addEventListener('change', () => {
    saveSetting('mediaPreview', toggleMediaPreview.checked);
  });

  toggleTextInput.addEventListener('change', () => {
    saveSetting('textInput', toggleTextInput.checked);
  });

  toggleAutolock.addEventListener('change', () => {
    const minutes = toggleAutolock.checked ? parseInt(inputAutolock.value, 10) || 10 : 0;
    saveSetting('autoLockMinutes', minutes);
  });

  inputAutolock.addEventListener('change', () => {
    if (toggleAutolock.checked) {
      const minutes = Math.max(1, parseInt(inputAutolock.value, 10) || 10);
      inputAutolock.value = minutes;
      saveSetting('autoLockMinutes', minutes);
    }
  });

  // Blur Strength Slider
  rangeBlur.addEventListener('input', () => {
    const val = rangeBlur.value;
    labelBlurVal.textContent = `${val}px`;
    saveSetting('blurStrength', parseInt(val, 10));
  });

  // Delay Slider
  rangeDelay.addEventListener('input', () => {
    const val = parseFloat(rangeDelay.value);
    labelDelayVal.textContent = `${val.toFixed(2).replace(/\.00$/, '.0')} detik`;
    saveSetting('unblurDelay', val);
  });

  // Password Setup
  btnSavePwd.addEventListener('click', () => {
    const pwd = inputPassword.value;
    saveSetting('lockPassword', pwd);
    pwdMsg.style.display = 'block';
    setTimeout(() => {
      pwdMsg.style.display = 'none';
    }, 2000);
  });

  // Lock Screen Now button
  btnLockNow.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'LOCK_NOW' }, () => {
          window.close();
        });
      } else {
        saveSetting('isLocked', true);
        window.close();
      }
    });
  });
});
