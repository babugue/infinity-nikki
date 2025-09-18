/**
 * Gera o HTML para os corações de afeição (preenchidos e vazios).
 * @param {number} level - O nível de afeição (1, 2 ou 3).
 * @returns {string} - O HTML dos ícones de coração.
 */
export function generateHearts(level) {
    let heartsHtml = '';
    for (let i = 1; i <= 3; i++) {
        const heartSymbol = i <= level ? '❤️' : '♡';
        heartsHtml += `<span class="heart">${heartSymbol}</span>`;
    }
    return heartsHtml;
}

/**
 * Exibe a caixa de informações (tooltip). Esta é uma função interna.
 * @param {Event} event - O evento do mouse ou toque.
 * @param {string} htmlContent - O conteúdo HTML a ser exibido no tooltip.
 */
function showTooltip(event, htmlContent) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = htmlContent;
    tooltip.style.display = 'block';

    const rect = event.target.getBoundingClientRect();

    // Calcula a posição inicial (abaixo do ícone)
    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX + (rect.width / 2);

    // Usa requestAnimationFrame para garantir que o tooltip foi renderizado
    // antes de calcularmos sua posição final, prevenindo bugs de posicionamento.
    requestAnimationFrame(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Centraliza o tooltip horizontalmente em relação ao ícone
        left -= tooltipRect.width / 2;

        // --- Lógica para não deixar o tooltip sair da tela ---
        if (left < 10) {
            left = 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        // Se não couber embaixo, joga para cima do ícone.
        if (top + tooltipRect.height > window.innerHeight + window.scrollY - 10) {
            top = rect.top + window.scrollY - tooltipRect.height - 10;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.classList.add('show');
    });
}

/**
 * Esconde a caixa de informações (tooltip).
 */
export function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
    // Espera a animação de fade-out terminar para esconder o elemento
    setTimeout(() => {
        if (!tooltip.classList.contains('show')) {
            tooltip.style.display = 'none';
        }
    }, 300);
}

/**
 * Constrói e exibe o tooltip específico de como aumentar a afeição.
 * @param {Event} event - O evento do mouse ou toque.
 * @param {object} t - O objeto de tradução para o idioma atual.
 */
export function showAffectionInfo(event, t) {
    const infoHtml = `
        <div class="affection-info">
            <div class="affection-info-title">💝 ${t.affectionInfoTitle}</div>
            <div>${t.affectionInfo}</div>
            <div class="affection-steps">
                <div class="affection-step"><div class="step-number">1</div><div>${t.affectionStep1}</div></div>
                <div class="affection-step"><div class="step-number">2</div><div>${t.affectionStep2}</div></div>
                <div class="affection-step"><div class="step-number">3</div><div>${t.affectionStep3}</div></div>
            </div>
        </div>
    `;
    showTooltip(event, infoHtml);
}

/**
 * Renderiza os cards dos animais na tela.
 * @param {Array} animalsToRender - A lista de animais a ser exibida.
 * @param {string} lang - O idioma atual.
 * @param {object} t - O objeto de tradução para o idioma atual.
 */
export function renderAnimals(animalsToRender, lang, t) {
    const grid = document.getElementById('animals-grid');
    if (!grid) return; 
    grid.innerHTML = '';

    if (animalsToRender.length === 0) {
        grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><div class="empty-state-icon">🐾</div><div class="empty-state-text">${t.noAnimalsFound}</div><div class="empty-state-subtext">${t.tryDifferentFilters}</div></div>`;
        return;
    }

    animalsToRender.forEach((animal, index) => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const animalName = animal.name[lang] || animal.name.en;
        const sizeText = animal.size === 'small' ? t.sizeSmall : t.sizeLarge;
        const dropName = t.dropItems[animal.drop] || animal.drop;
        const imagePath = `../images/animals/${animal.image}`;

        card.innerHTML = `
            <div class="animal-header">
                <img src="${imagePath}" alt="${animalName}" class="animal-image" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="animal-image-placeholder" style="display: none;">${t.imageNotAvailable}<br><small>${t.codeNeeded}</small></div>
                <div class="animal-info-header">
                    <div class="animal-name">${animalName}</div>
                    <div class="animal-tags">
                        <span class="tag color-tag color-${animal.color}">R${animal.rarity}</span>
                        <span class="tag size-tag">${sizeText}</span>
                    </div>
                </div>
            </div>
            <div class="animal-stats">
                <div class="stats-grid">
                    <div class="stat-item"><div class="stat-label">${t.level}</div><div class="stat-value">${animal.level}</div></div>
                    <div class="stat-item"><div class="stat-label">${t.foodPerHour}</div><div class="stat-value">${animal.food}</div></div>
                </div>
            </div>
            <div class="drop-section">
                <div class="section-title">${t.hourlyDrop}</div>
                <div class="drop-item">
                    <div class="drop-icon-container">
                        <img src="../icons/drops/background.png" alt="" class="drop-background">
                        <img src="../icons/drops/${animal.drop.toLowerCase().replace(/\s+/g, '_')}.png" alt="${dropName}" class="drop-icon">
                    </div>
                    <div class="drop-name">${dropName}</div>
                </div>
            </div>
            <div class="affection-section">
                 <div class="section-title affection-header">
                    ${t.affection}
                    <button class="info-icon" aria-label="${t.affectionTooltip}">i</button>
                </div>
                <div class="affection-levels">
                    <div class="affection-level"><div class="hearts-container">${generateHearts(1)}</div><div class="level-number">${t.level} 1</div><div class="level-value">${animal.affection[0]}x</div></div>
                    <div class="affection-level"><div class="hearts-container">${generateHearts(2)}</div><div class="level-number">${t.level} 2</div><div class="level-value">${animal.affection[1]}x</div></div>
                    <div class="affection-level"><div class="hearts-container">${generateHearts(3)}</div><div class="level-number">${t.level} 3</div><div class="level-value">${animal.affection[2]}x</div></div>
                </div>
            </div>
            <div class="taming-section">
                <div class="section-title">${t.tamingNotes}</div>
                <div class="taming-icons">
                    ${animal.tamingIcons.map(icon => {
                        const tamingItemName = t.tamingItems[icon] || icon;
                        return `
                        <div class="taming-icon-container">
                            <img src="../icons/taming/background.png" alt="" class="taming-background">
                            <img src="../icons/taming/${icon.toLowerCase()}.png" alt="${tamingItemName}" class="taming-icon">
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}