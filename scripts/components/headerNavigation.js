document.addEventListener('DOMContentLoaded', () => {
    let inputHeader = document.getElementById('input-header');
    const loopIcon = document.getElementById('loopIcon');
    const resetButton = document.getElementById('reset-button');
    const filterSelected = document.getElementById('filter-selected');
    resetButton.classList.add('hidden');
    displayAllRecipesAlphabetically();
    loopIcon.addEventListener('mouseover', () => {
        loopIcon.src = 'assets/elements/yellowLoop.png';
    });
    loopIcon.addEventListener('mouseout', () => {
        loopIcon.src = 'assets/elements/loop.png';
    });
    inputHeader.addEventListener('input', () => {
        controlInput(inputHeader.value);
    });
    inputHeader.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            controlInput(inputHeader.value);
        }
    });
    inputHeader.addEventListener('focus', () => {
        resetButton.classList.remove('hidden');
    });
    inputHeader.addEventListener('blur', () => {
        setTimeout(() => resetButton.classList.add('hidden'), 200);
    });
    resetButton.addEventListener('click', () => {
        inputHeader.value = '';
        inputHeader.setCustomValidity('');
        clearResults();
    });
    /**
     * Control the validity of the input and display results if valid.
     * @param {string} inputValue - The value of the input.
     */
    function controlInput(inputValue) {
        if (inputValue.length >= 3) {
            inputHeader.setCustomValidity('');
            const results = searchRecipes(inputValue);
            displayResults(results);
            updateRecipeCount(results.length);
        } else {
            inputHeader.setCustomValidity('Veuillez entrer au moins 3 caractères pour effectuer une recherche.');
            inputHeader.reportValidity();
        }
    }

    function searchRecipes(queryWord) {
        queryWord = queryWord.toLowerCase();
        // console.log('avant d\'appeler getSelectedFilters', getSelectedFilters());
        const selectedFilters = getSelectedFilters();
        console.log('Selected Filters:', selectedFilters, typeof selectedFilters);
        console.log('Ingredients:', selectedFilters.ingredients);
        console.log('Appliances:', selectedFilters.appliances);
        console.log('Ustensils:', selectedFilters.ustensils);

        return recipes.filter(recipe => {
            // Check if the recipe matches the search query
            const matchesQuery = recipe.name.toLowerCase().includes(queryWord) ||
                recipe.description.toLowerCase().includes(queryWord) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(queryWord));
            console.log(matchesQuery);

            // Check if the recipe matches the selected filters
            const matchesFilters = selectedFilters.ingredients.every(filter =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter))
            ) && selectedFilters.appliances.every(filter =>
                recipe.appliance.toLowerCase().includes(filter)
            ) && selectedFilters.ustensils.every(filter =>
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter))
            );
            console.log(matchesFilters);
            return matchesQuery && matchesFilters;
        });
    }
    /**
     * Display the filtered recipe results.
     * @param {Array} results - List of recipes to display.
     */
    function displayResults(results) {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        results.forEach(recipe => generateCard(recipe));
        updateRecipeCount(results.length)
    }
    /**
     * Display all recipes sorted alphabetically.
     */
    function displayAllRecipesAlphabetically() {
        const sortedRecipes = [...recipes].sort((a, b) => a.name > b.name);
        displayResults(sortedRecipes);
    }
    /**
     * Clear the displayed results and show all recipes.
     */
    function clearResults() {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        displayAllRecipesAlphabetically();
    }
    /**
     * Update the recipe count display.
     * @param {number} count - The number of recipes to display.
     */
    function updateRecipeCount(count) {
        const recipeCountElement = document.getElementById('recipe-count');
        recipeCountElement.textContent = `${count} recettes`;
    }
});