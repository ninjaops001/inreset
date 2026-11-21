/* Show a dismissible English banner on Japanese pages when the browser language is not Japanese. */
(function () {
  var STORAGE_KEY = 'inresetLangBannerDismissed';
  var root = document.documentElement;
  var pageLang = (root.getAttribute('lang') || 'ja').toLowerCase();
  if (pageLang !== 'ja') return;

  try {
    if (localStorage.getItem(STORAGE_KEY) === '1') return;
  } catch (e) {}

  var navLang = String(navigator.language || navigator.userLanguage || '').toLowerCase();
  if (!navLang || navLang.indexOf('ja') === 0) return;

  var langLink = document.querySelector('a.lang[hreflang="en"]');
  var href = langLink ? langLink.getAttribute('href') : 'en/index.html';

  var bar = document.createElement('div');
  bar.className = 'lang-banner is-visible';
  bar.id = 'lang-banner';
  bar.setAttribute('role', 'region');
  bar.setAttribute('lang', 'en');
  bar.setAttribute('aria-label', 'English version available');

  var link = document.createElement('a');
  link.href = href;
  link.hreflang = 'en';
  link.lang = 'en';
  link.textContent = 'English version';

  var text = document.createElement('span');
  text.appendChild(document.createTextNode('This site is also available in English \u2192 '));
  text.appendChild(link);

  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'lang-banner-close';
  close.setAttribute('aria-label', 'Dismiss');
  close.textContent = '\u00d7';

  bar.appendChild(text);
  bar.appendChild(close);
  document.body.insertBefore(bar, document.body.firstChild);
  root.classList.add('lang-banner-on');

  function syncHeight() {
    root.style.setProperty('--lang-banner-height', bar.offsetHeight + 'px');
  }
  syncHeight();
  window.addEventListener('resize', syncHeight);

  close.addEventListener('click', function () {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    bar.remove();
    root.classList.remove('lang-banner-on');
    root.style.removeProperty('--lang-banner-height');
  });
})();
