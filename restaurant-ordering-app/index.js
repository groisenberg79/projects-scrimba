import { menuArray } from "./data";

const foodOrderArray = [0, 0, 0];
const menuSection = document.getElementById('menu-section');
const orderSection = document.getElementById('order-section');
let totalPrice = 0;

document.addEventListener("click", handleClickEvent)

function handleClickEvent(event) {
    const btnClicked = event.target;
    if (btnClicked.classList.contains('add-btn')) {
        foodOrderArray[btnClicked.id]++;
        console.log(foodOrderArray[btnClicked.id]);
        orderSection.innerHTML = showOrder();
    }
}

function showFoodItems() {
    let menu = ''
    for (let item of menuArray) {
        menu += `
            <article id="${item.id}">
                <div class="food-item">
                    <span class="food-emoji">${item.emoji}</span>
                    <div class="food-info">
                        <h2 class="food-name">${item.name}</h2>
                        <p class="food-ingredients">${item.ingredients.join(', ')}</p
                        <span class="food-price">$${item.price}</span>
                    </div>
                </div>
                <button id="${item.id}" class="add-btn">+</button>
            </article>
            <hr>`
    }
    return menu
}

function showOrder() {
    let order = ''
    for (let foodItem of menuArray) {
        if (foodOrderArray[foodItem.id] > 0) {
            order += `
                <article class="order-item">
                    <div class="name-btn-container">
                        <span class="order-name">${foodItem.name} *${foodOrderArray[foodItem.id]}</span>
                        <button id="${foodItem.id}" class="remove-btn">remove</button>
                    <div>
                    <span class="order-price">$${foodItem.price}</span>
                </article>`
        }
    }
    totalPrice = foodOrderArray.reduce((total, currOrder, index) => 
        total + menuArray[index].price * foodOrderArray[index], 0)
    order +=`
        <hr>
        <article class="order-total">
            <span>Total Price:</span>
            <span>$${totalPrice}</span>
        </article>
        <button id="order-btn">Complete Order</button>`
    return order
}

menuSection.innerHTML = showFoodItems()