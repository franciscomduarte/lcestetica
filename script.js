/* ========================================
   LC ESTÉTICA E SAÚDE INTEGRATIVA - JAVASCRIPT
   ======================================== */

// ========================================
// 1. VARIÁVEIS GLOBAIS
// ========================================
let currentSlide = 0;
let isAnimating = false;

const LC_GADS_STORAGE_KEY = 'lc_google_ads_click';
const LC_GADS_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const LC_WHATSAPP_PHONE = '5561996522456';

const LC_SERVICE_PAGE_PROCEDURES = {
    'harmonizacao-facial-aguas-claras': 'Harmonização Facial',
    'tratamento-melasma-brasilia': 'tratamento de Melasma',
    'bioestimulador-colageno-brasilia': 'Bioestimulador de Colágeno',
    'fios-pdo-aguas-claras': 'Fios de PDO',
    'ozonioterapia-brasilia': 'Ozonioterapia',
};

// ========================================
// 1b. ORIGEM GOOGLE ADS → TEXTO WHATSAPP
// ========================================
function captureGoogleAdsAttribution() {
    try {
        const params = new URLSearchParams(window.location.search);
        const utmSource = (params.get('utm_source') || '').toLowerCase();
        const fromGoogle =
            params.has('gclid') ||
            params.has('gbraid') ||
            params.has('wbraid') ||
            utmSource === 'google';

        if (fromGoogle) {
            localStorage.setItem(LC_GADS_STORAGE_KEY, String(Date.now()));
        }
    } catch (e) {
        /* localStorage indisponível */
    }
}

