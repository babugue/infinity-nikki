// Dados dos animais com imagens locais
const animals = [
    {
        name: { en: "Ambird", pt: "Azulito" },
        rarity: "1", color: "white", size: "small", level: 1, food: 9, drop: "Featherlight Stone", affection: [10, 11, 12],
        tamingIcons: ["Pet", "Toy", "Heart", "Sun", "Moon", "Heart", "Sun"], image: "images/animals/ambird.png"
    },
    {
        name: { en: "Beretsant", pt: "Galiboina" },
        rarity: "2", color: "brown", size: "small", level: 3, food: 18, drop: "Brilliant Pearl", affection: [20, 22, 24],
        tamingIcons: ["Heart", "Heart", "Pet", "Candy"], image: "images/animals/beretsant.png"
    },
    {
        name: { en: "Blushbunny", pt: "Corelhinho" },
        rarity: "2", color: "brown", size: "small", level: 3, food: 18, drop: "Leaf Stone", affection: [20, 22, 24],
        tamingIcons: ["Heart", "Toy", "Candy", "Hands", "Moon"], image: "images/animals/blushbunny.png"
    },
    {
        name: { en: "Bowler", pt: "Fofucão" },
        rarity: "2", color: "brown", size: "large", level: 3, food: 42, drop: "Radiant Gemstone", affection: [20, 22, 24],
        tamingIcons: ["Heart", "Hands", "Heart", "Hands", "Sun"], image: "images/animals/bowler.png"
    },
    {
        name: { en: "Bowtie Cat", pt: "Gravato" },
        rarity: "1", color: "white", size: "small", level: 1, food: 9, drop: "Brilliant Pearl", affection: [10, 11, 12],
        tamingIcons: ["Moon", "Heart", "Hands", "Toy", "Toy"], image: "images/animals/bowtie_cat.png"
    },
    {
        name: { en: "Browcat", pt: "Gato-marrom" },
        rarity: "2", color: "brown", size: "small", level: 3, food: 18, drop: "Brilliant Pearl", affection: [20, 22, 24],
        tamingIcons: ["Toy", "Heart", "Toy", "Heart", "Sun"], image: "images/animals/browcat.png"
    },
    {
        name: { en: "Celebcrow", pt: "Celebricorvo" },
        rarity: "1", color: "white", size: "small", level: 1, food: 9, drop: "Featherlight Stone", affection: [10, 11, 12],
        tamingIcons: ["Pet", "Pet", "Sun", "Candy", "Pet", "Sun"], image: "images/animals/celebcrow.png"
    },
    {
        name: { en: "Crowned Parrot", pt: "Calopsita-coroada" },
        rarity: "2", color: "brown", size: "small", level: 3, food: 18, drop: "Featherlight Stone", affection: [20, 22, 24],
        tamingIcons: ["Toy", "Pet", "Hands", "Toy", "Pet"], image: "images/animals/crowned_parrot.png"
    },
    {
        name: { en: "Crowndeer", pt: "Florecervo" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Radiant Gemstone", affection: [20, 22, 24],
        tamingIcons: ["Hands", "Toy", "Heart", "Heart"], image: "images/animals/crowndeer.png"
    },
    {
        name: { en: "Cushion Squirrel", pt: "Fofisquilo" },
        rarity: "1", color: "white", size: "small", level: 1, food: 9, drop: "Leaf Stone", affection: [10, 11, 12],
        tamingIcons: ["Moon", "Hands", "Sun", "Hands"], image: "images/animals/cushion_squirrel.png"
    },
    {
        name: { en: "Fan Egret", pt: "Garça-branca-leque" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Flying Pearl", affection: [20, 22, 24],
        tamingIcons: ["Candy", "Toy", "Pet", "Hands", "Sun", "Moon"], image: "images/animals/fan_egret.png"
    },
    {
        name: { en: "Florasheep", pt: "Peoneiro" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Radiant Gemstone", affection: [20, 22, 24],
        tamingIcons: ["Toy", "Pet", "Pet", "Hands", "Toy", "Toy"], image: "images/animals/florasheep.png"
    },
    {
        name: { en: "Florist Sheep", pt: "Florneiro" },
        rarity: "1", color: "white", size: "large", level: 1, food: 22, drop: "Radiant Gemstone", affection: [10, 11, 12],
        tamingIcons: ["Toy", "Candy", "Sun", "Sun"], image: "images/animals/florist_sheep.png"
    },
    {
        name: { en: "Floof", pt: "Doguinho" },
        rarity: "1", color: "white", size: "small", level: 1, food: 9, drop: "Brilliant Pearl", affection: [10, 11, 12],
        tamingIcons: ["Pet", "Heart", "Hands", "Moon", "Hands", "Moon"], image: "images/animals/floof.png"
    },
    {
        name: { en: "Hooded Owl", pt: "Lençoruja" },
        rarity: "2", color: "brown", size: "small", level: 3, food: 18, drop: "Featherlight Stone", affection: [20, 22, 24],
        tamingIcons: ["Heart", "Hands", "Toy", "Candy", "Moon"], image: "images/animals/hooded_owl.png"
    },
    {
        name: { en: "Knight Stallion", pt: "Garanhão Cavaleiro" },
        rarity: "1", color: "white", size: "large", level: 1, food: 22, drop: "Radiant Gemstone", affection: [10, 11, 12],
        tamingIcons: ["Toy", "Hands", "Pet", "Hands", "Hands", "Heart"], image: "images/animals/knight_stallion.png"
    },
    {
        name: { en: "Longstocking", pt: "Meialonga" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Radiant Gemstone", affection: [20, 22, 24],
        tamingIcons: ["Sun", "Heart", "Heart", "Hands", "Hands", "Toy"], image: "images/animals/longstocking.png"
    },
    {
        name: { en: "Noble Pony", pt: "Pônei Nobre" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Radiant Gemstone", affection: [20, 22, 24],
        tamingIcons: ["Sun", "Heart", "Hands", "Pet", "Toy", "Toy"], image: "images/animals/noble_pony.png"
    },
    {
        name: { en: "Rosecrown Swan", pt: "Cisne Róseo" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Flying Pearl", affection: [20, 22, 24],
        tamingIcons: ["Moon", "Toy", "Toy", "Toy", "Toy", "Pet"], image: "images/animals/rosecrown_swan.png"
    },
    {
        name: { en: "Shirtcat", pt: "Gabotoado" },
        rarity: "1", color: "white", size: "small", level: 1, food: 9, drop: "Brilliant Pearl", affection: [10, 11, 12],
        tamingIcons: ["Moon", "Candy", "Pet", "Hands", "Toy"], image: "images/animals/shirtcat.png"
    },
    {
        name: { en: "Suspenders Weasel", pt: "Doninha Arrumadinha" },
        rarity: "3", color: "blue", size: "small", level: 6, food: 26, drop: "Brilliant Pearl", affection: [30, 33, 36],
        tamingIcons: ["Pet", "Toy", "Pet", "Hands", "Heart", "Moon"], image: "images/animals/suspenders_weasel.png"
    },
    {
        name: { en: "Tuxtail Swan", pt: "Cisne-cauda-de-fraque" },
        rarity: "3", color: "blue", size: "large", level: 6, food: 42, drop: "Flying Pearl", affection: [20, 22, 24],
        tamingIcons: ["Pet", "Toy", "Pet", "Pet", "Pet", "Sun"], image: "images/animals/tuxtail_swan.png"
    },
    {
        name: { en: "Wreathdoe", pt: "Floracorça" },
        rarity: "2", color: "brown", size: "large", level: 3, food: 42, drop: "Radiant Gemstone", affection: [20, 22, 24],
        tamingIcons: ["Toy", "Pet", "Hands", "Sun", "Sun"], image: "images/animals/wreathdoe.png"
    }
];

// Ordena a lista de animais por nome como padrão
animals.sort((a, b) => a.name.en.localeCompare(b.name.en));

let currentLanguage = 'en';
let translations = {};

async function initializeApp() {
    try {
        window.animals = animals;
        window.currentLanguage = currentLanguage;
        window.translations = translations;
        window.renderAnimals = renderAnimals;
        window.updateLanguage = updateLanguage;
        
        translations = await getAllTranslations();
        window.translations = translations;
        
        const detectedLanguage = detectBrowserLanguage();
        const savedLanguage = localStorage.getItem('preferredLanguage');
        currentLanguage = savedLanguage || detectedLanguage;
        window.currentLanguage = currentLanguage;
        
        document.getElementById('language-select').value = currentLanguage;
        document.documentElement.lang = currentLanguage;
        
        updateLanguage();
        renderAnimals();
        
        document.getElementById('language-select').addEventListener('change', changeLanguage);
        document.getElementById('apply-filters-btn').addEventListener('click', applyFilters);
        document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);
        
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.affection-header') && !event.target.closest('.tooltip')) {
                hideTooltip();
            }
        });

        // Lógica da Barra de Pesquisa
        const searchIcon = document.getElementById('search-icon');
        const filterTitle = document.getElementById('filter-title');
        const searchInput = document.getElementById('search-input');

        // Mostra a barra de pesquisa ao clicar na LUPA
        searchIcon.addEventListener('click', () => {
            filterTitle.classList.add('hidden');
            searchInput.classList.remove('hidden');
            searchInput.focus();
        });

        // Esconde a barra de pesquisa quando o usuário clica fora (se estiver vazia)
        searchInput.addEventListener('blur', () => {
            if (searchInput.value === '') {
                filterTitle.classList.remove('hidden');
                searchInput.classList.add('hidden');
            }
        });

        // Filtra em tempo real enquanto o usuário digita
        searchInput.addEventListener('input', applyFilters);
        
        // Permite fechar a barra com a tecla 'Escape'
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                searchInput.value = ''; // Limpa a pesquisa
                applyFilters(); // Atualiza a lista
                searchInput.blur(); // Fecha a barra
            }
        });

        // Lógica do Modo Noturno
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Função para aplicar o tema
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                themeToggle.checked = true;
            } else {
                body.classList.remove('dark-mode');
                themeToggle.checked = false;
            }
        };

        // Evento de clique no interruptor
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        // Verifica o tema salvo ou a preferência do sistema ao carregar a página
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme('dark');
        }
        
        console.log('Aplicativo inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar o aplicativo:', error);
        translations = baseTranslations;
        window.translations = translations;
        currentLanguage = 'en';
        window.currentLanguage = currentLanguage;
        updateLanguage();
        renderAnimals();
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}