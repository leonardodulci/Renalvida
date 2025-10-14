/* -------------------------------------------------------------------
 * SCRIPT PRINCIPAL DO SITE (CLÍNICA RENAL CARE)
 * ------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Variáveis Globais e Constantes ---
    const ID_SLIDER = 'bannerSlider';
    const INTERVALO_TROCA = 10000; // 10 segundos
    const BREAKPOINT_MOBILE = 768;
    const WHATSAPP_NUMBER = '5561991020570'; // +55 61 99102-0570 (Apenas números)
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;


    // =================================================================
    // 1. MÓDULO: NAVEGAÇÃO E MENU MOBILE
    // =================================================================
    (function() {
        const botaoMenu = document.querySelector('.menu-mobile__botao');
        const menuNavegacao = document.querySelector('.menu-navegacao');
        
        if (!botaoMenu || !menuNavegacao) return; // Sai se não encontrar elementos

        // Alternar menu
        function toggleMenu() {
            menuNavegacao.classList.toggle('esta-aberto');
            const estaAberto = menuNavegacao.classList.contains('esta-aberto');
            botaoMenu.setAttribute('aria-expanded', estaAberto);
        }

        botaoMenu.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em link (mobile)
        const linksMenu = document.querySelectorAll('.menu-navegacao__link');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                if (menuNavegacao.classList.contains('esta-aberto')) {
                    toggleMenu(); // Chama a função para fechar
                }
            });
        });
    })();


    // =================================================================
    // 2. MÓDULO: CABEÇALHO (HEADER) STICKY
    // =================================================================
    (function() {
        const cabecalho = document.querySelector('.cabecalho');
        if (!cabecalho) return;
        
        // Define a classe de estilo ao rolar a página
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                cabecalho.classList.add('cabecalho--rolando');
            } else {
                cabecalho.classList.remove('cabecalho--rolando');
            }
        });
    })();


    // =================================================================
    // 3. MÓDULO: SLIDER DE IMAGENS RESPONSIVO
    // =================================================================
    (function() {
        const sliderContainer = document.getElementById(ID_SLIDER);
        if (!sliderContainer) return;

        const slides = sliderContainer.querySelectorAll('.slider__item');
        let indiceAtual = 0;
        const totalSlides = slides.length;
        
        /**
         * Aplica a imagem de fundo correta (desktop ou mobile) em todos os slides.
         */
        function aplicarImagensDeFundo() {
            const larguraJanela = window.innerWidth;
            const isMobile = larguraJanela < BREAKPOINT_MOBILE;

            slides.forEach(slide => {
                // Escolhe o caminho da imagem baseado na largura da tela e nos data-atributos
                const caminhoImagem = isMobile 
                    ? slide.dataset.mobileImg 
                    : slide.dataset.desktopImg;
                
                // Aplica o estilo com alta prioridade para garantir o carregamento
                slide.style.setProperty('background-image', `url('${caminhoImagem}')`, 'important');
            });
        }

        /**
         * Alterna para o próximo slide e inicia a transição CSS.
         */
        function proximoSlide() {
            // Remove 'item--ativo' do slide atual
            slides[indiceAtual].classList.remove('item--ativo');

            // Calcula o novo índice
            indiceAtual = (indiceAtual + 1) % totalSlides;

            // Adiciona 'item--ativo' ao próximo slide
            slides[indiceAtual].classList.add('item--ativo');
            
            // Re-aplica a imagem na troca, garantindo que o caminho correto seja usado
            aplicarImagensDeFundo(); 
        }

        // --- Inicialização do Slider ---
        aplicarImagensDeFundo(); // 1. Aplica as imagens no carregamento
        window.addEventListener('resize', aplicarImagensDeFundo); // 2. Monitora o resize
        setInterval(proximoSlide, INTERVALO_TROCA); // 3. Inicia o loop de troca
        
    })();


    // =================================================================
    // 4. MÓDULO: REDIRECIONAMENTO DE CTAs PARA WHATSAPP
    // =================================================================
    (function() {
        // Seleciona todos os links que apontam para o número genérico
        const ctaLinks = document.querySelectorAll('a[href*="seunumerowhatsapp"]');

        ctaLinks.forEach(link => {
            // Substitui o placeholder pelo número real do WhatsApp
            link.href = WHATSAPP_URL;

            // Adiciona atributos para abrir em nova aba e segurança
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
        
        // CORREÇÃO ADICIONAL: Links de agendamento no banner
        const bannerCTAs = document.querySelectorAll('.slider__conteudo .botao');
        bannerCTAs.forEach(botao => {
             if (botao.textContent.includes('Agendar Consulta')) {
                 botao.href = WHATSAPP_URL;
             }
        });
        
    })();

});


// =================================================================
    // 5. MÓDULO: SLIDER DE AVALIAÇÕES (Muda 4 por vez, responsivo)
    // =================================================================
    (function() {
        const slider = document.getElementById('avaliacoesSlider');
        if (!slider) return;

        const grupos = slider.querySelectorAll('.avaliacoes__grupo');
        const pontosContainer = document.querySelector('.avaliacoes__pontos');
        let indiceGrupoAtual = 0;
        const totalGrupos = grupos.length;

        // 1. Cria os pontos de navegação dinamicamente
        function criarPontosNavegacao() {
            pontosContainer.innerHTML = ''; // Limpa os pontos existentes
            grupos.forEach((_, index) => {
                const ponto = document.createElement('span');
                ponto.classList.add('ponto');
                if (index === 0) {
                    ponto.classList.add('ponto--ativo');
                }
                ponto.addEventListener('click', () => navegarPara(index));
                pontosContainer.appendChild(ponto);
            });
        }
        criarPontosNavegacao(); // Chama ao inicializar

        const pontos = pontosContainer.querySelectorAll('.ponto'); // Seleciona os pontos criados
        let timerAvaliacoes;

        /**
         * Navega para um grupo específico.
         * @param {number} indice - O índice do grupo para navegar.
         */
        function navegarPara(indice) {
            // Remove 'ativo' do grupo e ponto atual
            grupos[indiceGrupoAtual].classList.remove('avaliacoes__grupo--ativo');
            pontos[indiceGrupoAtual].classList.remove('ponto--ativo');

            // Atualiza o índice
            indiceGrupoAtual = indice;

            // Adiciona 'ativo' ao novo grupo e ponto
            grupos[indiceGrupoAtual].classList.add('avaliacoes__grupo--ativo');
            pontos[indiceGrupoAtual].classList.add('ponto--ativo');

            // Reinicia o timer
            clearInterval(timerAvaliacoes);
            iniciarTrocaAutomatica();
        }

        /**
         * Troca para o próximo grupo de avaliações.
         */
        function proximoGrupo() {
            let proximoIndice = (indiceGrupoAtual + 1) % totalGrupos;
            navegarPara(proximoIndice);
        }

        /**
         * Inicia a troca automática dos grupos.
         */
        function iniciarTrocaAutomatica() {
            timerAvaliacoes = setInterval(proximoGrupo, 10000); // 10 segundos
        }

        // Inicia a troca automática ao carregar a página
        iniciarTrocaAutomatica();
    })();

