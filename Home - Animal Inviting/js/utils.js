// Funções utilitárias para o aplicativo

function detectBrowserLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const shortLanguage = browserLanguage.split('-')[0];
    const supportedLanguages = ['zh-CN', 'zh-TW', 'ja', 'ko', 'en', 'de', 'fr', 'th', 'es', 'pt', 'it', 'id'];
    if (supportedLanguages.includes(browserLanguage)) return browserLanguage;
    if (shortLanguage === 'zh') return 'zh-CN';
    const foundLanguage = supportedLanguages.find(lang => lang.startsWith(shortLanguage));
    return foundLanguage || 'en';
}

function generateHearts(level) {
    let heartsHtml = '';
    for (let i = 1; i <= 3; i++) {
        const heartClass = i <= level ? 'filled' : 'empty';
        const heartSymbol = i <= level ? '❤️' : '♡'; 
        heartsHtml += `<span class="heart ${heartClass}">${heartSymbol}</span>`;
    }
    return heartsHtml;
}

function showTooltip(event, htmlContent) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = htmlContent;
    tooltip.classList.add('show');
    const rect = event.target.getBoundingClientRect();
    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX + (rect.width / 2);
    setTimeout(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        left -= tooltipRect.width / 2;
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (rect.bottom + tooltipRect.height + 10 > window.innerHeight) {
            top = rect.top + window.scrollY - tooltipRect.height - 10;
        }
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
    }, 0);
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

function showAffectionInfo(event) {
    const t = window.translations[window.currentLanguage];
    const infoHtml = `
        <div class="affection-info">
            <div class="affection-info-title">
                💝 ${t.affectionInfoTitle}
            </div>
            <div>${t.affectionInfo}</div>
            <div class="affection-steps">
                <div class="affection-step">
                    <div class="step-number">1</div>
                    <div>${t.affectionStep1}</div>
                </div>
                <div class="affection-step">
                    <div class="step-number">2</div>
                    <div>${t.affectionStep2}</div>
                </div>
                <div class="affection-step">
                    <div class="step-number">3</div>
                    <div>${t.affectionStep3}</div>
                </div>
            </div>
        </div>
    `;
    showTooltip(event, infoHtml);
}

function applyFilters() {
    const selectedColors = Array.from(document.querySelectorAll('.color-filter:checked')).map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);
    const selectedDrop = document.getElementById('drop-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    const filteredAnimals = window.animals.filter(animal => {
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(animal.color);
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(animal.size);
        const matchesDrop = !selectedDrop || animal.drop === selectedDrop;
        const matchesSearch = !searchTerm || 
                              (animal.name.en.toLowerCase().includes(searchTerm)) ||
                              (animal.name.pt && animal.name.pt.toLowerCase().includes(searchTerm));
        return matchesColor && matchesSize && matchesDrop && matchesSearch;
    });
    
    window.renderAnimals(filteredAnimals);
}

function resetFilters() {
    document.querySelectorAll('.color-filter').forEach(cb => cb.checked = false);
    document.querySelectorAll('.size-filter').forEach(cb => cb.checked = false);
    document.getElementById('drop-filter').value = '';
    
    const searchInput = document.getElementById('search-input');
    const filterTitle = document.getElementById('filter-title');
    searchInput.value = '';
    searchInput.classList.add('hidden');
    filterTitle.classList.remove('hidden');
    
    renderAnimals(window.animals);
}

function changeLanguage() {
    const select = document.getElementById('language-select');
    window.currentLanguage = select.value;
    localStorage.setItem('preferredLanguage', window.currentLanguage);
    document.documentElement.lang = window.currentLanguage;
    window.updateLanguage();
    applyFilters();
}

function updateLanguage() {
    if (!window.translations[window.currentLanguage]) return;
    const t = window.translations[window.currentLanguage];

    document.getElementById('page-title').textContent = t.pageTitle;
    document.getElementById('page-subtitle').textContent = t.pageSubtitle;
    document.getElementById('filter-title').textContent = t.filterTitle;
    document.getElementById('search-input').placeholder = t.searchPlaceholder;
    document.getElementById('filter-colors-label').textContent = t.filterColors;
    document.getElementById('filter-size-label').textContent = t.filterSize;
    document.getElementById('filter-drop-label').textContent = t.filterDrop;
    document.getElementById('color-white').textContent = t.colorWhite;
    document.getElementById('color-brown').textContent = t.colorBrown;
    document.getElementById('color-blue').textContent = t.colorBlue;
    document.getElementById('size-small').textContent = t.sizeSmall;
    document.getElementById('size-large').textContent = t.sizeLarge;
    document.getElementById('drop-all').textContent = t.dropAll;
    document.getElementById('apply-filters-btn').textContent = t.applyFilters;
    document.getElementById('reset-filters-btn').textContent = t.resetFilters;
    
    const dropFilter = document.getElementById('drop-filter');
    dropFilter.querySelectorAll('option').forEach((option, index) => {
        if (index === 0) return;
        const dropKey = option.value;
        if (t.dropItems[dropKey]) {
            option.textContent = t.dropItems[dropKey];
        }
    });
}

