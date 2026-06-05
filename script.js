/* ========================================
   LC ESTÉTICA E SAÚDE INTEGRATIVA - JAVASCRIPT
   ======================================== */

// ========================================
// 1. VARIÁVEIS GLOBAIS
// ========================================
let currentSlide = 0;
let isAnimating = false;

// ========================================
// 2. DOM CONTENT LOADED - INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funções
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initTestimonialsCarousel();
    initFormValidation();
    initPhoneMask();
    initWhatsAppTracking();
    initLazyLoading();
    initScrollAnimations();
});

// ========================================
// 3. MENU MOBILE
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    // Toggle do menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// 4. HEADER STICKY
// ========================================
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Adicionar classe quando rolar
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// 5. SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios ou apenas "#"
            if (!href || href === '#') return;

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// 6. CARROSSEL DE DEPOIMENTOS
// ========================================
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.children);
    const totalSlides = cards.length;

    // Determinar quantos slides mostrar por vez baseado na largura da tela
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    let slidesPerView = getSlidesPerView();

    // Criar indicadores
    function createIndicators() {
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';
        
        const numIndicators = Math.ceil(totalSlides / slidesPerView);
        
        for (let i = 0; i < numIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Ir para slide específico
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
        currentSlide = Math.max(0, Math.min(index, maxIndex));

        const offset = -(currentSlide * (100 / slidesPerView));
        track.style.transform = `translateX(${offset}%)`;

        updateIndicators();

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Atualizar indicadores
    function updateIndicators() {
        if (!indicatorsContainer) return;
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Próximo slide
    function nextSlide() {
        const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
        if (currentSlide < maxIndex) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0); // Voltar ao início
        }
    }

    // Slide anterior
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
            goToSlide(maxIndex); // Ir para o final
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Autoplay (opcional - comentado por padrão)
    /*
    setInterval(() => {
        nextSlide();
    }, 5000);
    */

    // Redimensionamento da janela
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                currentSlide = 0;
                createIndicators();
                goToSlide(0);
            }
        }, 250);
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Suporte a touch/swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }

    // Inicializar
    createIndicators();
}

// ========================================
// 7. VALIDAÇÃO E ENVIO DO FORMULÁRIO
// ========================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validações básicas
        if (!validateForm(form)) {
            return;
        }

        // Coletar dados do formulário
        const formData = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            treatment: form.treatment.value,
            message: form.message.value,
            consent: form.consent.checked
        };

        // Desabilitar botão de envio
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // RASTREAMENTO: Meta Pixel - Evento Lead
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Formulário de Contato',
                    content_category: formData.treatment || 'Geral',
                    value: 0,
                    currency: 'BRL'
                });
            }

            // OPÇÃO 1: Enviar por e-mail usando serviço de backend
            // Descomente e configure seu endpoint:
            /*
            const response = await fetch('https://seu-backend.com/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            */

            // OPÇÃO 2: Integração com Webhook (ex: Zapier, Make, n8n)
            // Descomente e configure seu webhook:
            /*
            const response = await fetch('https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            */

            // OPÇÃO 3: Redirecionar para WhatsApp (Implementado abaixo)
            sendToWhatsApp(formData);

            // Mostrar mensagem de sucesso
            showSuccessMessage();

            // Resetar formulário
            form.reset();

        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Validar formulário
function validateForm(form) {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const consent = form.consent.checked;

    if (!name) {
        alert('Por favor, preencha seu nome.');
        form.name.focus();
        return false;
    }

    if (!phone) {
        alert('Por favor, preencha seu telefone.');
        form.phone.focus();
        return false;
    }

    if (!email) {
        alert('Por favor, preencha seu e-mail.');
        form.email.focus();
        return false;
    }

    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        form.email.focus();
        return false;
    }

    if (!consent) {
        alert('Por favor, aceite receber comunicações para continuar.');
        form.consent.focus();
        return false;
    }

    return true;
}

