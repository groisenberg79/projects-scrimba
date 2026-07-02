import { menuArray } from "./data";

const menuSection = document.querySelector('.menu')

function getFoodItems () {
    let menu = ''
    for (let item of menuArray) {
        menu += `    
    <article id="${item.id}">
        <div class="food-item">
            <span class="food-emoji">${item.emoji}</span>
            <div class="food-info">
                <h2 class="food-name">${item.name}</h2>
                <p class="food-ingredients">${item.ingredients.join(', ')}</p
                <span class="food-price">${item.price}</span>
            </div>
        </div>
        <button class="add-btn">+</button>
    </article>`
    }
    return menu
}

menuSection.innerHTML = getFoodItems()