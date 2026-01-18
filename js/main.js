// js/main.js

// 1. Initialize Icons
lucide.createIcons();

// 2. Register GSAP
gsap.registerPlugin(ScrollTrigger);

// 3. Navbar Blur Logic
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('py-4', 'bg-black/90');
            nav.classList.remove('py-6', 'bg-transparent');
        } else {
            nav.classList.add('py-6', 'bg-transparent');
            nav.classList.remove('py-4', 'bg-black/90');
        }
    }
});

// 4. Hero Animations
if(document.querySelector('.hero-title')) {
    const tl = gsap.timeline();
    tl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 })
      .from('.hero-title', { y: 50, opacity: 0, duration: 1 }, "-=0.8")
      .from('.hero-desc', { y: 30, opacity: 0, duration: 1 }, "-=0.8")
      .from('.hero-btn', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
}

// 5. Standard Fade Up
gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 6. Counter Animation (For Home Page Stats)
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target')); 
    const isDecimal = counter.getAttribute('data-target').includes('.');
    
    ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
            let obj = { val: 0 };
            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    counter.innerText = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
                }
            });
        }
    });
});

// 7. Chart Animation (For Home Page Graph)
gsap.utils.toArray('.chart-bar').forEach(bar => {
    const finalHeight = bar.getAttribute('data-height');
    ScrollTrigger.create({
        trigger: bar,
        start: "top 80%",
        onEnter: () => {
            bar.style.height = finalHeight;
        }
    });
});
