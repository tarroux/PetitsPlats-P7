/**
 * Initializes the dropdown filter elements and sets their HTML content.
 */
const dropdownFilter = document.getElementById('dropdown-filter');
dropdownFilter.innerHTML = `
    <div class="flex gap-8 ">
        <nav id="nav-ingredients" class="bg-white w-48 h-14 flex flex-col items-center py-1 rounded-lg overflow-hidden">
            <div class="w-full p-4 flex justify-between items-center">
                <button id="btn-ingredients" type="button" class="w-full flex justify-start">Ingrédients</button>
                <img id="img-ingredients" src="assets/elements/VectorUp.png" alt="fleche" class="w-4 h-1.5">
            </div>
            <div class="flex w-40 gap-x-2 items-center border border-slate-200 rounded-sm">
                <input id="ingredients-input" type="text" name="search" class="w-full">
                <img id="clear-ingredient-input" src="assets/elements/Vector.png" alt="clear" class="w-2 h-2 cursor-pointer hidden">
                <img src="assets/elements/loop2.svg" alt="loop" class="w-4 mr-2">
            </div>
            <div>
                <ul class="w-full pt-4" id="ingredients-list"></ul>
            </div>
        </nav>
        <nav id="nav-appliance" class="bg-white w-48 h-14 flex flex-col items-center py-1 rounded-lg overflow-hidden">
            <div class="w-full p-4 flex justify-between items-center">
                <button id="btn-appliances" type="button" class="w-full flex justify-start">Appareils</button>
                <img id="img-appliances" src="assets/elements/VectorUp.png" alt="fleche" class="w-4 h-1.5">
            </div>
            <div class="flex w-40 gap-x-2 items-center border border-slate-200 rounded-sm">
                <input id="appliance-input" type="text" name="search" class="w-full">
                <img id="clear-appliance-input" src="assets/elements/Vector.png" alt="clear" class="w-2 h-2 cursor-pointer hidden">
                <img src="assets/elements/loop2.svg" alt="loop" class="w-4 mr-2">
            </div>
            <div class="w-full">
                <ul class="w-full pt-4" id="appliance-list"></ul>
            </div>
        </nav>
        <nav id="nav-ustensils" class="bg-white w-48 h-14 flex flex-col items-center py-1 rounded-lg overflow-hidden">
            <div class="w-full p-4 flex justify-between items-center">
                <button id="btn-ustensils" type="button" class="w-full flex justify-start">Ustensiles</button>
                <img id="img-ustensils" src="assets/elements/VectorUp.png" alt="fleche" class="w-4 h-1.5">
            </div>
            <div class="flex w-40 gap-x-2 items-center border border-slate-200 rounded-sm">
                <input id="ustensils-input" type="text" name="search" class="w-full">
                <img id="clear-ustensil-input" src="assets/elements/Vector.png" alt="clear" class="w-2 h-2 cursor-pointer hidden">
                <img src="assets/elements/loop2.svg" alt="loop" class="w-4 mr-2">
            </div>
            <div>
                <ul class="w-full pt-4" id="ustensils-list"></ul>
            </div>
        </nav>
    </div>
    <p id="recipe-count" class="font-anton text-xl"></p>
`;
/**
 * Sets up event listeners and handles the initialization of various elements when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // INPUT
    const ingredientsInput = document.getElementById('ingredients-input');
    const applianceInput = document.getElementById('appliance-input');
    const ustensilsInput = document.getElementById('ustensils-input');
    // LIST
    const ingredientsList = document.getElementById('ingredients-list');
    const appliancesList = document.getElementById('appliance-list');
    const ustensilsList = document.getElementById('ustensils-list');
    // FILTER SELECTED
    const filterSelected = document.getElementById('filter-selected');
    // CLEAR BUTTONS
    const clearIngredientInput = document.getElementById('clear-ingredient-input');
    const clearApplianceInput = document.getElementById('clear-appliance-input');
    const clearUstensilInput = document.getElementById('clear-ustensil-input');
    // Boutons pour afficher les sections navigation
    const btnIngredients = document.getElementById('btn-ingredients');
    const btnAppliances = document.getElementById('btn-appliances');
    const btnUstensils = document.getElementById('btn-ustensils');
    // Sections de navigation
    const navIngredients = document.getElementById('nav-ingredients');
    const navAppliance = document.getElementById('nav-appliance');
    const navUstensils = document.getElementById('nav-ustensils');
    // IMG fleche
    const imgIngredients = document.getElementById('img-ingredients');
    const imgAppliances = document.getElementById('img-appliances');
    const imgUstensils = document.getElementById('img-ustensils');
    /**
     * Checks if any list item is selected.
     * @param {HTMLElement} listElement - The list element to check.
     * @returns {boolean} - True if any item is selected, false otherwise.
     */
    function hasSelectedItems(listElement) {
        return Array.from(listElement.querySelectorAll('li')).some(item => item.classList.contains('selected'));
    }
    /**
     * Toggles the height of the navigation element and updates the image when the button is clicked or when the mouse leaves the navigation element.
     * @param {HTMLElement} navElement - The navigation element to toggle.
     * @param {HTMLElement} inputElement - The input element associated with the navigation.
     * @param {HTMLElement} imgElement - The image element to update.
     * @param {HTMLElement} buttonElement - The button element to attach the click event listener.
     */
    // function handleNavToggle(navElement, inputElement, imgElement, buttonElement) {
    //     buttonElement.addEventListener('click', () => {
    //         navElement.classList.toggle('h-14');
    //         if (navElement.classList.contains('h-14')) {
    //             imgElement.src = 'assets/elements/VectorUp.png';
    //         } else {
    //             imgElement.src = 'assets/elements/VectorDown.png';
    //         }
    //     });
    //     navElement.addEventListener('mouseleave', () => {
    //         // Vérifier si l'input est vide et s'il n'y a pas d'éléments sélectionnés
    //         if (!inputElement.value && !hasSelectedItems(navElement.querySelector('ul'))) {
    //             navElement.classList.add('h-14');
    //             imgElement.src = 'assets/elements/VectorUp.png';
    //         }
    //     });
    // navElement.addEventListener('mouseleave', () => {
    //     if (!inputElement.value && !getSelectedFilters().length) {
    //         navElement.classList.add('h-14');
    //         imgElement.src = 'assets/elements/VectorUp.png';
    //     }
    // });

    // }
    /**
     * Toggles the height of the navigation element and updates the image when the button is clicked or when the mouse leaves the navigation element.
     * @param {HTMLElement} navElement - The navigation element to toggle.
     * @param {HTMLElement} inputElement - The input element associated with the navigation.
     * @param {HTMLElement} imgElement - The image element to update.
     * @param {HTMLElement} buttonElement - The button element to attach the click event listener.
     */
    function handleNavToggle(navElement, inputElement, imgElement, buttonElement) {
        buttonElement.addEventListener('click', () => {
            const isCollapsed = navElement.classList.toggle('h-14');
            imgElement.src = isCollapsed ? 'assets/elements/VectorUp.png' : 'assets/elements/VectorDown.png';
        });

        navElement.addEventListener('mouseleave', () => {
            if (!inputElement.value && !hasSelectedItems(navElement.querySelector('ul'))) {
                navElement.classList.add('h-14');
                imgElement.src = 'assets/elements/VectorUp.png';
            }
        });
    }
    // function handleNavToggle(navElement, inputElement, imgElement, buttonElement) {
    //     buttonElement.addEventListener('click', () => {
    //         navElement.classList.toggle('h-auto');
    //         imgElement.src = navElement.classList.contains('h-auto') ? 'assets/elements/VectorDown.png' : 'assets/elements/VectorUp.png';
    //     });

    //     navElement.addEventListener('mouseleave', () => {
    //         if (!inputElement.value && !hasSelectedItems(navElement.querySelector('ul'))) {
    //             navElement.classList.remove('h-auto');
    //             imgElement.src = 'assets/elements/VectorUp.png';
    //         }
    //     });
    // }
    // Apply handleNavToggle to each filter dropdown
    handleNavToggle(navIngredients, ingredientsInput, imgIngredients, btnIngredients);
    handleNavToggle(navAppliance, applianceInput, imgAppliances, btnAppliances);
    handleNavToggle(navUstensils, ustensilsInput, imgUstensils, btnUstensils);
    /**
     * Sets up the clear button functionality for an input element.
     * @param {HTMLElement} inputElement - The input element.
     * @param {HTMLElement} clearButton - The clear button element.
     * @param {Function} filterFunction - The function to call when clearing the input.
     */
    function setupClearButton(inputElement, clearButton, filterFunction) {
        clearButton.addEventListener('click', () => {
            inputElement.value = '';
            filterFunction();
            clearButton.classList.add('hidden');
        });

        inputElement.addEventListener('input', () => {
            if (inputElement.value) {
                clearButton.classList.remove('hidden');
            } else {
                clearButton.classList.add('hidden');
            }
        });
    }

    setupClearButton(ingredientsInput, clearIngredientInput, filterIngredients);
    setupClearButton(applianceInput, clearApplianceInput, filterAppliances);
    setupClearButton(ustensilsInput, clearUstensilInput, filterUstensils);

    /**
     * Sets up the clear button and input event listeners for a filter.
     * @param {HTMLElement} inputElement - The input element for the filter.
     * @param {HTMLElement} clearButton - The button to clear the input field.
     * @param {Function} filterFunction - The function to filter items based on input.
     */
    function setupFilterInput(inputElement, clearButton, filterFunction) {
        // Toggle visibility of the clear button based on input value
        inputElement.addEventListener('input', () => {
            clearButton.classList.toggle('hidden', !inputElement.value);
            filterFunction();
        });

        // Clear the input field and hide the clear button when clicked
        clearButton.addEventListener('click', () => {
            inputElement.value = '';
            filterFunction();
            clearButton.classList.add('hidden');
        });
    }

    // Setup for ingredient input
    setupFilterInput(ingredientsInput, clearIngredientInput, filterIngredients);

    // Setup for appliance input
    setupFilterInput(applianceInput, clearApplianceInput, filterAppliances);

    // Setup for ustensil input
    setupFilterInput(ustensilsInput, clearUstensilInput, filterUstensils);
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
        const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => {
            return ing.ingredient.toLowerCase();
        }));
        // return ;
        const ingredients = [...new Set(allIngredients)];
        return ingredients;
    }
    /**
     * Extracts unique appliances from a list of recipes.
     * @param {Array} recipes - The list of recipes.
     * @returns {Array} - The list of unique appliances.
     */
    function getUniqueAppliances(recipes) {
        // const appliances = recipes.map(recipe => recipe.appliance);
        // return [...new Set(appliances)];
        const allAppliances = recipes.map(recipe => recipe.appliance.toLowerCase());
        const appliances = [...new Set(allAppliances)];
        return appliances;
    }
    /**
     * Extracts unique utensils from a list of recipes.
     * @param {Array} recipes - The list of recipes.
     * @returns {Array} - The list of unique utensils.
     */
    function getUniqueUstensils(recipes) {
        // const ustensils = recipes.flatMap(recipe => recipe.ustensils);
        // return [...new Set(ustensils)];
        const allUstensils = recipes.flatMap(recipe => recipe.ustensils.map(ust => ust.toLowerCase()));
        const ustensils = [...new Set(allUstensils)];
        return ustensils;
    }
    /**
     * Displays a list of items in a given element.
     * @param {Array} items - The items to display.
     * @param {HTMLElement} element - The element to display the items in.
     */
    // function displayList(items, element, type) {
    //     element.innerHTML = items.map(item => `<li class="pt-1 p-3 hover:bg-[#FFD15B]">${capitalizeFirstLetter(item)}</li>`).join('');
    //     element.querySelectorAll('li').forEach(item => {
    //         item.addEventListener('click', () => {
    //             item.classList.toggle('selected');
    //             addFilter(item.textContent, type);
    //             filterRecipes();
    //         });
    //     });
    // }
    /**
     * Displays a list of items in a given element.
     * @param {Array} items - The items to display.
     * @param {HTMLElement} element - The element to display the items in.
     * @param {string} type - The type of items being displayed (e.g., 'ingredient', 'appliance', 'ustensil').
     */
    function displayList(items, element, type) {
        // console.log('displayList', type);
        // console.log('displayList', items);

        element.innerHTML = items.map(item => `<li class="w-full m-0 pt-1 p-3 hover:bg-[#FFD15B]">${capitalizeFirstLetter(item)}</li>`).join('');
        element.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('selected');
                // item.classList.add('w-full');// sans doute inutile##########################
                addFilter(item.textContent, type);  // Passage de `type` lors de l'appel
                filterRecipes();

                // Effacer l'input après la sélection d'un élément
                if (type === 'ingredients') {
                    ingredientsInput.value = '';
                } else if (type === 'appliances') {
                    applianceInput.value = '';
                } else if (type === 'ustensils') {
                    ustensilsInput.value = '';
                }
            });
        });
    }
    /**
     Å
     * Adds a selected filter to the list of filters and filters the recipes.
     * @param {string} text - The text of the filter to add.
     */
    function addFilter(text, type) {
        const existingFilters = Array.from(filterSelected.getElementsByTagName('p')).map(p => p.textContent.toLowerCase());
        console.log('addFilter', type);
        if (!existingFilters.includes(text.toLowerCase())) {
            const p = document.createElement('p');
            p.className = "w-36 h-14 bg-[#FFD15B] rounded-lg flex justify-between items-center p-2";
            p.textContent = text;
            // p.setAttribute('data-type', type);

            const pluralType = convertToPlural(type);
            p.setAttribute('data-type', pluralType);

            const img = document.createElement('img');
            img.id = "cancel";
            img.src = "assets/elements/Vector.png";
            img.alt = "cancel";
            img.className = "w-3.5 h-3.5 ml-2 cursor-pointer";
            img.addEventListener('click', () => {
                const liElements = document.querySelectorAll(`#ingredients-list li, #appliance-list li, #ustensils-list li`);
                liElements.forEach(li => {
                    if (li.textContent.toLowerCase() === text.toLowerCase()) {
                        li.classList.remove('selected');
                    }
                });
                closeDropdown(navIngredients, imgIngredients);
                closeDropdown(navAppliance, imgAppliances);
                closeDropdown(navUstensils, imgUstensils);
                p.remove();
                filterRecipes();
            });

            p.appendChild(img);
            filterSelected.appendChild(p);
            filterRecipes();
        }
    }
    //Tricherie -> convertir data-type au pluriel
    function convertToPlural(type) {
        switch (type) {
            case 'ingredient':
                return 'ingredients';
            case 'appliance':
                return 'appliances';
            case 'ustensil':
                return 'ustensils';
            default:
                return type;
        }
    }
    /**
     * Closes the dropdown by setting its height and arrow image.
     * @param {HTMLElement} navElement - The navigation element to close.
     * @param {HTMLElement} imgElement - The image element to update.
     */
    function closeDropdown(navElement, imgElement) {
        if (!hasSelectedItems(navElement.querySelector('ul'))) {
            navElement.classList.add('h-14');
            navElement.classList.remove('h-auto');
            imgElement.src = 'assets/elements/VectorUp.png';
        }
    }
    function getSelectedFilters() {
        const filters = {
            ingredients: [],
            appliances: [],
            ustensils: []
        };

        const filterSelectedElement = document.getElementById('filter-selected');
        const filterElements = Array.from(filterSelectedElement.querySelectorAll('p'));
        console.log('juste après avoir créé filterElements', filterElements);

        filterElements.forEach(p => {
            const type = p.getAttribute('data-type');
            // console.log(p.type);
            const text = p.textContent.trim();
            console.log('Processing:', { type, text });
            console.log('Filter keys:', Object.keys(filters), typeof filters, typeof filterElements);
            if (filters.hasOwnProperty(type)) {
                filters[type].push(text.toLowerCase());// ??????? Je récupère bien le type et le texte mais j'entre dans le else
                console.log('dans la condition de filterElements :', filters, typeof filters, typeof filterElements);
            } else {
                console.error(`filter type: ${type}`);
            }
        });

        // Array.from(document.getElementById('filter-selected').querySelectorAll('p')).forEach(p => {
        //     const type = p.getAttribute('data-type');
        //     // console.log(p.type);
        //     const text = p.textContent.trim();
        //     if (filters[type]) {
        //         filters[type].push(text.toLowerCase());
        //     }
        // });
        console.log('getSelectedFilters', filters, typeof filters);
        console.log('getSelectedfilters : const filterElements :', filterElements);
        return filters;
    }


    /**
     * Filters the recipes based on the selected filters and displays the results.
     */
    // function filterRecipes() {
    //     const selectedFilters = getSelectedFilters();
    //     const filteredRecipes = recipes.filter(recipe => {
    //         const ingredientMatch = selectedFilters.every(filter =>
    //             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase()))
    //         );
    //         const applianceMatch = selectedFilters.every(filter =>
    //             recipe.appliance.toLowerCase().includes(filter.toLowerCase())
    //         );
    //         const ustensilMatch = selectedFilters.every(filter =>
    //             recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter.toLowerCase()))
    //         );
    //         return ingredientMatch || applianceMatch || ustensilMatch;
    //     });
    //     displayResults(filteredRecipes);
    // }
    // function filterRecipes() {
    //     const selectedFilters = getSelectedFilters();
    //     const filteredRecipes = recipes.filter(recipe => {
    //         const ingredientMatch = selectedFilters.ingredients.every(filter =>
    //             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase()))
    //         );
    //         const applianceMatch = selectedFilters.appliances.every(filter =>
    //             recipe.appliance.toLowerCase().includes(filter.toLowerCase())
    //         );
    //         const ustensilMatch = selectedFilters.ustensils.every(filter =>
    //             recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter.toLowerCase()))
    //         );
    //         return ingredientMatch && applianceMatch && ustensilMatch;
    //     });
    //     displayResults(filteredRecipes);
    // }
    function filterRecipes() {
        const selectedFilters = getSelectedFilters();
        console.log('filterRecipes', selectedFilters);
        const query = document.getElementById('input-header').value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => {
            const ingredientMatch = selectedFilters.ingredients.every(filter =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase()))
            );
            const applianceMatch = selectedFilters.appliances.every(filter =>
                recipe.appliance.toLowerCase().includes(filter.toLowerCase())
            );
            const ustensilMatch = selectedFilters.ustensils.every(filter =>
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter.toLowerCase()))
            );

            const matchesQuery = query.length < 3 || recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));

            return ingredientMatch && applianceMatch && ustensilMatch && matchesQuery;
        });
        displayResults(filteredRecipes);
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
    /**
     * Filters and displays the ingredients based on the input value.
     */
    function filterIngredients() {
        const query = ingredientsInput.value.toLowerCase();
        const filteredIngredients = uniqueIngredients.filter(ingredient =>
            ingredient.toLowerCase().includes(query)
        );
        displayList(filteredIngredients, ingredientsList, 'ingredients');
    }
    /**
     * Filters and displays the appliances based on the input value.
     */
    function filterAppliances() {
        const query = applianceInput.value.toLowerCase();
        const filteredAppliances = uniqueAppliances.filter(appliance =>
            appliance.toLowerCase().includes(query)
        );
        displayList(filteredAppliances, appliancesList, 'appliances');
    }
    /**
     * Filters and displays the ustensils based on the input value.
     */
    function filterUstensils() {
        const query = ustensilsInput.value.toLowerCase();
        const filteredUstensils = uniqueUstensils.filter(ustensil =>
            ustensil.toLowerCase().includes(query)
        );
        displayList(filteredUstensils, ustensilsList, 'ustensils');
    }
    const uniqueIngredients = getUniqueIngredients(recipes);
    const uniqueAppliances = getUniqueAppliances(recipes);
    const uniqueUstensils = getUniqueUstensils(recipes);

    displayList(uniqueIngredients, ingredientsList, 'ingredients');
    displayList(uniqueAppliances, appliancesList, 'appliances');
    displayList(uniqueUstensils, ustensilsList, 'ustensils');
    /**
     * Filters and displays the list based on the input value.
     * @param {string} query - The search query.
     * @param {Array} itemList - The list of items to filter.
     * @param {HTMLElement} listElement - The HTML element where items will be displayed.
     */
    function filterList(query, itemList, listElement, type) {
        const filteredItems = itemList.filter(item => item.toLowerCase().includes(query));
        displayList(filteredItems, listElement, type);
        // console.log('filterList', type);
    }
    ingredientsInput.addEventListener('input', () => filterList(ingredientsInput.value.toLowerCase(), uniqueIngredients, ingredientsList));
    applianceInput.addEventListener('input', () => filterList(applianceInput.value.toLowerCase(), uniqueAppliances, appliancesList));
    ustensilsInput.addEventListener('input', () => filterList(ustensilsInput.value.toLowerCase(), uniqueUstensils, ustensilsList));
    updateRecipeCount(recipes.length);
});