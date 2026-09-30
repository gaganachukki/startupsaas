
document.addEventListener('DOMContentLoaded', () => {
  // Particles
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": { "number": { "value": 50 }, "color": { "value": "#5c43f6" }, "shape": { "type": "circle" }, "opacity": { "value": 0.3 }, "size": { "value": 3 }, "line_linked": { "enable": true, "distance": 150, "color": "#5c43f6", "opacity": 0.2 }, "move": { "enable": true, "speed": 1.5 } },
      "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" } }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } } } }
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-ins & Staggers
    gsap.utils.toArray('.fade-in').forEach(el => gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
    gsap.utils.toArray('.stagger-group').forEach(group => {
      gsap.fromTo(group.querySelectorAll('.stagger-item'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: group, start: "top 85%" } });
    });

    // Text Reveal (Custom Split)
    document.querySelectorAll('.reveal-text').forEach(el => {
      let text = el.innerText;
      el.innerHTML = '';
      text.split(' ').forEach(word => {
        let outer = document.createElement('span');
        outer.style.display = 'inline-block'; outer.style.overflow = 'hidden'; outer.style.verticalAlign = 'top';
        let inner = document.createElement('span');
        inner.style.display = 'inline-block'; inner.innerText = word + '\u00A0'; inner.classList.add('word-inner');
        outer.appendChild(inner); el.appendChild(outer);
      });
      gsap.fromTo(el.querySelectorAll('.word-inner'), { y: '100%' }, { y: '0%', duration: 0.8, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });

    // Parallax Images
    gsap.utils.toArray('.parallax-img').forEach(img => {
      gsap.to(img, { yPercent: 20, ease: "none", scrollTrigger: { trigger: img.parentElement, scrub: true } });
    });

    // Image Scale up
    gsap.utils.toArray('.scale-up').forEach(img => {
      gsap.fromTo(img, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: img, start: "top 85%" } });
    });

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic-wrap');
    magnets.forEach(wrap => {
      const btn = wrap.querySelector('.magnetic-btn');
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
      });
      wrap.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });

    // Pricing Slider logic
    const priceSlider = document.getElementById('userSlider');
    const priceDisplay = document.getElementById('calcPrice');
    if (priceSlider && priceDisplay) {
        priceSlider.addEventListener('input', (e) => {
            const users = e.target.value;
            const cost = users * 12; // $12 per user
            document.getElementById('userCount').innerText = users;
            priceDisplay.innerText = '$' + cost;
        });
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal Scroll Pinning
    const pinContainers = document.querySelectorAll('.pin-wrap-container');
    pinContainers.forEach(container => {
        const pinWrap = container.querySelector('.pin-wrap');
        const scrollWidth = pinWrap.scrollWidth - window.innerWidth + 200;
        gsap.to(pinWrap, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: () => "+=" + scrollWidth
            }
        });
    });

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    });
    
    const interactables = document.querySelectorAll('a, button, .tilt-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });

    // Scroll Marquee Text direction
    const scrollMarquees = document.querySelectorAll('.scroll-marquee');
    scrollMarquees.forEach(mq => {
        gsap.to(mq, {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: mq,
                scrub: 1,
                start: "top bottom",
                end: "bottom top"
            }
        });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // Before/After Slider
    const baSlider = document.querySelector('.ba-slider');
    if(baSlider) {
        let isDragging = false;
        const afterImg = baSlider.querySelector('.ba-after');
        const handle = baSlider.querySelector('.ba-handle');
        
        const updateSlider = (e) => {
            const rect = baSlider.getBoundingClientRect();
            let x = e.clientX - rect.left;
            // Handle touch events
            if(e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left;
            }
            if(x < 0) x = 0;
            if(x > rect.width) x = rect.width;
            let percent = (x / rect.width) * 100;
            afterImg.style.width = percent + '%';
            handle.style.left = percent + '%';
        };

        baSlider.addEventListener('mousedown', () => isDragging = true);
        baSlider.addEventListener('touchstart', () => isDragging = true, {passive: true});
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('mousemove', (e) => { if(isDragging) updateSlider(e); });
        window.addEventListener('touchmove', (e) => { if(isDragging) updateSlider(e); }, {passive: true});
    }

    // Auto-Typing Terminal
    const typer = document.getElementById('typer');
    const output = document.getElementById('type-output');
    if(typer) {
        const commands = [
            { cmd: "stackly deploy --prod", out: "[OK] Building bundle...\n[OK] Deployed to Edge network in 1.2s" },
            { cmd: "stackly sync --github", out: "Fetching latest commits...\nSync complete. 4 files updated." },
            { cmd: "stackly analyze --q3", out: "Analyzing Q3 metrics...\nMRR: +14%\nChurn: -2%\nReport generated." }
        ];
        let cmdIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentCmd = commands[cmdIndex].cmd;
            
            if(isDeleting) {
                typer.innerText = currentCmd.substring(0, charIndex - 1);
                charIndex--;
                if(charIndex === 0) {
                    isDeleting = false;
                    cmdIndex = (cmdIndex + 1) % commands.length;
                    output.innerHTML = "";
                    setTimeout(type, 500);
                    return;
                }
            } else {
                typer.innerText = currentCmd.substring(0, charIndex + 1);
                charIndex++;
                if(charIndex === currentCmd.length) {
                    output.innerHTML = commands[cmdIndex].out.replace(/\n/g, "<br>");
                    isDeleting = true;
                    setTimeout(type, 3000); // pause before delete
                    return;
                }
            }
            setTimeout(type, isDeleting ? 30 : 70);
        }
        setTimeout(type, 1000);
    }

    // GSAP tied animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Chart Bars
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach(bar => {
            ScrollTrigger.create({
                trigger: '.chart-container',
                start: "top 80%",
                onEnter: () => bar.classList.add('in-view')
            });
        });

        // Vertical Scroll Line
        const pathWrap = document.querySelector('.scroll-path-wrap');
        const lineFill = document.querySelector('.scroll-line-fill');
        if(pathWrap && lineFill) {
            gsap.to(lineFill, {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: pathWrap,
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: true
                }
            });
        }
    }
});
