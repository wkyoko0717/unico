/**
 * unico nail - main.js
 * GSAP + ScrollTrigger アニメーション
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // GSAP プラグイン登録
  // ============================
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });


  // ============================
  // MOBILE VIEWPORT: iPhone toolbar対策
  // ============================
  const root = document.documentElement;
  let viewportWidth = window.innerWidth;

  const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;

  const setHeroViewportHeight = () => {
    const viewport = window.visualViewport;
    const height = viewport ? viewport.height : window.innerHeight;
    root.style.setProperty('--hero-height', `${Math.round(height)}px`);
    root.style.setProperty('--section-height', `${Math.round(height * 0.88)}px`);
  };

  setHeroViewportHeight();

  window.addEventListener('resize', () => {
    const nextWidth = window.innerWidth;

    if (isMobileViewport() && Math.abs(nextWidth - viewportWidth) < 24) {
      return;
    }

    viewportWidth = nextWidth;
    setHeroViewportHeight();
    ScrollTrigger.refresh();
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      viewportWidth = window.innerWidth;
      setHeroViewportHeight();
      ScrollTrigger.refresh();
    }, 300);
  });


  // ============================
  // LOADER
  // ============================
  const loader = document.getElementById('loader');

  const hideLoader = () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.1,
      onComplete: () => {
        loader.classList.add('is-hidden');
        initHeroAnimation();
      }
    });
  };

  // ページ読み込み完了後にローダー非表示
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 700);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 700);
    });
  }


  // ============================
  // HERO アニメーション（ローダー後）
  // ============================
  function initHeroAnimation() {
    const heroTextEls = '.hero__logo, .hero__sub, .hero__tag, .hero__copy';
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        gsap.set(heroTextEls, { clearProps: 'transform' });
      }
    });

    tl.to('.hero__logo', {
      opacity: 1,
      y: 0,
      duration: 0.85,
    })
    .to('.hero__sub', {
      opacity: 1,
      y: 0,
      duration: 0.65,
    }, '-=0.45')
    .to('.hero__tag', {
      opacity: 1,
      y: 0,
      duration: 0.65,
    }, '-=0.42')
    .to('.hero__copy', {
      opacity: 1,
      y: 0,
      duration: 0.65,
    }, '-=0.38')
    .to('.hero__scroll', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.18');
  }

  // Hero要素の初期位置セット
  gsap.set('.hero__logo', { opacity: 0, y: 40 });
  gsap.set('.hero__sub', { opacity: 0, y: 24 });
  gsap.set('.hero__tag', { opacity: 0, y: 20 });
  gsap.set('.hero__copy', { opacity: 0, y: 24 });
  gsap.set('.hero__scroll', { opacity: 0 });


  // ============================
  // PARALLAX
  // ============================
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': () => {
      gsap.to('.hero__img', {
        yPercent: -7,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      gsap.to('.concept__img', {
        yPercent: -15,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.concept',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
    },
    '(max-width: 767px)': () => {
      gsap.set('.hero__img, .concept__img', { clearProps: 'transform' });
    }
  });


  // ============================
  // JS-REVEAL: 汎用フェードアップ
  // ============================
  const revealEls = document.querySelectorAll('.js-reveal:not(.about__card)');

  revealEls.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      }
    });
  });


  // ============================
  // GALLERY: ストagger表示
  // ============================
  gsap.from('.gallery__item', {
    opacity: 0,
    scale: 0.94,
    y: 20,
    duration: 0.65,
    stagger: {
      each: 0.07,
      from: 'start',
    },
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.gallery__grid',
      start: 'top 84%',
      once: true,
    }
  });


  // ============================
  // MENU: カテゴリーごとにスライドイン
  // ============================
  gsap.utils.toArray('.menu__category').forEach((cat, i) => {
    gsap.from(cat.querySelectorAll('.menu__item'), {
      opacity: 0,
      x: -16,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cat,
        start: 'top 85%',
        once: true,
      }
    });
  });


  // ============================
  // ABOUT: カードのフェードイン
  // ============================
  gsap.utils.toArray('.about__card').forEach((card) => {
    gsap.fromTo(card,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        }
      }
    );
  });


  // ============================
  // ACCESS PHOTOS: スライドイン
  // ============================
  gsap.from('.access__photos .access__photo', {
    opacity: 0,
    y: 32,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.access__photos',
      start: 'top 84%',
      once: true,
    }
  });


  // ============================
  // HEADER: スクロール検知
  // ============================
  const header = document.getElementById('header');

  ScrollTrigger.create({
    start: '80px top',
    onEnter: () => header.classList.add('is-scrolled'),
    onLeaveBack: () => header.classList.remove('is-scrolled'),
  });


  // ============================
  // ハンバーガーメニュー
  // ============================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  // モバイルナビのリンクをクリックしたら閉じる
  mobileNav.querySelectorAll('.mobile-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });


  // ============================
  // ページトップボタン
  // ============================
  const pageTop = document.getElementById('pageTop');

  ScrollTrigger.create({
    start: '300px top',
    onEnter: () => pageTop.classList.add('is-visible'),
    onLeaveBack: () => pageTop.classList.remove('is-visible'),
  });

  pageTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ============================
  // FOOTER SNS: フェードイン
  // ============================
  ScrollTrigger.create({
    trigger: '.footer__sns',
    start: 'top 86%',
    once: true,
    onEnter: () => {
      gsap.fromTo('.footer__sns-item',
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        }
      );
    }
  });


  // ============================
  // SECTION DIVIDER アニメーション
  // ============================
  gsap.utils.toArray('.concept__divider, .gallery__divider, .access__divider, .footer__divider').forEach((divider) => {
    gsap.from(divider, {
      scaleX: 0,
      transformOrigin: 'center',
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: divider,
        start: 'top 88%',
        once: true,
      }
    });
  });

});
