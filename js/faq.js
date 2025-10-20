// =================================================================
    // 6. MÓDULO: FAQ (ACCORDION DE DÚVIDAS) - NOVA ABORDAGEM COM CLASSES
    // =================================================================
    (function() {
        const accordionBlocos = document.querySelectorAll('.faq__bloco');

        if (accordionBlocos.length === 0) return;

        accordionBlocos.forEach(bloco => {
            const botao = bloco.querySelector('.faq__pergunta');
            const resposta = bloco.querySelector('.faq__resposta');

            // --- Configuração Inicial ---
            // Define o estado ARIA inicial (fechado, exceto se tiver a classe 'ativo')
            // O CSS agora controlará a transição baseada na classe 'faq__bloco--ativo'
            const isAtivoInicial = bloco.classList.contains('faq__bloco--ativo');
            botao.setAttribute('aria-expanded', isAtivoInicial);
            
            // Não manipulamos o 'aria-hidden' aqui no JS para o CSS reagir à classe.
            // O atributo 'aria-hidden' será manipulado APENAS pelo botão para acessibilidade.
            resposta.setAttribute('aria-hidden', !isAtivoInicial);
            

            // --- Listener de Clique ---
            botao.addEventListener('click', () => {
                const isActive = bloco.classList.contains('faq__bloco--ativo');

                if (isActive) {
                    // SE JÁ ESTÁ ATIVO (CLICOU PARA FECHAR)
                    bloco.classList.remove('faq__bloco--ativo');
                    botao.setAttribute('aria-expanded', 'false');
                    resposta.setAttribute('aria-hidden', 'true'); // Atualiza ARIA
                } else {
                    // SE NÃO ESTÁ ATIVO (CLICOU PARA ABRIR)

                    // Opcional: Fechar todos os outros blocos antes de abrir este (comportamento "single-open")
                    accordionBlocos.forEach(outroBloco => {
                        if (outroBloco !== bloco && outroBloco.classList.contains('faq__bloco--ativo')) {
                            outroBloco.classList.remove('faq__bloco--ativo');
                            const outroBotao = outroBloco.querySelector('.faq__pergunta');
                            const outraResposta = outroBloco.querySelector('.faq__resposta');
                            outroBotao.setAttribute('aria-expanded', 'false');
                            outraResposta.setAttribute('aria-hidden', 'true'); // Atualiza ARIA
                        }
                    });
                    
                    // Abrir o bloco clicado
                    bloco.classList.add('faq__bloco--ativo');
                    botao.setAttribute('aria-expanded', 'true');
                    resposta.setAttribute('aria-hidden', 'false'); // Atualiza ARIA
                }
            });
        });
    })();