function renderAnimals(animalsToRender = window.animals) {
    const grid = document.getElementById('animals-grid');
    grid.innerHTML = '';
    
    if (!window.translations[window.currentLanguage]) {
        grid.innerHTML = `<div class="loading"><div class="loading-spinner"></div></div>`;
        return;
    }
    
    const t = window.translations[window.currentLanguage];
    
    if (animalsToRender.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🐾</div>
                <div class="empty-state-text">${t.noAnimalsFound}</div>
                <div class="empty-state-subtext">${t.tryDifferentFilters}</div>
            </div>
        `;
        return;
    }
    
    animalsToRender.forEach((animal, index) => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.dataset.color = animal.color;
        card.dataset.size = animal.size;
        card.dataset.drop = animal.drop;
        
        const hasImage = animal.image && !animal.image.includes('____');
        
        card.innerHTML = `
            <div class="animal-header">
                ${hasImage ? 
                    `<img src="${animal.image}" alt="${animal.name[window.currentLanguage] || animal.name.en}" class="animal-image" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
                    ''
                }
                <div class="animal-image-placeholder" style="${hasImage ? 'display: none;' : ''}">
                    ${t.imageNotAvailable}<br>
                    <small>${t.codeNeeded}</small>
                </div>
                <div class="animal-info-header">
                    <div class="animal-name">${animal.name[window.currentLanguage] || animal.name.en}</div>
                    <div class="animal-tags">
                        <span class="tag color-tag color-${animal.color}">R${animal.rarity}</span>
                        <span class="tag size-tag">${animal.size === 'small' ? t.sizeSmall : t.sizeLarge}</span>
                    </div>
                </div>
            </div>
            
            <div class="animal-stats">
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-label">${t.level}</div>
                        <div class="stat-value">${animal.level}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">${t.foodPerHour}</div>
                        <div class="stat-value">${animal.food}</div>
                    </div>
                </div>
            </div>
            
            <div class="drop-section">
                <div class="section-title">${t.hourlyDrop}</div>
                <div class="drop-item">
                    <div class="drop-icon-container">
                        <img src="icons/drops/background.png" alt="Background" class="drop-background">
                        <img src="icons/drops/${animal.drop.toLowerCase().replace(/\s+/g, '_')}.png" alt="${t.dropItems[animal.drop] || animal.drop}" class="drop-icon">
                    </div>
                    <div class="drop-name">${t.dropItems[animal.drop] || animal.drop}</div>
                </div>
            </div>
            
            <div class="affection-section">
                <div class="section-title affection-header" onmouseenter="showAffectionInfo(event)" onmouseleave="hideTooltip()" ontouchstart="showAffectionInfo(event)">
                    ${t.affection}
                    <div class="info-icon">i</div>
                </div>
                <div class="affection-levels">
                    <div class="affection-level">
                        <div class="hearts-container">${generateHearts(1)}</div>
                        <div class="level-number">${t.level} 1</div>
                        <div class="level-value">${animal.affection[0]}x</div>
                    </div>
                    <div class="affection-level">
                        <div class="hearts-container">${generateHearts(2)}</div>
                        <div class="level-number">${t.level} 2</div>
                        <div class="level-value">${animal.affection[1]}x</div>
                    </div>
                    <div class="affection-level">
                        <div class="hearts-container">${generateHearts(3)}</div>
                        <div class="level-number">${t.level} 3</div>
                        <div class="level-value">${animal.affection[2]}x</div>
                    </div>
                </div>
            </div>
            
            <div class="taming-section">
                <div class="section-title">${t.tamingNotes}</div>
                <div class="taming-icons">
                    ${animal.tamingIcons.map(icon => `
                        <div class="taming-icon-container">
                            <img src="icons/taming/background.png" alt="Background" class="taming-background">
                            <img src="icons/taming/${icon.toLowerCase()}.png" alt="${t.tamingItems[icon] || icon}" class="taming-icon">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Adiciona um atraso na animação de cada card
        card.style.animationDelay = `${index * 0.05}s`;
        
        grid.appendChild(card);
    });
}