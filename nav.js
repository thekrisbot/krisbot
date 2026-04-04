// nav.js — Krisbot shared navigation
(function() {
  const NAV = [
    { label: 'Home',              href: '/'          },
    { label: 'Comedy',            href: '/comedy'    },
    { label: 'Sports (SEW)',      href: '/sew'       },
    { label: 'But Why Though',    href: '/butwhy'    },
    { label: 'The Profile',       href: '/profile'   },
    { label: 'Attention Economy', href: '/attention' },
    { label: 'Contact',           href: '/contact'   },
  ];

  const COLORS = {
    '/comedy':    '#e03e2d',
    '/sew':       '#2563eb',
    '/butwhy':    '#16a34a',
    '/profile':   '#7c3aed',
    '/attention': '#1a1060',
  };

  function getActive() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    for (var i = 0; i < NAV.length; i++) {
      var h = NAV[i].href.replace(/\/$/, '') || '/';
      if (path === h) return NAV[i].href;
    }
    for (var j = 0; j < NAV.length; j++) {
      if (NAV[j].href !== '/' && path.indexOf(NAV[j].href) === 0) return NAV[j].href;
    }
    return '/';
  }

  function buildNav() {
    var active = getActive();

    // Inject styles
    if (!document.getElementById('kb-nav-style')) {
      var style = document.createElement('style');
      style.id = 'kb-nav-style';
      style.textContent = '.kb-nav{background:#0e0e0e;padding:10px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #f7d94c;position:sticky;top:0;z-index:100}.kb-logo{font-family:"Bebas Neue",sans-serif;font-size:28px;letter-spacing:3px;color:#f7d94c;text-decoration:none}.kb-logo-bot{color:#f5f0e8}.kb-tabs{display:flex;gap:4px;flex-wrap:wrap}.kb-tab{padding:8px 18px;font-family:"DM Mono",monospace;font-size:12px;letter-spacing:1px;text-transform:uppercase;border:1.5px solid transparent;border-radius:2px;color:#fff;text-decoration:none;transition:all .15s}.kb-tab:hover{border-color:#f7d94c;color:#f7d94c}@media(max-width:900px){.kb-nav{flex-direction:column;gap:10px;padding:12px 20px}.kb-tabs{justify-content:center}}';
      document.head.appendChild(style);
    }

    // Build nav
    var nav = document.createElement('nav');
    nav.className = 'kb-nav';

    // Logo
    var logo = document.createElement('a');
    logo.className = 'kb-logo';
    logo.href = '/';
    var kris = document.createElement('span');
    kris.textContent = 'KRIS';
    var bot = document.createElement('span');
    bot.className = 'kb-logo-bot';
    bot.textContent = 'BOT';
    logo.appendChild(kris);
    logo.appendChild(bot);
    nav.appendChild(logo);

    // Tabs
    var tabs = document.createElement('div');
    tabs.className = 'kb-tabs';

    for (var k = 0; k < NAV.length; k++) {
      var item = NAV[k];
      var a = document.createElement('a');
      a.className = 'kb-tab';
      a.href = item.href;
      a.textContent = item.label;
      if (item.href === active) {
        var bg = COLORS[item.href] || '#f7d94c';
        var col = (item.href === '/contact' || item.href === '/') ? '#000' : '#fff';
        a.style.background = bg;
        a.style.color = col;
        a.style.borderColor = bg;
      }
      tabs.appendChild(a);
    }

    nav.appendChild(tabs);

    // Insert at top of body
    var existing = document.querySelector('nav.kb-nav');
    if (existing) {
      existing.parentNode.replaceChild(nav, existing);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
