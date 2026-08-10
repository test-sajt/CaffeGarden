document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Prefer reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Custom Cursor Logic (Desktop Only)
    const cursor = document.querySelector('.custom-cursor');
    const cursorText = document.querySelector('.cursor-text');
    
    if (window.innerWidth >= 1024 && !prefersReducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            gsap.set(cursor, { x: cursorX, y: cursorY });
        });

        document.querySelectorAll('[data-cursor]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                const type = el.getAttribute('data-cursor');
                if(type === 'none') {
                    cursor.classList.add('hide');
                } else {
                    cursor.classList.add('active');
                    cursorText.textContent = type;
                }
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active', 'hide');
                cursorText.textContent = '';
            });
        });
    }

    // Magnetic Buttons
    if (!prefersReducedMotion && window.innerWidth >= 1024) {
        document.querySelectorAll('.hover-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    // 3. WOW Loader Sequence - PREMIUM ANIMACIJA (Logo + Caffe + Garden)
    const tl = gsap.timeline();
    lenis.stop(); // Zaustavlja skrol dok traje učitavanje

    gsap.to('.logo-glow', {
        backgroundColor: '#f9f0cf',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    tl.to('.ambient-glow', { opacity: 0.6, duration: 1.5, ease: 'power2.inOut' })
      .to('.logo-glow', { opacity: 0.4, scale: 1.05, duration: 2, ease: 'power2.out' }, "-=0.5")
      .fromTo('.logo-img', 
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' }, 
          "-=1.5"
      )
      .fromTo('.caffe-text', 
          { opacity: 0, y: 15, filter: 'blur(4px)' }, 
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }, 
          "-=0.7"
      )
      .fromTo('.garden-text', 
          { opacity: 0, y: 20, scale: 0.95, filter: 'blur(6px)', letterSpacing: '0em' }, 
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', letterSpacing: '0.1em', duration: 1.5, ease: 'expo.out' }, 
          "-=0.8"
      )
      .to('.logo-img, .caffe-text, .garden-text', { 
          scale: 1.02, 
          filter: 'drop-shadow(0px 0px 15px rgba(232, 208, 157, 0.4))', 
          duration: 1.5, 
          ease: 'power2.inOut' 
      }, "-=0.2")
      .to('.logo-img, .caffe-text, .garden-text, .logo-glow', { 
          scale: 0.95, 
          opacity: 0, 
          filter: 'blur(10px)', 
          duration: 0.8, 
          ease: 'power2.in' 
      })
      .to('.loader-screen', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
      .from('.hero-image', { scale: 1.15, duration: 2, ease: 'power3.out' }, '-=1.2')
      .to('.hero-title .line span', { y: '0%', stagger: 0.15, duration: 1.2, ease: 'power3.out' }, '-=1')
      .to('.hero-subtitle span', { y: '0%', duration: 1, ease: 'power3.out' }, '-=1')
      .to('.hero-cta', { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => lenis.start() }, '-=0.5');
      
    const menuData = [
        {
            category: "☕ TOPLI NAPICI",
            items: [
                { name: "Espresso", price: "190 rsd", img: "Meni/topli/1.png" },
                { name: "Espresso sa šlagom", price: "210 rsd", img: "Meni/topli/2.png" },
                { name: "Espresso sa mlekom", price: "210 rsd", img: "Meni/topli/3.png" },
                { name: "Cappuccino", price: "220 rsd", img: "Meni/topli/4.png" },
                { name: "Domaća kafa", price: "150 rsd", img: "Meni/topli/5.png" },
                { name: "Domaća kafa sa mlekom", price: "170 rsd", img: "Meni/topli/6.png" },
                { name: "Domaća kafa sa šlagom", price: "170 rsd", img: "Meni/topli/7.png" },
                { name: "Nes kafa", price: "230 rsd", img: "Meni/topli/8.png" },
                { name: "Nes kafa sa ukusima", desc: "čokolada, karamela, pistać, kokos, lešnik, badem", price: "260 rsd", img: "Meni/topli/9.png" },
                { name: "Nes kafa sa šlagom", price: "270 rsd", img: "Meni/topli/10.png" },
                { name: "Freddo espresso", price: "240 rsd", img: "Meni/topli/11.png" },
                { name: "Espresso affogato", price: "310 rsd", img: "Meni/topli/12.png" },
                { name: "Irska kafa", price: "470 rsd", img: "Meni/topli/13.png" },
                { name: "Irska kafa sa šlagom", price: "530 rsd", img: "Meni/topli/14.png" },
                { name: "Late sa ukusima", desc: "vanila, čokolada, čoko-lešnik, karamela, pistać, kokos, lešnik, badem, cimet", price: "320 rsd", img: "Meni/topli/15.png" },
                { name: "Topla čokolada (crna i bela)", price: "260 rsd", img: "Meni/topli/16.png" },
                { name: "Plazma šejk", price: "390 rsd", img: "Meni/topli/17.png" },
                { name: "Frappe", price: "300 rsd", img: "Meni/topli/18.png" },
                { name: "Čokoplaz", price: "300 rsd", img: "Meni/topli/0-.png" },
                { name: "Čajevi", desc: "kamilica, nana, zeleni, crni, đumbir, jagoda-jogurt, bobičasto voće, jabuka cimet", price: "220 rsd", img: "Meni/topli/20.png" },
                { name: "Kuvano vino", price: "310 rsd", img: "Meni/topli/21.png" },
                { name: "Sojino mleko dodatak", price: "60 rsd", img: "Meni/topli/22.png" },
                { name: "Duplo mleko dodatak", price: "100 rsd", img: "Meni/topli/23.png" }
            ]
        },
        {
            category: "🧃 SOKOVI",
            items: [
                { name: "Next sokovi 0.2l", desc: "đus, breskva, jabuka, jagoda, koktel", price: "270 rsd", img: "Meni/sokovi/1.png" },
                { name: "Fuze tea 0.25l", price: "270 rsd", img: "Meni/sokovi/2.png" },
                { name: "Gusto ananas 0.2l", price: "270 rsd", img: "Meni/sokovi/3.png" },
                { name: "Coca cola 0.25l", price: "230 rsd", img: "Meni/sokovi/4.png" },
                { name: "Coca cola zero 0.25l", price: "230 rsd", img: "Meni/sokovi/5.png" },
                { name: "Cocta 0.25l", price: "230 rsd", img: "Meni/sokovi/6.png" },
                { name: "Cocta free 0.25l", price: "230 rsd", img: "Meni/sokovi/7.png" },
                { name: "Fanta 0.25l", price: "230 rsd", img: "Meni/sokovi/8.png" },
                { name: "Sprite 0.25l", price: "230 rsd", img: "Meni/sokovi/9.png" },
                { name: "Schweppes tonic 0.25l", price: "260 rsd", img: "Meni/sokovi/10.png" },
                { name: "Schweppes bitter 0.25l", price: "260 rsd", img: "Meni/sokovi/11.png" },
                { name: "Orangina 0.25l", price: "270 rsd", img: "Meni/sokovi/12.png" },
                { name: "Cedevita", desc: "limun, limeta, narandža, ananas mango", price: "210 rsd", img: "Meni/sokovi/13.png" }
            ]
        },
        {
            category: "⚡ ENERGETSKA PIĆA",
            items: [
                { name: "Red bull 0.25l", price: "360 rsd", img: "Meni/energetska/1.png" },
                { name: "Ultra energy 0.25l", price: "260 rsd", img: "Meni/energetska/2.png" }
            ]
        },
        {
            category: "💧 VODE",
            items: [
                { name: "Rosa 0.33l", price: "190 rsd", img: "Meni/voda/1.png" },
                { name: "Rosa gazirana 0.33l", price: "190 rsd", img: "Meni/voda/2.png" },
                { name: "Rosa 0.75l", price: "290 rsd", img: "Meni/voda/3.png" },
                { name: "Rosa gazirana 0.75l", price: "290 rsd", img: "Meni/voda/4.png" },
                { name: "Romerquelle lemongrass 0.33l", price: "230 rsd", img: "Meni/voda/5.png" }
            ]
        },
        {
            category: "🍊 CEĐENI SOKOVI",
            items: [
                { name: "Imuno mix", desc: "jabuka, pomorandža, šargarepa, đumbir", price: "390 rsd", img: "Meni/cedjeni/1.png" },
                { name: "Pleasure mix", desc: "pomorandža, grejpfrut, limun, med", price: "400 rsd", img: "Meni/cedjeni/2.png" },
                { name: "Fitness mix", desc: "jabuka, ananas, pomorandža", price: "390 rsd", img: "Meni/cedjeni/3.png" },
                { name: "Elixir mix", desc: "malina, ananas, pomorandža, med", price: "390 rsd", img: "Meni/cedjeni/4.png" },
                { name: "Green mix", desc: "pomorandža, banana, kivi, ananas, jabuka", price: "440 rsd", img: "Meni/cedjeni/5.png" },
                { name: "Free mix", desc: "kombinacija po želji", price: "440 rsd", img: "Meni/cedjeni/6.png" },
                { name: "Ice tea", desc: "borovnica, jagoda, malina, kruška, kivi, ananas, mango, breskva", price: "310 rsd", img: "Meni/cedjeni/7.png" },
                { name: "Limunada 0.25l", price: "240 rsd", img: "Meni/cedjeni/8.png" },
                { name: "Limunada sa ukusom 0.25l", desc: "jagoda, višnja, zova, menta, malina, lubenica, šumsko voće", price: "290 rsd", img: "Meni/cedjeni/9.png" },
                { name: "Pomorandža 0.25l", price: "350 rsd", img: "Meni/cedjeni/10.png" },
                { name: "Ananas 0.25l", price: "420 rsd", img: "Meni/cedjeni/11.png" },
                { name: "Grejp 0.25l", price: "360 rsd", img: "Meni/cedjeni/12.png" }
            ]
        },
        {
            category: "🍰 KOLAČI I SLADOLED",
            items: [
                { name: "Sladoled kugla 70g", desc: "čokolada, vanila, jagoda, malina, marakuja, snikers, pistać", price: "190 rsd", img: "Meni/kis/2.png" },
                { name: "Plazma karamel", price: "430 rsd", img: "Meni/kis/1.png" },
                { name: "Capri - posni kolač", price: "430 rsd", img: "Meni/kis/kpr.png" },
                { name: "Pistać", price: "450 rsd", img: "Meni/kis/pstc.png" },
                { name: "Cheesecake", price: "440 rsd", img: "Meni/kis/cez.png" },
                { name: "Plazma-malina", price: "440 rsd", img: "Meni/kis/plazma.png" },
                { name: "Kinder Bueno", price: "450 rsd", img: "Meni/kis/knd.png" }
            ]
        },
        {
            category: "🍨 LETNJI MENI",
            items: [
                { name: "Kapri Kup", desc: "sveže voće, sladoled od jagode/maline, čokolada crna, šlag", price: "590 rsd", img: "Meni/letnjimeni/j.png" },
                { name: "Garden Kup", desc: "sveže voće, sladoled mix, sladoled vanila", price: "590 rsd", img: "Meni/letnjimeni/garden.png" },
                { name: "Snikers Kup", desc: "banana, orasi, sladoled snikers, sladoled crna čokolada", price: "590 rsd", img: "Meni/letnjimeni/b.png" },
                { name: "Tropical Kup", desc: "passionfruit, sladoled mango, sladoled marakuja", price: "590 rsd", img: "Meni/letnjimeni/p.png" },
                { name: "Malina pistać kup", desc: "sveže maline, sladoled pistać, sladoled malina", price: "590 rsd", img: "Meni/letnjimeni/k.png" },
                { name: "Perice moja merice", desc: "kombinacija po vašem izboru", price: "590 rsd", img: "Meni/letnjimeni/perica.png" },
                { name: "Gelato kugla sladoleda", desc: "pistać, belgijska čokolada, crna veganska čokolada, malina, marakuja, mango, snikers, kivi, vanila", price: "190 rsd", img: "Meni/letnjimeni/glt.png" }
            ]
        },
        {
            category: "🧀 CAFFE GARDEN DASKE",
            items: [
                { name: "Daska za 4 osobe", desc: "suhomesnati proizvodi, sirevi i zapečeni hleb", price: "1700 din", img: "Meni/daske/velika.png" },
                { name: "Mala daska za 2 osobe", desc: "suhomesnati proizvodi, sirevi i zapečeni hleb", price: "900 din", img: "Meni/daske/mala.png" }
            ]
        },
        {
            category: "🍹 BEZALKOHOLNI KOKTELI",
            items: [
                { name: "Batman", desc: "sok od narandže, grenadin, kisela voda", price: "360 rsd", img: "Meni/kokteli/bzalk1.png" },
                { name: "Cinderella", desc: "sok od narandže, limuna, ananasa", price: "380 rsd", img: "Meni/kokteli/bzalk2.png" },
                { name: "Pineapple power", desc: "ananas, med, đumbir", price: "390 rsd", img: "Meni/kokteli/bzalk3.png" },
                { name: "Virgin mojito", desc: "limeta, nana, sprite", price: "450 rsd", img: "Meni/kokteli/bzalk4.png" }
            ]
        },
        {
            category: "🍸 KOKTELI",
            items: [
                { name: "Pink Lady", desc: "džin, grenadina, baileys, limun", price: "630 rsd", img: "Meni/kokteli/ldp.png" },
                { name: "Gordon's Pink Tonic", price: "570 rsd", img: "Meni/kokteli/gpp.png" },
                { name: "Gordon's Lime Tonic", desc: "gordon's džin, tonic, limeta", price: "570 rsd", img: "Meni/kokteli/gsl.png" },
                { name: "Pina Colada", desc: "beli rum, tamni rum, kokos, ananas", price: "530 rsd", img: "Meni/kokteli/155.png" },
                { name: "Gin Sour", desc: "džin, limun, sirup od višnje", price: "430 rsd", img: "Meni/kokteli/5.png" },
                { name: "Campari Spritz", desc: "campari, prosecco, kisela voda", price: "580 rsd", img: "Meni/kokteli/stripi.png" },
                { name: "Đus vodka", price: "470 rsd", img: "Meni/kokteli/7.png" },
                { name: "Džin tonic", price: "470 rsd", img: "Meni/kokteli/8.png" },
                { name: "Mojito", desc: "rum, limeta, nana, sprajt", price: "550 rsd", img: "Meni/kokteli/9.png" },
                { name: "Raspberry Mojito", desc: "svetli rum, malina, nana, kisela voda", price: "600 rsd", img: "Meni/kokteli/10.png" },
                { name: "Gorki Spritz", desc: "gorki list, prosecco, sprajt", price: "490 rsd", img: "Meni/kokteli/11.png" },
                { name: "Garden", desc: "svetli rum, triple sec, sok od pomorandže, sok od ananasa, blue curacao", price: "600 rsd", img: "Meni/kokteli/12.png" },
                { name: "Aperol Spritz", desc: "prosecco, aperol, kisela voda", price: "570 rsd", img: "Meni/kokteli/1.png" },
                { name: "Hugo", desc: "sirup od zove, prosecco, kisela voda", price: "510 rsd", img: "Meni/kokteli/hugic.png" },
                { name: "Mai Tai", desc: "beli rum, narandža, ananas", price: "630 rsd", img: "Meni/kokteli/15.png" },
                { name: "Blue Lagoon", desc: "vodka, blue curacao, limun, sprite", price: "500 rsd", img: "Meni/kokteli/16.png" },
                { name: "Sex on the Beach", desc: "vodka, breskva, narandža, sok od borovnice", price: "560 rsd", img: "Meni/kokteli/17.png" },
                { name: "Tequila Sunrise", desc: "tequila, juice, grenadine", price: "580 rsd", img: "Meni/kokteli/18.png" },
                { name: "Cosmopolitan", desc: "vodka, triple sec, borovnica", price: "540 rsd", img: "Meni/kokteli/19.png" },
                { name: "Strawberry Margarita", desc: "tequila, limeta, jagoda", price: "560 rsd", img: "Meni/kokteli/20.png" },
                { name: "Long Island", desc: "vodka, tequila, rum, džin, coca-cola, triple sec, sok od limuna", price: "850 rsd", img: "Meni/kokteli/21.png" },
                { name: "Negroni", desc: "džin, vermut, campari liker, narandža", price: "600 rsd", img: "Meni/kokteli/22.png" }
            ]
        },
        {
            category: "🥃 DOMAĆE RAKIJE",
            items: [
                { name: "Viljamovka Destilerija 0.03l", price: "260 rsd", img: "Meni/domacarakija/1.png" },
                { name: "Šljiva Destilerija 0.03l", price: "260 rsd", img: "Meni/domacarakija/2.png" },
                { name: "Kajsija Destilerija 0.03l", price: "260 rsd", img: "Meni/domacarakija/3.png" },
                { name: "Dunja Destilerija 0.03l", price: "260 rsd", img: "Meni/domacarakija/4.png" },
                { name: "Medovača 0.03l", price: "210 rsd", img: "Meni/domacarakija/5.png" },
                { name: "Zlatna Viljamovka 0.03l", price: "270 rsd", img: "Meni/domacarakija/6.png" },
                { name: "Zlatna Kajsija 0.03l", price: "270 rsd", img: "Meni/domacarakija/7.png" },
                { name: "Takovo Viljamovka 0.03l", price: "260 rsd", img: "Meni/domacarakija/8.png" },
                { name: "Šljiva Sokolova 0.03l", price: "290 rsd", img: "Meni/domacarakija/9.png" }
            ]
        },
        {
            category: "👑 EMPERUS RAKIJE",
            items: [
                { name: "Emperus Zora", desc: "šljivovica, barik 7 god 0.03l", price: "260 rsd", img: "Meni/emparusrakije/1.png" },
                { name: "Emperus Zora", desc: "dunjevača, barik 3 god 0.03l", price: "270 rsd", img: "Meni/emparusrakije/2.png" },
                { name: "Voždov grumen", desc: "rakija od kajsije 0.03l", price: "290 rsd", img: "Meni/emparusrakije/3.png" }
            ]
        }
    ];

    const categoryFilters = document.getElementById('category-filters');
    const menuGrid = document.getElementById('menu-grid');
    let activeCategoryIndex = 0;

    // Render Categories
    menuData.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = `whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border flex-shrink-0 ${index === activeCategoryIndex ? 'bg-garden-gold text-garden-dark border-garden-gold shadow-[0_0_15px_rgba(194,165,120,0.3)]' : 'bg-transparent text-garden-cream/60 border-garden-cream/10 hover:border-garden-cream/30 hover:text-garden-cream'}`;
        btn.textContent = cat.category;
        btn.addEventListener('click', () => switchCategory(index, btn));
        categoryFilters.appendChild(btn);
    });

    function switchCategory(index, btnElement) {
        if (activeCategoryIndex === index) return;
        activeCategoryIndex = index;

        Array.from(categoryFilters.children).forEach((btn, i) => {
            if (i === index) {
                btn.className = `whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border flex-shrink-0 bg-garden-gold text-garden-dark border-garden-gold shadow-[0_0_15px_rgba(194,165,120,0.3)]`;
                
                // POPRAVLJEN BAG: Računamo poziciju za scroll kontejnera, čime izbegavamo nativni scrollIntoView koji izaziva skakanje cele stranice vertikalno
                const scrollLeft = btn.offsetLeft - (categoryFilters.clientWidth / 2) + (btn.clientWidth / 2);
                categoryFilters.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            } else {
                btn.className = `whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border flex-shrink-0 bg-transparent text-garden-cream/60 border-garden-cream/10 hover:border-garden-cream/30 hover:text-garden-cream`;
            }
        });

        gsap.to('.menu-card-anim', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.02,
            onComplete: () => {
                renderMenuItems(index);
                ScrollTrigger.refresh();
            }
        });
    }

    function renderMenuItems(index) {
        menuGrid.innerHTML = '';
        const items = menuData[index].items;
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card-anim opacity-0 translate-y-4 glass-card group relative bg-garden-espresso/40 backdrop-blur-md border border-garden-cream/5 rounded-2xl overflow-hidden hover:border-garden-gold/30 hover:bg-garden-espresso/60 transition-all duration-500 ease-out flex flex-col h-full shadow-lg hover:shadow-[0_8px_30px_rgba(194,165,120,0.1)]';
            
            card.innerHTML = `
                <div class="w-full aspect-[4/3] bg-garden-dark/50 relative overflow-hidden flex-shrink-0">
                    <img src="${item.img}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100">
                    <div class="absolute inset-0 bg-gradient-to-t from-garden-espresso/90 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                <div class="absolute top-3 right-3 bg-garden-gold/95 backdrop-blur-md text-garden-dark text-[11px] md:text-sm font-bold tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-[0_4px_15px_rgba(194,165,120,0.4)] z-10 whitespace-nowrap">
                    ${item.price}
                </div>
                
                <div class="p-4 md:p-6 flex-1 flex flex-col justify-start relative z-10 bg-gradient-to-b from-transparent to-garden-espresso/60">
                    <h3 class="text-[15px] sm:text-base md:text-xl font-serif mb-1.5 md:mb-2 text-garden-cream leading-tight group-hover:text-garden-gold transition-colors duration-300 pr-2">${item.name}</h3>
                    ${item.desc ? `<p class="text-garden-cream/60 text-[11px] md:text-xs font-light mb-auto leading-relaxed line-clamp-3">${item.desc}</p>` : '<div class="mb-auto"></div>'}
                </div>
            `;
            menuGrid.appendChild(card);
        });

        gsap.to('.menu-card-anim', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.2)'
        });
    }

    renderMenuItems(0);

    // Business Hours Logic
    const hoursList = document.getElementById('hours-list');
    const statusBadge = document.getElementById('status-badge');
    const statusText = statusBadge.querySelector('.status-text');
    const statusDot = statusBadge.querySelector('.status-dot');
    
    const now = new Date();
    const belgradeTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Belgrade"}));
    const day = belgradeTime.getDay();
    const hours = belgradeTime.getHours();

    const dayItems = hoursList.querySelectorAll('li');
    dayItems.forEach(item => {
        if (parseInt(item.dataset.day) === day) {
            item.classList.add('text-garden-gold', 'font-semibold', 'bg-garden-gold/5', '-mx-2', 'px-2', 'rounded');
            item.classList.remove('text-sm', 'font-light');
            item.classList.add('text-base');
            
            let isOpen = false;
            if (day >= 1 && day <= 4) { 
                if (hours >= 8 && hours < 24) isOpen = true;
            } else if (day === 5 || day === 6) { 
                if (hours >= 8 || hours < 1) isOpen = true; 
            } else if (day === 0) { 
                if (hours >= 8 && hours < 24) isOpen = true;
            }

            if (isOpen) {
                statusText.textContent = 'Otvoreno';
                statusBadge.classList.add('border-green-500/30', 'text-green-500', 'bg-green-500/10');
                statusDot.classList.add('bg-green-500');
            } else {
                statusText.textContent = 'Zatvoreno';
                statusBadge.classList.add('border-red-500/30', 'text-red-500', 'bg-red-500/10');
                statusDot.classList.add('bg-red-500');
            }
        }
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if(isMenuOpen) {
            lenis.stop();
            mobileMenu.classList.remove('pointer-events-none');
            gsap.to(mobileMenu, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(line1, { rotation: 45, y: 3.5, duration: 0.3, ease: 'power2.inOut' });
            gsap.to(line2, { rotation: -45, y: -3.5, duration: 0.3, ease: 'power2.inOut' });
            gsap.to('.menu-item-anim', { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                stagger: 0.1, 
                ease: 'back.out(1.2)',
                delay: 0.2
            });
        } else {
            lenis.start();
            mobileMenu.classList.add('pointer-events-none');
            gsap.to('.menu-item-anim', { opacity: 0, y: 10, duration: 0.3, stagger: 0.05, ease: 'power2.in' });
            gsap.to(mobileMenu, { opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.in' });
            gsap.to(line1, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.2 });
            gsap.to(line2, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.2 });
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // FIX ZA NAVIGACIJU - OVO SPREČAVA TELEPORTOVANJE I KONFLIKT KLIKOVA
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (isMenuOpen && this.classList.contains('mobile-nav-link')) {
                    toggleMenu();
                }
                
                lenis.scrollTo(targetElement, {
                    offset: targetId === '#menu' ? -80 : 0, 
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-link');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

    lenis.on('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        mobileMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Lightbox for Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const galleryImgs = document.querySelectorAll('.gallery-col img');

    galleryImgs.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('pointer-events-none');
            lenis.stop();
            gsap.to(lightbox, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            gsap.to(lightboxImg, { scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 });
        });
    });

    function closeLightbox() {
        gsap.to(lightboxImg, { scale: 0.95, duration: 0.3, ease: 'power2.in' });
        gsap.to(lightbox, { 
            opacity: 0, 
            duration: 0.4, 
            ease: 'power2.in',
            onComplete: () => {
                lightbox.classList.add('pointer-events-none');
                lightboxImg.src = '';
                lenis.start();
            }
        });
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
});