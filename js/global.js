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
 * Esta versão foi ajustada para funcionar corretamente no GitHub Pages.
 */
function injectNavigation() {
    // O nome do seu repositório no GitHub. Altere se for diferente.
    const repoName = 'infinity-nikki';

    // Determina o caminho base correto.
    // window.location.origin nos dá "https://babugue.github.io"
    // Adicionamos o nome do repositório para formar a base completa.
    const basePath = `${window.location.origin}/${repoName}`;

    // Usa o caminho base completo para buscar o nav.html
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
        const trigger = dropdown.querySelector('.nav-tools-link');
        if (trigger) {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Event listener global para fechar o dropdown se o usuário clicar fora dele
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
            if (!openDropdown.contains(event.target)) {
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
} // <--- O erro estava acontecendo porque esta chave provavelmente estava faltando.
