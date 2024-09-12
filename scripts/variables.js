// INPUT
const ingredientInput = document.getElementById('ingredient-input');
const applianceInput = document.getElementById('appliance-input');
const ustensilInput = document.getElementById('ustensil-input');
// LIST
const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');
// FILTER SELECTED
const filterSelected = document.getElementById('filters-selected');
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
const navAppliance = document.getElementById('nav-appliances');
const navUstensils = document.getElementById('nav-ustensils');
// IMG fleche
const imgFleche = document.querySelector('.img-fleche');

const uniqueDataList = {
    ingredients: {
        lists: [], ingredientsListEl: ingredientsList, inputDropdown: ingredientInput, navEl: navIngredients, listsfiltered: [], btnHtml: btnIngredients, selecteds: [],
        inputDropdown: ingredientInput,
    },
    appliances: {
        lists: [], ingredientsListEl: appliancesList, inputDropdown: applianceInput, navEl: navAppliance, listsfiltered: [], btnHtml: btnAppliances, selecteds: [],
        inputDropdown: applianceInput,
    },
    ustensils: {
        lists: [], ingredientsListEl: ustensilsList, inputDropdown: ustensilInput, navEl: navUstensils, listsfiltered: [], btnHtml: btnUstensils, selecteds: [],
        inputDropdown: ustensilInput,
    }
};