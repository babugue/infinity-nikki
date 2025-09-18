// js/global.js - Versão Completa e Corrigida para GitHub Pages

import { translations } from './translations.js';

// Função principal que é chamada assim que o conteúdo da página é carregado.
document.addEventListener('DOMContentLoaded', () => {
    initializeSite();
});

/**
 * Orquestra a inicialização de todo o site, garantindo a ordem correta de execução.
 */
async function initializeSite() {
    // 1. Injeta a barra de navegação no HTML e espera que isso termine.
    await injectNavigation();
    
    // 2. Agora que a navegação existe, inicializa todos os controles globais (tema, idioma, menu).
    initializeGlobalControls();

    // 3. Verifica em qual página estamos e carrega o script específico daquela página, se necessário.
    if (document.getElementById('animals-grid')) {
        // Se encontrarmos o grid de animais, importamos dinamicamente o seu módulo...
        const pageModule = await import('./animal-inviting.js');
        // ...e executamos a função de inicialização da página.
        pageModule.initAnimalPage();
    }
}

/**
 * Busca o arquivo nav.html e o insere no topo do <body> da página.
 * Esta versão corrigida funciona tanto localmente quanto no GitHub Pages.
 */
function injectNavigation() {
    const basePath = window.location.pathname.includes('/tools/') ? '..' : '.';

    // Usa o caminho base calculado para buscar o arquivo nav.html
    return fetch(`${basePath}/nav.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Arquivo nav.html não encontrado no caminho: ${basePath}/nav.html`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Falha ao buscar e injetar a navegação:', error));
}


/**
 * Inicializa todos os controles interativos que estão na barra de navegação.
 */
function initializeGlobalControls() {
    const lang = localStorage.getItem('preferredLanguage') || 'pt';
    applyTranslations(lang);
    
    // --- LÓGICA DO TEMA (DARK/LIGHT MODE) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const applyTheme = (theme) => {
            document.body.classList.toggle('dark-mode', theme === 'dark');
            themeToggle.checked = theme === 'dark';
        };
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);
    }

    // --- LÓGICA DO IDIOMA ---
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = lang;
        languageSelect.addEventListener('change', (event) => {
            localStorage.setItem('preferredLanguage', event.target.value);
            location.reload();
        });
    }

    // --- LÓGICA DO MENU HAMBURGER (MOBILE) ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-menu');
    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
        });
    }

    // --- LÓGICA DO DROPDOWN POR CLIQUE ---
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      
