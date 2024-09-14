/**
 * Gère l'ouverture/fermeture des menus déroulants et la rotation de la flèche.
 * @param {HTMLElement} navElement - L'élément de navigation contenant le menu déroulant.
 * @param {HTMLElement} buttonElement - Le bouton qui déclenche l'ouverture/fermeture du menu.
 * @param {HTMLElement} input - Le champ de saisie à l'intérieur du menu pour filtrer les éléments.
 */
function handleNavToggle(navElement, buttonElement, input) {
    buttonElement.addEventListener('click', () => {
        const contentEl = navElement.querySelector('.content');
        const imgEl = navElement.querySelector('.img-fleche');
        if (contentEl.classList.contains('hidden')) {
            contentEl.classList.remove('hidden');
            imgEl.style.transform = 'rotate(180deg)';
            input.focus();
        } else {
            contentEl.classList.add('hidden');
            imgEl.style.transform = 'rotate(0deg)';
        }
    });

    // Gestion de la fermeture automatique du menu lorsque la souris quitte la zone de navigation
    navElement.addEventListener('mouseleave', (e) => {
        const relatedElement = e.relatedTarget;
        if (!relatedElement || !navElement.contains(relatedElement)) {
            if (uniqueDataList[navElement.dataset.type].listsfiltered.length || uniqueDataList[navElement.dataset.type].inputDropdown.value) {
                return;
            }
            navElement.querySelector('.content').classList.add('hidden');
            navElement.querySelector('.img-fleche').style.transform = 'rotate(0deg)';
        }
    });
}

// Attacher le gestionnaire aux filtres
handleNavToggle(navIngredients, btnIngredients, ingredientInput);
handleNavToggle(navAppliance, btnAppliances, applianceInput);
handleNavToggle(navUstensils, btnUstensils, ustensilInput);

uniqueDataList.ingredients.lists = getUniqueIngredients(recipes);
uniqueDataList.appliances.lists = getUniqueAppliances(recipes);
uniqueDataList.ustensils.lists = getUniqueUstensils(recipes);

/**
 * Initialise les listes déroulantes avec des éléments uniques.
 * @param {Object} data - L'objet contenant les listes de données.
 */
function initAllListDropdown(data) {
    for (const key in data) {
        let listHTML = '';
        for (let i = 0; i < data[key].lists.length; i++) {
            let item = data[key].lists[i];
            listHTML += `
                <li data-type="${key}" data-value="${item}" data-idDropdown="${data[key].navEl.id}" class="w-full my-2 pt-1 p-3 hover:bg-[#FFD15B] cursor-pointer">
                    ${capitalizeFirstLetter(item)}
                </li>`;
        }
        data[key].ingredientsListEl.innerHTML = listHTML;
    }

    const listItems = document.querySelectorAll('.list-dropdown li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', handleTag);
    }
}

initAllListDropdown(uniqueDataList);

/**
 * Gère la sélection d'un tag dans les listes déroulantes et applique les filtres.
 * @param {Event} e - L'événement de clic.
 */
function handleTag(e) {
    const type = e.target.getAttribute('data-type');
    const text = (e.target.innerText || e.target.parentElement.innerText).trim().toLowerCase();
    let exists = false;

    for (let i = 0; i < uniqueDataList[type].listsfiltered.length; i++) {
        if (uniqueDataList[type].listsfiltered[i] === text) {
            exists = true;
            break;
        }
    }

    if (exists) {
        deleteTag(type, text, e.target);
    } else {
        addTag(type, text, e.target);
    }

    const filteredRecipes = searchRecipes(document.getElementById('input-header').value);
    updateAvailableFilters(filteredRecipes);
    displayResults(filteredRecipes);
}

/**
 * Ajoute un tag sélectionné à la zone des filtres actifs.
 * @param {string} type - Le type de filtre (ingrédients, appareils, etc.).
 * @param {string} text - Le texte du tag sélectionné.
 * @param {HTMLElement} liEl - L'élément de la liste cliqué.
 */
function addTag(type, text, liEl) {
    uniqueDataList[type].selecteds.push(text);
    uniqueDataList[type].listsfiltered.push(text);

    const p = `
        <p class="w-36 h-14 bg-[#FFD15B] selected rounded-lg flex justify-between items-center p-2"
            data-type="${liEl.dataset.type}">
            ${liEl.innerText}
            <img src="assets/elements/Vector.png" alt="cancel" class="w-3.5 h-3.5 ml-2 cursor-pointer cancel"
            data-idDropdown="${liEl.dataset.iddropdown}"
            data-value="${liEl.innerText.toLowerCase()}"
            data-type="${liEl.dataset.type}">
        </p>`;

    filterSelected.innerHTML += p;
    document.querySelectorAll('.cancel').forEach(imgEl => imgEl.addEventListener('click', handleTag));
}

/**
 * Supprime un tag sélectionné et met à jour l'affichage.
 * @param {string} type - Le type de filtre.
 * @param {string} text - Le texte du tag à supprimer.
 * @param {HTMLElement} e - L'élément déclencheur.
 */
function deleteTag(type, text, e) {
    const dropdownId = e.dataset.iddropdown;
    const navElement = document.querySelector(`#${dropdownId}`);
    const contentEl = navElement.querySelector('.content');

    for (let i = 0; i < uniqueDataList[type].listsfiltered.length; i++) {
        if (uniqueDataList[type].listsfiltered[i] === text) {
            uniqueDataList[type].listsfiltered.splice(i, 1);
            uniqueDataList[type].selecteds.splice(i, 1);
            break;
        }
    }

    const filterTags = document.querySelectorAll('#filters-selected p');
    for (let i = 0; i < filterTags.length; i++) {
        if (filterTags[i].innerText.trim().toLowerCase() === text) {
            filterTags[i].remove();
        }
    }

    if (uniqueDataList[type].listsfiltered.length === 0 && !contentEl.classList.contains('hidden')) {
        contentEl.classList.add('hidden');
        navElement.querySelector('.img-fleche').style.transform = 'rotate(0deg)';
    }
}