// Enviar para WhatsApp
function sendToWhatsApp(formData) {
    const phone = '5561998092709'; // Número do WhatsApp (com código do país)
    
    let message = `*Nova Solicitação de Contato*\n\n`;
    message += `*Nome:* ${formData.name}\n`;
    message += `*Telefone:* ${formData.phone}\n`;
    message += `*E-mail:* ${formData.email}\n`;
    
    if (formData.treatment) {
        const treatments = {
            'botox': 'Toxina Botulínica (Botox)',
            'preenchimento': 'Preenchimento Facial',
            'bioestimulador': 'Bioestimulador de Colágeno',
            'skinbooster': 'Skinbooster',
            'fios-pdo': 'Fios de PDO',
            'melasma': 'Melasma / Microagulhamento',
            'gordura': 'Gordura Localizada',
            'celulite': 'Flacidez / Celulite / Estrias',
            'papada': 'Papada',
            'ozonioterapia': 'Ozonioterapia',
            'ventosaterapia': 'Ventosaterapia',
            'terapia-neural': 'Terapia Neural',
            'capilar': 'Tratamento Capilar',
            'detox': 'Detox & Nutrição',
            'outro': 'Outro / Avaliação Geral'
        };
        message += `*Tratamento de Interesse:* ${treatments[formData.treatment] || formData.treatment}\n`;
    }
    
    if (formData.message) {
        message += `\n*Mensagem:*\n${formData.message}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.classList.add('show');

        // Voltar ao formulário após 5 segundos
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.classList.remove('show');
        }, 5000);
    }
}

// ========================================
// 8. MÁSCARA DE TELEFONE
// ========================================
function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            // Formato: (00) 00000-0000 ou (00) 0000-0000
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// ========================================
// 9. RASTREAMENTO DE WHATSAPP
// ========================================
function initWhatsAppTracking() {
    // Rastrear cliques no botão flutuante
    const whatsappFloat = document.getElementById('whatsapp-button');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            // Meta Pixel - Evento Contact
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    content_name: 'WhatsApp Flutuante'
                });
            }

            // Google Analytics 4 (se configurado)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': 'WhatsApp Flutuante'
                });
            }

            console.log('Clique no WhatsApp rastreado');
        });
    }

    // Rastrear todos os botões de WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card')?.querySelector('.service-title')?.textContent || 'Desconhecido';
            
            // Meta Pixel - Evento Contact
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    content_name: `WhatsApp - ${serviceName}`
                });
            }

            // Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': `WhatsApp - ${serviceName}`
                });
            }

            console.log(`Clique no WhatsApp rastreado: ${serviceName}`);
        });
    });
}

// ========================================
// 10. LAZY LOADING DE IMAGENS
// ========================================
function initLazyLoading() {
    // Verificar se o navegador suporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Se a imagem tem data-src, carregar
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Começar a carregar 50px antes
            threshold: 0.01
        });

        // Observar todas as imagens com loading="lazy"
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ========================================
// 11. ANIMAÇÕES NO SCROLL
// ========================================
function initScrollAnimations() {
    // Verificar se o navegador suporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .testimonial-card');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
}

// ========================================
// 12. FUNÇÕES AUXILIARES
// ========================================

// Debounce para otimizar eventos de resize/scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para limitar frequência de execução
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// 13. RASTREAMENTO DE PAGEVIEW (Meta Pixel)
// ========================================
// Este evento é disparado automaticamente no <head> do HTML
// Mas podemos adicionar eventos customizados aqui

// Rastrear tempo na página
let pageLoadTime = Date.now();

window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000); // em segundos
    
    if (typeof fbq !== 'undefined' && timeOnPage > 10) { // Só rastrear se ficou mais de 10 segundos
        fbq('trackCustom', 'TimeOnPage', {
            seconds: timeOnPage
        });
    }
});

// Rastrear scroll depth
let maxScrollDepth = 0;

window.addEventListener('scroll', throttle(function() {
    const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
        
        // Rastrear marcos de scroll (25%, 50%, 75%, 90%)
        if (typeof fbq !== 'undefined') {
            if (scrollPercentage >= 25 && maxScrollDepth < 50) {
                fbq('trackCustom', 'ScrollDepth', { depth: '25%' });
            } else if (scrollPercentage >= 50 && maxScrollDepth < 75) {
                fbq('trackCustom', 'ScrollDepth', { depth: '50%' });
            } else if (scrollPercentage >= 75 && maxScrollDepth < 90) {
                fbq('trackCustom', 'ScrollDepth', { depth: '75%' });
            } else if (scrollPercentage >= 90) {
                fbq('trackCustom', 'ScrollDepth', { depth: '90%' });
            }
        }
    }
}, 1000));

// ========================================
// 14. CONSOLE LOG (REMOVER EM PRODUÇÃO)
// ========================================
console.log('%c🌟 LC Estética e Saúde Integrativa', 'color: #8B6F47; font-size: 20px; font-weight: bold;');
console.log('%cPara suporte: https://www.anthropic.com', 'color: #999; font-size: 10px;');

// ========================================
// FIM DO SCRIPT
// ========================================
