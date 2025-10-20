document.addEventListener('DOMContentLoaded', function () {
  const botaoMenu = document.querySelector('.menu-mobile__botao');
  const menu = document.querySelector('.menu-navegacao__lista');

  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
      const ativo = menu.classList.toggle('ativo');
      botaoMenu.setAttribute('aria-expanded', ativo ? 'true' : 'false');
    });
  }
});
