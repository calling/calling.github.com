var THEME_LABELS = {
  auto: '⚙️ Theme (Auto)',
  light: '☀️ Light',
  dark: '🌙 Dark'
};

var CYCLE_ORDER = ['auto', 'light', 'dark'];

function getPreference() {
  return localStorage.getItem('theme-preference') || 'auto';
}

function applyTheme(pref) {
  if (pref === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', pref);
  }
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = THEME_LABELS[pref] || THEME_LABELS.auto;
  }
}

function setPreference(value) {
  localStorage.setItem('theme-preference', value);
  applyTheme(value);
}

function cycleTheme() {
  var current = getPreference();
  var idx = CYCLE_ORDER.indexOf(current);
  var next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
  setPreference(next);
}

function setupToggle() {
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = THEME_LABELS[getPreference()] || THEME_LABELS.auto;
    btn.addEventListener('click', cycleTheme);
  }
}

applyTheme(getPreference());

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupToggle);
} else {
  setupToggle();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
  if (getPreference() === 'auto') {
    applyTheme('auto');
  }
});
