// ========================================================
// Vanity - Service Worker (Background Script)
// ========================================================

const DEFAULT_SETTINGS = {
  enabled: true,
  lastMessagesPreview: true,
  allMessages: false,
  userNames: false,
  profilePictures: false,
  mediaPreview: false,
  textInput: false,
  blurStrength: 8,
  autoLockMinutes: 0,
  lockPassword: "",
  isLocked: false
};

// Initialize settings on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    chrome.storage.sync.set(items);
    updateBadge(items.enabled);
  });
});

// Update badge when enabled state changes
function updateBadge(enabled) {
  if (enabled) {
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#00a884" });
  } else {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#667781" });
  }
}

// Listen to storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.enabled !== undefined) {
    updateBadge(changes.enabled.newValue);
  }
});

// Handle keyboard commands
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-blur') {
    chrome.storage.sync.get({ enabled: true }, (items) => {
      const newState = !items.enabled;
      chrome.storage.sync.set({ enabled: newState });
      updateBadge(newState);
    });
  } else if (command === 'lock-screen') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'LOCK_NOW' });
      }
    });
  }
});
