    const nav = document.getElementById('siteNav');
    const toTop = document.getElementById('toTop');  
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
      if (window.scrollY > 500) toTop.classList.add('show'); else toTop.classList.remove('show');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  
    document.querySelectorAll('#mainMenu .nav-link').forEach(a => {
      a.addEventListener('click', () => {
        const menu = document.getElementById('mainMenu');
        if (menu.classList.contains('show')) new bootstrap.Collapse(menu).hide();
      });
    });
  
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  
    const fa = (n) => n.toLocaleString('fa-IR');
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fa(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.count').forEach(c => counterIO.observe(c));
  