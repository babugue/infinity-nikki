// Sistema de Traduções - Apenas inglês e português no código principal
const baseTranslations = {
    en: {
        pageTitle: "Home Abilities - Animal Inviting",
        pageSubtitle: "Update 1.9 - Music Season",
        filterTitle: "Filter Animals",
        filterColors: "Rarity:",
        filterSize: "Size:",
        filterDrop: "Hourly Drop:",
        colorWhite: "White",
        colorBrown: "Brown",
        colorBlue: "Blue",
        sizeSmall: "Small",
        sizeLarge: "Large",
        dropAll: "All",
        applyFilters: "Apply Filters",
        resetFilters: "Clear Filters",
        level: "Level",
        foodPerHour: "Food/hour",
        hourlyDrop: "Hourly Drop:",
        affection: "Affection",
        affectionTooltip: "Click to see how to increase affection levels",
        affectionLevels: "Affection Level Drops",
        affectionInfoTitle: "How to Increase Affection",
        affectionInfo: "Groom your animals regularly to increase their affection level and increase the quantity of drops!",
        affectionStep1: "1st Heart: Everyone has it automatically",
        affectionStep2: "2nd Heart: Groom 5 times",
        affectionStep3: "3rd Heart: Groom 10 times",
        tamingNotes: "Taming Sequence",
        imageNotAvailable: "Image not available",
        codeNeeded: "Image code needed",
        smallLodge: "Small Lodge",
        largeLodge: "Large Lodge",
        invitableAtLevel: "Invitable at level",
        foodConsumption: "Food consumption per hour",
        noAnimalsFound: "No animals found",
        tryDifferentFilters: "Try adjusting your filters",
        searchPlaceholder: "Search by name...",
        dropItems: {
            "Brilliant Pearl": "Brilliant Pearl",
            "Leaf Stone": "Leaf Stone",
            "Radiant Gemstone": "Radiant Gemstone",
            "Featherlight Stone": "Featherlight Stone",
            "Flying Pearl": "Flying Pearl"
        },
        tamingItems: {
            "Candy": "Candy",
            "Toy": "Toy",
            "Pet": "Pet",
            "Hands": "Hands",
            "Heart": "Heart",
            "Sun": "Sun",
            "Moon": "Moon"
        }
    },
    pt: {
        pageTitle: "Habilidades do Lar - Convite de Animais",
        pageSubtitle: "Atualização 1.9 - Temporada Musical",
        filterTitle: "Filtrar Animais",
        filterColors: "Raridade:",
        filterSize: "Tamanho:",
        filterDrop: "Drop por Hora:",
        colorWhite: "Branco",
        colorBrown: "Marrom",
        colorBlue: "Azul",
        sizeSmall: "Pequeno",
        sizeLarge: "Grande",
        dropAll: "Todos",
        applyFilters: "Aplicar Filtros",
        resetFilters: "Limpar Filtros",
        level: "Nível",
        foodPerHour: "Comida/hora",
        hourlyDrop: "Drop por Hora:",
        affection: "Afeição",
        affectionTooltip: "Clique para ver como aumentar os níveis de afeição",
        affectionLevels: "Drops por Nível de Afeição",
        affectionInfoTitle: "Como Aumentar a Afeição",
        affectionInfo: "Cuide dos seus animais regularmente para aumentar o nível de afeição e a quantidade de drops!",
        affectionStep1: "1º Coração: Todos têm automaticamente",
        affectionStep2: "2º Coração: Cuide 5 vezes",
        affectionStep3: "3º Coração: Cuide 10 vezes",
        tamingNotes: "Sequência para Domesticação",
        imageNotAvailable: "Imagem não disponível",
        codeNeeded: "Código da imagem necessário",
        smallLodge: "Pequeno Abrigo",
        largeLodge: "Grande Abrigo",
        invitableAtLevel: "Convidável no nível",
        foodConsumption: "Consumo de comida por hora",
        noAnimalsFound: "Nenhum animal encontrado",
        tryDifferentFilters: "Tente ajustar seus filtros",
        searchPlaceholder: "Pesquisar por nome...",
        dropItems: {
            "Brilliant Pearl": "Pérola Brilhante",
            "Leaf Stone": "Folha de Pedra",
            "Radiant Gemstone": "Pedra preciosa radiante",
            "Featherlight Stone": "Pedra Featherlight",
            "Flying Pearl": "Pérola Voadora"
        },
        tamingItems: {
            "Candy": "Doce",
            "Toy": "Brinquedo",
            "Pet": "Animal de Estimação",
            "Hands": "Mãos",
            "Heart": "Coração",
            "Sun": "Sol",
            "Moon": "Lua"
        }
    }
};

// Função para carregar traduções externas
async function loadExternalTranslations(lang) {
    try {
        const response = await fetch(`translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translation for ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading translation for ${lang}:`, error);
        return null;
    }
}

// Função para obter todas as traduções
async function getAllTranslations() {
    const translations = { ...baseTranslations };
    
    // Lista de idiomas externos
    const externalLanguages = ['zh-CN', 'zh-TW', 'ja', 'ko', 'de', 'fr', 'th', 'es', 'it', 'id'];
    
    // Carregar traduções externas em paralelo
    const promises = externalLanguages.map(async (lang) => {
        const translation = await loadExternalTranslations(lang);
        if (translation) {
            translations[lang] = translation;
        }
    });
    await Promise.all(promises);
    return translations;
}

