
document.addEventListener("DOMContentLoaded", () => {

    console.log("Mohammad Nathan Portfolio Ready!");

    // TAHUN OTOMATIS
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // MOBILE NAVIGATION
    const menuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    function closeMenu() {
        if (!menuButton || !navMenu) return;

        navMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Buka menu");
    }

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            const opened = navMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(opened)
            );

            menuButton.setAttribute(
                "aria-label",
                opened ? "Tutup menu" : "Buka menu"
            );

        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 680) closeMenu();
        });
    }

    // SCROLL REVEAL ANIMATION
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            { threshold: 0.12 }
        );

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("visible");
        });

    }

    // ACTIVE NAVIGATION
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );

                    });

                });

            },
            { rootMargin: "-35% 0px -55% 0px" }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }

    // SCROLL PROGRESS BAR
    const progressBar = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");

    let ticking = false;

    function updateScrollUI() {

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (backToTop) {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 450
            );
        }

        ticking = false;
    }

    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(updateScrollUI);

            ticking = true;
        }

    }, { passive: true });

    updateScrollUI();

    // BACK TO TOP
    if (backToTop) {

        backToTop.addEventListener("click", () => {

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });

        });

    }

    // CARD 3D HOVER EFFECT
    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (canHover) {

        document.querySelectorAll(
            ".project-card, .skill"
        ).forEach(card => {

            card.addEventListener("pointermove", event => {

                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                card.style.setProperty(
                    "--pointer-x",
                    `${x * 10}px`
                );

                card.style.setProperty(
                    "--pointer-y",
                    `${y * 8}px`
                );

            });

            card.addEventListener("pointerleave", () => {

                card.style.removeProperty("--pointer-x");
                card.style.removeProperty("--pointer-y");

            });

        });

    }

    // ROLE TEXT ANIMATION
    const typedRole = document.getElementById("typedRole");

    if (typedRole) {

        const roles = [
            "Aspiring Developer",
            "Web Development Learner",
            "Technology Enthusiast",
            "Informatics Student"
        ];

        let roleIndex = 0;

        setInterval(() => {

            roleIndex = (roleIndex + 1) % roles.length;

            typedRole.style.opacity = "0";

            setTimeout(() => {

                typedRole.textContent = roles[roleIndex];

                typedRole.style.opacity = "1";

            }, 250);

        }, 3000);

        typedRole.style.transition = "opacity .25s ease";
    }

});

/* =================================
   EXTRA PORTFOLIO JAVASCRIPT
================================= */

// 1. DIGITAL CLOCK

function updateDigitalClock() {
    const clock = document.getElementById("digitalClock");
    const date = document.getElementById("digitalDate");

    if (!clock || !date) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString("id-ID", {
        hour12: false
    });

    date.textContent = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

updateDigitalClock();
setInterval(updateDigitalClock, 1000);


// 2. GREETING BERDASARKAN WAKTU

function updateGreeting() {
    const greeting = document.getElementById("timeGreeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    if (hour >= 4 && hour < 11) {
        greeting.textContent = "☀️ Good Morning!";
    } else if (hour >= 11 && hour < 15) {
        greeting.textContent = "🌤️ Good Afternoon!";
    } else if (hour >= 15 && hour < 18) {
        greeting.textContent = "🌇 Good Evening!";
    } else {
        greeting.textContent = "🌙 Good Night!";
    }
}

updateGreeting();
setInterval(updateGreeting, 60000);


// 3. MOUSE GLOW EFFECT

const mouseGlow = document.getElementById("mouseGlow");

if (mouseGlow) {
    document.addEventListener("mousemove", function(event) {
        mouseGlow.style.left = event.clientX + "px";
        mouseGlow.style.top = event.clientY + "px";
    });
}


// 4. PARTICLE BACKGROUND

const particleCanvas = document.getElementById("particleCanvas");

if (particleCanvas) {
    const ctx = particleCanvas.getContext("2d");

    let particles = [];
    let animationFrame;

    function resizeCanvas() {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        particleCanvas.width = window.innerWidth * ratio;
        particleCanvas.height = window.innerHeight * ratio;

        particleCanvas.style.width = window.innerWidth + "px";
        particleCanvas.style.height = window.innerHeight + "px";

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        createParticles();
    }

    function createParticles() {
        const count = Math.min(
            65,
            Math.floor(window.innerWidth / 18)
        );

        particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.35,
                speedY: (Math.random() - 0.5) * 0.35
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.speedY *= -1;
            }

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "rgba(212,175,55,0.65)";
            ctx.fill();
        });

        animationFrame = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    animateParticles();

    window.addEventListener("resize", resizeCanvas);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrame);
        } else {
            animateParticles();
        }
    });
}
const typingElement = document.getElementById("typing");

if (typingElement) {
    const words = [
        "Web Developer",
        "Computer Science Student",
        "Programmer",
        "Tech Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        typingElement.textContent = currentWord.substring(0, charIndex);

        if (!deleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (deleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            deleting = !deleting;

            if (!deleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(typeEffect, 700);
        }
    }

    typeEffect();
}

