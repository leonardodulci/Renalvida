/* -------------------------------------------------------------------
 * SCRIPT UNIFICADO - SITE CLÍNICA RENAL VIDA
 * -------------------------------------------------------------------
 * Funções:
 * - Menu Mobile e acessibilidade
 * - Sticky Header
 * - Slider de Banner
 * - Redirecionamento WhatsApp
 * - Slider de Avaliações
 * - FAQ interativo (acordeão)
 * - Scroll suave para links internos
 * - Efeito visual em hover de links do menu
 * ------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {

  // ================================================================
  // 1. MENU MOBILE
  // ================================================================
  (function () {
    const botaoMenu = document.querySelector('.menu-mobile__botao');
    const menuNavegacao = document.querySelector('.menu-navegacao');

    if (!botaoMenu || !menuNavegacao) return;

    botaoMenu.addEventListener('click', () => {
      menuNavegacao.classList.toggle('esta-aberto');
      const estaAberto = menuNavegacao.classList.contains('esta-aberto');
      botaoMenu.setAttribute('aria-expanded', estaAberto);
    });

    document.querySelectorAll('.menu-navegacao__link').forEach(link => {
      link.addEventListener('click', () => {
        if (menuNavegacao.classList.contains('esta-aberto')) {
          menuNavegacao.classList.remove('esta-aberto');
          botaoMenu.setAttribute('aria-expanded', false);
        }
      });
    });
  })();

  // ================================================================
  // 2. HEADER STICKY
  // ================================================================
  (function () {
    const cabecalho = document.querySelector('.cabecalho');
    if (!cabecalho) return;

    window.addEventListener('scroll', () => {
      cabecalho.classList.toggle('cabecalho--rolando', window.scrollY > 50);
    });
  })();

  // ================================================================
  // 3. SLIDER DE BANNER
  // ================================================================
  (function () {
    const slider = document.getElementById('bannerSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slider__item');
    let indiceAtual = 0;
    const INTERVALO = 10000;
    const isMobile = () => window.innerWidth < 768;

    function aplicarBackgrounds() {
      slides.forEach(slide => {
        const caminho = isMobile() ? slide.dataset.mobileImg : slide.dataset.desktopImg;
        slide.style.setProperty('background-image', `url('${caminho}')`, 'important');
      });
    }

    function proximoSlide() {
      slides[indiceAtual].classList.remove('item--ativo');
      indiceAtual = (indiceAtual + 1) % slides.length;
      slides[indiceAtual].classList.add('item--ativo');
      aplicarBackgrounds();
    }

    aplicarBackgrounds();
    window.addEventListener('resize', aplicarBackgrounds);
    setInterval(proximoSlide, INTERVALO);
  })();

  // ================================================================
  // 4. LINKS WHATSAPP
  // ================================================================
  (function () {
    const WHATSAPP = 'https://wa.me/5561991020570';
    document.querySelectorAll('a[href*="seunumerowhatsapp"]').forEach(link => {
      link.href = WHATSAPP;
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    document.querySelectorAll('.slider__conteudo .botao').forEach(botao => {
      if (botao.textContent.includes('Agendar Consulta')) {
        botao.href = WHATSAPP;
      }
    });
  })();

  // ================================================================
  // 5. SLIDER DE AVALIAÇÕES
  // ================================================================
  (function () {
    const slider = document.getElementById('avaliacoesSlider');
    if (!slider) return;

    const grupos = slider.querySelectorAll('.avaliacoes__grupo');
    const pontosContainer = document.querySelector('.avaliacoes__pontos');
    let indice = 0;

    function criarPontos() {
      grupos.forEach((_, i) => {
        const ponto = document.createElement('span');
        ponto.classList.add('ponto');
        if (i === 0) ponto.classList.add('ponto--ativo');
        ponto.addEventListener('click', () => navegarPara(i));
        pontosContainer.appendChild(ponto);
      });
    }

    function navegarPara(i) {
      grupos[indice].classList.remove('avaliacoes__grupo--ativo');
      pontosContainer.children[indice].classList.remove('ponto--ativo');
      indice = i;
      grupos[indice].classList.add('avaliacoes__grupo--ativo');
      pontosContainer.children[indice].classList.add('ponto--ativo');
    }

    function iniciarAutoTroca() {
      setInterval(() => {
        const proximo = (indice + 1) % grupos.length;
        navegarPara(proximo);
      }, 10000);
    }

    criarPontos();
    iniciarAutoTroca();
  })();

  // ================================================================
  // 6. FAQ ACORDEÃO
  // ================================================================
  (function () {
    const blocos = document.querySelectorAll('.faq__bloco');
    blocos.forEach(bloco => {
      const pergunta = bloco.querySelector('.faq__pergunta');
      const resposta = bloco.querySelector('.faq__resposta');

      pergunta.addEventListener('click', () => {
        const ativo = bloco.classList.toggle('faq__bloco--ativo');
        pergunta.setAttribute('aria-expanded', ativo);
        resposta.setAttribute('aria-hidden', !ativo);
      });
    });
  })();

  // ================================================================
  // 7. SCROLL SUAVE PARA ÂNCORAS
  // ================================================================
  (function () {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', e => {
        const destino = document.querySelector(link.getAttribute('href'));
        if (destino) {
          e.preventDefault();
          destino.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  })();

  // ================================================================
  // 8. EFEITO VISUAL: LINHA VERDE EM LINKS DO MENU
  // ================================================================
  (function () {
    const links = document.querySelectorAll('.menu-navegacao__link');

    links.forEach(link => {
      // Desktop (hover)
      link.addEventListener('mouseenter', () => {
        link.classList.add('link-hover');
      });
      link.addEventListener('mouseleave', () => {
        link.classList.remove('link-hover');
      });

      // Mobile (touch)
      link.addEventListener('touchstart', () => {
        link.classList.add('link-hover');
        setTimeout(() => {
          link.classList.remove('link-hover');
        }, 800);
      });
    });
  })();

});
