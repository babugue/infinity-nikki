// js/animal-inviting.js

import { translations } from './translations.js';
// CORREÇÃO: O caminho agora é direto, sem a pasta /data/.
import { animals } from './animals.js'; 
import { renderAnimals, showAffectionInfo, hideTooltip } from './animal-inviting-utils.js';

// Esta é a única função que este arquivo exporta.
// Ela contém TODA a lógica específica desta página.
export function initAnimalPage() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'pt';
    const t = translations[currentLang];

    if (!t) {
        console.error(`Traduções para '${currentLang}' não encontradas.`);
        return;
    }

    // Pega as referências dos elementos do DOM
    const searchInput = document.getElementById('search-input');
    const filterTitle = document.getElementById('filter-title');
    const grid = document.getElementById('animals-grid');
    const dropFilter = document.getElementById('drop-filter');

    // Função interna para aplicar filtros
    const applyFilters = () => {
        const selectedColors = Array.from(document.querySelectorAll('.color-filter:checked')).map(cb => cb.value);
        const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);
        const selectedDrop = dropFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        const filteredAnimals = animals.filter(animal => {
            const matchesColor = selectedColors.length === 0 || selectedColors.includes(animal.color);
            const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(animal.size);
            const matchesDrop = !selectedDrop || animal.drop === selectedDrop;
            
            const animalNameCurrent = (animal.name[currentLang] || "").toLowerCase();
            const animalNameEN = (animal.name.en || "").toLowerCase();
            const dropName = (t.dropItems[animal.drop] || animal.drop).toLowerCase();
            const matchesSearch = !searchTerm || 
                                  animalNameCurrent.includes(searchTerm) ||
                                  animalNameEN.includes(searchTerm) ||
                                  dropName.includes(searchTerm);

            return matchesColor && matchesSize && matchesDrop && matchesSearch;
        });
        
        renderAnimals(filteredAnimals, currentLang, t);
    };

    // Preenche o filtro de drops
    const uniqueDrops = [...new Set(animals.map(a => a.drop))];
    uniqueDrops.sort().forEach(dropKey => {
        const option = document.createElement('option');
        option.value = dropKey;
        option.textContent = t.dropItems[dropKey] || dropKey;
        dropFilter.appendChild(option);
    });
    
    // Configura placeholders e textos
    searchInput.placeholder = t.searchPlaceholder;

    // Conecta os eventos
    document.getElementById('apply-filters-btn').addEventListener('click', applyFilters);
    document.getElementById('reset-filters-btn').addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => cb.checked = false);
        dropFilter.value = '';
        searchInput.value = '';
        searchInput.classList.add('hidden');
        filterTitle.classList.remove('hidden');
        applyFilters();
    });
    searchInput.addEventListener('input', applyFilters);
    
    document.getElementById('search-icon').addEventListener('click', () => {
        filterTitle.classList.add('hidden');
        searchInput.classList.remove('hidden');
        searchInput.focus();
    });

    searchInput.addEventListener('blur', () => {
        if (searchInput.value === '') {
            filterTitle.classList.remove('hidden');
            searchInput.classList.add('hidden');
        }
    });

    grid.addEventListener('mouseover', event => {
        const infoButton = event.target.closest('.info-icon');
        if (infoButton) showAffectionInfo(event, t);
    });
    grid.addEventListener('mouseout', event => {
        const infoButton = event.target.closest('.info-icon');
        if (infoButton) hideTooltip();
    });

    // Renderização inicial
    applyFilters();
}