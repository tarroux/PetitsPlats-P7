function init() {
    let inputHeader = document.getElementById('input-header');
    const loopIcon = document.getElementById('loopIcon');
    const resetButton = document.getElementById('reset-button');
    resetButton.classList.add('hidden');
    displayAllRecipesAlphabetically();

    loopIcon.addEventListener('mouseover', () => {
        loopIcon.src = 'assets/elements/yellowLoop.png';
    });
    loopIcon.addEventListener('mouseout', () => {
        loopIcon.src = 'assets/elements/loop.png';
    });
    inputHeader.addEventListener('input', () => {
        controlInput(inputHeader);
    });
    inputHeader.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            controlInput(inputHeader);
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
}
/**
 * Control the validity of the input and display results if valid.
 * @param {HTMLElement} inputValue - The value of the input.
 */
function controlInput(inputValue) {
    if (inputValue.value.length >= 3) {
        inputValue.setCustomValidity('');
        const results = searchRecipes(inputValue.value);
        // console.log(results);
        displayResults(results);
        updateRecipeCount(results.length);
    } else {
        inputValue.setCustomValidity('Veuillez entrer au moins 3 caractères pour effectuer une recherche.');
        inputValue.reportValidity();
    }
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
 * Search for recipes that match the input query and selected filters.
 * The search is performed on the recipe name, description, and ingredients.
 * The function also applies filters on ingredients, appliances, and utensils.
 * 
 * @param {string} queryWord - The search query entered by the user.
 * @returns {Array} - A filtered array of recipes that match both the query and the selected filters.
 */
function searchRecipes(queryWord) {
    queryWord = queryWord.toLowerCase().trim();
    return recipes.filter(recipe => {
        const matchesQuery = recipe.name.toLowerCase().includes(queryWord) ||
            recipe.description.toLowerCase().includes(queryWord) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(queryWord));
        const matchesFilters = uniqueDataList.ingredients.listsfiltered.every(filter =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter))
        ) && uniqueDataList.appliances.listsfiltered.every(filter =>
            recipe.appliance.toLowerCase().includes(filter)
        ) && uniqueDataList.ustensils.listsfiltered.every(filter =>
            recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter))
        );
        return matchesQuery && matchesFilters;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    init()
});