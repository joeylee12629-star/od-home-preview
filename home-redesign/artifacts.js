/*
 * Token-driven artifact renderer for the homepage workspace demo.
 *
 * The point of the demo is the product's core claim: one design system, every
 * artifact. So the artifacts here are NOT screenshots or per-brand templates —
 * each one is a single layout that reads ONLY design tokens
 * (--ds-bg / --ds-fg / --ds-accent / --ds-radius / --ds-font-*). Swapping the
 * design system swaps the token set, and the same artifact re-renders in that
 * brand's language. Adding a system means adding tokens, never markup.
 *
 * Tokens come from 'design-systems/<slug>/tokens.css' in this repo, extracted
 * into 'design-systems.json' — the same files the agent hands to a model when
 * it generates real work.
 */

(function (global) {
  var COPY = {
    en: {
      web: {
        eyebrow: 'New season',
        title: 'Everything you ship,\non brand.',
        body: 'One design system drives the site, the deck, the campaign, and the app. Change a token, everything follows.',
        cta: 'Get started',
        ghost: 'See the system',
        cards: ['Brand kernel', 'Live artifacts', 'Team library'],
        nav: ['Product', 'Systems', 'Pricing'],
      },
      mobile: {
        title: 'Today',
        greeting: 'Your brand, in your pocket',
        rows: ['Launch deck', 'Campaign page', 'Story cards'],
        cta: 'New artifact',
        stat: '12 shipped this week',
      },
      poster: {
        kicker: 'Open Design',
        title: 'ONE SYSTEM.\nEVERY SCENE.',
        body: 'Web, decks, posters, product UI — rendered from a single brand kernel.',
        footer: 'open-design.ai',
      },
      slides: {
        kicker: 'Q3 review',
        title: 'Where the brand goes next',
        bullets: ['One kernel, every surface', 'Tokens over screenshots', 'Ship without handoff'],
        note: 'Slide 04 / 12',
      },
    },
    zh: {
      web: {
        eyebrow: '新一季',
        title: '你交付的一切，\n都在品牌上。',
        body: '一套设计系统驱动官网、Deck、营销与 App。改一个 token，全部跟着变。',
        cta: '开始使用',
        ghost: '查看设计系统',
        cards: ['品牌内核', '实时产物', '团队库'],
        nav: ['产品', '设计系统', '价格'],
      },
      mobile: {
        title: '今天',
        greeting: '把品牌装进口袋',
        rows: ['发布 Deck', '活动落地页', '故事卡片'],
        cta: '新建产物',
        stat: '本周已交付 12 件',
      },
      poster: {
        kicker: 'Open Design',
        title: '一套系统。\n所有场景。',
        body: '网页、Deck、海报、产品界面，全部由同一个品牌内核渲染。',
        footer: 'open-design.ai',
      },
      slides: {
        kicker: 'Q3 复盘',
        title: '品牌的下一步',
        bullets: ['一个内核，覆盖所有触点', '用 token，而不是截图', '交付无需交接'],
        note: '第 04 / 12 页',
      },
    },
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /** Marketing site: nav, hero, three supporting cards. */
  function web(t) {
    var root = el('div', 'af af-web');
    var nav = el('div', 'af-nav');
    nav.appendChild(el('span', 'af-logo', 'ACME'));
    var links = el('span', 'af-links');
    t.nav.forEach(function (n) { links.appendChild(el('i', null, n)); });
    nav.appendChild(links);
    nav.appendChild(el('span', 'af-btn af-btn-sm', t.cta));
    root.appendChild(nav);

    var hero = el('div', 'af-hero');
    hero.appendChild(el('span', 'af-eyebrow', t.eyebrow));
    var h1 = el('h1', 'af-h1');
    t.title.split('\n').forEach(function (line, i) {
      if (i) h1.appendChild(document.createElement('br'));
      h1.appendChild(document.createTextNode(line));
    });
    hero.appendChild(h1);
    hero.appendChild(el('p', 'af-body', t.body));
    var row = el('div', 'af-row');
    row.appendChild(el('span', 'af-btn', t.cta));
    row.appendChild(el('span', 'af-ghost', t.ghost));
    hero.appendChild(row);
    root.appendChild(hero);

    var cards = el('div', 'af-cards');
    t.cards.forEach(function (c) {
      var card = el('div', 'af-card');
      card.appendChild(el('span', 'af-swatch'));
      card.appendChild(el('b', null, c));
      card.appendChild(el('u', null, ''));
      cards.appendChild(card);
    });
    root.appendChild(cards);
    return root;
  }

  /** Product UI: phone frame, list rows, primary action. */
  function mobile(t) {
    var root = el('div', 'af af-mobile');
    var phone = el('div', 'af-phone');
    var top = el('div', 'af-phone-top');
    top.appendChild(el('b', null, t.title));
    top.appendChild(el('span', 'af-dot-accent'));
    phone.appendChild(top);
    phone.appendChild(el('p', 'af-greet', t.greeting));
    t.rows.forEach(function (r, i) {
      var row = el('div', 'af-listrow');
      row.appendChild(el('span', 'af-thumb'));
      var col = el('span', 'af-listcol');
      col.appendChild(el('b', null, r));
      col.appendChild(el('u', null, ''));
      row.appendChild(col);
      if (i === 0) row.appendChild(el('span', 'af-pill', '●'));
      phone.appendChild(row);
    });
    phone.appendChild(el('div', 'af-btn af-btn-block', t.cta));
    phone.appendChild(el('span', 'af-stat', t.stat));
    root.appendChild(phone);
    return root;
  }

  /** Marketing poster: full-bleed type, accent field. */
  function poster(t) {
    var root = el('div', 'af af-poster');
    var sheet = el('div', 'af-sheet');
    sheet.appendChild(el('span', 'af-eyebrow', t.kicker));
    var h1 = el('h1', 'af-poster-title');
    t.title.split('\n').forEach(function (line, i) {
      if (i) h1.appendChild(document.createElement('br'));
      h1.appendChild(document.createTextNode(line));
    });
    sheet.appendChild(h1);
    sheet.appendChild(el('span', 'af-rule'));
    sheet.appendChild(el('p', 'af-body', t.body));
    sheet.appendChild(el('span', 'af-poster-foot', t.footer));
    root.appendChild(sheet);
    return root;
  }

  /** Deck slide: title, bullets, accent chart. */
  function slides(t) {
    var root = el('div', 'af af-slides');
    var slide = el('div', 'af-slide');
    slide.appendChild(el('span', 'af-eyebrow', t.kicker));
    slide.appendChild(el('h1', 'af-slide-title', t.title));
    var ul = el('ul', 'af-bullets');
    t.bullets.forEach(function (b) { ul.appendChild(el('li', null, b)); });
    slide.appendChild(ul);
    var chart = el('div', 'af-chart');
    [38, 56, 72, 100].forEach(function (h, i) {
      var bar = el('i', i === 3 ? 'on' : null);
      bar.style.height = h + '%';
      chart.appendChild(bar);
    });
    slide.appendChild(chart);
    slide.appendChild(el('span', 'af-slide-note', t.note));
    root.appendChild(slide);
    return root;
  }

  var RENDER = { web: web, mobile: mobile, poster: poster, slides: slides };

  global.ODArtifacts = {
    /** Paint 'scene''s artifact into 'mount', in the demo's locale. */
    render: function (mount, scene, locale) {
      var copy = (COPY[locale] || COPY.en)[scene] || COPY.en.web;
      var build = RENDER[scene] || RENDER.web;
      mount.innerHTML = '';
      mount.appendChild(build(copy));
    },
    /**
     * Pick a legible colour for accent-coloured TEXT.
     *
     * A brand accent is tuned for fills, not always for type: Brutalism's
     * lemon (#ffef5a) on its cream page is ~1.2:1. Fills keep the real accent
     * (they pair it with --accent-on); text roles fall back to the foreground
     * when the accent cannot carry it.
     */
    guardAccentText: function (host, sys) {
      var srgb = function (hex) {
        var m = String(hex).trim().match(/^#?([0-9a-f]{6})$/i);
        if (!m) return null;
        var n = parseInt(m[1], 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (c) {
          c /= 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
      };
      var lum = function (hex) {
        var c = srgb(hex);
        return c ? 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] : null;
      };
      var la = lum(sys.accent);
      var lb = lum(sys.bg);
      var ratio = la == null || lb == null ? 99 : (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
      host.style.setProperty('--ds-accent-text', ratio >= 3 ? sys.accent : sys.fg);
    },

    /** Bind a design system's tokens onto 'host' as --ds-* custom properties. */
    applySystem: function (host, sys) {
      var s = host.style;
      s.setProperty('--ds-bg', sys.bg);
      s.setProperty('--ds-surface', sys.surface);
      s.setProperty('--ds-fg', sys.fg);
      s.setProperty('--ds-muted', sys.muted);
      s.setProperty('--ds-border', sys.border);
      s.setProperty('--ds-accent', sys.accent);
      s.setProperty('--ds-accent-on', sys.accentOn);
      s.setProperty('--ds-radius', sys.radius);
      s.setProperty('--ds-radius-lg', sys.radiusLg);
      s.setProperty('--ds-radius-sm', sys.radiusSm);
      s.setProperty('--ds-font-display', sys.fontDisplay);
      s.setProperty('--ds-font-body', sys.fontBody);
      s.setProperty('--ds-tracking', sys.tracking);
    },
  };
})(window);
