// Small, dependency-free interactions.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav border + mobile menu
  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const btn = document.querySelector('.menu-btn'), menu = document.querySelector('.nav ul');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }));
  }

  // Reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Typing role line
  const role = document.getElementById('role-text');
  if (role) {
    const roles = JSON.parse(role.dataset.roles);
    if (reduce) { role.textContent = roles[0]; }
    else {
      let i = 0, j = 0, del = false;
      const tick = () => {
        const w = roles[i];
        role.textContent = w.slice(0, j);
        if (!del && j < w.length) j++;
        else if (!del) { del = true; return setTimeout(tick, 1800); }
        else if (j > 0) j--;
        else { del = false; i = (i + 1) % roles.length; }
        setTimeout(tick, del ? 28 : 55);
      };
      tick();
    }
  }

  // Project filters
  const filters = document.querySelectorAll('.filter');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.setAttribute('aria-pressed', x === f));
    const k = f.dataset.filter;
    document.querySelectorAll('[data-tags]').forEach(c => {
      c.classList.toggle('dim', k !== 'all' && !c.dataset.tags.split(' ').includes(k));
    });
  }));

  // IT <-> OT flow diagram: animated packets + hover explanations
  const flow = document.getElementById('flow');
  if (flow) {
    const tip = document.getElementById('flow-tip');
    const def = tip.textContent;
    flow.querySelectorAll('.node').forEach(n => {
      const show = () => { flow.querySelectorAll('.node').forEach(x => x.classList.remove('on')); n.classList.add('on'); tip.textContent = '> ' + n.dataset.tip; };
      n.addEventListener('mouseenter', show); n.addEventListener('focus', show); n.addEventListener('click', show);
      n.addEventListener('mouseleave', () => { n.classList.remove('on'); tip.textContent = def; });
    });
    if (!reduce) {
      const wires = [...flow.querySelectorAll('.wire')];
      const pkts = wires.map((w, i) => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('r', 3.5); c.setAttribute('class', 'pkt'); flow.appendChild(c);
        return { w, c, len: w.getTotalLength(), t: i * 0.27, back: w.dataset.back === '1' };
      });
      const step = () => {
        pkts.forEach(p => {
          p.t = (p.t + 0.006) % 1;
          const pos = p.w.getPointAtLength((p.back ? 1 - p.t : p.t) * p.len);
          p.c.setAttribute('cx', pos.x); p.c.setAttribute('cy', pos.y);
        });
        requestAnimationFrame(step);
      };
      step();
    }
  }

  // Active link highlighting (nav on home, TOC on case studies)
  const links = document.querySelectorAll('.nav ul a[href^="#"], .toc a');
  if (links.length) {
    const map = new Map([...links].map(a => [a.getAttribute('href').slice(1), a]));
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(a => a.classList.remove('active')); map.get(e.target.id)?.classList.add('active'); }
    }), { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
