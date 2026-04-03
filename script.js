document.addEventListener('DOMContentLoaded', function() {
    // Função global para scroll dos links do footer
    window.scrollToSection = function(sectionId) {
        console.log('scrollToSection called:', sectionId);
        const target = document.getElementById(sectionId);
        console.log('Target element:', target);
        if (target) {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            console.log('Scrolling to position:', targetPosition);
            window.scrollTo(0, targetPosition);
        } else {
            console.log('Target not found:', sectionId);
        }
    };

    const cursor = document.querySelector('.premium-cursor');
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isVisible = false;

        document.addEventListener('mousemove', (e) => {
            if (!isVisible) {
                isVisible = true;
                cursor.classList.add('visible');
            }
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseenter', () => {
            cursor.classList.add('visible');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('visible');
        });

        const animateCursor = () => {
            const lerp = (a, b, n) => (1 - n) * a + n * b;
            cursorX = lerp(cursorX, mouseX, 0.15);
            cursorY = lerp(cursorY, mouseY, 0.15);
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .service-card, .tab-btn, .logo, .nav-links li button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            }
        }
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const clickedCard = this;
            const clickedTooltip = clickedCard.querySelector('.tooltip');
            
            document.querySelectorAll('.service-card .tooltip').forEach(t => {
                t.classList.remove('active');
            });
            
            if (clickedTooltip) {
                clickedTooltip.classList.add('active');
            }
        });
    });

    document.body.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            document.querySelectorAll('.service-card .tooltip').forEach(t => {
                t.classList.remove('active');
            });
        }
    });

    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId) || document.getElementById(targetId.replace('#', ''));
            
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const heroShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Staggered Reveal Animation
        const revealElements = (selector, delay = 100) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 + (index * delay));
            });
        };

        revealElements('.hero-content > *');
        revealElements('.service-card', 150);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (el) => {
        const target = parseInt(el.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target + (el.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    let testimonialInterval;

    if (testimonialTrack && testimonials.length > 0) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.testimonial-dot');

        function goToTestimonial(index) {
            currentTestimonial = index;
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            goToTestimonial(currentTestimonial);
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            goToTestimonial(currentTestimonial);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetInterval();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetInterval();
        });

        function resetInterval() {
            clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }

        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ========== VIDEO PLAYER CUSTOMIZADO ==========
    const aboutVideo = document.getElementById('aboutVideo');
    const aboutVideoWrapper = document.getElementById('aboutVideoWrapper');
    const videoOverlay = document.getElementById('videoOverlay');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    if (aboutVideo && aboutVideoWrapper) {
        const playBtn = aboutVideoWrapper.querySelector('.play-button');
        
        // Botão de play no overlay
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                aboutVideo.play();
                aboutVideoWrapper.classList.add('video-playing');
            });
        }

        // Overlay também clica para dar play
        if (videoOverlay) {
            videoOverlay.addEventListener('click', function(e) {
                e.stopPropagation();
                aboutVideo.play();
                aboutVideoWrapper.classList.add('video-playing');
            });
        }

        // Botão de fullscreen
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (document.fullscreenElement || document.webkitFullscreenElement) {
                    if (document.exitFullscreen) document.exitFullscreen();
                    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                } else {
                    if (aboutVideo.requestFullscreen) aboutVideo.requestFullscreen();
                    else if (aboutVideo.webkitRequestFullscreen) aboutVideo.webkitRequestFullscreen();
                }
            });
        }

        // Clicar no vídeo durante reprodução para pausar
        aboutVideo.addEventListener('click', function() {
            if (!aboutVideo.paused) {
                aboutVideo.pause();
                aboutVideoWrapper.classList.remove('video-playing');
            }
        });

        // Quando o vídeo acaba, mostra o botão de play novamente
        aboutVideo.addEventListener('ended', function() {
            aboutVideoWrapper.classList.remove('video-playing');
        });
    }

    // ========== SISTEMA DE ADMIN INVISÍVEL PRO MAX ==========
    const AdminControl = {
        SECURITY_KEY: 'isabella_siqueira_2024_secure_' + window.location.hostname,
        SESSION_TOKEN_KEY: 'isabella_session_token',
        LOGIN_ATTEMPTS_KEY: 'isabella_login_attempts',
        LOCKOUT_KEY: 'isabella_lockout',
        DEFAULT_PASSWORD: 'adv2024isabella',

        hash: (str) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0;
            }
            return Math.abs(hash).toString(16);
        },

        encrypt: function(data) {
            try {
                const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
                return `${encoded}.${this.hash(this.SECURITY_KEY + encoded)}`;
            } catch (e) { return null; }
        },

        decrypt: function(encryptedStr) {
            try {
                const [data, hash] = encryptedStr.split('.');
                if (hash !== this.hash(this.SECURITY_KEY + data)) return null;
                return JSON.parse(decodeURIComponent(atob(data)));
            } catch (e) { return null; }
        },

        validateSession: function() {
            const encrypted = localStorage.getItem(this.SESSION_TOKEN_KEY);
            if (!encrypted) return false;
            const session = this.decrypt(encrypted);
            return session && session.token && Date.now() < session.expires;
        },

        saveSession: function() {
            const sessionData = {
                token: this.hash(Date.now() + Math.random().toString()),
                expires: Date.now() + (24 * 60 * 60 * 1000)
            };
            localStorage.setItem(this.SESSION_TOKEN_KEY, this.encrypt(sessionData));
        },

        init: function() {
            console.log("Admin System Ready. Use Ctrl+Shift+A for access.");
            if (this.validateSession()) {
                document.body.classList.add('admin-active');
            }
        }
    };

    // Bridge functions for legacy UI calls
    const hashPassword = (p) => AdminControl.hash(p);
    const getAdminPassword = () => AdminControl.hash(AdminControl.DEFAULT_PASSWORD);
    const saveSecureSession = () => AdminControl.saveSession();
    const validateSession = () => AdminControl.validateSession();
    const recordFailedLogin = () => { /* Simplified for now */ };
    const resetLoginAttempts = () => { /* Simplified for now */ };
    const checkLoginAttempts = () => { return { locked: false }; };

    AdminControl.init();

    function createCustomVideoPlayer(videoElement, wrapper) {
        videoElement.controls = false;
        videoElement.controlsList = "nodownload noplaybackrate";
        videoElement.disablePictureInPicture = true;
        videoElement.style.cursor = 'pointer';
        
        const playButton = document.createElement('div');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.className = 'custom-play-btn';
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: transparent;
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        playButton.querySelector('i').style.cssText = `
            font-size: 30px;
            color: white;
            margin-left: 5px;
        `;
        
        const fullscreenButton = document.createElement('div');
        fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenButton.className = 'custom-fullscreen-btn';
        fullscreenButton.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: transparent;
            border: 2px solid white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
        `;
        fullscreenButton.querySelector('i').style.cssText = `
            font-size: 20px;
            color: white;
        `;
        
        fullscreenButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            } else {
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.webkitRequestFullscreen) {
                    videoElement.webkitRequestFullscreen();
                } else if (videoElement.msRequestFullscreen) {
                    videoElement.msRequestFullscreen();
                }
            }
        });
        
        function updateFullscreenButtonIcon() {
            fullscreenButton.querySelector('i').style.cssText = `
                font-size: 20px;
                color: white;
            `;
        }
        
        document.addEventListener('fullscreenchange', function() {
            if (document.fullscreenElement) {
                fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
            }
            updateFullscreenButtonIcon();
        });
        
        document.addEventListener('webkitfullscreenchange', function() {
            if (document.webkitFullscreenElement) {
                fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
            }
            updateFullscreenButtonIcon();
        });
        
        let fullscreenPlayBtn = null;
        let fullscreenFsBtn = null;
        
        function createFullscreenControls() {
            videoElement.controls = false;
            videoElement.style.cursor = 'default';
            
            const fsContainer = document.fullscreenElement || document.webkitFullscreenElement;
            
            fullscreenPlayBtn = document.createElement('div');
            fullscreenPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            fullscreenPlayBtn.id = 'fs-play-btn';
            fullscreenPlayBtn.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                background: transparent !important;
                border: 3px solid white !important;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 2147483647;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            `;
            fullscreenPlayBtn.querySelector('i').style.cssText = `
                font-size: 40px;
                color: white !important;
                margin-left: 8px;
            `;
            
            fullscreenFsBtn = document.createElement('div');
            fullscreenFsBtn.innerHTML = '<i class="fas fa-compress"></i>';
            fullscreenFsBtn.id = 'fs-exit-btn';
            fullscreenFsBtn.style.cssText = `
                position: absolute;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: transparent !important;
                border: 2px solid white !important;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 2147483647;
            `;
            fullscreenFsBtn.querySelector('i').style.cssText = `
                font-size: 24px;
                color: white !important;
            `;
            
            fullscreenPlayBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (videoElement.paused) {
                    videoElement.play();
                    fullscreenPlayBtn.style.display = 'none';
                } else {
                    videoElement.pause();
                    fullscreenPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                    fullscreenPlayBtn.querySelector('i').style.marginLeft = '8px';
                    fullscreenPlayBtn.style.display = 'flex';
                }
            });
            
            fullscreenFsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            });
            
            fsContainer.appendChild(fullscreenPlayBtn);
            fsContainer.appendChild(fullscreenFsBtn);
            
            let fsControlsTimeout;
            fsContainer.addEventListener('mousemove', function() {
                fullscreenPlayBtn.style.opacity = '1';
                fullscreenFsBtn.style.opacity = '1';
                clearTimeout(fsControlsTimeout);
                fsControlsTimeout = setTimeout(function() {
                    if (!videoElement.paused) {
                        fullscreenPlayBtn.style.opacity = '0';
                        fullscreenFsBtn.style.opacity = '0';
                    }
                }, 3000);
            });
            
            videoElement.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!videoElement.paused) {
                    videoElement.pause();
                    fullscreenPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                    fullscreenPlayBtn.querySelector('i').style.marginLeft = '8px';
                    fullscreenPlayBtn.style.display = 'flex';
                    fullscreenPlayBtn.style.opacity = '1';
                    fullscreenFsBtn.style.opacity = '1';
                    clearTimeout(fsControlsTimeout);
                    fsControlsTimeout = setTimeout(function() {
                        fullscreenPlayBtn.style.opacity = '0';
                        fullscreenFsBtn.style.opacity = '0';
                    }, 3000);
                }
            });
            
            videoElement.addEventListener('pause', function() {
                if (!videoElement.ended) {
                    fullscreenPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                    fullscreenPlayBtn.querySelector('i').style.marginLeft = '8px';
                    fullscreenPlayBtn.style.display = 'flex';
                    fullscreenPlayBtn.style.opacity = '1';
                    fullscreenFsBtn.style.opacity = '1';
                }
            });
            
            videoElement.addEventListener('ended', function() {
                fullscreenPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                fullscreenPlayBtn.querySelector('i').style.marginLeft = '8px';
                fullscreenPlayBtn.style.display = 'flex';
                fullscreenPlayBtn.style.opacity = '1';
                fullscreenFsBtn.style.opacity = '1';
            });
        }
        
        function removeFullscreenControls() {
            if (fullscreenPlayBtn && fullscreenPlayBtn.parentElement) {
                fullscreenPlayBtn.parentElement.removeChild(fullscreenPlayBtn);
                fullscreenPlayBtn = null;
            }
            if (fullscreenFsBtn && fullscreenFsBtn.parentElement) {
                fullscreenFsBtn.parentElement.removeChild(fullscreenFsBtn);
                fullscreenFsBtn = null;
            }
        }
        
        document.addEventListener('fullscreenchange', function() {
            if (document.fullscreenElement) {
                createFullscreenControls();
            } else {
                removeFullscreenControls();
            }
        });
        
        document.addEventListener('webkitfullscreenchange', function() {
            if (document.webkitFullscreenElement) {
                createFullscreenControls();
            } else {
                removeFullscreenControls();
            }
        });
        
        function updatePlayButtonIcon() {
            playButton.querySelector('i').style.cssText = `
                font-size: 30px;
                color: white;
                margin-left: 5px;
            `;
        }
        
        playButton.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play();
                playButton.style.opacity = '0';
                playButton.style.pointerEvents = 'none';
            } else {
                videoElement.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.style.opacity = '1';
                playButton.style.pointerEvents = 'auto';
                updatePlayButtonIcon();
            }
        });
        
        videoElement.addEventListener('click', function() {
            if (!videoElement.paused) {
                videoElement.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.style.opacity = '1';
                playButton.style.pointerEvents = 'auto';
                updatePlayButtonIcon();
            }
        });
        
        videoElement.parentElement.style.position = 'relative';
        videoElement.parentElement.appendChild(playButton);
        videoElement.parentElement.appendChild(fullscreenButton);
        
        videoElement.addEventListener('ended', function() {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.opacity = '1';
            playButton.style.pointerEvents = 'auto';
            updatePlayButtonIcon();
        });
        
        videoElement.addEventListener('pause', function() {
            if (!videoElement.ended) {
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.style.opacity = '1';
                playButton.style.pointerEvents = 'auto';
                updatePlayButtonIcon();
            }
        });
    }

    function initAdminSystem() {
        // Criar estilos do admin
        const adminStyles = document.createElement('style');
        adminStyles.textContent = `
            .admin-panel-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9998;
                display: none;
            }
            .admin-panel-overlay.active {
                display: block;
            }
            .admin-full-panel {
                position: fixed;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: #1a1a2e;
                z-index: 9999;
                transition: left 0.3s ease;
                overflow-y: auto;
                box-shadow: none;
            }
            .admin-full-panel.open {
                left: 0;
            }
            .admin-panel-header {
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                padding: 25px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .admin-panel-header h2 {
                margin: 0;
                font-size: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .admin-close-panel {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.3s;
            }
            .admin-close-panel:hover {
                background: rgba(255,255,255,0.3);
                transform: rotate(90deg);
            }
            .admin-panel-content {
                padding: 20px;
            }
            .admin-section-edit {
                background: #16213e;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
            }
            .admin-section-edit h3 {
                color: #6366f1;
                margin: 0 0 15px 0;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .admin-field {
                margin-bottom: 15px;
            }
            .admin-field label {
                display: block;
                color: #94a3b8;
                font-size: 12px;
                margin-bottom: 6px;
                font-weight: 500;
            }
            .admin-field input,
            .admin-field textarea {
                width: 100%;
                padding: 12px;
                background: #0f0f23;
                border: 2px solid #2d3748;
                border-radius: 8px;
                color: white;
                font-size: 14px;
                transition: all 0.3s;
                font-family: inherit;
            }
            .admin-field input:focus,
            .admin-field textarea:focus {
                outline: none;
                border-color: #6366f1;
                box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
            }
            .admin-field textarea {
                min-height: 80px;
                resize: vertical;
            }
            .admin-field-img {
                position: relative;
            }
            .admin-field-img input {
                padding-right: 12px;
                margin-bottom: 10px;
            }
            .admin-field-img .img-buttons {
                display: flex;
                gap: 10px;
            }
            .admin-field-img .img-upload-btn,
            .admin-field-img .img-preview-btn {
                background: #6366f1;
                border: none;
                color: white;
                padding: 8px 14px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.3s;
            }
            .admin-field-img .img-upload-btn:hover,
            .admin-field-img .img-preview-btn:hover {
                background: #8b5cf6;
            }
            .rich-text-toolbar {
                display: flex;
                gap: 4px;
                margin-bottom: 8px;
                background: #0f0f23;
                padding: 8px;
                border-radius: 8px 8px 0 0;
                border: 2px solid #2d3748;
                border-bottom: none;
            }
            .rich-text-toolbar button {
                background: #2d3748;
                border: none;
                color: #94a3b8;
                width: 32px;
                height: 32px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .rich-text-toolbar button:hover {
                background: #6366f1;
                color: white;
            }
            .rich-text-toolbar input[type="color"] {
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                padding: 0;
                background: transparent;
            }
            .rich-text-toolbar input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 2px;
            }
            .rich-text-toolbar input[type="color"]::-webkit-color-swatch {
                border-radius: 4px;
                border: 1px solid #4a5568;
            }
            .rich-text-editor {
                min-height: 100px;
                padding: 12px;
                background: #0f0f23;
                border: 2px solid #2d3748;
                border-radius: 0 0 8px 8px;
                color: #e2e8f0;
                font-size: 14px;
                line-height: 1.6;
            }
            .rich-text-editor .gradient-text {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 600;
            }
            .rich-text-editor span[style] {
                color: inherit !important;
            }
            .rich-text-editor:focus {
                outline: none;
                border-color: #6366f1;
            }
            .admin-btn-save {
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                border: none;
                color: white;
                border-radius: 8px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 10px;
                transition: all 0.3s;
            }
            .admin-btn-save:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(99,102,241,0.4);
            }
            .admin-btn-logout {
                width: 100%;
                padding: 12px;
                background: transparent;
                border: 2px solid #ef4444;
                color: #ef4444;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 10px;
                transition: all 0.3s;
            }
            .admin-btn-logout:hover {
                background: #ef4444;
                color: white;
            }
            .admin-btn-change-password {
                width: 100%;
                padding: 12px;
                background: linear-gradient(135deg, #10b981, #059669);
                border: none;
                color: white;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 10px;
                transition: all 0.3s;
            }
            .admin-btn-change-password:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
            }
            .admin-tab-buttons {
                display: flex;
                gap: 8px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            .admin-tab-btn {
                padding: 10px 16px;
                background: #16213e;
                border: none;
                color: #94a3b8;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s;
            }
            .admin-tab-btn:hover {
                background: #2d3748;
                color: white;
            }
            .admin-tab-btn.active {
                background: #6366f1;
                color: white;
            }
            .admin-tab-content {
                display: none;
            }
            .admin-tab-content.active {
                display: block;
            }
            .admin-login-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 25px 80px rgba(0,0,0,0.4);
                z-index: 10000;
                text-align: center;
                max-width: 400px;
                width: 90%;
                display: none;
            }
            .admin-login-modal.show {
                display: block;
                animation: modalIn 0.3s ease;
            }
            @keyframes modalIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            .admin-login-modal h3 {
                color: #1a1a2e;
                margin: 0 0 8px 0;
                font-size: 24px;
            }
            .admin-login-modal p {
                color: #64748b;
                margin: 0 0 25px 0;
                font-size: 14px;
            }
            .admin-login-modal input {
                width: 100%;
                padding: 15px;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                font-size: 16px;
                margin-bottom: 15px;
                transition: all 0.3s;
            }
            .admin-login-modal input:focus {
                outline: none;
                border-color: #6366f1;
            }
            .admin-login-modal button {
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                border: none;
                color: white;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .admin-login-modal button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(99,102,241,0.4);
            }
            .admin-login-error {
                color: #ef4444;
                font-size: 13px;
                margin-top: 10px;
                display: none;
            }
            .admin-login-error.show {
                display: block;
            }
            .admin-toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: #10b981;
                color: white;
                padding: 16px 30px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10001;
                font-weight: 500;
                opacity: 0;
                transition: all 0.4s ease;
            }
            .admin-toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(adminStyles);

        // Criar overlay
        const overlay = document.createElement('div');
        overlay.className = 'admin-panel-overlay';
        overlay.id = 'adminOverlay';
        document.body.appendChild(overlay);

        // Criar painel completo
        const panel = document.createElement('div');
        panel.className = 'admin-full-panel';
        panel.id = 'adminPanel';
        
        const allFields = getAllEditableFields();
        
        panel.innerHTML = `
            <div class="admin-panel-header">
                <h2><i class="fas fa-cog"></i> Painel Administrativo</h2>
                <button class="admin-close-panel" id="closeAdminPanel"><i class="fas fa-times"></i></button>
            </div>
            <div class="admin-panel-content">
                <div class="admin-tab-buttons" id="adminTabs">
                    <button class="admin-tab-btn active" data-tab="header">Cabeçalho</button>
                    <button class="admin-tab-btn" data-tab="inicio">Início</button>
                    <button class="admin-tab-btn" data-tab="servicos">Serviços</button>
                    <button class="admin-tab-btn" data-tab="restituicao">Restituição</button>
                    <button class="admin-tab-btn" data-tab="sobre">Sobre</button>
                    <button class="admin-tab-btn" data-tab="duvidas">Dúvidas</button>
                    <button class="admin-tab-btn" data-tab="contato">Contato</button>
                    <button class="admin-tab-btn" data-tab="footer">Rodapé</button>
                </div>
                
                <div class="admin-tab-content active" data-tab="header">
                    ${generateFieldsForSection('header')}
                </div>
                <div class="admin-tab-content" data-tab="inicio">
                    ${generateFieldsForSection('inicio')}
                </div>
                <div class="admin-tab-content" data-tab="servicos">
                    ${generateFieldsForSection('servicos')}
                </div>
                <div class="admin-tab-content" data-tab="restituicao">
                    ${generateFieldsForSection('restituicao')}
                </div>
                <div class="admin-tab-content" data-tab="sobre">
                    ${generateFieldsForSection('sobre')}
                </div>
                <div class="admin-tab-content" data-tab="duvidas">
                    ${generateFieldsForSection('duvidas')}
                </div>
                <div class="admin-tab-content" data-tab="contato">
                    ${generateFieldsForSection('contato')}
                </div>
                <div class="admin-tab-content" data-tab="footer">
                    ${generateFieldsForSection('footer')}
                </div>
                <button class="admin-btn-save" id="saveAllChanges"><i class="fas fa-save"></i> Salvar Todas as Alterações</button>
                
                <div class="admin-section-edit" style="margin-top: 20px;">
                    <h3><i class="fas fa-key"></i> Alterar Senha</h3>
                    <div class="admin-field">
                        <label>Senha Atual</label>
                        <input type="password" id="config-current-password" placeholder="Digite a senha atual">
                    </div>
                    <div class="admin-field">
                        <label>Nova Senha</label>
                        <input type="password" id="config-new-password" placeholder="Digite a nova senha">
                    </div>
                    <div class="admin-field">
                        <label>Confirmar Nova Senha</label>
                        <input type="password" id="config-confirm-password" placeholder="Confirme a nova senha">
                    </div>
                    <button type="button" class="admin-btn-change-password" id="config-change-password-btn"><i class="fas fa-save"></i> Alterar Senha</button>
                </div>
                
                <button class="admin-btn-logout" id="logoutAdmin"><i class="fas fa-sign-out-alt"></i> Sair do Painel</button>
                
                <div class="admin-section-edit" style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f59e0b;">
                    <h3><i class="fas fa-database"></i> Backup e Restauração</h3>
                    <p style="color: #9ca3af; margin-bottom: 15px; font-size: 14px;">Backups automáticos são salvos a cada alteração. Você também pode exportar/importar manualmente.</p>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button type="button" class="admin-btn-save" style="background: #10b981;" id="exportBackupBtn">
                            <i class="fas fa-download"></i> Exportar Backup
                        </button>
                        <button type="button" class="admin-btn-save" style="background: #6366f1;" id="importBackupBtn">
                            <i class="fas fa-upload"></i> Importar Backup
                        </button>
                        <button type="button" class="admin-btn-save" style="background: #8b5cf6;" id="viewBackupHistoryBtn">
                            <i class="fas fa-history"></i> Ver Histórico
                        </button>
                        <input type="file" id="importBackupInput" accept=".json" style="display: none;">
                    </div>
                    <p id="backupStatus" style="color: #10b981; margin-top: 10px; font-size: 13px;"></p>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Criar modal de login
        const loginModal = document.createElement('div');
        loginModal.className = 'admin-login-modal';
        loginModal.id = 'adminLoginModal';
        loginModal.innerHTML = `
            <h3><i class="fas fa-lock"></i> Acesso Restrito</h3>
            <p>Digite a senha para acessar o painel administrativo</p>
            <input type="password" id="adminPassword" placeholder="Senha de acesso">
            <button id="btnAdminLogin">Entrar</button>
            <p class="admin-login-error" id="loginError">Senha incorreta. Tente novamente.</p>
        `;
        document.body.appendChild(loginModal);

        // Criar toast
        const toast = document.createElement('div');
        toast.className = 'admin-toast';
        toast.id = 'adminToast';
        document.body.appendChild(toast);

        // Add password change listener after panel is created
        setTimeout(() => {
            const passBtn = document.getElementById('config-change-password-btn');
            if (passBtn) {
                console.log('Botão de senha encontrado!');
                passBtn.addEventListener('click', changeAdminPassword);
            } else {
                console.log('Botão de senha NÃO encontrado!');
            }
        }, 500);

        setupAdminEventListeners();
    }

    function getAllEditableFields() {
        return {
            header: [
                { id: 'header-name', label: 'Nome do Escritório', type: 'textarea', selector: '.logo .name' },
                { id: 'header-subtitle', label: 'Subtítulo (Ex: Advocacia)', type: 'textarea', selector: '.logo .subtitle' },
                { id: 'header-whatsapp-link', label: 'Link WhatsApp', type: 'text', selector: '#header-whatsapp-a', isLink: true },
                { id: 'header-whatsapp-text', label: 'Texto WhatsApp (telefone)', type: 'textarea', selector: '#header-whatsapp-text' },
                { id: 'header-menu-servicos', label: 'Link Menu: Serviços', type: 'text', selector: '.nav-links li:nth-child(2) button', isHref: true },
                { id: 'header-menu-sobre', label: 'Link Menu: Sobre', type: 'text', selector: '.nav-links li:nth-child(3) button', isHref: true },
                { id: 'header-menu-contato', label: 'Link Menu: Contato', type: 'text', selector: '.nav-links li:nth-child(6) button', isHref: true }
            ],
            inicio: [
                { id: 'hero-badge', label: 'Badge (texto pequeno acima do título)', type: 'textarea', selector: '#hero-badge' },
                { id: 'hero-title', label: 'Título Principal', type: 'textarea', selector: '#hero-title' },
                { id: 'hero-desc', label: 'Descrição', type: 'textarea', selector: '#hero-desc' },
                { id: 'hero-btn-whatsapp', label: 'Link Botão WhatsApp', type: 'text', selector: '#hero-btn-whatsapp', isLink: true },
                { id: 'hero-btn-text', label: 'Texto do Botão WhatsApp', type: 'textarea', selector: '#hero-btn-text' },
                { id: 'hero-btn-services', label: 'Link Botão Serviços', type: 'text', selector: '#hero-btn-services', isLink: true },
                { id: 'hero-services-text', label: 'Texto do Botão Serviços', type: 'textarea', selector: '#hero-services-text' },
                { id: 'hero-image', label: 'URL da Imagem Principal', type: 'image', selector: '#hero-image' },
                { id: 'float-card-1', label: 'Cartão Flutuante 1 (texto)', type: 'textarea', selector: '#float-card-1 span' },
                { id: 'float-card-2', label: 'Cartão Flutuante 2 (texto)', type: 'textarea', selector: '#float-card-2 span' }
            ],
            servicos: [
                { id: 'section-servicos-tag', label: 'Tag da Seção (ex: O que fazemos)', type: 'textarea', selector: '.services .section-tag' },
                { id: 'section-servicos-title', label: 'Título da Seção', type: 'textarea', selector: '#section-servicos-title' },
                { id: 'tab-previdenciario', label: 'Aba: Previdenciário', type: 'text', selector: '.tab-btn[data-tab="previdenciario"]' },
                { id: 'tab-consultoria', label: 'Aba: Consultoria', type: 'text', selector: '.tab-btn[data-tab="consultoria"]' },
                { id: 'tab-calculos', label: 'Aba: Cálculos', type: 'text', selector: '.tab-btn[data-tab="calculos"]' },
                { id: 'tab-parcerias', label: 'Aba: Parcerias', type: 'text', selector: '.tab-btn[data-tab="parcerias"]' },
                // Previdenciário - títulos dos cartões
                { id: 'previd-1-titulo', label: 'Previdenciário: INSS Negado', type: 'textarea', selector: '#previdenciario .service-card:nth-child(1) h3' },
                { id: 'previd-1-tooltip', label: 'Previdenciário: tooltip INSS Negado', type: 'textarea', selector: '#previdenciario .service-card:nth-child(1) .tooltip' },
                { id: 'previd-2-titulo', label: 'Previdenciário: Aposentadorias', type: 'textarea', selector: '#previdenciario .service-card:nth-child(2) h3' },
                { id: 'previd-2-tooltip', label: 'Previdenciário: tooltip Aposentadorias', type: 'textarea', selector: '#previdenciario .service-card:nth-child(2) .tooltip' },
                { id: 'previd-3-titulo', label: 'Previdenciário: BPC/LOAS', type: 'textarea', selector: '#previdenciario .service-card:nth-child(3) h3' },
                { id: 'previd-3-tooltip', label: 'Previdenciário: tooltip BPC/LOAS', type: 'textarea', selector: '#previdenciario .service-card:nth-child(3) .tooltip' },
                { id: 'previd-4-titulo', label: 'Previdenciário: Auxílio Doença', type: 'textarea', selector: '#previdenciario .service-card:nth-child(4) h3' },
                { id: 'previd-4-tooltip', label: 'Previdenciário: tooltip Auxílio Doença', type: 'textarea', selector: '#previdenciario .service-card:nth-child(4) .tooltip' },
                { id: 'previd-5-titulo', label: 'Previdenciário: Apos. Invalidez', type: 'textarea', selector: '#previdenciario .service-card:nth-child(5) h3' },
                { id: 'previd-5-tooltip', label: 'Previdenciário: tooltip Apos. Invalidez', type: 'textarea', selector: '#previdenciario .service-card:nth-child(5) .tooltip' },
                { id: 'previd-6-titulo', label: 'Previdenciário: Auxílio Acidente', type: 'textarea', selector: '#previdenciario .service-card:nth-child(6) h3' },
                { id: 'previd-6-tooltip', label: 'Previdenciário: tooltip Auxílio Acidente', type: 'textarea', selector: '#previdenciario .service-card:nth-child(6) .tooltip' },
                { id: 'previd-7-titulo', label: 'Previdenciário: Pensão Morte', type: 'textarea', selector: '#previdenciario .service-card:nth-child(7) h3' },
                { id: 'previd-7-tooltip', label: 'Previdenciário: tooltip Pensão Morte', type: 'textarea', selector: '#previdenciario .service-card:nth-child(7) .tooltip' },
                { id: 'previd-8-titulo', label: 'Previdenciário: Auxílio Reclusão', type: 'textarea', selector: '#previdenciario .service-card:nth-child(8) h3' },
                { id: 'previd-8-tooltip', label: 'Previdenciário: tooltip Auxílio Reclusão', type: 'textarea', selector: '#previdenciario .service-card:nth-child(8) .tooltip' },
                { id: 'previd-9-titulo', label: 'Previdenciário: Salário Maternidade', type: 'textarea', selector: '#previdenciario .service-card:nth-child(9) h3' },
                { id: 'previd-9-tooltip', label: 'Previdenciário: tooltip Salário Maternidade', type: 'textarea', selector: '#previdenciario .service-card:nth-child(9) .tooltip' },
                { id: 'previd-10-titulo', label: 'Previdenciário: Benefícios Rurais', type: 'textarea', selector: '#previdenciario .service-card:nth-child(10) h3' },
                { id: 'previd-10-tooltip', label: 'Previdenciário: tooltip Benefícios Rurais', type: 'textarea', selector: '#previdenciario .service-card:nth-child(10) .tooltip' },
                // Consultoria - títulos dos cartões
                { id: 'cons-1-titulo', label: 'Consultoria: CNIS', type: 'textarea', selector: '#consultoria .service-card:nth-child(1) h3' },
                { id: 'cons-1-tooltip', label: 'Consultoria: tooltip CNIS', type: 'textarea', selector: '#consultoria .service-card:nth-child(1) .tooltip' },
                { id: 'cons-2-titulo', label: 'Consultoria: Averbação', type: 'textarea', selector: '#consultoria .service-card:nth-child(2) h3' },
                { id: 'cons-2-tooltip', label: 'Consultoria: tooltip Averbação', type: 'textarea', selector: '#consultoria .service-card:nth-child(2) .tooltip' },
                { id: 'cons-3-titulo', label: 'Consultoria: Tempo sem Contribuição', type: 'textarea', selector: '#consultoria .service-card:nth-child(3) h3' },
                { id: 'cons-3-tooltip', label: 'Consultoria: tooltip Tempo sem Contribuição', type: 'textarea', selector: '#consultoria .service-card:nth-child(3) .tooltip' },
                { id: 'cons-4-titulo', label: 'Consultoria: Tempo Exterior', type: 'textarea', selector: '#consultoria .service-card:nth-child(4) h3' },
                { id: 'cons-4-tooltip', label: 'Consultoria: tooltip Tempo Exterior', type: 'textarea', selector: '#consultoria .service-card:nth-child(4) .tooltip' },
                { id: 'cons-5-titulo', label: 'Consultoria: CTC', type: 'textarea', selector: '#consultoria .service-card:nth-child(5) h3' },
                { id: 'cons-5-tooltip', label: 'Consultoria: tooltip CTC', type: 'textarea', selector: '#consultoria .service-card:nth-child(5) .tooltip' },
                { id: 'cons-6-titulo', label: 'Consultoria: Consultoria', type: 'textarea', selector: '#consultoria .service-card:nth-child(6) h3' },
                { id: 'cons-6-tooltip', label: 'Consultoria: tooltip Consultoria', type: 'textarea', selector: '#consultoria .service-card:nth-child(6) .tooltip' },
                // Cálculos - títulos dos cartões
                { id: 'calc-1-titulo', label: 'Cálculos: Revisão', type: 'textarea', selector: '#calculos .service-card:nth-child(1) h3' },
                { id: 'calc-1-tooltip', label: 'Cálculos: tooltip Revisão', type: 'textarea', selector: '#calculos .service-card:nth-child(1) .tooltip' },
                { id: 'calc-2-titulo', label: 'Cálculos: Planejamento', type: 'textarea', selector: '#calculos .service-card:nth-child(2) h3' },
                { id: 'calc-2-tooltip', label: 'Cálculos: tooltip Planejamento', type: 'textarea', selector: '#calculos .service-card:nth-child(2) .tooltip' },
                { id: 'calc-3-titulo', label: 'Cálculos: Servidor Público', type: 'textarea', selector: '#calculos .service-card:nth-child(3) h3' },
                { id: 'calc-3-tooltip', label: 'Cálculos: tooltip Servidor Público', type: 'textarea', selector: '#calculos .service-card:nth-child(3) .tooltip' },
                { id: 'calc-4-titulo', label: 'Cálculos: Cálculos', type: 'textarea', selector: '#calculos .service-card:nth-child(4) h3' },
                { id: 'calc-4-tooltip', label: 'Cálculos: tooltip Cálculos', type: 'textarea', selector: '#calculos .service-card:nth-child(4) .tooltip' },
                { id: 'calc-5-titulo', label: 'Cálculos: Contagem Tempo', type: 'textarea', selector: '#calculos .service-card:nth-child(5) h3' },
                { id: 'calc-5-tooltip', label: 'Cálculos: tooltip Contagem Tempo', type: 'textarea', selector: '#calculos .service-card:nth-child(5) .tooltip' },
                { id: 'calc-6-titulo', label: 'Cálculos: Renda Mensal', type: 'textarea', selector: '#calculos .service-card:nth-child(6) h3' },
                { id: 'calc-6-tooltip', label: 'Cálculos: tooltip Renda Mensal', type: 'textarea', selector: '#calculos .service-card:nth-child(6) .tooltip' },
                // Parcerias - títulos dos cartões
                { id: 'parc-1-titulo', label: 'Parcerias: Trabalho', type: 'textarea', selector: '#parcerias .service-card:nth-child(1) h3' },
                { id: 'parc-1-tooltip', label: 'Parcerias: tooltip Trabalho', type: 'textarea', selector: '#parcerias .service-card:nth-child(1) .tooltip' },
                { id: 'parc-2-titulo', label: 'Parcerias: Civil', type: 'textarea', selector: '#parcerias .service-card:nth-child(2) h3' },
                { id: 'parc-2-tooltip', label: 'Parcerias: tooltip Civil', type: 'textarea', selector: '#parcerias .service-card:nth-child(2) .tooltip' },
                { id: 'parc-3-titulo', label: 'Parcerias: Família', type: 'textarea', selector: '#parcerias .service-card:nth-child(3) h3' },
                { id: 'parc-3-tooltip', label: 'Parcerias: tooltip Família', type: 'textarea', selector: '#parcerias .service-card:nth-child(3) .tooltip' },
                { id: 'parc-4-titulo', label: 'Parcerias: Servidores', type: 'textarea', selector: '#parcerias .service-card:nth-child(4) h3' },
                { id: 'parc-4-tooltip', label: 'Parcerias: tooltip Servidores', type: 'textarea', selector: '#parcerias .service-card:nth-child(4) .tooltip' },
                { id: 'parc-5-titulo', label: 'Parcerias: Consumidor', type: 'textarea', selector: '#parcerias .service-card:nth-child(5) h3' },
                { id: 'parc-5-tooltip', label: 'Parcerias: tooltip Consumidor', type: 'textarea', selector: '#parcerias .service-card:nth-child(5) .tooltip' },
                { id: 'parc-6-titulo', label: 'Parcerias: Criminal', type: 'textarea', selector: '#parcerias .service-card:nth-child(6) h3' },
                { id: 'parc-6-tooltip', label: 'Parcerias: tooltip Criminal', type: 'textarea', selector: '#parcerias .service-card:nth-child(6) .tooltip' },
                { id: 'parc-7-titulo', label: 'Parcerias: Imobiliário', type: 'textarea', selector: '#parcerias .service-card:nth-child(7) h3' },
                { id: 'parc-7-tooltip', label: 'Parcerias: tooltip Imobiliário', type: 'textarea', selector: '#parcerias .service-card:nth-child(7) .tooltip' },
                { id: 'parc-8-titulo', label: 'Parcerias: Bancário', type: 'textarea', selector: '#parcerias .service-card:nth-child(8) h3' },
                { id: 'parc-8-tooltip', label: 'Parcerias: tooltip Bancário', type: 'textarea', selector: '#parcerias .service-card:nth-child(8) .tooltip' }
            ],
            restituicao: [
                { id: 'restituicao-video', label: 'URL do Vídeo', type: 'video', selector: '#restituicao-video-source' },
                { id: 'restituicao-tag', label: 'Tag da Seção', type: 'textarea', selector: '#restituicao-tag' },
                { id: 'restituicao-p1', label: 'Parágrafo 1 (Vídeo)', type: 'textarea', selector: '#restituicao-text p:nth-child(1)' },
                { id: 'restituicao-p2', label: 'Parágrafo 2 (A restituição é...)', type: 'textarea', selector: '#restituicao-text p:nth-child(2)' },
                { id: 'restituicao-p3', label: 'Ponto 1 (múltiplos vínculos)', type: 'textarea', selector: '#restituicao-text p:nth-child(3)' },
                { id: 'restituicao-p4', label: 'Ponto 2 (múltiplas fontes)', type: 'textarea', selector: '#restituicao-text p:nth-child(4)' },
                { id: 'restituicao-p5', label: 'Ponto 3 (acima do teto)', type: 'textarea', selector: '#restituicao-text p:nth-child(5)' },
                { id: 'restituicao-p6', label: 'Ponto 4 (contribuiu além)', type: 'textarea', selector: '#restituicao-text p:nth-child(6)' },
                { id: 'restituicao-p7', label: 'Parágrafo Final (destaque)', type: 'textarea', selector: '#restituicao-text p:nth-child(7)' }
            ],
            sobre: [
                { id: 'sobre-imagem', label: 'Foto da Advogada', type: 'image', selector: '.lawyer-image' },
                { id: 'sobre-tag', label: 'Tag da Seção', type: 'textarea', selector: '#sobre-tag' },
                { id: 'sobre-titulo', label: 'Título (Nome)', type: 'textarea', selector: '#sobre-titulo' },
                { id: 'sobre-subtitle', label: 'Subtítulo', type: 'text', selector: '.lawyer-subtitle' },
                { id: 'sobre-p1', label: 'Parágrafo 1 (Formação)', type: 'textarea', selector: '#sobre-text p:nth-child(1)' },
                { id: 'sobre-p2', label: 'Parágrafo 2 (Missão)', type: 'textarea', selector: '#sobre-text p:nth-child(2)' },
                { id: 'sobre-cred-1', label: 'Pós-graduação 1', type: 'text', selector: '.credential-item:nth-child(1) span' },
                { id: 'sobre-cred-2', label: 'Pós-graduação 2', type: 'text', selector: '.credential-item:nth-child(2) span' },
                { id: 'sobre-missao', label: 'Texto Compromisso', type: 'textarea', selector: '.mission-text' }
            ],
            duvidas: [
                { id: 'faq-tag', label: 'Tag da Seção', type: 'textarea', selector: '.faq .section-tag' },
                { id: 'faq-title', label: 'Título da Seção', type: 'textarea', selector: '.faq .section-title' },
                { id: 'faq-perg-1', label: 'Pergunta 1', type: 'textarea', selector: '.faq-item:nth-child(1) h3' },
                { id: 'faq-resp-1', label: 'Resposta 1', type: 'textarea', selector: '.faq-item:nth-child(1) p' },
                { id: 'faq-perg-2', label: 'Pergunta 2', type: 'textarea', selector: '.faq-item:nth-child(2) h3' },
                { id: 'faq-resp-2', label: 'Resposta 2', type: 'textarea', selector: '.faq-item:nth-child(2) p' },
                { id: 'faq-perg-3', label: 'Pergunta 3', type: 'textarea', selector: '.faq-item:nth-child(3) h3' },
                { id: 'faq-resp-3', label: 'Resposta 3', type: 'textarea', selector: '.faq-item:nth-child(3) p' }
            ],
            contato: [
                { id: 'cta-titulo', label: 'Título CTA', type: 'textarea', selector: '#cta-titulo' },
                { id: 'cta-desc', label: 'Descrição CTA', type: 'textarea', selector: '#cta-desc' },
                { id: 'cta-whatsapp-link', label: 'Link Botão WhatsApp', type: 'text', selector: '#cta-whatsapp', isLink: true },
                { id: 'cta-whatsapp-text', label: 'Texto Botão WhatsApp', type: 'textarea', selector: '#cta-whatsapp-text' }
            ],
            footer: [
                { id: 'footer-brand-text', label: 'Texto Sobre no Rodapé', type: 'textarea', selector: '.footer-brand p' },
                { id: 'footer-whatsapp', label: 'Link WhatsApp', type: 'text', selector: '.footer-social a:nth-child(1)', isLink: true },
                { id: 'footer-email-social', label: 'Link Email Social', type: 'text', selector: '.footer-social a:nth-child(2)', isLink: true },
                { id: 'footer-instagram', label: 'Link Instagram', type: 'text', selector: '.footer-social a:nth-child(3)', isLink: true },
                { id: 'footer-facebook', label: 'Link Facebook', type: 'text', selector: '.footer-social a:nth-child(4)', isLink: true },
                { id: 'footer-linkedin', label: 'Link LinkedIn', type: 'text', selector: '.footer-social a:nth-child(5)', isLink: true },
                { id: 'footer-link-inicio', label: 'Link Menu Início', type: 'text', selector: '#footer-link-1', isHref: true },
                { id: 'footer-link-inicio-text', label: 'Texto Menu Início', type: 'text', selector: '#footer-link-1' },
                { id: 'footer-link-sobre', label: 'Link Menu Sobre', type: 'text', selector: '#footer-link-2', isHref: true },
                { id: 'footer-link-sobre-text', label: 'Texto Menu Sobre', type: 'text', selector: '#footer-link-2' },
                { id: 'footer-link-restituicao', label: 'Link Menu Restituição', type: 'text', selector: '#footer-link-3', isHref: true },
                { id: 'footer-link-restituicao-text', label: 'Texto Menu Restituição', type: 'text', selector: '#footer-link-3' },
                { id: 'footer-link-servicos', label: 'Link Menu Serviços', type: 'text', selector: '#footer-link-4', isHref: true },
                { id: 'footer-link-servicos-text', label: 'Texto Menu Serviços', type: 'text', selector: '#footer-link-4' },
                { id: 'footer-link-duvidas', label: 'Link Menu Dúvidas', type: 'text', selector: '#footer-link-5', isHref: true },
                { id: 'footer-link-duvidas-text', label: 'Texto Menu Dúvidas', type: 'text', selector: '#footer-link-5' },
                { id: 'footer-link-contato', label: 'Link Menu Contato', type: 'text', selector: '#footer-link-6', isHref: true },
                { id: 'footer-link-contato-text', label: 'Texto Menu Contato', type: 'text', selector: '#footer-link-6' },
                { id: 'footer-phone', label: 'Link Telefone', type: 'text', selector: '.footer-contact ul li:nth-child(1) a', isLink: true },
                { id: 'footer-contact-email', label: 'Link Email Contato', type: 'text', selector: '.footer-contact ul li:nth-child(2) a', isLink: true },
                { id: 'footer-maps-link', label: 'Link Google Maps', type: 'text', selector: '.footer-contact ul li:nth-child(3) a', isLink: true },
                { id: 'footer-btn-whatsapp', label: 'Link Botão WhatsApp Rodapé', type: 'text', selector: '.footer-contact .btn-footer', isLink: true },
                { id: 'footer-copyright', label: 'Texto Copyright', type: 'textarea', selector: '.footer-bottom p' },
                { id: 'footer-oab', label: 'Número OAB', type: 'text', selector: '.footer-bottom .oab' }
            ]
        };
    }

    function getSavedValue(field) {
        const savedEdits = localStorage.getItem('isabellaSiteEdits');
        if (savedEdits) {
            const edits = JSON.parse(savedEdits);
            if (edits[field.selector]) {
                return edits[field.selector].value;
            }
        }
        return null;
    }

    function generateFieldsForSection(section) {
        const fields = getAllEditableFields()[section];
        if (!fields) return '';
        
        let html = '';
        
        fields.forEach(field => {
            let currentValue = getSavedValue(field);
            
            if (currentValue === null) {
                currentValue = field.isLink || field.isHref
                    ? (document.querySelector(field.selector)?.getAttribute('href') || '')
                    : (document.querySelector(field.selector)?.innerHTML || '');
            }
            
            if (field.type === 'videoembed') {
                html += `
                    <div class="admin-field">
                        <label>${field.label}</label>
                        <input type="text" data-field="${field.id}" value="${currentValue}" placeholder="Cole URL do YouTube ou Google Drive">
                        <small style="color:#f59e0b;display:block;margin-top:5px;background:#78350f;padding:8px;border-radius:6px;">
                            <i class="fas fa-info-circle"></i> <strong>Formatos aceitos:</strong> URL de imagem, vídeo YouTube, ou link do Google Drive (com "Anyone with link")
                        </small>
                    </div>
                `;
            } else if (field.type === 'image' || field.type === 'video' || field.type === 'media') {
                const acceptType = field.type === 'image' ? 'image/*' : 'video/*';
                const fileType = field.type === 'media' ? 'video' : field.type;
                const iconType = field.type === 'image' ? 'fa-image' : 'fa-video';
                const uploadLabel = field.type === 'image' ? 'Enviar Imagem' : 'Enviar Vídeo';
                html += `
                    <div class="admin-field admin-field-img">
                        <label>${field.label}</label>
                        <input type="text" data-field="${field.id}" value="${currentValue}" placeholder="Cole a URL ou faça upload">
                        <input type="file" id="file-${field.id}" accept="${acceptType}" style="display:none" onchange="handleFileUpload(this, '${field.id}', '${fileType}')">
                        <div class="img-buttons">
                            <button type="button" class="img-upload-btn" onclick="document.getElementById('file-${field.id}').click()"><i class="fas fa-upload"></i> ${uploadLabel}</button>
                            ${currentValue ? `<button class="img-preview-btn" onclick="window.open('${currentValue}', '_blank')"><i class="fas fa-eye"></i> Ver</button>` : ''}
                        </div>
                    </div>
                `;
            } else if (field.type === 'textarea') {
                html += `
                    <div class="admin-field">
                        <label>${field.label}</label>
                        <div class="rich-text-toolbar">
                            <button type="button" onclick="formatText('${field.id}', 'bold')" title="Negrito"><i class="fas fa-bold"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'italic')" title="Itálico"><i class="fas fa-italic"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'underline')" title="Sublinhado"><i class="fas fa-underline"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'strikeThrough')" title="Tachado"><i class="fas fa-strikethrough"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'justifyLeft')" title="Alinhar à Esquerda"><i class="fas fa-align-left"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'justifyCenter')" title="Centralizar"><i class="fas fa-align-center"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'justifyRight')" title="Alinhar à Direita"><i class="fas fa-align-right"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'justifyFull')" title="Justificar"><i class="fas fa-align-justify"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'insertUnorderedList')" title="Lista com Marcadores"><i class="fas fa-list-ul"></i></button>
                            <button type="button" onclick="formatText('${field.id}', 'insertOrderedList')" title="Lista Numerada"><i class="fas fa-list-ol"></i></button>
                            <button type="button" onclick="formatTextSize('${field.id}')" title="Tamanho do Texto"><i class="fas fa-text-height"></i></button>
                            <input type="color" id="color-picker-${field.id}" onchange="formatTextColor('${field.id}', this.value)" title="Cor do Texto" style="width:28px;height:28px;padding:0;border:none;cursor:pointer;background:none;">
                            <button type="button" onclick="formatTextGradient('${field.id}')" title="Texto Gradiente Roxo" style="background:#667eea;color:white;padding:4px 8px;border:none;border-radius:4px;cursor:pointer;font-size:12px;">🎨</button>
                        </div>
                        <div class="rich-text-editor" contenteditable="true" data-field="${field.id}" id="editor-${field.id}">${currentValue}</div>
                    </div>
                `;
            } else if (field.isLink || field.isHref) {
                html += `
                    <div class="admin-field">
                        <label>${field.label}</label>
                        <input type="text" data-field="${field.id}" value="${currentValue}" placeholder="https://...">
                    </div>
                `;
            } else {
                html += `
                    <div class="admin-field">
                        <label>${field.label}</label>
                        <input type="text" data-field="${field.id}" value="${currentValue}" placeholder="${field.label}">
                    </div>
                `;
            }
        });
        return html;
    }

    function setupAdminEventListeners() {
        // Abrir login com Ctrl+Shift+A (Robusto)
        window.addEventListener('keydown', (e) => {
            // Log de depuração (aparecerá no F12)
            if (e.ctrlKey && e.shiftKey) {
                console.log('Teclas detectadas: Ctrl+Shift + ', e.code);
            }

            if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
                console.log('Shortcut ACIONADO (Ctrl+Shift+A)');
                e.preventDefault();
                showAdminLogin();
            }
        });

        // Abrir login clicando 5 vezes no Logo (Segurança redundante)
        const logo = document.querySelector('.logo-icon');
        let logoClicks = 0;
        let lastLogoClick = 0;

        if (logo) {
            logo.addEventListener('click', (e) => {
                const now = Date.now();
                if (now - lastLogoClick > 2000) logoClicks = 0;
                logoClicks++;
                lastLogoClick = now;

                console.log(`Cliques no logo: ${logoClicks}/4`);
                
                if (logoClicks >= 4) {
                    logoClicks = 0;
                    showAdminLogin();
                }
            });
        }

        // Função auxiliar para abrir o modal
        function showAdminLogin() {
            if (!adminMode) {
                const modal = document.getElementById('adminLoginModal');
                if (modal) {
                    modal.classList.add('show');
                    const passInput = document.getElementById('adminPassword');
                    if (passInput) passInput.focus();
                } else {
                    console.error('Modal adminLoginModal não encontrado!');
                }
            }
        }

        // Verificar parâmetro na URL (?admin=true)
        if (window.location.search.includes('admin=true')) {
            showAdminLogin();
        }

        // Login
        document.getElementById('btnAdminLogin').addEventListener('click', checkAdminPassword);
        document.getElementById('adminPassword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAdminPassword();
        });

        // Fechar painel
        document.getElementById('closeAdminPanel').addEventListener('click', () => {
            document.getElementById('adminPanel').classList.remove('open');
            document.getElementById('adminOverlay').classList.remove('active');
        });

        document.getElementById('adminOverlay').addEventListener('click', () => {
            document.getElementById('adminPanel').classList.remove('open');
            document.getElementById('adminOverlay').classList.remove('active');
        });

        // Tabs
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.querySelector(`.admin-tab-content[data-tab="${btn.dataset.tab}"]`).classList.add('active');
            });
        });

        // Salvar
        document.getElementById('saveAllChanges').addEventListener('click', saveAllEdits);

        // Change password
        document.getElementById('config-change-password-btn').addEventListener('click', changeAdminPassword);

        // Logout
        document.getElementById('logoutAdmin').addEventListener('click', () => {
            adminMode = false;
            localStorage.removeItem('isabellaAdminSession');
            document.getElementById('adminPanel').classList.remove('open');
            document.getElementById('adminOverlay').classList.remove('active');
            showToast('Sessão encerrada!');
        });

        // Backup - Exportar
        document.getElementById('exportBackupBtn').addEventListener('click', function() {
            const edits = localStorage.getItem('isabellaSiteEdits') || '{}';
            const passwordHash = localStorage.getItem('isabellaAdminPasswordHash') || '';
            const passwordSalt = localStorage.getItem('isabellaAdminPasswordSalt') || '';
            const backup = {
                version: '1.0',
                date: new Date().toISOString(),
                edits: JSON.parse(edits),
                adminPasswordHash: passwordHash,
                adminPasswordSalt: passwordSalt
            };
            
            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'isabella-site-backup-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            URL.revokeObjectURL(url);
            
            document.getElementById('backupStatus').textContent = 'Backup exportado com sucesso!';
            setTimeout(() => { document.getElementById('backupStatus').textContent = ''; }, 3000);
        });

        // Backup - Importar
        document.getElementById('importBackupBtn').addEventListener('click', function() {
            document.getElementById('importBackupInput').click();
        });

        document.getElementById('importBackupInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const backup = JSON.parse(event.target.result);
                    if (backup.edits) {
                        localStorage.setItem('isabellaSiteEdits', JSON.stringify(backup.edits));
                        if (backup.adminPasswordHash) {
                            localStorage.setItem('isabellaAdminPasswordHash', backup.adminPasswordHash);
                        }
                        if (backup.adminPasswordSalt) {
                            localStorage.setItem('isabellaAdminPasswordSalt', backup.adminPasswordSalt);
                        }
                        loadSavedEdits();
                        document.getElementById('backupStatus').textContent = 'Backup restaurado com sucesso! Recarregue a página.';
                        showToast('Backup restaurado! Recarregue a página para aplicar as alterações.');
                    }
                } catch (err) {
                    document.getElementById('backupStatus').textContent = 'Erro ao importar backup: ' + err.message;
                    document.getElementById('backupStatus').style.color = '#ef4444';
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });

        // Backup - Ver Histórico
        document.getElementById('viewBackupHistoryBtn').addEventListener('click', function() {
            const history = JSON.parse(localStorage.getItem('isabellaBackupHistory') || '[]');
            
            if (history.length === 0) {
                document.getElementById('backupStatus').textContent = 'Nenhum backup automático encontrado.';
                document.getElementById('backupStatus').style.color = '#f59e0b';
                return;
            }
            
            let historyHtml = '<div style="max-height: 300px; overflow-y: auto; margin-top: 10px; background: #1f2937; padding: 10px; border-radius: 8px;">';
            history.forEach((backup, index) => {
                const date = new Date(backup.date).toLocaleString('pt-BR');
                historyHtml += `<div style="padding: 8px; border-bottom: 1px solid #374151; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #9ca3af; font-size: 13px;">${date}</span>
                    <button onclick="restoreBackup(${index})" style="background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Restaurar</button>
                </div>`;
            });
            historyHtml += '</div>';
            
            // Mostrar histórico em um modal ou abaixo dos botões
            const existingHistory = document.getElementById('backupHistoryDisplay');
            if (existingHistory) {
                existingHistory.remove();
            }
            
            const historyDiv = document.createElement('div');
            historyDiv.id = 'backupHistoryDisplay';
            historyDiv.innerHTML = historyHtml;
            historyDiv.style.marginTop = '15px';
            document.getElementById('backupStatus').parentNode.appendChild(historyDiv);
            document.getElementById('backupStatus').textContent = `Histórico de backups (${history.length} backups salvos)`;
            document.getElementById('backupStatus').style.color = '#10b981';
        });

        // Função global para restaurar backup do histórico
        window.restoreBackup = function(index) {
            const history = JSON.parse(localStorage.getItem('isabellaBackupHistory') || '[]');
            if (history[index]) {
                localStorage.setItem('isabellaSiteEdits', JSON.stringify(history[index].edits));
                loadSavedEdits();
                showToast('Backup restaurado! Recarregue a página.');
                document.getElementById('backupStatus').textContent = 'Backup restaurado com sucesso!';
            }
        };
    }

    function checkAdminPassword() {
        const input = document.getElementById('adminPassword');
        const error = document.getElementById('loginError');
        
        const loginCheck = checkLoginAttempts();
        if (loginCheck.locked) {
            error.textContent = `Muitas tentativas falhas. Tente novamente em ${loginCheck.remaining} segundos.`;
            error.classList.add('show');
            return;
        }
        
        const inputHash = hashPassword(input.value);
        const expectedHash = getAdminPassword();
        
        console.log('DEBUG LOGIN - Senha digitada (hash):', inputHash);
        console.log('DEBUG LOGIN - Senha esperada (hash):', expectedHash);
        
        if (inputHash === expectedHash) {
            adminMode = true;
            resetLoginAttempts();
            saveSecureSession();
            localStorage.setItem('isabellaAdminSession', 'true');
            document.getElementById('adminLoginModal').classList.remove('show');
            input.value = '';
            error.classList.remove('show');
            
            setTimeout(() => {
                document.getElementById('adminPanel').classList.add('open');
                document.getElementById('adminOverlay').classList.add('active');
                showToast('Bem-vindo ao painel administrativo!');
            }, 100);
        } else {
            recordFailedLogin();
            error.classList.add('show');
        }
    }

    window.handleFileUpload = function(input, fieldId, fileType) {
        const file = input.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                showToast('Arquivo muito grande! Máximo 4MB para localStorage.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const urlInput = document.querySelector(`[data-field="${fieldId}"]`);
                if (urlInput) {
                    urlInput.value = e.target.result;
                    const msg = fileType === 'video' ? 'Vídeo carregado com sucesso!' : 'Imagem carregada com sucesso!';
                    showToast(msg);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    window.changeAdminPassword = function() {
        const currentPass = document.getElementById('config-current-password').value;
        const newPass = document.getElementById('config-new-password').value;
        const confirmPass = document.getElementById('config-confirm-password').value;
        
        if (!currentPass || !newPass || !confirmPass) {
            showToast('Preencha todos os campos!');
            return;
        }
        
        const currentHash = hashPassword(currentPass);
        const expectedHash = getAdminPassword();
        
        console.log('DEBUG SENHA - Senha atual digitada (hash):', currentHash);
        console.log('DEBUG SENHA - Senha salva (hash):', expectedHash);
        
        if (currentHash !== expectedHash) {
            showToast('Senha atual incorreta!');
            return;
        }
        
        if (newPass !== confirmPass) {
            showToast('As senhas não conferem!');
            return;
        }
        
        if (newPass.length < 4) {
            showToast('A nova senha deve ter pelo menos 4 caracteres!');
            return;
        }
        
        setAdminPasswordHash(newPass);
        console.log('DEBUG SENHA - Nova senha hasheada e criptografada salva');
        showToast('Senha alterada com sucesso!');
        
        document.getElementById('config-current-password').value = '';
        document.getElementById('config-new-password').value = '';
        document.getElementById('config-confirm-password').value = '';
    };

    window.formatText = function(fieldId, command) {
        const editor = document.getElementById('editor-' + fieldId);
        if (editor) {
            document.execCommand(command, false, null);
            editor.focus();
        }
    };

    window.formatTextSize = function(fieldId) {
        const editor = document.getElementById('editor-' + fieldId);
        if (editor) {
            const size = prompt('Digite o tamanho da fonte em px (ex: 18, 24, 32):', '16');
            if (size) {
                document.execCommand('fontSize', false, '4');
                const fonts = editor.querySelectorAll('font');
                if (fonts.length > 0) {
                    fonts[fonts.length - 1].removeAttribute('face');
                    fonts[fonts.length - 1].style.fontSize = size + 'px';
                }
            }
            editor.focus();
        }
    };

    window.formatTextColor = function(fieldId, color) {
        const editor = document.getElementById('editor-' + fieldId);
        if (editor) {
            document.execCommand('foreColor', false, color);
            const spans = editor.querySelectorAll('span[style*="color"]');
            spans.forEach(span => {
                span.style.setProperty('color', color, 'important');
            });
            editor.focus();
        }
    };

    window.formatTextGradient = function(fieldId) {
        const editor = document.getElementById('editor-' + fieldId);
        if (editor) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0 && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                const span = document.createElement('span');
                span.className = 'gradient-text';
                span.innerHTML = range.toString();
                range.deleteContents();
                range.insertNode(span);
            } else {
                const span = document.createElement('span');
                span.className = 'gradient-text';
                span.textContent = 'texto';
                editor.appendChild(span);
            }
            editor.focus();
        }
    };

    function saveAllEdits() {
        console.log('Iniciando saveAllEdits...');
        const fields = getAllEditableFields();
        const allSections = Object.keys(fields);
        const edits = {};
        console.log('Seções encontradas:', allSections);

        allSections.forEach(section => {
            console.log('Processando seção:', section);
            fields[section].forEach(field => {
                console.log('Campo:', field.id, 'Tipo:', field.type);
                let input = document.querySelector(`[data-field="${field.id}"]`);
                console.log('Input encontrado:', input);
                let value;
                
                if (field.type === 'textarea') {
                    const editor = document.getElementById('editor-' + field.id);
                    value = editor ? editor.innerHTML : '';
                } else if (input) {
                    value = input.value;
                }
                
                console.log('Valor do campo:', value);
                
                if (value && value !== undefined) {
                    if (field.isLink || field.isHref) {
                        edits[field.selector] = { type: 'link', value: value };
                    } else if (field.type === 'videoembed') {
                        edits[field.selector] = { type: 'videoembed', value: value };
                    } else if (field.type === 'image' || field.type === 'video' || field.type === 'media') {
                        edits[field.selector] = { type: 'video', value: value };
                    } else {
                        edits[field.selector] = { type: 'text', value: value };
                    }
                }
            });
        });

        // Aplicar alterações
        Object.entries(edits).forEach(([selector, data]) => {
            let el = document.querySelector(selector);
            if (el) {
                if (data.type === 'link') {
                    el.setAttribute('href', data.value);
                } else if (data.type === 'videoembed') {
                    const url = data.value;
                    const wrapper = el.parentElement;
                    
                    if (url.includes('drive.google.com')) {
                        let videoId = '';
                        if (url.includes('/d/')) {
                            videoId = url.split('/d/')[1].split('/')[0].split('?')[0];
                        }
                        const videoUrl = 'https://drive.google.com/uc?id=' + videoId + '&export=download';
                        const video = document.createElement('video');
                        video.src = videoUrl;
                        video.style.cssText = 'width:100%;height:600px;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);object-fit:cover;';
                        video.preload = 'metadata';
                        if (el.tagName === 'IMG') {
                            wrapper.innerHTML = '';
                            wrapper.appendChild(video);
                            createCustomVideoPlayer(video, wrapper);
                        } else if (el.tagName === 'IFRAME') {
                            el.parentElement.replaceWith(video);
                            createCustomVideoPlayer(video, video.parentElement);
                        } else if (el.tagName === 'VIDEO') {
                            el.src = videoUrl;
                        }
                    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                        let embedUrl = url;
                        if (embedUrl.includes('watch?v=')) {
                            const videoId = embedUrl.split('watch?v=')[1].split('&')[0];
                            embedUrl = 'https://www.youtube.com/embed/' + videoId;
                        } else if (embedUrl.includes('youtu.be/embed/')) {
                            const videoId = embedUrl.split('youtu.be/embed/')[1].split('&')[0];
                            embedUrl = 'https://www.youtube.com/embed/' + videoId;
                        } else if (embedUrl.includes('youtu.be/') && !embedUrl.includes('/embed/')) {
                            const videoId = embedUrl.split('youtu.be/')[1].split('&')[0];
                            embedUrl = 'https://www.youtube.com/embed/' + videoId;
                        }
                        embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'modestbranding=1&rel=0';
                        const iframe = document.createElement('iframe');
                        iframe.src = embedUrl;
                        iframe.style.cssText = 'width:100%;height:600px;border:0;border-radius:inherit;object-fit:cover;';
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        if (el.tagName === 'IMG') {
                            wrapper.innerHTML = '';
                            wrapper.appendChild(iframe);
                        } else if (el.tagName === 'IFRAME') {
                            el.src = embedUrl;
                        }
                    } else if (url.match(/\.(mp4|webm|ogg)$/i) || url.includes('raw.githubusercontent.com') || url.startsWith('data:video/')) {
                        const video = document.createElement('video');
                        video.src = url;
                        video.style.cssText = 'width:100%;height:600px;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);object-fit:cover;';
                        video.preload = 'metadata';
                        if (el.tagName === 'IMG') {
                            wrapper.innerHTML = '';
                            wrapper.appendChild(video);
                            createCustomVideoPlayer(video, wrapper);
                        } else if (el.tagName === 'IFRAME') {
                            el.parentElement.replaceWith(video);
                            createCustomVideoPlayer(video, video.parentElement);
                        } else if (el.tagName === 'VIDEO') {
                            el.src = url;
                            createCustomVideoPlayer(el, el.parentElement);
                        }
                    } else {
                        if (el.tagName === 'IMG') {
                            el.src = url;
                        } else if (el.tagName === 'IFRAME' || el.tagName === 'VIDEO') {
                            el.src = url;
                        }
                    }
                } else if (data.type === 'video') {
                    const isVideo = data.value.startsWith('data:video/') || data.value.match(/\.(mp4|webm|ogg)$/i);
                    if (isVideo && el.tagName === 'IMG') {
                        const video = document.createElement('video');
                        video.id = el.id;
                        video.src = data.value;
                        video.controls = true;
                        video.autoplay = true;
                        video.muted = true;
                        video.loop = true;
                        video.style.cssText = el.style.cssText;
                        el.parentNode.replaceChild(video, el);
                    } else if (el.tagName === 'VIDEO') {
                        el.src = data.value;
                    } else {
                        el.src = data.value;
                    }
                } else if (data.type === 'image') {
                    if (el.tagName === 'VIDEO') {
                        const img = document.createElement('img');
                        img.id = el.id;
                        img.src = data.value;

                        img.style.cssText = el.style.cssText;
                        el.parentNode.replaceChild(img, el);
                    } else {
                        el.src = data.value;
                    }
                } else {
                    el.innerHTML = data.value;
                }
            }
        });

        // Salvar no localStorage
        console.log('Salvando no localStorage:', edits);
        localStorage.setItem('isabellaSiteEdits', JSON.stringify(edits));
        
        // Backup automático - salvar no histórico
        const autoBackup = {
            date: new Date().toISOString(),
            edits: JSON.parse(JSON.stringify(edits))
        };
        
        // Buscar históricos existentes
        let backupHistory = JSON.parse(localStorage.getItem('isabellaBackupHistory') || '[]');
        backupHistory.unshift(autoBackup);
        
        // Manter apenas os últimos 20 backups
        if (backupHistory.length > 20) {
            backupHistory = backupHistory.slice(0, 20);
        }
        
        localStorage.setItem('isabellaBackupHistory', JSON.stringify(backupHistory));
        console.log('Backup automático criado. Total de backups:', backupHistory.length);
        
        // Mostrar toast
        showToast('Alterações salvas com sucesso!');
    }

    function showToast(message) {
        const toast = document.getElementById('adminToast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Carregar alterações salvas
    function loadSavedEdits() {
        const savedEdits = localStorage.getItem('isabellaSiteEdits');
        console.log('Carregando edits do localStorage:', savedEdits);
        if (!savedEdits) return;
        
        const edits = JSON.parse(savedEdits);
        console.log('Edits parsed:', edits);
        
        Object.entries(edits).forEach(([selector, data]) => {
            let el = document.querySelector(selector);
            console.log('Procurando elemento:', selector, 'Encontrado:', el, 'Tag:', el?.tagName);
            if (el) {
                if (data.type === 'link') {
                    el.setAttribute('href', data.value);
                } else if (data.type === 'videoembed') {
                    const url = data.value;
                    const wrapper = el.parentElement;
                    
                    if (url.includes('drive.google.com')) {
                        let videoId = '';
                        if (url.includes('/d/')) {
                            videoId = url.split('/d/')[1].split('/')[0].split('?')[0];
                        }
                        const videoUrl = 'https://drive.google.com/uc?id=' + videoId + '&export=download';
                        const video = document.createElement('video');
                        video.src = videoUrl;
                        video.style.cssText = 'width:100%;height:600px;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);object-fit:cover;';
                        video.preload = 'metadata';
                        if (el.tagName === 'IMG') {
                            wrapper.innerHTML = '';
                            wrapper.appendChild(video);
                            createCustomVideoPlayer(video, wrapper);
                        } else if (el.tagName === 'IFRAME') {
                            el.parentElement.replaceWith(video);
                            createCustomVideoPlayer(video, video.parentElement);
                        } else if (el.tagName === 'VIDEO') {
                            el.src = videoUrl;
                        }
                    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                        let embedUrl = url;
                        if (embedUrl.includes('watch?v=')) {
                            const videoId = embedUrl.split('watch?v=')[1].split('&')[0];
                            embedUrl = 'https://www.youtube.com/embed/' + videoId;
                        } else if (embedUrl.includes('youtu.be/embed/')) {
                            const videoId = embedUrl.split('youtu.be/embed/')[1].split('&')[0];
                            embedUrl = 'https://www.youtube.com/embed/' + videoId;
                        } else if (embedUrl.includes('youtu.be/') && !embedUrl.includes('/embed/')) {
                            const videoId = embedUrl.split('youtu.be/')[1].split('&')[0];
                            embedUrl = 'https://www.youtube.com/embed/' + videoId;
                        }
                        embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'modestbranding=1&rel=0';
                        const iframe = document.createElement('iframe');
                        iframe.src = embedUrl;
                        iframe.style.cssText = 'width:100%;height:600px;border:0;border-radius:inherit;object-fit:cover;';
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        if (el.tagName === 'IMG') {
                            wrapper.innerHTML = '';
                            wrapper.appendChild(iframe);
                        } else if (el.tagName === 'IFRAME') {
                            el.src = embedUrl;
                        }
                    } else if (url.match(/\.(mp4|webm|ogg)$/i) || url.includes('raw.githubusercontent.com') || url.startsWith('data:video/')) {
                        const video = document.createElement('video');
                        video.src = url;
                        video.style.cssText = 'width:100%;height:600px;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);object-fit:cover;';
                        video.preload = 'metadata';
                        if (el.tagName === 'IMG') {
                            wrapper.innerHTML = '';
                            wrapper.appendChild(video);
                            createCustomVideoPlayer(video, wrapper);
                        } else if (el.tagName === 'IFRAME') {
                            el.parentElement.replaceWith(video);
                            createCustomVideoPlayer(video, video.parentElement);
                        } else if (el.tagName === 'VIDEO') {
                            el.src = url;
                            createCustomVideoPlayer(el, el.parentElement);
                        }
                    } else {
                        if (el.tagName === 'IMG') {
                            el.src = url;
                        } else if (el.tagName === 'IFRAME' || el.tagName === 'VIDEO') {
                            el.src = url;
                        }
                    }
                } else if (data.type === 'video') {
                    const isVideo = data.value.startsWith('data:video/') || data.value.match(/\.(mp4|webm|ogg)$/i);
                    if (isVideo && el.tagName === 'IMG') {
                        const video = document.createElement('video');
                        video.id = el.id;
                        video.src = data.value;
                        video.controls = true;
                        video.autoplay = true;
                        video.muted = true;
                        video.loop = true;
                        video.style.cssText = el.style.cssText;
                        el.parentNode.replaceChild(video, el);
                    } else if (el.tagName === 'VIDEO') {
                        el.src = data.value;
                    } else {
                        el.src = data.value;
                    }
                } else if (data.type === 'image') {
                    if (el.tagName === 'VIDEO') {
                        const img = document.createElement('img');
                        img.id = el.id;
                        img.src = data.value;

                        img.style.cssText = el.style.cssText;
                        el.parentNode.replaceChild(img, el);
                    } else {
                        el.src = data.value;
                    }
                } else {
                    el.innerHTML = data.value;
                }
            }
        });
    }

    // Verificar sessão
    function checkAdminSession() {
        if (localStorage.getItem('isabellaAdminSession') === 'true') {
            adminMode = true;
            setTimeout(() => {
                document.getElementById('adminPanel').classList.add('open');
                document.getElementById('adminOverlay').classList.add('active');
            }, 500);
        }
    }

    // Inicialização do Admin desativada pelo usuário
    /*
    initAdminSystem();
    setupAdminEventListeners();
    loadSavedEdits();
    checkAdminSession();
    */

    console.log('Site carregado com sucesso!');
});
