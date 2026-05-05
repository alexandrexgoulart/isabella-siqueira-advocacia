document.addEventListener('DOMContentLoaded', function() {
    // Função global para scroll dos links do footer
    window.scrollToSection = function(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo(0, targetPosition);
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

    let adminMode = false;
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
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.addEventListener('click', function() {
            const isActive = this.classList.toggle('active');
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', String(isActive));
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

    const contactForm = document.getElementById('contactForm');
    const privacyModal = document.getElementById('privacyModal');
    const privacyModalOpen = document.getElementById('privacyPolicyOpen');
    const privacyModalClose = document.getElementById('privacyModalClose');
    const privacyModalAccept = document.getElementById('privacyModalAccept');
    const privacyBanner = document.getElementById('privacyBanner');
    const privacyBannerOpen = document.getElementById('privacyBannerOpen');
    const privacyBannerAccept = document.getElementById('privacyBannerAccept');

    const showPrivacyModal = () => {
        if (privacyModal) {
            privacyModal.classList.add('open');
            privacyModal.focus();
        }
    };

    const hidePrivacyModal = () => {
        if (privacyModal) {
            privacyModal.classList.remove('open');
        }
    };

    const hidePrivacyBanner = () => {
        if (privacyBanner) {
            privacyBanner.style.display = 'none';
            localStorage.setItem('privacyAccepted', 'true');
        }
    };

    if (privacyModalOpen) {
        privacyModalOpen.addEventListener('click', showPrivacyModal);
    }

    if (privacyModalClose) {
        privacyModalClose.addEventListener('click', hidePrivacyModal);
    }

    if (privacyModalAccept) {
        privacyModalAccept.addEventListener('click', hidePrivacyModal);
    }

    if (privacyBannerOpen) {
        privacyBannerOpen.addEventListener('click', showPrivacyModal);
    }

    if (privacyBannerAccept) {
        privacyBannerAccept.addEventListener('click', hidePrivacyBanner);
    }

    if (privacyBanner && localStorage.getItem('privacyAccepted') === 'true') {
        privacyBanner.style.display = 'none';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            const privacyChecked = document.getElementById('contactPrivacy').checked;

            if (!privacyChecked) {
                alert('Por favor, aceite a Política de Privacidade para enviar sua mensagem.');
                return;
            }

            const whatsappText = encodeURIComponent(
                `Olá, sou ${name}.
Email: ${email}
Telefone/WhatsApp: ${phone}
Mensagem: ${message}`
            );
            const whatsappUrl = `https://wa.me/5562983000708?text=${whatsappText}`;
            window.open(whatsappUrl, '_blank', 'noopener');
            contactForm.reset();
            showToast('Dados limpos. WhatsApp aberto para envio.');

            const contactMessage = document.getElementById('contactSubmitMessage');
            if (contactMessage) {
                contactMessage.textContent = 'Pronto! Seus dados foram apagados e o WhatsApp foi aberto.';
                contactMessage.style.opacity = '1';
                setTimeout(() => {
                    if (contactMessage) contactMessage.style.opacity = '0';
                }, 5000);
            }
        });
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

    // ========== ADMINISTRATIVO SIMPLES ==========
    const ADMIN_DEFAULT_PASSWORD = 'adminisabellaadv';
    const ADMIN_SESSION_KEY = 'isabellaAdminSession';
    const ADMIN_EDITS_KEY = 'isabellaSiteEdits';
    const ADMIN_PASSWORD_HASH_KEY = 'isabellaAdminPasswordHash';

    function hashPassword(str) {
        let hash = 0;
        if (!str) return '';
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16);
    }

    function getAdminPassword() {
        const storedHash = localStorage.getItem(ADMIN_PASSWORD_HASH_KEY);
        const defaultHash = hashPassword(ADMIN_DEFAULT_PASSWORD);
        // Reset automático se a senha armazenada for diferente da padrão
        if (storedHash && storedHash !== defaultHash) {
            localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, defaultHash);
        }
        return defaultHash;
    }

    function setAdminPasswordHash(password) {
        localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, hashPassword(password));
    }

    function isAdminAuthenticated() {
        return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    }

    function saveAdminSession() {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    }

    function clearAdminSession() {
        localStorage.removeItem(ADMIN_SESSION_KEY);
    }

    function getSavedAdminEdits() {
        return JSON.parse(localStorage.getItem(ADMIN_EDITS_KEY) || '{}');
    }

    function saveAdminEditsToStorage(edits) {
        localStorage.setItem(ADMIN_EDITS_KEY, JSON.stringify(edits));
    }

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
                padding: 24px 24px 40px;
                max-width: 980px;
                margin: 0 auto;
            }
            .admin-panel-header p {
                margin: 6px 0 0;
                color: rgba(255,255,255,0.85);
                font-size: 13px;
                line-height: 1.4;
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
                margin-bottom: 18px;
            }
            .admin-field label {
                display: block;
                color: #cbd5e1;
                font-size: 13px;
                margin-bottom: 8px;
                font-weight: 600;
            }
            .admin-field input,
            .admin-field textarea {
                width: 100%;
                padding: 14px 14px;
                background: #0f1227;
                border: 1px solid #334155;
                border-radius: 12px;
                color: #e2e8f0;
                font-size: 14px;
                transition: all 0.25s ease;
                font-family: inherit;
            }
            .admin-field input:focus,
            .admin-field textarea:focus {
                outline: none;
                border-color: #818cf8;
                box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
            }
            .admin-field textarea {
                min-height: 100px;
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
        
        panel.innerHTML = `
            <div class="admin-panel-header">
                <div>
                    <h2><i class="fas fa-cog"></i> Painel Administrativo</h2>
                    <p>Use Ctrl+Shift+A para abrir a edição rápida. Salve para aplicar alterações ao site.</p>
                </div>
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
                <button class="admin-btn-save" id="previewChanges" style="background: #22c55e; margin-top: 12px;"><i class="fas fa-eye"></i> Visualizar Alterações</button>
                
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
            <div style="display:flex; gap:12px; justify-content:center; margin-top:18px;">
                <button id="btnAdminLogin">Entrar</button>
                <button type="button" id="btnAdminCancel" style="background:#d1d5db; color:#0f172a;">Cancelar</button>
            </div>
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
                passBtn.addEventListener('click', changeAdminPassword);
            }
        }, 500);

        setupAdminEventListeners();
        attachRichTextToolbarActions();
    }

    function getAllEditableFields() {
        return {
            header: [
                { id: 'header-name', label: 'Nome do Escritório', type: 'text', selector: '.logo .name' },
                { id: 'header-subtitle', label: 'Subtítulo do Escritório', type: 'text', selector: '.logo .subtitle' },
                { id: 'header-whatsapp-link', label: 'Link WhatsApp do topo', type: 'text', selector: '#header-whatsapp-a', isLink: true },
                { id: 'header-whatsapp-text', label: 'Telefone exibido no topo', type: 'text', selector: '#header-whatsapp-text' }
            ],
            inicio: [
                { id: 'hero-badge', label: 'Texto do badge', type: 'text', selector: '#hero-badge' },
                { id: 'hero-title', label: 'Título principal', type: 'textarea', selector: '#hero-title' },
                { id: 'hero-desc', label: 'Descrição do hero', type: 'textarea', selector: '#hero-desc' },
                { id: 'hero-btn-text', label: 'Texto do botão WhatsApp', type: 'text', selector: '#hero-btn-text' },
                { id: 'hero-btn-whatsapp', label: 'Link do botão WhatsApp', type: 'text', selector: '#hero-btn-whatsapp', isLink: true },
                { id: 'hero-services-text', label: 'Texto do botão Serviços', type: 'text', selector: '#hero-services-text' }
            ],
            servicos: [
                { id: 'section-servicos-title', label: 'Título da seção Serviços', type: 'text', selector: '#section-servicos-title' },
                { id: 'tab-previdenciario', label: 'Nome aba Previdenciário', type: 'text', selector: '.tab-btn[data-tab="previdenciario"]' },
                { id: 'tab-consultoria', label: 'Nome aba Consultoria', type: 'text', selector: '.tab-btn[data-tab="consultoria"]' },
                { id: 'tab-calculos', label: 'Nome aba Cálculos', type: 'text', selector: '.tab-btn[data-tab="calculos"]' },
                { id: 'tab-parcerias', label: 'Nome aba Parcerias', type: 'text', selector: '.tab-btn[data-tab="parcerias"]' }
            ],
            restituicao: [
                { id: 'restituicao-tag', label: 'Título da seção Restituição', type: 'text', selector: '#restituicao-tag' },
                { id: 'restituicao-p1', label: 'Texto introdutório', type: 'textarea', selector: '#restituicao-text p:nth-child(1)' },
                { id: 'restituicao-p2', label: 'Parágrafo 2', type: 'textarea', selector: '#restituicao-text p:nth-child(2)' },
                { id: 'restituicao-highlight', label: 'Texto de destaque', type: 'textarea', selector: '#restituicao-text p.highlight-text' }
            ],
            sobre: [
                { id: 'sobre-tag', label: 'Tag da seção Sobre', type: 'text', selector: '#sobre-tag' },
                { id: 'sobre-titulo', label: 'Título sobre', type: 'text', selector: '#sobre-titulo' },
                { id: 'sobre-subtitle', label: 'Subtítulo sobre', type: 'text', selector: '.lawyer-subtitle' },
                { id: 'sobre-p1', label: 'Parágrafo 1', type: 'textarea', selector: '#sobre-text p:nth-child(1)' },
                { id: 'sobre-p2', label: 'Parágrafo 2', type: 'textarea', selector: '#sobre-text p:nth-child(2)' },
                { id: 'sobre-missao', label: 'Texto de compromisso', type: 'textarea', selector: '.mission-text' }
            ],
            duvidas: [
                { id: 'faq-title', label: 'Título da seção Dúvidas', type: 'text', selector: '.faq .section-title' },
                { id: 'faq-perg-1', label: 'Pergunta 1', type: 'text', selector: '.faq-item:nth-child(1) h3' },
                { id: 'faq-resp-1', label: 'Resposta 1', type: 'textarea', selector: '.faq-item:nth-child(1) p' },
                { id: 'faq-perg-2', label: 'Pergunta 2', type: 'text', selector: '.faq-item:nth-child(2) h3' },
                { id: 'faq-resp-2', label: 'Resposta 2', type: 'textarea', selector: '.faq-item:nth-child(2) p' },
                { id: 'faq-perg-3', label: 'Pergunta 3', type: 'text', selector: '.faq-item:nth-child(3) h3' },
                { id: 'faq-resp-3', label: 'Resposta 3', type: 'textarea', selector: '.faq-item:nth-child(3) p' }
            ],
            contato: [
                { id: 'contato-section-title', label: 'Título da seção Contato', type: 'text', selector: '#contato .section-title' },
                { id: 'contato-card-title', label: 'Título do cartão de contato', type: 'text', selector: '.contact-card h3' },
                { id: 'contato-card-desc', label: 'Descrição do cartão de contato', type: 'textarea', selector: '.contact-card p' },
                { id: 'contato-whatsapp', label: 'Link WhatsApp contato', type: 'text', selector: '.contact-card a[href*="wa.me"]', isLink: true },
                { id: 'contato-email', label: 'Email de contato', type: 'text', selector: '.contact-card a[href^="mailto:"]', isLink: true },
                { id: 'contato-note', label: 'Nota de privacidade no formulário', type: 'textarea', selector: '.contact-card-note' }
            ],
            footer: [
                { id: 'footer-brand-text', label: 'Texto sobre no rodapé', type: 'textarea', selector: '.footer-brand p' },
                { id: 'footer-whatsapp', label: 'Link WhatsApp do rodapé', type: 'text', selector: '.footer-social a[href*="wa.me"]', isLink: true },
                { id: 'footer-email-social', label: 'Link Email do rodapé', type: 'text', selector: '.footer-social a[href^="mailto:"]', isLink: true },
                { id: 'footer-instagram', label: 'Link Instagram', type: 'text', selector: '.footer-social a[href*="instagram.com"]', isLink: true },
                { id: 'footer-facebook', label: 'Link Facebook', type: 'text', selector: '.footer-social a[href*="facebook.com"]', isLink: true },
                { id: 'footer-linkedin', label: 'Link LinkedIn', type: 'text', selector: '.footer-social a[href*="linkedin.com"]', isLink: true },
                { id: 'footer-map-link', label: 'Link Maps', type: 'text', selector: '.footer-contact a[href*="maps.google.com"]', isLink: true },
                { id: 'footer-phone', label: 'Telefone no rodapé', type: 'text', selector: '.footer-contact ul li:nth-child(1) a', isLink: true },
                { id: 'footer-email-link', label: 'Email no rodapé', type: 'text', selector: '.footer-contact ul li:nth-child(2) a', isLink: true },
                { id: 'footer-copy', label: 'Texto copyright', type: 'textarea', selector: '.footer-bottom p' },
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

    function createRichTextToolbar(fieldId) {
        return `
            <div class="rich-text-toolbar" data-editor="editor-${fieldId}">
                <button type="button" data-command="bold" title="Negrito"><i class="fas fa-bold"></i></button>
                <button type="button" data-command="italic" title="Itálico"><i class="fas fa-italic"></i></button>
                <button type="button" data-command="underline" title="Sublinhado"><i class="fas fa-underline"></i></button>
                <button type="button" data-command="strikeThrough" title="Tachado"><i class="fas fa-strikethrough"></i></button>
                <button type="button" data-command="insertUnorderedList" title="Lista com marcadores"><i class="fas fa-list-ul"></i></button>
                <button type="button" data-command="insertOrderedList" title="Lista numerada"><i class="fas fa-list-ol"></i></button>
                <button type="button" data-command="justifyLeft" title="Alinhar à esquerda"><i class="fas fa-align-left"></i></button>
                <button type="button" data-command="justifyCenter" title="Centralizar"><i class="fas fa-align-center"></i></button>
                <button type="button" data-command="justifyRight" title="Alinhar à direita"><i class="fas fa-align-right"></i></button>
                <button type="button" data-command="createLink" title="Inserir link"><i class="fas fa-link"></i></button>
                <button type="button" data-command="unlink" title="Remover link"><i class="fas fa-unlink"></i></button>
                <input type="color" data-command="foreColor" title="Cor do texto" />
            </div>
        `;
    }

    function generateFieldsForSection(section) {
        const fields = getAllEditableFields()[section];
        if (!fields) return '';

        let html = '';

        fields.forEach(field => {
            let currentValue = getSavedValue(field);
            if (currentValue === null) {
                const element = document.querySelector(field.selector);
                currentValue = field.isLink || field.isHref
                    ? (element?.getAttribute('href') || '')
                    : (element?.innerHTML || '');
            }

            const fieldValue = currentValue.replace(/"/g, '&quot;');

            html += `
                <div class="admin-field">
                    <label for="field-${field.id}">${field.label}</label>
                    ${field.type === 'textarea' ?
                        `
                        ${createRichTextToolbar(field.id)}
                        <div id="editor-${field.id}" class="rich-text-editor" contenteditable="true" data-field="${field.id}" role="textbox" aria-multiline="true">${currentValue}</div>
                        ` :
                        `<input id="field-${field.id}" type="text" data-field="${field.id}" value="${fieldValue}" placeholder="${field.label}" />`
                    }
                </div>
            `;
        });

        return html;
    }

    function attachRichTextToolbarActions() {
        document.querySelectorAll('.rich-text-toolbar button').forEach(button => {
            button.addEventListener('click', () => {
                const editorId = button.closest('.rich-text-toolbar')?.dataset.editor;
                const command = button.dataset.command;
                const editor = document.getElementById(editorId);
                if (!editor) return;

                editor.focus();

                if (command === 'createLink') {
                    let url = prompt('Digite o link completo (http:// ou https://):');
                    if (url) {
                        if (!/^https?:\/\//i.test(url)) {
                            url = 'https://' + url;
                        }
                        document.execCommand('createLink', false, url);
                    }
                } else {
                    document.execCommand(command, false, null);
                }
            });
        });

        document.querySelectorAll('.rich-text-toolbar input[type="color"]').forEach(input => {
            input.addEventListener('change', () => {
                const editorId = input.closest('.rich-text-toolbar')?.dataset.editor;
                const editor = document.getElementById(editorId);
                if (!editor) return;
                editor.focus();
                document.execCommand('foreColor', false, input.value);
            });
        });
    }

    function setupAdminEventListeners() {
        // Abrir login com Ctrl+Shift+A (Robusto)
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
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
        document.getElementById('btnAdminCancel').addEventListener('click', () => {
            const modal = document.getElementById('adminLoginModal');
            if (modal) modal.classList.remove('show');
            const passInput = document.getElementById('adminPassword');
            if (passInput) passInput.value = '';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('adminLoginModal');
                if (modal && modal.classList.contains('show')) {
                    modal.classList.remove('show');
                    const passInput = document.getElementById('adminPassword');
                    if (passInput) passInput.value = '';
                }
            }
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
        document.getElementById('previewChanges').addEventListener('click', previewAdminEdits);

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
        const password = input?.value || '';

        if (!password) {
            error.textContent = 'Digite a senha para continuar.';
            error.classList.add('show');
            return;
        }

        const inputHash = hashPassword(password);
        const expectedHash = getAdminPassword();

        if (inputHash === expectedHash) {
            adminMode = true;
            saveAdminSession();
            document.getElementById('adminLoginModal').classList.remove('show');
            input.value = '';
            error.classList.remove('show');

            setTimeout(() => {
                document.getElementById('adminPanel').classList.add('open');
                document.getElementById('adminOverlay').classList.add('active');
                showToast('Bem-vindo ao painel administrativo!');
            }, 100);
        } else {
            error.textContent = 'Senha incorreta. Tente novamente.';
            error.classList.add('show');
        }
    }

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
        showToast('Senha alterada com sucesso!');
        
        document.getElementById('config-current-password').value = '';
        document.getElementById('config-new-password').value = '';
        document.getElementById('config-confirm-password').value = '';
    };


    function collectAdminEdits() {
        const fields = getAllEditableFields();
        const edits = {};

        Object.values(fields).forEach(sectionFields => {
            sectionFields.forEach(field => {
                const editor = document.getElementById('editor-' + field.id);
                const input = document.querySelector(`[data-field="${field.id}"]`);
                let value = '';

                if (editor) {
                    value = editor.innerHTML;
                } else if (input) {
                    value = input.value;
                }

                if (value === null || value === undefined) return;
                value = value.trim();
                if (value === '') return;

                if (field.isLink || field.isHref) {
                    edits[field.selector] = { type: 'link', value };
                } else if (field.type === 'videoembed') {
                    edits[field.selector] = { type: 'videoembed', value };
                } else if (field.type === 'image' || field.type === 'video' || field.type === 'media') {
                    edits[field.selector] = { type: 'video', value };
                } else {
                    edits[field.selector] = { type: 'text', value };
                }
            });
        });

        return edits;
    }

    function applyAdminEdits(edits) {
        Object.entries(edits).forEach(([selector, data]) => {
            const el = document.querySelector(selector);
            if (!el) return;

            if (data.type === 'link') {
                el.setAttribute('href', data.value);
                return;
            }

            if (data.type === 'videoembed') {
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
                return;
            }

            if (data.type === 'video') {
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
                return;
            }

            if (data.type === 'image') {
                if (el.tagName === 'VIDEO') {
                    const img = document.createElement('img');
                    img.id = el.id;
                    img.src = data.value;
                    img.style.cssText = el.style.cssText;
                    el.parentNode.replaceChild(img, el);
                } else {
                    el.src = data.value;
                }
                return;
            }

            el.innerHTML = data.value;
        });
    }

    function saveAllEdits() {
        const edits = collectAdminEdits();
        applyAdminEdits(edits);
        localStorage.setItem('isabellaSiteEdits', JSON.stringify(edits));

        const autoBackup = {
            date: new Date().toISOString(),
            edits: JSON.parse(JSON.stringify(edits))
        };

        let backupHistory = JSON.parse(localStorage.getItem('isabellaBackupHistory') || '[]');
        backupHistory.unshift(autoBackup);
        if (backupHistory.length > 20) {
            backupHistory = backupHistory.slice(0, 20);
        }
        localStorage.setItem('isabellaBackupHistory', JSON.stringify(backupHistory));

        showToast('Alterações salvas com sucesso!');
    }

    function previewAdminEdits() {
        const edits = collectAdminEdits();
        applyAdminEdits(edits);
        showToast('Pré-visualização aplicada. Salve para manter as alterações.');
    }

    function showToast(message) {
        const toast = document.getElementById('adminToast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

// Carregar alterações salvas - reutiliza applyAdminEdits
    function loadSavedEdits() {
        const savedEdits = localStorage.getItem('isabellaSiteEdits');
        if (!savedEdits) return;
        applyAdminEdits(JSON.parse(savedEdits));
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

    // Inicialização do Admin reativada para MVP
    initAdminSystem();
    loadSavedEdits();
    checkAdminSession();

    // ========== SISTEMA SIMPLIFICADO DE EDIÇÃO ==========
    (function() {
        const SIMPLE_EDIT_KEY = 'simpleEditData';
        const SIMPLE_PASS_KEY = 'simpleEditPassword';
        const DEFAULT_PASS = 'adminisabellaadv';

        // Campos editáveis
        const editFields = {
            heroTitle: { selector: '#hero-title', type: 'text', label: 'Título Principal' },
            heroDesc: { selector: '#hero-desc', type: 'textarea', label: 'Descrição' },
            heroBtnText: { selector: '#hero-btn-text', type: 'text', label: 'Texto do Botão' },
            heroBtnWhatsapp: { selector: '#hero-btn-whatsapp', type: 'text', label: 'Link WhatsApp' },
            sobreText: { selector: '#sobre-text', type: 'textarea', label: 'Texto Sobre' },
            contatoWhatsapp: { selector: '.contact-card a[href*="wa.me"]', type: 'href', label: 'WhatsApp' },
            contatoEmail: { selector: '.contact-card a[href^="mailto:"]', type: 'href', label: 'Email' }
        };

        // Criar estilos do painel simplificado
        function createSimpleStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .simple-edit-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 99999;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .simple-edit-overlay.open { display: flex; }
                .simple-edit-panel {
                    background: #fff;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.3);
                }
                .simple-edit-header {
                    background: linear-gradient(135deg, #1A2B4A, #243657);
                    padding: 24px;
                    color: #fff;
                    border-radius: 16px 16px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .simple-edit-header h2 { margin: 0; font-size: 18px; }
                .simple-edit-close {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: #fff;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                }
                .simple-edit-content { padding: 24px; }
                .simple-field { margin-bottom: 20px; }
                .simple-field label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #1A2B4A;
                    font-size: 14px;
                }
                .simple-field input,
                .simple-field textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 15px;
                    transition: border-color 0.3s;
                    font-family: inherit;
                }
                .simple-field input:focus,
                .simple-field textarea:focus {
                    outline: none;
                    border-color: #C5964B;
                }
                .simple-field textarea { min-height: 80px; resize: vertical; }
                .simple-image-upload {
                    border: 2px dashed #cbd5e1;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }
                .simple-image-upload:hover { border-color: #C5964B; }
                .simple-image-upload img {
                    max-width: 100%;
                    max-height: 200px;
                    border-radius: 8px;
                }
                .simple-image-upload .placeholder {
                    color: #64748b;
                    font-size: 14px;
                }
                .simple-image-upload input {
                    display: none;
                }
                .simple-save-btn {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #1A2B4A, #243657);
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 10px;
                }
                .simple-save-btn:hover { transform: translateY(-2px); }
                .simple-login-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    z-index: 100000;
                    display: none;
                    align-items: center;
                    justify-content: center;
                }
                .simple-login-overlay.open { display: flex; }
                .simple-login-box {
                    background: #fff;
                    padding: 40px;
                    border-radius: 16px;
                    max-width: 360px;
                    width: 90%;
                    text-align: center;
                }
                .simple-login-box h3 { color: #1A2B4A; margin: 0 0 8px; }
                .simple-login-box p { color: #64748b; margin: 0 0 20px; font-size: 14px; }
                .simple-login-box input {
                    width: 100%;
                    padding: 14px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .simple-login-box button {
                    width: 100%;
                    padding: 14px;
                    background: #1A2B4A;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .simple-toast {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #059669;
                    color: #fff;
                    padding: 14px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    z-index: 100001;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .simple-toast.show { opacity: 1; }
                .simple-field-img-preview {
                    width: 100%;
                    max-height: 150px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-bottom: 10px;
                }
            `;
            document.head.appendChild(style);
        }

        // Criar elementos do DOM
        function createSimplePanel() {
            // Overlay do painel
            const panel = document.createElement('div');
            panel.className = 'simple-edit-overlay';
            panel.id = 'simpleEditPanel';
            panel.innerHTML = `
                <div class="simple-edit-panel">
                    <div class="simple-edit-header">
                        <h2>Editar Meu Site</h2>
                        <button class="simple-edit-close" id="simpleCloseBtn">&times;</button>
                    </div>
                    <div class="simple-edit-content">
                        <div class="simple-field">
                            <label>Título Principal</label>
                            <input type="text" id="simple-hero-title" placeholder="Ex: Especialista em Direito Previdenciário">
                        </div>
                        <div class="simple-field">
                            <label>Descrição</label>
                            <textarea id="simple-hero-desc" placeholder="Ex: Ajudo idosos a garantir seus direitos..."></textarea>
                        </div>
                        <div class="simple-field">
                            <label>Texto do Botão WhatsApp</label>
                            <input type="text" id="simple-hero-btn" placeholder="Ex: Falar no WhatsApp">
                        </div>
                        <div class="simple-field">
                            <label>Foto Principal (Sobre)</label>
                            <div class="simple-field" id="simple-image-upload">
                                <img id="simple-foto-preview" style="display:none" alt="Preview">
                                <span class="placeholder" id="simple-foto-placeholder">Clique para trocar a foto</span>
                                <input type="file" id="simple-foto-input" accept="image/*">
                            </div>
                        </div>
                        <div class="simple-field">
                            <label>Texto Sobre</label>
                            <textarea id="simple-sobre-text" placeholder="Fale sobre você..."></textarea>
                        </div>
                        <div class="simple-field">
                            <label>WhatsApp (com código do país)</label>
                            <input type="text" id="simple-whatsapp" placeholder="Ex: 5562983000708">
                        </div>
                        <div class="simple-field">
                            <label>Email</label>
                            <input type="email" id="simple-email" placeholder="Ex: isabella@email.com">
                        </div>
                        <button class="simple-save-btn" id="simpleSaveBtn">Salvar Alterações</button>
                    </div>
                </div>
            `;
            document.body.appendChild(panel);

            // Modal de login
            const login = document.createElement('div');
            login.className = 'simple-login-overlay';
            login.id = 'simpleLoginModal';
            login.innerHTML = `
                <div class="simple-login-box">
                    <h3>Acesso Editar Site</h3>
                    <p>Digite a senha para continuar</p>
                    <input type="password" id="simplePassword" placeholder="Senha">
                    <button id="simpleLoginBtn">Entrar</button>
                </div>
            `;
            document.body.appendChild(login);

            // Toast
            const toast = document.createElement('div');
            toast.className = 'simple-toast';
            toast.id = 'simpleToast';
            document.body.appendChild(toast);
        }

        // Mostrar toast
        function showSimpleToast(msg) {
            const toast = document.getElementById('simpleToast');
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // Carregar dados salvos
        function loadSimpleData() {
            const data = JSON.parse(localStorage.getItem(SIMPLE_EDIT_KEY) || '{}');
            if (data.heroTitle) document.getElementById('simple-hero-title').value = data.heroTitle;
            if (data.heroDesc) document.getElementById('simple-hero-desc').value = data.heroDesc;
            if (data.heroBtnText) document.getElementById('simple-hero-btn').value = data.heroBtnText;
            if (data.sobreText) document.getElementById('simple-sobre-text').value = data.sobreText;
            if (data.whatsapp) document.getElementById('simple-whatsapp').value = data.whatsapp;
            if (data.email) document.getElementById('simple-email').value = data.email;
            if (data.foto) {
                const img = document.getElementById('simple-foto-preview');
                const placeholder = document.getElementById('simple-foto-placeholder');
                img.src = data.foto;
                img.style.display = 'block';
                placeholder.style.display = 'none';
            }
        }

        // Aplicar alterações ao site
        function applySimpleData(data) {
            if (data.heroTitle) {
                const el = document.querySelector('#hero-title');
                if (el) el.textContent = data.heroTitle;
            }
            if (data.heroDesc) {
                const el = document.querySelector('#hero-desc');
                if (el) el.textContent = data.heroDesc;
            }
            if (data.heroBtnText) {
                const el = document.querySelector('#hero-btn-text');
                if (el) el.textContent = data.heroBtnText;
            }
            if (data.whatsapp) {
                const btnHref = document.querySelector('#hero-btn-whatsapp, .hero-buttons a[href*="wa.me"], .btn-whatsapp[href*="wa.me"]');
                if (btnHref) btnHref.href = 'https://wa.me/' + data.whatsapp.replace(/\D/g, '');
            }
            if (data.email) {
                const emailLink = document.querySelector('.contact-card a[href^="mailto:"]');
                if (emailLink) emailLink.href = 'mailto:' + data.email;
            }
            if (data.foto) {
                const fotoHero = document.querySelector('.hero-image, .about-image, .lawyer-image');
                if (fotoHero) fotoHero.src = data.foto;
            }
            // Salvar no localStorage para carregar no futuro
            localStorage.setItem(SIMPLE_EDIT_KEY, JSON.stringify(data));
        }

        // Inicializar
        function initSimpleEdit() {
            createSimpleStyles();
            createSimplePanel();

            // Carregar dados salvos ao iniciar
            const savedData = JSON.parse(localStorage.getItem(SIMPLE_EDIT_KEY) || '{}');
            if (Object.keys(savedData).length > 0) {
                applySimpleData(savedData);
            }

            // Abrir com Ctrl+Shift+E
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && (e.key === 'e' || e.key === 'E')) {
                    e.preventDefault();
                    document.getElementById('simpleLoginModal').classList.add('open');
                }
            });

            // Login
            document.getElementById('simpleLoginBtn').addEventListener('click', () => {
                const input = document.getElementById('simplePassword');
                const hash = btoa(input.value);
                const passHash = localStorage.getItem(SIMPLE_PASS_KEY) || btoa(DEFAULT_PASS);
                if (hash === passHash) {
                    document.getElementById('simpleLoginModal').classList.remove('open');
                    document.getElementById('simpleEditPanel').classList.add('open');
                    loadSimpleData();
                    input.value = '';
                } else {
                    showSimpleToast('Senha incorreta');
                }
            });

            // Fechar painel
            document.getElementById('simpleCloseBtn').addEventListener('click', () => {
                document.getElementById('simpleEditPanel').classList.remove('open');
            });

            document.getElementById('simpleEditPanel').addEventListener('click', (e) => {
                if (e.target.id === 'simpleEditPanel') {
                    document.getElementById('simpleEditPanel').classList.remove('open');
                }
            });

            // Upload de imagem
            const imageUpload = document.getElementById('simple-image-upload');
            const imageInput = document.getElementById('simple-foto-input');
            const imgPreview = document.getElementById('simple-foto-preview');
            const placeholder = document.getElementById('simple-foto-placeholder');

            imageUpload.addEventListener('click', () => imageInput.click());

            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imgPreview.src = e.target.result;
                        imgPreview.style.display = 'block';
                        placeholder.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Salvar
            document.getElementById('simpleSaveBtn').addEventListener('click', () => {
                const data = {
                    heroTitle: document.getElementById('simple-hero-title').value,
                    heroDesc: document.getElementById('simple-hero-desc').value,
                    heroBtnText: document.getElementById('simple-hero-btn').value,
                    sobreText: document.getElementById('simple-sobre-text').value,
                    whatsapp: document.getElementById('simple-whatsapp').value.replace(/\D/g, ''),
                    email: document.getElementById('simple-email').value,
                    foto: imgPreview.src !== '' && imgPreview.style.display !== 'none' ? imgPreview.src : null
                };

                applySimpleData(data);
                document.getElementById('simpleEditPanel').classList.remove('open');
                showSimpleToast('Alterações salvas com sucesso!');
            });
        }

        // Iniciar quando DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSimpleEdit);
        } else {
            initSimpleEdit();
        }
    })();
});
