// nav.js — Krisbot shared navigation
// Tabs auto-hide when they have no posts, auto-show when they do

(function() {
  const NAV = [
    { label: 'Home',             href: '/'          },
    { label: 'Comedy',           href: '/comedy'    },
    { label: 'Sports (SEW)',     href: '/sew'       },
    { label: 'But Why Though',   href: '/butwhy'    },
    { label: 'Profiles',         href: '/profile'   },
    { label: 'Attention Economy',href: '/attention' },
    { label: 'Contact',          href: '/contact'   },
  ];

  // These tabs always show regardless of posts
  const ALWAYS_SHOW = new Set(['/', '/attention', '/contact']);

  const COLORS = {
    '/comedy':    '#e03e2d',
    '/sew':       '#2563eb',
    '/butwhy':    '#16a34a',
    '/profile':   '#7c3aed',
    '/attention': '#1a1060',
    '/contact':   '#f7d94c',
  };

  const HREF_TO_SEC = {
    '/comedy':    'comedy',
    '/sew':       'sew',
    '/butwhy':    'butwhy',
    '/profile':   'profile',
    '/attention': 'attention',
  };

  function getActive() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    for (const item of NAV) {
      const h = item.href.replace(/\/$/, '') || '/';
      if (path === h) return item.href;
    }
    for (const item of NAV) {
      if (item.href !== '/' && path.startsWith(item.href)) return item.href;
    }
    return '/';
  }

  function buildNav(visibleSections) {
    const active = getActive();

    const tabs = NAV
      .filter(item => {
        if (ALWAYS_SHOW.has(item.href)) return true;
        const sec = HREF_TO_SEC[item.href];
        return sec ? visibleSections.has(sec) : true;
      })
      .map(item => {
        const isActive = item.href === active;
        let style = '';
        if (isActive) {
          const bg = COLORS[item.href] || '#f7d94c';
          const color = (item.href === '/contact' || item.href === '/') ? '#000' : '#fff';
          style = `background:${bg};color:${color};border-color:${bg};`;
        }
        return `<a class="kb-tab${isActive ? ' kb-active' : ''}" href="${item.href}" style="${style}">${item.label}</a>`;
      }).join('\n    ');

    const html = `
<nav class="kb-nav">
  <a class="kb-logo" href="/">
    <span class="kb-logo-kris">KRIS</span><span class="kb-logo-bot">BOT</span>
  </a>
  <div class="kb-tabs">
    ${tabs}
  </div>
</nav>`;

    const css = `
<style id="kb-nav-style">
.kb-nav{background:#0e0e0e;padding:10px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #f7d94c;position:sticky;top:0;z-index:100;font-family:'DM Mono',monospace}
.kb-logo{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;color:#f7d94c;text-decoration:none}
.kb-logo-bot{color:#f5f0e8}
.kb-tabs{display:flex;gap:4px;flex-wrap:wrap}
.kb-tab{padding:8px 18px;font-family:'DM Mono',monospace;font-size:12px;letter-spacing:1px;text-transform:uppercase;border:1.5px solid transparent;border-radius:2px;color:#fff;text-decoration:none;transition:all .15s}
.kb-tab:hover{border-color:#f7d94c;color:#f7d94c}
.kb-active{font-weight:500}
@media(max-width:900px){.kb-nav{flex-direction:column;gap:10px;padding:12px 20px}.kb-tabs{justify-content:center}}
</style>`;

    if (!document.getElementById('kb-nav-style')) {
      document.head.insertAdjacentHTML('beforeend', css);
    }
    const existing = document.querySelector('nav.kb-nav');
    if (existing) { existing.outerHTML = html; }
    else { document.body.insertAdjacentHTML('afterbegin', html); }
  }

  function init() {
    // Show all tabs immediately as fallback
    buildNav(new Set(['comedy', 'sew', 'butwhy', 'profile', 'attention']));

    // Then fetch posts.json and hide tabs with no posts
    fetch('/posts.json')
      .then(r => r.json())
      .then(data => {
        const posts = data.posts || [];
        const populated = new Set(posts.map(p => p.section));
        buildNav(populated);
      })
      .catch(() => {
        // On failure keep all tabs visible
        buildNav(new Set(['comedy', 'sew', 'butwhy', 'profile', 'attention']));
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
