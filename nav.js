// nav.js — Krisbot shared navigation
// Edit this file to update the nav across every page on the site

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

  const COLORS = {
    '/comedy':    '#e03e2d',
    '/sew':       '#2563eb',
    '/butwhy':    '#16a34a',
    '/profile':   '#7c3aed',
    '/attention': '#1a1060',
    '/contact':   '#f7d94c',
  };

  // Figure out which tab is active based on current URL path
  function getActive() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    // Exact match first
    for (const item of NAV) {
      const h = item.href.replace(/\/$/, '') || '/';
      if (path === h) return item.href;
    }
    // Prefix match (for post pages like /comedy/my-post)
    for (const item of NAV) {
      if (item.href !== '/' && path.startsWith(item.href)) return item.href;
    }
    return '/';
  }

  function buildNav() {
    const active = getActive();
    const activeColor = COLORS[active] || '#f7d94c';
    const isContactActive = active === '/contact';

    const tabs = NAV.map(item => {
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

    // Inject CSS into head if not already there
    if (!document.getElementById('kb-nav-style')) {
      document.head.insertAdjacentHTML('beforeend', css);
    }

    // Replace existing <nav> or inject at top of body
    const existing = document.querySelector('nav.kb-nav');
    if (existing) {
      existing.outerHTML = html;
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
