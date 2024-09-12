
/**
 * Toggles the visibility of the dropdown content and updates the arrow image direction.
 * @param {HTMLElement} navElement - The navigation element containing the dropdown.
 * @param {HTMLElement} buttonElement - The button that toggles the dropdown.
 * @param {HTMLElement} input - The input field within the dropdown for filtering items.
 */
function handleNavToggle(navElement, buttonElement, input) {
    buttonElement.addEventListener('click', () => {
        const contentEl = navElement.querySelector('.content');
        const imgEl = navElement.querySelector('.img-fleche')
        if (contentEl.classList.contains('hidden')) {
            contentEl.classList.remove('hidden');
            imgEl.style.transform = 'rotate(180deg)';
            input.focus();
        } else {
            contentEl.classList.add('hidden');
            imgEl.style.transform = 'rotate(0deg)';
        }
    });
    /**
     * Hides the dropdown content when the mouse leaves the navigation area, 
     * except if there are filtered items or if the input is not empty.
     * @param {Event} e - The mouseleave event.
     */
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
handleNavToggle(navIngredients, btnIngredients, ingredientInput);
handleNavToggle(navAppliance, btnAppliances, applianceInput);
handleNavToggle(navUstensils, btnUstensils, ustensilInput);
uniqueDataList.ingredients.lists = getUniqueIngredients(recipes);
uniqueDataList.appliances.lists = getUniqueAppliances(recipes);
uniqueDataList.ustensils.lists = getUniqueUstensils(recipes);
/**
 * Initializes the dropdown lists with the unique items.
 * @param {Object} data - The dataset containing dropdown information.
 */
function initAllListDropdown(data) {
    for (const key in data) {
        data[key].ingredientsListEl.innerHTML = data[key].lists.map(item =>
            `<li data-type="${key}" data-value="${item}"  data-idDropdown="${data[key].navEl.id}" class="w-full my-2 pt-1 p-3 hover:bg-[#FFD15B] cursor-pointer">
                        ${capitalizeFirstLetter(item)}
                    </li>`).join('');
    }
    document.querySelectorAll('.list-dropdown li').forEach(liEl => liEl.addEventListener('click', handleTag))
}
initAllListDropdown(uniqueDataList);
/**
 * Handles the selection of a tag (item) in the dropdown and applies the filters.
 * @param {Event} e - The click event.
 */
function handleTag(e) {
    const type = e.target.getAttribute('data-type');
    const text = (e.target.innerText || e.target.parentElement.innerText).trim().toLowerCase();
    uniqueDataList[type].listsfiltered.includes(text) ? deleteTag(type, text, e.target) : addTag(type, text, e.target)
    const filteredRecipes = searchRecipes(document.getElementById('input-header').value);
    updateAvailableFilters(filteredRecipes);
    displayResults(filteredRecipes);
}
/**
 * Adds a tag (item) to the selected filters and displays it.
 * @param {string} type - The type of the tag (ingredients, appliances, etc.).
 * @param {string} text - The text value of the tag.
 * @param {HTMLElement} liEl - The clicked list item element.
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
    document.querySelectorAll('.cancel').forEach(imgEl => imgEl.addEventListener('click', handleTag))
}
/**
 * Removes a tag (item) from the selected filters and updates the dropdown visibility.
 * @param {string} type - The type of the tag (ingredients, appliances, etc.).
 * @param {string} text - The text value of the tag.
 * @param {HTMLElement} e - The element triggering the deletion.
 */
function deleteTag(type, text, e) {
    const dropdownId = e.dataset.iddropdown;
    const navElement = document.querySelector(`#${dropdownId}`)
    const contentEl = navElement.querySelector(`.content`)
    document.querySelectorAll('#filters-selected p').forEach(x => {
        if (x.innerText.trim().toLowerCase() === text) {
            uniqueDataList[type].listsfiltered = uniqueDataList[type].listsfiltered.filter(x => x !== text)
            uniqueDataList[type].selecteds = uniqueDataList[type].selecteds.filter(x => x !== text)
            x.remove();
            if (uniqueDataList[type].listsfiltered.length) return
            if (contentEl || !contentEl.classList.contains('hidden')) {
                contentEl.classList.add('hidden');
                navElement.querySelector('.img-fleche').style.transform = 'rotate(0deg)';
            }
        }
    })
}
/**
 * Sets up event listeners for the search inputs and clear buttons in the dropdowns.
 * @param {Object} data - The dataset containing input and clear button information.
 */
function handleSearchDropdown(data) {
    for (const key in data) {
        const clearButton = data[key].inputDropdown.parentElement.querySelector('.clear-input');
        clearButton.addEventListener('click', (e) => {
            console.log('vider');
            data[key].inputDropdown.value = '';
            populateListDropdown(e.target.dataset, true);
            clearButton.classList.add('hidden');
        });

        data[key].inputDropdown.addEventListener('input', (e) => {
            if (!data[key].inputDropdown.value) {
                populateListDropdown(e.target.dataset, true);
                return
            }
            populateListDropdown(e.target.dataset);
            clearButton.classList.toggle('hidden', !data[key].inputDropdown.value)
        });
    }
}
handleSearchDropdown(uniqueDataList);
/**
 * Populates the dropdown list based on the search query or resets it.
 * @param {Object} dataset - The dataset containing the dropdown type information.
 * @param {boolean} reset - Whether to reset the list to its full state.
 */
function populateListDropdown(dataset, reset) {
    let query = uniqueDataList[dataset.type].inputDropdown.value.toLowerCase();

    if (reset) {
        // Afficher la liste complète si reset est vrai
        displayListDropdown(uniqueDataList[dataset.type].lists, dataset.type);
    } else {
        // Filtrer la liste selon la query
        const filteredList = uniqueDataList[dataset.type].lists.filter(item => item.toLowerCase().includes(query));
        console.log("unidatalist :", uniqueDataList[dataset.type].selecteds);
        displayListDropdown(filteredList, dataset.type);
    }
}
/**
 * Displays the list of dropdown items after filtering or resetting.
 * @param {Array} items - The list of items to display.
 * @param {string} type - The type of the dropdown (ingredients, appliances, etc.).
 */
function displayListDropdown(items, type) {
    uniqueDataList[type].ingredientsListEl.innerHTML = items.map(item =>
        `<li data-type="${type}" data-value="${item}" data-idDropdown="${uniqueDataList[type].navEl.id}" class="w-full my-2 pt-1 p-3 hover:bg-[#FFD15B] cursor-pointer ${uniqueDataList[type].selecteds.includes(item) ? "selected" : ""}">
                ${capitalizeFirstLetter(item)}
            </li>`).join('');
    document.querySelectorAll('.list-dropdown li').forEach(liEl => liEl.addEventListener('click', handleTag));
}
/**
 * Capitalizes the first letter of a string and makes the rest of the string lowercase.
 * @param {string} string - The string to capitalize.
 * @returns {string} - The capitalized string.
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
