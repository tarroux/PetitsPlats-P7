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
                <input id="ingredient-input" type="text" name="search" class="w-full">
                <img id="clear-ingredient-input" src="assets/elements/Vector.png" alt="clear" class="w-2 h-2 cursor-pointer hidden">
                <img src="assets/elements/loop2.svg" alt="loop" class="w-4 mr-2">
            </div>
            <div>
                <ul class="w-full pt-4" id="ingredient-list"></ul>
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
                <input id="ustensil-input" type="text" name="search" class="w-full">
                <img id="clear-ustensil-input" src="assets/elements/Vector.png" alt="clear" class="w-2 h-2 cursor-pointer hidden">
                <img src="assets/elements/loop2.svg" alt="loop" class="w-4 mr-2">
            </div>
            <div>
                <ul class="w-full pt-4" id="ustensil-list"></ul>
            </div>
        </nav>
    </div>
    <p id="recipeCount" class="font-anton text-xl"></p>
`;

/**
 * Sets up event listeners and handles the initialization of various elements when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // INPUT
    const ingredientInput = document.getElementById('ingredient-input');
    const applianceInput = document.getElementById('appliance-input');
    const ustensilInput = document.getElementById('ustensil-input');
    // LIST
    const ingredientList = document.getElementById('ingredient-list');
    const applianceList = document.getElementById('appliance-list');
    const ustensilList = document.getElementById('ustensil-list');
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
     * Toggles the height of the navigation element and updates the image when the button is clicked or when the mouse leaves the navigation element.
     * @param {HTMLElement} navElement - The navigation element to toggle.
     * @param {HTMLElement} inputElement - The input element associated with the navigation.
     * @param {HTMLElement} imgElement - The image element to update.
     * @param {HTMLElement} buttonElement - The button element to attach the click event listener.
     */
    function handleNavToggle(navElement, inputElement, imgElement, buttonElement) {
        buttonElement.addEventListener('click', () => {
            navElement.classList.toggle('h-14');
            if (navElement.classList.contains('h-14')) {
                imgElement.src = 'assets/elements/VectorUp.png';
            } else {
                imgElement.src = 'assets/elements/VectorDown.png';
            }
        });

        navElement.addEventListener('mouseleave', () => {
            if (!inputElement.value && !getSelectedFilters().length) {
                navElement.classList.add('h-14');
                imgElement.src = 'assets/elements/VectorUp.png';
            }
        });
    }

    handleNavToggle(navIngredients, ingredientInput, imgIngredients, btnIngredients);
    handleNavToggle(navAppliance, applianceInput, imgAppliances, btnAppliances);
    handleNavToggle(navUstensils, ustensilInput, imgUstensils, btnUstensils);

    clearIngredientInput.addEventListener('click', () => {
        ingredientInput.value = '';
        filterIngredients();
        clearIngredientInput.classList.add('hidden');
    });

    clearApplianceInput.addEventListener('click', () => {
        applianceInput.value = '';
        filterAppliances();
        clearApplianceInput.classList.add('hidden');
    });

    clearUstensilInput.addEventListener('click', () => {
        ustensilInput.value = '';
        filterUstensils();
        clearUstensilInput.classList.add('hidden');
    });

    ingredientInput.addEventListener('input', () => {
        if (ingredientInput.value) {
            clearIngredientInput.classList.remove('hidden');
        } else {
            clearIngredientInput.classList.add('hidden');
        }
    });

    applianceInput.addEventListener('input', () => {
        if (applianceInput.value) {
            clearApplianceInput.classList.remove('hidden');
        } else {
            clearApplianceInput.classList.add('hidden');
        }
    });

    ustensilInput.addEventListener('input', () => {
        if (ustensilInput.value) {
            clearUstensilInput.classList.remove('hidden');
        } else {
            clearUstensilInput.classList.add('hidden');
        }
    });

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
        // console.log(recipes);
        const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => {
            return ing.ingredient.toLowerCase();
        }));
        // return ;
        const ingredients = [...new Set(allIngredients)];
        console.log(ingredients);
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
    function displayList(items, element) {
        element.innerHTML = items.map(item => `<li class="pt-1 p-3 hover:bg-[#FFD15B]">${capitalizeFirstLetter(item)}</li>`).join('');
        element.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('selected');
                addFilter(item.textContent);
                filterRecipes();
            });
        });
    }

    /**
     * Adds a selected filter to the list of filters and filters the recipes.
     * @param {string} text - The text of the filter to add.
     */
    function addFilter(text) {
        const existingFilters = Array.from(filterSelected.getElementsByTagName('p')).map(p => p.textContent.toLowerCase());

        if (!existingFilters.includes(text.toLowerCase())) {
            const p = document.createElement('p');
            p.className = "w-36 h-14 bg-[#FFD15B] rounded-lg flex justify-between items-center p-2";
            p.textContent = text;

            const img = document.createElement('img');
            img.id = "cancel";
            img.src = "assets/elements/Vector.png";
            img.alt = "cancel";
            img.className = "w-3.5 h-3.5 ml-2 cursor-pointer";
            img.addEventListener('click', () => {
                const liElements = document.querySelectorAll(`#ingredient-list li, #appliance-list li, #ustensil-list li`);
                liElements.forEach(li => {
                    if (li.textContent.toLowerCase() === text.toLowerCase()) {
                        li.classList.remove('selected');
                    }
                });
                p.remove();
                filterRecipes();
            });

            p.appendChild(img);
            filterSelected.appendChild(p);
            filterRecipes();
        }
    }

    /**
     * Gets the list of selected filters.
     * @returns {Array} - The list of selected filters.
     */
    function getSelectedFilters() {
        return Array.from(filterSelected.querySelectorAll('p')).map(p => p.textContent);
    }

    /**
     * Filters the recipes based on the selected filters and displays the results.
     */
    function filterRecipes() {
        const selectedFilters = getSelectedFilters();
        const filteredRecipes = recipes.filter(recipe => {
            const ingredientMatch = selectedFilters.every(filter =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase()))
            );
            const applianceMatch = selectedFilters.every(filter =>
                recipe.appliance.toLowerCase().includes(filter.toLowerCase())
            );
            const ustensilMatch = selectedFilters.every(filter =>
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter.toLowerCase()))
            );
            return ingredientMatch || applianceMatch || ustensilMatch;
        });
        displayResults(filteredRecipes);
    }
    /**
     * Updates the recipe count display.
     * @param {number} count - The number of recipes to display.
     */
    function updateRecipeCount(count) {
        const recipeCountElement = document.getElementById('recipeCount');
        recipeCountElement.textContent = `${count} recettes`;
    }

    /**
     * Displays the filtered recipes.
     * @param {Array} results - The list of filtered recipes.
     */
    function displayResults(results) {
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = '';
        results.forEach(recipe => generateCard(recipe));
        updateRecipeCount(results.length);
    }

    /**
     * Filters and displays the ingredients based on the input value.
     */
    function filterIngredients() {
        const query = ingredientInput.value.toLowerCase();
        const filteredIngredients = uniqueIngredients.filter(ingredient =>
            ingredient.toLowerCase().includes(query)
        );
        displayList(filteredIngredients, ingredientList);
    }

    /**
     * Filters and displays the appliances based on the input value.
     */
    function filterAppliances() {
        const query = applianceInput.value.toLowerCase();
        const filteredAppliances = uniqueAppliances.filter(appliance =>
            appliance.toLowerCase().includes(query)
        );
        displayList(filteredAppliances, applianceList);
    }

    /**
     * Filters and displays the ustensils based on the input value.
     */
    function filterUstensils() {
        const query = ustensilInput.value.toLowerCase();
        const filteredUstensils = uniqueUstensils.filter(ustensil =>
            ustensil.toLowerCase().includes(query)
        );
        displayList(filteredUstensils, ustensilList);
    }

    // Extraire et afficher les ingrédients, appareils et ustensiles
    const uniqueIngredients = getUniqueIngredients(recipes);
    const uniqueAppliances = getUniqueAppliances(recipes);
    const uniqueUstensils = getUniqueUstensils(recipes);

    displayList(uniqueIngredients, ingredientList);
    displayList(uniqueAppliances, applianceList);
    displayList(uniqueUstensils, ustensilList);

    // Ajouter des écouteurs d'événements pour les inputs des dropdown
    ingredientInput.addEventListener('input', filterIngredients);
    applianceInput.addEventListener('input', filterAppliances);
    ustensilInput.addEventListener('input', filterUstensils);

    // Mettre à jour le compteur de recettes lors du chargement initial
    updateRecipeCount(recipes.length);
});