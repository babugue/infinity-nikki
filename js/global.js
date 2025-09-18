// js/global.js - Versão Completa e Final

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
 * Retorna uma Promise que é resolvida quando a injeção está completa.
 */
function injectNavigation() {
    const basePath = window.location.pathname.includes('/tools/') ? '..' : '.';
    
    return fetch(`${basePath}/nav.html`)
        .then(response => {
            if (!response.ok) {
                return fetch('/nav.html');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) throw new Error('nav.html not found in any path.');
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error fetching navigation:', error));
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
        const trigger = dropdown.querySelector('.nav-tools-link');
        if (trigger) {
            trigger.addEventListener('click', (event) => {
                // Previne que o link '#' recarregue a página
                event.preventDefault();
                // Alterna a classe 'active' no elemento <li> pai
                dropdown.classList.toggle('active');
            });
        }
    });

    // Event listener global para fechar o dropdown se o usuário clicar fora dele
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
            // Se o elemento clicado NÃO estiver dentro do dropdown aberto...
            if (!openDropdown.contains(event.target)) {
                // ...então remove a classe 'active' para fechá-lo.
                openDropdown.classList.remove('active');
            }
        });
    });
}

/**
 * Aplica as traduções a todos os elementos da página com o atributo 'data-translate'.
 * @param {string} lang - O código do idioma a ser aplicado (ex: 'pt', 'en').
 */
function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) element.textContent = t[key];
    });

    const titleKey = document.body.getAttribute('data-translate-title');
    if (titleKey && t[titleKey]) {
        document.title = t[titleKey];
    }

}

