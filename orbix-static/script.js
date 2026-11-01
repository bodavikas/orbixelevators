const SCRIPT_URL = document.querySelector('script[src*="script.js"]')?.src || new URL('script.js', document.baseURI).href;
const PROJECT_BASE = new URL('.', SCRIPT_URL);
const route = (path) => new URL(String(path).replace(/^\/+/, ''), PROJECT_BASE).href;
const asset = (name) => new URL('assets/images/' + name, PROJECT_BASE).href;
const heroSlides=[{image:'home-slide-1.png',eyebrow:'VERTICAL MOBILITY, THOUGHTFULLY DESIGNED',title:'Every level.<br><em>Elevated.</em>',description:'Explore Orbix’s proposed home elevator collection — from practical everyday comfort to refined premium styling and panoramic luxury.'},{image:'home-slide-2.png',eyebrow:'DESIGNED AROUND YOUR HOME',title:'Make room for<br><em>better living.</em>',description:'Thoughtful residential elevator concepts that bring comfort, considered materials and a sense of ease to everyday movement.'},{image:'home-slide-3.png',eyebrow:'THE LUXURY COLLECTION',title:'A new perspective<br>on <em>upward.</em>',description:'Discover a panoramic design direction for villas and architect-led interiors, subject to technical feasibility and final OEM specifications.'}];let heroIndex=0,heroTimer;function showHeroSlide(index){const section=document.querySelector('.hero-slider');if(!section)return;const previousIndex=heroIndex;heroIndex=(index+heroSlides.length)%heroSlides.length;const slide=heroSlides[heroIndex],img=section.querySelector('.hero-slide-image');const direction=(heroIndex>=previousIndex && !(previousIndex===0&&heroIndex===heroSlides.length-1))?'next':'prev';img.classList.remove('image-transition-next','image-transition-prev','image-transition-enter');void img.offsetWidth;img.classList.add(direction==='next'?'image-transition-next':'image-transition-prev');window.setTimeout(()=>{img.src=asset(slide.image);img.onload=()=>{img.classList.remove('image-transition-next','image-transition-prev');img.classList.add('image-transition-enter');window.setTimeout(()=>img.classList.remove('image-transition-enter'),760)};},220);section.querySelector('.hero-slide-eyebrow').textContent=slide.eyebrow;section.querySelector('.hero-slide-title').innerHTML=slide.title;section.querySelector('.hero-slide-description').textContent=slide.description;section.querySelectorAll('.hero-dot').forEach((dot,i)=>{dot.classList.toggle('active',i===heroIndex);dot.setAttribute('aria-pressed',i===heroIndex?'true':'false')});section.querySelector('.hero-slide-count b').textContent=String(heroIndex+1).padStart(2,'0');if(heroTimer)window.clearInterval(heroTimer);heroTimer=window.setInterval(()=>showHeroSlide(heroIndex+1),6500)}if(document.querySelector('.hero-slider')){document.querySelector('.hero-prev').addEventListener('click',()=>showHeroSlide(heroIndex-1));document.querySelector('.hero-next').addEventListener('click',()=>showHeroSlide(heroIndex+1));document.querySelectorAll('.hero-dot').forEach((dot,i)=>dot.addEventListener('click',()=>showHeroSlide(i)));heroTimer=window.setInterval(()=>showHeroSlide(heroIndex+1),6500)}const modelSelect=document.querySelector('.hero-model-select');modelSelect?.addEventListener('change',()=>{if(modelSelect.value)window.location.href=route('products/'+modelSelect.value+'.html')});
const productTrigger=document.querySelector('.nav-product-trigger');const productDropdown=document.querySelector('.products-dropdown');productTrigger?.addEventListener('click',()=>{const isOpen=productDropdown.classList.toggle('open');productTrigger.setAttribute('aria-expanded',isOpen?'true':'false')});// Engineering feature cards: hover animates on desktop; tap/click toggles the information panel on touch devices.
document.querySelectorAll('.engineering-feature').forEach(card=>{const toggle=()=>{const open=card.classList.toggle('feature-open');card.setAttribute('aria-expanded',open?'true':'false')};card.addEventListener('click',toggle);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}})});
// Model cards: hover/tap reveals a details layer; a second quick tap/click opens the full product page.
let lastModelTap={el:null,time:0};
document.addEventListener('click',function(e){const cardEl=e.target.closest('[data-model-card]');if(!cardEl)return;const now=Date.now();if(lastModelTap.el===cardEl && now-lastModelTap.time<850){lastModelTap={el:null,time:0};return;}e.preventDefault();document.querySelectorAll('[data-model-card].model-info-open').forEach(el=>{if(el!==cardEl)el.classList.remove('model-info-open')});cardEl.classList.add('model-info-open');lastModelTap={el:cardEl,time:now};});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-model-card]')){e.preventDefault();e.target.classList.toggle('model-info-open');}});
document.addEventListener('click',e=>{if(productDropdown&&!e.target.closest('.nav-product-item')){productDropdown.classList.remove('open');productTrigger?.setAttribute('aria-expanded','false')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){productDropdown?.classList.remove('open');productTrigger?.setAttribute('aria-expanded','false')}});const menu=document.querySelector('.menu-toggle');menu?.addEventListener('click',()=>{const nav=document.querySelector('.nav-links');nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false');menu.textContent=nav.classList.contains('open')?'×':'☰'});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav-links').classList.remove('open');productDropdown?.classList.remove('open');productTrigger?.setAttribute('aria-expanded','false')}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}else{e.target.classList.remove('visible')}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
setTimeout(()=>document.getElementById('loader')?.classList.add('done'),850);document.body.classList.add('custom-cursor');const ring=document.createElement('div'),dot=document.createElement('div');ring.className='cursor-ring';dot.className='cursor-dot';document.body.append(ring,dot);window.addEventListener('mousemove',e=>{ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>ring.style.transform='translate(-50%,-50%) scale(1.45)');el.addEventListener('mouseleave',()=>ring.style.transform='translate(-50%,-50%) scale(1)')});
// Orbix WhatsApp number in international digits, without + or spaces.
const ORBIX_WHATSAPP_NUMBER='919000217401';const waLink=()=>ORBIX_WHATSAPP_NUMBER?`https://wa.me/${ORBIX_WHATSAPP_NUMBER}`:'#';const waFloat=document.getElementById('wa-float');if(waFloat){waFloat.href=waLink();waFloat.target='_blank';waFloat.rel='noopener';waFloat.addEventListener('click',e=>{if(!ORBIX_WHATSAPP_NUMBER){e.preventDefault();alert('WhatsApp is not configured yet. Add the official Orbix WhatsApp number in script.js.')}})}const form=document.getElementById('lead-form');form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const message=`Hello Orbix Elevators, I would like to enquire about your services.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')||'Not provided'}\nInterest: ${data.get('interest')}\nProject details: ${data.get('message')}`;if(!ORBIX_WHATSAPP_NUMBER){document.getElementById('form-status').textContent='Almost ready: add the official WhatsApp number in script.js, then the form will open WhatsApp with this message.';return}window.open(`https://wa.me/${ORBIX_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener')});


/* Requested additions only: scroll controls and in-view motion for new cards */
(() => {
  const bindScroller = (track, selector) => {
    if (!track) return;
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.scrollModels === 'prev' || button.dataset.scrollSafety === 'prev' ? -1 : 1;
        track.scrollBy({ left: direction * Math.max(260, track.clientWidth * 0.78), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    });
  };
  bindScroller(document.querySelector('.model-scroll-track'), '[data-scroll-models]');
  bindScroller(document.querySelector('.project-safety-track'), '[data-scroll-safety]');
  const safetyCards = document.querySelectorAll('.project-safety-card');
  if ('IntersectionObserver' in window && safetyCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    safetyCards.forEach((card, index) => {
      card.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
      observer.observe(card);
    });
  } else {
    safetyCards.forEach((card) => card.classList.add('is-visible'));
  }
})();


/* Vertical-scroll-driven horizontal model story, using the same GSAP ScrollTrigger
   pin + scrub pattern as the supplied gym project. */
(() => {
  const section = document.querySelector('.model-scroll-story');
  const sticky = section?.querySelector('.model-scroll-sticky');
  const viewport = section?.querySelector('.model-scroll-viewport');
  const rail = viewport?.querySelector('.cards');
  if (!section || !sticky || !viewport || !rail) return;

  const init = () => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(rail, { clearProps: 'transform' });
      return;
    }
    if (section.__orbixModelScroll) section.__orbixModelScroll.kill();
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
      gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sticky,
          start: 'top top+=92',
          end: () => `+=${Math.max(distance(), window.innerWidth * 0.8)}`,
          scrub: 0.7,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, section);
    section.__orbixModelScroll = { kill: () => ctx.revert() };
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  const loadScript = (src, globalName, next) => {
    if (window[globalName]) { next(); return; }
    const existing = document.querySelector(`script[data-orbix-lib="${globalName}"]`);
    if (existing) { existing.addEventListener('load', next, { once: true }); return; }
    const s = document.createElement('script');
    s.src = src; s.async = true; s.dataset.orbixLib = globalName;
    s.onload = next;
    s.onerror = () => { /* keep the cards usable as a normal row if CDN is unavailable */ };
    document.head.appendChild(s);
  };
  loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', 'gsap', () => {
    loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', 'ScrollTrigger', init);
  });
  window.addEventListener('load', () => window.ScrollTrigger?.refresh(), { once: true });
  window.addEventListener('resize', () => window.ScrollTrigger?.refresh(), { passive: true });
})();


/* Reveal the existing model safety/compliance checklist when it enters view */
(() => {
  const panels = document.querySelectorAll('[data-compliance-reveal]');
  if (!panels.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    panels.forEach(panel => panel.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });
  panels.forEach(panel => observer.observe(panel));
})();