function hasGoogleAdsAttribution() {
    try {
        const raw = localStorage.getItem(LC_GADS_STORAGE_KEY);
        if (!raw) return false;

        const setAt = parseInt(raw, 10);
        if (Number.isNaN(setAt) || Date.now() - setAt > LC_GADS_TTL_MS) {
            localStorage.removeItem(LC_GADS_STORAGE_KEY);
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

function isGeneralSitePage() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    return (
        path === '/' ||
        path === '/index.html' ||
        path === '/contato.html' ||
        path === '/sobre.html' ||
        path === '/estrutura.html'
    );
}

function getServiceSlugFromPath() {
    const match = window.location.pathname.match(/\/servicos\/([^/]+)\.html/i);
    return match ? match[1] : null;
}

function extractInterestFromWhatsAppHref(href) {
    try {
        const url = new URL(href, window.location.origin);
        const text = url.searchParams.get('text');
        if (!text) return null;

        const interestMatch = text.match(/Tenho interesse em\s+(.+)/i);
        if (interestMatch) return normalizeProcedureLabel(interestMatch[1]);

        return null;
    } catch (e) {
        return null;
    }
}

function resolveWhatsAppProcedure(anchor) {
    const href = anchor.getAttribute('href') || '';
    const fromLinkText = extractInterestFromWhatsAppHref(href);
    if (fromLinkText) return fromLinkText;

    const slug = getServiceSlugFromPath();
    if (slug && LC_SERVICE_PAGE_PROCEDURES[slug]) {
        return LC_SERVICE_PAGE_PROCEDURES[slug];
    }

    const serviceCard = anchor.closest('.service-card');
    if (serviceCard) {
        const title = serviceCard.querySelector('.service-title')?.textContent?.trim();
        if (title) return title;
    }

    return null;
}

function normalizeProcedureLabel(procedure) {
    if (!procedure) return procedure;
    return procedure.trim().replace(/[.!?…]+$/g, '').trim();
}

function buildGoogleAdsWhatsAppMessage(procedure) {
    const label = normalizeProcedureLabel(procedure);
    if (label) {
        return `Olá! Vi o anúncio no Google e quero agendar uma avaliação de ${label}.`;
    }
    return 'Olá! Vi o anúncio no Google e quero agendar uma avaliação.';
}

function setWhatsAppHrefText(anchor, message) {
    const href = anchor.getAttribute('href');
    if (!href || (!href.includes('wa.me') && !href.includes('whatsapp.com'))) return;

    try {
        const url = new URL(href, window.location.origin);
        const phonePath = url.pathname.replace(/^\//, '');
        if (/^\d+$/.test(phonePath)) {
            url.pathname = `/${LC_WHATSAPP_PHONE}`;
        }
        url.searchParams.set('text', message);
        anchor.setAttribute('href', url.toString());
    } catch (e) {
        /* href inválido */
    }
}

function initGoogleAdsWhatsAppMessages() {
    if (!hasGoogleAdsAttribution()) return;

    const generalPage = isGeneralSitePage();

    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach((anchor) => {
        let procedure = resolveWhatsAppProcedure(anchor);

        if (generalPage && !anchor.closest('.service-card')) {
            procedure = null;
        }

        if (anchor.classList.contains('whatsapp-float') && !generalPage && !procedure) {
            const slug = getServiceSlugFromPath();
            if (slug && LC_SERVICE_PAGE_PROCEDURES[slug]) {
                procedure = LC_SERVICE_PAGE_PROCEDURES[slug];
            }
        }

        setWhatsAppHrefText(anchor, buildGoogleAdsWhatsAppMessage(procedure));
    });
}

const LC_WHATSAPP_FLOAT_SVG =
    '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
    '<path d="M27.281 4.65C24.281 1.65 20.281 0 16.031 0C7.281 0 0.156 7.125 0.156 15.875C0.156 18.625 0.906 21.281 2.281 23.625L0.031 32L8.656 29.781C10.906 31.031 13.437 31.687 16.031 31.687C24.781 31.687 31.906 24.562 31.906 15.812C31.906 11.562 30.281 7.65 27.281 4.65ZM16.031 29.031C13.687 29.031 11.406 28.406 9.406 27.25L8.906 26.969L3.906 28.219L5.187 23.344L4.875 22.812C3.625 20.719 2.969 18.344 2.969 15.875C2.969 8.687 8.812 2.844 16.031 2.844C19.531 2.844 22.844 4.156 25.312 6.625C27.781 9.094 29.125 12.406 29.125 15.875C29.125 23.062 23.25 29.031 16.031 29.031ZM23.219 19.156C22.812 18.969 20.875 18.031 20.5 17.875C20.125 17.75 19.844 17.688 19.562 18.094C19.281 18.5 18.562 19.375 18.312 19.656C18.094 19.937 17.844 19.969 17.437 19.781C15.5 18.812 14.219 18.062 12.906 15.781C12.562 15.187 13.25 15.219 13.875 14C14 13.719 13.937 13.5 13.844 13.312C13.75 13.125 12.937 11.187 12.594 10.406C12.25 9.656 11.906 9.75 11.656 9.75C11.406 9.75 11.125 9.75 10.844 9.75C10.562 9.75 10.125 9.844 9.75 10.25C9.375 10.656 8.375 11.594 8.375 13.531C8.375 15.469 9.781 17.344 9.969 17.625C10.156 17.906 12.937 22.156 17.156 23.875C19.844 25.062 20.812 25.156 22.062 24.969C22.844 24.844 24.406 24 24.75 23.062C25.094 22.125 25.094 21.344 25 21.187C24.906 21 24.625 20.906 24.219 20.719L23.219 19.156Z" fill="white"/></svg>';

function getDefaultWhatsAppMessageForPage() {
    const slug = getServiceSlugFromPath();
    if (slug && LC_SERVICE_PAGE_PROCEDURES[slug]) {
        return `Olá! Gostaria de agendar uma avaliação de ${LC_SERVICE_PAGE_PROCEDURES[slug]}.`;
    }
    return 'Olá! Gostaria de agendar uma avaliação.';
}

function normalizeWhatsAppPhoneInHref(anchor) {
    const href = anchor.getAttribute('href');
    if (!href || (!href.includes('wa.me') && !href.includes('whatsapp.com'))) return;

    try {
        const url = new URL(href, window.location.origin);
        const phonePath = url.pathname.replace(/^\//, '');
        if (/^\d+$/.test(phonePath)) {
            url.pathname = `/${LC_WHATSAPP_PHONE}`;
            anchor.setAttribute('href', url.toString());
        }
    } catch (e) {
        /* href inválido */
    }
}

function normalizeAllWhatsAppPhoneNumbers() {
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(normalizeWhatsAppPhoneInHref);
}

function syncWhatsAppFloatWithPage() {
    const float = document.querySelector('a.whatsapp-float');
    if (!float) return;

    const reference = Array.from(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]'))
        .find((anchor) => !anchor.classList.contains('whatsapp-float') && anchor.getAttribute('href')?.includes('text='));

    if (reference) {
        try {
            const refUrl = new URL(reference.getAttribute('href'), window.location.origin);
            const text = refUrl.searchParams.get('text');
            const floatUrl = new URL(float.getAttribute('href') || `https://wa.me/${LC_WHATSAPP_PHONE}`, window.location.origin);
            floatUrl.pathname = `/${LC_WHATSAPP_PHONE}`;
            if (text) floatUrl.searchParams.set('text', text);
            float.setAttribute('href', floatUrl.toString());
            return;
        } catch (e) {
            /* fallback abaixo */
        }
    }

    float.setAttribute(
        'href',
        `https://wa.me/${LC_WHATSAPP_PHONE}?text=${encodeURIComponent(getDefaultWhatsAppMessageForPage())}`
    );
}

function ensureGlobalWhatsAppFloat() {
    if (!document.body) return;

    let float = document.querySelector('a.whatsapp-float');
    if (!float) {
        float = document.createElement('a');
        float.className = 'whatsapp-float';
        float.target = '_blank';
        float.rel = 'noopener noreferrer';
        float.setAttribute('aria-label', 'Contato via WhatsApp');
        float.innerHTML = LC_WHATSAPP_FLOAT_SVG;
        document.body.appendChild(float);
    }

    if (!float.querySelector('svg')) {
        float.innerHTML = LC_WHATSAPP_FLOAT_SVG;
    }

    float.id = 'whatsapp-button';
    syncWhatsAppFloatWithPage();
}

function initWhatsAppLinks() {
    ensureGlobalWhatsAppFloat();
    normalizeAllWhatsAppPhoneNumbers();
    if (!hasGoogleAdsAttribution()) {
        syncWhatsAppFloatWithPage();
    }
    initGoogleAdsWhatsAppMessages();
}

captureGoogleAdsAttribution();

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
    initWhatsAppLinks();
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
    const phone = '5561996522456'; // Número do WhatsApp (com código do país)
    
    let message = `*Nova Solicitação de Contato*\n\n`;
    message += `*Nome:* ${formData.name}\n`;
    message += `*Telefone:* ${formData.phone}\n`;
    message += `*E-mail:* ${formData.email}\n`;
    
    if (formData.treatment) {
        const treatments = {
            'harmonizacao-facial': 'Harmonização facial',
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

        if (typeof gtag !== 'undefined' && window.location.pathname.endsWith('contato.html')) {
            gtag('event', 'conversion', {'send_to': 'AW-18511332095/Z9MGCKOsiZ0dEP-F8vpE'});
        }

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

if (document.body) {
    ensureGlobalWhatsAppFloat();
}

// ========================================
// FIM DO SCRIPT
// ========================================