/**
 * Gère les événements de recherche et les boutons de réinitialisation dans les menus déroulants.
 * @param {Object} data - L'objet contenant les informations des champs de saisie et boutons de réinitialisation.
 */
function handleSearchDropdown(data) {
    for (const key in data) {
        const clearButton = data[key].inputDropdown.parentElement.querySelector('.clear-input');

        clearButton.addEventListener('click', (e) => {
            data[key].inputDropdown.value = '';
            populateListDropdown(e.target.dataset, true);
            clearButton.classList.add('hidden');
        });

        data[key].inputDropdown.addEventListener('input', (e) => {
            if (!data[key].inputDropdown.value) {
                populateListDropdown(e.target.dataset, true);
                return;
            }
            populateListDropdown(e.target.dataset);
            clearButton.classList.toggle('hidden', !data[key].inputDropdown.value);
        });
    }
}

handleSearchDropdown(uniqueDataList);

/**
 * Remplit la liste déroulante en fonction de la requête ou réinitialise la liste.
 * @param {Object} dataset - Le dataset contenant les informations du menu déroulant.
 * @param {boolean} reset - Indique s'il faut réinitialiser la liste ou la filtrer.
 */
function populateListDropdown(dataset, reset) {
    let query = uniqueDataList[dataset.type].inputDropdown.value.toLowerCase();
    let listHTML = '';

    if (reset) {
        for (let i = 0; i < uniqueDataList[dataset.type].lists.length; i++) {
            let item = uniqueDataList[dataset.type].lists[i];
            listHTML += `
                <li data-type="${dataset.type}" data-value="${item}" data-idDropdown="${uniqueDataList[dataset.type].navEl.id}" class="w-full my-2 pt-1 p-3 hover:bg-[#FFD15B] cursor-pointer">
                    ${capitalizeFirstLetter(item)}
                </li>`;
        }
    } else {
        for (let i = 0; i < uniqueDataList[dataset.type].lists.length; i++) {
            let item = uniqueDataList[dataset.type].lists[i];
            if (item.toLowerCase().includes(query)) {
                listHTML += `
                    <li data-type="${dataset.type}" data-value="${item}" data-idDropdown="${uniqueDataList[dataset.type].navEl.id}" class="w-full my-2 pt-1 p-3 hover:bg-[#FFD15B] cursor-pointer">
                        ${capitalizeFirstLetter(item)}
                    </li>`;
            }
        }
    }

    uniqueDataList[dataset.type].ingredientsListEl.innerHTML = listHTML;

    const listItems = document.querySelectorAll('.list-dropdown li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', handleTag);
    }
}

/**
 * Met en majuscule la première lettre d'une chaîne de caractères.
 * @param {string} string - La chaîne de caractères à formater.
 * @returns {string} - La chaîne avec la première lettre en majuscule.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
/**
 * Extracts unique ingredients from a list of recipes.
 * @param {Array} recipes - The list of recipes.
 * @returns {Array} - The list of unique ingredients.
 */
function getUniqueIngredients(recipes) {
    const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient.toLowerCase()));
    return [...new Set(allIngredients)];
}
/**
 * Extracts unique appliances from a list of recipes.
 * @param {Array} recipes - The list of recipes.
 * @returns {Array} - The list of unique appliances.
 */
function getUniqueAppliances(recipes) {
    const allAppliances = recipes.map(recipe => recipe.appliance.toLowerCase());
    return [...new Set(allAppliances)];
}
/**
 * Extracts unique utensils from a list of recipes.
 * @param {Array} recipes - The list of recipes.
 * @returns {Array} - The list of unique utensils.
 */
function getUniqueUstensils(recipes) {
    const allUstensils = recipes.flatMap(recipe => recipe.ustensils.map(ust => ust.toLowerCase()));
    return [...new Set(allUstensils)];
}
/**
 * Updates the available filters based on the filtered recipes.
 */
function updateAvailableFilters(filteredRecipes) {
    updateFilterOptions('ingredients', getUniqueIngredients(filteredRecipes), 'nav-ingredients');
    updateFilterOptions('ustensils', getUniqueUstensils(filteredRecipes), 'nav-ustensils');
    updateFilterOptions('appliances', getUniqueAppliances(filteredRecipes), 'nav-appliances');
}
/**
 * Updates the filter options displayed in the dropdown.
 * @param {string} type - The type of filter (ingredients, appliances, etc.).
 * @param {Array} availableOptions - The list of available options for the filter.
 * @param {string} dropdownId - The ID of the dropdown element to update.
 */
function updateFilterOptions(type, availableOptions, dropdownId) {
    uniqueDataList[type].lists = availableOptions;
    populateListDropdown({ type: type, iddropdown: dropdownId }, false);
}
/**
* Updates the recipe count display.
* @param {number} count - The number of recipes to display.
*/
function updateRecipeCount(count) {
    const recipeCountElement = document.getElementById('recipe-count');
    recipeCountElement.textContent = `${count} recettes`;
}
/**
 * Displays the filtered recipes.
 * @param {Array} results - The list of filtered recipes.
 */
function displayResults(results) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    results.forEach(recipe => generateCard(recipe));
    updateRecipeCount(results.length);
}
