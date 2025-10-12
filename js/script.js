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