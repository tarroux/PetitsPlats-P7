
function generateCard(recipe) {
    const cardsContainer = document.getElementById('cardsContainer');
    const card = document.createElement('article');
    card.classList.add('w-96', 'mb-8', 'flex', 'flex-col', 'border', 'border-gray-300', 'rounded-lg', 'shadow-lg', 'overflow-hidden');
    card.innerHTML = `
        <div class="relative w-96 h-64">
            <img class="w-full h-64 object-cover" src="assets/recettes/${recipe.image}" alt="${recipe.name}" loading="lazy" >
            <span class="absolute top-2 right-2 bg-[#FFD15B] text-black text-xs font-semibold py-1 px-2 rounded-full">${recipe.time} min</span>
        </div>
        <div class="p-5 flex flex-col mb-2 ">
            <h2 class="w-max md:w-auto text-lg pb-6 font-anton text-black">${recipe.name}</h2>
            <h3 class="w-16 pb-3 font-manrope font-normal text-xs text-[#7A7A7A]">RECETTE</h3>
            <p class="w-80 pb-7 text-sm">${recipe.description}</p>
            <h3 class="w-32 pb-3 font-manrope font-normal text-xs text-[#7A7A7A]">INGREDIENTS</h3>
            <ul class="w-80 flex flex-wrap">
                ${recipe.ingredients.map(ingredient => `
                    <li class="w-1/2 pb-7 flex flex-col">
                        <p class="text-sm text-[#1B1B1B] font-manrope ">${ingredient.ingredient}</p>
                        <p class="text-sm text-[#7A7A7A] font-manrope ">${ingredient.quantity || ''} ${ingredient.unit || ''}</p>
                    </li>
                `).join('')}
            </ul>
        </div>
`;
    cardsContainer.appendChild(card);//[478px]
}
