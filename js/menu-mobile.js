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
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.menu-link');

  // Ativar hover/click
  links.forEach(link => {
    link.addEventListener('click', function () {
      // Remove classe ativo de todos
      links.forEach(l => l.classList.remove('ativo'));

      // Adiciona ativo ao clicado
      this.classList.add('ativo');
    });
  });
});
