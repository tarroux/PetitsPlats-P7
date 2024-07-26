// Add event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    let inputHeader = document.getElementById('inputHeader');
    const loopIcon = document.getElementById('loopIcon');
    const resetButton = document.getElementById('resetButton');
    const filterSelected = document.getElementById('filter-selected');

    resetButton.classList.add('hidden');
    // Display all recipes sorted alphabetically on page load
    displayAllRecipesAlphabetically();

    // Change the loop icon on mouseover and mouseout
    loopIcon.addEventListener('mouseover', () => {
        loopIcon.src = 'assets/elements/yellowLoop.png';
    });

    loopIcon.addEventListener('mouseout', () => {
        loopIcon.src = 'assets/elements/loop.png';
    });
    // Handle input change event for the search bar
    inputHeader.addEventListener('input', () => {
        controlInput(inputHeader.value);
    });
    // Handle Enter key press event for the search bar
    inputHeader.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            controlInput(inputHeader.value);
        }
    });

    // Show the reset button when the input is focused
    inputHeader.addEventListener('focus', () => {
        resetButton.classList.remove('hidden');
    });

    // Hide the reset button when the input loses focus
    inputHeader.addEventListener('blur', () => {
        setTimeout(() => resetButton.classList.add('hidden'), 200);
    });

    // Reset the input values and clear search results
    resetButton.addEventListener('click', () => {
        inputHeader.value = '';
        inputHeader.setCustomValidity('');
        clearResults();
        console.log("Recherche réinitialisée");
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
            updateRecipeCount(results.length)
        } else {
            inputHeader.setCustomValidity('Veuillez entrer au moins 3 caractères pour effectuer une recherche.');
            inputHeader.reportValidity();
            console.log("Veuillez entrer au moins 3 caractères pour effectuer une recherche.");
        }
    }

    /**
     * Retrieve the selected filters.
     * @returns {Array} - List of selected filters.
     */
    function getSelectedFilters() {
        return Array.from(filterSelected.querySelectorAll('p')).map(p => p.textContent.trim());
    }

    /**
     * Search for recipes that match the keyword and selected filters.
     * @param {string} queryWord - The search keyword.
     * @returns {Array} - List of recipes matching the search criteria.
     */
    function searchRecipes(queryWord) {
        queryWord = queryWord.toLowerCase();
        const selectedFilters = getSelectedFilters();
        const results = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const matchesQuery = recipe.name.toLowerCase().includes(queryWord) ||
                recipe.description.toLowerCase().includes(queryWord) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(queryWord));

            let matchesFilters = true;
            for (let j = 0; j < selectedFilters.length; j++) {
                const filter = selectedFilters[j].toLowerCase();
                if (!recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter)) &&
                    !recipe.appliance.toLowerCase().includes(filter) &&
                    !recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter))) {
                    matchesFilters = false;
                    break;
                }
            }

            if (matchesQuery && matchesFilters) {
                results.push(recipe);
            }
        }

        return results;
    }

    /**
     * Display the filtered recipe results.
     * @param {Array} results - List of recipes to display.
     */
    function displayResults(results) {
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = '';

        for (let i = 0; i < results.length; i++) {
            generateCard(results[i]);
        }

        if (results.length === 0) {
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerHTML = "Oups, nous n'avons trouvé aucune recette qui correspond à votre recherche...";
        }

        updateRecipeCount(results.length);
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
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = '';
        displayAllRecipesAlphabetically();
    }

    /**
     * Update the recipe count display.
     * @param {number} count - The number of recipes to display.
     */
    function updateRecipeCount(count) {
        const recipeCountElement = document.getElementById('recipeCount');
        recipeCountElement.textContent = `${count} recettes`;
    }
});
