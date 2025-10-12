// --- FUNÇÃO SLIDER AUTOMÁTICO RESPONSIVO ---
function inicializarSlider(idSlider, intervaloEmMilissegundos) {
    const sliderContainer = document.getElementById(idSlider);
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.slider__item');
    let indiceAtual = 0;
    const totalSlides = slides.length;

    // Função para aplicar a imagem de fundo correta (desktop ou mobile)
    function aplicarImagemDeFundo() {
        slides.forEach(slide => {
            const larguraJanela = window.innerWidth;
            let caminhoImagem;

            if (larguraJanela < 768) { // Consideramos 768px como breakpoint para mobile
                caminhoImagem = slide.dataset.mobileImg;
            } else {
                caminhoImagem = slide.dataset.desktopImg;
            }
            slide.style.backgroundImage = `url('${caminhoImagem}')`;
        });
    }

    // Aplica as imagens assim que o slider é inicializado e ao redimensionar
    aplicarImagemDeFundo();
    window.addEventListener('resize', aplicarImagemDeFundo);


    function proximoSlide() {
        // Remove a classe ativa do slide atual
        slides[indiceAtual].classList.remove('item--ativo');

        // Calcula o índice do próximo slide
        indiceAtual = (indiceAtual + 1) % totalSlides;

        // Adiciona a classe ativa ao próximo slide
        slides[indiceAtual].classList.add('item--ativo');
    }

    // Inicia a troca automática
    setInterval(proximoSlide, intervaloEmMilissegundos);
}

// Inicializa o slider do banner com intervalo de 10 segundos (10000 ms)
document.addEventListener('DOMContentLoaded', function() {
    // ... [Seu código anterior do menu mobile aqui] ...

    inicializarSlider('bannerSlider', 10000); // 10 segundos
});


document.addEventListener('DOMContentLoaded', function() {
    const botaoMenu = document.querySelector('.menu-mobile__botao');
    const menuNavegacao = document.querySelector('.menu-navegacao');

    // Função para alternar a classe que abre/fecha o menu
    botaoMenu.addEventListener('click', function() {
        menuNavegacao.classList.toggle('esta-aberto');
        
        // Acessibilidade: Atualiza o estado do botão
        const estaAberto = menuNavegacao.classList.contains('esta-aberto');
        this.setAttribute('aria-expanded', estaAberto);
    });

    // Fechar o menu ao clicar em um link (útil em mobile)
    const linksMenu = document.querySelectorAll('.menu-navegacao__link');
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNavegacao.classList.contains('esta-aberto')) {
                menuNavegacao.classList.remove('esta-aberto');
                botaoMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Adicionar efeito de 'sticky' (futuramente, para mudar o estilo do header ao rolar)
    const cabecalho = document.querySelector('.cabecalho');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            cabecalho.classList.add('cabecalho--rolando');
        } else {
            cabecalho.classList.remove('cabecalho--rolando');
        }
    });
});

// --- FUNÇÃO SLIDER AUTOMÁTICO ---
function inicializarSlider(idSlider, intervaloEmMilissegundos) {
    const sliderContainer = document.getElementById(idSlider);
    if (!sliderContainer) return; // Sai se o slider não existir

    const slides = sliderContainer.querySelectorAll('.slider__item');
    let indiceAtual = 0;
    const totalSlides = slides.length;

    function proximoSlide() {
        // Remove a classe ativa do slide atual
        slides[indiceAtual].classList.remove('item--ativo');

        // Calcula o índice do próximo slide
        indiceAtual = (indiceAtual + 1) % totalSlides;

        // Adiciona a classe ativa ao próximo slide
        slides[indiceAtual].classList.add('item--ativo');
    }

    // Inicia a troca automática
    setInterval(proximoSlide, intervaloEmMilissegundos);
}

// Inicializa o slider do banner com intervalo de 10 segundos (10000 ms)
document.addEventListener('DOMContentLoaded', function() {
    // ... [Seu código anterior do menu mobile aqui] ...

    inicializarSlider('bannerSlider', 10000); // 10 segundos
});