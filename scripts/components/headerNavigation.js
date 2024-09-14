/**
 * Initialise les comportements de la barre de recherche du header.
 */
function init() {
    const inputHeader = document.getElementById('input-header');
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
 * Contrôle la validité du champ de recherche et affiche les résultats.
 * @param {HTMLElement} inputValue - Le champ de saisie.
 */
function controlInput(inputValue) {
    if (inputValue.value.length >= 3) {
        inputValue.setCustomValidity('');
        const results = searchRecipes(inputValue.value);
        displayResults(results);
        updateRecipeCount(results.length);
    } else {
        inputValue.setCustomValidity('Veuillez entrer au moins 3 caractères pour effectuer une recherche.');
        inputValue.reportValidity();
    }
}

/**
 * Affiche toutes les recettes triées par ordre alphabétique.
 */
function displayAllRecipesAlphabetically() {
    const sortedRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        sortedRecipes.push(recipes[i]);
    }
    sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
    displayResults(sortedRecipes);
}

/**
 * Réinitialise les résultats affichés et montre toutes les recettes.
 */
function clearResults() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    displayAllRecipesAlphabetically();
}

/**
 * Recherche les recettes qui correspondent à la requête saisie et aux filtres sélectionnés.
 * 
 * @param {string} queryWord - La requête de recherche.
 * @returns {Array} - Un tableau des recettes filtrées.
 */
function searchRecipes(queryWord) {
    queryWord = queryWord.toLowerCase().trim();
    let filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let matchesQuery = false;

        // Vérifier le nom, la description et les ingrédients
        if (recipe.name.toLowerCase().includes(queryWord)) {
            matchesQuery = true;
        } else if (recipe.description.toLowerCase().includes(queryWord)) {
            matchesQuery = true;
        } else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(queryWord)) {
                    matchesQuery = true;
                    break;
                }
            }
        }

        // Appliquer les filtres
        let matchesFilters = true;

        // Vérifier les filtres des ingrédients
        for (let k = 0; k < uniqueDataList.ingredients.listsfiltered.length; k++) {
            let filter = uniqueDataList.ingredients.listsfiltered[k];
            let ingredientMatch = false;

            for (let l = 0; l < recipe.ingredients.length; l++) {
                if (recipe.ingredients[l].ingredient.toLowerCase().includes(filter)) {
                    ingredientMatch = true;
                    break;
                }
            }
            if (!ingredientMatch) {
                matchesFilters = false;
                break;
            }
        }

        // Vérifier les filtres des appareils
        if (matchesFilters) {
            for (let k = 0; k < uniqueDataList.appliances.listsfiltered.length; k++) {
                let filter = uniqueDataList.appliances.listsfiltered[k];
                if (!recipe.appliance.toLowerCase().includes(filter)) {
                    matchesFilters = false;
                    break;
                }
            }
        }

        // Vérifier les filtres des ustensiles
        if (matchesFilters) {
            for (let k = 0; k < uniqueDataList.ustensils.listsfiltered.length; k++) {
                let filter = uniqueDataList.ustensils.listsfiltered[k];
                let ustensilMatch = false;

                for (let l = 0; l < recipe.ustensils.length; l++) {
                    if (recipe.ustensils[l].toLowerCase().includes(filter)) {
                        ustensilMatch = true;
                        break;
                    }
                }
                if (!ustensilMatch) {
                    matchesFilters = false;
                    break;
                }
            }
        }

        if (matchesQuery && matchesFilters) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
